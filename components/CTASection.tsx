"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-32 px-6" id="contact">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-start gap-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            Ready to Build?
          </p>

          <h2
            className="font-extrabold text-white text-left"
            style={{
              fontSize: "clamp(28px, 3.2vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Stop duct-taping your stack.<br className="hidden sm:block" /> Let&apos;s build something real.
          </h2>

          <p className="text-base text-white/50 max-w-md leading-relaxed">
            Book a free 30-minute call. We&apos;ll learn about your business, identify
            the highest-leverage opportunities, and tell you exactly how we&apos;d approach it.
            No pitch. No pressure.
          </p>

          <motion.a
            href="https://cal.com/djwooster/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center h-14 px-10 bg-white text-[#0a0a0a] text-base font-bold hover:bg-white/90 transition-colors duration-200"
          >
            See if we&apos;re a fit
            <svg
              className="ml-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8 H13 M9 4 L13 8 L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          <p className="text-xs text-white/25">
            Typical response within 24 hours. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
