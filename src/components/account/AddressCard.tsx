export function AddressCard() {
  return (
    <article className="grid gap-3 rounded-lg border border-neutral-100 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-black">Ev Adresi</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500">
            Levent Mah. Büyükdere Cad. No: 24, Beşiktaş / İstanbul
          </p>
        </div>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-500">Varsayılan</span>
      </div>
      <div className="flex gap-3 text-sm">
        <button className="font-medium text-black">Düzenle</button>
        <button className="text-neutral-400 hover:text-black">Sil</button>
      </div>
    </article>
  );
}
