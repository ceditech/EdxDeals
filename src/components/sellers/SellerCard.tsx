'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Zap } from 'lucide-react';
import Image from 'next/image';
import { handleSellerNavigation } from '@/lib/seller-utils';
import type { Seller } from '../../../lib/firebase/sellers';

export default function SellerCard({ seller }: { seller: Seller }) {
  const router = useRouter();

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle seller navigation with validation
  const handleVisitStore = async () => {
    await handleSellerNavigation(seller.id, router);
  };

  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 hover:scale-[1.02] relative overflow-hidden">
      {/* Featured Badge */}
      {seller.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
            <Zap className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="p-6 flex flex-col h-full">
        {/* Logo / Avatar */}
        <div className="flex items-center justify-center mb-4 h-16">
          <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center p-3 overflow-hidden group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-300">
            {seller.logo ? (
              <Image
                src={seller.logo}
                alt={`${seller.name} logo`}
                width={160}
                height={48}
                className="object-contain w-auto h-12"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {getInitials(seller.name)}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg text-center mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {seller.name}
        </h3>

        {/* Specialization */}
        {seller.specialization && (
          <p className="text-xs text-blue-600 font-medium text-center mb-2">
            {seller.specialization}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3 text-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-medium">{seller.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({seller.reviewCount?.toLocaleString() || '0'} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2 flex-grow">
          {seller.description}
        </p>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {seller.categories.slice(0, 3).map((c) => (
              <Badge key={c} variant="outline" className="text-xs px-2 py-1 group-hover:border-blue-300 transition-colors duration-300">
                {c}
              </Badge>
            ))}
            {seller.categories.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 group-hover:border-blue-300 transition-colors duration-300">
                +{seller.categories.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto">
          <Button
            onClick={handleVisitStore}
            className="w-full group-hover:bg-blue-600 group-hover:shadow-md transition-all duration-300"
            aria-label={`View ${seller.name} store`}
          >
            Visit {seller.name} Store
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}