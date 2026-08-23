import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-16">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-surface-2" />
        ))}
      </div>
      <span className="sr-only">Chargement…</span>
    </Container>
  );
}
