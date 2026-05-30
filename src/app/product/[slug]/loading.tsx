export default function Loading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-14">
      <section className="grid gap-4 md:grid-cols-[84px_1fr]">
        <div className="hidden gap-3 md:grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-square animate-pulse rounded-lg bg-neutral-100" />
          ))}
        </div>
        <div className="aspect-[4/5] animate-pulse rounded-lg bg-neutral-100" />
      </section>
      <section className="grid content-start gap-6">
        <div className="grid gap-3">
          <div className="h-5 w-28 animate-pulse rounded bg-neutral-100" />
          <div className="h-10 w-4/5 animate-pulse rounded bg-neutral-100" />
          <div className="h-5 w-36 animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="grid gap-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="h-12 animate-pulse rounded-full bg-neutral-100" />
      </section>
    </main>
  );
}
