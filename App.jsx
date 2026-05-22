import React, { useState } from 'react';
import './index.css';
import {
  FileText, LayoutDashboard, Files, Merge, Scissors, Trash2,
  Minimize2, Wrench, FileImage, FileType, FileSpreadsheet,
  Lock, Shield, Sparkles, Clock, ChevronDown, ChevronUp,
  Settings, History, Zap, CheckCircle2, HardDrive, Upload,
  ArrowRight
} from 'lucide-react';
import Login from './Login.jsx';

const sidebarSections = [
  { label: 'ORGANIZE PDF', key: 'organize', items: ['Merge PDF', 'Split PDF', 'Remove Pages', 'Extract Pages', 'Organize PDF', 'Scan to PDF', 'Rotate PDF'] },
  { label: 'OPTIMIZE PDF', key: 'optimize', items: ['Compress PDF', 'Repair PDF', 'OCR PDF'] },
  { label: 'CONVERT TO PDF', key: 'convertTo', items: ['JPG to PDF', 'PNG to PDF', 'Word to PDF', 'Excel to PDF', 'PowerPoint to PDF', 'HTML to PDF'] },
  { label: 'CONVERT FROM PDF', key: 'convertFrom', items: ['PDF to JPG', 'PDF to Word', 'PDF to Excel', 'PDF to PowerPoint', 'PDF to PDF/A'] },
  { label: 'EDIT PDF', key: 'edit', items: ['Rotate PDF', 'Add page numbers', 'Add watermark', 'Crop PDF', 'Edit PDF', 'PDF Forms'] },
  { label: 'PDF SECURITY', key: 'security', items: ['Unlock PDF', 'Protect PDF', 'Sign PDF', 'Redact PDF', 'Compare PDF'] },
  { label: 'PDF INTELLIGENCE', key: 'intelligence', items: ['AI Summarizer', 'Translate PDF'] },
];

const toolGroups = [
  {
    label: 'ORGANIZE PDF', tools: [
      { icon: <Merge size={20} className="text-orange-500" />, name: 'Merge PDF', desc: 'Combine files into one' },
      { icon: <Scissors size={20} className="text-blue-500" />, name: 'Split PDF', desc: 'Extract pages' },
      { icon: <Trash2 size={20} className="text-gray-500" />, name: 'Remove Pages', desc: 'Delete specific pages' },
    ]
  },
  {
    label: 'OPTIMIZE PDF', tools: [
      { icon: <Minimize2 size={20} className="text-blue-600" />, name: 'Compress PDF', desc: 'Reduce file size' },
      { icon: <Wrench size={20} className="text-blue-500" />, name: 'Repair PDF', desc: 'Fix damaged files' },
    ]
  },
  {
    label: 'CONVERT FROM PDF', tools: [
      { icon: <FileImage size={20} className="text-orange-500" />, name: 'PDF to JPG', desc: 'Extract images' },
      { icon: <FileType size={20} className="text-blue-600" />, name: 'PDF to Word', desc: 'Editable document' },
      { icon: <FileSpreadsheet size={20} className="text-green-600" />, name: 'PDF to Excel', desc: 'Data extraction' },
    ]
  },
  {
    label: 'SECURITY & INTELLIGENCE', tools: [
      { icon: <Lock size={20} className="text-blue-700" />, name: 'Protect PDF', desc: 'Encrypt with password' },
      { icon: <Sparkles size={20} className="text-white" />, name: 'AI Summarizer', desc: 'Instant insights', featured: true },
    ]
  },
];

function Sidebar() {
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }));
  return (
    <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#f0f4ff] border-r border-gray-200 flex flex-col z-30 overflow-y-auto">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <FileText size={16} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-gray-900">DocuShift</div>
          <div className="text-[11px] text-gray-500">Document Utility</div>
        </div>
      </div>
      <nav className="flex-1 px-5 py-5 flex flex-col gap-4">
        <a className="sidebar-item active"><LayoutDashboard size={25} /> Dashboard</a>
        <a className="sidebar-item"><Files size={25} /> Documents</a>
        <div className="mt-3 mb-1 px-3 text-[15px] font-semibold text-gray-800 tracking-wider flex items-center gap-2"><Wrench size={25} className="text-gray-800" />TOOLS TOOLKIT
        </div>
        {sidebarSections.map(sec => (
          <div key={sec.key}>
            <div className="sidebar-item justify-between" onClick={() => sec.items.length && toggle(sec.key)}>
              <span className="text-[12px] font-semibold text-gray-500 tracking-wide">{sec.label}</span>
              {sec.items.length > 0 && (open[sec.key] ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
            </div>
            {open[sec.key] && sec.items.map(item => (
              <div key={item} className="sidebar-sub-item">{item}</div>
            ))}
          </div>
        ))}
      </nav>
      <div className="px-2 pb-4 flex flex-col gap-4">
        <a className="sidebar-item"><Settings size={25} /> Settings</a>
        <a className="sidebar-item"><History size={25} /> History</a>
        <div className="mx-2 mt-2 rounded-xl bg-blue-600 p-5 text-white">
          <div className="text-[10px] font-bold tracking-widest mb-1 opacity-80">PRO PLAN</div>
          <p className="text-[11px] mb-2 opacity-90">Upgrade for unlimited batch processing.</p>
          <button className="w-full bg-white text-blue-600 font-bold text-xs py-1.5 rounded-lg hover:bg-blue-50 transition">Upgrade</button>
        </div>
      </div>
    </aside >
  );
}

function Topbar({ onNavigate, user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 gap-6 z-20">
      <a className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">How it works</a>
      <a className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Pricing</a>
      {user ? (
        <div className="relative">
          {/* Trigger */}
          <div
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-400 transition cursor-pointer"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {user.name[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm text-gray-700">{user.email}</span>
            <span className="text-xs text-gray-400">▾</span>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 cursor-pointer transition"
                onClick={() => { setUser(null); setDropdownOpen(false); window.location.reload(); }}
              >
                <span className="text-red-400 text-sm">→</span>
                <span className="text-sm text-red-500 font-medium">Logout</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <a className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => onNavigate('login')}>Login</a>
      )}
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition">Sign Up</button>
    </header>
  );
}

