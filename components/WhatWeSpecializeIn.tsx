"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function LeadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="10" cy="9" r="4" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} />
      <path d="M3 23c0-3.866 3.134-7 7-7s7 3.134 7 23" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <path d="M19 12l2 2 5-5" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polyline points="3,21 9,14 14,17 20,9 25,12" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="25" x2="25" y2="25" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.25} strokeLinecap="round" />
      <circle cx="25" cy="12" r="2" fill="#0a0a0a" fillOpacity={0.5} />
    </svg>
  );
}

function FrontendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="24" height="18" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="2" y1="10" x2="26" y2="10" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.3} />
      <circle cx="5.5" cy="7.5" r="1" fill="#0a0a0a" fillOpacity={0.4} />
      <circle cx="9" cy="7.5" r="1" fill="#0a0a0a" fillOpacity={0.4} />
      <path d="M9 17l3 3-3 3" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="20" x2="19" y2="20" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.4} strokeLinecap="round" />
    </svg>
  );
}

function HiringIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="22" height="22" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="3" y1="10" x2="25" y2="10" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.25} />
      <line x1="14" y1="3" x2="14" y2="25" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.25} />
      <path d="M7 16l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.6} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="15" x2="22" y2="15" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.4} strokeLinecap="round" />
      <line x1="18" y1="18" x2="21" y2="18" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.3} strokeLinecap="round" />
    </svg>
  );
}

function BackendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="8" rx="10" ry="4" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <path d="M4 8v6c0 2.21 4.477 4 10 4s10-1.79 10-4V8" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} />
      <path d="M4 14v6c0 2.21 4.477 4 10 4s10-1.79 10-4v-6" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.3} />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="20" height="20" rx="0" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <circle cx="14" cy="14" r="4" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} />
      <line x1="14" y1="4" x2="14" y2="8" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="14" y1="20" x2="14" y2="24" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="4" y1="14" x2="8" y2="14" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="20" y1="14" x2="24" y2="14" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
    </svg>
  );
}

const specializations = [
  {
    title: "Lead Generation",
    tags: ["AI Cold Email", "Outbound Automation", "Content Systems"],
    icon: <LeadIcon />,
  },
  {
    title: "Revenue Operations",
    tags: ["CRM Automation", "Pipeline Optimization", "AI Nurture Sequences"],
    icon: <RevenueIcon />,
  },
  {
    title: "Frontend Experiences",
    tags: ["Custom Web Apps", "Landing Pages", "Interactive Demos"],
    icon: <FrontendIcon />,
  },
  {
    title: "Hiring Systems",
    tags: ["Intake Funnels", "AI Scoring", "Trial Automation"],
    icon: <HiringIcon />,
  },
  {
    title: "Backend Infrastructure",
    tags: ["API Integrations", "Data Pipelines", "AI Agent Systems"],
    icon: <BackendIcon />,
  },
  {
    title: "AI Strategy & Training",
    tags: ["Team Workshops", "AI Roadmapping", "Tool Selection"],
    icon: <StrategyIcon />,
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WhatWeSpecializeIn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" id="specializations" ref={ref}>
      <div className="max-w-[90rem] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            What We Specialize In
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-2xl">
            Six areas. One focused team.
          </h2>
        </motion.div>

        <div className="border-t border-black/10" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px bg-black/10"
        >
          {specializations.map((spec) => (
            <motion.div
              key={spec.title}
              variants={fadeUp}
              className="bg-white pt-10 pb-12 px-8 flex flex-col gap-6"
            >
              <div className="text-[#0a0a0a]/50 w-7 h-7">{spec.icon}</div>

              <h3 className="text-2xl font-bold text-[#0a0a0a] leading-snug">
                {spec.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center h-8 px-3 border border-black/15 text-sm text-[#0a0a0a]/60 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
