import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theroyaldreams.com";

  // Base indexable pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    }
  ];

  // The 6 exact flagship root slug routes
  const flagshipSlugs = [
    "royal-dreams-100-sticks",
    "royal-dreams-10-sticks",
    "royal-dreams-chain-pack",
    "mosquito-repellant",
    "premium-cup-incense",
    "spiritual-products"
  ];

  flagshipSlugs.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  try {
    const filePath = path.join(process.cwd(), "src", "data", "cms-data.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Dynamic SEO landing pages index paths (/seo/[slug])
    if (data?.seoLandingPages) {
      Object.keys(data.seoLandingPages).forEach((slug) => {
        routes.push({
          url: `${baseUrl}/seo/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.error("Failed to generate dynamic sitemap:", error);
  }

  return routes;
}
