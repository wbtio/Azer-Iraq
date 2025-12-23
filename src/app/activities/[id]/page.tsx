import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight, Clock, Heart, Share2, Eye } from 'lucide-react';

// Force dynamic to fetch fresh data
export const dynamic = 'force-dynamic';

export default async function ActivityDetailsPage({ params }: { params: { id: string } }) {
    const { data: activity, error } = await supabase
        .from('activities')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !activity) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-dark-950">
                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 text-center max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-4">النشاط غير موجود</h1>
                    <p className="text-gray-400 mb-6">عذراً، لم نتمكن من العثور على هذا النشاط.</p>
                    <Link
                        href="/activities"
                        className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all"
                    >
                        <ChevronRight size={18} />
                        العودة للنشاطات
                    </Link>
                </div>
            </div>
        );
    }

    // Increment view count (fire and forget - don't await)
    supabase
        .from('activities')
        .update({ view_count: (activity.view_count || 0) + 1 })
        .eq('id', params.id)
        .then(() => { });

    return (
        <div className="pt-20">
            {/* Hero / Header Image */}
            <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    {activity.images && activity.images.length > 0 ? (
                        <Image
                            src={activity.images[0]}
                            alt={activity.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <Image
                            src="/images/hero-bg.jpg"
                            alt={activity.title}
                            fill
                            className="object-cover opacity-30"
                            priority
                        />
                    )}
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/70 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-transparent z-0" />

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-16">
                    {/* Back Link */}
                    <Link
                        href="/activities"
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 mb-6 transition-colors font-medium"
                    >
                        <ChevronRight size={20} />
                        العودة لجميع النشاطات
                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
                        {activity.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-300">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-dark-700">
                            <Calendar size={18} className="text-amber-400" />
                            {activity.activity_date}
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-dark-700">
                            <Clock size={18} className="text-amber-400" />
                            {new Date(activity.created_at).toLocaleDateString('ar-IQ')}
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-sm border border-dark-700">
                            <Eye size={18} className="text-amber-400" />
                            {(activity.view_count || 0) + 1} مشاهدة
                        </span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-20 bg-dark-950">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Article Content */}
                        <div className="p-8 md:p-10 rounded-2xl bg-dark-900 border border-dark-700 mb-12">
                            <div className="prose prose-lg prose-invert max-w-none">
                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                                    {activity.content}
                                </p>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {activity.images && activity.images.length > 1 && (
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                    <span className="text-gradient">معرض الصور</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activity.images.slice(1).map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="relative aspect-video rounded-2xl overflow-hidden bg-dark-800 border border-dark-700 hover:border-amber-500/50 transition-all card-shadow group"
                                        >
                                            <Image
                                                src={img}
                                                alt={`${activity.title} - صورة ${idx + 2}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                                    <Share2 size={24} className="text-dark-900" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">شارك هذا النشاط</p>
                                    <p className="text-gray-400 text-sm">ساعدنا في نشر الخير</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://azer-iraq.org/activities/${params.id}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activity.title)}&url=${encodeURIComponent(`https://azer-iraq.org/activities/${params.id}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
                                </a>
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`${activity.title} - https://azer-iraq.org/activities/${params.id}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-dark-700 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-600/10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Heart size={48} className="text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        ساهم في <span className="text-gradient">دعم المحتاجين</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        كل مساهمة تصنع فرقاً حقيقياً. انضم إلينا وكن جزءاً من رحلة العطاء.
                    </p>
                    <a
                        href="/charity-card"
                        className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-dark-900 font-bold rounded-full hover:opacity-90 transition-all text-lg"
                    >
                        ساهم الآن
                    </a>
                </div>
            </section>
        </div>
    );
}
