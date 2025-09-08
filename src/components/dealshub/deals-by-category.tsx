'use client';

import { mockFlashDeals } from '@/lib/mock-data';
import React from 'react';
import DealsCarousel from './deals-carousel';

export default function DealsByCategory() {
  // In a real application, you would fetch deals for a specific category
  const categoryDeals = mockFlashDeals.filter(
    (deal) => deal.category === 'Electronics'
  );

  return <DealsCarousel title="Deals by Category" deals={categoryDeals} />;
}