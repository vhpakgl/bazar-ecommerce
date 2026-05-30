"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_LIMIT = 1500;

export function OrderSummary() {
  const { lines, subtotal } = useCart();
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_LIMIT ? 79 : 0;
  const total = subtotal + shipping;

  return (
    <aside className="grid content-start gap-5 rounded-lg border border-neutral-100 p-5">
      <h2 className="text-lg font-semibold text-black">Sipariş Özeti</h2>
      {lines.length > 0 ? (
        <div className="grid gap-4">
          {lines.map((line) => (
            <div key={`${line.productId}-${line.size}-${line.color}`} className="grid grid-cols-[56px_1fr_auto] gap-3 text-sm">
              <Link href={`/product/${line.product.slug}`} className="relative aspect-square overflow-hidden rounded-md bg-neutral-100">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${line.product.image})` }} />
              </Link>
              <div className="grid gap-1">
                <span className="font-medium text-black">{line.product.name}</span>
                <span className="text-xs text-neutral-400">
                  {line.quantity} adet{line.size ? ` / ${line.size}` : ""}{line.color ? ` / ${line.color}` : ""}
                </span>
              </div>
              <span className="font-medium text-black">{formatPrice(line.product.price * line.quantity)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
          Sepetin boş.
          <Link href="/search" className="font-medium text-black underline underline-offset-4">
            Ürünlere dön
          </Link>
        </div>
      )}
      <div className="grid gap-3 border-t border-neutral-100 pt-4 text-sm">
        <SummaryRow label="Ara toplam" value={formatPrice(subtotal)} />
        <SummaryRow label="Kargo" value={subtotal > 0 ? (shipping === 0 ? "Ücretsiz" : formatPrice(shipping)) : "-"} />
        <SummaryRow label="Toplam" value={formatPrice(total)} strong />
      </div>
    </aside>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "font-semibold text-black" : "text-neutral-500"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
