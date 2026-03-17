"use client";

import Link from "next/link";
import { useEffect } from "react";

const CALL_VALUE = [
  {
    title: "A clear roadmap to your business goals",
    body: "We'll map out exactly what your website needs to do to drive real growth — no vague advice.",
  },
  {
    title: "See our client acquisition system in action",
    body: "Learn the exact framework we use to help service businesses consistently book new clients online.",
  },
  {
    title: "Understand why our approach works",
    body: "We'll walk through the strategy behind our builds — and why it outperforms typical web design.",
  },
  {
    title: "Walk away with clarity",
    body: "Even if we're not the right fit, you'll leave the call knowing your next move.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Working with Pivot Studio transformed our client acquisition. We went from 2–3 inbound leads per month to consistently booking 15+ discovery calls.",
    name: "Mark T.",
    role: "Independent Financial Advisor",
  },
  {
    quote:
      "Our old website was embarrassing to share. The new one actually sells for us — clients often say 'your site made me trust you immediately.'",
    name: "Sarah K.",
    role: "Interior Designer",
  },
  {
    quote:
      "I was skeptical that a website could move the needle. Three months later, it's our single best-performing sales tool.",
    name: "David R.",
    role: "Business Consulting Firm Owner",
  },
];

function QuoteIcon() {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 20V12.4C0 8.93333 0.966667 6.06667 2.9 3.8C4.83333 1.53333 7.56667 0.133333 11.1 0L11.9 2C9.7 2.4 8.03333 3.3 6.9 4.7C5.76667 6.1 5.2 7.73333 5.2 9.6H9.6V20H0ZM13.6 20V12.4C13.6 8.93333 14.5667 6.06667 16.5 3.8C18.4333 1.53333 21.1667 0.133333 24.7 0L25.5 2C23.3 2.4 21.6333 3.3 20.5 4.7C19.3667 6.1 18.8 7.73333 18.8 9.6H23.2V20H13.6Z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

export default function BookACallPage() {
  useEffect(() => {
    // Inject the official Cal.com snippet verbatim. The snippet defines the
    // Cal queue AND loads embed.js itself — this is the only reliable pattern.
    // window.location.href is used for the redirect since we're in a script string.
    const script = document.createElement("script");
    script.textContent = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1]; api.q = [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar); p(cal, ["-", namespace, api]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", { origin: "https://cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-embed",
        calLink: "djwooster/intro-call",
        config: { layout: "month_view" },
      });
      Cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
      Cal("on", {
        action: "bookingSuccessful",
        callback: function () { window.location.href = "/youre-booked"; },
      });
    `;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);
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

      {/* Urgency bar */}
      <div className="bg-[#0a0a0a] text-white px-6 py-3 text-center noise">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">
          ⚡ Only 3 discovery call spots remaining this month
        </p>
      </div>

      <main className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40 mb-4">
              Free 30-minute strategy call
            </p>
            <h1 className="section-headline mb-5">
              Book Your Discovery Call
            </h1>
            <p className="text-lg text-black/55 leading-relaxed">
              Pick a time below. This call is for serious service business owners
              who want a proven system for getting more clients online.
            </p>
          </div>

          {/* Cal.com embed */}
          <div className="mb-20 border border-black/10">
            <div id="cal-embed" style={{ minHeight: "700px" }} />
          </div>

          {/* What you get */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 mb-6">
              What you&apos;ll get from this call
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {CALL_VALUE.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#f5f5f5] p-6 border-l-2 border-[#0a0a0a]"
                >
                  <p className="font-bold text-sm mb-1.5">{item.title}</p>
                  <p className="text-sm text-black/55 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 mb-8">
              What clients say
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-[#f5f5f5] p-7 flex flex-col gap-4">
                  <QuoteIcon />
                  <p className="text-sm leading-relaxed text-black/70 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-black/10">
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-black/45 mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
