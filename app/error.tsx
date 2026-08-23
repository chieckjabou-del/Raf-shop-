"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Une erreur est survenue</h1>
      <p className="max-w-md text-muted">
        Quelque chose s&apos;est mal passé de notre côté. Vous pouvez réessayer, ou revenir à
        l&apos;accueil.
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={reset} variant="secondary">
          Réessayer
        </Button>
        <Button href="/">Retour à l&apos;accueil</Button>
      </div>
    </Container>
  );
}
