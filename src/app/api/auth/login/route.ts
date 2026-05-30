import { publicUser, readDb } from "@/lib/serverDb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };
  const db = await readDb();
  const user = db.users.find((item) => item.email === email && item.password === password);

  if (!user) return Response.json({ message: "E-posta veya şifre hatalı" }, { status: 401 });
  return Response.json(publicUser(user));
}
