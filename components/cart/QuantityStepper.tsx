"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 20,
  label,
}: {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label={`Diminuer la quantité de ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <span
        className="w-8 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
        aria-label={`Quantité de ${label} : ${quantity}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label={`Augmenter la quantité de ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
