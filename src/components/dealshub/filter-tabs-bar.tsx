'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter } from 'lucide-react';
import ElegantSearchBar from './elegant-search-bar';

const TABS = [
  'All Deals',
  'Hot Deals',
  'Flash Deals',
  'Best Deals',
  'Closeouts',
  'Open Box',
  'Clearance',
  'Ads/Sponsored',
];

export default function FilterTabsBar() {
  return (
    <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Elegant Search Bar - left aligned on desktop, full width on mobile */}
          <div className="w-full md:w-auto">
            <ElegantSearchBar className="w-full md:w-[450px] lg:w-[500px]" />
          </div>

          {/* Tabs / categories */}
          <Tabs defaultValue={TABS[0]} className="w-full md:flex-1">
            <TabsList className="overflow-x-auto justify-start md:justify-center">
              {TABS.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Filters menu button - right side */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" aria-label="Open filters menu">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>By Brand</DropdownMenuItem>
                <DropdownMenuItem>By Category</DropdownMenuItem>
                <DropdownMenuItem>By Price</DropdownMenuItem>
                <DropdownMenuItem>By Seller</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}