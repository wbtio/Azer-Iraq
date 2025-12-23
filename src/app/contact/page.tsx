'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send, Wallet, CreditCard, Loader2, MessageCircle } from "lucide-react";
import { supabase } from '@/lib/supabaseClient';

interface SiteSettings {
  phone_1: string;
  phone_2: string;
  email: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  whatsapp_number: string;
  zaincash_number: string;
  mastercard_number: string;
  working_hours: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*');

        if (error) throw error;

        const settingsObj: any = {};
        data?.forEach((item: { key: string; value: string }) => {
          settingsObj[item.key] = item.value;
        });

        setSettings(settingsObj);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, phone, email, subject, message }]);

      if (error) throw error;

      // Build WhatsApp message
      const whatsappMessage = `*رسالة جديدة من الموقع*
━━━━━━━━━━━━━━
*الاسم:* ${name}
*الهاتف:* ${phone || 'غير محدد'}
*البريد:* ${email || 'غير محدد'}
*الموضوع:* ${subject || 'بدون موضوع'}
━━━━━━━━━━━━━━
*الرسالة:*
${message}`;

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${settings?.whatsapp_number || '9647855588554'}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      setSuccess(true);
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "العنوان",
      details: settings?.address ? [settings.address] : ["البصرة - حي الأساتذة", "قرب مستشفى الثقلين"],
    },
    {
      icon: Phone,
      title: "أرقام الهواتف",
      details: [settings?.phone_1 || "0785 558 8554", settings?.phone_2 || "0778 040 0165"].filter(Boolean),
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: [settings?.email || "Azer.organization.2024@gmail.com"],
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: settings?.working_hours ? [settings.working_hours] : ["السبت - الخميس", "9:00 صباحاً - 5:00 مساءً"],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
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

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                  ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">رقم الهاتف</label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">الموضوع</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">الرسالة *</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={20} />
                      إرسال عبر الواتساب
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  سيتم فتح تطبيق الواتساب لإرسال رسالتك مباشرة
                </p>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="h-80 rounded-2xl bg-dark-900 border border-dark-700 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-dark-800">
                  <div className="text-center">
                    <MapPin size={48} className="text-amber-400 mx-auto mb-4" />
                    <p className="text-gray-400">{settings?.address?.split('-')[0] || 'البصرة - حي الأساتذة'}</p>
                    <p className="text-gray-500 text-sm">{settings?.address?.split('-').slice(1).join('-') || 'قرب مستشفى الثقلين'}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                <h3 className="text-xl font-bold text-white mb-6 text-center">تابعنا على</h3>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={settings?.facebook_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                  >
                    <Facebook size={28} />
                  </a>
                  <a
                    href={settings?.instagram_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                  >
                    <Instagram size={28} />
                  </a>
                </div>
                <p className="text-gray-500 text-center mt-4 text-sm">
                  تابعنا لمشاهدة لحظات العطاء ومستجدات المشاريع
                </p>
              </div>

              {/* Payment Methods */}
              <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                <h3 className="text-xl font-bold text-white mb-6 text-center">وسائل الدفع</h3>
                <div className="flex flex-col gap-4">
                  {/* Zain Cash */}
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-dark-800 border border-dark-700">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">زين كاش</p>
                      <p className="text-white font-bold" dir="ltr">{settings?.zaincash_number || '07716626421'}</p>
                    </div>
                  </div>

                  {/* Mastercard */}
                  <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-dark-800 border border-dark-700">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                      <CreditCard size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">ماستر كارد</p>
                      <p className="text-white font-bold" dir="ltr">{settings?.mastercard_number || '6800319797'}</p>
                    </div>
                  </div>
                </div>
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
            احصل على بطاقة الدعم الخيرية وساهم في دعم المحتاجين مع فرصة للفوز بجوائز قيمة
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
