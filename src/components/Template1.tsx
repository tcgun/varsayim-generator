"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template1: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];

    const renderedComment = useMemo(() => {
        if (!state.highlight || !state.comment.toLowerCase().includes(state.highlight.toLowerCase())) {
            return state.comment;
        }

        const index = state.comment.toLowerCase().indexOf(state.highlight.toLowerCase());
        const before = state.comment.substring(0, index);
        const match = state.comment.substring(index, index + state.highlight.length);
        const after = state.comment.substring(index + state.highlight.length);

        return (
            <>
                {before}
                <span className="bg-v-yellow px-1">{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight]);

    // Tema Renkleri (18 Takım)
    const THEMES = {
        default: { primary: "bg-v-yellow", bg: state.bgColor, border: "border-black", shadow: "shadow-brutal-pink", text: "text-black" },
        gs: { primary: "bg-[#A32638]", bg: "#FFB81C", border: "border-[#A32638]", shadow: "shadow-[8px_8px_0px_0px_#A32638]", text: "text-[#A32638]" },
        fb: { primary: "bg-[#002D72]", bg: "#FEDD00", border: "border-[#002D72]", shadow: "shadow-[8px_8px_0px_0px_#002D72]", text: "text-[#002D72]" },
        bjk: { primary: "bg-black", bg: "#FFFFFF", border: "border-black", shadow: "shadow-[8px_8px_0px_0px_#000000]", text: "text-black" },
        ts: { primary: "bg-[#711628]", bg: "#6BAEE3", border: "border-[#711628]", shadow: "shadow-[8px_8px_0px_0px_#711628]", text: "text-[#711628]" },
        basak: { primary: "bg-[#ED782F]", bg: "#002D72", border: "border-[#ED782F]", shadow: "shadow-[8px_8px_0px_0px_#ED782F]", text: "text-[#ED782F]" },
        kasimpasa: { primary: "bg-[#002D72]", bg: "#FFFFFF", border: "border-[#002D72]", shadow: "shadow-[8px_8px_0px_0px_#002D72]", text: "text-[#002D72]" },
        eyup: { primary: "bg-[#5D3EBC]", bg: "#FFD700", border: "border-[#5D3EBC]", shadow: "shadow-[8px_8px_0px_0px_#5D3EBC]", text: "text-[#5D3EBC]" },
        goztepe: { primary: "bg-[#FFD700]", bg: "#FF0000", border: "border-[#FFD700]", shadow: "shadow-[8px_8px_0px_0px_#FFD700]", text: "text-[#FFD700]" },
        samsun: { primary: "bg-[#E30613]", bg: "#FFFFFF", border: "border-[#E30613]", shadow: "shadow-[8px_8px_0px_0px_#E30613]", text: "text-[#E30613]" },
        hatay: { primary: "bg-[#600000]", bg: "#FFFFFF", border: "border-[#600000]", shadow: "shadow-[8px_8px_0px_0px_#600000]", text: "text-[#600000]" },
        rize: { primary: "bg-[#008000]", bg: "#0000FF", border: "border-[#008000]", shadow: "shadow-[8px_8px_0px_0px_#008000]", text: "text-[#008000]" },
        sivas: { primary: "bg-[#FF0000]", bg: "#FFFFFF", border: "border-[#FF0000]", shadow: "shadow-[8px_8px_0px_0px_#FF0000]", text: "text-[#FF0000]" },
        konya: { primary: "bg-[#006400]", bg: "#FFFFFF", border: "border-[#006400]", shadow: "shadow-[8px_8px_0px_0px_#006400]", text: "text-[#006400]" },
        antalya: { primary: "bg-[#FF0000]", bg: "#FFFFFF", border: "border-[#FF0000]", shadow: "shadow-[8px_8px_0px_0px_#FF0000]", text: "text-[#FF0000]" },
        alanya: { primary: "bg-[#FFA500]", bg: "#008000", border: "border-[#FFA500]", shadow: "shadow-[8px_8px_0px_0px_#FFA500]", text: "text-[#FFA500]" },
        kayseri: { primary: "bg-[#FFFF00]", bg: "#FF0000", border: "border-[#FFFF00]", shadow: "shadow-[8px_8px_0px_0px_#FFFF00]", text: "text-[#FFFF00]" },
        bodrum: { primary: "bg-[#00FF00]", bg: "#FFFFFF", border: "border-[#00FF00]", shadow: "shadow-[8px_8px_0px_0px_#00FF00]", text: "text-[#00FF00]" },
        gaziantep: { primary: "bg-[#FF0000]", bg: "#000000", border: "border-[#FF0000]", shadow: "shadow-[8px_8px_0px_0px_#FF0000]", text: "text-[#FF0000]" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

    // Uzun metinler için font küçültme
    const fontSize = useMemo(() => {
        const len = state.comment.length;
        if (len > 450) return "text-lg";
        if (len > 300) return "text-xl";
        if (len > 200) return "text-2xl";
        if (len > 100) return "text-3xl";
        if (len > 50) return "text-4xl";
        return "text-5xl";
    }, [state.comment]);

    // Sticker Verileri
    const STICKERS = {
        gol: { text: "GOL!", color: "bg-green-500" },
        var: { text: "VAR", color: "bg-v-yellow" },
        ofsayt: { text: "OFSAYT", color: "bg-red-500" },
        penalti: { text: "PENALTI", color: "bg-yellow-400" },
        kirmizi: { text: "KIRMIZI", color: "bg-red-600" },
    };

    return (
        <div
            ref={domRef}
            className={`relative flex flex-col items-center justify-center p-[60px] overflow-hidden box-border`}
            style={{
                width: preset.width,
                height: preset.height,
                backgroundColor: state.theme === "default" ? state.bgColor : currentTheme.bg,
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

            {/* Durum Stickerı (Sol Üst) */}
            {state.sticker !== "none" && STICKERS[state.sticker] && (
                <div className={`absolute top-12 left-12 ${STICKERS[state.sticker].color} border-brutal border-black shadow-brutal px-6 py-2 rotate-[-5deg] z-50 animate-bounce`}>
                    <span className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-md">
                        {STICKERS[state.sticker].text}
                    </span>
                </div>
            )}

            {/* Üst Bilgi Grubu (Logo + Sponsor) */}
            <div className="absolute top-12 right-12 z-50 flex items-center gap-4">
                {/* Sponsor Alanı (Logo Yanında) */}
                {state.showSponsor && state.sponsorName && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <div className={`bg-black text-white px-4 py-2 border-2 border-black flex items-center gap-3 shadow-brutal rotate-[-1deg]`}>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 italic">DESTEĞİYLE</span>
                            <span className="text-lg font-black italic uppercase tracking-tighter text-v-yellow whitespace-nowrap">
                                {state.sponsorName}
                            </span>
                        </div>
                    </div>
                )}

                {/* VARSAYIM Logo / Etiket */}
                <div
                    className={`${currentTheme.primary} border-brutal border-black shadow-brutal px-8 py-3 rotate-[2deg]`}
                >
                    <span className={`text-4xl font-black tracking-tighter uppercase italic ${state.theme === "default" ? 'text-black' : 'text-white'}`}>
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* Pozisyon & Dakika Bilgi Bloğu (Sol Baş ve Büyük Font) */}
            {state.showPositionBox && (
                <div className="relative z-40 mb-[-20px] rotate-[-1deg] flex flex-col items-start gap-2 w-full max-w-[90%]">
                    {/* Dakika Kutusu (Sol Baş - Her İki Metin de Büyük) */}
                    <div className={`${currentTheme.primary} border-brutal border-black px-6 py-2 shadow-brutal flex items-center gap-4`}>
                        <span className="text-5xl font-black italic tracking-widest uppercase text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Dakika</span>
                        <span className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                            {state.positionMinute}
                        </span>
                    </div>

                    {/* Ana Pozisyon Kutusu (Altta - Sol Yaslı) */}
                    <div className={`${currentTheme.primary} border-brutal border-black px-10 py-3 shadow-brutal flex items-center justify-center`}>
                        <span className="text-2xl font-black italic uppercase tracking-normal text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                            {state.positionText}
                        </span>
                    </div>
                </div>
            )}

            {/* Ana Konuşma Kutusu */}
            <div className={`w-full max-w-[90%] ${state.showMatchInfo ? 'mt-8' : 'mt-0'} mb-6 relative z-10`}>
                <div className={`bg-white border-brutal border-black ${currentTheme.shadow} p-12 rounded-brutal min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden`}>


                    {/* Icon Placement */}
                    {state.showIcon && (
                        <div className="absolute -top-12 -left-8 text-8xl rotate-[-15deg] drop-shadow-2xl z-20">
                            {state.selectedIcon}
                        </div>
                    )}

                    {/* Açılış Tırnağı (Görseldeki gibi büyük ve belirgin) */}
                    <div className="absolute top-4 left-4 text-9xl font-black opacity-10 leading-none select-none pointer-events-none">
                        “
                    </div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <p className={`${fontSize} font-black leading-tight text-center whitespace-pre-wrap break-words px-12 w-full tracking-normal ${state.theme !== "default" ? currentTheme.text : 'text-black'}`}>
                            {renderedComment}
                        </p>
                    </div>

                    {/* Kapanış Tırnağı (Çapraz Alt Köşede) */}
                    <div className="absolute bottom-10 right-10 text-black opacity-10 text-9xl font-black rotate-180 leading-none select-none pointer-events-none">
                        “
                    </div>

                    {/* Konuşma Balonu Kuyruğu */}
                    <div className={`absolute -bottom-8 right-32 w-14 h-14 bg-white border-r-brutal border-b-brutal border-black rotate-45 ${currentTheme.shadow} z-10`}></div>
                </div>
            </div>

            <div className="mt-8 z-10 mb-12 flex items-center gap-6">
                {state.authorImage && (
                    <div className={`w-36 h-36 rounded-full border-brutal border-black bg-white overflow-hidden ${currentTheme.shadow} shrink-0`}>
                        <img src={state.authorImage} alt={state.author} className="w-full h-full object-cover" />
                    </div>
                )}
                <h2 className="text-7xl font-black uppercase tracking-tighter text-center">
                    {state.author}
                </h2>
            </div>


            {/* Maç Bilgisi & Marka Çubuğu (En Alt Sabit) */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center">
                {/* Maç Bilgisi Kutusu (Yeni Belirgin Stil) */}
                {state.showMatchInfo && (
                    <div className={`mb-6 bg-white border-brutal border-black ${currentTheme.shadow} px-10 py-4 flex flex-col items-center rotate-1`}>
                        <p className={`text-3xl font-black uppercase tracking-widest text-center ${state.theme !== "default" ? currentTheme.text : 'text-black'}`}>
                            {state.homeTeam} {state.score} {state.awayTeam}
                        </p>
                        <p className="text-sm font-bold opacity-40 text-center tracking-[0.3em] mt-1">
                            {state.date} {state.separator} VARSAYIM LABS
                        </p>
                    </div>
                )}

                {/* Marka Çubuğu (Branding Bar) */}
                {state.showBrandingBar && (
                    <div className="w-full bg-black text-white py-4 px-12 border-t-brutal border-white/20 flex items-center justify-between">
                        {/* Web Sitesi (Sol) */}
                        <div className="flex items-center gap-2">
                            <div className="bg-v-yellow text-black px-2 py-0.5 rounded text-xs font-black uppercase tracking-tighter">WEB</div>
                            <span className="font-bold text-lg tracking-tight">{state.website}</span>
                        </div>

                        {/* Sosyal Medya Kanalları (Orta/Sağ) */}
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
                            {state.handleFacebook && (
                                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{state.handleFacebook}</span>
                                </div>
                            )}
                            {state.handleYoutube && (
                                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="bg-white/10 p-1 rounded">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{state.handleYoutube}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template1;
