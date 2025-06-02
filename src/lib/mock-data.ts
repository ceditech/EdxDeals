import type { Banner, Category, Product, Deal } from '@/types';
import { Laptop, HomeIcon as HomeLucideIcon, Percent, Star, Sparkles, Zap } from 'lucide-react';

export const mockBanners: Banner[] = [
  {
    id: '1',
    imageUrl: 'https://placehold.co/1200x400.png',
    title: 'Mega Electronics Sale!',
    description: 'Up to 50% off on latest gadgets and electronics.',
    ctaText: 'Shop Now',
    ctaLink: '/shop/electronics',
    dataAiHint: 'electronics sale'
  },
  {
    id: '2',
    imageUrl: 'https://placehold.co/1200x400.png',
    title: 'Cozy Home Essentials',
    description: 'Everything you need to make your home comfortable.',
    ctaText: 'Explore Home Goods',
    ctaLink: '/shop/home',
    dataAiHint: 'home decor'
  },
  {
    id: '3',
    imageUrl: 'https://placehold.co/1200x400.png',
    title: 'Seasonal Fashion Trends',
    description: 'Discover the latest styles for this season.',
    ctaText: 'View Collection',
    ctaLink: '/shop/fashion',
    dataAiHint: 'fashion runway'
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', icon: Laptop, href: '/categories/electronics' },
  { id: '2', name: 'Home', icon: HomeLucideIcon, href: '/categories/home' },
  { id: '3', name: 'Deals', icon: Percent, href: '/deals' },
  { id: '4', name: 'Best Sellers', icon: Star, href: '/products/best-sellers' },
  { id: '5', name: 'New Arrivals', icon: Sparkles, href: '/products/new-arrivals' },
];

export const mockFeaturedProducts: Product[] = [
  {
    id: 'fp1',
    name: 'Premium Laptop Pro X',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$1299.99',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 120,
    dataAiHint: 'laptop computer'
  },
  {
    id: 'fp2',
    name: 'Smart Home Hub Central',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$149.50',
    category: 'Home',
    rating: 4.5,
    reviewCount: 95,
    dataAiHint: 'smart home'
  },
  {
    id: 'fp3',
    name: 'Wireless Noise-Cancelling Headphones',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$249.00',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 250,
    dataAiHint: 'headphones audio'
  },
  {
    id: 'fp4',
    name: 'Organic Cotton Throw Blanket',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$79.99',
    category: 'Home',
    rating: 4.9,
    reviewCount: 75,
    dataAiHint: 'blanket textile'
  },
   {
    id: 'fp5',
    name: 'High-Performance Blender',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$199.00',
    category: 'Home Appliances',
    rating: 4.6,
    reviewCount: 150,
    dataAiHint: 'kitchen blender'
  },
];

const now = new Date();
export const mockFlashDeals: Deal[] = [
  {
    id: 'fd1',
    name: 'Limited Edition Smart Watch',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$199.99',
    originalPrice: '$299.99',
    category: 'Electronics',
    endDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    dataAiHint: 'smartwatch technology'
  },
  {
    id: 'fd2',
    name: 'Ultra HD Action Camera',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$99.50',
    originalPrice: '$159.50',
    category: 'Electronics',
    endDate: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
    dataAiHint: 'action camera'
  },
  {
    id: 'fd3',
    name: 'Ergonomic Gaming Chair',
    imageUrl: 'https://placehold.co/400x400.png',
    price: '$249.00',
    originalPrice: '$399.00',
    category: 'Home',
    endDate: new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour from now
    dataAiHint: 'gaming chair'
  },
];
