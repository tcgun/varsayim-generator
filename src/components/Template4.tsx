"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe, TrendingUp } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template4: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isExtremeLandscape = isLandscape && preset.height < 650;

    // Tema Renkleri
    const THEMES: Record<string, any> = {
        default: { primary: "bg-v-yellow", bg: "#040404", accent: "#3B82F6", secondary: "#1F2937", shadow: "shadow-[8px_8px_0px_0px_rgba(250,255,0,0.5)]", text: "text-black" },
        gs: { primary: "bg-[#A90432]", bg: "#FDB912", accent: "#FFFFFF", secondary: "#7A0325", shadow: "shadow-[8px_8px_0px_0px_#A90432]", text: "text-[#A90432]" },
        fb: { primary: "bg-[#002d72]", bg: "#f9b517", accent: "#FFFFFF", secondary: "#001D4A", shadow: "shadow-[8px_8px_0px_0px_#002d72]", text: "text-[#002d72]" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

    // Metin Hiyerarşisi Font Boyutları
    const headlineFontSize = useMemo(() => {
        const len = (state.positionText || "").length;
        if (len > 40) return "text-4xl";
        if (len > 30) return "text-5xl";
        return isLandscape ? "text-6xl" : "text-7xl";
    }, [state.positionText, isLandscape]);

    const commentFontSize = useMemo(() => {
        const len = state.comment.length;
        if (len > 300) return "text-base";
        if (len > 200) return "text-lg";
        if (len > 100) return "text-2xl";
        return isLandscape ? "text-3xl" : "text-4xl";
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
                <span className="text-yellow-400 font-black underline decoration-4 underline-offset-8">{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight]);

    return (
        <div
            ref={domRef}
            className="relative flex flex-col p-0 overflow-hidden box-border font-sans bg-[#0c0c0c]"
            style={{
                width: preset.width,
                height: preset.height,
            }}
            id="capture-area"
        >
            {/* Arka Plan */}
            <div className="absolute inset-0 z-0">
                {state.authorImage ? (
                    <img src={state.authorImage} className="w-full h-full object-cover opacity-20 blur-[2px]" />
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent" />
            </div>

            {/* TV Üst Bandı */}
            <div className="absolute top-0 left-0 right-0 h-2 z-50 flex">
                <div className="bg-red-600 w-1/4 h-full" />
                <div className="bg-white/10 w-3/4 h-full" />
            </div>

            {/* HEADER: News Source & Branding */}
            <div className={`absolute ${isLandscape ? 'top-8 left-8 right-8' : 'top-12 left-12 right-12'} flex items-start justify-between z-50`}>
                <div className="flex items-center gap-4">
                    <div className="bg-red-600 text-white px-4 py-1 font-black text-sm italic animate-pulse">SON DAKİKA</div>
                    <div className="h-6 w-[2px] bg-white/20" />
                    <span className="text-white/60 font-black text-sm tracking-[0.2em]">{state.date}</span>
                </div>

                <div className="bg-white px-6 py-2 rounded-brutal shadow-2xl border-2 border-black rotate-[1deg]">
                    <span className="text-3xl font-black tracking-tighter uppercase italic text-black leading-none">VARSAYIM</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`relative z-10 flex-1 flex flex-col justify-end ${isLandscape ? 'p-12 pb-48' : 'p-12 pb-64'} space-y-8`}>
                <div className="flex flex-col items-start gap-4 max-w-[90%]">
                    {state.positionLabel && (
                        <div className="bg-white text-black px-4 py-1 text-xs font-black uppercase tracking-widest rotate-[-1deg]">
                            {state.positionLabel}
                        </div>
                    )}

                    {state.positionText && (
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h1 className={`${headlineFontSize} font-black text-white uppercase italic leading-[0.95] tracking-tight text-left drop-shadow-2xl max-w-[15ch] break-words`}>
                                {state.positionText}
                            </h1>
                            <div className="mt-4 w-24 h-2 bg-red-600" />
                        </div>
                    )}

                    <div className="bg-white/5 backdrop-blur-md border-l-4 border-white/20 p-8 mt-4 w-full text-left">
                        <p className={`${commentFontSize} text-white/90 font-bold leading-relaxed tracking-normal text-left`}>
                            {renderedComment || "İçerik bekleniyor..."}
                        </p>
                    </div>
                </div>

                {state.author && (
                    <div className="flex items-center gap-4 animate-in slide-in-from-left-10 duration-700">
                        <div className="flex flex-col border-l-2 border-red-600 pl-4">
                            <span className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">
                                {state.author}
                            </span>
                            {state.authorTitle && (
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-1">
                                    {state.authorTitle}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Maç Bilgisi & Marka Çubuğu (T1 Standart) */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
                {/* Maç Bilgisi */}
                {state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'mb-8 scale-[0.85]' : 'mb-6'} bg-white border-brutal border-black shadow-brutal px-8 py-3 flex flex-col items-center rotate-1`}>
                        <p className={`text-xl font-black uppercase tracking-widest text-center text-black`}>
                            {state.homeTeam} {state.score} {state.awayTeam}
                        </p>
                        <p className="text-[10px] font-bold opacity-50 text-center tracking-[0.3em] mt-1 text-black">
                            {state.matchWeek} {state.separator} {state.date}
                        </p>
                    </div>
                )}

                {/* Marka Çubuğu */}
                {state.showBrandingBar && (
                    <div className="w-full bg-black text-white py-4 px-8 border-t-brutal border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe size={16} className="text-v-yellow" />
                            <span className="font-bold text-base tracking-tight">{state.website}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {state.handleInstagram && (
                                <div className="flex items-center gap-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{state.handleInstagram}</span>
                                </div>
                            )}
                            {state.handleTiktok && (
                                <div className="flex items-center gap-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{state.handleTiktok}</span>
                                </div>
                            )}
                            {state.handleX && (
                                <div className="flex items-center gap-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" /></svg>
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{state.handleX}</span>
                                </div>
                            )}
                            {state.handleFacebook && (
                                <div className="flex items-center gap-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{state.handleFacebook}</span>
                                </div>
                            )}
                            {state.handleYoutube && (
                                <div className="flex items-center gap-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                    </div>
                                    <span className="font-bold text-xs tracking-tight">{state.handleYoutube}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template4;
