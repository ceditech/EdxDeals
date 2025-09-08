import { Metadata } from 'next';
import HeroBanner from '@/components/shop/hero-banner';
import CategoryTiles from '@/components/shop/category-tiles';
import FlashDeals from '@/components/shop/flash-deals';
import BestSellers from '@/components/shop/best-sellers';
import TopBrands from '@/components/shop/top-brands';
import ShopBySeller from '@/components/shop/shop-by-seller';
import ProductVideos from '@/components/shop/product-videos';
import PersonalizedRecommendations from '@/components/shop/personalized-recommendations';
import ClearanceDeals from '@/components/shop/clearance-deals';
import ShopByFilters from '@/components/shop/shop-by-filters';
import SponsoredSection from '@/components/shop/sponsored-section';

export const metadata: Metadata = {
  title: 'Shop - EdxDeals | Best Deals on Electronics, Home & More',
  description: 'Discover amazing deals on electronics, home goods, fashion, and more. Shop with confidence at EdxDeals - your trusted marketplace for quality products at unbeatable prices.',
  keywords: 'shop, deals, electronics, home goods, fashion, best prices, online shopping, EdxDeals',
  openGraph: {
    title: 'Shop - EdxDeals | Best Deals on Electronics, Home & More',
    description: 'Discover amazing deals on electronics, home goods, fashion, and more. Shop with confidence at EdxDeals.',
    type: 'website',
    url: '/shop',
    images: [
      {
        url: '/images/shop-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EdxDeals Shop - Best Deals Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop - EdxDeals | Best Deals on Electronics, Home & More',
    description: 'Discover amazing deals on electronics, home goods, fashion, and more.',
    images: ['/images/shop-og.jpg'],
  },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section */}
      <section className="w-full" aria-label="Featured deals and promotions">
        <HeroBanner />
      </section>

      {/* Quick Access Categories */}
      <section className="py-8 px-4 md:px-6 lg:px-8" aria-label="Shop by category">
        <CategoryTiles />
      </section>

      {/* Flash Deals */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/30" aria-label="Flash deals and limited time offers">
        <FlashDeals />
      </section>

      {/* Best Sellers & Trending */}
      <section className="py-8 px-4 md:px-6 lg:px-8" aria-label="Best selling and trending products">
        <BestSellers />
      </section>

      {/* Top Brands */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/20" aria-label="Shop by top brands">
        <TopBrands />
      </section>

      {/* Shop by Seller */}
      <section className="py-8 px-4 md:px-6 lg:px-8" aria-label="Featured sellers and storefronts">
        <ShopBySeller />
      </section>

      {/* Product Videos & AI Demos */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/30" aria-label="Product videos and demonstrations">
        <ProductVideos />
      </section>

      {/* Personalized Recommendations */}
      <section className="py-8 px-4 md:px-6 lg:px-8" aria-label="Personalized product recommendations">
        <PersonalizedRecommendations />
      </section>

      {/* Clearance & Closeout Deals */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/20" aria-label="Clearance and closeout deals">
        <ClearanceDeals />
      </section>

      {/* Shop by Filters */}
      <section className="py-8 px-4 md:px-6 lg:px-8" aria-label="Shop by price and features">
        <ShopByFilters />
      </section>

      {/* Sponsored Section */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-muted/10" aria-label="Sponsored products and offers">
        <SponsoredSection />
      </section>
    </div>
  );
}