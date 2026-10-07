import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Thermometer, Droplets, Wind, Activity, Search, 
  Bell, ArrowRight, Sun, Moon, Settings, LayoutDashboard, 
  Tractor, Sprout, CloudRain, Power
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import './Agriculture.css';
import './RealEstate.css'; // Reusing topbar/sidebar structure

const zones = [
  { id: 'Z1', name: 'الصوبة الأولى (طماطم)', temp: '24.5', humidity: '65', moisture: '42', status: 'success' },
  { id: 'Z2', name: 'الصوبة الثانية (خيار)', temp: '26.1', humidity: '72', moisture: '38', status: 'success' },
  { id: 'Z3', name: 'منطقة الزراعة المائية A', temp: '22.0', humidity: '55', moisture: '15', status: 'danger' }, // Needs water
  { id: 'Z4', name: 'حقل الفراولة المفتوح', temp: '28.4', humidity: '40', moisture: '28', status: 'warning' },
];

const statusLabels: Record<string, string> = {
  success: 'مثالي',
  warning: 'تنبيه مناخي',
  danger: 'ري عاجل مطلوب',
  info: 'جاري الحصاد'
};

export function Agriculture() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-container theme-agriculture">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" onClick={() => navigate('/')}>
          <div className="brand-logo">MK</div>
          <div className="brand-text">
            <h2>MKANY</h2>
            <span>الزراعة الذكية</span>
          </div>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item active">
            <LayoutDashboard size={20} strokeWidth={1.5} />
            <span>المراقبة الحية</span>
          </div>
          
          <div className="nav-item">
            <Sprout size={20} strokeWidth={1.5} />
            <span>المحاصيل والدورات</span>
          </div>
          
          <div className="nav-item">
            <CloudRain size={20} strokeWidth={1.5} />
            <span>أنظمة الري والتسميد</span>
          </div>
          
          <div className="nav-item">
            <Tractor size={20} strokeWidth={1.5} />
            <span>المعدات والعمالة</span>
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
            <span className="text-primary font-bold">المراقبة الحية</span>
          </div>
          
          <div className="topbar-actions">
            <div className="search-bar">
              <Search size={16} className="text-secondary" />
              <input type="text" placeholder="بحث عن صوبة، محصول، مستشعر..." />
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
        <div className="page-wrapper-agri">
          <div className="agri-header">
            <div>
              <h1 className="agri-title">نظام المراقبة والتحكم</h1>
              <p className="agri-subtitle">قراءات المستشعرات الحية والتحكم في أنظمة الري بالمزارع.</p>
            </div>
          </div>

          {/* Master Health Widget */}
          <Card className="agri-health-widget">
            <div className="health-status">
              <div className="health-icon">
                <Activity size={32} />
              </div>
              <div className="health-text">
                <h2>حالة المزرعة ممتازة</h2>
                <p>جميع الأنظمة الحيوية تعمل بكفاءة. لا توجد تنبيهات حرجة حالياً.</p>
              </div>
            </div>
            <Button variant="secondary" size="lg">
              عرض التقرير اليومي
            </Button>
          </Card>

          {/* Live Sensors Bento Grid */}
          <div className="agri-grid">
            <Card className="sensor-card">
              <div className="sensor-header">
                <span className="sensor-label text-accent">
                  <Droplets size={18} />
                  رطوبة التربة (متوسط)
                </span>
                <Badge variant="danger">عاجل: صوبة 3</Badge>
              </div>
              <div className="sensor-value-wrapper">
                <span className="sensor-value tabular-nums">42</span>
                <span className="sensor-unit">%</span>
              </div>
              <Button variant="primary" className="btn-agri-action" style={{backgroundColor: 'var(--badge-danger-text)', color: 'white'}}>
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Power size={16} /> تشغيل طلمبة الري (صوبة 3)
                </span>
              </Button>
            </Card>
            
            <Card className="sensor-card">
              <div className="sensor-header">
                <span className="sensor-label">
                  <Thermometer size={18} />
                  درجة الحرارة (الجو)
                </span>
                <Badge variant="success">طبيعي</Badge>
              </div>
              <div className="sensor-value-wrapper">
                <span className="sensor-value tabular-nums">24.5</span>
                <span className="sensor-unit">°C</span>
              </div>
              <Button variant="secondary" className="btn-agri-action">
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Wind size={16} /> التحكم في المراوح
                </span>
              </Button>
            </Card>

            <Card className="sensor-card">
              <div className="sensor-header">
                <span className="sensor-label">
                  <CloudRain size={18} />
                  مستوى خزان التسميد
                </span>
                <Badge variant="success">طبيعي</Badge>
              </div>
              <div className="sensor-value-wrapper">
                <span className="sensor-value tabular-nums">78</span>
                <span className="sensor-unit">%</span>
              </div>
              <Button variant="secondary" className="btn-agri-action">
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Power size={16} /> جدولة الخلطة القادمة
                </span>
              </Button>
            </Card>
          </div>

          {/* Zones Data Table */}
          <Card className="agri-table-wrapper">
            <div className="table-toolbar">
              <h3 className="table-title">حالة الصوب والمناطق الزراعية</h3>
            </div>
            <div className="table-responsive">
              <table className="data-table" style={{textAlign: 'right'}}>
                <thead>
                  <tr>
                    <th>المنطقة / الصوبة</th>
                    <th className="text-left">الحرارة (°C)</th>
                    <th className="text-left">رطوبة الجو (%)</th>
                    <th className="text-left">رطوبة التربة (%)</th>
                    <th>الحالة</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone) => (
                    <tr key={zone.id}>
                      <td className="zone-name">
                        <div className={`zone-dot dot-${zone.status}`}></div>
                        {zone.name}
                      </td>
                      <td className="tabular-nums text-left font-bold">{zone.temp}</td>
                      <td className="tabular-nums text-left">{zone.humidity}</td>
                      <td className="tabular-nums text-left font-bold">{zone.moisture}</td>
                      <td>
                        <Badge variant={zone.status as any}>
                          {statusLabels[zone.status]}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm">تفاصيل</Button>
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
