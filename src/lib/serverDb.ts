import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { categories, type Category } from "@/data/categories";
import { orders, type Order } from "@/data/orders";
import { products, type Product } from "@/data/products";
import type { AuthUser } from "@/components/auth/AuthProvider";
import { slugify } from "@/lib/utils";

export type DbUser = AuthUser & {
  password: string;
};

export type DbShape = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: DbUser[];
};

const dbDir = path.join(process.cwd(), "data");
const dbPath = path.join(dbDir, "db.json");

const initialDb: DbShape = {
  products,
  categories,
  orders,
  users: [
    { name: "Admin", email: "admin@bazar.commerce", password: "admin123", role: "admin" },
    { name: "Bazar Müşterisi", email: "musteri@bazar.commerce", password: "musteri123", role: "customer" },
  ],
};

export async function readDb(): Promise<DbShape> {
  try {
    const raw = await readFile(dbPath, "utf8");
    const db = JSON.parse(raw) as DbShape;
    return normalizeDb(db);
  } catch {
    await writeDb(initialDb);
    return initialDb;
  }
}

export async function writeDb(db: DbShape) {
  await mkdir(dbDir, { recursive: true });
  await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

export function publicUser(user: DbUser): AuthUser {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function normalizeDb(db: DbShape): DbShape {
  return {
    ...db,
    products: db.products.map((product) => ({
      ...product,
      subcategory: product.subcategory ?? inferSubcategory(product),
    })),
  };
}

function inferSubcategory(product: Product) {
  const text = `${product.name} ${product.label ?? ""}`.toLocaleLowerCase("tr-TR");
  if (text.includes("gömlek")) return "gomlek";
  if (text.includes("tişört") || text.includes("tisort")) return "tisort";
  if (text.includes("jean")) return "jean";
  if (text.includes("sneaker")) return "sneaker";
  if (text.includes("çanta") || text.includes("canta")) return "canta";
  if (text.includes("hırka") || text.includes("kazak")) return "kazak";
  if (text.includes("pantolon")) return "pantolon";
  if (text.includes("elbise")) return "elbise";
  return slugify(product.label ?? "genel");
}
