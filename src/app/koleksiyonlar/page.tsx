import { CollectionGrid } from "@/components/home/CollectionGrid";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function CollectionsPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-14 px-4 py-10 md:px-6 md:py-14">
      <CollectionGrid />
      <ProductGrid title="Koleksiyon Ürünleri" description="Editör seçkilerinden öne çıkan parçalar." />
    </main>
  );
}
