import { useState } from "react";
import { cn } from "../utils/cn";
import { CheckIcon, ShieldIcon } from "./Icons";
import { GhostButton, GoldButton, Reveal, SectionTag } from "./ui";

const PLANS = [
  {
    name: "Free",
    tagline: "For dipping a toe in",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    popular: false,
    features: [
      "5 GB encrypted vault",
      "1 computer",
      "All three tools included",
      "7-day version history",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For files worth keeping",
    monthly: 6,
    yearly: 4,
    cta: "Go Pro",
    popular: true,
    features: [
      "200 GB encrypted vault",
      "3 computers",
      "1-year version history",
      "Unlimited Rescue restores",
      "Ransomware shield",
      "Priority support",
    ],
  },
  {
    name: "Family",
    tagline: "For the whole household",
    monthly: 12,
    yearly: 8,
    cta: "Bring the family",
    popular: false,
    features: [
      "2 TB shared vault",
      "6 computers · 5 people",
      "Everything in Pro",
      "Shared family folders",
      "Phone support for the relatives",
    ],
  },
];

export default function Pricing({ onDownload }: { onDownload: (plan: string) => void }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-a absolute left-1/2 top-1/3 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,163,43,0.1),transparent)] blur-3xl" />
      </div>
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><SectionTag className="justify-center">Pricing</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              Peace of mind, <em className="text-gold-grad italic">priced like a coffee.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16px] leading-relaxed text-sand">
              Start free forever. Upgrade only when your vault grows. Every paid plan carries a
              30-day, no-questions money-back guarantee.
            </p>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <div className="mt-10 flex justify-center">
            <div className="glass relative flex rounded-full p-1" role="group" aria-label="Billing period">
              <button
                type="button"
                onClick={() => setYearly(false)}
                aria-pressed={!yearly}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                  !yearly ? "gold-field text-[#241a04] shadow" : "text-sand hover:text-cream"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                aria-pressed={yearly}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                  yearly ? "gold-field text-[#241a04] shadow" : "text-sand hover:text-cream"
                )}
              >
                Yearly
                <span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-bold", yearly ? "bg-[#241a04]/15 text-[#241a04]" : "bg-jade/15 text-jade")}>
                  SAVE 33%
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            const inner = (
              <div className={cn("flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-ink-850 p-8", p.popular && "bg-ink-800")}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-cream">{p.name}</h3>
                  {p.popular && (
                    <span className="rounded-full gold-field px-3 py-1 text-[9.5px] font-bold uppercase tracking-widest text-[#241a04]">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[12.5px] text-dune">{p.tagline}</p>
                <div className="mt-6 flex items-end gap-1.5">
                  <span key={`${p.name}-${yearly}`} className="pop-in font-display text-5xl font-medium text-cream tabular-nums">
                    ${price}
                  </span>
                  <span className="pb-1.5 text-[13px] text-dune">/ month</span>
                </div>
                <p className="mt-1.5 h-4 text-[11.5px] text-dune">
                  {price === 0 ? "Free forever. Really." : yearly ? `Billed $${price * 12} once a year` : "Billed monthly, cancel anytime"}
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-sand">
                      <CheckIcon className={cn("mt-0.5 h-4 w-4 shrink-0", p.popular ? "text-gold-400" : "text-jade")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {p.popular ? (
                    <GoldButton onClick={() => onDownload(p.name)} className="w-full">{p.cta}</GoldButton>
                  ) : (
                    <GhostButton onClick={() => onDownload(p.name)} className="w-full">{p.cta}</GhostButton>
                  )}
                </div>
              </div>
            );
            return (
              <Reveal key={p.name} delay={i * 120} className={cn(p.popular && "lg:-my-3")}>
                {p.popular ? (
                  <div className="gold-field h-full rounded-3xl p-[1.5px] shadow-[0_30px_80px_-25px_rgba(217,163,43,0.45)] transition-transform duration-500 hover:-translate-y-1.5">
                    {inner}
                  </div>
                ) : (
                  <div className="h-full rounded-3xl border border-white/[0.08] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/25">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 text-[12.5px] text-dune sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2"><ShieldIcon className="h-4 w-4 text-gold-400" /> 30-day money-back guarantee</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-jade" /> Cancel in one click</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-jade" /> Keep your files even if you leave</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}