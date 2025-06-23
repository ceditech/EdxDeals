"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBanners } from '@/lib/mock-data';
import type { Banner } from '@/types';
import { cn } from '@/lib/utils';

export function MainBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (mockBanners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % mockBanners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % mockBanners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + mockBanners.length) % mockBanners.length);
  };
  
  if (!isClient) {
    // Render a static placeholder or the first banner on SSR
    const banner = mockBanners[0];
    return (
      <section aria-label="Promotional Banners" className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] bg-muted overflow-hidden">
        {banner && (
          <div className="w-full h-full">
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              width={1200}
              height={400}
              priority
              data-ai-hint={banner.dataAiHint}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4 drop-shadow-lg">{banner.title}</h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl drop-shadow-md">{banner.description}</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={banner.ctaLink}>{banner.ctaText}</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    );
  }


  if (!mockBanners || mockBanners.length === 0) {
    return null;
  }
  
  const activeBanner = mockBanners[currentBanner];

  return (
    <section aria-label="Promotional Banners" className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] bg-muted overflow-hidden group">
      {mockBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            width={1200}
            height={400}
            priority={index === 0} // Prioritize loading the first image
            data-ai-hint={banner.dataAiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-end md:justify-center text-center p-6 md:p-12">
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-headline font-bold text-white mb-3 md:mb-4 drop-shadow-lg">{banner.title}</h2>
            <p className="text-md md:text-xl text-white/90 mb-4 md:mb-6 max-w-lg md:max-w-2xl drop-shadow-md">{banner.description}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg">
              <Link href={banner.ctaLink}>{banner.ctaText}</Link>
            </Button>
          </div>
        </div>
      ))}

      {mockBanners.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next banner"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {mockBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  currentBanner === index ? "bg-primary w-4" : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
