'use client';

import { useState } from 'react';
import GlobalCountdownBanner from '@/components/deals/global-countdown-banner';
import FilterBar from '@/components/deals/filter-bar';
import FlashDealsGrid from '@/components/deals/flash-deals-grid';
import FlashDealsByBrand from '@/components/deals/flash-deals-by-brand';
import FlashDealsByCategory from '@/components/deals/flash-deals-by-category';
import FlashDealsBySeller from '@/components/deals/flash-deals-by-seller';
import FlashDealVideos from '@/components/deals/flash-deal-videos';
import SubscribeCta from '@/components/deals/subscribe-cta';

export default function FlashDealsPageClient() {
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