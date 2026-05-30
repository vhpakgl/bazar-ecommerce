"use client";

import { Ruler, X } from "lucide-react";
import { useState } from "react";

const rows = [
  { size: "XS", chest: "82-86", waist: "62-66" },
  { size: "S", chest: "86-92", waist: "66-72" },
  { size: "M", chest: "92-98", waist: "72-78" },
  { size: "L", chest: "98-106", waist: "78-86" },
  { size: "XL", chest: "106-114", waist: "86-94" },
];

export function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-medium text-black underline underline-offset-4">
        <Ruler size={14} strokeWidth={1.6} />
        Beden rehberi
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 px-4">
          <section className="grid w-full max-w-md gap-5 rounded-lg bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-black">Beden Rehberi</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Beden rehberini kapat">
                <X size={18} />
              </button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                <tr>
                  <th className="py-2">Beden</th>
                  <th className="py-2">Göğüs</th>
                  <th className="py-2">Bel</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.size} className="border-t border-neutral-100">
                    <td className="py-3 font-medium text-black">{row.size}</td>
                    <td className="py-3 text-neutral-500">{row.chest} cm</td>
                    <td className="py-3 text-neutral-500">{row.waist} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs leading-relaxed text-neutral-500">Ölçüler ürün kalıbına göre birkaç santimetre değişebilir.</p>
          </section>
        </div>
      ) : null}
    </>
  );
}
