"use client";

import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const words = "We build AI that actually ships.".split(" ");

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.09 },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.6 + i * 0.12 },
  }),
};

function HeroSVG() {
  return (
    <svg
      viewBox="0 0 560 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle
            key={`dot-${row}-${col}`}
            cx={60 + col * 64}
            cy={60 + row * 64}
            r={1.5}
            fill="#0a0a0a"
            fillOpacity={0.12}
          />
        ))
      )}

      {/* Horizontal grid lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`hline-${i}`}
          x1="60"
          y1={124 + i * 64}
          x2="500"
          y2={124 + i * 64}
          stroke="#0a0a0a"
          strokeOpacity={0.06}
          strokeWidth="1"
        />
      ))}
      {/* Vertical grid lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`vline-${i}`}
          x1={124 + i * 64}
          y1="60"
          x2={124 + i * 64}
          y2="500"
          stroke="#0a0a0a"
          strokeOpacity={0.06}
          strokeWidth="1"
        />
      ))}

      {/* Connection paths */}
      <path d="M 180 180 L 300 180 L 300 300 L 420 300" stroke="#0a0a0a" strokeOpacity={0.25} strokeWidth="1.5" strokeDasharray="6 4" />
      <path d="M 180 300 L 240 300 L 240 420 L 360 420" stroke="#0a0a0a" strokeOpacity={0.18} strokeWidth="1.5" strokeDasharray="6 4" />
      <path d="M 300 180 C 380 180 380 300 420 300" stroke="#0a0a0a" strokeOpacity={0.13} strokeWidth="1" strokeDasharray="4 6" />
      <path d="M 120 240 L 180 240 L 180 360 L 300 360" stroke="#0a0a0a" strokeOpacity={0.15} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 60 180 L 120 180 L 120 300 L 180 300" stroke="#0a0a0a" strokeOpacity={0.12} strokeWidth="1" strokeDasharray="4 4" />

      {/* Large primary nodes */}
      <circle cx="180" cy="180" r="18" stroke="#0a0a0a" strokeOpacity={0.35} strokeWidth="1.5" />
      <circle cx="180" cy="180" r="7" fill="#0a0a0a" fillOpacity={0.55} />
      <circle cx="300" cy="180" r="14" stroke="#0a0a0a" strokeOpacity={0.25} strokeWidth="1" />
      <circle cx="300" cy="180" r="5" fill="#0a0a0a" fillOpacity={0.4} />
      <circle cx="420" cy="300" r="22" stroke="#0a0a0a" strokeOpacity={0.4} strokeWidth="1.5" />
      <circle cx="420" cy="300" r="9" fill="#0a0a0a" fillOpacity={0.6} />
      <circle cx="180" cy="300" r="12" stroke="#0a0a0a" strokeOpacity={0.2} strokeWidth="1" />
      <circle cx="180" cy="300" r="4" fill="#0a0a0a" fillOpacity={0.35} />
      <circle cx="300" cy="360" r="16" stroke="#0a0a0a" strokeOpacity={0.28} strokeWidth="1.5" />
      <circle cx="300" cy="360" r="6" fill="#0a0a0a" fillOpacity={0.45} />
      <circle cx="120" cy="300" r="10" stroke="#0a0a0a" strokeOpacity={0.18} strokeWidth="1" />
      <circle cx="120" cy="300" r="4" fill="#0a0a0a" fillOpacity={0.3} />
      <circle cx="360" cy="420" r="12" stroke="#0a0a0a" strokeOpacity={0.22} strokeWidth="1" />
      <circle cx="360" cy="420" r="4.5" fill="#0a0a0a" fillOpacity={0.38} />
      <circle cx="240" cy="420" r="8" stroke="#0a0a0a" strokeOpacity={0.15} strokeWidth="1" />
      <circle cx="240" cy="420" r="3" fill="#0a0a0a" fillOpacity={0.25} />

      {/* Outer ring accent */}
      <circle cx="420" cy="300" r="36" stroke="#0a0a0a" strokeOpacity={0.08} strokeWidth="1" strokeDasharray="3 5" />

      {/* Accent dots */}
      <circle cx="460" cy="180" r="3" fill="#0a0a0a" fillOpacity={0.15} />
      <circle cx="480" cy="240" r="2" fill="#0a0a0a" fillOpacity={0.1} />
      <circle cx="60" cy="420" r="2.5" fill="#0a0a0a" fillOpacity={0.12} />
      <circle cx="440" cy="440" r="2" fill="#0a0a0a" fillOpacity={0.1} />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/40"
          >
            AI &amp; Automation Agency
          </motion.p>

          <h1 className="hero-headline text-[#0a0a0a]" aria-label="We build AI that actually ships.">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-[#0a0a0a]/55 leading-relaxed max-w-md"
          >
            We design, build, and deploy AI-powered workflows and custom
            applications that solve real operational problems — fast.
          </motion.p>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a]/85 transition-colors duration-200"
            >
              Book a Free Call
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center h-12 px-7 border border-black/20 text-[#0a0a0a] text-sm font-semibold hover:bg-black/5 transition-colors duration-200"
            >
              See Our Services
            </a>
          </motion.div>
        </div>

        {/* Right: SVG graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="hidden md:flex items-center justify-center w-full"
        >
          <div className="w-full max-w-[480px] aspect-square">
            <HeroSVG />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
