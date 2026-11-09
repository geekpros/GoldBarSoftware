import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useReducedMotion } from "../hooks";
import {
  CheckIcon, ChevronDownIcon, FileTypeIcon, FolderIcon, RefreshIcon,
  SearchIcon, ShieldIcon, SparklesIcon, UndoIcon, ZapIcon, type FileKind,
} from "./Icons";
import { GoldButton, Reveal, SectionTag } from "./ui";

/* ================= shared shell ================= */

function DemoShell({ title, badge, children }: { title: string; badge: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(217,163,43,0.14),transparent)] blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-gold-400/15 bg-ink-850/95 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rosea/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-jade/80" />
          </div>
          <p className="text-[11px] font-semibold tracking-wide text-dune">{title}</p>
          {badge}
        </div>
        {children}
      </div>
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300",
        on ? "gold-field" : "bg-ink-600"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-cream shadow transition-all duration-300",
          on ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

/* ================= 1 · Backup settings ================= */

function BackupDemo() {
  const [continuous, setContinuous] = useState(true);
  const [schedule, setSchedule] = useState("realtime");
  const [retention, setRetention] = useState(90);
  const [sleep, setSleep] = useState(true);
  const [tick, setTick] = useState(0);
  const touch = () => setTick((t) => t + 1);
  const fill = ((retention - 7) / (365 - 7)) * 100;

  const scheduleLabel: Record<string, string> = {
    realtime: "the moment anything changes",
    hourly: "every hour, on the hour",
    nightly: "tonight at 2:00 AM",
    weekly: "Sunday at 3:00 AM",
  };

  return (
    <DemoShell
      title="GoldBar Backup — Settings"
      badge={
        <span key={tick} className="pop-in flex items-center gap-1 rounded-full bg-jade/15 px-2.5 py-1 text-[10px] font-semibold text-jade">
          <CheckIcon className="h-3 w-3" /> Saved
        </span>
      }
    >
      <div className="divide-y divide-white/5">
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[13px] font-semibold text-cream">Continuous protection</p>
            <p className="mt-0.5 text-[11px] text-dune">Copies every change the moment it happens</p>
          </div>
          <Toggle on={continuous} onChange={(v) => { setContinuous(v); touch(); }} label="Continuous protection" />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[13px] font-semibold text-cream">Backup schedule</p>
            <p className="mt-0.5 text-[11px] text-dune">When GoldBar checks for new files</p>
          </div>
          <div className="relative">
            <select
              value={schedule}
              onChange={(e) => { setSchedule(e.target.value); touch(); }}
              disabled={continuous}
              aria-label="Backup schedule"
              className="cursor-pointer appearance-none rounded-lg border border-gold-400/20 bg-ink-700 py-2 pl-3 pr-8 text-[12px] font-medium text-cream outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Every hour</option>
              <option value="nightly">Nightly · 2 AM</option>
              <option value="weekly">Weekly · Sunday</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dune" />
          </div>
        </div>

        <div className="px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-cream">Keep version history</p>
              <p className="mt-0.5 text-[11px] text-dune">Travel back to any earlier version of a file</p>
            </div>
            <span className="rounded-lg bg-gold-400/10 px-2.5 py-1 text-[12px] font-bold text-gold-300 tabular-nums">{retention} days</span>
          </div>
          <input
            type="range"
            min={7}
            max={365}
            value={retention}
            onChange={(e) => { setRetention(Number(e.target.value)); touch(); }}
            className="gold-range mt-4 w-full cursor-pointer"
            style={{ "--fill": `${fill}%` } as React.CSSProperties}
            aria-label="Days of version history"
          />
          <div className="mt-1.5 flex justify-between text-[10px] text-dune"><span>1 week</span><span>1 year</span></div>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[13px] font-semibold text-cream">Back up while I sleep</p>
            <p className="mt-0.5 text-[11px] text-dune">Uses idle hours so you never feel a thing</p>
          </div>
          <Toggle on={sleep} onChange={(v) => { setSleep(v); touch(); }} label="Back up while I sleep" />
        </div>
      </div>

      <div className="border-t border-white/5 bg-ink-900/60 px-5 py-3.5 sm:px-6">
        <p className="text-[11.5px] text-sand">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-jade align-middle pulse-dot" aria-hidden="true" />
          {continuous ? "Protecting in real time" : `Next backup ${scheduleLabel[schedule]}`} · versions kept {retention} days{sleep ? " · quiet overnight runs" : ""}
        </p>
      </div>
    </DemoShell>
  );
}

