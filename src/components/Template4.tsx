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
        default: { primary: "bg-[#FF5DAD]", bg: "#FFDD00", cardBg: "bg-[#FF5DAD]", accent: "#FF5DAD", secondary: "#FFDD00", shadow: "shadow-[8px_8px_0px_0px_#FF5DAD]", text: "text-black", quote: "text-black" },
        gs: { primary: "bg-[#A90432]", bg: "#FFCD00", cardBg: "bg-[#2D2D2D]", accent: "#2D2D2D", secondary: "#A90432", shadow: "shadow-[8px_8px_0px_0px_#A90432]", text: "text-[#FFCD00]", quote: "text-[#FFCD00]" },
        fb: { primary: "bg-[#002D72]", bg: "#FFD100", cardBg: "bg-[#002D72]", accent: "#E30A17", secondary: "#002D72", shadow: "shadow-[8px_8px_0px_0px_#002D72]", text: "text-[#FFD100]", quote: "text-[#FFD100]" },
        bjk: { primary: "bg-[#000000]", bg: "#E10600", cardBg: "bg-[#000000]", accent: "#E10600", secondary: "#000000", shadow: "shadow-[8px_8px_0px_0px_#000000]", text: "text-[#FFFFFF]", quote: "text-[#FFFFFF]" },
        ts: { primary: "bg-[#7A263A]", bg: "#4FA3D1", cardBg: "bg-[#7A263A]", accent: "#FFFFFF", secondary: "#7A263A", shadow: "shadow-[8px_8px_0px_0px_#7A263A]", text: "text-[#4FA3D1]", quote: "text-[#4FA3D1]" },
        basak: { primary: "bg-[#0B3A82]", bg: "#FF6600", cardBg: "bg-[#0B3A82]", accent: "#FFFFFF", secondary: "#0B3A82", shadow: "shadow-[8px_8px_0px_0px_#0B3A82]", text: "text-[#FF6600]", quote: "text-[#FF6600]" },
        kasimpasa: { primary: "bg-[#005BAC]", bg: "#00A3E0", cardBg: "bg-[#005BAC]", accent: "#00A3E0", secondary: "#005BAC", shadow: "shadow-[8px_8px_0px_0px_#005BAC]", text: "text-[#00A3E0]", quote: "text-[#00A3E0]" },
        eyup: { primary: "bg-[#5A2D81]", bg: "#FFD100", cardBg: "bg-[#5A2D81]", accent: "#FFFFFF", secondary: "#5A2D81", shadow: "shadow-[8px_8px_0px_0px_#5A2D81]", text: "text-[#FFD100]", quote: "text-[#FFD100]" },
        goztepe: { primary: "bg-[#FFD100]", bg: "#C00000", cardBg: "bg-[#FFD100]", accent: "#000000", secondary: "#FFD100", shadow: "shadow-[8px_8px_0px_0px_#FFD100]", text: "text-[#C00000]", quote: "text-[#C00000]" },
        samsun: { primary: "bg-[#E30613]", bg: "#000000", cardBg: "bg-[#E30613]", accent: "#000000", secondary: "#E30613", shadow: "shadow-[8px_8px_0px_0px_#E30613]", text: "text-[#000000]", quote: "text-[#000000]" },
        rize: { primary: "bg-[#009639]", bg: "#003DA5", cardBg: "bg-[#009639]", accent: "#FFFFFF", secondary: "#009639", shadow: "shadow-[8px_8px_0px_0px_#009639]", text: "text-[#003DA5]", quote: "text-[#003DA5]" },
        konya: { primary: "bg-[#009639]", bg: "#000000", cardBg: "bg-[#009639]", accent: "#000000", secondary: "#009639", shadow: "shadow-[8px_8px_0px_0px_#009639]", text: "text-[#000000]", quote: "text-[#000000]" },
        antalya: { primary: "bg-[#E31E24]", bg: "#000000", cardBg: "bg-[#E31E24]", accent: "#000000", secondary: "#E31E24", shadow: "shadow-[8px_8px_0px_0px_#E31E24]", text: "text-[#000000]", quote: "text-[#000000]" },
        alanya: { primary: "bg-[#F47A20]", bg: "#009A44", cardBg: "bg-[#F47A20]", accent: "#FFFFFF", secondary: "#F47A20", shadow: "shadow-[8px_8px_0px_0px_#F47A20]", text: "text-[#009A44]", quote: "text-[#009A44]" },
        kayseri: { primary: "bg-[#FFB81C]", bg: "#D71920", cardBg: "bg-[#FFB81C]", accent: "#000000", secondary: "#FFB81C", shadow: "shadow-[8px_8px_0px_0px_#FFB81C]", text: "text-[#D71920]", quote: "text-[#D71920]" },
        gaziantep: { primary: "bg-[#DA291C]", bg: "#000000", cardBg: "bg-[#DA291C]", accent: "#FFFFFF", secondary: "#DA291C", shadow: "shadow-[8px_8px_0px_0px_#DA291C]", text: "text-[#000000]", quote: "text-[#000000]" },
        gencler: { primary: "bg-[#C8102E]", bg: "#000000", cardBg: "bg-[#C8102E]", accent: "#FFFFFF", secondary: "#C8102E", shadow: "shadow-[8px_8px_0px_0px_#C8102E]", text: "text-[#000000]", quote: "text-[#000000]" },
        kocaeli: { primary: "bg-[#007A3D]", bg: "#000000", cardBg: "bg-[#007A3D]", accent: "#FFFFFF", secondary: "#007A3D", shadow: "shadow-[8px_8px_0px_0px_#007A3D]", text: "text-[#000000]", quote: "text-[#000000]" },
        karagumruk: { primary: "bg-[#7A263A]", bg: "#000000", cardBg: "bg-[#7A263A]", accent: "#FFFFFF", secondary: "#7A263A", shadow: "shadow-[8px_8px_0px_0px_#7A263A]", text: "text-[#000000]", quote: "text-[#000000]" },
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

                <div className={`${currentTheme.cardBg || 'bg-white'} px-6 py-2 rounded-brutal shadow-2xl border-2 border-black rotate-[1deg]`}>
                    <span className="text-3xl font-black tracking-tighter uppercase italic text-black leading-none">VARSAYIM</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`relative z-10 flex-1 flex flex-col justify-end ${isLandscape ? 'p-12 pb-48' : 'p-12 pb-64'} space-y-8`}>
                <div className="flex flex-col items-start gap-4 max-w-[90%]">
                    {state.positionLabel && (
                        <div className={`${currentTheme.cardBg || 'bg-white'} text-black px-4 py-1 text-xs font-black uppercase tracking-widest rotate-[-1deg]`}>
                            {state.positionLabel}
                        </div>
                    )}

                    {state.positionText && (
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h1 className={`${headlineFontSize} font-bold text-white uppercase italic leading-tight tracking-normal text-left drop-shadow-2xl max-w-[15ch] break-words`}>
                                {state.positionText}
                            </h1>
                            <div className="mt-4 w-24 h-2 bg-red-600" />
                        </div>
                    )}

                    <div className={`bg-white text-black shadow-brutal border-2 border-black p-8 mt-4 w-full text-left`}>
                        <p className={`${commentFontSize} text-black font-black leading-relaxed tracking-normal text-left uppercase`}>
                            {renderedComment || "İçerik bekleniyor..."}
                        </p>
                    </div>
                </div>

                {state.author && (
                    <div className="flex items-center gap-4 animate-in slide-in-from-left-10 duration-700">
                        <div className="flex flex-col bg-white text-black px-6 py-3 border-2 border-black shadow-brutal rotate-[-1deg]">
                            <span className="text-xl font-black text-black uppercase italic tracking-tighter leading-none">
                                {state.author}
                            </span>
                            {state.authorTitle && (
                                <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em] mt-1">
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
                    <div className={`${isExtremeLandscape ? 'mb-8 scale-[0.85]' : 'mb-6'} bg-white border-brutal border-black ${currentTheme.shadow} px-8 py-3 flex flex-col items-center rotate-1`}>
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
