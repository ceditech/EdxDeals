// Example component showing how to use Firebase services
import React, { useEffect, useState } from 'react';
import { initAuth, initFirestore, initStorage } from '../../lib/firebase';

export const FirebaseExample: React.FC = () => {
  const [authReady, setAuthReady] = useState(false);
  const [firestoreReady, setFirestoreReady] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    // Initialize Firebase services
    const initializeServices = async () => {
      try {
        const auth = await initAuth();
        if (auth) {
          setAuthReady(true);
          console.log('Firebase Auth initialized successfully');
        }

        const db = await initFirestore();
        if (db) {
          setFirestoreReady(true);
          console.log('Firestore initialized successfully');
        }

        const storage = await initStorage();
        if (storage) {
          setStorageReady(true);
          console.log('Firebase Storage initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing Firebase services:', error);
      }
    };

    initializeServices();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Firebase Integration Status</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${authReady ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Firebase Auth: {authReady ? 'Ready' : 'Not Ready'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${firestoreReady ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Firestore: {firestoreReady ? 'Ready' : 'Not Ready'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${storageReady ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Firebase Storage: {storageReady ? 'Ready' : 'Not Ready'}</span>
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;