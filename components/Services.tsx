"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="18" y1="18" x2="25" y2="25" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" />
      <line x1="9" y1="12" x2="15" y2="12" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="12" y1="9" x2="12" y2="15" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="6" height="11" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <rect x="11" y="9" width="6" height="16" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <rect x="19" y="4" width="6" height="21" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="3" y1="25" x2="25" y2="25" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.3} strokeLinecap="round" />
    </svg>
  );
}

function RetainerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.7} />
      <path
        d="M14 8 L14 14 L19 14"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeOpacity={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4 C23 6.5 25 10 25 14"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeOpacity={0.4}
        strokeLinecap="round"
      />
      <path
        d="M22 2 L20 5 L24 5 Z"
        fill="#0a0a0a"
        fillOpacity={0.45}
      />
    </svg>
  );
}

const services = [
  {
    icon: <SearchIcon />,
    popular: false,
    title: "Workflow Audit",
    description:
      "Know exactly where you're leaving money on the table. You'll walk away with a prioritized plan showing your highest-ROI changes — and the numbers to back it up.",
    price: "$2,500",
    priceNote: "One-time",
    features: ["2-week engagement", "Process map + report", "Prioritized action plan", "30-min debrief call"],
  },
  {
    icon: <BuildIcon />,
    popular: true,
    title: "Automation & App Builds",
    description:
      "Stop losing hours to work a system should handle. We build the tool, you get the time back — and a business that scales without adding headcount.",
    price: "$5k–$20k+",
    priceNote: "Per project",
    features: ["Hours recovered every week", "Faster client delivery", "Less reliance on manual effort", "Built once, runs forever"],
  },
  {
    icon: <RetainerIcon />,
    popular: false,
    title: "Monthly Retainer",
    description:
      "Your stack keeps getting sharper without you having to think about it. We ship improvements and build new systems month over month — so you scale without the overhead of hiring.",
    price: "$750–$2,500",
    priceNote: "Per month",
    features: ["Weekly check-ins", "Unlimited support requests", "New feature builds", "Priority response"],
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" id="services">
      <div className="max-w-[90rem] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            What We Offer
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Three ways to work with us.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-5"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={fadeUp}
              className="group relative flex flex-col gap-6 p-8 border border-black/10 bg-[#fafafa] hover:border-black/40 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              {svc.popular && (
                <span className="absolute -top-3 right-6 bg-[#0a0a0a] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  Most Popular
                </span>
              )}
              <div className="w-12 h-12 bg-black/5 flex items-center justify-center">
                {svc.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#0a0a0a]">{svc.title}</h3>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{svc.description}</p>
              </div>

              <ul className="flex flex-col gap-2 mt-auto">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#0a0a0a]/55">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6 L5 9 L10 3" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-black/8">
                <p className="text-2xl font-bold text-[#0a0a0a]">{svc.price}</p>
                <p className="text-xs text-[#0a0a0a]/35 mt-0.5">{svc.priceNote}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
