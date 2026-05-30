import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductQuery } from "@/lib/catalog";
import { getServerCategoryBySlug, getServerProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  category?: string;
  subcategory?: string;
  variant?: ProductQuery["variant"];
  min?: string;
  max?: string;
  size?: string;
  color?: string;
  sort?: ProductQuery["sort"];
  inStock?: string;
  discounted?: string;
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  console.log("vahap", params);
  const min = params.min ? Number(params.min) : undefined;
  const max = params.max ? Number(params.max) : undefined;
  const category = params.category;
  const categoryName = category ? (await getServerCategoryBySlug(category))?.name : undefined;
  const products = await getServerProducts({
    q: params.q,
    category,
    subcategory: params.subcategory,
    variant: params.variant,
    min,
    max,
    size: params.size,
    color: params.color,
    sort: params.sort,
    inStock: params.inStock === "1",
    discounted: params.discounted === "1",
  });

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <ProductFilters />
      <ProductGrid
        title={params.q ? `"${params.q}" için sonuçlar` : categoryName ?? variantTitle(params.variant) ?? "Arama Sonuçları"}
        description={buildDescription(params, categoryName)}
        products={products}
      />
    </main>
  );
}

function buildDescription(params: SearchParams, categoryName?: string) {
  const active = [
    categoryName,
    variantTitle(params.variant),
    params.size ? `${params.size} beden` : null,
    params.color ? `${params.color} renk` : null,
    params.discounted === "1" ? "indirimdekiler" : null,
    params.inStock === "1" ? "stokta olanlar" : null,
  ].filter(Boolean);

  return active.length > 0
    ? `${active.join(", ")} filtreleriyle listeleniyor.`
    : "Ürünleri kategori, beden, renk, fiyat ve stok seçenekleriyle incele.";
}

function variantTitle(variant?: ProductQuery["variant"]) {
  if (variant === "new") return "Yeni Gelenler";
  if (variant === "best") return "Çok Satanlar";
  if (variant === "discount") return "İndirim";
  return undefined;
}
