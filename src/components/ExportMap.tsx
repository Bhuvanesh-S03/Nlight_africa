"use client";

import React, { useState } from "react";
import { Globe, Plane, ShieldCheck, MailOpen, MessageSquareCode, Download } from "lucide-react";

export default function ExportMap() {
  const [b2cName, setb2cName] = useState("");
  const [b2cCompany, setb2cCompany] = useState("");
  const [b2cCountry, setb2cCountry] = useState("");

  const handleb2cInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = "2348035221088";
    const text = encodeURIComponent(
      `b2c consumer REQUEST:\nName: ${b2cName}\nCompany: ${b2cCompany}\nDestination: ${b2cCountry}\nHello The Royal Dreams! We are interested in importing your premium incense sticks and cup ranges. Please send us your complete detailed pricing catalog and minimum order guidelines.`
    );
    window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-ivory" id="consumer">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: b2c Credentials Story */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                <Globe size={11} className="animate-spin-slow" />
                Intercontinental b2c Operations
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-none">
                Global Trust & <br />
                <span className="italic text-saffron font-light">Seamless Maritime consumers</span>
              </h2>
              <p className="text-xs text-charcoal/50 leading-relaxed font-light">
                From our premium manufacturing facilities, we coordinate full container load (FCL) and less than container load (LCL) shipments to distributors across 15+ countries, maintaining absolute packaging uptime and zero moisture spoiling.
              </p>
            </div>

            {/* Packaging / Logistics Specs */}
            <div className="space-y-4">
              {[
                {
                  icon: <ShieldCheck size={16} className="text-emerald" />,
                  title: "Airtight Maritime Packing Standards",
                  desc: "Every pallet is shrink-wrapped with high-density polymer barrier shields and packed with heavy-duty desiccants to guarantee zero humidity leaks during shipping."
                },
                {
                  icon: <Plane size={16} className="text-saffron" />,
                  title: "Streamlined Customs Clearing",
                  desc: "We provide complete bill of lading, certificates of origin, NAFDAC clean sheets, and customs documents to speed up imports at any global port."
                }
              ].map((spec, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="p-2 rounded-full bg-sandalwood h-fit shrink-0">
                    {spec.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">{spec.title}</h4>
                    <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct consumer Catalog PDF Link */}
            <div className="pt-4">
              <a
                href="The Royal Dreams details/The Royal Dreams details/Main/Develop website.docx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-charcoal text-xs font-semibold uppercase tracking-widest hover:bg-sandalwood hover:border-saffron transition-all duration-300 cursor-pointer"
              >
                <Download size={13} />
                Download consumer Specifications
              </a>
            </div>
          </div>

          {/* Right Block: Elegant b2c Inquiry Form Card */}
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 rounded-[32px] bg-sandalwood/20 border border-gold/15 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none"></div>

              <div className="space-y-2 mb-6">
                <span className="inline-flex items-center gap-1.5 text-[9px] text-saffron uppercase font-bold tracking-widest">
                  <MailOpen size={11} />
                  Direct Procurement Request
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold uppercase">
                  Request b2c consumer Pricing
                </h3>
                <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                  Submit this inquiry to route your request directly to our consumers team. We will respond within 12 business hours.
                </p>
              </div>

              {/* Form Node */}
              <form onSubmit={handleb2cInquiry} className="space-y-4 font-sans">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={b2cName}
                    onChange={(e) => setb2cName(e.target.value)}
                    placeholder="e.g. Alhaji Musa"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal placeholder-charcoal/30 font-light"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={b2cCompany}
                    onChange={(e) => setb2cCompany(e.target.value)}
                    placeholder="e.g. West African Distributors Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal placeholder-charcoal/30 font-light"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    required
                    value={b2cCountry}
                    onChange={(e) => setb2cCountry(e.target.value)}
                    placeholder="e.g. Port of Tema, Ghana"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal placeholder-charcoal/30 font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-saffron transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <MessageSquareCode size={14} className="text-emerald" />
                  Initiate consumer Request
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
