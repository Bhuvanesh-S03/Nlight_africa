import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Nlight Africa | Luxury African Incense & Botanical Fragrance",
  description: "Discover Nlight Africa, a premium African incense and botanical fragrance brand crafting elegant incense rituals for modern homes.",
  keywords: "Nlight Africa, African incense, luxury incense, premium incense sticks, botanical fragrance, home fragrance, wellness fragrance, agarbatti Africa",
  alternates: {
    canonical: "https://theroyaldreams.com",
  },
  openGraph: {
    title: "Nlight Africa | Luxury African Incense & Botanical Fragrance",
    description: "A cinematic luxury incense campaign for African botanical fragrance, soft smoke rituals, and premium home scent.",
    url: "https://theroyaldreams.com",
    siteName: "Nlight Africa",
    type: "website",
    videos: [
      {
        url: "https://theroyaldreams.com/videos/Timeline%201.mov",
        type: "video/quicktime",
        width: 1920,
        height: 1080,
      },
    ],
  }
};

export default function Home() {
  const faqs = [
    {
      q: "Are The Royal Dreams incense products safe for daily home use?",
      a: "Yes. Our incense is crafted for everyday homes using plant wood powders, fragrance oils, and natural binding resins. Always burn in a ventilated space and keep away from children, pets, and curtains."
    },
    {
      q: "What makes the Powermax Mosquito series safer than chemical coils?",
      a: "Traditional insecticide coils release high amounts of chemical smoke. Powermax uses safe citronella extracts and wild eucalyptus. It protects against malaria vectors while emitting a pleasant lemongrass aroma."
    },
    {
      q: "Can I buy one pack or small quantities?",
      a: "Yes. This website is now shaped for individual customers and families. Message us on WhatsApp to ask what is available near you or to request delivery options."
    },
    {
      q: "How do I choose the right fragrance?",
      a: "Choose sandalwood or lavender for calm evenings, jasmine and musk for luxury, cup incense for prayer rituals, and Powermax when mosquito protection is the priority."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
