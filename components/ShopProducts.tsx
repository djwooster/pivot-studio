"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import { products } from "@/lib/shop/products";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ── Thumbnail illustrations ───────────────────────────────────────────────────

function NotionThumb() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Simulates a structured Notion-style document */}
      <rect x="12" y="12" width="48" height="6" rx="0" fill="white" fillOpacity="0.12" />
      <rect x="12" y="24" width="48" height="3" rx="0" fill="white" fillOpacity="0.08" />
      <rect x="12" y="31" width="36" height="3" rx="0" fill="white" fillOpacity="0.08" />
      <rect x="12" y="38" width="42" height="3" rx="0" fill="white" fillOpacity="0.08" />
      <rect x="12" y="49" width="20" height="12" rx="0" fill="white" fillOpacity="0.06" />
      <rect x="36" y="49" width="24" height="12" rx="0" fill="white" fillOpacity="0.06" />
      <line x1="12" y1="49" x2="60" y2="49" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="36" y1="49" x2="36" y2="61" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}

function UIKitThumb() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Simulates a UI component layout */}
      <rect x="12" y="12" width="48" height="10" rx="0" fill="white" fillOpacity="0.12" />
      <rect x="12" y="28" width="22" height="20" rx="0" fill="white" fillOpacity="0.08" />
      <rect x="38" y="28" width="22" height="9" rx="0" fill="white" fillOpacity="0.08" />
      <rect x="38" y="39" width="22" height="9" rx="0" fill="white" fillOpacity="0.06" />
      <rect x="12" y="52" width="48" height="8" rx="0" fill="white" fillOpacity="0.15" />
    </svg>
  );
}

function SiteThumb() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Simulates a browser / website layout */}
      <rect x="8" y="10" width="56" height="52" rx="0" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="64" y2="20" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="2" fill="white" fillOpacity="0.2" />
      <circle cx="22" cy="15" r="2" fill="white" fillOpacity="0.12" />
      <circle cx="29" cy="15" r="2" fill="white" fillOpacity="0.08" />
      <rect x="16" y="26" width="40" height="6" rx="0" fill="white" fillOpacity="0.12" />
      <rect x="22" y="36" width="28" height="3" rx="0" fill="white" fillOpacity="0.07" />
      <rect x="26" y="42" width="20" height="3" rx="0" fill="white" fillOpacity="0.07" />
      <rect x="20" y="50" width="32" height="7" rx="0" fill="white" fillOpacity="0.12" />
    </svg>
  );
}

const thumbnails: Record<string, React.FC> = {
  notion_template: NotionThumb,
  ui_kit: UIKitThumb,
  custom_site: SiteThumb,
};

// ── Check icon ────────────────────────────────────────────────────────────────

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-[2px]">
      <path d="M3 8l3.5 3.5L13 4" stroke="rgba(10,10,10,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Product grid ──────────────────────────────────────────────────────────────

export default function ShopProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-14 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.map((product) => {
            const Thumb = thumbnails[product.id];
            return (
              <motion.article
                key={product.id}
                variants={fadeUp}
                className="flex flex-col border border-black/8 hover:border-black/20 transition-colors duration-200"
              >
                {/* Thumbnail */}
                <div className="relative bg-[#0a0a0a] h-52 flex items-center justify-center">
                  {product.featured && (
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 border border-white/15 px-3 py-1.5">
                      Most Popular
                    </span>
                  )}
                  <Thumb />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-7 gap-0">
                  {/* Tier + price row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/35">
                      {product.tierLabel}
                    </span>
                    <span
                      className="font-extrabold text-[#0a0a0a]"
                      style={{ fontSize: "22px", letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      {product.price}
                    </span>
                  </div>

                  {/* Name */}
                  <h2
                    className="font-extrabold text-[#0a0a0a] mb-2 leading-snug"
                    style={{ fontSize: "clamp(18px, 1.4vw, 22px)", letterSpacing: "-0.02em" }}
                  >
                    {product.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-sm text-[#0a0a0a]/50 leading-relaxed mb-6">
                    {product.tagline}
                  </p>

                  {/* Features — top 3 only */}
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {product.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex items-start gap-2.5">
                        <Check />
                        <span className="text-sm text-[#0a0a0a]/55 leading-snug">{f.title}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-sm text-[#0a0a0a]/30 font-medium pl-[22px]">
                        +{product.features.length - 3} more included
                      </li>
                    )}
                  </ul>

                  {/* Deliverable */}
                  <p className="text-[11px] text-[#0a0a0a]/25 font-medium mb-4">
                    {product.deliverable}
                  </p>

                  {/* CTAs */}
                  <CheckoutButton
                    productId={product.id}
                    variant="dark"
                    label={product.buttonLabel}
                  />
                  <Link
                    href={`/shop/${product.slug}`}
                    className="mt-3 text-center text-xs font-semibold text-[#0a0a0a]/35 hover:text-[#0a0a0a]/60 transition-colors duration-200 underline underline-offset-2"
                  >
                    View full details
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          className="mt-10 text-xs text-[#0a0a0a]/30 text-center"
        >
          Secure checkout powered by Stripe.{" "}
          <a
            href="mailto:contact@pivotstudio.app"
            className="underline underline-offset-2 hover:text-[#0a0a0a]/55 transition-colors duration-200"
          >
            Questions? Email us.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
