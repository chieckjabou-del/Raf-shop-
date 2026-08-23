import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-foreground">404 — Page introuvable</h1>
      <p className="max-w-md text-muted">
        La page que vous cherchez n&apos;existe pas ou plus.
      </p>
      <div className="mt-2 flex gap-3">
        <Button href="/boutique">Voir la boutique</Button>
        <Button href="/" variant="secondary">
          Accueil
        </Button>
      </div>
    </Container>
  );
}
