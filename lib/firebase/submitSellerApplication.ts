/**
 * Client-side submission for "Seller Application".
 * Saves a document to `seller_applications` and uploads an optional logo/file to:
 *   sellers/applications/{sellerSlug}-{timestamp}/logo.{ext}
 */

import { initFirestore, initStorage } from '../firebase';

export type SubmitSellerApplicationInput = {
  storeName: string;
  websiteUrl?: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  category: string;
  description: string;
  file?: File | null;
};

export type SubmitSellerApplicationResult = {
  applicationId: string;
  fileURL?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function submitSellerApplication(
  input: SubmitSellerApplicationInput
): Promise<SubmitSellerApplicationResult> {
  const {
    storeName,
    websiteUrl,
    contactName,
    contactEmail,
    phone,
    category,
    description,
    file,
  } = input;

  const db = await initFirestore();
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  const storage = await initStorage();
  // storage may be null; file upload remains optional.

  // @ts-ignore - Firebase v11 dynamic import
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

  let fileURL: string | undefined;

  if (file && storage) {
    const sellerSlug = slugify(storeName || 'seller');
    const ext =
      (file.name?.split('.').pop() || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') || 'bin';
    const objectPath = `sellers/applications/${sellerSlug}-${Date.now()}/logo.${ext}`;

    // @ts-ignore - Firebase v11 dynamic import
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

    const storageRef = ref(storage, objectPath);
    const snapshot = await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(snapshot.ref);
  }

  const docRef = await addDoc(collection(db, 'seller_applications'), {
    storeName,
    websiteUrl: websiteUrl || null,
    contactName,
    contactEmail,
    phone,
    category,
    description,
    fileURL: fileURL || null,
    createdAt: serverTimestamp(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  });

  return { applicationId: docRef.id, fileURL };
}