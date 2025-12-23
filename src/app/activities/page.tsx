import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronLeft, Heart, Newspaper } from 'lucide-react';

// Force dynamic rendering to ensure we always get the latest activities
export const dynamic = 'force-dynamic';

export default async function ActivitiesPage() {
    const { data: activities, error } = await supabase
        .from('activities')
        .select('*')
        .order('activity_date', { ascending: false });

    if (error) {
        console.error('Error fetching activities:', error);
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="نشاطات المؤسسة"
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
                            <span className="text-gradient">نشاطات المؤسسة</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            تابع آخر أخبارنا وفعالياتنا الميدانية في خدمة المجتمع. نسعى دائماً لإيصال المساعدات وتقديم الدعم للمحتاجين.
                        </p>
                    </div>
                </div>
            </section>

            {/* Activities Grid */}
            <section className="py-20 bg-dark-950">
                <div className="container mx-auto px-4">

                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="text-gradient">آخر النشاطات</span>
                        </h2>
                        <p className="text-gray-400">اطلع على أحدث الفعاليات والمبادرات التي قمنا بها</p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activities?.map((activity) => (
                            <Link
                                href={`/activities/${activity.id}`}
                                key={activity.id}
                                className="group rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all duration-300 card-shadow overflow-hidden flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="relative h-56 w-full overflow-hidden bg-dark-800">
                                    {activity.images && activity.images.length > 0 ? (
                                        <Image
                                            src={activity.images[0]}
                                            alt={activity.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-600">
                                            <Newspaper size={48} className="opacity-50" />
                                        </div>
                                    )}
                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 gold-gradient px-3 py-1.5 rounded-full text-sm font-bold text-dark-900 flex items-center gap-1.5 shadow-lg">
                                        <Calendar size={14} />
                                        {activity.activity_date}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-relaxed group-hover:text-amber-400 transition-colors">
                                        {activity.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm flex-1">
                                        {activity.content}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-dark-700 flex items-center justify-end text-amber-400 font-medium group-hover:gap-2 transition-all">
                                        اقرأ المزيد
                                        <ChevronLeft size={18} className="mr-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {(!activities || activities.length === 0) && (
                            <div className="col-span-full py-20">
                                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 text-center max-w-md mx-auto">
                                    <Newspaper size={48} className="text-amber-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">لا توجد نشاطات حالياً</h3>
                                    <p className="text-gray-400">سيتم إضافة النشاطات قريباً، تابعنا!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Heart size={48} className="text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        ساهم في <span className="text-gradient">نشاطاتنا</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        مساهمتك تصنع الفرق في حياة المحتاجين. انضم إلينا اليوم وكن جزءاً من رحلة العطاء.
                    </p>
                    <a
                        href="/charity-card"
                        className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
                    >
                        ادعم الآن
                    </a>
                </div>
            </section>
        </div>
    );
}
