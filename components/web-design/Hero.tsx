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

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline whitespace-nowrap">
      <span
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ inset: "0.05em -0.12em", backgroundColor: "rgba(100, 190, 255, 0.28)" }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export default function WebDesignHero() {
  return (
    <section className="relative bg-white pt-8 overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">

        <motion.p
          {...fadeUp(0)}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-10"
        >
          Web Design
        </motion.p>

        <h1
          className="font-extrabold text-[#0a0a0a] leading-[1.1] tracking-[-0.03em] mb-12"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
          aria-label="Your website should work as hard as you do. We design beautiful, fast sites that make the right first impression — and turn visitors into clients."
        >
          <motion.span {...fadeUp(0.1)} className="block">
            Your website should work
          </motion.span>
          <motion.span {...fadeUp(0.22)} className="block">
            as hard as you do.
          </motion.span>
          <motion.span {...fadeUp(0.34)} className="block text-[#0a0a0a]/25">
            We design <Highlight><span className="text-[#0a0a0a]">beautiful</span></Highlight>,{" "}
            <Highlight><span className="text-[#0a0a0a]">fast</span></Highlight> sites that
          </motion.span>
          <motion.span {...fadeUp(0.46)} className="block text-[#0a0a0a]/25">
            turn visitors into clients.
          </motion.span>
        </h1>

        <div className="flex flex-col gap-6">
          <motion.p
            {...fadeUp(0.6)}
            className="text-[#0a0a0a]/50 leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
          >
            No templates. No page builders. Custom-designed sites built on a modern stack — fast to load, easy to update, and built to convert.
          </motion.p>

          <motion.div {...fadeUp(0.68)} className="flex flex-col gap-3 w-full sm:w-64">
            <a
              href="https://cal.com/djwooster/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a]/85 transition-colors duration-200"
            >
              Start a project
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center h-12 px-7 border border-black/20 text-[#0a0a0a] text-sm font-semibold hover:bg-black/5 transition-colors duration-200"
            >
              See our work
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
