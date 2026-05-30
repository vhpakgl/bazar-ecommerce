"use client";

import { Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_LIMIT = 1500;

export function CartSummary() {
  const { subtotal, totalItems, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const couponActive = coupon.trim().toLocaleUpperCase("tr-TR") === "BAZAR10";
  const discount = couponActive ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_LIMIT ? 79 : 0;
  const total = Math.max(0, subtotal - discount + shipping);
  const disabled = totalItems === 0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_LIMIT) * 100));

  return (
    <aside className="grid content-start gap-5 rounded-lg border border-neutral-100 p-5">
      <h2 className="text-lg font-semibold text-black">Sepet Özeti</h2>

      <div className="grid gap-2 rounded-md bg-neutral-50 p-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-black" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-neutral-500">
          {remainingForFreeShipping > 0
            ? `${formatPrice(remainingForFreeShipping)} daha ekle, kargo ücretsiz olsun.`
            : "Kargo ücretsiz."}
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Kupon Kodu</label>
        <div className="flex gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-neutral-200 px-3">
            <Tag size={15} strokeWidth={1.6} className="text-neutral-400" />
            <input
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="BAZAR10"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>
        {coupon && !couponActive ? <span className="text-xs text-red-600">Geçerli kupon: BAZAR10</span> : null}
      </div>

      <div className="grid gap-3 text-sm">
        <SummaryRow label="Ürün adedi" value={`${totalItems}`} />
        <SummaryRow label="Ara toplam" value={formatPrice(subtotal)} />
        <SummaryRow label="Kupon indirimi" value={discount > 0 ? `-${formatPrice(discount)}` : "-"} />
        <SummaryRow label="Kargo" value={subtotal > 0 ? (shipping === 0 ? "Ücretsiz" : formatPrice(shipping)) : "-"} />
        <div className="border-t border-neutral-100 pt-3">
          <SummaryRow label="Toplam" value={formatPrice(total)} strong />
        </div>
      </div>
      <Link
        href={disabled ? "/cart" : "/checkout"}
        className={`rounded-full px-6 py-3 text-center text-sm font-medium ${
          disabled ? "pointer-events-none bg-neutral-100 text-neutral-400" : "bg-black text-white hover:bg-neutral-800"
        }`}
      >
        Ödemeye Geç
      </Link>
      {totalItems > 0 ? (
        <button className="text-sm text-neutral-400 hover:text-black" onClick={clearCart}>
          Sepeti Temizle
        </button>
      ) : null}
    </aside>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

function SummaryRow({ label, value, strong }: SummaryRowProps) {
  return (
    <div className={`flex items-center justify-between ${strong ? "font-semibold text-black" : "text-neutral-500"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
