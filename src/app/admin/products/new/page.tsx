import { ProductForm } from "@/components/admin/ProductForm";

export default function NewAdminProductPage() {
  return (
    <div className="grid max-w-3xl gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Yeni Ürün</h1>
        <p className="text-sm text-neutral-500">Katalog için yeni ürün oluştur.</p>
      </div>
      <ProductForm />
    </div>
  );
}
