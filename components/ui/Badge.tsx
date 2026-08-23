import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "warning";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted border-border",
    accent: "bg-accent-soft text-accent border-accent/30",
    warning: "bg-warning/10 text-warning border-warning/30",
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

/** Explicit "démonstration" marker for mock catalog data — never remove without real supplier data. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge tone="warning" className={className}>
      DEMO — produit fictif
    </Badge>
  );
}
