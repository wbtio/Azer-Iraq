import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-dark-900 font-bold text-xl">أزر</span>
              </div>
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
                <Link href="/projects" className="text-gray-400 hover:text-amber-400 transition-colors">
                  مشاريعنا
                </Link>
              </li>
              <li>
                <Link href="/charity-card" className="text-gray-400 hover:text-amber-400 transition-colors">
                  بطاقة الدعم الخيري
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
                <span>البصرة - حي الأساتذة - قرب مستشفى الثقلين</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span dir="ltr">0785 558 8554</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span dir="ltr">0778 040 0165</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <span className="text-sm">Azer.organization.2024@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
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
