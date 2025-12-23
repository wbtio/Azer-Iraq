import Link from "next/link";
import Image from "next/image";
import { Heart, Home, Users, Gift, ArrowLeft, Sparkles } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "بناء وترميم الدور",
    description: "نساعد في بناء وترميم المنازل للعوائل المحتاجة",
    image: "/images/renovation.jpg",
  },
  {
    icon: Heart,
    title: "الرعاية الصحية",
    description: "تمويل العمليات والعلاجات الطبية للمحتاجين",
    image: "/images/medical.jpg",
  },
  {
    icon: Users,
    title: "رعاية العوائل",
    description: "دعم العوائل المتعففة بالسلات الغذائية والمساعدات",
    image: "/images/charity.jpg",
  },
  {
    icon: Gift,
    title: "الحالات الطارئة",
    description: "الاستجابة السريعة للحالات الإنسانية الطارئة",
    image: "/images/hero-bg.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Iraqi Landscape"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/80 to-dark-950 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent z-0" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm">
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">مرحباً بكم في نافذة أزر</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">مؤسسة أزر</span>
              <br />
              <span className="text-gradient">للمساعدات الإنسانية</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              هنا حيث تُصنع البسمة، ويُعاد الأمل، وتُكتب حكايات جديدة لعوائل كانت تنتظر يداً تمتد إليها بالخير.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/charity-card"
                className="group inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg shadow-lg shadow-amber-500/20"
              >
                ساهم في بطاقة الدعم الخيرية الآن
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 font-medium rounded-full hover:border-amber-500 hover:text-amber-400 transition-all backdrop-blur-sm bg-dark-900/30"
              >
                تعرف علينا
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2 bg-dark-900/50 backdrop-blur-sm">
            <div className="w-1 h-2 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              كيف نصنع <span className="text-gradient">الأثر</span>؟
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نعمل على عدة محاور لتقديم المساعدة للمحتاجين وتحسين حياتهم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all duration-300 card-shadow overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                    <feature.icon size={24} className="text-dark-900" />
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Card CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Gift size={16} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">مشروع بطاقة الدعم الخيري</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              بطاقة صغيرة... <span className="text-gradient">لكن أثرها كبير</span>
            </h2>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              من خلال مساهمة رمزية، تكون شريكاً في دعم مشاريعنا الإنسانية، وترسم مستقبلاً أفضل لمن ينتظرون الأمل.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="px-6 py-3 rounded-xl bg-dark-800 border border-amber-500/30">
                <p className="text-sm text-gray-400">الهدية الكبرى</p>
                <p className="text-xl font-bold text-gradient">وحدة سكنية لعائلة من المحتاجين</p>
              </div>
              <div className="px-6 py-3 rounded-xl bg-dark-800 border border-amber-500/30">
                <p className="text-sm text-gray-400">جوائز إضافية</p>
                <p className="text-xl font-bold text-gradient">جوائز أخرى</p>
              </div>
            </div>

            <Link
              href="/charity-card"
              className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
            >
              اعرف المزيد عن البطاقة
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-950 border-y border-dark-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">+500</p>
              <p className="text-gray-400">عائلة مستفيدة</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">+50</p>
              <p className="text-gray-400">منزل تم ترميمه</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">+1000</p>
              <p className="text-gray-400">سلة غذائية</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">+100</p>
              <p className="text-gray-400">حالة طبية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
