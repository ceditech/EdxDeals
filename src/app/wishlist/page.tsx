'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    // Add to cart
    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
    });
    
    // Remove from wishlist
    removeFromWishlist(item.id);
  };

  const handleRemoveFromWishlist = (id: string) => {
    if (window.confirm('Remove this item from your wishlist?')) {
      removeFromWishlist(id);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💙</div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">No items saved yet—discover your favorites on our shop!</p>
            <Link href="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <div className="w-full h-full bg-muted/30 flex items-center justify-center p-8">
                  {item.image && !item.image.includes('/images/store/') ? (
                    <Image
                      src={item.image}
                      alt={item.name}
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
              </div>
              
              <CardContent className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <div className="w-full space-y-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    size="lg"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 text-sm"
                    size="sm"
                  >
                    <span className="mr-1">🗑️</span>
                    Remove from Wishlist
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Continue Shopping Section */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Keep Exploring</h3>
            <p className="text-muted-foreground mb-4">
              Discover more amazing products and add them to your wishlist
            </p>
            <Link href="/">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}