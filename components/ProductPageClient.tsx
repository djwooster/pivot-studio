"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import CheckoutButton from "@/components/CheckoutButton";
import type { ShopProduct } from "@/lib/shop/products";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ── Hero illustrations ────────────────────────────────────────────────────────

function NotionHeroVisual() {
  return (
    <svg width="460" height="360" viewBox="0 0 460 360" fill="none" aria-hidden="true">
      <rect x="20" y="20" width="420" height="320" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="20" y="20" width="420" height="44" fill="white" fillOpacity="0.05"/>
      <circle cx="42" cy="42" r="6" fill="white" fillOpacity="0.18"/>
      <circle cx="60" cy="42" r="6" fill="white" fillOpacity="0.1"/>
      <circle cx="78" cy="42" r="6" fill="white" fillOpacity="0.07"/>
      <rect x="110" y="34" width="160" height="16" fill="white" fillOpacity="0.06"/>
      <rect x="20" y="64" width="420" height="1" fill="white" fillOpacity="0.07"/>
      <rect x="40" y="80" width="72" height="7" fill="white" fillOpacity="0.22"/>
      <rect x="180" y="80" width="60" height="7" fill="white" fillOpacity="0.14"/>
      <rect x="300" y="80" width="50" height="7" fill="white" fillOpacity="0.14"/>
      <rect x="400" y="80" width="28" height="7" fill="white" fillOpacity="0.14"/>
      {[96, 120, 144, 168, 192, 216, 240, 264].map((y, i) => (
        <g key={y}>
          <rect x="20" y={y} width="420" height="1" fill="white" fillOpacity="0.04"/>
          <rect x="40" y={y + 9} width={[90, 70, 82, 96, 68, 88, 74, 80][i]} height="5" fill="white" fillOpacity="0.12"/>
          <rect x="180" y={y + 7} width="50" height="11" fill="white" fillOpacity={[0.14, 0.08, 0.18, 0.1, 0.12, 0.08, 0.16, 0.1][i]}/>
          <rect x="300" y={y + 9} width="60" height="5" fill="white" fillOpacity="0.08"/>
          <rect x="400" y={y + 9} width="28" height="5" fill="white" fillOpacity="0.08"/>
        </g>
      ))}
      <rect x="40" y="298" width="10" height="10" fill="white" fillOpacity="0.18"/>
      <rect x="58" y="300" width="36" height="5" fill="white" fillOpacity="0.12"/>
    </svg>
  );
}

function UIKitHeroVisual() {
  return (
    <svg width="460" height="380" viewBox="0 0 460 380" fill="none" aria-hidden="true">
      {/* Window chrome */}
      <rect x="20" y="16" width="420" height="348" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="20" y="16" width="420" height="44" fill="white" fillOpacity="0.05"/>
      <circle cx="42" cy="38" r="6" fill="white" fillOpacity="0.18"/>
      <circle cx="60" cy="38" r="6" fill="white" fillOpacity="0.1"/>
      <circle cx="78" cy="38" r="6" fill="white" fillOpacity="0.07"/>
      <rect x="110" y="28" width="70" height="20" fill="white" fillOpacity="0.1"/>
      <rect x="186" y="28" width="58" height="20" fill="white" fillOpacity="0.05"/>
      <rect x="250" y="28" width="50" height="20" fill="white" fillOpacity="0.05"/>
      {/* Sidebar */}
      <rect x="20" y="60" width="100" height="304" fill="white" fillOpacity="0.03"/>
      <rect x="20" y="60" width="100" height="1" fill="white" fillOpacity="0.07"/>
      <rect x="120" y="60" width="1" height="304" fill="white" fillOpacity="0.07"/>
      <rect x="34" y="78" width="10" height="10" fill="white" fillOpacity="0.12"/>
      <rect x="50" y="80" width="52" height="6" fill="white" fillOpacity="0.15"/>
      <rect x="34" y="100" width="10" height="10" fill="white" fillOpacity="0.08"/>
      <rect x="50" y="102" width="40" height="6" fill="white" fillOpacity="0.1"/>
      <rect x="34" y="122" width="10" height="10" fill="white" fillOpacity="0.08"/>
      <rect x="50" y="124" width="48" height="6" fill="white" fillOpacity="0.1"/>
      <rect x="34" y="144" width="10" height="10" fill="white" fillOpacity="0.08"/>
      <rect x="50" y="146" width="44" height="6" fill="white" fillOpacity="0.1"/>
      {/* Main content */}
      <rect x="144" y="76" width="120" height="8" fill="white" fillOpacity="0.2"/>
      <rect x="144" y="96" width="86" height="6" fill="white" fillOpacity="0.1"/>
      {/* Button group */}
      <rect x="144" y="120" width="72" height="28" fill="white" fillOpacity="0.2"/>
      <rect x="224" y="120" width="72" height="28" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
      <rect x="304" y="120" width="72" height="28" fill="white" fillOpacity="0.06"/>
      <rect x="156" y="130" width="48" height="6" fill="white" fillOpacity="0.4" rx="1"/>
      <rect x="236" y="130" width="48" height="6" fill="white" fillOpacity="0.2" rx="1"/>
      <rect x="316" y="130" width="48" height="6" fill="white" fillOpacity="0.15" rx="1"/>
      {/* Card component */}
      <rect x="144" y="168" width="172" height="110" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="144" y="168" width="172" height="28" fill="white" fillOpacity="0.05"/>
      <rect x="158" y="178" width="60" height="6" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="158" y="210" width="144" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="158" y="222" width="120" height="5" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="158" y="234" width="130" height="5" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="158" y="254" width="56" height="18" fill="white" fillOpacity="0.15"/>
      <rect x="222" y="254" width="56" height="18" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1"/>
      {/* Input */}
      <rect x="326" y="168" width="132" height="32" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="340" y="180" width="72" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="326" y="212" width="132" height="32" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="340" y="224" width="56" height="5" fill="white" fillOpacity="0.07" rx="1"/>
      {/* Code section */}
      <rect x="144" y="296" width="316" height="52" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" strokeWidth="1"/>
      <rect x="158" y="308" width="16" height="5" fill="white" fillOpacity="0.25" rx="1"/>
      <rect x="182" y="308" width="80" height="5" fill="white" fillOpacity="0.12" rx="1"/>
      <rect x="158" y="320" width="16" height="5" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="182" y="320" width="110" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="158" y="332" width="16" height="5" fill="white" fillOpacity="0.12" rx="1"/>
      <rect x="182" y="332" width="64" height="5" fill="white" fillOpacity="0.08" rx="1"/>
    </svg>
  );
}

