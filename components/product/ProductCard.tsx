"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/types";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  return (
    <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>
        {product.isOnSale ? (
          <Badge className="absolute left-2 top-2 bg-[#8B1A1A] text-white">
            Sale
          </Badge>
        ) : null}
        <button
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2"
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
        </button>
      </div>
      <div className="space-y-2 p-3">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-sm font-medium"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          {product.rating} ({product.reviewCount})
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-xs text-zinc-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          ) : null}
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={() => {
            addItem({
              id: `${product.id}-default`,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              price: product.price,
              quantity: 1,
            });
            toast.success("Added to cart");
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
