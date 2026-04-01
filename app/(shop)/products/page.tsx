import type { Metadata } from "next";
import ProductsClient from "@/components/product/ProductsClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FashionMN | Products",
    description:
      "Browse fashion products with filters, sorting, and pagination",
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
