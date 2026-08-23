"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantityStepper quantity={quantity} onChange={setQuantity} label={product.name} />
      <AddToCartButton product={product} quantity={quantity} size="lg" className="flex-1 sm:flex-none" />
    </div>
  );
}
