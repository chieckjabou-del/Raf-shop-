export const SITE_NAME = "RAF Shop";

/**
 * Ordre de priorité : NEXT_PUBLIC_SITE_URL (à définir explicitement une fois
 * un domaine personnalisé branché), sinon l'URL de déploiement injectée
 * automatiquement par Vercel (VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL —
 * disponibles côté serveur uniquement, ce qui est le cas de tous les usages
 * de SITE_URL dans ce projet), sinon localhost en développement.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/**
 * "demo" (défaut) bloque l'indexation par les moteurs de recherche tant que
 * le catalogue est fictif. Passer NEXT_PUBLIC_SITE_MODE=production dans les
 * variables d'environnement une fois les vrais produits en ligne.
 */
export const SITE_MODE: "demo" | "production" =
  process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "demo";
