export const CATEGORIES = [
  'Electronics & Technology',
  'Fashion & Apparel', 
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors',
  'Automotive',
  'Books & Media',
  'Toys & Games',
  'Food & Beverages',
  'Jewelry & Accessories',
  'Art & Crafts',
  'Pet Supplies',
  'Office Supplies',
  'Musical Instruments',
  'Baby & Kids',
  'Tools & Hardware',
  'Travel & Luggage',
  'Furniture',
  'Appliances',
  'Other'
];

// Helper function to convert category name to URL slug
export const categoryToSlug = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s+&\s+|\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// Helper function to get category icon (emoji)
export const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'Electronics & Technology': '📱',
    'Fashion & Apparel': '👕',
    'Home & Garden': '🏡',
    'Health & Beauty': '💄',
    'Sports & Outdoors': '⚽',
    'Automotive': '🚗',
    'Books & Media': '📚',
    'Toys & Games': '🎮',
    'Food & Beverages': '🍕',
    'Jewelry & Accessories': '💍',
    'Art & Crafts': '🎨',
    'Pet Supplies': '🐕',
    'Office Supplies': '📎',
    'Musical Instruments': '🎵',
    'Baby & Kids': '👶',
    'Tools & Hardware': '🔧',
    'Travel & Luggage': '✈️',
    'Furniture': '🪑',
    'Appliances': '🔌',
    'Other': '📦'
  };
  
  return iconMap[category] || '📦';
};