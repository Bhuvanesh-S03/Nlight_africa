"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageSquareShare, Sparkles } from "lucide-react";

export default function LuxuryHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const handleWhatsAppConsultation = () => {
    const number = "2348035221088";
    const text = encodeURIComponent(
      "Hello The Royal Dreams! I just landed on your website and would love to consult with you about placing a premium incense order."
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section
      ref={heroRef}
      aria-label="Nlight Africa full-width luxury hero"
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-[#dcd0b9]"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 w-full h-full flex justify-center items-center pointer-events-none">
        <motion.div
          className="relative w-full h-full flex justify-center items-center"
          style={{ 
            scale: prefersReducedMotion ? 1 : videoScale,
            y: prefersReducedMotion ? "0%" : videoY,
            opacity: prefersReducedMotion ? 1 : videoOpacity 
          }}
        >
          {/* Apply shade/aesthetic filter to dull the video and look more premium */}
          <video
            className="w-full h-full md:w-[95%] md:h-[95vh] object-cover object-center filter contrast-[1.05] brightness-[0.80] sepia-[0.20] saturate-[0.75] opacity-50 rounded-none lg:rounded-3xl"
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-label="Incense smoke rising with African botanicals"
          >
            <source src="/videos/timeline-1.mp4" type="video/mp4" />
            <source src="/videos/Timeline%201.mov" type="video/quicktime" />
          </video>
          
          {/* Edge Blending Gradients */}
          <div className="absolute inset-0">
            {/* Top Edge */}
            <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-32 bg-gradient-to-b from-[#dcd0b9] via-[#dcd0b9]/90 to-transparent z-10"></div>
            {/* Bottom Edge */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] md:h-64 bg-gradient-to-t from-[#dcd0b9] via-[#dcd0b9]/90 to-transparent z-10"></div>
            {/* Left Edge */}
            <div className="absolute top-0 bottom-0 left-0 w-[80%] md:w-[50%] bg-gradient-to-r from-[#dcd0b9] via-[#dcd0b9]/80 to-transparent z-10"></div>
            {/* Right Edge */}
            <div className="absolute top-0 bottom-0 right-0 w-[40%] md:w-[30%] bg-gradient-to-l from-[#dcd0b9] via-[#dcd0b9]/70 to-transparent z-10"></div>
          </div>
        </motion.div>
      </div>

      {/* Foreground Content - Left side */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 pb-8 pt-10 md:pt-32 items-center pointer-events-none h-full">
        <div className="space-y-5 md:space-y-8 text-left mt-24 md:mt-0 w-full max-w-xl mx-auto lg:mx-0 pointer-events-auto bg-transparent relative z-20 flex flex-col items-start justify-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.15] text-charcoal font-normal max-w-lg">
              Crafting <span className="italic text-saffron font-medium">Fragrance</span> <br />
              That Becomes <span className="font-semibold text-charcoal">Memory</span>
            </h1>
            <p className="text-sm md:text-base text-charcoal/80 font-medium max-w-md leading-relaxed pr-2">
              Premium incense sticks and botanical repellents. Crafted utilizing traditional techniques infused with majestic African scent flora to awaken deep memories and purify sanctuaries.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full md:w-auto">
            <a
              href="#collections"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest shadow-lg hover:bg-saffron hover:shadow-saffron/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Collection
              <ArrowDown size={14} className="animate-bounce" />
            </a>
            <button
              onClick={handleWhatsAppConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-ivory/90 backdrop-blur-md border border-charcoal/20 text-charcoal text-[10px] sm:text-xs font-semibold uppercase tracking-widest shadow-sm hover:bg-sandalwood hover:border-saffron hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquareShare size={15} className="text-emerald shrink-0" />
              WhatsApp Inquiry
            </button>
          </div>

          {/* Micro Trust Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-charcoal/10 w-full text-left">
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">15+</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/80 pt-1 font-bold">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">40+</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/80 pt-1 font-bold">Blends</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">100%</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/80 pt-1 font-bold">Certified</p>
            </div>
          </div>
        </div>
        
        {/* Right Side is empty for the incense stick video focus */}
        <div></div>
      </div>
    </section>
  );
}
