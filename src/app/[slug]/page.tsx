import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, MessageCircleCode, ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { Metadata } from "next";

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  scentProfile: string;
  scentNotes: { top: string; middle: string; base: string };
  burningTime: string;
  features: string[];
  shippingDetails: string;
  moods: string[];
  pdfPath: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// Read database helper
async function getCMSData() {
  const filePath = path.join(process.cwd(), "src", "data", "cms-data.json");
  const rawData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(rawData);
}

// Map the 6 strict custom slugs to database selectors
function resolveSlug(slug: string) {
  const map: { [key: string]: { type: "product" | "category"; id: string } } = {
    "royal-dreams-100-sticks": { type: "product", id: "royal-dreams-100" },
    "royal-dreams-10-sticks": { type: "product", id: "royal-dreams-10" },
    "royal-dreams-chain-pack": { type: "product", id: "royal-musk-70" }, // maps to our flagship chain pack
    "mosquito-repellant": { type: "category", id: "mosquito-repellent" },
    "premium-cup-incense": { type: "category", id: "cup-incense" },
    "spiritual-products": { type: "category", id: "spiritual-products" }
  };
  return map[slug] || null;
}

// Dynamic metadata compiler for SEO bots
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolution = resolveSlug(slug);
  if (!resolution) return {};

  try {
    const data = await getCMSData();
    if (resolution.type === "product") {
      const product: Product = data.products.find((p: Product) => p.id === resolution.id);
      if (!product) return {};
      return {
        title: `${product.name} | Premium Incense The Royal Dreams`,
        description: product.description,
        alternates: { canonical: `https://theroyaldreams.com/${slug}` }
      };
    } else {
      const category: Category = data.categories.find((c: Category) => c.id === resolution.id);
      if (!category) return {};
      return {
        title: `${category.name} Range | Traditional Heritage The Royal Dreams`,
        description: category.description,
        alternates: { canonical: `https://theroyaldreams.com/${slug}` }
      };
    }
  } catch (error) {
    return {};
  }
}

// Pre-render all 6 target static routes at compile time
export async function generateStaticParams() {
  return [
    { slug: "royal-dreams-100-sticks" },
    { slug: "royal-dreams-10-sticks" },
    { slug: "royal-dreams-chain-pack" },
    { slug: "mosquito-repellant" },
    { slug: "premium-cup-incense" },
    { slug: "spiritual-products" }
  ];
}

