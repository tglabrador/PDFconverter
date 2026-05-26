import React, { useState, useEffect } from 'react';
import './index.css';
import { FileText, HardDrive, Upload, Download } from 'lucide-react';

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

function UploadZone({ files, setFiles, progress, setProgress }) {
    const [dragging, setDragging] = useState(false);

    const handleFiles = (incoming) => {
        if (!incoming || incoming.length === 0) return;

        const file = incoming[0];
        setFiles([file]);

        const id = `${file.name}-${file.size}`;
        setProgress({ [id]: 0 });

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
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300 bg-white hover:bg-blue-50/40'}`}
            >
                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={e => handleFiles(e.target.files)}
                />
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload size={26} className="text-blue-600" />
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-800">Upload your PDF file</p>
                    <p className="text-sm text-gray-500 mt-1">Drag and drop file here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Supports PDF only</p>
                </div>
                <div className="flex gap-3 mt-1">
                    <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                        <span className="text-lg font-light leading-none">+</span> Select File
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-50 transition">
                        <HardDrive size={15} /> From Google Drive
                    </div>
                </div>
            </label>

            {files.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">Selected File</p>
                        <button
                            onClick={removeFile}
                            className="text-xs text-red-400 hover:text-red-600 transition"
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

export default function PDFtoWord({ onNavigate, user, setUser }) {
    const [files, setFiles] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedHistory, setConvertedHistory] = useState([]);
    // 1. Move progress state here so the parent component can monitor it
    const [progress, setProgress] = useState({});

    // 2. Determine if the current file is still in the middle of uploading
    const currentFileId = files[0] ? `${files[0].name}-${files[0].size}` : null;
    const currentProgress = currentFileId ? (progress[currentFileId] ?? 0) : 0;
    const isUploading = files.length > 0 && currentProgress < 100;

    const handlePDFtoWord = () => {
        if (files.length === 0 || isUploading) return;
        setIsConverting(true);

        setTimeout(() => {
            const newResult = {
                id: Date.now(),
                name: files[0]?.name ? `${files[0].name.replace('.pdf', '')}.docx` : `Converted-Word-${convertedHistory.length + 1}.docx`,
                time: new Date().toLocaleTimeString(),
                fileCount: 1,
            };
            setConvertedHistory(prev => [newResult, ...prev]);
            setFiles([]);
            setProgress({}); // Clear progress tracker cleanly
            setIsConverting(false);
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="text-5sm hover:underline text-blue-800 mb-6 flex gap-1 cursor-pointer"
                >
                    ← Back to Dashboard
                </button>
                <div className="flex flex-col gap-1 justify-center text-center" >
                    <h1 className="text-4xl font-bold text-gray-900">Convert PDF to Word</h1>
                    <p className="text-sm text-gray-500 mt-1">Convert text elements while maintaining tabular margins for signature pages and legal fields.</p>
                </div>
            </div>

            {/* Upload Zone (Pass progress and setProgress down as props) */}
            <UploadZone
                files={files}
                setFiles={setFiles}
                progress={progress}
                setProgress={setProgress}
            />

            {/* Convert Button */}
            {files.length > 0 && (
                <div className="flex justify-center">
                    <button
                        onClick={handlePDFtoWord}
                        // 3. Disable if converting OR if still actively processing upload percentages
                        disabled={isConverting || isUploading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition"
                    >
                        {isConverting ? 'Converting...' : isUploading ? 'Waiting for upload...' : 'Convert PDF to Word'}
                    </button>
                </div>
            )}

            {/* Converted History */}
            {convertedHistory.length > 0 && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-700">Converted Files</p>
                    {convertedHistory.map(result => (
                        <div key={result.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText size={15} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{result.name}</p>
                                    <p className="text-xs text-gray-400">{result.fileCount} file converted · {result.time}</p>
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold px-2 py-2 rounded-lg transition">
                                <Download size={18} />
                            </button>
                        </div>
                    ))}
                    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-700 font-medium text-sm">
                        ✓ Converted Word document created successfully!
                    </div>
                </div>
            )}
        </div>
    );
}
