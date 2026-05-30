import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import { ProductPurchasePanel } from "@/components/cart/ProductPurchasePanel";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

type ProductInfoProps = {
  product?: Product;
};

const detailRows = [
  { title: "Teslimat", text: "Saat 15:00'e kadar verilen siparişler aynı gün hazırlanır." },
  { title: "İade", text: "Kullanılmamış ürünlerde 14 gün içinde kolay iade." },
  { title: "Bakım", text: "Benzer renklerle düşük ısıda yıkayın, tersten ütüleyin." },
];

export function ProductInfo({ product }: ProductInfoProps) {
  if (!product) {
    return (
      <section className="grid gap-4 rounded-lg border border-neutral-100 p-6">
        <h1 className="text-2xl font-semibold">Ürün bulunamadı</h1>
        <p className="text-sm text-neutral-500">Aradığın ürün kaldırılmış ya da bağlantı değişmiş olabilir.</p>
        <Link href="/search" className="w-fit rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
          Ürünlere Dön
        </Link>
      </section>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  return (
    <section className="grid content-start gap-6">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {product.label ? (
            <span className="w-fit rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">{product.label}</span>
          ) : null}
          {discount ? (
            <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600">%{discount} indirim</span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600">
            <Star size={12} className="fill-black text-black" />
            {product.rating}
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">{product.name}</h1>
        <div className="flex items-end gap-3">
          <span className="text-2xl font-semibold text-black">{formatPrice(product.price)}</span>
          {product.oldPrice ? <span className="pb-1 text-sm text-neutral-400 line-through">{formatPrice(product.oldPrice)}</span> : null}
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-500">{product.description}</p>
      </div>

      <ProductPurchasePanel product={product} />

      <div className="grid gap-3 border-t border-neutral-100 pt-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-black">
          <ShieldCheck size={17} strokeWidth={1.6} />
          Orijinal ürün ve güvenli ödeme garantisi
        </div>
        {product.stock <= 5 ? (
          <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-600">
            Stok uyarısı: Bu üründen sadece {product.stock} adet kaldı.
          </div>
        ) : null}
        <div className="rounded-md bg-neutral-50 p-3 text-sm text-neutral-600">
          Tahmini teslimat: 2-4 iş günü. Bugün verilen siparişler yarın kargoya teslim edilir.
        </div>
        {product.material ? <p className="text-sm text-neutral-500">Materyal: {product.material}</p> : null}
        <div className="grid gap-3">
          {detailRows.map((row) => (
            <details key={row.title} className="group rounded-lg border border-neutral-100 px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-medium text-black">{row.title}</summary>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{row.text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
