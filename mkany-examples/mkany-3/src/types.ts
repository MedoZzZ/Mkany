export type AppView = 'login' | 'hub' | 'agriculture' | 'realestate' | 'legal';
export type Direction = 'rtl' | 'ltr';

export interface UserProfile {
  name: string;
  nameEn: string;
  email: string;
  role: string;
  roleEn: string;
  initials: string;
}

export interface DomainMeta {
  id: 'agriculture' | 'realestate' | 'legal';
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descAr: string;
  descEn: string;
  primaryColor: string;
  accentColor: string;
  icon: string;
  badgeAr: string;
  badgeEn: string;
}

export const DOMAINS: DomainMeta[] = [
  {
    id: 'agriculture',
    titleAr: 'الزراعة الذكية',
    titleEn: 'Smart Agriculture',
    taglineAr: 'إدارة المحاصيل والبيوت المحمية ومستشعرات إنترنت الأشياء الحية',
    taglineEn: 'Crop management, greenhouse telemetry & living IoT sensors',
    descAr: 'نظام تشغيلي متكامل لمراقبة رطوبة التربة والمناخ الحيوي وتدفقات الري وحصاد الصوب الزراعية بدقة فائقة.',
    descEn: 'Integrated operational platform for live soil moisture, microclimate telemetry, irrigation flow, and crop cycles.',
    primaryColor: '#3A7D44', // Living Green (ag-primary)
    accentColor: '#E5A93D',  // Harvest Gold (ag-accent-sun)
    icon: 'sprout',
    badgeAr: '٤ قطاعات نشطة',
    badgeEn: '4 Active Zones',
  },
  {
    id: 'realestate',
    titleAr: 'التطوير العقاري',
    titleEn: 'Real Estate & Assets',
    taglineAr: 'إدارة المحافظ الإنشائية والوحدات الفاخرة وجداول الأقساط',
    taglineEn: 'Luxury development inventory, asset tracking & financial schedules',
    descAr: 'منصة معمارية راقية لتصفح مخزون الوحدات السكنية والتجارية، وعقود البيع، ومتابعة تدفقات الأقساط الاستثمارية.',
    descEn: 'Architectural portfolio viewer for premium residential & commercial units, sales agreements, and installment tracking.',
    primaryColor: '#1A1E23', // Deep Charcoal (re-primary)
    accentColor: '#C86A4C',  // Terracotta / Copper (re-accent)
    icon: 'building',
    badgeAr: '٢٤ وحدة متاحة',
    badgeEn: '24 Available Units',
  },
  {
    id: 'legal',
    titleAr: 'الخدمات القانونية',
    titleEn: 'Legal Services & Litigations',
    taglineAr: 'ملفات القضايا والمرافعات ومواعيد الجلسات الحرجة وإيداعات المحاكم',
    taglineEn: 'Case files, court dockets, peremptory deadlines & legal ledgers',
    descAr: 'بيئة عمل صارمة وعالية الكثافة لإدارة مذكرات التقاضي، وتنبيهات المواعيد الحتمية، وحسابات أتعاب الموكلين.',
    descEn: 'Strict, high-density dossier workspace for litigation briefs, non-negotiable hearing dates, and client trust accounting.',
    primaryColor: '#0B1B2B', // MKANY Base Navy (legal-primary)
    accentColor: '#8B1E1E',  // Sealing Wax Red (legal-accent)
    icon: 'scale',
    badgeAr: '١٢ قضية منظورة',
    badgeEn: '12 Active Cases',
  },
];
