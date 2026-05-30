"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

export function CheckoutSubmitButton() {
  const router = useRouter();
  const { totalItems, clearCart } = useCart();

  return (
    <button
      type="button"
      disabled={totalItems === 0}
      className={`rounded-full px-7 py-3 text-sm font-medium ${
        totalItems === 0
          ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
          : "bg-black text-white hover:bg-neutral-800"
      }`}
      onClick={() => {
        clearCart();
        router.push("/order-success");
      }}
    >
      Siparişi Tamamla
    </button>
  );
}
