'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UnifiedProductCard from '@/components/home/unified-product-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getBrandProducts, getBrandHotSales, getBrandBestSellers, getBrandFlashDeals, type BrandFlashItem } from '@/lib/brands';
import type { Product } from '@/types';
import { Clock } from 'lucide-react';

// Simple countdown for client-only flash items
function useCountdown(hoursFromNow: number) {
  const [target] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + hoursFromNow, d.getMinutes(), d.getSeconds(), 0);
    return d;
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

function FlashCard({ item }: { item: BrandFlashItem }) {
  const { product, endOffsetHours } = item;
  const { h, m, s } = useCountdown(endOffsetHours);

  return (
    <div className="relative">
      <Badge className="absolute top-2 left-2 z-20 bg-red-500 text-white">FLASH</Badge>
      <UnifiedProductCard product={product} showRating />
      <div className="absolute bottom-3 left-3 right-3">
        <div className="rounded-md bg-white/90 dark:bg-gray-900/90 border px-2 py-1 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-600" />
          <span className="tabular-nums">{String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</span>
        </div>
      </div>
    </div>
  );
}

export default function BrandModal({
  brand,
  onClose,
}: {
  brand: string | null;
  onClose: () => void;
}) {
  const open = !!brand;

  // Data sourcing (sync, deterministic)
  const all = useMemo<Product[]>(() => (brand ? getBrandProducts(brand) : []), [brand]);
  const hot = useMemo<Product[]>(() => (brand ? getBrandHotSales(brand) : []), [brand]);
  const best = useMemo<Product[]>(() => (brand ? getBrandBestSellers(brand, 12) : []), [brand]);
  const flash = useMemo<BrandFlashItem[]>(() => (brand ? getBrandFlashDeals(brand, 12) : []), [brand]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-5xl w-[95vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{brand ?? ''}</span>
            <div className="flex items-center gap-2">
              {all.length >= 6 && <Badge className="bg-amber-500 text-white">HOT</Badge>}
            </div>
          </DialogTitle>
          <DialogDescription>
            Browse {brand ?? ''} products by sales, deals, and popularity.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <Tabs defaultValue={hot.length ? 'hot' : best.length ? 'best' : flash.length ? 'flash' : 'all'} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="hot">Hot Sales</TabsTrigger>
              <TabsTrigger value="best">Best Sellers</TabsTrigger>
              <TabsTrigger value="flash">Flash Deals</TabsTrigger>
              <TabsTrigger value="all">All Products</TabsTrigger>
            </TabsList>

            <TabsContent value="hot">
              {hot.length === 0 ? (
                <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No hot sales for this brand right now.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hot.map(p => (
                    <div key={p.id} className="relative">
                      <Badge className="absolute top-2 left-2 z-20 bg-red-500 text-white">SALE</Badge>
                      <UnifiedProductCard product={p} showRating />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="best">
              {best.length === 0 ? (
                <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No best sellers yet.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {best.map(p => (
                    <div key={p.id} className="relative">
                      <Badge className="absolute top-2 left-2 z-20 bg-amber-500 text-white">BEST</Badge>
                      <UnifiedProductCard product={p} showRating />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="flash">
              {flash.length === 0 ? (
                <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No active flash deals.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flash.map(item => (
                    <FlashCard key={item.product.id} item={item} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all">
              {all.length === 0 ? (
                <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">No products for this brand.</div>
              ) : (
                <ScrollArea className="w-full rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
                    {all.map(p => (
                      <UnifiedProductCard key={p.id} product={p} showRating />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}