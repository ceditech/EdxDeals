import { Metadata } from 'next';
import VideosPageClient from '@/components/videos/VideosPageClient';

export const metadata: Metadata = {
  title: 'Video Hub - EdxDeals | Product Demos, Reviews & More',
  description: 'Watch product demonstrations, reviews, unboxings, and tutorials. Discover EdxDeals products through engaging video content.',
  keywords: 'product videos, demos, reviews, unboxings, tutorials, EdxDeals, video hub',
  openGraph: {
    title: 'Video Hub - EdxDeals | Product Demos, Reviews & More',
    description: 'Watch product demonstrations, reviews, unboxings, and tutorials. Discover EdxDeals products through engaging video content.',
    type: 'website',
    url: '/videos',
    images: [
      {
        url: '/images/videos-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EdxDeals Video Hub - Product Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Hub - EdxDeals | Product Demos, Reviews & More',
    description: 'Watch product demonstrations, reviews, unboxings, and tutorials.',
    images: ['/images/videos-og.jpg'],
  },
};

export default function VideosPage() {
  return <VideosPageClient />;
}