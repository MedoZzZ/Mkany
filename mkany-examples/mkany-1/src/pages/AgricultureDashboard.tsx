import styles from './Agriculture.module.css';
import { useI18n } from '../i18n/I18nContext';

import React from 'react';

interface MetricProps {
  value: React.ReactNode;
  label: string;
}

const TypographyMetric = ({ value, label }: MetricProps) => (
  <div className={styles.metricItem}>
    <span className={styles.metricValue}>{value}</span>
    <span className={styles.metricLabel}>{label}</span>
  </div>
);

interface ExceptionProps {
  title: string;
  action: string;
  bgColor: string;
}

const ExceptionTile = ({ title, action, bgColor }: ExceptionProps) => (
  <div className={styles.exceptionTile} style={{ backgroundColor: bgColor }}>
    <div className={styles.overlay} />
    <span className={styles.exceptionTitle}>{title}</span>
    <span className={styles.exceptionAction}>{action}</span>
  </div>
);

interface CycleProps {
  name: React.ReactNode;
  status: 'good' | 'warning';
}

const CycleTile = ({ name, status }: CycleProps) => (
  <div className={styles.cycleTile}>
    <div className={styles.overlay} />
    <span className={styles.cycleName}>{name}</span>
    <div className={`${styles.cycleStatus} ${status === 'warning' ? styles.warning : ''}`} />
  </div>
);

export default function AgricultureDashboard() {
  const { t } = useI18n();

  return (
    <div className={`theme-agriculture ${styles.container}`}>
      <div className={styles.panorama}>
        
        {/* Group 1: Exceptions & Active Monitoring */}
        <div className={styles.controlGroup}>
          <h2 className={styles.groupHeader}>{t.agriculture.exceptions}</h2>
          <ExceptionTile 
            title={t.agriculture.alertEcLevel} 
            action={`${t.agriculture.actionAdjustNutrients} ←`} 
            bgColor="var(--color-tile-temp)" 
          />
          <ExceptionTile 
            title={t.agriculture.alertHumidity} 
            action={`${t.agriculture.actionViewSensors} ←`} 
            bgColor="var(--color-tile-warning)" 
          />
        </div>

        {/* Group 2: Typography-led Climate Readings (No colored boxes) */}
        <div className={styles.controlGroup}>
          <h2 className={styles.groupHeader}>{t.agriculture.climate}</h2>
          <div className={styles.metricsGrid}>
            <TypographyMetric value={<span dir="ltr">24°C</span>} label={t.agriculture.temp} />
            <TypographyMetric value={<span dir="ltr">68%</span>} label={t.agriculture.humidity} />
            <TypographyMetric value={<span dir="ltr">2.1</span>} label={t.agriculture.ecLevel} />
            <TypographyMetric value={<span dir="ltr">6.0</span>} label={t.agriculture.phLevel} />
          </div>
        </div>

        {/* Group 3: Active Crop Cycles (List Tiles) */}
        <div className={styles.controlGroup}>
          <h2 className={styles.groupHeader}>{t.agriculture.activeCycles}</h2>
          <div className={styles.cycleList}>
            <CycleTile name={<span>{t.agriculture.cycleTomato} - <span dir="ltr">Z1</span> ({t.agriculture.day} <span dir="ltr">42</span>)</span>} status="good" />
            <CycleTile name={<span>{t.agriculture.cycleLettuce} - <span dir="ltr">Z2</span> ({t.agriculture.day} <span dir="ltr">14</span>)</span>} status="good" />
            <CycleTile name={<span>{t.agriculture.cycleCucumber} - <span dir="ltr">Z4</span> ({t.agriculture.day} <span dir="ltr">28</span>)</span>} status="warning" />
            <CycleTile name={<span>{t.agriculture.cyclePepper} - <span dir="ltr">Z5</span> ({t.agriculture.day} <span dir="ltr">60</span>)</span>} status="good" />
          </div>
        </div>

      </div>
    </div>
  );
}
