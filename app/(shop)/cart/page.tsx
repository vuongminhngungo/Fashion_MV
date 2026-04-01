"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import CartItem from "@/components/cart/CartItem";
import EmptyState from "@/components/shared/EmptyState";
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
      <div className="container-px mx-auto max-w-5xl py-10">
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
    <div className="container-px mx-auto max-w-6xl py-8">
      <h1 className="mb-6 text-3xl font-semibold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
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
          ))}

          <div className="rounded-xl bg-zinc-100 p-4 text-sm">
            {remainingForFreeShipping > 0
              ? `Add ${formatPrice(remainingForFreeShipping)} more for free shipping`
              : "You have unlocked free shipping"}
          </div>
        </section>

        <aside className="space-y-4 rounded-xl border border-zinc-200 p-5">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              defaultValue={coupon ?? ""}
              id="coupon-code"
            />
            <Button
              type="button"
              variant="outline"
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

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
