"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    const run = async () => {
      if (!debounced.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(debounced)}`,
      );
      const data = await response.json();
      setItems(data.items ?? []);
      setLoading(false);
    };

    run();
  }, [debounced]);

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <div className="mb-6 max-w-xl">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
        />
      </div>

      <p className="mb-6 text-sm text-zinc-600">
        {debounced.trim()
          ? `Showing ${items.length} results for '${debounced}'`
          : "Search for products by name or description"}
      </p>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading results...</div>
      ) : items.length ? (
        <ProductGrid products={items} columns={4} />
      ) : debounced.trim() ? (
        <EmptyState
          title="No results found"
          description="Try another keyword or browse all products instead."
          ctaLabel="Browse Products"
          ctaHref="/products"
        />
      ) : null}
    </div>
  );
}
