"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Introducing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0a0a0a] noise pt-16 pb-28 md:py-28 px-6">
      <div className="max-w-[90rem] mx-auto" ref={ref}>

        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/60 uppercase tracking-[0.12em]">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            Introducing Pivot Studio
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              className="section-headline text-white"
            >
              More revenue in less time.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
              className="text-xl text-white/50 leading-relaxed max-w-2xl"
            >
              DJ and his team build the AI systems, custom apps, and automated workflows that free up your time, tighten your operations, and let your business scale without adding headcount. No fluff, no vague roadmaps — just working software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
            >
              <ArrowButton
                href="https://cal.com/djwooster/intro-call"
                external
                variant="light"
                className="w-full md:w-auto h-12 px-7 text-sm"
              >
                Let&apos;s talk
              </ArrowButton>
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "3 / 4", maxHeight: "560px" }}
          >
            <Image
              src="/dj-image-2.png"
              alt="DJ — founder of Pivot Studio"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
