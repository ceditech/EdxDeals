'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Clock, TrendingUp } from 'lucide-react';
import type { Product } from '@/types';

interface RelatedProductsSectionProps {
  products: Product[];
  sellerName: string;
}

export default function RelatedProductsSection({ products, sellerName }: RelatedProductsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const toggleSaveProduct = (productId: string) => {
    const newSaved = new Set(savedProducts);
    if (newSaved.has(productId)) {
      newSaved.delete(productId);
    } else {
      newSaved.add(productId);
    }
    setSavedProducts(newSaved);
  };

  const addToCart = (product: Product) => {
    // This would integrate with cart functionality
    console.log('Add to cart:', product);
  };

  const calculateDiscount = (product: Product) => {
    if (!product.originalPrice) return 0;
    const original = parseFloat(product.originalPrice.replace('$', ''));
    const current = parseFloat(product.price.replace('$', ''));
    return Math.round(((original - current) / original) * 100);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-white" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Related Products & Deals
            </h2>
            <p className="text-gray-600">
              More great products from {sellerName} and similar sellers
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            const discount = calculateDiscount(product);
            const isSaved = savedProducts.has(product.id);

            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 text-white font-bold">
                          -{discount}%
                        </Badge>
                      </div>
                    )}

                    {/* Deal Badge for products with original price */}
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Deal
                        </Badge>
                      </div>
                    )}

                    {/* Save Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveProduct(product.id)}
                      className={`absolute bottom-2 right-2 rounded-full p-2 ${
                        isSaved
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating!)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviewCount})
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <Badge variant="outline" className="text-xs mb-3">
                      {product.category}
                    </Badge>

                    {/* Action Button */}
                    <Link href={`/product/${product.id}`}>
                      <Button
                        variant="outline"
                        className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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

        {/* View More Button */}
        <div className="text-center mt-8">
          <Button
            size="lg"
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:shadow-lg"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View More Deals
          </Button>
        </div>

        {/* Flash Deal Timer (for demo) */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Flash Sale ends in: 2h 34m 12s</span>
          </div>
        </div>
      </div>
    </section>
  );
}