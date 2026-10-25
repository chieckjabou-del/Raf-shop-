import Image from "next/image";
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
 * Visuel produit : affiche la vraie vignette fournisseur quand `image`
 * est fourni (basse résolution, recadrée depuis le catalogue — badge
 * "Aperçu fournisseur"), sinon retombe sur l'icône générique de
 * catégorie (badge "Photo à venir"). Voir GUIDE_DE_LANCEMENT.md pour la
 * procédure de remplacement par une vraie photo haute définition.
 */
export function ProductVisual({
  category,
  accent,
  image,
  alt,
  className,
  iconSize = 64,
}: {
  category: ProductCategory;
  accent: string;
  image?: string;
  alt?: string;
  className?: string;
  iconSize?: number;
}) {
  const Icon = CATEGORY_ICON[category];

  if (image) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-white",
          className,
        )}
      >
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 1024px) 400px, 50vw"
          className="object-contain p-4"
        />
        <span className="absolute right-3 top-3 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold tracking-wide text-background">
          Aperçu fournisseur
        </span>
      </div>
    );
  }

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
        Photo à venir
      </span>
    </div>
  );
}
