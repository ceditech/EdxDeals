'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const brands = [
  {
    name: 'Brand A',
    logo: '/images/brands/a.png',
  },
  {
    name: 'Brand B',
    logo: '/images/brands/b.png',
  },
  {
    name: 'Brand C',
    logo: '/images/brands/c.png',
  },
  {
    name: 'Brand D',
    logo: '/images/brands/d.png',
  },
  {
    name: 'Brand E',
    logo: '/images/brands/e.png',
  },
  {
    name: 'Brand F',
    logo: '/images/brands/f.png',
  },
];

export default function FlashDealsByBrand() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Flash Deals by Brand</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {brands.map((brand, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}