'use client';

import { mockFlashDeals } from '@/lib/mock-data';
import React from 'react';
import DealsCarousel from './deals-carousel';

export default function DealsByBrand() {
  // In a real application, you would fetch deals for a specific brand
  const brandDeals = mockFlashDeals.slice(0, 5); // Example data

  return <DealsCarousel title="Deals by Brand" deals={brandDeals} />;
}