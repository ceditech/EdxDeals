import type { DetailedProduct } from '@/types/product-detail';
import type { Product } from '@/types';
import { PRODUCT_DATABASE } from '@/lib/product-database';

// Types
export type BestSellerPeriod = 'today' | 'week' | 'month' | 'all';

// Utils (deterministic and hydration-safe)
function toCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

function toProduct(d: DetailedProduct): Product {
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

function getAllDetailed(): DetailedProduct[] {
  return Object.values(PRODUCT_DATABASE);
}

// Deterministic score per period (no Date.now/Math.random for SSR parity)
function scoreProduct(p: DetailedProduct, period: BestSellerPeriod): number {
  const base = (p.reviews || 0) * 1.0 + (p.rating || 0) * 50;
  const hasDiscount = typeof p.oldPrice === 'number' && p.oldPrice > p.price ? 1 : 0;

  // Simple deterministic hash from id to provide tie-breaking variety
  let h = 0;
  for (let i = 0; i < p.id.length; i++) {
    h = (h * 31 + p.id.charCodeAt(i)) & 0xffffffff;
  }
  const hashBoost = (h & 0xffff) / 0xffff; // 0..1

  switch (period) {
    case 'today':
      return base + hasDiscount * 75 + hashBoost * 5;
    case 'week':
      return base + (p.rating || 0) * 10 + hashBoost * 5;
    case 'month':
      return base + hasDiscount * 120 + (p.reviews || 0) * 0.2 + hashBoost * 5;
    case 'all':
    default:
      return base + hashBoost * 5;
  }
}

export function getBestSellers(period: BestSellerPeriod, limit = 12): Product[] {
  const items = getAllDetailed()
    .slice()
    .sort((a, b) => scoreProduct(b, period) - scoreProduct(a, period))
    .slice(0, limit)
    .map(toProduct);
  return items;
}

export function getBestSellersByPeriodAllSets(perPeriodLimit = 8): Record<BestSellerPeriod, Product[]> {
  return {
    today: getBestSellers('today', perPeriodLimit),
    week: getBestSellers('week', perPeriodLimit),
    month: getBestSellers('month', perPeriodLimit),
    all: getBestSellers('all', perPeriodLimit),
  };
}

export function getAvailableCategories(max = 12): string[] {
  const set = new Set<string>();
  for (const p of getAllDetailed()) set.add(p.category);
  return Array.from(set).slice(0, max);
}

export function getCategoryBestSellers(category: string, period: BestSellerPeriod = 'today', limit = 8): Product[] {
  return getAllDetailed()
    .filter(p => p.category === category)
    .sort((a, b) => scoreProduct(b, period) - scoreProduct(a, period))
    .slice(0, limit)
    .map(toProduct);
}

/**
 * Resolve known category aliases so curated category names map to DB categories.
 * This keeps UX categories (e.g., "Appliances") in sync with data categories
 * (e.g., "Home Appliances") without hydration/runtime randomness.
 */
export function resolveCategoryAliases(category: string): string[] {
  const map: Record<string, string[]> = {
    'Appliances': ['Home Appliances'],
    'Electronics': ['Electronics', 'Electronics & Technology'],
    'Home': ['Home', 'Home & Garden'],
  };
  return map[category] ? map[category] : [category];
}

/**
 * Get best sellers for any of the provided exact category names (after aliasing).
 */
export function getCategoryBestSellersAny(categories: string[], period: BestSellerPeriod = 'today', limit = 8): Product[] {
  const set = new Set(categories);
  return getAllDetailed()
    .filter(p => set.has(p.category))
    .sort((a, b) => scoreProduct(b, period) - scoreProduct(a, period))
    .slice(0, limit)
    .map(toProduct);
}

export function getAvailableBrands(max = 12): string[] {
  const set = new Set<string>();
  for (const p of getAllDetailed()) if (p.brand) set.add(p.brand);
  return Array.from(set).slice(0, max);
}

export function getBrandBestSellers(brand: string, period: BestSellerPeriod = 'today', limit = 8): Product[] {
  return getAllDetailed()
    .filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase())
    .sort((a, b) => scoreProduct(b, period) - scoreProduct(a, period))
    .slice(0, limit)
    .map(toProduct);
}

// Vendors placeholder: using brand names as vendors for now (ready for future Firestore wiring)
export function getAvailableVendors(max = 12): string[] {
  return getAvailableBrands(max);
}

export function getVendorBestSellers(vendor: string, period: BestSellerPeriod = 'today', limit = 8): Product[] {
  return getBrandBestSellers(vendor, period, limit);
}

// Search/filter helpers
export function filterProductsByQuery(products: Product[], q?: string): Product[] {
  if (!q) return products;
  const lc = q.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lc) ||
    p.category.toLowerCase().includes(lc)
  );
}