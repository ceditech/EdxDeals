import DealDemos from '@/components/dealshub/deal-demos';
import DealsByBrand from '@/components/dealshub/deals-by-brand';
import DealsByCategory from '@/components/dealshub/deals-by-category';
import DealsBySeller from '@/components/dealshub/deals-by-seller';
import DealsHubHero from '@/components/dealshub/dealshub-hero';
import ExpiredUpcomingDeals from '@/components/dealshub/expired-upcoming-deals';
import FilterTabsBar from '@/components/dealshub/filter-tabs-bar';
import MainDealsGrid from '@/components/dealshub/main-deals-grid';
import DealAlertsModalMount from '@/components/dealshub/deal-alerts-modal-mount';

export default function DealsHubPage() {
  return (
    <>
      <DealsHubHero />
      <div className="container mx-auto px-4">
        <FilterTabsBar />
        <MainDealsGrid />
        <DealsByBrand />
        <DealsByCategory />
        <DealsBySeller />
        <DealDemos />
        <ExpiredUpcomingDeals />
      </div>
      <DealAlertsModalMount />
    </>
  );
}