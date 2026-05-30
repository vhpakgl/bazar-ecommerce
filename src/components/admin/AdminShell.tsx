"use client";

import { Bell, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/components/auth/AuthProvider";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loaded, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const allowed = user?.role === "admin";

  if (!loaded) {
    return <main className="grid min-h-screen place-items-center bg-neutral-50 text-sm text-neutral-500">Yükleniyor...</main>;
  }

  if (!allowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-50 px-4">
        <section className="grid max-w-md gap-4 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black">Admin girişi gerekli</h1>
          <p className="text-sm text-neutral-500">Admin paneline erişmek için admin hesabıyla giriş yapmalısın.</p>
          <Link href="/login?next=/admin" className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
            Admin Girişi Yap
          </Link>
          <Link href="/" className="text-sm font-medium text-black underline underline-offset-4">
            Mağazaya Dön
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <div className="flex min-h-screen">
        <AdminSidebar />
        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
            <div className="h-full w-80 max-w-[86vw] bg-white">
              <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-5">
                <Link href="/admin" className="text-lg font-semibold tracking-tight text-black" onClick={() => setMobileOpen(false)}>
                  bazar.admin
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Menüyü kapat">
                  <X size={18} />
                </button>
              </div>
              <AdminSidebar mobile onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        ) : null}

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Admin menüyü aç">
                  <Menu size={21} strokeWidth={1.7} />
                </button>
                <Link href="/admin" className="text-base font-semibold tracking-tight text-black lg:hidden">
                  bazar.admin
                </Link>
                <div className="hidden h-9 w-80 items-center gap-2 rounded-full border border-neutral-200 px-3 md:flex">
                  <Search size={15} strokeWidth={1.6} className="text-neutral-400" />
                  <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400" placeholder="Ürün, sipariş veya kullanıcı ara" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-black" aria-label="Bildirimler">
                  <Bell size={17} strokeWidth={1.7} />
                </button>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-black">{user.name}</p>
                  <button className="text-xs text-neutral-400 hover:text-black" onClick={logout}>
                    Çıkış yap
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="px-4 py-6 md:px-6 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
