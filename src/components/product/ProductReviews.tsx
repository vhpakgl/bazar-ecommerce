import { Star } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews ?? [];

  return (
    <section className="grid gap-5 border-t border-neutral-100 pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black">Yorumlar</h2>
          <p className="mt-1 text-sm text-neutral-500">{product.reviewCount ?? reviews.length} değerlendirme içinde ortalama {product.rating}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-black">
          <Star size={14} className="fill-black text-black" />
          {product.rating}
        </span>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={`${review.author}-${review.date}`} className="grid gap-3 rounded-lg border border-neutral-100 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-black">{review.author}</h3>
                  <p className="text-xs text-neutral-400">{review.date}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
                  <Star size={13} className="fill-black text-black" />
                  {review.rating}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-500">{review.comment}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-100 p-5 text-sm text-neutral-500">Bu ürün için henüz yorum yok.</div>
      )}
    </section>
  );
}
