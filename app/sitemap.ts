import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL, SITE_MODE } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/boutique",
  "/notre-methode",
  "/a-propos",
  "/faq",
  "/contact",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
  "/retours-garanties",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // En mode démo, robots.ts bloque déjà l'indexation ; le sitemap reste
  // généré pour pouvoir être vérifié, mais ne doit jamais être soumis à
  // Google Search Console tant que le catalogue est fictif.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap =
    SITE_MODE === "production"
      ? products.map((product) => ({
          url: `${SITE_URL}/produit/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

  return [...staticEntries, ...productEntries];
}
