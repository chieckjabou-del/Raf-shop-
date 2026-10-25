import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "warning" | "demo";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted border-border",
    accent: "bg-accent-soft text-accent border-accent/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    // Volontairement distinct de "accent" (orange de marque) pour qu'un
    // badge DEMO ne soit jamais confondu avec un badge promotionnel.
    demo: "bg-foreground text-background border-transparent",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Marque qu'un produit est réel (sourcé chez un fournisseur, prix validé)
 * mais que sa vraie photo n'est pas encore intégrée — ne jamais supprimer
 * avant qu'une vraie image remplace le visuel générique de ProductVisual.
 */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge tone="demo" className={className}>
      Photo à venir
    </Badge>
  );
}
