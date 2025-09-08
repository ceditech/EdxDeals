'use client';

import { useState, useContext, createContext, ReactNode, createElement, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('edxdeals-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Initialize with mock data if localStorage fails
        setItems([
          {
            id: '1',
            name: 'Wireless Bluetooth Headphones',
            image: '/images/store/headphones.jpg',
            price: 79.99,
            quantity: 1,
          },
          {
            id: '2',
            name: 'Smart Watch Series 5',
            image: '/images/store/smartwatch.jpg',
            price: 299.99,
            quantity: 2,
          },
          {
            id: '3',
            name: 'USB-C Fast Charging Cable',
            image: '/images/store/cable.jpg',
            price: 19.99,
            quantity: 1,
          },
        ]);
      }
    } else {
      // Initialize with mock data for demonstration
      setItems([
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          image: '/images/store/headphones.jpg',
          price: 79.99,
          quantity: 1,
        },
        {
          id: '2',
          name: 'Smart Watch Series 5',
          image: '/images/store/smartwatch.jpg',
          price: 299.99,
          quantity: 2,
        },
        {
          id: '3',
          name: 'USB-C Fast Charging Cable',
          image: '/images/store/cable.jpg',
          price: 19.99,
          quantity: 1,
        },
      ]);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('edxdeals-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        // Product already exists in cart: increment quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // New product: add as new line item
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return createElement(CartContext.Provider, { value: contextValue }, children);
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}