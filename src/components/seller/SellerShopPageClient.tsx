'use client';

import { useState, useMemo } from 'react';
import { Seller } from '../../../lib/firebase/sellers';
import { getSellerShopData, getSellerProducts } from '../../lib/seller-mock-data';
import SellerHeader from './SellerHeader';
import SellerPromotions from './SellerPromotions';
import SellerProductTabs from './SellerProductTabs';
import SellerProductGrid from './SellerProductGrid';
import SellerFilterBar from './SellerFilterBar';
import SellerInfoPanel from './SellerInfoPanel';
import SellerPolicies from './SellerPolicies';
import ContactSellerModal from './ContactSellerModal';

interface SellerShopPageClientProps {
  seller: Seller;
}

export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
}

export default function SellerShopPageClient({ seller }: SellerShopPageClientProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    sortBy: 'name',
  });

  // Get extended seller data
  const sellerData = getSellerShopData(seller.id);
  
  if (!sellerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Seller Not Found</h1>
          <p className="text-gray-600">The seller you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  // Get filtered products based on active tab and filters
  const filteredProducts = useMemo(() => {
    let categoryFilter = filters.category;
    
    // Override category filter based on active tab
    switch (activeTab) {
      case 'all':
        categoryFilter = 'All';
        break;
      case 'best-sellers':
        // For demo, show products with high ratings
        return getSellerProducts(seller.id, {
          ...filters,
          category: 'All',
          minRating: 4.5,
          sortBy: 'rating',
        });
      case 'new-arrivals':
        return getSellerProducts(seller.id, {
          ...filters,
          category: 'All',
          sortBy: 'newest',
          limit: 12,
        });
      case 'flash-deals':
        // For demo, show products with original prices (indicating deals)
        return getSellerProducts(seller.id, {
          ...filters,
          category: 'All',
        }).filter(p => p.originalPrice);
      case 'clearance':
        // For demo, show last few products as clearance
        return getSellerProducts(seller.id, {
          ...filters,
          category: 'All',
        }).slice(-8);
      default:
        if (sellerData.categories.includes(activeTab)) {
          categoryFilter = activeTab;
        }
    }

    return getSellerProducts(seller.id, {
      ...filters,
      category: categoryFilter,
    });
  }, [seller.id, activeTab, filters, sellerData.categories]);

  // Get unique categories from seller's products
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    sellerData.products.forEach(product => {
      categories.add(product.category);
    });
    return Array.from(categories);
  }, [sellerData.products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seller Header */}
      <SellerHeader 
        seller={sellerData} 
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* Promotions Section */}
      {sellerData.promotions.length > 0 && (
        <SellerPromotions promotions={sellerData.promotions} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Product Tabs */}
            <SellerProductTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              categories={sellerData.categories}
              productCounts={{
                all: sellerData.products.length,
                'best-sellers': sellerData.products.filter(p => (p.rating || 0) >= 4.5).length,
                'new-arrivals': 12,
                'flash-deals': sellerData.products.filter(p => p.originalPrice).length,
                clearance: 8,
              }}
            />

            {/* Filter Bar */}
            <SellerFilterBar
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              activeTab={activeTab}
            />

            {/* Product Grid */}
            <SellerProductGrid
              products={filteredProducts}
              isLoading={false}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Info Panel */}
            <SellerInfoPanel seller={sellerData} />

            {/* Policies */}
            <SellerPolicies policies={sellerData.policies} />
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      <ContactSellerModal
        seller={sellerData}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}