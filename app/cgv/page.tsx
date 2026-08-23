import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de RAF Shop.",
};

const SECTIONS = [
  {
    title: "1. Champ d'application",
    body: "Les présentes conditions générales de vente (CGV) régissent les ventes de produits réalisées par RAF Shop auprès de consommateurs résidant en France métropolitaine. [À COMPLÉTER : zones de livraison définitives, DOM-TOM inclus ou non].",
  },
  {
    title: "2. Produits et prix",
    body: "Les produits sont présentés avec leurs caractéristiques essentielles. Les prix sont indiqués en euros, toutes taxes comprises (TVA française applicable). RAF Shop se réserve le droit de modifier ses prix à tout moment ; les produits sont facturés sur la base des tarifs en vigueur au moment de la validation de la commande.",
  },
  {
    title: "3. Commande et paiement",
    body: "La commande est validée après confirmation du paiement par le prestataire de paiement. Le prix affiché au moment du paiement est recalculé et vérifié côté serveur : aucun prix transmis par le navigateur du client n'est utilisé pour la facturation. [À COMPLÉTER une fois le prestataire de paiement activé : moyens de paiement acceptés en pratique.]",
  },
  {
    title: "4. Livraison",
    body: "Livraison en France métropolitaine par Colissimo ou en point relais. Les délais indicatifs seront précisés sur chaque fiche produit une fois le fournisseur réel confirmé. [À COMPLÉTER : délais réels, frais de port définitifs].",
  },
  {
    title: "5. Droit de rétractation",
    body: "Conformément aux articles L.221-18 et suivants du Code de la consommation, le client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motif. Le formulaire de rétractation et la procédure de retour seront détaillés sur la page Retours & garanties.",
  },
  {
    title: "6. Garantie légale",
    body: "Tous les produits bénéficient de la garantie légale de conformité (articles L.217-3 et suivants du Code de la consommation) et de la garantie légale des vices cachés (articles 1641 et suivants du Code civil), indépendamment de toute garantie commerciale.",
  },
  {
    title: "7. Responsabilité",
    body: "RAF Shop ne saurait être tenu responsable de l'inexécution du contrat en cas de force majeure, de rupture de stock ou d'indisponibilité du produit. [À COMPLÉTER après validation juridique].",
  },
  {
    title: "8. Droit applicable et litiges",
    body: "Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire, notamment via le médiateur de la consommation mentionné dans les mentions légales.",
  },
];

export default function CgvPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Conditions générales de vente
      </h1>
      <LegalDisclaimer />

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
