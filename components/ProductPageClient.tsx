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

// ── Product visuals ───────────────────────────────────────────────────────────

function NotionVisual() {
  return (
    <svg width="320" height="260" viewBox="0 0 320 260" fill="none" aria-hidden="true">
      {/* Outer window */}
      <rect x="20" y="20" width="280" height="220" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
      {/* Title bar */}
      <rect x="20" y="20" width="280" height="36" fill="white" fillOpacity="0.05"/>
      <circle cx="38" cy="38" r="5" fill="white" fillOpacity="0.18"/>
      <circle cx="54" cy="38" r="5" fill="white" fillOpacity="0.1"/>
      <circle cx="70" cy="38" r="5" fill="white" fillOpacity="0.07"/>
      <rect x="100" y="33" width="120" height="10" rx="0" fill="white" fillOpacity="0.07"/>
      {/* Column headers */}
      <rect x="20" y="56" width="280" height="1" fill="white" fillOpacity="0.08"/>
      <rect x="32" y="66" width="60" height="6" fill="white" fillOpacity="0.2"/>
      <rect x="140" y="66" width="50" height="6" fill="white" fillOpacity="0.12"/>
      <rect x="230" y="66" width="40" height="6" fill="white" fillOpacity="0.12"/>
      {/* Row 1 */}
      <rect x="20" y="80" width="280" height="1" fill="white" fillOpacity="0.05"/>
      <rect x="32" y="91" width="80" height="5" fill="white" fillOpacity="0.12"/>
      <rect x="140" y="88" width="46" height="12" fill="white" fillOpacity="0.12"/>
      <rect x="230" y="91" width="50" height="5" fill="white" fillOpacity="0.08"/>
      {/* Row 2 */}
      <rect x="20" y="108" width="280" height="1" fill="white" fillOpacity="0.05"/>
      <rect x="32" y="119" width="65" height="5" fill="white" fillOpacity="0.12"/>
      <rect x="140" y="116" width="38" height="12" fill="white" fillOpacity="0.07"/>
      <rect x="230" y="119" width="44" height="5" fill="white" fillOpacity="0.08"/>
      {/* Row 3 */}
      <rect x="20" y="136" width="280" height="1" fill="white" fillOpacity="0.05"/>
      <rect x="32" y="147" width="90" height="5" fill="white" fillOpacity="0.12"/>
      <rect x="140" y="144" width="52" height="12" fill="white" fillOpacity="0.15"/>
      <rect x="230" y="147" width="36" height="5" fill="white" fillOpacity="0.08"/>
      {/* Row 4 */}
      <rect x="20" y="164" width="280" height="1" fill="white" fillOpacity="0.05"/>
      <rect x="32" y="175" width="72" height="5" fill="white" fillOpacity="0.12"/>
      <rect x="140" y="172" width="44" height="12" fill="white" fillOpacity="0.1"/>
      <rect x="230" y="175" width="55" height="5" fill="white" fillOpacity="0.08"/>
      {/* + New row */}
      <rect x="20" y="192" width="280" height="1" fill="white" fillOpacity="0.05"/>
      <rect x="32" y="203" width="8" height="8" fill="white" fillOpacity="0.15"/>
      <rect x="46" y="205" width="28" height="4" fill="white" fillOpacity="0.1"/>
    </svg>
  );
}

function UIKitVisual() {
  return (
    <svg width="320" height="280" viewBox="0 0 320 280" fill="none" aria-hidden="true">
      {/* Window chrome */}
      <rect x="20" y="16" width="280" height="248" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
      <rect x="20" y="16" width="280" height="36" fill="white" fillOpacity="0.05"/>
      <circle cx="38" cy="34" r="5" fill="white" fillOpacity="0.18"/>
      <circle cx="54" cy="34" r="5" fill="white" fillOpacity="0.1"/>
      <circle cx="70" cy="34" r="5" fill="white" fillOpacity="0.07"/>
      {/* Tabs */}
      <rect x="100" y="24" width="52" height="20" fill="white" fillOpacity="0.1"/>
      <rect x="158" y="24" width="44" height="20" fill="white" fillOpacity="0.04"/>
      <rect x="208" y="24" width="36" height="20" fill="white" fillOpacity="0.04"/>
      {/* Button components */}
      <rect x="36" y="68" width="76" height="24" fill="white" fillOpacity="0.18"/>
      <rect x="36" y="98" width="76" height="24" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
      <rect x="36" y="128" width="76" height="24" fill="white" fillOpacity="0.06"/>
      <rect x="40" y="76" width="40" height="4" fill="white" fillOpacity="0.35" rx="1"/>
      <rect x="40" y="106" width="36" height="4" fill="white" fillOpacity="0.25" rx="1"/>
      <rect x="40" y="136" width="32" height="4" fill="white" fillOpacity="0.2" rx="1"/>
      {/* Card component */}
      <rect x="136" y="68" width="148" height="100" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="148" y="82" width="56" height="6" fill="white" fillOpacity="0.2" rx="1"/>
      <rect x="148" y="96" width="112" height="4" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="148" y="106" width="90" height="4" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="148" y="116" width="100" height="4" fill="white" fillOpacity="0.07" rx="1"/>
      <rect x="148" y="138" width="44" height="18" fill="white" fillOpacity="0.15"/>
      {/* Input field */}
      <rect x="36" y="172" width="248" height="28" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
      <rect x="52" y="182" width="90" height="4" fill="white" fillOpacity="0.1" rx="1"/>
      {/* Code lines */}
      <rect x="36" y="220" width="12" height="4" fill="white" fillOpacity="0.25" rx="1"/>
      <rect x="56" y="220" width="60" height="4" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="36" y="232" width="12" height="4" fill="white" fillOpacity="0.15" rx="1"/>
      <rect x="56" y="232" width="100" height="4" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="36" y="244" width="12" height="4" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="56" y="244" width="80" height="4" fill="white" fillOpacity="0.06" rx="1"/>
    </svg>
  );
}

