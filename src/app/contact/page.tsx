import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "العنوان",
    details: ["البصرة - حي الأساتذة", "قرب مستشفى الثقلين"],
  },
  {
    icon: Phone,
    title: "أرقام الهواتف",
    details: ["0785 558 8554", "0778 040 0165"],
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    details: ["Azer.organization.2024@gmail.com"],
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    details: ["السبت - الخميس", "9:00 صباحاً - 5:00 مساءً"],
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Contact Us"
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
              <span className="text-gradient">تواصل معنا</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              نحن هنا لمساعدتك. تواصل معنا للاستفسار أو للمساهمة في مشاريعنا الخيرية.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-dark-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon size={28} className="text-dark-900" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-400" dir={info.icon === Phone ? "ltr" : "rtl"}>
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
              <h2 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">الاسم الكامل</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">رقم الهاتف</label>
                    <input
                      type="tel"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                      placeholder="07XX XXX XXXX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">البريد الإلكتروني</label>
                  <input
                    type="email"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">الموضوع</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">الرسالة</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-xl hover:opacity-90 transition-all"
                >
                  <Send size={20} />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="h-80 rounded-2xl bg-dark-900 border border-dark-700 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-dark-800">
                  <div className="text-center">
                    <MapPin size={48} className="text-amber-400 mx-auto mb-4" />
                    <p className="text-gray-400">البصرة - حي الأساتذة</p>
                    <p className="text-gray-500 text-sm">قرب مستشفى الثقلين</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                <h3 className="text-xl font-bold text-white mb-6 text-center">تابعنا على</h3>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="#"
                    className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                  >
                    <Facebook size={28} />
                  </a>
                  <a
                    href="#"
                    className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                  >
                    <Instagram size={28} />
                  </a>
                </div>
                <p className="text-gray-500 text-center mt-4 text-sm">
                  تابعنا لمشاهدة لحظات العطاء ومستجدات المشاريع
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            هل تريد <span className="text-gradient">المساهمة</span>؟
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            احصل على بطاقة الدعم الخيري وساهم في دعم المحتاجين مع فرصة للفوز بجوائز قيمة
          </p>
          <a
            href="/charity-card"
            className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
          >
            اعرف المزيد عن البطاقة
          </a>
        </div>
      </section>
    </div>
  );
}
