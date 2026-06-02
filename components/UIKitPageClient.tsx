"use client";

import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import CheckoutButton from "@/components/CheckoutButton";
import { products } from "@/lib/shop/products";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const product = products.find((p) => p.id === "ui_kit")!;

// ── Hero visual ───────────────────────────────────────────────────────────────

function HeroVisual() {
  return (
    <svg width="460" height="380" viewBox="0 0 460 380" fill="none" aria-hidden="true">
      <rect x="20" y="16" width="420" height="348" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="20" y="16" width="420" height="44" fill="white" fillOpacity="0.05" />
      <circle cx="42" cy="38" r="6" fill="white" fillOpacity="0.18" />
      <circle cx="60" cy="38" r="6" fill="white" fillOpacity="0.1" />
      <circle cx="78" cy="38" r="6" fill="white" fillOpacity="0.07" />
      <rect x="110" y="28" width="70" height="20" fill="white" fillOpacity="0.1" />
      <rect x="186" y="28" width="58" height="20" fill="white" fillOpacity="0.05" />
      <rect x="250" y="28" width="50" height="20" fill="white" fillOpacity="0.05" />
      {/* Sidebar */}
      <rect x="20" y="60" width="100" height="304" fill="white" fillOpacity="0.03" />
      <rect x="120" y="60" width="1" height="304" fill="white" fillOpacity="0.07" />
      <rect x="34" y="78" width="10" height="10" fill="white" fillOpacity="0.12" />
      <rect x="50" y="80" width="52" height="6" fill="white" fillOpacity="0.15" />
      <rect x="34" y="100" width="10" height="10" fill="white" fillOpacity="0.08" />
      <rect x="50" y="102" width="40" height="6" fill="white" fillOpacity="0.1" />
      <rect x="34" y="122" width="10" height="10" fill="white" fillOpacity="0.08" />
      <rect x="50" y="124" width="48" height="6" fill="white" fillOpacity="0.1" />
      <rect x="34" y="144" width="10" height="10" fill="white" fillOpacity="0.08" />
      <rect x="50" y="146" width="44" height="6" fill="white" fillOpacity="0.1" />
      {/* Main content */}
      <rect x="144" y="76" width="120" height="8" fill="white" fillOpacity="0.2" />
      <rect x="144" y="96" width="86" height="6" fill="white" fillOpacity="0.1" />
      {/* Button group */}
      <rect x="144" y="120" width="72" height="28" fill="white" fillOpacity="0.2" />
      <rect x="224" y="120" width="72" height="28" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="304" y="120" width="72" height="28" fill="white" fillOpacity="0.06" />
      <rect x="156" y="130" width="48" height="6" fill="white" fillOpacity="0.4" />
      <rect x="236" y="130" width="48" height="6" fill="white" fillOpacity="0.2" />
      <rect x="316" y="130" width="48" height="6" fill="white" fillOpacity="0.15" />
      {/* Card component */}
      <rect x="144" y="168" width="172" height="110" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="144" y="168" width="172" height="28" fill="white" fillOpacity="0.05" />
      <rect x="158" y="178" width="60" height="6" fill="white" fillOpacity="0.18" />
      <rect x="158" y="210" width="144" height="5" fill="white" fillOpacity="0.1" />
      <rect x="158" y="222" width="120" height="5" fill="white" fillOpacity="0.07" />
      <rect x="158" y="234" width="130" height="5" fill="white" fillOpacity="0.07" />
      <rect x="158" y="254" width="56" height="18" fill="white" fillOpacity="0.15" />
      <rect x="222" y="254" width="56" height="18" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
      {/* Input fields */}
      <rect x="326" y="168" width="132" height="32" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="340" y="180" width="72" height="5" fill="white" fillOpacity="0.1" />
      <rect x="326" y="212" width="132" height="32" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="340" y="224" width="56" height="5" fill="white" fillOpacity="0.07" />
      {/* Code section */}
      <rect x="144" y="296" width="316" height="52" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      <rect x="158" y="308" width="16" height="5" fill="white" fillOpacity="0.25" />
      <rect x="182" y="308" width="80" height="5" fill="white" fillOpacity="0.12" />
      <rect x="158" y="320" width="16" height="5" fill="white" fillOpacity="0.18" />
      <rect x="182" y="320" width="110" height="5" fill="white" fillOpacity="0.1" />
      <rect x="158" y="332" width="16" height="5" fill="white" fillOpacity="0.12" />
      <rect x="182" y="332" width="64" height="5" fill="white" fillOpacity="0.08" />
    </svg>
  );
}

