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
        background: `radial-gradient(120% 120% at 20% 15%, ${accent}1f 0%, transparent 60%), linear-gradient(160deg, #ffffff 0%, #fbf8f5 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="flex items-center justify-center rounded-full border"
        style={{
          width: iconSize * 1.9,
          height: iconSize * 1.9,
          borderColor: `${accent}40`,
          background: `${accent}17`,
        }}
      >
        <Icon size={iconSize} color={accent} strokeWidth={1.4} />
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold tracking-wide text-background">
        DEMO
      </span>
    </div>
  );
}
