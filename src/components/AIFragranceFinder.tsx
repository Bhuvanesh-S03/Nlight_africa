"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, RotateCcw, MessageSquareCode, Check } from "lucide-react";

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

export default function AIFragranceFinder() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [setting, setSetting] = useState("");
  const [profile, setProfile] = useState("");
  const [result, setResult] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products for quiz:", err));
  }, []);

  const resetQuiz = () => {
    setStep(1);
    setMood("");
    setSetting("");
    setProfile("");
    setResult(null);
  };

  const handleCalculateResult = () => {
    if (products.length === 0) return;

    // Simple matching algorithm
    let matched = products.find((p) => {
      // Primary search: see if the product matches the selected mood (case insensitive)
      return p.moods.some((m) => m.toLowerCase() === mood.toLowerCase());
    });

    // Fallbacks if no direct match found
    if (!matched) {
      if (profile === "wood") {
        matched = products.find((p) => p.id.includes("royal-dreams") || p.id.includes("sandal"));
      } else if (profile === "resin") {
        matched = products.find((p) => p.id.includes("makka") || p.id.includes("holy") || p.id.includes("sai"));
      } else if (profile === "citrus") {
        matched = products.find((p) => p.categoryId === "mosquito-repellent");
      } else {
        matched = products.find((p) => p.id.includes("rose") || p.id.includes("taj"));
      }
    }

    // Ultimate fallback if still null
    if (!matched) {
      matched = products[0];
    }

    setResult(matched);
    setStep(4);
  };

  const handleWhatsAppInquiry = () => {
    if (!result) return;
    const number = "2348035221088";
    const text = encodeURIComponent(
      `Hi The Royal Dreams! I just took your website's AI Fragrance Quiz and matched with "${result.name}". I am interested in placing an order or learning more about it!`
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-sandalwood/30 relative overflow-hidden" id="fragrance-finder">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
            <Sparkles size={11} className="animate-pulse" />
            Olfactory Consultant
          </div>
          <h2 className="text-4xl font-serif text-charcoal">Find Your Perfect Aroma</h2>
          <p className="text-xs text-charcoal/60 max-w-md mx-auto leading-relaxed font-light">
            Take our interactive 3-step quiz to align your spiritual mood and sanctuary preferences with the ideal sensory incense formulation.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-ivory border border-gold/15 rounded-3xl p-8 md:p-12 shadow-xl min-h-[360px] flex flex-col justify-between transition-all duration-500">
          
          {/* STEP 1: SELECT MOOD */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase pb-2 border-b border-charcoal/5">
                <span>Step 1 of 3</span>
                <span>Select Desired Atmosphere</span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal text-center py-2">
                What atmosphere do you want to cultivate?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "luxury", label: "Royal Luxury & Majesty", desc: "Aged sandalwood and velvet roses" },
                  { id: "relaxation", label: "Deep Calm & Relaxation", desc: "Soothing lavender and sweet saffron" },
                  { id: "prayer", label: "Sacred Spiritual Prayer", desc: "Pure loban resins and black stone musk" },
                  { id: "freshness", label: "Fresh Energy & Protection", desc: "Eucalyptus, citrus and citronella grass" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMood(item.id);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      mood === item.id
                        ? "border-saffron bg-sandalwood/35 shadow-sm"
                        : "border-gold/15 hover:border-gold/30 hover:bg-sandalwood/10"
                    }`}
                  >
                    <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="text-xs text-charcoal/50 pt-1 font-light">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SETTING */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase pb-2 border-b border-charcoal/5">
                <span>Step 2 of 3</span>
                <span>Select Sanctuary Setting</span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal text-center py-2">
                Where will you burn this fragrance?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "living", label: "Living Room / Sanctuary", desc: "To welcome guests with luxury aromatic projection" },
                  { id: "shrine", label: "Quiet Temple / Prayer Room", desc: "To raise cosmic focus and clear negativity" },
                  { id: "office", label: "Home Office / Creative Studio", desc: "To boost focus, clarity, and prosperity flow" },
                  { id: "outdoor", label: "Outdoor Patio / Garden", desc: "To create a fresh protective insect-free shield" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSetting(item.id);
                      setStep(3);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      setting === item.id
                        ? "border-saffron bg-sandalwood/35 shadow-sm"
                        : "border-gold/15 hover:border-gold/30 hover:bg-sandalwood/10"
                    }`}
                  >
                    <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="text-xs text-charcoal/50 pt-1 font-light">{item.desc}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-[10px] text-charcoal/40 hover:text-saffron font-bold uppercase tracking-wider transition-colors pt-2"
              >
                <RotateCcw size={10} /> Back
              </button>
            </div>
          )}

          {/* STEP 3: SELECT SCENT PROFILE */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase pb-2 border-b border-charcoal/5">
                <span>Step 3 of 3</span>
                <span>Select Olfactory Profile</span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal text-center py-2">
                Choose your primary scent profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "wood", label: "Rich Woody Woods", desc: "Aged sandalwood and white cedar" },
                  { id: "floral", label: "Velvety Floral Blooms", desc: "Velvet roses and majestic jasmine mogra" },
                  { id: "resin", label: "Deep Sacred Resins", desc: "Frankincense, raw loban, and sambrani dhoop" },
                  { id: "citrus", label: "Fresh Zesty Citronella", desc: "Lemongrass, spearmint, and citronella leaves" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setProfile(item.id);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      profile === item.id
                        ? "border-saffron bg-sandalwood/35 shadow-sm"
                        : "border-gold/15 hover:border-gold/30 hover:bg-sandalwood/10"
                    }`}
                  >
                    <p className="text-sm font-semibold text-charcoal flex items-center justify-between">
                      {item.label}
                      {profile === item.id && <Check size={14} className="text-saffron" />}
                    </p>
                    <p className="text-xs text-charcoal/50 pt-1 font-light">{item.desc}</p>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-[10px] text-charcoal/40 hover:text-saffron font-bold uppercase tracking-wider transition-colors"
                >
                  <RotateCcw size={10} /> Back
                </button>
                <button
                  onClick={handleCalculateResult}
                  disabled={!profile}
                  className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                    profile
                      ? "bg-charcoal text-ivory hover:bg-saffron shadow-md"
                      : "bg-charcoal/10 text-charcoal/30 cursor-not-allowed"
                  }`}
                >
                  Reveal Match
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVEAL RESULTS */}
          {step === 4 && result && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="flex justify-between items-center text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase pb-2 border-b border-charcoal/5">
                <span>Consultation Complete</span>
                <span>Your Ideal Scent Match</span>
              </div>
              
              <div className="py-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-[10px] text-saffron font-bold uppercase tracking-wider mx-auto">
                  ★ Perfect Match
                </div>
                <h3 className="font-serif text-3xl text-charcoal font-semibold">{result.name}</h3>
                <p className="text-xs text-saffron uppercase tracking-widest font-semibold">
                  Scent notes: {result.scentProfile}
                </p>
                <div className="h-px w-24 bg-gold/25 mx-auto my-3"></div>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light max-w-lg mx-auto">
                  "{result.description}"
                </p>
              </div>

              {/* Action grid */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1A5C43] text-ivory text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-emerald transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquareCode size={15} />
                  Inquire on WhatsApp
                </button>
                <a
                  href={`#collections`}
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-gold/30 text-charcoal text-xs font-semibold uppercase tracking-widest hover:bg-sandalwood transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw size={13} /> Retake Quiz
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
