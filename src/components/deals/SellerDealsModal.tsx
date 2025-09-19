'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Star, ShoppingBag, ChevronRight, Zap } from 'lucide-react';
import { mockFlashDeals } from '@/lib/mock-data';
import type { Deal } from '@/types';

interface SellerDealsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sellerName: string | null;
}

interface CountdownTimerProps {
  endDate: Date;
}

function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  const isUrgent = timeLeft.hours === 0 && timeLeft.minutes < 10;

  return (
    <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${
      isUrgent ? 'animate-pulse' : ''
    }`}>
      <Clock className={`w-4 h-4 ${isUrgent ? 'text-yellow-500' : 'text-red-500'}`} />
      {isExpired ? (
        <span className="text-red-500 font-medium">Deal Expired</span>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Ends in:</span>
          <div className={`flex gap-1 ${isUrgent ? 'scale-110' : ''} transition-transform duration-300`}>
            <span className={`px-2 py-1 rounded text-xs font-mono text-white ${
              isUrgent ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`}>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className={isUrgent ? 'text-yellow-500' : 'text-red-500'}>:</span>
            <span className={`px-2 py-1 rounded text-xs font-mono text-white ${
              isUrgent ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className={isUrgent ? 'text-yellow-500' : 'text-red-500'}>:</span>
            <span className={`px-2 py-1 rounded text-xs font-mono text-white ${
              isUrgent ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock seller-specific deals mapping
export const getSellerDeals = (sellerName: string): Deal[] => {
  // In a real app, this would filter deals by seller from the database
  // For now, we'll return a subset of mock deals based on seller name
  const sellerDealMap: { [key: string]: Deal[] } = {
    'Tech Guru': mockFlashDeals.filter(deal =>
      deal.category === 'Electronics' || deal.name.toLowerCase().includes('smart')
    ).slice(0, 4),
    'Home Comforts': mockFlashDeals.filter(deal =>
      deal.category === 'Home' || deal.name.toLowerCase().includes('home')
    ).slice(0, 3),
    'Fashion Forward': mockFlashDeals.filter(deal =>
      deal.category === 'Fashion' || deal.name.toLowerCase().includes('fashion')
    ).slice(0, 2),
    'Gadget Galaxy': mockFlashDeals.filter(deal =>
      deal.category === 'Electronics'
    ).slice(0, 5),
    'Kitchen Kings': mockFlashDeals.filter(deal =>
      deal.name.toLowerCase().includes('coffee') || deal.name.toLowerCase().includes('kitchen')
    ).slice(0, 2),
    'Outdoor Outfitters': mockFlashDeals.filter(deal =>
      deal.category === 'Sports & Outdoors'
    ).slice(0, 3),
  };

  return sellerDealMap[sellerName] || [];
};

// Helper function to get seller deal count
export const getSellerDealCount = (sellerName: string): number => {
  return getSellerDeals(sellerName).length;
};

export default function SellerDealsModal({ open, onOpenChange, sellerName }: SellerDealsModalProps) {
  const sellerDeals = sellerName ? getSellerDeals(sellerName) : [];

  if (!sellerName) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            Flash Deals from {sellerName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Discover exclusive flash deals and limited-time offers from {sellerName}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {/* Seller Stats */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {sellerName.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{sellerName}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">4.8</span>
                  </div>
                  <Badge className="bg-red-500 text-white">
                    {sellerDeals.length} Flash Deals
                  </Badge>
                </div>
              </div>
            </div>
            <Link href="/deals/flash">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                <ChevronRight className="w-4 h-4 mr-2" />
                View All Flash Deals
              </Button>
            </Link>
          </div>

          <Separator className="mb-6" />

          {/* Flash Deals Grid */}
          {sellerDeals.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Flash Deals Available</h3>
              <p className="text-muted-foreground mb-4">
                {sellerName} doesn't have any active flash deals right now.
              </p>
              <Link href="/deals/flash">
                <Button variant="outline">
                  Browse All Flash Deals
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative aspect-square">
                    <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-8">
                      <ShoppingBag className="w-24 h-24 text-red-300 opacity-40" />
                    </div>
                    
                    {/* Flash Deal Badge */}
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                      <Zap className="w-3 h-3 mr-1" />
                      FLASH DEAL
                    </Badge>

                    {/* Discount Badge */}
                    {deal.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        SALE
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <Link href={`/product/${deal.id}`} className="hover:text-primary">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {deal.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground mb-3">{deal.category}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-red-500">{deal.price}</span>
                      {deal.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {deal.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                      <CountdownTimer endDate={deal.endDate} />
                    </div>
                    
                    <Link href={`/product/${deal.id}`}>
                      <Button className="w-full bg-red-500 hover:bg-red-600">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Showing {sellerDeals.length} flash deals from {sellerName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deals are updated in real-time • Limited quantities available
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Link href="/deals/flash">
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    View All Flash Deals
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}