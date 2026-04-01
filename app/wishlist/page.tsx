"use client";

import toast from "react-hot-toast";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  if (!wishlistItems.length) {
    return (
      <div className="container-px mx-auto max-w-5xl py-10">
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
    <div className="container-px mx-auto max-w-7xl py-8">
      <h1 className="mb-6 text-3xl font-semibold">Wishlist</h1>
      <ProductGrid products={products} columns={4} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-zinc-200 p-4">
            <h2 className="font-medium">{item.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">Saved for later</p>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
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
                onClick={() => {
                  removeItem(item.id);
                  toast.success("Removed from wishlist");
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
