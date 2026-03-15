// ease typed
"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const problems = [
  {
    number: "01",
    title: "You're drowning in manual work.",
    body: "Your team spends hours on repetitive tasks that software should handle — data entry, status updates, follow-ups. Time that should go to growth is going to maintenance.",
  },
  {
    number: "02",
    title: "Off-the-shelf tools don't fit.",
    body: "You've tried Zapier, Make, and a dozen SaaS apps. They almost work. But the edge cases pile up, the workarounds multiply, and your stack becomes a house of cards.",
  },
  {
    number: "03",
    title: "AI feels out of reach.",
    body: "Everyone says \"use AI\" but no one shows you how to actually wire it into your business. The gap between a ChatGPT demo and a production system is vast — and most agencies won't close it.",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function TheProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-28 px-6" id="problem">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
            The Reality
          </p>
          <h2 className="section-headline text-white max-w-xl">
            Most businesses are stuck in the same trap.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px bg-white/10"
        >
          {problems.map((p) => (
            <motion.div
              key={p.number}
              variants={fadeUp}
              className="bg-[#0a0a0a] p-8 flex flex-col gap-4"
            >
              <span className="text-xs font-mono text-white/25 tracking-widest">{p.number}</span>
              <h3 className="text-xl font-bold text-white leading-snug">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
