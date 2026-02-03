"use client";

import React, { useEffect, useState, useRef } from "react";
import { AppState, PRESETS } from "../types";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Preview: React.FC<Props> = ({ state, domRef }) => {
    const [autoScale, setAutoScale] = useState(0.2);
    const [manualScaleOffset, setManualScaleOffset] = useState(0); // Offset from autoScale
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];

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
                const padding = width < 500 ? 20 : 100;
                const availableWidth = width - padding;
                const availableHeight = height - padding;

                const scaleX = availableWidth / preset.width;
                const scaleY = availableHeight / preset.height;

                const safeScale = Math.min(scaleX, scaleY, 0.95);
                setAutoScale(safeScale);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [preset.width, preset.height]);

    const currentScale = Math.min(Math.max(autoScale + manualScaleOffset, 0.1), 3);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setStartY(e.pageY - scrollRef.current.offsetTop);
        setScrollLeft(scrollRef.current.scrollLeft);
        setScrollTop(scrollRef.current.scrollTop);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const y = e.pageY - scrollRef.current.offsetTop;
        const walkX = (x - startX) * 1.5; // Scroll speed multiplier
        const walkY = (y - startY) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walkX;
        scrollRef.current.scrollTop = scrollTop - walkY;
    };

    const renderTemplate = () => {
        switch (state.template) {
            case "template2":
                return <Template2 state={state} domRef={domRef} />;
            case "template3":
                return <Template3 state={state} domRef={domRef} />;
            case "template4":
                return <Template4 state={state} domRef={domRef} />;
            case "template5":
                return <Template5 state={state} domRef={domRef} />;
            default:
                return <Template1 state={state} domRef={domRef} />;
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 md:w-1/2 bg-v-gray relative overflow-hidden flex flex-col"
        >
            {/* Zoom Controls Overlay */}
            <div className="absolute top-6 right-6 z-50 flex flex-col gap-2">
                <button
                    onClick={() => setManualScaleOffset((prev: number) => prev + 0.1)}
                    className="w-10 h-10 bg-white border-2 border-black shadow-brutal flex items-center justify-center hover:bg-v-yellow transition-colors"
                    title="Yakınlaştır"
                >
                    <ZoomIn size={20} />
                </button>
                <button
                    onClick={() => setManualScaleOffset((prev: number) => prev - 0.1)}
                    className="w-10 h-10 bg-white border-2 border-black shadow-brutal flex items-center justify-center hover:bg-v-yellow transition-colors"
                    title="Uzaklaştır"
                >
                    <ZoomOut size={20} />
                </button>
                <button
                    onClick={() => setManualScaleOffset(0)}
                    className="w-10 h-10 bg-white border-2 border-black shadow-brutal flex items-center justify-center hover:bg-v-yellow transition-colors"
                    title="Sıfırla"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Scrollable Area */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex-1 overflow-auto p-12 flex items-center justify-center scrollbar-hide select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
                <div
                    style={{
                        transform: `scale(${currentScale})`,
                        transformOrigin: "center center",
                        transition: (manualScaleOffset === 0 && !isDragging) ? "transform 0.2s ease-out" : "none",
                        width: preset.width,
                        height: preset.height,
                        minWidth: preset.width,
                        minHeight: preset.height,
                    }}
                    className="shrink-0 pointer-events-none"
                >
                    {renderTemplate()}
                </div>
            </div>

            {/* Rapor çubuğu */}
            <div className="absolute bottom-4 left-6 bg-black text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-3 z-40">
                <span>{preset.width} x {preset.height} px</span>
                <span className="opacity-40">|</span>
                <span>{state.template.toUpperCase()}</span>
                <span className="opacity-40">|</span>
                <span className="text-v-yellow">%{Math.round(currentScale * 100)}</span>
                {isDragging && <span className="text-white/40 ml-2 animate-pulse">KAYDIRILIYOR...</span>}
            </div>
        </div>
    );
};

export default Preview;
