'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Star, 
  Package, 
  AlertTriangle, 
  Zap, 
  Clock,
  Heart,
  Search
} from 'lucide-react';

interface ClearanceProduct {
  id: string;
  name: string;
  condition: 'new' | 'open-box' | 'refurbished' | 'display';
  conditionDescription: string;
  originalPrice: number;
  clearancePrice: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  image?: string;
  rating: number;
  reviewCount: number;
  callout?: string;
  isLimitedTime?: boolean;
  isFeatured?: boolean;
}

interface ClearanceCardProps {
  product: ClearanceProduct;
  onAddToCart: (productId: string) => void;
  animationDelay?: number;
}

const getConditionBadge = (condition: string) => {
  switch (condition) {
    case 'new':
      return { label: 'NEW', color: 'bg-green-500 hover:bg-green-600' };
    case 'open-box':
      return { label: 'OPEN BOX', color: 'bg-blue-500 hover:bg-blue-600' };
    case 'refurbished':
      return { label: 'REFURBISHED', color: 'bg-orange-500 hover:bg-orange-600' };
    case 'display':
      return { label: 'DISPLAY', color: 'bg-purple-500 hover:bg-purple-600' };
    default:
      return { label: 'CLEARANCE', color: 'bg-gray-500 hover:bg-gray-600' };
  }
};

const getCalloutIcon = (callout?: string) => {
  switch (callout) {
    case 'Act Fast!':
      return <Zap className="w-3 h-3" />;
    case 'Limited Time':
      return <Clock className="w-3 h-3" />;
    case 'Limited Stock':
      return <AlertTriangle className="w-3 h-3" />;
    default:
      return <Package className="w-3 h-3" />;
  }
};

export default function ClearanceCard({ product, onAddToCart, animationDelay = 0 }: ClearanceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const conditionBadge = getConditionBadge(product.condition);
  const savings = product.originalPrice - product.clearancePrice;
  const isLowStock = product.stock < 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      // Add to cart using the cart hook immediately
      addItem({
        id: product.id,
        name: product.name,
        image: product.image || '/images/products/placeholder.jpg',
        price: product.clearancePrice
      });
      
      console.log('Added to cart:', product.name, product.clearancePrice);
      
      // Simulate API call for visual feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Call the parent callback if provided
      onAddToCart(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: '/images/products/placeholder.jpg', // Default image for clearance items
        price: product.clearancePrice
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border-2 hover:border-red-200 dark:hover:border-red-800 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400 opacity-60" />
          </div>
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white/95 text-black hover:bg-white shadow-lg"
              onClick={() => setShowMoreInfo(!showMoreInfo)}
            >
              <Search className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>

          {/* Discount Badge */}
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 animate-pulse">
            -{product.discountPercentage}%
          </Badge>

          {/* Condition Badge */}
          <Badge className={`absolute top-3 right-3 text-white font-semibold px-3 py-1 ${conditionBadge.color}`}>
            {conditionBadge.label}
          </Badge>

          {/* Stock Badge */}
          {isLowStock && (
            <Badge className="absolute bottom-3 left-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1 animate-bounce">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Only {product.stock} left!
            </Badge>
          )}

          {/* Limited Time Badge */}
          {product.isLimitedTime && (
            <Badge className="absolute bottom-3 right-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1">
              <Clock className="w-3 h-3 mr-1" />
              Limited Time
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>

        {/* Brand */}
        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Condition Description */}
        <div className="mb-3 p-2 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium">Condition: {product.condition.replace('-', ' ')}</p>
          <p className="text-xs text-muted-foreground">{product.conditionDescription}</p>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-red-600">
              ${product.clearancePrice.toFixed(2)}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-green-600 font-semibold">
            You save ${savings.toFixed(2)}
          </p>
        </div>

        {/* Callout */}
        {product.callout && (
          <div className="mb-4">
            <Badge variant="outline" className="text-xs font-semibold">
              {getCalloutIcon(product.callout)}
              <span className="ml-1">{product.callout}</span>
            </Badge>
          </div>
        )}

        {/* Stock Info */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        {/* Expandable More Info */}
        {showMoreInfo && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-in slide-in-from-top-2 duration-300">
            <h4 className="font-semibold text-sm mb-2">Product Details</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Category: {product.category}</li>
              <li>• Condition: {product.conditionDescription}</li>
              <li>• Full warranty included</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 ${
              isAddingToCart ? 'animate-pulse' : 'hover:scale-105'
            }`}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`hover:bg-red-50 dark:hover:bg-red-950/20 ${
              isWishlisted ? 'bg-red-50 dark:bg-red-950/20' : ''
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-4 h-4 ${
              isWishlisted ? 'text-red-500 fill-current' : ''
            }`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}