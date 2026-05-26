import React, { useState } from 'react';
import {
    FileText, Menu, ChevronDown, ChevronUp,
    Settings, History, Wrench
} from 'lucide-react';

const toolsList = [
    { label: 'PDF to Word', key: 'pdfToWord' },
    { label: 'PDF to Excel', key: 'pdfToExcel' },
    { label: 'PDF to JPG', key: 'pdfToJpg' },
    { label: 'PDF to DXF', key: 'pdfToDxf' },
    { label: 'PDF to TXT', key: 'pdfToTxt' }
];

export default function Layout({ children, onNavigate, user, setUser }) {
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);

    // Helper to change views using App.jsx's state and close the drawer cleanly
    const handleNavigation = (targetPage) => {
        onNavigate(targetPage);
        setCollapsed(true); // Auto-closes the sidebar drawer
    };

    return (
        <div className="min-h-screen bg-[#f5f6fa]">

            {/* ── TOPBAR ── */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 z-20">

                {/* Hamburger Button */}
                <div className="relative">
                    <button
                        onClick={() => setCollapsed(prev => !prev)}
                        className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-700 transition"
                    >
                        <Menu size={18} className="text-white" />
                    </button>

                    {/* Sidebar Drawer Menu Panel */}
                    {!collapsed && (
                        <div className="absolute top-12 left-0 w-[280px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-y-auto max-h-[80vh] flex flex-col z-50">

                            {/* Logo Group (Clicking brand redirects home cleanly) */}
                            <div
                                className="flex items-center gap-2 px-4 py-4 border-b border-gray-100 cursor-pointer select-none"
                                onClick={() => handleNavigation('dashboard')}
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <FileText size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900">DocuShift</div>
                                    <div className="text-[11px] text-gray-500">Document Utility</div>
                                </div>
                            </div>

                            {/* Tools Dropdown Navigation */}
                            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                                <div
                                    onClick={() => setToolsOpen(prev => !prev)}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-blue-600 transition font-semibold text-sm"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Wrench size={18} />
                                        <span>Tools Toolkit</span>
                                    </div>
                                    {toolsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>

                                {toolsOpen && (
                                    <div className="pl-9 pr-2 flex flex-col gap-0.5 mt-0.5">
                                        {toolsList.map((tool) => (
                                            <button
                                                key={tool.key}
                                                onClick={() => handleNavigation(tool.key)}
                                                className="text-left px-3 py-2 text-xs font-medium rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50/60 transition w-full cursor-pointer"
                                            >
                                                {tool.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </nav>

                            {/* Sidebar Action Footer */}
                            <div className="px-2 pb-4 flex flex-col gap-1 border-t border-gray-100 pt-2">
                                <button
                                    onClick={() => handleNavigation('settings')}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl text-left w-full cursor-pointer transition"
                                >
                                    <Settings size={18} /> Settings
                                </button>
                                <button
                                    onClick={() => handleNavigation('history')}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl text-left w-full cursor-pointer transition"
                                >
                                    <History size={18} /> History
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile/Pricing Area */}
                <div className="flex items-center gap-6 ml-auto">
                    <button className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Pricing</button>
                    {user ? (
                        <div className="relative">
                            <div
                                className="flex items-center rounded-lg px-1 py-1.5 cursor-pointer select-none"
                                onClick={() => setDropdownOpen(prev => !prev)}
                            >
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-gray-700 ml-2">{user.email}</span>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                                    <div className="flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition" onClick={() => { setDropdownOpen(false); handleNavigation('settings'); }}>
                                        <span className="text-sm text-gray-700">Settings</span>
                                    </div>
                                    <div
                                        className="flex items-center px-4 py-2.5 hover:bg-red-50 cursor-pointer transition border-t border-gray-50"
                                        onClick={() => { setUser(null); setDropdownOpen(false); window.location.reload(); }}
                                    >
                                        <span className="text-sm text-red-500 font-medium">Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer font-medium" onClick={() => handleNavigation('login')}>Login</button>
                    )}
                </div>
            </header>

            {/* ── MAIN WORKSPACE VIEWPORT ── */}
            {children}

            {/* ── FOOTER ── */}
            <footer className="border-t border-gray-200 bg-white px-8 py-6 flex items-center justify-between text-xs text-gray-400">
                <span>© 2026 DocuShift Inc.</span>
            </footer>

        </div>
    );
}
