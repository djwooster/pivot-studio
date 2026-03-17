"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const projects = [
  {
    name: "Meridian Law Group",
    description: "Brand refresh & conversion-focused site for a boutique litigation firm.",
    tags: ["Professional Services", "Lead Capture"],
    href: "#",
    placeholderBg: "#1a1a1a",
    accentOpacity: 0.06,
  },
  {
    name: "Loft & Co.",
    description: "Property listings, agent profiles, and inquiry flow for a boutique real estate agency.",
    tags: ["Real Estate", "Listings"],
    href: "#",
    placeholderBg: "#2a2a2a",
    accentOpacity: 0.08,
  },
  {
    name: "Clearpath Financial",
    description: "Trust-building site for an independent financial advisory practice.",
    tags: ["Finance", "Services"],
    href: "#",
    placeholderBg: "#111111",
    accentOpacity: 0.07,
  },
  {
    name: "Nomad Supply Co.",
    description: "E-commerce storefront with editorial-style product pages and fast checkout.",
    tags: ["E-commerce", "Shopify"],
    href: "#",
    placeholderBg: "#222222",
    accentOpacity: 0.09,
  },
  {
    name: "Apex Health",
    description: "Modern practice site for a multi-location healthcare group with online booking.",
    tags: ["Healthcare", "Booking"],
    href: "#",
    placeholderBg: "#181818",
    accentOpacity: 0.07,
  },
  {
    name: "Dune Creative",
    description: "Portfolio and case study site for a brand strategy and design agency.",
    tags: ["Agency", "Portfolio"],
    href: "#",
    placeholderBg: "#252525",
    accentOpacity: 0.08,
  },
];

// Minimal wireframe SVG to suggest a web page layout
function WireframeSVG() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Nav bar */}
      <rect x="32" y="28" width="60" height="10" rx="0" fill="white" fillOpacity={0.12} />
      <rect x="340" y="28" width="40" height="10" rx="0" fill="white" fillOpacity={0.07} />
      <rect x="390" y="28" width="30" height="10" rx="0" fill="white" fillOpacity={0.07} />
      <rect x="430" y="24" width="18" height="18" rx="0" fill="white" fillOpacity={0.15} />
      <line x1="32" y1="50" x2="448" y2="50" stroke="white" strokeOpacity={0.06} strokeWidth="1" />
      {/* Hero headline lines */}
      <rect x="32" y="76" width="260" height="18" rx="0" fill="white" fillOpacity={0.18} />
      <rect x="32" y="102" width="200" height="18" rx="0" fill="white" fillOpacity={0.18} />
      <rect x="32" y="128" width="140" height="10" rx="0" fill="white" fillOpacity={0.07} />
      <rect x="32" y="144" width="160" height="10" rx="0" fill="white" fillOpacity={0.07} />
      {/* CTA button */}
      <rect x="32" y="166" width="90" height="28" rx="0" fill="white" fillOpacity={0.2} />
      {/* Right image block */}
      <rect x="280" y="68" width="168" height="160" rx="0" fill="white" fillOpacity={0.06} />
      {/* Section below */}
      <line x1="32" y1="248" x2="448" y2="248" stroke="white" strokeOpacity={0.05} strokeWidth="1" />
      <rect x="32" y="264" width="80" height="8" rx="0" fill="white" fillOpacity={0.06} />
      <rect x="160" y="264" width="80" height="8" rx="0" fill="white" fillOpacity={0.06} />
      <rect x="288" y="264" width="80" height="8" rx="0" fill="white" fillOpacity={0.06} />
    </svg>
  );
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f5f5f5] py-28 px-6" id="work" ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
            Our Work
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Built to impress. Designed to convert.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              variants={fadeUp}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden"
              style={{ backgroundColor: project.placeholderBg }}
            >
              {/* Placeholder image area */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <WireframeSVG />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-sm font-bold border border-white/40 px-5 py-2.5">
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Project info */}
              <div className="px-7 py-6 flex flex-col gap-3 bg-white border-t border-black/8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#0a0a0a]">{project.name}</h3>
                  <svg
                    width="16" height="16" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 mt-0.5 text-[#0a0a0a]/25 group-hover:text-[#0a0a0a]/70 transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-[#0a0a0a]/40 border border-black/12 px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
