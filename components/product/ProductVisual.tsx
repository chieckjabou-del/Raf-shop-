import {
  Lamp,
  Keyboard,
  Smartphone,
  Headphones,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { ProductCategory } from "@/lib/types";
import { cn } from "@/lib/cn";

const CATEGORY_ICON: Record<ProductCategory, LucideIcon> = {
  "maison-connectee": Lamp,
  productivite: Keyboard,
  mobilite: Smartphone,
  "audio-video": Headphones,
  "bien-etre": Wind,
};

/**
 * Visuel produit DEMO — remplace une vraie photo produit tant qu'aucune
 * image fournisseur réelle n'est disponible. Voir GUIDE_DE_LANCEMENT.md
 * pour la procédure de remplacement par de vraies photos.
 */
export function ProductVisual({
  category,
  accent,
  className,
  iconSize = 64,
}: {
  category: ProductCategory;
  accent: string;
  className?: string;
  iconSize?: number;
}) {
  const Icon = CATEGORY_ICON[category];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-border",
        className,
      )}
      style={{
        background: `radial-gradient(120% 120% at 20% 15%, ${accent}33 0%, transparent 60%), linear-gradient(160deg, #0c0e14 0%, #05060a 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="flex items-center justify-center rounded-full border"
        style={{
          width: iconSize * 1.9,
          height: iconSize * 1.9,
          borderColor: `${accent}55`,
          background: `${accent}1a`,
        }}
      >
        <Icon size={iconSize} color={accent} strokeWidth={1.4} />
      </div>
      <span className="absolute right-3 top-3 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-warning">
        DEMO
      </span>
    </div>
  );
}
