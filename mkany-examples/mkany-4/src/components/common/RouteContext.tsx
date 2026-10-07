import React, { createContext, useContext, useEffect, useState } from 'react';
import { RoutePath } from '../../types';

interface RouteContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath) => void;
}

const RouteContext = createContext<RouteContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = (): RoutePath => {
    return window.location.pathname;
  };

  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useAppRoute = () => useContext(RouteContext);