// ── Category card visuals ─────────────────────────────────────────────────────

function ComponentsVisual() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" aria-hidden="true">
      {/* Buttons */}
      <rect x="0" y="0" width="86" height="34" fill="#0a0a0a" />
      <rect x="16" y="13" width="54" height="8" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="96" y="0" width="86" height="34" stroke="#0a0a0a" strokeWidth="1.5" />
      <rect x="112" y="13" width="54" height="8" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="192" y="0" width="88" height="34" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="208" y="13" width="54" height="8" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      {/* Card */}
      <rect x="0" y="50" width="180" height="116" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="0" y="50" width="180" height="34" fill="#0a0a0a" fillOpacity="0.04" />
      <rect x="14" y="63" width="72" height="8" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="14" y="100" width="152" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="14" y="112" width="120" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="14" y="124" width="130" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="14" y="146" width="62" height="12" fill="#0a0a0a" />
      <rect x="84" y="146" width="62" height="12" stroke="#0a0a0a" strokeWidth="1.5" />
      {/* Input stack */}
      <rect x="192" y="50" width="88" height="34" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="206" y="64" width="44" height="6" rx="1" fill="#0a0a0a" fillOpacity="0.25" />
      <rect x="192" y="94" width="88" height="34" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="206" y="108" width="32" height="6" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="192" y="138" width="88" height="28" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="206" y="150" width="50" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      {/* Table */}
      <rect x="0" y="178" width="280" height="8" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="10" y="190" width="50" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="100" y="190" width="60" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="200" y="190" width="60" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="0" y="196" width="280" height="1" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="10" y="203" width="40" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="100" y="203" width="50" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="200" y="203" width="48" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="0" y="209" width="280" height="1" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="10" y="216" width="44" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="100" y="216" width="56" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="200" y="216" width="40" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
    </svg>
  );
}

function PromptsVisual() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="280" height="220" fill="#0a0a0a" fillOpacity="0.03" stroke="#0a0a0a" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="0" y="0" width="280" height="32" fill="#0a0a0a" fillOpacity="0.05" />
      <circle cx="16" cy="16" r="5" fill="#0a0a0a" fillOpacity="0.15" />
      <circle cx="30" cy="16" r="5" fill="#0a0a0a" fillOpacity="0.1" />
      <circle cx="44" cy="16" r="5" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="80" y="9" width="120" height="14" fill="#0a0a0a" fillOpacity="0.05" />
      <rect x="92" y="13" width="96" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      {/* User prompt block */}
      <rect x="14" y="48" width="6" height="6" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="26" y="48" width="60" height="6" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="14" y="64" width="252" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="14" y="76" width="220" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="14" y="88" width="236" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="0" y="104" width="280" height="1" fill="#0a0a0a" fillOpacity="0.07" />
      {/* AI response block */}
      <rect x="14" y="116" width="16" height="16" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="36" y="119" width="50" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      {/* Code output */}
      <rect x="14" y="144" width="252" height="64" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.07" strokeWidth="1" />
      <rect x="26" y="156" width="18" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.45" />
      <rect x="52" y="156" width="80" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="26" y="168" width="18" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="52" y="168" width="120" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="26" y="180" width="18" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="52" y="180" width="96" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      {/* Input bar */}
      <rect x="14" y="196" width="252" height="14" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="24" y="202" width="120" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="252" y="197" width="12" height="12" fill="#0a0a0a" fillOpacity="0.5" />
    </svg>
  );
}

