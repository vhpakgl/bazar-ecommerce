import { Check } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const orderNumber = "BZ-DEMO-100482";

  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-xl content-center gap-6 px-4 py-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
        <Check size={26} strokeWidth={1.8} />
      </span>
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Siparişiniz alındı</h1>
        <p className="text-neutral-500">
          Sipariş numaranız <span className="font-medium text-black">{orderNumber}</span>. Durumu hesabınızdan takip edebilirsiniz.
        </p>
      </div>
      <div className="rounded-lg border border-neutral-100 p-4 text-sm text-neutral-500">
        Kargo hazırlık süreci başladığında e-posta ve SMS ile bilgilendirme yapılacaktır.
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/account/orders" className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white">
          Siparişlerime Git
        </Link>
        <Link href="/" className="rounded-full border border-black px-7 py-3 text-sm font-medium text-black">
          Ana Sayfa
        </Link>
      </div>
    </main>
  );
}
