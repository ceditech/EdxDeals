'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingBag } from 'lucide-react';
import type { DetailedProduct } from '@/types/product-detail';
import type { Product } from '@/types';
import { getProductById, getRelatedProducts as getRelatedProductsFromDB, getComparisonProducts as getComparisonProductsFromDB } from '@/lib/product-database';
import { generateMockProductsForCategory } from '@/lib/category-products';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Load product data
  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const productData = getProductById(productId);
        setProduct(productData);
        setIsLoading(false);
      }, 800);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
        });
      }
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
      });
    }
  };

  // Get dynamic related and comparison products
  const comparisonProducts = product ? getComparisonProductsFromDB(product.id, product.category) : [];
  const relatedProductsFromDB = product ? getRelatedProductsFromDB(product.id, product.category) : [];
  
  // Convert DetailedProduct to Product format for UnifiedProductCard
  const relatedProducts: Product[] = relatedProductsFromDB.map(p => ({
    id: p.id,
    name: p.name,
    imageUrl: p.images[0],
    price: `$${p.price.toFixed(2)}`,
    originalPrice: p.oldPrice ? `$${p.oldPrice.toFixed(2)}` : undefined,
    category: p.category,
    rating: p.rating,
    reviewCount: p.reviews,
  }));

  // If no related products in database, generate some from category
  const finalRelatedProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : product 
      ? generateMockProductsForCategory(product.category).slice(0, 4)
      : [];

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded-lg w-20 h-20"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center px-4 py-8 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                  <ShoppingBag className="h-32 w-32 text-muted-foreground opacity-40" />
                </div>
                
                {discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground opacity-40" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buy Box Sidebar */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold leading-tight mb-2">{product.name}</h1>
                    {product.brand && (
                      <p className="text-muted-foreground">by {product.brand}</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        You save ${(product.oldPrice! - product.price).toFixed(2)} ({discount}%)
                      </Badge>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">
                      In Stock ({product.stockCount} available)
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <span className="text-lg">−</span>
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stockCount || 10, quantity + 1))}
                        disabled={quantity >= (product.stockCount || 10)}
                      >
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button onClick={handleAddToCart} className="w-full h-12 text-lg font-medium">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleAddToWishlist}
                      className="w-full h-12 text-lg font-medium"
                      disabled={inWishlist}
                    >
                      <span className="mr-2">{inWishlist ? '💙' : '🤍'}</span>
                      {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>

                  {/* Delivery Info */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚚</span>
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-sm text-muted-foreground">Arrives by tomorrow</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🛡️</span>
                      <div>
                        <p className="font-medium">Secure Purchase</p>
                        <p className="text-sm text-muted-foreground">Protected by EdxDeals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏆</span>
                      <div>
                        <p className="font-medium">Quality Guaranteed</p>
                        <p className="text-sm text-muted-foreground">30-day return policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-blue-900 mb-2">🎉 Special Offer</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Buy 2 or more and save an additional 10%
                </p>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About this item</h3>
                  <p className="text-muted-foreground mb-6">{product.fullDesc}</p>
                  
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="warranty" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Warranty Information</h3>
                  <p className="text-muted-foreground mb-4">{product.warranty}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🛡️</span>
                      <span className="text-sm">Manufacturer warranty included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏆</span>
                      <span className="text-sm">Extended warranty available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Compare with Similar Items */}
        {comparisonProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Compare with similar items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonProducts.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-40" />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">{item.rating}</span>
                    </div>
                    <p className="text-lg font-bold text-green-600 mb-2">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>
                    <Link href={`/product/${item.id}`}>
                      <Button variant="outline" className="w-full">
                        View Product
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {finalRelatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {finalRelatedProducts.map((product) => (
                <UnifiedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}