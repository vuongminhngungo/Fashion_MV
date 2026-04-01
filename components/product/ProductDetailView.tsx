"use client";

import { useMemo, useState } from "react";
import { Heart, ShieldCheck, ShoppingCart, Store, Truck } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumb from "@/components/shared/Breadcrumb";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
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

  const handleAddToCart = () => {
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
  };

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <MotionSection className="mt-4 rounded-sm bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ProductCarousel images={product.images} name={product.name} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.isOnSale ? (
                <Badge className="rounded-sm bg-[#ee4d2d] px-2.5 py-1 text-white">
                  Flash Sale
                </Badge>
              ) : null}
              <Badge className="rounded-sm bg-orange-50 px-2.5 py-1 text-[#ee4d2d]">
                {product.category}
              </Badge>
            </div>

            <h1 className="mt-3 text-2xl font-semibold leading-snug text-zinc-900 md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span>⭐ {product.rating}</span>
              <span>{product.reviewCount} reviews</span>
              <span>2.1k sold</span>
            </div>

            <div className="mt-5 rounded-sm bg-[#fff6f3] px-4 py-5">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-bold text-[#ee4d2d]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice ? (
                  <span className="text-base text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                ) : null}
                {product.originalPrice ? (
                  <span className="rounded-sm bg-[#ee4d2d] px-2 py-1 text-xs font-bold text-white">
                    SAVE{" "}
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div className="grid grid-cols-[92px_1fr] gap-3">
                <p className="pt-2 text-sm text-zinc-500">Shipping</p>
                <div className="space-y-2 rounded-sm border border-zinc-100 bg-zinc-50 p-3 text-sm">
                  <p className="flex items-center gap-2 text-zinc-700">
                    <Truck className="h-4 w-4 text-[#ee4d2d]" />
                    Fast delivery · Receive in 2-4 days
                  </p>
                  <p className="flex items-center gap-2 text-zinc-700">
                    <ShieldCheck className="h-4 w-4 text-[#ee4d2d]" />
                    7-day free returns for eligible items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[92px_1fr] gap-3">
                <p className="pt-2 text-sm text-zinc-500">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`min-w-20 rounded-sm border px-3 py-2 text-sm capitalize transition ${
                        color === c
                          ? "border-[#ee4d2d] bg-orange-50 text-[#ee4d2d]"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-[#ee4d2d]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[92px_1fr] gap-3">
                <p className="pt-2 text-sm text-zinc-500">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <Button
                      key={s}
                      variant={size === s ? "default" : "outline"}
                      size="sm"
                      className={
                        size === s
                          ? "rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                          : "rounded-sm"
                      }
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[92px_1fr] gap-3">
                <p className="pt-2 text-sm text-zinc-500">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-sm border border-zinc-200">
                    <button
                      className="h-10 w-10 text-lg text-zinc-600 hover:bg-zinc-50"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="flex h-10 w-12 items-center justify-center border-x border-zinc-200 text-sm">
                      {qty}
                    </span>
                    <button
                      className="h-10 w-10 text-lg text-zinc-600 hover:bg-zinc-50"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-medium text-[#ee4d2d]">
                    {stockLabel}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  className="h-12 min-w-52 rounded-sm border border-[#ee4d2d] bg-orange-50 px-6 text-[#ee4d2d] hover:bg-orange-100"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  className="h-12 min-w-40 rounded-sm bg-[#ee4d2d] px-6 text-white hover:bg-[#d94324]"
                  onClick={handleAddToCart}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-sm"
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

            <div className="mt-6 grid gap-3 rounded-sm border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-600 md:grid-cols-3">
              <p className="flex items-center gap-2">
                <Store className="h-4 w-4 text-[#ee4d2d]" /> Official Fashion_MV
                Shop
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#ee4d2d]" /> Guaranteed
                Authentic
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#ee4d2d]" /> Nationwide Delivery
              </p>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        delay={0.05}
        className="mt-4 rounded-sm bg-white p-4 shadow-sm md:p-5"
      >
        <SectionHeading
          title="Product Details"
          subtitle="Marketplace-style information layout for fast scanning before purchase"
        />
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-2 border-b border-zinc-100 pb-2">
              <span className="text-zinc-500">Category</span>
              <span className="font-medium text-zinc-800">
                {product.category}
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 border-b border-zinc-100 pb-2">
              <span className="text-zinc-500">Available Colors</span>
              <span className="font-medium text-zinc-800">
                {product.colors.join(", ")}
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 border-b border-zinc-100 pb-2">
              <span className="text-zinc-500">Available Sizes</span>
              <span className="font-medium text-zinc-800">
                {product.sizes.join(", ")}
              </span>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2 pb-2">
              <span className="text-zinc-500">Stock</span>
              <span className="font-medium text-zinc-800">
                {product.stock} items
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Description
            </h3>
            <p className="mt-3 leading-7 text-zinc-600">
              {product.description}
            </p>
            <div className="mt-5 rounded-sm bg-[#fff6f3] p-4 text-sm text-zinc-700">
              Customers love the strong marketplace visual hierarchy here: clear
              pricing, quick choices, and direct checkout actions inspired by
              Shopee product pages.
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        delay={0.1}
        className="mt-4 rounded-sm bg-white p-4 shadow-sm md:p-5"
      >
        <SectionHeading
          title="Related Products"
          subtitle="Recommended items arranged in a dense Shopee-style selling grid"
        />
        <ProductGrid products={related} columns={4} />
      </MotionSection>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="fixed bottom-16 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"
      >
        <div className="container-px flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {product.name}
            </p>
            <p className="text-base font-bold text-[#ee4d2d]">
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            className="h-11 rounded-sm bg-[#ee4d2d] px-5 text-white hover:bg-[#d94324]"
            onClick={handleAddToCart}
          >
            Add
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
