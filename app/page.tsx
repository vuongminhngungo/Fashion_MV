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
import MotionSection from "@/components/shared/MotionSection";
import SectionHeading from "@/components/shared/SectionHeading";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FashionMN | Home",
    description: "Modern fashion e-commerce storefront",
  };
}

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
      note: "Trending tees, outerwear, and clean fits",
    },
    {
      name: "Shoes",
      image: "https://picsum.photos/seed/category-shoes/1000/700",
      href: "/products?category=SHOES",
      note: "Best-selling sneakers, sandals, and heels",
    },
    {
      name: "Bags",
      image: "https://picsum.photos/seed/category-bags/1000/700",
      href: "/products?category=BAGS",
      note: "Crossbody, totes, duffles, and travel picks",
    },
  ];

  const promoBadges = [
    "100% Authentic",
    "Free Returns",
    "Mall Style Deals",
    "Fast Delivery",
    "Voucher Every Day",
  ];

  return (
    <div className="pb-10">
      <section className="shopee-gradient shopee-grid-bg pb-6 pt-4 md:pb-8 md:pt-6">
        <div className="container-px shopee-shell">
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <MotionSection className="relative min-h-[360px] overflow-hidden rounded-sm">
              <Image
                src="https://picsum.photos/seed/fashion-hero/1920/1080"
                alt="Fashion hero"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-6 py-8 text-white md:px-10">
                <span className="shopee-pill w-fit bg-white/15 text-white">
                  Super Fashion Sale
                </span>
                <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight md:text-5xl">
                  Discover Shopee-style fashion deals with bold daily drops
                </h1>
                <p className="mt-3 max-w-lg text-sm text-white/85 md:text-base">
                  Shop fashion essentials, trend-driven collections, and
                  limited-time discounts curated for a fast, mobile-first
                  marketplace feel.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex h-11 items-center justify-center rounded-sm bg-[#ee4d2d] px-6 text-sm font-bold text-white transition hover:bg-[#d94324]"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/search?q=sale"
                    className="inline-flex h-11 items-center justify-center rounded-sm border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Explore Deals
                  </Link>
                </div>
              </div>
            </MotionSection>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <MotionSection
                delay={0.05}
                className="shopee-card overflow-hidden rounded-sm"
              >
                <div className="relative min-h-[172px]">
                  <Image
                    src="https://picsum.photos/seed/home-banner-right-1/900/700"
                    alt="Voucher banner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative z-10 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                      Voucher Zone
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Extra 10% OFF</h2>
                    <p className="mt-1 text-sm text-white/85">
                      Apply code on cart and unlock more savings.
                    </p>
                  </div>
                </div>
              </MotionSection>

              <MotionSection
                delay={0.1}
                className="shopee-card overflow-hidden rounded-sm"
              >
                <div className="relative min-h-[172px]">
                  <Image
                    src="https://picsum.photos/seed/home-banner-right-2/900/700"
                    alt="Fast delivery banner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative z-10 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                      Fast Delivery
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Ships in 24h</h2>
                    <p className="mt-1 text-sm text-white/85">
                      Marketplace speed with premium fashion picks.
                    </p>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>

          <MotionSection
            delay={0.15}
            className="mt-4 shopee-card rounded-sm bg-white px-4 py-3"
          >
            <div className="grid grid-cols-2 gap-3 text-center text-xs font-semibold text-zinc-600 md:grid-cols-5">
              {promoBadges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-sm bg-zinc-50 px-3 py-3 text-[#ee4d2d]"
                >
                  {badge}
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="container-px shopee-shell section-gap">
        <div className="shopee-card rounded-sm p-4 md:p-5">
          <SectionHeading
            title="Flash Sale"
            subtitle="Limited-time markdowns refreshed for marketplace-style urgency"
            action={
              <Countdown
                endAt={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}
              />
            }
          />
          <ProductGrid products={flashSale} columns={4} />
        </div>
      </MotionSection>

      <MotionSection delay={0.05} className="container-px shopee-shell pb-2">
        <div className="shopee-card rounded-sm p-4 md:p-5">
          <SectionHeading
            title="Featured Categories"
            subtitle="One-tap discovery blocks inspired by high-conversion marketplace layouts"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-sm border border-zinc-100 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      Category 0{index + 1}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/85">
                      {category.note}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        delay={0.1}
        className="container-px shopee-shell section-gap"
      >
        <div className="shopee-card rounded-sm p-4 md:p-5">
          <SectionHeading
            title="Featured Products"
            subtitle="Top picks arranged with a Shopee-inspired card-first shopping experience"
            action={
              <Link
                href="/products"
                className="text-sm font-semibold text-[#ee4d2d]"
              >
                View All
              </Link>
            }
          />
          <ProductGrid products={featured} columns={4} />
        </div>
      </MotionSection>

      <MotionSection delay={0.15} className="container-px shopee-shell pb-2">
        <div className="shopee-card rounded-sm p-4 md:p-5">
          <SectionHeading
            title="New Arrivals"
            subtitle="Scrollable discovery row styled like a commerce feed"
          />
          <div className="shopee-scrollbar flex gap-4 overflow-x-auto pb-2">
            {arrivals.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group min-w-[210px] max-w-[210px] rounded-sm border border-zinc-100 bg-white transition hover:-translate-y-0.5 hover:border-[#ee4d2d]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="210px"
                  />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 min-h-10 text-sm text-zinc-800">
                    {product.name}
                  </p>
                  <p className="mt-2 text-base font-bold text-[#ee4d2d]">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        delay={0.2}
        className="container-px shopee-shell section-gap"
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="shopee-card rounded-sm p-5">
            <SectionHeading
              title="Free Shipping Progress"
              subtitle="An urgency block similar to marketplace incentive modules"
            />
            <div className="rounded-sm bg-zinc-100 p-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Add $40 more to unlock free shipping</span>
                <span className="text-[#ee4d2d]">67%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#ee4d2d] to-[#ff9a52]" />
              </div>
            </div>
          </div>

          <div className="shopee-card rounded-sm p-5">
            <SectionHeading
              title="Newsletter"
              subtitle="Stay updated with campaign drops and exclusive vouchers"
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <input
                className="h-11 rounded-sm border border-zinc-200 px-4 outline-none focus:border-[#ee4d2d]"
                placeholder="Enter your email"
              />
              <button className="h-11 rounded-sm bg-[#ee4d2d] px-5 text-sm font-bold text-white transition hover:bg-[#d94324]">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
