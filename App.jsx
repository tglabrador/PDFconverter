import React, { useState } from 'react';
import './index.css';
import {
  FileText, Menu, LayoutDashboard, Files, Merge, Scissors, Trash2,
  Minimize2, Wrench, FileImage, FileType, FileSpreadsheet,
  Lock, Shield, Sparkles, Clock, ChevronDown, ChevronUp,
  Settings, History, Zap, CheckCircle2, HardDrive, Upload,
  ArrowRight
} from 'lucide-react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const categories = ['All', 'Organize PDF', 'Optimize PDF', 'Convert PDF', 'Edit PDF', 'PDF Security', 'PDF Intelligence'];

const tools = [
  // Organize PDF
  { name: 'Merge PDF', desc: 'Combine PDFs in the order you want with the easiest PDF merger available.', category: 'Organize PDF', bg: 'bg-red-100', icon: '🔀' },
  { name: 'Split PDF', desc: 'Separate one page or a whole set for easy conversion into independent PDF files.', category: 'Organize PDF', bg: 'bg-red-100', icon: '✂️' },
  { name: 'Organize PDF', desc: 'Rearrange, delete or rotate PDF pages to get your PDF just right.', category: 'Organize PDF', bg: 'bg-red-100', icon: '🗂️' },
  { name: 'Scan to PDF', desc: 'Easily convert your scanned documents and images into high-quality PDFs.', category: 'Organize PDF', bg: 'bg-red-100', icon: '📷' },
  { name: 'Compress PDF', desc: 'Reduce file size while optimizing for maximal PDF quality.', category: 'Optimize PDF', bg: 'bg-green-100', icon: '🗜️' },
  { name: 'Repair PDF', desc: 'Fix corrupt PDF files and recover your important documents in a few clicks.', category: 'Optimize PDF', bg: 'bg-green-100', icon: '🩹' },
  { name: 'OCR PDF', desc: 'Extract text from scanned PDFs and images with our powerful OCR engine.', category: 'Optimize PDF', bg: 'bg-green-100', icon: '🔍' },
  { name: 'PDF to Word', desc: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', category: 'Convert PDF', bg: 'bg-blue-100', icon: '📝' },
  { name: 'PDF to PowerPoint', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', category: 'Convert PDF', bg: 'bg-orange-100', icon: '📊' },
  { name: 'PDF to Excel', desc: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', category: 'Convert PDF', bg: 'bg-green-100', icon: '📈' },
  { name: 'Word to PDF', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.', category: 'Convert PDF', bg: 'bg-blue-100', icon: '📄' },
  { name: 'PowerPoint to PDF', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', category: 'Convert PDF', bg: 'bg-orange-100', icon: '🖥️' },
  { name: 'Excel to PDF', desc: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', category: 'Convert PDF', bg: 'bg-green-100', icon: '📋' },
  { name: 'PDF to JPG', desc: 'Convert each PDF page into a JPG or extract all images contained in a PDF.', category: 'Convert PDF', bg: 'bg-yellow-100', icon: '🖼️' },
  { name: 'JPG to PDF', desc: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', category: 'Convert PDF', bg: 'bg-yellow-100', icon: '🗃️' },
  { name: 'HTML to PDF', desc: 'Convert web pages and HTML files into PDF documents with ease.', category: 'Convert PDF', bg: 'bg-yellow-100', icon: '🌐' },
  { name: 'PDF to PDF/A', desc: 'Convert PDF files to the PDF/A format for long-term archiving and preservation.', category: 'Convert PDF', bg: 'bg-yellow-100', icon: '📚' },
  { name: 'Edit PDF', desc: 'Add text, images, shapes or freehand annotations to a PDF document.', category: 'Edit PDF', bg: 'bg-purple-100', icon: '✏️' },
  { name: 'Watermark PDF', desc: 'Stamp an image or text over your PDF in seconds.', category: 'Edit PDF', bg: 'bg-purple-100', icon: '💧' },
  { name: 'Rotate PDF', desc: 'Rotate your PDFs the way you need them.', category: 'Edit PDF', bg: 'bg-orange-100', icon: '🔄' },
  { name: 'Page Numbers', desc: 'Add page numbers to your PDF with customizable formatting and placement.', category: 'Edit PDF', bg: 'bg-purple-100', icon: '🔢' },
  { name: 'Crop PDF', desc: 'Trim PDF pages to remove unwanted margins and content with our easy cropping tool.', category: 'Edit PDF', bg: 'bg-purple-100', icon: '✂️' },
  { name: 'PDF Forms', desc: 'Create fillable PDF forms or fill out and sign existing PDF forms with ease.', category: 'Edit PDF', bg: 'bg-purple-100', icon: '📋' },
  { name: 'Sign PDF', desc: 'Sign yourself or request electronic signatures from others.', category: 'PDF Security', bg: 'bg-blue-100', icon: '✍️' },
  { name: 'Unlock PDF', desc: 'Remove PDF password security, giving you the freedom to use your PDFs.', category: 'PDF Security', bg: 'bg-blue-100', icon: '🔓' },
  { name: 'Protect PDF', desc: 'Protect PDF files with a password. Encrypt PDF documents.', category: 'PDF Security', bg: 'bg-blue-100', icon: '🔒' },
  { name: 'Compare PDF', desc: 'Compare two PDF documents side by side and highlight the differences.', category: 'PDF Security', bg: 'bg-blue-100', icon: '⚔️' },
  { name: 'Redact PDF', desc: 'Permanently remove sensitive information from your PDF documents.', category: 'PDF Security', bg: 'bg-blue-100', icon: '🕵️' },
  { name: 'AI Summarizer', desc: 'Extract key insights from long PDF documents instantly.', category: 'PDF Intelligence', bg: 'bg-indigo-100', icon: '🤖' },
  { name: 'Translate PDF', desc: 'Translate your PDF documents to any language instantly.', category: 'PDF Intelligence', bg: 'bg-indigo-100', icon: '🌍' },
];

const topbarSections = [
  { label: 'ORGANIZE PDF', key: 'organize', items: ['Merge PDF', 'Split PDF', 'Remove Pages', 'Extract Pages', 'Organize PDF', 'Scan to PDF'] },
  { label: 'OPTIMIZE PDF', key: 'optimize', items: ['Compress PDF', 'Repair PDF', 'OCR PDF'] },
  { label: 'CONVERT TO PDF', key: 'convertTo', items: ['JPG to PDF', 'PNG to PDF', 'Word to PDF', 'Excel to PDF', 'PowerPoint to PDF', 'HTML to PDF'] },
  { label: 'CONVERT FROM PDF', key: 'convertFrom', items: ['PDF to JPG', 'PDF to Word', 'PDF to Excel', 'PDF to PowerPoint', 'PDF to PDF/A'] },
  { label: 'EDIT PDF', key: 'edit', items: ['Rotate PDF', 'Add page numbers', 'Add watermark', 'Crop PDF', 'Edit PDF', 'PDF Forms'] },
  { label: 'PDF SECURITY', key: 'security', items: ['Unlock PDF', 'Protect PDF', 'Sign PDF', 'Redact PDF', 'Compare PDF'] },
  { label: 'PDF INTELLIGENCE', key: 'intelligence', items: ['AI Summarizer', 'Translate PDF'] },
];

function Topbar({ onNavigate, user, setUser, collapsed, setCollapsed }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }));

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-500 flex items-center px-6 gap-4 z-20">

      {/* Hamburger + Dropdown */}
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
                <button className="cursor-pointer" onClick={() => window.location.reload()}>
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
                    <div key={item} className="topbar-sub-item ">{item}</div>
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

      {/* Right side options */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Pricing</button>
        {user ? (
          <div className="relative">
            <div
              className="flex items-center rounded-lg px-1 py-1.5 hover:border-blue-400 transition cursor-pointer"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              {user.photo ? (
                <img src={user.photo} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-sm">
                  {user.name[0].toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 w-25 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition" onClick={() => { setDropdownOpen(false); }}>

                  <span className="text-sm text-gray-700">Settings</span>
                </div>
                <div
                  className="flex items-center px-4 py-2.5 hover:bg-red-50 cursor-pointer transition"
                  onClick={() => { setUser(null); setDropdownOpen(false); window.location.reload(); }}
                >
                  <a className="text-sm text-red-500 font-small">Logout</a>
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
  );
}

function ActivityInsights() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h3 className="font-bold text-gray-900 mb-4">Activity Insights</h3>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">TOTAL CONVERSIONS</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">0</div>
        </div>
        <div className="w-20 h-6 bg-gray-100 rounded-md" />
      </div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">TIME SAVED</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">0 <span className="text-sm font-normal text-gray-500">hrs</span></div>
        </div>
        <Clock size={20} className="text-gray-400" />
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
        <span className="w-2 h-2 bg-gray-300 rounded-full inline-block" />
        No recent activity detected.
      </div>
      <p className="text-xs text-gray-400 mt-1">Start using tools to see your productivity metrics grow here.</p>
    </div>
  );
}

function AIBanner() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-yellow-300" />
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">New: AI Powered</span>
      </div>
      <h3 className="font-bold text-lg mb-2">AI Summarizer</h3>
      <p className="text-sm opacity-85 mb-4">Extract key insights from long PDF documents instantly with our new neural engine.</p>
      <button className="w-full bg-white text-blue-700 font-bold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition">Try AI Tools</button>
    </div>
  );
}

function SecurityBanner() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Shield size={18} className="text-gray-600" />
      </div>
      <div>
        <div className="font-bold text-gray-900 text-sm mb-1">Bank-Level Security</div>
        <p className="text-xs text-gray-500 leading-relaxed">Your files are processed locally when possible and encrypted during transit. We never sell your data.</p>
      </div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-2">Welcome to DocuShift</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">You haven't processed any documents yet. Start by choosing a tool from the categories below or upload a file to our secure cloud processor.</p>
        <div className="flex items-center gap-5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-gray-400" /> AES-256 Encryption</div>
          <div className="flex items-center gap-1.5"><Clock size={13} className="text-gray-400" /> 2h Auto-Delete</div>
        </div>
      </div>
      <div className="w-36 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="w-14 h-18 bg-white/10 rounded-lg border border-white/20 absolute left-0 top-2 rotate-[-8deg]" style={{ height: '68px' }} />
          <div className="w-14 h-18 bg-white/15 rounded-lg border border-white/25 absolute left-3 top-1 rotate-[-3deg]" style={{ height: '68px' }} />
          <div className="w-14 bg-blue-400/30 rounded-lg border border-blue-300/40 absolute left-5 top-0" style={{ height: '68px' }} />
        </div>
      </div>
    </div>
  );
}

function ToolCard({ icon, name, desc, featured }) {
  return (
    <div className={`tool-card ${featured ? 'featured' : ''}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${featured ? 'bg-blue-600' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <div>
        <div className={`font-semibold text-sm ${featured ? 'text-blue-700' : 'text-gray-800'}`}>{name}</div>
        <div className={`text-xs mt-0.5 ${featured ? 'text-blue-500' : 'text-gray-500'}`}>{desc}</div>
      </div>
    </div>
  );
}

export default function App({ onNavigate }) {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? tools
    : tools.filter(t => t.category === activeCategory);

  const handleToolClick = (tool) => {
    // Option 1: navigate to another page in your app
    // onNavigate('toolpage');

    // Option 2: open an external URL
    // window.open('https://example.com', '_blank');

    alert(`You clicked: ${tool.name}`);
  };

  if (page === 'login') return <Login onNavigate={setPage} onLogin={setUser} />;
  if (page === 'signup') return <Signup onNavigate={setPage} onSignup={setUser} />;

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <Topbar onNavigate={setPage} user={user} setUser={setUser} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="pt-24 p-8 min-h-screen">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">All the tools you need for working with PDFs, gathered in one place</h1>
          <p className="text-gray-500 max-w-5xl mx-auto">All the tools you need to use PDFs, at your fingertips. All are easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${activeCategory === cat
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-6 gap-5">
          {filtered.map((tool, i) => (
            <div
              key={i}
              onClick={() => handleToolClick(tool)}
              className="bg-white border border-gray-300 rounded-2xl p-5 cursor-pointer hover:shadow-md hover:border-blue-300 transition flex flex-col gap-3"
            >
              <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center text-3xl`}>
                {tool.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
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
