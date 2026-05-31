"use client";

import { useEffect, useState } from "react";
import { MoveRight, Sparkles, MessageCircleCode, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  scentProfile: string;
  scentNotes: { top: string; middle: string; base: string };
  moods: string[];
  categoryId: string;
}

export default function FragranceMoodSelector() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedMood, setSelectedMood] = useState("Luxury");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const moods = ["Luxury", "Relaxation", "Prayer", "Meditation", "Freshness"];

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products for mood selector:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((p) =>
        p.moods.some((m) => m.toLowerCase() === selectedMood.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [selectedMood, products]);

  const handleWhatsAppProduct = (productName: string) => {
    const number = "2348035221088";
    const text = encodeURIComponent(
      `Hello The Royal Dreams! I am browsing your Fragrance Mood Selection list and would love to inquire about ordering "${productName}".`
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-ivory" id="collections">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
              <Sparkles size={11} />
              Aroma Mood Therapy
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-none">
              Shop by <span className="italic text-saffron font-light">Spiritual Mood</span>
            </h2>
            <p className="text-xs text-charcoal/50 max-w-md leading-relaxed font-light">
              Select your desired cognitive state or spiritual intention to discover which hand-rolled agarbatti and resin cups align with your atmosphere.
            </p>
          </div>

          {/* Mood Action Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  selectedMood === mood
                    ? "bg-charcoal text-ivory shadow-md"
                    : "bg-sandalwood/40 text-charcoal/60 hover:bg-sandalwood hover:text-charcoal border border-gold/5"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Product Grid */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-sandalwood/25 border border-gold/10 hover:border-saffron/40 hover:bg-sandalwood/45 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Visual Glass Glow Overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-saffron/10 transition-colors duration-500"></div>

                <div className="space-y-4">
                  {/* Category Pill */}
                  <div className="flex justify-between items-center text-[9px] font-semibold uppercase tracking-widest text-charcoal/40">
                    <span>{p.categoryId.replace("-", " ")}</span>
                    <span className="text-saffron italic">★ Scent Match</span>
                  </div>

                  {/* Scent Title */}
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-saffron transition-colors duration-300">
                    {p.name}
                  </h3>

                  {/* Scent notes visual badge list */}
                  <div className="py-2.5 border-y border-gold/10 space-y-1 text-[11px] text-charcoal/70">
                    <div className="flex justify-between">
                      <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Top Note:</span>
                      <span className="font-medium text-charcoal">{p.scentNotes.top}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Heart Note:</span>
                      <span className="font-medium text-saffron">{p.scentNotes.middle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Base Note:</span>
                      <span className="font-medium text-charcoal">{p.scentNotes.base}</span>
                    </div>
                  </div>

                  {/* Poetry Description */}
                  <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                {/* Card CTA actions */}
                <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-gold/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40">
                    {p.categoryId === "mosquito-repellent" ? "Natural Protection" : "Slow Burning Pack"}
                  </span>
                  
                  <button
                    onClick={() => handleWhatsAppProduct(p.name)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1A5C43] hover:text-saffron transition-colors cursor-pointer"
                  >
                    Inquire
                    <MessageCircleCode size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
