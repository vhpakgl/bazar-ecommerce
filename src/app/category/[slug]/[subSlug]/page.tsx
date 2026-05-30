import { notFound } from "next/navigation";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getServerCategoryBySlug, getServerProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

const subcategoryTitles: Record<string, string> = {
  elbise: "Elbise",
  tisort: "Tişört",
  gomlek: "Gömlek",
  pantolon: "Pantolon",
  jean: "Jean",
  etek: "Etek",
  kazak: "Kazak",
  sweatshirt: "Sweatshirt",
  "mont-ceket": "Mont / Ceket",
  sneaker: "Sneaker",
  bot: "Bot",
  topuklu: "Topuklu",
  sandalet: "Sandalet",
  terlik: "Terlik",
  canta: "Çanta",
  saat: "Saat",
  gozluk: "Gözlük",
  taki: "Takı",
  "sapka-bere": "Şapka / Bere",
  kemer: "Kemer",
  cuzdan: "Cüzdan",
  parfum: "Parfüm",
};

export default async function SubCategoryPage({ params }: { params: Promise<{ slug: string; subSlug: string }> }) {
  const { slug, subSlug } = await params;
  const category = await getServerCategoryBySlug(slug);

  if (!category) notFound();

  const products = await getServerProducts({ category: slug, subcategory: subSlug });
  const subcategoryTitle = subcategoryTitles[subSlug] ?? subSlug;

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <ProductFilters />
      <ProductGrid
        title={`${category.name} / ${subcategoryTitle}`}
        description={`${subcategoryTitle} alt kategorisindeki ürünleri inceliyorsun.`}
        products={products}
      />
    </main>
  );
}
