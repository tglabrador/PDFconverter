import React, { useState, useEffect } from 'react';
import './index.css';
import { FileText, HardDrive, Upload, Download } from 'lucide-react';
import Layout from './Layout';

function PDFThumbnail({ file }) {
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        const renderThumbnail = async () => {
            try {
                const pdfjsLib = await import('pdfjs-dist');
                pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                    'pdfjs-dist/build/pdf.worker.min.mjs',
                    import.meta.url
                ).toString();

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
                setThumbnail(canvas.toDataURL());
            } catch (error) {
                console.error('PDF thumbnail error:', error);
            }
        };
        renderThumbnail();
    }, [file]);

    return thumbnail ? (
        <img src={thumbnail} alt="PDF preview" className="w-full h-64 object-cover object-top" />
    ) : (
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center">
            <FileText size={48} className="text-blue-300" />
        </div>
    );
}

function UploadZone({ files, setFiles }) {
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState({});
    const [sortOrder, setSortOrder] = useState('none');

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

    const sortedFiles = [...files].sort((a, b) => {
        if (sortOrder === 'az') return a.name.localeCompare(b.name);
        if (sortOrder === 'za') return b.name.localeCompare(a.name);
        return 0;
    });

    return (
        <div className="flex flex-col gap-4">
            <label
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300 bg-white hover:bg-blue-50/40'}`}
            >
                <input
                    type="file"
                    multiple
                    accept=".pdf"
                    className="hidden"
                    onChange={e => handleFiles(e.target.files)}
                />
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload size={26} className="text-blue-600" />
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-800">Upload your PDF files</p>
                    <p className="text-sm text-gray-500 mt-1">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Supports PDF only</p>
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

            {files.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">
                            {files.length} file{files.length > 1 ? 's' : ''} selected
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'az' ? 'none' : 'az')}
                                    className={`px-3 py-1.5 text-xs font-medium transition ${sortOrder === 'az' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    A→Z
                                </button>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'za' ? 'none' : 'za')}
                                    className={`px-3 py-1.5 text-xs font-medium transition ${sortOrder === 'za' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Z→A
                                </button>
                            </div>
                            <button
                                onClick={() => { setFiles([]); setProgress({}); }}
                                className="text-xs text-red-400 hover:text-red-600 transition"
                            >
                                Remove all
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {sortedFiles.map((file, i) => {
                            const id = `${file.name}-${file.size}`;
                            const pct = progress[id] ?? 0;
                            const done = pct === 100;
                            const originalIndex = files.indexOf(file);
                            return (
                                <div key={i} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden relative group shadow-sm">
                                    {/* PDF Thumbnail */}
                                    <div className="relative">
                                        <PDFThumbnail file={file} />
                                        {/* Remove button */}
                                        <button
                                            onClick={e => { e.preventDefault(); removeFile(originalIndex); }}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex"
                                        >
                                            ✕
                                        </button>
                                        {/* Progress bar */}
                                        {!done && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                                <div
                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        )}
                                        {done && (
                                            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                    {/* File name */}
                                    <div className="px-3 py-2 bg-white">
                                        <p className="text-xs font-medium text-gray-800 truncate">{file.name}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MergePDF({ onNavigate, user, setUser }) {
    const [files, setFiles] = useState([]);
    const [isMerging, setIsMerging] = useState(false);
    const [mergeResult, setMergeResult] = useState(null);

    const handleMerge = () => {
        setIsMerging(true);
        setTimeout(() => {
            setMergeResult('Merged PDF created successfully!');
            setIsMerging(false);
        }, 2000);
    };

    return (
        <Layout onNavigate={onNavigate} user={user} setUser={setUser}>
            <div className="max-w-3xl mx-auto flex flex-col gap-6">

                {/* Header */}
                <div>
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="text-sm hover:underline text-blue-800 mb-6 flex gap-1 cursor-pointer"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Merge PDF Files</h1>
                    <p className="text-sm text-gray-500 mt-1">Combine multiple PDFs into one file in the order you choose.</p>
                </div>

                {/* Upload Zone */}
                <UploadZone files={files} setFiles={setFiles} />

                {/* Merge Button */}
                {files.length > 0 && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleMerge}
                            disabled={isMerging}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
                        >
                            {isMerging ? 'Merging...' : 'Merge PDFs'}
                        </button>
                    </div>
                )}

                {/* Result */}
                {mergeResult && (
                    <div className="flex flex-col gap-3">
                        {/* Download link */}
                        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText size={15} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">merged-output.pdf</p>
                                    <p className="text-xs text-gray-400">Ready to download</p>
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-800 text-white text-sm font-semibold px-2 py-2 rounded-lg transition">
                                <Download size={16} />
                            </button>
                        </div>

                        {/* Success message */}
                        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-700 font-medium text-sm">
                            ✓ {mergeResult}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
