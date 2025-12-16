import { Heart, Eye, Target, Users, Shield, Sparkles } from "lucide-react";

const values = [
  { icon: Heart, title: "الرحمة", description: "نتعامل مع كل حالة بقلب رحيم" },
  { icon: Shield, title: "الصدق", description: "الشفافية في كل ما نقوم به" },
  { icon: Target, title: "المسؤولية", description: "نتحمل مسؤولية كل عمل نقوم به" },
  { icon: Users, title: "العمل الجماعي", description: "معاً نصنع الفرق" },
  { icon: Sparkles, title: "الأثر المستدام", description: "نسعى لتحقيق أثر دائم" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">من نحن</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              نحن في مؤسسة أزر نؤمن بأن الإنسان يستحق فرصة... ويداً حانية... وقلباً يشعر به. نعمل لنكون جسراً يصل المحسنين بالمحتاجين، ونحمل رسالة صادقة هدفها أن لا يبقى قلب مكسور، ولا عائلة بلا سند، ولا مريض دون علاج.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* About Text */}
            <div className="prose prose-lg prose-invert mx-auto mb-16">
              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 mb-8">
                <h2 className="text-2xl font-bold text-gradient mb-4">نبذة عنا</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  نحن في مؤسسة أزر نؤمن بأن الإنسان يستحق فرصة... ويداً حانية... وقلباً يشعر به. نعمل لنكون جسراً يصل المحسنين بالمحتاجين، ونحمل رسالة صادقة هدفها أن لا يبقى قلب مكسور، ولا عائلة بلا سند، ولا مريض دون علاج.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-4">
                  <Target size={28} className="text-dark-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">رسالتنا</h3>
                <p className="text-gray-400 leading-relaxed">
                  أن نمنح الأمل بصورته الأجمل... وأن نحول العطاء إلى أثر، والنية الطيبة إلى حياة تتغيّر نحو الأفضل.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-4">
                  <Eye size={28} className="text-dark-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">رؤيتنا</h3>
                <p className="text-gray-400 leading-relaxed">
                  نطمح أن نكون ضوءاً يصل إلى كل بيت محتاج، وأن نصنع أثراً إنسانياً يبقى، لا يُنسى، ويكبر مع كل يد تمتد للخير.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="text-gradient">قيمنا</span>
              </h2>
              <p className="text-gray-400">المبادئ التي نسير عليها في كل خطوة</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all text-center group"
                >
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <value.icon size={24} className="text-dark-900" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{value.title}</h4>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            كن جزءاً من <span className="text-gradient">رحلة العطاء</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            انضم إلينا في مسيرة الخير وساهم في صنع الفرق في حياة المحتاجين
          </p>
          <a
            href="/charity-card"
            className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
          >
            ساهم الآن
          </a>
        </div>
      </section>
    </div>
  );
}
