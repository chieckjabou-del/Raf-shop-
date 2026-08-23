import Link from "next/link";
import { CATEGORY_LABELS, type ProductCategory } from "@/lib/types";
import { cn } from "@/lib/cn";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <nav aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
      <Link
        href="/boutique"
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !active
            ? "border-accent bg-accent-soft text-accent"
            : "border-border text-muted hover:text-foreground",
        )}
        aria-current={!active ? "true" : undefined}
      >
        Tous les produits
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/boutique?categorie=${category}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === category
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-muted hover:text-foreground",
          )}
          aria-current={active === category ? "true" : undefined}
        >
          {CATEGORY_LABELS[category]}
        </Link>
      ))}
    </nav>
  );
}
