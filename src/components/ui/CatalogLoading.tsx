export function CatalogLoading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[280px_1fr] md:px-6 md:py-14">
      <aside className="hidden rounded-lg border border-neutral-200 bg-white p-4 md:block">
        <div className="mb-6 h-8 w-28 animate-pulse rounded bg-neutral-100" />
        <div className="grid gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-md bg-neutral-100" />
          ))}
        </div>
      </aside>
      <section className="grid gap-6">
        <div className="grid gap-3">
          <div className="h-8 w-56 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid gap-3">
              <div className="aspect-[4/5] animate-pulse rounded-lg bg-neutral-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
              <div className="h-9 animate-pulse rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
