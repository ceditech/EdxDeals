import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { PromotionalGrid } from '@/components/home/promotional-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { AiRecommendations } from '@/components/home/ai-recommendations';
import { FlashDeals } from '@/components/home/flash-deals';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <PromotionalGrid />
        <Separator className="my-8 md:my-12" />
        <FeaturedProducts />
        <Separator className="my-8 md:my-12" />
        <FlashDeals />
        <Separator className="my-8 md:my-12" />
        <AiRecommendations />
      </main>
      <Footer />
    </div>
  );
}
