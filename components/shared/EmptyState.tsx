import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      <Link
        href={ctaHref}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-zinc-800"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
