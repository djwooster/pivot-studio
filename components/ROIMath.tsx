"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stats = [
  {
    value: "12+",
    label: "Hours saved per week",
    subtext: "Average across our clients after a workflow automation build",
  },
  {
    value: "3–6×",
    label: "ROI within 90 days",
    subtext: "Typical return on a $2,500 audit + automation project",
  },
  {
    value: "< 30",
    label: "Days to first ship",
    subtext: "From signed contract to working system in production",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function ROIMath() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
            The Numbers
          </p>
          <h2 className="section-headline text-white max-w-xl">
            The math works in your favor.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px bg-white/10"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className="bg-[#0a0a0a] px-10 py-12 flex flex-col gap-3"
            >
              <p
                className="font-extrabold text-white leading-none"
                style={{ fontSize: "clamp(52px, 6vw, 80px)", letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </p>
              <p className="text-lg font-semibold text-white">{stat.label}</p>
              <p className="text-sm text-white/50 leading-relaxed">{stat.subtext}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
