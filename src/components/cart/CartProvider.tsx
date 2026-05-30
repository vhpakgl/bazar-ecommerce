"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { getProductById } from "@/lib/catalog";

const CART_STORAGE_KEY = "bazar-commerce-cart";

export type CartLine = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type CartLineWithProduct = CartLine & {
  product: Product;
};

type AddToCartOptions = {
  size?: string;
  color?: string;
  quantity?: number;
};

type CartContextValue = {
  lines: CartLineWithProduct[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, options?: AddToCartOptions) => void;
  removeItem: (lineKey: string) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  clearCart: () => void;
  getLineKey: (line: Pick<CartLine, "productId" | "size" | "color">) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem(CART_STORAGE_KEY);
        setCart(saved ? (JSON.parse(saved) as CartLine[]) : []);
      } catch {
        setCart([]);
      } finally {
        setLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const getLineKey = (line: Pick<CartLine, "productId" | "size" | "color">) =>
    [line.productId, line.size ?? "", line.color ?? ""].join("|");

  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProductById(line.productId);
          return product ? { ...line, product } : null;
        })
        .filter((line): line is CartLineWithProduct => Boolean(line)),
    [cart],
  );

  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function addItem(product: Product, options: AddToCartOptions = {}) {
    const requestedQuantity = Math.max(1, options.quantity ?? 1);
    const nextLine: CartLine = {
      productId: product.id,
      quantity: requestedQuantity,
      size: options.size ?? product.sizes[0],
      color: options.color ?? product.colors[0],
    };
    const nextKey = getLineKey(nextLine);

    setCart((current) => {
      const existing = current.find((line) => getLineKey(line) === nextKey);
      if (existing) {
        return current.map((line) =>
          getLineKey(line) === nextKey
            ? { ...line, quantity: Math.min(product.stock, line.quantity + nextLine.quantity) }
            : line,
        );
      }
      return [...current, nextLine];
    });
  }

  function removeItem(lineKey: string) {
    setCart((current) => current.filter((line) => getLineKey(line) !== lineKey));
  }

  function updateQuantity(lineKey: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(lineKey);
      return;
    }

    setCart((current) =>
      current.map((line) => {
        if (getLineKey(line) !== lineKey) return line;
        const product = getProductById(line.productId);
        return { ...line, quantity: Math.min(product?.stock ?? quantity, quantity) };
      }),
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ lines, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart, getLineKey }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
