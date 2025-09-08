'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export default function CartDropdown() {
  const { items: cartItems, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Show confirmation for removal
      if (window.confirm('Remove this item from your cart?')) {
        removeItem(id);
      }
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Remove this item from your cart?')) {
      removeItem(id);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      setIsOpen(false); // Close dropdown after clearing
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon Button with Badges */}
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9" 
          aria-label="Shopping Cart"
          onClick={toggleDropdown}
        >
          <ShoppingCart className="h-5 w-5" />
          {/* Item Count Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
        
        {/* Total Price Pill Badge */}
        {totalPrice > 0 && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full px-3 py-1 text-xs shadow-lg whitespace-nowrap">
            ${totalPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-8 w-[350px] max-w-[90vw] bg-background rounded-xl shadow-lg border border-border z-50 max-h-[500px] overflow-hidden">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="p-6 text-center">
              <ShoppingBag className="mx-auto text-muted-foreground mb-3" size={48} />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some products to get started!</p>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            // Cart with Items
            <>
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-lg">Shopping Cart ({totalItems} items)</h3>
              </div>
              
              {/* Cart Items - Mobile-First Design */}
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-2 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      {/* Product Image */}
                      <div className="w-12 h-12 relative rounded overflow-hidden bg-muted/30 flex-shrink-0 flex items-center justify-center">
                        {item.image && !item.image.includes('placehold.co') && !item.image.includes('/images/store/') ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-muted-foreground opacity-40" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate mb-1" title={item.name}>
                          {item.name}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <span className="text-lg leading-none">−</span>
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <span className="text-lg leading-none">+</span>
                          </Button>
                        </div>
                      </div>

                      {/* Price and Delete */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="font-bold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                          onClick={() => handleDeleteItem(item.id)}
                          aria-label="Delete item"
                        >
                          <span className="text-sm">🗑️</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Footer */}
              <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/cart" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Checkout
                    </Button>
                  </Link>
                </div>
                
                {/* Clear Cart Button */}
                <Button
                  variant="outline"
                  className="w-full mt-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}