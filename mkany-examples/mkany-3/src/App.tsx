import React, { useState, useEffect } from 'react';
import { AppView, Direction, UserProfile } from './types';
import { LoginScreen } from './components/LoginScreen';
import { HubScreen } from './components/HubScreen';
import { AgricultureScreen } from './components/agriculture/AgricultureScreen';
import { RealEstateScreen } from './components/realestate/RealEstateScreen';
import { LegalScreen } from './components/legal/LegalScreen';
import { ProjectSwitcherModal } from './components/ProjectSwitcherModal';

const DEFAULT_USER: UserProfile = {
  name: 'عمر فاروق',
  nameEn: 'Omar Farooq',
  email: 'omar.farooq@mkany.com',
  role: 'رئيس قطاع العمليات والتحكم',
  roleEn: 'Chief Operating Officer',
  initials: 'OF',
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [direction, setDirection] = useState<Direction>('rtl');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  // Sync document direction and language attributes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
  }, [direction]);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
  };

  const handleSelectView = (view: AppView) => {
    setCurrentView(view);
  };

  return (
    <div id="mkany-app-root" className="min-h-screen w-full select-text">
      {/* 1. Login Screen */}
      {currentView === 'login' && (
        <LoginScreen
          onLoginSuccess={() => setCurrentView('hub')}
          direction={direction}
          onToggleDirection={toggleDirection}
        />
      )}

      {/* 2. Unified Master Hub Screen */}
      {currentView === 'hub' && (
        <HubScreen
          user={user}
          direction={direction}
          onSelectDomain={handleSelectView}
          onLogout={() => setCurrentView('login')}
          onToggleDirection={toggleDirection}
        />
      )}

      {/* 3. Smart Agriculture Domain Screen */}
      {currentView === 'agriculture' && (
        <AgricultureScreen
          user={user}
          direction={direction}
          onOpenSwitcher={() => setIsSwitcherOpen(true)}
          onReturnToHub={() => setCurrentView('hub')}
        />
      )}

      {/* 4. Real Estate Domain Screen */}
      {currentView === 'realestate' && (
        <RealEstateScreen
          user={user}
          direction={direction}
          onOpenSwitcher={() => setIsSwitcherOpen(true)}
          onReturnToHub={() => setCurrentView('hub')}
        />
      )}

      {/* 5. Legal Services Domain Screen */}
      {currentView === 'legal' && (
        <LegalScreen
          user={user}
          direction={direction}
          onOpenSwitcher={() => setIsSwitcherOpen(true)}
          onReturnToHub={() => setCurrentView('hub')}
        />
      )}

      {/* Global Project Switcher Modal */}
      <ProjectSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        currentView={currentView}
        onSelectView={handleSelectView}
        direction={direction}
      />
    </div>
  );
}
