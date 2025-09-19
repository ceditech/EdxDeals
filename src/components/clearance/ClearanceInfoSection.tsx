'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Check,
  ChevronRight,
  Star,
  Phone,
  CheckCircle,
  Package,
  Sparkles,
  Percent
} from 'lucide-react';

const itemTypes = [
  {
    condition: 'new',
    label: 'NEW',
    color: 'bg-green-500',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Brand new, unopened items',
    details: 'Factory sealed products in original packaging with full manufacturer warranty.'
  },
  {
    condition: 'open-box',
    label: 'OPEN BOX',
    color: 'bg-blue-500',
    icon: <Package className="w-4 h-4" />,
    description: 'Returned but unused items',
    details: 'Customer returns that were never used, may have opened packaging but complete with all accessories.'
  },
  {
    condition: 'refurbished',
    label: 'REFURBISHED',
    color: 'bg-orange-500',
    icon: <Star className="w-4 h-4" />,
    description: 'Professionally restored',
    details: 'Items that have been professionally tested, cleaned, and restored to like-new condition.'
  },
  {
    condition: 'display',
    label: 'DISPLAY',
    color: 'bg-purple-500',
    icon: <Package className="w-4 h-4" />,
    description: 'Former display models',
    details: 'Products that were used for store displays, fully functional with minimal wear.'
  }
];

const policies = [
  {
    icon: <Check className="w-6 h-6 text-green-500" />,
    title: 'Full Warranty Coverage',
    description: 'All clearance items come with our standard warranty protection, just like new products.'
  },
  {
    icon: <ChevronRight className="w-6 h-6 text-blue-500" />,
    title: '30-Day Return Policy',
    description: 'Not satisfied? Return any clearance item within 30 days for a full refund.'
  },
  {
    icon: <Star className="w-6 h-6 text-purple-500" />,
    title: 'Free Shipping',
    description: 'Free standard shipping on all clearance orders over $50. Fast delivery guaranteed.'
  },
  {
    icon: <Phone className="w-6 h-6 text-orange-500" />,
    title: '24/7 Support',
    description: 'Our customer service team is available around the clock to help with any questions.'
  }
];

export default function ClearanceInfoSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Clearance Item Information</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All clearance items come with our standard warranty and return policy. 
            Here's what each condition type means:
          </p>
        </div>

        {/* Item Types Legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {itemTypes.map((type) => (
            <Card key={type.condition} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Badge className={`${type.color} text-white px-4 py-2 text-sm font-bold`}>
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{type.description}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Policies Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {policies.map((policy, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center">
                  {policy.icon}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{policy.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Quality Assurance */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 mb-12 border border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
              Quality Assurance Guarantee
            </h3>
            <p className="text-lg text-green-700 dark:text-green-300 max-w-3xl mx-auto leading-relaxed">
              Every clearance item undergoes rigorous testing and inspection before being offered for sale. 
              We stand behind the quality of all our products, regardless of condition type.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className="text-sm text-green-700 dark:text-green-300">Tested & Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">30-Day</div>
                <div className="text-sm text-green-700 dark:text-green-300">Return Window</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
                <div className="text-sm text-green-700 dark:text-green-300">Customer Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={scrollToTop}
          >
            <Percent className="w-5 h-5 mr-2" />
            View All Clearance Items
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Limited quantities available • Prices subject to change • While supplies last
          </p>
        </div>
      </div>
    </section>
  );
}