"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCardSkeleton } from "@/components/shared/Skeleton";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import SectionHeading from "@/components/shared/SectionHeading";
import MotionSection from "@/components/shared/MotionSection";
import { useProducts } from "@/hooks/useProducts";

const filterLinks = [
  { label: "Clothing", href: "/products?category=CLOTHING" },
  { label: "Shoes", href: "/products?category=SHOES" },
  { label: "Bags", href: "/products?category=BAGS" },
  { label: "Price ↑", href: "/products?sort=price-asc" },
  { label: "Price ↓", href: "/products?sort=price-desc" },
  { label: "Best Selling", href: "/products?sort=best-selling" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [columns, setColumns] = useState<2 | 3 | 4>(4);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);
  const { data, isLoading } = useProducts(queryString);

  const current = Number(searchParams.get("page") || "1");

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="mb-5 rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="All Products"
          subtitle="Shopee-inspired browsing with compact filters, high-density cards, and quick sorting"
          action={<span className="shopee-pill">{data?.total ?? 0} items</span>}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1 md:max-w-md">
            <Input
              defaultValue={searchParams.get("q") || ""}
              placeholder="Search in products..."
              className="h-11 rounded-sm border-zinc-200 bg-white"
            />
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-sm bg-zinc-100 p-1">
            {[2, 3, 4].map((value) => (
              <Button
                key={value}
                variant={columns === value ? "default" : "ghost"}
                size="sm"
                className={
                  columns === value
                    ? "bg-[#ee4d2d] text-white hover:bg-[#d94324]"
                    : "text-zinc-600"
                }
                onClick={() => setColumns(value as 2 | 3 | 4)}
              >
                {value} Col
              </Button>
            ))}
          </div>
        </div>
      </MotionSection>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <MotionSection className="shopee-card rounded-sm p-4 md:p-5">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-sm font-bold uppercase tracking-wide text-zinc-800">
            <SlidersHorizontal className="h-4 w-4 text-[#ee4d2d]" />
            Filter Search
          </div>

          <div className="mt-4 space-y-5 text-sm">
            <div>
              <p className="mb-2 font-semibold text-zinc-800">
                Popular Filters
              </p>
              <div className="grid grid-cols-2 gap-2">
                {filterLinks.map((filter) => (
                  <Link
                    key={filter.label}
                    href={filter.href}
                    className="rounded-sm border border-zinc-200 px-3 py-2 text-center text-xs text-zinc-600 transition hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                  >
                    {filter.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-zinc-800">Price Range</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/products?minPrice=0&maxPrice=79"
                  className="rounded-sm bg-zinc-50 px-3 py-2 text-center"
                >
                  Under $79
                </Link>
                <Link
                  href="/products?minPrice=80&maxPrice=149"
                  className="rounded-sm bg-zinc-50 px-3 py-2 text-center"
                >
                  $80 - $149
                </Link>
                <Link
                  href="/products?minPrice=150&maxPrice=220"
                  className="rounded-sm bg-zinc-50 px-3 py-2 text-center"
                >
                  $150 - $220
                </Link>
                <Link
                  href="/products?minPrice=221&maxPrice=400"
                  className="rounded-sm bg-zinc-50 px-3 py-2 text-center"
                >
                  Premium
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-zinc-800">
                Marketplace Tips
              </p>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li>• Combine category and sort params for faster browsing.</li>
                <li>• Use the search bar to trigger API filtering.</li>
                <li>• Pagination shows 8 products per page.</li>
              </ul>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="rounded-sm bg-white p-4 shadow-sm md:p-5">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.items.length ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-sm bg-[#fff6f3] px-4 py-3 text-sm">
                <p className="text-zinc-600">
                  Showing page{" "}
                  <span className="font-semibold text-[#ee4d2d]">
                    {current}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#ee4d2d]">
                    {data.totalPages}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/products?sort=newest"
                    className="rounded-sm border border-orange-200 bg-white px-3 py-1.5 text-[#ee4d2d]"
                  >
                    Newest
                  </Link>
                  <Link
                    href="/products?sort=best-selling"
                    className="rounded-sm border border-zinc-200 bg-white px-3 py-1.5 text-zinc-600"
                  >
                    Top Sales
                  </Link>
                  <Link
                    href="/products?sort=price-asc"
                    className="rounded-sm border border-zinc-200 bg-white px-3 py-1.5 text-zinc-600"
                  >
                    Price Low → High
                  </Link>
                </div>
              </div>
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
        </MotionSection>
      </div>
    </div>
  );
}
