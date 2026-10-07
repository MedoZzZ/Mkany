import React from 'react';
import { RouteProvider, useAppRoute } from './components/common/RouteContext';
import { RootShell } from './components/shell/RootShell';
import { RealEstateDashboard } from './components/real-estate/RealEstateDashboard';
import { LegalDashboard } from './components/legal/LegalDashboard';
import { AgricultureDashboard } from './components/agriculture/AgricultureDashboard';

const AppContent: React.FC = () => {
  const { currentPath } = useAppRoute();

  if (currentPath.startsWith('/real-estate')) {
    return <RealEstateDashboard />;
  }
  if (currentPath.startsWith('/legal')) {
    return <LegalDashboard />;
  }
  if (currentPath.startsWith('/agriculture')) {
    return <AgricultureDashboard />;
  }

  return <RootShell />;
};

export default function App() {
  return (
    <RouteProvider>
      <AppContent />
    </RouteProvider>
  );
}

