'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Play as PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const DEMO_VIDEOS = [
  {
    id: '1',
    title: 'Smart Watch Unboxing',
    thumbnail: 'https://placehold.co/1200x400.png',
  },
  {
    id: '2',
    title: 'Action Camera Review',
    thumbnail: 'https://placehold.co/1200x400.png',
  },
  {
    id: '3',
    title: 'Gaming Chair Assembly',
    thumbnail: 'https://placehold.co/1200x400.png',
  },
  {
    id: '4',
    title: 'Blender Smoothie Test',
    thumbnail: 'https://placehold.co/1200x400.png',
  },
];

export default function DealDemos() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Videos & Deal Demos</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: DEMO_VIDEOS.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {DEMO_VIDEOS.map((video) => (
            <CarouselItem
              key={video.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircleIcon className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    </div>
  );
}