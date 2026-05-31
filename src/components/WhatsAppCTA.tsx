"use client";

import { useEffect, useState } from "react";
import { MessageSquareCode } from "lucide-react";

export default function WhatsAppCTA() {
  const [phoneNumber, setPhoneNumber] = useState("+2348035221088");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic loading of phone number from CMS JSON database
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data?.companyInfo?.whatsappNumber) {
          setPhoneNumber(data.companyInfo.whatsappNumber);
        }
      })
      .catch((err) => console.error("Error fetching WhatsApp number from database:", err))
      .finally(() => setLoading(false));
  }, []);

  const cleanNumber = phoneNumber.replace(/[+\s-]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello The Royal Dreams! I am visiting your premium website and would love to consult with a fragrance expert about your incense sticks and spiritual collections."
  );
  
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group font-sans">
      {/* Decorative Outer Pulsing Ripple Rings */}
      <span className="absolute inset-0 rounded-none bg-emerald/20 animate-ping opacity-75 group-hover:scale-110 transition-transform duration-500"></span>
      <span className="absolute -inset-1.5 rounded-none border border-gold/25 animate-pulse-slow"></span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-none bg-ivory/90 backdrop-blur-xl border border-gold/30 shadow-[0_8px_32px_rgba(26,92,67,0.12)] hover:border-saffron hover:shadow-[0_12px_40px_rgba(217,138,83,0.25)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-charcoal group-hover:bg-[#1A5C43] group-hover:text-ivory"
        title="Talk to Fragrance Expert"
        aria-label="Talk to Fragrance Expert"
      >
        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald group-hover:bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald group-hover:bg-gold"></span>
        </span>
        
        <MessageSquareCode size={24} className="animate-pulse" />
      </a>
    </div>
  );
}
