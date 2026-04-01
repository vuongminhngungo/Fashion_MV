"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import MotionSection from "@/components/shared/MotionSection";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  if (!wishlistItems.length) {
    return (
      <div className="container-px shopee-shell py-10">
        <EmptyState
          title="Your wishlist is empty"
          description="Save the pieces you love and come back to them anytime."
          ctaLabel="Explore Products"
          ctaHref="/products"
        />
      </div>
    );
  }

  const products = wishlistItems.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: "Saved wishlist item",
    price: item.price,
    originalPrice: null,
    category: "CLOTHING" as const,
    images: [item.image],
    colors: ["black"],
    sizes: ["One Size"],
    stock: 10,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.5,
    reviewCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="My Wishlist"
          subtitle="Shopee-inspired saved products area with quick actions for fast conversion"
          action={
            <span className="shopee-pill">{wishlistItems.length} saved</span>
          }
        />
        <ProductGrid products={products} columns={4} />
      </MotionSection>

      <MotionSection
        delay={0.05}
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="rounded-sm bg-white p-4 shadow-sm"
          >
            <h2 className="font-medium text-zinc-900">{item.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Saved for your next checkout session
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                className="rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]"
                onClick={() => {
                  addItem({
                    id: `${item.id}-wishlist`,
                    slug: item.slug,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: 1,
                  });
                  removeItem(item.id);
                  toast.success("Moved to cart");
                }}
              >
                Move to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm"
                onClick={() => {
                  removeItem(item.id);
                  toast.success("Removed from wishlist");
                }}
              >
                Remove
              </Button>
            </div>
          </motion.div>
        ))}
      </MotionSection>
    </div>
  );
}
