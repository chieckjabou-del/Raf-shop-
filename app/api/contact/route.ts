import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactNotification } from "@/lib/email";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !isValidEmail(email) || !subject || message.length < 10) {
    return NextResponse.json(
      { error: "Merci de renseigner tous les champs (message d'au moins 10 caractères)." },
      { status: 400 },
    );
  }

  if (!isEmailConfigured()) {
    console.info("[contact] Message reçu (service e-mail non configuré)", {
      name,
      email,
      subject,
    });
    return NextResponse.json({
      status: "demo_mode",
      message:
        "Votre message a été reçu par le serveur mais le service d'envoi d'e-mail n'est pas encore connecté sur cet environnement.",
    });
  }

  try {
    await sendContactNotification({ name, email, subject, message });
    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.error("[contact] Échec d'envoi", error);
    return NextResponse.json(
      { error: "Le message n'a pas pu être envoyé. Réessayez plus tard." },
      { status: 502 },
    );
  }
}
