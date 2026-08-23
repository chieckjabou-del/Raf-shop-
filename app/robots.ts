import type { MetadataRoute } from "next";
import { SITE_URL, SITE_MODE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (SITE_MODE !== "production") {
    // Catalogue fictif : on bloque l'indexation tant que NEXT_PUBLIC_SITE_MODE
    // n'est pas passé à "production" (voir GUIDE_DE_LANCEMENT.md).
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/checkout/confirmation"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
