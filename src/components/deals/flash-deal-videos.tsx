'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play as PlayCircle } from 'lucide-react';
import Image from 'next/image';

const videos = [
  {
    title: 'Smart Watch Unboxing',
    thumbnail: '/videos/thumbnails/1.jpg',
    summary: 'An in-depth look at the new limited edition smart watch.',
  },
  {
    title: 'Action Camera Review',
    thumbnail: '/videos/thumbnails/2.jpg',
    summary: 'Testing the new action camera in various conditions.',
  },
  {
    title: 'Gaming Chair Assembly',
    thumbnail: '/videos/thumbnails/3.jpg',
    summary: 'A quick guide on how to assemble the ergonomic gaming chair.',
  },
];

export default function FlashDealVideos() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Flash Deal Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="relative aspect-video mb-4">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {video.summary}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Watch Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}