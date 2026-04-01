"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/shared/EmptyState";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
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
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="Search Products"
          subtitle="Marketplace-style search results with fast feedback and dense product discovery"
          action={<span className="shopee-pill">Live Search</span>}
        />

        <div className="relative mt-4 max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="h-12 rounded-sm pl-10"
          />
        </div>

        <p className="mt-4 text-sm text-zinc-600">
          {debounced.trim()
            ? `Showing ${items.length} results for '${debounced}'`
            : "Search for products by name or description"}
        </p>
      </MotionSection>

      <MotionSection
        delay={0.05}
        className="mt-5 rounded-sm bg-white p-4 shadow-sm md:p-5"
      >
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
        ) : (
          <div className="rounded-sm bg-zinc-50 p-5 text-sm text-zinc-500">
            Start typing to discover products across the marketplace catalog.
          </div>
        )}
      </MotionSection>
    </div>
  );
}
