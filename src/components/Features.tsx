import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import {
  CheckIcon, ClockIcon, DevicesIcon, FolderIcon, LayersIcon, LockIcon,
  ShieldIcon, SparklesIcon, ZapIcon,
} from "./Icons";
import { GlowCard, Reveal, SectionTag } from "./ui";

function GoldenButtonDemo() {
  const [state, setState] = useState<"idle" | "working" | "done">("idle");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const press = () => {
    if (state !== "idle") return;
    setState("working");
    timers.current.push(
      window.setTimeout(() => {
        setState("done");
        timers.current.push(window.setTimeout(() => setState("idle"), 2600));
      }, 1100)
    );
  };

  return (
    <div className="relative mt-7 flex flex-col items-center rounded-2xl border border-white/5 bg-ink-900/70 px-6 py-8">
      {state === "done" && (
        <>
          <span className="sparkle absolute left-[30%] top-4 h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
          <span className="sparkle absolute left-[55%] top-2 h-1 w-1 rounded-full bg-gold-200" style={{ animationDelay: "0.25s" }} aria-hidden="true" />
          <span className="sparkle absolute left-[70%] top-5 h-1.5 w-1.5 rounded-full bg-gold-400" style={{ animationDelay: "0.5s" }} aria-hidden="true" />
        </>
      )}
      <button
        type="button"
        onClick={press}
        aria-label="Try the one-click backup demo"
        className={cn(
          "btn-shine relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-all duration-500",
          state === "done"
            ? "bg-jade/15 shadow-[0_0_50px_-8px_rgba(52,211,153,0.5)]"
            : "gold-field shadow-[0_0_50px_-8px_rgba(217,163,43,0.65)] hover:scale-105 active:scale-95"
        )}
      >
        {state === "working" ? (
          <span className="spin-slow h-8 w-8 rounded-full border-2 border-[#241a04]/30 border-t-[#241a04]" />
        ) : state === "done" ? (
          <CheckIcon className="pop-in h-10 w-10 text-jade" />
        ) : (
          <ShieldIcon className="h-9 w-9 text-[#241a04]" />
        )}
        {state === "idle" && (
          <span className="absolute inset-0 rounded-full border border-gold-200/60" style={{ animation: "pulse-dot 2.4s ease-out infinite" }} aria-hidden="true" />
        )}
      </button>
      <p className={cn("mt-4 text-[13px] font-semibold transition-colors", state === "done" ? "text-jade" : "text-cream")}>
        {state === "idle" && "Back up everything"}
        {state === "working" && "Protecting your files…"}
        {state === "done" && "3,412 files safe. That's it."}
      </p>
      <p className="mt-1 text-[11px] text-dune">
        {state === "done" ? "No settings were harmed in the making of this backup." : "Go on — press it. That's the whole tutorial."}
      </p>
    </div>
  );
}

const cardCls =
  "h-full rounded-3xl border border-white/[0.07] bg-ink-850/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/25 hover:shadow-[0_24px_60px_-24px_rgba(217,163,43,0.25)]";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/10 text-gold-300">
      {children}
    </span>
  );
}

