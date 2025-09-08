'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES, categoryToSlug, getCategoryIcon } from '@/lib/categories';

export default function CategoriesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Categories Button with Gradient Pill */}
      <Button
        ref={buttonRef}
        onClick={toggleMenu}
        className="rounded-full px-6 py-2 h-10 font-bold text-white shadow-lg bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-300 hover:from-blue-600 hover:via-blue-500 hover:to-yellow-400 transition-all duration-200 transform hover:scale-105"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-2">🏷️</span>
        Categories
      </Button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 w-[90vw] max-w-4xl bg-background rounded-2xl shadow-2xl border border-border z-50 p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          role="menu"
          aria-label="Product categories"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Shop by Category</h3>
            <p className="text-sm text-muted-foreground">Discover products in your favorite categories</p>
          </div>

          {/* Desktop: Multi-column layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-x-6 gap-y-2">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/category/${categoryToSlug(category)}`}
                onClick={handleCategoryClick}
                className="flex items-center gap-3 py-3 px-4 hover:bg-muted rounded-lg transition-colors group"
                role="menuitem"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {getCategoryIcon(category)}
                </span>
                <span className="font-medium text-sm group-hover:text-primary transition-colors">
                  {category}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile: Single column scrollable */}
          <div className="md:hidden max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/category/${categoryToSlug(category)}`}
                  onClick={handleCategoryClick}
                  className="flex items-center gap-3 py-4 px-4 hover:bg-muted rounded-lg transition-colors group border-b border-border last:border-0"
                  role="menuitem"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {getCategoryIcon(category)}
                  </span>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Can't find what you're looking for? Try our search or browse all products
            </p>
          </div>
        </div>
      )}
    </div>
  );
}