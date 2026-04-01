import { Category, Prisma } from "@prisma/client";

export function buildProductWhere(
  params: URLSearchParams,
): Prisma.ProductWhereInput {
  const category = params.get("category") as Category | null;
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const colors = params.get("colors");
  const sizes = params.get("sizes");
  const q = params.get("q");

  return {
    ...(category ? { category } : {}),
    ...(minPrice || maxPrice
      ? {
          price: {
            ...(minPrice ? { gte: Number(minPrice) } : {}),
            ...(maxPrice ? { lte: Number(maxPrice) } : {}),
          },
        }
      : {}),
    ...(colors ? { colors: { hasSome: colors.split(",") } } : {}),
    ...(sizes ? { sizes: { hasSome: sizes.split(",") } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
}

export function buildProductOrder(
  sort?: string | null,
): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case "price-asc":
      return { price: "asc" };
    case "price-desc":
      return { price: "desc" };
    case "best-selling":
      return { reviewCount: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}
