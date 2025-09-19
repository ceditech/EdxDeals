import type { Product } from '@/types';
import type { Seller } from '../../lib/firebase/sellers';

// Extended seller type with additional shop data
export interface SellerShopData extends Seller {
  coverImage?: string;
  badges: string[];
  socialLinks: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  policies: {
    shipping: {
      methods: Array<{
        name: string;
        price: string;
        estimatedDays: string;
        description: string;
      }>;
      freeShippingThreshold?: string;
      processingTime: string;
    };
    returns: {
      period: string;
      conditions: string[];
      process: string;
    };
    warranty: {
      period: string;
      coverage: string[];
    };
  };
  promotions: Array<{
    id: string;
    type: 'discount' | 'coupon' | 'announcement';
    title: string;
    description: string;
    code?: string;
    discount?: string;
    validUntil?: Date;
    isActive: boolean;
  }>;
  products: Product[];
  stats: {
    totalProducts: number;
    totalSales: number;
    responseTime: string;
    joinedDate: string;
  };
}

// Mock products for different sellers
const createSellerProducts = (sellerId: string, count: number = 20): Product[] => {
  const baseProducts: Omit<Product, 'id'>[] = [
    // Electronics products
    { name: 'Wireless Bluetooth Headphones', imageUrl: 'https://placehold.co/400x400.png', price: '$89.99', originalPrice: '$129.99', category: 'Electronics', rating: 4.5, reviewCount: 234, dataAiHint: 'bluetooth headphones' },
    { name: 'Smart Fitness Tracker', imageUrl: 'https://placehold.co/400x400.png', price: '$149.99', category: 'Electronics', rating: 4.3, reviewCount: 156, dataAiHint: 'fitness tracker' },
    { name: 'Portable Power Bank 20000mAh', imageUrl: 'https://placehold.co/400x400.png', price: '$39.99', category: 'Electronics', rating: 4.7, reviewCount: 89, dataAiHint: 'power bank' },
    { name: 'USB-C Fast Charging Cable', imageUrl: 'https://placehold.co/400x400.png', price: '$19.99', category: 'Electronics', rating: 4.4, reviewCount: 67, dataAiHint: 'usb cable' },
    { name: 'Wireless Phone Charger Pad', imageUrl: 'https://placehold.co/400x400.png', price: '$29.99', category: 'Electronics', rating: 4.2, reviewCount: 123, dataAiHint: 'wireless charger' },
    
    // Home products
    { name: 'Ceramic Coffee Mug Set', imageUrl: 'https://placehold.co/400x400.png', price: '$24.99', category: 'Home', rating: 4.6, reviewCount: 78, dataAiHint: 'coffee mugs' },
    { name: 'Bamboo Cutting Board', imageUrl: 'https://placehold.co/400x400.png', price: '$34.99', category: 'Home', rating: 4.8, reviewCount: 145, dataAiHint: 'cutting board' },
    { name: 'LED Desk Lamp', imageUrl: 'https://placehold.co/400x400.png', price: '$49.99', category: 'Home', rating: 4.5, reviewCount: 92, dataAiHint: 'desk lamp' },
    { name: 'Throw Pillow Covers Set', imageUrl: 'https://placehold.co/400x400.png', price: '$19.99', category: 'Home', rating: 4.3, reviewCount: 56, dataAiHint: 'pillow covers' },
    { name: 'Essential Oil Diffuser', imageUrl: 'https://placehold.co/400x400.png', price: '$59.99', category: 'Home', rating: 4.7, reviewCount: 134, dataAiHint: 'oil diffuser' },
    
    // Fashion products
    { name: 'Cotton T-Shirt Basic', imageUrl: 'https://placehold.co/400x400.png', price: '$14.99', category: 'Fashion', rating: 4.2, reviewCount: 89, dataAiHint: 'cotton t-shirt' },
    { name: 'Denim Jacket Classic', imageUrl: 'https://placehold.co/400x400.png', price: '$79.99', category: 'Fashion', rating: 4.6, reviewCount: 67, dataAiHint: 'denim jacket' },
    { name: 'Leather Belt Brown', imageUrl: 'https://placehold.co/400x400.png', price: '$39.99', category: 'Fashion', rating: 4.4, reviewCount: 45, dataAiHint: 'leather belt' },
    { name: 'Canvas Sneakers', imageUrl: 'https://placehold.co/400x400.png', price: '$59.99', category: 'Fashion', rating: 4.3, reviewCount: 123, dataAiHint: 'canvas shoes' },
    { name: 'Wool Scarf Winter', imageUrl: 'https://placehold.co/400x400.png', price: '$29.99', category: 'Fashion', rating: 4.5, reviewCount: 78, dataAiHint: 'wool scarf' },
    
    // Beauty products
    { name: 'Moisturizing Face Cream', imageUrl: 'https://placehold.co/400x400.png', price: '$24.99', category: 'Beauty', rating: 4.4, reviewCount: 156, dataAiHint: 'face cream' },
    { name: 'Natural Lip Balm Set', imageUrl: 'https://placehold.co/400x400.png', price: '$12.99', category: 'Beauty', rating: 4.6, reviewCount: 89, dataAiHint: 'lip balm' },
    { name: 'Vitamin C Serum', imageUrl: 'https://placehold.co/400x400.png', price: '$34.99', category: 'Beauty', rating: 4.7, reviewCount: 234, dataAiHint: 'vitamin c serum' },
    { name: 'Makeup Brush Set', imageUrl: 'https://placehold.co/400x400.png', price: '$49.99', category: 'Beauty', rating: 4.5, reviewCount: 167, dataAiHint: 'makeup brushes' },
    { name: 'Organic Shampoo', imageUrl: 'https://placehold.co/400x400.png', price: '$19.99', category: 'Beauty', rating: 4.3, reviewCount: 98, dataAiHint: 'organic shampoo' },
    
    // Sports products
    { name: 'Yoga Mat Premium', imageUrl: 'https://placehold.co/400x400.png', price: '$39.99', category: 'Sports', rating: 4.6, reviewCount: 145, dataAiHint: 'yoga mat' },
    { name: 'Resistance Bands Set', imageUrl: 'https://placehold.co/400x400.png', price: '$24.99', category: 'Sports', rating: 4.4, reviewCount: 87, dataAiHint: 'resistance bands' },
    { name: 'Water Bottle Insulated', imageUrl: 'https://placehold.co/400x400.png', price: '$29.99', category: 'Sports', rating: 4.7, reviewCount: 123, dataAiHint: 'water bottle' },
    { name: 'Running Shoes Lightweight', imageUrl: 'https://placehold.co/400x400.png', price: '$89.99', category: 'Sports', rating: 4.5, reviewCount: 234, dataAiHint: 'running shoes' },
    { name: 'Gym Towel Microfiber', imageUrl: 'https://placehold.co/400x400.png', price: '$14.99', category: 'Sports', rating: 4.3, reviewCount: 56, dataAiHint: 'gym towel' },
  ];

  return baseProducts.slice(0, count).map((product, index) => ({
    ...product,
    id: `${sellerId}-product-${index + 1}`,
  }));
};

