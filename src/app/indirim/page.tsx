import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getServerProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function DiscountPage() {
  const products = await getServerProducts({ variant: "discount" });

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <ProductFilters />
      <ProductGrid title="İndirim" description="Fiyat avantajı olan seçili ürünler." products={products} />
    </main>
  );
}
