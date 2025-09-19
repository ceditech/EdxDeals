// lib/firebase/sellers.ts
// Firestore-backed sellers listing with graceful fallback to mock data

import { initFirestore } from '../firebase';

export type Seller = {
  id: string;
  name: string;
  logo?: string | null;
  rating: number;
  reviewCount: number;
  description: string;
  categories: string[];
  href: string; // seller storefront route
  isFeatured?: boolean;
  specialization?: string;
};

export type SellerQuery = {
  keyword?: string;
  category?: string;
  minRating?: number;
  limit?: number;
};

const MOCK_SELLERS: Seller[] = [
  // Featured Sellers
  {
    id: 'stellar-tech',
    name: 'Stellar Tech',
    logo: null,
    rating: 4.8,
    reviewCount: 2847,
    description: 'Cutting-edge electronics and smart devices at great prices.',
    categories: ['Electronics', 'Smart Home', 'Accessories'],
    href: '/seller/stellar-tech',
    isFeatured: true,
    specialization: 'Premium Electronics',
  },
  {
    id: 'comfort-threads',
    name: 'Comfort Threads',
    logo: null,
    rating: 4.6,
    reviewCount: 1923,
    description: 'Premium comfort apparel for everyday living.',
    categories: ['Apparel', 'Lifestyle'],
    href: '/seller/comfort-threads',
    isFeatured: true,
    specialization: 'Fashion & Lifestyle',
  },
  {
    id: 'kitchen-gurus',
    name: 'Kitchen Gurus',
    logo: null,
    rating: 4.7,
    reviewCount: 3156,
    description: 'Professional-grade kitchen appliances and cookware.',
    categories: ['Home', 'Appliances', 'Kitchen'],
    href: '/seller/kitchen-gurus',
    isFeatured: true,
    specialization: 'Kitchen Essentials',
  },
  {
    id: 'beauty-lab',
    name: 'Beauty Lab',
    logo: null,
    rating: 4.5,
    reviewCount: 1567,
    description: 'Clean beauty and self-care essentials.',
    categories: ['Beauty', 'Health'],
    href: '/seller/beauty-lab',
    isFeatured: true,
    specialization: 'Beauty & Wellness',
  },
  {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    logo: null,
    rating: 4.9,
    reviewCount: 4231,
    description: 'Latest gadgets and innovative tech solutions for modern life.',
    categories: ['Electronics', 'Gadgets', 'Innovation'],
    href: '/seller/tech-innovators',
    isFeatured: true,
    specialization: 'Tech Innovation',
  },
  {
    id: 'home-harmony',
    name: 'Home Harmony',
    logo: null,
    rating: 4.7,
    reviewCount: 2689,
    description: 'Transform your space with stylish home decor and furniture.',
    categories: ['Home', 'Furniture', 'Decor'],
    href: '/seller/home-harmony',
    isFeatured: true,
    specialization: 'Home & Decor',
  },
  {
    id: 'active-gear',
    name: 'Active Gear',
    logo: null,
    rating: 4.6,
    reviewCount: 1834,
    description: 'High-performance sports equipment and fitness gear.',
    categories: ['Sports', 'Fitness', 'Outdoor'],
    href: '/seller/active-gear',
    isFeatured: true,
    specialization: 'Sports & Fitness',
  },
  {
    id: 'auto-experts',
    name: 'Auto Experts',
    logo: null,
    rating: 4.8,
    reviewCount: 2156,
    description: 'Quality automotive parts and accessories for all vehicles.',
    categories: ['Automotive', 'Parts', 'Accessories'],
    href: '/seller/auto-experts',
    isFeatured: true,
    specialization: 'Automotive Solutions',
  },
  // Regular Sellers
  {
    id: 'book-haven',
    name: 'Book Haven',
    logo: null,
    rating: 4.4,
    reviewCount: 892,
    description: 'Extensive collection of books across all genres and topics.',
    categories: ['Books', 'Education'],
    href: '/seller/book-haven',
    isFeatured: false,
    specialization: 'Books & Education',
  },
  {
    id: 'toy-world',
    name: 'Toy World',
    logo: null,
    rating: 4.3,
    reviewCount: 1245,
    description: 'Fun and educational toys for children of all ages.',
    categories: ['Toys', 'Kids', 'Education'],
    href: '/seller/toy-world',
    isFeatured: false,
    specialization: 'Children & Toys',
  },
  {
    id: 'health-plus',
    name: 'Health Plus',
    logo: null,
    rating: 4.5,
    reviewCount: 1678,
    description: 'Natural health supplements and wellness products.',
    categories: ['Health', 'Supplements', 'Wellness'],
    href: '/seller/health-plus',
    isFeatured: false,
    specialization: 'Health & Supplements',
  },
  {
    id: 'food-delights',
    name: 'Food Delights',
    logo: null,
    rating: 4.2,
    reviewCount: 967,
    description: 'Gourmet foods and specialty ingredients from around the world.',
    categories: ['Food & Beverage', 'Gourmet', 'International'],
    href: '/seller/food-delights',
    isFeatured: false,
    specialization: 'Gourmet Foods',
  },
];

