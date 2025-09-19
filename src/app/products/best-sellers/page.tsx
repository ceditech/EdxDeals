import type { Metadata } from 'next';
import { BestSellersClient } from '@/components/best-sellers';
import {
  getBestSellers,
  getBestSellersByPeriodAllSets,
  type BestSellerPeriod,
} from '@/lib/best-sellers';

export const metadata: Metadata = {
  title: "Shop Today's Best Sellers – EdxDeals",
  description:
    "See what's trending right now. Explore EdxDeals top sellers by time period, category, brand, and vendor. Fast, modern, and fully responsive.",
  openGraph: {
    title: "Shop Today's Best Sellers – EdxDeals",
    description:
      "Explore top-selling products by time period, category, brand, and vendor on EdxDeals.",
    url: '/products/best-sellers',
    type: 'website',
    images: [{ url: '/images/shop-og.jpg', width: 1200, height: 630, alt: 'Best Sellers - EdxDeals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shop Today's Best Sellers – EdxDeals",
    description:
      "Explore top-selling products by time period, category, brand, and vendor on EdxDeals.",
    images: ['/images/shop-og.jpg'],
  },
};

function toValidPeriod(v: unknown): BestSellerPeriod {
  const s = typeof v === 'string' ? v : Array.isArray(v) ? v[0] : '';
  if (s === 'today' || s === 'week' || s === 'month' || s === 'all') return s;
  return 'today';
}

export default function BestSellersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const period = toValidPeriod(searchParams?.period);
  // Precompute initial datasets on the server for SEO/first paint
  const initialTop = getBestSellers(period, 12);
  const initialPeriodDatasets = getBestSellersByPeriodAllSets(8);

  return (
    <div className="bg-background">
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><a href="/" className="hover:text-primary">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/products" className="hover:text-primary">Products</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground font-medium">Best Sellers</li>
        </ol>
      </nav>

      <BestSellersClient
        initialPeriod={period}
        initialTop={initialTop}
        initialPeriodDatasets={initialPeriodDatasets}
      />
    </div>
  );
}