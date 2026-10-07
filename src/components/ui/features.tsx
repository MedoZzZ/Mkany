"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, Smartphone, ArrowLeft, BarChart3, Cloud } from "lucide-react";

const features = [
  {
    title: "إدارة متكاملة من مكان واحد",
    description: "اربط جميع فروع شركتك وقطاعاتك المختلفة في نظام واحد مركزي يعزز من كفاءة العمل.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "أمان سحابي موثوق",
    description: "بياناتك مشفرة ومحفوظة بأعلى معايير الأمان العالمية مع نسخ احتياطي تلقائي مستمر.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "سرعة في الأداء",
    description: "واجهة مستخدم حديثة وسريعة الاستجابة توفر لك تجربة سلسة بدون أي تأخير.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "وصول من أي مكان",
    description: "تابع أعمالك من أي جهاز وفي أي وقت، سواء من الحاسوب أو الهاتف المحمول.",
    icon: <Cloud className="w-6 h-6" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            نظام متكامل ينمو مع أعمالك
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg"
          >
            نوفر لك أحدث الأدوات التقنية لإدارة الموارد بثقة وسهولة لتتفرغ لتطوير أعمالك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md shadow-slate-900/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-brand-slate rounded-3xl p-10 md:p-14 text-white text-center md:text-right flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-white/5 rotate-12 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[50%] h-[200%] bg-brand-gold/10 -rotate-12 blur-3xl rounded-full"></div>
          </div>

          <div className="relative z-10 md:max-w-xl mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">هل أنت مستعد لنقل أعمالك للمستوى التالي؟</h3>
            <p className="text-slate-300 text-lg">انضم إلى مئات الشركات التي تعتمد على MKANY ERP يومياً لإدارة مواردها.</p>
          </div>
          
          <button className="relative z-10 whitespace-nowrap bg-brand-gold hover:bg-brand-gold/90 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/20">
            تواصل معنا <ArrowLeft className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
