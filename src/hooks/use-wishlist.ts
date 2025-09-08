'use client';

import { useState, useContext, createContext, ReactNode, createElement, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('edxdeals-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setItems([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('edxdeals-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (newItem: WishlistItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        // Item already in wishlist, don't add duplicate
        return currentItems;
      }
      return [...currentItems, newItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const totalItems = items.length;

  const contextValue: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    totalItems,
  };

  return createElement(WishlistContext.Provider, { value: contextValue }, children);
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}