'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, TrendingUp, Zap, Gift, ShoppingBag } from 'lucide-react';

interface AdItem {
  id: string;
  type: 'product' | 'service' | 'brand' | 'affiliate';
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  sponsored: boolean;
}

interface ThirdPartyAdsSectionProps {
  className?: string;
}

export default function ThirdPartyAdsSection({ className = '' }: ThirdPartyAdsSectionProps) {
  const [hoveredAd, setHoveredAd] = useState<string | null>(null);

  // Mock ad data - in real implementation, this would come from an ad service
  const ads: AdItem[] = [
    {
      id: 'ad-1',
      type: 'product',
      title: 'Premium Wireless Earbuds',
      description: 'Experience crystal-clear sound with our latest wireless earbuds featuring noise cancellation.',
      imageUrl: 'https://placehold.co/300x200/3b82f6/ffffff?text=Premium+Earbuds',
      ctaText: 'Shop Now',
      ctaLink: 'https://example.com/earbuds',
      badge: 'Best Seller',
      price: '$89.99',
      originalPrice: '$129.99',
      rating: 4.8,
      reviewCount: 2847,
      sponsored: true,
    },
    {
      id: 'ad-2',
      type: 'service',
      title: 'Cloud Storage Solution',
      description: 'Secure your files with 1TB of cloud storage. First month free for new users.',
      imageUrl: 'https://placehold.co/300x200/10b981/ffffff?text=Cloud+Storage',
      ctaText: 'Try Free',
      ctaLink: 'https://example.com/cloud',
      badge: 'Free Trial',
      sponsored: true,
    },
    {
      id: 'ad-3',
      type: 'brand',
      title: 'Fashion Week Collection',
      description: 'Discover the latest trends from top designers. Limited time exclusive offers.',
      imageUrl: 'https://placehold.co/300x200/ec4899/ffffff?text=Fashion+Week',
      ctaText: 'Explore',
      ctaLink: 'https://example.com/fashion',
      badge: 'Limited Edition',
      sponsored: true,
    },
    {
      id: 'ad-4',
      type: 'affiliate',
      title: 'Smart Home Bundle',
      description: 'Transform your home with our complete smart home automation package.',
      imageUrl: 'https://placehold.co/300x200/8b5cf6/ffffff?text=Smart+Home',
      ctaText: 'Learn More',
      ctaLink: 'https://example.com/smarthome',
      badge: 'Save 30%',
      price: '$299.99',
      originalPrice: '$429.99',
      sponsored: true,
    },
  ];

  const getAdIcon = (type: AdItem['type']) => {
    switch (type) {
      case 'product':
        return <Gift className="w-4 h-4" />;
      case 'service':
        return <Zap className="w-4 h-4" />;
      case 'brand':
        return <Star className="w-4 h-4" />;
      case 'affiliate':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (type: AdItem['type']) => {
    switch (type) {
      case 'product':
        return 'bg-blue-500';
      case 'service':
        return 'bg-green-500';
      case 'brand':
        return 'bg-pink-500';
      case 'affiliate':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className={`py-12 bg-gradient-to-br from-gray-100 to-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs text-gray-600">
              Sponsored Content
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recommended for You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover products and services from our trusted partners
          </p>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <Card
              key={ad.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-2 hover:border-blue-200 cursor-pointer"
              onMouseEnter={() => setHoveredAd(ad.id)}
              onMouseLeave={() => setHoveredAd(null)}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Sponsored Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/70 text-white text-xs backdrop-blur-sm">
                      Sponsored
                    </Badge>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getBadgeColor(ad.type)} text-white text-xs`}>
                      {getAdIcon(ad.type)}
                      <span className="ml-1 capitalize">{ad.type}</span>
                    </Badge>
                  </div>

                  {/* Custom Badge */}
                  {ad.badge && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-red-500 text-white text-xs font-bold">
                        {ad.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                    {ad.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {ad.description}
                  </p>

                  {/* Rating */}
                  {ad.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(ad.rating!)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {ad.rating.toFixed(1)}
                      </span>
                      {ad.reviewCount && (
                        <span className="text-xs text-gray-500">
                          ({ad.reviewCount.toLocaleString()})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  {ad.price && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {ad.price}
                      </span>
                      {ad.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {ad.originalPrice}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link href={ad.ctaLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      className={`w-full transition-all duration-200 ${
                        hoveredAd === ad.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg scale-105'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {getAdIcon(ad.type)}
                      <span className="ml-2">{ad.ctaText}</span>
                      <ShoppingBag className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            These are sponsored advertisements from our partners. EdxDeals may receive compensation 
            when you click on or make purchases through these links. This helps support our platform 
            and keep it free for users.
          </p>
        </div>

        {/* Ad Preferences */}
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Ad Preferences
          </Button>
        </div>
      </div>
    </section>
  );
}