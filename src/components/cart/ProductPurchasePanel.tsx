"use client";

import { Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import type { Product } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [color, setColor] = useState(product.colors.length > 0 ? product.colors[0] : ""); // Safely access first element
  const [size, setSize] = useState(product.sizes.length > 0 ? product.sizes[0] : ""); // Safely access first element
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = Math.max(1, product.stock);

  return (
    <div className="grid gap-6 rounded-lg border border-neutral-100 p-5">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Renk</span>
          <span className="text-xs text-neutral-400">Seçili: {color}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                color === item ? "border-black bg-black text-white" : "border-neutral-200 hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Beden</span>
          <SizeGuideModal />
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSize(item)}
              className={`h-10 min-w-10 rounded-full border px-3 text-sm transition-colors ${
                size === item ? "border-black bg-black text-white" : "border-neutral-200 hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex h-11 items-center rounded-full border border-neutral-200">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center disabled:text-neutral-300"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Adedi azalt"
          >
            <Minus size={15} strokeWidth={1.6} />
          </button>
          <span className="min-w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center disabled:text-neutral-300"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            aria-label="Adedi artır"
          >
            <Plus size={15} strokeWidth={1.6} />
          </button>
        </div>
        <span className={`text-sm ${product.stock <= 5 ? "text-red-600" : "text-neutral-500"}`}>
          {product.stock > 0 ? `${product.stock} adet stokta` : "Stokta yok"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <AddToCartButton
          product={product}
          size={size}
          color={color}
          quantity={quantity}
          className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
        />
        <FavoriteButton
          product={product}
          showLabel
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        />
      </div>

      <div className="grid gap-2 rounded-md bg-neutral-50 p-4 text-sm text-neutral-600">
        <span className="inline-flex items-center gap-2 font-medium text-black">
          <Truck size={16} strokeWidth={1.6} />
          Bugün verilen siparişler 24 saat içinde kargoda
        </span>
        <span>14 gün kolay iade, güvenli ödeme ve tüm siparişlerde kargo takibi.</span>
      </div>
    </div>
  );
}
