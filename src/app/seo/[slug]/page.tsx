import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, MessageCircleCode, ArrowLeft, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

interface SEOPageData {
  title: string;
  description: string;
  header: string;
  keywords: string;
  content: string;
  faqs: { q: string; a: string }[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  scentProfile: string;
  scentNotes: { top: string; middle: string; base: string };
  moods: string[];
  categoryId: string;
  burningTime: string;
}

// Read database helper
async function getCMSData() {
  const filePath = path.join(process.cwd(), "src", "data", "cms-data.json");
  const rawData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(rawData);
}

// Generate dynamic metadata for search bots
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await getCMSData();
    const page: SEOPageData = data.seoLandingPages[slug];
    
    if (!page) return {};
    
    return {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      alternates: {
        canonical: `https://theroyaldreams.com/seo/${slug}`,
      },
      openGraph: {
        title: page.title,
        description: page.description,
        url: `https://theroyaldreams.com/seo/${slug}`,
        type: "website",
      }
    };
  } catch (error) {
    return {};
  }
}

// Pre-render static paths for extreme speed and perfect SEO
export async function generateStaticParams() {
  try {
    const data = await getCMSData();
    return Object.keys(data.seoLandingPages).map((slug) => ({ slug }));
  } catch (error) {
    return [];
  }
}

export default async function SEOLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let data;
  try {
    data = await getCMSData();
  } catch (error) {
    return notFound();
  }

  const page: SEOPageData = data.seoLandingPages[slug];
  if (!page) {
    return notFound();
  }

  // Determine what category this keyword targets to show related items
  let filterCategory = "";
  if (slug.includes("mosquito") || slug.includes("repellent")) {
    filterCategory = "mosquito-repellent";
  } else if (slug.includes("cup")) {
    filterCategory = "cup-incense";
  } else if (slug.includes("spiritual") || slug.includes("puja")) {
    filterCategory = "spiritual-products";
  } else {
    filterCategory = "incense-sticks";
  }

  const relatedProducts: Product[] = data.products.filter(
    (p: Product) => p.categoryId === filterCategory
  );

  // Generate Google Structured JSON-LD Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <article className="min-h-screen bg-ivory pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic SEO structured JSON-LD schema injected into search bot parsing space */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-saffron transition-colors pb-4"
        >
          <ArrowLeft size={13} /> Back to Aroma Journey
        </Link>

        {/* Dynamic Editorial Headline Banner */}
        <div className="space-y-6 text-left border-b border-gold/15 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
            <Sparkles size={11} />
            Customer Guide
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal leading-tight font-normal">
            {page.header}
          </h1>

          <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-charcoal/40 uppercase font-bold tracking-widest">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald" /> NAFDAC Compliant
            </span>
            <span>|</span>
            <span>ISO 9001:2015 Standards</span>
          </div>
        </div>

        {/* Primary SEO semantic text blocks */}
        <div className="prose prose-neutral max-w-none text-charcoal/80 text-xs md:text-sm leading-relaxed font-light space-y-6 text-left">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-saffron first-letter:float-left first-letter:mr-3 first-letter:font-bold">
            {page.content}
          </p>
        </div>

        {/* Category specific dynamic product showcase block */}
        <div className="space-y-6 pt-8">
          <h2 className="font-serif text-2xl text-charcoal text-left">Featured Related Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-lg bg-sandalwood/25 border border-gold/10 hover:border-saffron/40 hover:bg-sandalwood/45 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3 text-left">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-charcoal/40">
                    Scent Profile: {p.scentProfile}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal font-semibold">{p.name}</h3>
                  <p className="text-xs text-charcoal/60 leading-relaxed font-light">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-gold/15 mt-4 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-saffron uppercase tracking-widest">
                    {p.burningTime}
                  </span>
                  <a
                    href={`https://wa.me/2348035221088?text=${encodeURIComponent(
                      `Hi The Royal Dreams! I was reading your SEO Landing Page and would love to inquire about purchasing "${p.name}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#1A5C43] hover:text-saffron transition-colors"
                  >
                    Inquire <MessageCircleCode size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic semantic FAQ accordion */}
        <div className="space-y-6 pt-12 border-t border-gold/10 text-left">
          <h2 className="font-serif text-3xl text-charcoal">Expert Questions & Answers</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="rounded-lg bg-sandalwood/15 border border-gold/10 group"
              >
                <summary className="p-5 cursor-pointer list-none text-sm font-semibold text-charcoal flex justify-between gap-4">
                  <span><span className="text-saffron">Q.</span> {faq.q}</span>
                  <span className="text-saffron group-open:rotate-180 transition-transform">v</span>
                </summary>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light px-5 pb-5 pl-8 border-t border-gold/10 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
