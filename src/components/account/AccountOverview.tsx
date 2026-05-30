import { OrderCard } from "@/components/account/OrderCard";
import { AddressCard } from "@/components/account/AddressCard";

const stats = [
  { title: "Aktif Sipariş", value: "1" },
  { title: "Favori Ürün", value: "4" },
  { title: "Kayıtlı Adres", value: "1" },
];

export function AccountOverview() {
  return (
    <section className="grid content-start gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Hesabım</h1>
        <p className="text-sm text-neutral-500">Siparişlerin, adreslerin ve üyelik bilgilerin.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Stat key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-black">Son Siparişler</h2>
          <OrderCard limit={3} />
        </div>

        <aside className="grid gap-4">
          <h2 className="text-lg font-semibold text-black">Kayıtlı Adres</h2>
          <AddressCard />
          <div>
            <a href="/account/addresses" className="text-sm font-medium text-black hover:underline">
              Tüm adresleri yönet
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-100 p-5">
      <span className="text-sm text-neutral-500">{title}</span>
      <p className="mt-2 text-3xl font-semibold text-black">{value}</p>
    </div>
  );
}
