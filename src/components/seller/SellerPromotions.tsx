'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Percent, Gift, Bell, Clock, CheckCircle, Check } from 'lucide-react';
import { useState } from 'react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerPromotionsProps {
  promotions: SellerShopData['promotions'];
}

export default function SellerPromotions({ promotions }: SellerPromotionsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent className="w-5 h-5" />;
      case 'coupon':
        return <Gift className="w-5 h-5" />;
      case 'announcement':
        return <Bell className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getPromotionColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'from-red-500 to-pink-500';
      case 'coupon':
        return 'from-green-500 to-emerald-500';
      case 'announcement':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-purple-500 to-violet-500';
    }
  };

  const formatTimeRemaining = (validUntil: Date) => {
    const now = new Date();
    const diff = validUntil.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} left`;
    } else {
      return 'Ending soon';
    }
  };

  const activePromotions = promotions.filter(promo => promo.isActive);

  if (activePromotions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Active Promotions</h2>
          <p className="text-gray-600 text-sm">Don't miss out on these limited-time offers!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePromotions.map((promotion) => (
            <Card 
              key={promotion.id} 
              className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getPromotionColor(promotion.type)} opacity-5`} />
              
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getPromotionColor(promotion.type)} text-white`}>
                    {getPromotionIcon(promotion.type)}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-medium bg-gradient-to-r ${getPromotionColor(promotion.type)} text-white border-0`}
                  >
                    {promotion.type.charAt(0).toUpperCase() + promotion.type.slice(1)}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {promotion.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {promotion.description}
                </p>

                {/* Discount Badge */}
                {promotion.discount && (
                  <div className="mb-4">
                    <Badge className={`bg-gradient-to-r ${getPromotionColor(promotion.type)} text-white text-lg px-3 py-1 font-bold`}>
                      {promotion.discount} OFF
                    </Badge>
                  </div>
                )}

                {/* Coupon Code */}
                {promotion.code && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <span className="text-sm font-medium text-gray-700">Code:</span>
                      <code className="font-mono font-bold text-lg text-gray-900 flex-grow">
                        {promotion.code}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCode(promotion.code!)}
                        className="h-8 px-2"
                      >
                        {copiedCode === promotion.code ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Time Remaining */}
                {promotion.validUntil && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeRemaining(promotion.validUntil)}</span>
                  </div>
                )}

                {/* Action Button */}
                {promotion.type !== 'announcement' && (
                  <Button 
                    className={`w-full bg-gradient-to-r ${getPromotionColor(promotion.type)} hover:opacity-90 text-white border-0 transition-all duration-200`}
                  >
                    {promotion.type === 'coupon' ? 'Use Code' : 'Shop Now'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}