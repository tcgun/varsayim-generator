"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template1: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isExtremeLandscape = isLandscape && preset.height < 650;

    // Tema Renkleri (Sade / Göz Yormayan)
    const THEMES: Record<string, any> = {
        varsayim: { primary: "bg-[#E2E8F0]", bg: "#FDF6E3", cardBg: "bg-[#FFFFFF]", highlight: "bg-[#94A3B8]", border: "border-slate-300", shadow: "shadow-[8px_8px_0px_0px_#CBD5E1]", text: "text-slate-800", quote: "text-slate-300" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.varsayim;

    const renderedComment = useMemo(() => {
        const comment = state.comment.trim();
        if (!state.highlight) return comment;

        const highlights = state.highlight.split('*').map(h => h.trim()).filter(h => h !== "");
        if (highlights.length === 0) return comment;

        const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');
        const parts = comment.split(regex);

        return (
            <>
                {parts.map((part, i) => {
                    const isMatch = highlights.some(h => h.toLowerCase() === part.toLowerCase());
                    if (isMatch) {
                        return (
                            <span key={i} className={`${currentTheme.highlight || currentTheme.primary} ${state.theme === 'varsayim' ? 'text-white' : 'text-black'} px-1`}>
                                {part}
                            </span>
                        );
                    }
                    return part;
                })}
            </>
        );
    }, [state.comment, state.highlight, currentTheme, state.theme]);

    // Beyaz alanı dolduran ama göz yormayan dengeli font hesaplaması
    const fontSize = useMemo(() => {
        const len = state.comment.length;
        const isStory = state.currentPreset.includes('story') || state.currentPreset.includes('portrait');

        if (len > 400) return isStory ? "text-3xl" : "text-2xl";
        if (len > 300) return isStory ? "text-4xl" : "text-3xl";
        if (len > 200) return isStory ? "text-5xl" : "text-4xl";
        if (len > 150) return isStory ? "text-6xl" : "text-5xl";
        if (len > 100) return isStory ? "text-7xl" : "text-6xl";
        if (len > 50) return isStory ? "text-9xl" : "text-8xl";
        if (len > 25) return isStory ? "text-[10rem]" : "text-9xl";
        return isStory ? "text-[12rem]" : "text-[10rem]";
    }, [state.comment, state.currentPreset]);


    return (
        <div
            ref={domRef}
            className={`relative flex flex-col items-center justify-center p-[60px] overflow-hidden box-border`}
            style={{
                width: preset.width,
                height: preset.height,
                backgroundColor: currentTheme.bg,
            }}
            id="capture-area"
        >
            {/* Arka Plan Desenleri */}
            {state.pattern === "dots" && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            )}
            {state.pattern === "grid" && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            )}
            {state.pattern === "noise" && (
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            )}


            {/* VARSAYIM Logo (Sağ Üst) */}
            <div className={`absolute ${isLandscape ? 'top-2 right-2' : 'top-4 right-4'} z-50`}>
                <div className="bg-[#FFD700] text-black border-[3px] border-black shadow-[4px_4px_15px_rgba(255,0,150,0.6)] px-8 py-3">
                    <span className="text-4xl font-black tracking-tighter uppercase text-black">
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* Pozisyon & Dakika Bilgi Bloğu (Ortalı ve Geniş) */}
            {state.showPositionBox && (
                <div className={`relative z-40 ${isExtremeLandscape ? 'mb-2 scale-[0.55] mt-0' : (isLandscape ? 'mt-12 mb-4 scale-75' : 'mt-20 mb-8')} origin-center flex flex-col items-center gap-4 w-full max-w-[90%]`}>


                    {/* Ana Pozisyon Kutusu (Altta - Ortalı) */}
                    {state.positionText && (
                        <div className={`bg-white text-black border-brutal border-black ${isLandscape ? 'px-6 py-2' : 'px-10 py-3'} shadow-brutal flex items-center justify-center`}>
                            <span className={`${isLandscape ? 'text-xl' : 'text-2xl'} font-black uppercase tracking-tighter text-left text-black leading-snug inline-block`}>
                                {state.positionText}
                            </span>
                        </div>
                    )}

                    {/* Hakemin Kararı Kutusu */}
                    {state.refereeDecision && (
                        <div className={`bg-slate-800 border-brutal border-black ${isLandscape ? 'px-6 py-2' : 'px-10 py-3'} shadow-brutal flex items-center justify-center`}>
                            <span className={`${isLandscape ? 'text-2xl' : 'text-3xl'} font-black uppercase tracking-tighter text-center text-slate-100 leading-snug`}>
                                {state.refereeDecision}
                            </span>
                        </div>
                    )}

                    {/* Ana Konuşma Kutusu (DİNAMİK YÜKSEKLİK VE GENİŞLİK) */}
                    <div className={`w-full max-w-[98%] ${state.showMatchInfo ? (isExtremeLandscape ? 'mt-1' : (isLandscape ? 'mt-4' : 'mt-8')) : 'mt-0'} mb-0 relative z-10 flex flex-col items-center`}>
                        <div
                            className={`${currentTheme.cardBg || 'bg-white'} border-brutal border-black ${currentTheme.shadow} rounded-brutal flex flex-col items-center justify-center relative min-h-[350px] min-w-[300px] w-fit max-w-full`}
                        >
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-10 text-center">
                                <p className={`${fontSize} font-black leading-relaxed text-center whitespace-pre-wrap break-words w-full tracking-normal uppercase ${currentTheme.text}`}>
                                    <span className={`select-none ${currentTheme.text} opacity-10 text-[1.2rem] absolute top-4 left-4`}>“</span>
                                    {renderedComment}
                                    <span className={`select-none ${currentTheme.text} opacity-10 text-[1.2rem] absolute bottom-4 right-4`}>”</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`${isExtremeLandscape ? 'mt-1 mb-1 scale-[0.6]' : (isLandscape ? 'mt-1 mb-2' : 'mt-2 mb-8')} z-10 flex items-center gap-6`}>
                <div className={`bg-white border-brutal border-black px-6 py-2 shadow-brutal flex flex-col items-center`}>
                    <h2 className={`${isExtremeLandscape ? 'text-2xl' : (isLandscape ? 'text-3xl' : 'text-5xl')} font-black uppercase tracking-tighter text-center text-black`}>
                        {state.author}
                    </h2>
                </div>
            </div>

            {/* Alt çubukla çakışmayı önleyen dinamik spacer */}
            {
                state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'h-[30px]' : (isLandscape ? 'h-[50px]' : 'h-[70px]')} shrink-0 pointer-events-none`} />
                )
            }


            {/* Maç Bilgisi & Marka Çubuğu (En Alt Sabit) */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center">
                {/* Maç Bilgisi (Kutusuz - Marka Çubuğu Üstünde) */}
                {state.showMatchInfo && (
                    <div className={`${isExtremeLandscape ? 'mb-4 scale-[0.8]' : 'mb-4'} flex flex-col items-center drop-shadow-[1px_1px_0.5px_#fff]`}>
                        <p className={`text-2xl font-black uppercase tracking-widest text-center text-black leading-tight`}>
                            {state.homeTeam} {state.score} {state.awayTeam}
                        </p>
                        {state.matchWeek && (
                            <p className="text-[12px] font-black text-black/80 text-center tracking-[0.4em] mt-1.5 uppercase">
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
        </div >
    );
};

export default Template1;
