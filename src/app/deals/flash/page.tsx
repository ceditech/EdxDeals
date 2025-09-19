import { Metadata } from 'next';
import FlashDealsPageClient from '@/components/deals/FlashDealsPageClient';

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
  return <FlashDealsPageClient />;
}