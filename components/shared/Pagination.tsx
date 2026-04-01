import Link from "next/link";

export default function Pagination({
  current,
  total,
  basePath,
  query,
}: {
  current: number;
  total: number;
  basePath: string;
  query: URLSearchParams;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      {pages.map((page) => {
        const params = new URLSearchParams(query.toString());
        params.set("page", String(page));

        return (
          <Link
            key={page}
            href={`${basePath}?${params.toString()}`}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm ${
              current === page
                ? "border-black bg-black text-white"
                : "border-zinc-300 bg-white"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
