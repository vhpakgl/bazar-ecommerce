"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="hidden h-9 w-[190px] items-center gap-2 rounded-full border border-neutral-200 px-3 xl:flex 2xl:w-[230px]"
    >
      <Search size={15} strokeWidth={1.5} className="text-neutral-400" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ürün ara"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
      />
    </form>
  );
}
