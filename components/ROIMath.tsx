"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function ClockIcon({ dark }: { dark?: boolean }) {
  const color = dark ? "#0a0a0a" : "white";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="13" stroke={color} strokeWidth="1.5" strokeOpacity={dark ? 0.7 : 0.8} />
      <path d="M18 10 L18 18 L24 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={dark ? 0.7 : 0.8} />
    </svg>
  );
}

function ChartIcon({ dark }: { dark?: boolean }) {
  const color = dark ? "#0a0a0a" : "white";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <polyline points="5,28 13,18 20,23 31,10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={dark ? 0.7 : 0.8} />
      <circle cx="31" cy="10" r="2.5" fill={color} fillOpacity={dark ? 0.7 : 0.8} />
      <line x1="5" y1="31" x2="31" y2="31" stroke={color} strokeWidth="1.5" strokeOpacity={dark ? 0.3 : 0.3} strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon({ dark }: { dark?: boolean }) {
  const color = dark ? "#0a0a0a" : "white";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 6 C18 6 26 10 26 20 L18 28 L10 20 C10 10 18 6 18 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeOpacity={dark ? 0.7 : 0.8} />
      <circle cx="18" cy="17" r="3" stroke={color} strokeWidth="1.5" strokeOpacity={dark ? 0.7 : 0.8} />
      <path d="M12 24 L8 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity={dark ? 0.4 : 0.4} />
      <path d="M24 24 L28 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity={dark ? 0.4 : 0.4} />
    </svg>
  );
}

function TeamIcon({ dark }: { dark?: boolean }) {
  const color = dark ? "#0a0a0a" : "white";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="13" r="5" stroke={color} strokeWidth="1.5" strokeOpacity={dark ? 0.7 : 0.8} />
      <path d="M7 30 C7 24 12 20 18 20 C24 20 29 24 29 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity={dark ? 0.7 : 0.8} />
      <path d="M28 16 C30 16 32 18 32 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity={dark ? 0.35 : 0.35} />
      <path d="M8 16 C6 16 4 18 4 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity={dark ? 0.35 : 0.35} />
    </svg>
  );
}

const stats = [
  {
    value: "12+",
    label: "Hours saved per week",
    subtext: "Average time reclaimed by clients after their first automation build.",
    icon: (dark?: boolean) => <ClockIcon dark={dark} />,
    highlighted: true,
  },
  {
    value: "3–6×",
    label: "ROI within 90 days",
    subtext: "Typical return on a workflow audit and automation project combined.",
    icon: (dark?: boolean) => <ChartIcon dark={dark} />,
    highlighted: false,
  },
  {
    value: "< 30",
    label: "Days to first ship",
    subtext: "From signed contract to a working system running in production.",
    icon: (dark?: boolean) => <RocketIcon dark={dark} />,
    highlighted: false,
  },
  {
    value: "$0",
    label: "New headcount needed",
    subtext: "Our clients scale their output without growing their team.",
    icon: (dark?: boolean) => <TeamIcon dark={dark} />,
    highlighted: false,
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
      <div className="max-w-[90rem] mx-auto grid md:grid-cols-[2fr_3fr] gap-16 items-start" ref={ref}>

        {/* Left: headline + description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-6 md:sticky md:top-16 md:self-start"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/35">
            The Numbers
          </p>
          <h2 className="section-headline text-white">
            The math works in your favor.
          </h2>
          <p className="text-base text-white/50 leading-relaxed max-w-sm">
            Every engagement is designed to pay for itself — usually within the first quarter. Here&apos;s what clients actually see.
          </p>
        </motion.div>

        {/* Right: 2×2 card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat) => {
            const isHighlighted = stat.highlighted;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex flex-col gap-auto p-8"
                style={{
                  backgroundColor: isHighlighted ? "#ffffff" : "rgba(255,255,255,0.05)",
                  minHeight: "260px",
                }}
              >
                {/* Icon */}
                <div className="mb-auto pb-8">
                  {stat.icon(isHighlighted)}
                </div>

                {/* Description */}
                <p className={`text-base leading-relaxed mb-5 ${isHighlighted ? "text-[#0a0a0a]/60" : "text-white/50"}`}>
                  {stat.subtext}
                </p>

                {/* Divider */}
                <div className={`w-full h-px mb-5 ${isHighlighted ? "bg-black/15" : "bg-white/15"}`} />

                {/* Stat + Label */}
                <div className="flex flex-col gap-1">
                  <p
                    className={`font-extrabold leading-none ${isHighlighted ? "text-[#0a0a0a]" : "text-white"}`}
                    style={{ fontSize: "clamp(36px, 3.5vw, 52px)", letterSpacing: "-0.04em" }}
                  >
                    {stat.value}
                  </p>
                  <p className={`text-sm font-semibold ${isHighlighted ? "text-[#0a0a0a]/55" : "text-white/55"}`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
