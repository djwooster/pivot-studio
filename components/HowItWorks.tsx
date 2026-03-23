"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
  {
    number: "1",
    title: "Funnel Map Audit",
    body: "A free 30-minute session where we audit your funnel, identify bottlenecks, and map out exactly where AI can move the needle.",
  },
  {
    number: "2",
    title: "Proposal",
    body: "We deliver a clear scope, timeline, and fixed price. No surprises, no hourly billing. You know exactly what you're getting.",
  },
  {
    number: "3",
    title: "Project",
    body: "Our team builds, tests, and deploys your systems. You get weekly updates and a working product — not a deck full of promises.",
  },
  {
    number: "4",
    title: "Ongoing Management",
    body: "Optional retainer for monitoring, optimization, and iteration. Most clients see compounding returns over time.",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-28 px-6" id="how-it-works">
      <div className="max-w-[90rem] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/35 mb-4">
            How We Work
          </p>
          <h2 className="section-headline text-white max-w-2xl">
            From first call to launch.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={slideUp}
              className="bg-white/[0.04] border border-white/[0.07] p-8 flex flex-col gap-6"
            >
              {/* Number badge */}
              <span className="w-7 h-7 flex items-center justify-center bg-white/10 text-white text-sm font-bold flex-shrink-0">
                {step.number}
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white leading-snug">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
