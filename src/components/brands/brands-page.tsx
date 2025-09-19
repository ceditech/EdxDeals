'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { getAllBrands, getBrandProducts } from '@/lib/brands';
import { getBestSellers } from '@/lib/best-sellers';
import type { Product } from '@/types';
import UnifiedProductCard from '@/components/home/unified-product-card';
import BrandModal from '@/components/brands/brand-modal';

type SortMode = 'alpha' | 'popular' | 'newest';

const LETTERS = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

// Sponsored/Ad items (placeholder; wire to Firestore/CMS later)
interface AdItem {
  id: string;
  title: string;
  description?: string;
  image: string; // path or URL
  url: string;
  isAffiliate?: boolean;
}

const DEFAULT_ADS: AdItem[] = [
  { id: 'ad1', title: 'Smart Watch Deals', description: 'Save on the latest wearables', image: '/images/store/smartwatch.jpg', url: 'https://example.com/smartwatch', isAffiliate: true },
  { id: 'ad2', title: 'Wireless Headphones', description: 'Premium sound, premium comfort', image: '/images/store/headphones.jpg', url: 'https://example.com/headphones' },
  { id: 'ad3', title: 'RGB Keyboards', description: 'Light up your setup', image: '/images/store/keyboard.jpg', url: 'https://example.com/keyboard', isAffiliate: true },
  { id: 'ad4', title: 'USB-C Chargers', description: 'Fast, safe, reliable', image: '/images/store/cable.jpg', url: 'https://example.com/chargers' },
  { id: 'ad5', title: 'Ergonomic Chairs', description: 'Sit better, work better', image: '/images/furniture/gaming-chair-1.jpg', url: 'https://example.com/chairs' },
  { id: 'ad6', title: 'Bluetooth Speakers', description: 'Big sound on the go', image: '/images/store/speaker.jpg', url: 'https://example.com/speakers' },
  { id: 'ad7', title: 'Laptop Stands', description: 'Better posture at your desk', image: '/images/store/laptop-stand.jpg', url: 'https://example.com/stands' },
  { id: 'ad8', title: 'Action Cameras', description: 'Capture every moment', image: '/images/electronics/action-camera-1.jpg', url: 'https://example.com/action-cams', isAffiliate: true },
];

function letterOf(brand: string) {
  const ch = brand.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(ch) ? ch : '#';
}

export default function BrandsPage() {
  const allBrands = useMemo(() => getAllBrands(), []);
  const brandCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of allBrands) {
      map.set(b, getBrandProducts(b).length);
    }
    return map;
  }, [allBrands]);

  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState<string>('All');
  const [sort, setSort] = useState<SortMode>('alpha');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  // Placeholder: not logged in detection; wire to Firebase Auth later
  const isLoggedIn = false;

  // Sitewide trending/best sellers (or personalized in future)
  const suggestedProducts = useMemo<Product[]>(() => {
    return getBestSellers('today', 12);
  }, []);
  
  // Ads list (wire to Firestore or CMS later, or pass via props)
  const adsList: AdItem[] = DEFAULT_ADS;

  const filtered = useMemo(() => {
    let list = allBrands.slice();

    if (letter !== 'All') {
      list = list.filter((b) => letterOf(b) === letter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((b) => b.toLowerCase().includes(q));
    }

    switch (sort) {
      case 'popular':
        list.sort((a, b) => (brandCounts.get(b) || 0) - (brandCounts.get(a) || 0) || a.localeCompare(b));
        break;
      case 'newest':
        // No created-at meta; use deterministic reverse alpha as placeholder
        list.sort((a, b) => b.localeCompare(a));
        break;
      case 'alpha':
      default:
        list.sort((a, b) => a.localeCompare(b));
        break;
    }

    return list;
  }, [allBrands, brandCounts, letter, query, sort]);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" />
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-center">All Brands on EdxDeals</h1>
          <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore top brands trusted by millions. Find products, deals, and more from your favorites!
          </p>

          {/* Search + Filters */}
          <div className="mt-6 space-y-4">
            <form
              className="max-w-2xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
              role="search"
              aria-label="Search brands"
            >
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Search brands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search brands"
                />
                <Button type="button" onClick={() => setQuery('')}>Clear</Button>
              </div>
            </form>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Alphabet filter */}
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-2 pb-2">
                  {LETTERS.map((ch) => (
                    <Button
                      key={ch}
                      size="sm"
                      variant={letter === ch ? 'default' : 'outline'}
                      onClick={() => setLetter(ch)}
                      aria-pressed={letter === ch}
                      className={cn(letter === ch && 'bg-primary text-primary-foreground')}
                    >
                      {ch}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* Sort/filter pills */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sort === 'alpha' ? 'default' : 'outline'}
                  onClick={() => setSort('alpha')}
                  aria-pressed={sort === 'alpha'}
                >
                  A–Z
                </Button>
                <Button
                  size="sm"
                  variant={sort === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSort('popular')}
                  aria-pressed={sort === 'popular'}
                >
                  Most Popular
                </Button>
                <Button
                  size="sm"
                  variant={sort === 'newest' ? 'default' : 'outline'}
                  onClick={() => setSort('newest')}
                  aria-pressed={sort === 'newest'}
                >
                  Newest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Brands Grid */}
      <section className="container mx-auto px-4 py-8" aria-labelledby="brands-grid-title">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="brands-grid-title" className="text-2xl md:text-3xl font-semibold">All Brands</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} brands</p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            No brands match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((brand) => {
              const count = brandCounts.get(brand) || 0;
              const initial = brand.trim().slice(0, 2).toUpperCase();
              const popular = count >= 6;

              return (
                <button
                  key={brand}
                  className="group rounded-xl border bg-card text-card-foreground p-4 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all text-left"
                  onClick={() => setActiveBrand(brand)}
                  aria-label={`Open ${brand} products`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-amber-500 text-white grid place-items-center font-semibold">
                      {initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{brand}</span>
                        {popular && <Badge className="bg-amber-500 text-white">HOT</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{count} products</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Sponsored Ads (placed below All Brands) */}
      <section className="container mx-auto px-4 pt-2 pb-10" aria-labelledby="sponsored-ads-title">
        <h2 id="sponsored-ads-title" className="text-2xl font-semibold mb-4">Sponsored Products & Ads</h2>
        {adsList.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No ads available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adsList.map((ad) => (
              <a
                key={ad.id}
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card text-card-foreground p-3 hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Sponsored: ${ad.title}`}
              >
                <div className="relative w-full h-28 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-medium line-clamp-1">{ad.title}</span>
                  {ad.isAffiliate && <Badge className="bg-amber-500 text-white">Ad</Badge>}
                </div>
                {ad.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ad.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Suggested / Recommended Products (below All Brands) */}
      <section className="container mx-auto px-4 pb-12" aria-labelledby="recommended-products-title">
        <h2 id="recommended-products-title" className="text-2xl font-semibold mb-4">
          {isLoggedIn ? 'Products You May Like' : 'Hot Sells & Best Buys'}
        </h2>
        {suggestedProducts.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No recommendations available.</div>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 pb-2">
              {suggestedProducts.map((p) => (
                <div key={p.id} className="w-[260px] sm:w-[280px] lg:w-[300px]">
                  <UnifiedProductCard product={p} showRating />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </section>

      {/* Brand Modal */}
      <BrandModal
        brand={activeBrand}
        onClose={() => setActiveBrand(null)}
      />
    </div>
  );
}