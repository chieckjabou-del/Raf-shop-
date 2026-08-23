import type { Product } from "./types";

/**
 * DONNÉES DE DÉMONSTRATION — DEMO/MOCK
 * Aucun de ces produits, prix, stocks ou fournisseurs n'est réel.
 * À remplacer par le catalogue validé avant toute mise en production commerciale.
 * Voir GUIDE_DE_LANCEMENT.md pour la procédure de remplacement.
 */
export const products: Product[] = [
  {
    slug: "chargeur-voyage-3-en-1",
    name: "Chargeur MagSafe 3-en-1 Voyage",
    tagline: "Trois appareils chargés, un seul câble, un seul geste.",
    description:
      "Un socle pliable qui charge téléphone, écouteurs et montre connectée simultanément. Pensé pour disparaître dans une trousse et se déplier en 2 secondes sur une table de chevet d'hôtel ou un bureau partagé.",
    category: "productivite",
    priceCents: 4990,
    compareAtPriceCents: 6490,
    specs: [
      { label: "Puissance", value: "15W (téléphone) / 5W (écouteurs et montre)" },
      { label: "Poids", value: "142 g" },
      { label: "Dimensions pliées", value: "9 × 9 × 2 cm" },
      { label: "Compatibilité", value: "Charge sans fil Qi / MagSafe" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Remplace 3 câbles par 1 seul socle",
      "Se plie à plat pour le sac ou la valise cabine",
      "Charge les 3 appareils en simultané, sans perte de vitesse notable",
    ],
    inStock: true,
    accent: "#2b6bff",
  },
  {
    slug: "enceinte-portable-etanche",
    name: "Enceinte Bluetooth Portable Étanche",
    tagline: "Le son qui suit, même sous la pluie ou au bord de l'eau.",
    description:
      "Certifiée IP67, cette enceinte compacte tient dans une main et délivre un son plein sur 12h d'autonomie. Conçue pour le balcon, la terrasse ou le sac de plage sans jamais craindre les éclaboussures.",
    category: "audio-video",
    priceCents: 5990,
    specs: [
      { label: "Autonomie", value: "12 heures en usage continu" },
      { label: "Étanchéité", value: "IP67 (immersion accidentelle jusqu'à 1 m)" },
      { label: "Connectivité", value: "Bluetooth 5.3, portée 15 m" },
      { label: "Poids", value: "310 g" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Résiste aux projections d'eau et à l'immersion accidentelle",
      "12h d'autonomie, se recharge en USB-C",
      "Appairage à deux enceintes pour un son stéréo",
    ],
    inStock: true,
    accent: "#1e9bff",
  },
  {
    slug: "lampe-bureau-chargeur-induction",
    name: "Lampe de Bureau LED avec Chargeur Sans Fil",
    tagline: "Éclaire le bureau, recharge le téléphone, une seule prise.",
    description:
      "Une lampe à trois températures de lumière avec base de charge à induction intégrée. Le téléphone se recharge posé sous la lampe, sans câble qui traîne sur le bureau.",
    category: "productivite",
    priceCents: 3990,
    specs: [
      { label: "Températures de lumière", value: "3 réglages (chaud / neutre / froid)" },
      { label: "Charge sans fil", value: "10W, compatible Qi" },
      { label: "Variateur", value: "Tactile, 5 niveaux d'intensité" },
      { label: "Alimentation", value: "Adaptateur secteur inclus" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Supprime un câble et un chargeur du bureau",
      "3 températures de lumière pour le travail ou la lecture",
      "Bras articulé, s'oriente sans effort",
    ],
    inStock: true,
    accent: "#2b6bff",
  },
  {
    slug: "trepied-flexible-smartphone",
    name: "Trépied Flexible pour Smartphone",
    tagline: "Filme n'importe où, se fixe sur n'importe quoi.",
    description:
      "Pieds flexibles qui s'enroulent autour d'une rambarde, d'un vélo ou d'un pied de table. Pensé pour les créateurs de contenu qui filment en mobilité, sans installation ni réglage complexe.",
    category: "mobilite",
    priceCents: 2490,
    specs: [
      { label: "Hauteur", value: "20 cm (26 cm pieds dépliés)" },
      { label: "Fixation", value: "Pince universelle 5,5 à 9 cm" },
      { label: "Rotation", value: "360° avec tête à rotule" },
      { label: "Poids supporté", value: "Jusqu'à 500 g" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "S'enroule et se fixe en quelques secondes, sans outil",
      "Tient dans une poche de veste",
      "Rotule 360° pour cadrer sous tous les angles",
    ],
    inStock: true,
    accent: "#7c5cff",
  },
  {
    slug: "clavier-mecanique-compact",
    name: "Clavier Mécanique Compact Sans Fil",
    tagline: "Le format d'un clavier portable, la frappe d'un clavier pro.",
    description:
      "Format 75% pour gagner de la place sur le bureau sans sacrifier les touches de fonction. Trois profils Bluetooth mémorisés pour basculer entre ordinateur, tablette et téléphone.",
    category: "productivite",
    priceCents: 8990,
    compareAtPriceCents: 10990,
    specs: [
      { label: "Format", value: "75% compact, rétroéclairé" },
      { label: "Connectivité", value: "Bluetooth 5.1 (3 profils) + USB-C filaire" },
      { label: "Autonomie", value: "Jusqu'à 200h (rétroéclairage éteint)" },
      { label: "Switches", value: "Mécaniques, silencieux" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Bascule entre 3 appareils en une pression",
      "Encombrement réduit de 30% vs un clavier standard",
      "Switches silencieux, adapté à l'open space",
    ],
    inStock: true,
    accent: "#2b6bff",
  },
  {
    slug: "purificateur-air-portable",
    name: "Purificateur d'Air Portable USB-C",
    tagline: "Un air plus propre sur le bureau, sans installation.",
    description:
      "Format compact avec filtre HEPA, pensé pour un bureau ou une petite chambre. Se branche en USB-C, fonctionne sur batterie ou secteur, filtre renouvelable tous les 6 mois.",
    category: "bien-etre",
    priceCents: 5490,
    specs: [
      { label: "Filtration", value: "Filtre HEPA H13" },
      { label: "Surface conseillée", value: "Jusqu'à 15 m²" },
      { label: "Niveau sonore", value: "28 à 45 dB selon vitesse" },
      { label: "Alimentation", value: "USB-C, batterie 4h ou secteur continu" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Filtre HEPA H13, efficace sur particules fines",
      "Fonctionne sur batterie, se déplace pièce à pièce",
      "Niveau sonore compatible avec un usage en réunion",
    ],
    inStock: true,
    accent: "#22c1c3",
  },
  {
    slug: "casque-reduction-bruit",
    name: "Casque à Réduction de Bruit Active",
    tagline: "Le silence à la demande, dans l'open space ou en avion.",
    description:
      "Réduction de bruit active sur 3 niveaux, mode transparence pour entendre son environnement sans retirer le casque, et 30h d'autonomie pour les trajets les plus longs.",
    category: "audio-video",
    priceCents: 12990,
    compareAtPriceCents: 15990,
    specs: [
      { label: "Réduction de bruit", value: "Active, 3 niveaux + mode transparence" },
      { label: "Autonomie", value: "30h (ANC activée)" },
      { label: "Charge rapide", value: "10 min = 4h d'écoute" },
      { label: "Poids", value: "245 g" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Coupe le bruit ambiant en open space ou en déplacement",
      "Mode transparence pour rester joignable sans les retirer",
      "30h d'autonomie, charge rapide 10 min = 4h",
    ],
    inStock: true,
    accent: "#7c5cff",
  },
  {
    slug: "mini-projecteur-portable",
    name: "Mini Projecteur Portable Full HD",
    tagline: "Un salon, un mur, une soirée film — sans installation.",
    description:
      "Format valise miniature, projection Full HD jusqu'à 120 pouces, haut-parleur intégré. Se pose sur une table basse et se branche en HDMI ou en streaming direct depuis le téléphone.",
    category: "audio-video",
    priceCents: 17990,
    specs: [
      { label: "Résolution", value: "Full HD native 1080p" },
      { label: "Taille de projection", value: "Jusqu'à 120 pouces" },
      { label: "Connectivité", value: "HDMI, USB-C, Wi-Fi (cast)" },
      { label: "Poids", value: "890 g" },
      { label: "Garantie", value: "2 ans (garantie légale de conformité)" },
    ],
    highlights: [
      "Installation en moins de 2 minutes, sans câblage complexe",
      "Projection jusqu'à 120 pouces sur un mur blanc",
      "Haut-parleur intégré, autonome sans enceinte externe",
    ],
    inStock: false,
    accent: "#1e9bff",
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
