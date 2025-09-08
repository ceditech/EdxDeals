'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Bot, DollarSign, Filter, GraduationCap, Home, Briefcase, Heart, Gift } from 'lucide-react';

interface FilterCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  filters: FilterOption[];
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count: number;
  href: string;
}

const filterCategories: FilterCategory[] = [
  {
    id: 'price',
    title: 'Shop by Price',
    description: 'Find products within your budget',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'bg-green-500',
    filters: [
      { id: 'under-25', label: 'Under $25', value: '0-25', count: 156, href: '/shop?price=0-25' },
      { id: 'under-50', label: 'Under $50', value: '0-50', count: 234, href: '/shop?price=0-50' },
      { id: 'under-100', label: 'Under $100', value: '0-100', count: 345, href: '/shop?price=0-100' },
      { id: 'under-200', label: 'Under $200', value: '0-200', count: 456, href: '/shop?price=0-200' },
      { id: 'premium', label: 'Premium ($200+)', value: '200+', count: 123, href: '/shop?price=200+' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Shop by Lifestyle',
    description: 'Products tailored to your way of life',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-pink-500',
    filters: [
      { id: 'students', label: 'Best for Students', value: 'students', count: 89, href: '/shop?lifestyle=students' },
      { id: 'professionals', label: 'For Professionals', value: 'professionals', count: 156, href: '/shop?lifestyle=professionals' },
      { id: 'families', label: 'Family Essentials', value: 'families', count: 234, href: '/shop?lifestyle=families' },
      { id: 'seniors', label: 'Senior Friendly', value: 'seniors', count: 67, href: '/shop?lifestyle=seniors' },
      { id: 'eco-conscious', label: 'Eco-Conscious', value: 'eco', count: 98, href: '/shop?lifestyle=eco' }
    ]
  },
  {
    id: 'purpose',
    title: 'Shop by Purpose',
    description: 'Find exactly what you need',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-blue-500',
    filters: [
      { id: 'work-from-home', label: 'Work from Home', value: 'wfh', count: 145, href: '/shop?purpose=wfh' },
      { id: 'fitness', label: 'Fitness & Health', value: 'fitness', count: 123, href: '/shop?purpose=fitness' },
      { id: 'entertainment', label: 'Entertainment', value: 'entertainment', count: 189, href: '/shop?purpose=entertainment' },
      { id: 'travel', label: 'Travel Essentials', value: 'travel', count: 76, href: '/shop?purpose=travel' },
      { id: 'gifts', label: 'Perfect Gifts', value: 'gifts', count: 234, href: '/shop?purpose=gifts' }
    ]
  },
  {
    id: 'features',
    title: 'Shop by Features',
    description: 'Products with specific capabilities',
    icon: <Filter className="w-6 h-6" />,
    color: 'bg-purple-500',
    filters: [
      { id: 'wireless', label: 'Wireless/Bluetooth', value: 'wireless', count: 167, href: '/shop?features=wireless' },
      { id: 'smart', label: 'Smart/Connected', value: 'smart', count: 134, href: '/shop?features=smart' },
      { id: 'portable', label: 'Portable/Compact', value: 'portable', count: 198, href: '/shop?features=portable' },
      { id: 'waterproof', label: 'Waterproof/Resistant', value: 'waterproof', count: 89, href: '/shop?features=waterproof' },
      { id: 'energy-efficient', label: 'Energy Efficient', value: 'energy', count: 112, href: '/shop?features=energy' }
    ]
  }
];

export default function ShopByFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-indigo-500 p-2 rounded-full">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Shop by Price, Feature & Need
            </h2>
            <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white">
              SMART FILTERS
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            Find exactly what you're looking for with our intelligent filtering system
          </p>
        </div>

        {/* Price Range Slider */}
        <div className="mb-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Custom Price Range</h3>
            <p className="text-muted-foreground">
              Drag to set your budget range
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-green-600">
                ${priceRange[0]}
              </span>
              <span className="text-sm text-muted-foreground">to</span>
              <span className="text-lg font-semibold text-green-600">
                ${priceRange[1]}
              </span>
            </div>
            
            <div className="text-center">
              <Link href={`/shop?price=${priceRange[0]}-${priceRange[1]}`}>
                <Button className="bg-green-500 hover:bg-green-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Shop ${priceRange[0]} - ${priceRange[1]}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filterCategories.map((category) => (
            <Card 
              key={category.id} 
              className={`hover:shadow-lg transition-all duration-300 border-2 ${
                selectedCategory === category.id ? 'border-primary' : 'hover:border-gray-200'
              }`}
            >
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${category.color} p-2 rounded-full text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="space-y-3">
                  {category.filters.map((filter) => (
                    <Link key={filter.id} href={filter.href}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {filter.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {filter.count} items
                          </Badge>
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <div className="mt-4 text-center">
                  <Link href={`/shop?category=${category.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View All {category.title.split(' ').pop()} Options
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Product Finder */}
        <div className="mb-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">AI Product Finder</h3>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              BETA
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Let our AI assistant help you discover the perfect products 
            based on your specific needs, preferences, and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Bot className="w-5 h-5 mr-2" />
              Start AI Product Search
            </Button>
            <Button variant="outline" size="lg">
              <Gift className="w-5 h-5 mr-2" />
              Gift Finder Wizard
            </Button>
          </div>
        </div>

        {/* Popular Filter Combinations */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center mb-6">Popular Filter Combinations</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Student Tech Under $100', href: '/shop?lifestyle=students&price=0-100&category=electronics' },
              { label: 'Work from Home Essentials', href: '/shop?purpose=wfh&price=0-200' },
              { label: 'Wireless & Portable', href: '/shop?features=wireless&features=portable' },
              { label: 'Eco-Friendly Home', href: '/shop?lifestyle=eco&category=home' },
              { label: 'Premium Gifts', href: '/shop?purpose=gifts&price=100+' },
              { label: 'Smart Home Under $50', href: '/shop?features=smart&category=home&price=0-50' }
            ].map((combo) => (
              <Link key={combo.label} href={combo.href}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {combo.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Filter Statistics */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground">Filterable Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Filter Options</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Match Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-500 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">AI Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}