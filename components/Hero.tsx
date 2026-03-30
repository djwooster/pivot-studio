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
    <section className="relative bg-white pt-6" style={{ overflowX: "clip" }} id="home">
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 pt-[136px] pb-0 md:pt-[220px] md:pb-0">
        {/* Full-width headline */}
        <h1
          className="font-semibold text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(24px, 3vw, 80px)" }}
          aria-label="The AI & Automation Agency that saves you time, recaptures revenue, and removes headaches."
        >
          <motion.span {...fadeUp(0.34)} className="block">
            We build dashboards and automations
          </motion.span>
          <motion.span {...fadeUp(0.46)} className="block">
            that drive your growth.
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.6)}
          className="text-[#0a0a0a]/50 leading-relaxed max-w-3xl"
          style={{ fontSize: "clamp(18px, 1.2vw, 24px)" }}
        >
          Stop spending time on things AI can do. Take your hours back.
        </motion.p>
      </div>

      {/* ROI dashboard image */}
      <motion.div {...fadeUp(0.8)} className="w-full pt-20 pb-16">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="relative w-[90vw] border-t border-l border-r border-black/15 overflow-hidden max-h-[220px] sm:max-h-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/roi-dashboard.png" alt="ROI Dashboard" className="block h-auto max-w-none w-[220%] sm:w-full" />
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: "40%", background: "linear-gradient(to bottom, transparent, white)" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
