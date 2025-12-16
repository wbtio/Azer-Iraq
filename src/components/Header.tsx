"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/projects", label: "مشاريعنا" },
  { href: "/charity-card", label: "بطاقة الدعم الخيري" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-dark-900 font-bold text-xl">أزر</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gradient">مؤسسة أزر</h1>
              <p className="text-xs text-gray-400">للمساعدات الإنسانية</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/charity-card"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            ادعم الآن
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-amber-400 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gold-500/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/charity-card"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-opacity mt-2"
              >
                ادعم الآن
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
