"use client";

import React, { useEffect, useState, useRef } from "react";
import { AppState, PRESETS } from "../types";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Preview: React.FC<Props> = ({ state, domRef }) => {
    const [scale, setScale] = useState(0.2); // Start small to avoid jump
    const containerRef = useRef<HTMLDivElement>(null);
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                // Güvenli padding (Mobilde çok daha az)
                const padding = width < 500 ? 20 : 100;
                const availableWidth = width - padding;
                const availableHeight = height - padding;

                const scaleX = availableWidth / preset.width;
                const scaleY = availableHeight / preset.height;

                // En güvenli ölçeği seç (Maksimum 0.95 ile sınırla)
                const safeScale = Math.min(scaleX, scaleY, 0.95);
                setScale(safeScale);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [preset.width, preset.height]);

    const renderTemplate = () => {
        switch (state.template) {
            case "template2":
                return <Template2 state={state} domRef={domRef} />;
            case "template3":
                return <Template3 state={state} domRef={domRef} />;
            default:
                return <Template1 state={state} domRef={domRef} />;
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 bg-v-gray flex items-center justify-center p-8 overflow-hidden relative"
        >
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s ease-out"
                }}
            >
                {renderTemplate()}
            </div>

            {/* Rapor çubuğu */}
            <div className="absolute bottom-4 right-6 bg-black text-white px-3 py-1 rounded-full text-xs font-mono">
                {preset.width} x {preset.height} px | {state.template.toUpperCase()}
            </div>
        </div>
    );
};

export default Preview;
