import { notFound } from "next/navigation";
import { ProductImages } from "@/components/product/ProductImages";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductReviews } from "@/components/product/ProductReviews";
import { getServerProductBySlug, getServerRelatedProducts } from "@/lib/serverCatalog";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getServerProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = await getServerRelatedProducts(product);

  return (
    <main className="mx-auto grid max-w-7xl gap-14 px-4 py-10 md:px-6 md:py-14">
      <section className="grid gap-10 md:grid-cols-[1.05fr_.95fr]">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </section>
      <ProductReviews product={product} />
      <ProductGrid title="Benzer Ürünler" description="Kategori, renk, beden ve koleksiyon benzerliğine göre önerildi." products={relatedProducts} />
    </main>
  );
}
