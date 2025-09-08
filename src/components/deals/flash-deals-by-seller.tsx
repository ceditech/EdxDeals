'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const sellers = [
  {
    name: 'Tech Guru',
    avatar: '/images/sellers/a.png',
    rating: 4.8,
    deals: 12,
  },
  {
    name: 'Home Comforts',
    avatar: '/images/sellers/b.png',
    rating: 4.9,
    deals: 8,
  },
  {
    name: 'Fashion Forward',
    avatar: '/images/sellers/c.png',
    rating: 4.7,
    deals: 15,
  },
  {
    name: 'Gadget Galaxy',
    avatar: '/images/sellers/d.png',
    rating: 4.8,
    deals: 20,
  },
  {
    name: 'Kitchen Kings',
    avatar: '/images/sellers/e.png',
    rating: 4.9,
    deals: 5,
  },
  {
    name: 'Outdoor Outfitters',
    avatar: '/images/sellers/f.png',
    rating: 4.6,
    deals: 10,
  },
];

export default function FlashDealsBySeller() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Flash Deals by Seller</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {sellers.map((seller, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Avatar className="w-16 h-16 mb-4">
                      <AvatarImage src={seller.avatar} alt={seller.name} />
                      <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{seller.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{seller.rating}</span>
                    </div>
                    <Badge variant="secondary" className="my-4">
                      {seller.deals} Flash Deals
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Deals
                    </Button>
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