'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { ChevronLeft, ChevronRight, Clock, Zap } from 'lucide-react';
import DealAlertsModal from '@/components/modals/deal-alerts-modal';
import { mockFlashDeals } from '@/lib/mock-data';
import type { Deal } from '@/types';

interface CountdownTimerProps {
  endDate: Date;
}

function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="w-4 h-4 text-red-500" />
      {isExpired ? (
        <span className="text-red-500 font-medium">Deal Expired</span>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Ends in:</span>
          <div className="flex gap-1">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-red-500">:</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-red-500">:</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FlashDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDealAlertsModalOpen, setIsDealAlertsModalOpen] = useState(false);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, mockFlashDeals.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleDeals = mockFlashDeals.slice(currentIndex, currentIndex + itemsPerPage);

  // Calculate overall time left for the flash deals section
  const sectionEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours from now

return (
    <>
      <div className="w-full">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-red-500 p-2 rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Flash Deals
              </h2>
              <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                LIMITED TIME
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              Incredible deals that won't last long - grab them before they're
              gone!
            </p>
            {/* Section Countdown Timer */}
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-full">
              <CountdownTimer endDate={sectionEndTime} />
            </div>
          </div>
          {/* Flash Deals Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous deals"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next deals"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 md:px-12">
              {visibleDeals.map((deal) => (
                <div key={deal.id} className="relative">
                  {/* Flash Deal Badge */}
                  <div className="absolute top-2 left-2 z-20">
                    <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                      <Zap className="w-3 h-3 mr-1" />
                      FLASH DEAL
                    </Badge>
                  </div>
                  {/* Product Card */}
                  <UnifiedProductCard product={deal} showRating={true} />
                  {/* Deal Timer Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                      <CardContent className="p-3">
                        <CountdownTimer endDate={deal.endDate} />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile Navigation Dots */}
            <div className="flex justify-center mt-6 gap-2 md:hidden">
              {Array.from({
                length: Math.ceil(mockFlashDeals.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? 'bg-red-500'
                      : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  aria-label={`Go to deals page ${index + 1}`}
                />
              ))}
            </div>
          </div>
          {/* View All Flash Deals Button */}
          <div className="text-center mt-8">
            <Link href="/deals/flash">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-8"
              >
                <Zap className="w-4 h-4 mr-2" />
                View All Flash Deals
              </Button>
            </Link>
          </div>
          {/* Deal Alert Signup */}
          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Never Miss a Flash Deal!
            </h3>
            <p className="text-muted-foreground mb-4">
              Get notified when new flash deals go live
            </p>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => setIsDealAlertsModalOpen(true)}
            >
              Set Deal Alerts
            </Button>
          </div>
        </div>
      </div>
      <DealAlertsModal
        isOpen={isDealAlertsModalOpen}
        onClose={() => setIsDealAlertsModalOpen(false)}
      />
    </>
  );
}