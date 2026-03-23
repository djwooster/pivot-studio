"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── SVG card illustrations ───────────────────────────────────────────── */

function LeadViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Funnel outline */}
      <path d="M40 30 L240 30 L180 90 L180 140 L100 140 L100 90 Z" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.12} />
      {/* Dots flowing in */}
      {[60, 100, 140, 180, 220].map((x, i) => (
        <circle key={x} cx={x} cy={22} r="3.5" fill="#0a0a0a" fillOpacity={0.12 + i * 0.03} />
      ))}
      {/* Mid stage dots */}
      {[120, 140, 160].map((x, i) => (
        <circle key={x} cx={x} cy={70} r="4" fill="#0a0a0a" fillOpacity={0.18 + i * 0.04} />
      ))}
      {/* Qualified lead dot at bottom */}
      <circle cx="140" cy="125" r="7" fill="#0a0a0a" fillOpacity={0.3} />
      <circle cx="140" cy="125" r="12" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.12} />
      {/* Check mark */}
      <path d="M135 125l3 3 7-7" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Stage labels */}
      <rect x="50" y="45" width="50" height="14" rx="0" fill="#0a0a0a" fillOpacity={0.05} />
      <rect x="115" y="45" width="50" height="14" rx="0" fill="#0a0a0a" fillOpacity={0.05} />
      <rect x="180" y="45" width="50" height="14" rx="0" fill="#0a0a0a" fillOpacity={0.05} />
    </svg>
  );
}

function RevenueViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Chart bars */}
      <rect x="30" y="100" width="28" height="40" fill="#0a0a0a" fillOpacity={0.07} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} />
      <rect x="72" y="78" width="28" height="62" fill="#0a0a0a" fillOpacity={0.09} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} />
      <rect x="114" y="58" width="28" height="82" fill="#0a0a0a" fillOpacity={0.11} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} />
      <rect x="156" y="38" width="28" height="102" fill="#0a0a0a" fillOpacity={0.14} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.2} />
      <rect x="198" y="20" width="28" height="120" fill="#0a0a0a" fillOpacity={0.18} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.25} />
      {/* Trend line */}
      <polyline points="44,95 86,73 128,53 170,33 212,15" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="212" cy="15" r="4" fill="#0a0a0a" fillOpacity={0.4} />
      {/* Baseline */}
      <line x1="20" y1="140" x2="250" y2="140" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.1} />
      {/* Y axis ticks */}
      {[140, 110, 80, 50, 20].map((y) => (
        <line key={y} x1="18" y1={y} x2="24" y2={y} stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.1} />
      ))}
    </svg>
  );
}

function FrontendViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Browser chrome */}
      <rect x="20" y="18" width="240" height="130" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15} />
      <rect x="20" y="18" width="240" height="26" fill="#0a0a0a" fillOpacity={0.04} />
      <line x1="20" y1="44" x2="260" y2="44" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.1} />
      {/* Browser dots */}
      <circle cx="35" cy="31" r="3" fill="#0a0a0a" fillOpacity={0.15} />
      <circle cx="48" cy="31" r="3" fill="#0a0a0a" fillOpacity={0.15} />
      <circle cx="61" cy="31" r="3" fill="#0a0a0a" fillOpacity={0.15} />
      {/* URL bar */}
      <rect x="80" y="24" width="120" height="14" rx="0" fill="#0a0a0a" fillOpacity={0.05} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.1} />
      {/* Sidebar */}
      <rect x="20" y="44" width="54" height="104" fill="#0a0a0a" fillOpacity={0.03} />
      <line x1="74" y1="44" x2="74" y2="148" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.08} />
      {/* Nav items */}
      {[58, 74, 90, 106].map((y) => (
        <rect key={y} x="28" y={y} width="38" height="8" rx="0" fill="#0a0a0a" fillOpacity={0.08} />
      ))}
      {/* Content area */}
      <rect x="84" y="54" width="160" height="12" rx="0" fill="#0a0a0a" fillOpacity={0.1} />
      <rect x="84" y="72" width="100" height="8" rx="0" fill="#0a0a0a" fillOpacity={0.06} />
      {/* Card grid */}
      <rect x="84" y="90" width="72" height="48" rx="0" fill="#0a0a0a" fillOpacity={0.04} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.1} />
      <rect x="166" y="90" width="72" height="48" rx="0" fill="#0a0a0a" fillOpacity={0.04} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.1} />
    </svg>
  );
}

function HiringViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Stage boxes */}
      {[
        { x: 18, label: "Apply" },
        { x: 80, label: "Screen" },
        { x: 142, label: "Interview" },
        { x: 204, label: "Hire" },
      ].map(({ x }, i) => (
        <g key={x}>
          <rect x={x} y="60" width="54" height="36" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15 + i * 0.06} fill="#0a0a0a" fillOpacity={0.03 + i * 0.02} />
          {i < 3 && (
            <path d={`M${x + 54} 78 L${x + 66} 78`} stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.2} strokeLinecap="round" />
          )}
          {i < 3 && (
            <path d={`M${x + 63} 74 L${x + 68} 78 L${x + 63} 82`} stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.2} strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      ))}
      {/* Candidate dots above each stage */}
      {[45, 107, 169].map((cx, i) => (
        <g key={cx}>
          {Array.from({ length: 3 - i }).map((_, j) => (
            <circle key={j} cx={cx - 6 + j * 6} cy="40" r="5" fill="#0a0a0a" fillOpacity={0.1 + j * 0.05} />
          ))}
        </g>
      ))}
      {/* Hired person */}
      <circle cx="231" cy="35" r="7" fill="#0a0a0a" fillOpacity={0.25} />
      <path d="M226 47 c0-3 2.5-5 5-5s5 2 5 5" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.3} strokeLinecap="round" />
      {/* Checkmark on hire box */}
      <path d="M218 78l4 4 10-10" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" />
      {/* Scoring bars */}
      {[110, 122, 134].map((y, i) => (
        <rect key={y} x="84" y={y} width={30 + i * 18} height="7" rx="0" fill="#0a0a0a" fillOpacity={0.08 + i * 0.03} />
      ))}
    </svg>
  );
}

function BackendViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Central node */}
      <rect x="110" y="60" width="60" height="36" stroke="#0a0a0a" strokeWidth="1.4" strokeOpacity={0.25} fill="#0a0a0a" fillOpacity={0.05} />
      {/* API node */}
      <rect x="20" y="22" width="52" height="28" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15} fill="#0a0a0a" fillOpacity={0.03} />
      {/* DB node */}
      <ellipse cx="220" cy="36" rx="28" ry="12" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15} />
      <path d="M192 36v14c0 6.627 12.536 12 28 12s28-5.373 28-12V36" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.12} />
      {/* Queue node */}
      <rect x="20" y="110" width="52" height="28" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15} fill="#0a0a0a" fillOpacity={0.03} />
      {/* Service node */}
      <rect x="208" y="110" width="52" height="28" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15} fill="#0a0a0a" fillOpacity={0.03} />
      {/* Connecting lines */}
      <line x1="72" y1="36" x2="110" y2="72" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} strokeDasharray="4 3" />
      <line x1="192" y1="48" x2="170" y2="65" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} strokeDasharray="4 3" />
      <line x1="72" y1="124" x2="110" y2="84" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} strokeDasharray="4 3" />
      <line x1="208" y1="120" x2="170" y2="90" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.15} strokeDasharray="4 3" />
      {/* Center label lines */}
      <line x1="122" y1="72" x2="158" y2="72" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.2} />
      <line x1="122" y1="82" x2="148" y2="82" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.12} />
      {/* Pulse circle on center */}
      <circle cx="140" cy="78" r="20" stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.07} />
      <circle cx="140" cy="78" r="32" stroke="#0a0a0a" strokeWidth="0.6" strokeOpacity={0.04} />
    </svg>
  );
}

function StrategyViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Roadmap horizontal track */}
      <line x1="30" y1="80" x2="250" y2="80" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.1} />
      {/* Milestone nodes */}
      {[30, 90, 150, 210, 250].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="80" r={i === 4 ? 9 : 6} fill="#0a0a0a" fillOpacity={0.06 + i * 0.05} stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.15 + i * 0.04} />
          {i === 4 && <circle cx={cx} cy="80" r="4" fill="#0a0a0a" fillOpacity={0.3} />}
        </g>
      ))}
      {/* Labels above milestones */}
      {[30, 90, 150, 210].map((cx) => (
        <rect key={cx} x={cx - 22} y="52" width="44" height="18" fill="#0a0a0a" fillOpacity={0.04} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.08} />
      ))}
      {/* Branch lines going down from 2nd and 3rd milestone */}
      <line x1="90" y1="86" x2="90" y2="115" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.1} strokeDasharray="3 3" />
      <rect x="60" y="115" width="60" height="22" fill="#0a0a0a" fillOpacity={0.04} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.1} />
      <line x1="150" y1="86" x2="150" y2="115" stroke="#0a0a0a" strokeWidth="1" strokeOpacity={0.1} strokeDasharray="3 3" />
      <rect x="120" y="115" width="60" height="22" fill="#0a0a0a" fillOpacity={0.04} stroke="#0a0a0a" strokeWidth="0.8" strokeOpacity={0.1} />
      {/* Arrow at end */}
      <path d="M246 74 L256 80 L246 86" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity={0.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const specializations = [
  {
    title: "Lead Generation",
    tags: ["AI Cold Email", "Outbound Automation", "Content Systems"],
    viz: <LeadViz />,
  },
  {
    title: "Revenue Operations",
    tags: ["CRM Automation", "Pipeline Optimization", "AI Nurture Sequences"],
    viz: <RevenueViz />,
  },
  {
    title: "Frontend Experiences",
    tags: ["Custom Web Apps", "Landing Pages", "Interactive Demos"],
    viz: <FrontendViz />,
  },
  {
    title: "Hiring Systems",
    tags: ["Intake Funnels", "AI Scoring", "Trial Automation"],
    viz: <HiringViz />,
  },
  {
    title: "Backend Infrastructure",
    tags: ["API Integrations", "Data Pipelines", "AI Agent Systems"],
    viz: <BackendViz />,
  },
  {
    title: "AI Strategy & Training",
    tags: ["Team Workshops", "AI Roadmapping", "Tool Selection"],
    viz: <StrategyViz />,
  },
];

/* ── Animation ────────────────────────────────────────────────────────── */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ── Component ────────────────────────────────────────────────────────── */

export default function WhatWeSpecializeIn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" id="specializations" ref={ref}>
      <div className="max-w-[90rem] mx-auto">

        {/* Header */}
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

        {/* 3-col card grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {specializations.map((spec) => (
            <motion.div
              key={spec.title}
              variants={fadeUp}
              className="flex flex-col border border-black/10 bg-[#fafafa] hover:border-black/25 transition-colors duration-200"
            >
              {/* Illustration area */}
              <div className="w-full h-44 bg-white border-b border-black/8 flex items-center justify-center p-4">
                {spec.viz}
              </div>

              {/* Label + tags */}
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">
                  {spec.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {spec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center h-7 px-3 border border-black/12 text-xs text-[#0a0a0a]/55 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
