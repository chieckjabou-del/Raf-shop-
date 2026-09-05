import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { DemoBadge } from "@/components/ui/Badge";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { SITE_URL, SITE_MODE } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// Le catalogue est statique (lib/products.ts) : un slug absent de
// generateStaticParams ne deviendra jamais valide sans redéploiement.
// On le refuse donc au niveau du routeur (vrai 404 HTTP) plutôt que de
// compter sur notFound() au moment du rendu, dont le statut ne se propage
// pas correctement ici pour les segments dynamiques prérendus.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: CATEGORY_LABELS[product.category],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.priceCents / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/produit/${product.slug}`,
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      {/* JSON-LD produit volontairement omis en mode démo pour ne jamais exposer de fausses données produit aux moteurs de recherche. */}
      {SITE_MODE === "production" && (
        <script
          type="application/ld+json"
          // JSON.stringify peut produire "</script>" si un champ produit venait
          // à contenir cette sous-chaîne (ex. description fournisseur) ; on
          // l'échappe pour ne jamais casser hors du tag <script>.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link href="/boutique" className="hover:text-foreground">
          Boutique
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductVisual
          category={product.category}
          accent={product.accent}
          className="aspect-square w-full"
          iconSize={96}
        />

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted">
              {CATEGORY_LABELS[product.category]}
            </span>
            <DemoBadge />
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtPriceCents && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.compareAtPriceCents)}
              </span>
            )}
            {!product.inStock && (
              <span className="text-sm font-medium text-danger">Rupture de stock</span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-muted sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0 text-accent" aria-hidden="true" />
              Garantie légale 2 ans
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="shrink-0 text-accent" aria-hidden="true" />
              Expédié par notre fournisseur partenaire
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="shrink-0 text-accent" aria-hidden="true" />
              Rétractation 14 jours
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Caractéristiques</h2>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Vous pourriez aussi aimer
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
