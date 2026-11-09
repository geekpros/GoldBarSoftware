# GoldBar Software — Landing Page

A premium, conversion-focused landing page for **GoldBar Software** (backup, recovery, and
file-organization tools). Fully interactive product demos, scroll animations, pricing,
FAQ, and a download flow — all in a single static page.

---

## Which file do I actually need?

If your download is hundreds of megabytes, you're looking at `node_modules/` — the
development tooling. **Never upload, share, or host that folder.** It is recreated
automatically by `npm install` and is excluded from Git by `.gitignore`.

You only ever need one of these:

| File (project root)     | Size      | What it is                                                        |
| ----------------------- | --------- | ----------------------------------------------------------------- |
| `dist/index.html`       | ~390 KB   | **The entire finished website in one file.** This is what you host. (~107 KB is what actually transfers, because hosts compress it.) |
| `goldbar-website.zip`   | ~110 KB   | That same file, zipped — drag it straight onto **Netlify Drop**.   |
| `goldbar-source.zip`    | ~90 KB    | The clean source code (no `node_modules`) — unzip and push to **GitHub → Vercel**. |
| `node_modules/`         | 100–300 MB| Dev tooling only. Not part of the website. Ignore it.             |

Regenerate both zips any time after a build:

```bash
npm run build
node package-release.mjs
```

---

## What it's built on

| Layer      | Technology                          | Notes                                        |
| ---------- | ----------------------------------- | -------------------------------------------- |
| UI         | **React 19** + **TypeScript 5.9**   | Component-based, fully typed                 |
| Styling    | **Tailwind CSS 4**                  | Custom gold/obsidian design system           |
| Build tool | **Vite 7**                          | Dev server + production bundler              |
| Packaging  | **vite-plugin-singlefile**          | Inlines JS and CSS into one HTML file        |
| Backend    | **None**                            | No server, no database, no API keys, no env  |

The production build is a **single self-contained file: `dist/index.html`** (~480 KB,
~168 KB gzipped). The only external request it makes is to Google Fonts, and it falls
back gracefully to system fonts if that's unavailable.

---

## Run it locally

Requires **Node.js 20.19+ (or 22.12+)** and npm.

```bash
npm install       # install dependencies (one time)
npm run dev       # start dev server → http://localhost:5173
```

Other commands:

```bash
npm run build     # production build → dist/index.html
npm run preview   # serve the production build locally
node smoke-test.mjs   # optional: automated interaction tests (after a build)
```

---

## Hosting — what's required

**Any static file host. That's it.** There is no server-side code to run, so you never
need a VPS, Node in production, a database, or environment variables. HTTPS is included
free on all the recommended hosts below.

> **Zero binary assets.** Every visual on this site — including the gold-ingot vault
> artwork — is drawn in code (inline SVG + CSS). There is no `assets` folder and no
> image files to lose when you push to GitHub, so remote builds can't fail on a
> missing file.

### Publish with GitHub + Vercel (step by step)

1. **Put the code on GitHub** — unzip `goldbar-source.zip` into an empty folder
   (or use the project folder directly, `.gitignore` keeps it clean):

   ```bash
   git init
   git add .
   git commit -m "GoldBar landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/goldbar-landing.git
   git push -u origin main
   ```

   `.gitignore` is included, so `node_modules/` and `dist/` are correctly left out.

2. **Import into Vercel:** vercel.com → *Add New… → Project* → pick the repo.
   The included `vercel.json` already sets everything: framework **Vite**,
   build command `npm run build`, output directory `dist`. Just press **Deploy**.

3. **Done.** Every future `git push` redeploys automatically, and Vercel gives you
   a free `https://…vercel.app` URL plus free SSL for a custom domain.

If a deploy ever fails, check the build log — with this repo the only requirements
are Node 20.19+ (Vercel's default is fine) and `npm install` running, which Vercel
does automatically.

### Easiest options (free tiers available)

| Host                | How to deploy                                                                 |
| ------------------- | ----------------------------------------------------------------------------- |
| **Netlify Drop**    | Drag `goldbar-website.zip` (or the `dist` folder) onto <https://app.netlify.com/drop>. Live in seconds, no account setup needed to try. |
| **Cloudflare Pages**| Connect the repo → build command `npm run build`, output directory `dist`.     |
| **Vercel**          | Import the repo → framework preset **Vite** (auto-detects the same settings).  |
| **GitHub Pages**    | Push the contents of `dist/` to a `gh-pages` branch (it's just one HTML file). |

### Traditional hosting

Because the output is one file, you can also:

- Upload `dist/index.html` to any shared host / cPanel web root (`public_html`).
- Drop it in an **S3 bucket** (static website hosting) optionally fronted by CloudFront.
- Even **double-click `dist/index.html`** — it runs straight from your disk, offline.

### Custom domain

All hosts above let you attach your own domain (e.g. `goldbar.app`) with free automatic
HTTPS certificates. No code changes are needed.

### Cost & scale

A static page like this can run at **$0/month** on free tiers and handles traffic spikes
without any server to size or maintain — the host's CDN serves the file.

---

## One honest note about the forms

The **download modal** and **newsletter signup** are fully working front-end experiences
(validation, success states, resend), but they don't transmit data anywhere yet — there's
no backend. To collect real emails when you go live, connect either form to a service:

- **Formspree / Basin** — point the form at your endpoint (no server needed).
- **Buttondown / ConvertKit / Mailchimp** — for the newsletter specifically.
- A tiny **serverless function** (Netlify/Vercel/Cloudflare) if you want full control.

Everything else on the page — demos, pricing, FAQ, navigation — is production-ready as-is.

---

## Project structure

```
index.html                  Page shell: fonts, meta, favicon
src/
  App.tsx                   Page composition + download-modal state
  index.css                 Design system: palette, motion, reveal, scrollbar
  hooks.ts                  useInView, useCountUp, useReducedMotion
  components/
    Navbar.tsx              Sticky nav, scrollspy, mobile menu
    Hero.tsx                Auto-playing live backup demo
    SocialProof.tsx         Press row + animated counters
    Features.tsx            Bento grid + pressable golden button
    Showcase.tsx            Backup / Rescue / Tidy interactive demos
    Benefits.tsx            Sticky vault visual, steps, comparison table
    Testimonials.tsx        Pause-on-hover marquee
    Pricing.tsx             Monthly/yearly toggle, three plans
    FAQ.tsx                 Accessible accordion
    Closing.tsx             Gold CTA band + footer with newsletter
    DownloadModal.tsx       Platform + email flow with validation
    Icons.tsx / ui.tsx      Shared SVG icons and UI primitives
    VaultBar.tsx            Gold-ingot vault artwork — pure inline SVG
smoke-test.mjs              jsdom test: 40 checks across every flow
package-release.mjs         Builds the two share-ready zips (website + source)
```

## Quality checks

- `npx tsc --noEmit` — clean typecheck
- `npm run build` — clean production build
- `node smoke-test.mjs` — 40/40 interaction checks (hero replay, scan → restore,
  tidy → undo, settings, pricing toggle, modal validation → success, FAQ,
  newsletter, mobile menu), zero runtime errors
- Honors `prefers-reduced-motion`, keyboard-navigable tabs/accordion/modal,
  ARIA labeling throughout