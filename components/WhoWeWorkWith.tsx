"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const businessTypes = [
  "E-commerce brands",
  "SaaS startups",
  "Professional services firms",
  "Agencies",
  "Healthcare practices",
  "Real estate operators",
  "Logistics companies",
  "Financial advisors",
  "Coaches & consultants",
  "Marketing teams",
  "Operations-heavy SMBs",
  "Series A–C companies",
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
};

export default function WhoWeWorkWith() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f5f5f5] py-28 px-6" id="who-we-work-with">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/35">
              Who We Work With
            </p>
            <h2 className="section-headline text-[#0a0a0a]">
              We work best with businesses ready to move fast.
            </h2>
            <p className="text-base text-[#0a0a0a]/50 leading-relaxed max-w-md">
              You don&apos;t need a big tech team or a huge budget. You need a clear
              problem and the will to actually fix it. If that&apos;s you, we should talk.
            </p>
            <p className="text-base text-[#0a0a0a]/50 leading-relaxed max-w-md">
              Our clients are founders, operators, and teams who are done settling for
              &ldquo;good enough&rdquo; tooling. They want systems that give them back hours
              every week.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2.5"
          >
            {businessTypes.map((type) => (
              <motion.span
                key={type}
                variants={pillVariant}
                className="inline-flex items-center h-9 px-4 border border-black/15 text-sm text-[#0a0a0a]/65 font-medium hover:border-black/35 hover:text-[#0a0a0a]/85 transition-colors duration-200 cursor-default"
              >
                {type}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
