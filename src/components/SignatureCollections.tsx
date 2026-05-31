"use client";

import { MessageSquare, Heart, Sparkles, Compass } from "lucide-react";

interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  notes: string;
  description: string;
  poetry: string;
  bgHex: string;
  textAccent: string;
}

export default function SignatureCollections() {
  const collections: CollectionItem[] = [
    {
      id: "noor-al-janna",
      name: "Noor AL-Janna",
      tagline: "The Heavenly Golden Light",
      notes: "Cambodian Oud, Damask Rose & Royal Amber",
      description: "Meaning 'The Light of Heaven', Noor AL-Janna is an elite Arabian incense blend that marries deep, resinous Cambodian Oud essential oil with the velvet softness of organic Damask Rose petals and warm golden amber. It is designed to create a heavy, highly luxurious, and meditative sanctuary space.",
      poetry: "A whisper of starlight on gold, where divine oud unfolds.",
      bgHex: "bg-sandalwood/25",
      textAccent: "text-saffron"
    },
    {
      id: "royal-dreams",
      name: "Royal Dreams Deluxe",
      tagline: "Crafting Fragrance That Becomes Memory",
      notes: "Aged Mysore Sandalwood, Wild Honey & Saffron",
      description: "Our flagship agarbatti range. A majestic symphony of aged white sandalwood base, spiced Kashmiri saffron heart, and a sweet top note of wild forest honey. Packed in a premium gold-embossed sliding carton together with a complimentary pocket perfume spray.",
      poetry: "Sweet honey melting in sandalwood fire, a fragrance of cosmic desire.",
      bgHex: "bg-ivory",
      textAccent: "text-gold"
    },
    {
      id: "taj-mahal",
      name: "Taj Mahal Jasmine",
      tagline: "The Romance of Emperor Resins",
      notes: "Majestic Mogra Jasmine, Honeysuckle & White Musk",
      description: "Evoking the eternal architectural romance of the Taj Mahal, this blend captures the delicate floral breath of freshly blossomed mogra jasmine flowers floating on a base of warm, powdery white musk. A peaceful, soft, and highly elegant aroma suitable for living spaces.",
      poetry: "Jasmine petals catching a silent moonbeam, a delicate spiritual dream.",
      bgHex: "bg-sandalwood/25",
      textAccent: "text-saffron"
    }
  ];

  const handleWhatsAppInquire = (name: string) => {
    const number = "2348035221088";
    const text = encodeURIComponent(
      `Hello The Royal Dreams! I am deeply inspired by the story of your "${name}" Signature Collection. I would love to inquire about ordering this range.`
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-ivory relative" id="signature-collections">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
            <Compass size={11} className="animate-spin-slow" />
            Cinematic Aromatherapy
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Our <span className="italic text-saffron font-light">Signature Collections</span>
          </h2>
          <p className="text-xs text-charcoal/50 leading-relaxed font-light">
            Every blend tells an emotional story. Crafted in micro-batches with high-purity botanical extractions to transform any room into an ancient sanctuary.
          </p>
        </div>

        {/* Alternate Alternating Layouts */}
        <div className="space-y-24">
          {collections.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Packaging Story Container */}
                <div
                  className={`lg:col-span-5 p-8 rounded-[36px] ${item.bgHex} border border-gold/10 shadow-md relative min-h-[380px] flex flex-col justify-between overflow-hidden group ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-saffron/15 transition-all duration-500"></div>

                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-charcoal/40">
                    <span>Scent Chapter {idx + 1}</span>
                    <span className={`${item.textAccent}`}>★ Signature</span>
                  </div>

                  <div className="my-auto space-y-4 text-center py-8">
                    <span className="text-xs font-serif italic text-charcoal/60">
                      "{item.poetry}"
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-semibold tracking-wider text-charcoal uppercase">
                      {item.name}
                    </h3>
                    <p className="text-[10px] tracking-widest uppercase font-semibold text-saffron">
                      {item.notes}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-charcoal/50 font-bold uppercase tracking-widest pt-4 border-t border-gold/10">
                    <span>NATURAL RESIN EXTRACTION</span>
                    <span>45 MINS BURN</span>
                  </div>
                </div>

                {/* Text Story copywriting Block */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 text-xs text-saffron uppercase font-bold tracking-widest">
                    <Sparkles size={13} />
                    {item.tagline}
                  </div>
                  
                  <h4 className="font-serif text-3xl text-charcoal leading-snug">
                    A sensory journey crafted to raise the frequency of your home sanctuary.
                  </h4>
                  
                  <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    <button
                      onClick={() => handleWhatsAppInquire(item.name)}
                      className="px-6 py-3.5 rounded-full bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest shadow-md hover:bg-saffron transition-colors flex items-center gap-1.5"
                    >
                      Inquire on WhatsApp
                      <MessageSquare size={13} />
                    </button>
                    <div className="flex items-center gap-2 text-xs text-charcoal/50 font-light">
                      <Heart size={14} className="text-saffron animate-pulse" />
                      <span>Favored for deep spiritual purification</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
