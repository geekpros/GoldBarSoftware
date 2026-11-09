import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useInView, useReducedMotion } from "../hooks";
import {
  AppleIcon, ArrowRightIcon, CheckIcon, FileTypeIcon, LockIcon, PlayIcon,
  RefreshIcon, WindowsIcon, type FileKind,
} from "./Icons";
import { GhostButton, GoldButton, Reveal, Stars } from "./ui";

const FILES: { name: string; kind: FileKind; size: string }[] = [
  { name: "Wedding — final edits", kind: "photo", size: "1.2 GB" },
  { name: "Tax returns 2019–2025", kind: "doc", size: "84 MB" },
  { name: "Family videos", kind: "video", size: "3.4 GB" },
  { name: "Project archive.zip", kind: "zip", size: "612 MB" },
  { name: "Household budget.xlsx", kind: "sheet", size: "2 MB" },
  { name: "Voice memos", kind: "audio", size: "148 MB" },
];

const SEGMENTS = [
  { label: "Photos", pct: 38, color: "bg-violeta" },
  { label: "Documents", pct: 24, color: "bg-azure" },
  { label: "Videos", pct: 22, color: "bg-rosea" },
  { label: "Other", pct: 16, color: "bg-gold-400" },
];

function HeroWindow() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const raf = useRef(0);
  const started = useRef(false);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setProgress(100);
      setPhase("done");
      return;
    }
    setPhase("running");
    setProgress(0);
    const t0 = performance.now();
    const D = 6800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / D);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(eased * 100);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf.current = requestAnimationFrame(tick);
  }, [reduced]);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const t = setTimeout(run, 800);
      return () => {
        clearTimeout(t);
        started.current = false;
      };
    }
  }, [inView, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const done = phase === "done";
  const running = phase === "running";
  const pct = Math.round(progress);
  const fileCount = Math.round((3412 * progress) / 100);
  const C = 2 * Math.PI * 52;
  const speed = running ? Math.round(41 + Math.sin(progress / 6) * 9) : 0;

  return (
    <div ref={ref} className="relative">
      {/* halo */}
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(217,163,43,0.22),transparent)] blur-2xl" aria-hidden="true" />

      <div className="relative rounded-2xl border border-gold-400/15 bg-ink-850/90 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* chrome */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rosea/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-jade/80" />
          </div>
          <p className="text-[11px] font-semibold tracking-wide text-dune">GoldBar Backup — Home</p>
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
              done ? "bg-jade/15 text-jade" : "bg-gold-400/15 text-gold-300"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", done ? "bg-jade pulse-dot" : "bg-gold-400")} />
            {done ? "Protected" : running ? "Backing up" : "Ready"}
          </span>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-6">
          {/* progress ring */}
          <div className="flex flex-row items-center gap-5 sm:flex-col sm:gap-3">
            <div className="relative h-[124px] w-[124px]">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="heroRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F9E7B3" />
                    <stop offset="0.55" stopColor="#EDBB45" />
                    <stop offset="1" stopColor="#B07E1A" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#221c11" strokeWidth="9" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={done ? "#34D399" : "url(#heroRing)"}
                  strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {done ? (
                  <CheckIcon className="h-9 w-9 text-jade" />
                ) : (
                  <span className="font-display text-3xl font-medium text-cream tabular-nums">{pct}%</span>
                )}
                <span className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-widest text-dune">
                  {done ? "All safe" : "Backing up"}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-center">
              <p className="text-[12px] font-medium text-sand tabular-nums">
                {fileCount.toLocaleString()} <span className="text-dune">/ 3,412 files</span>
              </p>
              <p className="mt-0.5 text-[11px] text-dune tabular-nums">
                {running ? `${speed} MB/s · encrypted` : done ? "Restore point saved" : "Waiting to start"}
              </p>
            </div>
          </div>

          {/* file rows */}
          <ul className="space-y-1.5" aria-label="Files being protected">
            {FILES.map((f, i) => {
              const start = (i / FILES.length) * 100;
              const end = ((i + 1) / FILES.length) * 100;
              const isDone = progress >= end;
              const isBusy = !isDone && progress >= start && running;
              return (
                <li
                  key={f.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-500",
                    isDone ? "border-jade/15 bg-jade/[0.05]" : isBusy ? "border-gold-400/25 bg-gold-400/[0.06]" : "border-white/5 bg-white/[0.02]"
                  )}
                >
                  <FileTypeIcon kind={f.kind} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-cream">{f.name}</p>
                    <p className="text-[10.5px] text-dune">{f.size}</p>
                  </div>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[10.5px] font-semibold text-jade">
                      <CheckIcon className="h-3.5 w-3.5" /> Protected
                    </span>
                  ) : isBusy ? (
                    <span className="spin-slow h-3.5 w-3.5 rounded-full border-[1.5px] border-gold-400/30 border-t-gold-300" aria-label="Backing up" />
                  ) : (
                    <span className="text-[10.5px] text-dune">Queued</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* storage bar */}
        <div className="border-t border-white/5 px-5 py-4 sm:px-6">
          <div className="mb-2 flex items-center justify-between text-[10.5px] font-medium">
            <span className="text-dune">Vault storage · 5.4 GB of 2 TB</span>
            <span className="text-gold-300 tabular-nums">{pct}% secured</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-ink-700">
            <div
              className="absolute inset-0 flex"
              style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
            >
              {SEGMENTS.map((s) => (
                <span key={s.label} className={cn("h-full", s.color)} style={{ width: `${s.pct}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
            {SEGMENTS.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-[10px] text-dune">
                <span className={cn("h-1.5 w-1.5 rounded-full", s.color)} /> {s.label} {s.pct}%
              </span>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 sm:px-6">
          <p className="text-[10.5px] text-dune">Next auto-backup · tonight, 2:00 AM</p>
          {done && (
            <button
              type="button"
              onClick={run}
              className="pop-in flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-400/25 px-3 py-1.5 text-[10.5px] font-semibold text-gold-300 transition-colors hover:bg-gold-400/10"
            >
              <RefreshIcon className="h-3 w-3" /> Run again
            </button>
          )}
        </div>
      </div>

      {/* floating cards */}
      <div className="floaty absolute -right-3 -top-6 hidden sm:block lg:-right-8" aria-hidden="true">
        <div className={cn("glass flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-2xl", done && "pop-in")}>
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", done ? "bg-jade/20 text-jade" : "bg-gold-400/20 text-gold-300")}>
            {done ? <CheckIcon className="h-4 w-4" /> : <LockIcon className="h-4 w-4" />}
          </span>
          <span>
            <span className="block text-[12px] font-semibold text-cream">
              {done ? "Restore point created" : "Encrypting on the fly"}
            </span>
            <span className="block text-[10px] text-dune">{done ? "Just now · one click to undo anything" : "AES-256 · before it leaves your Mac"}</span>
          </span>
        </div>
      </div>
      <div className="floaty-slow absolute -bottom-6 -left-3 hidden sm:block lg:-left-10" aria-hidden="true">
        <div className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-2xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jade/20 text-jade">
            <CheckIcon className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[12px] font-semibold text-cream">3 computers, 1 vault</span>
            <span className="block text-[10px] text-dune">Windows · macOS · external drives</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* ambient field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-a absolute -top-40 left-1/2 h-[560px] w-[820px] -translate-x-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(217,163,43,0.2),transparent)] blur-3xl" />
        <div className="aurora-b absolute -top-24 right-[-180px] h-[480px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(176,126,26,0.16),transparent)] blur-3xl" />
        <div className="aurora-a absolute bottom-[-220px] left-[-160px] h-[460px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(20,80,70,0.22),transparent)] blur-3xl" />
        {/* vault grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(237,187,69,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,187,69,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black, transparent)",
          }}
        />
      </div>

      <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <Reveal delay={0}>
            <a
              href="#products"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gold-400/25 bg-gold-400/[0.07] py-1.5 pl-2 pr-4 text-[12px] font-medium text-gold-200 backdrop-blur-sm transition-colors hover:border-gold-400/50"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-jade/15 px-2.5 py-0.5 text-[10px] font-bold text-jade">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-jade" /> NEW
              </span>
              Suite 4.0 — one-click restore is here
              <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-7 font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-[4.4rem]">
              Your files,
              <br />
              <em className="text-gold-grad font-medium italic">safe as gold.</em>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-sand">
              GoldBar backs up, recovers, and organizes everything on your computer — automatically.
              No jargon. No 60-page manuals. Just <span className="font-semibold text-cream">one golden button</span> and
              the quiet certainty that nothing is ever lost.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <GoldButton onClick={onDownload} className="px-8 py-4 text-[15px]">
                Get GoldBar free <ArrowRightIcon className="h-4 w-4" />
              </GoldButton>
              <GhostButton href="#products" className="px-8 py-4 text-[15px]">
                <PlayIcon className="h-4 w-4 text-gold-400" /> See it in action
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12.5px] text-dune">
              <span className="flex items-center gap-2">
                <Stars />
                <span className="font-semibold text-cream">4.9</span> · 12,400+ reviews
              </span>
              <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <WindowsIcon className="h-3.5 w-3.5 text-sand" />
                <AppleIcon className="h-4 w-4 text-sand" />
                Windows & macOS
              </span>
              <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-3.5 w-3.5 text-jade" /> Free 5 GB forever
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} y={44}>
          <HeroWindow />
        </Reveal>
      </div>
    </section>
  );
}