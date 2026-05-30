import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export function CategoryShowcase() {
  const categories = getCategories().filter((category) => category.featured);

  return (
    <section className="grid gap-6">
      <header className="flex items-end justify-between gap-6">
        <div className="grid gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">Kategoriler</h2>
          <p className="max-w-xl text-sm text-neutral-500">
            Günlük kullanıma uygun ana kategorileri hızlıca keşfet.
          </p>
        </div>
        <Link href="/search" className="hidden text-sm font-medium text-black underline underline-offset-4 sm:block">
          Tümünü gör
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${category.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 grid gap-1 p-5 text-white">
              <h3 className="text-lg font-semibold tracking-tight">{category.name}</h3>
              <p className="text-xs leading-relaxed text-white/75">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
