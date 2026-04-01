import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedProducts,
  getFlashSaleProducts,
  getNewArrivalProducts,
} from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Countdown from "@/components/shared/Countdown";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "fashion-mv | Home",
    description: "Modern fashion e-commerce storefront",
  };
}

const serialize = <T extends { createdAt: string; updatedAt: string }>(p: T) =>
  p;

export default async function HomePage() {
  const [featured, flashSale, arrivals] = await Promise.all([
    getFeaturedProducts(),
    getFlashSaleProducts(),
    getNewArrivalProducts(),
  ]);

  const categories = [
    {
      name: "Clothing",
      image: "https://picsum.photos/seed/category-clothing/1000/700",
      href: "/products?category=CLOTHING",
    },
    {
      name: "Shoes",
      image: "https://picsum.photos/seed/category-shoes/1000/700",
      href: "/products?category=SHOES",
    },
    {
      name: "Bags",
      image: "https://picsum.photos/seed/category-bags/1000/700",
      href: "/products?category=BAGS",
    },
  ];

  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src="https://picsum.photos/seed/fashion-hero/1920/1080"
          alt="Fashion hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="container-px relative z-10 mx-auto flex h-full max-w-7xl items-center">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-[0.2em]">New Season</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Style that moves with you
            </h1>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-[#8B1A1A] px-5 py-3 text-sm font-medium"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="container-px section-gap mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Flash Sale</h2>
          <Countdown
            endAt={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}
          />
        </div>
        <ProductGrid products={flashSale} columns={4} />
      </section>

      <section className="container-px section-gap mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Featured Categories</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 text-lg font-semibold text-white">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-px section-gap mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Featured Products</h2>
        <ProductGrid products={featured} columns={4} />
      </section>

      <section className="container-px section-gap mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">New Arrivals</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {arrivals.map(
            (p: {
              id: string;
              slug: string;
              name: string;
              images: string[];
            }) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="min-w-[220px] max-w-[220px]"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-medium">
                  {p.name}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-12">
        <div className="rounded-xl bg-zinc-100 p-4 text-center text-sm">
          You are $40 away from free shipping.
        </div>
        <div className="mt-8 rounded-xl border p-6 text-center">
          <h3 className="text-xl font-semibold">Join our newsletter</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Get exclusive deals and new drops.
          </p>
          <div className="mx-auto mt-4 flex max-w-md gap-2">
            <input
              className="h-10 flex-1 rounded-md border px-3"
              placeholder="Email address"
            />
            <button className="rounded-md bg-black px-4 text-sm font-medium text-white">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
