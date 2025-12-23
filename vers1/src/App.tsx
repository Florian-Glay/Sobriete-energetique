import React, { useState } from 'react';
import { MobileLayout } from './components/layout/MobileLayout.tsx';
import { BottomNav, ViewType } from './components/layout/BottomNav.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { ConsumptionView } from './views/ConsumptionView.tsx';
import { AdviceView } from './views/AdviceView.tsx';
import { ProfileView } from './views/ProfileView.tsx';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'consumption':
        return <ConsumptionView />;
      case 'advice':
        return <AdviceView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <MobileLayout bottomNav={<BottomNav currentView={currentView} onNavigate={setCurrentView} />}>
      <div className="min-h-full relative">
        {renderView()}
      </div>
    </MobileLayout>
  );
};