function ExamplesVisual() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" aria-hidden="true">
      {/* Browser */}
      <rect x="0" y="0" width="280" height="220" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="0" y="0" width="280" height="36" fill="#0a0a0a" fillOpacity="0.04" />
      <circle cx="14" cy="18" r="4" fill="#0a0a0a" fillOpacity="0.18" />
      <circle cx="26" cy="18" r="4" fill="#0a0a0a" fillOpacity="0.1" />
      <circle cx="38" cy="18" r="4" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="55" y="9" width="170" height="18" fill="#0a0a0a" fillOpacity="0.05" />
      <rect x="68" y="14" width="80" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      {/* Nav */}
      <rect x="0" y="36" width="280" height="1" fill="#0a0a0a" fillOpacity="0.08" />
      <rect x="14" y="46" width="8" height="8" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="28" y="48" width="40" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="152" y="48" width="30" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="192" y="48" width="30" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="236" y="43" width="30" height="14" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="0" y="60" width="280" height="1" fill="#0a0a0a" fillOpacity="0.06" />
      {/* Hero text */}
      <rect x="14" y="74" width="150" height="11" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="14" y="92" width="120" height="11" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="14" y="114" width="170" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="14" y="124" width="140" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="14" y="140" width="60" height="18" fill="#0a0a0a" fillOpacity="0.7" />
      <rect x="82" y="140" width="60" height="18" stroke="#0a0a0a" strokeOpacity="0.4" strokeWidth="1" />
      {/* Right card */}
      <rect x="184" y="66" width="84" height="110" stroke="#0a0a0a" strokeOpacity="0.08" strokeWidth="1" fill="#0a0a0a" fillOpacity="0.02" />
      <rect x="194" y="76" width="64" height="50" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="194" y="136" width="52" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="194" y="146" width="42" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.13" />
      <rect x="194" y="156" width="48" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      {/* Footer */}
      <rect x="0" y="186" width="280" height="1" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="14" y="197" width="48" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="116" y="197" width="48" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="218" y="197" width="48" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="14" y="208" width="36" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="116" y="208" width="36" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="218" y="208" width="36" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.07" />
    </svg>
  );
}

function RecipesVisual() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" aria-hidden="true">
      {/* Step 1 - active */}
      <rect x="0" y="10" width="36" height="36" fill="#0a0a0a" />
      <rect x="14" y="24" width="8" height="8" fill="white" fillOpacity="0.7" />
      <rect x="52" y="12" width="80" height="7" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="52" y="26" width="160" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="52" y="36" width="130" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      {/* Connector */}
      <rect x="17" y="46" width="2" height="24" fill="#0a0a0a" fillOpacity="0.12" />
      {/* Step 2 */}
      <rect x="0" y="70" width="36" height="36" stroke="#0a0a0a" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="14" y="84" width="8" height="8" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="52" y="72" width="68" height="7" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="52" y="86" width="180" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.17" />
      <rect x="52" y="96" width="150" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      {/* Connector */}
      <rect x="17" y="106" width="2" height="24" fill="#0a0a0a" fillOpacity="0.1" />
      {/* Step 3 */}
      <rect x="0" y="130" width="36" height="36" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="14" y="144" width="8" height="8" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="52" y="132" width="90" height="7" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="52" y="146" width="160" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="52" y="156" width="120" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      {/* Connector */}
      <rect x="17" y="166" width="2" height="24" fill="#0a0a0a" fillOpacity="0.07" />
      {/* Step 4 */}
      <rect x="0" y="190" width="36" height="28" stroke="#0a0a0a" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="14" y="201" width="8" height="8" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="52" y="192" width="60" height="7" rx="1" fill="#0a0a0a" fillOpacity="0.18" />
      <rect x="52" y="206" width="130" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
    </svg>
  );
}

// ── Showcase item mini-visuals ─────────────────────────────────────────────────

function ButtonsMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="46" height="22" fill="#0a0a0a" />
      <rect x="20" y="19" width="22" height="5" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="62" y="10" width="50" height="22" stroke="#0a0a0a" strokeWidth="1.5" />
      <rect x="74" y="19" width="26" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="8" y="42" width="46" height="20" fill="#0a0a0a" fillOpacity="0.08" />
      <rect x="20" y="50" width="22" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="62" y="42" width="50" height="20" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="74" y="50" width="26" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
    </svg>
  );
}

function NavMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="18" width="104" height="36" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="14" y="29" width="8" height="8" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="26" y="31" width="22" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="60" y="31" width="18" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="84" y="31" width="18" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="14" y="28" width="96" height="1" fill="#0a0a0a" fillOpacity="0.05" />
    </svg>
  );
}

function CardMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="104" height="56" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="8" y="8" width="104" height="22" fill="#0a0a0a" fillOpacity="0.04" />
      <rect x="18" y="16" width="50" height="6" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="18" y="38" width="84" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="18" y="47" width="68" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="18" y="56" width="38" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.07" />
    </svg>
  );
}

function TableMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="104" height="10" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="14" y="15" width="26" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="58" y="15" width="26" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.25" />
      <rect x="94" y="15" width="16" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.25" />
      <rect x="8" y="22" width="104" height="1" fill="#0a0a0a" fillOpacity="0.07" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="14" y={27 + i * 11} width="22" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
          <rect x="58" y={27 + i * 11} width="28" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
          <rect x="94" y={27 + i * 11} width="16" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
          <rect x="8" y={32 + i * 11} width="104" height="1" fill="#0a0a0a" fillOpacity="0.05" />
        </g>
      ))}
    </svg>
  );
}

function ModalMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="120" height="72" fill="#0a0a0a" fillOpacity="0.04" />
      <rect x="16" y="10" width="88" height="52" fill="white" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="16" y="10" width="88" height="22" fill="#0a0a0a" fillOpacity="0.04" />
      <rect x="24" y="19" width="52" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="94" y="16" width="8" height="8" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="24" y="40" width="72" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="24" y="48" width="60" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="56" y="54" width="32" height="6" fill="#0a0a0a" fillOpacity="0.6" />
      <rect x="24" y="54" width="28" height="6" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}

function FormMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="46" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="8" y="18" width="104" height="14" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="16" y="23" width="60" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="8" y="39" width="46" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="8" y="49" width="104" height="14" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="16" y="54" width="40" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
    </svg>
  );
}

function SidebarMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="112" height="56" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="8" y="8" width="36" height="56" fill="#0a0a0a" fillOpacity="0.04" />
      <rect x="44" y="8" width="1" height="56" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="14" y="18" width="6" height="6" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="24" y="20" width="14" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.25" />
      <rect x="14" y="30" width="6" height="6" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="24" y="32" width="12" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="14" y="42" width="6" height="6" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="24" y="44" width="16" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="52" y="16" width="60" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="52" y="28" width="56" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="52" y="36" width="48" height="3" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="52" y="48" width="38" height="10" fill="#0a0a0a" fillOpacity="0.5" />
    </svg>
  );
}

function BadgeMini() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="16" width="40" height="16" fill="#0a0a0a" />
      <rect x="16" y="22" width="24" height="4" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="56" y="16" width="56" height="16" fill="#0a0a0a" fillOpacity="0.08" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="64" y="22" width="40" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="8" y="42" width="32" height="14" fill="#0a0a0a" fillOpacity="0.06" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="14" y="47" width="20" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="48" y="42" width="32" height="14" fill="#0a0a0a" fillOpacity="0.06" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="54" y="47" width="20" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="88" y="42" width="24" height="14" fill="#0a0a0a" />
      <rect x="94" y="47" width="12" height="4" rx="1" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

function PromptMini1() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="104" height="56" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="16" y="18" width="16" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.5" />
      <rect x="38" y="18" width="60" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.18" />
      <rect x="16" y="30" width="16" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="38" y="30" width="72" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="16" y="42" width="16" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.25" />
      <rect x="38" y="42" width="50" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
      <rect x="86" y="56" width="24" height="6" fill="#0a0a0a" fillOpacity="0.5" />
    </svg>
  );
}

function PromptMini2() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="48" height="28" fill="#0a0a0a" fillOpacity="0.05" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="14" y="12" width="36" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="14" y="20" width="28" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
      <rect x="60" y="14" width="20" height="8" rx="1" fill="#0a0a0a" fillOpacity="0.06" />
      <rect x="84" y="14" width="28" height="8" rx="1" fill="#0a0a0a" fillOpacity="0.06" />
      <path d="M56 24 L60 18" stroke="#0a0a0a" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="40" width="48" height="28" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="14" y="48" width="32" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.18" />
      <rect x="14" y="56" width="24" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.12" />
      <rect x="64" y="40" width="48" height="28" fill="#0a0a0a" fillOpacity="0.03" stroke="#0a0a0a" strokeOpacity="0.07" strokeWidth="1" />
      <rect x="70" y="48" width="36" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.16" />
      <rect x="70" y="56" width="28" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.1" />
    </svg>
  );
}

