'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ChevronDown } from 'lucide-react';

export default function FilterBar() {
  const [brand, setBrand] = useState('all');
  const [category, setCategory] = useState('all');
  const [seller, setSeller] = useState('all');

  return (
    <div className="bg-card p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search deals..." className="pl-10" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Brand: {brand} <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={brand} onValueChange={setBrand}>
                <DropdownMenuRadioItem value="all">All Brands</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="brand-a">Brand A</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="brand-b">Brand B</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Category: {category} <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="electronics">Electronics</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="home">Home</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Seller: {seller} <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={seller} onValueChange={setSeller}>
                <DropdownMenuRadioItem value="all">All Sellers</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="seller-a">Seller A</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="seller-b">Seller B</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}