function SiteHeroVisual() {
  return (
    <svg width="460" height="360" viewBox="0 0 460 360" fill="none" aria-hidden="true">
      <rect x="20" y="20" width="420" height="320" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="20" y="20" width="420" height="40" fill="white" fillOpacity="0.05"/>
      <circle cx="38" cy="40" r="5" fill="white" fillOpacity="0.2"/>
      <circle cx="54" cy="40" r="5" fill="white" fillOpacity="0.12"/>
      <circle cx="70" cy="40" r="5" fill="white" fillOpacity="0.08"/>
      <rect x="90" y="32" width="200" height="16" fill="white" fillOpacity="0.07"/>
      <rect x="100" y="37" width="90" height="5" fill="white" fillOpacity="0.12" rx="1"/>
      <rect x="20" y="60" width="420" height="1" fill="white" fillOpacity="0.07"/>
      <rect x="38" y="72" width="8" height="8" fill="white" fillOpacity="0.25"/>
      <rect x="52" y="73" width="52" height="5" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="200" y="73" width="40" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="260" y="73" width="40" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="320" y="73" width="40" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="394" y="70" width="36" height="14" fill="white" fillOpacity="0.15"/>
      <rect x="38" y="108" width="170" height="12" fill="white" fillOpacity="0.22" rx="1"/>
      <rect x="38" y="126" width="140" height="12" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="38" y="152" width="220" height="6" fill="white" fillOpacity="0.09" rx="1"/>
      <rect x="38" y="164" width="190" height="6" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="38" y="176" width="170" height="6" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="38" y="200" width="96" height="22" fill="white" fillOpacity="0.2"/>
      <rect x="144" y="200" width="80" height="22" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
      <rect x="48" y="208" width="76" height="5" fill="white" fillOpacity="0.4" rx="1"/>
      <rect x="154" y="208" width="60" height="5" fill="white" fillOpacity="0.2" rx="1"/>
      <rect x="270" y="90" width="160" height="220" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <rect x="290" y="110" width="120" height="80" fill="white" fillOpacity="0.06"/>
      <rect x="290" y="206" width="80" height="6" fill="white" fillOpacity="0.12" rx="1"/>
      <rect x="290" y="218" width="110" height="4" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="290" y="228" width="95" height="4" fill="white" fillOpacity="0.06" rx="1"/>
      <rect x="290" y="248" width="60" height="18" fill="white" fillOpacity="0.15"/>
      <rect x="20" y="270" width="420" height="1" fill="white" fillOpacity="0.06"/>
      <rect x="38" y="284" width="60" height="5" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="160" y="284" width="60" height="5" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="282" y="284" width="60" height="5" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="404" y="284" width="24" height="5" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="38" y="298" width="44" height="5" fill="white" fillOpacity="0.06" rx="1"/>
      <rect x="160" y="298" width="50" height="5" fill="white" fillOpacity="0.06" rx="1"/>
      <rect x="282" y="298" width="40" height="5" fill="white" fillOpacity="0.06" rx="1"/>
    </svg>
  );
}

