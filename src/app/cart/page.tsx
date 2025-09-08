'use client';

import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import UnifiedProductCard from '@/components/home/unified-product-card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      if (window.confirm('Remove this item from your cart?')) {
        removeItem(id);
      }
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm('Remove this item from your cart?')) {
      removeItem(id);
    }
  };

  const handleClearCart = () => {
    if (window.confirm(`Are you sure you want to remove all ${totalItems} items from your cart?`)) {
      clearCart();
    }
  };

  const handleSaveForLater = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      // Add to wishlist
      addToWishlist({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
      });
      
      // Remove from cart
      removeItem(id);
    }
  };

  // Calculate savings (mock data for demonstration)
  const subtotal = totalPrice;
  const savings = items.reduce((sum, item) => {
    // Mock original price calculation for demonstration
    const originalPrice = item.price * 1.2; // Assume 20% discount
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);
  const shipping = 0; // Free shipping
  const estimatedTotal = subtotal;

  // Mock product recommendations
  const recommendedProducts: Product[] = [
    {
      id: 'rec-1',
      name: 'Premium Wireless Earbuds',
      imageUrl: '/images/store/earbuds.jpg',
      price: '$89.99',
      originalPrice: '$119.99',
      category: 'Audio',
      rating: 4.6,
      reviewCount: 234,
    },
    {
      id: 'rec-2',
      name: 'Smart Fitness Tracker',
      imageUrl: '/images/store/fitness-tracker.jpg',
      price: '$149.99',
      category: 'Wearables',
      rating: 4.4,
      reviewCount: 189,
    },
    {
      id: 'rec-3',
      name: 'Portable Power Bank',
      imageUrl: '/images/store/power-bank.jpg',
      price: '$39.99',
      originalPrice: '$59.99',
      category: 'Accessories',
      rating: 4.3,
      reviewCount: 156,
    },
    {
      id: 'rec-4',
      name: 'Bluetooth Speaker Pro',
      imageUrl: '/images/store/speaker-pro.jpg',
      price: '$129.99',
      category: 'Audio',
      rating: 4.7,
      reviewCount: 298,
    },
  ];

  const relatedProducts: Product[] = [
    {
      id: 'rel-1',
      name: 'Smart Watch Band',
      imageUrl: '/images/store/watch-band.jpg',
      price: '$29.99',
      originalPrice: '$39.99',
      category: 'Accessories',
      rating: 4.2,
      reviewCount: 87,
    },
    {
      id: 'rel-2',
      name: 'Wireless Charging Pad',
      imageUrl: '/images/store/charging-pad.jpg',
      price: '$34.99',
      category: 'Accessories',
      rating: 4.5,
      reviewCount: 143,
    },
    {
      id: 'rel-3',
      name: 'Screen Protector Kit',
      imageUrl: '/images/store/screen-protector.jpg',
      price: '$19.99',
      category: 'Accessories',
      rating: 4.1,
      reviewCount: 76,
    },
    {
      id: 'rel-4',
      name: 'Premium Phone Case',
      imageUrl: '/images/store/phone-case.jpg',
      price: '$24.99',
      originalPrice: '$34.99',
      category: 'Accessories',
      rating: 4.4,
      reviewCount: 112,
    },
  ];

  if (items.length === 0) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Link href="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-2 sm:mb-0">Cart ({totalItems} items)</h1>
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <span className="mr-2">🗑️</span>
                Clear Cart
              </Button>
            </div>
            
            {/* Pickup and Delivery Options */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs">🚚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Pickup and delivery options</h3>
                    <p className="text-sm text-blue-700">Free shipping on orders over $35 • Arrives by tomorrow</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => {
                const originalPrice = item.price * 1.2; // Mock original price
                const itemSavings = (originalPrice - item.price) * item.quantity;
                
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-32 h-32 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image && !item.image.includes('/images/store/') ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={128}
                              height={128}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-40" />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">Color: Black • Finish: Matte</p>
                              <Badge variant="secondary" className="mb-3">Sold by EdxDeals</Badge>
                              
                              {/* Price Information */}
                              <div className="space-y-1">
                                <div className="text-2xl font-bold text-green-700">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground line-through">
                                  ${(originalPrice * item.quantity).toFixed(2)}
                                </div>
                                {itemSavings > 0 && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    You save ${itemSavings.toFixed(2)}
                                  </Badge>
                                )}
                              </div>

                              {/* Action Links */}
                              <div className="flex gap-4 mt-4">
                                <button
                                  onClick={() => handleSaveForLater(item.id)}
                                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <span className="text-sm">💙</span>
                                  Save for later
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                                >
                                  <span className="text-sm">🗑️</span>
                                  Remove
                                </button>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex sm:flex-col items-center sm:items-end gap-2">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <span className="text-lg leading-none">−</span>
                                </Button>
                                <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <span className="text-lg leading-none">+</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <Button className="w-full mb-4" size="lg">
                  Continue to checkout
                </Button>
                
                <div className="bg-blue-50 text-blue-800 text-sm rounded-lg p-3 mb-4">
                  Items in your cart have reduced prices! Check out now for extra savings!
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span>Savings</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        -${savings.toFixed(2)}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated total</span>
                    <span className="text-green-700">${estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membership Offer */}
            <Card className="mt-4 bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox id="membership" className="mt-1" />
                  <label htmlFor="membership" className="text-sm text-yellow-800 cursor-pointer">
                    <strong>Become a member</strong> to get free same-day delivery, gas discounts & more!
                    <span className="block text-xs mt-1">30-day free trial, then $12.95/month</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Recommendations Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Products You May Like */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Products You May Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <UnifiedProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Related Products */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((product) => (
                  <UnifiedProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}