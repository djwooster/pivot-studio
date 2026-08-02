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

export default function WebDesignHero() {
  return (
    <section className="relative bg-white overflow-hidden" id="home">
      <div className="max-w-[90rem] mx-auto px-6 pt-40 pb-16">

        <motion.h1
          {...fadeUp(0)}
          className="font-semibold text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] max-w-2xl"
          style={{ fontSize: "clamp(24px, 3vw, 80px)" }}
        >
          We deliver web design that moves your business forward.
        </motion.h1>

        <motion.p
          {...fadeUp(0.12)}
          className="text-[#0a0a0a]/50 leading-relaxed max-w-3xl mt-6 md:mt-5"
          style={{ fontSize: "clamp(18px, 1.2vw, 24px)" }}
        >
          No templates. No page builders. Custom-designed sites built to make the right first impression and turn visitors into clients.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-6 md:mt-10">
          <ArrowButton href="https://cal.com/djwooster/intro-call" external variant="dark" className="h-12 px-7 text-sm">
            Start a project
          </ArrowButton>
        </motion.div>

      </div>
    </section>
  );
}
