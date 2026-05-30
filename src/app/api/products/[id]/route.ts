import { readDb, writeDb } from "@/lib/serverDb";
import type { Product } from "@/data/products";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

export async function GET(_request: Request, context: any) {
  const { id } = await context.params;
  const db = await readDb();
  const product = db.products.find((item) => item.id === id);

  if (!product) return Response.json({ message: "Ürün bulunamadı" }, { status: 404 });
  return Response.json(product);
}

export async function PATCH(request: Request, context: any) {
  const { id } = await context.params;
  const db = await readDb();
  const payload = (await request.json()) as Product;
  const exists = db.products.some((item) => item.id === id);

  if (!exists) return Response.json({ message: "Ürün bulunamadı" }, { status: 404 });

  const product = { ...payload, id, subcategory: payload.subcategory || slugify(payload.label ?? payload.name) };
  await writeDb({
    ...db,
    products: db.products.map((item) => (item.id === id ? product : item)),
  });

  return Response.json(product);
}

export async function DELETE(_request: Request, context: any) {
  const { id } = await context.params;
  const db = await readDb();
  await writeDb({ ...db, products: db.products.filter((item) => item.id !== id) });
  return Response.json({ ok: true });
}
