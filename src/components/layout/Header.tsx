"use client";

import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { CartBadge } from "@/components/cart/CartBadge";
import { menuCategorySlugs, menuData, menuVisuals, type MenuKey } from "@/data/menuData";
import { slugify } from "@/lib/utils";
import { HeaderSearch } from "./HeaderSearch";

const quickLinks = [
  { label: "YENİ GELENLER", href: "/yeni-gelenler" },
  { label: "ÇOK SATANLAR", href: "/cok-satanlar" },
  { label: "İNDİRİM", href: "/indirim", className: "text-red-600" },
  { label: "KOLEKSİYONLAR", href: "/koleksiyonlar" },
];

export function Header() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loaded } = useAuth();
  const menuKeys = Object.keys(menuData) as MenuKey[];
  const activeMenuItems = activeMenu
    ? (Object.entries(menuData[activeMenu]) as Array<[string, readonly string[]]>)
    : [];

  return (
    <header className="relative z-50 w-full bg-white text-black tracking-tight">
      <div className="w-full bg-black py-2 text-center text-[12px] font-normal text-white">
        Ücretsiz teslimat ve iade imkanı.{" "}
        <Link href="/koleksiyonlar" className="underline underline-offset-4 transition-opacity hover:opacity-80">
          Koleksiyonu inceleyin
        </Link>
      </div>

      <div className="border-b border-gray-100">
        <div className="mx-auto grid h-16 max-w-[1560px] grid-cols-[170px_minmax(0,1fr)_auto] items-center gap-6 px-4 md:px-6 xl:grid-cols-[190px_minmax(0,1fr)_auto]">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <button className="lg:hidden" aria-label="Menüyü aç" onClick={() => setMobileOpen(true)}>
              <Menu size={20} strokeWidth={1.6} />
            </button>
            <Link
              href="/"
              className="whitespace-nowrap text-base font-semibold tracking-tight outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              bazar.commerce
            </Link>
          </div>

          <nav className="hidden min-w-0 items-center justify-start gap-5 overflow-hidden text-[13px] font-medium text-gray-600 lg:flex xl:gap-6">
            {menuKeys.map((item) => (
              <button
                key={item}
                onMouseEnter={() => setActiveMenu(item)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap py-5 transition-colors hover:text-black ${
                  activeMenu === item ? "text-black" : ""
                }`}
              >
                {item}
                <ChevronDown size={13} strokeWidth={1.7} className={`transition-transform duration-200 ${activeMenu === item ? "rotate-180" : ""}`} />
              </button>
            ))}
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`whitespace-nowrap tracking-tight transition-colors hover:text-black ${link.className ?? ""}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-4 text-black">
            <HeaderSearch />
            <Link href="/search" className="transition-opacity hover:opacity-60 xl:hidden" aria-label="Arama">
              <Search size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/favorites" className="transition-opacity hover:opacity-60" aria-label="Favoriler">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="relative transition-opacity hover:opacity-60" aria-label="Sepet">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <CartBadge />
            </Link>
            <AccountHeaderLink loaded={loaded} role={user?.role} />
          </div>
        </div>
      </div>

      {activeMenu ? <MegaMenu activeMenu={activeMenu} items={activeMenuItems} onClose={() => setActiveMenu(null)} /> : null}
      {mobileOpen ? <MobileMenu menuKeys={menuKeys} onClose={() => setMobileOpen(false)} /> : null}
    </header>
  );
}

function AccountHeaderLink({ loaded, role }: { loaded: boolean; role?: "admin" | "customer" }) {
  // Always prefer customer account page for header link; fall back to login when no user.
  const href = loaded && role ? "/account" : "/login";
  const label = !loaded ? "..." : loaded && role ? "Hesabım" : "Giriş Yap";

  return (
    <Link
      href={href}
      className="hidden min-w-[92px] whitespace-nowrap items-center justify-center rounded-full border border-black/10 bg-black px-5 py-2.5 text-center text-[12px] font-medium leading-none text-white transition-colors hover:bg-zinc-800 lg:inline-flex"
    >
      {label}
    </Link>
  );
}

type MegaMenuProps = {
  activeMenu: MenuKey;
  items: Array<[string, readonly string[]]>;
  onClose: () => void;
};

function MegaMenu({ activeMenu, items, onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute left-0 top-full w-full border-b border-white/50 bg-white/75 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
      onMouseLeave={onClose}
    >
      <div className="relative mx-auto max-w-7xl px-12 py-8">
        <button onClick={onClose} className="absolute right-6 top-4 text-gray-400 transition-colors hover:text-black" aria-label="Menüyü kapat">
          <X size={16} />
        </button>

        <div className="grid grid-cols-[320px_1fr] items-stretch gap-10">
          <div className="grid grid-cols-2 gap-8 border-r border-black/5 pr-10">
            {items.map(([categoryTitle, subItems]) => (
              <div key={categoryTitle} className="flex flex-col space-y-3">
                <Link href={`/category/${menuCategorySlugs[categoryTitle]}`} className="text-[13px] font-semibold uppercase tracking-wider text-black">
                  {categoryTitle}
                </Link>
                <ul className="flex flex-col space-y-2">
                  {subItems.map((subItem) => (
                    <li key={subItem}>
                      <Link href={subcategoryHref(categoryTitle, subItem)} className="block py-0.5 text-[13px] font-normal text-gray-500 transition-colors hover:text-black">
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid min-h-[260px] grid-cols-4 gap-4">
            <Link href="/yeni-gelenler" className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-black">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${menuVisuals[activeMenu].image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h4 className="mb-1 text-[15px] font-semibold">{menuVisuals[activeMenu].title}</h4>
                <p className="max-w-xs text-[12px] leading-relaxed text-white/75">{menuVisuals[activeMenu].text}</p>
              </div>
            </Link>

            <MenuImage href="/koleksiyonlar" image="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" className="col-span-1 row-span-2" />
            <MenuImage href="/cok-satanlar" image="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" />
            <MenuImage href="/indirim" image="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80" />
          </div>
        </div>
      </div>
    </div>
  );
}

type MenuImageProps = {
  href: string;
  image: string;
  className?: string;
};

function MenuImage({ href, image, className = "" }: MenuImageProps) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl bg-neutral-100 ${className}`}>
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-black/10" />
    </Link>
  );
}

function MobileMenu({ menuKeys, onClose }: { menuKeys: MenuKey[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 lg:hidden">
      <div className="h-full w-[86vw] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight" onClick={onClose}>
            bazar.commerce
          </Link>
          <button onClick={onClose} aria-label="Menüyü kapat">
            <X size={18} />
          </button>
        </div>
        <nav className="grid gap-5">
          {menuKeys.map((key) => (
            <div key={key} className="grid gap-3 border-b border-neutral-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">{key}</span>
              {(Object.entries(menuData[key]) as Array<[string, readonly string[]]>).map(([categoryTitle, subItems]) => (
                <div key={categoryTitle} className="grid gap-2">
                  <Link href={`/category/${menuCategorySlugs[categoryTitle]}`} onClick={onClose} className="text-sm font-semibold text-black">
                    {categoryTitle}
                  </Link>
                  <div className="grid gap-1 pl-3">
                    {subItems.map((subItem) => (
                      <Link key={subItem} href={subcategoryHref(categoryTitle, subItem)} onClick={onClose} className="text-sm text-neutral-500">
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} className="text-sm font-semibold text-black">
              {link.label}
            </Link>
          ))}
          <AccountMobileLink onClose={onClose} />
        </nav>
      </div>
    </div>
  );
}

function AccountMobileLink({ onClose }: { onClose: () => void }) {
  const { user, loaded } = useAuth();
  const href = loaded && user ? "/account" : "/login";
  const label = !loaded ? "..." : loaded && user ? "Hesabım" : "Giriş Yap";

  return (
    <Link href={href} onClick={onClose} className="text-sm font-semibold text-black">
      {label}
    </Link>
  );
}

function subcategoryHref(categoryTitle: string, subItem: string) {
  const categorySlug = menuCategorySlugs[categoryTitle] ?? "search";
  return `/category/${categorySlug}/${slugify(subItem)}`;
}
