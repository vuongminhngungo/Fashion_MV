export type Category = "CLOTHING" | "SHOES" | "BAGS";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
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
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
};

export type ProductQuery = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  colors?: string;
  sizes?: string;
  sort?: string;
  page?: string;
  q?: string;
};
