'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  bg: string; // Tailwind gradient classes
};

const slides: Slide[] = [
  {
    id: 'flash',
    title: 'Flash Deals — Ends Soon!',
    subtitle: 'Get up to 60% off top brands. Limited time only.',
    ctaPrimary: { label: 'Shop Flash Deals', href: '/deals/flash' },
    ctaSecondary: { label: 'Set Deal Alerts', href: '#deal-alerts' },
    bg: 'from-blue-700 via-indigo-600 to-yellow-400',
  },
  {
    id: 'best',
    title: 'Best Deals of the Week',
    subtitle: 'Hand-picked best sellers at unbeatable prices.',
    ctaPrimary: { label: 'Shop Best Deals', href: '/deals/flash' },
    ctaSecondary: { label: 'Set Deal Alerts', href: '#deal-alerts' },
    bg: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    id: 'openbox',
    title: 'Open Box Savings',
    subtitle: 'Like-new products, inspected and guaranteed.',
    ctaPrimary: { label: 'Shop Open Box', href: '/deals/flash' },
    ctaSecondary: { label: 'Set Deal Alerts', href: '#deal-alerts' },
    bg: 'from-sky-700 via-blue-700 to-indigo-700',
  },
  {
    id: 'closeout',
    title: 'Closeout Clearance',
    subtitle: 'Final inventory markdowns before they’re gone.',
    ctaPrimary: { label: 'Shop Clearance', href: '/deals/flash' },
    ctaSecondary: { label: 'Set Deal Alerts', href: '#deal-alerts' },
    bg: 'from-rose-600 via-orange-500 to-amber-400',
  },
  {
    id: 'sponsored',
    title: 'Sponsored & Ads',
    subtitle: 'Discover featured deals from our partners.',
    ctaPrimary: { label: 'View Sponsored', href: '/deals/flash' },
    ctaSecondary: { label: 'Set Deal Alerts', href: '#deal-alerts' },
    bg: 'from-purple-700 via-fuchsia-600 to-pink-600',
  },
];

export default function DealsHubHero() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Track selected slide for indicators and aria
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  // Autoplay every 5s; pause on hover/focus
  useEffect(() => {
    if (!api || paused) return;
    const timer = setInterval(() => {
      const next = ((api.selectedScrollSnap?.() ?? 0) + 1) % slides.length;
      api.scrollTo(next);
    }, 5000);
    return () => clearInterval(timer);
  }, [api, paused]);

  const goto = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <section
      aria-label="Deals highlights"
      className="relative my-4 md:my-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start', dragFree: false }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((s, idx) => (
            <CarouselItem key={s.id}>
              <div
                id={`hero-slide-${idx}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${slides.length}: ${s.title}`}
                className="relative w-full h-[360px] md:h-[460px] overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-tr ${s.bg}`} />
                {/* Decorative glow */}
                <div className="absolute inset-0 opacity-20 sm:opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none">
                  <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
                </div>

                {/* Foreground content */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center px-6"
                  >
                    <h1 className="text-white drop-shadow-xl text-4xl md:text-5xl font-extrabold mb-3 md:mb-4">
                      {s.title}
                    </h1>
                    <p className="text-white/90 text-base md:text-lg max-w-2xl mb-5">
                      {s.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Link href={s.ctaPrimary.href} prefetch={false}>
                        <Button
                          aria-label={s.ctaPrimary.label}
                          className="bg-blue-600 text-white font-semibold text-lg py-2 px-6 rounded-full shadow-lg hover:scale-[1.03] hover:shadow-xl active:scale-100 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                        >
                          {s.ctaPrimary.label}
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('open-deal-alerts'));
                          const el = document.getElementById('deal-alerts');
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        aria-label={s.ctaSecondary.label}
                        className="bg-yellow-400 text-gray-900 font-semibold text-lg py-2 px-6 rounded-full shadow-lg hover:scale-[1.03] hover:shadow-xl active:scale-100 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                      >
                        {s.ctaSecondary.label}
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile contrast blur overlay */}
                <div className="absolute inset-0 sm:hidden backdrop-blur-[2px]" aria-hidden="true" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrow navigation (desktop) */}
        <CarouselPrevious
          className="hidden md:flex bg-white/90 hover:bg-white shadow-md text-gray-700"
          aria-controls={`hero-slide-${selectedIndex}`}
          aria-label="Previous slide"
        />
        <CarouselNext
          className="hidden md:flex bg-white/90 hover:bg-white shadow-md text-gray-700"
          aria-controls={`hero-slide-${selectedIndex}`}
          aria-label="Next slide"
        />

        {/* Dots / indicators */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => {
            const isActive = selectedIndex === i;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-controls={`hero-slide-${i}`}
                onClick={() => goto(i)}
                className={`h-2.5 rounded-full transition-all ${isActive ? 'w-6 bg-white shadow' : 'w-2.5 bg-white/60 hover:bg-white'}`}
              >
                <span className="sr-only">Go to slide {i + 1}</span>
              </button>
            );
          })}
        </div>
      </Carousel>
    </section>
  );
}