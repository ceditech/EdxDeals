'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  TrendingUp,
  Sparkles,
  Package
} from 'lucide-react';
import type { Product } from '@/types';

interface SellerFeaturedProductsSectionProps {
  products: Product[];
  sellerName: string;
}

interface ProductFilters {
  category: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
  viewMode: 'grid' | 'list';
}

export default function SellerFeaturedProductsSection({
  products,
  sellerName
}: SellerFeaturedProductsSectionProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'All',
    priceRange: [0, 500],
    sortBy: 'newest',
    viewMode: 'grid',
  });
  
  // Use actual cart and wishlist hooks
  const { addItem: addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => cats.add(product.category));
    return Array.from(cats);
  }, [products]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace('$', ''));
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        case 'price-high':
          const priceA2 = parseFloat(a.price.replace('$', ''));
          const priceB2 = parseFloat(b.price.replace('$', ''));
          return priceB2 - priceA2;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          // For demo purposes, reverse the array to simulate newest first
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  const toggleSaveProduct = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      console.log('Removed from wishlist:', product.name);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.imageUrl,
        price: parseFloat(product.price.replace('$', '')),
      });
      console.log('Added to wishlist:', product.name);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      price: parseFloat(product.price.replace('$', '')),
    });
    console.log('Added to cart:', product.name);
  };

  const calculateDiscount = (product: Product) => {
    if (!product.originalPrice) return 0;
    const original = parseFloat(product.originalPrice.replace('$', ''));
    const current = parseFloat(product.price.replace('$', ''));
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-12 bg-white" id="featured-products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Featured Products
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Shop {sellerName} Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products with advanced filtering options
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filter Products</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">View</label>
              <div className="flex gap-2">
                <Button
                  variant={filters.viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                  className="flex-1"
                >
                  Grid
                </Button>
                <Button
                  variant={filters.viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
                  className="flex-1"
                >
                  List
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({
                category: 'All',
                priceRange: [0, 500],
                sortBy: 'newest',
                viewMode: 'grid',
              })}
              className="text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={
            filters.viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => {
              const discount = calculateDiscount(product);
              const isSaved = isInWishlist(product.id);

              if (filters.viewMode === 'list') {
                return (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-4 items-center">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {discount > 0 && (
                            <div className="absolute top-1 left-1">
                              <Badge className="bg-red-500 text-white text-xs font-bold">
                                -{discount}%
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(product.rating!)
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                ({product.reviewCount})
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-gray-900">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Category */}
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSaveProduct(product);
                            }}
                            className={`rounded-full p-2 w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                              isSaved
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-all duration-200"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              // Grid view
              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white font-bold">
                            -{discount}%
                          </Badge>
                        </div>
                      )}

                      {/* Featured Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>

                      {/* Save Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveProduct(product)}
                        className={`absolute bottom-2 right-2 rounded-full p-2 ${
                          isSaved
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating!)
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            ({product.reviewCount})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <Badge variant="outline" className="text-xs mb-3">
                        {product.category}
                      </Badge>

                      {/* Action Button */}
                      <Link href={`/product/${product.id}`}>
                        <Button
                          variant="outline"
                          className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more products.</p>
            <Button
              onClick={() => setFilters({
                category: 'All',
                priceRange: [0, 500],
                sortBy: 'newest',
                viewMode: 'grid',
              })}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:shadow-lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}