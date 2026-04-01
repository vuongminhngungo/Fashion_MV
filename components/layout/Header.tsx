"use client";

import Link from "next/link";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Header() {
  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center gap-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          fashion-mv
        </Link>
        <div className="hidden flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input className="pl-9" placeholder="Search products..." />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-[#8B1A1A] px-1.5 text-[10px] text-white">
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-1.5 text-[10px] text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
