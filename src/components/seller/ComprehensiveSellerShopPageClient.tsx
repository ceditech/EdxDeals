'use client';

import { useState, useMemo, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Seller, fetchSellers } from '../../../lib/firebase/sellers';
import { getSellerShopData, getSellerProducts } from '../../lib/seller-mock-data';
import SellerHeroSlider from './SellerHeroSlider';
import SellerProfileSection from './SellerProfileSection';
import SellerNavigationTabs from './SellerNavigationTabs';
import SellerFilterBar from './SellerFilterBar';
import SellerProductGrid from './SellerProductGrid';
import SellerPoliciesAccordion from './SellerPoliciesAccordion';
import DiscountModal from './DiscountModal';
import BestSellersModal from './BestSellersModal';
import RelatedProductsSection from './RelatedProductsSection';
import MoreSellersSection from './MoreSellersSection';
import ThirdPartyAdsSection from './ThirdPartyAdsSection';
import ContactSellerModal from './ContactSellerModal';

interface ComprehensiveSellerShopPageClientProps {
  seller: Seller;
}

export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
}

export default function ComprehensiveSellerShopPageClient({ seller }: ComprehensiveSellerShopPageClientProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBestSellersModalOpen, setIsBestSellersModalOpen] = useState(false);
  const [discountModalData, setDiscountModalData] = useState<{
    isOpen: boolean;
    promotion: any;
  }>({
    isOpen: false,
    promotion: null,
  });
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    sortBy: 'name',
  });
  const [otherSellers, setOtherSellers] = useState<Seller[]>([]);

  // Get extended seller data
  const sellerData = getSellerShopData(seller.id);
  
  // Fetch other sellers for the "More Sellers" section
  useEffect(() => {
    const loadOtherSellers = async () => {
      try {
        const sellers = await fetchSellers({ limit: 12 });
        setOtherSellers(sellers);
      } catch (error) {
        console.error('Failed to load other sellers:', error);
      }
    };
    loadOtherSellers();
  }, []);

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

  // Get all products for related products section
  const allProducts = useMemo(() => {
    return getSellerProducts(seller.id, { limit: 20 });
  }, [seller.id]);

  // Get products with discounts for the discount modal
  const discountedProducts = useMemo(() => {
    return allProducts.filter(product => product.originalPrice);
  }, [allProducts]);

  const handlePromotionClick = (promotionId: string) => {
    const promotion = sellerData.promotions.find(p => p.id === promotionId);
    if (promotion) {
      setDiscountModalData({
        isOpen: true,
        promotion,
      });
    }
  };

  const handleCloseDiscountModal = () => {
    setDiscountModalData({
      isOpen: false,
      promotion: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <SellerHeroSlider
        seller={sellerData}
        onPromotionClick={handlePromotionClick}
        onBestSellersClick={() => setIsBestSellersModalOpen(true)}
      />

      {/* Seller Profile Section */}
      <SellerProfileSection 
        seller={sellerData} 
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* Navigation Tabs */}
      <SellerNavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        categories={sellerData.categories}
        productCounts={{
          all: sellerData.products.length,
          'best-sellers': sellerData.products.filter(p => (p.rating || 0) >= 4.5).length,
          'new-arrivals': 12,
          'flash-deals': sellerData.products.filter(p => p.originalPrice).length,
          clearance: 8,
          ...sellerData.categories.reduce((acc, cat) => {
            acc[cat.toLowerCase()] = sellerData.products.filter(p => p.category === cat).length;
            return acc;
          }, {} as Record<string, number>)
        }}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Products Section */}
          <div className="lg:col-span-3">
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

          {/* Sidebar - Seller Info & Policies */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Seller Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Store Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Products</span>
                  <span className="text-sm font-medium">{sellerData.stats.totalProducts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Sales</span>
                  <span className="text-sm font-medium">{sellerData.stats.totalSales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium">{sellerData.stats.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">{sellerData.stats.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Trust & Verification */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Trust & Safety</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Verified Seller</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Buyer Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping & Policies Section */}
      <SellerPoliciesAccordion seller={sellerData} />

      {/* Related Products & Deals Section */}
      <RelatedProductsSection 
        products={allProducts}
        sellerName={sellerData.name}
      />

      {/* Third Party Ads Section */}
      <ThirdPartyAdsSection />

      {/* More Sellers Section */}
      <MoreSellersSection 
        currentSellerId={seller.id}
        sellers={otherSellers}
      />

      {/* Contact Seller Modal */}
      <ContactSellerModal
        seller={sellerData}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Best Sellers Modal */}
      <BestSellersModal
        isOpen={isBestSellersModalOpen}
        onClose={() => setIsBestSellersModalOpen(false)}
        seller={sellerData}
        products={allProducts}
      />

      {/* Discount Modal */}
      {discountModalData.promotion && (
        <DiscountModal
          isOpen={discountModalData.isOpen}
          onClose={handleCloseDiscountModal}
          seller={sellerData}
          promotion={discountModalData.promotion}
          products={discountedProducts}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Sticky navigation */
        .sticky {
          position: sticky;
          top: 0;
          z-index: 40;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .sticky {
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}