const heroVisuals: Record<string, React.FC> = {
  notion_template: NotionHeroVisual,
  ui_kit: UIKitHeroVisual,
  custom_site: SiteHeroVisual,
};

// ── Hero ──────────────────────────────────────────────────────────────────────

function ProductHero({ product }: { product: ShopProduct }) {
  const Visual = heroVisuals[product.id] ?? UIKitHeroVisual;

  return (
    <section className="bg-white pt-32 pb-20 px-6">
      <div className="max-w-[90rem] mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-5"
          >
            {product.tierLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.07 }}
            className="section-headline text-[#0a0a0a] mb-4"
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.14 }}
            className="text-[clamp(32px,3.5vw,52px)] font-extrabold text-[#0a0a0a] mb-6"
            style={{ letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {product.price}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
            className="text-lg text-[#0a0a0a]/50 leading-relaxed max-w-md mb-10"
          >
            {product.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.27 }}
            className="flex flex-col sm:flex-row gap-3 mb-5"
          >
            <div className="sm:w-56">
              <CheckoutButton productId={product.id} variant="dark" label={product.buttonLabel} />
            </div>
            <a
              href="#details"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-bold border border-black/15 text-[#0a0a0a]/70 hover:border-black/30 hover:text-[#0a0a0a] transition-colors duration-200"
            >
              What&apos;s included ↓
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
            className="text-[11px] text-[#0a0a0a]/25 font-medium"
          >
            {product.deliverable} · One-time payment · Secured by Stripe
          </motion.p>
        </div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          className="bg-[#0a0a0a] flex items-center justify-center p-10 noise"
        >
          <Visual />
        </motion.div>

      </div>
    </section>
  );
}

// ── What's Inside ─────────────────────────────────────────────────────────────

function ProductDetails({ product }: { product: ShopProduct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cols =
    product.features.length <= 4
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="details" className="bg-[#EDEAE4] py-28 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            What&apos;s Inside
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Everything you get.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid ${cols} gap-4`}
        >
          {product.features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={slideUp}
              className="bg-white border border-black/8 p-8 flex flex-col gap-4 hover:border-black/20 transition-colors duration-200"
            >
              <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">
                {feature.title}
              </h3>
              <p className="text-base text-[#0a0a0a]/50 leading-relaxed flex-1">
                {feature.description}
              </p>
              <p className="text-sm font-semibold text-[#0a0a0a]/35">
                Included →
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Who It's For ──────────────────────────────────────────────────────────────

function ProductAudience({ product }: { product: ShopProduct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            Is This For You?
          </p>
          <h2 className="section-headline text-[#0a0a0a]">
            Built for people who are ready to move.
          </h2>
        </motion.div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col divide-y divide-black/8"
        >
          {product.whoItIsFor.map((item) => (
            <motion.li
              key={item}
              variants={slideUp}
              className="flex items-start gap-4 py-6 first:pt-0 last:pb-0"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-[5px]">
                <path d="M3 8l3.5 3.5L13 4" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-lg text-[#0a0a0a]/70 leading-snug">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function ProductFAQ({ product }: { product: ShopProduct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#EDEAE4] py-28 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="md:sticky md:top-20 md:self-start"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            FAQ
          </p>
          <h2 className="section-headline text-[#0a0a0a]">
            Common questions.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col divide-y divide-black/8"
        >
          {product.faq.map((item) => (
            <motion.div
              key={item.question}
              variants={slideUp}
              className="py-8 first:pt-0 last:pb-0 flex flex-col gap-3"
            >
              <p className="text-lg font-bold text-[#0a0a0a] leading-snug">
                {item.question}
              </p>
              <p className="text-base text-[#0a0a0a]/50 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function ProductFinalCTA({ product }: { product: ShopProduct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-t border-black/8 pt-16"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35">
              Get Started Today
            </p>
            <p
              className="font-extrabold text-[#0a0a0a]"
              style={{ fontSize: "clamp(36px, 4vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {product.price}
            </p>
            <p className="text-[#0a0a0a]/40 text-sm font-medium">
              {product.deliverable} · One-time payment · Secured by Stripe
            </p>
          </div>

          <div className="md:min-w-[280px]">
            <CheckoutButton productId={product.id} variant="dark" label={product.buttonLabel} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ProductPageClient({ product }: { product: ShopProduct }) {
  return (
    <>
      <ProductHero product={product} />
      <ProductDetails product={product} />
      <ProductAudience product={product} />
      <ProductFAQ product={product} />
      <ProductFinalCTA product={product} />
    </>
  );
}
