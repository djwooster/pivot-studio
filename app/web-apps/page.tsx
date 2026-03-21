import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WebAppsHero from "@/components/web-apps/Hero";
import UseCases from "@/components/web-apps/UseCases";
import WebAppsIncludes from "@/components/web-apps/Includes";
import WebAppsCTA from "@/components/web-apps/CTA";

export const metadata: Metadata = {
  title: "Custom Web Apps — Pivot Studio",
  description:
    "Custom web apps built around your workflow — dashboards, portals, internal tools, and more. No duct-taped SaaS. Just software that fits.",
};

export default function WebAppsPage() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <WebAppsHero />
      <UseCases />
      <WebAppsIncludes />
      <WebAppsCTA />
      <Footer />
    </main>
  );
}
