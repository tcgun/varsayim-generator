"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe, Bell, Share2 } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template5: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isExtremeLandscape = isLandscape && preset.height < 650;

    // Tema Renkleri (Sade / Göz Yormayan)
    const THEMES: Record<string, any> = {
        varsayim: { primary: "bg-[#E2E8F0]", bg: "#FDF6E3", cardBg: "bg-[#FFFFFF]", badge: "bg-[#E2E8F0]", highlight: "bg-[#94A3B8]", border: "border-slate-300", shadow: "shadow-[8px_8px_0px_0px_#CBD5E1]", text: "text-slate-800", quote: "text-slate-300" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.varsayim;

    const headlineFontSize = useMemo(() => {
        const text = (state.positionText || "").trim();
        const len = text.length;
        if (len > 50) return "text-4xl";
        if (len > 30) return "text-5xl";
        return isLandscape ? "text-7xl" : "text-8xl";
    }, [state.positionText, isLandscape]);

    const commentFontSize = useMemo(() => {
        const len = state.comment.length;
        if (len > 300) return "text-lg";
        if (len > 200) return "text-xl";
        if (len > 100) return "text-3xl";
        return isLandscape ? "text-4xl" : "text-5xl";
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
                    <mark key={i} className={`${currentTheme.highlight || 'bg-red-600'} text-white px-2 py-0.5 rounded-sm mx-1`}>
                        {part}
                    </mark>
                );
            }
            return part;
        });
    }, [state.comment, state.highlight, currentTheme]);

    return (
        <div
            ref={domRef}
            className="relative flex flex-col p-0 overflow-hidden box-border font-sans transition-all duration-300"
            style={{
                width: preset.width,
                height: preset.height,
            }}
            id="capture-area"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0" style={{ backgroundColor: currentTheme.bg }} />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 z-50 bg-white/20">
                <div className="h-full bg-red-600 w-1/3" />
            </div>

            {/* HEADER & SPONSOR */}
            <div className={`absolute ${isLandscape ? 'top-8 left-8 right-8' : 'top-12 left-12 right-12'} flex items-start justify-between z-50`}>
                <div className="flex items-center gap-3">
                    {state.showSponsor && (state.sponsorName || state.sponsorLogo) ? (
                        <div className={`${currentTheme.cardBg || 'bg-white'} border-brutal border-black p-2 flex items-center gap-3 shadow-brutal h-[60px] min-w-[150px]`}>
                            {state.sponsorLogo && (
                                <img src={state.sponsorLogo} alt="Sponsor" className="h-full object-contain" />
                            )}
                            <div className="flex flex-col items-start leading-none pr-4 text-black">
                                <span className="text-[7px] font-black uppercase tracking-widest opacity-40 italic">DESTEĞİYLE</span>
                                <span className="text-base font-black italic uppercase tracking-tighter">
                                    {state.sponsorName || "SPONSOR"}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <span className="text-white/40 text-[10px] font-bold tracking-widest">{state.date}</span>
                    )}
                </div>

                <div className="bg-[#FFD700] text-black px-6 py-2 rounded-brutal shadow-[4px_4px_15px_rgba(255,0,150,0.6)] border-[3px] border-black">
                    <span className="text-3xl font-black tracking-tighter uppercase text-black leading-none">VARSAYIM</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`relative z-10 flex-1 flex flex-col justify-center px-10 md:px-16 ${isLandscape ? 'pt-24 pb-48' : 'pt-32 pb-56'}`}>
                <div className="flex flex-col gap-12 w-full">
                    {state.positionText && (
                        <div className="flex flex-col gap-4 max-w-[95%]">
                            <h1 className={`${headlineFontSize} font-bold leading-tight tracking-normal uppercase italic text-left text-white max-w-[15ch] break-words`}>
                                {state.positionText}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-16 bg-red-600" />
                                <div className="h-[1px] flex-1 bg-white/20" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 border-l-2 border-red-600">
                            <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">DİJİTAL ANALİZ</span>
                        </div>
                        <div className={`${currentTheme.cardBg || 'bg-white'} text-black shadow-brutal border-2 border-black p-6 max-w-[90%] w-fit mt-2`}>
                            <p className={`${commentFontSize} font-black leading-relaxed text-left text-black uppercase`}>
                                {renderedComment || "İçerik bekleniyor..."}
                            </p>
                        </div>
                    </div>
                </div>

                {state.author && (
                    <div className="flex flex-col bg-white text-black px-6 py-3 border-2 border-black shadow-brutal ml-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-red-600" />
                            <span className="text-2xl font-black italic uppercase tracking-tighter text-black">
                                {state.author}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Maç Bilgisi & Marka Çubuğu (Şablon 1 Standart) */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
                {/* Maç Bilgisi Kutusu */}
                {state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'mb-8 scale-[0.85]' : 'mb-6'} bg-white border-brutal border-black ${currentTheme.shadow} px-8 py-3 flex flex-col items-center`}>
                        <p className={`text-xl font-black uppercase tracking-widest text-center text-black`}>
                            {state.homeTeam} {state.score} {state.awayTeam}
                        </p>
                        {state.matchWeek && (
                            <p className="text-[10px] font-bold opacity-40 text-center tracking-[0.3em] mt-1 text-black">
                                {state.matchWeek} {state.separator} {state.date}
                            </p>
                        )}
                    </div>
                )}

                {/* Marka Çubuğu (Branding Bar) */}
                {state.showBrandingBar && (
                    <div className="w-full bg-black text-white py-4 px-8 border-t-brutal border-white/20 flex items-center justify-between">
                        {/* Web Sitesi (Sol) */}
                        <div className="flex items-center gap-2">
                            <Globe size={16} className="text-v-yellow" />
                            <span className="font-bold text-base tracking-tight">{state.website}</span>
                        </div>

                        {/* Sosyal Medya Kanalları (Orta/Sağ) */}
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

export default Template5;