function UploadZone() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    setFiles(prev => [...prev, ...arr]);

    arr.forEach((file) => {
      const id = `${file.name}-${file.size}`;
      setProgress(prev => ({ ...prev, [id]: 0 }));

      const duration = Math.min(Math.max(file.size / 100000 * 1000, 800), 5000);
      const steps = 20;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const pct = Math.min(Math.round((step / steps) * 100), 100);
        setProgress(prev => ({ ...prev, [id]: pct }));
        if (step >= steps) clearInterval(timer);
      }, interval);
    });
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Drop Zone */}
      <label
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300 bg-white hover:bg-blue-50/40'}`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload size={26} className="text-blue-600" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800">Upload your files</p>
          <p className="text-sm text-gray-500 mt-1">Drag and drop files here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">Supports PDF, Word, Excel, PowerPoint and more</p>
        </div>
        <div className="flex gap-3 mt-1">
          <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
            <span className="text-lg font-light leading-none">+</span> Select Files
          </div>
          <div className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-50 transition">
            <HardDrive size={15} /> From Google Drive
          </div>
        </div>
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-gray-700">{files.length} file{files.length > 1 ? 's' : ''} selected</p>
            <button onClick={() => { setFiles([]); setProgress({}); }} className="text-xs text-red-400 hover:text-red-600 transition">Remove all</button>
          </div>
          {files.map((file, i) => {
            const id = `${file.name}-${file.size}`;
            const pct = progress[id] ?? 0;
            const done = pct === 100;
            return (
              <div key={i} className="flex flex-col gap-2 border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={15} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[220px]">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {done ? (
                      <span className="text-xs text-green-500 font-semibold">✓ Done</span>
                    ) : (
                      <span className="text-xs text-blue-500 font-semibold">{pct}%</span>
                    )}
                    <button
                      onClick={e => { e.preventDefault(); removeFile(i); }}
                      className="text-gray-300 hover:text-red-500 transition text-lg leading-none"
                    >✕</button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${done ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
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
    <div className={`tool - card ${featured ? 'featured' : ''} `}>
      <div className={`w - 9 h - 9 rounded - xl flex items - center justify - center flex - shrink - 0 ${featured ? 'bg-blue-600' : 'bg-gray-100'} `}>
        {icon}
      </div>
      <div>
        <div className={`font - semibold text - sm ${featured ? 'text-blue-700' : 'text-gray-800'} `}>{name}</div>
        <div className={`text - xs mt - 0.5 ${featured ? 'text-blue-500' : 'text-gray-500'} `}>{desc}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  if (page === 'login') return <Login onNavigate={setPage} onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <Sidebar />
      <Topbar onNavigate={setPage} user={user} setUser={setUser} />
      <main className="ml-[250px] pt-24 p-70 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Powerful PDF Tools for Everyone</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your documents with industrial-grade tools. Fast, secure, and easy to use.</p>
        </div>
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-5">
            <UploadZone />
            <WelcomeCard />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap size={13} className="text-blue-600" />
                </div>
                <h2 className="font-bold text-gray-900">PDF Toolkit</h2>
              </div>
              <div className="flex flex-col gap-6">
                {toolGroups.map(group => (
                  <div key={group.label}>
                    <div className="text-[10px] font-bold text-gray-400 tracking-widest mb-3">{group.label}</div>
                    <div className="grid grid-cols-3 gap-3">
                      {group.tools.map(tool => <ToolCard key={tool.name} {...tool} />)}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mx-auto transition">
                View all 24 tools <ArrowRight size={15} />
              </button>
            </div>
          </div>
          <div className="w-[240px] flex-shrink-0 flex flex-col gap-4">
            <ActivityInsights />
            <AIBanner />
            <SecurityBanner />
          </div>
        </div>
      </main>
      <footer className="ml-[280px] border-t border-gray-200 bg-white px-8 py-8 flex items-center justify-between text-xs text-gray-400">
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
