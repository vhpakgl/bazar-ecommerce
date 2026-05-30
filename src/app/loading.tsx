export default function Loading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 md:py-14">
      <div className="h-8 w-56 animate-pulse rounded bg-neutral-100" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid gap-3">
            <div className="aspect-[4/5] animate-pulse rounded-lg bg-neutral-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
