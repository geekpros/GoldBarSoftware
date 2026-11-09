import { useState } from "react";
import { AppleIcon, ArrowRightIcon, CheckIcon, LogoMark, WindowsIcon } from "./Icons";
import { Reveal } from "./ui";

type Platform = "windows" | "macos";

const FOOTER_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "GoldBar Backup", href: "#products" },
      { label: "GoldBar Rescue", href: "#products" },
      { label: "GoldBar Tidy", href: "#products" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Quick-start guide", href: "#why-goldbar" },
      { label: "Help center", href: "#faq" },
      { label: "Live demos", href: "#products" },
      { label: "What's new in 4.0", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why we build GoldBar", href: "#why-goldbar" },
      { label: "Customer stories", href: "#top" },
      { label: "Contact us", href: "mailto:hello@goldbar.app" },
      { label: "Press kit", href: "mailto:press@goldbar.app" },
    ],
  },
];

export function FinalCTA({ onDownload }: { onDownload: (plan: string, platform: Platform) => void }) {
  return (
    <section aria-label="Get started" className="relative py-14 lg:py-20">
      <div className="wrap">
        <Reveal>
          <div className="gold-field relative overflow-hidden rounded-[2.5rem] px-7 py-16 text-center sm:px-12 lg:py-24">
            {/* engraved texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(36,26,4,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(36,26,4,0.5) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
              }}
            />
            <div className="pointer-events-none absolute -right-16 -top-20 rotate-12 opacity-[0.14]" aria-hidden="true">
              <LogoMark className="h-72 w-72" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/50" aria-hidden="true" />

            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4a3808]">
                Free 5 GB · 2-minute setup · No credit card
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-[#241a04] sm:text-6xl">
                Put your files <em className="italic">in the vault.</em>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-[#4a3808]">
                Join 2.4 million people who stopped worrying about their files.
                Tonight, while you sleep, GoldBar makes its first golden copy.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onDownload("Free", "windows")}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-ink-900 px-8 py-4 text-[15px] font-semibold text-cream shadow-[0_18px_45px_-12px_rgba(36,26,4,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800 active:translate-y-0 active:scale-[0.98] sm:w-auto"
                >
                  <WindowsIcon className="h-4.5 w-4.5 text-gold-300" /> Download for Windows
                </button>
                <button
                  type="button"
                  onClick={() => onDownload("Free", "macos")}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-2 border-[#241a04]/60 px-8 py-[14px] text-[15px] font-semibold text-[#241a04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#241a04]/10 active:translate-y-0 active:scale-[0.98] sm:w-auto"
                >
                  <AppleIcon className="h-5 w-5" /> Download for macOS
                </button>
              </div>
              <p className="mt-7 flex items-center justify-center gap-2 text-[12.5px] font-semibold text-[#4a3808]">
                <CheckIcon className="h-4 w-4" /> 30-day money-back guarantee on every paid plan
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <footer className="relative border-t border-gold-400/10 bg-ink-950 pb-10 pt-16">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="GoldBar Software — back to top">
              <LogoMark />
              <span className="leading-none">
                <span className="block font-display text-lg font-semibold tracking-tight text-cream">
                  Gold<span className="text-gold-grad">Bar</span>
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.34em] text-dune">Software</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-dune">
              Easy-to-use backup, recovery, and file organization. Built by a small team who believe
              protecting your files shouldn't require a certification.
            </p>
            <form onSubmit={subscribe} className="mt-7" noValidate>
              <label htmlFor="newsletter" className="text-[12px] font-semibold text-cream">
                The Quiet Update — one short email a month
              </label>
              {state === "done" ? (
                <p className="pop-in mt-3 flex items-center gap-2 rounded-xl border border-jade/25 bg-jade/10 px-4 py-3 text-[12.5px] font-semibold text-jade">
                  <CheckIcon className="h-4 w-4" /> You're on the list. See you next month.
                </p>
              ) : (
                <>
                  <div className="mt-3 flex gap-2">
                    <input
                      id="newsletter"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                      placeholder="you@example.com"
                      className="w-full min-w-0 rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 text-[13px] text-cream placeholder:text-dune/60 outline-none transition-colors focus:border-gold-400/50"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to the newsletter"
                      className="gold-field flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#241a04] transition-transform hover:scale-105 active:scale-95"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                  {state === "error" && (
                    <p className="mt-2 text-[11.5px] font-medium text-rosea">Please enter a valid email address.</p>
                  )}
                </>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">{col.title}</p>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[13.5px] text-sand transition-colors duration-300 hover:text-gold-200">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="hairline mt-14" aria-hidden="true" />

        <div className="mt-7 flex flex-col items-center justify-between gap-4 text-[12px] text-dune sm:flex-row">
          <p>© 2026 GoldBar Software, Inc. Crafted with care in Portland, OR.</p>
          <p className="flex items-center gap-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-jade" aria-hidden="true" />
            All systems protected · Privacy-first by design
          </p>
          <a href="#top" className="group flex items-center gap-1.5 font-semibold text-sand transition-colors hover:text-gold-300">
            Back to top
            <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}