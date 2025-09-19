'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Clock, Users, Bot, ShoppingBag } from 'lucide-react';

interface Video {
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
  viewCount: number;
  likeCount: number;
  duration: string;
  status: 'pending' | 'approved';
  isAiGenerated?: boolean;
}

interface FeaturedVideoCarouselProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export default function FeaturedVideoCarousel({ videos, onVideoClick }: FeaturedVideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, videos.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleVideos = videos.slice(currentIndex, currentIndex + itemsPerPage);

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demo': return 'bg-blue-500';
      case 'review': return 'bg-green-500';
      case 'unboxing': return 'bg-orange-500';
      case 'tutorial': return 'bg-purple-500';
      case 'testimonial': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
          <Play className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No featured videos available</h3>
        <p className="text-muted-foreground">Check back later for featured content</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous videos"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next videos"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 md:px-12">
        {visibleVideos.map((video) => (
          <Card 
            key={video.id} 
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 hover:border-indigo-200"
            onClick={() => onVideoClick(video)}
          >
            <div className="relative">
              {/* Video Thumbnail - Larger for featured */}
              <div className="aspect-video bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-20 h-20 text-indigo-500 opacity-60" />
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="lg" className="bg-white/95 text-black hover:bg-white shadow-lg">
                    <Play className="w-8 h-8 mr-3" />
                    Watch Featured Video
                  </Button>
                </div>

                {/* Duration Badge */}
                <Badge className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {video.duration}
                </Badge>

                {/* Category Badge */}
                <Badge className={`absolute top-3 left-3 text-white text-sm px-3 py-1 ${getCategoryColor(video.category)}`}>
                  {video.category.toUpperCase()}
                </Badge>

                {/* AI Generated Badge */}
                {video.isAiGenerated && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm px-3 py-1">
                    <Bot className="w-4 h-4 mr-1" />
                    AI POWERED
                  </Badge>
                )}

                {/* Featured Badge */}
                <Badge className="absolute top-12 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-3 py-1 animate-pulse">
                  ⭐ FEATURED
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Video Title */}
              <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {video.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                {video.description}
              </p>

              {/* Uploader and Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-indigo-600">
                      {video.uploader.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{video.uploader}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{formatViewCount(video.viewCount)} views</span>
                </div>
              </div>

              {/* Linked Product Info */}
              {video.linkedProductName && (
                <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                        Featured Product
                      </p>
                      <p className="font-semibold line-clamp-1">{video.linkedProductName}</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {video.linkedProductPrice}
                      </p>
                    </div>
                    <Button size="sm" className="ml-3 bg-green-500 hover:bg-green-600 text-white">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Shop Now
                    </Button>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {video.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onVideoClick(video);
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Featured Video
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-8 gap-2 md:hidden">
        {Array.from({ length: Math.ceil(videos.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerPage) === index 
                ? 'bg-indigo-500' 
                : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            aria-label={`Go to featured videos page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}