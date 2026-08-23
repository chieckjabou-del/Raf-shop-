import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Confidentialité & cookies",
  description: "Politique de confidentialité et de cookies de RAF Shop.",
};

const SECTIONS = [
  {
    title: "1. Données collectées",
    body: "Dans le cadre d'une commande : nom, adresse e-mail, adresse postale de livraison. Ces données sont nécessaires à l'exécution du contrat de vente et ne sont pas utilisées à d'autres fins sans consentement explicite.",
  },
  {
    title: "2. Finalité et base légale",
    body: "Les données sont traitées pour exécuter la commande (base légale : exécution du contrat), répondre aux demandes via le formulaire de contact (intérêt légitime), et, si le client y consent, envoyer une newsletter (consentement, révocable à tout moment).",
  },
  {
    title: "3. Durée de conservation",
    body: "Les données liées à une commande sont conservées pendant la durée nécessaire au respect des obligations légales (comptables, garantie). [À COMPLÉTER : durées précises après validation juridique].",
  },
  {
    title: "4. Droits des personnes",
    body: "Conformément au RGPD, toute personne dispose d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur ses données. Ces droits peuvent être exercés via la page Contact. [À COMPLÉTER : adresse e-mail dédiée RGPD et, si nécessaire, coordonnées du délégué à la protection des données].",
  },
  {
    title: "5. Cookies",
    body: "Ce site utilise, ou utilisera en production, des cookies strictement nécessaires au fonctionnement (panier) et, sous réserve du consentement de l'utilisateur, des cookies de mesure d'audience. Un bandeau de consentement conforme aux recommandations de la CNIL devra être mis en place avant toute mise en production commerciale — non implémenté à ce stade de la démonstration.",
  },
  {
    title: "6. Sous-traitants et transferts",
    body: "Le prestataire de paiement et l'hébergeur du site sont susceptibles de traiter des données pour le compte de RAF Shop. [À COMPLÉTER : liste des sous-traitants une fois les prestataires définitifs choisis, et vérification d'éventuels transferts hors UE].",
  },
];

export default function ConfidentialitePage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Confidentialité & cookies
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