// Mock seller shop data
export const mockSellerShopData: Record<string, SellerShopData> = {
  'stellar-tech': {
    id: 'stellar-tech',
    name: 'Stellar Tech',
    logo: null,
    coverImage: 'https://placehold.co/1200x300.png',
    rating: 4.8,
    reviewCount: 2847,
    description: 'Cutting-edge electronics and smart devices at great prices. We specialize in bringing you the latest technology innovations.',
    categories: ['Electronics', 'Smart Home', 'Accessories'],
    href: '/seller/stellar-tech',
    isFeatured: true,
    specialization: 'Premium Electronics',
    badges: ['Verified Seller', 'Fast Shipping', 'Top Rated', 'Eco Friendly'],
    socialLinks: {
      website: 'https://stellartech.com',
      facebook: 'https://facebook.com/stellartech',
      twitter: 'https://twitter.com/stellartech',
      instagram: 'https://instagram.com/stellartech',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '5-7', description: 'Free standard shipping on orders over $50' },
          { name: 'Express Shipping', price: '$9.99', estimatedDays: '2-3', description: 'Fast delivery for urgent orders' },
          { name: 'Overnight Shipping', price: '$19.99', estimatedDays: '1', description: 'Next day delivery available' },
        ],
        freeShippingThreshold: '$50',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unused', 'Original packaging required', 'Return shipping paid by customer'],
        process: 'Contact customer service to initiate return process',
      },
      warranty: {
        period: '1 year',
        coverage: ['Manufacturing defects', 'Hardware failures', 'Software issues'],
      },
    },
    promotions: [
      {
        id: 'promo-1',
        type: 'discount',
        title: '20% Off Electronics',
        description: 'Get 20% off all electronics this week! Limited time offer on premium gadgets.',
        discount: '20%',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 'promo-2',
        type: 'coupon',
        title: 'Free Shipping',
        description: 'Use code FREESHIP for free shipping on any order over $50',
        code: 'FREESHIP',
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 'promo-3',
        type: 'discount',
        title: 'Flash Sale - Smart Devices',
        description: 'Massive savings on smart home devices! Up to 40% off selected items.',
        discount: '40%',
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('stellar-tech', 24),
    stats: {
      totalProducts: 24,
      totalSales: 12847,
      responseTime: '< 2 hours',
      joinedDate: 'January 2022',
    },
  },
  'comfort-threads': {
    id: 'comfort-threads',
    name: 'Comfort Threads',
    logo: null,
    coverImage: 'https://placehold.co/1200x300.png',
    rating: 4.6,
    reviewCount: 1923,
    description: 'Premium comfort apparel for everyday living. Quality fabrics and timeless designs.',
    categories: ['Apparel', 'Lifestyle'],
    href: '/seller/comfort-threads',
    isFeatured: true,
    specialization: 'Fashion & Lifestyle',
    badges: ['Sustainable', 'Quality Assured', 'Customer Choice'],
    socialLinks: {
      website: 'https://comfortthreads.com',
      instagram: 'https://instagram.com/comfortthreads',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: '$4.99', estimatedDays: '3-5', description: 'Reliable standard delivery' },
          { name: 'Express Shipping', price: '$12.99', estimatedDays: '1-2', description: 'Fast express delivery' },
        ],
        freeShippingThreshold: '$75',
        processingTime: '1-3 business days',
      },
      returns: {
        period: '60 days',
        conditions: ['Item must be unworn', 'Tags attached', 'Free returns'],
        process: 'Easy online return process',
      },
      warranty: {
        period: '6 months',
        coverage: ['Fabric defects', 'Stitching issues'],
      },
    },
    promotions: [
      {
        id: 'promo-3',
        type: 'announcement',
        title: 'New Summer Collection',
        description: 'Check out our latest summer arrivals!',
        isActive: true,
      },
    ],
    products: createSellerProducts('comfort-threads', 24),
    stats: {
      totalProducts: 24,
      totalSales: 8934,
      responseTime: '< 4 hours',
      joinedDate: 'March 2022',
    },
  },
  'kitchen-gurus': {
    id: 'kitchen-gurus',
    name: 'Kitchen Gurus',
    logo: null,
    coverImage: 'https://placehold.co/1200x300.png',
    rating: 4.7,
    reviewCount: 3156,
    description: 'Professional-grade kitchen appliances and cookware for culinary enthusiasts.',
    categories: ['Home', 'Appliances', 'Kitchen'],
    href: '/seller/kitchen-gurus',
    isFeatured: true,
    specialization: 'Kitchen Essentials',
    badges: ['Professional Grade', 'Chef Approved', 'Warranty Included'],
    socialLinks: {
      website: 'https://kitchengurus.com',
      facebook: 'https://facebook.com/kitchengurus',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on all orders' },
          { name: 'White Glove Delivery', price: '$49.99', estimatedDays: '7-10', description: 'Professional installation service' },
        ],
        processingTime: '2-3 business days',
      },
      returns: {
        period: '45 days',
        conditions: ['Item must be unused', 'Original packaging', 'Return shipping included'],
        process: 'Hassle-free return process',
      },
      warranty: {
        period: '2 years',
        coverage: ['Manufacturing defects', 'Electrical issues', 'Parts replacement'],
      },
    },
    promotions: [
      {
        id: 'promo-4',
        type: 'announcement',
        title: 'New Kitchen Collection',
        description: 'Discover our latest professional-grade kitchen appliances and cookware.',
        isActive: true,
      },
      {
        id: 'promo-5',
        type: 'coupon',
        title: 'Chef Special',
        description: 'Professional chefs get 15% off with code CHEF15',
        code: 'CHEF15',
        discount: '15%',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('kitchen-gurus', 28),
    stats: {
      totalProducts: 28,
      totalSales: 15678,
      responseTime: '< 1 hour',
      joinedDate: 'October 2021',
    },
  },
  'beauty-lab': {
    id: 'beauty-lab',
    name: 'Beauty Lab',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/ec4899/ffffff?text=Beauty+Lab',
    rating: 4.5,
    reviewCount: 1567,
    description: 'Clean beauty and self-care essentials. Discover natural products that enhance your beauty routine.',
    categories: ['Beauty', 'Health'],
    href: '/seller/beauty-lab',
    isFeatured: true,
    specialization: 'Beauty & Wellness',
    badges: ['Cruelty Free', 'Natural Ingredients', 'Dermatologist Tested'],
    socialLinks: {
      website: 'https://beautylab.com',
      instagram: 'https://instagram.com/beautylab',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '3-5', description: 'Free shipping on orders over $35' },
          { name: 'Express Shipping', price: '$7.99', estimatedDays: '1-2', description: 'Fast beauty delivery' },
        ],
        freeShippingThreshold: '$35',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Unopened products only', 'Original packaging required'],
        process: 'Easy return process for beauty products',
      },
      warranty: {
        period: '6 months',
        coverage: ['Product defects', 'Quality issues'],
      },
    },
    promotions: [
      {
        id: 'beauty-promo-1',
        type: 'discount',
        title: '25% Off Skincare',
        description: 'Get glowing skin with 25% off all skincare products!',
        discount: '25%',
        validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('beauty-lab', 20),
    stats: {
      totalProducts: 20,
      totalSales: 5432,
      responseTime: '< 3 hours',
      joinedDate: 'June 2022',
    },
  },
  'tech-innovators': {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/8b5cf6/ffffff?text=Tech+Innovators',
    rating: 4.9,
    reviewCount: 4231,
    description: 'Latest gadgets and innovative tech solutions for modern life. Cutting-edge technology at your fingertips.',
    categories: ['Electronics', 'Gadgets', 'Innovation'],
    href: '/seller/tech-innovators',
    isFeatured: true,
    specialization: 'Tech Innovation',
    badges: ['Innovation Leader', 'Latest Tech', 'Premium Quality'],
    socialLinks: {
      website: 'https://techinnovators.com',
      twitter: 'https://twitter.com/techinnovators',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on all tech orders' },
          { name: 'Priority Tech Delivery', price: '$15.99', estimatedDays: '1-2', description: 'Fast tech delivery with insurance' },
        ],
        freeShippingThreshold: '$75',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unused', 'Original packaging required', 'All accessories included'],
        process: 'Tech-friendly return process',
      },
      warranty: {
        period: '2 years',
        coverage: ['Manufacturing defects', 'Hardware failures', 'Software support'],
      },
    },
    promotions: [
      {
        id: 'tech-promo-1',
        type: 'discount',
        title: '30% Off Gadgets',
        description: 'Massive savings on the latest tech gadgets and innovations!',
        discount: '30%',
        validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('tech-innovators', 32),
    stats: {
      totalProducts: 32,
      totalSales: 18765,
      responseTime: '< 1 hour',
      joinedDate: 'September 2021',
    },
  },
  'home-harmony': {
    id: 'home-harmony',
    name: 'Home Harmony',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/10b981/ffffff?text=Home+Harmony',
    rating: 4.7,
    reviewCount: 2689,
    description: 'Transform your space with stylish home decor and furniture. Create the perfect living environment.',
    categories: ['Home', 'Furniture', 'Decor'],
    href: '/seller/home-harmony',
    isFeatured: true,
    specialization: 'Home & Decor',
    badges: ['Interior Design', 'Quality Furniture', 'Style Expert'],
    socialLinks: {
      website: 'https://homeharmony.com',
      instagram: 'https://instagram.com/homeharmony',
      facebook: 'https://facebook.com/homeharmony',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '5-8', description: 'Free shipping on furniture orders over $100' },
          { name: 'White Glove Service', price: '$89.99', estimatedDays: '7-14', description: 'Professional delivery and setup' },
        ],
        freeShippingThreshold: '$100',
        processingTime: '2-4 business days',
      },
      returns: {
        period: '60 days',
        conditions: ['Item must be unused', 'Original packaging', 'Assembly instructions included'],
        process: 'Furniture return specialist assistance',
      },
      warranty: {
        period: '3 years',
        coverage: ['Manufacturing defects', 'Structural issues', 'Hardware replacement'],
      },
    },
    promotions: [
      {
        id: 'home-promo-1',
        type: 'announcement',
        title: 'New Home Collection',
        description: 'Discover our latest home decor and furniture pieces!',
        isActive: true,
      },
    ],
    products: createSellerProducts('home-harmony', 26),
    stats: {
      totalProducts: 26,
      totalSales: 9876,
      responseTime: '< 2 hours',
      joinedDate: 'February 2022',
    },
  },
  'active-gear': {
    id: 'active-gear',
    name: 'Active Gear',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/f59e0b/ffffff?text=Active+Gear',
    rating: 4.6,
    reviewCount: 1834,
    description: 'High-performance sports equipment and fitness gear. Gear up for your active lifestyle.',
    categories: ['Sports', 'Fitness', 'Outdoor'],
    href: '/seller/active-gear',
    isFeatured: true,
    specialization: 'Sports & Fitness',
    badges: ['Athletic Approved', 'Performance Gear', 'Fitness Expert'],
    socialLinks: {
      website: 'https://activegear.com',
      instagram: 'https://instagram.com/activegear',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: '$5.99', estimatedDays: '3-5', description: 'Reliable sports gear delivery' },
          { name: 'Express Shipping', price: '$14.99', estimatedDays: '1-2', description: 'Fast gear delivery' },
        ],
        freeShippingThreshold: '$60',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '45 days',
        conditions: ['Item must be unused', 'Original tags attached', 'Return shipping included'],
        process: 'Sports gear return specialist',
      },
      warranty: {
        period: '1 year',
        coverage: ['Manufacturing defects', 'Performance issues'],
      },
    },
    promotions: [
      {
        id: 'sports-promo-1',
        type: 'discount',
        title: '20% Off Fitness Gear',
        description: 'Get fit with 20% off all fitness equipment and gear!',
        discount: '20%',
        validUntil: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('active-gear', 22),
    stats: {
      totalProducts: 22,
      totalSales: 6543,
      responseTime: '< 3 hours',
      joinedDate: 'April 2022',
    },
  },
  'auto-experts': {
    id: 'auto-experts',
    name: 'Auto Experts',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/dc2626/ffffff?text=Auto+Experts',
    rating: 4.8,
    reviewCount: 2156,
    description: 'Quality automotive parts and accessories for all vehicles. Your trusted automotive partner.',
    categories: ['Automotive', 'Parts', 'Accessories'],
    href: '/seller/auto-experts',
    isFeatured: true,
    specialization: 'Automotive Solutions',
    badges: ['Auto Certified', 'Quality Parts', 'Expert Service'],
    socialLinks: {
      website: 'https://autoexperts.com',
      facebook: 'https://facebook.com/autoexperts',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on auto parts over $50' },
          { name: 'Express Auto Delivery', price: '$12.99', estimatedDays: '1-3', description: 'Fast auto parts delivery' },
        ],
        freeShippingThreshold: '$50',
        processingTime: '1-3 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unused', 'Original packaging', 'Compatible with vehicle'],
        process: 'Auto parts return specialist',
      },
      warranty: {
        period: '2 years',
        coverage: ['Manufacturing defects', 'Performance issues', 'Compatibility guarantee'],
      },
    },
    promotions: [
      {
        id: 'auto-promo-1',
        type: 'coupon',
        title: 'Auto Parts Discount',
        description: 'Save 15% on all auto parts with code AUTO15',
        code: 'AUTO15',
        discount: '15%',
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('auto-experts', 24),
    stats: {
      totalProducts: 24,
      totalSales: 11234,
      responseTime: '< 2 hours',
      joinedDate: 'November 2021',
    },
  },
  'book-haven': {
    id: 'book-haven',
    name: 'Book Haven',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/7c3aed/ffffff?text=Book+Haven',
    rating: 4.4,
    reviewCount: 892,
    description: 'Extensive collection of books across all genres and topics. Your literary destination.',
    categories: ['Books', 'Education'],
    href: '/seller/book-haven',
    isFeatured: false,
    specialization: 'Books & Education',
    badges: ['Literary Expert', 'Educational Resources', 'Wide Selection'],
    socialLinks: {
      website: 'https://bookhaven.com',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '5-7', description: 'Free shipping on book orders over $25' },
          { name: 'Express Shipping', price: '$8.99', estimatedDays: '2-3', description: 'Fast book delivery' },
        ],
        freeShippingThreshold: '$25',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Books must be in original condition', 'No writing or damage'],
        process: 'Book return specialist',
      },
      warranty: {
        period: '30 days',
        coverage: ['Printing defects', 'Binding issues'],
      },
    },
    promotions: [
      {
        id: 'book-promo-1',
        type: 'announcement',
        title: 'New Book Arrivals',
        description: 'Check out our latest book collection and bestsellers!',
        isActive: true,
      },
    ],
    products: createSellerProducts('book-haven', 18),
    stats: {
      totalProducts: 18,
      totalSales: 3456,
      responseTime: '< 4 hours',
      joinedDate: 'May 2022',
    },
  },
  'toy-world': {
    id: 'toy-world',
    name: 'Toy World',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/f97316/ffffff?text=Toy+World',
    rating: 4.3,
    reviewCount: 1245,
    description: 'Fun and educational toys for children of all ages. Spark imagination and learning.',
    categories: ['Toys', 'Kids', 'Education'],
    href: '/seller/toy-world',
    isFeatured: false,
    specialization: 'Children & Toys',
    badges: ['Child Safe', 'Educational', 'Fun Guaranteed'],
    socialLinks: {
      website: 'https://toyworld.com',
      facebook: 'https://facebook.com/toyworld',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on toy orders over $40' },
          { name: 'Express Shipping', price: '$9.99', estimatedDays: '2-3', description: 'Fast toy delivery' },
        ],
        freeShippingThreshold: '$40',
        processingTime: '1-3 business days',
      },
      returns: {
        period: '45 days',
        conditions: ['Toys must be unused', 'Original packaging', 'All parts included'],
        process: 'Toy return specialist',
      },
      warranty: {
        period: '1 year',
        coverage: ['Manufacturing defects', 'Safety issues'],
      },
    },
    promotions: [
      {
        id: 'toy-promo-1',
        type: 'discount',
        title: '15% Off Educational Toys',
        description: 'Learn and play with 15% off educational toys!',
        discount: '15%',
        validUntil: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('toy-world', 20),
    stats: {
      totalProducts: 20,
      totalSales: 4567,
      responseTime: '< 5 hours',
      joinedDate: 'August 2022',
    },
  },
  'health-plus': {
    id: 'health-plus',
    name: 'Health Plus',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/059669/ffffff?text=Health+Plus',
    rating: 4.5,
    reviewCount: 1678,
    description: 'Natural health supplements and wellness products. Your path to better health.',
    categories: ['Health', 'Supplements', 'Wellness'],
    href: '/seller/health-plus',
    isFeatured: false,
    specialization: 'Health & Supplements',
    badges: ['FDA Approved', 'Natural Products', 'Health Expert'],
    socialLinks: {
      website: 'https://healthplus.com',
      instagram: 'https://instagram.com/healthplus',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '3-5', description: 'Free shipping on health orders over $30' },
          { name: 'Express Health Delivery', price: '$6.99', estimatedDays: '1-2', description: 'Fast health product delivery' },
        ],
        freeShippingThreshold: '$30',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '60 days',
        conditions: ['Unopened supplements only', 'Original packaging', 'Expiration date valid'],
        process: 'Health product return specialist',
      },
      warranty: {
        period: '1 year',
        coverage: ['Product quality', 'Expiration guarantee'],
      },
    },
    promotions: [
      {
        id: 'health-promo-1',
        type: 'coupon',
        title: 'Health Boost',
        description: 'Get 20% off supplements with code HEALTH20',
        code: 'HEALTH20',
        discount: '20%',
        validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('health-plus', 19),
    stats: {
      totalProducts: 19,
      totalSales: 5678,
      responseTime: '< 3 hours',
      joinedDate: 'July 2022',
    },
  },
  'food-delights': {
    id: 'food-delights',
    name: 'Food Delights',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/dc2626/ffffff?text=Food+Delights',
    rating: 4.2,
    reviewCount: 967,
    description: 'Gourmet foods and specialty ingredients from around the world. Culinary excellence delivered.',
    categories: ['Food & Beverage', 'Gourmet', 'International'],
    href: '/seller/food-delights',
    isFeatured: false,
    specialization: 'Gourmet Foods',
    badges: ['Gourmet Quality', 'International Cuisine', 'Fresh Ingredients'],
    socialLinks: {
      website: 'https://fooddelights.com',
      instagram: 'https://instagram.com/fooddelights',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: '$7.99', estimatedDays: '2-4', description: 'Temperature-controlled food delivery' },
          { name: 'Express Food Delivery', price: '$15.99', estimatedDays: '1-2', description: 'Fast fresh food delivery' },
        ],
        processingTime: '1-2 business days',
      },
      returns: {
        period: '14 days',
        conditions: ['Perishable items non-returnable', 'Unopened packaged goods only'],
        process: 'Food return specialist',
      },
      warranty: {
        period: '30 days',
        coverage: ['Quality guarantee', 'Freshness guarantee'],
      },
    },
    promotions: [
      {
        id: 'food-promo-1',
        type: 'discount',
        title: '10% Off Gourmet Foods',
        description: 'Taste the world with 10% off gourmet international foods!',
        discount: '10%',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('food-delights', 16),
    stats: {
      totalProducts: 16,
      totalSales: 2345,
      responseTime: '< 6 hours',
      joinedDate: 'October 2022',
    },
  },
  'techworld-store': {
    id: 'techworld-store',
    name: 'TechWorld Store',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/3b82f6/ffffff?text=TechWorld+Store',
    rating: 4.7,
    reviewCount: 3421,
    description: 'Your ultimate destination for cutting-edge technology and innovative gadgets. Explore the future today.',
    categories: ['Electronics', 'Technology', 'Gadgets'],
    href: '/seller/techworld-store',
    isFeatured: true,
    specialization: 'Advanced Technology',
    badges: ['Tech Leader', 'Innovation Hub', 'Future Ready'],
    socialLinks: {
      website: 'https://techworld.com',
      twitter: 'https://twitter.com/techworld',
      instagram: 'https://instagram.com/techworld',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '3-5', description: 'Free shipping on tech orders over $75' },
          { name: 'Tech Express', price: '$12.99', estimatedDays: '1-2', description: 'Lightning-fast tech delivery' },
        ],
        freeShippingThreshold: '$75',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unused', 'Original packaging', 'All accessories included'],
        process: 'Tech return specialist support',
      },
      warranty: {
        period: '2 years',
        coverage: ['Manufacturing defects', 'Hardware failures', 'Software support'],
      },
    },
    promotions: [
      {
        id: 'techworld-promo-1',
        type: 'discount',
        title: '35% Off Latest Tech',
        description: 'Massive savings on the newest technology and gadgets!',
        discount: '35%',
        validUntil: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 'techworld-promo-2',
        type: 'coupon',
        title: 'Tech Bundle Deal',
        description: 'Buy 2 tech items and get 25% off with code TECH25',
        code: 'TECH25',
        discount: '25%',
        validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('techworld-store', 30),
    stats: {
      totalProducts: 30,
      totalSales: 16789,
      responseTime: '< 1 hour',
      joinedDate: 'December 2021',
    },
  },
  'home-essentials': {
    id: 'home-essentials',
    name: 'Home Essentials',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/10b981/ffffff?text=Home+Essentials',
    rating: 4.6,
    reviewCount: 1823,
    description: 'Quality home goods and essentials for modern living',
    categories: ['Home & Garden', 'Decor', 'Lighting'],
    href: '/seller/home-essentials',
    isFeatured: true,
    specialization: 'Home & Garden',
    badges: ['Quality Assured', 'Home Expert', 'Fast Shipping'],
    socialLinks: {
      website: 'https://homeessentials.com',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on orders over $40' },
          { name: 'Express Shipping', price: '$8.99', estimatedDays: '2-3', description: 'Fast home delivery' },
        ],
        freeShippingThreshold: '$40',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unused', 'Original packaging required'],
        process: 'Easy return process',
      },
      warranty: {
        period: '1 year',
        coverage: ['Manufacturing defects', 'Quality issues'],
      },
    },
    promotions: [
      {
        id: 'home-promo-1',
        type: 'announcement',
        title: 'New Home Collection',
        description: 'Discover our latest home essentials and decor!',
        isActive: true,
      },
    ],
    products: createSellerProducts('home-essentials', 22),
    stats: {
      totalProducts: 22,
      totalSales: 9200,
      responseTime: '< 3 hours',
      joinedDate: 'February 2022',
    },
  },
  'fashion-forward': {
    id: 'fashion-forward',
    name: 'Fashion Forward',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/ec4899/ffffff?text=Fashion+Forward',
    rating: 4.7,
    reviewCount: 3102,
    description: 'Trendy fashion and accessories for the modern lifestyle',
    categories: ['Fashion', 'Apparel', 'Accessories'],
    href: '/seller/fashion-forward',
    isFeatured: true,
    specialization: 'Fashion & Style',
    badges: ['Trendy', 'Style Expert', 'Premium Quality'],
    socialLinks: {
      website: 'https://fashionforward.com',
      instagram: 'https://instagram.com/fashionforward',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: '$4.99', estimatedDays: '3-5', description: 'Standard fashion delivery' },
          { name: 'Express Shipping', price: '$12.99', estimatedDays: '1-2', description: 'Fast fashion delivery' },
        ],
        freeShippingThreshold: '$60',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '30 days',
        conditions: ['Item must be unworn', 'Tags attached', 'Original condition'],
        process: 'Fashion return specialist',
      },
      warranty: {
        period: '6 months',
        coverage: ['Manufacturing defects', 'Quality issues'],
      },
    },
    promotions: [
      {
        id: 'fashion-promo-1',
        type: 'discount',
        title: '25% Off New Arrivals',
        description: 'Get the latest fashion trends with 25% off!',
        discount: '25%',
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('fashion-forward', 28),
    stats: {
      totalProducts: 28,
      totalSales: 22400,
      responseTime: '< 2 hours',
      joinedDate: 'January 2022',
    },
  },
  'fitness-pro': {
    id: 'fitness-pro',
    name: 'Fitness Pro',
    logo: null,
    coverImage: 'https://placehold.co/1200x300/f59e0b/ffffff?text=Fitness+Pro',
    rating: 4.9,
    reviewCount: 1567,
    description: 'Professional fitness equipment and health monitoring devices',
    categories: ['Fitness', 'Health', 'Sports'],
    href: '/seller/fitness-pro',
    isFeatured: true,
    specialization: 'Fitness & Health',
    badges: ['Professional Grade', 'Health Expert', 'Athletic Approved'],
    socialLinks: {
      website: 'https://fitnesspro.com',
      instagram: 'https://instagram.com/fitnesspro',
    },
    policies: {
      shipping: {
        methods: [
          { name: 'Standard Shipping', price: 'Free', estimatedDays: '4-6', description: 'Free shipping on fitness orders over $50' },
          { name: 'Express Shipping', price: '$11.99', estimatedDays: '2-3', description: 'Fast fitness delivery' },
        ],
        freeShippingThreshold: '$50',
        processingTime: '1-2 business days',
      },
      returns: {
        period: '45 days',
        conditions: ['Item must be unused', 'Original packaging', 'All accessories included'],
        process: 'Fitness equipment return specialist',
      },
      warranty: {
        period: '2 years',
        coverage: ['Manufacturing defects', 'Performance issues', 'Electronic components'],
      },
    },
    promotions: [
      {
        id: 'fitness-promo-1',
        type: 'discount',
        title: '30% Off Fitness Equipment',
        description: 'Get fit with 30% off professional fitness equipment!',
        discount: '30%',
        validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    products: createSellerProducts('fitness-pro', 25),
    stats: {
      totalProducts: 25,
      totalSales: 8900,
      responseTime: '< 2 hours',
      joinedDate: 'March 2022',
    },
  },
};

// Function to get seller shop data
export function getSellerShopData(sellerId: string): SellerShopData | null {
  return mockSellerShopData[sellerId] || null;
}

// Function to get seller products with filtering
export function getSellerProducts(
  sellerId: string,
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'name' | 'price' | 'rating' | 'newest';
    limit?: number;
  }
): Product[] {
  const sellerData = mockSellerShopData[sellerId];
  if (!sellerData) return [];

  let products = [...sellerData.products];

  // Apply filters
  if (filters) {
    if (filters.category && filters.category !== 'All') {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice !== undefined) {
      products = products.filter(p => {
        const price = parseFloat(p.price.replace('$', ''));
        return price >= filters.minPrice!;
      });
    }
    
    if (filters.maxPrice !== undefined) {
      products = products.filter(p => {
        const price = parseFloat(p.price.replace('$', ''));
        return price <= filters.maxPrice!;
      });
    }
    
    if (filters.minRating !== undefined) {
      products = products.filter(p => (p.rating || 0) >= filters.minRating!);
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          products.sort((a, b) => {
            const priceA = parseFloat(a.price.replace('$', ''));
            const priceB = parseFloat(b.price.replace('$', ''));
            return priceA - priceB;
          });
          break;
        case 'rating':
          products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          // For demo purposes, reverse the array to simulate newest first
          products.reverse();
          break;
      }
    }

    if (filters.limit) {
      products = products.slice(0, filters.limit);
    }
  }

  return products;
}