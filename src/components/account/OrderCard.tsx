"use client";

import Link from "next/link";
import { orders as seededOrders } from "@/data/orders";
import { useOrders } from "@/components/orders/OrderProvider";
import { formatPrice } from "@/lib/utils";

export function OrderCard({ limit }: { limit?: number } = {}) {
  const { orders } = useOrders();
  // Use server orders when available; otherwise fall back to seededOrders.
  const visibleOrders = orders.length > 0 ? orders : seededOrders;

  if (visibleOrders.length === 0) {
    return (
      <div className="grid gap-4 rounded-lg border border-neutral-100 p-8 text-center">
        <h2 className="text-xl font-semibold text-black">Henüz sipariş yok</h2>
        <p className="text-sm text-neutral-500">İlk siparişini verdiğinde burada görünecek.</p>
        <Link href="/search" className="mx-auto rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  const slice = typeof limit === "number" ? visibleOrders.slice(0, limit) : visibleOrders;

  return (
    <div className="grid gap-4">
      {slice.map((order) => (
        <article key={order.id} className="grid gap-4 rounded-lg border border-neutral-100 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-medium text-black">Sipariş #{order.id}</h3>
              <p className="text-sm text-neutral-500">{order.date}</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-black">{order.status}</span>
          </div>
          <div className="grid gap-1 text-sm text-neutral-500">
            {order.items.map((item) => (
              <span key={`${order.id}-${item}`}>{item}</span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
            <span className="text-sm text-neutral-500">Toplam</span>
            <span className="font-semibold text-black">{formatPrice(order.total)}</span>
          </div>
        </article>
      ))}

      {typeof limit === "number" && visibleOrders.length > limit && (
        <div className="text-center">
          <Link href="/account/orders" className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-black">
            Tüm siparişleri gör
          </Link>
        </div>
      )}
    </div>
  );
}