/* ================= 2 · Rescue ================= */

const LOST: { name: string; kind: FileKind; meta: string; size: string }[] = [
  { name: "IMG_2941.HEIC", kind: "photo", meta: "Deleted 2 days ago", size: "4.2 MB" },
  { name: "Portugal 2024 — album", kind: "photo", meta: "Deleted 5 days ago", size: "1.8 GB" },
  { name: "Resume_final_v3.docx", kind: "doc", meta: "Deleted last week", size: "88 KB" },
  { name: "Thesis draft.pdf", kind: "doc", meta: "Deleted last week", size: "2.4 MB" },
  { name: "Band demo mix.mp3", kind: "audio", meta: "Deleted 3 weeks ago", size: "9.1 MB" },
];

function RescueDemo() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "scanning" | "found" | "restoring" | "restored">("idle");
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const raf = useRef(0);
  const timer = useRef(0);

  useEffect(() => () => { cancelAnimationFrame(raf.current); clearTimeout(timer.current); }, []);

  const scan = () => {
    setPhase("scanning");
    setProgress(0);
    setSelected([]);
    if (reduced) {
      setProgress(100);
      setPhase("found");
      setSelected(LOST.map((_, i) => i));
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 2600);
      setProgress(p * 100);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else {
        setPhase("found");
        setSelected(LOST.map((_, i) => i));
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  const restore = () => {
    if (selected.length === 0) return;
    setPhase("restoring");
    timer.current = window.setTimeout(() => setPhase("restored"), reduced ? 60 : 1000);
  };

  const reset = () => {
    cancelAnimationFrame(raf.current);
    clearTimeout(timer.current);
    setPhase("idle");
    setProgress(0);
    setSelected([]);
  };

  const toggleFile = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  const showList = phase === "found" || phase === "restoring" || phase === "restored";

  return (
    <DemoShell
      title="GoldBar Rescue — Deep Scan"
      badge={
        <span className={cn(
          "rounded-full px-2.5 py-1 text-[10px] font-semibold",
          phase === "restored" ? "bg-jade/15 text-jade" : phase === "scanning" ? "bg-gold-400/15 text-gold-300" : "bg-white/5 text-dune"
        )}>
          {phase === "idle" && "Ready to scan"}
          {phase === "scanning" && "Scanning…"}
          {(phase === "found" || phase === "restoring") && `${LOST.length} files found`}
          {phase === "restored" && "Recovered ✓"}
        </span>
      }
    >
      {/* drive row */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 sm:px-6">
        <div className="relative">
          <select aria-label="Drive to scan" className="cursor-pointer appearance-none rounded-lg border border-gold-400/20 bg-ink-700 py-2 pl-3 pr-8 text-[12px] font-medium text-cream outline-none">
            <option>Macintosh HD · 512 GB</option>
            <option>Backup Drive · 2 TB</option>
            <option>SD Card · 64 GB</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-dune" />
        </div>
        <button
          type="button"
          onClick={phase === "idle" ? scan : reset}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-400/30 px-4 py-2 text-[11.5px] font-semibold text-gold-300 transition-colors hover:bg-gold-400/10"
        >
          {phase === "idle" ? (<><SearchIcon className="h-3.5 w-3.5" /> Deep scan</>) : (<><RefreshIcon className="h-3.5 w-3.5" /> Start over</>)}
        </button>
      </div>

      <div className="relative min-h-[292px] px-5 py-4 sm:px-6">
        {phase === "idle" && (
          <div className="flex h-[260px] flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-300">
              <SearchIcon className="h-6 w-6" />
            </span>
            <p className="mt-4 text-[14px] font-semibold text-cream">Emptied the Trash? Not a problem.</p>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-dune">
              Run a deep scan to see exactly what can be brought back — before you pay a cent.
            </p>
            <button type="button" onClick={scan} className="btn-shine gold-field mt-5 cursor-pointer rounded-full px-6 py-2.5 text-[12.5px] font-bold text-[#241a04] transition-transform hover:scale-105 active:scale-95">
              Scan this drive
            </button>
          </div>
        )}

        {phase === "scanning" && (
          <div className="relative overflow-hidden rounded-xl">
            <span className="scanline absolute left-0 h-10 w-full bg-gradient-to-b from-transparent via-gold-400/15 to-transparent" aria-hidden="true" />
            <div className="space-y-2.5 pt-1">
              {LOST.map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                  <span className="h-8 w-8 animate-pulse rounded-lg bg-ink-600" />
                  <span className="h-3 animate-pulse rounded bg-ink-600" style={{ width: `${55 - i * 6}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
                <div className="gold-field h-full rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-dune tabular-nums">
                Scanning sector {Math.round(progress * 983).toLocaleString()} of 98,304 · {Math.round(progress)}%
              </p>
            </div>
          </div>
        )}

        {showList && (
          <ul className="space-y-2" aria-label="Recoverable files">
            {LOST.map((f, i) => {
              const isSel = selected.includes(i);
              const isRestored = phase === "restored" && isSel;
              return (
                <li
                  key={f.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-500",
                    isRestored ? "border-jade/20 bg-jade/[0.06]" : isSel ? "border-gold-400/20 bg-gold-400/[0.05]" : "border-white/5 bg-white/[0.02] opacity-60"
                  )}
                  style={{ transitionDelay: phase === "restored" ? `${i * 90}ms` : "0ms" }}
                >
                  {phase !== "restored" ? (
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isSel}
                      aria-label={`Select ${f.name}`}
                      disabled={phase === "restoring"}
                      onClick={() => toggleFile(i)}
                      className={cn(
                        "flex h-4.5 w-4.5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors disabled:cursor-wait",
                        isSel ? "gold-field border-transparent text-[#241a04]" : "border-dune/50"
                      )}
                    >
                      {isSel && <CheckIcon className="h-3 w-3" />}
                    </button>
                  ) : (
                    <span className={cn("flex h-4.5 w-4.5 shrink-0 items-center justify-center", isRestored ? "text-jade" : "text-dune")}>
                      {isRestored ? <CheckIcon className="h-4 w-4" /> : <span className="h-1 w-1 rounded-full bg-dune" />}
                    </span>
                  )}
                  <FileTypeIcon kind={f.kind} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-cream">{f.name}</p>
                    <p className="text-[10.5px] text-dune">{f.meta} · {f.size}</p>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-bold", isRestored ? "bg-jade/15 text-jade" : "bg-jade/10 text-jade/90")}>
                    {isRestored ? "Restored ✓" : "Excellent"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-white/5 bg-ink-900/60 px-5 py-3.5 sm:px-6" aria-live="polite">
        {phase === "restored" ? (
          <p className="pop-in flex items-center gap-2 text-[12px] font-semibold text-jade">
            <CheckIcon className="h-4 w-4" /> {selected.length} file{selected.length !== 1 && "s"} back exactly where {selected.length !== 1 ? "they" : "it"} belonged.
          </p>
        ) : showList ? (
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11.5px] text-sand tabular-nums">{selected.length} of {LOST.length} selected · 2.1 GB</p>
            <button
              type="button"
              onClick={restore}
              disabled={selected.length === 0 || phase === "restoring"}
              className="btn-shine gold-field flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-[11.5px] font-bold text-[#241a04] transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {phase === "restoring" ? (<><span className="spin-slow h-3 w-3 rounded-full border-[1.5px] border-[#241a04]/30 border-t-[#241a04]" /> Restoring…</>) : (<>Restore {selected.length} file{selected.length !== 1 ? "s" : ""}</>)}
            </button>
          </div>
        ) : (
          <p className="text-[11.5px] text-dune">Free preview · restore from $4/mo · 98.7% average recovery rate</p>
        )}
      </div>
    </DemoShell>
  );
}

/* ================= 3 · Tidy ================= */

const MESS: { name: string; kind: FileKind; folder: string }[] = [
  { name: "IMG_2941.HEIC", kind: "photo", folder: "Photos" },
  { name: "invoice_FINAL_v3.pdf", kind: "doc", folder: "Documents" },
  { name: "Screen recording 11-02.mov", kind: "video", folder: "Videos" },
  { name: "band_practice_take2.mp3", kind: "audio", folder: "Music" },
  { name: "taxes_2024.zip", kind: "zip", folder: "Archives" },
  { name: "beach_2024_best.jpg", kind: "photo", folder: "Photos" },
  { name: "Meeting notes(2).docx", kind: "doc", folder: "Documents" },
  { name: "podcast_ep12.mp3", kind: "audio", folder: "Music" },
];

const FOLDERS = [
  { name: "Photos", cls: "border-violeta/30 bg-violeta/10 text-violeta" },
  { name: "Documents", cls: "border-azure/30 bg-azure/10 text-azure" },
  { name: "Videos", cls: "border-rosea/30 bg-rosea/10 text-rosea" },
  { name: "Music", cls: "border-gold-400/30 bg-gold-400/10 text-gold-300" },
  { name: "Archives", cls: "border-sand/30 bg-sand/10 text-sand" },
];

function TidyDemo() {
  const reduced = useReducedMotion();
  const [moved, setMoved] = useState(0);
  const interval = useRef(0);
  const running = moved > 0 && moved < MESS.length;
  const done = moved === MESS.length;

  useEffect(() => () => clearInterval(interval.current), []);

  const tidy = () => {
    clearInterval(interval.current);
    if (reduced) { setMoved(MESS.length); return; }
    setMoved(1);
    interval.current = window.setInterval(() => {
      setMoved((m) => {
        if (m >= MESS.length) { clearInterval(interval.current); return m; }
        if (m + 1 >= MESS.length) clearInterval(interval.current);
        return m + 1;
      });
    }, 340);
  };

  const undo = () => { clearInterval(interval.current); setMoved(0); };

  return (
    <DemoShell
      title="GoldBar Tidy — Downloads"
      badge={
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold", done ? "bg-jade/15 text-jade" : "bg-rosea/10 text-rosea")}>
          {done ? "Sparkling clean ✨" : `${MESS.length - moved} loose files`}
        </span>
      }
    >
      <div className="grid gap-4 p-5 sm:grid-cols-[1.25fr_1fr] sm:p-6">
        <ul className="space-y-1.5" aria-label="Files in Downloads">
          {MESS.map((f, i) => {
            const isMoved = i < moved;
            return (
              <li
                key={f.name}
                className={cn(
                  "flex h-[42px] items-center gap-2.5 rounded-lg border px-2.5 transition-all duration-500",
                  isMoved ? "border-transparent bg-transparent opacity-45" : "border-white/5 bg-white/[0.02]"
                )}
              >
                {isMoved ? (
                  <>
                    <CheckIcon className="h-4 w-4 shrink-0 text-jade" />
                    <p className="truncate text-[11.5px] text-dune">
                      <span className="line-through decoration-dune/50">{f.name}</span>
                      <span className="ml-1.5 text-jade/80">→ {f.folder}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <FileTypeIcon kind={f.kind} className="h-7 w-7" />
                    <p className="truncate text-[11.5px] font-medium text-cream">{f.name}</p>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-2" aria-label="Smart folders">
          {FOLDERS.map((folder) => {
            const count = MESS.filter((f, i) => f.folder === folder.name && i < moved).length;
            return (
              <div
                key={folder.name}
                className={cn(
                  "flex flex-1 items-center justify-between rounded-xl border px-3.5 py-2 transition-all duration-500",
                  count > 0 ? folder.cls : "border-white/5 bg-white/[0.02] text-dune"
                )}
              >
                <span className="flex items-center gap-2 text-[12px] font-semibold">
                  <FolderIcon className="h-4 w-4" /> {folder.name}
                </span>
                <span key={count} className={cn("min-w-6 rounded-md px-1.5 py-0.5 text-center text-[11px] font-bold tabular-nums", count > 0 ? "pop-in bg-ink-900/50" : "text-dune/60")}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/5 bg-ink-900/60 px-5 py-3.5 sm:px-6">
        {done ? (
          <>
            <p className="pop-in text-[11.5px] font-semibold text-jade">8 files sorted · 0.9 seconds · zero effort</p>
            <button type="button" onClick={undo} className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-400/30 px-4 py-2 text-[11.5px] font-semibold text-gold-300 transition-colors hover:bg-gold-400/10">
              <UndoIcon className="h-3.5 w-3.5" /> Undo
            </button>
          </>
        ) : (
          <>
            <p className="text-[11.5px] text-dune">Rule: “sort by file type” · reversible anytime</p>
            <button
              type="button"
              onClick={tidy}
              disabled={running}
              className="btn-shine gold-field flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-[11.5px] font-bold text-[#241a04] transition-all hover:scale-105 active:scale-95 disabled:cursor-wait disabled:opacity-60"
            >
              {running ? (<><span className="spin-slow h-3 w-3 rounded-full border-[1.5px] border-[#241a04]/30 border-t-[#241a04]" /> Tidying…</>) : (<><SparklesIcon className="h-3.5 w-3.5" /> Tidy up</>)}
            </button>
          </>
        )}
      </div>
    </DemoShell>
  );
}

/* ================= section ================= */

const TABS = [
  {
    id: "backup",
    name: "GoldBar Backup",
    short: "Backup",
    tag: "Never lose a file again",
    icon: ShieldIcon,
    headline: "Set it once. Protected forever.",
    copy: "GoldBar watches your folders and copies every change the moment it happens — to an external drive, another folder, or GoldBar Cloud. You'll forget it's even there. Until the day it saves you.",
    bullets: ["Real-time protection with zero slowdown", "Version history for every file, up to a year", "External drives & NAS — no cloud required"],
    stat: "Average first backup: 4 min 12 s",
  },
  {
    id: "rescue",
    name: "GoldBar Rescue",
    short: "Rescue",
    tag: "Deleted doesn't mean gone",
    icon: RefreshIcon,
    headline: "Get back what you thought was lost.",
    copy: "Emptied the Trash and felt your stomach drop? Rescue deep-scans any drive, shows you exactly what's recoverable, and puts it all back where it belonged — in one click.",
    bullets: ["Recovers photos, documents, video & more", "Preview everything before you restore", "Files return to their original folders"],
    stat: "98.7% of deleted files recovered",
  },
  {
    id: "tidy",
    name: "GoldBar Tidy",
    short: "Tidy",
    tag: "Chaos in, order out",
    icon: SparklesIcon,
    headline: "Your Downloads folder, finally civilized.",
    copy: "One click sorts years of clutter into smart folders. Write rules in plain English — “put screenshots in Photos” — and Tidy handles the rest. Every tidy is reversible.",
    bullets: ["Sorts by type, date, or plain-English rules", "Finds duplicates and reclaims space", "One-click undo for every single tidy"],
    stat: "12,000 files organized per minute",
  },
] as const;

export default function Showcase({ onDownload }: { onDownload: () => void }) {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("backup");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = TABS.find((t) => t.id === active)!;

  const onKeyNav = (e: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    if (next >= 0) {
      e.preventDefault();
      setActive(TABS[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="products" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-a absolute left-[-220px] top-1/3 h-[520px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(176,126,26,0.1),transparent)] blur-3xl" />
      </div>
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><SectionTag className="justify-center">The product tour</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              Three tools. One rule: <em className="text-gold-grad italic">keep it simple.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16px] leading-relaxed text-sand">
              These are live demos, running right here in your browser. Press the buttons —
              this is exactly how the real apps feel.
            </p>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <div role="tablist" aria-label="GoldBar products" className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKeyNav(e, i)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 text-left transition-all duration-300",
                    isActive
                      ? "gold-field border-transparent text-[#241a04] shadow-[0_14px_40px_-12px_rgba(217,163,43,0.6)]"
                      : "glass text-cream hover:border-gold-400/40 hover:-translate-y-0.5"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-[#241a04]" : "text-gold-300")} />
                  <span className="mt-2.5 block text-[14px] font-bold">{t.name}</span>
                  <span className={cn("mt-0.5 block text-[11px] font-medium", isActive ? "text-[#4a3808]" : "text-dune")}>{t.tag}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={active}
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="pop-in mt-14 grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14"
        >
          <div>
            <h3 className="font-display text-3xl font-medium tracking-tight text-cream sm:text-4xl">{current.headline}</h3>
            <p className="mt-5 text-[15.5px] leading-relaxed text-sand">{current.copy}</p>
            <ul className="mt-7 space-y-3.5">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-cream">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-jade/15 text-jade">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/[0.06] px-4 py-2 text-[12px] font-semibold text-gold-300">
              <ZapIcon className="h-3.5 w-3.5" /> {current.stat}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GoldButton onClick={onDownload}>Try {current.short} free</GoldButton>
              <span className="text-[12px] text-dune">All three tools included in every plan</span>
            </div>
          </div>

          <div>
            {active === "backup" && <BackupDemo />}
            {active === "rescue" && <RescueDemo />}
            {active === "tidy" && <TidyDemo />}
          </div>
        </div>
      </div>
    </section>
  );
}