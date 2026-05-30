import { AddressCard } from "@/components/account/AddressCard";

export function AddressBook() {
  return (
    <section className="grid content-start gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Adreslerim</h1>
          <p className="text-sm text-neutral-500">Teslimat adreslerini yönet.</p>
        </div>
        <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">Yeni Adres</button>
      </div>
      <AddressCard />
    </section>
  );
}
