"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useFavorites } from "./FavoritesProvider";

export function FavoritesClient() {
  const { products, clearFavorites } = useFavorites();

  if (products.length === 0) {
    return (
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 md:py-14">
        <section className="grid gap-4 rounded-lg border border-neutral-100 p-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Favorilerin boş</h1>
          <p className="mx-auto max-w-md text-sm text-neutral-500">
            Beğendiğin ürünleri favorilere ekleyerek daha sonra hızlıca ulaşabilirsin.
          </p>
          <Link href="/search" className="mx-auto rounded-full bg-black px-7 py-3 text-sm font-medium text-white">
            Ürünleri Keşfet
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 md:py-14">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Favoriler</h1>
          <p className="text-sm text-neutral-500">Kaydettiğin ürünleri burada yönet.</p>
        </div>
        <button className="text-sm text-neutral-400 hover:text-black" onClick={clearFavorites}>
          Favorileri Temizle
        </button>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
