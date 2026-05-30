import { readDb, writeDb } from "@/lib/serverDb";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: any) {
  const { id } = await context.params;
  const { status } = (await request.json()) as { status?: string };
  const db = await readDb();

  if (!status) return Response.json({ message: "Durum zorunlu" }, { status: 400 });

  const orders = db.orders.map((order) => (order.id === id ? { ...order, status } : order));
  await writeDb({ ...db, orders });
  return Response.json(orders.find((order) => order.id === id));
}
