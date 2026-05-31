"use client";

import { useEffect, useState } from "react";
import { Database, Save, Plus, Trash2, KeyRound, Globe, Award, Sparkles, Building, Package, BookOpen } from "lucide-react";

interface CompanyInfo {
  name: string;
  headline: string;
  subheading: string;
  whatsappNumber: string;
  email: string;
  consumerEmail: string;
  address: string;
  established: string;
  countriesServed: string;
  productVarieties: string;
  yearsOfExpertise: string;
  certifications: string[];
}

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

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface SEOPage {
  title: string;
  description: string;
  header: string;
  keywords: string;
  content: string;
  faqs: { q: string; a: string }[];
}

interface CMSData {
  companyInfo: CompanyInfo;
  categories: any[];
  products: Product[];
  testimonials: Testimonial[];
  blogs: Blog[];
  seoLandingPages: { [key: string]: SEOPage };
}

export default function AdminDashboard() {
  // Security locks
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // CMS dynamic database states
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [activeTab, setActiveTab] = useState("company");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setCmsData(data))
      .catch((err) => console.error("Error fetching CMS database:", err));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "nlight2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Please enter the correct b2c key.");
    }
  };

  const handleSaveDatabase = async () => {
    if (!cmsData) return;
    setSaving(true);
    setSaveStatus("Saving changes...");
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cmsData)
      });
      const resData = await res.json();
      if (resData.success) {
        setSaveStatus("Database updated successfully! All pages are synchronized.");
        setTimeout(() => setSaveStatus(""), 4000);
      } else {
        setSaveStatus("Failed to update database: " + resData.error);
      }
    } catch (error: any) {
      setSaveStatus("Network error occurred: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Add Product Helper
  const handleAddProduct = () => {
    if (!cmsData) return;
    const newProduct: Product = {
      id: "product-" + Date.now(),
      categoryId: "incense-sticks",
      name: "New Incense Stick Aromas",
      slug: "new-incense-aromas-" + Date.now(),
      description: "Enter detailed emotional sensory product descriptions here.",
      scentProfile: "Aromatic sandalwood, sage",
      scentNotes: { top: "Honey", middle: "Rose", base: "Oud" },
      burningTime: "45 mins",
      features: ["Premium Handcrafted", "Natural Resins"],
      shippingDetails: "Carton of 48 boxes. consumer-ready.",
      moods: ["Luxury", "Meditation"],
      pdfPath: "The Royal Dreams details/The Royal Dreams details/Main/INCENCE 100 STICKES BOX TYPE/100 STICK - FINAL ARTWORKS - REAL STOLE.pdf"
    };

    setCmsData({
      ...cmsData,
      products: [...cmsData.products, newProduct]
    });
  };

  // Delete Product Helper
  const handleDeleteProduct = (id: string) => {
    if (!cmsData) return;
    const filtered = cmsData.products.filter((p) => p.id !== id);
    setCmsData({
      ...cmsData,
      products: filtered
    });
  };

  // Safe updates
  const updateCompanyField = (key: keyof CompanyInfo, value: any) => {
    if (!cmsData) return;
    setCmsData({
      ...cmsData,
      companyInfo: {
        ...cmsData.companyInfo,
        [key]: value
      }
    });
  };

  const updateProductField = (idx: number, key: keyof Product, value: any) => {
    if (!cmsData) return;
    const updatedProducts = [...cmsData.products];
    updatedProducts[idx] = {
      ...updatedProducts[idx],
      [key]: value
    };
    setCmsData({
      ...cmsData,
      products: updatedProducts
    });
  };

  const updateProductNotesField = (idx: number, key: string, value: string) => {
    if (!cmsData) return;
    const updatedProducts = [...cmsData.products];
    updatedProducts[idx] = {
      ...updatedProducts[idx],
      scentNotes: {
        ...updatedProducts[idx].scentNotes,
        [key]: value
      }
    };
    setCmsData({
      ...cmsData,
      products: updatedProducts
    });
  };

  // RENDER SECURITY SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-sandalwood/20 flex items-center justify-center pt-28 pb-16">
        <div className="max-w-md w-full mx-6 p-8 md:p-10 rounded-[32px] bg-ivory border border-gold/20 shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-gold/10 text-saffron flex items-center justify-center mx-auto">
              <KeyRound size={24} />
            </div>
            <h1 className="font-serif text-3xl text-charcoal font-semibold uppercase tracking-wide">
              ADMIN ACCESS
            </h1>
            <p className="text-xs text-charcoal/50 leading-relaxed font-light">
              Enter the corporate passcode to manage The Royal Dreams catalog, testimonials, and SEO pages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-sans">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. nlight2026)"
                className="w-full px-4 py-3.5 rounded-2xl bg-sandalwood/20 border border-gold/15 focus:border-saffron focus:outline-none text-center text-xs text-charcoal tracking-widest placeholder-charcoal/30 font-light"
              />
            </div>

            {authError && (
              <p className="text-[10px] text-red-500 font-semibold tracking-wider uppercase">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-saffron shadow-md transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
            >
              Verify Passcode
            </button>
          </form>

          <p className="text-[10px] text-charcoal/40 font-light pt-2">
            Tip: Passcode is <code className="bg-sandalwood px-1.5 py-0.5 rounded font-mono">nlight2026</code>
          </p>
        </div>
      </main>
    );
  }

  if (!cmsData) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-saffron"></div>
      </main>
    );
  }

  // MAIN CMS WORKSPACE RENDER
  return (
    <main className="min-h-screen bg-ivory pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Dashboard Title / Save Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gold/15 pb-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandalwood border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
              <Database size={11} />
              Enterprise Content Database
            </span>
            <h1 className="font-serif text-4xl text-charcoal font-normal">
              Visual CMS <span className="italic text-saffron font-light">Administration</span>
            </h1>
          </div>

          {/* Core Database Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {saveStatus && (
              <span className="text-[11px] text-emerald font-semibold uppercase tracking-wider bg-emerald/10 border border-emerald/20 px-4 py-2 rounded-full">
                {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveDatabase}
              disabled={saving}
              className="px-6 py-3.5 rounded-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-saffron transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save size={14} className="text-emerald" />
              {saving ? "Saving..." : "Save Database Changes"}
            </button>
          </div>
        </div>

        {/* Workspace Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tab navigation */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {[
              { id: "company", label: "Company Info", icon: <Building size={14} /> },
              { id: "products", label: "Product Catalog", icon: <Package size={14} /> },
              { id: "blogs", label: "Blogs Editor", icon: <BookOpen size={14} /> },
              { id: "seo", label: "SEO Metadata", icon: <Globe size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-charcoal text-ivory shadow-md"
                    : "bg-sandalwood/35 text-charcoal/60 hover:bg-sandalwood"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Editing Workspace Panel */}
          <div className="lg:col-span-9 bg-sandalwood/15 border border-gold/15 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* COMPANY INFO WORKSPACE */}
            {activeTab === "company" && (
              <div className="space-y-6">
                <div className="border-b border-gold/10 pb-4">
                  <h3 className="font-serif text-2xl text-charcoal font-semibold">Company General Info</h3>
                  <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                    Update phone, email, headlines and official certificates displayed in Header and Footer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">WhatsApp Contact Number</label>
                    <input
                      type="text"
                      value={cmsData.companyInfo.whatsappNumber}
                      onChange={(e) => updateCompanyField("whatsappNumber", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">Official Email ID</label>
                    <input
                      type="email"
                      value={cmsData.companyInfo.email}
                      onChange={(e) => updateCompanyField("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">consumer Inquiries Email</label>
                    <input
                      type="email"
                      value={cmsData.companyInfo.consumerEmail}
                      onChange={(e) => updateCompanyField("consumerEmail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">Company Headline</label>
                    <input
                      type="text"
                      value={cmsData.companyInfo.headline}
                      onChange={(e) => updateCompanyField("headline", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal font-light"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/50 font-bold mb-1.5">Corporate Address</label>
                    <textarea
                      rows={2}
                      value={cmsData.companyInfo.address}
                      onChange={(e) => updateCompanyField("address", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/15 focus:border-saffron focus:outline-none text-xs text-charcoal font-light"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCT CATALOG WORKSPACE */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="border-b border-gold/10 pb-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal font-semibold">Active Product Catalog</h3>
                    <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                      Add, modify or delete incense packages, mosquito repellents, and cup items.
                    </p>
                  </div>
                  <button
                    onClick={handleAddProduct}
                    className="px-4 py-2.5 rounded-full bg-[#1A5C43] text-ivory text-[10px] font-bold uppercase tracking-widest hover:bg-emerald transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} /> Add Item
                  </button>
                </div>

                {/* Editable catalog grid */}
                <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2">
                  {cmsData.products.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-2xl bg-ivory border border-gold/15 shadow-sm space-y-4 relative"
                    >
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Product Name</label>
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => updateProductField(idx, "name", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none focus:border-saffron text-xs text-charcoal"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Category</label>
                          <select
                            value={p.categoryId}
                            onChange={(e) => updateProductField(idx, "categoryId", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none focus:border-saffron text-xs text-charcoal font-medium"
                          >
                            <option value="incense-sticks">Incense Sticks</option>
                            <option value="mosquito-repellent">Mosquito Repellent</option>
                            <option value="cup-incense">Cup Incense</option>
                            <option value="spiritual-products">Spiritual Products</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Scent Profile</label>
                          <input
                            type="text"
                            value={p.scentProfile}
                            onChange={(e) => updateProductField(idx, "scentProfile", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none focus:border-saffron text-xs text-charcoal"
                          />
                        </div>

                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Top Note</label>
                          <input
                            type="text"
                            value={p.scentNotes.top}
                            onChange={(e) => updateProductNotesField(idx, "top", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Heart Note</label>
                          <input
                            type="text"
                            value={p.scentNotes.middle}
                            onChange={(e) => updateProductNotesField(idx, "middle", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Base Note</label>
                          <input
                            type="text"
                            value={p.scentNotes.base}
                            onChange={(e) => updateProductNotesField(idx, "base", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={p.description}
                            onChange={(e) => updateProductField(idx, "description", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none text-xs text-charcoal"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS WORKSPACE */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="border-b border-gold/10 pb-4">
                  <h3 className="font-serif text-2xl text-charcoal font-semibold">Blogs Editor</h3>
                  <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                    Manage active journals, dates, and read times.
                  </p>
                </div>

                <div className="space-y-6 max-h-[500px] overflow-y-auto">
                  {cmsData.blogs.map((blog, idx) => (
                    <div key={blog.id} className="p-5 rounded-2xl bg-ivory border border-gold/15 space-y-4">
                      <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Blog Title</label>
                          <input
                            type="text"
                            value={blog.title}
                            onChange={(e) => {
                              const updated = [...cmsData.blogs];
                              updated[idx].title = e.target.value;
                              setCmsData({ ...cmsData, blogs: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Author Name</label>
                          <input
                            type="text"
                            value={blog.author}
                            onChange={(e) => {
                              const updated = [...cmsData.blogs];
                              updated[idx].author = e.target.value;
                              setCmsData({ ...cmsData, blogs: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Summary Outline</label>
                          <input
                            type="text"
                            value={blog.summary}
                            onChange={(e) => {
                              const updated = [...cmsData.blogs];
                              updated[idx].summary = e.target.value;
                              setCmsData({ ...cmsData, blogs: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEO WORKSPACE */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="border-b border-gold/10 pb-4">
                  <h3 className="font-serif text-2xl text-charcoal font-semibold">SEO Landing Page Keywords</h3>
                  <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                    Fine-tune search titles, meta descriptions, headings, and keywords to maintain perfect 100% crawl scores.
                  </p>
                </div>

                <div className="space-y-6 max-h-[500px] overflow-y-auto">
                  {Object.keys(cmsData.seoLandingPages).map((key) => {
                    const page = cmsData.seoLandingPages[key];
                    return (
                      <div key={key} className="p-5 rounded-2xl bg-ivory border border-gold/15 space-y-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-saffron/10 border border-saffron/20 text-[9px] text-saffron uppercase font-bold tracking-widest">
                          Path: /seo/{key}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Search Title (Title Tag)</label>
                            <input
                              type="text"
                              value={page.title}
                              onChange={(e) => {
                                const updated = { ...cmsData.seoLandingPages };
                                updated[key].title = e.target.value;
                                setCmsData({ ...cmsData, seoLandingPages: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Keywords String</label>
                            <input
                              type="text"
                              value={page.keywords}
                              onChange={(e) => {
                                const updated = { ...cmsData.seoLandingPages };
                                updated[key].keywords = e.target.value;
                                setCmsData({ ...cmsData, seoLandingPages: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[8px] uppercase tracking-wider text-charcoal/40 font-bold mb-1">Meta Description Tag</label>
                            <textarea
                              rows={2}
                              value={page.description}
                              onChange={(e) => {
                                const updated = { ...cmsData.seoLandingPages };
                                updated[key].description = e.target.value;
                                setCmsData({ ...cmsData, seoLandingPages: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-sandalwood/10 border border-gold/10 focus:outline-none text-xs text-charcoal"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
