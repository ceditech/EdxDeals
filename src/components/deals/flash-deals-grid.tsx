'use client';

import { useState, useEffect } from 'react';
import { mockFlashDeals } from '@/lib/mock-data';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { Deal } from '@/types';

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

  const isExpired =
    timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

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

export default function FlashDealsGrid() {
  return (
    <div id="flash-deals-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
      {mockFlashDeals.map((deal) => (
        <div key={deal.id} className="relative group">
          <UnifiedProductCard product={deal} showRating={true} />
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
  );
}