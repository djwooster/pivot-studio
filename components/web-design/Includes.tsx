"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const includes = [
  {
    title: "Custom design, no templates.",
    body: "Every site is designed from scratch to match your brand and audience. You won't find your layout on another business's site.",
  },
  {
    title: "Mobile-first, always.",
    body: "Over half your visitors are on their phone. We design for mobile first and ensure the experience is flawless on every screen.",
  },
  {
    title: "Built for speed.",
    body: "Fast sites rank higher and convert better. We build on modern stacks optimized for Core Web Vitals out of the box.",
  },
  {
    title: "Copy that earns its keep.",
    body: "We help you find the right words. Every headline, subhead, and CTA is written to move the reader toward a decision.",
  },
  {
    title: "Easy to update.",
    body: "Your site comes with a CMS so you can update content without touching code — or we can handle it for you on retainer.",
  },
  {
    title: "30 days of post-launch support.",
    body: "After launch, we're still in your corner. Tweaks, fixes, and small additions are covered for the first 30 days, no questions asked.",
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

export default function WebDesignIncludes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
            What&apos;s Included
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-px bg-black/8"
        >
          {includes.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-white px-8 py-10 flex flex-col gap-3"
            >
              <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">{item.title}</h3>
              <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
