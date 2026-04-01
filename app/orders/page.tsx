"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";

const mockOrders = [
  {
    id: "FM-102341",
    date: "March 20, 2026",
    status: "Delivered",
    total: "$189",
    items: ["Urban Oversized Tee", "Retro Runner Sneakers"],
  },
  {
    id: "FM-102198",
    date: "March 12, 2026",
    status: "Shipped",
    total: "$129",
    items: ["Metro Crossbody Bag"],
  },
  {
    id: "FM-101972",
    date: "February 28, 2026",
    status: "Confirmed",
    total: "$249",
    items: ["Trail Hiker Boots", "Cotton Hoodie Essential"],
  },
];

const timeline = ["Placed", "Confirmed", "Shipped", "Delivered"];

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    mockOrders[0].id,
  );

  return (
    <div className="container-px shopee-shell py-6 md:py-8">
      <MotionSection className="rounded-sm bg-white p-4 shadow-sm md:p-5">
        <SectionHeading
          title="My Orders"
          subtitle="Order tracking and delivery states displayed in a Shopee-like account experience"
          action={<span className="shopee-pill">3 orders</span>}
        />
      </MotionSection>

      <MotionSection delay={0.05} className="mt-5 space-y-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="rounded-sm bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-zinc-900">{order.id}</h2>
                  <Badge className="rounded-sm bg-orange-50 text-[#ee4d2d]">
                    {order.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-500">{order.date}</p>
                <p className="mt-2 text-sm text-zinc-600">
                  {order.items.join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-[#ee4d2d]">
                  {order.total}
                </p>
                <button
                  className="text-sm font-medium text-[#ee4d2d]"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id,
                    )
                  }
                >
                  {expandedOrder === order.id ? "Hide details" : "View details"}
                </button>
              </div>
            </div>

            {expandedOrder === order.id ? (
              <div className="mt-5 grid gap-3 rounded-sm bg-zinc-50 p-4 sm:grid-cols-4">
                {timeline.map((step, stepIndex) => {
                  const active = timeline.indexOf(order.status) >= stepIndex;
                  return (
                    <div key={step} className="flex items-center gap-2 text-sm">
                      <span
                        className={`h-3 w-3 rounded-full ${active ? "bg-[#ee4d2d]" : "bg-zinc-300"}`}
                      />
                      <span
                        className={
                          active ? "font-medium text-zinc-900" : "text-zinc-500"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        ))}
      </MotionSection>
    </div>
  );
}
