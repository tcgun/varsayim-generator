"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template2: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];

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
                <span className={`${currentTheme.primary} ${state.theme === "default" ? 'text-black' : 'text-white'} px-2 py-0.5 mx-1 translate-y-[-2px] inline-block`}>{match}</span>
                {after}
            </>
        );
    }, [state.comment, state.highlight, currentTheme, state.theme]);

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
            className={`relative flex flex-col p-0 overflow-hidden box-border`}
            style={{
                width: preset.width,
                height: preset.height,
                backgroundColor: state.theme === "default" ? state.bgColor : currentTheme.bg,
            }}
            id="capture-area"
        >
            {/* Üst Kuşak (Haber Başlığı Tarzı) */}
            <div className={`w-full ${currentTheme.primary} h-32 flex items-center px-12 border-b-brutal border-black z-20`}>
                <span className={`text-6xl font-black italic uppercase italic ${state.theme === "default" ? 'text-black' : 'text-white'} tracking-tighter`}>
                    SON DAKİKA
                </span>

                {state.sticker !== "none" && STICKERS[state.sticker] && (
                    <div className={`${STICKERS[state.sticker].color} border-brutal border-black px-4 py-1 ml-auto rotate-3`}>
                        <span className="text-2xl font-black text-white">{STICKERS[state.sticker].text}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-row relative z-10 overflow-hidden">
                {/* Sol Taraf: Fotoğraf */}
                <div className="w-2/5 h-full relative border-r-brutal border-black bg-v-gray">
                    {state.authorImage ? (
                        <img src={state.authorImage} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                            <span className="text-9xl font-black">?</span>
                        </div>
                    )}
                    {/* İsim Paneli */}
                    <div className="absolute bottom-12 left-0 right-0 bg-black text-white p-6 border-y-brutal border-white/20 flex flex-col items-start gap-1">
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none italic">{state.author}</h2>
                        <p className="text-v-yellow text-sm font-bold mt-1 tracking-widest uppercase opacity-80">VARSAYIM YORUMCU</p>
                    </div>
                </div>

                {/* Sağ Taraf: Haber Metni */}
                <div className="w-3/5 h-full p-16 flex flex-col justify-center bg-white relative">
                    {/* Pozisyon Bilgi Kutusu (Sağ Üst) */}
                    {state.showPositionBox && (
                        <div className={`absolute top-12 left-6 z-20 ${currentTheme.primary} border-brutal border-black px-6 py-4 shadow-brutal flex items-center rotate-[-1deg]`}>
                            <span className={`text-xl font-black italic uppercase tracking-normal ${state.theme === "default" ? 'text-black' : 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]'}`}>
                                {state.positionText}
                            </span>
                        </div>
                    )}

                    <div className="relative flex flex-col gap-6 pt-10">
                        {/* Dakika Etiketi (Proper Kutu Stili) */}
                        <div className={`absolute -top-4 left-6 z-30 bg-white border-brutal border-black ${currentTheme.shadow} px-5 py-1.5 rounded-brutal flex items-center gap-2 rotate-1`}>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">DAKİKA</span>
                            <span className="text-3xl font-black italic tracking-tighter text-black">{state.positionMinute}</span>
                        </div>

                        <div className="absolute -top-10 -left-6 text-9xl opacity-5 font-black">"</div>

                        <p className="text-5xl font-black leading-[1.1] tracking-normal uppercase break-words relative z-10">
                            {renderedComment}
                        </p>
                    </div>

                    {/* Maç Bilgisi Alt Bölüm (Kutu İçinde) */}
                    {state.showMatchInfo && (
                        <div className={`mt-12 p-6 bg-v-gray/30 border-2 border-brutal border-black rounded-brutal`}>
                            <div className="flex items-center gap-3">
                                <div className={`${currentTheme.primary} text-white px-3 py-1 text-sm font-black italic border-2 border-black`}>CANLI</div>
                                <span className="font-bold text-xl uppercase tracking-tighter text-black">
                                    {state.homeTeam} {state.score} {state.awayTeam}
                                </span>
                            </div>
                            <div className="mt-2 text-sm font-mono opacity-50 font-bold uppercase text-black">
                                {state.date} {state.separator} VARSAYIM LABS
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Branding Bar (Alt Sabit) */}
            {state.showBrandingBar && (
                <div className="w-full bg-black text-white py-4 px-12 flex items-center justify-between border-t-brutal border-white/20 z-30">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="bg-v-yellow text-black px-2 py-0.5 rounded text-xs font-black italic">VARSAYIM.COM</span>
                        </div>
                        {state.showSponsor && state.sponsorName && (
                            <div className="flex items-center gap-2 border-l border-white/20 pl-4 animate-in fade-in duration-700">
                                <span className="text-[9px] font-black uppercase opacity-40 italic">SPONSOR:</span>
                                <span className="text-sm font-black italic text-v-pink uppercase tracking-tight">{state.sponsorName}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-6 opacity-80 text-xs font-bold uppercase tracking-widest">
                        {state.handleInstagram && <span>IG: {state.handleInstagram}</span>}
                        {state.handleX && <span>X: {state.handleX}</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Template2;
