"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const projects = [
  {
    name: "Blueprint Lidar",
    description: "Striking site for a pre-drywall scanning service — designed to build trust and drive bookings before the walls close.",
    tags: ["Professional Services", "Lead Capture"],
    href: "https://lidar-topaz.vercel.app/",
    image: "/lidar.jpeg",
    objectPosition: "top",
  },
  {
    name: "Empressions Studio",
    description: "Atmospheric brand site for a boutique tattoo studio in Tennessee — built to showcase artistry and drive bookings.",
    tags: ["Professional Services", "Lead Capture"],
    href: "https://empressions.vercel.app/",
    image: "/empressions-thumb-min.jpg",
    objectPosition: "top left",
  },
  {
    name: "Kaimea Estates",
    description: "Lush, editorial site for a wedding venue on Oahu — designed to evoke the feeling of the day before the couple even inquires.",
    tags: ["Real Estate", "Listings"],
    href: "https://kaimea-estates.vercel.app/",
    image: "/kaimea-thumb-min.jpg",
  },
  {
    name: "WeLoveLaguna",
    description: "Content-rich blog and lifestyle platform for a Laguna Beach realtor — turning local expertise into a steady stream of leads.",
    tags: ["Finance", "Services"],
    href: "https://we-love-laguna-ozjk.vercel.app/",
    image: "/laguna-thumb-min.jpg",
  },
  {
    name: "Resolve",
    description: "CRM-integrated web app that surfaces live pipeline data in a clean, custom dashboard — built for teams who need real-time visibility.",
    tags: ["E-commerce", "Shopify"],
    href: "https://pivot-studio-6iy9.vercel.app/",
    image: "/resolve-thumb-min.jpg",
  },
  {
    name: "Summit BnB",
    description: "Conversion-focused site for a short-term rental management company — built to attract property owners and fill the pipeline.",
    tags: ["Healthcare", "Booking"],
    href: "https://summitbnb.co/",
    image: "/summit-bnb-thumb-min.jpg",
  },
];


const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#f5f5f5] py-28 px-6" id="work" ref={ref}>
      <div className="max-w-[90rem] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]/35 mb-4">
            Our Work
          </p>
          <h2 className="section-headline text-[#0a0a0a] max-w-xl">
            Built to impress. Designed to convert.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              variants={fadeUp}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden bg-[#1a1a1a]"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: project.objectPosition ?? "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-sm font-bold border border-white/40 px-5 py-2.5">
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Project info */}
              <div className="px-7 py-6 flex flex-col gap-3 bg-white border-t border-black/8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#0a0a0a]">{project.name}</h3>
                  <svg
                    width="16" height="16" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 mt-0.5 text-[#0a0a0a]/25 group-hover:text-[#0a0a0a]/70 transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <path d="M2 12 L12 2 M5 2 H12 V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base text-[#0a0a0a]/50 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-[#0a0a0a]/40 border border-black/12 px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
