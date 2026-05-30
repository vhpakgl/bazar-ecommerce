import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_360px] md:px-6 md:py-14">
      <section className="grid content-start gap-5">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Ödeme</h1>
          <p className="text-sm text-neutral-500">Teslimat ve ödeme bilgilerini tamamla.</p>
        </div>
        <CheckoutForm />
      </section>
      <OrderSummary />
    </main>
  );
}
