"use client";

import { useMemo, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { formatPrice, getStockLabel } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types";

export default function ProductDetailView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const [size, setSize] = useState(product.sizes[0] || "One Size");
  const [color, setColor] = useState(product.colors[0] || "black");
  const [qty, setQty] = useState(1);

  const stockLabel = useMemo(
    () => getStockLabel(product.stock),
    [product.stock],
  );

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />
      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <ProductCarousel images={product.images} name={product.name} />
        <div>
          <Badge className="mb-3 bg-zinc-100 text-zinc-700">
            {product.category}
          </Badge>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <p className="mt-4 text-sm text-zinc-600">{product.description}</p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-7 w-7 rounded-full border-2 ${color === c ? "border-black" : "border-zinc-300"}`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s}
                    variant={size === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </Button>
                <span className="w-8 text-center">{qty}</span>
                <Button variant="outline" onClick={() => setQty((q) => q + 1)}>
                  +
                </Button>
              </div>
            </div>
            <p className="text-sm font-medium text-[#8B1A1A]">{stockLabel}</p>
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  addItem({
                    id: `${product.id}-${color}-${size}`,
                    slug: product.slug,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    quantity: qty,
                    color,
                    size,
                  });
                  toast.success("Added to cart");
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toggleWishlist({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                  });
                  toast.success("Updated wishlist");
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Related Products</h2>
        <ProductGrid products={related} columns={4} />
      </section>
    </div>
  );
}
