import Image from "next/image";
import { Home, Heart, ShoppingBag, Stethoscope, AlertCircle, Sparkles } from "lucide-react";

const projects = [
  {
    icon: Home,
    title: "رعاية العوائل المتعففة",
    description: "نقدم الدعم المستمر للعوائل المحتاجة ونخفف عنهم ونعينهم ونواسيهم.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ShoppingBag,
    title: "توفير السلات الغذائية",
    description: "نوزع السلات الغذائية على العوائل المحتاجة لتوفير قوت يومهم.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Home,
    title: "بناء وترميم الدور السكنية",
    description: "نساهم في بناء وترميم البيوت التي تنتظر أن تُعاد لها الحياة.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Stethoscope,
    title: "دعم العمليات والعلاجات الطبية",
    description: "نساعد المرضى الذين ينتظرون من يساعدهم على الوقوف من جديد.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: AlertCircle,
    title: "مبادرات إنسانية متنوعة",
    description: "مبادرات إنسانية متنوعة تخفّف وتُعين وتواسي.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "دعم الأطفال",
    description: "نساعد الأطفال الذين يحتاجون علاجاً ورعاية خاصة.",
    color: "from-pink-500 to-pink-600",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Our Projects"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/80 to-dark-950 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">مشاريعنا</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              نعمل على عدة محاور لتقديم المساعدة للمحتاجين وتحسين حياتهم من خلال مشاريع متنوعة ومستدامة.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all duration-300 card-shadow"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <project.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="text-gradient">أثرنا</span>
              </h2>
              <p className="text-gray-400">أرقام تحكي قصص نجاح ومساعدة</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">+500</p>
                <p className="text-gray-400 text-sm">عائلة مستفيدة</p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">+50</p>
                <p className="text-gray-400 text-sm">منزل تم ترميمه</p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">+1000</p>
                <p className="text-gray-400 text-sm">سلة غذائية</p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">+100</p>
                <p className="text-gray-400 text-sm">حالة طبية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart size={48} className="text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ساهم في <span className="text-gradient">مشاريعنا</span>
            </h2>
            <p className="text-gray-400 mb-8">
              مساهمتك تصنع الفرق في حياة المحتاجين. انضم إلينا اليوم وكن جزءاً من رحلة العطاء.
            </p>
            <a
              href="/charity-card"
              className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
            >
              ادعم مشاريعنا الآن
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
