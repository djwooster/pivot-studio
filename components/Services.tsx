// ease typed
"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="18" y1="18" x2="25" y2="25" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} strokeLinecap="round" />
      <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
      <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="6" height="11" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <rect x="11" y="9" width="6" height="16" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <rect x="19" y="4" width="6" height="21" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <line x1="3" y1="25" x2="25" y2="25" stroke="white" strokeWidth="1.5" strokeOpacity={0.3} strokeLinecap="round" />
    </svg>
  );
}

function RetainerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.5" strokeOpacity={0.7} />
      <path
        d="M14 8 L14 14 L19 14"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4 C23 6.5 25 10 25 14"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity={0.4}
        strokeLinecap="round"
      />
      <path
        d="M22 2 L20 5 L24 5 Z"
        fill="white"
        fillOpacity={0.45}
      />
    </svg>
  );
}

const services = [
  {
    icon: <SearchIcon />,
    title: "Workflow Audit",
    description:
      "A deep-dive into your current operations. We document your processes, identify automation opportunities, and deliver a prioritized roadmap with projected ROI.",
    price: "$2,500",
    priceNote: "One-time",
    features: ["2-week engagement", "Process map + report", "Prioritized action plan", "30-min debrief call"],
  },
  {
    icon: <BuildIcon />,
    title: "Automation & App Builds",
    description:
      "We design and build your custom solution — from n8n/Make automations to full-stack AI-powered applications. End-to-end, production-ready.",
    price: "$5k–$20k+",
    priceNote: "Per project",
    features: ["Custom scoped quote", "Full-stack development", "AI/LLM integration", "Deployment + handoff"],
  },
  {
    icon: <RetainerIcon />,
    title: "Monthly Retainer",
    description:
      "Ongoing technical partnership. We become your embedded AI and automation team — shipping improvements, fixing issues, and building new systems as you grow.",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-28 px-6" id="services">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
            What We Offer
          </p>
          <h2 className="section-headline text-white max-w-xl">
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
              className="group flex flex-col gap-6 p-8 rounded-lg border transition-all duration-200 cursor-default"
              style={{
                backgroundColor: "#111111",
                borderColor: "rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                {svc.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white">{svc.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{svc.description}</p>
              </div>

              <ul className="flex flex-col gap-2 mt-auto">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="1.5" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/8">
                <p className="text-2xl font-bold text-white">{svc.price}</p>
                <p className="text-xs text-white/35 mt-0.5">{svc.priceNote}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
