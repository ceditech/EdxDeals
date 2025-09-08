'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { Star, TrendingUp, ChevronRight } from 'lucide-react';
import { PRODUCT_DATABASE } from '@/lib/product-database';
import type { Product } from '@/types';

// Convert DetailedProduct to Product format for the UnifiedProductCard
const convertToProduct = (detailedProduct: any): Product => ({
  id: detailedProduct.id,
  name: detailedProduct.name,
  imageUrl: detailedProduct.images?.[0] || '/images/placeholder-product.jpg',
  price: `$${detailedProduct.price}`,
  originalPrice: detailedProduct.oldPrice ? `$${detailedProduct.oldPrice}` : undefined,
  category: detailedProduct.category,
  rating: detailedProduct.rating,
  reviewCount: detailedProduct.reviews,
});

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('today');

  // Get products from database and convert them
  const allProducts = Object.values(PRODUCT_DATABASE).map(convertToProduct);
  
  // Mock different time periods with different sorting
  const getProductsForPeriod = (period: string) => {
    let products = [...allProducts];
    
    switch (period) {
      case 'today':
        // Sort by rating and review count for "today's" best sellers
        return products
          .sort((a, b) => (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0))
          .slice(0, 8);
      
      case 'week':
        // Different sorting for weekly best sellers
        return products
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(2, 10);
      
      case 'month':
        // Different sorting for monthly best sellers
        return products
          .sort((a, b) => {
            const aPrice = parseFloat(a.price.replace('$', ''));
            const bPrice = parseFloat(b.price.replace('$', ''));
            return (b.rating || 0) - (a.rating || 0) || bPrice - aPrice;
          })
          .slice(1, 9);
      
      default:
        return products.slice(0, 8);
    }
  };

  const currentProducts = getProductsForPeriod(activeTab);

  const tabData = [
    {
      value: 'today',
      label: 'Today',
      description: 'Top sellers in the last 24 hours',
      icon: <Star className="w-4 h-4" />
    },
    {
      value: 'week',
      label: 'This Week',
      description: 'Most popular products this week',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      value: 'month',
      label: 'This Month',
      description: 'Monthly bestsellers and favorites',
      icon: <Badge className="w-4 h-4" />
    }
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Best Sellers & Trending
            </h2>
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
              HOT
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Discover what everyone is buying - top-rated products loved by our customers
          </p>
        </div>

        {/* Time Period Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
              {tabData.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {/* Tab Description */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground">{tab.description}</p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                  <div key={product.id} className="relative">
                    {/* Ranking Badge */}
                    {index < 3 && (
                      <div className="absolute top-2 left-2 z-20">
                        <Badge
                          className={`
                            ${index === 0 ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                            ${index === 1 ? 'bg-gray-400 hover:bg-gray-500' : ''}
                            ${index === 2 ? 'bg-amber-600 hover:bg-amber-700' : ''}
                            text-white font-bold
                          `}
                        >
                          #{index + 1}
                        </Badge>
                      </div>
                    )}

                    <UnifiedProductCard
                      product={product}
                      showRating={true}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <Link href={`/products/best-sellers?period=${tab.value}`}>
                  <Button variant="outline" size="lg" className="px-8">
                    View All {tab.label} Best Sellers
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Trending Categories */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Trending Categories</h3>
            <p className="text-muted-foreground">
              Categories with the most sales activity
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Electronics & Technology', 'Home & Garden', 'Fashion & Apparel', 'Health & Beauty'].map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+&\s+|\s+/g, '-')}`}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Customer Reviews Highlight */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>Over 50,000+ happy customers have rated these products</span>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}