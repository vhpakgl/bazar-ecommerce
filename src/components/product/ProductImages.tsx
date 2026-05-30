"use client";

import { useState } from "react";
import type { Product } from "@/data/products";

type ProductImagesProps = {
  product: Product;
};

export function ProductImages({ product }: ProductImagesProps) {
  const images = product.images?.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="grid gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url(${activeImage})` }} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.slice(0, 3).map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative aspect-square overflow-hidden rounded-md bg-neutral-100 ${activeImage === image ? "ring-2 ring-black ring-offset-2" : ""}`}
            aria-label="Ürün görselini değiştir"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${image})` }} />
          </button>
        ))}
      </div>
    </section>
  );
}
