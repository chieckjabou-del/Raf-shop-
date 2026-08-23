/**
 * Abstraction de paiement — RAF Shop (marché France).
 *
 * Choix : Mollie, retenu après analyse car il couvre en une seule intégration
 * carte bancaire, PayPal, Apple Pay et Google Pay via un checkout hébergé
 * (pas de gestion PCI-DSS côté RAF Shop), avec une tarification et une prise
 * en charge adaptées aux PME françaises/européennes. Stripe est explicitement
 * exclu du périmètre à la demande de la cliente.
 *
 * 🔴 BLOQUÉ PAR UNE DÉPENDANCE EXTERNE : aucune clé API Mollie n'est
 * disponible dans cet environnement. Tant que MOLLIE_API_KEY n'est pas
 * définie, isMolliePaymentConfigured() renvoie false et les routes API
 * répondent explicitement en mode démo — jamais en simulant un paiement
 * réussi.
 */

const MOLLIE_API_BASE = "https://api.mollie.com/v2";

export function isMolliePaymentConfigured(): boolean {
  return Boolean(process.env.MOLLIE_API_KEY);
}

interface CreateMolliePaymentParams {
  amountCents: number;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  metadata?: Record<string, string>;
}

interface MolliePaymentResponse {
  id: string;
  status: string;
  _links: {
    checkout?: { href: string };
  };
}

export async function createMolliePayment(
  params: CreateMolliePaymentParams,
): Promise<{ id: string; checkoutUrl: string }> {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    throw new Error("MOLLIE_API_KEY manquant — paiement non configuré.");
  }

  const response = await fetch(`${MOLLIE_API_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: {
        currency: "EUR",
        value: (params.amountCents / 100).toFixed(2),
      },
      description: params.description,
      redirectUrl: params.redirectUrl,
      webhookUrl: params.webhookUrl,
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Erreur Mollie (${response.status}) : ${body}`);
  }

  const data = (await response.json()) as MolliePaymentResponse;
  const checkoutUrl = data._links.checkout?.href;
  if (!checkoutUrl) {
    throw new Error("Réponse Mollie inattendue : URL de paiement manquante.");
  }

  return { id: data.id, checkoutUrl };
}

export async function getMolliePayment(paymentId: string): Promise<MolliePaymentResponse> {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    throw new Error("MOLLIE_API_KEY manquant — paiement non configuré.");
  }

  const response = await fetch(`${MOLLIE_API_BASE}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Erreur Mollie (${response.status}) : ${body}`);
  }

  return (await response.json()) as MolliePaymentResponse;
}
