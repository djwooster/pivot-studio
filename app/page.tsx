import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import ROIMath from "@/components/ROIMath";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <Hero />
      <TheProblem />
      <HowItWorks />
      <Services />
      <WhoWeWorkWith />
      <ROIMath />
      <CTASection />
      <Footer />
    </main>
  );
}
