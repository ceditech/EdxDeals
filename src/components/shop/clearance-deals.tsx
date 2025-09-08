'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { ChevronLeft, ChevronRight, Percent, AlertTriangle, Package, Zap } from 'lucide-react';
import { PRODUCT_DATABASE } from '@/lib/product-database';
import type { Product } from '@/types';

// Convert DetailedProduct to Product format with clearance pricing
const convertToClearanceProduct = (detailedProduct: any, discountPercent: number): Product => {
  const originalPrice = detailedProduct.price;
  const clearancePrice = originalPrice * (1 - discountPercent / 100);
  
  return {
    id: detailedProduct.id,
    name: detailedProduct.name,
    imageUrl: detailedProduct.images?.[0] || '/images/placeholder-product.jpg',
    price: `$${clearancePrice.toFixed(2)}`,
    originalPrice: `$${originalPrice.toFixed(2)}`,
    category: detailedProduct.category,
    rating: detailedProduct.rating,
    reviewCount: detailedProduct.reviews,
  };
};

interface ClearanceItem extends Product {
  discountPercent: number;
  stockLeft: number;
  condition: 'new' | 'open-box' | 'refurbished' | 'display-model';
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export default function ClearanceDeals() {
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // Create clearance items with different conditions and discounts
  const allProducts = Object.values(PRODUCT_DATABASE);
  const clearanceItems: ClearanceItem[] = [
    {
      ...convertToClearanceProduct(allProducts[0], 60),
      discountPercent: 60,
      stockLeft: 3,
      condition: 'open-box',
      reason: 'Customer return - unopened',
      urgency: 'high'
    },
    {
      ...convertToClearanceProduct(allProducts[1], 45),
      discountPercent: 45,
      stockLeft: 8,
      condition: 'refurbished',
      reason: 'Factory refurbished',
      urgency: 'medium'
    },
    {
      ...convertToClearanceProduct(allProducts[2], 70),
      discountPercent: 70,
      stockLeft: 2,
      condition: 'display-model',
      reason: 'Store display model',
      urgency: 'high'
    },
    {
      ...convertToClearanceProduct(allProducts[3], 35),
      discountPercent: 35,
      stockLeft: 15,
      condition: 'new',
      reason: 'Overstock clearance',
      urgency: 'low'
    },
    {
      ...convertToClearanceProduct(allProducts[4], 55),
      discountPercent: 55,
      stockLeft: 5,
      condition: 'open-box',
      reason: 'Packaging damaged',
      urgency: 'medium'
    },
    {
      ...convertToClearanceProduct(allProducts[5], 40),
      discountPercent: 40,
      stockLeft: 12,
      condition: 'refurbished',
      reason: 'Certified refurbished',
      urgency: 'low'
    },
    {
      ...convertToClearanceProduct(allProducts[6], 65),
      discountPercent: 65,
      stockLeft: 1,
      condition: 'display-model',
      reason: 'Last display unit',
      urgency: 'high'
    },
    {
      ...convertToClearanceProduct(allProducts[7], 30),
      discountPercent: 30,
      stockLeft: 20,
      condition: 'new',
      reason: 'End of season',
      urgency: 'low'
    }
  ];

  // Filter by condition
  const filteredItems = selectedCondition === 'all' 
    ? clearanceItems 
    : clearanceItems.filter(item => item.condition === selectedCondition);

  const maxIndex = Math.max(0, filteredItems.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleItems = filteredItems.slice(currentIndex, currentIndex + itemsPerPage);

  const conditionFilters = [
    { value: 'all', label: 'All Items', count: clearanceItems.length },
    { value: 'new', label: 'New', count: clearanceItems.filter(i => i.condition === 'new').length },
    { value: 'open-box', label: 'Open Box', count: clearanceItems.filter(i => i.condition === 'open-box').length },
    { value: 'refurbished', label: 'Refurbished', count: clearanceItems.filter(i => i.condition === 'refurbished').length },
    { value: 'display-model', label: 'Display Model', count: clearanceItems.filter(i => i.condition === 'display-model').length }
  ];

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'new': return { color: 'bg-green-500', text: 'NEW' };
      case 'open-box': return { color: 'bg-blue-500', text: 'OPEN BOX' };
      case 'refurbished': return { color: 'bg-orange-500', text: 'REFURBISHED' };
      case 'display-model': return { color: 'bg-purple-500', text: 'DISPLAY' };
      default: return { color: 'bg-gray-500', text: 'CLEARANCE' };
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-red-500 p-2 rounded-full">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Clearance & Closeout Deals
            </h2>
            <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
              FINAL SALE
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Massive savings on open box, refurbished, and clearance items - limited quantities available!
          </p>
        </div>

        {/* Condition Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {conditionFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedCondition === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCondition(filter.value);
                setCurrentIndex(0);
              }}
              className={selectedCondition === filter.value ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Clearance Items Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous clearance items"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next clearance items"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-0 md:px-12">
            {visibleItems.map((item) => {
              const conditionBadge = getConditionBadge(item.condition);
              
              return (
                <div key={item.id} className="relative">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-20">
                    <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold">
                      -{item.discountPercent}%
                    </Badge>
                  </div>

                  {/* Condition Badge */}
                  <div className="absolute top-2 right-2 z-20">
                    <Badge className={`${conditionBadge.color} hover:${conditionBadge.color} text-white text-xs`}>
                      {conditionBadge.text}
                    </Badge>
                  </div>

                  {/* Stock Warning */}
                  {item.stockLeft <= 5 && (
                    <div className="absolute top-12 left-2 z-20">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Only {item.stockLeft} left!
                      </Badge>
                    </div>
                  )}

                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-red-200">
                    <div className="relative aspect-square overflow-hidden">
                      <div className="w-full h-full bg-muted/30 flex items-center justify-center p-8">
                        <Package className="w-24 h-24 md:w-32 md:h-32 text-muted-foreground opacity-40" />
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      {/* Product Name */}
                      <Link href={`/product/${item.id}`} className="hover:text-primary">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Condition & Reason */}
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">Condition:</span> {item.condition.replace('-', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          {item.reason}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-red-500">
                          {item.price}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          {item.originalPrice}
                        </span>
                      </div>

                      {/* Stock & Urgency */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className={`font-medium ${getUrgencyColor(item.urgency)}`}>
                          {item.urgency === 'high' ? 'Act Fast!' : 
                           item.urgency === 'medium' ? 'Limited Time' : 'Good Deal'}
                        </span>
                        <span className="text-muted-foreground">
                          {item.stockLeft} in stock
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <Button 
                        className="w-full bg-red-500 hover:bg-red-600"
                        size="lg"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index 
                    ? 'bg-red-500' 
                    : 'bg-muted'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to clearance page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Clearance Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Clearance Item Information</h3>
            <p className="text-muted-foreground">
              All clearance items come with our standard warranty and return policy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-green-500 mb-2">
                <Badge className="bg-green-500 text-white">NEW</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Brand new, unopened items</div>
            </div>
            <div>
              <div className="text-blue-500 mb-2">
                <Badge className="bg-blue-500 text-white">OPEN BOX</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Returned but unused items</div>
            </div>
            <div>
              <div className="text-orange-500 mb-2">
                <Badge className="bg-orange-500 text-white">REFURBISHED</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Professionally restored items</div>
            </div>
            <div>
              <div className="text-purple-500 mb-2">
                <Badge className="bg-purple-500 text-white">DISPLAY</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Former display models</div>
            </div>
          </div>
        </div>

        {/* View All Clearance Button */}
        <div className="text-center mt-8">
          <Link href="/clearance">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8">
              <Percent className="w-4 h-4 mr-2" />
              View All Clearance Items
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}