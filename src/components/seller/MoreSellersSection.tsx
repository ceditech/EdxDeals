'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Users, ShoppingBag, CheckCircle } from 'lucide-react';
import { handleSellerNavigation } from '@/lib/seller-utils';
import type { Seller } from '../../../lib/firebase/sellers';

interface MoreSellersSectionProps {
  currentSellerId: string;
  sellers: Seller[];
}

export default function MoreSellersSection({ currentSellerId, sellers }: MoreSellersSectionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter out current seller and get similar sellers
  const otherSellers = sellers.filter(seller => seller.id !== currentSellerId);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(otherSellers.length / itemsPerPage);

  const handleVisitShop = async (sellerId: string) => {
    await handleSellerNavigation(sellerId, router);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentSellers = otherSellers.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (otherSellers.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              More Sellers You Might Like
            </h2>
            <p className="text-gray-600">
              Discover other trusted sellers with quality products
            </p>
          </div>
          
          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="rounded-full p-2"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="rounded-full p-2"
                disabled={currentIndex === totalPages - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSellers.map((seller) => (
            <Card
              key={seller.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-2 hover:border-blue-200"
            >
              <CardContent className="p-0">
                {/* Cover/Background */}
                <div className="h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
                  <div className="absolute inset-0 bg-black/10" />
                  {seller.isFeatured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-amber-500 text-white text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Seller Info */}
                <div className="p-4 -mt-8 relative">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center overflow-hidden mx-auto mb-3">
                    {seller.logo ? (
                      <Image
                        src={seller.logo}
                        alt={`${seller.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full p-1"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(seller.name)}
                      </div>
                    )}
                  </div>

                  {/* Name and Specialization */}
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                      {seller.name}
                    </h3>
                    {seller.specialization && (
                      <p className="text-sm text-blue-600 font-medium line-clamp-1">
                        {seller.specialization}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(seller.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {seller.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({seller.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2 leading-relaxed">
                    {seller.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {seller.categories.length}
                      </div>
                      <div className="text-xs text-gray-600">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        4.8★
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {seller.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {seller.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{seller.categories.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleVisitShop(seller.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:shadow-lg group-hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Visit Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/sellers">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              View All Sellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}