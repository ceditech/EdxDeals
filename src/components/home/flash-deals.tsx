"use client";

import { useState, useEffect } from 'react';
import { mockFlashDeals } from '@/lib/mock-data';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Deal } from '@/types';
import { cn } from '@/lib/utils';

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(endDate: Date): Countdown | null {
  const difference = +endDate - +new Date();
  if (difference <= 0) {
    return null; // Deal has ended
  }
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState<Record<string, Countdown | null>>({});
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (mockFlashDeals.length === 0) return;

    const timer = setInterval(() => {
      const newTimeLeft: Record<string, Countdown | null> = {};
      mockFlashDeals.forEach(deal => {
        newTimeLeft[deal.id] = calculateTimeLeft(deal.endDate);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  const activeDeals = mockFlashDeals.filter(deal => timeLeft[deal.id] !== null);

  if (!isClient || activeDeals.length === 0) {
    // Fallback for SSR or if no active deals
    return (
      <section aria-labelledby="flash-deals-title" className="py-8 md:py-12 bg-gradient-to-r from-accent/80 via-accent/70 to-primary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 id="flash-deals-title" className="text-2xl md:text-3xl font-headline font-bold mb-2 text-accent-foreground flex items-center justify-center">
            <Zap className="mr-2 h-8 w-8" /> Flash Deals
          </h2>
          <p className="text-accent-foreground/80">Check back soon for exciting limited-time offers!</p>
        </div>
      </section>
    );
  }
  
  const nextDeal = () => {
    setCurrentDealIndex((prev) => (prev + 1) % activeDeals.length);
  };

  const prevDeal = () => {
    setCurrentDealIndex((prev) => (prev - 1 + activeDeals.length) % activeDeals.length);
  };

  const currentDeal = activeDeals[currentDealIndex];
  const currentDealTimeLeft = timeLeft[currentDeal.id];

  // Calculate progress for the countdown bar (total duration could be e.g. 2 hours for the first deal)
  // This is a simplified progress based on the first deal's initial duration
  const initialDuration = +mockFlashDeals[0].endDate - (+mockFlashDeals[0].endDate - 2*60*60*1000); // Assuming 2hr deal
  const timePassed = initialDuration - ((currentDealTimeLeft?.hours || 0) * 3600 + (currentDealTimeLeft?.minutes || 0) * 60 + (currentDealTimeLeft?.seconds || 0)) * 1000;
  const progressPercentage = Math.max(0, Math.min(100, (timePassed / initialDuration) * 100));


  return (
    <section aria-labelledby="flash-deals-title" className="py-8 md:py-12 bg-gradient-to-br from-accent/90 via-accent/80 to-primary/40 text-accent-foreground rounded-lg shadow-xl my-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 id="flash-deals-title" className="text-3xl md:text-4xl font-headline font-extrabold mb-2 flex items-center justify-center">
            <Zap className="mr-3 h-10 w-10 animate-pulse" /> Flash Deals
          </h2>
          <p className="text-lg">Don't miss out on these amazing limited-time offers!</p>
        </div>
        
        {currentDealTimeLeft && (
          <div className="mb-6 p-4 bg-background/20 backdrop-blur-sm rounded-lg shadow-md text-center">
            <p className="text-sm font-medium mb-1">Deal Ends In:</p>
            <div className="text-2xl md:text-4xl font-bold font-mono tracking-tight">
              <span>{String(currentDealTimeLeft.hours).padStart(2, '0')}</span>:
              <span>{String(currentDealTimeLeft.minutes).padStart(2, '0')}</span>:
              <span>{String(currentDealTimeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <Progress value={100 - progressPercentage} className="mt-3 h-2 [&>div]:bg-primary" />
          </div>
        )}
        
        <div className="text-xl font-semibold mb-6 text-center">Limited Time Offers</div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 pb-4">
             {activeDeals.map((deal) => (
                <div key={deal.id} className="w-[250px] sm:w-[280px] lg:w-[300px]">
                    <ProductCard product={deal} />
                </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

      </div>
    </section>
  );
}
