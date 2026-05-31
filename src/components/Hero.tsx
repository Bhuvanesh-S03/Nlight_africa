"use client";

import { ArrowDown, MessageSquareShare, Sparkles } from "lucide-react";

export default function Hero() {
  const handleWhatsAppConsultation = () => {
    const number = "2348035221088";
    const text = encodeURIComponent(
      "Hello The Royal Dreams! I just landed on your website and would love to consult with you about placing a premium incense or b2c consumer order."
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section className="relative min-h-screen bg-ivory flex items-center justify-center overflow-hidden pt-20">
      {/* Background Soft Cinematic Lighting Glares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-saffron/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lavender/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Floating Decorative Incense Smoke Vectors */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-multiply">
        <svg
          className="absolute left-1/3 top-1/4 w-96 h-[500px] animate-smoke"
          viewBox="0 0 200 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 500 C80 400 120 300 90 200 C60 100 130 50 100 0"
            stroke="url(#smoke-grad-1)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="smoke-grad-1" x1="0" y1="500" x2="0" y2="0">
              <stop offset="0%" stopColor="#F5EFEB" stopOpacity="0" />
              <stop offset="50%" stopColor="#D98A53" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FCFAF6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 pt-10">
        {/* Left Editorial Copy Block */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sandalwood border border-gold/15 shadow-sm">
            <Sparkles size={13} className="text-saffron animate-spin-slow" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal/80">
              Luxury Fragrances & Spiritual Purification
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.08] text-charcoal font-normal">
              Crafting <span className="italic text-saffron font-light">Fragrance</span> <br />
              That Becomes <span className="font-semibold text-gold">Memory</span>
            </h1>
            <p className="text-sm md:text-base text-charcoal/70 font-light max-w-xl leading-relaxed">
              Premium incense sticks, insecticide repellents, and spiritual charcoal cups. Crafted utilizing traditional Vedic agarbatti techniques infused with majestic African scent flora to awaken deep memories, quiet minds, and purify sanctuaries.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#collections"
              className="px-8 py-4 rounded-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest shadow-lg hover:bg-saffron hover:shadow-saffron/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Collection
              <ArrowDown size={14} className="animate-bounce" />
            </a>
            <button
              onClick={handleWhatsAppConsultation}
              className="px-8 py-4 rounded-full bg-ivory/80 backdrop-blur-md border border-gold/30 text-charcoal text-xs font-semibold uppercase tracking-widest shadow-sm hover:bg-sandalwood hover:border-saffron hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquareShare size={15} className="text-emerald" />
              WhatsApp Inquiry
            </button>
          </div>

          {/* Micro Trust Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/10 max-w-lg">
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">15+</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/50 pt-1">Countries consumered</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">40+</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/50 pt-1">Fragrant Blends</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-charcoal font-bold">100%</p>
              <p className="text-[10px] tracking-wider uppercase text-charcoal/50 pt-1">NAFDAC Certified</p>
            </div>
          </div>
        </div>

        {/* Right Floating Product Mockup Display Block */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Animated Glow Rings under mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold/10 border border-gold/20 animate-ping opacity-35"></div>
          
          {/* Floating Container */}
          <div className="relative w-72 md:w-80 h-[450px] bg-sandalwood/40 backdrop-blur-md border border-gold/20 rounded-[32px] p-6 shadow-2xl animate-float flex flex-col justify-between overflow-hidden">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-ivory/10 via-transparent to-ivory/30 pointer-events-none"></div>

            {/* Box Header */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[9px] tracking-widest uppercase font-semibold text-saffron bg-ivory/90 px-2.5 py-1 rounded-full border border-gold/15">
                Flagship Agarbatti
              </span>
              <span className="text-[10px] text-charcoal/50 font-serif italic">Est. 2015</span>
            </div>

            {/* Box Main Body (Representing Royal Dreams packaging) */}
            <div className="my-auto text-center space-y-6 relative z-10 flex flex-col items-center">
              {/* Premium Gold Emblem */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold via-saffron to-charcoal flex items-center justify-center shadow-lg border border-ivory/20 transform hover:scale-110 transition-transform duration-500">
                <span className="font-serif text-xl font-bold text-ivory tracking-tighter">NA</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl tracking-widest font-semibold text-charcoal uppercase leading-tight">
                  ROYAL DREAMS
                </h3>
                <div className="h-px w-24 bg-gold/30 mx-auto"></div>
                <p className="text-[10px] tracking-widest uppercase text-saffron font-semibold">
                  100 STICKS • PREMIUM QUALITY
                </p>
              </div>

              <p className="text-[11px] text-charcoal/60 leading-relaxed font-light px-4">
                "An elegant symphony of aged Mysore sandalwood, sweet golden honey, and delicate saffron absolute."
              </p>

              {/* Free Perfume Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-[9px] text-emerald font-semibold uppercase tracking-wider">
                Free Pocket Perfume Spray Inside
              </div>
            </div>

            {/* Box Footer Specs */}
            <div className="flex justify-between items-center text-[9px] text-charcoal/60 relative z-10 pt-4 border-t border-gold/10 font-medium">
              <span>BURNING TIME: 50 MINS</span>
              <span className="text-gold tracking-widest">★ ★ ★ ★ ★</span>
            </div>

            {/* Diagonal Light Gleam */}
            <div className="absolute -inset-y-12 -left-16 w-12 bg-white/20 transform rotate-12 blur-sm pointer-events-none transition-all duration-1000 group-hover:left-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-widest uppercase font-semibold text-charcoal/40">Scroll to Fragrance Journey</span>
        <div className="w-6 h-10 rounded-full border-2 border-charcoal/20 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-saffron animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
