'use client';

import DealDemos from '@/components/dealshub/deal-demos';
import DealsByBrand from '@/components/dealshub/deals-by-brand';
import DealsByCategory from '@/components/dealshub/deals-by-category';
import DealsBySeller from '@/components/dealshub/deals-by-seller';
import DealsHubHero from '@/components/dealshub/dealshub-hero';
import ExpiredUpcomingDeals from '@/components/dealshub/expired-upcoming-deals';
import FilterTabsBar from '@/components/dealshub/filter-tabs-bar';
import MainDealsGrid from '@/components/dealshub/main-deals-grid';
import DealAlertsModal from '@/components/modals/deal-alerts-modal';
import React, { useEffect, useState } from 'react';

export default function DealsHubPage() {
  const [alertsOpen, setAlertsOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setAlertsOpen(true);
    window.addEventListener('open-deal-alerts' as any, onOpen as EventListener);

    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#deal-alerts') {
        setAlertsOpen(true);
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
      <DealsHubHero />
      <div className="container mx-auto px-4">
        <div id="deal-alerts" className="sr-only" aria-hidden="true" />
        <FilterTabsBar />
        <MainDealsGrid />
        <DealsByBrand />
        <DealsByCategory />
        <DealsBySeller />
        <DealDemos />
        <ExpiredUpcomingDeals />
        <DealAlertsModal isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />
      </div>
    </>
  );
}