export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolution = resolveSlug(slug);
  if (!resolution) {
    return notFound();
  }

  let data;
  try {
    data = await getCMSData();
  } catch (error) {
    return notFound();
  }

  // Pre-fill general conversion targets
  const cleanNumber = "2348035221088";

  // --- CASE 1: PRODUCT PAGE DISPLAY (Royal Dreams varieties) ---
  if (resolution.type === "product") {
    const product: Product = data.products.find((p: Product) => p.id === resolution.id);
    if (!product) return notFound();

    const whatsappText = encodeURIComponent(
      `Hello The Royal Dreams! I am browsing your product catalog and would love to ask about purchasing "${product.name}". Please send availability and price details.`
    );
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${whatsappText}`;
    const emailUrl = `mailto:hello@theroyaldreams.com?subject=${encodeURIComponent(`Customer inquiry: ${product.name}`)}`;

    // Product dynamic schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": "The Royal Dreams"
      },
      "category": "Incense Sticks",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "offerCount": "1",
        "price": "Call for Quote"
      }
    };

    return (
      <article className="min-h-screen bg-ivory pt-32 pb-24 relative overflow-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-saffron transition-colors pb-4 text-left mr-auto"
          >
            <ArrowLeft size={13} /> Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left side story */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                  <Sparkles size={11} /> Flagship Incense
                </span>
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight font-normal">
                  {product.name}
                </h1>
                <p className="text-xs text-charcoal/50 tracking-widest uppercase font-semibold">
                  Aroma Signature: {product.scentProfile}
                </p>
              </div>

              <div className="text-charcoal/80 text-xs md:text-sm leading-relaxed font-light space-y-6">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-saffron first-letter:float-left first-letter:mr-3 first-letter:font-bold">
                  {product.description}
                </p>
              </div>

              {/* Ingredients */}
              <div className="space-y-4 border-t border-sandalwood pt-8">
                <h3 className="font-serif text-lg text-charcoal font-semibold uppercase tracking-wider">Heritage & Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal/70 font-light">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-gold">+</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side specs table */}
            <div className="lg:col-span-5 space-y-8 text-left bg-sandalwood/20 border border-sandalwood p-5 sm:p-6 md:p-8 rounded-lg">
              <div className="space-y-4">
                <h3 className="font-serif text-sm text-charcoal tracking-widest font-semibold uppercase pb-2 border-b border-charcoal/5">
                  Fragrance Notes
                </h3>
                <table className="w-full text-xs text-charcoal/70 font-light">
                  <tbody>
                    <tr className="border-b border-charcoal/5 pb-2">
                      <td className="py-2.5 font-semibold text-charcoal/40 uppercase tracking-widest text-[9px]">Top Note</td>
                      <td className="py-2.5 text-right font-medium text-charcoal">{product.scentNotes.top}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5 pb-2">
                      <td className="py-2.5 font-semibold text-charcoal/40 uppercase tracking-widest text-[9px]">Heart Note</td>
                      <td className="py-2.5 text-right font-semibold text-saffron">{product.scentNotes.middle}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-charcoal/40 uppercase tracking-widest text-[9px]">Base Note</td>
                      <td className="py-2.5 text-right font-medium text-charcoal">{product.scentNotes.base}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 border-t border-charcoal/5 pt-6 text-xs text-charcoal/70 font-light">
                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal/40 uppercase tracking-widest text-[9px]">Burning Time:</span>
                  <span className="font-semibold text-saffron">{product.burningTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal/40 uppercase tracking-widest text-[9px]">Aroma Moods:</span>
                  <span>{product.moods.join(" / ")}</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-charcoal/5 pt-6 text-xs">
                <h3 className="font-serif text-sm text-charcoal tracking-widest font-semibold uppercase">Pack Details</h3>
                <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">{product.shippingDetails}</p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-none bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest hover:bg-saffron transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircleCode size={14} className="text-gold" />
                  WhatsApp Consultation
                </a>
                <a
                  href={emailUrl}
                  className="w-full py-4 rounded-none border border-charcoal text-charcoal text-[10px] font-semibold uppercase tracking-widest hover:bg-sandalwood transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={14} />
                  Email Customer Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // --- CASE 2: CATEGORY SHOWCASE DISPLAY (Mosquito, Cup, Spiritual ranges) ---
  const category = data.categories.find((c: Category) => c.id === resolution.id);
  if (!category) return notFound();

  const relatedProducts: Product[] = data.products.filter(
    (p: Product) => p.categoryId === resolution.id
  );

  const categoryWhatsappText = encodeURIComponent(
    `Hello The Royal Dreams! I am reviewing your "${category.name}" products and would love to ask about home delivery routes and prices.`
  );
  const categoryWhatsappUrl = `https://wa.me/${cleanNumber}?text=${categoryWhatsappText}`;

  return (
    <article className="min-h-screen bg-ivory pt-32 pb-24 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-saffron transition-colors pb-4 text-left mr-auto"
        >
          <ArrowLeft size={13} /> Back to Catalog
        </Link>

        {/* Category Header */}
        <div className="space-y-4 text-left border-b border-sandalwood pb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
            <Sparkles size={11} />
            Customer Product Range
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight font-normal">
            {category.name}
          </h1>
          <p className="text-xs text-charcoal/60 leading-relaxed font-light max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Spacious, minimal grid showcasing category items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              className="p-5 sm:p-6 rounded-lg bg-sandalwood/15 border border-sandalwood/60 flex flex-col justify-between min-h-[260px]"
            >
              <div className="space-y-4">
                <span className="text-[8px] uppercase tracking-widest font-semibold text-charcoal/40">
                  Profile: {p.scentProfile}
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-semibold uppercase leading-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                  {p.description}
                </p>
              </div>

              <div className="pt-6 border-t border-sandalwood mt-6 flex justify-between items-center text-xs">
                <span className="text-[9px] font-bold text-saffron uppercase tracking-widest">
                  Duration: {p.burningTime}
                </span>
                <a
                  href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                    `Hi The Royal Dreams! We are reviewing the "${category.name}" portal and want to inquire about purchasing "${p.name}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1A5C43] hover:text-saffron transition-colors"
                >
                  Inquire <MessageCircleCode size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-8 rounded-lg bg-sandalwood/20 border border-sandalwood text-left grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-8 mt-12">
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-lg text-charcoal font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-gold" />
              Standard Packaging & Safety Compliance
            </h4>
            <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
              All products are packed to protect fragrance and freshness. Repellents use low-smoke compressed bamboo powders to support safer, more comfortable home use.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={categoryWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-charcoal text-ivory text-[9px] font-semibold uppercase tracking-widest text-center hover:bg-saffron transition-colors"
            >
              WhatsApp Product Help
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}
