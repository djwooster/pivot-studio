"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function ShopHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="bg-white pt-32 pb-12 px-6 border-b border-black/8" ref={ref}>
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-3"
          >
            Products
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.07 }}
            className="section-headline text-[#0a0a0a]"
          >
            Get the tools. Skip the guesswork.
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
          className="text-base text-[#0a0a0a]/45 max-w-sm leading-relaxed shrink-0"
        >
          Three products. Instant delivery. Built for people who want to move faster.
        </motion.p>
      </div>
    </section>
  );
}
