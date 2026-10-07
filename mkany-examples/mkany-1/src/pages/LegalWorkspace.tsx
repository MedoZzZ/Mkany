import React from 'react';
import styles from './Legal.module.css';
import { useI18n } from '../i18n/I18nContext';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'default';
}

const Panel: React.FC<PanelProps> = ({ title, children, variant = 'default' }) => (
  <div className={`${styles.panel} ${styles[variant]}`}>
    <div className={styles.panelHeader}>{title}</div>
    <div className={styles.panelBody}>{children}</div>
  </div>
);

export default function LegalWorkspace() {
  const { t } = useI18n();

  return (
    <div className={`theme-legal ${styles.container}`}>
      {/* Heavy Left Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>{t.legal.sidebarTitle}</div>
        <ul className={styles.sidebarNav}>
          <li className={styles.sidebarNavItem}>{t.legal.navDashboard}</li>
          <li className={styles.sidebarNavItem}>{t.legal.navClients}</li>
          <li className={`${styles.sidebarNavItem} ${styles.active}`}>{t.legal.navCases}</li>
          <li className={styles.sidebarNavItem}>{t.legal.navHearings}</li>
          <li className={styles.sidebarNavItem}>{t.legal.navDeadlines}</li>
        </ul>
      </aside>

      {/* Main Well */}
      <main className={styles.mainWell}>
        <div className={styles.breadcrumbs}>
          <a href="#" className={styles.breadcrumbLink}>{t.legal.breadcrumbHome}</a> &gt; 
          <a href="#" className={styles.breadcrumbLink}> {t.legal.navCases}</a> &gt; 
          <span dir="ltr"> 2024-CV-101</span>
        </div>
        
        <h1 className={styles.pageHeader}>{t.legal.caseWorkspace} <span dir="ltr">شركة الأفق ضد وزارة التجارة</span></h1>

        <div className={styles.workspaceGrid}>
          {/* Left Column (Metadata List) */}
          <div>
            <Panel title={t.legal.caseDetails} variant="primary">
              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>{t.legal.client}</span>
                  <span dir="ltr">شركة الأفق</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>{t.legal.court}</span>
                  <span>{t.legal.supremeCourt}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>{t.legal.assigned}</span>
                  <span>أحمد يوسف</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>{t.legal.status}</span>
                  <span className={styles.badge}>{t.legal.statusActive}</span>
                </div>
              </div>
            </Panel>
          </div>

          {/* Right Column (Dossier Data) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <Panel title={t.legal.criticalDeadlines} variant="danger">
              <table className={styles.denseTable}>
                <thead>
                  <tr>
                    <th>{t.legal.deadlineType}</th>
                    <th>{t.legal.dueDate}</th>
                    <th>{t.legal.assignedTo}</th>
                    <th>{t.legal.status}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t.legal.appealMemo}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">2024-11-20</td>
                    <td>أحمد يوسف</td>
                    <td><span className={`${styles.badge} ${styles.danger}`}>{t.legal.statusPeremptory}</span></td>
                  </tr>
                  <tr>
                    <td>{t.legal.feePayment}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">2024-11-25</td>
                    <td>قسم الحسابات</td>
                    <td><span className={styles.badge}>{t.legal.statusPending}</span></td>
                  </tr>
                </tbody>
              </table>
            </Panel>

            <Panel title={t.legal.upcomingHearings}>
              <table className={styles.denseTable}>
                <thead>
                  <tr>
                    <th>{t.legal.date}</th>
                    <th>{t.legal.court}</th>
                    <th>{t.legal.actionRequired}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }} dir="ltr">2024-12-01</td>
                    <td>{t.legal.civilRoom}</td>
                    <td>{t.legal.submitEvidence}</td>
                  </tr>
                </tbody>
              </table>
            </Panel>
            
          </div>
        </div>
      </main>
    </div>
  );
}
