"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-xl content-center gap-5 px-4 py-12 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-red-500">Hata</span>
      <h1 className="text-3xl font-semibold tracking-tight text-black">Bir şeyler ters gitti</h1>
      <p className="text-sm leading-relaxed text-neutral-500">Sayfa yüklenirken beklenmeyen bir hata oluştu.</p>
      <button onClick={reset} className="mx-auto rounded-full bg-black px-7 py-3 text-sm font-medium text-white">
        Tekrar Dene
      </button>
    </main>
  );
}
