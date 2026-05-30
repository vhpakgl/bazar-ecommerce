"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Hesap Özeti", href: "/account" },
  { label: "Siparişlerim", href: "/account/orders" },
  { label: "Adreslerim", href: "/account/addresses" },
  { label: "Ayarlar", href: "/account/settings" },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 grid content-start gap-4 rounded-lg border border-neutral-100 bg-white p-4 text-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-neutral-100" />
        <div>
          <p className="text-sm font-semibold text-black">Hoş geldin</p>
          <p className="text-xs text-neutral-400">Müşteri</p>
        </div>
      </div>

      <nav className="grid gap-1">
        {links.map((link) => {
          const active = pathname === link.href || pathname?.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 transition ${
                active ? "bg-black text-white" : "text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 border-t border-neutral-100 pt-3">
        <button className="w-full rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-black">Çıkış Yap</button>
      </div>
    </aside>
  );
}
