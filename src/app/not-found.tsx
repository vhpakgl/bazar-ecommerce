import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-xl content-center gap-5 px-4 py-12 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">404</span>
      <h1 className="text-3xl font-semibold tracking-tight text-black">Sayfa bulunamadı</h1>
      <p className="text-sm leading-relaxed text-neutral-500">
        Aradığın sayfa taşınmış, silinmiş ya da bağlantı hatalı olabilir.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white">
          Ana Sayfa
        </Link>
        <Link href="/search" className="rounded-full border border-black px-7 py-3 text-sm font-medium text-black">
          Ürünleri İncele
        </Link>
      </div>
    </main>
  );
}
