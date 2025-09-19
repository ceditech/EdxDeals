'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

type Testimonial = {
  id: string;
  name: string;
  avatar?: string | null;
  rating: number;
  quote: string;
  store: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ava Johnson',
    avatar: null,
    rating: 5,
    quote:
      'EdxDeals helped us expand to new markets quickly. The dashboard insights are incredibly helpful.',
    store: 'Stellar Tech',
  },
  {
    id: 't2',
    name: 'David Kim',
    avatar: null,
    rating: 5,
    quote:
      'Zero upfront fees and fast payouts made it easy to scale our catalog. Support is top-notch.',
    store: 'Comfort Threads',
  },
  {
    id: 't3',
    name: 'Sophia Martinez',
    avatar: null,
    rating: 4,
    quote:
      'Onboarding was smooth and we started getting orders within days. Highly recommend.',
    store: 'Kitchen Gurus',
  },
  {
    id: 't4',
    name: 'Liam Chen',
    avatar: null,
    rating: 5,
    quote:
      'Built-in trust and an engaged audience drove strong conversion rates for our new products.',
    store: 'Beauty Lab',
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="container mx-auto px-4 py-10" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        What Sellers Are Saying
      </h2>
      <div className="max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {t.avatar ? (
                          <Image
                            src={t.avatar}
                            alt={`${t.name} avatar`}
                            width={48}
                            height={48}
                            className="object-cover w-12 h-12"
                          />
                        ) : (
                          <span className="text-sm font-semibold">{t.name.split(' ').map((x) => x[0]).join('').slice(0,2)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.store}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < t.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}