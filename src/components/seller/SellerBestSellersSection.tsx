'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface SellerBestSellersSectionProps {
  sellerId: string;
  products: Product[];
  className?: string;
}

export default function SellerBestSellersSection({ 
  sellerId, 
  products, 
  className = '' 
}: SellerBestSellersSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and sort products to get best sellers (by rating and review count)
  const bestSellers = useMemo(() => {
    return products
      .filter(product => product.rating && product.rating >= 4.3) // High-rated products
      .sort((a, b) => {
        // Sort by rating first, then by review count
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
  }, [products]);

  const totalPages = Math.ceil(bestSellers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = bestSellers.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of section when changing pages
    document.getElementById('best-sellers-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  if (bestSellers.length === 0) {
    return null; // Don't show section if no best sellers
  }

  return (
    <section id="best-sellers-section" className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-gray-600 mt-1">
                Top-rated products from this seller ({bestSellers.length} items)
              </p>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="rounded-full p-2"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="rounded-full p-2"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-2 hover:border-amber-200"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Best Seller Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Best Seller
                    </Badge>
                  </div>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white">
                        Sale
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category */}
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating?.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount?.toLocaleString()})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link href={`/product/${product.id}`}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-200">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;
                
                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 ${
                      isCurrentPage 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                        : 'hover:bg-amber-50'
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}