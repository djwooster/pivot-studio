"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const useCases = [
  {
    name: "CRM Dashboards",
    description: "Surface live pipeline data, deal stages, and rep performance in a clean custom interface — no more digging through your CRM to find what matters.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" />
        <line x1="2" y1="8" x2="18" y2="8" />
        <rect x="4" y="11" width="3" height="3" />
        <rect x="8.5" y="10" width="3" height="4" />
        <rect x="13" y="12" width="3" height="2" />
      </svg>
    ),
  },
  {
    name: "Client Portals",
    description: "Give clients a branded, password-protected space to view project status, approve deliverables, access invoices, and communicate — all in one place.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" />
        <circle cx="10" cy="8" r="3" />
        <path d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      </svg>
    ),
  },
  {
    name: "Internal Tools",
    description: "Replace the spreadsheets and manual processes your team works around every day. Custom ops tools built to match your workflow, not force you into someone else's.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" />
        <rect x="11" y="2" width="7" height="7" />
        <rect x="2" y="11" width="7" height="7" />
        <rect x="11" y="11" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Booking & Scheduling",
    description: "Custom booking flows that go beyond what Calendly can do — multi-step intake, conditional logic, service selection, and payments wired into your backend.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <rect x="2" y="4" width="16" height="14" />
        <line x1="2" y1="9" x2="18" y2="9" />
        <line x1="6" y1="2" x2="6" y2="6" />
        <line x1="14" y1="2" x2="14" y2="6" />
        <rect x="5" y="12" width="3" height="3" />
        <rect x="12" y="12" width="3" height="3" />
      </svg>
    ),
  },
  {
    name: "Proposal & Quoting",
    description: "Custom proposal builders that pull from your CRM, apply pricing logic, and let clients sign and pay — all without copying data between tools.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" />
        <line x1="6" y1="6" x2="14" y2="6" />
        <line x1="6" y1="9" x2="14" y2="9" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <path d="M12 14l2 2 3-3" />
      </svg>
    ),
  },
  {
    name: "Reporting & Analytics",
    description: "Custom dashboards that surface the metrics that actually matter to your business — pulling from multiple data sources into a single, clear view.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <polyline points="2,15 7,9 11,12 15,5 18,8" />
        <line x1="2" y1="18" x2="18" y2="18" />
        <line x1="2" y1="2" x2="2" y2="18" />
      </svg>
    ),
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" id="use-cases" ref={ref}>
      <div className="max-w-[90rem] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            What We Build
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-2xl mb-6">
            Built for the way your business actually works.
          </h2>
          <p className="text-xl text-[#0a0a0a]/50 leading-relaxed max-w-2xl">
            Every business has processes that off-the-shelf tools can&apos;t quite handle. We build the custom software that fills those gaps — purpose-built, integrated, and designed to be used every day.
          </p>
        </motion.div>

        <div className="border-t border-black/10 mt-16 mb-0" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px bg-black/10"
        >
          {useCases.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="bg-white pt-10 pb-12 px-8 flex flex-col gap-5"
            >
              {/* Icon */}
              <div className="text-[#0a0a0a]/60 shrink-0">
                {item.icon}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">{item.name}</h3>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{item.description}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
