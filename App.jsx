import React, { useState } from "react";
import { CascadeSelect } from "primereact/cascadeselect";

const tools = [
  { title: "Merge PDF", desc: "Combine files into one" },
  { title: "Split PDF", desc: "Extract pages" },
  { title: "Remove Pages", desc: "Delete specific pages" },
  { title: "Compress PDF", desc: "Reduce file size" },
  { title: "Repair PDF", desc: "Fix damaged files" },
  { title: "PDF to JPG", desc: "Extract images" },
  { title: "PDF to Word", desc: "Editable document" },
  { title: "PDF to Excel", desc: "Data extraction" },
  { title: "Protect PDF", desc: "Encrypt with password" },
  { title: "AI Summarizer", desc: "Instant insights" },
];


export default function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const toolCategories = [
    {
      name: "ORGANIZE PDF",
      code: "ORGANIZEPDF",
      subcategories: [
        {
          name: "Merge & Split",
          tools: [
            { label: "MERGE PDF", code: "MERGEPDF" },
            { label: "SPLIT PDF", code: "SPLITPDF" }
          ]
        },
        {
          name: "Page Management",
          tools: [
            { label: "REMOVE PAGES", code: "REMOVEPAGES" },
            { label: "EXTRACT PAGES", code: "EXTRACTPAGES" },
            { label: "ORGANIZE PAGES", code: "ORGANIZEPAGES" },
            { label: "ROTATE PDF", code: "ROTATEPDF" }
          ]
        },
        {
          name: "Import",
          tools: [
            { label: "SCAN TO PDF", code: "SCANTOPDF" }
          ]
        }
      ]
    },
    {
      name: "OPTIMIZE PDF",
      code: "OPTIMIZEPDF",
      subcategories: [
        {
          name: "File Size & Quality",
          tools: [
            { label: "COMPRESS PDF", code: "COMPRESSPDF" },
            { label: "REPAIR PDF", code: "REPAIRPDF" }
          ]
        },
        {
          name: "Text Recognition",
          tools: [
            { label: "OCR PDF", code: "OCRPDF" }
          ]
        }
      ]
    },
    {
      name: "CONVERT TO PDF",
      code: "CONVERTTOPDF",
      subcategories: [
        {
          name: "From Images",
          tools: [
            { label: "JPG TO PDF", code: "JPGTOPDF" }
          ]
        },
        {
          name: "From Documents",
          tools: [
            { label: "WORD TO PDF", code: "WORDTOPDF" },
            { label: "EXCEL TO PDF", code: "EXCELTOPDF" },
            { label: "PPT TO PDF", code: "PPTTOPDF" }
          ]
        },
        {
          name: "From Web",
          tools: [
            { label: "HTML TO PDF", code: "HTMLTOPDF" },
            { label: "TEXT TO PDF", code: "TEXTTOPDF" }
          ]
        }
      ]
    },
    {
      name: "CONVERT FROM PDF",
      code: "FROMPDF",
      subcategories: [
        {
          name: "To Images",
          tools: [
            { label: "PDF TO JPG", code: "PDFTOJPG" }
          ]
        },
        {
          name: "To Documents",
          tools: [
            { label: "PDF TO WORD", code: "PDFTOWORD" },
            { label: "PDF TO EXCEL", code: "PDFTOEXCEL" },
            { label: "PDF TO PPT", code: "PDFTOPPT" }
          ]
        },
        {
          name: "To Web",
          tools: [
            { label: "PDF TO HTML", code: "PDFTOHTML" },
            { label: "PDF TO TEXT", code: "PDFTOTEXT" }
          ]
        }
      ]
    },
    {
      name: "EDIT PDF",
      code: "EDITPDF",
      subcategories: [
        {
          name: "Content Modification",
          tools: [
            { label: "CROP PDF", code: "CROPPDF" },
            { label: "EDIT PDF", code: "EDITPDF" }
          ]
        },
        {
          name: "Enhancements",
          tools: [
            { label: "ADD PAGE NUMBERS", code: "PAGE_NUMBERS" },
            { label: "ADD WATERMARK", code: "WATERMARK" }
          ]
        },
        {
          name: "Forms",
          tools: [
            { label: "PDF FORMS", code: "PDFFORMS" }
          ]
        }
      ]
    },
    {
      name: "PDF SECURITY",
      code: "PDFSECURITY",
      subcategories: [
        {
          name: "Protection",
          tools: [
            { label: "PROTECT PDF", code: "PROTECTPDF" },
            { label: "UNLOCK PDF", code: "UNLOCKPDF" }
          ]
        },
        {
          name: "Signing & Verification",
          tools: [
            { label: "SIGN PDF", code: "SIGNPDF" }
          ]
        },
        {
          name: "Content Control",
          tools: [
            { label: "REDACT PDF", code: "REDACTPDF" },
            { label: "COMPARE PDF", code: "COMPAREPDF" }
          ]
        }
      ]
    },
    {
      name: "PDF INTELLIGENCE",
      code: "PDFINTELLIGENCE",
      subcategories: [
        {
          name: "AI Tools",
          tools: [
            { label: "AI SUMMARIZER", code: "AISUMMARIZER" },
            { label: "TRANSLATE PDF", code: "TRANSLATEPDF" }
          ]
        }
      ]
    }
  ];
  return (
    <div className="flex h-screen bg-[#F5F7FB] text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-white border-r-4 border-gray-200 flex flex-col p-5 relative">

        <div>
          <h1 className="text-3xl font-bold text-blue-600">DocuShift</h1>
          <p className="text-sm text-gray-500">Document Utility</p>
        </div>

        <div className="mt-8 space-y-2">
          <SidebarButton active label="Dashboard" />
          <SidebarButton label="Documents" />
        </div>

        <div className="mt-8 overflow-visible">
          <SectionTitle title="TOOLS" />
        </div>
        <div className="overflow-visible relative">
          <CascadeSelect
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.value)}
            options={toolCategories}
            optionLabel="label"
            optionGroupLabel="name"
            optionGroupChildren={['subcategories', 'tools']}
            className="w-full"
            placeholder="Select a Tool"
          />
        </div>

        <div className="mt-auto bg-blue-50 rounded-2xl p-4">
          <p className="text-xs font-bold text-blue-600">PRO PLAN</p>

          <p className="text-sm text-gray-600 mt-2">
            Upgrade for unlimited batch processing.
          </p>

          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
            Upgrade
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {/* TOPBAR */}
        <div className="bg-white border-b border-gray-200 px-10 py-5 flex items-center justify-end gap-8">
          <NavItem label="How it works" />
          <NavItem label="Pricing" />

          <button className="text-blue-600 font-semibold">Login</button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold">
            Sign Up
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex gap-8 p-8">
          {/* CENTER */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold">
              Professional PDF Tools
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Simplify your document workflow with secure, high-precision PDF
              utilities.
            </p>

            {/* Upload Area */}
            <div className="mt-8 bg-white border-2 border-dashed border-blue-300 rounded-3xl p-16 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl">
                ↑
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Upload your PDF files
              </h2>

              <p className="text-gray-500 mt-2">
                Drag and drop files here or click to browse
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold">
                  + Select Files
                </button>

                <button className="bg-gray-100 hover:bg-gray-200 px-8 py-4 rounded-xl font-medium">
                  From Google Drive
                </button>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-white rounded-3xl mt-8 p-8 flex justify-between items-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold">
                  Welcome to DocuShift
                </h2>

                <p className="text-gray-500 mt-4 leading-7">
                  You haven't processed any documents yet. Start by choosing a
                  tool below or upload a file to our secure cloud processor.
                </p>

                <div className="flex gap-6 mt-6 text-sm text-gray-500">
                  <span>🔒 AES-256 Encryption</span>
                  <span>⏱ 2h Auto-Delete</span>
                </div>
              </div>

              <div className="w-[240px] h-[180px] rounded-3xl bg-gradient-to-br from-slate-900 to-cyan-700" />
            </div>

            {/* TOOLKIT */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold">PDF Toolkit</h2>

              <div className="grid grid-cols-3 gap-5 mt-8">
                {tools.map((tool, index) => (
                  <ToolCard
                    key={index}
                    title={tool.title}
                    desc={tool.desc}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[320px] space-y-6">
            {/* Insights */}
            <div className="bg-white rounded-3xl p-6">
              <h3 className="text-2xl font-bold">Activity Insights</h3>

              <div className="mt-6">
                <p className="text-gray-400 text-sm">
                  TOTAL CONVERSIONS
                </p>

                <h1 className="text-5xl font-bold text-blue-600 mt-2">
                  0
                </h1>
              </div>

              <div className="mt-8">
                <p className="text-gray-400 text-sm">TIME SAVED</p>

                <h2 className="text-4xl font-bold mt-2">0 hrs</h2>
              </div>

              <div className="border-t mt-8 pt-6 text-gray-500 text-sm">
                No recent activity detected.
              </div>
            </div>

            {/* AI CARD */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white">
              <p className="text-sm font-bold tracking-wide">
                NEW: AI POWERED
              </p>

              <h2 className="text-3xl font-bold mt-4">
                AI Summarizer
              </h2>

              <p className="mt-4 text-blue-100 leading-7">
                Extract key insights from long PDF documents instantly with our
                neural engine.
              </p>

              <button className="mt-6 bg-white text-blue-600 w-full py-4 rounded-xl font-bold">
                Try AI Tools
              </button>
            </div>

            {/* Security */}
            <div className="bg-white rounded-3xl p-6">
              <h3 className="font-bold text-xl">
                Bank-Level Security
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Your files are processed locally when possible and encrypted
                during transit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarButton({ label, active }) {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${active
        ? "bg-blue-50 text-blue-600"
        : "hover:bg-gray-100 text-gray-700"
        }`}
    >
      {label}
    </button>
  );
}

function NavItem({ label }) {
  return (
    <div className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium">
      {label}
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h4 className="text-xs tracking-widest text-gray-400 font-bold mt-6">
      {title}
    </h4>
  );
}

function ToolCard({ title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition cursor-pointer border border-gray-100">
      <div className="w-12 h-12 rounded-xl bg-blue-50 mb-4" />

      <h3 className="font-bold text-lg">{title}</h3>

      <p className="text-gray-500 mt-2 text-sm">{desc}</p>
    </div>
  );
}