'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ShoppingBag, Search, Home } from 'lucide-react';

interface SellerNotFoundProps {
  searchedSlug?: string;
}

export default function SellerNotFound({ searchedSlug }: SellerNotFoundProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Store Not Found
          </h1>

          {/* Description */}
          <div className="space-y-3 mb-8">
            <p className="text-lg text-gray-600">
              {searchedSlug 
                ? `We couldn't find a store with the identifier "${searchedSlug}".`
                : "The store you're looking for could not be found."
              }
            </p>
            <p className="text-gray-500">
              The store may have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">What you can do:</h3>
            <ul className="text-left text-blue-800 space-y-2">
              <li className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Check the store name or URL for typos
              </li>
              <li className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse our featured sellers instead
              </li>
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to the homepage to explore deals
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sellers">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse All Sellers
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact our support team</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}