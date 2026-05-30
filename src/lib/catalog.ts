import { categories } from "@/data/categories";
import { products, type Product } from "@/data/products";

export type ProductVariant = "all" | "new" | "best" | "discount";

export type ProductQuery = {
  category?: string;
  subcategory?: string;
  variant?: ProductVariant;
  q?: string;
  min?: number;
  max?: number;
  size?: string;
  color?: string;
  collection?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "rating";
  inStock?: boolean;
  discounted?: boolean;
  limit?: number;
};

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProducts(query: ProductQuery = {}) {
  const variant = query.variant ?? "all";
  const search = query.q?.trim().toLocaleLowerCase("tr-TR");

  let result = products.filter((product) => {
    if (query.category && product.category !== query.category) return false;
    if (query.subcategory && product.subcategory !== query.subcategory) return false;
    if (query.collection && product.collection !== query.collection) return false;
    if (variant === "new" && !product.isNew) return false;
    if (variant === "best" && !product.isBestSeller) return false;
    if (variant === "discount" && !product.isDiscounted) return false;
    if (query.discounted && !product.isDiscounted) return false;
    if (query.inStock && product.stock <= 0) return false;
    if (query.min && product.price < query.min) return false;
    if (query.max && product.price > query.max) return false;
    if (query.size && !product.sizes.includes(query.size)) return false;
    if (query.color && !product.colors.includes(query.color)) return false;
    if (search) {
      const haystack = [product.name, product.description, product.category, product.label]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      if (!haystack.includes(search)) return false;
    }

    return true;
  });

  result = [...result].sort((a, b) => {
    if (query.sort === "price-asc") return a.price - b.price;
    if (query.sort === "price-desc") return b.price - a.price;
    if (query.sort === "rating") return b.rating - a.rating;
    if (query.sort === "newest") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    return 0;
  });

  if (query.limit) {
    result = result.slice(0, query.limit);
  }

  return result;
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.id !== product.id)
    .map((item) => ({
      product: item,
      score:
        (item.category === product.category ? 4 : 0) +
        item.colors.filter((color) => product.colors.includes(color)).length +
        item.sizes.filter((size) => product.sizes.includes(size)).length +
        (item.collection && item.collection === product.collection ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .map((item) => item.product)
    .slice(0, limit);
}

export function getAvailableColors() {
  return Array.from(new Set(products.flatMap((product) => product.colors))).sort((a, b) => a.localeCompare(b, "tr-TR"));
}

export function getAvailableSizes() {
  return Array.from(new Set(products.flatMap((product) => product.sizes))).sort((a, b) => a.localeCompare(b, "tr-TR"));
}
