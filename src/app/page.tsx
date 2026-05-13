"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const watchContainerRef = useRef<HTMLDivElement>(null);
  const xrayGlowRef = useRef<HTMLDivElement>(null);
  
  const parallaxSlowRefs = useRef<(HTMLDivElement | HTMLImageElement | null)[]>([]);
  const parallaxMediumRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxFastRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: any, refArray: React.MutableRefObject<any[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // Smooth CTA Follow
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ctaX = mouseX;
    let ctaY = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (ctaRef.current) {
        if (ctaRef.current.style.opacity === '0' || ctaRef.current.style.opacity === '') {
          ctaRef.current.style.opacity = '1';
        }
      }
    };

    const animateCTA = () => {
      ctaX += (mouseX - ctaX) * 0.1;
      ctaY += (mouseY - ctaY) * 0.1;
      if (ctaRef.current) {
        ctaRef.current.style.left = `${ctaX}px`;
        ctaRef.current.style.top = `${ctaY}px`;
      }
      animationFrameId = requestAnimationFrame(animateCTA);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateCTA();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax Scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      parallaxSlowRefs.current.forEach((el) => {
        if (el) el.style.transform = `translateY(${scrollY * 0.05}px)`;
      });
      parallaxMediumRefs.current.forEach((el) => {
        if (el) el.style.transform = `translateY(${scrollY * 0.1}px)`;
      });
      parallaxFastRefs.current.forEach((el) => {
        if (el) el.style.transform = `translateY(${scrollY * 0.2}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // X-Ray Glow Logic
  const handleWatchMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (watchContainerRef.current && xrayGlowRef.current) {
      const rect = watchContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xrayGlowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.4) 0%, transparent 60%)`;
      xrayGlowRef.current.style.opacity = '1';
    }
  };

  const handleWatchMouseLeave = () => {
    if (xrayGlowRef.current) {
      xrayGlowRef.current.style.opacity = '0';
      xrayGlowRef.current.style.background = `radial-gradient(circle at center, rgba(0,229,255,0.4) 0%, transparent 70%)`;
    }
  };

  // CTA Interaction Handlers
  const interactEnter = () => {
    if (ctaRef.current) {
      ctaRef.current.style.transform = "translate(-50%, -50%) scale(0.5)";
      ctaRef.current.style.opacity = "0.3";
    }
  };

  const interactLeave = () => {
    if (ctaRef.current) {
      ctaRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      ctaRef.current.style.opacity = "1";
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-obsidian text-white font-[family-name:var(--font-inter)]">
      {/* Floating CTA */}
      <a
        href="#buy"
        ref={ctaRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border border-[#00e5ff] rounded-full flex items-center justify-center text-white no-underline uppercase text-[0.85rem] tracking-[1px] z-[100] pointer-events-none opacity-0 transition-opacity duration-500 backdrop-blur-[4px] shadow-[0_0_30px_rgba(0,229,255,0.4)] font-[family-name:var(--font-outfit)] font-semibold"
        style={{ background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.1), transparent)' }}
      >
        <span className="relative z-10">Buy Now</span>
      </a>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at center, #1a1a24 0%, var(--color-obsidian) 70%)' }}>
        <div className="text-center z-10">
          <h1 className="text-[4rem] md:text-[6rem] font-black tracking-tighter mb-4 animate-float-up opacity-0 font-[family-name:var(--font-outfit)] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent leading-tight">
            Fossil Townsman
          </h1>
          <p className="text-xl md:text-2xl text-[#00e5ff] tracking-[0.2em] uppercase animate-float-up opacity-0" style={{ animationDelay: '0.5s' }}>
            Suspend Time. Defy Gravity.
          </p>
        </div>
      </section>

      {/* Section 1: The Core Mechanism */}
      <section className="relative">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-16 px-8 md:px-[10%] gap-16">
          <div 
            ref={(el) => addToRefs(el, parallaxFastRefs)} 
            className="md:w-1/2 text-center md:text-left transition-transform duration-100 ease-linear"
          >
            <h2 className="text-4xl md:text-[3.5rem] font-semibold mb-6 tracking-tight leading-tight font-[family-name:var(--font-outfit)]">
              Weightless Precision.<br />
              <span className="text-glow text-white">Visible Soul.</span>
            </h2>
            <p className="text-lg text-[#a0a0a0] max-w-[500px] mx-auto md:mx-0">
              The Townsman isn't just a watch; it's a window into the physics of time. Driven by your natural motion, the self-winding mechanism eliminates the need for batteries, creating a perpetual loop of kinetic energy.
            </p>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div 
              ref={watchContainerRef}
              className="relative w-full max-w-[600px] rounded-full group [perspective:1000px]"
              onMouseMove={handleWatchMouseMove}
              onMouseLeave={handleWatchMouseLeave}
              onMouseEnter={interactEnter}
              onMouseOut={interactLeave}
            >
              <img 
                src="/orbital_mechanics_watch.png" 
                alt="Fossil Townsman ME3269" 
                className="w-full h-auto block drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-y-10"
              />
              <div 
                ref={xrayGlowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full opacity-0 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                style={{ background: 'radial-gradient(circle at center, rgba(0,229,255,0.4) 0%, transparent 70%)' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications */}
      <section className="py-32 relative bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-4xl md:text-[3.5rem] font-semibold mb-16 text-center tracking-tight font-[family-name:var(--font-outfit)]">
            Technical Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              ref={(el) => addToRefs(el, parallaxSlowRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Build</h3>
              <p className="text-xl mb-6">44mm Round Case<br />12.7mm Thickness</p>
              <div className="h-[2px] w10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">Iconic Silhouette</span>
            </div>

            <div 
              ref={(el) => addToRefs(el, parallaxMediumRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Movement</h3>
              <p className="text-xl mb-6">Automatic Analogue<br />(Self-Winding)</p>
              <div className="h-[2px] w-10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">No Battery Required</span>
            </div>

            <div 
              ref={(el) => addToRefs(el, parallaxFastRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Resilience</h3>
              <p className="text-xl mb-6">50 Meters Water<br />Resistant</p>
              <div className="h-[2px] w-10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">Depth-Tested</span>
            </div>

            <div 
              ref={(el) => addToRefs(el, parallaxMediumRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Finish</h3>
              <p className="text-xl mb-6">Black Stainless Steel<br />Fold-Over Clasp</p>
              <div className="h-[2px] w-10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">Industrial Matte</span>
            </div>

            <div 
              ref={(el) => addToRefs(el, parallaxSlowRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Clarity</h3>
              <p className="text-xl mb-6">Grey-Tinted<br />Mineral Crystal</p>
              <div className="h-[2px] w-10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">UV Protected</span>
            </div>

            <div 
              ref={(el) => addToRefs(el, parallaxFastRefs)}
              className="glass-card p-10 rounded-3xl flex flex-col justify-between min-h-[220px] group transition-transform duration-100 ease-linear"
              onMouseEnter={interactEnter}
              onMouseLeave={interactLeave}
            >
              <h3 className="text-xl text-[#a0a0a0] uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">The Promise</h3>
              <p className="text-xl mb-6">2 Years Manufacturer<br />Warranty</p>
              <div className="h-[2px] w-10 bg-[#00e5ff] mb-4 transition-all duration-300 group-hover:w-full"></div>
              <span className="font-[family-name:var(--font-outfit)] text-sm text-[#00e5ff] font-semibold uppercase">Global Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Product Data Sheet */}
      <section className="py-24 bg-[#050506]">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-center">
          <div className="bg-black/50 border border-white/5 p-12 md:p-16 rounded-[32px] w-full max-w-[800px]">
            <h2 className="text-4xl font-semibold mb-4 font-[family-name:var(--font-outfit)]">Model: <span className="text-[#00e5ff]">ME3269</span></h2>
            <p className="text-[3rem] font-black text-white mb-8 font-[family-name:var(--font-outfit)]">₹21,995</p>
            <ul className="list-none flex flex-col">
              <li className="py-4 border-b border-white/10 flex flex-col sm:flex-row sm:justify-between">
                <strong className="text-[#a0a0a0] font-normal">Gender:</strong> 
                <span>Men</span>
              </li>
              <li className="py-4 border-b border-white/10 flex flex-col sm:flex-row sm:justify-between">
                <strong className="text-[#a0a0a0] font-normal">Occasion:</strong> 
                <span>Casual / Sophisticated Wear</span>
              </li>
              <li className="py-4 flex flex-col sm:flex-row sm:justify-between">
                <strong className="text-[#a0a0a0] font-normal">Package Includes:</strong> 
                <span className="sm:text-right">1 Wrist Watch, Warranty Card, Fossil Collector’s Tin.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Brand Story */}
      <section className="relative">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-16 px-8 md:px-[10%] gap-16">
          <div className="md:w-1/2 relative rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
             <img 
               src="/deconstructed_heritage.png" 
               alt="Fossil Heritage" 
               className="w-full h-auto block transition-transform duration-100 ease-linear"
               ref={(el) => addToRefs(el, parallaxSlowRefs)}
             />
             <div className="absolute inset-0 opacity-50 pointer-events-none blueprint-overlay"></div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-[3.5rem] font-semibold mb-6 tracking-tight leading-tight font-[family-name:var(--font-outfit)]">
              American Innovation<br/>Since 1984.
            </h2>
            <p className="text-lg text-[#a0a0a0] max-w-[500px] mx-auto md:mx-0">
              Rooted in authenticity and a distinctive vintage-inspired design aesthetic, Fossil bridges the gap between classic craftsmanship and modern industrial design. The Townsman series represents the pinnacle of this evolution—a statement piece designed for those who value the intricate dance of mechanical engineering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
