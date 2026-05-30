import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getServerProducts } from "@/lib/serverCatalog";

export const revalidate = 3600; // Sayfa 1 saat boyunca statik kalır, sunucu yükünü azaltır ve geçişleri hızlandırır.

export default async function BestSellersPage() {
  const products = await getServerProducts({ variant: "best" });

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <ProductFilters />
      <ProductGrid title="Çok Satanlar" description="En çok tercih edilen ürünler." products={products} />
    </main>
  );
}
