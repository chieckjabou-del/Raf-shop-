import Link from "next/link";
import { CATEGORY_LABELS, type Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent/50"
    >
      <ProductVisual
        category={product.category}
        accent={product.accent}
        image={product.image}
        alt={product.name}
        className="aspect-square w-full"
        iconSize={48}
      />
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-4">
        <Badge tone="neutral" className="w-fit">
          {CATEGORY_LABELS[product.category]}
        </Badge>
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtPriceCents && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPriceCents)}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-xs font-medium text-danger">Rupture de stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
