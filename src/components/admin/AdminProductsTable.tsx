"use client";

import { Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export async function getSavedAdminProducts() {
  const response = await fetch("/api/products");
  if (!response.ok) return [];
  return (await response.json()) as Product[];
}

export async function saveAdminProduct(product: Product) {
  try {
    const response = await fetch(product.id ? `/api/products/${product.id}` : "/api/products", {
      method: product.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (response.status === 404) {
      // If PATCH fails with 404, try POST (create new product)
      const createResponse = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!createResponse.ok) throw new Error("Ürün kaydedilemedi.");
      return (await createResponse.json()) as Product;
    }

    if (!response.ok) throw new Error("Ürün kaydedilemedi.");
    return (await response.json()) as Product;
  } catch (error) {
    console.error("saveAdminProduct error:", error);
    throw new Error("Ürün kaydedilirken bir hata oluştu.");
  }
}

export async function deleteAdminProduct(productId: string) {
  try {
    const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Ürün silinemedi.");
  } catch (error) {
    console.error("deleteAdminProduct error:", error);
    throw new Error("Ürün silinirken bir hata oluştu.");
  }
}

export function AdminProductsTable({ products }: { products: Product[] }) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [query, setQuery] = useState("");

  const refresh = useCallback(async () => {
    const apiProducts = await getSavedAdminProducts();
    setVisibleProducts(apiProducts); // Show only API products, not fallback to initial prop
  }, []); // refresh should not depend on 'products' prop, as it fetches fresh data

  useEffect(() => {
    void refresh(); // No need for queueMicrotask
  }, [refresh]);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("tr-TR");
    if (!search) return visibleProducts;
    return visibleProducts.filter((product) =>
      [product.name, product.category, product.label].filter(Boolean).join(" ").toLocaleLowerCase("tr-TR").includes(search),
    );
  }, [query, visibleProducts]);

  const lowStock = visibleProducts.filter((product) => product.stock <= 5).length;
  const activeCount = visibleProducts.filter((product) => product.stock > 0).length;
  const inventoryValue = visibleProducts.reduce((sum, product) => sum + product.price * product.stock, 0);

  async function onDelete(productId: string) {
    await deleteAdminProduct(productId);
    await refresh();
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Aktif Ürün" value={String(activeCount)} />
        <Metric label="Düşük Stok" value={String(lowStock)} tone={lowStock > 0 ? "danger" : "default"} />
        <Metric label="Stok Değeri" value={formatPrice(inventoryValue)} />
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-neutral-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-black">Ürün Envanteri</h2>
            <p className="text-sm text-neutral-500">API verisinden gelen ürünleri yönet.</p>
          </div>
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-full border border-neutral-200 px-3 sm:w-72">
            <Search size={15} strokeWidth={1.6} className="text-neutral-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ürün ara"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
              <tr>
                <th className="px-4 py-3">Ürün</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3 text-right">Fiyat</th>
                <th className="px-4 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-neutral-100">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-neutral-100">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                      </div>
                      <div className="grid gap-1">
                        <Link href={`/admin/products/${product.id}`} className="font-medium text-black hover:underline">
                          {product.name}
                        </Link>
                        <span className="text-xs text-neutral-400">{product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-neutral-500">{product.category}</td>
                  <td className="px-4 py-4 text-neutral-500">{product.stock}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.stock <= 5 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>
                      {product.stock <= 5 ? "Düşük Stok" : "Aktif"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-black">{formatPrice(product.price)}</td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => onDelete(product.id)} className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-red-600">
                      <Trash2 size={14} strokeWidth={1.6} />
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "danger" }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5">
      <span className="text-sm text-neutral-500">{label}</span>
      <p className={`mt-2 text-2xl font-semibold ${tone === "danger" ? "text-red-600" : "text-black"}`}>{value}</p>
    </article>
  );
}
