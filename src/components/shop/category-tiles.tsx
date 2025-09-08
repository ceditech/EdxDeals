'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CATEGORIES, getCategoryIcon, categoryToSlug } from '@/lib/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface CategoryTile {
  id: string;
  name: string;
  icon: string;
  href: string;
  productCount?: number;
}

export default function CategoryTiles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Convert categories to tiles with deterministic mock product counts
  const categoryTiles: CategoryTile[] = CATEGORIES.map((category, index) => {
    // Use deterministic values based on category name to avoid hydration mismatch
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const productCount = ((hash * 37) % 450) + 50; // Deterministic count between 50-500
    
    return {
      id: categoryToSlug(category),
      name: category,
      icon: getCategoryIcon(category),
      href: `/category/${categoryToSlug(category)}`,
      productCount
    };
  });

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Discover products in your favorite categories
            </p>
          </div>
          
          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories Grid/Scroll Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryTiles.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex-shrink-0 w-48 md:w-auto group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    {/* Category Icon */}
                    <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    {/* Product Count */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.productCount}+ products
                    </p>
                    
                    {/* Shop Button */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="flex justify-center mt-4 gap-2 md:hidden">
            <div className={`w-2 h-2 rounded-full transition-colors ${canScrollLeft ? 'bg-muted-foreground' : 'bg-muted'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${canScrollRight ? 'bg-muted-foreground' : 'bg-muted'}`} />
          </div>
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-8">
          <Link href="/categories">
            <Button variant="outline" size="lg" className="px-8">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}