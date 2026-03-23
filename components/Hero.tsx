"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroDashboardPreview = dynamic(
  () => import("@/components/HeroDashboardPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-neutral-50 animate-pulse rounded-lg" />
    ),
  }
);

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

// Marker highlight — absolutely positioned swatch behind the text
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline whitespace-nowrap">
      <span
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: "0.05em -0.12em",
          backgroundColor: "rgba(100, 190, 255, 0.28)",
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white pt-6 overflow-hidden" id="home">
      <div className="max-w-[90rem] mx-auto px-6 pt-[136px] pb-24 md:pt-[220px] md:pb-12">
        {/* Full-width headline */}
        <h1
          className="font-bold text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(24px, 3.5vw, 80px)" }}
          aria-label="Most businesses run on manual work that technology solved years ago. We build AI + automation that finally fixes it — for good."
        >
          <motion.span {...fadeUp(0.34)} className="block">
            The <Highlight>AI & Automation</Highlight> Agency
          </motion.span>
          <motion.span {...fadeUp(0.46)} className="block">
            that saves you time.
          </motion.span>
        </h1>

        {/* Supporting copy + CTAs */}
        <div className="flex flex-col gap-10">
          <motion.p
            {...fadeUp(0.6)}
            className="text-[#0a0a0a]/50 leading-relaxed max-w-3xl"
            style={{ fontSize: "clamp(18px, 1.2vw, 24px)" }}
          >
            Stop spending time on things AI can do. Take your hours back.
          </motion.p>

          <motion.div
            {...fadeUp(0.68)}
            className="flex flex-col gap-3 w-full sm:w-64"
          >
            {/* <ArrowButton
              href="https://cal.com/djwooster/intro-call"
              external
              className="h-12 px-7 text-sm"
            >
              See if we&apos;re a fit
            </ArrowButton> */}
          </motion.div>
        </div>
      </div>

      {/* Hero dashboard preview — hidden on mobile */}
      <motion.div
        {...fadeUp(0.8)}
        className="hidden md:block w-full max-w-[90rem] mx-auto px-6 pb-16"
      >
        {/* Eyebrow */}
        <p className="text-xs font-medium text-[#0a0a0a]/40 mb-3 tracking-wide">
          ✦ This is interactive — click around and picture it as your own dashboard
        </p>

        {/* Clip to preview height */}
        <div className="w-full overflow-hidden bg-white border border-neutral-200 rounded-lg" style={{ height: "90vh" }}>
          <HeroDashboardPreview />
        </div>
      </motion.div>
    </section>
  );
}
