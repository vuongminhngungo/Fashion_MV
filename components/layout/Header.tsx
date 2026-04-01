"use client";

import Link from "next/link";
import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const quickLinks = [
  "Flash Sale",
  "Mall",
  "Free Shipping",
  "New Arrival",
  "Best Seller",
  "Voucher Zone",
];

export default function Header() {
  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[#ee4d2d] to-[#f86f3f] text-white shadow-lg">
      <div className="container-px mx-auto hidden max-w-7xl items-center justify-between py-2 text-xs md:flex">
        <div className="flex items-center gap-4 text-white/90">
          <span>Seller Centre</span>
          <span>Download</span>
          <span>Follow us</span>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <span className="flex items-center gap-1">
            <Bell className="h-3.5 w-3.5" /> Notifications
          </span>
          <Link href="/orders">Orders</Link>
          <Link href="/login" className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> Account
          </Link>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/"
            className="shrink-0 text-2xl font-black tracking-tight md:text-3xl"
          >
            Fashion_MV
          </Link>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0.9, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-sm bg-white p-1 shadow-md"
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                className="h-11 border-0 bg-transparent pl-10 pr-24 text-black focus:border-0"
                placeholder="Shopee-style search for fashion, shoes, bags..."
              />
              <button className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-sm bg-[#ee4d2d] px-4 text-sm font-semibold text-white transition hover:bg-[#d94324]">
                Search
              </button>
            </motion.div>
            <div className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 text-xs text-white/90 md:flex">
              {quickLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <Link
              href="/wishlist"
              className="relative transition hover:scale-105"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 ? (
                <span className="absolute -right-2 -top-2 rounded-full bg-white px-1.5 text-[10px] font-bold text-[#ee4d2d]">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
            <Link href="/cart" className="relative transition hover:scale-105">
              <ShoppingCart className="h-7 w-7" />
              {cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 rounded-full bg-white px-1.5 text-[10px] font-bold text-[#ee4d2d]">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
