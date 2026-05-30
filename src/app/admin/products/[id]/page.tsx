import { ProductForm } from "@/components/admin/ProductForm";
import { getServerProductById } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getServerProductById(id);

  return (
    <div className="grid max-w-3xl gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Ürün Düzenle: {product?.name ?? id}
        </h1>
        <p className="text-sm text-neutral-500">Ürün bilgilerini, stok ve fiyat alanlarını güncelle.</p>
      </div>
      <ProductForm product={product} productId={id} />
    </div>
  );
}
