import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderCard } from "@/components/account/OrderCard";

export default function AccountOrdersPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr] md:px-6 md:py-14">
      <AccountSidebar />
      <section className="grid content-start gap-5">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Siparişlerim</h1>
          <p className="text-sm text-neutral-500">Geçmiş ve aktif siparişlerini takip et.</p>
        </div>
        <OrderCard />
      </section>
    </main>
  );
}
