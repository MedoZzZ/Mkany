import React from 'react';
import { useState } from 'react';
import styles from './RealEstate.module.css';
import { useI18n } from '../i18n/I18nContext';
import type { Translations } from '../i18n/I18nContext';

const RecordDetail = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className={styles.recordDetail}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);

const PipelinePath = ({ currentStage, t }: { currentStage: string, t: Translations }) => {
  const stages = [t.realEstate.pathAvailable, t.realEstate.pathReserved, t.realEstate.pathContracted, t.realEstate.pathSold];
  const currentKey = currentStage === 'Reserved' ? t.realEstate.pathReserved : currentStage;
  const currentIndex = stages.indexOf(currentKey);

  return (
    <div className={styles.pathContainer}>
      {stages.map((stage, index) => {
        let className = styles.pathStep;
        if (index < currentIndex) className += ` ${styles.completed}`;
        if (index === currentIndex) className += ` ${styles.active}`;
        return (
          <div key={stage} className={className}>
            {stage}
          </div>
        );
      })}
    </div>
  );
};

export default function RealEstatePipeline() {
  const [activeTab, setActiveTab] = useState('Details');
  const { t } = useI18n();

  const tabMap: Record<string, string> = {
    'Details': t.realEstate.tabDetails,
    'Installments': t.realEstate.tabInstallments,
    'Viewings': t.realEstate.tabViewings,
    'Documents': t.realEstate.tabDocs,
  };

  return (
    <div className={`theme-real-estate ${styles.container}`}>
      
      {/* Record Header Card */}
      <div className={styles.card} style={{ borderInlineStart: '4px solid var(--color-status-reserved-bg)' }}>
        <div className={styles.recordHeader}>
          <div>
            <div className={styles.recordSubtitle}>{t.realEstate.unit} • <span dir="ltr">U-402</span></div>
            <h1 className={styles.recordTitle}>شقة الإطلالة البحرية 4B</h1>
          </div>
          <button style={{ 
            padding: '4px 16px', 
            background: 'white', 
            border: '1px solid var(--color-border-divider)', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'var(--color-brand-primary)'
          }}>{t.realEstate.edit}</button>
        </div>
        
        <PipelinePath currentStage="Reserved" t={t} />

        <div className={styles.recordGrid}>
          <RecordDetail label={t.realEstate.propPhase} value={t.realEstate.valPhase} />
          <RecordDetail label={t.realEstate.currentStatus} value={t.realEstate.pathReserved} />
          <RecordDetail label={t.realEstate.listPrice} value={<span dir="ltr">£450,000</span>} />
          <RecordDetail label={t.realEstate.agent} value={t.realEstate.valAgent} />
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.card}>
        <div className={styles.tabs}>
          {['Details', 'Installments', 'Viewings', 'Documents'].map(tab => (
            <div 
              key={tab} 
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabMap[tab]}
            </div>
          ))}
        </div>

        {activeTab === 'Details' && (
          <div className={styles.recordGrid}>
            <RecordDetail label={t.realEstate.sqft} value={<span dir="ltr">1,250</span>} />
            <RecordDetail label={t.realEstate.bedrooms} value={<span dir="ltr">3</span>} />
            <RecordDetail label={t.realEstate.bathrooms} value={<span dir="ltr">2.5</span>} />
            <RecordDetail label={t.realEstate.direction} value={t.realEstate.valDirection} />
          </div>
        )}

        {activeTab === 'Installments' && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.realEstate.installment}</th>
                <th>{t.realEstate.dueDate}</th>
                <th>{t.realEstate.amount}</th>
                <th>{t.realEstate.status}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t.realEstate.downPayment}</td>
                <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">2024-11-01</td>
                <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">£45,000</td>
                <td><span style={{ color: 'var(--color-status-sold-bg)', fontWeight: 'bold' }}>{t.realEstate.statusCollected}</span></td>
              </tr>
              <tr>
                <td>{t.realEstate.inst1}</td>
                <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">2025-02-01</td>
                <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">£15,000</td>
                <td>{t.realEstate.statusPending}</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === 'Viewings' && (
          <div style={{ padding: 'var(--space-md)' }}>{t.realEstate.noViewings}</div>
        )}

        {activeTab === 'Documents' && (
          <div style={{ padding: 'var(--space-md)' }}>{t.realEstate.noDocs}</div>
        )}
      </div>

    </div>
  );
}
