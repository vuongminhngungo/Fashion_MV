"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";

export function useProducts(queryString: string) {
  return useQuery<{ items: Product[]; total: number; totalPages: number }>({
    queryKey: ["products", queryString],
    queryFn: async () => {
      const res = await fetch(`/api/products?${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
}

export function useProduct(slug: string) {
  return useQuery<{ product: Product; related: Product[] }>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    enabled: Boolean(slug),
  });
}
