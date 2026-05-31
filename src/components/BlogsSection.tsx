"use client";

import { useEffect, useState } from "react";
import { MessageSquare, BookOpen, Quote, Sparkles, Star } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data?.blogs) setBlogs(data.blogs);
        if (data?.testimonials) setTestimonials(data.testimonials);
      })
      .catch((err) => console.error("Error fetching blogs/testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-sandalwood/25 relative border-t border-gold/10" id="blogs">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Block: Dynamic Blogs */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                <BookOpen size={11} />
                Fragrance Editorial Letters
              </span>
              <h2 className="text-4xl font-serif text-charcoal leading-none">
                Smudging Science & <br />
                <span className="italic text-saffron font-light">Aromatherapy Insights</span>
              </h2>
              <p className="text-xs text-charcoal/50 leading-relaxed font-light">
                Expand your aromatic expertise. Explore our detailed journals discussing the history of loban, olfactory science, and wellness habits.
              </p>
            </div>

            {/* Blogs List */}
            {loading ? (
              <div className="animate-pulse h-40 bg-ivory rounded-2xl"></div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 rounded-2xl bg-ivory border border-gold/10 hover:border-saffron/40 hover:shadow-md transition-all duration-300 space-y-3 text-left group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-saffron transition-colors duration-300 leading-snug">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                      {blog.summary}
                    </p>

                    <div className="pt-2 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-charcoal/40 border-t border-gold/5">
                      <span>Written by: {blog.author}</span>
                      <span className="text-saffron group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-0.5">
                        Read Story →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Testimonials & Reviews */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory border border-gold/15 text-[10px] text-saffron tracking-wider uppercase font-semibold">
                <Quote size={11} className="text-gold" />
                Verified Corporate Reviews
              </span>
              <h2 className="text-4xl font-serif text-charcoal leading-none">
                Distributor & <br />
                <span className="italic text-saffron font-light">Partner Trust</span>
              </h2>
              <p className="text-xs text-charcoal/50 leading-relaxed font-light">
                See why leading traders, spiritual centers, and bulk distributors rank The Royal Dreams as their #1 premium supplier.
              </p>
            </div>

            {/* Testimonials List */}
            {loading ? (
              <div className="animate-pulse h-40 bg-ivory rounded-2xl"></div>
            ) : (
              <div className="space-y-6">
                {testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 rounded-2xl bg-ivory border border-gold/15 shadow-sm space-y-4 relative overflow-hidden"
                  >
                    <Quote className="absolute top-4 right-4 text-gold/10" size={48} />
                    
                    {/* Star Rating */}
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-xs text-charcoal/70 leading-relaxed font-light italic text-left">
                      "{test.content}"
                    </p>

                    <div className="border-t border-gold/10 pt-3 text-left">
                      <p className="text-xs font-semibold text-charcoal">{test.name}</p>
                      <p className="text-[10px] text-saffron uppercase tracking-widest font-semibold pt-0.5">
                        {test.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
