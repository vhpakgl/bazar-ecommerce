import { readDb, writeDb } from "@/lib/serverDb";

export const runtime = "nodejs";

export async function DELETE(_request: Request, context: any) {
  const { slug } = await context.params;
  const db = await readDb();
  await writeDb({ ...db, categories: db.categories.filter((item) => item.slug !== slug) });
  return Response.json({ ok: true });
}
