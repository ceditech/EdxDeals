'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  MessageSquare,
  Heart,
  ShoppingBag,
  AlertTriangle,
  Users,
  Clock,
  Globe,
  CheckCircle,
  TrendingUp,
  Package
} from 'lucide-react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerProfileSectionProps {
  seller: SellerShopData;
  onContactClick: () => void;
}

export default function SellerProfileSection({ seller, onContactClick }: SellerProfileSectionProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReport = () => {
    // This would open a report modal
    console.log('Report seller');
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section - Avatar and Basic Info */}
          <div className="lg:col-span-3">
            <div className="text-center lg:text-left">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center overflow-hidden">
                  {seller.logo ? (
                    <Image
                      src={seller.logo}
                      alt={`${seller.name} logo`}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full p-3"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl">
                      {getInitials(seller.name)}
                    </div>
                  )}
                </div>
                {seller.isFeatured && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Trust Score */}
              <div className="mb-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {Math.round(seller.rating * 20)}%
                    </div>
                    <div className="text-sm text-gray-600">Trust Score</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(seller.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3 text-center">
                  <CardContent className="p-0">
                    <div className="text-lg font-bold text-blue-600">
                      {seller.stats.totalProducts}
                    </div>
                    <div className="text-xs text-gray-600">Products</div>
                  </CardContent>
                </Card>
                <Card className="p-3 text-center">
                  <CardContent className="p-0">
                    <div className="text-lg font-bold text-green-600">
                      {seller.stats.totalSales.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Sales</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Center Section - Main Info */}
          <div className="lg:col-span-6">
            {/* Name and Specialization */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {seller.name}
              </h1>
              {seller.specialization && (
                <p className="text-xl text-blue-600 font-semibold mb-3">
                  {seller.specialization}
                </p>
              )}
              
              {/* Rating and Reviews */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(seller.rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg">{seller.rating.toFixed(1)}</span>
                  <span className="text-gray-600">
                    ({seller.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Responds in {seller.stats.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Joined {seller.stats.joinedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>{seller.stats.totalProducts} products</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {seller.description}
              </p>
            </div>

            {/* Badges */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Seller Badges</h3>
              <div className="flex flex-wrap gap-2">
                {seller.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-sm px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {Object.keys(seller.socialLinks).length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect With Us</h3>
                <div className="flex gap-3">
                  {seller.socialLinks.website && (
                    <a
                      href={seller.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <Globe className="w-5 h-5 text-gray-600" />
                    </a>
                  )}
                  {seller.socialLinks.facebook && (
                    <a
                      href={seller.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                    >
                      <Globe className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                  {seller.socialLinks.twitter && (
                    <a
                      href={seller.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors duration-200"
                    >
                      <Globe className="w-5 h-5 text-sky-600" />
                    </a>
                  )}
                  {seller.socialLinks.instagram && (
                    <a
                      href={seller.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors duration-200"
                    >
                      <Globe className="w-5 h-5 text-pink-600" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Actions and Additional Info */}
          <div className="lg:col-span-3">
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={onContactClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 hover:shadow-lg"
                size="lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Seller
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`transition-all duration-200 ${
                    isFollowing 
                      ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="sr-only">{isFollowing ? 'Following' : 'Follow'}</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`transition-all duration-200 ${
                    isSaved 
                      ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span className="sr-only">Save</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={handleReport}
                className="w-full text-gray-500 hover:text-red-600 hover:bg-red-50"
                size="sm"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Seller
              </Button>
            </div>

            {/* Performance Metrics */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium">{seller.stats.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium">{seller.policies.shipping.processingTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Returns</span>
                    <span className="text-sm font-medium">{seller.policies.returns.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}