"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className="group shopee-card shopee-card-hover overflow-hidden rounded-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
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
          <Badge className="absolute left-0 top-3 rounded-r-sm rounded-l-none bg-[#ee4d2d] px-3 py-1 text-white">
            Flash Sale
          </Badge>
        ) : null}
        <button
          className="absolute right-2 top-2 rounded-full bg-white p-2 text-zinc-700 shadow-sm transition hover:text-[#ee4d2d]"
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
          className="line-clamp-2 min-h-10 text-sm leading-5 text-zinc-800"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Star className="h-3.5 w-3.5 fill-[#ffb21d] text-[#ffb21d]" />
          <span>{product.rating}</span>
          <span>Sold {product.reviewCount}</span>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            {product.originalPrice ? (
              <p className="text-xs text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            ) : (
              <p className="text-xs text-transparent">.</p>
            )}
            <span className="text-lg font-semibold text-[#ee4d2d]">
              {formatPrice(product.price)}
            </span>
          </div>
          <Button
            size="sm"
            className="h-9 rounded-sm bg-[#ee4d2d] px-3 text-white hover:bg-[#d94324]"
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
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
