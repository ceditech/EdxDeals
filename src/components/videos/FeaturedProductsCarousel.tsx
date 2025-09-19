'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Play } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  videoCount: number;
  category: string;
  isOnSale: boolean;
}

interface FeaturedProductsCarouselProps {
  videoCount: number; // Used to trigger product refresh when new videos are added
}

// Mock data for 20+ products
const mockProducts: Product[] = [
  {
    id: 'elec-001',
    name: 'Wireless Bluetooth Headphones Pro',
    price: '$129.99',
    originalPrice: '$159.99',
    image: '/images/products/headphones-1.jpg',
    rating: 4.8,
    reviews: 2456,
    videoCount: 3,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'elec-002',
    name: 'Smart Fitness Tracker Watch',
    price: '$89.99',
    originalPrice: '$119.99',
    image: '/images/products/smartwatch-1.jpg',
    rating: 4.6,
    reviews: 1823,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'home-001',
    name: 'Smart LED Light Bulbs Set',
    price: '$39.99',
    originalPrice: '$59.99',
    image: '/images/products/led-bulbs-1.jpg',
    rating: 4.4,
    reviews: 1205,
    videoCount: 1,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-003',
    name: 'Wireless Gaming Mouse',
    price: '$59.99',
    image: '/images/products/gaming-mouse-1.jpg',
    rating: 4.7,
    reviews: 892,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: false
  },
  {
    id: 'elec-004',
    name: 'Portable Bluetooth Speaker',
    price: '$89.99',
    originalPrice: '$109.99',
    image: '/images/products/speaker-1.jpg',
    rating: 4.9,
    reviews: 1567,
    videoCount: 1,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'home-002',
    name: 'Laptop Stand Adjustable',
    price: '$39.99',
    image: '/images/products/laptop-stand-1.jpg',
    rating: 4.3,
    reviews: 743,
    videoCount: 1,
    category: 'Home',
    isOnSale: false
  },
  {
    id: 'elec-005',
    name: '4K Webcam with Auto Focus',
    price: '$149.99',
    originalPrice: '$199.99',
    image: '/images/products/webcam-1.jpg',
    rating: 4.5,
    reviews: 1234,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'home-003',
    name: 'Ergonomic Office Chair',
    price: '$299.99',
    originalPrice: '$399.99',
    image: '/images/products/chair-1.jpg',
    rating: 4.6,
    reviews: 987,
    videoCount: 1,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-006',
    name: 'Wireless Charging Pad',
    price: '$29.99',
    image: '/images/products/charger-1.jpg',
    rating: 4.2,
    reviews: 654,
    videoCount: 1,
    category: 'Electronics',
    isOnSale: false
  },
  {
    id: 'elec-007',
    name: 'Smart Home Security Camera',
    price: '$199.99',
    originalPrice: '$249.99',
    image: '/images/products/camera-1.jpg',
    rating: 4.7,
    reviews: 1876,
    videoCount: 3,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'home-004',
    name: 'Air Purifier with HEPA Filter',
    price: '$179.99',
    originalPrice: '$229.99',
    image: '/images/products/purifier-1.jpg',
    rating: 4.5,
    reviews: 1432,
    videoCount: 2,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-008',
    name: 'Mechanical Gaming Keyboard',
    price: '$119.99',
    image: '/images/products/keyboard-1.jpg',
    rating: 4.8,
    reviews: 2134,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: false
  },
  {
    id: 'home-005',
    name: 'Smart Thermostat',
    price: '$249.99',
    originalPrice: '$299.99',
    image: '/images/products/thermostat-1.jpg',
    rating: 4.4,
    reviews: 876,
    videoCount: 1,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-009',
    name: 'Noise Cancelling Earbuds',
    price: '$79.99',
    originalPrice: '$99.99',
    image: '/images/products/earbuds-1.jpg',
    rating: 4.6,
    reviews: 1654,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: true
  },
  {
    id: 'home-006',
    name: 'Robot Vacuum Cleaner',
    price: '$399.99',
    originalPrice: '$499.99',
    image: '/images/products/vacuum-1.jpg',
    rating: 4.7,
    reviews: 2345,
    videoCount: 3,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-010',
    name: 'Tablet with Stylus',
    price: '$329.99',
    image: '/images/products/tablet-1.jpg',
    rating: 4.5,
    reviews: 1987,
    videoCount: 2,
    category: 'Electronics',
    isOnSale: false
  },
  {
    id: 'home-007',
    name: 'Smart Coffee Maker',
    price: '$159.99',
    originalPrice: '$199.99',
    image: '/images/products/coffee-1.jpg',
    rating: 4.3,
    reviews: 1123,
    videoCount: 1,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-011',
    name: 'Portable Power Bank',
    price: '$49.99',
    image: '/images/products/powerbank-1.jpg',
    rating: 4.4,
    reviews: 876,
    videoCount: 1,
    category: 'Electronics',
    isOnSale: false
  },
  {
    id: 'home-008',
    name: 'Smart Door Lock',
    price: '$199.99',
    originalPrice: '$249.99',
    image: '/images/products/lock-1.jpg',
    rating: 4.6,
    reviews: 1456,
    videoCount: 2,
    category: 'Home',
    isOnSale: true
  },
  {
    id: 'elec-012',
    name: 'Wireless Phone Charger Stand',
    price: '$34.99',
    image: '/images/products/charger-stand-1.jpg',
    rating: 4.2,
    reviews: 567,
    videoCount: 1,
    category: 'Electronics',
    isOnSale: false
  }
];

export default function FeaturedProductsCarousel({ videoCount }: FeaturedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const itemsPerPage = 4; // Show 4 products at a time
  const totalProducts = 20; // Display 20 products total

  // Shuffle and select 20 products randomly when videoCount changes
  useEffect(() => {
    const shuffleArray = (array: Product[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledProducts = shuffleArray(mockProducts);
    setDisplayedProducts(shuffledProducts.slice(0, totalProducts));
    setCurrentIndex(0); // Reset to first page when products update
  }, [videoCount, totalProducts]);

  const maxIndex = Math.max(0, displayedProducts.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = displayedProducts.slice(currentIndex, currentIndex + itemsPerPage);

  if (displayedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Loading featured products...</h3>
        <p className="text-muted-foreground">Please wait while we load the latest products</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous products"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next products"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-0 md:px-12">
        {visibleProducts.map((product) => (
          <div key={product.id} className="bg-background rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-indigo-500 opacity-40" />
              </div>
              {product.isOnSale && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  SALE
                </Badge>
              )}
              <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                {product.videoCount} Video{product.videoCount > 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Link href={`/product/${product.id}`} className="flex-1">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Buy Now
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-8 gap-2 md:hidden">
        {Array.from({ length: Math.ceil(displayedProducts.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerPage) === index 
                ? 'bg-indigo-500' 
                : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            aria-label={`Go to products page ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Info */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, displayedProducts.length)} of {displayedProducts.length} featured products
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Products are randomly updated when new videos are added
        </p>
      </div>
    </div>
  );
}