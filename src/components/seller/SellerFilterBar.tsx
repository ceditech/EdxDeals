'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, X, Star } from 'lucide-react';
import { useState } from 'react';
import type { ProductFilters } from './SellerShopPageClient';

interface SellerFilterBarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  availableCategories: string[];
  activeTab: string;
}

export default function SellerFilterBar({ 
  filters, 
  onFiltersChange, 
  availableCategories,
  activeTab 
}: SellerFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: 'All',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      sortBy: 'name',
    });
  };

  const hasActiveFilters = 
    filters.category !== 'All' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 1000 ||
    filters.minRating > 0 ||
    filters.sortBy !== 'name';

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.minPrice > 0 || filters.maxPrice < 1000) count++;
    if (filters.minRating > 0) count++;
    if (filters.sortBy !== 'name') count++;
    return count;
  };

  // Don't show category filter if we're already in a specific category tab
  const showCategoryFilter = !availableCategories.includes(activeTab) && 
    !['best-sellers', 'new-arrivals', 'flash-deals', 'clearance'].includes(activeTab);

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Content */}
      <Card className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
            {/* Category Filter */}
            {showCategoryFilter && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {availableCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Price Range */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Price Range: ${filters.minPrice} - ${filters.maxPrice}
              </label>
              <div className="px-2">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={handlePriceRangeChange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Min Rating</label>
              <Select
                value={filters.minRating.toString()}
                onValueChange={(value) => handleFilterChange('minRating', parseFloat(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>4+ Stars</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="4.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>4.5+ Stars</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value as ProductFilters['sortBy'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price">Price Low-High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                
                {filters.category !== 'All' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', 'All')}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ${filters.minPrice} - ${filters.maxPrice}
                    <button
                      onClick={() => handlePriceRangeChange([0, 1000])}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {filters.minRating > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {filters.minRating}+ Stars
                    <button
                      onClick={() => handleFilterChange('minRating', 0)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {filters.sortBy !== 'name' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Sort: {filters.sortBy === 'price' ? 'Price' : filters.sortBy === 'rating' ? 'Rating' : 'Newest'}
                    <button
                      onClick={() => handleFilterChange('sortBy', 'name')}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}