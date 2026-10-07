import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, LayoutDashboard, KeySquare, FileText, Settings, 
  Search, Plus, Filter, LayoutGrid, Bell, ArrowRight, Sun, Moon 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import './RealEstate.css';

const units = [
  { id: '1', code: 'V-NEX-042', project: 'كمبوند النخيل', phase: 'المرحلة الأولى', type: 'فيلا', area: 450, price: '18,500,000', status: 'available' },
  { id: '2', code: 'A-NEX-112', project: 'كمبوند النخيل', phase: 'المرحلة الثانية', type: 'شقة', area: 180, price: '5,400,000', status: 'warning' }, // reserved
  { id: '3', code: 'C-OBR-005', project: 'مول العبور', phase: 'التجاري', type: 'تجاري', area: 85, price: '9,200,000', status: 'info' }, // contracted
  { id: '4', code: 'A-OBR-220', project: 'أبراج العبور', phase: 'المرحلة الأولى', type: 'شقة', area: 120, price: '3,800,000', status: 'dimmed' }, // sold
  { id: '5', code: 'L-PLM-01', project: 'بالم هيلز', phase: 'أراضي', type: 'أرض', area: 600, price: '12,000,000', status: 'danger' }, // blocked
];

const statusLabels: Record<string, string> = {
  available: 'متاحة للبيع',
  warning: 'محجوزة بمقدم',
  info: 'متعاقد عليها',
  danger: 'محجوبة إداريًا',
  dimmed: 'مباعة ومسلّمة'
};

export function RealEstate() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-container theme-real-estate">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" onClick={() => navigate('/')}>
          <div className="brand-logo">MK</div>
          <div className="brand-text">
            <h2>MKANY</h2>
            <span>العقارات</span>
          </div>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item">
            <LayoutDashboard size={20} strokeWidth={1.5} />
            <span>لوحة القيادة</span>
          </div>
          
          <div className="nav-item active">
            <Building size={20} strokeWidth={1.5} />
            <span>مخزون الوحدات</span>
          </div>
          
          <div className="nav-item">
            <KeySquare size={20} strokeWidth={1.5} />
            <span>الحجوزات</span>
          </div>
          
          <div className="nav-item">
            <FileText size={20} strokeWidth={1.5} />
            <span>العقود والأقساط</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item">
            <Settings size={20} strokeWidth={1.5} />
            <span>الإعدادات</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="breadcrumb">
            <span className="text-secondary cursor-pointer" onClick={() => navigate('/')}>الرئيسية</span>
            <ArrowRight size={14} className="text-tertiary" />
            <span className="text-primary font-bold">مخزون الوحدات</span>
          </div>
          
          <div className="topbar-actions">
            <div className="search-bar">
              <Search size={16} className="text-secondary" />
              <input type="text" placeholder="بحث برقم الوحدة، العميل..." />
            </div>
            <button onClick={toggleTheme} className="icon-btn">
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <button className="icon-btn">
              <Bell size={20} strokeWidth={1.5} />
            </button>
            <div className="avatar" style={{width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>M</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-wrapper">
          <div className="page-header">
            <div>
              <h1 className="page-title">مخزون الوحدات العقارية</h1>
              <p className="page-subtitle">إدارة ومتابعة حالة الوحدات عبر جميع مشاريع الشركة.</p>
            </div>
            <div className="header-actions">
              <Button variant="primary">
                <Plus size={18} />
                وحدة جديدة
              </Button>
            </div>
          </div>

          {/* KPI Bento Grid */}
          <div className="kpi-grid">
            <Card className="kpi-card kpi-primary">
              <div className="kpi-content">
                <span className="kpi-label">القيمة البيعية للمتاح</span>
                <div className="kpi-value-group">
                  <span className="kpi-currency">EGP</span>
                  <span className="kpi-value tabular-nums">145,200,000</span>
                </div>
              </div>
            </Card>
            
            <Card className="kpi-card">
              <div className="kpi-content">
                <span className="kpi-label">وحدات متاحة للبيع</span>
                <div className="kpi-value-group">
                  <span className="kpi-value text-accent tabular-nums">42</span>
                </div>
              </div>
            </Card>
            
            <Card className="kpi-card">
              <div className="kpi-content">
                <span className="kpi-label">بانتظار التعاقد (مقدم)</span>
                <div className="kpi-value-group">
                  <span className="kpi-value tabular-nums">18</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Data Table */}
          <Card className="table-card">
            <div className="table-toolbar">
              <h3 className="table-title">سجل الوحدات</h3>
              <div className="table-actions">
                <Button variant="secondary" size="sm">
                  <Filter size={16} />
                  تصفية
                </Button>
                <Button variant="ghost" size="sm">
                  <LayoutGrid size={16} />
                </Button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>كود الوحدة</th>
                    <th>المشروع</th>
                    <th>المرحلة</th>
                    <th>النوع</th>
                    <th className="text-left">المساحة (م²)</th>
                    <th className="text-left">السعر (ج.م)</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((unit) => (
                    <tr key={unit.id}>
                      <td className="font-mono text-accent font-bold">{unit.code}</td>
                      <td className="font-bold">{unit.project}</td>
                      <td className="text-secondary">{unit.phase}</td>
                      <td>{unit.type}</td>
                      <td className="tabular-nums text-left">{unit.area}</td>
                      <td className="tabular-nums text-left font-bold">{unit.price}</td>
                      <td>
                        <Badge variant={unit.status as any}>
                          {statusLabels[unit.status]}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
