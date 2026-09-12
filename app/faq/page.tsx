import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur la livraison, les retours, la garantie et le paiement.",
};

const FAQ_ITEMS = [
  {
    question: "Où livrez-vous ?",
    answer:
      "Chaque produit est expédié directement par le fournisseur partenaire qui le propose, ce qui permet de livrer au-delà de la France selon les produits. Le pays de livraison disponible pour chaque produit sera précisé sur sa fiche une fois les fournisseurs définitifs confirmés.",
  },
  {
    question: "Quels sont les délais et frais de livraison ?",
    answer:
      "Les frais de livraison standard sont indiqués au récapitulatif de commande (livraison offerte au-delà de 60 € d'achat sur cette démonstration). Les délais et frais réels dépendent du fournisseur et du pays de destination ; ils seront précisés sur la fiche produit une fois les fournisseurs définitifs confirmés.",
  },
  {
    question: "Puis-je changer d'avis après ma commande ?",
    answer:
      "Oui. Vous disposez de 14 jours à compter de la réception pour vous rétracter, sans justification, conformément au Code de la consommation. Voir la page Retours & garanties.",
  },
  {
    question: "Les produits sont-ils garantis ?",
    answer:
      "Tous les produits bénéficient de la garantie légale de conformité de 2 ans, en plus de la garantie des vices cachés.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Le paiement (carte bancaire, et selon le prestataire final, PayPal / Apple Pay / Google Pay) est en cours de connexion sur cet environnement de démonstration. Aucun paiement réel n'est traité tant que le prestataire n'est pas activé.",
  },
  {
    question: "Les produits du catalogue sont-ils réels ?",
    answer:
      "Pas encore : ce site est une version de démonstration. Le catalogue affiché est composé de produits fictifs clairement identifiés « DEMO », en attendant la validation du catalogue réel avec la fondatrice.",
  },
];

export default function FaqPage() {
  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Questions fréquentes
      </h1>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium text-foreground marker:content-none">
              {item.question}
              <span
                aria-hidden="true"
                className="ml-4 shrink-0 text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