function RecipeMini1() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="20" height="20" fill="#0a0a0a" />
      <rect x="14" y="14" width="8" height="8" fill="white" fillOpacity="0.6" />
      <rect x="8" y="26" width="2" height="12" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="36" y="10" width="76" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.4" />
      <rect x="36" y="20" width="60" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.18" />
      <rect x="8" y="38" width="20" height="18" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="1.5" />
      <rect x="14" y="44" width="8" height="6" fill="#0a0a0a" fillOpacity="0.15" />
      <rect x="36" y="40" width="60" height="5" rx="1" fill="#0a0a0a" fillOpacity="0.3" />
      <rect x="36" y="50" width="76" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.14" />
    </svg>
  );
}

function RecipeMini2() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="46" height="46" fill="#0a0a0a" fillOpacity="0.04" stroke="#0a0a0a" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="18" y="18" width="26" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.35" />
      <rect x="18" y="28" width="20" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.2" />
      <rect x="18" y="38" width="22" height="4" rx="1" fill="#0a0a0a" fillOpacity="0.15" />
      <path d="M54 30 L66 30" stroke="#0a0a0a" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M62 26 L66 30 L62 34" stroke="#0a0a0a" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="68" y="8" width="46" height="46" fill="#0a0a0a" fillOpacity="0.07" />
      <rect x="78" y="22" width="26" height="4" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="78" y="32" width="18" height="4" rx="1" fill="white" fillOpacity="0.45" />
      <rect x="78" y="42" width="22" height="4" rx="1" fill="white" fillOpacity="0.35" />
    </svg>
  );
}

// ── Category cards data ───────────────────────────────────────────────────────

const categories = [
  {
    id: "components",
    label: "Components",
    title: "50+ production-ready components.",
    desc: "Buttons, cards, forms, tables, modals, sidebars — all built with Tailwind v4 and shadcn patterns. Drop them in and move on.",
    href: "#components",
    Visual: ComponentsVisual,
  },
  {
    id: "prompts",
    label: "Prompt Templates",
    title: "Prompts that produce clean output every time.",
    desc: "Tested templates that get Claude to generate consistent, usable code on the first try. No more re-running the same prompt five times.",
    href: "#prompts",
    Visual: PromptsVisual,
  },
  {
    id: "examples",
    label: "Page Examples",
    title: "Full page builds that show the whole picture.",
    desc: "Not isolated demos — real page layouts that show how components fit together in practice. See exactly how to wire things up.",
    href: "#examples",
    Visual: ExamplesVisual,
  },
  {
    id: "recipes",
    label: "Workflow Recipes",
    title: "Step-by-step patterns for Claude Code.",
    desc: "Scaffold a new page, refactor a component, debug weird output — the most common tasks turned into repeatable recipes.",
    href: "#recipes",
    Visual: RecipesVisual,
  },
];

// ── Showcase data ─────────────────────────────────────────────────────────────

type ShowcaseFilter = "All" | "Components" | "Prompts" | "Recipes";

const showcaseItems = [
  { name: "Button Variants", category: "Components" as const, Mini: ButtonsMini },
  { name: "Navigation Bar", category: "Components" as const, Mini: NavMini },
  { name: "Card + Actions", category: "Components" as const, Mini: CardMini },
  { name: "Data Table", category: "Components" as const, Mini: TableMini },
  { name: "Modal & Drawer", category: "Components" as const, Mini: ModalMini },
  { name: "Form System", category: "Components" as const, Mini: FormMini },
  { name: "Sidebar Layout", category: "Components" as const, Mini: SidebarMini },
  { name: "Badge & Status", category: "Components" as const, Mini: BadgeMini },
  { name: "Component Generation", category: "Prompts" as const, Mini: PromptMini1 },
  { name: "Refactor Pattern", category: "Prompts" as const, Mini: PromptMini2 },
  { name: "New Page Flow", category: "Recipes" as const, Mini: RecipeMini1 },
  { name: "Component Workflow", category: "Recipes" as const, Mini: RecipeMini2 },
];

