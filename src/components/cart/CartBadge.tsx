"use client";

import { useCart } from "./CartProvider";

export function CartBadge() {
  const { totalItems } = useCart();

  return (
    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
      {totalItems}
    </span>
  );
}
