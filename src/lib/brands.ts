import type { DetailedProduct } from '@/types/product-detail';
import type { Product } from '@/types';
import { PRODUCT_DATABASE } from '@/lib/product-database';

// Shared conversion to Product (for UnifiedProductCard)
function toCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function toProduct(d: DetailedProduct): Product {
  return {
    id: d.id,
    name: d.name,
    imageUrl: d.images?.[0] || '/images/placeholder-product.jpg',
    price: toCurrency(d.price),
    originalPrice: typeof d.oldPrice === 'number' ? toCurrency(d.oldPrice) : undefined,
    category: d.category,
    rating: d.rating,
    reviewCount: d.reviews,
  };
}

function allDetailed(): DetailedProduct[] {
  return Object.values(PRODUCT_DATABASE);
}

// Deterministic score for best sellers
function score(p: DetailedProduct): number {
  return (p.reviews || 0) * 1.0 + (p.rating || 0) * 50 + (p.oldPrice && p.oldPrice > p.price ? 25 : 0);
}

// Deterministic pseudo-random seeded by product id, 1..12 hours
function seededHours(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  const v = (h >>> 0) / 0xffffffff; // 0..1
  return Math.max(1, Math.min(12, Math.floor(v * 12)));
}

// Brand helpers
export function getAllBrands(): string[] {
  const set = new Set<string>();
  for (const p of allDetailed()) if (p.brand) set.add(p.brand);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getBrandProducts(brand: string): Product[] {
  return allDetailed()
    .filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase())
    .map(toProduct);
}

export function getBrandHotSales(brand: string): Product[] {
  return allDetailed()
    .filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase() && typeof p.oldPrice === 'number' && p.oldPrice > p.price)
    .map(toProduct);
}

export function getBrandBestSellers(brand: string, limit = 12): Product[] {
  return allDetailed()
    .filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase())
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit)
    .map(toProduct);
}

// Flash deals (deterministic end offset hours per product). Returns tuple of [Product, endOffsetHours]
export type BrandFlashItem = { product: Product; endOffsetHours: number };

export function getBrandFlashDeals(brand: string, limit = 12): BrandFlashItem[] {
  const items = allDetailed()
    .filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase() && typeof p.oldPrice === 'number' && p.oldPrice > p.price)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);

  return items.map(p => ({
    product: toProduct(p),
    endOffsetHours: seededHours(p.id),
  }));
}