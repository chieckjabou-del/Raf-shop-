"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <Container className="py-16">
        <div className="h-8 w-48 animate-pulse rounded bg-surface-2" aria-hidden="true" />
        <div className="mt-8 h-40 animate-pulse rounded-2xl bg-surface-2" aria-hidden="true" />
        <span className="sr-only">Chargement du panier…</span>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBag size={40} className="text-muted" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-foreground">Votre panier est vide</h1>
        <p className="max-w-sm text-muted">
          Parcourez la boutique pour découvrir la sélection RAF Shop.
        </p>
        <Button href="/boutique" className="mt-2">
          Voir la boutique
        </Button>
      </Container>
    );
  }

  const total = cartTotalCents(items);

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Votre panier</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            const product = getProductBySlug(item.slug);
            return (
              <li
                key={item.slug}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
              >
                <Link href={`/produit/${item.slug}`} className="shrink-0">
                  <ProductVisual
                    category={product?.category ?? "productivite"}
                    accent={item.accent}
                    image={product?.image}
                    alt={item.name}
                    className="h-20 w-20"
                    iconSize={26}
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/produit/${item.slug}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Retirer ${item.name} du panier`}
                      className="text-muted transition-colors hover:text-danger"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <QuantityStepper
                      quantity={item.quantity}
                      onChange={(next) => setQuantity(item.slug, next)}
                      label={item.name}
                    />
                    <span className="font-semibold text-foreground">
                      {formatPrice(item.priceCents * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">Récapitulatif</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Sous-total</dt>
              <dd className="font-medium text-foreground">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Livraison</dt>
              <dd className="text-muted">Calculée à l&apos;étape suivante</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground">{formatPrice(total)}</span>
          </div>
          <Button href="/checkout" size="lg" className="mt-6 w-full">
            Passer la commande
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Le prix final est toujours recalculé et vérifié côté serveur avant paiement.
          </p>
        </aside>
      </div>
    </Container>
  );
}
