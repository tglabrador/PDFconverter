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
import MergePDF from './MergePDF.jsx';
import Layout from './Layout.jsx';

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
    if (tool.name === 'Merge PDF') { setPage('mergepdf'); }
  };

  if (page === 'login') return <Login onNavigate={setPage} onLogin={setUser} />;
  if (page === 'signup') return <Signup onNavigate={setPage} onSignup={setUser} />;
  if (page === 'mergepdf') return <MergePDF onNavigate={setPage} user={user} setUser={setUser} />;

  return (
    <Layout onNavigate={setPage} user={user} setUser={setUser}>
      <div className="min-h-screen bg-[#f5f6fa]">
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
      </div>
    </Layout>
  );
}
