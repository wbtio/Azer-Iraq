'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, User, Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    if (!isLoading && isAuthenticated) {
        router.push('/admin/activities');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username.trim() || !password.trim()) {
            setError('يرجى إدخال اسم المستخدم وكلمة المرور');
            setLoading(false);
            return;
        }

        const result = await login(username, password);

        if (result.success) {
            router.push('/admin/activities');
        } else {
            setError(result.message || 'فشل تسجيل الدخول');
        }

        setLoading(false);
    };

    if (isLoading) {
        return (
            <div className="pt-20 min-h-screen bg-dark-950 flex items-center justify-center">
                <Loader2 className="animate-spin text-amber-400" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-dark-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Shield size={40} className="text-dark-900" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
                    <p className="text-gray-400">لوحة تحكم مؤسسة أزر</p>
                </div>

                {/* Login Form */}
                <div className="p-8 rounded-2xl bg-dark-900 border border-dark-700 card-shadow">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center text-sm">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Username Input */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="flex items-center gap-2 text-white font-medium">
                                <User size={16} className="text-amber-400" />
                                اسم المستخدم
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="أدخل اسم المستخدم"
                                autoComplete="username"
                                className="w-full px-4 py-4 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="flex items-center gap-2 text-white font-medium">
                                <Lock size={16} className="text-amber-400" />
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="أدخل كلمة المرور"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-4 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors pl-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gold-gradient text-dark-900 font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} />
                                    جاري التحقق...
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    تسجيل الدخول
                                </>
                            )}
                        </button>

                    </form>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        🔒 هذه المنطقة محمية ومخصصة للمسؤولين فقط
                    </p>
                </div>

            </div>
        </div>
    );
}
