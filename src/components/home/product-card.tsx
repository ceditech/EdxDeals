import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col h-full group">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || product.category.toLowerCase()}
          />
        </Link>
        {product.originalPrice && (
           <Badge variant="destructive" className="absolute top-2 right-2 bg-accent text-accent-foreground">SALE</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.id}`} className="hover:text-primary">
          <CardTitle className="text-lg font-semibold leading-tight mb-1 font-body truncate" title={product.name}>
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
        
        <div className="flex items-center mb-2">
          {product.rating && (
            <>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-xs text-muted-foreground">({product.reviewCount || 0})</span>
            </>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-xl font-semibold text-primary">{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" aria-label={`Add ${product.name} to cart`}>
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
