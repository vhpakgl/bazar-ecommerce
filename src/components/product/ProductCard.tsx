import Link from "next/link";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <article className="group grid gap-3">
      <Link href={`/product/${product.slug}`} className="grid gap-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.label ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-black shadow-sm">
                {product.label}
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                %{discount}
              </span>
            ) : null}
          </div>
          <FavoriteButton
            product={product}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:bg-white"
          />
        </div>
        <div className="grid gap-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium tracking-tight text-black">{product.name}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
              <Star size={12} className="fill-black text-black" />
              {product.rating}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-black">{formatPrice(product.price)}</p>
            {product.oldPrice ? (
              <p className="text-xs text-neutral-400 line-through">{formatPrice(product.oldPrice)}</p>
            ) : null}
          </div>
        </div>
      </Link>
      <AddToCartButton
        product={product}
        className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black hover:text-white"
      >
        Sepete Ekle
      </AddToCartButton>
    </article>
  );
}
