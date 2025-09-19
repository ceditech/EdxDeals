'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShoppingBag,
  Star,
  Sparkles,
  Zap,
  Package,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  description?: string;
}

interface SellerNavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  categories: string[];
  productCounts: {
    all: number;
    'best-sellers': number;
    'new-arrivals': number;
    'flash-deals': number;
    clearance: number;
    [key: string]: number;
  };
  isMobile?: boolean;
}

export default function SellerNavigationTabs({ 
  activeTab, 
  onTabChange, 
  categories, 
  productCounts,
  isMobile = false 
}: SellerNavigationTabsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Main navigation tabs
  const mainTabs: TabData[] = [
    {
      id: 'all',
      label: 'All Products',
      icon: <ShoppingBag className="w-4 h-4" />,
      count: productCounts.all,
      description: 'Browse all available products'
    },
    {
      id: 'best-sellers',
      label: 'Best Sellers',
      icon: <Star className="w-4 h-4" />,
      count: productCounts['best-sellers'],
      description: 'Top-rated and most popular items'
    },
    {
      id: 'new-arrivals',
      label: 'New Arrivals',
      icon: <Sparkles className="w-4 h-4" />,
      count: productCounts['new-arrivals'],
      description: 'Latest products added to store'
    },
    {
      id: 'flash-deals',
      label: 'Flash Deals',
      icon: <Zap className="w-4 h-4" />,
      count: productCounts['flash-deals'],
      description: 'Limited time special offers'
    },
    {
      id: 'clearance',
      label: 'Clearance',
      icon: <Package className="w-4 h-4" />,
      count: productCounts.clearance,
      description: 'Open box and clearance items'
    },
  ];

  // Category tabs
  const categoryTabs: TabData[] = categories.map(category => ({
    id: category.toLowerCase(),
    label: category,
    icon: <Filter className="w-4 h-4" />,
    count: productCounts[category.toLowerCase()] || 0,
    description: `Products in ${category} category`
  }));

  const allTabs = [...mainTabs, ...categoryTabs];
  const visibleTabs = isMobile && !isExpanded ? allTabs.slice(0, 3) : allTabs;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex items-center space-x-1 py-4 overflow-x-auto">
            {allTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
                <Badge 
                  variant={activeTab === tab.id ? "secondary" : "outline"}
                  className={`ml-1 ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="py-4">
            {/* Visible Tabs */}
            <div className="flex items-center space-x-2 mb-3 overflow-x-auto">
              {visibleTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  size="sm"
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                  <Badge 
                    variant="outline"
                    className={`ml-1 text-xs ${
                      activeTab === tab.id 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </Badge>
                </Button>
              ))}
              
              {/* Expand/Collapse Button */}
              {allTabs.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-sm">Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span className="text-sm">More</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Expanded Categories (Mobile) */}
            {isExpanded && categoryTabs.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">
                {categoryTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsExpanded(false);
                    }}
                    size="sm"
                    className={`flex items-center justify-between px-3 py-2 text-sm ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        activeTab === tab.id 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Tab Description */}
        {activeTab && (
          <div className="pb-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                {allTabs.find(tab => tab.id === activeTab)?.description || 
                 `Showing ${allTabs.find(tab => tab.id === activeTab)?.count || 0} products`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}