"use client";

import Link from "next/link";
import VideoPlaceholder from "@/components/lp/VideoPlaceholder";
import LeadFormModal from "@/components/lp/LeadFormModal";

const BULLETS = [
  "Custom design built from scratch — no templates, no page builders",
  "Engineered to convert visitors into booked discovery calls",
  "Delivered in 2 weeks, start to finish",
  "Ongoing support and monthly optimizations included",
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#0a0a0a" />
      <path
        d="M7.5 12l3 3L16.5 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WebDesignOfferPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      {/* Minimal header */}
      <header className="px-6 py-5 border-b border-black/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="font-black text-lg tracking-tight">
            Pivot Studio
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40 mb-4">
            Web Design for Service Businesses
          </p>

          {/* Headline */}
          <h1 className="hero-headline mb-5">
            A Website That Brings<br className="hidden md:block" /> You More Clients
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-black/55 mb-10 max-w-xl leading-relaxed">
            We build high-converting websites for service businesses — custom-designed,
            delivered in 2 weeks, and built to turn visitors into booked clients.
          </p>

          {/* Video */}
          <div className="mb-12">
            <VideoPlaceholder label="Watch: See how our system works" />
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-4 mb-12">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm md:text-base">
                <span className="mt-0.5 shrink-0">
                  <CheckIcon />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <LeadFormModal>
            <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-bold px-10 py-5 text-base hover:bg-[#0a0a0a]/85 transition-colors duration-200">
              <span>Claim Your Spot</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </LeadFormModal>

          <p className="mt-3 text-xs text-black/35">
            No commitment. Takes 60 seconds.
          </p>
        </div>
      </main>
    </div>
  );
}
