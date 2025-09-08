'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const nextEvent = new Date();
      nextEvent.setHours(23, 59, 59, 999); // End of the day
      const difference = nextEvent.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 animate-pulse" />
            <h2 className="text-xl font-bold">Flash Deals End Soon!</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg">
              <Clock className="h-6 w-6" />
              <span>{String(timeLeft.hours).padStart(2, '0')}:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <Button
              variant="outline"
              className="bg-white text-red-600 hover:bg-red-100"
            >
              View Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}