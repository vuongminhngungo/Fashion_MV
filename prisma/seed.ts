import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  isOnSale: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  rating: number;
  reviewCount: number;
};

const products: SeedProduct[] = [
  // CLOTHING (8)
  {
    slug: "urban-oversized-tee-black",
    name: "Urban Oversized Tee",
    description:
      "Premium cotton oversized t-shirt with relaxed fit and breathable texture for all-day comfort.",
    price: 39,
    originalPrice: 49,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/urban-oversized-tee-black-1/800/800",
      "https://picsum.photos/seed/urban-oversized-tee-black-2/800/800",
      "https://picsum.photos/seed/urban-oversized-tee-black-3/800/800",
    ],
    colors: ["black", "white", "gray"],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.5,
    reviewCount: 124,
  },
  {
    slug: "minimal-linen-shirt-ivory",
    name: "Minimal Linen Shirt",
    description:
      "Lightweight linen shirt designed for warm weather with a refined, minimal silhouette.",
    price: 69,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/minimal-linen-shirt-ivory-1/800/800",
      "https://picsum.photos/seed/minimal-linen-shirt-ivory-2/800/800",
      "https://picsum.photos/seed/minimal-linen-shirt-ivory-3/800/800",
    ],
    colors: ["ivory", "beige", "navy"],
    sizes: ["S", "M", "L"],
    stock: 10,
    isOnSale: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 88,
  },
  {
    slug: "tailored-wide-leg-trousers",
    name: "Tailored Wide-Leg Trousers",
    description:
      "Elegant wide-leg trousers with clean tailoring for modern smart-casual outfits.",
    price: 89,
    originalPrice: 119,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/tailored-wide-leg-trousers-1/800/800",
      "https://picsum.photos/seed/tailored-wide-leg-trousers-2/800/800",
      "https://picsum.photos/seed/tailored-wide-leg-trousers-3/800/800",
    ],
    colors: ["charcoal", "black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    isOnSale: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.4,
    reviewCount: 62,
  },
  {
    slug: "soft-knit-cardigan-burgundy",
    name: "Soft Knit Cardigan",
    description:
      "Cozy rib-knit cardigan in deep burgundy tones, ideal for layered transitional looks.",
    price: 79,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/soft-knit-cardigan-burgundy-1/800/800",
      "https://picsum.photos/seed/soft-knit-cardigan-burgundy-2/800/800",
      "https://picsum.photos/seed/soft-knit-cardigan-burgundy-3/800/800",
    ],
    colors: ["burgundy", "cream"],
    sizes: ["M", "L", "XL"],
    stock: 12,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.6,
    reviewCount: 49,
  },
  {
    slug: "structured-denim-jacket",
    name: "Structured Denim Jacket",
    description:
      "Modern cut denim jacket with reinforced seams and a timeless, structured shape.",
    price: 99,
    originalPrice: 129,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/structured-denim-jacket-1/800/800",
      "https://picsum.photos/seed/structured-denim-jacket-2/800/800",
      "https://picsum.photos/seed/structured-denim-jacket-3/800/800",
    ],
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 5,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 203,
  },
  {
    slug: "everyday-jogger-pants",
    name: "Everyday Jogger Pants",
    description:
      "Tapered joggers with stretch fabric and soft inner lining for casual comfort.",
    price: 59,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/everyday-jogger-pants-1/800/800",
      "https://picsum.photos/seed/everyday-jogger-pants-2/800/800",
      "https://picsum.photos/seed/everyday-jogger-pants-3/800/800",
    ],
    colors: ["gray", "black", "olive"],
    sizes: ["S", "M", "L", "XL"],
    stock: 22,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.3,
    reviewCount: 71,
  },
  {
    slug: "silk-blend-midi-dress",
    name: "Silk-Blend Midi Dress",
    description:
      "Flowing midi dress crafted in a soft silk blend with flattering drape.",
    price: 149,
    originalPrice: 189,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/silk-blend-midi-dress-1/800/800",
      "https://picsum.photos/seed/silk-blend-midi-dress-2/800/800",
      "https://picsum.photos/seed/silk-blend-midi-dress-3/800/800",
    ],
    colors: ["wine", "black", "emerald"],
    sizes: ["S", "M", "L"],
    stock: 4,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 157,
  },
  {
    slug: "cotton-hoodie-essential",
    name: "Cotton Hoodie Essential",
    description:
      "Heavyweight cotton hoodie with brushed interior and minimalist logo detail.",
    price: 75,
    category: Category.CLOTHING,
    images: [
      "https://picsum.photos/seed/cotton-hoodie-essential-1/800/800",
      "https://picsum.photos/seed/cotton-hoodie-essential-2/800/800",
      "https://picsum.photos/seed/cotton-hoodie-essential-3/800/800",
    ],
    colors: ["black", "sand", "stone"],
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.4,
    reviewCount: 96,
  },

  // SHOES (8)
  {
    slug: "retro-runner-sneakers",
    name: "Retro Runner Sneakers",
    description:
      "Cushioned retro-inspired runners combining comfort and street-ready style.",
    price: 119,
    originalPrice: 149,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/retro-runner-sneakers-1/800/800",
      "https://picsum.photos/seed/retro-runner-sneakers-2/800/800",
      "https://picsum.photos/seed/retro-runner-sneakers-3/800/800",
    ],
    colors: ["white", "red", "black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 15,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 181,
  },
  {
    slug: "leather-loafers-classic",
    name: "Classic Leather Loafers",
    description:
      "Polished leather loafers with cushioned insole for elevated everyday wear.",
    price: 159,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/leather-loafers-classic-1/800/800",
      "https://picsum.photos/seed/leather-loafers-classic-2/800/800",
      "https://picsum.photos/seed/leather-loafers-classic-3/800/800",
    ],
    colors: ["brown", "black"],
    sizes: ["39", "40", "41", "42", "43"],
    stock: 9,
    isOnSale: false,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.6,
    reviewCount: 74,
  },
  {
    slug: "cloud-walk-slip-ons",
    name: "Cloud Walk Slip-Ons",
    description:
      "Ultra-light slip-ons with flexible outsole and breathable knit upper.",
    price: 79,
    originalPrice: 99,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/cloud-walk-slip-ons-1/800/800",
      "https://picsum.photos/seed/cloud-walk-slip-ons-2/800/800",
      "https://picsum.photos/seed/cloud-walk-slip-ons-3/800/800",
    ],
    colors: ["gray", "navy", "white"],
    sizes: ["38", "39", "40", "41", "42"],
    stock: 20,
    isOnSale: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.2,
    reviewCount: 52,
  },
  {
    slug: "high-top-canvas-redline",
    name: "High-Top Canvas Redline",
    description:
      "Iconic high-top sneakers with reinforced toe cap and bold red accent stitching.",
    price: 89,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/high-top-canvas-redline-1/800/800",
      "https://picsum.photos/seed/high-top-canvas-redline-2/800/800",
      "https://picsum.photos/seed/high-top-canvas-redline-3/800/800",
    ],
    colors: ["black", "red", "white"],
    sizes: ["39", "40", "41", "42", "43"],
    stock: 13,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.3,
    reviewCount: 67,
  },
  {
    slug: "performance-training-shoes",
    name: "Performance Training Shoes",
    description:
      "Supportive training shoes with responsive sole for gym, cardio, and HIIT sessions.",
    price: 129,
    originalPrice: 169,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/performance-training-shoes-1/800/800",
      "https://picsum.photos/seed/performance-training-shoes-2/800/800",
      "https://picsum.photos/seed/performance-training-shoes-3/800/800",
    ],
    colors: ["black", "lime", "white"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 6,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 143,
  },
  {
    slug: "elegant-pointed-heels",
    name: "Elegant Pointed Heels",
    description:
      "Sleek pointed heels with cushioned footbed and timeless silhouette.",
    price: 139,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/elegant-pointed-heels-1/800/800",
      "https://picsum.photos/seed/elegant-pointed-heels-2/800/800",
      "https://picsum.photos/seed/elegant-pointed-heels-3/800/800",
    ],
    colors: ["black", "nude", "red"],
    sizes: ["36", "37", "38", "39", "40"],
    stock: 11,
    isOnSale: false,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.5,
    reviewCount: 98,
  },
  {
    slug: "trail-hiker-boots",
    name: "Trail Hiker Boots",
    description:
      "Durable hiking boots with grippy outsole and weather-resistant upper.",
    price: 199,
    originalPrice: 249,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/trail-hiker-boots-1/800/800",
      "https://picsum.photos/seed/trail-hiker-boots-2/800/800",
      "https://picsum.photos/seed/trail-hiker-boots-3/800/800",
    ],
    colors: ["tan", "brown", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 3,
    isOnSale: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 116,
  },
  {
    slug: "minimalist-sandals",
    name: "Minimalist Leather Sandals",
    description:
      "Clean, modern sandals in soft leather with lightweight ergonomic sole.",
    price: 69,
    category: Category.SHOES,
    images: [
      "https://picsum.photos/seed/minimalist-sandals-1/800/800",
      "https://picsum.photos/seed/minimalist-sandals-2/800/800",
      "https://picsum.photos/seed/minimalist-sandals-3/800/800",
    ],
    colors: ["tan", "black", "white"],
    sizes: ["37", "38", "39", "40", "41"],
    stock: 14,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.1,
    reviewCount: 35,
  },

  // BAGS (8)
  {
    slug: "metro-crossbody-bag",
    name: "Metro Crossbody Bag",
    description:
      "Compact crossbody bag with organized compartments and adjustable strap.",
    price: 89,
    originalPrice: 119,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/metro-crossbody-bag-1/800/800",
      "https://picsum.photos/seed/metro-crossbody-bag-2/800/800",
      "https://picsum.photos/seed/metro-crossbody-bag-3/800/800",
    ],
    colors: ["black", "olive", "tan"],
    sizes: ["One Size"],
    stock: 17,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.6,
    reviewCount: 129,
  },
  {
    slug: "structured-tote-signature",
    name: "Signature Structured Tote",
    description:
      "Spacious tote with magnetic closure and internal pouch for daily essentials.",
    price: 149,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/structured-tote-signature-1/800/800",
      "https://picsum.photos/seed/structured-tote-signature-2/800/800",
      "https://picsum.photos/seed/structured-tote-signature-3/800/800",
    ],
    colors: ["black", "taupe", "cream"],
    sizes: ["One Size"],
    stock: 8,
    isOnSale: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 84,
  },
  {
    slug: "weekender-duffle-pro",
    name: "Weekender Duffle Pro",
    description:
      "Travel-ready duffle with shoe compartment and water-resistant finish.",
    price: 179,
    originalPrice: 229,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/weekender-duffle-pro-1/800/800",
      "https://picsum.photos/seed/weekender-duffle-pro-2/800/800",
      "https://picsum.photos/seed/weekender-duffle-pro-3/800/800",
    ],
    colors: ["navy", "black", "gray"],
    sizes: ["One Size"],
    stock: 6,
    isOnSale: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 53,
  },
  {
    slug: "mini-bucket-bag-luxe",
    name: "Luxe Mini Bucket Bag",
    description:
      "Compact bucket bag with drawstring closure and premium textured finish.",
    price: 99,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/mini-bucket-bag-luxe-1/800/800",
      "https://picsum.photos/seed/mini-bucket-bag-luxe-2/800/800",
      "https://picsum.photos/seed/mini-bucket-bag-luxe-3/800/800",
    ],
    colors: ["wine", "black", "camel"],
    sizes: ["One Size"],
    stock: 12,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.4,
    reviewCount: 40,
  },
  {
    slug: "commuter-backpack-tech",
    name: "Commuter Tech Backpack",
    description:
      "Minimal backpack with padded laptop sleeve and anti-scratch base panel.",
    price: 129,
    originalPrice: 159,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/commuter-backpack-tech-1/800/800",
      "https://picsum.photos/seed/commuter-backpack-tech-2/800/800",
      "https://picsum.photos/seed/commuter-backpack-tech-3/800/800",
    ],
    colors: ["black", "gray", "navy"],
    sizes: ["One Size"],
    stock: 14,
    isOnSale: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.5,
    reviewCount: 92,
  },
  {
    slug: "chain-shoulder-bag-rouge",
    name: "Rouge Chain Shoulder Bag",
    description:
      "Elegant shoulder bag with metallic chain strap and soft quilted texture.",
    price: 169,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/chain-shoulder-bag-rouge-1/800/800",
      "https://picsum.photos/seed/chain-shoulder-bag-rouge-2/800/800",
      "https://picsum.photos/seed/chain-shoulder-bag-rouge-3/800/800",
    ],
    colors: ["red", "black", "ivory"],
    sizes: ["One Size"],
    stock: 9,
    isOnSale: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 77,
  },
  {
    slug: "canvas-shopper-everyday",
    name: "Everyday Canvas Shopper",
    description:
      "Durable canvas shopper with generous interior and reinforced shoulder straps.",
    price: 59,
    originalPrice: 79,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/canvas-shopper-everyday-1/800/800",
      "https://picsum.photos/seed/canvas-shopper-everyday-2/800/800",
      "https://picsum.photos/seed/canvas-shopper-everyday-3/800/800",
    ],
    colors: ["natural", "black", "olive"],
    sizes: ["One Size"],
    stock: 19,
    isOnSale: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.2,
    reviewCount: 58,
  },
  {
    slug: "travel-sling-compact",
    name: "Compact Travel Sling",
    description:
      "Hands-free sling bag with secure zip pockets and ergonomic fit for travel.",
    price: 49,
    category: Category.BAGS,
    images: [
      "https://picsum.photos/seed/travel-sling-compact-1/800/800",
      "https://picsum.photos/seed/travel-sling-compact-2/800/800",
      "https://picsum.photos/seed/travel-sling-compact-3/800/800",
    ],
    colors: ["black", "gray", "burgundy"],
    sizes: ["One Size"],
    stock: 21,
    isOnSale: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.1,
    reviewCount: 31,
  },
];

async function main() {
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
