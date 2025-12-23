import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "مؤسسة أزر للمساعدات الإنسانية",
  description: "قليل منك... كثير عند محتاج - مؤسسة أزر للمساعدات الإنسانية في العراق",
  icons: {
    icon: "/ذهبي-مفرغ.svg",
    shortcut: "/ذهبي-مفرغ.svg",
    apple: "/ذهبي-مفرغ.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
