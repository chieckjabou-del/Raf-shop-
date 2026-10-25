import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de RAF Shop.",
};

export default function MentionsLegalesPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Mentions légales</h1>
      <LegalDisclaimer />

      <div className="prose-legal space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-base font-semibold text-foreground">Éditeur du site</h2>
          <p>
            Raison sociale : [À COMPLÉTER]
            <br />
            Forme juridique : [À COMPLÉTER]
            <br />
            Capital social : [À COMPLÉTER]
            <br />
            Siège social : [À COMPLÉTER]
            <br />
            SIRET : [À COMPLÉTER]
            <br />
            RCS : [À COMPLÉTER]
            <br />
            Numéro de TVA intracommunautaire : [À COMPLÉTER]
            <br />
            Directeur de la publication : [À COMPLÉTER]
            <br />
            E-mail : [À COMPLÉTER]
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Hébergement</h2>
          <p>
            Ce site est hébergé par : [À COMPLÉTER — nom, adresse et contact de
            l&apos;hébergeur retenu, ex. Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis]
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo) est la
            propriété de RAF Shop, sauf mention contraire. Les visuels produit affichés sont
            des illustrations génériques en attendant l&apos;intégration des photos définitives
            fournies par le fournisseur ; les produits eux-mêmes et leurs prix sont réels.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Médiation de la consommation</h2>
          <p>
            Conformément à l&apos;article L.616-1 du Code de la consommation, RAF Shop
            proposera, avant toute mise en production commerciale, les coordonnées d&apos;un
            médiateur de la consommation compétent. [À COMPLÉTER]
          </p>
        </section>
      </div>
    </Container>
  );
}
