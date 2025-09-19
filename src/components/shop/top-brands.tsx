'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import PartnerWithUsModal from '@/components/PartnerWithUsModal';
import BrandProductModal from '@/components/brands/BrandProductModal';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  rating: number;
  isVerified: boolean;
  topCategories: string[];
  href: string;
}

const topBrands: Brand[] = [
  {
    id: 'audiotech',
    name: 'AudioTech',
    logo: '/images/brands/audiotech-logo.png',
    description: 'Premium audio equipment and accessories',
    productCount: 156,
    rating: 4.8,
    isVerified: true,
    topCategories: ['Headphones', 'Speakers', 'Audio Accessories'],
    href: '/brands/audiotech'
  },
  {
    id: 'fittech',
    name: 'FitTech',
    logo: '/images/brands/fittech-logo.png',
    description: 'Smart fitness and health monitoring devices',
    productCount: 89,
    rating: 4.6,
    isVerified: true,
    topCategories: ['Smartwatches', 'Fitness Trackers', 'Health Monitors'],
    href: '/brands/fittech'
  },
  {
    id: 'smarthome',
    name: 'SmartHome',
    logo: '/images/brands/smarthome-logo.png',
    description: 'Intelligent home automation solutions',
    productCount: 234,
    rating: 4.7,
    isVerified: true,
    topCategories: ['Smart Lights', 'Security', 'Automation'],
    href: '/brands/smarthome'
  },
  {
    id: 'comfortwear',
    name: 'ComfortWear',
    logo: '/images/brands/comfortwear-logo.png',
    description: 'Premium comfort clothing and apparel',
    productCount: 312,
    rating: 4.5,
    isVerified: true,
    topCategories: ['T-Shirts', 'Casual Wear', 'Loungewear'],
    href: '/brands/comfortwear'
  },
  {
    id: 'gametech',
    name: 'GameTech',
    logo: '/images/brands/gametech-logo.png',
    description: 'Professional gaming peripherals and accessories',
    productCount: 178,
    rating: 4.9,
    isVerified: true,
    topCategories: ['Gaming Mice', 'Keyboards', 'Accessories'],
    href: '/brands/gametech'
  },
  {
    id: 'kitchenpro',
    name: 'KitchenPro',
    logo: '/images/brands/kitchenpro-logo.png',
    description: 'Professional-grade kitchen appliances',
    productCount: 145,
    rating: 4.6,
    isVerified: true,
    topCategories: ['Blenders', 'Appliances', 'Cookware'],
    href: '/brands/kitchenpro'
  }
];

export default function TopBrands() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, topBrands.length - itemsPerPage);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState('');

  const handleShopBrand = (brandId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBrandId(brandId);
    setBrandModalOpen(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleBrands = topBrands.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Top Brands
            </h2>
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
              VERIFIED
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Shop from trusted brands with verified quality and authentic products
          </p>
        </div>

        {/* Brands Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous brands"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next brands"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-0 md:px-12">
            {visibleBrands.map((brand) => (
              <Card key={brand.id} className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 group">
                <CardContent className="p-6">
                  {/* Brand Logo */}
                  <div className="flex items-center justify-center mb-4 h-16">
                    <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center p-4">
                      <div className="text-2xl font-bold text-muted-foreground">
                        {brand.name}
                      </div>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  {brand.isVerified && (
                    <div className="flex justify-center mb-3">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                        ✓ VERIFIED
                      </Badge>
                    </div>
                  )}

                  {/* Brand Name */}
                  <h3 className="font-bold text-xl text-center mb-2 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Rating and Product Count */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{brand.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{brand.productCount} products</span>
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {brand.topCategories.slice(0, 2).map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="text-xs px-2 py-1"
                        >
                          {category}
                        </Badge>
                      ))}
                      {brand.topCategories.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{brand.topCategories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Shop Button */}
                  <Button
                    onClick={(e) => handleShopBrand(brand.id, e)}
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    size="sm"
                  >
                    Shop {brand.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {Array.from({ length: Math.ceil(topBrands.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index 
                    ? 'bg-blue-500' 
                    : 'bg-muted'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to brands page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Brand Logos Strip */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-center text-lg font-semibold mb-6">
            Trusted by millions of customers worldwide
          </h3>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
            {topBrands.slice(0, 6).map((brand) => (
              <div key={brand.id} className="text-lg font-bold text-muted-foreground">
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-8">
          <Link href="/brands">
            <Button variant="outline" size="lg" className="px-8">
              View All Brands
            </Button>
          </Link>
        </div>

        {/* Brand Partnership CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Are you a brand?</h3>
          <p className="text-muted-foreground mb-4">
            Join our marketplace and reach millions of customers
          </p>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => setPartnerOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={partnerOpen}
          >
            Partner with Us
          </Button>
        </div>
      </div>

      <PartnerWithUsModal open={partnerOpen} onOpenChange={setPartnerOpen} />
      <BrandProductModal
        open={brandModalOpen}
        brandId={selectedBrandId}
        onClose={() => setBrandModalOpen(false)}
      />
    </div>
  );
}