import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Wallet, CreditCard } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fzajmuxhmvczocxalfrs.supabase.co';
const supabaseKey = 'sb_publishable_W2YXqwV4O-rSSYXM8KDWxQ_dvNKWvJ4';
const supabase = createClient(supabaseUrl, supabaseKey);

interface SiteSettings {
  [key: string]: string;
}

async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;

    const settings: SiteSettings = {};
    data?.forEach((item: { key: string; value: string }) => {
      settings[item.key] = item.value;
    });
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-dark-950 border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/ذهبي-مفرغ.svg"
                alt="مؤسسة أزر"
                className="h-16 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold text-gradient">مؤسسة أزر</h3>
                <p className="text-xs text-gray-400">للمساعدات الإنسانية</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              نؤمن بأن الإنسان يستحق فرصة، ويداً حانية، وقلباً يشعر به. نعمل لنكون جسراً يصل المحسنين بالمحتاجين.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-400 hover:text-amber-400 transition-colors">
                  نشاطات المؤسسة
                </Link>
              </li>
              <li>
                <Link href="/charity-card" className="text-gray-400 hover:text-amber-400 transition-colors">
                  بطاقة الدعم الخيرية
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-amber-400 flex-shrink-0" />
                <span>{settings.address || 'البصرة - حي الأساتذة - قرب مستشفى الثقلين'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span dir="ltr">{settings.phone_1 || '0785 558 8554'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span dir="ltr">{settings.phone_2 || '0778 040 0165'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <span className="text-sm">{settings.email || 'Azer.organization.2024@gmail.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-8 pt-8 border-t border-gold-500/10">
          <h4 className="text-amber-400 font-bold mb-4 text-center">وسائل الدفع</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Zain Cash */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-dark-800 border border-dark-700">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                <Wallet size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">زين كاش</p>
                <p className="text-white font-bold" dir="ltr">{settings.zaincash_number || '07716626421'}</p>
              </div>
            </div>

            {/* Mastercard */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-dark-800 border border-dark-700">
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                <CreditCard size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">ماستر كارد</p>
                <p className="text-white font-bold" dir="ltr">{settings.mastercard_number || '6800319797'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={settings.facebook_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href={settings.instagram_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} مؤسسة أزر للمساعدات الإنسانية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
