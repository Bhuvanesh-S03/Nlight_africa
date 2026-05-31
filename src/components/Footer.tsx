"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sandalwood/40 text-charcoal/80 pt-16 md:pt-20 pb-10 md:pb-12 border-t border-sandalwood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16 text-left">
        <div className="space-y-4">
          <Link href="/">
            <span className="font-serif text-2xl font-normal tracking-[0.12em] text-charcoal">
              THE ROYAL <span className="font-serif italic text-gold font-light">DREAMS</span>
            </span>
          </Link>
          <p className="text-[11px] leading-relaxed text-charcoal/60 max-w-xs font-light">
            A customer-first fragrance house for incense sticks, mosquito repellent dhoops, and natural sambrani cups that make everyday rooms feel calmer and more intentional.
          </p>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A5C43]/5 border border-[#1A5C43]/10 text-[9px] text-[#1A5C43] tracking-wider uppercase font-medium">
            <ShieldCheck size={10} />
            Quality Checked
          </span>
        </div>

        <div className="space-y-4 font-sans text-xs">
          <h4 className="font-serif text-sm text-charcoal tracking-widest font-semibold uppercase pb-1 border-b border-charcoal/5">
            Collections
          </h4>
          <ul className="space-y-2.5 text-[11px] text-charcoal/60 font-light">
            <li><Link href="/seo/premium-incense-sticks-nigeria" className="hover:text-saffron transition-colors">Premium Incense Sticks</Link></li>
            <li><Link href="/seo/mosquito-repellent-incense" className="hover:text-saffron transition-colors">Powermax Mosquito Repellent</Link></li>
            <li><Link href="/seo/premium-cup-incense" className="hover:text-saffron transition-colors">Spiritual Dhoop Cups</Link></li>
            <li><Link href="/seo/spiritual-products" className="hover:text-saffron transition-colors">Ritual & Puja Items</Link></li>
          </ul>
        </div>

        <div className="space-y-4 font-sans text-xs">
          <h4 className="font-serif text-sm text-charcoal tracking-widest font-semibold uppercase pb-1 border-b border-charcoal/5">
            Guides
          </h4>
          <ul className="space-y-2.5 text-[11px] text-charcoal/60 font-light">
            <li><Link href="/seo/luxury-agarbatti" className="hover:text-saffron transition-colors">Luxury Agarbatti Guide</Link></li>
            <li><Link href="/seo/home-fragrance-products" className="hover:text-saffron transition-colors">Home Fragrance Products</Link></li>
            <li><Link href="/seo/consumer-incense-supplier" className="hover:text-saffron transition-colors">Home Fragrance Guide</Link></li>
            <li><Link href="/admin" className="hover:text-gold font-medium transition-colors">CMS Access Dashboard</Link></li>
          </ul>
        </div>

        <div className="space-y-4 font-sans text-xs" id="contact">
          <h4 className="font-serif text-sm text-charcoal tracking-widest font-semibold uppercase pb-1 border-b border-charcoal/5">
            Contact Desk
          </h4>
          <div className="space-y-2 text-[11px] text-charcoal/60 font-light">
            <p className="font-medium text-charcoal">Customer Support:</p>
            <p>hello@theroyaldreams.com</p>
            <p>+234 803 522 1088</p>
            <p className="pt-2 font-medium text-charcoal">Lagos Office:</p>
            <p className="leading-relaxed">12 Commercial Ave, Yaba, Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-charcoal/40 font-light text-center md:text-left">
        <p>© {currentYear} The Royal Dreams. All Rights Reserved. Traditional Fragrance Excellence.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a href="#" className="hover:text-charcoal transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-charcoal transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-charcoal transition-colors">Quality Standard</a>
        </div>
      </div>
    </footer>
  );
}
