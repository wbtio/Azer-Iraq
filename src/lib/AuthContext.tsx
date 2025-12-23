'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AdminUser {
    id: string;
    username: string;
}

interface AuthContextType {
    user: AdminUser | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'azer_admin_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
                if (storedAuth) {
                    const parsed = JSON.parse(storedAuth);
                    // Check if the session is still valid (within 30 days)
                    const loginTime = new Date(parsed.loginTime);
                    const now = new Date();
                    const daysDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60 * 24);

                    if (daysDiff < 30) {
                        setUser(parsed.user);
                    } else {
                        localStorage.removeItem(AUTH_STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                localStorage.removeItem(AUTH_STORAGE_KEY);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const { data, error } = await supabase.rpc('verify_admin_login', {
                p_username: username,
                p_password: password,
            });

            if (error) {
                console.error('Login error:', error);
                return { success: false, message: 'حدث خطأ في الاتصال بقاعدة البيانات' };
            }

            if (data.success) {
                const userData: AdminUser = data.user;
                setUser(userData);

                // Store in localStorage
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
                    user: userData,
                    loginTime: new Date().toISOString(),
                }));

                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'حدث خطأ غير متوقع' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
