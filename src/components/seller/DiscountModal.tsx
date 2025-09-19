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
  Filter,
  Search,
  X,
  Percent,
  Clock,
  CheckCircle,
  Package
} from 'lucide-react';
import type { Product } from '@/types';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: SellerShopData;
  promotion: SellerShopData['promotions'][0];
  products: Product[];
}

interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price' | 'rating' | 'discount';
}

export default function DiscountModal({ isOpen, onClose, seller, promotion, products }: DiscountModalProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'discount',
  });
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());

  // Get discounted products (products with originalPrice)
  const discountedProducts = useMemo(() => {
    return products.filter(product => product.originalPrice);
  }, [products]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...discountedProducts];

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
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'discount':
          const discountA = a.originalPrice ? 
            ((parseFloat(a.originalPrice.replace('$', '')) - parseFloat(a.price.replace('$', ''))) / parseFloat(a.originalPrice.replace('$', ''))) * 100 : 0;
          const discountB = b.originalPrice ? 
            ((parseFloat(b.originalPrice.replace('$', '')) - parseFloat(b.price.replace('$', ''))) / parseFloat(b.originalPrice.replace('$', ''))) * 100 : 0;
          return discountB - discountA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [discountedProducts, filters]);

  // Get unique categories from discounted products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    discountedProducts.forEach(product => cats.add(product.category));
    return Array.from(cats);
  }, [discountedProducts]);

  const calculateDiscount = (product: Product) => {
    if (!product.originalPrice) return 0;
    const original = parseFloat(product.originalPrice.replace('$', ''));
    const current = parseFloat(product.price.replace('$', ''));
    return Math.round(((original - current) / original) * 100);
  };

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
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
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
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {promotion.title}
                </DialogTitle>
                <p className="text-gray-600 mt-1">{seller.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  {promotion.discount && (
                    <Badge className="bg-red-500 text-white">
                      <Percent className="w-3 h-3 mr-1" />
                      {promotion.discount} OFF
                    </Badge>
                  )}
                  {promotion.validUntil && (
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Limited Time
                    </Badge>
                  )}
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
                placeholder="Search products..."
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
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </p>
            {promotion.code && (
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                <span className="text-sm font-medium">Code:</span>
                <code className="font-mono font-bold text-blue-600">{promotion.code}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(promotion.code!)}
                >
                  Copy
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const discount = calculateDiscount(product);
              const isSaved = savedProducts.has(product.id);

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
                      {discount > 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white font-bold">
                            -{discount}%
                          </Badge>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveProduct(product.id)}
                        className={`absolute top-2 right-2 rounded-full p-2 ${
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

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {promotion.validUntil && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Offer expires: {promotion.validUntil.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Apply Discount
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}