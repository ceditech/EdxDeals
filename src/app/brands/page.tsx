import type { Metadata } from 'next';
import BrandsPage from '@/components/brands/brands-page';

export const metadata: Metadata = {
  title: 'Shop All Brands | EdxDeals',
  description:
    'Discover top brands at EdxDeals. Shop best sellers, flash deals, and trending products from your favorite brands.',
  openGraph: {
    title: 'Shop All Brands | EdxDeals',
    description:
      'Discover top brands at EdxDeals. Shop best sellers, flash deals, and trending products from your favorite brands.',
    url: '/brands',
    type: 'website',
    images: [{ url: '/images/shop-og.jpg', width: 1200, height: 630, alt: 'All Brands - EdxDeals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All Brands | EdxDeals',
    description:
      'Discover top brands at EdxDeals. Shop best sellers, flash deals, and trending products from your favorite brands.',
    images: ['/images/shop-og.jpg'],
  },
};

export default function Brands() {
  return (
    <div className="bg-background">
      <BrandsPage />
    </div>
  );
}