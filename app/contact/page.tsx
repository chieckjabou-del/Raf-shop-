"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const MIN_MESSAGE_LENGTH = 10;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "demo" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messageHintId = useId();

  const messageTooShort = form.message.length > 0 && form.message.trim().length < MIN_MESSAGE_LENGTH;
  const canSubmit =
    form.name.trim().length > 0 &&
    isValidEmail(form.email) &&
    form.subject.trim().length > 0 &&
    form.message.trim().length >= MIN_MESSAGE_LENGTH;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Une erreur est survenue.");
        return;
      }

      setStatus(data.status === "demo_mode" ? "demo" : "sent");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion.");
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <Container className="max-w-xl py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Message envoyé</h1>
        <p className="mt-3 text-muted">
          {status === "demo"
            ? "Votre message a bien été reçu par le serveur. Le service d'envoi d'e-mail n'est pas encore connecté sur cet environnement de démonstration."
            : "Merci, nous vous répondrons sous 48h ouvrées."}
        </p>
        <Button href="/" className="mt-6">
          Retour à l&apos;accueil
        </Button>
      </Container>
    );
  }

  return (
    <Container className="max-w-xl py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Contact</h1>
      <p className="mt-3 text-muted">
        Une question sur un produit, une commande, ou l&apos;équipe ? Écrivez-nous.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Nom *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={form.email.length > 0 && !isValidEmail(form.email)}
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
            Sujet *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            aria-describedby={messageHintId}
            aria-invalid={messageTooShort}
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
          />
          <p id={messageHintId} className="mt-1.5 text-xs text-muted">
            {MIN_MESSAGE_LENGTH} caractères minimum.
          </p>
        </div>

        {status === "error" && errorMessage && (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {errorMessage}
          </p>
        )}

        <Button type="submit" size="lg" disabled={!canSubmit || status === "submitting"}>
          {status === "submitting" ? "Envoi…" : "Envoyer le message"}
        </Button>
      </form>
    </Container>
  );
}
