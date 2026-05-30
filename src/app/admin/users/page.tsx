import { AdminUsersTable } from "@/components/admin/AdminUsersTable";

export default function AdminUsersPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Kullanıcılar</h1>
        <p className="text-sm text-neutral-500">Müşteri ve yönetici hesaplarını görüntüle.</p>
      </div>
      <AdminUsersTable />
    </div>
  );
}
