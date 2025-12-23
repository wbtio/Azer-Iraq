'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import {
    Loader2, Save, Phone, Mail, MapPin, Facebook, Instagram,
    Wallet, CreditCard, MessageCircle, User, LogOut, Settings as SettingsIcon
} from 'lucide-react';
import Link from 'next/link';

interface Setting {
    key: string;
    value: string;
}

export default function SettingsPage() {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    // Settings state
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [zaincashNumber, setZaincashNumber] = useState('');
    const [mastercardNumber, setMastercardNumber] = useState('');
    const [workingHours, setWorkingHours] = useState('');

    // Auth check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Load settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*');

                if (error) throw error;

                const settings: Record<string, string> = {};
                data?.forEach((item: Setting) => {
                    settings[item.key] = item.value;
                });

                setPhone1(settings.phone_1 || '');
                setPhone2(settings.phone_2 || '');
                setEmail(settings.email || '');
                setAddress(settings.address || '');
                setFacebookUrl(settings.facebook_url || '');
                setInstagramUrl(settings.instagram_url || '');
                setWhatsappNumber(settings.whatsapp_number || '');
                setZaincashNumber(settings.zaincash_number || '');
                setMastercardNumber(settings.mastercard_number || '');
                setWorkingHours(settings.working_hours || '');
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchSettings();
        }
    }, [isAuthenticated]);

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);

        const updates = [
            { key: 'phone_1', value: phone1 },
            { key: 'phone_2', value: phone2 },
            { key: 'email', value: email },
            { key: 'address', value: address },
            { key: 'facebook_url', value: facebookUrl },
            { key: 'instagram_url', value: instagramUrl },
            { key: 'whatsapp_number', value: whatsappNumber },
            { key: 'zaincash_number', value: zaincashNumber },
            { key: 'mastercard_number', value: mastercardNumber },
            { key: 'working_hours', value: workingHours },
        ];

        try {
            for (const update of updates) {
                const { error } = await supabase
                    .from('site_settings')
                    .update({ value: update.value, updated_at: new Date().toISOString() })
                    .eq('key', update.key);

                if (error) throw error;
            }
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('حدث خطأ أثناء حفظ الإعدادات');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    if (authLoading || loading) {
        return (
            <div className="pt-20 min-h-screen bg-dark-950 flex items-center justify-center">
                <Loader2 className="animate-spin text-amber-400" size={48} />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="pt-20 min-h-screen bg-dark-950">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">

                    {/* Admin Header */}
                    <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-dark-900 border border-dark-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                                <User size={20} className="text-dark-900" />
                            </div>
                            <div>
                                <p className="text-white font-medium">مرحباً، {user?.username}</p>
                                <p className="text-gray-500 text-sm">مسؤول النظام</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-red-400 hover:bg-dark-700 transition-all"
                        >
                            <LogOut size={18} />
                            تسجيل الخروج
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        <Link
                            href="/admin"
                            className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        >
                            الرئيسية
                        </Link>
                        <Link
                            href="/admin/activities"
                            className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        >
                            النشاطات
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        >
                            الرسائل
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="px-4 py-2 rounded-lg gold-gradient text-dark-900 font-bold whitespace-nowrap"
                        >
                            الإعدادات
                        </Link>
                    </div>

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4">
                            <SettingsIcon size={32} className="text-dark-900" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">
                            <span className="text-gradient">إعدادات الموقع</span>
                        </h1>
                        <p className="text-gray-400">قم بتعديل معلومات التواصل وحسابات السوشيال ميديا</p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                            ✅ تم حفظ الإعدادات بنجاح!
                        </div>
                    )}

                    {/* Settings Form */}
                    <div className="space-y-8">

                        {/* Contact Information */}
                        <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Phone size={20} className="text-amber-400" />
                                معلومات التواصل
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">رقم الهاتف الأول</label>
                                    <input
                                        type="text"
                                        value={phone1}
                                        onChange={(e) => setPhone1(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">رقم الهاتف الثاني</label>
                                    <input
                                        type="text"
                                        value={phone2}
                                        onChange={(e) => setPhone2(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">ساعات العمل</label>
                                    <input
                                        type="text"
                                        value={workingHours}
                                        onChange={(e) => setWorkingHours(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 mb-2 text-sm">العنوان</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Instagram size={20} className="text-amber-400" />
                                حسابات التواصل الاجتماعي
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm flex items-center gap-2">
                                        <Facebook size={16} />
                                        رابط الفيسبوك
                                    </label>
                                    <input
                                        type="url"
                                        value={facebookUrl}
                                        onChange={(e) => setFacebookUrl(e.target.value)}
                                        placeholder="https://facebook.com/..."
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm flex items-center gap-2">
                                        <Instagram size={16} />
                                        رابط الانستغرام
                                    </label>
                                    <input
                                        type="url"
                                        value={instagramUrl}
                                        onChange={(e) => setInstagramUrl(e.target.value)}
                                        placeholder="https://instagram.com/..."
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 mb-2 text-sm flex items-center gap-2">
                                        <MessageCircle size={16} />
                                        رقم الواتساب (بدون + مع رمز الدولة)
                                    </label>
                                    <input
                                        type="text"
                                        value={whatsappNumber}
                                        onChange={(e) => setWhatsappNumber(e.target.value)}
                                        placeholder="9647XXXXXXXXX"
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Wallet size={20} className="text-amber-400" />
                                وسائل الدفع
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm flex items-center gap-2">
                                        <Wallet size={16} className="text-purple-400" />
                                        رقم زين كاش
                                    </label>
                                    <input
                                        type="text"
                                        value={zaincashNumber}
                                        onChange={(e) => setZaincashNumber(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm flex items-center gap-2">
                                        <CreditCard size={16} className="text-orange-400" />
                                        رقم ماستركارد
                                    </label>
                                    <input
                                        type="text"
                                        value={mastercardNumber}
                                        onChange={(e) => setMastercardNumber(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors text-left"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full gold-gradient text-dark-900 font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-70"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} />
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    <Save size={24} />
                                    حفظ الإعدادات
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
