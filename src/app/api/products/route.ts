import { readDb, writeDb } from "@/lib/serverDb";
import type { Product } from "@/data/products";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

export async function GET() {
  const db = await readDb();
  return Response.json(db.products);
}

export async function POST(request: Request) {
  const db = await readDb();
  const payload = (await request.json()) as Product;
  const product: Product = {
    ...payload,
    id: payload.id || `custom-${Date.now()}`,
    subcategory: payload.subcategory || slugify(payload.label ?? payload.name),
  };
  const exists = db.products.some((item) => item.id === product.id);
  const products = exists
    ? db.products.map((item) => (item.id === product.id ? product : item))
    : [product, ...db.products];

  await writeDb({ ...db, products });
  return Response.json(product, { status: exists ? 200 : 201 });
}
