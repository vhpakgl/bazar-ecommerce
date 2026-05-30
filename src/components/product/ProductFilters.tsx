"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { getAvailableColors, getAvailableSizes, getCategories, type ProductQuery } from "@/lib/catalog";

type FilterKey =
  | "q"
  | "category"
  | "subcategory"
  | "variant"
  | "min"
  | "max"
  | "size"
  | "color"
  | "sort"
  | "inStock"
  | "discounted";

type FilterValue = string | null | undefined;

const sortOptions: Array<{ label: string; value: NonNullable<ProductQuery["sort"]> }> = [
  { label: "Yeni eklenen", value: "newest" },
  { label: "Fiyat artan", value: "price-asc" },
  { label: "Fiyat azalan", value: "price-desc" },
  { label: "Puan", value: "rating" },
];

const variantLabels: Record<string, string> = {
  new: "Yeni gelenler",
  best: "Çok satanlar",
  discount: "İndirim",
};

const colorClasses: Record<string, string> = {
  Beyaz: "bg-white",
  Siyah: "bg-black",
  Mavi: "bg-blue-500",
  Gri: "bg-neutral-400",
  Kahve: "bg-amber-900",
  Krem: "bg-stone-100",
};

export function ProductFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories = getCategories();
  const sizes = getAvailableSizes();
  const colors = getAvailableColors();
  const baseParams = getBaseParams(pathname);

  const valueOf = (key: FilterKey) => searchParams.get(key) ?? baseParams[key] ?? "";
  const activeCategory = valueOf("category");
  const activeSize = valueOf("size");
  const activeColor = valueOf("color");
  const activeSort = valueOf("sort");
  const activeInStock = valueOf("inStock") === "1";
  const activeDiscounted = valueOf("discounted") === "1" || valueOf("variant") === "discount";

  const hrefFor = (updates: Partial<Record<FilterKey, FilterValue>>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(baseParams).forEach(([key, value]) => {
      if (value && !params.has(key)) params.set(key, value);
    });

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });

    const query = params.toString();
    return query ? `/search?${query}` : "/search";
  };

  const clearHref = baseParams.variant ? hrefFor({ size: null, color: null, min: null, max: null, sort: null, inStock: null }) : "/search";

  const activeChips = [
    activeCategory
      ? {
          label: categories.find((category) => category.slug === activeCategory)?.name ?? activeCategory,
          href: hrefFor({ category: null, subcategory: null }),
        }
      : null,
    activeSize ? { label: `${activeSize} beden`, href: hrefFor({ size: null }) } : null,
    activeColor ? { label: activeColor, href: hrefFor({ color: null }) } : null,
    activeSort
      ? { label: sortOptions.find((option) => option.value === activeSort)?.label ?? activeSort, href: hrefFor({ sort: null }) }
      : null,
    activeInStock ? { label: "Stokta", href: hrefFor({ inStock: null }) } : null,
    activeDiscounted ? { label: "İndirim", href: hrefFor({ discounted: null, variant: null }) } : null,
    valueOf("variant") && valueOf("variant") !== "discount"
      ? { label: variantLabels[valueOf("variant")] ?? valueOf("variant"), href: hrefFor({ variant: null }) }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <aside className="md:sticky md:top-24 md:self-start">
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-black">Filtrele</p>
            <p className="text-[11px] text-neutral-500">Hızlı ve sade seçimler</p>
          </div>
          <Link href={clearHref} className="text-xs font-medium text-neutral-500 transition-colors hover:text-black">
            Temizle
          </Link>
        </div>

        {activeChips.length > 0 && (
          <div className="border-b border-neutral-100 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <Link
                  key={`${chip.label}-${chip.href}`}
                  href={chip.href}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-black hover:text-black"
                >
                  {chip.label}
                  <X size={13} strokeWidth={1.8} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <FilterSection title="Kategori">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const active = activeCategory === category.slug;
              return (
                <Link
                  key={category.slug}
                  href={hrefFor({ category: active ? null : category.slug, subcategory: null })}
                  className={`rounded-full border px-3 py-2 text-[13px] font-medium transition ${
                    active ? "border-black bg-black text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Fiyat">
          <form action="/search" className="grid gap-2">
            {Array.from(searchParams.entries()).map(([key, value]) => {
              if (key === "min" || key === "max") return null;
              return <input key={`${key}-${value}`} type="hidden" name={key} value={value} />;
            })}
            {Object.entries(baseParams).map(([key, value]) => {
              if (!value || searchParams.has(key) || key === "min" || key === "max") return null;
              return <input key={key} type="hidden" name={key} value={value} />;
            })}
            <div className="grid grid-cols-2 gap-2">
              <input name="min" type="number" min={0} placeholder="Min" defaultValue={valueOf("min")} className="filter-control" />
              <input name="max" type="number" min={0} placeholder="Max" defaultValue={valueOf("max")} className="filter-control" />
            </div>
            <button className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
              Uygula
            </button>
          </form>
        </FilterSection>

        <FilterSection title="Beden">
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const active = activeSize === size;
              return (
                <Link
                  key={size}
                  href={hrefFor({ size: active ? null : size })}
                  className={`flex h-10 items-center justify-center rounded-full border text-[13px] font-semibold transition ${
                    active ? "border-black bg-black text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
                  }`}
                >
                  {size}
                </Link>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Renk">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = activeColor === color;
              return (
                <Link
                  key={color}
                  href={hrefFor({ color: active ? null : color })}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] transition ${
                    active ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
                  }`}
                >
                  <span className={`h-3.5 w-3.5 rounded-full border border-neutral-200 ${colorClasses[color] ?? "bg-neutral-200"}`} />
                  {color}
                </Link>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Durum">
          <div className="grid gap-2">
            <ToggleLink active={activeInStock} href={hrefFor({ inStock: activeInStock ? null : "1" })} label="Stokta" />
            <ToggleLink active={activeDiscounted} href={hrefFor({ discounted: activeDiscounted ? null : "1", variant: null })} label="İndirim" />
          </div>
        </FilterSection>

        <FilterSection title="Sıralama" last>
          <div className="grid gap-2">
            {sortOptions.map((option) => {
              const active = activeSort === option.value;
              return (
                <Link
                  key={option.value}
                  href={hrefFor({ sort: active ? null : option.value })}
                  className={`rounded-full border px-3 py-2 text-[13px] transition ${
                    active ? "border-black bg-black text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

function FilterSection({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className={`px-4 py-3 ${last ? "" : "border-b border-neutral-100"}`}>
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">{title}</h3>
      {children}
    </section>
  );
}

function ToggleLink({ active, href, label }: { active: boolean; href: string; label: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-md border px-3 py-2.5 text-sm transition-all ${
        active ? "border-black bg-black text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-black hover:text-black"
      }`}
    >
      {label}
      <span className={`size-4 rounded-full border ${active ? "border-white bg-white" : "border-neutral-300"}`}>
        {active && <Check className="m-0.5 text-black" size={12} strokeWidth={2} />}
      </span>
    </Link>
  );
}

function getBaseParams(pathname: string): Partial<Record<FilterKey, string>> {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "category" && segments[1]) {
    return {
      category: segments[1],
      subcategory: segments[2],
    };
  }

  if (segments[0] === "yeni-gelenler") return { variant: "new" };
  if (segments[0] === "cok-satanlar") return { variant: "best" };
  if (segments[0] === "indirim") return { variant: "discount" };

  return {};
}
