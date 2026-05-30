"use client";

import { CreditCard, Home, Truck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { useOrders } from "@/components/orders/OrderProvider";
import { Input } from "@/components/ui/Input";

const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "district"] as const;

type RequiredField = (typeof requiredFields)[number];

export function CheckoutForm() {
  const router = useRouter();
  const { totalItems, clearCart, lines, subtotal } = useCart();
  const { createOrder } = useOrders();
  const [errors, setErrors] = useState<Partial<Record<RequiredField | "agreement", string>>>({});
  const [payment, setPayment] = useState("card");
  const [delivery, setDelivery] = useState("standard");
  const [agreement, setAgreement] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Partial<Record<RequiredField | "agreement", string>> = {};

    requiredFields.forEach((field) => {
      if (!String(form.get(field) ?? "").trim()) nextErrors[field] = "Bu alan zorunlu.";
    });

    if (!agreement) nextErrors.agreement = "Mesafeli satış sözleşmesini onaylamalısın.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || totalItems === 0) return;

    const shipping = subtotal > 0 && subtotal < 1500 ? 79 : 0;
    await createOrder({ lines, subtotal, shipping });
    clearCart();
    router.push("/order-success");
  }

  return (
    <form className="grid gap-8" onSubmit={onSubmit}>
      <section className="grid gap-4 rounded-lg border border-neutral-100 p-5">
        <div className="flex items-center gap-2">
          <Home size={18} strokeWidth={1.6} />
          <h2 className="text-lg font-semibold text-black">Teslimat Bilgileri</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="firstName" placeholder="Ad" error={errors.firstName} />
          <Field name="lastName" placeholder="Soyad" error={errors.lastName} />
          <Field name="email" type="email" placeholder="E-posta" error={errors.email} />
          <Field name="phone" placeholder="Telefon" error={errors.phone} />
        </div>
        <Field name="address" placeholder="Adres" error={errors.address} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="city" placeholder="İl" error={errors.city} />
          <Field name="district" placeholder="İlçe" error={errors.district} />
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-neutral-100 p-5">
        <div className="flex items-center gap-2">
          <Truck size={18} strokeWidth={1.6} />
          <h2 className="text-lg font-semibold text-black">Teslimat Yöntemi</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice
            active={delivery === "standard"}
            title="Standart Teslimat"
            text="2-4 iş günü"
            onClick={() => setDelivery("standard")}
          />
          <Choice
            active={delivery === "fast"}
            title="Hızlı Teslimat"
            text="Ertesi iş günü"
            onClick={() => setDelivery("fast")}
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-neutral-100 p-5">
        <div className="flex items-center gap-2">
          <CreditCard size={18} strokeWidth={1.6} />
          <h2 className="text-lg font-semibold text-black">Ödeme</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice active={payment === "card"} title="Kredi / Banka Kartı" text="Visa, Mastercard, Troy" onClick={() => setPayment("card")} />
          <Choice active={payment === "transfer"} title="Havale / EFT" text="Sipariş sonrası bilgi" onClick={() => setPayment("transfer")} />
        </div>
        {payment === "card" ? (
          <div className="grid gap-3">
            <Input name="cardName" placeholder="Kart üzerindeki isim" />
            <Input name="cardNumber" placeholder="Kart numarası" inputMode="numeric" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input name="expiry" placeholder="AA/YY" />
              <Input name="cvv" placeholder="CVV" inputMode="numeric" />
            </div>
          </div>
        ) : null}

        <label className="flex items-start gap-3 text-sm text-neutral-500">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(event) => setAgreement(event.target.checked)}
            className="mt-1"
          />
          <span>Mesafeli satış sözleşmesini ve ön bilgilendirme formunu okudum, onaylıyorum.</span>
        </label>
        {errors.agreement ? <p className="text-xs text-red-600">{errors.agreement}</p> : null}

        <button
          type="submit"
          disabled={totalItems === 0}
          className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          Siparişi Tamamla
        </button>
      </section>
    </form>
  );
}

type FieldProps = {
  name: RequiredField;
  placeholder: string;
  type?: string;
  error?: string;
};

function Field({ name, placeholder, type = "text", error }: FieldProps) {
  return (
    <label className="grid gap-1">
      <Input name={name} type={type} placeholder={placeholder} className={error ? "border-red-300" : ""} />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

function Choice({ active, title, text, onClick }: { active: boolean; title: string; text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid gap-1 rounded-lg border p-4 text-left transition-colors ${
        active ? "border-black bg-black text-white" : "border-neutral-100 text-black hover:border-black"
      }`}
    >
      <span className="text-sm font-semibold">{title}</span>
      <span className={active ? "text-xs text-white/70" : "text-xs text-neutral-500"}>{text}</span>
    </button>
  );
}
