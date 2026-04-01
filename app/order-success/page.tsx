"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";
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
    <div className="container-px shopee-shell py-8 md:py-12">
      <MotionSection className="rounded-sm bg-white p-6 shadow-sm md:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ee4d2d]">
            Order Confirmed
          </p>
          <h1 className="mt-3 text-3xl font-black text-zinc-900 md:text-4xl">
            Thank you for your purchase
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Your order number is{" "}
            <span className="font-semibold text-zinc-900">{orderNumber}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Estimated delivery: {deliveryDate}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-sm bg-zinc-50 p-5">
          <SectionHeading
            title="Items Ordered"
            subtitle="Order snapshot displayed in a Shopee-like confirmation layout"
          />
          <div className="mt-4 space-y-3">
            {(items.length
              ? items
              : [{ id: "mock-item", name: "Sample Fashion Item", quantity: 1 }]
            ).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.04 }}
                className="flex items-center justify-between border-b border-zinc-200 pb-3 text-sm last:border-b-0 last:pb-0"
              >
                <span className="font-medium text-zinc-800">{item.name}</span>
                <span className="text-zinc-500">Qty {item.quantity}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products">
            <Button className="h-11 rounded-sm bg-[#ee4d2d] hover:bg-[#d94324]">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" className="h-11 rounded-sm">
              Track Order
            </Button>
          </Link>
        </div>
      </MotionSection>
    </div>
  );
}
