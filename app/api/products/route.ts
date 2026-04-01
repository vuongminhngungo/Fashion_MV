import { NextRequest, NextResponse } from "next/server";
import { getProductsPage } from "@/lib/data";
import { buildProductOrder, buildProductWhere } from "@/lib/products";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Number(params.get("page") || "1");
  const limit = 8;
  const skip = (page - 1) * limit;

  const where = buildProductWhere(params);
  const orderBy = buildProductOrder(params.get("sort"));

  const result = await getProductsPage(params, page, limit);

  return NextResponse.json(result);
}
