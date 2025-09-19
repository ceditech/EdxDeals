'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play as PlayCircle, Clock, Users, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import VideoPlayerModal from '@/components/videos/VideoPlayerModal';

interface FlashDealVideo {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploaderId: string;
  uploadDate: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  category: 'demo' | 'review' | 'unboxing' | 'tutorial' | 'testimonial';
  linkedProductId?: string;
  linkedProductName?: string;
  linkedProductPrice?: string;
  originalPrice?: string;
  discountPercent?: number;
  viewCount: number;
  likeCount: number;
  duration: string;
  status: 'pending' | 'approved';
  isAiGenerated?: boolean;
  endDate?: Date;
}

const videos: FlashDealVideo[] = [
  {
    id: 'flash-video-1',
    title: 'Smart Watch Unboxing - Limited Edition Flash Deal',
    description: 'An in-depth look at the new limited edition smart watch featuring exclusive flash deal pricing and countdown timer.',
    uploader: 'TechDealsReviewer',
    uploaderId: 'user-flash-1',
    uploadDate: '2024-01-15',
    videoUrl: 'https://example.com/flash-video1',
    thumbnailUrl: '/videos/thumbnails/1.jpg',
    tags: ['smartwatch', 'unboxing', 'flash-deal', 'limited-edition'],
    category: 'unboxing',
    linkedProductId: 'fd1',
    linkedProductName: 'Limited Edition Smart Watch',
    linkedProductPrice: '$199.99',
    originalPrice: '$299.99',
    discountPercent: 33,
    viewCount: 25600,
    likeCount: 2140,
    duration: '8:45',
    status: 'approved',
    isAiGenerated: false,
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
  },
  {
    id: 'flash-video-2',
    title: 'Action Camera Review - Flash Deal Special',
    description: 'Testing the new action camera in various conditions with special flash deal pricing analysis.',
    uploader: 'ActionCameraPro',
    uploaderId: 'user-flash-2',
    uploadDate: '2024-01-12',
    videoUrl: 'https://example.com/flash-video2',
    thumbnailUrl: '/videos/thumbnails/2.jpg',
    tags: ['action-camera', 'review', 'flash-deal', '4k'],
    category: 'review',
    linkedProductId: 'fd2',
    linkedProductName: 'Ultra HD Action Camera',
    linkedProductPrice: '$99.50',
    originalPrice: '$159.50',
    discountPercent: 38,
    viewCount: 18400,
    likeCount: 1580,
    duration: '12:30',
    status: 'approved',
    isAiGenerated: true,
    endDate: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
  },
  {
    id: 'flash-video-3',
    title: 'Gaming Chair Assembly - Flash Deal Guide',
    description: 'A quick guide on how to assemble the ergonomic gaming chair with flash deal savings breakdown.',
    uploader: 'GamingSetupGuru',
    uploaderId: 'user-flash-3',
    uploadDate: '2024-01-10',
    videoUrl: 'https://example.com/flash-video3',
    thumbnailUrl: '/videos/thumbnails/3.jpg',
    tags: ['gaming-chair', 'assembly', 'flash-deal', 'ergonomic'],
    category: 'tutorial',
    linkedProductId: 'fd3',
    linkedProductName: 'Ergonomic Gaming Chair',
    linkedProductPrice: '$249.00',
    originalPrice: '$399.00',
    discountPercent: 38,
    viewCount: 14200,
    likeCount: 1120,
    duration: '15:22',
    status: 'approved',
    isAiGenerated: false,
    endDate: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour from now
  },
];

export default function FlashDealVideos() {
  const [selectedVideo, setSelectedVideo] = useState<FlashDealVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchNow = (video: FlashDealVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Flash Deal Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-red-500 opacity-60" />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="lg"
                      className="bg-white/90 text-black hover:bg-white"
                      onClick={() => handleWatchNow(video)}
                    >
                      <PlayCircle className="w-6 h-6 mr-2" />
                      Watch Now
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>

                  {/* Flash Deal Badge */}
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                    FLASH DEAL
                  </Badge>

                  {/* Discount Badge */}
                  {video.discountPercent && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      -{video.discountPercent}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Video Stats */}
                  <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatViewCount(video.viewCount)} views</span>
                    </div>
                    <span>{video.uploader}</span>
                  </div>

                  {/* Product Info */}
                  {video.linkedProductName && (
                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                      <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Featured Product</p>
                      <p className="text-sm font-semibold line-clamp-1">{video.linkedProductName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">{video.linkedProductPrice}</span>
                        {video.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{video.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={() => handleWatchNow(video)}
                      aria-label={`Watch ${video.title}`}
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Watch Now
                    </Button>
                    {video.linkedProductId && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/product/${video.linkedProductId}`}>
                          <ShoppingBag className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        video={selectedVideo}
      />
    </>
  );
}