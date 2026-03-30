"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const specializations = [
  // {
  //   title: "Lead Generation",
  //   tags: ["AI Cold Email", "Outbound Automation", "Content Pipelines"],
  //   image: "/leadImage-1.png",
  // },
  {
    title: "Revenue Operations",
    tags: ["CRM Automation", "Pipeline Optimization", "AI Nurture Sequences"],
    image: "/rev-ops-image.png",
  },
  {
    title: "Frontend Experiences",
    tags: ["Custom Web Apps", "Landing Pages", "Interactive Demos"],
    image: "/front-end.png",
  },
  // {
  //   title: "Hiring Systems",
  //   tags: ["Intake Funnels", "AI Scoring", "Trial Automation"],
  //   image: "/hiring.png",
  // },
  {
    title: "Backend Infrastructure",
    tags: ["API Integrations", "Data Pipelines", "AI Agent Systems"],
    image: "/backend-infra.png",
  },
  {
    title: "AI Strategy & Training",
    tags: ["Team Workshops", "AI Roadmapping", "Tool Selection"],
    image: "/ai-strategy.png",
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
          <h2 className="section-headline text-[#0a0a0a] max-w-2xl mb-6">
            What we specialize in.
          </h2>
          <p className="text-xl text-[#0a0a0a]/50 leading-relaxed max-w-2xl">
            From the first touchpoint to the backend that powers it — we build the systems that turn your operations into a competitive advantage.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {specializations.map((spec) => (
            <motion.div
              key={spec.title}
              variants={fadeUp}
              className="flex flex-col border border-black/10 bg-white hover:border-black/25 transition-colors duration-200"
            >
              {/* Image area */}
              <div className="relative w-full overflow-hidden bg-[#f8fafc] border-b border-black/8" style={{ height: "180px" }}>
                <Image
                  src={spec.image}
                  alt={spec.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Label + tags */}
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">{spec.title}</h3>
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
