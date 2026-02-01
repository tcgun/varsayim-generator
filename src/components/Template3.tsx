"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template3: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];

    const THEMES = {
        default: { primary: "#FAFF00", bg: "#000000", border: "#FAFF00", text: "#FFFFFF" },
        gs: { primary: "#FFB81C", bg: "#A32638", border: "#FFB81C", text: "#FFFFFF" },
        fb: { primary: "#FEDD00", bg: "#002D72", border: "#FEDD00", text: "#FFFFFF" },
        bjk: { primary: "#FFFFFF", bg: "#000000", border: "#FFFFFF", text: "#FFFFFF" },
        ts: { primary: "#6BAEE3", bg: "#711628", border: "#6BAEE3", text: "#FFFFFF" },
        basak: { primary: "#ED782F", bg: "#002D72", border: "#ED782F", text: "#FFFFFF" },
        kasimpasa: { primary: "#002D72", bg: "#FFFFFF", border: "#002D72", text: "#002D72" },
        eyup: { primary: "#FFD700", bg: "#5D3EBC", border: "#FFD700", text: "#FFFFFF" },
        goztepe: { primary: "#FFD700", bg: "#FF0000", border: "#FFD700", text: "#FFFFFF" },
        samsun: { primary: "#FFFFFF", bg: "#E30613", border: "#FFFFFF", text: "#FFFFFF" },
        hatay: { primary: "#FFFFFF", bg: "#600000", border: "#FFFFFF", text: "#FFFFFF" },
        rize: { primary: "#008000", bg: "#0000FF", border: "#008000", text: "#FFFFFF" },
        sivas: { primary: "#FFFFFF", bg: "#FF0000", border: "#FFFFFF", text: "#FFFFFF" },
        konya: { primary: "#FFFFFF", bg: "#006400", border: "#FFFFFF", text: "#FFFFFF" },
        antalya: { primary: "#FFFFFF", bg: "#FF0000", border: "#FFFFFF", text: "#FFFFFF" },
        alanya: { primary: "#FFA500", bg: "#008000", border: "#FFA500", text: "#FFFFFF" },
        kayseri: { primary: "#FF0000", bg: "#FFFF00", border: "#FF0000", text: "#000000" },
        bodrum: { primary: "#00FF00", bg: "#FFFFFF", border: "#00FF00", text: "#000000" },
        gaziantep: { primary: "#FF0000", bg: "#000000", border: "#FF0000", text: "#FFFFFF" },
    };

    const currentTheme = THEMES[state.theme] || THEMES.default;

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
                <span style={{ color: currentTheme.primary }} className="underline decoration-4 underline-offset-8">{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight, currentTheme]);

    return (
        <div
            ref={domRef}
            className={`relative flex flex-col items-center justify-center p-20 overflow-hidden box-border`}
            style={{
                width: preset.width,
                height: preset.height,
                backgroundColor: currentTheme.bg,
                color: currentTheme.text
            }}
            id="capture-area"
        >
            {/* Minimalist Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: currentTheme.primary }} />
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: currentTheme.primary }} />

            {/* Sticker (Arka Plan Filigranı gibi) */}
            {state.sticker !== "none" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none">
                    <span className="text-[20rem] font-black uppercase italic tracking-tighter">{state.sticker}</span>
                </div>
            )}

            {/* VARSAYIM Label */}
            <div className="absolute top-12 left-12">
                <span className="text-xl font-black italic tracking-widest opacity-30">VARSAYIM</span>
            </div>

            {/* Üst Bilgi Bloğu (Proper Kutu Tasarımı) */}
            {state.showPositionBox && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40">
                    {/* Dakika Kutusu (Beyaz Brutalist) */}
                    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] px-6 py-2 rounded-brutal flex items-center gap-3 rotate-[1deg]">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40">DAKİKA</span>
                        <span className="text-4xl font-black italic tracking-tighter text-black">{state.positionMinute}</span>
                    </div>
                    {/* Pozisyon Kutusu (Renk Odaklı) */}
                    <div className="border-l-4 border-white pl-6 py-1 rotate-[-1deg]">
                        <span className="text-2xl font-black italic tracking-normal uppercase text-white/90 drop-shadow-lg">
                            {state.positionText}
                        </span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-4xl flex flex-col items-center text-center gap-8">
                <p className="text-6xl font-black leading-tight tracking-normal uppercase whitespace-pre-wrap">
                    {renderedComment}
                </p>

                <div className="mt-8 flex flex-col items-center gap-6">
                    {state.authorImage && (
                        <div className="w-24 h-24 rounded-full border-2 border-white overflow-hidden bg-v-gray">
                            <img src={state.authorImage} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: currentTheme.primary }}>
                        — {state.author}
                    </h2>
                </div>
            </div>

            {/* Match Info (Daha Belirgin Minimalist Kutu) */}
            {state.showMatchInfo && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="h-0.5 w-12 bg-white/20 mb-2" />
                    <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <span className="text-sm font-black tracking-[0.2em] uppercase">
                            {state.homeTeam} {state.score} {state.awayTeam} // {state.date}
                        </span>
                    </div>
                </div>
            )}

            {/* Sponsor Alanı (Minimalist) */}
            {state.showSponsor && state.sponsorName && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000">
                    <div className="flex items-center gap-3 px-4 py-1 border-x border-white/20">
                        <span className="text-[8px] font-black tracking-widest opacity-30 italic">DESTEĞİYLE</span>
                        <span className="text-sm font-black italic tracking-widest" style={{ color: currentTheme.primary }}>
                            {state.sponsorName}
                        </span>
                    </div>
                </div>
            )}

            {/* Simple Branding Bar */}
            {state.showBrandingBar && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/5 flex items-center justify-between px-12 border-t border-white/10">
                    <span className="text-[10px] font-black tracking-widest opacity-50 uppercase">VARSAYIM LABS // {state.website}</span>
                    <div className="flex gap-4 opacity-50 text-[10px] font-bold">
                        {state.handleInstagram && <span>INSTAGRAM</span>}
                        {state.handleX && <span>X.COM</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Template3;
