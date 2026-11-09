import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const html = readFileSync("dist/index.html", "utf8");
const dom = new JSDOM(html, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "http://localhost/",
});
const { window } = dom;
const { document } = window;

// ---- polyfills jsdom lacks ----
window.matchMedia = () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
});
window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe(el) { queueMicrotask(() => this.cb([{ target: el, isIntersecting: true }], this)); }
  unobserve() {}
  disconnect() {}
};
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};

const errors = [];
window.addEventListener("error", (e) => errors.push(String(e.error || e.message)));

// ---- run the bundled app ----
const scripts = [...document.querySelectorAll("script")].filter((s) => !s.src);
for (const s of scripts) window.eval(s.textContent);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = (name, cond) => {
  if (cond) { passed++; console.log(`  PASS  ${name}`); }
  else { failed++; console.log(`  FAIL  ${name}`); }
};
const btnByText = (txt) =>
  [...document.querySelectorAll("button")].find((b) => b.textContent.includes(txt));
const setInput = (el, value) => {
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(el, value);
  el.dispatchEvent(new window.Event("input", { bubbles: true }));
};

await sleep(400);

console.log("\n== initial render ==");
const body = document.body.textContent;
check("hero headline", body.includes("Your files,") && body.includes("safe as gold."));
check("navbar links", !!document.querySelector('a[href="#pricing"]'));
check("features section", body.includes("One-click backup"));
check("product tabs", !!document.querySelector("#tab-backup") && !!document.querySelector("#tab-rescue") && !!document.querySelector("#tab-tidy"));
check("benefits + comparison", body.includes("The honest comparison") && body.includes("Plug it in"));
check("vault image embedded", !!document.querySelector('img[src^="data:image"]'));
check("testimonials", body.includes("Maya Reynolds") && body.includes("Janet Whitfield"));
check("pricing plans", body.includes("Most popular") && body.includes("Bring the family"));
check("yearly default $4", body.includes("$4") && body.includes("Billed $48 once a year"));
check("FAQ", body.includes("Is the free plan actually free?"));
check("final CTA", body.includes("Put your files"));
check("footer newsletter", !!document.querySelector("#newsletter"));

console.log("\n== hero demo autoplay ==");
await sleep(8200);
check("hero backup completed", document.body.textContent.includes("Restore point created"));
check("replay button appears", !!btnByText("Run again"));
btnByText("Run again")?.click();
await sleep(300);
check("replay restarts", document.body.textContent.includes("Backing up"));

console.log("\n== rescue flow ==");
document.querySelector("#tab-rescue").click();
await sleep(120);
check("rescue panel active", document.querySelector("#tab-rescue").getAttribute("aria-selected") === "true");
btnByText("Scan this drive").click();
await sleep(3000);
check("scan found files", document.body.textContent.includes("IMG_2941.HEIC") && document.body.textContent.includes("5 of 5 selected"));
btnByText("Restore 5 files").click();
await sleep(1300);
check("restore completed", document.body.textContent.includes("back exactly where they belonged"));

console.log("\n== tidy flow ==");
document.querySelector("#tab-tidy").click();
await sleep(120);
btnByText("Tidy up").click();
await sleep(3300);
check("tidy completed", document.body.textContent.includes("Sparkling clean"));
check("sorted summary", document.body.textContent.includes("8 files sorted"));
btnByText("Undo").click();
await sleep(150);
check("undo restores clutter", document.body.textContent.includes("8 loose files"));

console.log("\n== backup settings ==");
document.querySelector("#tab-backup").click();
await sleep(120);
const contToggle = document.querySelector('[role="switch"][aria-label="Continuous protection"]');
contToggle.click();
await sleep(80);
check("continuous off enables schedule", !document.querySelector('select[aria-label="Backup schedule"]').disabled);
check("summary updates", document.body.textContent.includes("Next backup the moment anything changes"));
const range = document.querySelector('input[type="range"]');
setInput(range, "200");
await sleep(80);
check("retention slider live", document.body.textContent.includes("200 days"));

console.log("\n== pricing toggle ==");
btnByText("Monthly").click();
await sleep(120);
check("monthly prices", document.body.textContent.includes("$6") && document.body.textContent.includes("Billed monthly"));
btnByText("Yearly").click();
await sleep(120);
check("yearly restored", document.body.textContent.includes("Billed $48 once a year"));

console.log("\n== download modal flow ==");
btnByText("Go Pro").click();
await sleep(200);
const dlg = () => document.querySelector('[role="dialog"]');
const btnIn = (txt) => [...dlg().querySelectorAll("button")].find((b) => b.textContent.includes(txt));
check("modal opens with plan", !!dlg() && document.body.textContent.includes("Get GoldBar"));
check("pro trial copy", document.body.textContent.includes("14-day Pro trial"));
btnIn("macOS").click();
await sleep(80);
if (!btnIn("Email me the macOS installer")) {
  console.log("  DEBUG dialog buttons:", [...dlg().querySelectorAll("button")].map((b) => b.textContent.trim()));
}
setInput(document.querySelector("#dl-email"), "not-an-email");
btnIn("Email me the macOS installer").click();
await sleep(120);
check("invalid email rejected", document.body.textContent.includes("Please enter a valid email address."));
setInput(document.querySelector("#dl-email"), "maya@example.com");
btnIn("Email me the macOS installer").click();
await sleep(150);
check("success state", document.body.textContent.includes("Check your inbox") && document.body.textContent.includes("maya@example.com"));
btnIn("Resend the link").click();
await sleep(100);
check("resend feedback", document.body.textContent.includes("Sent again"));
window.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" }));
await sleep(120);
check("escape closes modal", !document.querySelector('[role="dialog"]'));
check("body scroll restored", document.body.style.overflow === "");

console.log("\n== FAQ accordion ==");
const q2 = document.querySelector("#faq-button-1");
q2.click();
await sleep(100);
check("second FAQ expands", q2.getAttribute("aria-expanded") === "true");
check("first FAQ collapses", document.querySelector("#faq-button-0").getAttribute("aria-expanded") === "false");

console.log("\n== newsletter ==");
setInput(document.querySelector("#newsletter"), "bad");
document.querySelector('button[aria-label="Subscribe to the newsletter"]').click();
await sleep(100);
check("newsletter validates", document.body.textContent.includes("Please enter a valid email"));
setInput(document.querySelector("#newsletter"), "janet@example.com");
document.querySelector('button[aria-label="Subscribe to the newsletter"]').click();
await sleep(100);
check("newsletter success", document.body.textContent.includes("You're on the list"));

console.log("\n== mobile menu ==");
const menuBtn = document.querySelector('button[aria-controls="mobile-menu"]');
menuBtn.click();
await sleep(80);
check("menu opens", menuBtn.getAttribute("aria-expanded") === "true");
document.querySelector('#mobile-menu a[href="#pricing"]').click();
await sleep(80);
check("menu closes on nav", menuBtn.getAttribute("aria-expanded") === "false");

console.log("\n== runtime errors ==");
check("no window errors", errors.length === 0);
if (errors.length) console.log(errors.slice(0, 5));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);