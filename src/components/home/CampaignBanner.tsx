import Link from "next/link";

export function CampaignBanner() {
  return (
    <section className="relative overflow-hidden rounded-lg bg-black px-6 py-10 text-white md:px-10 md:py-14">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
      <div className="relative grid max-w-2xl gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">Sezon Kampanyası</span>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">%40’a varan indirim</h2>
        <p className="max-w-lg text-sm leading-relaxed text-white/70">
          Minimal gardırobun temel parçalarında sınırlı süreli fiyat avantajlarını kaçırma.
        </p>
        <Link
          href="/indirim"
          className="mt-3 w-fit rounded-full bg-white px-7 py-3 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
        >
          Kampanyayı İncele
        </Link>
      </div>
    </section>
  );
}
