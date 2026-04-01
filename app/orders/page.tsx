"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
    <div className="container-px mx-auto max-w-6xl py-8">
      <h1 className="mb-6 text-3xl font-semibold">Orders</h1>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="rounded-xl border border-zinc-200 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold">{order.id}</h2>
                  <Badge className="bg-zinc-100 text-zinc-700">
                    {order.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-500">{order.date}</p>
                <p className="mt-2 text-sm text-zinc-600">
                  {order.items.join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">{order.total}</p>
                <button
                  className="text-sm text-[#8B1A1A]"
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
              <div className="mt-5 grid gap-3 rounded-lg bg-zinc-50 p-4 sm:grid-cols-4">
                {timeline.map((step, index) => {
                  const active = timeline.indexOf(order.status) >= index;
                  return (
                    <div key={step} className="flex items-center gap-2 text-sm">
                      <span
                        className={`h-3 w-3 rounded-full ${active ? "bg-black" : "bg-zinc-300"}`}
                      />
                      <span className={active ? "text-black" : "text-zinc-500"}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
