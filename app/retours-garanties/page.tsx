import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Retours & garanties",
  description: "Politique de retour, rétractation et garanties de RAF Shop.",
};

export default function RetoursGarantiesPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Retours & garanties
      </h1>
      <LegalDisclaimer />

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            Droit de rétractation (14 jours)
          </h2>
          <p className="mt-2">
            Vous disposez de 14 jours à compter de la réception de votre commande pour changer
            d&apos;avis, sans avoir à vous justifier. Le produit doit être retourné dans son état
            d&apos;origine. [À COMPLÉTER : adresse de retour, prise en charge ou non des frais de
            retour, délai de remboursement — 14 jours maximum légal à compter de la réception du
            retour ou de la preuve d&apos;expédition].
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            Garantie légale de conformité (2 ans)
          </h2>
          <p className="mt-2">
            Tous les produits vendus par RAF Shop bénéficient de la garantie légale de
            conformité de 2 ans (article L.217-3 du Code de la consommation). En cas de défaut,
            vous pouvez demander la réparation ou le remplacement du produit, sans frais.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            Garantie des vices cachés
          </h2>
          <p className="mt-2">
            Indépendamment de la garantie légale de conformité, RAF Shop reste tenu de la
            garantie des vices cachés dans les conditions prévues aux articles 1641 à 1648 du
            Code civil.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            Recyclage des équipements électroniques (REP/DEEE)
          </h2>
          <p className="mt-2">
            Les produits électroniques vendus par RAF Shop sont soumis à la filière de
            responsabilité élargie du producteur (REP) applicable aux déchets d&apos;équipements
            électriques et électroniques (DEEE). Une éco-participation peut s&apos;appliquer selon
            les produits. [À COMPLÉTER : éco-organisme adhérent, montants d&apos;éco-participation
            par produit — obligatoire avant mise en vente réelle de produits électroniques en
            France].
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Comment retourner un produit</h2>
          <p className="mt-2">
            Contactez-nous via la page Contact en indiquant votre numéro de commande. Chaque
            produit étant expédié directement par un fournisseur partenaire, l&apos;adresse et
            la procédure de retour peuvent varier d&apos;un produit à l&apos;autre — RAF Shop
            reste votre interlocuteur unique et se charge de coordonner le retour avec le
            fournisseur concerné. [À COMPLÉTER une fois le processus de retour défini avec
            chaque fournisseur.]
          </p>
        </section>
      </div>
    </Container>
  );
}
