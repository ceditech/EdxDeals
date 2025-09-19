'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, Star, Sparkles, Zap, Percent } from 'lucide-react';

interface SellerProductTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  categories: string[];
  productCounts: {
    all: number;
    'best-sellers': number;
    'new-arrivals': number;
    'flash-deals': number;
    clearance: number;
  };
}

export default function SellerProductTabs({ 
  activeTab, 
  onTabChange, 
  categories, 
  productCounts 
}: SellerProductTabsProps) {
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'all':
        return <Package className="w-4 h-4" />;
      case 'best-sellers':
        return <Star className="w-4 h-4" />;
      case 'new-arrivals':
        return <Sparkles className="w-4 h-4" />;
      case 'flash-deals':
        return <Zap className="w-4 h-4" />;
      case 'clearance':
        return <Percent className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'all':
        return 'All Products';
      case 'best-sellers':
        return 'Best Sellers';
      case 'new-arrivals':
        return 'New Arrivals';
      case 'flash-deals':
        return 'Flash Deals';
      case 'clearance':
        return 'Clearance';
      default:
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  const getTabCount = (tab: string): number => {
    if (tab in productCounts) {
      return productCounts[tab as keyof typeof productCounts];
    }
    return 0;
  };

  const mainTabs = ['all', 'best-sellers', 'new-arrivals', 'flash-deals', 'clearance'];

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex h-auto p-1 bg-gray-100 rounded-lg min-w-full">
            {/* Main Tabs */}
            {mainTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-white/50 whitespace-nowrap"
              >
                {getTabIcon(tab)}
                <span>{getTabLabel(tab)}</span>
                <Badge 
                  variant="secondary" 
                  className={`ml-1 text-xs ${
                    activeTab === tab 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {getTabCount(tab)}
                </Badge>
              </TabsTrigger>
            ))}

            {/* Category Tabs */}
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-white/50 whitespace-nowrap"
              >
                <Package className="w-4 h-4" />
                <span>{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Tab Description */}
      <div className="mt-4 text-sm text-gray-600">
        {activeTab === 'all' && (
          <p>Browse all products from this seller</p>
        )}
        {activeTab === 'best-sellers' && (
          <p>Top-rated products with 4.5+ stars</p>
        )}
        {activeTab === 'new-arrivals' && (
          <p>Latest products added to the store</p>
        )}
        {activeTab === 'flash-deals' && (
          <p>Limited-time offers with special discounts</p>
        )}
        {activeTab === 'clearance' && (
          <p>Final sale items at reduced prices</p>
        )}
        {categories.includes(activeTab) && (
          <p>Products in the {activeTab} category</p>
        )}
      </div>
    </div>
  );
}