const TOUCHES = ["Quiet hours", "Duplicate finder", "One-click undo", "Plain-English alerts", "Pause on battery", "External drive aware", "Dark mode", "Family sharing"];

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-b absolute right-[-200px] top-1/4 h-[480px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(217,163,43,0.09),transparent)] blur-3xl" />
      </div>
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><SectionTag className="justify-center">The toolkit</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              Serious protection. <em className="text-gold-grad italic">Zero complexity.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16px] leading-relaxed text-sand">
              Everything a vault needs, nothing a manual would ever have to explain. Each tool does one
              job beautifully — and stays out of your way.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-6">
          {/* One-click backup — large */}
          <Reveal className="lg:col-span-4" delay={0}>
            <GlowCard className={cardCls}>
              <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
                <div>
                  <IconBadge><ZapIcon /></IconBadge>
                  <h3 className="font-display text-2xl font-medium text-cream">One-click backup</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-sand">
                    No schedules to configure, no RAID to decipher. Press the golden button once and GoldBar
                    protects every photo, document, and project — then keeps protecting them, silently, forever.
                  </p>
                  <ul className="mt-4 space-y-2 text-[13px] text-sand">
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 shrink-0 text-jade" /> Real-time, incremental, invisible</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 shrink-0 text-jade" /> Set-and-forget scheduling built in</li>
                  </ul>
                </div>
                <GoldenButtonDemo />
              </div>
            </GlowCard>
          </Reveal>

          {/* Encryption */}
          <Reveal className="lg:col-span-2" delay={120}>
            <GlowCard className={cardCls}>
              <IconBadge><LockIcon /></IconBadge>
              <h3 className="font-display text-2xl font-medium text-cream">Bank-vault encryption</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-sand">
                AES-256, zero-knowledge, on by default. Your files are sealed before they ever leave your
                computer — we couldn't peek even if we wanted to.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["AES-256", "Zero-knowledge", "SOC 2"].map((b) => (
                  <span key={b} className="rounded-full border border-gold-400/20 bg-gold-400/[0.07] px-3 py-1 text-[10.5px] font-semibold text-gold-300">{b}</span>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          {/* Time travel */}
          <Reveal className="lg:col-span-2" delay={0}>
            <GlowCard className={cardCls}>
              <IconBadge><LayersIcon /></IconBadge>
              <h3 className="font-display text-2xl font-medium text-cream">Time-travel recovery</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-sand">
                Overwrote the proposal? Deleted the album? Slide back to any version from the last year and
                restore it exactly as it was.
              </p>
              <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className={cn("h-2 flex-1 rounded-full transition-colors", i === 4 ? "bg-gold-400 shadow-[0_0_12px_rgba(237,187,69,0.7)]" : i < 4 ? "bg-gold-700" : "bg-ink-600")} />
                ))}
              </div>
              <p className="mt-2 text-[10.5px] text-dune">Tue 2:14 PM — “before the accident” ✓</p>
            </GlowCard>
          </Reveal>

          {/* Smart tidy */}
          <Reveal className="lg:col-span-2" delay={120}>
            <GlowCard className={cardCls}>
              <IconBadge><FolderIcon /></IconBadge>
              <h3 className="font-display text-2xl font-medium text-cream">Smart organization</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-sand">
                GoldBar Tidy reads the chaos in Downloads and files it into sensible folders — by type, date,
                or rules you write in plain English.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
                <span className="rounded-lg border border-violeta/25 bg-violeta/10 px-2.5 py-1 text-[10.5px] font-medium text-violeta">📷 Photos</span>
                <span className="rounded-lg border border-azure/25 bg-azure/10 px-2.5 py-1 text-[10.5px] font-medium text-azure">📄 Documents</span>
                <span className="rounded-lg border border-jade/25 bg-jade/10 px-2.5 py-1 text-[10.5px] font-medium text-jade">🎵 Music</span>
              </div>
            </GlowCard>
          </Reveal>

          {/* Everywhere */}
          <Reveal className="lg:col-span-2" delay={240}>
            <GlowCard className={cardCls}>
              <IconBadge><DevicesIcon /></IconBadge>
              <h3 className="font-display text-2xl font-medium text-cream">Works everywhere</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-sand">
                Windows, macOS, external drives, even the old laptop in the closet. One vault follows you
                across every machine you own.
              </p>
              <div className="mt-5 flex items-center gap-3 text-dune">
                <ClockIcon className="h-4 w-4 text-gold-400" />
                <span className="text-[12px]">Offline-first. Cloud optional. Always yours.</span>
              </div>
            </GlowCard>
          </Reveal>

          {/* thoughtful touches strip */}
          <Reveal className="lg:col-span-6" delay={100}>
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/[0.06] bg-ink-850/50 px-7 py-6 sm:flex-row sm:justify-between">
              <p className="flex items-center gap-2.5 text-[13.5px] font-semibold text-cream">
                <SparklesIcon className="h-4.5 w-4.5 text-gold-400" />
                Plus 40+ thoughtful touches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {TOUCHES.map((t) => (
                  <span key={t} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-sand transition-colors duration-300 hover:border-gold-400/30 hover:text-gold-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}