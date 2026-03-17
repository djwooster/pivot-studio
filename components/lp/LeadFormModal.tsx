"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BUDGET_OPTIONS = [
  { value: "", label: "Select your budget" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k+", label: "$15,000+" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  budget: string;
}

export default function LeadFormModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: send to Supabase or GoHighLevel API before redirecting
    await new Promise((r) => setTimeout(r, 400));
    router.push("/book-a-call");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] max-w-md bg-white p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <Dialog.Title className="text-xl font-bold tracking-tight">
                Tell us about your project
              </Dialog.Title>
              <Dialog.Description className="text-sm text-black/45 mt-1">
                We&apos;ll reach out within 1 business day.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-black/25 hover:text-black transition-colors -mt-1 -mr-2 p-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/45">
                Full name
              </span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm text-[#0a0a0a] focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/35"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/45">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm text-[#0a0a0a] focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/35"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/45">
                Phone
              </span>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm text-[#0a0a0a] focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/35"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/45">
                Budget
              </span>
              <div className="relative">
                <select
                  name="budget"
                  required
                  value={form.budget}
                  onChange={handleChange}
                  className={`w-full border border-black/10 bg-[#f5f5f5] px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors appearance-none cursor-pointer ${form.budget === "" ? "text-black/35" : "text-[#0a0a0a]"}`}
                >
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} disabled={!o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {/* Chevron */}
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#0a0a0a] text-white py-4 font-bold text-sm uppercase tracking-widest hover:bg-[#0a0a0a]/85 transition-colors disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Reserve My Spot →"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