function applyClientFilters(data: Seller[], q: SellerQuery): Seller[] {
  let list = [...data];
  if (q.keyword?.trim()) {
    const kw = q.keyword.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw) ||
        s.categories.some((c) => c.toLowerCase().includes(kw)),
    );
  }
  if (q.category && q.category !== 'All') {
    const cat = q.category.toLowerCase();
    list = list.filter((s) => s.categories.some((c) => c.toLowerCase() === cat));
  }
  if (typeof q.minRating === 'number') {
    list = list.filter((s) => s.rating >= (q.minRating ?? 0));
  }
  if (q.limit && q.limit > 0) {
    list = list.slice(0, q.limit);
  }
  return list;
}

/**
 * Fetch sellers from Firestore `sellers` collection.
 * Gracefully falls back to in-memory mock data if Firestore isn't available.
 */
export async function fetchSellers(query: SellerQuery = {}): Promise<Seller[]> {
  const db = await initFirestore();
  if (!db) {
    return applyClientFilters(MOCK_SELLERS, query);
  }

  try {
    // @ts-ignore Firebase v11 dynamic import
    const { collection, getDocs, query: fbQuery, limit: fbLimit } = await import('firebase/firestore');
    const sellersCol = collection(db, 'sellers');

    // For simplicity, get a limited batch from server; apply client filters after
    const q =
      typeof query.limit === 'number' && query.limit > 0
        ? fbQuery(sellersCol, fbLimit(Math.max(1, Math.min(100, query.limit))))
        : sellersCol;

    const snap = await getDocs(q);
    const serverData: Seller[] = snap.docs.map((d: any) => {
      const v = d.data() || {};
      return {
        id: d.id,
        name: v.name ?? 'Unknown Store',
        logo: v.logo ?? null,
        rating: typeof v.rating === 'number' ? v.rating : 0,
        reviewCount: typeof v.reviewCount === 'number' ? v.reviewCount : 0,
        description: v.description ?? '',
        categories: Array.isArray(v.categories) ? v.categories : [],
        href: v.href ?? `/seller/${d.id}`,
        isFeatured: Boolean(v.isFeatured),
        specialization: v.specialization ?? '',
      } as Seller;
    });

    return applyClientFilters(serverData, query);
  } catch (e) {
    console.warn('fetchSellers fallback to mock (error querying Firestore):', e);
    return applyClientFilters(MOCK_SELLERS, query);
  }
}

/**
 * Fetch only featured sellers for the default display
 */
export async function fetchFeaturedSellers(limit: number = 8): Promise<Seller[]> {
  // For now, always return mock featured sellers to ensure they display
  // This can be updated later when Firebase is properly configured
  const featuredSellers = MOCK_SELLERS.filter(seller => seller.isFeatured === true);
  console.log('fetchFeaturedSellers: Found', featuredSellers.length, 'featured sellers');
  return featuredSellers.slice(0, limit);
}