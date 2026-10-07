import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import styles from './ShellLayout.module.css';

const APP_COLORS = {
  '/agriculture': '#8CBF26',
  '/legal': '#001F3F',
  '/real-estate': '#0070D2',
};

export default function ShellLayout() {
  const [waffleOpen, setWaffleOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const activeColor = APP_COLORS[location.pathname as keyof typeof APP_COLORS] || 'transparent';
  const displayColor = isNavigating ? (APP_COLORS[targetPath as keyof typeof APP_COLORS] || activeColor) : activeColor;

  const handleAppClick = (path: string) => {
    setWaffleOpen(false);
    if (path === location.pathname) return;
    
    setTargetPath(path);
    setIsNavigating(true);
    
    setTimeout(() => {
      setIsNavigating(false);
      navigate(path);
    }, 600);
  };

  useEffect(() => {
    const handleClick = () => setWaffleOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.logo}>{t.shell.appName}</Link>
        <div className={styles.spacer} />
        
        <div className={styles.actions}>
          {/* Global Search Placeholder */}
          <button className={styles.iconButton}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.14,14.99L18.5,19l-1.42,1.42l-3.36-4.01C12.79,16.79,11.44,17,10,17c-3.87,0-7-3.13-7-7s3.13-7,7-7s7,3.13,7,7C17,11.44,16.79,12.79,15.14,14.99z M10,15c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S7.24,15,10,15z" />
            </svg>
          </button>
          
          <div onClick={e => e.stopPropagation()}>
            <button className={styles.iconButton} onClick={() => setWaffleOpen(!waffleOpen)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
            </button>
            
            {waffleOpen && (
              <div className={styles.dropdown}>
                <a href="#" className={styles.appItem} data-app="agriculture" onClick={(e) => { e.preventDefault(); handleAppClick('/agriculture'); }}>
                  <svg className={styles.appIcon} viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
                  <span className={styles.appLabel}>{t.shell.navAgriculture}</span>
                </a>
                <a href="#" className={styles.appItem} data-app="legal" onClick={(e) => { e.preventDefault(); handleAppClick('/legal'); }}>
                  <svg className={styles.appIcon} viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5.5 7 12 4.25 18.5 7 12 9.5zM3 9.5v5l9 4.5 9-4.5v-5l-9 4.5-9-4.5z"/></svg>
                  <span className={styles.appLabel}>{t.shell.navLegal}</span>
                </a>
                <a href="#" className={styles.appItem} data-app="real-estate" onClick={(e) => { e.preventDefault(); handleAppClick('/real-estate'); }}>
                  <svg className={styles.appIcon} viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M4 10v11h16V10L12 3l-8 7zm10 9h-4v-6h4v6z"/></svg>
                  <span className={styles.appLabel}>{t.shell.navRealEstate}</span>
                </a>
              </div>
            )}
          </div>
          
          <button className={styles.iconButton}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
          </button>
          <button className={styles.iconButton}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>

        <div className={styles.anchorLine} style={{ backgroundColor: displayColor }} />
        {isNavigating && (
          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} style={{ backgroundColor: displayColor }} />
          </div>
        )}
      </header>
      
      {!isNavigating && (
        <main className={styles.content}>
          <Outlet />
        </main>
      )}
    </div>
  );
}
