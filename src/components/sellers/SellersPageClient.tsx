'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Star, TrendingUp, CheckCircle, Zap, DollarSign, Home, Package, ShoppingCart, BarChart3 } from 'lucide-react';

import TestimonialsCarousel from '@/components/sellers/TestimonialsCarousel';
import FAQAccordion from '@/components/sellers/FAQAccordion';
import SellerCard from '@/components/sellers/SellerCard';
import ApplySellerModal from '@/components/sellers/ApplySellerModal';
import { fetchSellers, fetchFeaturedSellers, type Seller } from '../../../lib/firebase/sellers';

const CATEGORIES = [
  'All',
  'Electronics',
  'Apparel',
  'Home',
  'Beauty',
  'Sports',
  'Toys',
  'Automotive',
  'Food & Beverage',
  'Health',
  'Books',
  'Other',
] as const;

export default function SellersPageClient() {
  const router = useRouter();

  // Modal state
  const [applyOpen, setApplyOpen] = useState(false);

  // Search/filter state
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [minRating, setMinRating] = useState<number>(0);

  // Data
  const [loading, setLoading] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);

  const filters = useMemo(() => ({ keyword, category, minRating }), [keyword, category, minRating]);

  // Check if we should show featured sellers (no filters applied)
  const showFeaturedSellers = useMemo(() => {
    return !keyword.trim() && category === 'All' && minRating === 0;
  }, [keyword, category, minRating]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        let list: Seller[];
        if (showFeaturedSellers) {
          // Show featured sellers by default
          list = await fetchFeaturedSellers(12);
        } else {
          // Apply filters
          list = await fetchSellers({
            keyword: filters.keyword,
            category: filters.category,
            minRating: filters.minRating,
            limit: 24,
          });
        }
        if (alive) setSellers(list);
      } catch {
        if (alive) setSellers([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [filters, showFeaturedSellers]);

  return (
    <div className="min-h-screen bg-background">
      {/* 1) Hero Section */}
      <section className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Become a Seller on EdxDeals
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Join thousands of thriving sellers on our trusted marketplace. Reach more customers, boost your sales, and grow your business.
              </p>
              <div className="mt-6 flex gap-3">
                <Button size="lg" onClick={() => router.push('/auth/register?type=seller')} aria-label="Start selling on EdxDeals">
                  Start Selling
                </Button>
                <Button size="lg" variant="outline" onClick={() => setApplyOpen(true)}>
                  Learn More
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Built-in trust and dedicated support</span>
              </div>
            </div>
            <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow">
              <Image
                src="/images/store/speaker.jpg"
                alt="Happy seller managing orders on EdxDeals"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Why Sell on EdxDeals */}
      <section className="container mx-auto px-4 py-10" aria-labelledby="why-sell-title">
        <h2 id="why-sell-title" className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Why Sell on EdxDeals?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Zero Upfront Fees</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get started without barriers. Pay only as you grow.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <h3 className="font-medium">Powerful Analytics</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Insights and dashboards to optimize performance and scale.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">Customer Trust & Support</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our brand trust and support help your store convert better.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">Fast Payouts</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Reliable disbursements to keep your operations running smoothly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3) Seller Testimonials */}
      <TestimonialsCarousel />

      {/* 4) Featured Sellers + Search/Filters */}
      <section className="container mx-auto px-4 py-10" aria-labelledby="featured-sellers-title">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="featured-sellers-title" className="text-2xl md:text-3xl font-semibold">
            Featured Sellers
          </h2>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            FEATURED
          </Badge>
        </div>

        {/* Filters */}
        <div className="rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="seller-search" className="sr-only">
                Search sellers
              </label>
              <Input
                id="seller-search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by keyword..."
                aria-label="Search sellers"
              />
            </div>
            <div>
              <Select value={category} onValueChange={(v) => setCategory(v as typeof CATEGORIES[number])}>
                <SelectTrigger aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={String(minRating)} onValueChange={(v) => setMinRating(Number(v))}>
                <SelectTrigger aria-label="Minimum rating filter">
                  <SelectValue placeholder="Minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All ratings</SelectItem>
                  <SelectItem value="3">3.0+</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Responsive Grid for Featured Sellers */}
        {loading ? (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Loading sellers…</div>
        ) : sellers.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            {showFeaturedSellers ? 'No featured sellers available.' : 'No sellers match your filters.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        )}

        {/* Show additional info for featured sellers */}
        {showFeaturedSellers && sellers.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Showing our top-rated featured sellers. Use the filters above to search for specific sellers.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span>Featured Sellers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Verified & Trusted</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5) How Selling Works */}
      <section className="container mx-auto px-4 py-10" aria-labelledby="how-works-title">
        <h2 id="how-works-title" className="text-2xl md:text-3xl font-semibold text-center mb-8">
          How Selling Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-blue-100 text-blue-600 grid place-items-center">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-medium">Register & Set Up</h3>
              <p className="text-sm text-muted-foreground mt-1">Create your store profile in minutes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-amber-100 text-amber-600 grid place-items-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-medium">List Products</h3>
              <p className="text-sm text-muted-foreground mt-1">Add products easily with CSV or UI.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-green-100 text-green-600 grid place-items-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="font-medium">Sell & Fulfill</h3>
              <p className="text-sm text-muted-foreground mt-1">Receive orders and ship on time.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-purple-100 text-purple-600 grid place-items-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-medium">Get Paid Fast</h3>
              <p className="text-sm text-muted-foreground mt-1">Reliable payouts to your account.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 grid place-items-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-medium">Track Growth</h3>
              <p className="text-sm text-muted-foreground mt-1">Analytics to optimize and scale.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6) FAQ */}
      <FAQAccordion />

      {/* 7) Become a Seller CTA (sticky) */}
      <Button
        className={cn(
          'fixed bottom-5 right-5 z-50 shadow-lg',
          'bg-blue-600 hover:bg-blue-700 text-white'
        )}
        size="lg"
        onClick={() => router.push('/auth/register?type=seller')}
        aria-label="Apply to become a seller"
      >
        Apply Now
      </Button>

      {/* Modal Mount */}
      <ApplySellerModal open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  );
}