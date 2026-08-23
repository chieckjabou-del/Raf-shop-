import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryFilter } from "@/components/product/CategoryFilter";
import { DemoBadge } from "@/components/ui/Badge";
import { products } from "@/lib/products";
import { CATEGORY_LABELS, type ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Le catalogue RAF Shop : une sélection restreinte de gadgets technologiques utiles, testés et expliqués.",
  alternates: { canonical: "/boutique" },
};

function isValidCategory(value: string | undefined): value is ProductCategory {
  return !!value && value in CATEGORY_LABELS;
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const activeCategory = isValidCategory(categorie) ? categorie : undefined;
  const visibleProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            La boutique
          </h1>
          <p className="mt-2 max-w-xl text-muted">
            {products.length} produits sélectionnés selon nos critères — pas un catalogue
            générique.
          </p>
        </div>
        <DemoBadge />
      </div>

      <div className="mt-8">
        <CategoryFilter active={activeCategory} />
      </div>

      {visibleProducts.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
