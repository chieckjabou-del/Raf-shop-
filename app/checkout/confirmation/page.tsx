import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { getMolliePayment, isMolliePaymentConfigured } from "@/lib/payment/mollie";

export const metadata: Metadata = {
  title: "Confirmation de commande",
  robots: { index: false, follow: false },
};

async function fetchPaymentStatus(paymentId: string): Promise<string | null> {
  try {
    const payment = await getMolliePayment(paymentId);
    return payment.status;
  } catch {
    return null;
  }
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; total?: string; orderRef?: string; id?: string }>;
}) {
  const { mode, total, orderRef, id: paymentId } = await searchParams;

  if (mode === "demo") {
    const totalCents = Number(total ?? 0);
    return (
      <Container className="flex flex-col items-center gap-4 py-20 text-center">
        <Info size={40} className="text-accent" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-foreground">
          Démonstration terminée — aucun paiement n&apos;a été traité
        </h1>
        <p className="max-w-lg text-muted">
          Le prestataire de paiement n&apos;est pas encore connecté sur cet environnement. En
          production, vous auriez été redirigé vers la page de paiement sécurisée pour régler{" "}
          {Number.isFinite(totalCents) && totalCents > 0 ? formatPrice(totalCents) : "votre commande"}.
        </p>
        <Button href="/boutique" className="mt-2">
          Retour à la boutique
        </Button>
      </Container>
    );
  }

  // Ne jamais faire confiance à un paramètre "succès" côté navigateur :
  // le statut réel est revérifié auprès de Mollie côté serveur, en dehors
  // de tout bloc try/catch qui construirait du JSX.
  const paymentStatus =
    paymentId && isMolliePaymentConfigured() ? await fetchPaymentStatus(paymentId) : null;

  if (paymentStatus === "paid") {
    return (
      <Container className="flex flex-col items-center gap-4 py-20 text-center">
        <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-foreground">Commande confirmée</h1>
        <p className="max-w-lg text-muted">
          Merci{orderRef ? ` — référence ${orderRef}` : ""}. Un e-mail de confirmation vous sera
          envoyé.
        </p>
        <Button href="/boutique" className="mt-2">
          Continuer mes achats
        </Button>
      </Container>
    );
  }

  if (paymentStatus) {
    return (
      <Container className="flex flex-col items-center gap-4 py-20 text-center">
        <AlertTriangle size={40} className="text-warning" aria-hidden="true" />
        <h1 className="text-2xl font-semibold text-foreground">
          Paiement non finalisé (statut : {paymentStatus})
        </h1>
        <p className="max-w-lg text-muted">
          Votre paiement n&apos;a pas abouti. Aucun montant n&apos;a été débité si le statut est
          &laquo;&nbsp;annulé&nbsp;&raquo; ou &laquo;&nbsp;expiré&nbsp;&raquo;.
        </p>
        <Button href="/panier" className="mt-2">
          Retour au panier
        </Button>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col items-center gap-4 py-20 text-center">
      <AlertTriangle size={40} className="text-warning" aria-hidden="true" />
      <h1 className="text-2xl font-semibold text-foreground">Statut de commande indisponible</h1>
      <p className="max-w-lg text-muted">
        Nous n&apos;avons pas pu vérifier le statut de cette commande. Si un paiement a été
        prélevé, contactez-nous avec votre référence.
      </p>
      <Link href="/contact" className="text-accent hover:text-accent-hover">
        Nous contacter
      </Link>
    </Container>
  );
}
