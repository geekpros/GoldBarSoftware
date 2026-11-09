/**
 * Builds two small, share-ready archives at the project root:
 *
 *   goldbar-website.zip  → the finished site (one index.html). Drag onto Netlify Drop.
 *   goldbar-source.zip   → the clean source code (no node_modules). Push to GitHub.
 *
 * Usage:  npm run build && node package-release.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT_FILES = [
  "index.html",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "vite.config.ts",
  "vercel.json",
  ".gitignore",
  "README.md",
  "smoke-test.mjs",
  "package-release.mjs",
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

const kb = (p) => `${(statSync(p).size / 1024).toFixed(0)} KB`;

// ---- 1 · deploy-ready website zip -------------------------------------------
if (!existsSync("dist/index.html")) {
  console.error('Missing dist/index.html — run "npm run build" first.');
  process.exit(1);
}
rmSync("goldbar-website.zip", { force: true });
// -j stores the file at the zip root as index.html (what static hosts expect)
execFileSync("zip", ["-X", "-9", "-j", "goldbar-website.zip", "dist/index.html"], { stdio: "inherit" });

// ---- 2 · clean source zip ----------------------------------------------------
const files = [...ROOT_FILES.filter(existsSync), ...walk("src")];
rmSync("goldbar-source.zip", { force: true });
execFileSync("zip", ["-X", "-9", "goldbar-source.zip", ...files], { stdio: "inherit" });

console.log("\nDone:");
console.log(`  goldbar-website.zip  ${kb("goldbar-website.zip")}  → drag onto Netlify Drop, or unzip and host anywhere`);
console.log(`  goldbar-source.zip   ${kb("goldbar-source.zip")}   → unzip, push to GitHub, import in Vercel`);
console.log("\nnode_modules is intentionally excluded — npm install recreates it.");