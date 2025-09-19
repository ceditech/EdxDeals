/**
 * Client-side Firestore + Storage submission for "Partner With Us" applications.
 * Saves a document to `brands_applications` and uploads an optional logo/file to:
 *   brands/applications/{brandSlug}-{timestamp}/logo.{ext}
 */

import { initFirestore, initStorage } from '../firebase';

export type SubmitBrandApplicationInput = {
  brandName: string;
  websiteUrl?: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  category: string;
  description: string;
  file?: File | null;
};

export type SubmitBrandApplicationResult = {
  applicationId: string;
  fileURL?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function submitBrandApplication(
  input: SubmitBrandApplicationInput
): Promise<SubmitBrandApplicationResult> {
  const {
    brandName,
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
  // storage can be null; file upload is optional regardless

  // Dynamic import Firestore helpers to avoid TS module resolution issues (Firebase v11)
  // @ts-ignore
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

  let fileURL: string | undefined;

  if (file && storage) {
    const brandSlug = slugify(brandName || 'brand');
    const ext =
      (file.name?.split('.').pop() || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') || 'bin';
    const objectPath = `brands/applications/${brandSlug}-${Date.now()}/logo.${ext}`;

    // @ts-ignore
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

    const storageRef = ref(storage, objectPath);
    const snapshot = await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(snapshot.ref);
  }

  const docRef = await addDoc(collection(db, 'brands_applications'), {
    brandName,
    websiteUrl: websiteUrl || null,
    contactName,
    contactEmail,
    phone,
    category,
    description,
    fileURL: fileURL || null,
    createdAt: serverTimestamp(),
    // basic client meta
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  });

  return { applicationId: docRef.id, fileURL };
}