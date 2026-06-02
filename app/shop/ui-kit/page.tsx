import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UIKitPageClient from "@/components/UIKitPageClient";

export const metadata: Metadata = {
  title: "Builder Kit — Pivot Studio",
  description:
    "50+ production-ready components, tested prompt templates, and workflow recipes built specifically for Claude Code.",
};

export default function UIKitPage() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <UIKitPageClient />
      <Footer />
    </main>
  );
}
