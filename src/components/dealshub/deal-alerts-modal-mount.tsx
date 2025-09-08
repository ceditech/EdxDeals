'use client';

import React from 'react';
import DealAlertsModal from '@/components/modals/deal-alerts-modal';

export default function DealAlertsModalMount() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    // Open when hero CTA dispatches event
    window.addEventListener('open-deal-alerts' as any, onOpen as EventListener);

    // Open when URL hash is #deal-alerts (on load and when it changes)
    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#deal-alerts') {
        setOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('open-deal-alerts' as any, onOpen as EventListener);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  return (
    <>
      {/* Hidden anchor for smooth scroll/focus context */}
      <div id="deal-alerts" className="sr-only" aria-hidden="true" />
      <DealAlertsModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}