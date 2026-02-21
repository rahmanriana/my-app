export function ProductsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30"
        >
          <div className="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
          <div className="mt-3 h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
          <div className="mt-4 h-40 w-full rounded-2xl bg-black/10 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}
