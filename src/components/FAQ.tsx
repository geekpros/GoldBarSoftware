import { useState } from "react";
import { cn } from "../utils/cn";
import { ChevronDownIcon, HeartIcon, MailIcon } from "./Icons";
import { Reveal, SectionTag } from "./ui";

const FAQS = [
  {
    q: "I'm not technical at all. Is GoldBar really for me?",
    a: "Especially for you. GoldBar was designed around one rule: if it needs explaining, we redesign it. Setup takes two minutes, the main screen has one golden button, and every alert is written in plain English. Our most common review is some version of “finally, one I understand.”",
  },
  {
    q: "What's the difference between backup and recovery?",
    a: "Backup (GoldBar Backup) quietly copies your files so a copy always exists. Recovery (GoldBar Rescue) brings files back after they've been deleted, lost, or corrupted — even from the emptied Trash. They work beautifully together, and both are included in every plan.",
  },
  {
    q: "Can I recover files I already deleted, before installing GoldBar?",
    a: "Often, yes. Deleted files usually linger on the drive until they're overwritten. Run Rescue's free deep scan to see exactly what's still recoverable — you only need a paid plan when you decide to restore. The sooner you scan, the better your chances.",
  },
  {
    q: "Where do my backups actually live?",
    a: "Your choice: an external drive, another folder, a NAS, or GoldBar Cloud. Everything is encrypted with AES-256 on your machine before it's stored anywhere, and only you hold the keys. You can mix destinations — the classic advice is one local copy plus one off-site.",
  },
  {
    q: "Is the free plan actually free?",
    a: "Yes — 5 GB, all three tools, forever, no credit card. It's not a trial in disguise. Most people start free and upgrade only when their vault outgrows 5 GB, which is usually around the time they point it at their photo library.",
  },
  {
    q: "Does it work on both Windows and Mac?",
    a: "Both, natively — Windows 10/11 and macOS 12 or later. One license covers your machines, and you can even back up on a PC and restore onto a Mac (or the other way around). External drives formatted for either system are fully supported.",
  },
  {
    q: "What if I want to cancel?",
    a: "One click in settings, no chat with a “retention specialist.” Your existing backups remain readable and restorable forever, even on the free plan. And every paid plan has a 30-day money-back guarantee — no questions, no forms.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><SectionTag>Questions</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
              Asked often, <em className="text-gold-grad italic">answered honestly.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-sand">
              No fine print, no gotchas. If it's not covered here, a real human will answer you — fast.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="glass mt-8 rounded-2xl p-6">
              <p className="flex items-center gap-2.5 text-[14px] font-semibold text-cream">
                <HeartIcon className="h-4 w-4 text-rosea" /> Still curious? Talk to a human.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-sand">
                Our support team answers in about 2 hours — and they're the same people who build the apps.
              </p>
              <a
                href="mailto:hello@goldbar.app"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 px-5 py-2.5 text-[12.5px] font-semibold text-gold-300 transition-all hover:bg-gold-400/10"
              >
                <MailIcon className="h-4 w-4" /> hello@goldbar.app
              </a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div
                  className={cn(
                    "rounded-2xl border transition-all duration-500",
                    isOpen ? "border-gold-400/30 bg-gold-400/[0.05]" : "border-white/[0.07] bg-ink-850/60 hover:border-gold-400/20"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={cn("text-[15px] font-semibold transition-colors", isOpen ? "text-gold-200" : "text-cream")}>
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isOpen ? "rotate-180 border-gold-400/40 bg-gold-400/15 text-gold-300" : "border-white/10 text-dune"
                      )}
                    >
                      <ChevronDownIcon className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={cn("acc-panel", isOpen && "open")}
                  >
                    <div className="acc-inner">
                      <p className="px-6 pb-6 text-[14px] leading-relaxed text-sand">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}