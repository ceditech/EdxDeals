'use client';

import UnifiedProductCard from '@/components/home/unified-product-card';
import { mockFlashDeals } from '@/lib/mock-data';
import React from 'react';

export default function MainDealsGrid() {
  // In a real application, this would be fetched based on the selected filters
  const deals = mockFlashDeals;

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <UnifiedProductCard key={deal.id} product={deal} />
        ))}
      </div>
    </div>
  );
}