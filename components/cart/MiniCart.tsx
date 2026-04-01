"use client";

import { useCartStore } from "@/store/useCartStore";

export default function MiniCart() {
  const count = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );
  return <span className="text-xs text-zinc-500">{count} item(s)</span>;
}
