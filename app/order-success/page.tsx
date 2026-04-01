"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function OrderSuccessPage() {
  const items = useCartStore((s) => s.items);
  const orderNumber = useMemo(
    () => `FM-${Math.floor(100000 + Math.random() * 900000)}`,
    [],
  );
  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <div className="container-px mx-auto max-w-4xl py-12">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[#8B1A1A]">
          Order Confirmed
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Thank you for your purchase
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          Your order number is{" "}
          <span className="font-medium text-black">{orderNumber}</span>.
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          Estimated delivery: {deliveryDate}
        </p>

        <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-zinc-50 p-5 text-left">
          <h2 className="text-lg font-semibold">Items Ordered</h2>
          <div className="mt-4 space-y-3">
            {(items.length
              ? items
              : [{ id: "mock-item", name: "Sample Fashion Item", quantity: 1 }]
            ).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-zinc-200 pb-3 text-sm last:border-b-0 last:pb-0"
              >
                <span>{item.name}</span>
                <span className="text-zinc-500">Qty {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline">Track Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
