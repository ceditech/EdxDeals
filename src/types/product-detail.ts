export interface DetailedProduct {
  id: string;
  name: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews?: number;
  brand?: string;
  specs?: Record<string, string>;
  shortDesc?: string;
  fullDesc?: string;
  features?: string[];
  warranty?: string;
  category: string;
  related?: string[]; // related product IDs
  inStock?: boolean;
  stockCount?: number;
  sku?: string;
  weight?: string;
  dimensions?: string;
  color?: string;
  material?: string;
  tags?: string[];
}

export interface ProductComparison {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  keyFeature: string;
}