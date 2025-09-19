'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Percent, Zap, Clock, Package } from 'lucide-react';

export default function ClearanceHero() {
  const scrollToDeals = () => {
    const dealsSection = document.querySelector('#clearance-deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-pink-950/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-red-400 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Urgency Badge */}
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time Clearance Event
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-red-500 p-3 rounded-full">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Clearance & Open Box
            </h1>
          </div>

          <div className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Big Savings, Limited Stock!
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Get the best deals on quality products: open box, refurbished, display models, and more—
            <span className="font-semibold text-red-600"> guaranteed and warrantied.</span>
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2 text-orange-500" />
              Up to 70% Off
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Package className="w-4 h-4 mr-2 text-blue-500" />
              Full Warranty
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              Limited Quantities
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToDeals}
            >
              <Percent className="w-5 h-5 mr-2" />
              Shop All Clearance
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg border-2 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={scrollToDeals}
            >
              <Package className="w-5 h-5 mr-2" />
              Browse Categories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-red-200 dark:border-red-800">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600">500+</div>
              <div className="text-sm text-muted-foreground">Items on Sale</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">70%</div>
              <div className="text-sm text-muted-foreground">Max Discount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-pink-600">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">30-Day</div>
              <div className="text-sm text-muted-foreground">Return Policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-red-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}