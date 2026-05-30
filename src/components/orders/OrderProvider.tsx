"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartLineWithProduct } from "@/components/cart/CartProvider";
import type { Order } from "@/data/orders";

type CreateOrderInput = {
  lines: CartLineWithProduct[];
  subtotal: number;
  shipping: number;
};

type OrderContextValue = {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Promise<Order>;
  refreshOrders: () => Promise<void>;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  async function refreshOrders() {
    const response = await fetch("/api/orders");
    if (!response.ok) return;
    setOrders((await response.json()) as Order[]);
  }

  useEffect(() => {
    queueMicrotask(() => void refreshOrders());
  }, []);

  const value = useMemo<OrderContextValue>(
    () => ({
      orders,
      async createOrder(input) {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total: input.subtotal + input.shipping,
            items: input.lines.map((line) => `${line.product.name} x${line.quantity}`),
          }),
        });
        if (!response.ok) throw new Error("Sipariş oluşturulamadı.");
        const order = (await response.json()) as Order;
        setOrders((current) => [order, ...current]);
        return order;
      },
      refreshOrders,
    }),
    [orders],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used inside OrderProvider");
  return context;
}
