import type { Metadata } from 'next';
import { Suspense } from 'react';
import DynamicSellerShopPageClient from '@/components/seller/DynamicSellerShopPageClient';
import SellerPageSkeleton from '@/components/seller/SellerPageSkeleton';
import { findSellerStore } from '@/lib/seller-utils';

interface SellerShopPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SellerShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sellerData = findSellerStore(slug);
  
  if (!sellerData) {
    return {
      title: 'Store Not Found - EdxDeals',
      description: 'The store you are looking for could not be found.',
    };
  }

  return {
    title: `${sellerData.name} - Shop ${sellerData.specialization || 'Products'} | EdxDeals`,
    description: `${sellerData.description} Shop from ${sellerData.name} with ${sellerData.rating} star rating and ${sellerData.reviewCount} reviews. ${sellerData.categories.join(', ')}.`,
    keywords: [sellerData.name, ...sellerData.categories, 'online shopping', 'deals', 'EdxDeals'].join(', '),
    openGraph: {
      title: `${sellerData.name} - ${sellerData.specialization || 'Quality Products'}`,
      description: sellerData.description,
      type: 'website',
      url: `/seller/${slug}`,
      images: sellerData.logo ? [{ url: sellerData.logo, width: 1200, height: 630, alt: `${sellerData.name} logo` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sellerData.name} - ${sellerData.specialization || 'Quality Products'}`,
      description: sellerData.description,
      images: sellerData.logo ? [sellerData.logo] : [],
    },
  };
}

export default async function SellerShopPage({ params }: SellerShopPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SellerPageSkeleton />}>
      <DynamicSellerShopPageClient slug={slug} />
    </Suspense>
  );
}