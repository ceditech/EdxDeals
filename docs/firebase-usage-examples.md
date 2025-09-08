# Firebase Usage Examples for EdxDeals

This document provides examples of how to use the Firebase integration in your EdxDeals application.

## Basic Setup

The Firebase configuration is automatically loaded from your `.env.local` file and initialized in `/lib/firebase.ts`.

## Authentication Examples

```typescript
import { initAuth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Sign in user
export const signInUser = async (email: string, password: string) => {
  const auth = await initAuth();
  if (auth) {
    return await signInWithEmailAndPassword(auth, email, password);
  }
  throw new Error('Auth not initialized');
};

// Create new user
export const createUser = async (email: string, password: string) => {
  const auth = await initAuth();
  if (auth) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  throw new Error('Auth not initialized');
};

// Sign out user
export const signOutUser = async () => {
  const auth = await initAuth();
  if (auth) {
    return await signOut(auth);
  }
};
```

## Firestore Examples

```typescript
import { initFirestore } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Add a product
export const addProduct = async (productData: any) => {
  const db = await initFirestore();
  if (db) {
    return await addDoc(collection(db, 'products'), productData);
  }
  throw new Error('Firestore not initialized');
};

// Get all products
export const getProducts = async () => {
  const db = await initFirestore();
  if (db) {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  return [];
};

// Get single product
export const getProduct = async (productId: string) => {
  const db = await initFirestore();
  if (db) {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  }
  return null;
};

// Update product
export const updateProduct = async (productId: string, updates: any) => {
  const db = await initFirestore();
  if (db) {
    const docRef = doc(db, 'products', productId);
    return await updateDoc(docRef, updates);
  }
  throw new Error('Firestore not initialized');
};

// Delete product
export const deleteProduct = async (productId: string) => {
  const db = await initFirestore();
  if (db) {
    const docRef = doc(db, 'products', productId);
    return await deleteDoc(docRef);
  }
  throw new Error('Firestore not initialized');
};
```

## Storage Examples

```typescript
import { initStorage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Upload product image
export const uploadProductImage = async (file: File, productId: string) => {
  const storage = await initStorage();
  if (storage) {
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }
  throw new Error('Storage not initialized');
};

// Delete product image
export const deleteProductImage = async (imagePath: string) => {
  const storage = await initStorage();
  if (storage) {
    const imageRef = ref(storage, imagePath);
    return await deleteObject(imageRef);
  }
  throw new Error('Storage not initialized');
};
```

## React Hook Example

```typescript
import { useState, useEffect } from 'react';
import { initAuth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const auth = await initAuth();
      if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
        return unsubscribe;
      }
      setLoading(false);
    };

    let unsubscribe: (() => void) | undefined;
    initializeAuth().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { user, loading };
};
```

## Next.js API Route Example

```typescript
// pages/api/products.ts
import { initFirestore } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await initFirestore();
      if (db) {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        res.status(200).json(products);
      } else {
        res.status(500).json({ error: 'Database not initialized' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## Environment Variables

Make sure your `.env.local` file contains all the required Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Security Rules

Remember to configure your Firebase Security Rules for Firestore and Storage:

### Firestore Rules Example
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products for all users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User-specific data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules Example
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}