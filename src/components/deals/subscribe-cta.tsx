'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DealAlertsModal from '@/components/modals/deal-alerts-modal';
import { Bell } from 'lucide-react';

export default function SubscribeCta() {
  const [isDealAlertsModalOpen, setIsDealAlertsModalOpen] = useState(false);

  return (
    <>
      <div className="my-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">Never Miss a Flash Deal!</h3>
        <p className="text-muted-foreground mb-4">
          Get notified when new flash deals go live
        </p>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => setIsDealAlertsModalOpen(true)}
        >
          <Bell className="w-4 h-4 mr-2" />
          Set Deal Alerts
        </Button>
      </div>
      <DealAlertsModal
        isOpen={isDealAlertsModalOpen}
        onClose={() => setIsDealAlertsModalOpen(false)}
      />
    </>
  );
}