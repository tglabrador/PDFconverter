import React, { useState, useEffect } from 'react';
import './index.css';
import { Ruler, HardDrive, Upload, Download } from 'lucide-react';

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
        <img src={thumbnail} alt="PDF blueprint preview" className="w-full h-64 object-cover object-top" />
    ) : (
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center">
            <Ruler size={48} className="text-amber-300" />
        </div>
    );
}

function UploadZone({ files, setFiles, progress, setProgress }) {
    const [dragging, setDragging] = useState(false);

    const handleFiles = (incoming) => {
        if (!incoming || incoming.length === 0) return;

        const file = incoming[0];
        setFiles([file]);

        const id = `${file.name}-${file.size}`;
        setProgress({ [id]: 0 });

        const duration = Math.min(Math.max(file.size / 100000 * 1000, 1200), 6000); // Blueprints take a bit longer
        const steps = 20;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const pct = Math.min(Math.round((step / steps) * 100), 100);
            setProgress(prev => ({ ...prev, [id]: pct }));
            if (step >= steps) clearInterval(timer);
        }, interval);
    };

    const removeFile = () => {
        setFiles([]);
        setProgress({});
    };

    return (
        <div className="flex flex-col gap-4">
            <label
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${dragging ? 'border-amber-500 bg-amber-50/50' : 'border-amber-300 bg-white hover:bg-amber-50/20'}`}
            >
                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={e => handleFiles(e.target.files)}
                />
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                    <Upload size={26} className="text-amber-600" />
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-800">Upload your schematic or blueprint PDF</p>
                    <p className="text-sm text-gray-500 mt-1">Drag and drop file here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Supports vector blueprint PDFs</p>
                </div>
                <div className="flex gap-3 mt-1">
                    <div className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                        <span className="text-lg font-light leading-none">+</span> Select Blueprint
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-50 transition">
                        <HardDrive size={15} /> From Google Drive
                    </div>
                </div>
            </label>

            {files.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">Selected Blueprint Document</p>
                        <button
                            onClick={removeFile}
                            className="text-xs text-red-500 hover:text-red-700 transition"
                        >
                            Remove file
                        </button>
                    </div>

                    <div className="max-w-sm mx-auto w-full">
                        {files.map((file, i) => {
                            const id = `${file.name}-${file.size}`;
                            const pct = progress[id] ?? 0;
                            const done = pct === 100;
                            return (
                                <div key={i} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden relative group shadow-sm">
                                    <div className="relative">
                                        <PDFThumbnail file={file} />
                                        <button
                                            onClick={e => { e.preventDefault(); removeFile(); }}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex"
                                        >
                                            ✕
                                        </button>
                                        {!done && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                                <div
                                                    className="h-full bg-amber-500 transition-all duration-300"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        )}
                                        {done && (
                                            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                ✓ Verified
                                            </div>
                                        )}
                                    </div>
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

export default function PDFtoCAD({ onNavigate, user, setUser }) {
    const [files, setFiles] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedHistory, setConvertedHistory] = useState([]);
    const [progress, setProgress] = useState({});
    const [cadFormat, setCadFormat] = useState('dxf'); // Toggle between 'dxf' or 'dwg'

    const currentFileId = files[0] ? `${files[0].name}-${files[0].size}` : null;
    const currentProgress = currentFileId ? (progress[currentFileId] ?? 0) : 0;
    const isUploading = files.length > 0 && currentProgress < 100;

    const handlePDFtoCAD = () => {
        if (files.length === 0 || isUploading) return;
        setIsConverting(true);

        // Simulate tracing lines, scales, and text layouts into precise CAD layers
        setTimeout(() => {
            const cleanName = files[0]?.name ? files[0].name.replace('.pdf', '') : 'Blueprint-Layout';
            const newResult = {
                id: Date.now(),
                name: `${cleanName}.${cadFormat}`,
                time: new Date().toLocaleTimeString(),
                layerCount: 'Layer-0, Dimensions, Text-Vectorized',
                format: cadFormat.toUpperCase(),
            };
            setConvertedHistory(prev => [newResult, ...prev]);
            setFiles([]);
            setProgress({});
            setIsConverting(false);
        }, 3000); // 3 seconds simulation for processing vectors
    };

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="text-5sm hover:underline text-amber-800 mb-6 flex gap-1 cursor-pointer font-medium"
                >
                    ← Back to Dashboard
                </button>
                <div className="flex flex-col gap-1 justify-center text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Convert PDF to DXF/DWG</h1>
                    <p className="text-sm text-gray-500 mt-1">Vectorization engine that tracks PDF vector lines and arcs, translating them into CAD objects.</p>
                </div>
            </div>

            {/* CAD Format Engine Selector */}
            <div className="flex justify-center mt-1">
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1 border border-gray-200">
                    <button
                        onClick={() => setCadFormat('dxf')}
                        className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all ${cadFormat === 'dxf' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Export to DXF (Universal)
                    </button>
                    <button
                        onClick={() => setCadFormat('dwg')}
                        className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all ${cadFormat === 'dwg' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Export to DWG (AutoCAD)
                    </button>
                </div>
            </div>

            {/* Upload Zone */}
            <UploadZone
                files={files}
                setFiles={setFiles}
                progress={progress}
                setProgress={setProgress}
            />

            {/* Trigger Button */}
            {files.length > 0 && (
                <div className="flex justify-center">
                    <button
                        onClick={handlePDFtoCAD}
                        disabled={isConverting || isUploading}
                        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition shadow-md shadow-amber-100"
                    >
                        {isConverting ? 'Vectorizing Layers...' : isUploading ? 'Reading geometry...' : `Convert to Vector ${cadFormat.toUpperCase()}`}
                    </button>
                </div>
            )}

            {/* Vector Transformation Outputs */}
            {convertedHistory.length > 0 && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-700">Generated Drawing Formats</p>
                    {convertedHistory.map(result => (
                        <div key={result.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Ruler size={15} className="text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{result.name}</p>
                                    <p className="text-xs text-gray-400">CAD Format: {result.format} · Mapped: {result.layerCount} · {result.time}</p>
                                </div>
                            </div>
                            {/* In a production app, this points directly to the compiled blob file buffer hook */}
                            <button
                                onClick={() => alert(`Downloading converted ${result.format} asset configuration.`)}
                                className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
                            >
                                <Download size={18} />
                            </button>
                        </div>
                    ))}
                    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-700 font-medium text-sm shadow-sm">
                        ✓ Vector tracing engine completed successfully. Scale matching 1:1 margins established.
                    </div>
                </div>
            )}
        </div>
    );
}
