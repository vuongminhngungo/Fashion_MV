"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CartItem from "@/components/cart/CartItem";
import EmptyState from "@/components/shared/EmptyState";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, coupon, updateQuantity, removeItem, setCoupon } =
    useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = coupon === "FASHION10" ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= 120 || items.length === 0 ? 0 : 12;
  const total = subtotal - discount + shipping;
  const remainingForFreeShipping = Math.max(0, 120 - (subtotal - discount));

  if (!items.length) {
    return (
      <div className="container-px shopee-shell py-10">
        <EmptyState
          title="Your cart is empty"
          description="Browse the latest fashion pieces and add your favorites to cart."
          ctaLabel="Shop Products"
          ctaHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="mb-5 rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="Shopping Cart"
          subtitle="A Shopee-style checkout staging area with vouchers, urgency, and summary details"
          action={<span className="shopee-pill">{items.length} item(s)</span>}
        />
      </MotionSection>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <MotionSection className="space-y-4">
          <div className="rounded-sm border border-orange-200 bg-[#fff6f3] px-4 py-3 text-sm text-zinc-700 shadow-sm">
            {remainingForFreeShipping > 0
              ? `Add ${formatPrice(remainingForFreeShipping)} more for free shipping`
              : "You have unlocked free shipping"}
          </div>

          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
            >
              <CartItem
                item={item}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrease={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                onRemove={() => {
                  removeItem(item.id);
                  toast.success("Removed from cart");
                }}
              />
            </motion.div>
          ))}
        </MotionSection>

        <MotionSection className="rounded-sm bg-white p-5 shadow-sm">
          <SectionHeading
            title="Order Summary"
            subtitle="Voucher-first summary block inspired by marketplace checkout sidebars"
          />

          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Enter coupon code"
              defaultValue={coupon ?? ""}
              id="coupon-code"
              className="h-11 rounded-sm"
            />
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-sm border-[#ee4d2d] text-[#ee4d2d] hover:bg-orange-50"
              onClick={() => {
                const input = document.getElementById(
                  "coupon-code",
                ) as HTMLInputElement | null;
                const value = input?.value?.trim().toUpperCase() ?? "";
                if (value === "FASHION10") {
                  setCoupon(value);
                  toast.success("Coupon applied");
                } else {
                  setCoupon(null);
                  toast.error("Invalid coupon code");
                }
              }}
            >
              Apply
            </Button>
          </div>

          <div className="mt-5 space-y-3 text-sm text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-zinc-900">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-medium text-[#ee4d2d]">
                -{formatPrice(discount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-zinc-900">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="rounded-sm bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
              Orders above $120 receive free shipping. Marketplace promotions
              apply at checkout.
            </div>
            <div className="flex justify-between border-t border-zinc-100 pt-4 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span className="text-2xl text-[#ee4d2d]">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="mt-5 block">
            <Button className="h-12 w-full rounded-sm bg-[#ee4d2d] text-white hover:bg-[#d94324]">
              Proceed to Checkout
            </Button>
          </Link>
        </MotionSection>
      </div>
    </div>
  );
}
