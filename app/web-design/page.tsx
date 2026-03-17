import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WebDesignHero from "@/components/web-design/Hero";
import Portfolio from "@/components/web-design/Portfolio";
import WebDesignIncludes from "@/components/web-design/Includes";
import WebDesignCTA from "@/components/web-design/CTA";

export const metadata: Metadata = {
  title: "Web Design — Pivot Studio",
  description:
    "Modern, conversion-focused websites for businesses that care about how they show up online. Built fast, built to last.",
};

export default function WebDesignPage() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <WebDesignHero />
      <Portfolio />
      <WebDesignIncludes />
      <WebDesignCTA />
      <Footer />
    </main>
  );
}
