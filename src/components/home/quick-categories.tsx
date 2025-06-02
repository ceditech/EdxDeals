import Link from 'next/link';
import { mockCategories } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function QuickCategories() {
  return (
    <section aria-labelledby="quick-categories-title" className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 id="quick-categories-title" className="text-2xl md:text-3xl font-headline font-semibold mb-6 text-center md:text-left">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {mockCategories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary transform hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                  <category.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm md:text-base font-medium text-center text-foreground group-hover:text-primary">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
