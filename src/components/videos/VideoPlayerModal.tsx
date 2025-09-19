'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Play, Clock, Users, Heart, Send, ShoppingBag, Bot, Star, X } from 'lucide-react';

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

interface VideoPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
}

// Mock related videos
const mockRelatedVideos = [
  {
    id: 'related-1',
    title: 'Wireless Headphones Comparison',
    uploader: 'TechReviewer',
    duration: '6:30',
    viewCount: 8500,
    thumbnailUrl: '/images/videos/related-1.jpg'
  },
  {
    id: 'related-2',
    title: 'Best Audio Setup for Gaming',
    uploader: 'GamerPro',
    duration: '12:45',
    viewCount: 15200,
    thumbnailUrl: '/images/videos/related-2.jpg'
  },
  {
    id: 'related-3',
    title: 'Bluetooth vs Wired Headphones',
    uploader: 'AudioExpert',
    duration: '9:20',
    viewCount: 11800,
    thumbnailUrl: '/images/videos/related-3.jpg'
  }
];

export default function VideoPlayerModal({ open, onOpenChange, video }: VideoPlayerModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0" aria-describedby="video-description">
        <VisuallyHidden>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription id="video-description">
            {video.description}
          </DialogDescription>
        </VisuallyHidden>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Main Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                {!isPlaying ? (
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Play className="w-8 h-8 mr-3" />
                    Play Video
                  </Button>
                ) : (
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p>Loading video...</p>
                  </div>
                )}
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-white ${getCategoryColor(video.category)}`}>
                      {video.category.toUpperCase()}
                    </Badge>
                    {video.isAiGenerated && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                        <Bot className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
              
              {/* Stats and Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{formatViewCount(video.viewCount)} views</span>
                  </div>
                  <span>•</span>
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                    {formatViewCount(video.likeCount + (isLiked ? 1 : 0))}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Uploader Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-indigo-600">
                    {video.uploader.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{video.uploader}</h3>
                  <p className="text-sm text-muted-foreground">Content Creator</p>
                </div>
              </div>

              {/* Linked Product */}
              {video.linkedProductName && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                        Featured in this video
                      </p>
                      <h4 className="font-semibold text-lg mb-1">{video.linkedProductName}</h4>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {video.linkedProductPrice}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link href={`/product/${video.linkedProductId}`}>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="mb-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{video.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-muted/30 p-6">
            <h3 className="font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {mockRelatedVideos.map((relatedVideo) => (
                <div key={relatedVideo.id} className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <div className="w-24 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-indigo-500 opacity-60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      {relatedVideo.uploader}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatViewCount(relatedVideo.viewCount)} views</span>
                      <span>•</span>
                      <span>{relatedVideo.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="font-semibold">Quick Actions</h3>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Share Video
              </Button>
              {video.linkedProductId && (
                <Link href={`/product/${video.linkedProductId}`}>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}