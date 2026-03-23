"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─── Shared shadcn-style palette ────────────────────────────────────── */
const C = {
  bg:        "#ffffff",
  muted:     "#f8fafc",   // slate-50
  border:    "#e2e8f0",   // slate-200
  text:      "#0f172a",   // slate-900
  sub:       "#64748b",   // slate-500
  faint:     "#94a3b8",   // slate-400
  green:     "#16a34a",
  greenBg:   "#dcfce7",
  blue:      "#2563eb",
  blueBg:    "#dbeafe",
  amber:     "#d97706",
  amberBg:   "#fef3c7",
  purple:    "#7c3aed",
  purpleBg:  "#ede9fe",
};

/* Shared drop-shadow filter id — each SVG defines its own */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.06" />
        <feDropShadow dx="0" dy="4" stdDeviation="8"   floodColor="#000" floodOpacity="0.04" />
      </filter>
    </defs>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   1. Lead Generation — Cold-email campaign dashboard
───────────────────────────────────────────────────────────────────────── */
function LeadViz() {
  const stats = [
    { val: "2,847", label: "Sent",     delta: "+12%" },
    { val: "34%",   label: "Open rate",delta: "+4%"  },
    { val: "127",   label: "Replies",  delta: "+8%"  },
    { val: "23",    label: "Meetings", delta: "+2"   },
  ];
  const rows = [
    { name: "Intro sequence",   pct: 68 },
    { name: "Follow-up #1",     pct: 45 },
    { name: "Follow-up #2",     pct: 29 },
    { name: "Breakup email",    pct: 14 },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s1" />
      {/* Card */}
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s1)" />

      {/* Header */}
      <rect x="6" y="4" width="268" height="28" rx="8" fill={C.muted} />
      <rect x="6" y="20" width="268" height="12" fill={C.muted} />
      <line x1="6" y1="32" x2="274" y2="32" stroke={C.border} strokeWidth="1" />
      <circle cx="20" cy="18" r="4" fill={C.green} />
      <text x="30" y="22" fontSize="8.5" fill={C.text} fontWeight="700" fontFamily="system-ui">Campaign Dashboard</text>
      {/* Live badge */}
      <rect x="226" y="11" width="36" height="14" rx="7" fill={C.greenBg} />
      <text x="244" y="21" fontSize="7" fill={C.green} fontWeight="700" textAnchor="middle" fontFamily="system-ui">● Live</text>

      {/* Stat row */}
      {stats.map(({ val, label, delta }, i) => {
        const x = 14 + i * 64;
        return (
          <g key={label}>
            <rect x={x} y="36" width="58" height="32" rx="4" fill={C.bg} stroke={C.border} strokeWidth="0.8" />
            <text x={x + 29} y="49" fontSize="11" fill={C.text} fontWeight="800" textAnchor="middle" fontFamily="system-ui">{val}</text>
            <text x={x + 8} y="61" fontSize="6" fill={C.faint} fontFamily="system-ui">{label}</text>
            <text x={x + 50} y="61" fontSize="6" fill={C.green} fontWeight="600" textAnchor="end" fontFamily="system-ui">{delta}</text>
          </g>
        );
      })}

      {/* Sequence rows */}
      <text x="14" y="82" fontSize="7" fill={C.sub} fontWeight="600" fontFamily="system-ui" letterSpacing="0.05em">SEQUENCES</text>
      {rows.map(({ name, pct }, i) => {
        const y = 88 + i * 16;
        const barW = 100;
        const fill = pct / 68;
        return (
          <g key={name}>
            <text x="14" y={y + 8} fontSize="7.5" fill={C.text} fontFamily="system-ui">{name}</text>
            {/* Track */}
            <rect x="138" y={y + 1} width={barW} height="9" rx="4.5" fill={C.muted} />
            {/* Fill */}
            <rect x="138" y={y + 1} width={barW * fill} height="9" rx="4.5" fill={C.text} fillOpacity={0.7} />
            <text x="244" y={y + 8} fontSize="6.5" fill={C.sub} fontFamily="system-ui">{pct}%</text>
          </g>
        );
      })}

      {/* View report button */}
      <rect x="14" y="148" width="252" height="1" fill={C.border} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2. Revenue Operations — CRM Kanban pipeline
───────────────────────────────────────────────────────────────────────── */
function RevenueViz() {
  const cols = [
    { label: "Prospect", count: 12, accent: C.faint,  deals: [{ co: "Acme Corp",  val: "$24k", init: "A", col: "#e2e8f0", tc: C.sub   }, { co: "Bravo Inc", val: "$18k", init: "B", col: "#fef9c3", tc: C.amber }] },
    { label: "Qualified", count: 8, accent: C.blue,   deals: [{ co: "Beta LLC",   val: "$45k", init: "B", col: C.blueBg,  tc: C.blue  }, { co: "Gamma Co",  val: "$28k", init: "G", col: "#ede9fe", tc: C.purple }] },
    { label: "Proposal",  count: 5, accent: C.amber,  deals: [{ co: "Delta Ltd",  val: "$32k", init: "D", col: C.amberBg, tc: C.amber }] },
    { label: "Won",       count: 3, accent: C.green,  deals: [{ co: "Alpha SA",   val: "$89k", init: "A", col: C.greenBg, tc: C.green }] },
  ];
  const colW = 61, gap = 4, sx = 9;
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s2" />
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s2)" />

      {/* Header */}
      <rect x="6" y="4" width="268" height="26" rx="8" fill={C.muted} />
      <rect x="6" y="18" width="268" height="12" fill={C.muted} />
      <line x1="6" y1="30" x2="274" y2="30" stroke={C.border} strokeWidth="1" />
      <text x="16" y="21" fontSize="8.5" fill={C.text} fontWeight="700" fontFamily="system-ui">Pipeline</text>
      <text x="140" y="21" fontSize="7.5" fill={C.faint} textAnchor="middle" fontFamily="system-ui">Q1 2024</text>
      <text x="263" y="21" fontSize="8.5" fill={C.green} fontWeight="700" textAnchor="end" fontFamily="system-ui">$284k</text>

      {/* Columns */}
      {cols.map((col, ci) => {
        const x = sx + ci * (colW + gap);
        return (
          <g key={col.label}>
            <rect x={x} y="33" width={colW} height="121" rx="4" fill={C.muted} />
            {/* Column header */}
            <text x={x + colW / 2} y="44" fontSize="7" fill={C.sub} fontWeight="600" textAnchor="middle" fontFamily="system-ui">{col.label}</text>
            {/* Count badge */}
            <rect x={x + colW / 2 - 8} y="47" width="16" height="11" rx="5.5" fill={C.bg} stroke={C.border} strokeWidth="0.7" />
            <text x={x + colW / 2} y="55" fontSize="6.5" fill={col.accent} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{col.count}</text>

            {/* Deal cards */}
            {col.deals.map((deal, di) => {
              const cy = 62 + di * 36;
              return (
                <g key={deal.co}>
                  {/* Card with left accent for Won */}
                  <rect x={x + 4} y={cy} width={colW - 8} height="30" rx="4" fill={C.bg} stroke={C.border} strokeWidth="0.7" filter="url(#s2)" />
                  {ci === 3 && <rect x={x + 4} y={cy} width="3" height="30" rx="1.5" fill={C.green} />}
                  {/* Avatar */}
                  <rect x={x + 8} y={cy + 7} width="14" height="14" rx="7" fill={deal.col} />
                  <text x={x + 15} y={cy + 17} fontSize="6.5" fill={deal.tc} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{deal.init}</text>
                  {/* Text */}
                  <text x={x + 25} y={cy + 12} fontSize="6.5" fill={C.text} fontWeight="600" fontFamily="system-ui">{deal.co}</text>
                  <text x={x + 25} y={cy + 22} fontSize="7" fill={col.accent} fontWeight="700" fontFamily="system-ui">{deal.val}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3. Frontend Experiences — App dashboard
───────────────────────────────────────────────────────────────────────── */
function FrontendViz() {
  const navItems = ["Home", "Reports", "Users", "Settings"];
  const statCards = [
    { label: "Revenue",  val: "$124k", delta: "+18%", color: C.greenBg,  tc: C.green  },
    { label: "Uptime",   val: "99.9%", delta: "↑",    color: C.blueBg,   tc: C.blue   },
    { label: "Users",    val: "1,284", delta: "+94",   color: C.purpleBg, tc: C.purple },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s3" />
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s3)" />

      {/* Top nav */}
      <rect x="6" y="4" width="268" height="24" rx="8" fill={C.text} />
      <rect x="6" y="16" width="268" height="12" fill={C.text} />
      <text x="18" y="19" fontSize="8.5" fill="white" fontWeight="800" fontFamily="system-ui">MyApp</text>
      {navItems.map((n, i) => (
        <text key={n} x={62 + i * 38} y="19" fontSize="7" fill="white" fillOpacity={i === 0 ? 0.9 : 0.4} fontFamily="system-ui">{n}</text>
      ))}
      {/* Avatar */}
      <rect x="253" y="10" width="16" height="16" rx="8" fill="#334155" />
      <text x="261" y="21" fontSize="7" fill="white" textAnchor="middle" fontFamily="system-ui">A</text>

      {/* Sidebar */}
      <rect x="6" y="28" width="36" height="128" fill={C.muted} />
      <line x1="42" y1="28" x2="42" y2="156" stroke={C.border} strokeWidth="1" />
      {["◈","⊞","⊙","≡"].map((ic, i) => (
        <g key={ic}>
          <rect x="10" y={36 + i * 22} width="28" height="16" rx="3" fill={i === 0 ? C.text : "transparent"} />
          <text x="24" y={47 + i * 22} fontSize="9" fill={i === 0 ? "white" : C.faint} textAnchor="middle" fontFamily="system-ui">{ic}</text>
        </g>
      ))}

      {/* Stat cards */}
      {statCards.map(({ label, val, delta, color, tc }, i) => {
        const x = 48 + i * 76;
        return (
          <g key={label}>
            <rect x={x} y="32" width="70" height="36" rx="5" fill={C.bg} stroke={C.border} strokeWidth="0.8" filter="url(#s3)" />
            <text x={x + 8} y="45" fontSize="6.5" fill={C.sub} fontFamily="system-ui">{label}</text>
            <text x={x + 8} y="57" fontSize="11" fill={C.text} fontWeight="800" fontFamily="system-ui">{val}</text>
            <rect x={x + 44} y="36" width="20" height="11" rx="5.5" fill={color} />
            <text x={x + 54} y="44" fontSize="6" fill={tc} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{delta}</text>
          </g>
        );
      })}

      {/* Chart */}
      <rect x="48" y="74" width="220" height="74" rx="5" fill={C.bg} stroke={C.border} strokeWidth="0.8" />
      <text x="58" y="86" fontSize="7" fill={C.text} fontWeight="700" fontFamily="system-ui">Revenue trend</text>
      <text x="258" y="86" fontSize="6.5" fill={C.sub} textAnchor="end" fontFamily="system-ui">Last 7 months</text>
      {/* Grid */}
      {[96,108,120,132].map(y => (
        <line key={y} x1="56" y1={y} x2="260" y2={y} stroke={C.border} strokeWidth="0.6" />
      ))}
      {/* Area */}
      <polygon points="56,144 68,132 96,120 124,124 152,108 180,102 208,90 236,82 236,144" fill={C.text} fillOpacity="0.04" />
      {/* Line */}
      <polyline points="56,144 68,132 96,120 124,124 152,108 180,102 208,90 236,82"
        stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      {/* Dots */}
      {[[56,144],[96,120],[152,108],[208,90],[236,82]].map(([px,py]) => (
        <circle key={px} cx={px} cy={py} r="2.5" fill={C.bg} stroke={C.text} strokeWidth="1.5" strokeOpacity="0.7" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4. Hiring Systems — ATS pipeline board
───────────────────────────────────────────────────────────────────────── */
function HiringViz() {
  const stages = [
    { label: "Applied",   count: 24,
      cards: [{ name: "Sarah K.", score: 82, scoreColor: C.amber,  scoreBg: C.amberBg,  avatarBg: "#fce7f3", avatarC: "#be185d" },
              { name: "James L.", score: 76, scoreColor: C.sub,    scoreBg: C.muted,    avatarBg: "#e0f2fe", avatarC: "#0369a1" }] },
    { label: "Screened",  count: 11,
      cards: [{ name: "Priya M.", score: 91, scoreColor: C.green,  scoreBg: C.greenBg,  avatarBg: C.purpleBg,avatarC: C.purple },
              { name: "Tom R.",   score: 85, scoreColor: C.green,  scoreBg: C.greenBg,  avatarBg: C.amberBg, avatarC: C.amber  }] },
    { label: "Interview", count: 5,
      cards: [{ name: "Alex W.",  score: 94, scoreColor: C.green,  scoreBg: C.greenBg,  avatarBg: C.blueBg,  avatarC: C.blue   }] },
    { label: "Offer",     count: 2,
      cards: [{ name: "Priya M.", score: 91, scoreColor: C.green,  scoreBg: C.greenBg,  avatarBg: C.purpleBg,avatarC: C.purple }] },
  ];
  const colW = 62, gap = 3, sx = 8;
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s4" />
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s4)" />

      {/* Header */}
      <rect x="6" y="4" width="268" height="26" rx="8" fill={C.muted} />
      <rect x="6" y="18" width="268" height="12" fill={C.muted} />
      <line x1="6" y1="30" x2="274" y2="30" stroke={C.border} strokeWidth="1" />
      <text x="16" y="21" fontSize="8" fill={C.text} fontWeight="700" fontFamily="system-ui">Senior Engineer — Pipeline</text>
      <rect x="208" y="13" width="54" height="13" rx="6.5" fill={C.blueBg} />
      <text x="235" y="22" fontSize="6.5" fill={C.blue} fontWeight="700" textAnchor="middle" fontFamily="system-ui">✦ AI Scoring</text>

      {stages.map((stage, ci) => {
        const x = sx + ci * (colW + gap);
        return (
          <g key={stage.label}>
            <rect x={x} y="33" width={colW} height="121" rx="4" fill={C.muted} />
            {/* Col header */}
            <text x={x + colW / 2} y="44" fontSize="7" fill={C.sub} fontWeight="600" textAnchor="middle" fontFamily="system-ui">{stage.label}</text>
            <rect x={x + colW/2 - 9} y="47" width="18" height="11" rx="5.5" fill={C.bg} stroke={C.border} strokeWidth="0.7" />
            <text x={x + colW/2} y="55" fontSize="6.5" fill={C.text} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{stage.count}</text>

            {stage.cards.map((c, di) => {
              const cy = 62 + di * 38;
              return (
                <g key={c.name}>
                  <rect x={x+4} y={cy} width={colW-8} height="32" rx="4" fill={C.bg} stroke={C.border} strokeWidth="0.7" filter="url(#s4)" />
                  {/* Avatar */}
                  <rect x={x+8} y={cy+6} width="16" height="16" rx="8" fill={c.avatarBg} />
                  <text x={x+16} y={cy+17} fontSize="7" fill={c.avatarC} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{c.name[0]}</text>
                  {/* Name */}
                  <text x={x+27} y={cy+13} fontSize="6.5" fill={C.text} fontWeight="600" fontFamily="system-ui">{c.name}</text>
                  {/* Score badge */}
                  <rect x={x+27} y={cy+17} width="28" height="11" rx="5.5" fill={c.scoreBg} />
                  <text x={x+41} y={cy+25} fontSize="6" fill={c.scoreColor} fontWeight="700" textAnchor="middle" fontFamily="system-ui">AI {c.score}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   5. Backend Infrastructure — Integration hub
───────────────────────────────────────────────────────────────────────── */
function BackendViz() {
  const sources = [
    { name: "Salesforce", icon: "⬡", bg: "#fef2f2", tc: "#dc2626" },
    { name: "Shopify",    icon: "⬡", bg: "#f0fdf4", tc: "#16a34a" },
    { name: "HubSpot",    icon: "⬡", bg: "#fff7ed", tc: "#ea580c" },
    { name: "Stripe",     icon: "⬡", bg: "#faf5ff", tc: "#7c3aed" },
  ];
  const dests = [
    { name: "Warehouse",  bg: C.blueBg,   tc: C.blue   },
    { name: "Analytics",  bg: C.purpleBg, tc: C.purple },
    { name: "Webhooks",   bg: C.amberBg,  tc: C.amber  },
    { name: "Alerts",     bg: C.greenBg,  tc: C.green  },
  ];
  const srcY  = [24, 52, 80, 108];
  const dstY  = [24, 52, 80, 108];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s5" />
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s5)" />

      {/* Header */}
      <rect x="6" y="4" width="268" height="26" rx="8" fill={C.muted} />
      <rect x="6" y="18" width="268" height="12" fill={C.muted} />
      <line x1="6" y1="30" x2="274" y2="30" stroke={C.border} strokeWidth="1" />
      <text x="16" y="21" fontSize="8.5" fill={C.text} fontWeight="700" fontFamily="system-ui">Integration Hub</text>
      <rect x="212" y="13" width="52" height="13" rx="6.5" fill={C.greenBg} />
      <circle cx="220" cy="19.5" r="3" fill={C.green} />
      <text x="248" y="23" fontSize="6.5" fill={C.green} fontWeight="700" textAnchor="middle" fontFamily="system-ui">All systems live</text>

      {/* Source tiles */}
      {sources.map(({ name, bg, tc }, i) => (
        <g key={name}>
          <rect x="12" y={32 + srcY[i]} width="64" height="20" rx="4" fill={bg} stroke={C.border} strokeWidth="0.7" />
          <rect x="16" y={36 + srcY[i]} width="12" height="12" rx="3" fill={tc} fillOpacity={0.15} />
          <text x="23" y={44 + srcY[i]} fontSize="7" fill={tc} fontWeight="700" textAnchor="middle" fontFamily="system-ui">✦</text>
          <text x="34" y={44 + srcY[i]} fontSize="7" fill={C.text} fontWeight="600" fontFamily="system-ui">{name}</text>
          <circle cx="70" cy={42 + srcY[i]} r="3" fill={C.green} />
        </g>
      ))}

      {/* Center hub */}
      <rect x="100" y="42" width="80" height="72" rx="6" fill={C.text} fillOpacity={0.03} stroke={C.text} strokeWidth="1" strokeOpacity={0.12} />
      <rect x="108" y="52" width="64" height="20" rx="4" fill={C.text} fillOpacity={0.06} />
      <text x="140" y="66" fontSize="8" fill={C.text} fontWeight="800" textAnchor="middle" fontFamily="system-ui">Pipeline</text>
      <text x="140" y="78" fontSize="6.5" fill={C.sub} textAnchor="middle" fontFamily="system-ui">Transform &amp; Route</text>
      {/* Pulse */}
      <circle cx="140" cy="94" r="7" fill={C.text} fillOpacity={0.06} />
      <circle cx="140" cy="94" r="4" fill={C.text} fillOpacity={0.12} />
      <circle cx="140" cy="94" r="2" fill={C.text} fillOpacity={0.3} />

      {/* Destination tiles */}
      {dests.map(({ name, bg, tc }, i) => (
        <g key={name}>
          <rect x="204" y={32 + dstY[i]} width="64" height="20" rx="4" fill={bg} stroke={C.border} strokeWidth="0.7" />
          <text x="236" y={44 + dstY[i]} fontSize="7" fill={tc} fontWeight="600" textAnchor="middle" fontFamily="system-ui">{name}</text>
        </g>
      ))}

      {/* Connector lines */}
      {srcY.map(y => <line key={y} x1="76" y1={42+y} x2="100" y2="78" stroke={C.border} strokeWidth="1" strokeDasharray="3 2" />)}
      {dstY.map(y => <line key={y} x1="180" y1="78" x2="204" y2={42+y} stroke={C.blue} strokeWidth="1" strokeOpacity={0.25} strokeDasharray="3 2" />)}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   6. AI Strategy & Training — 3-phase roadmap
───────────────────────────────────────────────────────────────────────── */
function StrategyViz() {
  const phases = [
    {
      label: "Assess",   week: "Wk 1–2", done: true,
      bg: C.muted, border: C.border,
      items: ["AI Readiness Audit", "Stack Inventory", "Quick Win Mapping"],
      badgeBg: C.greenBg, badgeText: "Complete", badgeTc: C.green,
    },
    {
      label: "Build",    week: "Wk 3–6", done: false, active: true,
      bg: "#eff6ff", border: "#bfdbfe",
      items: ["Pilot Automation", "Team Workshops", "Tool Selection"],
      badgeBg: C.amberBg, badgeText: "In progress", badgeTc: C.amber,
    },
    {
      label: "Scale",    week: "Wk 7+",  done: false,
      bg: C.muted, border: C.border,
      items: ["Org-wide Rollout", "Ongoing Training", "ROI Tracking"],
      badgeBg: C.muted, badgeText: "Upcoming", badgeTc: C.faint,
    },
  ];
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full h-full" aria-hidden="true">
      <Defs id="s6" />
      <rect x="6" y="4" width="268" height="152" rx="8" fill={C.bg} stroke={C.border} strokeWidth="1" filter="url(#s6)" />

      {/* Header */}
      <rect x="6" y="4" width="268" height="26" rx="8" fill={C.muted} />
      <rect x="6" y="18" width="268" height="12" fill={C.muted} />
      <line x1="6" y1="30" x2="274" y2="30" stroke={C.border} strokeWidth="1" />
      <text x="16" y="21" fontSize="8.5" fill={C.text} fontWeight="700" fontFamily="system-ui">AI Strategy Roadmap</text>
      {/* Progress bar */}
      <rect x="170" y="15" width="96" height="7" rx="3.5" fill={C.border} />
      <rect x="170" y="15" width="44" height="7" rx="3.5" fill={C.amber} fillOpacity={0.8} />
      <text x="170" y="13" fontSize="5.5" fill={C.faint} fontFamily="system-ui">Overall progress</text>

      {/* Timeline */}
      <line x1="24" y1="44" x2="256" y2="44" stroke={C.border} strokeWidth="1.5" />
      {[24, 110, 196, 256].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="44" r={i === 0 || i === 3 ? 0 : 5} fill={i === 1 ? C.blue : C.border} stroke={i===1 ? C.blueBg : C.border} strokeWidth="2" />
          {i < 3 && <text x={24 + i * 86} y="39" fontSize="6" fill={C.faint} textAnchor="middle" fontFamily="system-ui">{phases[i].week}</text>}
        </g>
      ))}

      {/* Phase columns */}
      {phases.map(({ label, bg, border, items, done, badgeBg, badgeText, badgeTc }, ci) => {
        const x = 12 + ci * 88;
        return (
          <g key={label}>
            <rect x={x} y="50" width="82" height="104" rx="5" fill={bg} stroke={border} strokeWidth="0.8" />

            {/* Phase label */}
            <text x={x + 41} y="63" fontSize="8" fill={C.text} fontWeight="700" textAnchor="middle" fontFamily="system-ui">Phase {ci+1}</text>
            <text x={x + 41} y="73" fontSize="6.5" fill={C.sub} textAnchor="middle" fontFamily="system-ui">{label}</text>

            {/* Badge */}
            <rect x={x + 10} y="76" width="62" height="13" rx="6.5" fill={badgeBg} />
            <text x={x + 41} y="85" fontSize="6" fill={badgeTc} fontWeight="700" textAnchor="middle" fontFamily="system-ui">{badgeText}</text>

            {/* Items */}
            {items.map((item, ii) => (
              <g key={item}>
                {done
                  ? <circle cx={x+16} cy={99+ii*16} r="4" fill={C.greenBg} stroke={C.green} strokeWidth="0.7" />
                  : <rect x={x+12} y={95+ii*16} width="8" height="8" rx="2" stroke={border} strokeWidth="0.8" fill={C.bg} />
                }
                {done && <text x={x+16} y={102+ii*16} fontSize="5.5" fill={C.green} fontWeight="700" textAnchor="middle" fontFamily="system-ui">✓</text>}
                <text x={x+24} y={102+ii*16} fontSize="6.5" fill={C.text} fontFamily="system-ui">{item}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const specializations = [
  { title: "Lead Generation",       tags: ["AI Cold Email", "Outbound Automation", "Content Systems"],            viz: <LeadViz />     },
  { title: "Revenue Operations",    tags: ["CRM Automation", "Pipeline Optimization", "AI Nurture Sequences"],    viz: <RevenueViz />  },
  { title: "Frontend Experiences",  tags: ["Custom Web Apps", "Landing Pages", "Interactive Demos"],              viz: <FrontendViz /> },
  { title: "Hiring Systems",        tags: ["Intake Funnels", "AI Scoring", "Trial Automation"],                   viz: <HiringViz />   },
  { title: "Backend Infrastructure",tags: ["API Integrations", "Data Pipelines", "AI Agent Systems"],            viz: <BackendViz />  },
  { title: "AI Strategy & Training",tags: ["Team Workshops", "AI Roadmapping", "Tool Selection"],                viz: <StrategyViz /> },
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
              <div className="w-full bg-[#f8fafc] border-b border-black/8 overflow-hidden" style={{ height: "180px" }}>
                {spec.viz}
              </div>
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">{spec.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {spec.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center h-7 px-3 border border-black/12 text-xs text-[#0a0a0a]/55 font-medium">
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
