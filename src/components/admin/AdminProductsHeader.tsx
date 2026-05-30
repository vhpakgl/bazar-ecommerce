import { Plus } from "lucide-react";
import Link from "next/link";

export function AdminProductsHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Ürünler</h1>
        <p className="text-sm text-neutral-500">Ürün kataloğunu, stokları ve fiyatları yönet.</p>
      </div>
      <Link href="/admin/products/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
        <Plus size={16} strokeWidth={1.7} />
        Yeni Ürün
      </Link>
    </div>
  );
}
