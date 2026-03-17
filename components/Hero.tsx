"use client";

import { motion } from "framer-motion";

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
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        {/* Label */}
        <motion.p
          {...fadeUp(0)}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6"
        >
          AI &amp; Automation Agency
        </motion.p>

        {/* Full-width headline */}
        <h1
          className="font-extrabold text-[#0a0a0a] leading-[1.35] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(24px, 4vw, 80px)" }}
          aria-label="Most businesses run on manual work that technology solved years ago. We build AI + automation that finally fixes it — for good."
        >
          <motion.span {...fadeUp(0.1)} className="block">
            Most businesses run on manual work
          </motion.span>
          <motion.span {...fadeUp(0.22)} className="block">
            that technology solved years ago.
          </motion.span>
          <motion.span {...fadeUp(0.34)} className="block">
            We build <Highlight>AI</Highlight> +{" "}
            <Highlight>automation</Highlight>
          </motion.span>
          <motion.span {...fadeUp(0.46)} className="block">
            that finally fixes it — for good.
          </motion.span>
        </h1>

        {/* Supporting copy + CTAs */}
        <div className="flex flex-col gap-10">
          <motion.p
            {...fadeUp(0.6)}
            className="text-[#0a0a0a]/50 leading-relaxed max-w-3xl"
            style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
          >
            12+ hours reclaimed per week. ROI in under 60 days and delivered in
            under 30 — without adding headcount.
          </motion.p>

          <motion.div
            {...fadeUp(0.68)}
            className="flex flex-col gap-3 w-full sm:w-64"
          >
            <a
              href="https://cal.com/djwooster/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a]/85 transition-colors duration-200"
            >
              See if we&apos;re a fit
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
