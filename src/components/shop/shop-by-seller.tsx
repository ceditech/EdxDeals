'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, MapPin, ShoppingBag, Users } from 'lucide-react';
import { handleSellerNavigation } from '@/lib/seller-utils';

interface Seller {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  followerCount: number;
  isVerified: boolean;
  isPremium: boolean;
  topDeals: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
  }[];
  specialties: string[];
  href: string;
}

const topSellers: Seller[] = [
  {
    id: 'techworld-store',
    name: 'TechWorld Store',
    logo: '/images/sellers/techworld-logo.png',
    description: 'Your one-stop shop for the latest technology and electronics',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 2456,
    productCount: 1234,
    followerCount: 15600,
    isVerified: true,
    isPremium: true,
    topDeals: [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: '$79.99',
        originalPrice: '$99.99',
        image: '/images/products/headphones-1.jpg'
      },
      {
        id: '2',
        name: 'Smart Watch',
        price: '$199.99',
        originalPrice: '$249.99',
        image: '/images/products/smartwatch-1.jpg'
      }
    ],
    specialties: ['Electronics', 'Gadgets', 'Audio'],
    href: '/seller/techworld-store'
  },
  {
    id: 'home-essentials',
    name: 'Home Essentials',
    logo: '/images/sellers/home-essentials-logo.png',
    description: 'Quality home goods and essentials for modern living',
    location: 'Austin, TX',
    rating: 4.6,
    reviewCount: 1823,
    productCount: 856,
    followerCount: 9200,
    isVerified: true,
    isPremium: false,
    topDeals: [
      {
        id: '3',
        name: 'Smart LED Bulbs',
        price: '$39.99',
        originalPrice: '$59.99',
        image: '/images/products/led-bulbs-1.jpg'
      },
      {
        id: '4',
        name: 'Cotton Throw Blanket',
        price: '$79.99',
        image: '/images/products/blanket-1.jpg'
      }
    ],
    specialties: ['Home & Garden', 'Decor', 'Lighting'],
    href: '/seller/home-essentials'
  },
  {
    id: 'fashion-forward',
    name: 'Fashion Forward',
    logo: '/images/sellers/fashion-forward-logo.png',
    description: 'Trendy fashion and accessories for the modern lifestyle',
    location: 'New York, NY',
    rating: 4.7,
    reviewCount: 3102,
    productCount: 2145,
    followerCount: 22400,
    isVerified: true,
    isPremium: true,
    topDeals: [
      {
        id: '5',
        name: 'Premium T-Shirt',
        price: '$24.99',
        originalPrice: '$34.99',
        image: '/images/products/tshirt-1.jpg'
      },
      {
        id: '6',
        name: 'Designer Accessories',
        price: '$49.99',
        image: '/images/products/accessories-1.jpg'
      }
    ],
    specialties: ['Fashion', 'Apparel', 'Accessories'],
    href: '/seller/fashion-forward'
  },
  {
    id: 'fitness-pro',
    name: 'Fitness Pro',
    logo: '/images/sellers/fitness-pro-logo.png',
    description: 'Professional fitness equipment and health monitoring devices',
    location: 'Denver, CO',
    rating: 4.9,
    reviewCount: 1567,
    productCount: 432,
    followerCount: 8900,
    isVerified: true,
    isPremium: false,
    topDeals: [
      {
        id: '7',
        name: 'Fitness Tracker',
        price: '$89.99',
        originalPrice: '$119.99',
        image: '/images/products/fitness-tracker-1.jpg'
      },
      {
        id: '8',
        name: 'Yoga Mat Pro',
        price: '$39.99',
        image: '/images/products/yoga-mat-1.jpg'
      }
    ],
    specialties: ['Fitness', 'Health', 'Sports'],
    href: '/seller/fitness-pro'
  }
];

export default function ShopBySeller() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = Math.max(0, topSellers.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleVisitStore = async (sellerId: string) => {
    await handleSellerNavigation(sellerId, router);
  };

  const visibleSellers = topSellers.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-purple-500 p-2 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Shop by Seller
            </h2>
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
              FEATURED
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Discover amazing products from our top-rated sellers and trusted storefronts
          </p>
        </div>

        {/* Sellers Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous sellers"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next sellers"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Sellers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-0 md:px-12">
            {visibleSellers.map((seller) => (
              <Card key={seller.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                <CardContent className="p-6">
                  {/* Seller Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Seller Logo */}
                    <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-lg font-bold text-muted-foreground">
                        {seller.name.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{seller.name}</h3>
                        {seller.isVerified && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                            ✓
                          </Badge>
                        )}
                        {seller.isPremium && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                            PREMIUM
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {seller.description}
                      </p>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{seller.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{seller.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {seller.reviewCount.toLocaleString()} reviews
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{seller.productCount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">products</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="font-semibold">{(seller.followerCount / 1000).toFixed(1)}K</span>
                      </div>
                      <p className="text-xs text-muted-foreground">followers</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Specializes in:</p>
                    <div className="flex flex-wrap gap-2">
                      {seller.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Top Deals */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-3">Top Deals:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {seller.topDeals.map((deal) => (
                        <div key={deal.id} className="bg-muted/30 rounded-lg p-3">
                          <div className="w-full h-20 bg-muted/50 rounded mb-2 flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground opacity-40" />
                          </div>
                          <h4 className="text-xs font-medium mb-1 line-clamp-1">{deal.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-primary">{deal.price}</span>
                            {deal.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                {deal.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visit Store Button */}
                  <Button
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    onClick={() => handleVisitStore(seller.id)}
                  >
                    Visit {seller.name} Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {Array.from({ length: Math.ceil(topSellers.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index 
                    ? 'bg-purple-500' 
                    : 'bg-muted'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to sellers page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Sellers Button */}
        <div className="text-center mt-8">
          <Link href="/sellers">
            <Button variant="outline" size="lg" className="px-8">
              View All Sellers
            </Button>
          </Link>
        </div>

        {/* Become a Seller CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Start Selling on EdxDeals</h3>
          <p className="text-muted-foreground mb-4">
            Join thousands of successful sellers and grow your business with us
          </p>
          <Button
            className="bg-purple-500 hover:bg-purple-600"
            onClick={() => router.push('/auth/register?type=seller')}
          >
            Become a Seller
          </Button>
        </div>
      </div>
    </div>
  );
}