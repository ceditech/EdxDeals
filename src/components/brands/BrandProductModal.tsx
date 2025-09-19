'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingBag, X, ChevronLeft, ChevronRight, TrendingUp, Zap, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { getBrandProducts, getBrandHotSales, getBrandBestSellers, getBrandFlashDeals, type BrandFlashItem } from '@/lib/brands';
import type { Product } from '@/types';

interface BrandProductModalProps {
  open: boolean;
  brandId: string;
  onClose: () => void;
}

type TabType = 'hot-sales' | 'best-sellers' | 'flash-deals' | 'all-products';

export default function BrandProductModal({ open, brandId, onClose }: BrandProductModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('hot-sales');
  const [currentPage, setCurrentPage] = useState(1);
  const { addItem } = useCart();
  const itemsPerPage = 8;

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Reset tab and page when modal opens
  useEffect(() => {
    if (open) {
      setActiveTab('hot-sales');
      setCurrentPage(1);
    }
  }, [open]);

  // Get brand data
  const brandData = useMemo(() => {
    const brandNames: Record<string, { name: string; description: string; logo?: string }> = {
      'audiotech': { 
        name: 'AudioTech', 
        description: 'Premium audio equipment and accessories',
        logo: '/images/brands/audiotech-logo.png'
      },
      'fittech': { 
        name: 'FitTech', 
        description: 'Smart fitness and health monitoring devices',
        logo: '/images/brands/fittech-logo.png'
      },
      'smarthome': { 
        name: 'SmartHome', 
        description: 'Intelligent home automation solutions',
        logo: '/images/brands/smarthome-logo.png'
      },
      'comfortwear': { 
        name: 'ComfortWear', 
        description: 'Premium comfort clothing and apparel',
        logo: '/images/brands/comfortwear-logo.png'
      },
      'gametech': { 
        name: 'GameTech', 
        description: 'High-performance gaming accessories',
        logo: '/images/brands/gametech-logo.png'
      },
      'kitchenpro': { 
        name: 'KitchenPro', 
        description: 'Professional kitchen appliances and tools',
        logo: '/images/brands/kitchenpro-logo.png'
      },
    };

    return brandNames[brandId.toLowerCase()] || { 
      name: brandId, 
      description: `Quality products from ${brandId}` 
    };
  }, [brandId]);

  // Get products for each tab
  const tabData = useMemo(() => {
    const hotSales = getBrandHotSales(brandData.name);
    const bestSellers = getBrandBestSellers(brandData.name);
    const flashDeals = getBrandFlashDeals(brandData.name);
    const allProducts = getBrandProducts(brandData.name);

    return {
      'hot-sales': hotSales,
      'best-sellers': bestSellers,
      'flash-deals': flashDeals.map(item => item.product),
      'all-products': allProducts,
    };
  }, [brandData.name]);

  const currentProducts = tabData[activeTab];
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = currentProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      price: parseFloat(product.price.replace('$', '')),
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const EmptyState = ({ tabName }: { tabName: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No {tabName} Found</h3>
      <p className="text-gray-600 mb-4">
        {brandData.name} doesn't have any {tabName.toLowerCase()} at the moment.
      </p>
      <Button 
        variant="outline" 
        onClick={() => setActiveTab('all-products')}
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        View All Products
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {brandData.logo && (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={brandData.logo}
                    alt={`${brandData.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {brandData.name}
                </DialogTitle>
                <p className="text-gray-600 mt-1">{brandData.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="h-full flex flex-col">
            {/* Tab Navigation */}
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hot-sales" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Hot Sales
                  {tabData['hot-sales'].length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tabData['hot-sales'].length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="best-sellers" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Best Sellers
                  {tabData['best-sellers'].length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tabData['best-sellers'].length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="flash-deals" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Flash Deals
                  {tabData['flash-deals'].length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tabData['flash-deals'].length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="all-products" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  All Products
                  {tabData['all-products'].length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tabData['all-products'].length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {['hot-sales', 'best-sellers', 'flash-deals', 'all-products'].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
                  {currentProducts.length === 0 ? (
                    <EmptyState tabName={tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} />
                  ) : (
                    <>
                      {/* Products Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {paginatedProducts.map((product) => (
                          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                            <CardContent className="p-0">
                              {/* Product Image */}
                              <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                  {product.originalPrice && (
                                    <Badge className="bg-red-500 text-white text-xs">
                                      SALE
                                    </Badge>
                                  )}
                                  {activeTab === 'best-sellers' && (
                                    <Badge className="bg-amber-500 text-white text-xs">
                                      <Star className="w-3 h-3 mr-1" />
                                      BEST
                                    </Badge>
                                  )}
                                  {activeTab === 'flash-deals' && (
                                    <Badge className="bg-orange-500 text-white text-xs">
                                      <Zap className="w-3 h-3 mr-1" />
                                      FLASH
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Product Info */}
                              <div className="p-4">
                                {/* Category */}
                                <Badge variant="outline" className="text-xs mb-2">
                                  {product.category}
                                </Badge>

                                {/* Name */}
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < Math.floor(product.rating || 0)
                                            ? 'text-yellow-500 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {product.rating?.toFixed(1)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({product.reviewCount?.toLocaleString()})
                                  </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="text-lg font-bold text-gray-900">
                                    {product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                      {product.originalPrice}
                                    </span>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                                    size="sm"
                                  >
                                    <ShoppingBag className="w-4 h-4 mr-1" />
                                    Add to Cart
                                  </Button>
                                  <Link href={`/product/${product.id}`} className="flex-1">
                                    <Button
                                      variant="outline"
                                      className="w-full text-sm"
                                      size="sm"
                                      onClick={onClose}
                                    >
                                      View Details
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2"
                            size="sm"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </Button>

                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Page {currentPage} of {totalPages}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({currentProducts.length} products)
                            </span>
                          </div>

                          <Button
                            variant="outline"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2"
                            size="sm"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {/* Results Summary */}
                      {currentProducts.length > 0 && (
                        <div className="text-center text-sm text-gray-600 mt-4">
                          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, currentProducts.length)} of {currentProducts.length} products
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Browse {brandData.name} products by category and find the perfect items for you
            </div>
            <div className="flex gap-2">
              <Link href="/brands">
                <Button variant="outline" size="sm" onClick={onClose}>
                  View All Brands
                </Button>
              </Link>
              <Button onClick={onClose} size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}