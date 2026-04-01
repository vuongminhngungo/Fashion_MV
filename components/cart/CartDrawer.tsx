"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <p className="font-medium">Mini Cart</p>
      <p className="mt-2 text-sm text-zinc-600">{items.length} items</p>
      <p className="mt-1 font-semibold">{formatPrice(subtotal)}</p>
      <Link
        href="/cart"
        className="mt-3 inline-block text-sm text-[#8B1A1A] underline"
      >
        View cart
      </Link>
    </div>
  );
}
