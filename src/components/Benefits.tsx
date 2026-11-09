import { CheckIcon, LockIcon, ShieldIcon, XIcon } from "./Icons";
import { GlowCard, Reveal, SectionTag } from "./ui";
import VaultBar from "./VaultBar";

const STEPS = [
  {
    n: "01",
    title: "Plug it in",
    copy: "Download GoldBar and you're protecting files in under two minutes. No account required to start, no credit card, no configuration wizard from 2009.",
  },
  {
    n: "02",
    title: "Pick what matters",
    copy: "Or don't — smart defaults already cover Documents, Photos, and Desktop. Want the whole machine? That's the golden button.",
  },
  {
    n: "03",
    title: "Live your life",
    copy: "GoldBar works silently in the background and sends one friendly note a week: “Everything's safe.” That's the entire relationship.",
  },
];

const COMPARISON: { label: string; gold: string; them: string }[] = [
  { label: "Setup time", gold: "2 minutes", them: "45+ minutes" },
  { label: "Manual required", gold: "Never", them: "60-page PDF" },
  { label: "Restoring a file", gold: "1 click", them: "7 steps" },
  { label: "Jargon level", gold: "Zero", them: "RAID, VSS, dedupe…" },
  { label: "Ransomware shield", gold: "Built in", them: "Paid add-on" },
  { label: "Price", gold: "Free – $8/mo", them: "$60+ per year" },
];

export default function Benefits() {
  return (
    <section id="why-goldbar" className="relative py-24 lg:py-32">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><SectionTag>Why GoldBar</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              Powerful where it counts. <em className="text-gold-grad italic">Invisible everywhere else.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[16px] leading-relaxed text-sand">
              Most backup software was designed for IT departments. GoldBar was designed for humans —
              with the same serious engineering underneath.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* sticky vault visual */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <figure className="relative overflow-hidden rounded-3xl border border-gold-400/15 bg-ink-950">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,163,43,0.12),transparent_65%)]" aria-hidden="true" />
                <VaultBar />
                <div className="floaty absolute left-5 top-5">
                  <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold text-gold-200">
                    <LockIcon className="h-3.5 w-3.5" /> AES-256 sealed
                  </span>
                </div>
                <div className="floaty-slow absolute bottom-5 right-5">
                  <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold text-jade">
                    <CheckIcon className="h-3.5 w-3.5" /> Zero-knowledge
                  </span>
                </div>
              </figure>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 text-[13.5px] leading-relaxed text-dune">
                <span className="font-semibold text-cream">The GoldBar Vault.</span> Every file is encrypted on your
                machine before it goes anywhere. Not even we hold the keys.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["SOC 2 Type II", "GDPR ready", "Independently audited"].map((b) => (
                  <span key={b} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10.5px] font-semibold text-sand">
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* steps */}
          <ol className="relative space-y-12">
            <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-gold-500/50 via-gold-700/30 to-transparent" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 120} className="relative flex gap-6">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-400/30 bg-ink-850 font-display text-lg font-semibold text-gold-grad shadow-[0_0_30px_-8px_rgba(217,163,43,0.5)]">
                  {s.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-2xl font-medium text-cream">{s.title}</h3>
                  <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-sand">{s.copy}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={360} className="relative flex gap-6">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gold-field shadow-[0_0_35px_-6px_rgba(217,163,43,0.7)]">
                <ShieldIcon className="h-6 w-6 text-[#241a04]" />
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-2xl font-medium text-gold-grad">That's the whole manual.</h3>
                <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-sand">
                  Really. If you can make toast, you can run GoldBar.
                </p>
              </div>
            </Reveal>
          </ol>
        </div>

        {/* comparison */}
        <Reveal delay={100}>
          <GlowCard className="mt-20 rounded-3xl border border-white/[0.07] bg-ink-850/70 p-7 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">The honest comparison</h3>
              <p className="text-[12px] text-dune">Based on the five best-selling backup tools of 2025</p>
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[540px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/8 text-[11px] uppercase tracking-[0.18em]">
                    <th scope="col" className="pb-3.5 pr-4 font-semibold text-dune"> </th>
                    <th scope="col" className="pb-3.5 pr-4 font-bold text-gold-300">GoldBar</th>
                    <th scope="col" className="pb-3.5 font-semibold text-dune">Typical backup tools</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-gold-400/[0.03]">
                      <th scope="row" className="py-4 pr-4 text-[13.5px] font-medium text-sand">{row.label}</th>
                      <td className="py-4 pr-4">
                        <span className="flex items-center gap-2 text-[13.5px] font-semibold text-cream">
                          <CheckIcon className="h-4 w-4 shrink-0 text-jade" /> {row.gold}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="flex items-center gap-2 text-[13.5px] text-dune">
                          <XIcon className="h-3.5 w-3.5 shrink-0 text-rosea/70" /> {row.them}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}