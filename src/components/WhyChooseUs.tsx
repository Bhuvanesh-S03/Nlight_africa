"use client";

import { Award, Trees, Landmark, Timer, Compass, ShieldAlert } from "lucide-react";

export default function WhyChooseUs() {
  const credentials = [
    {
      icon: <Award size={20} className="text-saffron" />,
      title: "100% Pure Botanical Oils",
      description: "We use high-purity natural essential oils and organic plant resin tears. We completely avoid toxic chemical binders and synthetic coal compounds."
    },
    {
      icon: <Trees size={20} className="text-emerald" />,
      title: "Eco-Conscious Hand-rolling",
      description: "Our incense sticks are hand-rolled in micro-batches under high-standard fair trade settings, promoting absolute ecological balance."
    },
    {
      icon: <Timer size={20} className="text-gold" />,
      title: "Slow-Lingering Aromatic Burn",
      description: "A single stick yields over 45 minutes of thick scent smoke, while our highly dense sambrani dhoop cups scent ventilated spaces for up to 24 hours."
    },
    {
      icon: <Landmark size={20} className="text-charcoal" />,
      title: "ISO 9001:2015 Manufacturing",
      description: "Strict quality control at our state-of-the-art facilities ensures that every consumer carton maintains pristine dryness and high fragrance retention."
    }
  ];

  return (
    <section className="py-24 bg-sandalwood/25 relative border-y border-gold/10" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text / Counter Section */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ivory border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                <Compass size={11} className="animate-spin-slow" />
                Enterprise Quality Credentials
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-none">
                Elegance & Trust In <br />
                <span className="italic text-saffron font-light">Every Single Stick</span>
              </h2>
              <p className="text-xs text-charcoal/50 leading-relaxed font-light">
                Since 2015, The Royal Dreams has delivered uncompromising spiritual fragrances to b2c distributors and fine wellness boutiques across the globe.
              </p>
            </div>

            {/* Micro Stats Counter Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gold/10">
              <div>
                <p className="text-4xl font-serif text-saffron font-bold">12</p>
                <p className="text-[9px] tracking-widest uppercase text-charcoal/40 font-semibold pt-1">Years Expert</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-gold font-bold">40+</p>
                <p className="text-[9px] tracking-widest uppercase text-charcoal/40 font-semibold pt-1">Product Lines</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-emerald font-bold">15+</p>
                <p className="text-[9px] tracking-widest uppercase text-charcoal/40 font-semibold pt-1">Global Ports</p>
              </div>
            </div>

            {/* NAFDAC / ISO Compliance Badge */}
            <div className="p-5 rounded-2xl bg-ivory border border-gold/20 flex items-start gap-3 shadow-sm">
              <ShieldAlert className="text-emerald shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">Regulatory Compliance</p>
                <p className="text-[10px] text-charcoal/50 leading-relaxed font-light">
                  Fully registered under Nigeria NAFDAC guidelines, ensuring all ingredients are safe and verified.
                </p>
              </div>
            </div>
          </div>

          {/* Right Credentials Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {credentials.map((cred, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-ivory border border-gold/10 hover:border-gold/30 hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-sandalwood/50 flex items-center justify-center">
                  {cred.icon}
                </div>
                <h3 className="font-serif text-lg text-charcoal font-semibold uppercase tracking-wide">
                  {cred.title}
                </h3>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
