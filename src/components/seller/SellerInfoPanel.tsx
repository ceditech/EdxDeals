'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle as ShieldIcon,
  Clock,
  Users,
  Star,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerInfoPanelProps {
  seller: SellerShopData;
}

export default function SellerInfoPanel({ seller }: SellerInfoPanelProps) {
  const [isReported, setIsReported] = useState(false);

  const handleReportSeller = () => {
    setIsReported(true);
    // In a real app, this would send a report to the backend
    setTimeout(() => setIsReported(false), 3000);
  };

  const trustScore = Math.round(seller.rating * 20); // Convert 5-star rating to 100-point trust score

  return (
    <div className="space-y-6">
      {/* Trust Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldIcon className="w-5 h-5 text-green-600" />
            Trust Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {trustScore}/100
            </div>
            <p className="text-sm text-gray-600">Excellent Seller</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{seller.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Reviews</span>
              <span className="font-medium">{seller.reviewCount.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Response Time</span>
              <span className="font-medium">{seller.stats.responseTime}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Sales</span>
              <span className="font-medium">{seller.stats.totalSales.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seller Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Seller Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-600">
                {seller.stats.totalProducts}
              </div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-600">
                {seller.stats.totalSales.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Sales</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <Clock className="w-4 h-4 inline mr-1" />
            Joined {seller.stats.joinedDate}
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trust Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seller.badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-green-800">{badge}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      {Object.keys(seller.socialLinks).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {seller.socialLinks.website && (
                <a
                  href={seller.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Visit Website</span>
                </a>
              )}
              
              {seller.socialLinks.facebook && (
                <a
                  href={seller.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-4 h-4 text-blue-600">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-sm">Facebook</span>
                </a>
              )}
              
              {seller.socialLinks.twitter && (
                <a
                  href={seller.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-4 h-4 text-blue-400">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span className="text-sm">Twitter</span>
                </a>
              )}
              
              {seller.socialLinks.instagram && (
                <a
                  href={seller.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-4 h-4 text-pink-600">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                    </svg>
                  </div>
                  <span className="text-sm">Instagram</span>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Seller */}
      <Card>
        <CardContent className="pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReportSeller}
            disabled={isReported}
            className={`w-full ${
              isReported 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'hover:bg-red-50 hover:border-red-200 hover:text-red-700'
            }`}
          >
            {isReported ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Report Submitted
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Seller
              </div>
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Report inappropriate content or behavior
          </p>
        </CardContent>
      </Card>
    </div>
  );
}