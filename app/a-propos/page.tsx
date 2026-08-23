import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire et la vision de RAF Shop, la sélection technologique de confiance.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Une sélection, pas un catalogue
      </h1>
      <p className="mt-4 text-lg text-muted">
        RAF Shop est né d&apos;un constat simple : trouver un objet technologique réellement
        utile, aujourd&apos;hui, demande de trier un flux publicitaire permanent. Nous avons
        choisi de faire ce tri à votre place.
      </p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Ce que nous ne sommes pas</h2>
          <p className="mt-2 leading-relaxed">
            RAF Shop n&apos;est pas une marketplace géante qui expose des milliers de références
            sans les avoir vues. Ce n&apos;est pas non plus une boutique mono-marque. C&apos;est
            une sélection restreinte, choisie selon des critères assumés — détaillés sur notre
            page{" "}
            <a href="/notre-methode" className="text-accent hover:text-accent-hover">
              Notre méthode de sélection
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Notre ambition</h2>
          <p className="mt-2 leading-relaxed">
            Devenir la référence de la sélection technologique de confiance — la marque vers
            laquelle on se tourne avant d&apos;adopter une nouvelle technologie, plutôt que celle
            qu&apos;on découvre par hasard dans un flux publicitaire. Nous démarrons en France,
            avec un catalogue volontairement restreint.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Nos engagements</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <strong className="text-foreground">Exigence de sélection</strong> — un produit
              référencé doit être défendable individuellement face aux alternatives.
            </li>
            <li>
              <strong className="text-foreground">Transparence</strong> — aucune promesse
              affichée si elle n&apos;est pas vérifiée et tenable.
            </li>
            <li>
              <strong className="text-foreground">Simplicité d&apos;usage</strong> — chaque fiche
              produit et chaque étape d&apos;achat doit être comprise en 30 secondes.
            </li>
            <li>
              <strong className="text-foreground">Confiance durable</strong> — la relation client
              ne s&apos;arrête pas à la vente.
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <Button href="/boutique">Découvrir la sélection</Button>
      </div>
    </Container>
  );
}
