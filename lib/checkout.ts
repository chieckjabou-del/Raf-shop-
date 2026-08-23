import { getProductBySlug } from "@/lib/products";

export interface CheckoutLineInput {
  slug: string;
  quantity: number;
}

export interface CheckoutLineResolved {
  slug: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
}

export interface CheckoutTotals {
  lines: CheckoutLineResolved[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}

export const FREE_SHIPPING_THRESHOLD_CENTS = 6000;
export const STANDARD_SHIPPING_CENTS = 490;

/**
 * Recalcule le panier à partir du catalogue source de vérité côté serveur.
 * Ne fait JAMAIS confiance à un prix envoyé par le client.
 * Lève une erreur si un produit est inconnu, en rupture, ou une quantité invalide.
 */
export function resolveCheckoutTotals(lines: CheckoutLineInput[]): CheckoutTotals {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error("Le panier est vide.");
  }

  const resolved: CheckoutLineResolved[] = lines.map(({ slug, quantity }) => {
    if (typeof slug !== "string" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Ligne de panier invalide.");
    }
    const product = getProductBySlug(slug);
    if (!product) {
      throw new Error(`Produit inconnu : ${slug}`);
    }
    if (!product.inStock) {
      throw new Error(`Produit en rupture de stock : ${product.name}`);
    }
    return {
      slug: product.slug,
      name: product.name,
      unitPriceCents: product.priceCents,
      quantity,
      lineTotalCents: product.priceCents * quantity,
    };
  });

  const subtotalCents = resolved.reduce((sum, l) => sum + l.lineTotalCents, 0);
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;

  return {
    lines: resolved,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
  };
}
