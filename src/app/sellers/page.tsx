import type { Metadata } from 'next';
import SellersPageClient from '@/components/sellers/SellersPageClient';

// SEO metadata (App Router)
export const metadata: Metadata = {
  title: 'Sellers Hub - Become a Seller on EdxDeals',
  description:
    'Join thousands of thriving sellers on EdxDeals. Reach more customers, boost your sales, and grow your business with zero upfront fees.',
  openGraph: {
    title: 'Sellers Hub - Become a Seller on EdxDeals',
    description:
      'Join thousands of thriving sellers on EdxDeals. Reach more customers, boost your sales, and grow your business with zero upfront fees.',
    type: 'website',
    url: '/sellers',
    images: [{ url: '/images/store/speaker.jpg', width: 1200, height: 630, alt: 'EdxDeals Sellers Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sellers Hub - Become a Seller on EdxDeals',
    description:
      'Join thousands of thriving sellers on EdxDeals. Reach more customers, boost your sales, and grow your business with zero upfront fees.',
    images: ['/images/store/speaker.jpg'],
  },
};

export default function SellersPage() {
  // Server component wrapper renders the client UI
  return <SellersPageClient />;
}