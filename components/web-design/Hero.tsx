"use client";

import { motion } from "framer-motion";
import ArrowButton from "@/components/ArrowButton";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#b07a28" }}>{children}</span>;
}

export default function WebDesignHero() {
  return (
    <section className="relative bg-white pt-6 overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">

        <motion.p
          {...fadeUp(0)}
          className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/40 mb-6"
        >
          Web Design
        </motion.p>

        <h1
          className="font-extrabold text-[#0a0a0a] leading-[1.35] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(24px, 4vw, 80px)" }}
          aria-label="Your website should work as hard as you do. We design beautiful, fast sites that make the right first impression — and turn visitors into clients."
        >
          <motion.span {...fadeUp(0.1)} className="block">
            Your website should work
          </motion.span>
          <motion.span {...fadeUp(0.22)} className="block">
            as hard as you do.
          </motion.span>
          <motion.span {...fadeUp(0.34)} className="block">
            We design <Accent>beautiful</Accent>, <Accent>fast</Accent> sites that
          </motion.span>
          <motion.span {...fadeUp(0.46)} className="block">
            turn visitors into clients.
          </motion.span>
        </h1>

        <div className="flex flex-col gap-10">
          <motion.p
            {...fadeUp(0.6)}
            className="text-[#0a0a0a]/50 leading-relaxed max-w-3xl"
            style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
          >
            No templates. No page builders. Custom-designed sites built on a modern stack — fast to load, easy to update, and built to convert.
          </motion.p>

          <motion.div {...fadeUp(0.68)} className="flex flex-col gap-3 w-full sm:w-64">
            <ArrowButton href="https://cal.com/djwooster/intro-call" external className="h-12 px-7 text-sm">
              Start a project
            </ArrowButton>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
