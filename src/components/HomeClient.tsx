"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import LuxuryHero from "@/components/LuxuryHero";
import SafeImage from "@/components/SafeImage";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  subProducts: string[];
}

const categories: CategoryItem[] = [
  {
    id: 1,
    name: "100 Sticks Premium",
    slug: "royal-dreams-100-sticks",
    description: "Premium hand-rolled sandalwood sticks with a free pocket perfume spray for daily home fragrance.",
    image: "/images/royal_dreams_thumb.png",
    subProducts: ["Real Stole", "Sai Baba", "Sri Krishna", "Taj Mahal", "Pineapple"],
  },
  {
    id: 2,
    name: "Premium 10 Stick",
    slug: "royal-dreams-10-sticks",
    description: "Travel-ready pouches for quick prayer, meditation, and calm evening routines.",
    image: "/images/royal_dreams_thumb.png",
    subProducts: ["Dua", "Jannat"],
  },
  {
    id: 3,
    name: "Chain Pack",
    slug: "royal-dreams-chain-pack",
    description: "Family value packs for fragrance variety, gifting, and everyday freshness.",
    image: "/images/royal_dreams_thumb.png",
    subProducts: ["Royal Musk", "Royal Fruits", "Noor AL-Janna", "Noor AL-Aroma", "Royal Lavender", "Royal Rose"],
  },
  {
    id: 4,
    name: "Mosquito Repellent",
    slug: "mosquito-repellant",
    description: "Practical home mosquito protection with citronella-led fragrance and low-smoke wood powders.",
    image: "/images/mosquito_thumb.png",
    subProducts: ["Powermax Chain Pack", "Powermax Zip Lock", "Powermax Mosquito Cup"],
  },
  {
    id: 5,
    name: "Cup Incense",
    slug: "premium-cup-incense",
    description: "Charcoal cups packed with sambrani, loban, and guggul for prayer and cleansing rituals.",
    image: "/images/spiritual_thumb.png",
    subProducts: ["Holly Ure", "Makka Madina", "Peacock", "Radha Kisna", "Sai Baba", "St Michael"],
  },
  {
    id: 6,
    name: "Spiritual Products",
    slug: "spiritual-products",
    description: "Ritual fragrance, cleansing incense, and practical protection products for everyday use.",
    image: "/images/spiritual_thumb.png",
    subProducts: ["Chalk Products", "Spiritual Incense", "Puja Products"],
  },
];

const faqs = [
  {
    q: "Are The Royal Dreams incense products safe for daily home use?",
    a: "Yes. Our incense is crafted for everyday homes using plant wood powders, fragrance oils, and natural binding resins. Always burn in a ventilated space and keep away from children, pets, and curtains.",
  },
  {
    q: "What makes the Powermax Mosquito series different from regular coils?",
    a: "Powermax focuses on home comfort with citronella-led aromas and low-smoke wood powders. It is designed for practical household mosquito protection while keeping the room fragrance pleasant.",
  },
  {
    q: "Can I buy one pack or small quantities?",
    a: "Yes. This website is now shaped for individual customers and families. Message us on WhatsApp to ask what is available near you or to request delivery options.",
  },
  {
    q: "How do I choose the right fragrance?",
    a: "Choose sandalwood or lavender for calm evenings, jasmine and musk for luxury, cup incense for prayer rituals, and Powermax when mosquito protection is the priority.",
  },
];

