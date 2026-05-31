"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Download, MoveUpRight, ShieldAlert } from "lucide-react";

interface PackagingItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  frontColor: string;
  borderColor: string;
  notes: string;
  pdfPath: string;
}

export default function PackagingShowcase() {
  const items: PackagingItem[] = [
    {
      id: "royal-dreams-box",
      name: "Royal Dreams Premium",
      category: "Deluxe 100-Sticks Box",
      subtitle: "Includes Free Pocket Perfume",
      description: "Our signature box featuring majestic gold embossing and moisture-barrier foil wrap that seals Mysore sandalwood essential oils for up to 3 years.",
      frontColor: "from-[#D98A53]/90 via-[#F5EFEB]/95 to-[#FCFAF6]/90",
      borderColor: "rgba(217, 138, 83, 0.4)",
      notes: "Top: Honey | Heart: Saffron | Base: Sandalwood",
      pdfPath: "The Royal Dreams details/The Royal Dreams details/Main/INCENCE 100 STICKES BOX TYPE/100 STICK - FINAL ARTWORKS - REAL STOLE.pdf"
    },
    {
      id: "makka-madina-cup",
      name: "Makka Madina Sacred Dhoop",
      category: "Dhoop Cup Incense",
      subtitle: "Pure Sambrani & Resins",
      description: "Compressed premium charcoal cup packed with original black stone musk and holy guggul tears. Provides intense spiritual air purification.",
      frontColor: "from-[#212121]/90 via-[#1A5C43]/20 to-[#FCFAF6]/90",
      borderColor: "rgba(26, 92, 67, 0.4)",
      notes: "Top: Amber | Heart: Guggul | Base: Black Musk",
      pdfPath: "The Royal Dreams details/The Royal Dreams details/Main/Premium Cup Incense/CUP_INCENSE_-_MAKKA_MADINA_FINAL[1].pdf"
    },
    {
      id: "powermax-ziplock",
      name: "Powermax Insect Shield",
      category: "Airtight Zip Lock Pouch",
      subtitle: "Citronella Mosquito Repellent",
      description: "Heavy-duty tropical mosquito repellent pouch. Reusable airtight slider seals citronella oils indefinitely in highly humid environments.",
      frontColor: "from-[#1A5C43]/90 via-[#E3DBE8]/40 to-[#FCFAF6]/90",
      borderColor: "rgba(26, 92, 67, 0.3)",
      notes: "Top: Spearmint | Heart: Citronella Oil | Base: Pine Wood",
      pdfPath: "The Royal Dreams details/The Royal Dreams details/Main/POWERMAX INSECTICIDE STICK MOSQUITO REPELLANT/ROYAL ZIPLOCK 105MM X 275MM - 500 kgs.pdf"
    }
  ];

  return (
    <section className="py-24 bg-sandalwood/25 relative overflow-hidden" id="packaging-showcase">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-saffron/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
            <Sparkles size={11} />
            Structural Packaging Renders
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal">
            Premium Packaging <span className="italic text-saffron font-light">Showcase</span>
          </h2>
          <p className="text-xs text-charcoal/50 max-w-lg mx-auto leading-relaxed font-light">
            Hover over the 3D cards below to tilt and inspect our world-class moisture-proof box, dhoop cup, and high-barrier zip-lock packaging layouts.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          {items.map((item) => (
            <TiltCard key={item.id} item={item} />
          ))}
        </div>

        {/* Quality b2c Alert Badge */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-ivory border border-gold/25 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-emerald/10 text-emerald">
              <ShieldAlert size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">b2c Trade & Packaging Audits</p>
              <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                All printing, corrugated carton densities, and barrier polymers are certified under ISO 9001:2015 and custom clearance standards.
              </p>
            </div>
          </div>
          <a
            href="The Royal Dreams details/The Royal Dreams details/Main/Develop website.docx"
            download
            className="px-6 py-3 rounded-full bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest hover:bg-saffron hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            Download Trade Docs
            <Download size={12} />
          </a>
        </div>

      </div>
    </section>
  );
}

/* Individual 3D Interactive Tilt Card Component */
function TiltCard({ item }: { item: PackagingItem }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Convert mouse pixels to tilt angles
    const degX = -(y / (box.height / 2)) * 15;
    const degY = (x / (box.width / 2)) * 15;

    setTilt({ x: degX, y: degY });
  };

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.03 : 1})`,
        transition: active ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: active
          ? "0 30px 60px rgba(33, 33, 33, 0.08)"
          : "0 10px 30px rgba(33, 33, 33, 0.02)"
      }}
      className="relative rounded-[32px] p-6 border border-gold/15 bg-ivory shadow-lg flex flex-col justify-between min-h-[460px] overflow-hidden group cursor-pointer"
    >
      {/* Dynamic Gold Shiny Foil Overlay */}
      <div
        style={{
          transform: "translateZ(30px)",
          opacity: active ? 0.35 : 0
        }}
        className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-ivory/50 mix-blend-overlay pointer-events-none transition-opacity duration-300"
      ></div>

      {/* Card Header */}
      <div className="flex justify-between items-center" style={{ transform: "translateZ(40px)" }}>
        <span className="text-[9px] tracking-widest uppercase font-semibold text-charcoal/50">
          {item.category}
        </span>
        <span className="text-[10px] text-saffron font-bold">★ Premium</span>
      </div>

      {/* Central 3D Box Simulation */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className={`my-6 w-full aspect-[4/5] rounded-2xl bg-gradient-to-br ${item.frontColor} border border-gold/10 flex flex-col justify-between p-5 relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]`}
      >
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-charcoal/5 border border-charcoal/10 flex items-center justify-center font-serif text-xs font-bold text-charcoal">
            NA
          </div>
          <span className="text-[8px] tracking-widest uppercase font-bold text-saffron bg-ivory px-2 py-0.5 rounded border border-gold/10">
            Certified
          </span>
        </div>

        <div className="text-center space-y-1.5 my-auto">
          <h3 className="font-serif text-xl tracking-wider text-charcoal font-semibold uppercase leading-tight">
            {item.name}
          </h3>
          <p className="text-[8px] tracking-widest uppercase text-charcoal/60 font-semibold">
            {item.subtitle}
          </p>
        </div>

        <div className="flex justify-between items-center text-[7px] text-charcoal/50 font-bold uppercase tracking-wider border-t border-charcoal/5 pt-3">
          <span>Standard: Approved</span>
          <span>Quality: Gold</span>
        </div>
      </div>

      {/* Copy / Action Description Block */}
      <div className="space-y-4" style={{ transform: "translateZ(40px)" }}>
        <p className="text-[11px] text-charcoal/70 leading-relaxed font-light">
          {item.description}
        </p>

        <p className="text-[10px] text-saffron font-semibold tracking-wider uppercase">
          {item.notes}
        </p>

        <div className="pt-4 border-t border-gold/10 flex justify-between items-center">
          <a
            href={item.pdfPath}
            download
            className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-charcoal/50 hover:text-saffron transition-colors"
          >
            <Download size={11} />
            Inspect PDF Artwork
          </a>
          <span className="p-1.5 rounded-full bg-sandalwood text-charcoal group-hover:bg-saffron group-hover:text-ivory transition-colors">
            <MoveUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}
