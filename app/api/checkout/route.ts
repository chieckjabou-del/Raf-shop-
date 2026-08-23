import { NextResponse } from "next/server";
import { resolveCheckoutTotals, type CheckoutLineInput } from "@/lib/checkout";
import { createMolliePayment, isMolliePaymentConfigured } from "@/lib/payment/mollie";
import { SITE_URL } from "@/lib/site";

interface CheckoutRequestBody {
  lines: CheckoutLineInput[];
  customer: {
    fullName: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
  };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { customer } = body ?? {};
  if (
    !customer ||
    !customer.fullName?.trim() ||
    !customer.address?.trim() ||
    !customer.postalCode?.trim() ||
    !customer.city?.trim() ||
    !isValidEmail(customer.email ?? "")
  ) {
    return NextResponse.json(
      { error: "Coordonnées de livraison incomplètes ou invalides." },
      { status: 400 },
    );
  }

  let totals;
  try {
    // Le prix n'est JAMAIS accepté depuis le client : seul le slug + la
    // quantité sont lus, le total est recalculé depuis lib/products.ts.
    totals = resolveCheckoutTotals(body.lines ?? []);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Panier invalide." },
      { status: 400 },
    );
  }

  if (!isMolliePaymentConfigured()) {
    return NextResponse.json({
      status: "demo_mode",
      message:
        "Le prestataire de paiement (Mollie) n'est pas encore connecté. Ceci est une démonstration : aucun paiement réel n'a été initié.",
      totals,
    });
  }

  const orderRef = `RAF-${Date.now().toString(36).toUpperCase()}`;

  try {
    const isPubliclyReachable = /^https:\/\//.test(SITE_URL);
    const payment = await createMolliePayment({
      amountCents: totals.totalCents,
      description: `Commande ${orderRef} — RAF Shop`,
      redirectUrl: `${SITE_URL}/checkout/confirmation?orderRef=${orderRef}`,
      webhookUrl: isPubliclyReachable ? `${SITE_URL}/api/webhooks/mollie` : undefined,
      metadata: {
        orderRef,
        email: customer.email,
        lines: totals.lines.map((l) => `${l.slug}x${l.quantity}`).join(","),
      },
    });

    return NextResponse.json({
      status: "redirect",
      checkoutUrl: payment.checkoutUrl,
      orderRef,
    });
  } catch (error) {
    console.error("[checkout] Échec de création du paiement Mollie", error);
    return NextResponse.json(
      { error: "Le prestataire de paiement n'a pas pu être contacté. Réessayez plus tard." },
      { status: 502 },
    );
  }
}
