export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  dataAiHint?: string; // For placeholder images
}

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType; // Lucide icon component
  href: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  dataAiHint?: string; // For placeholder images
}

export interface Deal extends Product {
  endDate: Date;
}
