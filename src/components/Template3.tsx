"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template3: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isExtremeLandscape = isLandscape && preset.height < 650;

    const THEMES: Record<string, any> = {
        default: { primary: "#FAFF00", bg: "#000000", border: "#FAFF00", text: "#FFFFFF", shadow: "shadow-[8px_8px_0px_0px_rgba(250,255,0,0.5)]" },
        gs: { primary: "#FDB912", bg: "#A90432", border: "#FDB912", text: "#FFFFFF", shadow: "shadow-[8px_8px_0px_0px_#FDB912]" },
        fb: { primary: "#f9b517", bg: "#002d72", border: "#f9b517", text: "#FFFFFF", shadow: "shadow-[8px_8px_0px_0px_#f9b517]" },
        bjk: { primary: "#FFFFFF", bg: "#000000", border: "#FFFFFF", text: "#FFFFFF", shadow: "shadow-[8px_8px_0px_0px_#FFFFFF]" },
        ts: { primary: "#87CEEB", bg: "#A52A2A", border: "#87CEEB", text: "#FFFFFF", shadow: "shadow-[8px_8px_0px_0px_#87CEEB]" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

    const fontSize = useMemo(() => {
        const len = state.comment.length;
        if (len > 500) return "text-base";
        if (len > 400) return "text-lg";
        if (len > 300) return "text-xl";
        if (len > 250) return "text-2xl";
        if (len > 200) return "text-3xl";
        if (len > 150) return "text-5xl";
        if (len > 100) return isLandscape ? "text-4xl" : "text-7xl";
        if (len > 50) return isLandscape ? "text-5xl" : "text-8xl";
        return isLandscape ? "text-6xl" : "text-[10rem]";
    }, [state.comment, isLandscape]);

    const renderedComment = useMemo(() => {
        const comment = state.comment.trim();
        if (!state.highlight || !comment.toLowerCase().includes(state.highlight.toLowerCase())) {
            return comment;
        }

        const index = comment.toLowerCase().indexOf(state.highlight.toLowerCase());
        const before = comment.substring(0, index);
        const match = comment.substring(index, index + state.highlight.length);
        const after = comment.substring(index + state.highlight.length);

        return (
            <>
                {before}
                <span style={{ color: currentTheme.primary }} className="bg-white/10 px-2 py-0.5 rounded-sm">{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight, currentTheme]);

    return (
        <div
            ref={domRef}
            className="relative flex flex-col justify-between overflow-hidden box-border font-sans transition-all duration-300"
            style={{
                width: preset.width,
                height: preset.height,
                backgroundColor: currentTheme.bg,
                color: currentTheme.text
            }}
            id="capture-area"
        >
            {/* Arka Plan Deseni */}
            <div className={`absolute inset-0 z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]`} />

            {/* Üst Kenarlık */}
            <div className="absolute top-0 left-0 w-full h-2 z-[60]" style={{ backgroundColor: currentTheme.primary }} />

            {/* HEADER: Sponsor & Logo */}
            <div className={`absolute ${isLandscape ? 'top-8 left-8 right-8' : 'top-12 left-12 right-12'} flex items-start justify-between z-50`}>
                {state.showSponsor && (state.sponsorName || state.sponsorLogo) ? (
                    <div className="bg-white text-black p-2 flex items-center gap-3 rounded-brutal shadow-2xl border-2 border-black rotate-[-1deg]">
                        {state.sponsorLogo && <img src={state.sponsorLogo} alt="Sponsor" className="h-6 object-contain" />}
                        {state.sponsorName && (
                            <div className="flex flex-col items-start leading-none pr-2">
                                <span className="text-[6px] font-black uppercase tracking-widest opacity-30 italic">DESTEĞİYLE</span>
                                <span className="text-xs font-black italic uppercase tracking-tighter">{state.sponsorName}</span>
                            </div>
                        )}
                    </div>
                ) : <div />}

                <div className="bg-white px-6 py-2 rounded-brutal shadow-2xl border-2 border-black rotate-[1deg]">
                    <span className="text-3xl font-black tracking-tighter uppercase italic text-black leading-none">VARSAYIM</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`flex-1 flex flex-col items-center justify-center z-10 ${isLandscape ? 'px-16 pt-32 pb-48' : 'px-12 pt-64 pb-64'}`}>
                <div className="max-w-6xl w-full flex flex-col items-center gap-16">
                    <p className={`${fontSize} font-black leading-[1] tracking-tighter uppercase italic text-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]`}>
                        {renderedComment || "DRIES MERTENS"}
                    </p>

                    {/* Author Section */}
                    {state.author && (
                        <div className="flex flex-col items-center gap-5 animate-in fade-in duration-1000">
                            {state.authorImage && (
                                <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl scale-110">
                                    <img src={state.authorImage} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="text-center space-y-2">
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter bg-white text-black px-8 py-2 rounded-brutal border-2 border-black shadow-2xl">
                                    {state.author}
                                </h2>
                                {state.authorTitle && (
                                    <p className="text-xs font-black opacity-60 tracking-[0.4em] uppercase italic">
                                        {state.authorTitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Maç Bilgisi & Marka Çubuğu (T1 Standart) */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
                {/* Maç Bilgisi */}
                {state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'mb-8 scale-[0.85]' : 'mb-6'} bg-white border-brutal border-black ${currentTheme.shadow} px-8 py-3 flex flex-col items-center rotate-1`}>
                        <p className={`text-xl font-black uppercase tracking-widest text-center ${state.theme !== "default" ? currentTheme.text : 'text-black'}`}>
                            {state.homeTeam} {state.score} {state.awayTeam}
                        </p>
                        <p className="text-[10px] font-bold opacity-40 text-center tracking-[0.3em] mt-1">
                            {state.date} {state.separator} VARSAYIM LABS
                        </p>
                    </div>
                )}

                {/* Marka Çubuğu */}
                {state.showBrandingBar && (
                    <div className="w-full bg-black text-white py-4 px-12 border-t-brutal border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe size={18} className="text-v-yellow" />
                            <span className="font-bold text-lg tracking-tight">{state.website}</span>
                        </div>

                        <div className="flex items-center gap-6">
                            {state.handleInstagram && (
                                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{state.handleInstagram}</span>
                                </div>
                            )}
                            {state.handleX && (
                                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" /></svg>
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{state.handleX}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template3;
