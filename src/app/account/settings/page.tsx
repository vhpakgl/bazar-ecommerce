import { AccountSidebar } from "@/components/account/AccountSidebar";
import { Input } from "@/components/ui/Input";

export default function AccountSettingsPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr] md:px-6 md:py-14">
      <AccountSidebar />
      <section className="grid content-start gap-5">
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Ayarlar</h1>
          <p className="text-sm text-neutral-500">Profil ve bildirim tercihlerini güncelle.</p>
        </div>
        <form className="grid max-w-2xl gap-4 rounded-lg border border-neutral-100 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Ad" defaultValue="Bazar" />
            <Input placeholder="Soyad" defaultValue="Commerce" />
          </div>
          <Input type="email" placeholder="E-posta" defaultValue="destek@bazar.commerce" />
          <button className="w-fit rounded-full bg-black px-7 py-3 text-sm font-medium text-white">Kaydet</button>
        </form>
      </section>
    </main>
  );
}
