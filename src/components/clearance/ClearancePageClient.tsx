'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Percent, 
  Package, 
  AlertTriangle,
  Star,
  Clock,
  Zap
} from 'lucide-react';
import ClearanceHero from '@/components/clearance/ClearanceHero';
import ClearanceCard from '@/components/clearance/ClearanceCard';
import ClearanceInfoSection from '@/components/clearance/ClearanceInfoSection';

// Mock clearance product data
interface ClearanceProduct {
  id: string;
  name: string;
  condition: 'new' | 'open-box' | 'refurbished' | 'display';
  conditionDescription: string;
  originalPrice: number;
  clearancePrice: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  image?: string;
  rating: number;
  reviewCount: number;
  callout?: string;
  isLimitedTime?: boolean;
  isFeatured?: boolean;
}

const mockClearanceProducts: ClearanceProduct[] = [
  {
    id: 'clear-001',
    name: 'Wireless Bluetooth Headphones Pro Max',
    condition: 'open-box',
    conditionDescription: 'Customer return - unopened',
    originalPrice: 79.99,
    clearancePrice: 32.00,
    discountPercentage: 60,
    stock: 3,
    brand: 'AudioTech',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 1234,
    callout: 'Act Fast!',
    isLimitedTime: true,
    isFeatured: true
  },
  {
    id: 'clear-002',
    name: 'Smart Watch Series 5',
    condition: 'refurbished',
    conditionDescription: 'Factory refurbished',
    originalPrice: 299.99,
    clearancePrice: 164.99,
    discountPercentage: 45,
    stock: 8,
    brand: 'TechWatch',
    category: 'Electronics',
    rating: 4.3,
    reviewCount: 892,
    callout: 'Limited Time',
    isLimitedTime: true
  },
  {
    id: 'clear-003',
    name: 'USB-C Fast Charging Cable 6ft',
    condition: 'display',
    conditionDescription: 'Store display model',
    originalPrice: 19.99,
    clearancePrice: 6.00,
    discountPercentage: 70,
    stock: 2,
    brand: 'ChargeFast',
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 456,
    callout: 'Act Fast!',
    isLimitedTime: true
  },
  {
    id: 'clear-004',
    name: 'Wireless Gaming Mouse RGB',
    condition: 'new',
    conditionDescription: 'Overstock clearance',
    originalPrice: 59.99,
    clearancePrice: 38.99,
    discountPercentage: 35,
    stock: 15,
    brand: 'GamePro',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 678,
    callout: 'Good Deal'
  },
  {
    id: 'clear-005',
    name: '4K Webcam with Auto Focus',
    condition: 'open-box',
    conditionDescription: 'Customer return - tested',
    originalPrice: 149.99,
    clearancePrice: 89.99,
    discountPercentage: 40,
    stock: 5,
    brand: 'CamTech',
    category: 'Electronics',
    rating: 4.4,
    reviewCount: 234,
    callout: 'Great Value'
  },
  {
    id: 'clear-006',
    name: 'Portable Bluetooth Speaker',
    condition: 'refurbished',
    conditionDescription: 'Professionally restored',
    originalPrice: 89.99,
    clearancePrice: 44.99,
    discountPercentage: 50,
    stock: 12,
    brand: 'SoundWave',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1567,
    callout: 'Best Seller'
  },
  {
    id: 'clear-007',
    name: 'Smart LED Light Bulbs 4-Pack',
    condition: 'display',
    conditionDescription: 'Former display model',
    originalPrice: 49.99,
    clearancePrice: 24.99,
    discountPercentage: 50,
    stock: 7,
    brand: 'SmartHome',
    category: 'Home',
    rating: 4.2,
    reviewCount: 345,
    callout: 'Smart Deal'
  },
  {
    id: 'clear-008',
    name: 'Ergonomic Office Chair',
    condition: 'open-box',
    conditionDescription: 'Customer return - like new',
    originalPrice: 299.99,
    clearancePrice: 179.99,
    discountPercentage: 40,
    stock: 4,
    brand: 'ComfortSeat',
    category: 'Home',
    rating: 4.5,
    reviewCount: 789,
    callout: 'Limited Stock'
  }
];

