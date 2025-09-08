'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BellRing } from 'lucide-react';
import React from 'react';

export default function SetDealAlerts() {
  const [open, setOpen] = React.useState(false);

  // Allow opening the dialog from hero CTA or URL hash (#deal-alerts)
  React.useEffect(() => {
    const openFromHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#deal-alerts') {
        setOpen(true);
      }
    };
    // Initial check on mount
    openFromHash();

    // Custom event from hero CTA
    const onOpen = () => setOpen(true);
    window.addEventListener('open-deal-alerts' as any, onOpen as EventListener);

    // Keep in sync if hash changes
    window.addEventListener('hashchange', openFromHash);

    return () => {
      window.removeEventListener('open-deal-alerts' as any, onOpen as EventListener);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, []);

  // In a real application, you would handle form submission to a backend
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    setOpen(false);
  };

  return (
    <>
      <div id="deal-alerts" className="sr-only" aria-hidden="true" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 z-20 shadow-lg rounded-full h-14 w-14"
            size="icon"
          >
            <BellRing className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Never Miss a Deal!</DialogTitle>
            <DialogDescription>
              Set up deal alerts to be notified about the latest offers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" required className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" required className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Set Alert</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}