export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-50 p-6">
      <div className="mx-auto grid max-w-7xl gap-6">
        <div className="h-10 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-lg border border-neutral-200 bg-white" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-lg border border-neutral-200 bg-white" />
      </div>
    </main>
  );
}
