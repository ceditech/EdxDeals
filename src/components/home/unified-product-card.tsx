'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { ShoppingBag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface UnifiedProductCardProps {
  product: Product;
  badge?: string;
  showRating?: boolean;
  className?: string;
}

export default function UnifiedProductCard({ product, badge, showRating = true, className }: UnifiedProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    // Convert Product type to CartItem format
    const price = typeof product.price === 'string'
      ? parseFloat(product.price.replace('$', ''))
      : product.price;
    
    addItem({
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      price: price,
    });
  };

  // Calculate discount if originalPrice exists
  const originalPrice = product.originalPrice
    ? (typeof product.originalPrice === 'string'
        ? parseFloat(product.originalPrice.replace('$', ''))
        : product.originalPrice)
    : null;
  
  const currentPrice = typeof product.price === 'string'
    ? parseFloat(product.price.replace('$', ''))
    : product.price;

  const discount = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;
  
  const isNew = !('endDate' in product) && Math.random() > 0.8; // Mock "new" status

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      price: currentPrice,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        {/* Custom badge (for flash deals, etc.) */}
        {(badge || isNew) && (
          <Badge
            className={cn(
              "absolute top-2 left-2 z-10",
              isNew ? "bg-blue-500 text-white animate-pulse" : "bg-red-500 hover:bg-red-600"
            )}
          >
            {isNew ? 'NEW' : badge}
          </Badge>
        )}
        
        {/* Wishlist Heart Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className="text-lg">
            {inWishlist ? '💙' : '🤍'}
          </span>
        </Button>
        
        {/* Sale badge */}
        {product.originalPrice && (
          <Badge className="absolute top-12 right-2 z-10 bg-accent text-accent-foreground">
            SALE
          </Badge>
        )}
        
        {/* Discount percentage */}
        {discount > 0 && !product.originalPrice && (
          <Badge className="absolute top-12 right-2 z-10 bg-green-500 hover:bg-green-600">
            -{discount}%
          </Badge>
        )}

        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <div className="w-full h-full bg-muted/30 flex items-center justify-center p-8">
            {product.imageUrl && !product.imageUrl.includes('placehold.co') ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-24 h-24 md:w-32 md:h-32 mb-2 opacity-40" />
                <span className="text-xs text-center opacity-60">Product Image</span>
              </div>
            )}
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.id}`} className="hover:text-primary">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.category && (
          <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
        )}
        
        {showRating && product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full group-hover:bg-primary/90 transition-colors"
          size="lg"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}