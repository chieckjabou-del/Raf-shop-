/**
 * Envoi d'e-mail transactionnel — non configuré dans cet environnement.
 * 🔴 BLOQUÉ PAR UNE DÉPENDANCE EXTERNE : aucune clé RESEND_API_KEY fournie.
 * Choix Resend documenté dans GUIDE_DE_LANCEMENT.md (API simple, bonne
 * délivrabilité, adapté à un envoi transactionnel léger comme ce formulaire).
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL);
}

export async function sendContactNotification(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    throw new Error("Service e-mail non configuré.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "RAF Shop <onboarding@resend.dev>",
      to,
      reply_to: params.email,
      subject: `[Contact RAF Shop] ${params.subject}`,
      text: `De : ${params.name} <${params.email}>\n\n${params.message}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Erreur Resend (${response.status}) : ${body}`);
  }
}
