"use client";

import { useState } from "react";

const ArrowSVG = () => (
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

interface Props {
  productId: string;
  variant?: "dark" | "light";
  label?: string;
}

export default function CheckoutButton({ productId, variant = "dark", label = "Buy Now" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        console.error('Checkout error:', data);
        setError(data.error || 'Something went wrong. Try again.');
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout fetch error:', err);
      setError('Could not reach checkout. Try again.');
      setLoading(false);
    }
  };

  const base =
    "group relative inline-flex w-full items-center justify-center gap-2 font-bold overflow-hidden transition-colors duration-200 h-12 px-6 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    dark: "bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/85",
    light: "bg-white text-[#0a0a0a] hover:bg-white/90",
  };

  return (
    <div className="w-full">
      <button
      onClick={handleClick}
      disabled={loading}
      className={`${base} ${variants[variant]}`}
      style={{ '--cta-arrow-left': '20px' } as React.CSSProperties}
    >
      <span className="cta-arrow-in">
        <ArrowSVG />
      </span>
      <span className="cta-text">
        {loading ? "Redirecting…" : label}
      </span>
      {!loading && (
        <span className="cta-arrow-out">
          <ArrowSVG />
        </span>
      )}
    </button>
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
