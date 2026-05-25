import React, { useState } from 'react';
import {
    FileText, Menu, Files, Wrench, ChevronDown, ChevronUp,
    Settings, History
} from 'lucide-react';

const topbarSections = [
    { label: 'ORGANIZE PDF', key: 'organize', items: ['Merge PDF', 'Split PDF', 'Remove Pages', 'Extract Pages', 'Organize PDF', 'Scan to PDF'] },
    { label: 'OPTIMIZE PDF', key: 'optimize', items: ['Compress PDF', 'Repair PDF', 'OCR PDF'] },
    { label: 'CONVERT TO PDF', key: 'convertTo', items: ['JPG to PDF', 'PNG to PDF', 'Word to PDF', 'Excel to PDF', 'PowerPoint to PDF', 'HTML to PDF'] },
    { label: 'CONVERT FROM PDF', key: 'convertFrom', items: ['PDF to JPG', 'PDF to Word', 'PDF to Excel', 'PDF to PowerPoint', 'PDF to PDF/A'] },
    { label: 'EDIT PDF', key: 'edit', items: ['Rotate PDF', 'Add page numbers', 'Add watermark', 'Crop PDF', 'Edit PDF', 'PDF Forms'] },
    { label: 'PDF SECURITY', key: 'security', items: ['Unlock PDF', 'Protect PDF', 'Sign PDF', 'Redact PDF', 'Compare PDF'] },
    { label: 'PDF INTELLIGENCE', key: 'intelligence', items: ['AI Summarizer', 'Translate PDF'] },
];

export default function Layout({ children, onNavigate, user, setUser }) {
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [open, setOpen] = useState({});
    const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }));

    return (
        <div className="min-h-screen bg-[#f5f6fa]">

            {/* ── TOPBAR ── */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-500 flex items-center px-6 gap-4 z-20">

                {/* Hamburger */}
                <div className="relative">
                    <button
                        onClick={() => setCollapsed(prev => !prev)}
                        className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-700 transition"
                    >
                        <Menu size={18} className="text-white" />
                    </button>

                    {!collapsed && (
                        <div className="absolute top-12 left-0 w-[280px] bg-blue-200 border border-gray-500 rounded-2xl shadow-xl overflow-y-auto max-h-[80vh] flex flex-col">
                            <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-500">
                                <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                                    <button className="cursor-pointer" onClick={() => onNavigate('dashboard')}>
                                        <FileText size={20} className="text-white" />
                                    </button>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900">DocuShift</div>
                                    <div className="text-[11px] text-gray-500">Document Utility</div>
                                </div>
                            </div>
                            <nav className="flex-1 px-4 py-5 flex flex-col gap-2">
                                <a className="topbar-item font-semibold"><Files size={25} /> Documents</a>
                                <div className="mt-3 mb-1 px-3 text-[15px] font-semibold text-black tracking-wider flex items-center gap-2">
                                    <Wrench size={25} className="text-black" /> TOOLS TOOLKIT
                                </div>
                                {topbarSections.map(sec => (
                                    <div key={sec.key}>
                                        <div className="topbar-item justify-between" onClick={() => sec.items.length && toggle(sec.key)}>
                                            <span className="px-4 text-[12px] font-semibold text-black tracking-wide">{sec.label}</span>
                                            {sec.items.length > 0 && (open[sec.key] ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                                        </div>
                                        {open[sec.key] && sec.items.map(item => (
                                            <div key={item} className="topbar-sub-item">{item}</div>
                                        ))}
                                    </div>
                                ))}
                            </nav>
                            <div className="px-2 pb-4 flex flex-col gap-4">
                                <a className="topbar-item font-semibold"><Settings size={25} /> Settings</a>
                                <a className="topbar-item font-semibold"><History size={25} /> History</a>
                                <div className="mx-2 mt-2 rounded-xl bg-blue-600 p-5 text-white">
                                    <div className="text-[10px] font-bold tracking-widest mb-1 opacity-80">PRO PLAN</div>
                                    <p className="text-[11px] mb-2 opacity-90">Upgrade for unlimited batch processing.</p>
                                    <button className="w-full bg-white text-blue-600 font-bold text-xs py-1.5 rounded-lg hover:bg-blue-50 transition">Upgrade</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-6 ml-auto">
                    <button className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Pricing</button>
                    {user ? (
                        <div className="relative">
                            <div
                                className="flex items-center rounded-lg px-1 py-1.5 cursor-pointer"
                                onClick={() => setDropdownOpen(prev => !prev)}
                            >
                                {user.photo ? (
                                    <img src={user.photo} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-sm">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm text-gray-700 ml-2">{user.email}</span>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition" onClick={() => setDropdownOpen(false)}>
                                        <span className="text-sm text-gray-700">Settings</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2.5 hover:bg-red-50 cursor-pointer transition"
                                        onClick={() => { setUser(null); setDropdownOpen(false); window.location.reload(); }}
                                    >
                                        <span className="text-sm text-red-500">Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => onNavigate('login')}>Login</button>
                    )}
                    {!user && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition" onClick={() => onNavigate('signup')}>Sign Up</button>
                    )}
                </div>
            </header>

            {/* ── PAGE CONTENT ── */}
            <main className="pt-24 p-8 min-h-screen">
                {children}
            </main>

            {/* ── FOOTER ── */}
            <footer className="border-t border-gray-200 bg-white px-8 py-8 flex items-center justify-between text-xs text-gray-400">
                <span>© 2024 DocuShift Inc.</span>
                <div className="flex gap-5">
                    <a className="hover:text-gray-600 cursor-pointer">Privacy Policy</a>
                    <a className="hover:text-gray-600 cursor-pointer">Terms of Service</a>
                    <a className="hover:text-gray-600 cursor-pointer">Security</a>
                </div>
            </footer>

        </div>
    );
}
