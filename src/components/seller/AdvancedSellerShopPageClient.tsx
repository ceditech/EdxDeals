'use client';

import { useState, useMemo } from 'react';
import { Seller, fetchSellers } from '../../../lib/firebase/sellers';
import { getSellerShopData, getSellerProducts } from '@/lib/seller-mock-data';
import SellerHeroSlider from './SellerHeroSlider';
import SellerProfileSection from './SellerProfileSection';
import SellerFeaturedProductsSection from './SellerFeaturedProductsSection';
import DiscountModal from './DiscountModal';
import RelatedProductsSection from './RelatedProductsSection';
import MoreSellersSection from './MoreSellersSection';
import ThirdPartyAdsSection from './ThirdPartyAdsSection';
import ContactSellerModal from './ContactSellerModal';
import { useEffect } from 'react';

interface AdvancedSellerShopPageClientProps {
  seller: Seller;
}

export default function AdvancedSellerShopPageClient({ seller }: AdvancedSellerShopPageClientProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [discountModalData, setDiscountModalData] = useState<{
    isOpen: boolean;
    promotion: any;
  }>({
    isOpen: false,
    promotion: null,
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

  const handleBestSellersClick = () => {
    // Scroll to the related products section which contains best sellers
    document.getElementById('related-products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <SellerHeroSlider
        seller={sellerData}
        onPromotionClick={handlePromotionClick}
        onBestSellersClick={handleBestSellersClick}
      />

      {/* Seller Profile Section */}
      <SellerProfileSection 
        seller={sellerData} 
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* Featured Products Section */}
      <SellerFeaturedProductsSection
        products={allProducts}
        sellerName={sellerData.name}
      />

      {/* Related Products & Deals Section */}
      <div id="related-products-section">
        <RelatedProductsSection
          products={allProducts}
          sellerName={sellerData.name}
        />
      </div>

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
      `}</style>
    </div>
  );
}