function SiteVisual() {
  return (
    <svg width="320" height="260" viewBox="0 0 320 260" fill="none" aria-hidden="true">
      {/* Browser frame */}
      <rect x="20" y="20" width="280" height="220" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
      {/* Browser chrome */}
      <rect x="20" y="20" width="280" height="32" fill="white" fillOpacity="0.05"/>
      <circle cx="36" cy="36" r="4" fill="white" fillOpacity="0.2"/>
      <circle cx="50" cy="36" r="4" fill="white" fillOpacity="0.12"/>
      <circle cx="64" cy="36" r="4" fill="white" fillOpacity="0.08"/>
      <rect x="80" y="28" width="160" height="16" fill="white" fillOpacity="0.07"/>
      <rect x="90" y="33" width="80" height="4" fill="white" fillOpacity="0.12" rx="1"/>
      {/* Nav */}
      <rect x="20" y="52" width="280" height="28" fill="white" fillOpacity="0.04"/>
      <rect x="32" y="62" width="6" height="8" fill="white" fillOpacity="0.25"/>
      <rect x="44" y="63" width="40" height="5" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="200" y="62" width="32" height="8" fill="white" fillOpacity="0.1" rx="0"/>
      <rect x="240" y="62" width="32" height="8" fill="white" fillOpacity="0.07" rx="0"/>
      {/* Hero area */}
      <rect x="32" y="96" width="130" height="10" fill="white" fillOpacity="0.18" rx="1"/>
      <rect x="32" y="112" width="100" height="10" fill="white" fillOpacity="0.15" rx="1"/>
      <rect x="32" y="130" width="156" height="6" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="32" y="140" width="130" height="6" fill="white" fillOpacity="0.06" rx="1"/>
      <rect x="32" y="156" width="80" height="18" fill="white" fillOpacity="0.18"/>
      {/* Right side image block */}
      <rect x="180" y="90" width="108" height="100" fill="white" fillOpacity="0.06"/>
      <rect x="190" y="100" width="88" height="80" fill="white" fillOpacity="0.04"/>
      {/* Bottom section */}
      <rect x="20" y="200" width="280" height="1" fill="white" fillOpacity="0.08"/>
      <rect x="32" y="212" width="50" height="4" fill="white" fillOpacity="0.1" rx="1"/>
      <rect x="104" y="212" width="50" height="4" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="176" y="212" width="50" height="4" fill="white" fillOpacity="0.08" rx="1"/>
      <rect x="248" y="212" width="40" height="4" fill="white" fillOpacity="0.08" rx="1"/>
    </svg>
  );
}

const visuals: Record<string, React.FC> = {
  notion_template: NotionVisual,
  ui_kit: UIKitVisual,
  custom_site: SiteVisual,
};

// ── Split hero (Teenage Engineering layout) ──────────────────────────────────

function ProductHero({ product }: { product: ShopProduct }) {
  const Visual = visuals[product.id] ?? UIKitVisual;

  return (
    <section className="flex flex-col md:flex-row" style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}>

      {/* LEFT — dark product visual */}
      <div className="md:w-1/2 bg-[#0a0a0a] noise flex items-center justify-center min-h-[55vw] md:min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <Visual />
        </motion.div>
      </div>

      {/* RIGHT — warm gray info panel */}
      <div className="md:w-1/2 bg-[#EDEAE4] flex flex-col justify-center px-10 md:px-16 py-16">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6"
        >
          {product.tierLabel}
        </motion.p>

        {/* Name + price — same scale, reads as one unit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
          className="mb-10"
        >
          <h1
            className="font-extrabold text-[#0a0a0a] leading-[1.05]"
            style={{ fontSize: "clamp(28px, 3.2vw, 48px)", letterSpacing: "-0.03em" }}
          >
            {product.name}
            <br />
            {product.price}
          </h1>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.38 }}
          className="mb-3"
        >
          <CheckoutButton productId={product.id} variant="dark" label={product.buttonLabel} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.46 }}
          className="text-[11px] text-[#0a0a0a]/30 font-medium mb-10"
        >
          {product.deliverable} · One-time payment · Secured by Stripe
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="w-full h-px bg-[#0a0a0a]/12 mb-10"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
          className="text-base text-[#0a0a0a]/55 leading-relaxed mb-6"
        >
          {product.heroSubtext}
        </motion.p>

        {/* Explore link */}
        <motion.a
          href="#details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.62 }}
          className="text-sm font-semibold text-[#0a0a0a]/45 hover:text-[#0a0a0a]/70 transition-colors duration-200 underline underline-offset-4"
        >
          What&apos;s included ↓
        </motion.a>
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
              className="bg-white border border-black/8 p-8 flex flex-col gap-4"
            >
              <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">
                {feature.title}
              </h3>
              <p className="text-base text-[#0a0a0a]/50 leading-relaxed">
                {feature.description}
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
            <CheckoutButton
              productId={product.id}
              variant="dark"
              label={product.buttonLabel}
            />
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
