"use client";

import { useEffect, useState } from 'react';
import { personalizedProductRecommendations, type PersonalizedProductRecommendationsOutput } from '@/ai/flows/personalized-product-recommendations';
import { ProductCard } from './product-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import type { Product } from '@/types';

// Enhanced mock product data specifically for AI recommendations demonstration
const aiMockProducts: Product[] = [
  { id: 'ai-smw-01', name: 'AI-Enhanced Smartwatch Series X', imageUrl: 'https://placehold.co/300x300.png', price: '$279', category: 'Electronics', dataAiHint: 'smartwatch fitness' },
  { id: 'ai-chair-02', name: 'Adaptive Ergonomic AI Chair', imageUrl: 'https://placehold.co/300x300.png', price: '$499', category: 'Home Office', dataAiHint: 'office chair ergonomics' },
  { id: 'ai-hdp-03', name: 'Immersive AI Noise-Cancelling Headphones', imageUrl: 'https://placehold.co/300x300.png', price: '$199', category: 'Audio', dataAiHint: 'headphones sound' },
  { id: 'ai-book-04', name: 'AI & The Future of Work', imageUrl: 'https://placehold.co/300x300.png', price: '$29', category: 'Books', dataAiHint: 'book technology' },
  { id: 'ai-plant-05', name: 'Smart Self-Watering Plant Pot', imageUrl: 'https://placehold.co/300x300.png', price: '$79', category: 'Smart Home', dataAiHint: 'plant pot' },
];

export function AiRecommendations() {
  const [recommendations, setRecommendations] = useState<PersonalizedProductRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchRecommendations() {
      try {
        // User preferences can be fetched or derived from user context
        const userPreferences = "User is a tech enthusiast, interested in productivity gadgets, smart home devices, and enjoys reading about future technology.";
        const result = await personalizedProductRecommendations({ userPreferences });
        setRecommendations(result);
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
        setError("Sorry, we couldn't fetch personalized recommendations at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (!isClient) {
     return (
      <section aria-labelledby="ai-recommendations-title" className="py-8 md:py-12 bg-card rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 id="ai-recommendations-title" className="text-2xl md:text-3xl font-headline font-semibold mb-6 text-center text-foreground">
            ✨ AI Recommendations For You ✨
          </h2>
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-md text-muted-foreground">Loading personal picks...</p>
          </div>
        </div>
      </section>
    );
  }
  
  const recommendedProductsToDisplay: Product[] = recommendations?.recommendations.map((name, index) => {
    // Attempt to find a more relevant mock product or create a generic one
    const nameLower = name.toLowerCase();
    let mockMatch = aiMockProducts.find(p => nameLower.includes(p.name.toLowerCase().split(" ")[0]) || nameLower.includes(p.category.toLowerCase()));
    if (!mockMatch && aiMockProducts.length > 0) {
        mockMatch = aiMockProducts[index % aiMockProducts.length]; // Cycle through mock products
    }

    return {
      id: mockMatch?.id ? `${mockMatch.id}-${index}`: `ai-rec-${index}`,
      name: name, // Use the AI-generated name
      imageUrl: mockMatch?.imageUrl || `https://placehold.co/300x300.png`,
      price: mockMatch?.price || `$${Math.floor(Math.random() * 200 + 50)}`,
      category: mockMatch?.category || 'Specially Recommended',
      dataAiHint: mockMatch?.dataAiHint || 'personalized item'
    };
  }).slice(0, 4) || []; // Limit to 4 recommendations for display

  return (
    <section aria-labelledby="ai-recommendations-title" className="py-8 md:py-12 bg-card rounded-lg shadow-lg">
      <div className="container mx-auto px-4">
        <h2 id="ai-recommendations-title" className="text-2xl md:text-3xl font-headline font-semibold mb-8 text-center text-foreground">
          ✨ AI Recommendations For You ✨
        </h2>
        {loading && (
          <div className="flex flex-col justify-center items-center h-60">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Crafting your personalized selections...</p>
          </div>
        )}
        {error && !loading && (
          <Alert variant="destructive" className="max-w-lg mx-auto shadow-md">
            <AlertTitle className="font-semibold">Recommendation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!loading && !error && recommendedProductsToDisplay.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProductsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!loading && !error && recommendations && recommendations.recommendations.length === 0 && (
           <p className="text-center text-muted-foreground text-lg py-10">We're working on finding recommendations for you. Explore our categories for now!</p>
        )}
      </div>
    </section>
  );
}
