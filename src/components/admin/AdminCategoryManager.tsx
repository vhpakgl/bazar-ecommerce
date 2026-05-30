"use client";

import { Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { Category } from "@/data/categories";

export function AdminCategoryManager({ categories }: { categories: Category[] }) {
  const [visibleCategories, setVisibleCategories] = useState<Category[]>(categories);
  const [isUpdating, setIsUpdating] = useState(false);

  async function refresh() {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Yükleme hatası");
      setVisibleCategories((await response.json()) as Category[]);
    } catch (error) {
      console.error("Kategoriler güncellenemedi:", error);
    }
  }

  useEffect(() => {
    // Eğer prop boşsa veya güncellenmesi gerekiyorsa çek, her açılışta zorunlu kılma
    if (categories.length === 0) refresh();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const slug = String(form.get("slug") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();

    if (!name || !slug) return;

    setIsUpdating(true);
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          description: description || "Admin panelinden eklenen kategori",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
        }),
      });
    } finally {
      setIsUpdating(false);
    }
    event.currentTarget.reset();
    await refresh();
  }

  async function onDelete(slug: string) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    
    try {
      const response = await fetch(`/api/categories/${slug}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Silme işlemi başarısız");
      await refresh();
    } catch (error) {
      alert("Kategori silinirken bir hata oluştu.");
    }
  }

  return (
    <div className="grid gap-5">
      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-5 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
        <input name="name" placeholder="Kategori adı" className="rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black" />
        <input name="slug" placeholder="slug" className="rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black" />
        <input name="description" placeholder="Açıklama" className="rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black" />
        <button className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">Ekle</button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleCategories.map((category) => (
          <article key={category.slug} className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-5">
            <div>
              <h2 className="font-semibold text-black">{category.name}</h2>
              <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
            </div>
            <button onClick={() => onDelete(category.slug)} className="inline-flex w-fit items-center gap-1.5 text-sm text-neutral-400 hover:text-red-600">
              <Trash2 size={14} strokeWidth={1.6} />
              Sil
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
