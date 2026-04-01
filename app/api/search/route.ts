import { NextRequest, NextResponse } from "next/server";
import { getProductSearch } from "@/lib/data";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ items: [], total: 0 });
  }

  const items = await getProductSearch(q);

  return NextResponse.json({ items, total: items.length });
}
