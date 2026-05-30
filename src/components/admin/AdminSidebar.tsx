"use client";

import { BarChart3, Boxes, FolderTree, Home, LogOut, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Genel Bakış", href: "/admin", icon: BarChart3 },
  { label: "Ürünler", href: "/admin/products", icon: Package },
  { label: "Siparişler", href: "/admin/orders", icon: Boxes },
  { label: "Kategoriler", href: "/admin/categories", icon: FolderTree },
  { label: "Kullanıcılar", href: "/admin/users", icon: Users },
];

export function AdminSidebar({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={mobile ? "block h-[calc(100vh-64px)] bg-white" : "hidden min-h-screen w-72 shrink-0 border-r border-neutral-200 bg-white lg:block"}>
      <div className={mobile ? "grid h-full content-between p-5" : "sticky top-0 grid h-screen content-between p-5"}>
        <div className="grid gap-8">
          <Link href="/admin" className={`text-lg font-semibold tracking-tight text-black ${mobile ? "hidden" : ""}`} onClick={onNavigate}>
            bazar.admin
          </Link>
          <nav className="grid gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={`inline-flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-black text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.7} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="grid gap-2 border-t border-neutral-100 pt-4">
          <Link href="/" onClick={onNavigate} className="inline-flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-black">
            <Home size={17} strokeWidth={1.7} />
            Mağazaya Dön
          </Link>
          <Link href="/login" onClick={onNavigate} className="inline-flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-black">
            <LogOut size={17} strokeWidth={1.7} />
            Çıkış
          </Link>
        </div>
      </div>
    </aside>
  );
}
