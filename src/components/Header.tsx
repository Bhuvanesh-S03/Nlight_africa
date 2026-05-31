"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-ivory/95 backdrop-blur-sm border-b border-sandalwood shadow-[0_2px_10px_rgba(42,42,42,0.01)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Typography Logo */}
        <Link href="/" className="group min-w-0">
          <span className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.08em] sm:tracking-[0.15em] whitespace-nowrap text-charcoal`}>
            ROYAL <span className="font-serif italic text-gold font-light">DREAMS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link
            href="/"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium animate-fade-in-slow text-charcoal/80 hover:text-charcoal`}
          >
            Home
          </Link>
          <a
            href="#collections"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium text-charcoal/80 hover:text-charcoal`}
          >
            Collections
          </a>
          <a
            href="#testimonials"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium text-charcoal/80 hover:text-charcoal`}
          >
            Stories
          </a>
          <a
            href="#faq"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium text-charcoal/80 hover:text-charcoal`}
          >
            FAQ
          </a>
          <a
            href="#testimonials"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium text-charcoal/80 hover:text-charcoal`}
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className={`text-[10px] uppercase tracking-[0.2em] transition-colors link-underline font-medium text-charcoal/80 hover:text-charcoal`}
          >
            Contact
          </a>
          <Link
            href="/admin"
            className="text-[10px] uppercase tracking-[0.2em] text-gold hover:text-saffron transition-colors link-underline font-semibold"
          >
            CMS
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden hover:text-saffron focus:outline-none transition-colors text-charcoal`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ivory border-b border-sandalwood shadow-lg animate-fade-in-slow">
          <nav className="flex flex-col gap-5 p-8 bg-ivory text-left font-sans">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              Home
            </Link>
            <a
              href="#collections"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              Collections
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              Stories
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              FAQ
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/5 pb-2"
            >
              Contact
            </a>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-gold pb-2"
            >
              CMS Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
