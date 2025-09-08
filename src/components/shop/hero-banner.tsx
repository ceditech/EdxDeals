'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Star, TrendingUp } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  icon: React.ReactNode;
  badge?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Welcome back, Cedric!',
    subtitle: 'Top Deals Just for You',
    description: 'Discover personalized recommendations based on your browsing history and preferences.',
    ctaText: 'Shop My Picks',
    ctaLink: '/shop?filter=personalized',
    backgroundImage: '/images/hero/personalized-bg.jpg',
    backgroundColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    textColor: 'text-white',
    icon: <Sparkles className="w-8 h-8" />,
    badge: 'AI Powered'
  },
  {
    id: '2',
    title: 'Flash Sale Alert!',
    subtitle: 'Up to 70% Off Electronics',
    description: 'Limited time offers on top-rated electronics. Hurry, deals end soon!',
    ctaText: 'Shop Flash Deals',
    ctaLink: '/shop?filter=flash-deals',
    backgroundImage: '/images/hero/flash-sale-bg.jpg',
    backgroundColor: 'bg-gradient-to-r from-red-500 to-orange-500',
    textColor: 'text-white',
    icon: <Zap className="w-8 h-8" />,
    badge: 'Limited Time'
  },
  {
    id: '3',
    title: 'Trending Now',
    subtitle: 'Most Popular Products',
    description: 'See what everyone is buying. Join thousands of satisfied customers.',
    ctaText: 'View Trending',
    ctaLink: '/shop?filter=trending',
    backgroundImage: '/images/hero/trending-bg.jpg',
    backgroundColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    textColor: 'text-white',
    icon: <TrendingUp className="w-8 h-8" />,
    badge: 'Hot'
  },
  {
    id: '4',
    title: 'Premium Brands',
    subtitle: 'Quality You Can Trust',
    description: 'Shop from top brands with verified quality and authentic products.',
    ctaText: 'Explore Brands',
    ctaLink: '/shop?filter=premium-brands',
    backgroundImage: '/images/hero/brands-bg.jpg',
    backgroundColor: 'bg-gradient-to-r from-gray-800 to-gray-600',
    textColor: 'text-white',
    icon: <Star className="w-8 h-8" />,
    badge: 'Premium'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background with gradient overlay */}
      <div className={`absolute inset-0 ${currentSlideData.backgroundColor}`}>
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-black/20">
          <div className="w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            {currentSlideData.badge && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                {currentSlideData.icon}
                <span className={`text-sm font-medium ${currentSlideData.textColor}`}>
                  {currentSlideData.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${currentSlideData.textColor}`}>
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-6 ${currentSlideData.textColor} opacity-90`}>
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${currentSlideData.textColor} opacity-80`}>
              {currentSlideData.description}
            </p>

            {/* CTA Button */}
            <Link href={currentSlideData.ctaLink}>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {currentSlideData.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}