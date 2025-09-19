'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedSellerShopPageClient from './AdvancedSellerShopPageClient';
import SellerPageSkeleton from './SellerPageSkeleton';
import SellerNotFound from './SellerNotFound';
import { findSellerStore } from '@/lib/seller-utils';
import { type SellerShopData } from '@/lib/seller-mock-data';
import { fetchSellers, type Seller } from '../../../lib/firebase/sellers';

interface DynamicSellerShopPageClientProps {
  slug: string;
}

export default function DynamicSellerShopPageClient({ slug }: DynamicSellerShopPageClientProps) {
  const router = useRouter();
  const [sellerData, setSellerData] = useState<SellerShopData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSellerData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use the centralized seller finder utility
        let seller = findSellerStore(slug);
        
        if (!seller) {
          // If not found in mock data, try to fetch from Firebase and create extended data
          try {
            const sellers = await fetchSellers({ limit: 100 });
            const basicSeller = sellers.find((s: Seller) => s.id === slug);
            
            if (basicSeller) {
              // Convert basic seller to extended seller data
              seller = {
                ...basicSeller,
                coverImage: `https://placehold.co/1200x300/4f46e5/ffffff?text=${encodeURIComponent(basicSeller.name)}`,
                badges: ['Verified Seller', ...(basicSeller.isFeatured ? ['Featured Store'] : [])],
                socialLinks: {},
                policies: {
                  shipping: {
                    methods: [
                      { name: 'Standard Shipping', price: 'Free', estimatedDays: '5-7', description: 'Free standard shipping on orders over $50' },
                      { name: 'Express Shipping', price: '$9.99', estimatedDays: '2-3', description: 'Fast delivery for urgent orders' },
                    ],
                    freeShippingThreshold: '$50',
                    processingTime: '1-2 business days',
                  },
                  returns: {
                    period: '30 days',
                    conditions: ['Item must be unused', 'Original packaging required'],
                    process: 'Contact customer service to initiate return process',
                  },
                  warranty: {
                    period: '1 year',
                    coverage: ['Manufacturing defects', 'Hardware failures'],
                  },
                },
                promotions: [
                  {
                    id: 'welcome-promo',
                    type: 'announcement' as const,
                    title: 'Welcome to Our Store',
                    description: 'Discover amazing products and great deals!',
                    isActive: true,
                  },
                ],
                products: [], // Will be populated with mock products
                stats: {
                  totalProducts: 50,
                  totalSales: Math.floor(Math.random() * 10000) + 1000,
                  responseTime: '< 4 hours',
                  joinedDate: 'January 2023',
                },
              };
            }
          } catch (firebaseError) {
            console.warn('Failed to fetch from Firebase, using mock data only:', firebaseError);
          }
        }

        if (!seller) {
          setError('Store not found');
          return;
        }

        // Simulate loading delay for better UX (remove in production)
        await new Promise(resolve => setTimeout(resolve, 800));

        setSellerData(seller);
      } catch (err) {
        console.error('Error loading seller data:', err);
        setError('Failed to load seller data');
      } finally {
        setIsLoading(false);
      }
    };

    loadSellerData();
  }, [slug]);

  // Show loading skeleton
  if (isLoading) {
    return <SellerPageSkeleton />;
  }

  // Show error state
  if (error || !sellerData) {
    return <SellerNotFound searchedSlug={slug} />;
  }

  // Convert SellerShopData to Seller for the component
  const sellerForComponent: Seller = {
    id: sellerData.id,
    name: sellerData.name,
    logo: sellerData.logo,
    rating: sellerData.rating,
    reviewCount: sellerData.reviewCount,
    description: sellerData.description,
    categories: sellerData.categories,
    href: sellerData.href,
    isFeatured: sellerData.isFeatured,
    specialization: sellerData.specialization,
  };

  return <AdvancedSellerShopPageClient seller={sellerForComponent} />;
}