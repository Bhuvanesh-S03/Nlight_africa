"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, MessageSquareCode } from "lucide-react";

interface ProductNav {
  id: string;
  name: string;
  subtitle: string;
  subItems: { label: string; slug: string }[];
}

export default function ProductNavigator() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const navigation: ProductNav[] = [
    {
      id: "royal-dreams",
      name: "Royal Dreams",
      subtitle: "Aged Sandalwood, Honey & Saffron Gold",
      subItems: [
        { label: "Premium 100-Sticks Box", slug: "royal-dreams-premium-100" },
        { label: "Classic 10-Sticks Pouch", slug: "royal-dreams-classic-10" },
        { label: "Fragrance Chain Pack", slug: "royal-dreams-classic-10" }
      ]
    },
    {
      id: "noor-al-janna",
      name: "Noor Al-Janna",
      subtitle: "Exotic Cambodian Oud & Damask Rose",
      subItems: [
        { label: "Premium 20-Sticks Pack", slug: "noor-al-janna-20" },
        { label: "Herbal Myrrh Edition", slug: "noor-al-aroma-20" }
      ]
    },
    {
      id: "royal-lavender",
      name: "Royal Lavender",
      subtitle: "French Lavender Blossoms & Soft Cedarwood",
      subItems: [
        { label: "Soothing 20-Sticks Pack", slug: "royal-lavender-20" },
        { label: "Velvet Rose Companion", slug: "royal-rose-20" }
      ]
    },
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      subtitle: "Majestic Mogra Jasmine & Velvet Musk",
      subItems: [
        { label: "Deluxe Jasmine 100 Sticks", slug: "taj-mahal-royal" },
        { label: "Earthy Vetiver Edition", slug: "real-stole-luxury" }
      ]
    },
    {
      id: "powermax",
      name: "Powermax Repellent",
      subtitle: "Natural Citronella & Wellness Insecticide",
      subItems: [
        { label: "Citronella Chain Pack", slug: "powermax-chain-pack" },
        { label: "Slider Zip-Lock Pouch", slug: "powermax-zip-lock" },
        { label: "Concentrated Repellent Cup", slug: "powermax-repellent-cup" }
      ]
    },
    {
      id: "peacock",
      name: "Peacock Cups",
      subtitle: "Traditional Loban &sambrani Resin Cups",
      subItems: [
        { label: "Holly Ure Benzoin Cup", slug: "holly-ure-cup" },
        { label: "Makka Madina Sacred Cup", slug: "makka-madina-cup" },
        { label: "Peacock Sambrani Cup", slug: "peacock-royal-cup" },
        { label: "Radha Krishna Sandal Cup", slug: "radha-krishna-cup" }
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleWhatsAppConsult = () => {
    const cleanNum = "2348035221088";
    const text = encodeURIComponent(
      "Hello The Royal Dreams! We are browsing your traditional minimal catalog and would love to consult with a fragrance expert about Direct ordering."
    );
    window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-12">
      {/* Brand Intro Lockup */}
      <div className="space-y-4 pb-8 border-b border-sandalwood text-left">
        <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-gold">
          <Sparkles size={11} />
          Traditional Fragrance House
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight">
          Sensory <span className="italic text-saffron font-light">Sanctuary</span>
        </h2>
        <p className="text-[11px] text-charcoal/60 leading-relaxed font-light max-w-md">
          A minimalist catalog presenting six main sensory collections. Click a collection to expand its dynamic variant specifications and enter the product portal.
        </p>
      </div>

      {/* Main Accordion List */}
      <div className="space-y-6 text-left">
        {navigation.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="border-b border-sandalwood/60 pb-5 space-y-2">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full flex items-center justify-between group focus:outline-none"
              >
                <div className="space-y-1 text-left">
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-saffron transition-colors duration-300 font-light flex items-center gap-2">
                    <span className="link-underline">{item.name}</span>
                  </h3>
                  <p className="text-[10px] tracking-wide uppercase text-charcoal/40 font-semibold">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-charcoal/30 group-hover:text-saffron transition-transform duration-500 ${
                    isExpanded ? "transform rotate-180 text-saffron" : ""
                  }`}
                />
              </button>

              {/* Smooth Framer Motion Expansion */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pl-4 pt-2 space-y-2.5"
                  >
                    {item.subItems.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={`/product/${sub.slug}`}
                        className="block text-xs text-charcoal/60 hover:text-saffron font-light transition-colors flex items-center gap-1.5"
                      >
                        <span className="text-gold font-serif">○</span>
                        <span className="link-underline">{sub.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Trust & WhatsApp Conversion Button */}
      <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-left">
        <button
          onClick={handleWhatsAppConsult}
          className="px-8 py-3.5 rounded-none bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest hover:bg-saffron transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageSquareCode size={14} className="text-gold" />
          Talk to Fragrance Expert
        </button>
        <span className="text-[10px] text-charcoal/40 tracking-wider uppercase font-semibold text-center sm:text-left pt-1 sm:pt-0">
          ★ Certified ISO 9001 consumerer
        </span>
      </div>
    </div>
  );
}