export default function HomeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-ivory selection:bg-saffron/20 selection:text-saffron">
      <LuxuryHero />

      <section className="relative py-12 md:py-16 flex flex-col items-center overflow-hidden bg-[#dcd0b9]">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#dcd0b9] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10 md:gap-14 items-center w-full relative z-10">
          <div className="w-full space-y-4 text-left pt-4 md:pt-6" id="collections">
            <div className="pb-2 border-b border-sandalwood flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-end">
              <div>
                <span className="text-[9px] text-saffron uppercase font-bold tracking-widest">Shop by Need</span>
                <h2 className="text-2xl font-serif text-charcoal font-semibold mt-1">Choose Your Home Fragrance</h2>
              </div>
              <span className="text-xs text-charcoal/50 font-serif italic hidden md:block">Signature Selections</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="group block bg-warm-white p-4 md:p-5 border border-sandalwood hover:border-saffron/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 rounded-lg flex flex-col justify-between min-h-0"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-44 sm:h-48 rounded-md overflow-hidden border border-sandalwood/50 bg-sandalwood/10">
                      <SafeImage
                        src={cat.image}
                        alt={`${cat.name} product thumbnail`}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                        fallbackLabel={cat.name}
                      />
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-saffron transition-colors leading-tight uppercase tracking-wide">
                        {cat.name}
                      </h3>

                      <p className="text-[11px] text-charcoal/75 leading-snug font-normal min-h-[44px]">
                        {cat.description}
                      </p>

                      <div className="pt-2 border-t border-sandalwood/30">
                        <p className="text-[9px] text-charcoal/50 uppercase tracking-wider font-bold mb-2">
                          Available Collections:
                        </p>
                        <ul className="grid grid-cols-2 gap-1 text-[10px] text-charcoal">
                          {cat.subProducts.map((subItem) => (
                            <li key={subItem} className="flex items-start gap-1 min-w-0">
                              <span className="text-saffron mt-[1px] text-[8px]">+</span>
                              <span className="leading-tight break-words">{subItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-sandalwood/15 border-y border-sandalwood" id="testimonials">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-white border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                Customer Favorites
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal leading-none">
                Loved for <br />
                <span className="italic text-saffron font-light">Daily Rituals</span>
              </h2>
              <p className="text-sm text-charcoal/75 leading-relaxed font-normal max-w-2xl mx-auto">
                Customers choose The Royal Dreams for prayer, relaxation, room freshness, and reliable mosquito protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
              {[
                {
                  quote: "The Royal Dreams 100-stick pack makes our sitting room feel calm and special. The extra perfume is a lovely touch, and the scent lasts beautifully.",
                  author: "Amina Danladi",
                  role: "Home Customer",
                },
                {
                  quote: "The cup incense is perfect for prayer time, and Powermax helps in the evenings when mosquitoes are active. It feels practical and premium at the same time.",
                  author: "Clara Opara",
                  role: "Lagos Customer",
                },
              ].map((test) => (
                <div
                  key={test.author}
                  className="p-6 rounded-lg bg-warm-white border border-sandalwood space-y-4 shadow-sm h-full flex flex-col justify-between"
                >
                  <p className="text-sm text-charcoal/75 leading-relaxed font-normal italic">
                    "{test.quote}"
                  </p>
                  <div className="border-t border-sandalwood pt-4 flex flex-col sm:flex-row sm:justify-between gap-1 text-[10px] uppercase tracking-widest mt-4">
                    <span className="text-charcoal font-bold">{test.author}</span>
                    <span className="text-gold font-bold">{test.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-ivory" id="faq">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 md:space-y-16">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sandalwood/30 border border-gold/15 text-[11px] text-saffron tracking-wider uppercase font-semibold">
              <HelpCircle size={13} className="text-gold" />
              Frequently Answered Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal leading-none">
              Answers from Our <span className="italic text-saffron font-light">Fragrance Desk</span>
            </h2>
            <p className="text-base text-charcoal/75 max-w-lg mx-auto leading-relaxed font-normal">
              Quick answers for choosing, using, and ordering The Royal Dreams products.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-left">
            {faqs.map((f, idx) => (
              <div
                key={f.q}
                className="group rounded-lg bg-warm-white border border-sandalwood hover:border-saffron/40 hover:shadow-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 md:p-7 flex justify-between items-center gap-4 text-left cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <h3 className="text-lg md:text-2xl font-bold font-serif text-charcoal flex gap-3 items-start leading-snug">
                    <span className="text-saffron font-bold font-serif">Q.</span>
                    <span>{f.q}</span>
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sandalwood/50 flex items-center justify-center group-hover:bg-saffron/10 transition-colors">
                    <ChevronDown
                      size={18}
                      className={`text-saffron transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-sm md:text-base text-charcoal/75 leading-relaxed font-normal mx-5 md:mx-7 pb-6 md:pb-7 pl-8 border-t border-sandalwood/40 pt-4">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
