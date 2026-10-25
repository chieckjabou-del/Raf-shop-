import type { Metadata } from "next";
import { ShieldCheck, Eye, Sparkles, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Notre méthode de sélection",
  description: "Les critères qui décident si un produit entre — ou non — au catalogue RAF Shop.",
};

const CRITERIA = [
  {
    icon: ShieldCheck,
    title: "Exigence de sélection",
    test: "Si nous ne pouvons pas expliquer en une phrase pourquoi un produit est meilleur que l'alternative la plus évidente, il n'est pas référencé.",
  },
  {
    icon: Eye,
    title: "Transparence",
    test: "Aucune promesse — garantie, délai, origine — n'est affichée si elle n'est pas vérifiée et tenable.",
  },
  {
    icon: Sparkles,
    title: "Simplicité d'usage",
    test: "Toute fiche produit et tout parcours d'achat est testé sur une question : une personne non technophile comprend-elle en 30 secondes ?",
  },
  {
    icon: Heart,
    title: "Confiance durable",
    test: "La relation client ne s'arrête pas à la vente : le service après-vente est traité comme un investissement de marque, pas un centre de coût.",
  },
];

export default function MethodPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Notre méthode de sélection
        </h1>
        <p className="mt-4 text-muted">
          Quatre critères, chacun associé à un test de décision concret, filtrent chaque produit
          avant son entrée au catalogue.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {CRITERIA.map(({ icon: Icon, title, test }) => (
          <div key={title} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft">
              <Icon size={20} className="text-accent" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{test}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/boutique">Voir la sélection actuelle</Button>
      </div>
    </Container>
  );
}
