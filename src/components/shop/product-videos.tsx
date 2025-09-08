'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Bot, Star, Clock } from 'lucide-react';

interface ProductVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  productName: string;
  productPrice: string;
  productId: string;
  videoType: 'demo' | 'review' | 'unboxing' | 'tutorial';
  aiSummary: string[];
  viewCount: number;
  rating: number;
  isAiGenerated: boolean;
}

const productVideos: ProductVideo[] = [
  {
    id: 'video-1',
    title: 'Wireless Headphones Pro - Complete Review & Sound Test',
    thumbnail: '/images/videos/headphones-review-thumb.jpg',
    duration: '8:45',
    productName: 'Wireless Bluetooth Headphones Pro',
    productPrice: '$129.99',
    productId: 'elec-001',
    videoType: 'review',
    aiSummary: [
      'Excellent noise cancellation performance',
      '30-hour battery life confirmed',
      'Superior sound quality with deep bass',
      'Comfortable for extended wear'
    ],
    viewCount: 15600,
    rating: 4.8,
    isAiGenerated: false
  },
  {
    id: 'video-2',
    title: 'Smart Fitness Tracker - AI Health Analysis Demo',
    thumbnail: '/images/videos/fitness-tracker-demo-thumb.jpg',
    duration: '6:32',
    productName: 'Smart Fitness Tracker Watch',
    productPrice: '$89.99',
    productId: 'elec-002',
    videoType: 'demo',
    aiSummary: [
      'Accurate heart rate monitoring',
      'GPS tracking works perfectly',
      'Sleep analysis provides detailed insights',
      'Water resistance tested and confirmed'
    ],
    viewCount: 12400,
    rating: 4.6,
    isAiGenerated: true
  },
  {
    id: 'video-3',
    title: 'Smart LED Bulbs Setup & Features Walkthrough',
    thumbnail: '/images/videos/led-bulbs-tutorial-thumb.jpg',
    duration: '5:18',
    productName: 'Smart LED Light Bulbs Set',
    productPrice: '$39.99',
    productId: 'home-001',
    videoType: 'tutorial',
    aiSummary: [
      'Easy WiFi setup process',
      '16 million colors available',
      'Voice control works seamlessly',
      'Energy efficient and long-lasting'
    ],
    viewCount: 8900,
    rating: 4.4,
    isAiGenerated: false
  },
  {
    id: 'video-4',
    title: 'Gaming Mouse Unboxing & Performance Test',
    thumbnail: '/images/videos/gaming-mouse-unbox-thumb.jpg',
    duration: '7:22',
    productName: 'Wireless Gaming Mouse',
    productPrice: '$59.99',
    productId: '4',
    videoType: 'unboxing',
    aiSummary: [
      'Premium packaging and accessories',
      'High-precision optical sensor',
      'Customizable RGB lighting effects',
      'Ergonomic design for gaming'
    ],
    viewCount: 11200,
    rating: 4.7,
    isAiGenerated: true
  },
  {
    id: 'video-5',
    title: 'Portable Speaker - Sound Quality & Bass Test',
    thumbnail: '/images/videos/speaker-test-thumb.jpg',
    duration: '9:15',
    productName: 'Portable Bluetooth Speaker',
    productPrice: '$89.99',
    productId: '5',
    videoType: 'review',
    aiSummary: [
      '360-degree sound fills the room',
      'Deep bass without distortion',
      'Waterproof design tested',
      '12-hour battery life confirmed'
    ],
    viewCount: 18700,
    rating: 4.9,
    isAiGenerated: false
  },
  {
    id: 'video-6',
    title: 'Laptop Stand - Ergonomic Benefits Demo',
    thumbnail: '/images/videos/laptop-stand-demo-thumb.jpg',
    duration: '4:56',
    productName: 'Laptop Stand Adjustable',
    productPrice: '$39.99',
    productId: '6',
    videoType: 'demo',
    aiSummary: [
      'Multiple height adjustments available',
      'Improves posture significantly',
      'Excellent cooling ventilation',
      'Sturdy aluminum construction'
    ],
    viewCount: 6800,
    rating: 4.3,
    isAiGenerated: true
  }
];

