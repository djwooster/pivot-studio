"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
  {
    number: "1",
    title: "Workflow Audit",
    body: "We map your current operations, identify bottlenecks, and pinpoint exactly where automation and AI can save time and money. You get a clear action plan.",
  },
  {
    number: "2",
    title: "Build & Deploy",
    body: "We design and ship the solution — whether that's a custom app, an AI pipeline, or an integrated automation system. Real code. Real infrastructure. Production-ready.",
  },
  {
    number: "3",
    title: "Iterate & Retain",
    body: "After launch, we stay in your corner. Monthly retainer clients get ongoing improvements, support, and new builds as your business scales and needs evolve.",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-28 px-6" id="how-it-works">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
            Our Process
          </p>
          <h2 className="section-headline text-white max-w-xl">
            Simple steps. Serious results.
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={slideUp} className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-white text-[#0a0a0a] flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-white/15" />
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{step.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
