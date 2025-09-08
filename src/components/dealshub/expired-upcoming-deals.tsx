'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { mockFlashDeals } from '@/lib/mock-data';
import React from 'react';

export default function ExpiredUpcomingDeals() {
  const expiredDeals = mockFlashDeals.slice(0, 4);
  const upcomingDeals = mockFlashDeals.slice(5, 9);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        More Deals to Discover
      </h2>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="expired">
          <AccordionTrigger className="text-xl font-semibold">
            Recently Expired
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 grayscale">
              {expiredDeals.map((deal) => (
                <UnifiedProductCard key={deal.id} product={deal} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="upcoming">
          <AccordionTrigger className="text-xl font-semibold">
            Coming Soon
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingDeals.map((deal) => (
                <div key={deal.id} className="relative">
                  <UnifiedProductCard product={deal} />
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <Button>Set Alert for Next Time!</Button>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}