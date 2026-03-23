"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─────────────────────────────────────────────────────────────────────────
   SVG UI Mockups — each simulates the actual deliverable output
───────────────────────────────────────────────────────────────────────── */

/** Lead Generation — Cold email campaign dashboard */
function LeadViz() {
  const bars = [68, 45, 32, 18];
  const labels = ["Intro sequence", "Follow-up #1", "Follow-up #2", "Breakup email"];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Card bg */}
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* Header bar */}
      <rect x="8" y="6" width="264" height="26" fill="#f9fafb" />
      <line x1="8" y1="32" x2="272" y2="32" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx="22" cy="19" r="4" fill="#22c55e" fillOpacity={0.85} />
      <text x="32" y="23" fontSize="8" fill="#111827" fontWeight="600" fontFamily="system-ui">Campaign Dashboard</text>
      <rect x="224" y="13" width="40" height="12" rx="2" fill="#dcfce7" />
      <text x="244" y="22" fontSize="7" fill="#16a34a" fontWeight="600" textAnchor="middle" fontFamily="system-ui">Live</text>

      {/* Stats row */}
      {[
        { val: "2,847", label: "Sent", x: 36 },
        { val: "34%", label: "Opens", x: 100 },
        { val: "127", label: "Replies", x: 164 },
        { val: "23", label: "Meetings", x: 228 },
      ].map(({ val, label, x }) => (
        <g key={label}>
          <text x={x} y="49" fontSize="11" fill="#111827" fontWeight="700" textAnchor="middle" fontFamily="system-ui">{val}</text>
          <text x={x} y="59" fontSize="7" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">{label}</text>
        </g>
      ))}
      <line x1="8" y1="66" x2="272" y2="66" stroke="#f3f4f6" strokeWidth="1" />

      {/* Sequence rows */}
      {labels.map((lbl, i) => {
        const y = 76 + i * 20;
        const pct = bars[i];
        return (
          <g key={lbl}>
            <text x="16" y={y + 8} fontSize="7.5" fill="#374151" fontFamily="system-ui">{lbl}</text>
            {/* Bar bg */}
            <rect x="134" y={y + 1} width="100" height="8" rx="1" fill="#f3f4f6" />
            {/* Bar fill */}
            <rect x="134" y={y + 1} width={pct} height="8" rx="1" fill="#111827" fillOpacity={0.15 + (pct / 68) * 0.2} />
            <text x="240" y={y + 8} fontSize="7" fill="#6b7280" fontFamily="system-ui">{pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Revenue Operations — CRM kanban pipeline */
function RevenueViz() {
  const cols = [
    { label: "Prospect", count: 12, color: "#f3f4f6", deals: [{ name: "Acme Corp", val: "$24k" }, { name: "Bravo Inc", val: "$18k" }] },
    { label: "Qualified", count: 8, color: "#eff6ff", deals: [{ name: "Beta LLC", val: "$45k" }, { name: "Gamma Co", val: "$28k" }] },
    { label: "Proposal", count: 5, color: "#fefce8", deals: [{ name: "Delta Ltd", val: "$32k" }] },
    { label: "Won", count: 3, color: "#f0fdf4", deals: [{ name: "Alpha SA", val: "$89k" }] },
  ];
  const colW = 62, gap = 4, startX = 10;
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Header */}
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="8" y="6" width="264" height="22" fill="#f9fafb" />
      <line x1="8" y1="28" x2="272" y2="28" stroke="#e5e7eb" strokeWidth="1" />
      <text x="18" y="20" fontSize="8" fill="#111827" fontWeight="600" fontFamily="system-ui">Pipeline</text>
      <text x="140" y="20" fontSize="7.5" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">Q1 2024</text>
      <text x="262" y="20" fontSize="8" fill="#16a34a" fontWeight="700" textAnchor="end" fontFamily="system-ui">$284k</text>

      {/* Columns */}
      {cols.map((col, ci) => {
        const x = startX + ci * (colW + gap);
        return (
          <g key={col.label}>
            {/* Column bg */}
            <rect x={x} y="32" width={colW} height="118" fill={col.color} rx="1" />
            {/* Col header */}
            <text x={x + colW / 2} y="43" fontSize="7" fill="#374151" fontWeight="600" textAnchor="middle" fontFamily="system-ui">{col.label}</text>
            <text x={x + colW / 2} y="52" fontSize="6.5" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">({col.count})</text>
            {/* Deal cards */}
            {col.deals.map((deal, di) => {
              const cy = 58 + di * 32;
              return (
                <g key={deal.name}>
                  <rect x={x + 4} y={cy} width={colW - 8} height="26" fill="white" stroke="#e5e7eb" strokeWidth="0.8" rx="1" />
                  <text x={x + 8} y={cy + 10} fontSize="6.5" fill="#111827" fontWeight="600" fontFamily="system-ui">{deal.name}</text>
                  <text x={x + 8} y={cy + 20} fontSize="7" fill="#6b7280" fontWeight="700" fontFamily="system-ui">{deal.val}</text>
                  {ci === 3 && <circle cx={x + colW - 11} cy={cy + 13} r="4" fill="#22c55e" fillOpacity={0.8} />}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Frontend Experiences — Web app dashboard */
function FrontendViz() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Outer card */}
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* Top nav */}
      <rect x="8" y="6" width="264" height="22" fill="#111827" />
      <text x="18" y="20" fontSize="8" fill="white" fontWeight="700" fontFamily="system-ui">MyApp</text>
      <text x="80" y="20" fontSize="7.5" fill="white" fillOpacity={0.5} fontFamily="system-ui">Dashboard</text>
      <text x="120" y="20" fontSize="7.5" fill="white" fillOpacity={0.5} fontFamily="system-ui">Reports</text>
      <text x="160" y="20" fontSize="7.5" fill="white" fillOpacity={0.5} fontFamily="system-ui">Settings</text>
      <circle cx="260" cy="17" r="6" fill="#374151" />
      <text x="260" y="20" fontSize="6" fill="white" textAnchor="middle" fontFamily="system-ui">A</text>

      {/* Sidebar */}
      <rect x="8" y="28" width="40" height="126" fill="#f9fafb" />
      <line x1="48" y1="28" x2="48" y2="154" stroke="#e5e7eb" strokeWidth="1" />
      {["Home", "Users", "Data", "Logs", "Help"].map((item, i) => (
        <g key={item}>
          <rect x="12" y={36 + i * 18} width="28" height="12" rx="1" fill={i === 0 ? "#111827" : "transparent"} />
          <text x="26" y={45 + i * 18} fontSize="6.5" fill={i === 0 ? "white" : "#9ca3af"} textAnchor="middle" fontFamily="system-ui">{item}</text>
        </g>
      ))}

      {/* Stat cards */}
      {[
        { label: "Revenue", val: "$124k", color: "#f0fdf4", tx: "#16a34a" },
        { label: "Uptime", val: "99.9%", color: "#eff6ff", tx: "#2563eb" },
        { label: "Users", val: "1,284", color: "#fdf4ff", tx: "#9333ea" },
      ].map(({ label, val, color, tx }, i) => {
        const x = 54 + i * 74;
        return (
          <g key={label}>
            <rect x={x} y="32" width="68" height="30" fill={color} stroke="#e5e7eb" strokeWidth="0.8" />
            <text x={x + 34} y="46" fontSize="10" fill={tx} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{val}</text>
            <text x={x + 34} y="56" fontSize="6.5" fill="#6b7280" textAnchor="middle" fontFamily="system-ui">{label}</text>
          </g>
        );
      })}

      {/* Chart area */}
      <rect x="54" y="68" width="210" height="80" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="0.8" />
      <text x="64" y="80" fontSize="7" fill="#374151" fontWeight="600" fontFamily="system-ui">Revenue trend</text>
      {/* Chart line */}
      <polyline
        points="64,138 94,128 124,132 154,114 184,108 214,96 244,88"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
      {/* Area fill */}
      <polygon
        points="64,138 94,128 124,132 154,114 184,108 214,96 244,88 244,144 64,144"
        fill="#111827"
        fillOpacity={0.04}
      />
      {/* Grid lines */}
      {[90, 110, 130].map(y => (
        <line key={y} x1="64" y1={y} x2="248" y2={y} stroke="#e5e7eb" strokeWidth="0.6" strokeDasharray="3 3" />
      ))}
    </svg>
  );
}

/** Hiring Systems — ATS pipeline board */
function HiringViz() {
  const stages = [
    { label: "Applied", count: 24, candidates: ["Sarah K.", "James L."], score: [82, 76] },
    { label: "Screened", count: 11, candidates: ["Priya M.", "Tom R."], score: [91, 85] },
    { label: "Interview", count: 5, candidates: ["Alex W."], score: [94] },
    { label: "Offer", count: 2, candidates: ["Priya M."], score: [91] },
  ];
  const colW = 61, gap = 4, sx = 10;
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* Header */}
      <rect x="8" y="6" width="264" height="22" fill="#f9fafb" />
      <line x1="8" y1="28" x2="272" y2="28" stroke="#e5e7eb" strokeWidth="1" />
      <text x="18" y="20" fontSize="8" fill="#111827" fontWeight="600" fontFamily="system-ui">Senior Engineer — Hiring Pipeline</text>
      <rect x="230" y="12" width="34" height="11" rx="1" fill="#eff6ff" />
      <text x="247" y="20" fontSize="6.5" fill="#2563eb" fontWeight="600" textAnchor="middle" fontFamily="system-ui">AI Scoring</text>

      {stages.map((stage, ci) => {
        const x = sx + ci * (colW + gap);
        return (
          <g key={stage.label}>
            <rect x={x} y="32" width={colW} height="120" rx="1" fill="#f9fafb" />
            <text x={x + colW / 2} y="43" fontSize="7" fill="#374151" fontWeight="600" textAnchor="middle" fontFamily="system-ui">{stage.label}</text>
            <text x={x + colW / 2} y="52" fontSize="6.5" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">{stage.count} candidates</text>

            {stage.candidates.map((name, di) => {
              const cy = 57 + di * 34;
              const score = stage.score[di];
              const scoreColor = score >= 90 ? "#16a34a" : score >= 80 ? "#ca8a04" : "#6b7280";
              return (
                <g key={name}>
                  <rect x={x + 4} y={cy} width={colW - 8} height="28" fill="white" stroke="#e5e7eb" strokeWidth="0.8" rx="1" />
                  {/* Avatar circle */}
                  <circle cx={x + 12} cy={cy + 10} r="5" fill="#e5e7eb" />
                  <text x={x + 12} y={cy + 13} fontSize="5" fill="#6b7280" textAnchor="middle" fontFamily="system-ui">{name[0]}</text>
                  <text x={x + 19} y={cy + 10} fontSize="6" fill="#111827" fontWeight="600" fontFamily="system-ui">{name}</text>
                  {/* AI score */}
                  <rect x={x + 19} y={cy + 14} width="22" height="9" rx="1" fill={scoreColor} fillOpacity={0.12} />
                  <text x={x + 30} y={cy + 21} fontSize="5.5" fill={scoreColor} fontWeight="700" textAnchor="middle" fontFamily="system-ui">AI {score}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Backend Infrastructure — Integration & data flow hub */
function BackendViz() {
  const sources = [
    { name: "Salesforce", y: 28 },
    { name: "Shopify", y: 60 },
    { name: "HubSpot", y: 92 },
    { name: "Stripe", y: 124 },
  ];
  const destinations = [
    { name: "Warehouse", y: 36 },
    { name: "Analytics", y: 68 },
    { name: "Webhooks", y: 100 },
    { name: "Alerts", y: 132 },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* Header */}
      <rect x="8" y="6" width="264" height="22" fill="#f9fafb" />
      <line x1="8" y1="28" x2="272" y2="28" stroke="#e5e7eb" strokeWidth="1" />
      <text x="18" y="20" fontSize="8" fill="#111827" fontWeight="600" fontFamily="system-ui">Integration Hub</text>
      <circle cx="240" cy="17" r="4" fill="#22c55e" fillOpacity={0.8} />
      <text x="250" y="21" fontSize="7" fill="#16a34a" fontFamily="system-ui">Live</text>

      {/* Source nodes */}
      {sources.map(({ name, y }) => (
        <g key={name}>
          <rect x="14" y={y} width="52" height="18" rx="2" fill="#f9fafb" stroke="#d1d5db" strokeWidth="0.8" />
          <text x="40" y={y + 12} fontSize="6.5" fill="#374151" textAnchor="middle" fontFamily="system-ui">{name}</text>
          {/* Status dot */}
          <circle cx="57" cy={y + 9} r="3" fill="#22c55e" fillOpacity={0.8} />
        </g>
      ))}

      {/* Central hub */}
      <rect x="96" y="50" width="88" height="60" rx="2" fill="#111827" fillOpacity={0.04} stroke="#111827" strokeWidth="1" strokeOpacity={0.15} />
      <text x="140" y="72" fontSize="7.5" fill="#111827" fontWeight="700" textAnchor="middle" fontFamily="system-ui">Data Pipeline</text>
      <text x="140" y="84" fontSize="6.5" fill="#6b7280" textAnchor="middle" fontFamily="system-ui">Transform & Route</text>
      {/* Pulse rings */}
      <circle cx="140" cy="95" r="5" fill="#111827" fillOpacity={0.15} />
      <circle cx="140" cy="95" r="8" stroke="#111827" strokeWidth="0.6" strokeOpacity={0.1} />

      {/* Destination nodes */}
      {destinations.map(({ name, y }) => (
        <g key={name}>
          <rect x="214" y={y} width="54" height="18" rx="2" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
          <text x="241" y={y + 12} fontSize="6.5" fill="#1d4ed8" textAnchor="middle" fontFamily="system-ui">{name}</text>
        </g>
      ))}

      {/* Connecting lines — sources to hub */}
      {sources.map(({ y }) => (
        <line key={y} x1="66" y1={y + 9} x2="96" y2="80" stroke="#111827" strokeWidth="0.8" strokeOpacity={0.12} strokeDasharray="3 2" />
      ))}
      {/* Connecting lines — hub to destinations */}
      {destinations.map(({ y }) => (
        <line key={y} x1="184" y1="80" x2="214" y2={y + 9} stroke="#2563eb" strokeWidth="0.8" strokeOpacity={0.15} strokeDasharray="3 2" />
      ))}
    </svg>
  );
}

/** AI Strategy & Training — Workshop roadmap */
function StrategyViz() {
  const phases = [
    {
      label: "Phase 1 — Assess",
      weeks: "Wk 1–2",
      color: "#f9fafb",
      items: ["AI Readiness Audit", "Stack Inventory", "Quick Win Mapping"],
    },
    {
      label: "Phase 2 — Build",
      weeks: "Wk 3–6",
      color: "#eff6ff",
      items: ["Pilot Automation", "Team Workshops", "Tool Selection"],
    },
    {
      label: "Phase 3 — Scale",
      weeks: "Wk 7+",
      color: "#f0fdf4",
      items: ["Org-wide Rollout", "Ongoing Training", "ROI Tracking"],
    },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="8" y="6" width="264" height="148" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* Header */}
      <rect x="8" y="6" width="264" height="22" fill="#f9fafb" />
      <line x1="8" y1="28" x2="272" y2="28" stroke="#e5e7eb" strokeWidth="1" />
      <text x="18" y="20" fontSize="8" fill="#111827" fontWeight="600" fontFamily="system-ui">AI Strategy Roadmap</text>
      <rect x="218" y="12" width="46" height="11" rx="1" fill="#fef9c3" />
      <text x="241" y="20" fontSize="6.5" fill="#854d0e" fontWeight="600" textAnchor="middle" fontFamily="system-ui">In Progress</text>

      {/* Timeline track */}
      <line x1="20" y1="42" x2="264" y2="42" stroke="#e5e7eb" strokeWidth="1.5" />
      {[20, 101, 182, 264].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="42" r={i === 0 ? 5 : 4} fill={i < 2 ? "#111827" : "#e5e7eb"} />
          {i < 3 && <text x={x + (i === 0 ? 0 : 0)} y="37" fontSize="6" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">{phases[i]?.weeks}</text>}
        </g>
      ))}

      {/* Phase columns */}
      {phases.map(({ label, color, items }, ci) => {
        const x = 14 + ci * 86;
        return (
          <g key={label}>
            <rect x={x} y="50" width="80" height="100" rx="1" fill={color} stroke="#e5e7eb" strokeWidth="0.8" />
            <text x={x + 40} y="62" fontSize="6.5" fill="#374151" fontWeight="700" textAnchor="middle" fontFamily="system-ui">{label.split("—")[0].trim()}</text>
            <text x={x + 40} y="71" fontSize="6" fill="#9ca3af" textAnchor="middle" fontFamily="system-ui">—{label.split("—")[1]}</text>
            {items.map((item, ii) => (
              <g key={item}>
                <circle cx={x + 12} cy={82 + ii * 20} r="2.5" fill={ci === 2 ? "#22c55e" : ci === 1 ? "#2563eb" : "#9ca3af"} fillOpacity={0.7} />
                <text x={x + 18} y={85 + ii * 20} fontSize="6.5" fill="#374151" fontFamily="system-ui">{item}</text>
              </g>
            ))}
            {ci < 2 && (
              <rect x={x + 10} y="128" width="60" height="14" rx="1" fill={ci === 0 ? "#111827" : "#dbeafe"} />
            )}
            {ci === 0 && <text x={x + 40} y="138" fontSize="6.5" fill="white" fontWeight="600" textAnchor="middle" fontFamily="system-ui">✓ Complete</text>}
            {ci === 1 && <text x={x + 40} y="138" fontSize="6.5" fill="#2563eb" fontWeight="600" textAnchor="middle" fontFamily="system-ui">In progress</text>}
          </g>
        );
      })}
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

/* ── Animations ───────────────────────────────────────────────────────── */

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
              className="flex flex-col border border-black/10 bg-white hover:border-black/25 transition-colors duration-200"
            >
              {/* Illustration area */}
              <div className="w-full bg-[#f9fafb] border-b border-black/8 overflow-hidden" style={{ height: "176px" }}>
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
