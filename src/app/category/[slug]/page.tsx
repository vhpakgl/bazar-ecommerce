import { notFound } from "next/navigation";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getServerCategoryBySlug, getServerProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getServerCategoryBySlug(slug);

  if (!category) notFound();

  const products = await getServerProducts({ category: slug });

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <ProductFilters />
      <ProductGrid title={category.name} description={category.description} products={products} />
    </main>
  );
}
