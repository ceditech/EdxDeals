'use client';

import { mockFlashDeals } from '@/lib/mock-data';
import React from 'react';
import DealsCarousel from './deals-carousel';

export default function DealsBySeller() {
  // In a real application, you would fetch deals for a specific seller
  const sellerDeals = mockFlashDeals.slice(2, 7); // Example data

  return <DealsCarousel title="Deals by Seller" deals={sellerDeals} />;
}