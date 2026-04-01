"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-zinc-500">
          {item.color || "Default"} · {item.size || "One Size"}
        </p>
        <p className="mt-1 text-sm font-semibold">{formatPrice(item.price)}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onDecrease}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <Button size="sm" variant="outline" onClick={onIncrease}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <button
            onClick={onRemove}
            className="text-zinc-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
