import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { LogoMark, MenuIcon, XIcon } from "./Icons";
import { GoldButton } from "./ui";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "products", label: "Products" },
  { id: "why-goldbar", label: "Why GoldBar" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar({ onDownload }: { onDownload: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ink-900/80 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "bg-transparent"
      )}
    >
      <div className={cn("hairline absolute inset-x-0 bottom-0 transition-opacity duration-500", scrolled ? "opacity-100" : "opacity-0")} />
      <div className="wrap flex h-[72px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="GoldBar Software — back to top">
          <LogoMark className="transition-transform duration-500 group-hover:rotate-[-6deg]" />
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight text-cream">
              Gold<span className="text-gold-grad">Bar</span>
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.34em] text-dune">Software</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                "relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                active === l.id ? "text-gold-300" : "text-sand hover:text-cream"
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-opacity duration-300",
                  active === l.id ? "opacity-100" : "opacity-0"
                )}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#pricing" className="hidden text-[13.5px] font-medium text-sand transition-colors hover:text-cream md:block">
            Sign in
          </a>
          <GoldButton onClick={onDownload} className="hidden px-5 py-2.5 text-[13px] sm:inline-flex">
            Download free
          </GoldButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold-400/20 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="wrap flex flex-col gap-1 border-t border-gold-400/10 py-4" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                active === l.id ? "bg-gold-400/10 text-gold-300" : "text-sand hover:bg-white/5 hover:text-cream"
              )}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </a>
          ))}
          <GoldButton
            onClick={() => {
              setOpen(false);
              onDownload();
            }}
            className="mt-2 w-full"
          >
            Download free
          </GoldButton>
        </nav>
      </div>
    </header>
  );
}