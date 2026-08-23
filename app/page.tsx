import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Search, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { DemoBadge } from "@/components/ui/Badge";
import { products } from "@/lib/products";

const VALUE_PROPS = [
  {
    icon: Search,
    title: "Sélection de confiance",
    description:
      "Chaque produit référencé est défendable : s'il n'apporte pas un avantage réel face aux alternatives, il n'entre pas au catalogue.",
  },
  {
    icon: Sparkles,
    title: "Gain de temps réel",
    description:
      "Fiche produit claire, sans jargon : ce que le produit change concrètement, en moins de 30 secondes de lecture.",
  },
  {
    icon: ShieldCheck,
    title: "Achat sécurisé",
    description:
      "Garantie légale de conformité 2 ans, droit de rétractation 14 jours, paiement traité par un prestataire sécurisé.",
  },
  {
    icon: Truck,
    title: "Livraison suivie",
    description: "Livraison en France par Colissimo ou point relais, avec numéro de suivi.",
  },
];

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(43,107,255,0.16) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <DemoBadge className="mx-auto mb-6" />
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              La sélection technologique de confiance
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              RAF Shop ne vend pas tout. RAF Shop sélectionne, teste et explique une poignée de
              produits technologiques réellement utiles — pour que vous n&apos;ayez plus à trier
              le bruit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/boutique" size="lg">
                Découvrir la boutique <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="/notre-methode" variant="secondary" size="lg">
                Notre méthode de sélection
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft">
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                </div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                La sélection du moment
              </h2>
              <p className="mt-2 text-muted">Un aperçu du catalogue — {products.length} produits en tout.</p>
            </div>
            <Link
              href="/boutique"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover sm:inline-flex"
            >
              Voir tout <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button href="/boutique" variant="secondary">
              Voir tout le catalogue
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Envie de savoir comment on sélectionne ?
          </h2>
          <p className="max-w-xl text-muted">
            Aucune promesse que nous ne pouvons pas tenir. Découvrez les critères qui décident
            si un produit entre — ou n&apos;entre pas — au catalogue.
          </p>
          <Button href="/notre-methode" size="lg" className="mt-2">
            Notre méthode de sélection
          </Button>
        </Container>
      </section>
    </>
  );
}