const FILTERS: ShowcaseFilter[] = ["All", "Components", "Prompts", "Recipes"];

// ── Sections ──────────────────────────────────────────────────────────────────

function UIKitHero() {
  return (
    <section className="bg-white pt-32 pb-20 px-6">
      <div className="max-w-[90rem] mx-auto grid md:grid-cols-2 gap-16 items-center">
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
            className="font-extrabold text-[#0a0a0a] mb-6"
            style={{ fontSize: "clamp(32px, 3.5vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1 }}
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
              href="#whats-inside"
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

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          className="bg-[#0a0a0a] flex items-center justify-center p-10 noise"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function UIKitCategoryCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="whats-inside" className="bg-white py-6 px-6 pb-20" ref={ref}>
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-3">
            What&apos;s Inside
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Four systems. One kit.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              className="group relative bg-[#F4F3EF] overflow-hidden border border-black/6 hover:border-black/14 transition-colors duration-300"
              style={{ minHeight: 280 }}
            >
              {/* Text content */}
              <div className="relative z-10 p-9 pb-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
                  {cat.label}
                </p>
                <h3
                  className="font-bold text-[#0a0a0a] leading-snug mb-3"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-0.02em" }}
                >
                  {cat.title}
                </h3>
                <p className="text-sm text-[#0a0a0a]/50 leading-relaxed max-w-xs mb-6">
                  {cat.desc}
                </p>
                <a
                  href={cat.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors duration-200 group-hover:gap-2.5 transition-all"
                >
                  Explore section
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>

              {/* Visual — positioned to bottom-right, partially clipped */}
              <div className="absolute bottom-0 right-0 opacity-70 group-hover:opacity-90 transition-opacity duration-300 translate-x-6 translate-y-4 group-hover:translate-x-4 group-hover:translate-y-2 transition-transform duration-300">
                <cat.Visual />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UIKitShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<ShowcaseFilter>("All");

  const filtered =
    active === "All" ? showcaseItems : showcaseItems.filter((i) => i.category === active);

  return (
    <section id="components" className="bg-[#EDEAE4] py-20 px-6" ref={ref}>
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-3">
            Browse the Kit
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="section-headline text-[#0a0a0a] max-w-sm">
              Everything included.
            </h2>

            {/* Filter tabs */}
            <div className="flex items-center gap-0 border-b border-black/10">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={[
                    "px-5 py-2.5 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px",
                    active === f
                      ? "text-[#0a0a0a] border-[#0a0a0a]"
                      : "text-[#0a0a0a]/40 border-transparent hover:text-[#0a0a0a]/65",
                    i > 0 ? "ml-0" : "",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          key={active}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="bg-white border border-black/8 hover:border-black/18 transition-colors duration-200 flex flex-col overflow-hidden"
            >
              {/* Mini visual */}
              <div className="bg-[#F4F3EF] flex items-center justify-center py-6 px-4">
                <item.Mini />
              </div>

              {/* Label */}
              <div className="px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a]/30 mb-1">
                  {item.category}
                </p>
                <p className="text-sm font-semibold text-[#0a0a0a] leading-snug">
                  {item.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="mt-8 flex items-center justify-center"
        >
          <div className="sm:w-56">
            <CheckoutButton productId={product.id} variant="dark" label={product.buttonLabel} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function UIKitAudience() {
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
              variants={fadeUp}
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

function UIKitFAQ() {
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
          <h2 className="section-headline text-[#0a0a0a]">Common questions.</h2>
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
              variants={fadeUp}
              className="py-8 first:pt-0 last:pb-0 flex flex-col gap-3"
            >
              <p className="text-lg font-bold text-[#0a0a0a] leading-snug">{item.question}</p>
              <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{item.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UIKitFinalCTA() {
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

export default function UIKitPageClient() {
  return (
    <>
      <UIKitHero />
      <UIKitCategoryCards />
      <UIKitShowcase />
      <UIKitAudience />
      <UIKitFAQ />
      <UIKitFinalCTA />
    </>
  );
}
