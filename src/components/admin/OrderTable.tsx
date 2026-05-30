"use client";

import { useState } from "react";
import { orders as seededOrders } from "@/data/orders";
import { useOrders } from "@/components/orders/OrderProvider";
import { formatPrice } from "@/lib/utils";

const statuses = ["Ödendi", "Hazırlanıyor", "Kargoda", "Teslim edildi", "İptal edildi"];

export function OrderTable() {
  const { orders } = useOrders();
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const visibleOrders = [...orders, ...seededOrders];

  async function onStatusChange(orderId: string, status: string) {
    setStatusMap((current) => ({ ...current, [orderId]: status }));
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Sipariş durumu güncellenemedi.");
    } catch (error) {
      console.error("Sipariş durumu güncellenirken hata oluştu:", error);
      alert("Sipariş durumu güncellenirken bir hata oluştu.");
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
          <tr>
            <th className="px-4 py-3">Sipariş</th>
            <th className="px-4 py-3">Tarih</th>
            <th className="px-4 py-3">Ürünler</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3 text-right">Toplam</th>
          </tr>
        </thead>
        <tbody>
          {visibleOrders.map((order) => (
            <tr key={order.id} className="border-t border-neutral-100">
              <td className="px-4 py-4 font-medium text-black">#{order.id}</td>
              <td className="px-4 py-4 text-neutral-500">{order.date}</td>
              <td className="px-4 py-4 text-neutral-500">{order.items.length} ürün</td>
              <td className="px-4 py-4">
                <select
                  value={statusMap[order.id] ?? order.status}
                  onChange={(event) => void onStatusChange(order.id, event.target.value)}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-black outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 text-right font-medium text-black">{formatPrice(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
