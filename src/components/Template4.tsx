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

    // Tema Renkleri (Sade / Göz Yormayan)
    const THEMES: Record<string, any> = {
        varsayim: { primary: "bg-[#E2E8F0]", bg: "#FDF6E3", cardBg: "bg-[#FFFFFF]", accent: "#94A3B8", secondary: "#FDF6E3", shadow: "shadow-[8px_8px_0px_0px_#CBD5E1]", text: "text-slate-800", quote: "text-slate-300" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.varsayim;

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
        if (!state.highlight) return comment;

        const highlights = state.highlight.split('*').map(h => h.trim()).filter(h => h !== "");
        if (highlights.length === 0) return comment;

        const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');

        const parts = comment.split(regex);
        return parts.map((part, i) => {
            const isMatch = highlights.some(h => h.toLowerCase() === part.toLowerCase());
            if (isMatch) {
                return (
                    <mark key={i} className="bg-red-600 text-white px-2 py-0.5 rounded-sm mx-1">
                        {part}
                    </mark>
                );
            }
            return part;
        });
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
                    <div className="w-full h-full" style={{ backgroundColor: currentTheme.bg }} />
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
            <div className={`absolute ${isLandscape ? 'top-8 left-8 right-8' : 'top-12 left-12 right-12'} flex items-start z-50`}>
                <div className="flex items-center gap-4">
                    <span className="text-white/80 font-black text-sm tracking-[0.2em] bg-black/50 px-3 py-1">{state.date}</span>
                </div>
            </div>

            {/* VARSAYIM Logo (Template 1 Style) */}
            <div className={`absolute ${isLandscape ? 'top-2 right-2' : 'top-4 right-4'} z-50`}>
                <div className="bg-[#FFD700] text-black border-[3px] border-black shadow-[4px_4px_15px_rgba(255,0,150,0.6)] px-8 py-3">
                    <span className="text-4xl font-black tracking-tighter uppercase text-black">
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`relative z-10 flex-1 flex flex-col justify-end ${isLandscape ? 'p-12 pb-48' : 'p-12 pb-56'} space-y-8`}>
                <div className="flex flex-col items-start gap-4 max-w-[90%]">


                    {state.positionText && (
                        <div className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 font-black text-xl border-2 border-black shadow-brutal w-fit uppercase text-center">
                            {state.positionText}
                        </div>
                    )}

                    <div className={`${currentTheme.cardBg || 'bg-white'} text-black ${currentTheme.shadow} border-2 border-black p-8 mt-4 w-full text-left`}>
                        <p className={`${commentFontSize} text-black font-black leading-relaxed tracking-normal text-left uppercase`}>
                            {renderedComment || "İçerik bekleniyor..."}
                        </p>
                    </div>
                </div>

                {state.author && (
                    <div className="flex items-center gap-4 animate-in slide-in-from-left-10 duration-700">
                        <div className={`flex flex-col ${currentTheme.cardBg || 'bg-white'} text-black px-6 py-3 border-2 border-black shadow-brutal`}>
                            <span className="text-xl font-black text-black uppercase italic tracking-tighter leading-none">
                                {state.author}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Maç Bilgisi & Marka Çubuğu (T1 Standart) */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
                {/* Maç Bilgisi */}
                {state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'mb-8 scale-[0.85]' : 'mb-6'} bg-white border-brutal border-black ${currentTheme.shadow} px-8 py-3 flex flex-col items-center`}>
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
