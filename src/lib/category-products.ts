import type { Product } from '@/types';

// Helper function to convert slug back to category name
export const slugToCategory = (slug: string): string => {
  // Handle special cases for categories with '&'
  const slugToCategoryMap: { [key: string]: string } = {
    'electronics-technology': 'Electronics & Technology',
    'fashion-apparel': 'Fashion & Apparel',
    'home-garden': 'Home & Garden',
    'health-beauty': 'Health & Beauty',
    'sports-outdoors': 'Sports & Outdoors',
    'books-media': 'Books & Media',
    'toys-games': 'Toys & Games',
    'food-beverages': 'Food & Beverages',
    'jewelry-accessories': 'Jewelry & Accessories',
    'art-crafts': 'Art & Crafts',
    'pet-supplies': 'Pet Supplies',
    'office-supplies': 'Office Supplies',
    'musical-instruments': 'Musical Instruments',
    'baby-kids': 'Baby & Kids',
    'tools-hardware': 'Tools & Hardware',
    'travel-luggage': 'Travel & Luggage',
    'automotive': 'Automotive',
    'furniture': 'Furniture',
    'appliances': 'Appliances',
    'other': 'Other',
  };

  // Check if we have a specific mapping
  if (slugToCategoryMap[slug]) {
    return slugToCategoryMap[slug];
  }

  // Fallback: convert slug to title case
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate mock products for any category
export const generateMockProductsForCategory = (category: string): Product[] => {
  const productTemplates = [
    { name: 'Premium Product A', price: '$129.99', originalPrice: '$179.99', rating: 4.5, reviewCount: 234 },
    { name: 'Best Seller Product B', price: '$89.99', originalPrice: '$119.99', rating: 4.3, reviewCount: 189 },
    { name: 'Top Rated Product C', price: '$79.99', originalPrice: '$99.99', rating: 4.6, reviewCount: 156 },
    { name: 'Popular Product D', price: '$59.99', originalPrice: '$79.99', rating: 4.4, reviewCount: 298 },
    { name: 'Featured Product E', price: '$29.99', originalPrice: '$39.99', rating: 4.2, reviewCount: 87 },
    { name: 'Trending Product F', price: '$39.99', originalPrice: '$59.99', rating: 4.7, reviewCount: 143 },
    { name: 'New Arrival Product G', price: '$24.99', originalPrice: '$34.99', rating: 4.1, reviewCount: 76 },
    { name: 'Customer Choice Product H', price: '$34.99', rating: 4.5, reviewCount: 112 },
    { name: 'Editors Pick Product I', price: '$49.99', originalPrice: '$69.99', rating: 4.3, reviewCount: 203 },
    { name: 'Bestselling Product J', price: '$64.99', originalPrice: '$89.99', rating: 4.6, reviewCount: 167 },
  ];

  return productTemplates.map((template, index) => ({
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    name: `${category} ${template.name}`,
    imageUrl: `/images/category/${category.toLowerCase().replace(/\s+/g, '-')}/product-${index + 1}.jpg`,
    price: template.price,
    originalPrice: template.originalPrice,
    category: category,
    rating: template.rating,
    reviewCount: template.reviewCount,
  }));
};

// Function to get products for a category
export const getProductsByCategory = (categoryName: string): Product[] => {
  return generateMockProductsForCategory(categoryName);
};