'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import {
    Loader2, User, LogOut, LayoutDashboard,
    Newspaper, MessageSquare, Eye, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Stats {
    totalActivities: number;
    totalViews: number;
    totalMessages: number;
    unreadMessages: number;
}

export default function AdminDashboard() {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats>({
        totalActivities: 0,
        totalViews: 0,
        totalMessages: 0,
        unreadMessages: 0,
    });

    // Auth check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Load stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get activities count and views
                const { data: activities, error: activitiesError } = await supabase
                    .from('activities')
                    .select('id, view_count');

                if (activitiesError) throw activitiesError;

                const totalActivities = activities?.length || 0;
                const totalViews = activities?.reduce((sum, a) => sum + (a.view_count || 0), 0) || 0;

                // Get messages count
                const { data: messages, error: messagesError } = await supabase
                    .from('contact_messages')
                    .select('id, is_read');

                if (messagesError) throw messagesError;

                const totalMessages = messages?.length || 0;
                const unreadMessages = messages?.filter(m => !m.is_read).length || 0;

                setStats({
                    totalActivities,
                    totalViews,
                    totalMessages,
                    unreadMessages,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

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
                <div className="max-w-6xl mx-auto">

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
                            className="px-4 py-2 rounded-lg gold-gradient text-dark-900 font-bold whitespace-nowrap"
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
                            className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap flex items-center gap-2"
                        >
                            الرسائل
                            {stats.unreadMessages > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {stats.unreadMessages}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        >
                            الإعدادات
                        </Link>
                    </div>

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4">
                            <LayoutDashboard size={32} className="text-dark-900" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">
                            <span className="text-gradient">لوحة التحكم</span>
                        </h1>
                        <p className="text-gray-400">نظرة عامة على إحصائيات الموقع</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                        {/* Activities Card */}
                        <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Newspaper size={24} className="text-blue-400" />
                                </div>
                                <TrendingUp size={20} className="text-green-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.totalActivities}</p>
                            <p className="text-gray-400 text-sm">إجمالي النشاطات</p>
                        </div>

                        {/* Views Card */}
                        <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Eye size={24} className="text-purple-400" />
                                </div>
                                <TrendingUp size={20} className="text-green-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.totalViews}</p>
                            <p className="text-gray-400 text-sm">إجمالي المشاهدات</p>
                        </div>

                        {/* Messages Card */}
                        <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageSquare size={24} className="text-green-400" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.totalMessages}</p>
                            <p className="text-gray-400 text-sm">إجمالي الرسائل</p>
                        </div>

                        {/* Unread Messages Card */}
                        <div className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageSquare size={24} className="text-amber-400" />
                                </div>
                                {stats.unreadMessages > 0 && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">جديد</span>
                                )}
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.unreadMessages}</p>
                            <p className="text-gray-400 text-sm">رسائل غير مقروءة</p>
                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link
                            href="/admin/activities"
                            className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all text-center group"
                        >
                            <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Newspaper size={28} className="text-dark-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">إدارة النشاطات</h3>
                            <p className="text-gray-400 text-sm">إضافة، تعديل، وحذف النشاطات</p>
                        </Link>

                        <Link
                            href="/admin/messages"
                            className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all text-center group"
                        >
                            <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <MessageSquare size={28} className="text-dark-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">الرسائل الواردة</h3>
                            <p className="text-gray-400 text-sm">عرض وإدارة رسائل الزوار</p>
                        </Link>

                        <Link
                            href="/admin/settings"
                            className="p-6 rounded-2xl bg-dark-900 border border-dark-700 hover:border-amber-500/50 transition-all text-center group"
                        >
                            <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <User size={28} className="text-dark-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">إعدادات الموقع</h3>
                            <p className="text-gray-400 text-sm">تعديل معلومات التواصل والسوشيال</p>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