const brands = ['All Brands', 'AudioTech', 'TechWatch', 'ChargeFast', 'GamePro', 'CamTech', 'SoundWave', 'SmartHome', 'ComfortSeat'];
const categories = ['All Categories', 'Electronics', 'Home', 'Accessories'];
const conditions = ['All Types', 'new', 'open-box', 'refurbished', 'display'];
const sortOptions = [
  { value: 'price-low', label: 'Lowest Price' },
  { value: 'discount-high', label: 'Biggest Discount' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function ClearancePageClient() {
  const [products, setProducts] = useState<ClearanceProduct[]>(mockClearanceProducts);
  const [filteredProducts, setFilteredProducts] = useState<ClearanceProduct[]>(mockClearanceProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Types');
  const [discountRange, setDiscountRange] = useState([0]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('discount-high');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrand !== 'All Brands') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Condition filter
    if (selectedCondition !== 'All Types') {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    // Discount filter
    if (discountRange[0] > 0) {
      filtered = filtered.filter(product => product.discountPercentage >= discountRange[0]);
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.clearancePrice - b.clearancePrice);
        break;
      case 'discount-high':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'newest':
        // Mock newest sort - in real app would sort by date
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedBrand, selectedCategory, selectedCondition, discountRange, inStockOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCategory('All Categories');
    setSelectedCondition('All Types');
    setDiscountRange([0]);
    setInStockOnly(false);
    setSortBy('discount-high');
  };

  const { addItem } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: '/images/products/placeholder.jpg', // Default image for clearance items
        price: product.clearancePrice
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ClearanceHero />

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search clearance items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className={`flex flex-col lg:flex-row gap-4 w-full lg:w-auto ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition === 'All Types' ? condition : condition.charAt(0).toUpperCase() + condition.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Min Discount:</span>
                <div className="w-24">
                  <Slider
                    value={discountRange}
                    onValueChange={setDiscountRange}
                    max={80}
                    step={5}
                    className="w-full"
                  />
                </div>
                <span className="text-sm font-medium">{discountRange[0]}%</span>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked === true)}
                />
                <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
                  In Stock Only
                </label>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters} size="sm">
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Clearance Items ({filteredProducts.length})
            </h2>
            <Badge variant="outline" className="text-sm">
              Up to 70% off
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No clearance items found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ClearanceCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  animationDelay={index * 100}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clearance Info Section */}
      <ClearanceInfoSection />

      {/* Third Party Ads Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Partners & Sponsors</h2>
            <p className="text-muted-foreground">Discover amazing deals from our trusted partners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Partner/Affiliate Ads */}
            {[
              {
                id: 'partner-1',
                title: 'Amazon Prime Day Deals',
                description: 'Exclusive discounts on electronics, home goods, and more. Limited time offers!',
                image: '/images/ads/amazon-prime.jpg',
                badge: 'PARTNER',
                badgeColor: 'bg-orange-500',
                cta: 'Shop Amazon',
                url: 'https://amazon.com'
              },
              {
                id: 'partner-2',
                title: 'Best Buy Tech Savings',
                description: 'Latest gadgets and electronics at unbeatable prices. Free shipping available.',
                image: '/images/ads/bestbuy.jpg',
                badge: 'AFFILIATE',
                badgeColor: 'bg-blue-500',
                cta: 'Visit Best Buy',
                url: 'https://bestbuy.com'
              },
              {
                id: 'partner-3',
                title: 'Target Home Essentials',
                description: 'Transform your home with stylish and affordable home essentials.',
                image: '/images/ads/target.jpg',
                badge: 'SPONSOR',
                badgeColor: 'bg-red-500',
                cta: 'Shop Target',
                url: 'https://target.com'
              }
            ].map((ad) => (
              <div key={ad.id} className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Partner Advertisement</p>
                    </div>
                  </div>
                  <Badge className={`absolute top-3 left-3 text-white ${ad.badgeColor}`}>
                    {ad.badge}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {ad.description}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
                    {ad.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Advertisement • These are promotional content from our partners
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sponsored Content</h2>
            <p className="text-muted-foreground">Relevant ads and offers for you</p>
          </div>
          
          {/* AdSense Placeholder - Large Banner */}
          <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 mb-6">
            <div className="max-w-4xl mx-auto text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Google AdSense - Large Banner</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This space is reserved for Google AdSense advertisements. Ads will be displayed here once AdSense is configured.
              </p>
              <div className="bg-muted/40 rounded p-6">
                <p className="text-sm text-muted-foreground">
                  Ad Placeholder - 970x250 Large Banner
                </p>
              </div>
            </div>
          </div>

          {/* AdSense Placeholder - Medium Rectangle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
              <div className="text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Google AdSense</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Medium Rectangle Ad Space
                </p>
                <div className="bg-muted/40 rounded p-4">
                  <p className="text-xs text-muted-foreground">
                    Ad Placeholder - 300x250
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
              <div className="text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Google AdSense</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Medium Rectangle Ad Space
                </p>
                <div className="bg-muted/40 rounded p-4">
                  <p className="text-xs text-muted-foreground">
                    Ad Placeholder - 300x250
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AdSense Placeholder - Leaderboard */}
          <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
            <div className="max-w-3xl mx-auto text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Google AdSense - Leaderboard</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This leaderboard ad space will display relevant advertisements based on user interests.
              </p>
              <div className="bg-muted/40 rounded p-4">
                <p className="text-xs text-muted-foreground">
                  Ad Placeholder - 728x90 Leaderboard
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Advertisement • Ads by Google • Privacy Policy
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <Button 
          size="lg" 
          className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-8 py-3 rounded-full"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Percent className="w-5 h-5 mr-2" />
          View All Clearance Items
        </Button>
      </div>
    </div>
  );
}