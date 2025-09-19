import { Metadata } from 'next';
import ClearancePageClient from '@/components/clearance/ClearancePageClient';

export const metadata: Metadata = {
  title: 'Clearance Deals | Open Box, Refurbished & Overstock | EdxDeals',
  description: 'Shop clearance, open box, and refurbished deals on electronics, home goods, and more. Limited quantities. Huge savings!',
  keywords: 'clearance, open box, refurbished, overstock, deals, electronics, home goods, discount',
  openGraph: {
    title: 'Clearance Deals | Open Box, Refurbished & Overstock | EdxDeals',
    description: 'Shop clearance, open box, and refurbished deals on electronics, home goods, and more. Limited quantities. Huge savings!',
    type: 'website',
  },
};

export default function ClearancePage() {
  return <ClearancePageClient />;
}