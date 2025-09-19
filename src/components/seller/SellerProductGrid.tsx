'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import type { Product } from '@/types';

interface SellerProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function SellerProductGrid({ products, isLoading }: SellerProductGridProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace('$', '')),
        image: product.imageUrl,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace('$', '')),
        image: product.imageUrl,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or browse different categories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-200"
        >
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={product.dataAiHint}
                />
              </Link>
              
              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistToggle(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart 
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isInWishlist(product.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600 hover:text-red-500'
                  }`} 
                />
              </button>

              {/* Sale Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white font-semibold">
                    Sale
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Product Name */}
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>
              </Link>

              {/* Category */}
              <p className="text-xs text-gray-500 mb-2">{product.category}</p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                  {product.reviewCount && (
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount})
                    </span>
                  )}
                </div>
              )}

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

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={addingToCart === product.id}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:shadow-md"
              >
                {addingToCart === product.id ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}