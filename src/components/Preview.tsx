import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../store/useStore";
import { PRESETS } from "../types";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import { ZoomIn, ZoomOut, RotateCcw, Download, Save } from "lucide-react";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
    onSavePreset: () => void;
    onDownload: () => void;
}

const Preview: React.FC<Props> = ({ domRef, onSavePreset, onDownload }) => {
    const { template, currentPreset } = useStore();
    const [autoScale, setAutoScale] = useState(0.3);
    const [manualScaleOffset, setManualScaleOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const preset = PRESETS[currentPreset] || PRESETS["ratio-1-1"];

    // Drag to scroll state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                // Top header bar is around 70px tall, padding around 40px
                const availableWidth = width - 40;
                const availableHeight = height - 110;

                if (availableWidth > 0 && availableHeight > 0) {
                    const scaleX = availableWidth / preset.width;
                    const scaleY = availableHeight / preset.height;
                    const safeScale = Math.min(scaleX, scaleY, 0.95);
                    setAutoScale(Math.max(safeScale, 0.1));
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [preset.width, preset.height]);

    const currentScale = Math.min(Math.max(autoScale + manualScaleOffset, 0.1), 3);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!viewportRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - viewportRef.current.offsetLeft);
        setStartY(e.pageY - viewportRef.current.offsetTop);
        setScrollLeft(viewportRef.current.scrollLeft);
        setScrollTop(viewportRef.current.scrollTop);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !viewportRef.current) return;
        e.preventDefault();
        const x = e.pageX - viewportRef.current.offsetLeft;
        const y = e.pageY - viewportRef.current.offsetTop;
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;
        viewportRef.current.scrollLeft = scrollLeft - walkX;
        viewportRef.current.scrollTop = scrollTop - walkY;
    };

    const renderTemplate = () => {
        switch (template) {
            case "template2":
                return <Template2 domRef={domRef} />;
            case "template3":
                return <Template3 domRef={domRef} />;
            case "template4":
                return <Template4 domRef={domRef} />;
            case "template5":
                return <Template5 domRef={domRef} />;
            case "template6":
                return <Template6 domRef={domRef} />;
            default:
                return <Template1 domRef={domRef} />;
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 h-full bg-[#EAEAEA] relative overflow-hidden flex flex-col min-w-0"
        >
            {/* ÜST KONTROL & BUTON BARI */}
            <div className="bg-white border-b-2 border-black px-6 py-3 flex items-center justify-between z-40 shadow-sm shrink-0 flex-wrap gap-3">
                {/* Sol: İndir & Kaydet Butonları */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onDownload}
                        className="bg-[#FFD700] text-black border-2 border-black px-5 py-2 font-black italic text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> İNDİR (PNG)
                    </button>
                    <button
                        onClick={onSavePreset}
                        className="bg-black text-white border-2 border-black px-5 py-2 font-black italic text-xs uppercase shadow-[3px_3px_0px_#FFD700] hover:translate-x-px hover:translate-y-px transition-all flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" /> KAYDET
                    </button>
                </div>

                {/* Sağ: Bilgi & Zoom Kontrolleri */}
                <div className="flex items-center gap-4">
                    <div className="bg-zinc-100 border border-black/20 px-3 py-1 rounded text-[11px] font-mono flex items-center gap-2">
                        <span className="font-bold text-black">{preset.width}x{preset.height}</span>
                        <span className="opacity-30">|</span>
                        <span className="text-[#000] font-bold">{template.toUpperCase()}</span>
                        <span className="opacity-30">|</span>
                        <span className="text-black font-black">%{Math.round(currentScale * 100)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setManualScaleOffset((prev) => prev + 0.1)}
                            className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center hover:bg-[#FFD700] transition-colors"
                            title="Yakınlaştır"
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={() => setManualScaleOffset((prev) => prev - 0.1)}
                            className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center hover:bg-[#FFD700] transition-colors"
                            title="Uzaklaştır"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <button
                            onClick={() => setManualScaleOffset(0)}
                            className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center hover:bg-[#FFD700] transition-colors"
                            title="Sıfırla"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MERKEZ GÖRSEL ALANI (FİT TO VIEWPORT & COMPENSATED DIMENSIONS) */}
            <div
                ref={viewportRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex-1 w-full h-full overflow-auto p-6 flex items-center justify-center select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
                {/* Scaled Bounding Container to prevent DOM overflow */}
                <div
                    style={{
                        width: preset.width * currentScale,
                        height: preset.height * currentScale,
                        position: "relative",
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            width: preset.width,
                            height: preset.height,
                            transform: `scale(${currentScale})`,
                            transformOrigin: "top left",
                            transition: (manualScaleOffset === 0 && !isDragging) ? "transform 0.15s ease-out" : "none",
                        }}
                        className="pointer-events-none shadow-[0_12px_40px_rgba(0,0,0,0.35)] border-2 border-black rounded-sm overflow-hidden"
                    >
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
