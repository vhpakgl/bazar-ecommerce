import { AdminCategoryManager } from "@/components/admin/AdminCategoryManager";
import { getServerCategories } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getServerCategories();

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Kategoriler</h1>
        <p className="text-sm text-neutral-500">Menü, vitrin ve listeleme kategorilerini yönet.</p>
      </div>
      <AdminCategoryManager categories={categories} />
    </div>
  );
}
