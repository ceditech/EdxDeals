'use client';

import { useState } from 'react';
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
import SellerDealsModal, { getSellerDealCount } from './SellerDealsModal';

const sellers = [
  {
    name: 'Tech Guru',
    avatar: '/images/sellers/a.png',
    rating: 4.8,
  },
  {
    name: 'Home Comforts',
    avatar: '/images/sellers/b.png',
    rating: 4.9,
  },
  {
    name: 'Fashion Forward',
    avatar: '/images/sellers/c.png',
    rating: 4.7,
  },
  {
    name: 'Gadget Galaxy',
    avatar: '/images/sellers/d.png',
    rating: 4.8,
  },
  {
    name: 'Kitchen Kings',
    avatar: '/images/sellers/e.png',
    rating: 4.9,
  },
  {
    name: 'Outdoor Outfitters',
    avatar: '/images/sellers/f.png',
    rating: 4.6,
  },
];

export default function FlashDealsBySeller() {
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDeals = (sellerName: string) => {
    setSelectedSeller(sellerName);
    setIsModalOpen(true);
  };

  return (
    <>
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
                      {getSellerDealCount(seller.name)} Flash Deals
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDeals(seller.name)}
                      aria-label={`View flash deals from ${seller.name}`}
                    >
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

    {/* Seller Deals Modal */}
    <SellerDealsModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      sellerName={selectedSeller}
    />
  </>
  );
}