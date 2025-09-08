import { mockFeaturedProducts } from '@/lib/mock-data';
import UnifiedProductCard from './unified-product-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function FeaturedProducts() {
  return (
    <section aria-labelledby="featured-products-title" className="py-8 md:py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 id="featured-products-title" className="text-2xl md:text-3xl font-headline font-semibold mb-6 text-center md:text-left">
          Featured & Trending
        </h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 pb-4">
            {mockFeaturedProducts.map((product) => (
              <div key={product.id} className="w-[250px] sm:w-[280px] lg:w-[300px]">
                 <UnifiedProductCard product={product} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
