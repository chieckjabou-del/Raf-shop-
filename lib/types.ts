export type ProductCategory =
  | "maison-connectee"
  | "productivite"
  | "mobilite"
  | "audio-video"
  | "bien-etre";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  /** Price in cents (EUR) — always the source of truth server-side. */
  priceCents: number;
  compareAtPriceCents?: number;
  specs: ProductSpec[];
  highlights: string[];
  inStock: boolean;
  accent: string;
  /**
   * Chemin dans /public vers un visuel réel du produit (ex. vignette
   * fournisseur basse résolution). Si absent, ProductVisual affiche
   * l'icône générique de secours.
   */
  image?: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "maison-connectee": "Maison connectée",
  productivite: "Productivité",
  mobilite: "Mobilité",
  "audio-video": "Audio & vidéo",
  "bien-etre": "Bien-être",
};
