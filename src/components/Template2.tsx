"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template2: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isExtremeLandscape = isLandscape && preset.height < 650;

    // Tema Renkleri (T1 ile tam uyumlu)
    const THEMES: Record<string, any> = {
        default: { primary: "bg-v-yellow", bg: state.bgColor, border: "border-black", shadow: "shadow-brutal-pink", text: "text-black" },
        gs: { primary: "bg-[#A90432]", bg: "#FDB912", border: "border-[#A90432]", shadow: "shadow-[8px_8px_0px_0px_#A90432]", text: "text-[#A90432]" },
        fb: { primary: "bg-[#002d72]", bg: "#f9b517", border: "border-[#002d72]", shadow: "shadow-[8px_8px_0px_0px_#002d72]", text: "text-[#002d72]" },
        bjk: { primary: "bg-black", bg: "#FFFFFF", border: "border-black", shadow: "shadow-[8px_8px_0px_0px_#000000]", text: "text-black" },
        ts: { primary: "bg-[#A52A2A]", bg: "#87CEEB", border: "border-[#A52A2A]", shadow: "shadow-[8px_8px_0px_0px_#A52A2A]", text: "text-[#A52A2A]" },
        basak: { primary: "bg-[#E56B25]", bg: "#163962", border: "border-[#E56B25]", shadow: "shadow-[8px_8px_0px_0px_#E56B25]", text: "text-[#E56B25]" },
        kasimpasa: { primary: "bg-[#004A99]", bg: "#FFFFFF", border: "border-[#004A99]", shadow: "shadow-[8px_8px_0px_0px_#004A99]", text: "text-[#004A99]" },
        eyup: { primary: "bg-[#800080]", bg: "#FFFF00", border: "border-[#800080]", shadow: "shadow-[8px_8px_0px_0px_#800080]", text: "#800080" },
        goztepe: { primary: "bg-[#FFFF00]", bg: "#FF0000", border: "border-[#FFFF00]", shadow: "shadow-[8px_8px_0px_0px_#FFFF00]", text: "#FFFF00" },
        samsun: { primary: "bg-[#CC0000]", bg: "#FFFFFF", border: "border-[#CC0000]", shadow: "shadow-[8px_8px_0px_0px_#CC0000]", text: "#CC0000" },
        rize: { primary: "bg-[#008C45]", bg: "#163962", border: "border-[#008C45]", shadow: "shadow-[8px_8px_0px_0px_#008C45]", text: "#008C45" },
        konya: { primary: "bg-[#008000]", bg: "#FFFFFF", border: "border-[#008000]", shadow: "shadow-[8px_8px_0px_0px_#008000]", text: "#008000" },
        antalya: { primary: "bg-[#E30613]", bg: "#FFFFFF", border: "border-[#E30613]", shadow: "shadow-[8px_8px_0px_0px_#E30613]", text: "#E30613" },
        alanya: { primary: "bg-[#F9B517]", bg: "#008C45", border: "border-[#F9B517]", shadow: "shadow-[8px_8px_0px_0px_#F9B517]", text: "#F9B517" },
        kayseri: { primary: "bg-[#FFD700]", bg: "#CC0000", border: "border-[#FFD700]", shadow: "shadow-[8px_8px_0px_0px_#FFD700]", text: "#FFD700" },
        gaziantep: { primary: "bg-[#DA291C]", bg: "#000000", border: "border-[#DA291C]", shadow: "shadow-[8px_8px_0px_0px_#DA291C]", text: "#DA291C" },
        gencler: { primary: "bg-[#ff0000]", bg: "#000000", border: "border-[#ff0000]", shadow: "shadow-[8px_8px_0px_0px_#ff0000]", text: "#ff0000" },
        kocaeli: { primary: "bg-[#008000]", bg: "#000000", border: "border-[#008000]", shadow: "shadow-[8px_8px_0px_0px_#008000]", text: "#008000" },
        karagumruk: { primary: "bg-[#ff0000]", bg: "#000000", border: "border-[#ff0000]", shadow: "shadow-[8px_8px_0px_0px_#ff0000]", text: "#ff0000" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

    const fontSize = useMemo(() => {
        const len = state.comment.length;
        const isSpread = state.contentLayout === 'spread';

        if (isSpread) {
            if (len > 500) return "text-2xl";
            if (len > 400) return "text-3xl";
            if (len > 300) return "text-4xl";
            if (len > 250) return "text-5xl";
            if (len > 200) return "text-6xl";
            if (len > 150) return "text-7xl";
            if (len > 100) return "text-[8rem]";
            if (len > 50) return "text-[10rem]";
            return "text-[12rem]";
        }

        if (len > 500) return "text-xs";
        if (len > 400) return "text-sm";
        if (len > 300) return "text-base";
        if (len > 250) return "text-lg";
        if (len > 200) return "text-xl";
        if (len > 150) return "text-2xl";
        if (len > 100) return isExtremeLandscape ? "text-lg" : "text-4xl";
        if (len > 50) return isExtremeLandscape ? "text-xl" : "text-5xl";
        return isExtremeLandscape ? "text-2xl" : "text-6xl";
    }, [state.comment, isExtremeLandscape, state.contentLayout]);

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
                <span className={`${currentTheme.primary} ${state.theme === 'default' ? 'text-black' : 'text-white'} px-2 py-0.5 mx-1 inline-block skew-x-[-12deg] font-black`}>{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight, currentTheme, state.theme]);

    return (
        <div
            ref={domRef}
            className="relative flex flex-col p-0 overflow-hidden box-border font-sans bg-black"
            style={{
                width: preset.width,
                height: preset.height,
            }}
            id="capture-area"
        >
            {/* Arka Plan Görseli */}
            <div className="absolute inset-0 z-0">
                {state.authorImage ? (
                    <img src={state.authorImage} className="w-full h-full object-cover blur-sm opacity-30 scale-110" />
                ) : (
                    <div className="w-full h-full bg-slate-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* TV Üst Bandı */}
            <div className="absolute top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 animate-pulse" />

            {/* HEADER: Sponsor & Logo Standardı */}
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

                <div className={`${currentTheme.primary} border-brutal border-black shadow-brutal px-8 py-3 rotate-[1deg]`}>
                    <span className={`text-4xl font-black tracking-tighter uppercase italic ${state.theme === "default" ? 'text-black' : 'text-white'} leading-none`}>VARSAYIM</span>
                </div>
            </div>

            {/* İçerik */}
            <div className="relative z-10 flex-1 flex flex-col h-full">
                <div className="flex-1 flex flex-col md:flex-row h-full">
                    {/* Sol: Fotoğraf Alanı (%50) */}
                    <div className="hidden md:flex md:w-1/2 h-full relative overflow-hidden">
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
                                borderRight: '12px solid #FACC15'
                            }}
                        >
                            {state.authorImage ? (
                                <img src={state.authorImage} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center" />
                            )}
                        </div>
                    </div>

                    {/* Sağ: Metin Alanı (%50) */}
                    <div className={`flex-1 md:w-1/2 p-8 md:p-16 flex flex-col ${state.contentLayout === 'spread' ? 'justify-between pb-32' : 'justify-end pb-32'} gap-8 relative h-full shrink-0`}>

                        {/* Başlık ve Dakika Alanı */}
                        <div className={`flex flex-col gap-4 ${state.contentLayout === 'spread' ? 'mt-24' : ''}`}>
                            {state.showPositionBox && (state.positionLabel || (state.showMinute && state.positionMinute)) && (
                                <div className="flex items-center gap-0">
                                    {state.positionLabel && (
                                        <div className="bg-red-600 text-white px-8 py-3 font-black italic text-3xl skew-x-[-12deg] shadow-2xl border-2 border-white/20 z-20">
                                            {state.positionLabel}
                                        </div>
                                    )}
                                    {state.showMinute && state.positionMinute && (
                                        <div className="bg-white text-black px-6 py-3 font-black text-3xl skew-x-[-12deg] ml-[-12px] shadow-2xl border-2 border-black z-10">
                                            {state.positionMinute}
                                        </div>
                                    )}
                                </div>
                            )}

                            {state.showPositionBox && state.positionText && (
                                <div className="inline-block self-start">
                                    <h1 className="bg-yellow-400 text-black px-10 py-4 text-5xl md:text-6xl font-black uppercase italic skew-x-[-5deg] shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)] leading-none text-left border-2 border-black">
                                        {state.positionText}
                                    </h1>
                                </div>
                            )}
                        </div>

                        {/* Orta: Ana Metin */}
                        <div className={`relative ${state.contentLayout === 'spread' ? 'flex-1 flex flex-col justify-center' : 'mt-4'} w-full`}>
                            <p className={`${fontSize} text-white font-black leading-[1] tracking-tighter uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,1)] relative z-10 italic w-full text-left`}>
                                {renderedComment || "DRIES MERTENS"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Yorumcu İsim Paneli */}
                {state.author && (
                    <div className="absolute bottom-32 left-12 z-[70] min-w-[300px]">
                        <div className="bg-black text-white px-8 py-3 skew-x-[-12deg] shadow-2xl border-b-8 border-yellow-400 border-2 border-white/10">
                            <span className="text-3xl font-black uppercase italic tracking-tighter block skew-x-[12deg] leading-none">
                                {state.author}
                            </span>
                            {state.authorTitle && (
                                <span className="text-xs font-black opacity-60 block skew-x-[12deg] tracking-[0.2em] uppercase mt-2 italic">
                                    {state.authorTitle}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Maç Bilgisi & Marka Çubuğu (En Alt Sabit - T1 Standart) */}
                <div className="absolute bottom-0 left-0 right-0 z-[80] flex flex-col items-center">
                    {/* Maç Bilgisi Kutusu */}
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
        </div>
    );
};

export default Template2;
