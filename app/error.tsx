"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="container-px py-20 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-3 text-sm text-zinc-600">
        {error.message || "Please try again later."}
      </p>
    </div>
  );
}