export default function ProductVideos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const itemsPerPage = 3;

  // Filter videos by type
  const filteredVideos = selectedType === 'all' 
    ? productVideos 
    : productVideos.filter(video => video.videoType === selectedType);

  const maxIndex = Math.max(0, filteredVideos.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleVideos = filteredVideos.slice(currentIndex, currentIndex + itemsPerPage);

  const videoTypes = [
    { value: 'all', label: 'All Videos', count: productVideos.length },
    { value: 'demo', label: 'Demos', count: productVideos.filter(v => v.videoType === 'demo').length },
    { value: 'review', label: 'Reviews', count: productVideos.filter(v => v.videoType === 'review').length },
    { value: 'unboxing', label: 'Unboxing', count: productVideos.filter(v => v.videoType === 'unboxing').length },
    { value: 'tutorial', label: 'Tutorials', count: productVideos.filter(v => v.videoType === 'tutorial').length }
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-indigo-500 p-2 rounded-full">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Product Videos & AI Demos
            </h2>
            <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">
              AI POWERED
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Watch detailed product demonstrations and AI-generated summaries to make informed decisions
          </p>
        </div>

        {/* Video Type Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {videoTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedType(type.value);
                setCurrentIndex(0);
              }}
              className={selectedType === type.value ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
            >
              {type.label} ({type.count})
            </Button>
          ))}
        </div>

        {/* Videos Carousel */}
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
              <Card key={video.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-muted/30 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center">
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

                    {/* Video Type Badge */}
                    <Badge 
                      className={`absolute top-2 left-2 text-white ${
                        video.videoType === 'demo' ? 'bg-blue-500' :
                        video.videoType === 'review' ? 'bg-green-500' :
                        video.videoType === 'unboxing' ? 'bg-orange-500' :
                        'bg-purple-500'
                      }`}
                    >
                      {video.videoType.toUpperCase()}
                    </Badge>

                    {/* AI Generated Badge */}
                    {video.isAiGenerated && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                        <Bot className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Video Title */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {video.title}
                  </h3>

                  {/* Product Info */}
                  <div className="flex items-center justify-between mb-3">
                    <Link 
                      href={`/product/${video.productId}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {video.productName}
                    </Link>
                    <span className="text-sm font-bold text-primary">{video.productPrice}</span>
                  </div>

                  {/* Video Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{video.rating}</span>
                    </div>
                    <span>{(video.viewCount / 1000).toFixed(1)}K views</span>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium">AI Summary:</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {video.aiSummary.slice(0, 3).map((point, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-indigo-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-indigo-500 hover:bg-indigo-600">
                      <Play className="w-3 h-3 mr-1" />
                      Watch
                    </Button>
                    <Link href={`/product/${video.productId}`}>
                      <Button variant="outline" size="sm">
                        View Product
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {Array.from({ length: Math.ceil(filteredVideos.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index 
                    ? 'bg-indigo-500' 
                    : 'bg-muted'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to videos page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Videos Button */}
        <div className="text-center mt-8">
          <Link href="/videos">
            <Button variant="outline" size="lg" className="px-8">
              <Play className="w-4 h-4 mr-2" />
              View All Product Videos
            </Button>
          </Link>
        </div>

        {/* AI Features Highlight */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bot className="w-6 h-6 text-indigo-500" />
              <h3 className="text-lg font-semibold">AI-Powered Video Analysis</h3>
            </div>
            <p className="text-muted-foreground">
              Our AI automatically analyzes product videos to provide key insights and summaries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">50+</div>
              <div className="text-sm text-muted-foreground">AI-Generated Summaries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Auto-Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}