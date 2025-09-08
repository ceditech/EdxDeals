'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import UnifiedProductCard from '@/components/home/unified-product-card';
import FilterBar, { type FilterState } from '@/components/category/filter-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES, getCategoryIcon } from '@/lib/categories';
import { slugToCategory, generateMockProductsForCategory } from '@/lib/category-products';
import type { Product } from '@/types';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  
  // Convert slug back to category name using our mapping function
  const categoryName = categorySlug ? slugToCategory(categorySlug) : '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilteringLoading, setIsFilteringLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sortBy: 'popular',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  });

  // Load products for category with loading state
  useEffect(() => {
    if (categoryName) {
      setIsLoading(true);
      // Simulate API call delay for realistic loading experience
      setTimeout(() => {
        const mockProducts = generateMockProductsForCategory(categoryName);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setIsLoading(false);
      }, 800);
    }
  }, [categoryName]);

  // Apply filters with loading state
  useEffect(() => {
    if (products.length === 0) return;
    
    setIsFilteringLoading(true);
    
    // Debounce filtering for better performance
    const timeoutId = setTimeout(() => {
      let filtered = [...products];

      // Search filter
      if (filters.search) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Price range filter
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace('$', ''));
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });

      // Rating filter
      if (filters.rating > 0) {
        filtered = filtered.filter(product =>
          product.rating && product.rating >= filters.rating
        );
      }

      // Sort products
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
          break;
        case 'price-high':
          filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          // Keep original order for newest
          break;
        default: // popular
          filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      }

      setFilteredProducts(filtered);
      setIsFilteringLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [products, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-muted rounded-lg aspect-square mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-6 bg-muted rounded w-1/3"></div>
      </div>
    </div>
  );

  const otherCategories = CATEGORIES.filter(cat => cat !== categoryName);
  const recommendedProducts = generateMockProductsForCategory('Recommended').slice(0, 4);

  if (!categoryName || !CATEGORIES.includes(categoryName)) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center px-4 py-8 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
            <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Back to Home</Button>
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
          {/* Sidebar */}
          <aside className="lg:w-80 w-full space-y-6">
            {/* Other Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>📂</span>
                  Other Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {otherCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        {getCategoryIcon(category)}
                      </span>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Promotional Ad Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-yellow-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">Special Offers</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Get up to 50% off on selected items in {categoryName}
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 hover:from-blue-600 hover:to-yellow-500">
                  View Deals
                </Button>
              </CardContent>
            </Card>

            {/* Brand Spotlight */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>⭐</span>
                  Featured Brands
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {['Brand A', 'Brand B', 'Brand C'].map((brand) => (
                    <div key={brand} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{brand[0]}</span>
                      </div>
                      <span className="text-sm font-medium">{brand}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{getCategoryIcon(categoryName)}</span>
                <h1 className="text-3xl font-bold">{categoryName}</h1>
              </div>
              <p className="text-muted-foreground">
                Discover amazing products in {categoryName}
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar onFilterChange={handleFilterChange} totalProducts={filteredProducts.length} />

            {/* Products Grid */}
            <div className="mt-8">
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : isFilteringLoading ? (
                // Filtering loading overlay
                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-50">
                    {filteredProducts.map((product) => (
                      <UnifiedProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 bg-background rounded-lg px-6 py-3 shadow-lg">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium">Filtering products...</span>
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <UnifiedProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={() => setFilters({
                    search: '',
                    sortBy: 'popular',
                    priceRange: [0, 1000],
                    rating: 0,
                    inStock: false,
                  })}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* You May Also Like Section */}
            {!isLoading && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
                    <UnifiedProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}