'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Sparkles, Percent, TrendingUp } from 'lucide-react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  gradientFrom: string;
  gradientTo: string;
  ctaText: string;
  ctaAction: () => void;
  badge?: string;
  icon: React.ReactNode;
}

interface SellerHeroSliderProps {
  seller: SellerShopData;
  onPromotionClick: (promotionId: string) => void;
  onBestSellersClick: () => void;
}

export default function SellerHeroSlider({ seller, onPromotionClick, onBestSellersClick }: SellerHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Create hero slides from seller data
  const slides: HeroSlide[] = [
    // Main store slide
    {
      id: 'main-store',
      title: `Welcome to ${seller.name}`,
      subtitle: seller.specialization || 'Quality Products',
      description: seller.description,
      backgroundImage: seller.coverImage || 'https://placehold.co/1920x600/4f46e5/ffffff?text=Store+Hero',
      gradientFrom: 'from-blue-600/90',
      gradientTo: 'to-purple-600/90',
      ctaText: 'Shop All Products',
      ctaAction: () => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: seller.isFeatured ? 'Featured Store' : undefined,
      icon: <ShoppingBag className="w-6 h-6" />,
    },
    // Promotion slides
    ...seller.promotions.filter(p => p.isActive).map((promo, index) => ({
      id: promo.id,
      title: promo.title,
      subtitle: promo.discount ? `${promo.discount} OFF` : 'Special Offer',
      description: promo.description,
      backgroundImage: `https://placehold.co/1920x600/${index % 2 === 0 ? 'e11d48' : '059669'}/ffffff?text=${encodeURIComponent(promo.title)}`,
      gradientFrom: promo.type === 'discount' ? 'from-red-500/90' : promo.type === 'coupon' ? 'from-green-500/90' : 'from-blue-500/90',
      gradientTo: promo.type === 'discount' ? 'to-pink-500/90' : promo.type === 'coupon' ? 'to-emerald-500/90' : 'to-indigo-500/90',
      ctaText: promo.type === 'coupon' ? 'Get Code' : 'Shop Now',
      ctaAction: () => onPromotionClick(promo.id),
      badge: promo.code ? `Code: ${promo.code}` : undefined,
      icon: promo.type === 'discount' ? <Percent className="w-6 h-6" /> : promo.type === 'coupon' ? <Sparkles className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />,
    })),
    // Best sellers slide
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      subtitle: 'Top Rated Products',
      description: `Discover our most popular items with ${seller.rating.toFixed(1)}★ average rating`,
      backgroundImage: 'https://placehold.co/1920x600/7c3aed/ffffff?text=Best+Sellers',
      gradientFrom: 'from-purple-600/90',
      gradientTo: 'to-pink-600/90',
      ctaText: 'View Best Sellers',
      ctaAction: onBestSellersClick,
      badge: `${seller.stats.totalSales.toLocaleString()} Sales`,
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.backgroundImage}
          alt={currentSlideData.title}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.gradientFrom} ${currentSlideData.gradientTo} transition-all duration-700`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            {currentSlideData.badge && (
              <div className="mb-4 animate-fade-in">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1">
                  {currentSlideData.badge}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-up">
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-white/90 font-medium mb-6 animate-slide-up animation-delay-100">
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed animate-slide-up animation-delay-200">
              {currentSlideData.description}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
              <Button
                size="lg"
                onClick={currentSlideData.ctaAction}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                {currentSlideData.icon}
                <span className="ml-2">{currentSlideData.ctaText}</span>
              </Button>

              {/* Seller Avatar/Logo */}
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {seller.logo ? (
                    <Image
                      src={seller.logo}
                      alt={seller.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {seller.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-sm text-white/70">{seller.stats.responseTime} response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Control */}
      {slides.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <Play className={`w-4 h-4 text-white ${isAutoPlaying ? 'opacity-50' : 'opacity-100'}`} />
        </button>
      )}
    </div>
  );
}