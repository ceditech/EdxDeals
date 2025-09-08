import { Metadata } from 'next';
import GlobalCountdownBanner from '@/components/deals/global-countdown-banner';
import FilterBar from '@/components/deals/filter-bar';
import FlashDealsGrid from '@/components/deals/flash-deals-grid';
import FlashDealsByBrand from '@/components/deals/flash-deals-by-brand';
import FlashDealsByCategory from '@/components/deals/flash-deals-by-category';
import FlashDealsBySeller from '@/components/deals/flash-deals-by-seller';
import FlashDealVideos from '@/components/deals/flash-deal-videos';
import SubscribeCta from '@/components/deals/subscribe-cta';

export const metadata: Metadata = {
  title: 'Flash Deals | EdxDeals — Today’s Best Limited Time Offers',
  description: 'Discover today’s hottest flash deals on EdxDeals! Limited-time offers, countdowns, and mega savings on top brands, categories, and sellers.',
  keywords: 'flash deals, limited time offers, daily deals, online shopping, EdxDeals',
  openGraph: {
    title: 'Flash Deals | EdxDeals — Today’s Best Limited Time Offers',
    description: 'Discover today’s hottest flash deals on EdxDeals! Limited-time offers, countdowns, and mega savings on top brands, categories, and sellers.',
    type: 'website',
    url: '/deals/flash',
    images: [
      {
        url: '/images/flash-deals-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EdxDeals Flash Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flash Deals | EdxDeals — Today’s Best Limited Time Offers',
    description: 'Discover today’s hottest flash deals on EdxDeals! Limited-time offers, countdowns, and mega savings on top brands, categories, and sellers.',
    images: ['/images/flash-deals-og.jpg'],
  },
  alternates: {
    canonical: '/deals/flash',
  },
};

export default function FlashDealsPage() {
  return (
    <div className="bg-background">
      <GlobalCountdownBanner />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Flash Deals</h1>
        <FilterBar />
        <FlashDealsGrid />
        <FlashDealsByBrand />
        <FlashDealsByCategory />
        <FlashDealsBySeller />
        <FlashDealVideos />
        <SubscribeCta />
      </div>
    </div>
  );
}