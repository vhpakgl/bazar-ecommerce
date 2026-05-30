import Link from "next/link";

const collections = [
  {
    title: "Monochrome Series",
    text: "Siyah ve beyazın net çizgileriyle hazırlanan edit.",
    href: "/koleksiyonlar",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Weekend Essentials",
    text: "Hafta sonu ritmine uygun rahat parçalar.",
    href: "/koleksiyonlar",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CollectionGrid() {
  return (
    <section className="grid gap-6">
      <header className="grid gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">Koleksiyonlar</h2>
        <p className="max-w-xl text-sm text-neutral-500">
          Editör seçkileriyle ürünleri kullanım senaryosuna göre keşfet.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {collections.map((collection) => (
          <Link
            key={collection.title}
            href={collection.href}
            className="group relative min-h-[360px] overflow-hidden rounded-lg bg-neutral-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${collection.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 grid gap-2 p-6 text-white">
              <h3 className="text-2xl font-semibold tracking-tight">{collection.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-white/75">{collection.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
