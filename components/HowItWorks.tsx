"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function AuditIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="16" height="20" rx="0" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="9" y1="10" x2="17" y2="10" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="9" y1="14" x2="17" y2="14" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="9" y1="18" x2="14" y2="18" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <circle cx="22" cy="22" r="5" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="26" y1="26" x2="29" y2="29" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polyline points="6,20 12,14 17,19 26,10" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="4" y1="26" x2="28" y2="26" stroke="white" strokeWidth="1.5" strokeOpacity={0.3} strokeLinecap="round" />
      <circle cx="26" cy="10" r="2.5" fill="white" fillOpacity={0.7} />
    </svg>
  );
}

function RetainIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 6 C10 6 6 10 6 16 C6 22 10 26 16 26 C22 26 26 22 26 16" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" />
      <polyline points="22,6 26,10 22,14" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" fill="white" fillOpacity={0.5} />
    </svg>
  );
}

const steps = [
  {
    number: "1",
    title: "Workflow Audit",
    body: "You'll know exactly where you're losing time and money — and what to do about it. We surface the highest-ROI opportunities in your operations and hand you a clear, prioritized action plan.",
    icon: <AuditIcon />,
  },
  {
    number: "2",
    title: "Build & Deploy",
    body: "Your new system is live and working in under 30 days. Hours clawed back, bottlenecks cleared, and your team free to focus on the work that actually grows the business.",
    icon: <BuildIcon />,
  },
  {
    number: "3",
    title: "Iterate & Retain",
    body: "Your stack keeps getting sharper without you having to think about it. We stay in your corner — shipping improvements and building new systems as you scale.",
    icon: <RetainIcon />,
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
      <div className="max-w-[90rem] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/35 mb-4">
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
              {/* Icon */}
              <div className="w-12 h-12">{step.icon}</div>

              {/* Number + Title */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold font-mono text-white/30 flex-shrink-0">{step.number}</span>
                <h3 className="text-xl font-bold text-white leading-snug">{step.title}</h3>
              </div>

              <p className="text-base text-white/55 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
