import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopProducts from "@/components/ShopProducts";

export const metadata: Metadata = {
  title: "Shop — Pivot Studio",
  description: "Templates, kits, and builds for people who want to move faster.",
};

export default function ShopPage() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <ShopHero />
      <ShopProducts />
      <Footer />
    </main>
  );
}
