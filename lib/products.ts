import type { Product } from "./types";

/**
 * CATALOGUE RÉEL — sourcé le 25/10/2026 sur le compte fournisseur
 * CJdropshipping de la cliente (Agshop200@gmail.com), validé par elle
 * produit par produit.
 *
 * Prix fournisseur convertis de l'USD à l'EUR (taux indicatif du
 * 23/10/2026, 1 USD ≈ 0,89 EUR) puis majorés d'une marge proposée par
 * défaut — à ajuster librement, voir GUIDE_DE_LANCEMENT.md section 3.
 *
 * ⚠️ VISUELS : vignette fournisseur réelle mais basse résolution (recadrée
 * depuis une capture d'écran du catalogue CJdropshipping) — pas encore de
 * vraie photo produit haute définition. Voir ProductVisual.tsx : le badge
 * "Aperçu fournisseur" l'indique sur chaque fiche tant que ce n'est pas
 * remplacé par un visuel définitif.
 *
 * ⚠️ CARACTÉRISTIQUES : seules les informations confirmées par le titre
 * de la fiche fournisseur sont indiquées. Les caractéristiques
 * détaillées (poids, autonomie, puissance exacte...) doivent être
 * vérifiées sur la fiche fournisseur avant mise en vente commerciale.
 */
export const products: Product[] = [
  {
    slug: "chargeur-voyage-3-en-1",
    name: "Station de Charge Pliable 3-en-1",
    tagline: "Un socle pliable et magnétique, pensé pour le voyage.",
    description:
      "Chargeur sans fil pliable 3-en-1, compatible charge magnétique. Se replie à plat pour se glisser dans un sac ou une valise cabine.",
    category: "productivite",
    priceCents: 4990,
    compareAtPriceCents: 6490,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Station de charge sans fil magnétique pliable 3 en 1" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Format pliable, facile à emporter",
      "Compatible charge magnétique",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#2b6bff",
    image: "/produits/chargeur-voyage-3-en-1.jpg",
  },
  {
    slug: "enceinte-portable-etanche",
    name: "Enceinte Bluetooth Portable Étanche",
    tagline: "Le son qui suit, même en extérieur.",
    description:
      "Enceinte Bluetooth portable étanche, conçue pour un usage extérieur — terrasse, plage, balcon.",
    category: "audio-video",
    priceCents: 4490,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Outdoor Portable Waterproof Bluetooth Speaker" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Conçue pour un usage extérieur",
      "Étanche (waterproof)",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#1e9bff",
    image: "/produits/enceinte-portable-etanche.jpg",
  },
  {
    slug: "lampe-bureau-chargeur-induction",
    name: "Lampe de Bureau LED avec Chargeur Sans Fil",
    tagline: "Éclaire le bureau, recharge le téléphone.",
    description:
      "Lampe de bureau LED avec chargeur à induction intégré — le téléphone se recharge posé sous la lampe.",
    category: "productivite",
    priceCents: 3290,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Lampe de bureau intelligente LED avec chargeur sans fil" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Éclairage LED de bureau",
      "Chargeur à induction intégré",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#2b6bff",
    image: "/produits/lampe-bureau-chargeur-induction.jpg",
  },
  {
    slug: "trepied-flexible-smartphone",
    name: "Support Rotatif 360° pour Smartphone",
    tagline: "Oriente ton téléphone dans tous les sens, sur ton bureau.",
    description:
      "Support de bureau rotatif à 360° pour smartphone — pratique pour visionner, filmer ou passer un appel mains libres.",
    category: "mobilite",
    priceCents: 1990,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Support de bureau rotatif à 360° pour téléphone portable" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Rotation à 360°",
      "Compact, pour bureau ou voiture",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#7c5cff",
    image: "/produits/trepied-flexible-smartphone.jpg",
  },
  {
    slug: "clavier-mecanique-compact",
    name: "Clavier Sans Fil Tri-Mode Hot-Swap",
    tagline: "Connexion tri-mode, switches remplaçables.",
    description:
      "Clavier sans fil tri-mode avec switches hot-swap (remplaçables sans soudure).",
    category: "productivite",
    priceCents: 7490,
    compareAtPriceCents: 9490,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Full-key Hot Plug Wireless Three-mode Bluetooth Keyboard" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      {
        label: "Caractéristiques détaillées",
        value: "À confirmer sur la fiche fournisseur avant mise en vente — switches mécaniques non garantis par le seul titre de l'annonce",
      },
    ],
    highlights: [
      "Connexion tri-mode",
      "Switches remplaçables (hot-swap)",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#2b6bff",
    image: "/produits/clavier-mecanique-compact.jpg",
  },
  {
    slug: "purificateur-air-portable",
    name: "Purificateur d'Air Portable à Ions Négatifs",
    tagline: "Un air plus propre, où que vous soyez.",
    description:
      "Purificateur d'air portable à génération d'ions négatifs, format compact.",
    category: "bien-etre",
    priceCents: 3490,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Purificateur d'air portable à ions négatifs" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Génération d'ions négatifs",
      "Format portable",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#22c1c3",
    image: "/produits/purificateur-air-portable.jpg",
  },
  {
    slug: "casque-reduction-bruit",
    name: "Casque à Réduction de Bruit Active TWS",
    tagline: "Le silence à la demande, en intra-auriculaire sans fil.",
    description:
      "Casque TWS sans fil à réduction de bruit active. Référence fournisseur : NB2.",
    category: "audio-video",
    priceCents: 14990,
    compareAtPriceCents: 17990,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Casque Bluetooth à réduction de bruit active TWS NB2" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Réduction de bruit active",
      "Format TWS sans fil",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#7c5cff",
    image: "/produits/casque-reduction-bruit.jpg",
  },
  {
    slug: "mini-projecteur-portable",
    name: "Mini Projecteur Portable Full HD 1080p",
    tagline: "Un film, un mur, aucune installation complexe.",
    description:
      "Mini projecteur portable Full HD 1080p, format compact.",
    category: "audio-video",
    priceCents: 6990,
    compareAtPriceCents: 8990,
    specs: [
      { label: "Fournisseur", value: "CJdropshipping (expédition directe)" },
      { label: "Référence fournisseur", value: "Mini projecteur portable pour la maison, format 1080p HD" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
      { label: "Caractéristiques détaillées", value: "À confirmer sur la fiche fournisseur avant mise en vente" },
    ],
    highlights: [
      "Résolution 1080p HD",
      "Format compact portable",
      "Garantie légale 2 ans",
    ],
    inStock: true,
    accent: "#1e9bff",
    image: "/produits/mini-projecteur-portable.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);
}
