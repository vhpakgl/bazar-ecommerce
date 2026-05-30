"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useFavorites } from "./FavoritesProvider";

type FavoriteButtonProps = {
  product: Product;
  className?: string;
  showLabel?: boolean;
};

export function FavoriteButton({ product, className = "", showLabel = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      className={className}
      onClick={() => toggleFavorite(product)}
      aria-pressed={active}
      aria-label={active ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart size={16} strokeWidth={1.6} className={active ? "fill-black text-black" : ""} />
      {showLabel ? <span>{active ? "Favorilerden Çıkar" : "Favorilere Ekle"}</span> : null}
    </button>
  );
}
