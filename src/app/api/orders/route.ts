import { readDb, writeDb } from "@/lib/serverDb";
import type { Order } from "@/data/orders";

export const runtime = "nodejs";

export async function GET() {
  const db = await readDb();
  return Response.json(db.orders);
}

export async function POST(request: Request) {
  const db = await readDb();
  const payload = (await request.json()) as Omit<Order, "id" | "date" | "status">;
  const order: Order = {
    ...payload,
    id: `BC-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date()),
    status: "Hazırlanıyor",
  };

  await writeDb({ ...db, orders: [order, ...db.orders] });
  return Response.json(order, { status: 201 });
}
