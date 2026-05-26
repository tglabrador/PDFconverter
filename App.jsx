import React, { useState } from 'react';
import './index.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import PDFtoWord from './PDFtoWord.jsx';
import Layout from './Layout.jsx';

const tools = [
  // Organize PDF
  { name: 'PDF to Word', desc: 'Convert text elements while maintaining tabular margins for signature pages and legal fields.', category: 'Convert PDF', bg: 'bg-blue-100', icon: '📝' },
  { name: 'PDF to Excel', desc: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', category: 'Convert PDF', bg: 'bg-green-100', icon: '📈' },
  { name: 'PDF to JPG', desc: 'Turn your PDF pages into high-quality JPG images with just a few clicks.', category: 'Convert PDF', bg: 'bg-pink-100', icon: '🖼️' },
  { name: 'PDF to DXF/DWG(CAD)', desc: 'Convert your PDF drawings into CAD formats for easy editing and use in design software.', category: 'Convert PDF', bg: 'bg-yellow-100', icon: '📐' },
  { name: 'PDF to Json/TXT', desc: 'Extract text and data from PDFs into JSON or TXT formats for easy analysis and use.', category: 'Convert PDF', bg: 'bg-purple-100', icon: '📄' },
];

export default function App() {
  // This matches your layout's default home state string
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? tools
    : tools.filter(t => t.category === activeCategory);

  const handleToolClick = (tool) => {
    // 🟩 CHANGED: Changed 'PDFtoWord' to 'pdfToWord' to match your Layout file perfectly
    if (tool.name === 'PDF to Word') {
      setPage('pdfToWord');
    }
  };

  // Auth screen overrides
  if (page === 'login') return <Login onNavigate={setPage} onLogin={setUser} />;
  if (page === 'signup') return <Signup onNavigate={setPage} onSignup={setUser} />;

  // Dynamic Content Switcher
  const renderMainContent = () => {
    // 🟩 CHANGED: Matches lowercase 'pdfToWord' coming from your untouched Layout sidebar
    if (page === 'pdfToWord') {
      return (
        <PDFtoWord onNavigate={setPage} user={user} setUser={setUser} />
      );
    }

    // Default Fallback: Renders your dashboard cards grid (Image 1)
    return (
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header Hero Title text */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">All the tools you need for working with PDFs, gathered in one place</h1>
          <p className="text-gray-500 max-w-5xl mx-auto">All the tools you need to use PDFs, at your fingertips. All are easy to use! with just a few clicks.</p>
        </div>

        {/* Tool Selection Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Convert From PDF</h2>
          <div className="grid grid-cols-3 gap-6">
            {filtered.map((tool, i) => (
              <div
                key={i}
                onClick={() => handleToolClick(tool)}
                className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow-md hover:border-blue-300 transition flex flex-col gap-3 group"
              >
                <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform`}>
                  {tool.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout onNavigate={setPage} user={user} setUser={setUser}>
      <div className="min-h-screen bg-[#f5f6fa]">
        <main className="pt-24 p-8 min-h-screen">
          {renderMainContent()}
        </main>
      </div>
    </Layout>
  );
}
