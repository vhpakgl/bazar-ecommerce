import { ArrowDownRight, ArrowUpRight, PackageCheck, ShoppingCart, Users, Wallet } from "lucide-react";

const stats = [
  { title: "Toplam Ciro", value: "124.500 TL", trend: "+12.4%", icon: Wallet, positive: true },
  { title: "Sipariş", value: "128", trend: "+8.1%", icon: ShoppingCart, positive: true },
  { title: "Ürün", value: "48", trend: "6 düşük stok", icon: PackageCheck, positive: false },
  { title: "Kullanıcı", value: "2.410", trend: "+4.8%", icon: Users, positive: true },
];

const recentOrders = [
  { code: "BZ-100482", customer: "Ayşe Yılmaz", total: "2.748 TL", status: "Hazırlanıyor" },
  { code: "BZ-100481", customer: "Mehmet Demir", total: "899 TL", status: "Kargoda" },
  { code: "BZ-100480", customer: "Elif Kaya", total: "4.196 TL", status: "Ödendi" },
];

export function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Genel Bakış</h1>
        <p className="text-sm text-neutral-500">Mağaza performansını, siparişleri ve operasyon durumunu takip et.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

          return (
            <article key={stat.title} className="grid gap-5 rounded-lg border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-neutral-500">{stat.title}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                  <Icon size={17} strokeWidth={1.7} />
                </span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold text-black">{stat.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${stat.positive ? "text-emerald-600" : "text-red-600"}`}>
                  <TrendIcon size={14} strokeWidth={1.7} />
                  {stat.trend}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <section className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-black">Son Siparişler</h2>
          <span className="text-xs font-medium text-neutral-400">Canlı demo veri</span>
        </div>
        <div className="overflow-hidden rounded-md border border-neutral-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
              <tr>
                <th className="px-4 py-3">Sipariş</th>
                <th className="px-4 py-3">Müşteri</th>
                <th className="px-4 py-3">Tutar</th>
                <th className="px-4 py-3">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.code} className="border-t border-neutral-100">
                  <td className="px-4 py-4 font-medium text-black">{order.code}</td>
                  <td className="px-4 py-4 text-neutral-500">{order.customer}</td>
                  <td className="px-4 py-4 text-neutral-500">{order.total}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-black">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
