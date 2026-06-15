"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import HeroSequence from "./HeroSequence";
import Navbar, { scrollToSection } from "./Navbar";

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ── Spec data ──────────────────────────────────────────────────────────────
const specs = [
  { title: "The Build", desc: "44mm Round Case\n12.7mm Thickness", accent: "Iconic Silhouette" },
  { title: "The Movement", desc: "Automatic Analogue\n(Self-Winding)", accent: "No Battery Required" },
  { title: "The Resilience", desc: "50 Metres Water\nResistant", accent: "Depth-Tested" },
  { title: "The Finish", desc: "Black Stainless Steel\nFold-Over Clasp", accent: "Industrial Matte" },
  { title: "The Clarity", desc: "Grey-Tinted\nMineral Crystal", accent: "UV Protected" },
  { title: "The Promise", desc: "2 Years Manufacturer\nWarranty", accent: "Global Support" },
];

// ── Purchase details ───────────────────────────────────────────────────────
const purchaseDetails = [
  { label: "Gender", value: "Men" },
  { label: "Occasion", value: "Casual / Sophisticated Wear" },
  { label: "Package Includes", value: "1 Wrist Watch, Warranty Card, Fossil Collector's Tin." },
];

export default function Home() {
  // ── Core mechanism scroll parallax ──────────────────────────────────────
  const coreRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coreProgress } = useScroll({
    target: coreRef,
    offset: ["start end", "end start"],
  });
  const watchScale = useTransform(coreProgress, [0, 0.5], [0.85, 1.08]);
  const watchY = useTransform(coreProgress, [0, 1], ["15%", "-15%"]);

  // ── Brand story parallax ─────────────────────────────────────────────────
  const brandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: brandProgress } = useScroll({
    target: brandRef,
    offset: ["start end", "end start"],
  });
  const brandImgY = useTransform(brandProgress, [0, 1], ["0%", "18%"]);

  // ── X-ray glow refs ──────────────────────────────────────────────────────
  const watchContainerRef = useRef<HTMLDivElement>(null);
  const xrayGlowRef = useRef<HTMLDivElement>(null);

  const handleWatchMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!watchContainerRef.current || !xrayGlowRef.current) return;
    const rect = watchContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    xrayGlowRef.current.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.45) 0%, transparent 60%)`;
    xrayGlowRef.current.style.opacity = "1";
  };

  const handleWatchMouseLeave = () => {
    if (!xrayGlowRef.current) return;
    xrayGlowRef.current.style.opacity = "0";
  };

  return (
    <div className="relative w-full bg-obsidian text-white font-[family-name:var(--font-inter)]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div id="hero">
        <HeroSequence />
      </div>

      {/* ── Section 1: Core Mechanism ────────────────────────────────────── */}
      <section
        id="features"
        ref={coreRef}
        className="relative z-10 bg-obsidian -mt-[50vh] pt-[50vh] pb-16 md:pb-32"
      >
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-4 sm:px-6 md:px-[10%] gap-8 md:gap-16">

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="md:w-1/2 text-center md:text-left z-20"
          >
            <motion.p
              variants={textVariants}
              className="text-[9px] font-mono text-[#00e5ff]/60 tracking-[0.4em] uppercase mb-6"
            >
              The Mechanism
            </motion.p>
            <motion.h2
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-semibold mb-4 md:mb-8 tracking-tight leading-[1.1] font-[family-name:var(--font-outfit)]"
            >
              Weightless Precision.<br />
              <span className="text-glow text-white">Visible Soul.</span>
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-sm sm:text-base md:text-lg text-white/50 max-w-[480px] mx-auto md:mx-0 leading-relaxed"
            >
              The Townsman isn&apos;t just a watch — it&apos;s a window into the physics of
              time. Driven by your natural motion, the self-winding mechanism eliminates
              the need for batteries, creating a perpetual loop of kinetic energy.
            </motion.p>
          </motion.div>

          {/* Watch image */}
          <div className="md:w-1/2 flex justify-center z-10 w-full">
            <motion.div
              style={{ scale: watchScale, y: watchY }}
              ref={watchContainerRef}
              className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[480px] aspect-square rounded-full group"
              onMouseMove={handleWatchMouseMove}
              onMouseLeave={handleWatchMouseLeave}
            >
              <motion.div
                className="w-full h-full relative rounded-full"
                whileHover={{ rotateY: 8, rotateX: 4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              >
                <Image
                  src="/orbital_mechanics_watch.png"
                  alt="Fossil Townsman ME3269"
                  fill
                  className="object-cover rounded-full drop-shadow-[0_40px_80px_rgba(0,229,255,0.12)]"
                />
              </motion.div>

              {/* X-ray glow */}
              <div
                ref={xrayGlowRef}
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 pointer-events-none mix-blend-screen"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Technical Specifications ──────────────────────────── */}
      <section id="specs" className="py-40 relative bg-gradient-to-b from-transparent via-white/[0.03] to-transparent">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="max-w-[1200px] mx-auto px-8"
        >
          <div className="text-center mb-20">
            <motion.p
              variants={textVariants}
              className="text-[9px] font-mono text-[#00e5ff]/60 tracking-[0.4em] uppercase mb-4"
            >
              Engineering Data
            </motion.p>
            <motion.h2
              variants={textVariants}
              className="text-5xl md:text-[4.5rem] font-semibold tracking-tight font-[family-name:var(--font-outfit)]"
            >
              Technical Specifications
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                variants={textVariants}
                className="glass-card p-6 md:p-8 lg:p-10 rounded-[20px] md:rounded-[28px] flex flex-col justify-between min-h-[200px] md:min-h-[240px] group"
              >
                <h3 className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em] mb-4 md:mb-6 font-[family-name:var(--font-outfit)]">
                  {spec.title}
                </h3>
                <p className="text-xl md:text-2xl mb-6 md:mb-8 whitespace-pre-line leading-tight text-white/90 font-light text-sm md:text-base">
                  {spec.desc}
                </p>
                <div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#00e5ff] to-transparent mb-5 transition-all duration-500 group-hover:w-full group-hover:from-[#00e5ff] group-hover:to-white/20" />
                  <span className="text-xs text-[#00e5ff] font-semibold uppercase tracking-wider font-[family-name:var(--font-outfit)]">
                    {spec.accent}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Section 3: Brand Story ────────────────────────────────────────── */}
      <section id="heritage" ref={brandRef} className="relative py-16 md:py-40 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-[10%] gap-8 md:gap-20">

          {/* Parallax image */}
          <div className="md:w-1/2 relative rounded-[32px] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.9)] h-[60vh] md:h-[80vh] w-full">
            <motion.div
              style={{ y: brandImgY }}
              className="absolute -top-[20%] -bottom-[20%] left-0 right-0"
            >
              <Image
                src="/deconstructed_heritage.png"
                alt="Fossil Heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 blueprint-overlay mix-blend-overlay opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 pointer-events-none" />
            </motion.div>
          </div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="md:w-1/2 text-center md:text-left z-10"
          >
            <motion.p
              variants={textVariants}
              className="text-[9px] font-mono text-[#00e5ff]/60 tracking-[0.4em] uppercase mb-6"
            >
              The Heritage
            </motion.p>
            <motion.h2
              variants={textVariants}
              className="text-5xl md:text-[4.5rem] font-semibold mb-8 tracking-tight leading-[1.1] font-[family-name:var(--font-outfit)]"
            >
              American Innovation<br />
              <span className="text-[#00e5ff]">Since 1984.</span>
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-lg text-white/50 max-w-[480px] mx-auto md:mx-0 leading-relaxed"
            >
              Rooted in authenticity and a distinctive vintage-inspired design aesthetic,
              Fossil bridges the gap between classic craftsmanship and modern industrial
              design. The Townsman series represents the pinnacle of this evolution — a
              statement piece for those who value the intricate dance of mechanical
              engineering.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Purchase ───────────────────────────────────────────── */}
      <section id="purchase" className="py-16 md:py-40 bg-black relative border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center"
        >
          {/* Eyebrow + price */}
          <motion.div variants={textVariants} className="text-center mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium mb-3 md:mb-4 font-[family-name:var(--font-outfit)] text-white/40">
              Fossil Townsman
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[6rem] xl:text-[7rem] font-black text-white font-[family-name:var(--font-outfit)] leading-none tracking-tighter drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              ₹21,995
            </p>
          </motion.div>

          {/* Detail card */}
          <motion.div
            variants={textVariants}
            className="glass-card p-6 md:p-10 lg:p-16 rounded-[24px] md:rounded-[32px] lg:rounded-[40px] w-full"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-8 md:mb-10 font-[family-name:var(--font-outfit)]">
              Model <span className="text-[#00e5ff]">ME3269</span>
            </h3>
            <ul className="flex flex-col gap-0">
              {purchaseDetails.map((item, i) => (
                <li
                  key={i}
                  className="py-4 md:py-6 border-b border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-end last:border-0 last:pb-0 gap-2"
                >
                  <strong className="text-xs text-white/30 font-normal tracking-[0.25em] uppercase">
                    {item.label}
                  </strong>
                  <span className="text-base md:text-lg text-white/90 sm:text-right max-w-[400px]">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={textVariants} className="mt-8 md:mt-14 w-full sm:w-auto">
            <motion.button
              onClick={() => window.open("https://www.fossil.com", "_blank")}
              className="group relative w-full sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-7 bg-white text-black rounded-full font-[family-name:var(--font-outfit)] font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(0,229,255,0.25)]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#0099cc] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 flex items-center gap-3">
                <span>Purchase Now</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-12 md:py-16 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <p className="text-xl sm:text-2xl font-black font-[family-name:var(--font-outfit)] text-white tracking-[0.2em] uppercase italic mb-3 md:mb-4">
                Fossil
              </p>
              <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-sm">
                Experience time redefined. A masterpiece of precision engineering and timeless design.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-[8px] sm:text-[9px] font-mono text-white/30 tracking-[0.3em] uppercase mb-4 md:mb-6">
                Quick Links
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Specifications", href: "#specs" },
                  { label: "Heritage", href: "#heritage" },
                  { label: "Purchase", href: "#purchase" },
                ].map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-xs sm:text-sm text-white/30 hover:text-[#00e5ff] transition-colors duration-300 uppercase tracking-wider"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-[8px] sm:text-[9px] font-mono text-white/30 tracking-[0.3em] uppercase mb-4 md:mb-6">
                Connect
              </h4>
              <div className="flex gap-4 md:gap-5">
                <a href="#" aria-label="Twitter" className="text-white/20 hover:text-[#00e5ff] transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zM17.083 20.25h1.833L7.084 4.126H5.117L17.083 20.25z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-white/20 hover:text-[#00e5ff] transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-[9px] sm:text-[10px] text-white/20 font-mono tracking-widest uppercase text-center sm:text-left">
              © 2026 Fossil Group, Inc. All rights reserved.
            </p>
            <p className="text-[9px] sm:text-[10px] text-white/10 font-mono tracking-widest">
              ME3269 · Mechanical Series 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
