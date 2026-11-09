import { Counter, Reveal } from "./ui";

const PRESS = [
  { name: "ByteReview", cls: "font-bold tracking-tight" },
  { name: "AppDaily", cls: "font-display italic text-[1.35em]" },
  { name: "STACKPOST", cls: "font-semibold uppercase tracking-[0.3em] text-[0.8em]" },
  { name: "TechSignal", cls: "font-bold tracking-tighter" },
  { name: "Downloadly", cls: "font-medium tracking-wide" },
];

export default function SocialProof() {
  return (
    <section aria-label="Social proof" className="relative py-14 sm:py-16">
      <div className="wrap">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-dune">
            Loved by reviewers. Trusted by 2.4 million careful people.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {PRESS.map((p) => (
              <span
                key={p.name}
                className={`select-none text-lg text-dune/80 transition-colors duration-300 hover:text-gold-300 ${p.cls}`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="hairline mt-12" aria-hidden="true" />

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          <Reveal delay={0}><Counter value={2.4} decimals={1} suffix="M+" label="People protected worldwide" /></Reveal>
          <Reveal delay={100}><Counter value={18} suffix="B" label="Files resting in the vault" /></Reveal>
          <Reveal delay={200}><Counter value={99.98} decimals={2} suffix="%" label="Restore success rate" /></Reveal>
          <Reveal delay={300}><Counter value={4.9} decimals={1} suffix="/5" label="Average customer rating" /></Reveal>
        </div>
      </div>
    </section>
  );
}