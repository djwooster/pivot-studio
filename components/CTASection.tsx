"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ArrowButton from "@/components/ArrowButton";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise py-32 px-6" id="contact">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-start md:items-center gap-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/35">
            Ready to Build?
          </p>

          <h2
            className="font-extrabold text-white text-left md:text-center"
            style={{
              fontSize: "clamp(28px, 3.2vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Stop duct-taping your workflow.<br className="hidden sm:block" /> Let&apos;s build something real.
          </h2>

          <p className="text-base text-white/50 max-w-md leading-relaxed md:text-center">
            Book a free 30-minute call. We&apos;ll learn about your business, identify
            the highest-leverage opportunities, and tell you exactly how we&apos;d approach it.
            No pitch. No pressure.
          </p>

          <ArrowButton href="https://cal.com/djwooster/intro-call" external variant="light" className="w-full md:w-auto h-14 px-10 text-base">
            See if we&apos;re a fit
          </ArrowButton>

          <p className="text-xs text-white/25">
            Typical response within 24 hours. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
