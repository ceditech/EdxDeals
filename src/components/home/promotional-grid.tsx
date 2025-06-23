import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PromoCard = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={cn("overflow-hidden group w-full", className)}>
    <Link href={href} className="flex flex-col h-full">
      {children}
    </Link>
  </Card>
);

export function PromotionalGrid() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <PromoCard href="/deals/grad-cards" className="bg-gray-100 min-h-[250px]">
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Grad cards from 98¢</h3>
                  <p className="text-sm text-primary hover:underline font-medium">Shop now</p>
                </div>
                <div className="relative h-32 -mb-4 -mr-4 self-end">
                  <Image
                    src="https://placehold.co/300x200.png"
                    alt="Graduation cards"
                    width={200}
                    height={133}
                    className="object-contain object-bottom-right transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="graduation card"
                  />
                </div>
              </div>
            </PromoCard>

            <PromoCard href="/collections/beauty" className="bg-orange-50 flex-grow">
              <div className="p-4 flex flex-col h-full">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Hot, new beauty from $10</h3>
                  <p className="text-sm text-primary hover:underline font-medium">Shop now</p>
                </div>
                <div className="relative flex-grow mt-2">
                  <Image
                    src="https://placehold.co/400x500.png"
                    alt="Beauty products"
                    fill
                    className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="beauty products cosmetics"
                  />
                </div>
              </div>
            </PromoCard>
          </div>
          
          {/* Column 2 & 3 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <PromoCard href="/collections/pet-supplies" className="relative text-white min-h-[300px] flex-grow">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Pet supplies"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="pet food supplies"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative p-6 flex flex-col h-full">
                <p className="text-sm">Get it in as soon as an hour*</p>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight my-1 drop-shadow-md">Save on 1,000s of pet picks</h2>
                <Button variant="secondary" className="mt-4 w-fit">Shop now</Button>
              </div>
            </PromoCard>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PromoCard href="/collections/home-decor" className="relative text-black min-h-[220px]">
                 <Image
                    src="https://placehold.co/400x300.png"
                    alt="Summer home trends"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="living room furniture"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative p-4">
                    <h3 className="font-bold text-lg">Summer home trends</h3>
                    <p className="text-sm hover:underline font-medium">Shop home</p>
                  </div>
              </PromoCard>
              <PromoCard href="/deals" className="bg-yellow-200 text-foreground min-h-[220px]">
                 <div className="p-4 flex flex-col h-full">
                    <div>
                      <h3 className="font-bold text-lg">Up to 40% off</h3>
                      <p className="text-sm text-primary hover:underline font-medium">Shop now</p>
                    </div>
                    <div className="relative flex-grow -mr-4">
                       <Image
                          src="https://placehold.co/200x200.png"
                          alt="Flash deals"
                          fill
                          className="object-contain object-bottom-right transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint="stepladder tool"
                        />
                    </div>
                    <p className="font-extrabold text-xl md:text-2xl text-right -mb-2">Flash Deals</p>
                 </div>
              </PromoCard>
            </div>
          </div>
          
          {/* Column 4 */}
          <div className="flex flex-col gap-4">
             <PromoCard href="/deals/grad-party" className="bg-gray-50 min-h-[220px]">
               <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Grad party supplies—to you fast</h3>
                    <p className="text-sm text-primary hover:underline font-medium">Shop supplies</p>
                  </div>
                  <div className="relative h-28 -mb-4 -mr-4 self-end">
                    <Image
                      src="https://placehold.co/300x200.png"
                      alt="Graduation party supplies"
                      width={150}
                      height={100}
                      className="object-contain object-right-bottom transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="party supplies"
                    />
                  </div>
                </div>
             </PromoCard>

             <PromoCard href="/collections/beauty-event" className="bg-blue-50 min-h-[220px]">
               <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">1,000s of finds, for way less</h3>
                    <p className="text-sm text-primary hover:underline font-medium">Shop now</p>
                  </div>
                  <div className="relative h-28 -mb-4 -mr-4 self-end">
                    <Image
                      src="https://placehold.co/300x200.png"
                      alt="Beauty event product"
                       width={150}
                      height={100}
                      className="object-contain object-right-bottom transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="beauty products"
                    />
                  </div>
                </div>
             </PromoCard>

             <PromoCard href="/collections/memorial-day" className="bg-gray-50 flex-grow">
                <div className="p-4 flex flex-col h-full">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Memorial Day faves</h3>
                    <p className="text-sm text-primary hover:underline font-medium">Shop now</p>
                  </div>
                  <div className="relative flex-grow mt-2">
                    <Image
                      src="https://placehold.co/400x200.png"
                      alt="Memorial Day favorites"
                      fill
                      className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="memorial day party"
                    />
                  </div>
                </div>
             </PromoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
