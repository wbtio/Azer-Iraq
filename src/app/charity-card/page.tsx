import { Gift, Home, Award, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const benefits = [
  "لأن هناك عوائل تبحث عن قوت يومها",
  "وأطفالاً يحتاجون علاجاً",
  "وبيوتاً تنتظر أن تُعاد لها الحياة",
  "ومرضى ينتظرون من يساعدهم على الوقوف من جديد",
];

const prizes = [
  { title: "الجائزة الكبرى", description: "وحدة سكنية للمساهمة الكبرى", icon: Home },
  { title: "جوائز تقديرية", description: "100 جائزة تقديراً لكل من يضع بصمته", icon: Award },
];

export default function CharityCardPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
              <Gift size={16} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">مشروع بطاقة الدعم الخيري</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              بطاقة صغيرة...
              <br />
              <span className="text-gradient">لكن أثرها كبير</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              من خلال مساهمة رمزية قدرها 3,000 دينار فقط، تكون شريكاً في دعم مشاريعنا الإنسانية، وترسم مستقبلاً أفضل لمن ينتظرون الأمل.
            </p>

            {/* Price Card */}
            <div className="inline-block p-8 rounded-2xl bg-dark-800/50 border border-amber-500/30 card-shadow mb-8">
              <p className="text-gray-400 mb-2">قيمة المساهمة</p>
              <p className="text-5xl md:text-6xl font-bold text-gradient">3,000</p>
              <p className="text-xl text-amber-400 mt-2">دينار عراقي فقط</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
              >
                <Gift size={20} />
                اشترِ البطاقة الآن
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Card Section */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                لماذا أطلقنا <span className="text-gradient">هذه البطاقة</span>؟
              </h2>
              <p className="text-gray-400">مساهمتك تذهب مباشرة لدعم المحتاجين</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-xl bg-dark-900 border border-dark-700"
                >
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-dark-900" />
                  </div>
                  <p className="text-gray-300 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">الجوائز والمسابقة</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ولأن الخير يعود <span className="text-gradient">لأصحابه</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {prizes.map((prize, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-dark-900 border border-amber-500/30 text-center card-shadow"
                >
                  <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-6">
                    <prize.icon size={40} className="text-dark-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{prize.title}</h3>
                  <p className="text-xl text-gradient font-bold">{prize.description}</p>
                </div>
              ))}
            </div>

            {/* Draw Info */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
              <h3 className="text-xl font-bold text-white mb-4 text-center">آلية السحب</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                ستجرى قرعة الجوائز علناً وسيتم الإعلان عنها عبر صفحات التواصل الاجتماعي للمؤسسة الرسمية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
              <AlertTriangle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-amber-400 mb-2">تنبيه مهم</h4>
                <p className="text-gray-300">
                  لا تسمح بنسخ البطاقة، احتفظ ببطاقتك لضمان حقك في الجوائز.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-dark-900" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            كن جزءاً من <span className="text-gradient">رحلة العطاء</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            مساهمتك الصغيرة تصنع فرقاً كبيراً في حياة المحتاجين
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
          >
            تواصل معنا للحصول على البطاقة
          </a>
        </div>
      </section>
    </div>
  );
}
