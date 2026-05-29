import React, { useState } from 'react';
import { FileText, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, ShieldCheck } from 'lucide-react';
import { supabase } from './supabase';   // ← ADD THIS

export default function Login({ onNavigate, onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);       // ← NEW
    const [loading, setLoading] = useState(false);  // ← NEW

    // ↓ REPLACED: was a fake instant login, now calls Supabase
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        onLogin(data.user);
        onNavigate('dashboard');
    };

    // ↓ NEW: Google OAuth login
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
    };

    // ↓ NEW: Microsoft OAuth login
    const handleMicrosoftLogin = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'azure' });
    };

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex flex-col">

            {/* Topbar */}
            <header className="h-16 bg-white border-b border-gray-500 flex items-center justify-between px-6 gap-6 py-4 pr-10">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onNavigate('dashboard')}
                >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">DeedFlow</span>
                </div>
                <nav className="flex items-center gap-6 ml-auto">
                    <a className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Pricing</a>
                    <a className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-0.5 cursor-pointer">Login</a>
                    <button type="button" onClick={() => onNavigate('signup')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition cursor-pointer">Sign Up</button>
                </nav>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">

                {/* Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-md p-8">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-blue-200">
                            <FileText size={26} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                        <p className="text-sm text-gray-500 mt-1">Secure document processing at your fingertips.</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">

                        {/* ↓ NEW: Error banner — only shows if login fails */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</label>
                            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Forgot password?</a>
                            </div>
                            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                                <Lock size={16} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={e => setRemember(e.target.checked)}
                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember this device</label>
                        </div>

                        {/* ↓ CHANGED: button shows loading state */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition mt-1 cursor-pointer">
                            {loading ? 'Signing in...' : <> Login <ArrowRight size={16} /> </>}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium tracking-widest">OR CONTINUE WITH</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* ↓ CHANGED: social buttons now call Supabase OAuth */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={handleMicrosoftLogin}
                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#F25022" d="M1 1h10v10H1z" />
                                    <path fill="#7FBA00" d="M13 1h10v10H13z" />
                                    <path fill="#00A4EF" d="M1 13h10v10H1z" />
                                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                                </svg>
                                Microsoft
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p className="text-center text-sm text-gray-500 mt-1">
                            Don't have an account?{' '}
                            <a className="text-blue-600 font-semibold hover:text-blue-800 cursor-pointer" onClick={() => onNavigate('signup')}>Sign up</a>
                        </p>

                    </form>
                </div>

                {/* Security badges */}
                <div className="flex items-center gap-6 mt-5 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} /> SOC2 Compliant
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Shield size={14} /> AES-256 Encrypted
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 px-10 py-8">
                <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8">
                    <div>
                        <div className="font-bold text-gray-900 text-base mb-2">DocuShift</div>
                        <p className="text-xs text-gray-500 leading-relaxed">The professional standard for lightning-fast document conversion.</p>
                    </div>
                    <div>
                        <div className="font-bold text-gray-700 text-sm mb-3">Products</div>
                        <div className="flex flex-col gap-2 text-sm text-gray-500">
                            <a className="hover:text-blue-600 cursor-pointer">PDF to Word</a>
                            <a className="hover:text-blue-600 cursor-pointer">Merge PDF</a>
                            <a className="hover:text-blue-600 cursor-pointer">Split PDF</a>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-700 text-sm mb-3">Company</div>
                        <div className="flex flex-col gap-2 text-sm text-gray-500">
                            <a className="hover:text-blue-600 cursor-pointer">About Us</a>
                            <a className="hover:text-blue-600 cursor-pointer">Contact</a>
                            <a className="hover:text-blue-600 cursor-pointer">Privacy Policy</a>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-700 text-sm mb-3">Stay Secure</div>
                        <p className="text-xs text-gray-500 mb-3">© 2024 DocuShift. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
