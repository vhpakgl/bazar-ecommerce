import { readDb, writeDb } from "@/lib/serverDb";
import type { Category } from "@/data/categories";

export const runtime = "nodejs";

export async function GET() {
  const db = await readDb();
  return Response.json(db.categories);
}

export async function POST(request: Request) {
  const db = await readDb();
  const category = (await request.json()) as Category;
  const exists = db.categories.some((item) => item.slug === category.slug);
  const categories = exists
    ? db.categories.map((item) => (item.slug === category.slug ? category : item))
    : [category, ...db.categories];

  await writeDb({ ...db, categories });
  return Response.json(category, { status: exists ? 200 : 201 });
}
