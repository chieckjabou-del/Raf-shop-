"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  size = "md",
  className,
}: {
  product: Product;
  quantity?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  if (!product.inStock) {
    return (
      <Button variant="secondary" size={size} className={className} disabled>
        Rupture de stock
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={() => {
        addItem(
          {
            slug: product.slug,
            name: product.name,
            priceCents: product.priceCents,
            accent: product.accent,
          },
          quantity,
        );
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1800);
      }}
      aria-live="polite"
    >
      {justAdded ? (
        <>
          <Check size={16} aria-hidden="true" /> Ajouté au panier
        </>
      ) : (
        <>
          <ShoppingBag size={16} aria-hidden="true" /> Ajouter au panier
        </>
      )}
    </Button>
  );
}
