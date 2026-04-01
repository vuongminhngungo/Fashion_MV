import { prisma } from "@/lib/prisma";
import { mockProducts } from "@/lib/mock-products";
import type { Product } from "@/types";

type ProductRecord = Product;

function sortProducts(products: ProductRecord[], sort?: string | null) {
  const items = [...products];

  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "best-selling":
      return items.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
    default:
      return items.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      );
  }
}

function filterProducts(products: ProductRecord[], params?: URLSearchParams) {
  if (!params) return products;

  const category = params.get("category");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const colors = params.get("colors")?.split(",").filter(Boolean) ?? [];
  const sizes = params.get("sizes")?.split(",").filter(Boolean) ?? [];
  const q = params.get("q")?.trim().toLowerCase();

  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (minPrice && product.price < Number(minPrice)) return false;
    if (maxPrice && product.price > Number(maxPrice)) return false;
    if (
      colors.length &&
      !colors.some((color) => product.colors.includes(color))
    )
      return false;
    if (sizes.length && !sizes.some((size) => product.sizes.includes(size)))
      return false;
    if (
      q &&
      !product.name.toLowerCase().includes(q) &&
      !product.description.toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });
}

export async function getAllProducts(params?: URLSearchParams) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    const normalized = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return filterProducts(normalized, params);
  } catch {
    return filterProducts(mockProducts, params);
  }
}

export async function getFeaturedProducts() {
  const items = await getAllProducts();
  return items.filter((product) => product.isFeatured).slice(0, 12);
}

export async function getFlashSaleProducts() {
  const items = await getAllProducts();
  return items.filter((product) => product.isOnSale).slice(0, 4);
}

export async function getNewArrivalProducts() {
  const items = await getAllProducts();
  return items.filter((product) => product.isNewArrival).slice(0, 8);
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product)
      return mockProducts.find((item) => item.slug === slug) ?? null;

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  } catch {
    return mockProducts.find((item) => item.slug === slug) ?? null;
  }
}

export async function getRelatedProducts(
  slug: string,
  category: Product["category"],
) {
  const items = await getAllProducts();
  return items
    .filter((product) => product.category === category && product.slug !== slug)
    .slice(0, 4);
}

export async function getProductSearch(query: string) {
  const params = new URLSearchParams();
  params.set("q", query);
  return getAllProducts(params);
}

export async function getProductsPage(
  params: URLSearchParams,
  page: number,
  limit: number,
) {
  const filtered = sortProducts(
    await getAllProducts(params),
    params.get("sort"),
  );
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  const total = filtered.length;

  return {
    items,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    page,
  };
}
