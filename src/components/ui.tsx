import { createElement, useRef } from "react";
import { cn } from "../utils/cn";
import { useCountUp, useInView } from "../hooks";
import { StarIcon } from "./Icons";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 30,
  scale = 1,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "figure";
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    Tag,
    {
      ref,
      className: cn("rv", inView && "rv-in", className),
      style: {
        "--rv-d": `${delay}ms`,
        "--rv-x": `${x}px`,
        "--rv-y": `${y}px`,
        "--rv-s": scale,
      } as React.CSSProperties,
    },
    children
  );
}

/* ---------- Section eyebrow ---------- */
export function SectionTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400", className)}>
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500" aria-hidden="true" />
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500" aria-hidden="true" />
    </p>
  );
}

/* ---------- Buttons ---------- */
export function GoldButton({
  children,
  className,
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "btn-shine gold-field inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-[#241a04]",
        "shadow-[0_10px_35px_-8px_rgba(217,163,43,0.55)] transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_45px_-8px_rgba(217,163,43,0.7)] active:translate-y-0 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const cls = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-400/25 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-cream",
    "backdrop-blur-sm transition-all duration-300 hover:border-gold-400/50 hover:bg-gold-400/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    className
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ---------- Pointer-tracked glow card ---------- */
export function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn("glow-card", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Animated stat counter ---------- */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const display = useCountUp(value, inView, decimals);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-medium text-gold-grad sm:text-5xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-[13px] font-medium tracking-wide text-dune">{label}</p>
    </div>
  );
}

/* ---------- Star row ---------- */
export function Stars({ className, size = "h-3.5 w-3.5" }: { className?: string; size?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold-400", className)} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={size} />
      ))}
    </span>
  );
}