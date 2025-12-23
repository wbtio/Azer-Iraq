'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import {
    Loader2, Mail, Trash2, Eye, User, LogOut,
    MessageSquare, Check, Clock
} from 'lucide-react';
import Link from 'next/link';

interface Message {
    id: string;
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function MessagesPage() {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    // Auth check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Load messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setMessages(data || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchMessages();
        }
    }, [isAuthenticated]);

    const handleMarkAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ is_read: true })
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.filter(m => m.id !== id));
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const unreadCount = messages.filter(m => !m.is_read).length;

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
                            className="px-4 py-2 rounded-lg gold-gradient text-dark-900 font-bold whitespace-nowrap flex items-center gap-2"
                        >
                            الرسائل
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {unreadCount}
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
                            <Mail size={32} className="text-dark-900" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">
                            <span className="text-gradient">الرسائل الواردة</span>
                        </h1>
                        <p className="text-gray-400">
                            {messages.length} رسالة • {unreadCount} غير مقروءة
                        </p>
                    </div>

                    {/* Messages Layout */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Messages List */}
                        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-500">لا توجد رسائل حالياً</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <button
                                        key={message.id}
                                        onClick={() => {
                                            setSelectedMessage(message);
                                            if (!message.is_read) handleMarkAsRead(message.id);
                                        }}
                                        className={`w-full p-4 rounded-xl border text-right transition-all ${selectedMessage?.id === message.id
                                                ? 'bg-amber-500/10 border-amber-500/50'
                                                : 'bg-dark-900 border-dark-700 hover:border-dark-600'
                                            } ${!message.is_read ? 'border-r-4 border-r-amber-500' : ''}`}
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-bold text-white truncate">{message.name}</h3>
                                            {!message.is_read && (
                                                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 truncate mb-2">{message.subject || 'بدون موضوع'}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(message.created_at).toLocaleDateString('ar-IQ')}
                                        </p>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Message Detail */}
                        <div className="lg:col-span-2">
                            {selectedMessage ? (
                                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-dark-700">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                {selectedMessage.phone && (
                                                    <span dir="ltr">{selectedMessage.phone}</span>
                                                )}
                                                {selectedMessage.email && (
                                                    <span dir="ltr">{selectedMessage.email}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(selectedMessage.id)}
                                                className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-red-400 hover:bg-dark-700 transition-all"
                                                title="حذف"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    {selectedMessage.subject && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-500 mb-1">الموضوع</p>
                                            <p className="text-white font-medium">{selectedMessage.subject}</p>
                                        </div>
                                    )}

                                    {/* Message Content */}
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-2">الرسالة</p>
                                        <div className="p-4 rounded-xl bg-dark-800 border border-dark-700">
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                {selectedMessage.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock size={14} />
                                        <span>
                                            {new Date(selectedMessage.created_at).toLocaleDateString('ar-IQ', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                        {selectedMessage.is_read && (
                                            <span className="flex items-center gap-1 text-green-500 mr-4">
                                                <Check size={14} />
                                                تم القراءة
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 text-center h-full flex items-center justify-center min-h-[400px]">
                                    <div>
                                        <Eye size={48} className="text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-500">اختر رسالة لعرض تفاصيلها</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
