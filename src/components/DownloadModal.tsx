import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { AppleIcon, CheckIcon, LogoMark, MailIcon, WindowsIcon, XIcon } from "./Icons";
import { GoldButton } from "./ui";

export type Platform = "windows" | "macos";

export default function DownloadModal({
  open,
  plan,
  platform,
  onClose,
}: {
  open: boolean;
  plan: string;
  platform: Platform;
  onClose: () => void;
}) {
  const [os, setOs] = useState<Platform>(platform);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [resent, setResent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const resendTimer = useRef(0);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setOs(platform);
      setSent(false);
      setError("");
      setResent(false);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        restoreFocus.current?.focus();
      };
    }
  }, [open, platform, onClose]);

  useEffect(() => () => clearTimeout(resendTimer.current), []);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    setSent(true);
  };

  const resend = () => {
    setResent(true);
    clearTimeout(resendTimer.current);
    resendTimer.current = window.setTimeout(() => setResent(false), 2200);
  };

  const osName = os === "windows" ? "Windows" : "macOS";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-title"
        className="pop-in relative w-full max-w-md rounded-3xl border border-gold-400/25 bg-ink-850 p-8 shadow-[0_50px_120px_-30px_rgba(0,0,0,1)]"
      >
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 text-dune transition-colors hover:border-gold-400/40 hover:text-cream"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {!sent ? (
          <form onSubmit={submit} noValidate className="relative">
            <LogoMark className="h-12 w-12" />
            <h3 id="download-title" className="mt-5 font-display text-3xl font-medium tracking-tight text-cream">
              Get GoldBar <span className="text-gold-grad">{plan}</span>
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-sand">
              {plan === "Free"
                ? "Your installer link is one step away. Free forever, no credit card."
                : `Start with a 14-day ${plan} trial — full features, cancel in one click.`}
            </p>

            <fieldset className="mt-6">
              <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-dune">Choose your platform</legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {(["windows", "macos"] as Platform[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setOs(p)}
                    aria-pressed={os === p}
                    className={cn(
                      "flex cursor-pointer items-center justify-center gap-2 rounded-xl border py-3 text-[13px] font-semibold transition-all duration-300",
                      os === p
                        ? "gold-field border-transparent text-[#241a04] shadow-[0_10px_30px_-10px_rgba(217,163,43,0.6)]"
                        : "border-white/10 bg-white/[0.03] text-sand hover:border-gold-400/35"
                    )}
                  >
                    {p === "windows" ? <WindowsIcon className="h-4 w-4" /> : <AppleIcon className="h-4.5 w-4.5" />}
                    {p === "windows" ? "Windows" : "macOS"}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5">
              <label htmlFor="dl-email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-dune">
                Where should we send it?
              </label>
              <input
                ref={inputRef}
                id="dl-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="you@example.com"
                aria-invalid={!!error}
                aria-describedby={error ? "dl-email-error" : undefined}
                className={cn(
                  "mt-3 w-full rounded-xl border bg-ink-900 px-4 py-3.5 text-[14px] text-cream placeholder:text-dune/50 outline-none transition-colors",
                  error ? "border-rosea/60" : "border-white/10 focus:border-gold-400/50"
                )}
              />
              {error && <p id="dl-email-error" className="mt-2 text-[12px] font-medium text-rosea">{error}</p>}
            </div>

            <GoldButton type="submit" className="mt-6 w-full py-4">
              <MailIcon className="h-4 w-4" /> Email me the {osName} installer
            </GoldButton>
            <p className="mt-4 text-center text-[11px] text-dune">
              2-minute setup · Unsubscribe anytime · We never sell your data
            </p>
          </form>
        ) : (
          <div className="relative text-center">
            <span className="pop-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-jade/15 text-jade shadow-[0_0_45px_-8px_rgba(52,211,153,0.5)]">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h3 id="download-title" className="mt-5 font-display text-3xl font-medium tracking-tight text-cream">
              Check your inbox
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-sand">
              The <span className="font-semibold text-cream">{osName} installer</span> and a 2-minute quick-start
              guide are on their way to <span className="font-semibold text-gold-300">{email}</span>.
            </p>
            <div className="mt-7 flex flex-col gap-2.5">
              <GoldButton onClick={resend} className="w-full">
                {resent ? (<><CheckIcon className="h-4 w-4" /> Sent again</>) : "Resend the link"}
              </GoldButton>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-full border border-white/10 py-3 text-[13px] font-semibold text-sand transition-colors hover:border-gold-400/35 hover:text-cream"
              >
                Done — back to the tour
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 cursor-pointer text-[11.5px] font-medium text-dune underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
            >
              Wrong address? Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}