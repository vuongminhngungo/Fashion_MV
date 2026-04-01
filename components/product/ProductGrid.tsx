import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

export default function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
}) {
  const columnClass =
    columns === 2
      ? "md:grid-cols-2 lg:grid-cols-2"
      : columns === 3
        ? "md:grid-cols-3 lg:grid-cols-3"
        : "md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-4 ${columnClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
