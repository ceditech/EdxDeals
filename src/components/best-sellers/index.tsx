'use client';

import Image from 'next/image';
import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import UnifiedProductCard from '@/components/home/unified-product-card';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import {
  BestSellerPeriod,
  getBestSellers,
  getBestSellersByPeriodAllSets,
  getCategoryBestSellersAny,
  resolveCategoryAliases,
  getAvailableBrands,
  getBrandBestSellers,
  getAvailableVendors,
  getVendorBestSellers,
  filterProductsByQuery,
} from '@/lib/best-sellers';
import { CATEGORIES, getCategoryIcon } from '@/lib/categories';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Shared
export const PERIODS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all', label: 'All Time' },
] as const;

export type PeriodValue = typeof PERIODS[number]['value'];

function updateQuery(current: URLSearchParams, updates: Record<string, string | undefined | null>) {
  const next = new URLSearchParams(current.toString());
  Object.entries(updates).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') next.delete(k);
    else next.set(k, v);
  });
  return next;
}

function getValidPeriod(v?: string | null): PeriodValue {
  const allowed = new Set(PERIODS.map(p => p.value));
  return (v && allowed.has(v as PeriodValue) ? (v as PeriodValue) : 'today');
}
// Choose an emoji icon based on the product name (falls back to category icon)
function getEmojiForProduct(name: string, category: string): string {
  const n = name.toLowerCase();

  if (/(headphone|earbud|earphone)/.test(n)) return '🎧';
  if (/(smart ?watch|watch)/.test(n)) return '⌚';
  if (/(usb|cable|charger|charging|wireless charger)/.test(n)) return '🔌';
  if (/(mouse)/.test(n)) return '🖱️';
  if (/(keyboard)/.test(n)) return '⌨️';
  if (/(speaker)/.test(n)) return '🔊';
  if (/(camera|action camera)/.test(n)) return '📷';
  if (/(laptop|notebook)/.test(n)) return '💻';
  if (/(blender|mixer|kitchen)/.test(n)) return '🥤';
  if (/(bulb|light|lamp|led)/.test(n)) return '💡';
  if (/(chair)/.test(n)) return '🪑';
  if (/(phone)/.test(n)) return '📱';
  if (/(yoga|fitness|gym|sport)/.test(n)) return '🏃‍♂️';
  if (/(book|literature)/.test(n)) return '📚';
  if (/(toy|game|gaming)/.test(n)) return '🎮';
  if (/(jacket|shirt|fashion|apparel|clothing)/.test(n)) return '👕';
  if (/(jewel|ring|necklace|bracelet)/.test(n)) return '💍';
  if (/(diffuser|aroma|fragrance)/.test(n)) return '🕯️';
  if (/(toothbrush)/.test(n)) return '🪥';
  if (/(gps|navigation)/.test(n)) return '🧭';

  // Fallback to category icon
  return getCategoryIcon(category) || '🛍️';
}

// 1) Period navigation that syncs with URL (?period=)
export function PeriodNav({ current }: { current: PeriodValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {PERIODS.map(p => {
        const nextParams = updateQuery(searchParams, { period: p.value });
        const isActive = current === p.value;
        return (
          <Button
            key={p.value}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                router.push(`${pathname}?${nextParams.toString()}`);
              });
            }}
            className={cn(
              'transition-all',
              isActive && 'bg-primary text-primary-foreground'
            )}
            aria-pressed={isActive}
          >
            {p.label}
          </Button>
        );
      })}
    </div>
  );
}

// 2) Search bar that syncs with URL (?q=)
export function BestSellersSearchBar({ placeholder = 'Search best sellers...' }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [value, setValue] = useState(q);
  const [isPending, startTransition] = useTransition();

  function commit(next: string) {
    const params = updateQuery(searchParams, { q: next || null });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <form
      className="w-full md:max-w-xl mx-auto sticky md:static top-14 z-30"
      onSubmit={(e) => { e.preventDefault(); commit(value); }}
      role="search"
      aria-label="Search best sellers"
    >
      <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
        <input
          type="search"
          className="flex-1 bg-transparent outline-none text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search input"
        />
        <Button size="sm" type="submit" disabled={isPending}>Search</Button>
      </div>
    </form>
  );
}

