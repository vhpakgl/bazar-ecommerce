import Link from "next/link";
import type { Category } from "@/data/categories";

export function AdminCategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <article key={category.slug} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <div className="relative aspect-[16/9] bg-neutral-100">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }} />
          </div>
          <div className="grid gap-3 p-5">
            <div>
              <h2 className="font-semibold text-black">{category.name}</h2>
              <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
            </div>
            <Link href={`/category/${category.slug}`} className="text-sm font-medium text-black underline underline-offset-4">
              Mağazada Gör
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
