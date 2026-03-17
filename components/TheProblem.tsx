"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const problems = [
  {
    title: "You're drowning in manual work.",
    body: "Hours lost to data entry, status updates, and follow-ups that software should handle automatically. Your team is maintaining — not growing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Off-the-shelf tools don't fit.",
    body: "You've tried Zapier, Make, and a dozen SaaS apps. They almost work. But the edge cases pile up, the workarounds multiply, and your stack becomes a house of cards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "AI feels out of reach.",
    body: "Everyone says \"use AI\" but no one shows you how to wire it into your business. The gap between a ChatGPT demo and a production system is vast — and most agencies won't close it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
      </svg>
    ),
  },
  {
    title: "Your best people are doing busywork.",
    body: "The people you hired to think are stuck copying data between spreadsheets. That's a morale crisis before it's a productivity problem — and it compounds every quarter.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Unsplash image — person overwhelmed at desk
const IMAGE_URL =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

export default function TheProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-24 px-6" id="problem" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: headline + problem list */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
              The Reality
            </p>
            <h2 className="section-headline text-[#0a0a0a]">
              Most businesses are stuck in the same trap.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {problems.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex gap-5 py-8 border-t border-black/10 first:border-t-0"
              >
                <div className="shrink-0 text-[#0a0a0a]/30 mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-base text-[#0a0a0a]/50 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: sticky image */}
        <div className="hidden md:block sticky top-16 self-start">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGE_URL}
              alt="Person overwhelmed at their desk"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "4/5" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
