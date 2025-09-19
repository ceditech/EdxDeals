import { getSellerShopData, mockSellerShopData } from './seller-mock-data';
import type { SellerShopData } from './seller-mock-data';

/**
 * Centralized utility to find a seller store by slug or ID
 * Checks all available data sources (mock, Firestore, etc.)
 * 
 * @param slugOrId - The seller slug or ID to search for
 * @returns SellerShopData if found, null otherwise
 */
export function findSellerStore(slugOrId: string): SellerShopData | null {
  // First check by ID using existing mock data function
  const byId = getSellerShopData(slugOrId);
  if (byId) return byId;

  // Then check by slug in mock data - search through all sellers
  const allSellers = Object.values(mockSellerShopData);
  const bySlug = allSellers.find(seller => 
    seller.id === slugOrId || 
    seller.href === `/seller/${slugOrId}` ||
    seller.name.toLowerCase().replace(/\s+/g, '-') === slugOrId
  );
  
  if (bySlug) return bySlug;

  // TODO: Add Firestore/DB lookup when implemented
  // const fromFirestore = await getSellerFromFirestore(slugOrId);
  // if (fromFirestore) return fromFirestore;

  return null;
}

/**
 * Navigation handler for seller store links
 * Uses findSellerStore to validate existence before navigation
 * 
 * @param slugOrId - The seller slug or ID to navigate to
 * @param router - Next.js router instance
 * @returns Promise<void>
 */
export async function handleSellerNavigation(
  slugOrId: string,
  router: { push: (url: string) => void }
): Promise<void> {
  const seller = findSellerStore(slugOrId);
  
  if (seller) {
    // Seller exists, navigate to their store
    router.push(`/seller/${seller.id}`);
  } else {
    // Seller not found, show not found page
    router.push('/seller/not-found');
  }
}

/**
 * Check if a seller store exists
 * 
 * @param slugOrId - The seller slug or ID to check
 * @returns boolean indicating if seller exists
 */
export function sellerExists(slugOrId: string): boolean {
  return findSellerStore(slugOrId) !== null;
}