// 3) Product grid
export function BestSellersGrid({ products, title, subtitle }: { products: Product[]; title?: string; subtitle?: string }) {
  return (
    <section aria-labelledby={title ? 'best-sellers-grid-title' : undefined} className="py-6">
      {title && (
        <div className="mb-6">
          <h2 id="best-sellers-grid-title" className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="relative">
            <Badge className="absolute top-2 left-2 z-20 bg-amber-500 text-white">BEST SELLER</Badge>
            <UnifiedProductCard product={p} showRating={true} />
          </div>
        ))}
      </div>
    </section>
  );
}

// 4) Period showcase (local tabs with animation)
export function PeriodShowcase({ datasets, defaultPeriod = 'today' }: {
  datasets: Record<PeriodValue, Product[]>;
  defaultPeriod?: PeriodValue;
}) {
  const firstPeriod = defaultPeriod;
  return (
    <section aria-labelledby="best-by-period-title" className="py-8">
      <h2 id="best-by-period-title" className="text-2xl md:text-3xl font-semibold mb-4">Best Sellers By Period</h2>
      <Tabs defaultValue={firstPeriod} className="w-full">
        <TabsList className="mb-4">
          {PERIODS.map(p => (
            <TabsTrigger key={p.value} value={p.value}>{p.label}</TabsTrigger>
          ))}
        </TabsList>
        {PERIODS.map(p => (
          <TabsContent key={p.value} value={p.value} className="animate-in fade-in-50">
            <BestSellersGrid products={datasets[p.value]} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

// 5) Chips selector utility
function Chip({ active, children, onClick, ariaLabel }: { active?: boolean; children: React.ReactNode; onClick?: () => void; ariaLabel?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'px-3 py-1.5 rounded-full border text-sm transition-colors',
        active ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {children}
    </button>
  );
}

// 6) Categories block
export function CategoryChipsBlock({ period }: { period: PeriodValue }) {
  // Use the canonical category list defined in src/lib/categories.ts
  const baseCategories = useMemo(() => CATEGORIES, []);

  // Build display set from canonical list (do not filter empties)
  const displayCategories = useMemo(() => {
    return baseCategories.map(label => ({ label, aliases: resolveCategoryAliases(label) }));
  }, [baseCategories]);

  const [active, setActive] = useState(displayCategories[0]?.label || '');
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  // Availability map to visually indicate categories with no items
  const availability = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const { label, aliases } of displayCategories) {
      const list = getCategoryBestSellersAny(aliases, period as BestSellerPeriod, 1);
      map.set(label, list.length > 0);
    }
    return map;
  }, [displayCategories, period]);

  const products = useMemo(() => {
    if (!active) return [];
    const aliases = resolveCategoryAliases(active);
    const list = getCategoryBestSellersAny(aliases, period as BestSellerPeriod, 8);
    return filterProductsByQuery(list, q);
  }, [active, period, q]);

  return (
    <section aria-labelledby="best-by-category-title" className="py-8">
      <h2 id="best-by-category-title" className="text-2xl md:text-3xl font-semibold mb-4">Best Sellers By Categories</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-2 pb-2">
          {displayCategories.map(({ label }) => {
            const hasItems = availability.get(label);
            return (
              <Chip
                key={label}
                active={active === label}
                onClick={() => setActive(label)}
                ariaLabel={`Filter by ${label}${hasItems ? '' : ' (No best sellers yet)'}`}
              >
                <span className="mr-1">{getCategoryIcon(label)}</span>
                <span className={cn(!hasItems && 'opacity-60')}>{label}</span>
              </Chip>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-4">
        {products.length > 0 ? (
          <BestSellersGrid products={products} />
        ) : (
          <div className="w-full rounded-lg border bg-card text-card-foreground p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No best sellers yet for <span className="font-medium">{active}</span>. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// 7) Brands block
export function BrandRowBlock({ period }: { period: PeriodValue }) {
  const brands = useMemo(() => getAvailableBrands(20), []);
  const [active, setActive] = useState(brands[0] || '');
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const products = useMemo(() => {
    if (!active) return [];
    const list = getBrandBestSellers(active, period as BestSellerPeriod, 8);
    return filterProductsByQuery(list, q);
  }, [active, period, q]);

  return (
    <section aria-labelledby="best-by-brand-title" className="py-8">
      <h2 id="best-by-brand-title" className="text-2xl md:text-3xl font-semibold mb-4">Best Sellers By Brands</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-2 pb-2">
          {brands.map(brand => (
            <Chip key={brand} active={active === brand} onClick={() => setActive(brand)} ariaLabel={`Filter by brand ${brand}`}>
              {brand}
            </Chip>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-4">
        <BestSellersGrid products={products} />
      </div>
    </section>
  );
}

// 8) Vendors block (placeholder uses brands list)
export function VendorRowBlock({ period }: { period: PeriodValue }) {
  const vendors = useMemo(() => getAvailableVendors(20), []);
  const [active, setActive] = useState(vendors[0] || '');
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const products = useMemo(() => {
    if (!active) return [];
    const list = getVendorBestSellers(active, period as BestSellerPeriod, 8);
    return filterProductsByQuery(list, q);
  }, [active, period, q]);

  return (
    <section aria-labelledby="best-by-vendor-title" className="py-8">
      <h2 id="best-by-vendor-title" className="text-2xl md:text-3xl font-semibold mb-4">Best Sellers By Vendors</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-2 pb-2">
          {vendors.map(v => (
            <Chip key={v} active={active === v} onClick={() => setActive(v)} ariaLabel={`Filter by vendor ${v}`}>
              {v}
            </Chip>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-4">
        <BestSellersGrid products={products} />
      </div>
    </section>
  );
}

// 9) Hero
export function BestSellersHero({ period, highlights }: { period: PeriodValue; highlights: Product[] }) {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const filtered = useMemo(() => filterProductsByQuery(highlights, q).slice(0, 5), [highlights, q]);

  return (
    <section aria-labelledby="best-hero-title" className="py-8 md:py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 id="best-hero-title" className="text-3xl md:text-4xl font-bold">🔥 Today’s Best Sellers</h1>
          <p className="text-muted-foreground max-w-2xl">
            See what’s trending right now, and shop our top sellers by time, category, brand, and vendor.
          </p>
          <div className="flex flex-col gap-4 items-center w-full">
            <BestSellersSearchBar />
            <PeriodNav current={period} />
          </div>
          {filtered.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {filtered.map(p => (
                <div
                  key={p.id}
                  className="relative h-20 w-20 rounded-md overflow-hidden border shadow-sm bg-muted flex items-center justify-center"
                  title={p.name}
                  aria-label={p.name}
                >
                  <span className="text-2xl" aria-hidden="true">{getEmojiForProduct(p.name, p.category)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// 10) Page composition (client)
export function BestSellersClient({
  initialPeriod,
  initialTop,
  initialPeriodDatasets,
}: {
  initialPeriod: PeriodValue;
  initialTop: Product[];
  initialPeriodDatasets: Record<PeriodValue, Product[]>;
}) {
  const searchParams = useSearchParams();
  const currentPeriod = getValidPeriod(searchParams.get('period') || initialPeriod);
  const q = searchParams.get('q') || '';

  // Compute current top list deterministically on the client too, to stay in sync with URL after navigation
  const currentTop = useMemo(() => {
    const list = getBestSellers(currentPeriod as BestSellerPeriod, 12);
    return filterProductsByQuery(list, q);
  }, [currentPeriod, q]);

  const datasets = useMemo(() => {
    const data = getBestSellersByPeriodAllSets(8);
    const out: Record<PeriodValue, Product[]> = {
      today: filterProductsByQuery(data.today, q),
      week: filterProductsByQuery(data.week, q),
      month: filterProductsByQuery(data.month, q),
      all: filterProductsByQuery(data.all, q),
    };
    return out;
  }, [q]);

  const heroHighlights = (initialTop && initialTop.length ? initialTop : currentTop).slice(0, 5);

  return (
    <div className="w-full">
      <BestSellersHero period={currentPeriod} highlights={heroHighlights} />

      <div className="container mx-auto px-4">
        <BestSellersGrid
          products={currentTop.length ? currentTop : filterProductsByQuery(initialTop, q)}
          title="Top Best Sellers"
          subtitle={
            currentPeriod === 'today'
              ? 'Top sellers in the last 24 hours'
              : currentPeriod === 'week'
              ? 'Top sellers this week'
              : currentPeriod === 'month'
              ? 'Top sellers this month'
              : 'Top sellers of all time'
          }
        />

        <Separator className="my-8" />

        <PeriodShowcase
          datasets={Object.keys(initialPeriodDatasets).length ? initialPeriodDatasets : datasets}
          defaultPeriod={currentPeriod}
        />

        <Separator className="my-8" />

        <CategoryChipsBlock period={currentPeriod} />

        <Separator className="my-8" />

        <BrandRowBlock period={currentPeriod} />

        <Separator className="my-8" />

        <VendorRowBlock period={currentPeriod} />
      </div>
    </div>
  );
}