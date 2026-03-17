"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function WebDesignCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-start md:items-center gap-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Ready to Start?
          </p>

          <h2
            className="font-extrabold text-white text-left md:text-center"
            style={{ fontSize: "clamp(28px, 3.2vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Let&apos;s build something you&apos;re proud to send people to.
          </h2>

          <p className="text-base text-white/50 max-w-md leading-relaxed md:text-center">
            Book a free 30-minute call. We&apos;ll look at your current site, understand your goals, and tell you exactly how we&apos;d approach the redesign.
          </p>

          <motion.a
            href="https://cal.com/djwooster/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full md:w-auto items-center justify-center h-14 px-10 bg-white text-[#0a0a0a] text-base font-bold hover:bg-white/90 transition-colors duration-200"
          >
            Start a project
            <svg className="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <p className="text-xs text-white/25">Typical response within 24 hours. No spam, ever.</p>
        </motion.div>
      </div>
    </section>
  );
}
