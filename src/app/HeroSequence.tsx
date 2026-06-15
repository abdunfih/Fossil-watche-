"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const frameCount = 240;

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Ensure number is padded to 3 digits (001, 002, etc.)
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/images/herosection/ezgif-frame-${paddedIndex}.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Render initial frame when loaded
  useEffect(() => {
    if (loaded && images.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = images[0];

      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0);
    }
  }, [loaded, images]);

  // Update frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;

    // Map scroll progress to frame index (0 to 239)
    const frameIndex = Math.min(frameCount - 1, Math.floor(latest * frameCount));
    const img = images[frameIndex];

    const ctx = canvasRef.current.getContext('2d');
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx?.drawImage(img, 0, 0);
  });

  // Text Animations based on scrollYProgress
  // We divide the 0-1 progress into chunks for different text overlays

  // Title (0 to 0.2)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);

  // Feature 1: Skeleton Dial (0.3 to 0.5)
  const f1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const f1Y = useTransform(scrollYProgress, [0.25, 0.5], [20, -20]);

  // Feature 2: Self-Winding Movement (0.55 to 0.75)
  const f2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const f2Y = useTransform(scrollYProgress, [0.5, 0.75], [20, -20]);

  // Final Reveal (0.8 to 1)
  const f3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const f3Y = useTransform(scrollYProgress, [0.75, 1], [20, 0]);

  // Replace your Text Overlay 1 with this logic

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-obsidian">
            <p className="text-[#00e5ff] tracking-widest font-[family-name:var(--font-outfit)] animate-pulse">
              INITIALIZING SEQUENCE...
            </p>
          </div>
        )}

        {/* Canvas for Video Sequence */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-80"
        />

        {/* Text Overlay 1: Title */}
        {/* Replace the title with a "Technical HUD" vibe */}
        <motion.div style={{ opacity: titleOpacity }} className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none z-20">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-white text-[10px] tracking-widest font-mono">MODEL: FS-5380</p>
              <p className="text-white/40 text-[10px] font-mono">LAT: 34.0522° N // LONG: 118.2437° W</p>
            </div>
            <div className="text-right">
              <p className="text-[#00e5ff] text-xs tracking-widest uppercase">Status: Nominal</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <h1 className="text-4xl font-light tracking-[1em] text-white pl-[1em]">TOWNSMAN</h1>
          </div>

          <div className="flex justify-between items-end">
            <div className="h-24 w-[1px] bg-gradient-to-t from-[#00e5ff] to-transparent" />
            <p className="max-w-[200px] text-[10px] leading-relaxed text-white/50 uppercase tracking-widest">
              Automated movement tracking system active.
            </p>
          </div>
        </motion.div>

        {/* Text Overlay 2: Skeleton Dial (Top Left) */}
        <motion.div
          style={{ opacity: f1Opacity, y: f1Y }}
          className="absolute top-[15%] left-[5%] md:top-[20%] md:left-[10%] flex flex-col items-start pointer-events-none z-10 max-w-xs md:max-w-sm"
        >
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2 font-[family-name:var(--font-outfit)] text-white drop-shadow-xl">
            Exposed Mechanics
          </h2>
          <p className="text-sm md:text-lg text-[#a0a0a0] font-light drop-shadow-md">
            A striking skeleton dial reveals the beating heart of the machine. Precision engineering laid bare.
          </p>
        </motion.div>

        {/* Text Overlay 3: Self-Winding (Bottom Right) */}
        <motion.div
          style={{ opacity: f2Opacity, y: f2Y }}
          className="absolute bottom-[25%] right-[5%] md:bottom-[20%] md:right-[10%] flex flex-col items-end text-right pointer-events-none z-10 max-w-xs md:max-w-sm"
        >
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2 font-[family-name:var(--font-outfit)] text-white drop-shadow-xl">
            Kinetic Engine
          </h2>
          <p className="text-sm md:text-lg text-[#a0a0a0] font-light drop-shadow-md">
            No batteries. Driven purely by your natural motion. A perpetual loop of energy suspended in time.
          </p>
        </motion.div>

        {/* Text Overlay 4: Final Feature (Bottom Left) */}
        <motion.div
          style={{ opacity: f3Opacity, y: f3Y }}
          className="absolute bottom-[30%] left-[5%] md:bottom-[25%] md:left-[10%] flex flex-col items-start pointer-events-none z-10 max-w-xs md:max-w-sm"
        >
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2 font-[family-name:var(--font-outfit)] text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            Industrial Elegance
          </h2>
          <p className="text-sm md:text-lg text-white font-light drop-shadow-lg">
            Forged in black stainless steel. Built to withstand the pressure of modern life.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
