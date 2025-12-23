'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import {
    Loader2, Upload, X, Plus, Image as ImageIcon, Calendar, FileText,
    Sparkles, LogOut, User, Trash2, Edit, Eye, ChevronDown, ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Activity {
    id: string;
    title: string;
    content: string;
    activity_date: string;
    images: string[];
    view_count: number;
    created_at: string;
}

export default function ActivitiesControlPanel() {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [activitiesLoading, setActivitiesLoading] = useState(true);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);
    const [images, setImages] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auth check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [authLoading, isAuthenticated, router]);

    // Load activities
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, error } = await supabase
                    .from('activities')
                    .select('*')
                    .order('activity_date', { ascending: false });

                if (error) throw error;
                setActivities(data || []);
            } catch (error) {
                console.error('Error fetching activities:', error);
            } finally {
                setActivitiesLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchActivities();
        }
    }, [isAuthenticated]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles]);
            const newUrls = newFiles.map(file => URL.createObjectURL(file));
            setImageUrls((prev) => [...prev, ...newUrls]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const uploadImagesToSupabase = async () => {
        const uploadedUrls: string[] = [];

        for (const file of images) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error } = await supabase.storage
                .from('activity_images')
                .upload(fileName, file);

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from('activity_images')
                .getPublicUrl(fileName);

            uploadedUrls.push(publicUrlData.publicUrl);
        }
        return uploadedUrls;
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setActivityDate(new Date().toISOString().split('T')[0]);
        setImages([]);
        setImageUrls([]);
        setExistingImages([]);
        setEditingActivity(null);
        setShowForm(false);
    };

    const handleEdit = (activity: Activity) => {
        setEditingActivity(activity);
        setTitle(activity.title);
        setContent(activity.content);
        setActivityDate(activity.activity_date);
        setExistingImages(activity.images || []);
        setImages([]);
        setImageUrls([]);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا النشاط؟')) return;

        try {
            const { error } = await supabase
                .from('activities')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setActivities(activities.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting activity:', error);
            alert('حدث خطأ أثناء الحذف');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            let uploadedImageUrls: string[] = [];
            if (images.length > 0) {
                setUploading(true);
                uploadedImageUrls = await uploadImagesToSupabase();
                setUploading(false);
            }

            const allImages = [...existingImages, ...uploadedImageUrls];

            if (editingActivity) {
                // Update existing
                const { error } = await supabase
                    .from('activities')
                    .update({
                        title,
                        content,
                        activity_date: activityDate,
                        images: allImages,
                    })
                    .eq('id', editingActivity.id);

                if (error) throw error;

                setActivities(activities.map(a =>
                    a.id === editingActivity.id
                        ? { ...a, title, content, activity_date: activityDate, images: allImages }
                        : a
                ));
            } else {
                // Insert new
                const { data, error } = await supabase
                    .from('activities')
                    .insert([{ title, content, activity_date: activityDate, images: allImages }])
                    .select()
                    .single();

                if (error) throw error;
                setActivities([data, ...activities]);
            }

            setSuccess(true);
            resetForm();
            setTimeout(() => setSuccess(false), 3000);

        } catch (error: any) {
            console.error('Error saving activity:', error);
            alert('حدث خطأ: ' + error.message);
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    if (authLoading) {
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
                        <Link href="/admin" className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                            الرئيسية
                        </Link>
                        <Link href="/admin/activities" className="px-4 py-2 rounded-lg gold-gradient text-dark-900 font-bold whitespace-nowrap">
                            النشاطات
                        </Link>
                        <Link href="/admin/messages" className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                            الرسائل
                        </Link>
                        <Link href="/admin/settings" className="px-4 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                            الإعدادات
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4">
                            <Sparkles size={32} className="text-dark-900" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">
                            <span className="text-gradient">إدارة النشاطات</span>
                        </h1>
                        <p className="text-gray-400">أضف وعدّل نشاطات المؤسسة</p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                            ✅ تم الحفظ بنجاح!
                        </div>
                    )}

                    {/* Add New Button */}
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full mb-8 p-4 rounded-xl border-2 border-dashed border-dark-600 hover:border-amber-500 text-gray-400 hover:text-amber-400 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={24} />
                            إضافة نشاط جديد
                        </button>
                    )}

                    {/* Form */}
                    {showForm && (
                        <div className="mb-8 p-8 rounded-2xl bg-dark-900 border border-dark-700 card-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    {editingActivity ? 'تعديل النشاط' : 'إضافة نشاط جديد'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                                        <FileText size={18} className="text-amber-400" />
                                        عنوان النشاط
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="مثال: توزيع سلات غذائية"
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                                        <Calendar size={18} className="text-amber-400" />
                                        تاريخ النشاط
                                    </label>
                                    <input
                                        type="date"
                                        value={activityDate}
                                        onChange={(e) => setActivityDate(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-white font-medium mb-2">
                                        <FileText size={18} className="text-amber-400" />
                                        تفاصيل النشاط
                                    </label>
                                    <textarea
                                        required
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={6}
                                        placeholder="اكتب تفاصيل النشاط هنا..."
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="flex items-center gap-2 text-white font-medium mb-4">
                                        <ImageIcon size={18} className="text-amber-400" />
                                        الصور
                                    </label>

                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {existingImages.map((url, index) => (
                                            <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-dark-600">
                                                <Image src={url} alt="" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {imageUrls.map((url, index) => (
                                            <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-amber-500/50">
                                                <Image src={url} alt="" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                                <span className="absolute bottom-1 right-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-dark-900 font-bold">جديد</span>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-dark-600 rounded-lg hover:border-amber-500 transition-colors text-gray-500 hover:text-amber-400"
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full gold-gradient text-dark-900 font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            {uploading ? 'جاري رفع الصور...' : 'جاري الحفظ...'}
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            {editingActivity ? 'تحديث النشاط' : 'نشر النشاط'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Activities List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">النشاطات ({activities.length})</h2>

                        {activitiesLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="animate-spin text-amber-400" size={32} />
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 text-center">
                                <p className="text-gray-500">لا توجد نشاطات حالياً</p>
                            </div>
                        ) : (
                            activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="p-4 rounded-xl bg-dark-900 border border-dark-700 hover:border-dark-600 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        {activity.images && activity.images[0] && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                                                <Image src={activity.images[0]} alt="" fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white mb-1 truncate">{activity.title}</h3>
                                            <p className="text-sm text-gray-400 mb-2 line-clamp-2">{activity.content}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} /> {activity.activity_date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye size={12} /> {activity.view_count || 0} مشاهدة
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => handleEdit(activity)}
                                                className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-amber-400 hover:bg-dark-700 transition-all"
                                                title="تعديل"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(activity.id)}
                                                className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-red-400 hover:bg-dark-700 transition-all"
                                                title="حذف"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
