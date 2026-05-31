import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SmokeCursor from "@/components/SmokeCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: {
    default: "Nlight Africa | Luxury African Incense",
    template: "%s | Nlight Africa",
  },
  description: "Luxury African incense, botanical fragrance, and premium home scent rituals from Nlight Africa.",
  metadataBase: new URL("https://theroyaldreams.com"),
  applicationName: "Nlight Africa",
  authors: [{ name: "Nlight Africa" }],
  creator: "Nlight Africa",
  publisher: "Nlight Africa",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-ivory text-charcoal min-h-screen flex flex-col justify-between selection:bg-saffron/20 selection:text-saffron">
        <SmoothScrollProvider>
          {/* Custom Organic Smoke Cursor Canvas */}
          <SmokeCursor />

          {/* Floating Premium Top Navigation */}
          <Header />

          {/* Page Main Content Area */}
          <div className="flex-grow">
            {children}
          </div>

          {/* Conversational floating WhatsApp CTA */}
          <WhatsAppCTA />

          {/* Editorial Footer Grid */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
