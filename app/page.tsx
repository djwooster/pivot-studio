import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
// import TheProblem from "@/components/TheProblem";
import Introducing from "@/components/Introducing";
import HowItWorks from "@/components/HowItWorks";
import WhatWeSpecializeIn from "@/components/WhatWeSpecializeIn";
import UseCases from "@/components/web-apps/UseCases";
// import Services from "@/components/Services";
// import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import ROIMath from "@/components/ROIMath";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white text-[#0a0a0a]" style={{ overflowX: "clip" }}>
      <Nav />
      <Hero />
      <Introducing />
      <WhatWeSpecializeIn />
      {/* <TheProblem /> */}
      <HowItWorks />
      <UseCases />
      {/* <Services /> */}
      {/* <WhoWeWorkWith /> */}
      <ROIMath />
      <CTASection />
      <Footer />
    </main>
  );
}
