import { PromotionalGrid } from '@/components/home/promotional-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { AiRecommendations } from '@/components/home/ai-recommendations';
import { FlashDeals } from '@/components/home/flash-deals';
import ProductsGridNewArrivals from '@/components/home/products-grid-new-arrivals';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="bg-background">
      <PromotionalGrid />
      <Separator className="my-8 md:my-12" />
      <ProductsGridNewArrivals />
      <Separator className="my-8 md:my-12" />
      <FeaturedProducts />
      <Separator className="my-8 md:my-12" />
      <FlashDeals />
      <Separator className="my-8 md:my-12" />
      <AiRecommendations />
    </div>
  );
}
