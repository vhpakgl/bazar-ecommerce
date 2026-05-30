"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  product: Product;
  size?: string;
  color?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
};

export function AddToCartButton({ product, size, color, quantity = 1, className, children }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      disabled={product.stock <= 0}
      onClick={() => {
        addItem(product, { size, color, quantity });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1300);
      }}
    >
      {product.stock <= 0 ? "Stokta Yok" : added ? "Sepete Eklendi" : children ?? "Sepete Ekle"}
    </button>
  );
}
