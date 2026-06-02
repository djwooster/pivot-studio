import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed — Pivot Studio",
  description: "Your purchase was successful.",
};

export default function SuccessPage() {
  return (
    <main className="bg-white text-[#0a0a0a] min-h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <Nav />

      <div className="flex-1 flex items-center justify-center px-6 pt-16">
        <div className="max-w-md w-full text-center">
          {/* Check mark icon */}
          <div className="w-16 h-16 bg-[#0a0a0a] flex items-center justify-center mx-auto mb-10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12.5l5 5L20 6.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4">
            Order Confirmed
          </p>

          <h1
            className="font-extrabold mb-5 text-[#0a0a0a]"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            You&apos;re all set.
          </h1>

          <p className="text-[#0a0a0a]/50 text-base leading-relaxed mb-10">
            Check your email — access and next steps are on their way. If you
            don&apos;t see it in a few minutes, check your spam folder.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-2 font-bold overflow-hidden transition-colors duration-200 h-12 px-7 text-sm bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/85"
            >
              Back to Shop
            </Link>
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 font-bold overflow-hidden transition-colors duration-200 h-12 px-7 text-sm border border-[#E8E5E0] bg-[#FAFAF9] text-[#0a0a0a] hover:bg-[#F0EDEA] transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
