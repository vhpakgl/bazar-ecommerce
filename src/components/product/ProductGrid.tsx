import Link from "next/link";
import type { Product } from "@/data/products";
import { getProducts, type ProductVariant } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  title?: string;
  description?: string;
  variant?: ProductVariant;
  category?: string;
  q?: string;
  collection?: string;
  limit?: number;
  products?: Product[];
};

export function ProductGrid({
  title,
  description,
  variant = "all",
  category,
  q,
  collection,
  limit,
  products,
}: ProductGridProps) {
  const visibleProducts = products ?? getProducts({ variant, category, q, collection, limit });

  return (
    <section className="grid content-start gap-6">
      {title ? (
        <header className="flex items-end justify-between gap-6">
          <div className="grid gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">{title}</h2>
            {description ? <p className="max-w-xl text-sm text-neutral-500">{description}</p> : null}
          </div>
          <span className="hidden text-sm text-neutral-400 sm:block">{visibleProducts.length} ürün</span>
        </header>
      ) : null}
      {visibleProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 rounded-lg border border-neutral-100 bg-white p-8 text-center">
          <h3 className="text-xl font-semibold tracking-tight text-black">Ürün bulunamadı</h3>
          <p className="mx-auto max-w-md text-sm text-neutral-500">
            Seçili filtrelere uygun ürün yok. Filtreleri azaltarak ya da arama metnini değiştirerek tekrar dene.
          </p>
          <Link href="/search" className="mx-auto rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
            Filtreleri Temizle
          </Link>
        </div>
      )}
    </section>
  );
}
