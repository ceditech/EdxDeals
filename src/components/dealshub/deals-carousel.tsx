'use client';

import UnifiedProductCard from '@/components/home/unified-product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Deal } from '@/types';
import React from 'react';

interface DealsCarouselProps {
  title: string;
  deals: Deal[];
}

export default function DealsCarousel({ title, deals }: DealsCarouselProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: deals.length > 4,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {deals.map((deal) => (
            <CarouselItem
              key={deal.id}
              className="pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <UnifiedProductCard product={deal} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    </div>
  );
}