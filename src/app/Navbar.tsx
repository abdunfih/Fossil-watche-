"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Collection", href: "#hero", id: "01" },
  { name: "Features", href: "#features", id: "02" },
  { name: "Specs", href: "#specs", id: "03" },
  { name: "Heritage", href: "#heritage", id: "04" },
];

// Extracted utility — reused by Navbar and footer
export const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);

  // Scroll-state for background blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenu(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${isScrolled
        ? "py-4 bg-black/50 backdrop-blur-2xl border-b border-white/5"
        : "py-8 bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => scrollToSection("#hero")}
              className="text-white font-[family-name:var(--font-outfit)] font-black text-2xl tracking-[0.3em] uppercase italic"
            >
              Fossil
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="group flex flex-col items-start relative overflow-hidden py-1"
                >
                  <span className="text-[8px] font-mono text-white/20 mb-0.5 tracking-tighter">
                    {item.id}
                  </span>
                  <span className="text-[10px] text-white/40 group-hover:text-white uppercase font-bold tracking-[0.2em] transition-colors duration-500">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-8">
            <span className="text-[9px] font-mono text-white/30 tracking-widest hidden xl:block uppercase">
              {/* Mechanical Series 2026 */}
            </span>
            <button
              onClick={() => scrollToSection("#purchase")}
              className="group relative px-8 py-3 bg-white overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[#00e5ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 text-[10px] font-black text-black uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                Purchase
              </span>
            </button>
          </div>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenu((v) => !v)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-[101] relative"
          >
            <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <div className={`h-[1px] w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu — z-[99] sits below hamburger (z-[101]) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 top-0 bg-black/98 backdrop-blur-3xl z-[99] flex flex-col justify-center px-12"
          >
            <div className="space-y-8">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    scrollToSection(item.href);
                    closeMobileMenu();
                  }}
                  className="block w-full text-left group"
                >
                  <span className="block text-[10px] font-mono text-white/20 mb-1 tracking-widest">
                    {item.id}
                  </span>
                  <motion.span
                    whileHover={{ skewX: -5, x: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="block text-4xl font-extralight text-white uppercase tracking-tighter"
                  >
                    {item.name}
                  </motion.span>
                </motion.button>
              ))}

              {/* Mobile purchase CTA */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  scrollToSection("#purchase");
                  closeMobileMenu();
                }}
                className="mt-12 w-full py-4 border border-white/10 text-white uppercase text-xs tracking-widest font-bold hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-colors duration-300"
              >
                Purchase Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}