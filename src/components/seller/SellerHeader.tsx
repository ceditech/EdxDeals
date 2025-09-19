'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  MessageSquare,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  Users,
  Zap,
  Globe
} from 'lucide-react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerHeaderProps {
  seller: SellerShopData;
  onContactClick: () => void;
}

export default function SellerHeader({ seller, onContactClick }: SellerHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${seller.name} - ${seller.specialization}`,
          text: seller.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      {seller.coverImage && (
        <div className="h-48 md:h-64 relative overflow-hidden">
          <Image
            src={seller.coverImage}
            alt={`${seller.name} cover`}
            fill
            className="object-cover"
            data-ai-hint="seller store banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Header Content */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo/Avatar Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center overflow-hidden">
                    {seller.logo ? (
                      <Image
                        src={seller.logo}
                        alt={`${seller.name} logo`}
                        width={128}
                        height={128}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
                        {getInitials(seller.name)}
                      </div>
                    )}
                  </div>
                  {seller.isFeatured && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                        <Zap className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-3">
                    {/* Name and Specialization */}
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {seller.name}
                      </h1>
                      {seller.specialization && (
                        <p className="text-lg text-blue-600 font-medium">
                          {seller.specialization}
                        </p>
                      )}
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-lg">{seller.rating.toFixed(1)}</span>
                        <span className="text-gray-600">
                          ({seller.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{seller.stats.totalSales.toLocaleString()} sales</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Responds in {seller.stats.responseTime}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 max-w-2xl leading-relaxed">
                      {seller.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {seller.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>{seller.stats.totalProducts} products</span>
                      <span>Joined {seller.stats.joinedDate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                    <Button
                      onClick={onContactClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition-all duration-200 hover:shadow-md"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Seller
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`transition-all duration-200 ${
                          isFollowing 
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSaved(!isSaved)}
                        className={`transition-all duration-200 ${
                          isSaved 
                            ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="hover:bg-gray-50 transition-all duration-200"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {Object.keys(seller.socialLinks).length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Connect:</span>
                  <div className="flex gap-3">
                    {seller.socialLinks.website && (
                      <a
                        href={seller.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {seller.socialLinks.facebook && (
                      <a
                        href={seller.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {seller.socialLinks.twitter && (
                      <a
                        href={seller.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {seller.socialLinks.instagram && (
                      <a
                        href={seller.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}