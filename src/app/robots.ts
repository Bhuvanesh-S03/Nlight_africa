import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://theroyaldreams.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/seo/"],
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
