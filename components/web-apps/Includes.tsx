"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const includes = [
  {
    title: "Scoped to your workflow.",
    body: "We start by understanding how your team actually works — then design the app around that, not around what's easiest to build.",
  },
  {
    title: "Clean, intuitive UI.",
    body: "Your team will use this every day. We design interfaces that are fast to learn, easy to navigate, and built to reduce friction.",
  },
  {
    title: "Built on a modern stack.",
    body: "We build on Next.js, TypeScript, and proven backend infrastructure — scalable, maintainable, and ready to grow with your business.",
  },
  {
    title: "Third-party integrations.",
    body: "CRMs, payment processors, calendar tools, data warehouses — we wire your app into the systems you already rely on.",
  },
  {
    title: "Role-based access.",
    body: "Admins, managers, clients, staff — everyone sees exactly what they need and nothing they don't. Access control built in from day one.",
  },
  {
    title: "Ongoing support & iteration.",
    body: "Software is never done. We offer retainer and support plans so your app keeps improving as your business does.",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WebAppsIncludes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl mb-16"
        >
          <h2
            className="font-extrabold text-[#0a0a0a] leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            Everything your app needs to ship and stick.
          </h2>
        </motion.div>

        {/* Numbered grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-x-10 gap-y-12"
        >
          {includes.map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} className="flex flex-col gap-4">
              <div className="border-t border-black/10 pt-4">
                <span className="text-sm text-[#0a0a0a]/30 font-medium tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">{item.title}</h3>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
