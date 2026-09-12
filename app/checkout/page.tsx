"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_CENTS, STANDARD_SHIPPING_CENTS } from "@/lib/checkout";

interface FormState {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  address: "",
  postalCode: "",
  city: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const hydrated = useHydrated();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <Container className="py-16">
        <div className="h-40 animate-pulse rounded-2xl bg-surface-2" aria-hidden="true" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Votre panier est vide</h1>
        <Button href="/boutique" className="mt-6">
          Voir la boutique
        </Button>
      </Container>
    );
  }

  const subtotal = cartTotalCents(items);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
          customer: form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue. Réessayez.");
        return;
      }

      if (data.status === "redirect") {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.status === "demo_mode") {
        clear();
        router.push(`/checkout/confirmation?mode=demo&total=${data.totals.totalCents}`);
        return;
      }

      setError("Réponse inattendue du serveur.");
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Commande</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <h2 className="text-lg font-semibold text-foreground">Livraison</h2>

          <Field
            id="fullName"
            label="Nom complet"
            value={form.fullName}
            onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
            autoComplete="name"
            required
          />
          <Field
            id="email"
            type="email"
            label="Adresse e-mail"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            autoComplete="email"
            required
          />
          <Field
            id="address"
            label="Adresse"
            value={form.address}
            onChange={(v) => setForm((f) => ({ ...f, address: v }))}
            autoComplete="street-address"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              id="postalCode"
              label="Code postal"
              value={form.postalCode}
              onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
              autoComplete="postal-code"
              required
            />
            <Field
              id="city"
              label="Ville"
              value={form.city}
              onChange={(v) => setForm((f) => ({ ...f, city: v }))}
              autoComplete="address-level2"
              required
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={submitting} className="mt-2">
            {submitting ? "Traitement…" : `Payer ${formatPrice(total)}`}
          </Button>
          <p className="text-xs text-muted">
            Chaque produit est expédié directement par le fournisseur partenaire ; le pays de
            livraison disponible dépend du produit choisi.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">Récapitulatif</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between text-muted">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="text-foreground">
                  {formatPrice(item.priceCents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Sous-total</dt>
              <dd className="text-foreground">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Livraison</dt>
              <dd className="text-foreground">
                {shipping === 0 ? "Offerte" : formatPrice(shipping)}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
    </div>
  );
}
