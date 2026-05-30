"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { getProductById } from "@/lib/catalog";

const FAVORITES_STORAGE_KEY = "bazar-commerce-favorites";

type FavoritesContextValue = {
  productIds: string[];
  products: Product[];
  totalFavorites: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  const products = useMemo(
    () => productIds.map((id) => getProductById(id)).filter((product): product is Product => Boolean(product)),
    [productIds],
  );

  function isFavorite(productId: string) {
    return productIds.includes(productId);
  }

  function toggleFavorite(product: Product) {
    setProductIds((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    );
  }

  function clearFavorites() {
    setProductIds([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        productIds,
        products,
        totalFavorites: productIds.length,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
