"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

export function CartItem() {
  const { lines, getLineKey, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="grid gap-5 rounded-lg border border-neutral-100 p-8 text-center">
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-black">Sepetin boş</h2>
          <p className="mx-auto max-w-md text-sm text-neutral-500">
            Ürünleri keşfet, beden ve renk seçimini yap, sepetin sayfa yenilense bile saklansın.
          </p>
        </div>
        <Link href="/search" className="mx-auto rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {lines.map((line) => {
        const lineKey = getLineKey(line);
        const reachedStock = line.quantity >= line.product.stock;

        return (
          <article key={lineKey} className="grid gap-4 rounded-lg border border-neutral-100 p-4 sm:grid-cols-[120px_1fr_auto]">
            <Link href={`/product/${line.product.slug}`} className="relative aspect-square overflow-hidden rounded-md bg-neutral-100">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: `url(${line.product.image})` }} />
            </Link>
            <div className="grid content-start gap-3">
              <div className="grid gap-1">
                <Link href={`/product/${line.product.slug}`} className="font-medium text-black hover:underline">
                  {line.product.name}
                </Link>
                <p className="text-sm text-neutral-500">
                  {line.color ? `Renk: ${line.color}` : null}
                  {line.color && line.size ? " / " : null}
                  {line.size ? `Beden: ${line.size}` : null}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex h-9 items-center rounded-full border border-neutral-200">
                  <button
                    className="flex h-9 w-9 items-center justify-center disabled:text-neutral-300"
                    onClick={() => updateQuantity(lineKey, line.quantity - 1)}
                    aria-label="Adedi azalt"
                  >
                    <Minus size={14} strokeWidth={1.6} />
                  </button>
                  <span className="min-w-7 text-center text-sm">{line.quantity}</span>
                  <button
                    className="flex h-9 w-9 items-center justify-center disabled:text-neutral-300"
                    disabled={reachedStock}
                    onClick={() => updateQuantity(lineKey, line.quantity + 1)}
                    aria-label="Adedi artır"
                  >
                    <Plus size={14} strokeWidth={1.6} />
                  </button>
                </div>
                {reachedStock ? <span className="text-xs text-red-600">Maksimum stok adedine ulaşıldı</span> : null}
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 sm:grid sm:justify-items-end">
              <span className="font-semibold text-black">{formatPrice(line.product.price * line.quantity)}</span>
              <button className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-black" onClick={() => removeItem(lineKey)}>
                <Trash2 size={14} strokeWidth={1.6} />
                Kaldır
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
