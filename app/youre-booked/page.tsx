import Link from "next/link";
import VideoPlaceholder from "@/components/lp/VideoPlaceholder";

const PREP_CHECKLIST = [
  {
    label: "Add it to your calendar now",
    body: "You received a confirmation email — add it to your calendar so it doesn't slip through the cracks.",
  },
  {
    label: "Find a quiet spot with good internet",
    body: "We'll be screen-sharing and talking strategy. A distraction-free environment makes for a better call.",
  },
  {
    label: "Think through your business goals",
    body: "Where do you want to be in 12 months? The clearer you are, the more value we can deliver in 30 minutes.",
  },
  {
    label: "Know your target client",
    body: "Who are you trying to reach? Having this in mind helps us tailor everything to your specific market.",
  },
  {
    label: "Come with questions",
    body: "This call is for you. Write down anything you want to know — there are no dumb questions.",
  },
];

function CheckCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export default function YoureBookedPage() {
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
          {/* Confirmation badge */}
          <div className="inline-flex items-center gap-2 bg-[#f5f5f5] px-4 py-2 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#0a0a0a" />
              <path
                d="M7.5 12l3 3L16.5 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Call confirmed
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline mb-5">You&apos;re Booked!</h1>

          <p className="text-lg text-black/55 mb-12 max-w-xl leading-relaxed">
            You&apos;ll receive a confirmation email with all the details. We&apos;re
            looking forward to talking strategy with you.
          </p>

          {/* Video */}
          <div className="mb-14">
            <VideoPlaceholder label="A quick message from DJ" />
          </div>

          {/* Prep checklist */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 mb-7">
              How to get the most from your call
            </p>
            <ol className="flex flex-col gap-5">
              {PREP_CHECKLIST.map((item, i) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-0.5 shrink-0">
                    <CheckCircle />
                  </span>
                  <div>
                    <p className="font-bold text-sm">
                      {i + 1}. {item.label}
                    </p>
                    <p className="text-sm text-black/50 mt-1 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Back to site */}
          <div className="mt-16 pt-8 border-t border-black/10">
            <p className="text-sm text-black/40 mb-4">
              While you wait, feel free to explore our work.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Pivot Studio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
