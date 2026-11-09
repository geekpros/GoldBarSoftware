import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import { FinalCTA, Footer } from "./components/Closing";
import DownloadModal, { type Platform } from "./components/DownloadModal";

export default function App() {
  const [modal, setModal] = useState<{ open: boolean; plan: string; platform: Platform }>({
    open: false,
    plan: "Free",
    platform: "windows",
  });

  const openDownload = useCallback((plan = "Free", platform: Platform = "windows") => {
    setModal({ open: true, plan, platform });
  }, []);

  const closeDownload = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  return (
    <div className="relative min-h-screen bg-ink-900 text-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Navbar onDownload={openDownload} />

      <main id="main">
        <Hero onDownload={openDownload} />
        <SocialProof />
        <Features />
        <Showcase onDownload={openDownload} />
        <Benefits />
        <Testimonials />
        <Pricing onDownload={(plan) => openDownload(plan)} />
        <FAQ />
        <FinalCTA onDownload={openDownload} />
      </main>

      <Footer />

      <DownloadModal open={modal.open} plan={modal.plan} platform={modal.platform} onClose={closeDownload} />
    </div>
  );
}