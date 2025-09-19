'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Star,
  Heart,
  ShoppingCart,
  Search,
  X,
  TrendingUp,
  CheckCircle,
  Package
} from 'lucide-react';
import type { Product } from '@/types';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface BestSellersModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: SellerShopData;
  products: Product[];
}

interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'rating' | 'price' | 'name' | 'reviews';
}

export default function BestSellersModal({ isOpen, onClose, seller, products }: BestSellersModalProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'rating',
  });
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());

  // Get best sellers (products with rating >= 4.5)
  const bestSellersProducts = useMemo(() => {
    return products.filter(product => (product.rating || 0) >= 4.5);
  }, [products]);

  // Apply filters to best sellers
  const filteredProducts = useMemo(() => {
    let filtered = [...bestSellersProducts];

    // Search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace('$', ''));
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price':
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bestSellersProducts, filters]);

  // Get unique categories from best sellers
  const categories = useMemo(() => {
    const cats = new Set<string>();
    bestSellersProducts.forEach(product => cats.add(product.category));
    return Array.from(cats);
  }, [bestSellersProducts]);

  const toggleSaveProduct = (productId: string) => {
    const newSaved = new Set(savedProducts);
    if (newSaved.has(productId)) {
      newSaved.delete(productId);
    } else {
      newSaved.add(productId);
    }
    setSavedProducts(newSaved);
  };

  const addToCart = (product: Product) => {
    // This would integrate with cart functionality
    console.log('Add to cart:', product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                {seller.logo ? (
                  <Image
                    src={seller.logo}
                    alt={seller.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-white font-bold text-xl">
                    {seller.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Best Sellers
                </DialogTitle>
                <p className="text-gray-600 mt-1">{seller.name} - Top Rated Products</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-purple-500 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {filteredProducts.length} Products
                  </Badge>
                  <Badge variant="outline">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    4.5+ Rating
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search best sellers..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>

            {/* Category */}
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
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

            {/* Price Range */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min $"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                className="w-20"
              />
              <Input
                type="number"
                placeholder="Max $"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-20"
              />
            </div>

            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} best selling products found
            </p>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Average Rating: {seller.rating.toFixed(1)}★</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const isSaved = savedProducts.has(product.id);
              const isTopRated = (product.rating || 0) >= 4.7;

              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Best Seller Rank */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                          <Star className="w-3 h-3 mr-1" />
                          #{index + 1}
                        </Badge>
                      </div>

                      {/* Top Rated Badge */}
                      {isTopRated && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Top Rated
                          </Badge>
                        </div>
                      )}

                      {/* Save Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveProduct(product.id)}
                        className={`absolute bottom-2 right-2 rounded-full p-2 ${
                          isSaved
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
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
                          <span className="text-sm font-semibold text-gray-900">
                            {product.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.reviewCount} reviews)
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

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No best sellers found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>
                  Showing top-rated products with 4.5+ star ratings
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}