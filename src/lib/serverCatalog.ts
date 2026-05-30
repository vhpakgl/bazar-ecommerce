import type { ProductQuery } from "@/lib/catalog";
import type { Product } from "@/data/products";
import { readDb } from "@/lib/serverDb";

export async function getServerCategories() {
  const db = await readDb();
  return db.categories;
}

export async function getServerCategoryBySlug(slug: string) {
  const db = await readDb();
  return db.categories.find((category) => category.slug === slug);
}

export async function getServerProductById(id: string) {
  const db = await readDb();
  return db.products.find((product) => product.id === id);
}

export async function getServerProductBySlug(slug: string) {
  const db = await readDb();
  return db.products.find((product) => product.slug === slug);
}

export async function getServerProducts(query: ProductQuery = {}) {
  const db = await readDb();
  return filterProducts(db.products, query);
}

export async function getServerRelatedProducts(product: Product, limit = 4) {
  const db = await readDb();
  return db.products
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

function filterProducts(products: Product[], query: ProductQuery) {
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

  if (query.limit) result = result.slice(0, query.limit);
  return result;
}
