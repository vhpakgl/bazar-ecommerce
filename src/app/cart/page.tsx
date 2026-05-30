import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_360px] md:px-6 md:py-14">
      <section className="grid content-start gap-5">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Sepet</h1>
          <p className="text-sm text-neutral-500">Sepetindeki ürünleri kontrol et ve ödemeye geç.</p>
        </div>
        <CartItem />
      </section>
      <CartSummary />
    </main>
  );
}
