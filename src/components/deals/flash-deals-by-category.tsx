'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { CATEGORIES } from '@/lib/categories';
import { mockFlashDeals } from '@/lib/mock-data';
import UnifiedProductCard from '../home/unified-product-card';

export default function FlashDealsByCategory() {
  const isMobile = useIsMobile();

  const dealsByCategory = mockFlashDeals.reduce((acc, deal) => {
    const category = deal.category.replace(/ & /g, ' & ');
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(deal);
    return acc;
  }, {} as Record<string, typeof mockFlashDeals>);

  const renderCarousel = (deals: typeof mockFlashDeals | undefined) => {
    if (!deals || deals.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-10">
          No flash deals available in this category right now.
        </div>
      );
    }

    return (
      <Carousel
        opts={{
          align: 'start',
          loop: deals.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {deals.map((deal) => (
            <CarouselItem
              key={deal.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <UnifiedProductCard product={deal} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    );
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Flash Deals by Category
      </h2>

      {isMobile ? (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {CATEGORIES.map((category) => (
            <AccordionItem
              key={category}
              value={category}
              className="border rounded-lg"
            >
              <AccordionTrigger className="p-4 font-semibold text-lg hover:no-underline">
                {category}
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t">
                {renderCarousel(dealsByCategory[category])}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Tabs defaultValue={CATEGORIES[0]} className="w-full">
          <ScrollArea>
            <TabsList className="bg-transparent p-0 h-auto border-b">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-muted/50 data-[state=active]:shadow-none rounded-none border-r"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category} className="pt-6">
              {renderCarousel(dealsByCategory[category])}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}