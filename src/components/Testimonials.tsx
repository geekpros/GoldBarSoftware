import { cn } from "../utils/cn";
import { CheckIcon } from "./Icons";
import { Reveal, SectionTag, Stars } from "./ui";

const QUOTES = [
  {
    quote: "A card corrupted mid-shoot with 1,400 photos on it. Rescue brought back every single one before the couple left for their honeymoon. I nearly cried.",
    name: "Maya Reynolds",
    role: "Wedding photographer",
    initials: "MR",
    hue: "from-violeta/70 to-violeta/30",
  },
  {
    quote: "A client overwrote a year of spreadsheets. I slid back to Tuesday's version in one click. They think I'm a wizard. I've decided not to correct them.",
    name: "Daniel Okafor",
    role: "Accountant",
    initials: "DO",
    hue: "from-azure/70 to-azure/30",
  },
  {
    quote: "My thesis laptop died 11 days before submission. New laptop, installed GoldBar, everything back in 20 minutes. My advisor still doesn't know.",
    name: "Priya Sharma",
    role: "Graduate researcher",
    initials: "PS",
    hue: "from-jade/70 to-jade/30",
  },
  {
    quote: "We're not “computer people.” The golden button made us computer people. Fifteen years of family photos, finally safe.",
    name: "Tom & Elise Weber",
    role: "Parents of three",
    initials: "TW",
    hue: "from-gold-400/80 to-gold-600/40",
  },
  {
    quote: "I move 4TB of footage a week and GoldBar just… keeps up. No spinners, no slowdowns, no nonsense. The first backup app I've never uninstalled.",
    name: "Marcus Lee",
    role: "Video editor",
    initials: "ML",
    hue: "from-rosea/70 to-rosea/30",
  },
  {
    quote: "I've bought four backup programs in ten years and understood none of them. GoldBar is the first one that speaks English.",
    name: "Janet Whitfield",
    role: "Retired teacher",
    initials: "JW",
    hue: "from-sand/70 to-sand/30",
  },
];

function QuoteCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <figure className="glass w-[320px] shrink-0 rounded-2xl p-6 transition-colors duration-300 hover:border-gold-400/35 sm:w-[380px]">
      <Stars />
      <blockquote className="mt-4 text-[14px] leading-relaxed text-sand">“{q.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-bold text-ink-950 ring-2 ring-gold-400/30", q.hue)}>
          {q.initials}
        </span>
        <span>
          <span className="block text-[13px] font-semibold text-cream">{q.name}</span>
          <span className="block text-[11px] text-dune">{q.role}</span>
        </span>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-jade">
          <CheckIcon className="h-3 w-3" /> Verified
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section aria-label="Testimonials" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-b absolute right-[-160px] top-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(217,163,43,0.08),transparent)] blur-3xl" />
      </div>
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><SectionTag className="justify-center">Love letters</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              People <em className="text-gold-grad italic">sleep better</em> with GoldBar.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 flex items-center justify-center gap-2.5 text-[14px] text-sand">
              <Stars /> 4.9 average from 12,400+ verified reviews
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={250}>
        <div
          className="marquee relative mt-14 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max gap-5 pr-5">
            {QUOTES.map((q) => <QuoteCard key={q.name} q={q} />)}
            {QUOTES.map((q) => (
              <div key={`${q.name}-dup`} aria-hidden="true">
                <QuoteCard q={q} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="wrap">
        <Reveal delay={150}>
          <p className="mt-12 text-center text-[12.5px] text-dune">
            30-day money-back guarantee · Cancel anytime · Your files stay yours, forever
          </p>
        </Reveal>
      </div>
    </section>
  );
}