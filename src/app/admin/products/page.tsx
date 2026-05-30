import { AdminProductsHeader } from "@/components/admin/AdminProductsHeader";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { getServerProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getServerProducts();

  return (
    <div className="grid gap-6">
      <AdminProductsHeader />
      <AdminProductsTable products={products} />
    </div>
  );
}
