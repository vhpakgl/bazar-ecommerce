import { publicUser, readDb, writeDb, type DbUser } from "@/lib/serverDb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { name, email, password } = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return Response.json({ message: "Ad, e-posta ve şifre zorunlu" }, { status: 400 });
  }

  const db = await readDb();
  const exists = db.users.some((user) => user.email === email);
  if (exists) return Response.json({ message: "Bu e-posta zaten kayıtlı" }, { status: 409 });

  const user: DbUser = { name, email, password, role: "customer" };
  await writeDb({ ...db, users: [user, ...db.users] });
  return Response.json(publicUser(user), { status: 201 });
}
