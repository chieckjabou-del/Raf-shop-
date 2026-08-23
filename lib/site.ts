export const SITE_NAME = "RAF Shop";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

/**
 * "demo" (défaut) bloque l'indexation par les moteurs de recherche tant que
 * le catalogue est fictif. Passer NEXT_PUBLIC_SITE_MODE=production dans les
 * variables d'environnement une fois les vrais produits en ligne.
 */
export const SITE_MODE: "demo" | "production" =
  process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "demo";
