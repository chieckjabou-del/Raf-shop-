import { NextResponse } from "next/server";
import { getMolliePayment, isMolliePaymentConfigured } from "@/lib/payment/mollie";

/**
 * Webhook Mollie — appelé par Mollie (pas par le navigateur du client) pour
 * confirmer l'état réel d'un paiement.
 *
 * ⚠️ LIMITATION CONNUE (documentée dans le rapport d'audit) : RAF Shop ne
 * dispose pas encore d'une base de données de commandes. Ce webhook vérifie
 * le statut du paiement auprès de Mollie mais ne peut pas encore persister
 * la commande. Avant mise en production réelle, brancher ici l'écriture en
 * base (ex. table "orders") et l'envoi de l'email de confirmation.
 */
export async function POST(request: Request) {
  if (!isMolliePaymentConfigured()) {
    return NextResponse.json({ error: "Paiement non configuré." }, { status: 503 });
  }

  const formData = await request.formData();
  const paymentId = formData.get("id");

  if (typeof paymentId !== "string" || !paymentId) {
    return NextResponse.json({ error: "id manquant." }, { status: 400 });
  }

  try {
    const payment = await getMolliePayment(paymentId);
    console.info("[webhook mollie] Statut paiement", {
      id: payment.id,
      status: payment.status,
    });
    // TODO (production) : persister la commande + déclencher l'email de
    // confirmation une fois payment.status === "paid".
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook mollie] Échec de vérification", error);
    return NextResponse.json({ error: "Vérification impossible." }, { status: 502 });
  }
}
