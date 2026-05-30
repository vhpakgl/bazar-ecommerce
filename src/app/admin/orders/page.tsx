import { OrderTable } from "@/components/admin/OrderTable";

export default function AdminOrdersPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Siparişler</h1>
        <p className="text-sm text-neutral-500">Sipariş durumlarını, ödeme ve kargo süreçlerini takip et.</p>
      </div>
      <OrderTable />
    </div>
  );
}
