'use client';

import UnifiedProductCard from './unified-product-card';
import type { Product } from '@/types';

// New arrivals product data - converted to proper Product type format
const newArrivalsProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    imageUrl: '/images/store/headphones.jpg',
    price: '$79.99',
    originalPrice: '$99.99',
    category: 'Electronics & Technology',
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    imageUrl: '/images/store/smartwatch.jpg',
    price: '$299.99',
    originalPrice: '$399.99',
    category: 'Electronics & Technology',
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'USB-C Fast Charging Cable',
    imageUrl: '/images/store/cable.jpg',
    price: '$19.99',
    originalPrice: '$29.99',
    category: 'Electronics & Technology',
    rating: 4.2,
    reviewCount: 256,
  },
  {
    id: '4',
    name: 'Wireless Gaming Mouse',
    imageUrl: '/images/store/mouse.jpg',
    price: '$59.99',
    originalPrice: '$79.99',
    category: 'Electronics & Technology',
    rating: 4.6,
    reviewCount: 94,
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    imageUrl: '/images/store/speaker.jpg',
    price: '$89.99',
    category: 'Electronics & Technology',
    rating: 4.4,
    reviewCount: 167,
  },
  {
    id: '6',
    name: 'Laptop Stand Adjustable',
    imageUrl: '/images/store/laptop-stand.jpg',
    price: '$39.99',
    originalPrice: '$59.99',
    category: 'Electronics & Technology',
    rating: 4.3,
    reviewCount: 203,
  },
  {
    id: '7',
    name: 'Wireless Phone Charger',
    imageUrl: '/images/store/wireless-charger.jpg',
    price: '$24.99',
    originalPrice: '$34.99',
    category: 'Electronics & Technology',
    rating: 4.1,
    reviewCount: 145,
  },
  {
    id: '8',
    name: 'Mechanical Keyboard RGB',
    imageUrl: '/images/store/keyboard.jpg',
    price: '$129.99',
    originalPrice: '$179.99',
    category: 'Electronics & Technology',
    rating: 4.7,
    reviewCount: 76,
  },
];

export default function ProductsGridNewArrivals() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
          <p className="text-muted-foreground">
            Discover our latest products with amazing deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivalsProducts.map((product) => (
            <UnifiedProductCard 
              key={product.id} 
              product={product} 
              badge="NEW"
            />
          ))}
        </div>
      </div>
    </section>
  );
}