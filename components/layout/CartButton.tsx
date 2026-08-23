"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, cartCount } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";

export function CartButton() {
  const items = useCartStore((s) => s.items);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(items) : 0;

  return (
    <Link
      href="/panier"
      aria-label={`Panier${count > 0 ? `, ${count} article${count > 1 ? "s" : ""}` : ", vide"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/60"
    >
      <ShoppingBag size={18} aria-hidden="true" />
      {count > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
