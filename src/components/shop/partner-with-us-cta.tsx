'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PartnerWithUsModal from '@/components/PartnerWithUsModal';

export default function PartnerWithUsCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="rounded-lg border bg-card text-card-foreground p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Partner with Us</h3>
            <p className="text-sm text-muted-foreground">
              Grow your brand on EdxDeals. Apply in minutes.
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            Partner with Us
          </Button>
        </div>
      </div>

      <PartnerWithUsModal open={open} onOpenChange={setOpen} />
    </div>
  );
}