'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { ChevronLeft, ChevronRight, Star, Zap, Gift, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface SponsoredContent {
  id: string;
  type: 'product' | 'brand' | 'category' | 'deal';
  title: string;
  subtitle?: string;
  description: string;
  sponsor: string;
  sponsorLogo?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  badge?: string;
  products?: Product[];
  isPromoted: boolean;
}

const sponsoredContent: SponsoredContent[] = [
  {
    id: 'sponsor-1',
    type: 'brand',
    title: 'AudioTech Premium Collection',
    subtitle: 'Professional Audio Equipment',
    description: 'Discover our latest lineup of professional-grade headphones and audio accessories, trusted by music professionals worldwide.',
    sponsor: 'AudioTech',
    sponsorLogo: '/images/sponsors/audiotech-logo.png',
    ctaText: 'Shop AudioTech',
    ctaLink: '/brands/audiotech',
    image: '/images/sponsored/audiotech-collection.jpg',
    badge: 'PREMIUM PARTNER',
    isPromoted: true
  },
  {
    id: 'sponsor-2',
    type: 'deal',
    title: 'Smart Home Bundle Deal',
    subtitle: 'Save 40% on Complete Setup',
    description: 'Transform your home with our complete smart home bundle. Includes smart lights, security cameras, and hub - everything you need to get started.',
    sponsor: 'SmartLife',
    ctaText: 'Get Bundle Deal',
    ctaLink: '/deals/smart-home-bundle',
    image: '/images/sponsored/smart-home-bundle.jpg',
    badge: 'LIMITED OFFER',
    products: [
      {
        id: 'bundle-1',
        name: 'Smart Home Starter Kit',
        imageUrl: '/images/products/smart-home-kit.jpg',
        price: '$199.99',
        originalPrice: '$329.99',
        category: 'Smart Home',
        rating: 4.8,
        reviewCount: 156
      }
    ],
    isPromoted: true
  },
  {
    id: 'sponsor-3',
    type: 'category',
    title: 'Fitness & Wellness Month',
    subtitle: 'Get Fit, Stay Healthy',
    description: 'Kickstart your fitness journey with our curated selection of fitness trackers, workout equipment, and wellness products.',
    sponsor: 'FitTech',
    ctaText: 'Shop Fitness',
    ctaLink: '/category/fitness',
    image: '/images/sponsored/fitness-month.jpg',
    badge: 'FEATURED CATEGORY',
    products: [
      {
        id: 'fitness-1',
        name: 'Smart Fitness Tracker',
        imageUrl: '/images/products/fitness-tracker.jpg',
        price: '$89.99',
        originalPrice: '$119.99',
        category: 'Fitness',
        rating: 4.6,
        reviewCount: 234
      },
      {
        id: 'fitness-2',
        name: 'Wireless Earbuds Pro',
        imageUrl: '/images/products/earbuds-pro.jpg',
        price: '$149.99',
        category: 'Audio',
        rating: 4.7,
        reviewCount: 189
      }
    ],
    isPromoted: false
  },
  {
    id: 'sponsor-4',
    type: 'product',
    title: 'New Release: UltraBook Pro',
    subtitle: 'Next-Gen Performance',
    description: 'Experience the future of computing with the new UltraBook Pro. Featuring the latest processor, all-day battery, and stunning display.',
    sponsor: 'TechPro',
    ctaText: 'Pre-Order Now',
    ctaLink: '/product/ultrabook-pro',
    image: '/images/sponsored/ultrabook-pro.jpg',
    badge: 'NEW RELEASE',
    products: [
      {
        id: 'ultrabook-1',
        name: 'UltraBook Pro 15"',
        imageUrl: '/images/products/ultrabook-pro.jpg',
        price: '$1,299.99',
        category: 'Laptops',
        rating: 4.9,
        reviewCount: 45
      }
    ],
    isPromoted: true
  }
];

export default function SponsoredSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filter content by type
  const filteredContent = selectedType === 'all' 
    ? sponsoredContent 
    : sponsoredContent.filter(content => content.type === selectedType);

  const currentContent = filteredContent[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredContent.length) % filteredContent.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredContent.length);
  };

  const contentTypes = [
    { value: 'all', label: 'All Sponsored', count: sponsoredContent.length },
    { value: 'product', label: 'Products', count: sponsoredContent.filter(c => c.type === 'product').length },
    { value: 'brand', label: 'Brands', count: sponsoredContent.filter(c => c.type === 'brand').length },
    { value: 'deal', label: 'Deals', count: sponsoredContent.filter(c => c.type === 'deal').length },
    { value: 'category', label: 'Categories', count: sponsoredContent.filter(c => c.type === 'category').length }
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-orange-500 p-2 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sponsored & Featured
            </h2>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
              SPONSORED
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Discover featured products and exclusive offers from our trusted partners
          </p>
        </div>

        {/* Content Type Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {contentTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedType(type.value);
                setCurrentIndex(0);
              }}
              className={selectedType === type.value ? 'bg-orange-500 hover:bg-orange-600' : ''}
            >
              {type.label} ({type.count})
            </Button>
          ))}
        </div>

        {/* Main Sponsored Content */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToPrevious}
              aria-label="Previous sponsored content"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToNext}
              aria-label="Next sponsored content"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Sponsored Content Card */}
          <div className="px-0 md:px-12">
            <Card className="overflow-hidden border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-8 flex flex-col justify-center">
                    {/* Sponsored Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                        SPONSORED
                      </Badge>
                      {currentContent.badge && (
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          {currentContent.badge}
                        </Badge>
                      )}
                      {currentContent.isPromoted && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Zap className="w-3 h-3 mr-1" />
                          PROMOTED
                        </Badge>
                      )}
                    </div>

                    {/* Sponsor Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">Sponsored by</span>
                      <span className="font-semibold text-orange-600">{currentContent.sponsor}</span>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {currentContent.title}
                    </h3>
                    {currentContent.subtitle && (
                      <h4 className="text-lg text-muted-foreground mb-4">
                        {currentContent.subtitle}
                      </h4>
                    )}

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {currentContent.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex gap-3">
                      <Link href={currentContent.ctaLink}>
                        <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                          {currentContent.ctaText}
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg">
                        Learn More
                      </Button>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative min-h-[300px] lg:min-h-[400px]">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center">
                      <div className="text-center">
                        <ShoppingBag className="w-24 h-24 text-orange-300 mx-auto mb-4" />
                        <p className="text-orange-500 font-medium">{currentContent.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {filteredContent.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-orange-500' 
                    : 'bg-muted hover:bg-orange-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to sponsored content ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Featured Products from Current Sponsor */}
        {currentContent.products && currentContent.products.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-6">
              Featured Products from {currentContent.sponsor}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentContent.products.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 z-20">
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                      SPONSORED
                    </Badge>
                  </div>
                  <UnifiedProductCard 
                    product={product} 
                    showRating={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advertising Disclosure */}
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Advertising Disclosure:</span> This section contains sponsored content from our partners. 
            We may receive compensation when you click on or purchase products from these sponsors. 
            All sponsored content is clearly labeled and does not affect our editorial recommendations.
          </p>
          <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
            <Link href="/advertising-policy" className="hover:text-primary">
              Advertising Policy
            </Link>
            <span>•</span>
            <Link href="/partner-disclosure" className="hover:text-primary">
              Partner Disclosure
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary">
              Report Ad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}