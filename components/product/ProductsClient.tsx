"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCardSkeleton } from "@/components/shared/Skeleton";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [columns, setColumns] = useState<2 | 3 | 4>(4);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);
  const { data, isLoading } = useProducts(queryString);

  const current = Number(searchParams.get("page") || "1");

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Input
          defaultValue={searchParams.get("q") || ""}
          placeholder="Search in products..."
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <Button
            variant={columns === 2 ? "default" : "outline"}
            size="sm"
            onClick={() => setColumns(2)}
          >
            2
          </Button>
          <Button
            variant={columns === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setColumns(3)}
          >
            3
          </Button>
          <Button
            variant={columns === 4 ? "default" : "outline"}
            size="sm"
            onClick={() => setColumns(4)}
          >
            4
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 rounded-lg border border-zinc-200 p-4">
          <h3 className="font-semibold">Filters</h3>
          <p className="text-xs text-zinc-500">
            Use URL params: category, minPrice, maxPrice, colors, sizes, sort,
            page
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              className="rounded border p-2"
              href="/products?category=CLOTHING"
            >
              Clothing
            </a>
            <a className="rounded border p-2" href="/products?category=SHOES">
              Shoes
            </a>
            <a className="rounded border p-2" href="/products?category=BAGS">
              Bags
            </a>
            <a className="rounded border p-2" href="/products?sort=price-asc">
              Price ↑
            </a>
            <a className="rounded border p-2" href="/products?sort=price-desc">
              Price ↓
            </a>
            <a
              className="rounded border p-2"
              href="/products?sort=best-selling"
            >
              Best Selling
            </a>
          </div>
        </aside>

        <section>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.items.length ? (
            <>
              <ProductGrid products={data.items} columns={columns} />
              <Pagination
                current={current}
                total={data.totalPages}
                basePath="/products"
                query={new URLSearchParams(searchParams.toString())}
              />
            </>
          ) : (
            <EmptyState
              title="No products found"
              description="Try adjusting filters or search keyword."
              ctaLabel="Reset Filters"
              ctaHref="/products"
            />
          )}
        </section>
      </div>
    </div>
  );
}
