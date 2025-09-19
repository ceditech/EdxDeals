'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, Heart, Send, ShoppingBag, Bot } from 'lucide-react';

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

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="relative" onClick={onClick}>
        {/* Video Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-16 h-16 text-indigo-500 opacity-60" />
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="lg" className="bg-white/90 text-black hover:bg-white">
              <Play className="w-6 h-6 mr-2" />
              Watch Now
            </Button>
          </div>

          {/* Duration Badge */}
          <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
            <Clock className="w-3 h-3 mr-1" />
            {video.duration}
          </Badge>

          {/* Category Badge */}
          <Badge className={`absolute top-2 left-2 text-white ${getCategoryColor(video.category)}`}>
            {video.category.toUpperCase()}
          </Badge>

          {/* AI Generated Badge */}
          {video.isAiGenerated && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white">
              <Bot className="w-3 h-3 mr-1" />
              AI
            </Badge>
          )}

          {/* Shop This Product Overlay */}
          {video.linkedProductId && (
            <div className="absolute bottom-2 left-2">
              <Link href={`/product/${video.linkedProductId}`} onClick={(e) => e.stopPropagation()}>
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Shop This
                </Badge>
              </Link>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Video Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={onClick}>
          {video.title}
        </h3>

        {/* Uploader and Date */}
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <span className="font-medium">{video.uploader}</span>
          <span>{formatDate(video.uploadDate)}</span>
        </div>

        {/* Video Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{formatViewCount(video.viewCount)} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
            <span>{formatViewCount(video.likeCount)}</span>
          </div>
        </div>

        {/* Linked Product Info */}
        {video.linkedProductName && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1">{video.linkedProductName}</p>
                <p className="text-lg font-bold text-primary">{video.linkedProductPrice}</p>
              </div>
              <Link href={`/product/${video.linkedProductId}`} onClick={(e) => e.stopPropagation()}>
                <Button size="sm" className="ml-2">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Shop
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {video.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{video.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-indigo-500 hover:bg-indigo-600"
            onClick={onClick}
          >
            <Play className="w-3 h-3 mr-1" />
            Watch
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle share functionality
            }}
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}