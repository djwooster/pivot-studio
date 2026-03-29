"use client";

import Link from "next/link";
import VideoPlaceholder from "@/components/lp/VideoPlaceholder";
import LeadFormModal from "@/components/lp/LeadFormModal";

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const QUICK_WIN_BULLETS = [
  "1 custom n8n workflow built around your single biggest time drain",
  "Choose your use case: lead follow-up, invoice processing, proposal generation, or client intake",
  "Live and running in 5–7 business days — not months",
  "Full documentation + team walkthrough so nothing is a black box",
  "30-day support window included — we fix anything that breaks",
  "Most clients recover 10+ hours per week. Every single week.",
];

const AI_OPS_BULLETS = [
  "Full operations audit — we map every manual task bleeding your team's time",
  "3–5 connected automations built, tested, and deployed end-to-end",
  "Custom dashboard + CMS integration so your data lives in one place",
  "Everything talks to each other: CRM, email, calendar, documents",
  "Full team onboarding — your people know how to use what we build",
  "90 days of ongoing optimization included after launch",
  "Average client eliminates 1–2 full-time manual roles worth of work",
];

export default function AIAutomationOfferPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      {/* Minimal header */}
      <header className="px-6 py-5 border-b border-black/5">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="font-black text-lg tracking-tight">
            Pivot Studio
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">

          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40 mb-4">
            AI + Automation for Agencies, Law Firms &amp; Real Estate
          </p>

          {/* Headline */}
          <h1 className="hero-headline mb-5">
            Stop Paying People<br className="hidden md:block" /> to Do What Machines<br className="hidden md:block" /> Do Better
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-black/55 mb-10 max-w-2xl leading-relaxed">
            Marketing agencies, law firms, and real estate teams are bleeding 20+ hours
            a week on follow-ups, proposals, and invoices that should run on autopilot.
            We build the system. You keep the hours — and the revenue that comes with them.
          </p>

          {/* Video */}
          <div className="mb-16">
            <VideoPlaceholder label="Watch: How we automate your operations in days, not months" />
          </div>

          {/* Bridge */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40 mb-8">
            Two ways to get started
          </p>

          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

            {/* Quick Win Automation */}
            <div className="border border-black/10 p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0a0a0a] text-white px-2.5 py-1 inline-block mb-4">
                  Start Here
                </span>
                <h2 className="text-2xl font-black tracking-tight mb-1">
                  Quick Win Automation
                </h2>
                <p className="text-3xl font-black tracking-tight mb-2">
                  $2,500 – $7,000
                </p>
                <p className="text-sm text-black/50 leading-snug">
                  One workflow. One bottleneck eliminated. One week.
                </p>
              </div>

              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {QUICK_WIN_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <LeadFormModal>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-bold px-8 py-4 text-sm hover:bg-[#0a0a0a]/85 transition-colors duration-200">
                  <span>Claim Your Spot</span>
                  <ArrowIcon />
                </button>
              </LeadFormModal>
            </div>

            {/* AI Ops Build */}
            <div className="border-2 border-[#0a0a0a] p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0a0a0a] text-white px-2.5 py-1 inline-block mb-4">
                  Full Transformation
                </span>
                <h2 className="text-2xl font-black tracking-tight mb-1">
                  AI Ops Build
                </h2>
                <p className="text-3xl font-black tracking-tight mb-2">
                  $8,000 – $20,000
                </p>
                <p className="text-sm text-black/50 leading-snug">
                  Your entire ops stack — rebuilt for a firm that scales.
                </p>
              </div>

              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {AI_OPS_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <LeadFormModal>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-bold px-8 py-4 text-sm hover:bg-[#0a0a0a]/85 transition-colors duration-200">
                  <span>Apply for AI Ops Build</span>
                  <ArrowIcon />
                </button>
              </LeadFormModal>
            </div>
          </div>

          {/* Risk reversal */}
          <div className="border-t border-black/8 pt-10">
            <p className="text-sm text-black/45 max-w-xl leading-relaxed">
              <span className="font-semibold text-[#0a0a0a]">No fluff. No retainers you don&apos;t need.</span>{" "}
              We scope the work, build it, and hand it off — fully documented and
              running. If it&apos;s not working, we fix it. That&apos;s the deal.
            </p>
            <p className="mt-2 text-xs text-black/35">
              No commitment required to apply. Discovery call is 30 minutes.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
