import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export function MegaMenu() {
  const categories = getCategories();

  return (
    <div className="grid gap-3">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
