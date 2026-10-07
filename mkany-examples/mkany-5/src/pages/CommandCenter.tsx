import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building, Scale, Leaf, Calculator, BarChart3, Users, Briefcase, Boxes, Sun, Moon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import './CommandCenter.css';

const modules = [
  { id: 'real-estate', name: 'إدارة العقارات', icon: Building, color: '#E6AC00', desc: 'المخزون، الحجوزات، والأقساط' },
  { id: 'agriculture', name: 'الزراعة الذكية', icon: Leaf, color: '#10B981', desc: 'المحاصيل، الصوب، والتوريد' },
  { id: 'legal', name: 'الشؤون القانونية', icon: Scale, color: '#3B82F6', desc: 'القضايا، الجلسات، والعقود' },
  { id: 'accounting', name: 'الحسابات العامة', icon: Calculator, color: '#6366F1', desc: 'القيود، الميزانية، والأصول' },
  { id: 'hr', name: 'الموارد البشرية', icon: Users, color: '#F43F5E', desc: 'الموظفين، الرواتب، والتقييم' },
  { id: 'crm', name: 'إدارة العملاء', icon: Briefcase, color: '#8B5CF6', desc: 'المبيعات، التذاكر، والمتابعة' },
  { id: 'inventory', name: 'المخازن والعهد', icon: Boxes, color: '#EC4899', desc: 'الأصناف، الجرد، والحركات' },
  { id: 'reports', name: 'التقارير الذكية', icon: BarChart3, color: '#14B8A6', desc: 'تحليلات ومؤشرات أداء' },
];

export function CommandCenter() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { theme, toggleTheme } = useTheme();

  const filteredModules = modules.filter(m => m.name.includes(search) || m.desc.includes(search));

  return (
    <div className="hub-container">
      {/* Quiet Chrome Header */}
      <header className="hub-header">
        <div className="hub-brand">
          <div className="brand-dot"></div>
          <h1>MKANY OS</h1>
        </div>
        <div className="hub-user" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <span className="user-name">Marwan X.</span>
          <div className="avatar"></div>
        </div>
      </header>

      {/* Main Palette */}
      <main className="hub-main">
        <div className="palette-wrapper">
          <h2 className="hub-greeting">أهلاً بك، ماذا تريد أن تفعل اليوم؟</h2>
          
          <div className="command-palette">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن نظام، تقرير، أو أمر مباشر..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div className="shortcut-hint">Ctrl + K</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="modules-grid">
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card 
                key={mod.id} 
                className="module-card" 
                hoverable 
                onClick={() => navigate(`/${mod.id}`)}
              >
                <div className="module-icon-wrapper" style={{ color: mod.color, backgroundColor: `${mod.color}15` }}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className="module-content">
                  <h3 className="module-name">{mod.name}</h3>
                  <p className="module-desc">{mod.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
