"use client";

import { FormEvent, useEffect, useState } from "react"; // useRouter moved to top-level for clarity
import { useRouter } from "next/navigation"; // Moved here
import { z } from "zod";
import type { Product } from "@/data/products";
import { getSavedAdminProducts, saveAdminProduct } from "@/components/admin/AdminProductsTable";
import { Input } from "@/components/ui/Input";

const productSchema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  slug: z.string().min(2, "Slug en az 2 karakter olmalıdır"),
  category: z.string().min(1, "Kategori seçimi zorunludur"),
  subcategory: z.string().min(1, "Alt kategori zorunludur"),
  price: z.number().positive("Fiyat 0'dan büyük olmalıdır"),
  oldPrice: z.number().optional(),
  stock: z.number().int().min(0, "Stok negatif olamaz"),
  label: z.string().optional(),
  image: z.string().url("Geçerli bir URL giriniz").or(z.literal("")).optional(),
  description: z.string().optional(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
});

// Moved outside component to prevent re-creation on every render
function splitCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
type ProductFormProps = {
  product?: Product;
  productId?: string;
};

export function ProductForm({ product, productId }: ProductFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedProduct, setSavedProduct] = useState<Product | undefined>(product);
  const currentProduct = savedProduct ?? product;

  useEffect(() => {
    if (product || !productId) return;
    const loadProduct = async () => {
      const items = await getSavedAdminProducts();
      setSavedProduct(items.find((item) => item.id === productId));
    };
    void loadProduct();
  }, [product, productId]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rawData = {
      name: String(form.get("name") ?? "").trim(),
      slug: String(form.get("slug") ?? "").trim(),
      category: String(form.get("category") ?? "").trim(),
      subcategory: String(form.get("subcategory") ?? "").trim(),
      price: Number(form.get("price") || 0),
      oldPrice: Number(form.get("oldPrice") || 0),
      stock: Number(form.get("stock") || 0),
      label: String(form.get("label") ?? "").trim(),
      image: String(form.get("image") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      colors: splitCsv(String(form.get("colors") ?? "")),
      sizes: splitCsv(String(form.get("sizes") ?? "")),
    };

    const result = productSchema.safeParse(rawData);

    if (!result.success) {
      setMessage(result.error.issues[0].message); // 'errors' yerine 'issues' kullanımı sabitlendi
      return;
    }

    const validatedData = result.data;

    setIsLoading(true);
    try {
      await saveAdminProduct({
        id: currentProduct?.id ?? productId ?? "",
        ...validatedData,
        oldPrice: validatedData.oldPrice && validatedData.oldPrice > 0 ? validatedData.oldPrice : undefined,
        label: validatedData.label || undefined,
        image: validatedData.image || "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
        description: validatedData.description || currentProduct?.description || "Admin panelinden eklenen ürün açıklaması.",
        colors: validatedData.colors.length > 0 ? validatedData.colors : (currentProduct?.colors ?? ["Siyah", "Beyaz"]), // Provide default if empty
        sizes: validatedData.sizes.length > 0 ? validatedData.sizes : (currentProduct?.sizes ?? ["S", "M", "L"]), // Provide default if empty
        rating: currentProduct?.rating ?? 4.5, // Default rating
        reviewCount: currentProduct?.reviewCount ?? 0,
        reviews: currentProduct?.reviews ?? [],
        material: currentProduct?.material,
        isNew: currentProduct?.isNew ?? true,
        isBestSeller: currentProduct?.isBestSeller,
        isDiscounted: (validatedData.oldPrice ?? 0) > validatedData.price,
        collection: currentProduct?.collection,
      });
    } catch (error) {
      setMessage("Ürün kaydedilirken bir hata oluştu.");
      return;
    } finally {
      setIsLoading(false);
    }

    setMessage("Ürün kaydedildi. Vitrinde ve ürün listelerinde görünecek.");
    router.push("/admin/products");
  }

  return (
    <form key={currentProduct?.id ?? productId ?? "new"} className="grid gap-6 rounded-lg border border-neutral-200 bg-white p-5" onSubmit={onSubmit}>
      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-black">Temel Bilgiler</h2>
        <Input name="name" placeholder="Ürün adı" defaultValue={currentProduct?.name} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input name="slug" placeholder="Slug" defaultValue={currentProduct?.slug} />
          <Input name="category" placeholder="Kategori slug" defaultValue={currentProduct?.category} />
        </div>
        <Input name="subcategory" placeholder="Alt kategori slug: gomlek, tisort, sneaker" defaultValue={currentProduct?.subcategory} />
        <textarea
          name="description"
          placeholder="Ürün açıklaması"
          defaultValue={currentProduct?.description}
          className="min-h-32 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
        />
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-black">Fiyat ve Stok</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input name="price" placeholder="Fiyat" defaultValue={currentProduct?.price} />
          <Input name="oldPrice" placeholder="Eski fiyat" defaultValue={currentProduct?.oldPrice} />
          <Input name="stock" placeholder="Stok" defaultValue={currentProduct?.stock} />
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-black">Varyant ve Görsel</h2>
        <Input name="image" placeholder="Görsel URL" defaultValue={currentProduct?.image} />
        <div className="grid gap-3 sm:grid-cols-3">
          <Input name="colors" placeholder="Renkler: Siyah, Beyaz" defaultValue={currentProduct?.colors?.join(", ")} />
          <Input name="sizes" placeholder="Bedenler: S, M, L" defaultValue={currentProduct?.sizes?.join(", ")} />
          <Input name="label" placeholder="Etiket" defaultValue={currentProduct?.label} />
        </div>
      </section>

      {message ? <p className="text-sm text-neutral-500">{message}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button disabled={isLoading} className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50">
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button type="button" onClick={() => router.push("/admin/products")} className="rounded-full border border-neutral-300 px-7 py-3 text-sm font-medium text-black hover:border-black">
          Vazgeç
        </button>
      </div>
    </form>
  );
}
