'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { ChevronLeft, ChevronRight, Sparkles, Bot, Heart, Clock, ShoppingBag } from 'lucide-react';
import { PRODUCT_DATABASE } from '@/lib/product-database';
import type { Product } from '@/types';

// Convert DetailedProduct to Product format
const convertToProduct = (detailedProduct: any): Product => ({
  id: detailedProduct.id,
  name: detailedProduct.name,
  imageUrl: detailedProduct.images?.[0] || '/images/placeholder-product.jpg',
  price: `$${detailedProduct.price}`,
  originalPrice: detailedProduct.oldPrice ? `$${detailedProduct.oldPrice}` : undefined,
  category: detailedProduct.category,
  rating: detailedProduct.rating,
  reviewCount: detailedProduct.reviews,
});

interface RecommendationSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  products: Product[];
  reasoning: string;
}

export default function PersonalizedRecommendations() {
  // Use a stable initial value to avoid SSR/client divergence
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Set time after mount, then update every minute
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get all products and convert them
  const allProducts = Object.values(PRODUCT_DATABASE).map(convertToProduct);

  // Derive time-of-day deterministically on first paint (SSR/client match)
  const timeOfDay = currentTime ? currentTime.getHours() : 12;

  // Mock user data for personalization
  const mockUserData = {
    name: 'Cedric',
    recentlyViewed: ['elec-001', '2', 'home-001'],
    purchaseHistory: ['1', '3'],
    wishlist: ['fp1', 'fd2'],
    browsingCategories: ['Electronics & Technology', 'Home & Garden'],
    timeOfDay,
    location: 'Chicago, IL'
  };

  // Generate personalized recommendation sections
  const recommendationSections: RecommendationSection[] = [
    {
      id: 'for-you',
      title: `Welcome back, ${mockUserData.name}!`,
      subtitle: 'Picked just for you based on your activity',
      icon: <Sparkles className="w-6 h-6" />,
      badge: 'AI POWERED',
      products: allProducts
        .filter(p => mockUserData.browsingCategories.includes(p.category))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6),
      reasoning: 'Based on your browsing history in Electronics & Home categories'
    },
    {
      id: 'similar-to-viewed',
      title: 'More Like What You Viewed',
      subtitle: 'Similar products to your recent browsing',
      icon: <Bot className="w-6 h-6" />,
      badge: 'SMART MATCH',
      products: allProducts
        .filter(p => p.category === 'Electronics & Technology')
        .slice(1, 7),
      reasoning: 'Similar to Wireless Headphones and Smart Watch you recently viewed'
    },
    {
      id: 'wishlist-inspired',
      title: 'Inspired by Your Wishlist',
      subtitle: 'Products that complement your saved items',
      icon: <Heart className="w-6 h-6" />,
      badge: 'WISHLIST',
      products: allProducts
        .filter(p => p.category === 'Electronics & Technology' || p.category === 'Home & Garden')
        .slice(2, 8),
      reasoning: 'Complements Premium Laptop Pro X and Action Camera in your wishlist'
    },
    {
      id: 'time-based',
      title: mockUserData.timeOfDay < 12 
        ? 'Good Morning Deals' 
        : mockUserData.timeOfDay < 18 
        ? 'Afternoon Picks' 
        : 'Evening Essentials',
      subtitle: `Perfect for ${mockUserData.timeOfDay < 12 ? 'starting your day' : mockUserData.timeOfDay < 18 ? 'your afternoon' : 'winding down'}`,
      icon: <Clock className="w-6 h-6" />,
      badge: 'TIME-BASED',
      products: mockUserData.timeOfDay < 12
        ? allProducts.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('fitness')).slice(0, 6)
        : mockUserData.timeOfDay < 18
        ? allProducts.filter(p => p.category === 'Electronics & Technology').slice(0, 6)
        : allProducts.filter(p => p.name.toLowerCase().includes('light') || p.name.toLowerCase().includes('comfort')).slice(0, 6),
      reasoning: `Curated for ${mockUserData.timeOfDay < 12 ? 'morning' : mockUserData.timeOfDay < 18 ? 'afternoon' : 'evening'} activities`
    },
    {
      id: 'trending-for-you',
      title: 'Trending in Your Area',
      subtitle: `Popular products in ${mockUserData.location}`,
      icon: <ShoppingBag className="w-6 h-6" />,
      badge: 'LOCAL TRENDS',
      products: allProducts
        .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        .slice(0, 6),
      reasoning: `Based on popular purchases in ${mockUserData.location}`
    }
  ];

  const currentSection = recommendationSections[activeSection];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-2 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Personalized for You
            </h2>
            <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
              AI CURATED
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Discover products tailored to your preferences, browsing history, and lifestyle
          </p>
        </div>

        {/* Recommendation Section Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {recommendationSections.map((section, index) => (
            <Button
              key={section.id}
              variant={activeSection === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-2 ${
                activeSection === index 
                  ? 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600' 
                  : ''
              }`}
            >
              {section.icon}
              <span className="hidden sm:inline">{section.title.split(' ').slice(0, 2).join(' ')}</span>
              <span className="sm:hidden">{section.title.split(' ')[0]}</span>
            </Button>
          ))}
        </div>

        {/* Current Section Content */}
        <div className="mb-8">
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-2 rounded-full">
                {currentSection.icon}
              </div>
              <h3 className="text-2xl font-bold">{currentSection.title}</h3>
              <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                {currentSection.badge}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{currentSection.subtitle}</p>
            <p className="text-sm text-muted-foreground italic">
              {currentSection.reasoning}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {currentSection.products.map((product, index) => (
              <div key={product.id} className="relative">
                {/* AI Recommendation Badge */}
                <div className="absolute top-2 left-2 z-20">
                  <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Pick
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

        {/* AI Insights Panel */}
        <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 rounded-lg">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bot className="w-6 h-6 text-pink-500" />
              <h3 className="text-lg font-semibold">AI Personalization Insights</h3>
            </div>
            <p className="text-muted-foreground">
              How we personalize your shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {mockUserData.recentlyViewed.length}
              </div>
              <div className="text-sm text-muted-foreground">Recently Viewed</div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {mockUserData.browsingCategories.length}
              </div>
              <div className="text-sm text-muted-foreground">Favorite Categories</div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {mockUserData.wishlist.length}
              </div>
              <div className="text-sm text-muted-foreground">Wishlist Items</div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-pink-500 mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* Privacy & Control */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <span>🔒 Your data is secure and private</span>
            <span>•</span>
            <Link href="/privacy" className="hover:text-primary">
              Privacy Settings
            </Link>
            <span>•</span>
            <Link href="/recommendations/settings" className="hover:text-primary">
              Customize Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}