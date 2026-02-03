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

    // Tema Renkleri (18 Takım)
    const THEMES: Record<string, any> = {
        default: { primary: "bg-v-yellow", bg: state.bgColor, border: "border-black", shadow: "shadow-brutal-pink", text: "text-black" },
        gs: { primary: "bg-[#A90432]", bg: "#FDB912", border: "border-[#A90432]", shadow: "shadow-[8px_8px_0px_0px_#A90432]", text: "text-[#A90432]" },
        fb: { primary: "bg-[#002d72]", bg: "#f9b517", border: "border-[#002d72]", shadow: "shadow-[8px_8px_0px_0px_#002d72]", text: "text-[#002d72]" },
        bjk: { primary: "bg-black", bg: "#FFFFFF", border: "border-black", shadow: "shadow-[8px_8px_0px_0px_#000000]", text: "text-black" },
        ts: { primary: "bg-[#A52A2A]", bg: "#87CEEB", border: "border-[#A52A2A]", shadow: "shadow-[8px_8px_0px_0px_#A52A2A]", text: "text-[#A52A2A]" },
        basak: { primary: "bg-[#E56B25]", bg: "#163962", border: "border-[#E56B25]", shadow: "shadow-[8px_8px_0px_0px_#E56B25]", text: "text-[#E56B25]" },
        kasimpasa: { primary: "bg-[#004A99]", bg: "#FFFFFF", border: "border-[#004A99]", shadow: "shadow-[8px_8px_0px_0px_#004A99]", text: "text-[#004A99]" },
        eyup: { primary: "bg-[#800080]", bg: "#FFFF00", border: "border-[#800080]", shadow: "shadow-[8px_8px_0px_0px_#800080]", text: "text-[#800080]" },
        goztepe: { primary: "bg-[#FFFF00]", bg: "#FF0000", border: "border-[#FFFF00]", shadow: "shadow-[8px_8px_0px_0px_#FFFF00]", text: "text-[#FFFF00]" },
        samsun: { primary: "bg-[#CC0000]", bg: "#FFFFFF", border: "border-[#CC0000]", shadow: "shadow-[8px_8px_0px_0px_#CC0000]", text: "text-[#CC0000]" },
        rize: { primary: "bg-[#008C45]", bg: "#163962", border: "border-[#008C45]", shadow: "shadow-[8px_8px_0px_0px_#008C45]", text: "text-[#008C45]" },
        konya: { primary: "bg-[#008000]", bg: "#FFFFFF", border: "border-[#008000]", shadow: "shadow-[8px_8px_0px_0px_#008000]", text: "text-[#008000]" },
        antalya: { primary: "bg-[#E30613]", bg: "#FFFFFF", border: "border-[#E30613]", shadow: "shadow-[8px_8px_0px_0px_#E30613]", text: "text-[#E30613]" },
        alanya: { primary: "bg-[#F9B517]", bg: "#008C45", border: "border-[#F9B517]", shadow: "shadow-[8px_8px_0px_0px_#F9B517]", text: "text-[#F9B517]" },
        kayseri: { primary: "bg-[#FFD700]", bg: "#CC0000", border: "border-[#FFD700]", shadow: "shadow-[8px_8px_0px_0px_#FFD700]", text: "text-[#FFD700]" },
        gaziantep: { primary: "bg-[#DA291C]", bg: "#000000", border: "border-[#DA291C]", shadow: "shadow-[8px_8px_0px_0px_#DA291C]", text: "text-[#DA291C]" },
        gencler: { primary: "bg-[#ff0000]", bg: "#000000", border: "border-[#ff0000]", shadow: "shadow-[8px_8px_0px_0px_#ff0000]", text: "text-[#ff0000]" },
        kocaeli: { primary: "bg-[#008000]", bg: "#000000", border: "border-[#008000]", shadow: "shadow-[8px_8px_0px_0px_#008000]", text: "text-[#008000]" },
        karagumruk: { primary: "bg-[#ff0000]", bg: "#000000", border: "border-[#ff0000]", shadow: "shadow-[8px_8px_0px_0px_#ff0000]", text: "text-[#ff0000]" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

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
                <span className={`${currentTheme.primary} ${state.theme === 'default' ? 'text-black' : 'text-white'} px-1`}>{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight, currentTheme, state.theme]);

    // Uzun metinler için font küçültme (Daha hassas ölçeklendirme)
    const fontSize = useMemo(() => {
        const len = state.comment.length;
        if (len > 500) return "text-sm";
        if (len > 400) return "text-base";
        if (len > 300) return "text-lg";
        if (len > 250) return "text-xl";
        if (len > 200) return "text-2xl";
        if (len > 150) return "text-3xl";
        if (len > 100) return isExtremeLandscape ? "text-xl" : "text-4xl";
        if (len > 50) return isExtremeLandscape ? "text-2xl" : "text-5xl";
        return isExtremeLandscape ? "text-3xl" : "text-6xl";
    }, [state.comment, isExtremeLandscape]);


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


            {/* Sponsor Alanı (Sol Üst) */}
            {state.showSponsor && (state.sponsorName || state.sponsorLogo) && (
                <div className={`absolute ${isLandscape ? 'top-6 left-6' : 'top-12 left-12'} z-50 animate-in slide-in-from-left-4 duration-500`}>
                    <div className={`bg-white border-brutal border-black p-2 flex items-center gap-3 shadow-brutal rotate-[-1deg] h-[60px] min-w-[150px]`}>
                        {state.sponsorLogo && (
                            <img src={state.sponsorLogo} alt="Sponsor" className="h-full object-contain" />
                        )}
                        <div className="flex flex-col items-start leading-none pr-4">
                            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 italic">DESTEĞİYLE</span>
                            <span className={`text-base font-black italic uppercase tracking-tighter ${state.theme !== "default" ? currentTheme.text : 'text-black'}`}>
                                {state.sponsorName || "SPONSOR"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* VARSAYIM Logo (Sağ Üst - Orijinal Yer) */}
            <div className={`absolute ${isLandscape ? 'top-6 right-6' : 'top-12 right-12'} z-50`}>
                <div className={`${currentTheme.primary} border-brutal border-black shadow-brutal px-8 py-3 rotate-[2deg]`}>
                    <span className={`text-4xl font-black tracking-tighter uppercase italic ${state.theme === "default" ? 'text-black' : 'text-white'}`}>
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* Pozisyon & Dakika Bilgi Bloğu (Sol Baş ve Büyük Font) */}
            {state.showPositionBox && (
                <div className={`relative z-40 ${isExtremeLandscape ? 'mb-[-10px] scale-[0.55] mt-[-30px]' : (isLandscape ? 'mb-[-10px] scale-75' : 'mb-[-20px]')} origin-left rotate-[-1deg] flex flex-col items-start gap-2 w-full max-w-[90%]`}>
                    <div className={`${currentTheme.primary} border-brutal border-black px-6 py-2 shadow-brutal flex items-center gap-4`}>
                        <span className="text-5xl font-black italic tracking-widest uppercase text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{state.positionLabel || "DAKİKA"}</span>
                        <span className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                            {state.positionMinute}
                        </span>
                    </div>

                    {/* Ana Pozisyon Kutusu (Altta - Sol Yaslı) */}
                    <div className={`${currentTheme.primary} border-brutal border-black ${isLandscape ? 'px-6 py-2' : 'px-10 py-3'} shadow-brutal flex items-center justify-center`}>
                        <span className={`${isLandscape ? 'text-lg' : 'text-2xl'} font-black italic uppercase tracking-normal text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]`}>
                            {state.positionText}
                        </span>
                    </div>
                </div>
            )}

            {/* Ana Konuşma Kutusu */}
            <div className={`w-full max-w-[90%] ${state.showMatchInfo ? (isExtremeLandscape ? 'mt-1' : (isLandscape ? 'mt-4' : 'mt-8')) : 'mt-0'} ${isLandscape ? 'mb-2' : 'mb-6'} relative z-10`}>
                <div className={`bg-white border-brutal border-black ${currentTheme.shadow} ${isExtremeLandscape ? 'p-4 min-h-[100px]' : (isLandscape ? 'p-6 min-h-[140px]' : 'p-10 min-h-[220px]')} rounded-brutal flex flex-col items-center justify-center relative overflow-hidden`}>




                    <div className="relative z-10 w-full flex flex-col items-center">
                        <p className={`${fontSize} font-black leading-tight text-center whitespace-pre-wrap break-words ${isLandscape ? 'px-6' : 'px-12'} w-full tracking-normal ${state.theme !== "default" ? currentTheme.text : 'text-black'}`}>
                            <span className="whitespace-nowrap"><span className="text-black text-[1.5em] select-none">“</span> </span>{renderedComment}<span className="whitespace-nowrap"> <span className="text-black text-[1.5em] select-none">”</span></span>
                        </p>
                    </div>


                    {/* Konuşma Balonu Kuyruğu */}
                    <div className={`absolute -bottom-8 right-32 w-14 h-14 bg-white border-r-brutal border-b-brutal border-black rotate-45 ${currentTheme.shadow} z-10`}></div>
                </div>
            </div>

            <div className={`${isExtremeLandscape ? 'mt-1 mb-1 scale-[0.6]' : (isLandscape ? 'mt-4 mb-4' : 'mt-8 mb-12')} z-10 flex items-center gap-6`}>
                {state.authorImage && (
                    <div className={`${isExtremeLandscape ? 'w-20 h-20' : (isLandscape ? 'w-24 h-24' : 'w-36 h-36')} rounded-full border-brutal border-black bg-white overflow-hidden ${currentTheme.shadow} shrink-0`}>
                        <img src={state.authorImage} alt={state.author} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="bg-white border-brutal border-black px-6 py-2 shadow-brutal rotate-[-1deg]">
                    <h2 className={`${isExtremeLandscape ? 'text-2xl' : (isLandscape ? 'text-3xl' : 'text-5xl')} font-black uppercase tracking-tighter text-center text-black`}>
                        {state.author}
                    </h2>
                </div>
            </div>

            {/* Yatay modda alt çubukla çakışmayı önleyen dinamik spacer */}
            {isLandscape && state.showMatchInfo && (
                <div className={`${isExtremeLandscape ? 'h-[110px]' : 'h-[120px]'} shrink-0 pointer-events-none`} />
            )}


            {/* Maç Bilgisi & Marka Çubuğu (En Alt Sabit) */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center">
                {/* Maç Bilgisi Kutusu (Yeni Belirgin Stil) */}
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

                {/* Marka Çubuğu (Branding Bar) */}
                {state.showBrandingBar && (
                    <div className="w-full bg-black text-white py-4 px-12 border-t-brutal border-white/20 flex items-center justify-between">
                        {/* Web Sitesi (Sol) */}
                        <div className="flex items-center gap-2">
                            <Globe size={18} className="text-v-yellow" />
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
