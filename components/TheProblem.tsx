"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const svgVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const barVariant: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE } },
};

function ProblemSVG({ isInView }: { isInView: boolean }) {
  const bars = [
    { x: 20,  h: 80,  op: 0.12 },
    { x: 84,  h: 160, op: 0.18 },
    { x: 148, h: 110, op: 0.14 },
    { x: 212, h: 220, op: 0.22 },
    { x: 276, h: 145, op: 0.16 },
    { x: 340, h: 260, op: 0.28 },
    { x: 404, h: 190, op: 0.20 },
    { x: 468, h: 300, op: 1.00 },
  ];
  const W = 540;
  const H = 360;
  const baseY = H - 24;
  const barW = 48;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <line x1="0" y1={baseY} x2={W} y2={baseY} stroke="#0a0a0a" strokeWidth="2" strokeOpacity={0.12} />
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line key={i} x1="0" y1={baseY - t * (baseY - 24)} x2={W} y2={baseY - t * (baseY - 24)}
          stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.06} strokeDasharray="4 6" />
      ))}
      <motion.g variants={svgVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {bars.map((bar, i) => (
          <motion.rect key={i} x={bar.x} y={baseY - bar.h} width={barW} height={bar.h}
            fill="#0a0a0a" fillOpacity={bar.op} variants={barVariant}
            style={{ transformOrigin: `${bar.x + barW / 2}px ${baseY}px` }} />
        ))}
      </motion.g>
      <motion.rect x={468} y={baseY - 300} width={barW} height={4} fill="#0a0a0a" fillOpacity={0.9}
        initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 1.0 }}
        style={{ transformOrigin: `468px ${baseY - 300}px` }} />
    </svg>
  );
}

export default function TheProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white pt-12 pb-28 px-6" id="problem" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
            The Reality
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Most businesses are stuck in the same trap.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: stacked problems */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            {problems.map((p, i) => (
              <motion.div
                key={p.number}
                variants={fadeUp}
                className={`flex flex-col gap-3 py-10 ${i !== 0 ? "border-t border-black/10" : ""}`}
              >
                <span
                  className="font-black leading-none select-none"
                  style={{ fontSize: "clamp(52px, 6vw, 80px)", letterSpacing: "-0.04em", color: "rgba(10,10,10,0.12)" }}
                >
                  {p.number}
                </span>
                <h3 className="text-2xl font-bold text-[#0a0a0a] leading-snug">{p.title}</h3>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: sticky bar chart — pins to top-16 (nav), releases when section ends */}
          <div className="hidden md:block sticky top-16 self-start">
            <div className="w-full aspect-[3/2]">
              <ProblemSVG isInView={isInView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
