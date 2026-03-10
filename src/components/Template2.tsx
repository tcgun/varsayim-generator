"use client";

import React from "react";
import { AppState, PRESETS } from "../types";
import { Globe, GraduationCap, AlertCircle, Copy } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template2: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isSquare = preset.width === preset.height;
    const isPortrait = preset.height > preset.width;

    // Tema Renkleri (Varsayım Standardı)
    const currentTheme = {
        bg: "#000000",
        accent: "#FACC15", // v-yellow
        cardBg: "bg-white",
        text: "text-white",
        darkText: "text-black"
    };

    return (
        <div
            ref={domRef}
            className="relative flex flex-col p-0 overflow-hidden box-border font-sans transition-all duration-300 bg-black"
            style={{
                width: preset.width,
                height: preset.height,
            }}
            id="capture-area"
        >
            {/* HER TEMSİLİ ARKA PLAN (HAKEM FOTOĞRAFI) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {state.authorImage ? (
                    <img
                        src={state.authorImage}
                        alt="Referee"
                        className="w-full h-full object-cover opacity-90 grayscale-[0.3]"
                        style={{
                            objectPosition: `${state.authorImageX ?? 50}% ${state.authorImageY ?? 50}%`
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}
                {/* Texture Pattern (Artistic Poster Feel) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

                {/* Görünürlük Gradyanı: Alttan Siyah, Yukarı Doğru Netleşen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* ÜST BİLGİLER: Header & İsim (SOL) & Logo (SAĞ) */}
            <div className="absolute top-0 left-0 right-0 p-4 z-50 flex items-start justify-between">
                {/* SOL ÜST: BAŞLIK VE HAKEM ADI */}
                <div className="flex flex-col items-start gap-2">
                    <div className="bg-v-yellow text-black border-[3px] border-black shadow-[4px_4px_0px_#000] px-6 py-2">
                        <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black leading-none">
                            HAKEM İSTATİSTİKLERİ
                        </span>
                    </div>
                    {/* HAKEM ADI (BAŞLIK ALTINDA) */}
                    <div className="bg-black/40 backdrop-blur-3xl px-4 py-2 border-l-8 border-v-yellow shadow-[4px_4px_20px_rgba(255,215,0,0.2)]">
                        <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-md">
                            {state.author || "İSİMSİZ HAKEM"}
                        </span>
                    </div>
                </div>

                {/* VARSAYIM Logo (Sağ Üst) */}
                <div className="bg-[#FFD700] text-black border-[3px] border-black shadow-[4px_4px_15px_rgba(255,0,150,0.6)] px-8 py-3">
                    <span className="text-4xl font-black tracking-tighter uppercase text-black leading-none">
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* ANA İÇERİK KONTEYNERI */}
            <div className={`relative z-10 flex-1 flex flex-col items-center ${isLandscape ? 'justify-center p-12' : isSquare ? 'justify-end pb-8 px-6' : 'justify-end pb-8 px-4'} text-white`}>

                {/* 1:1 (KARE) TABLO DÜZENİ */}
                {isSquare && (
                    <div className="w-full flex flex-col gap-4 max-w-5xl">
                        {/* 1. SATIR: TOPLAM GÖREV (FULL WIDTH - CAM) */}
                        <div className="w-full bg-black/30 backdrop-blur-3xl border-t-4 border-white p-5 flex flex-col items-center shadow-2xl border-x border-b border-white/5">
                            <span className="text-xs font-bold opacity-90 mb-4 uppercase tracking-[0.1em] text-white">TOPLAM GÖREV</span>
                            <div className="flex w-full justify-around items-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">HAKEM</span>
                                    <span className="text-5xl font-black text-white leading-none drop-shadow-xl">{state.refMatches || "0"}</span>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/20 pl-12 pr-12">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">VAR</span>
                                    <span className="text-5xl font-black text-white leading-none drop-shadow-xl">{state.refVarMatches || "0"}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">AVAR</span>
                                    <span className="text-5xl font-black text-white leading-none drop-shadow-xl">{state.refAvarMatches || "0"}</span>
                                </div>
                            </div>
                        </div>

                        {/* 1:1 DİKEY DÜZENİ UYARLAMASI (Dikey formattaki gibi hiyerarşik) */}
                        <div className="space-y-4 w-full">
                            {/* 1. SATIR: VAR VE HATALI KARAR (2 Kolon) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/30 backdrop-blur-3xl border-t-4 border-v-yellow p-5 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(250,204,21,0.2)] border-x border-b border-white/5">
                                    <span className="text-xs font-bold opacity-90 mb-1 uppercase tracking-wider">VAR MÜDAHALESİ</span>
                                    <span className="text-6xl font-black text-v-yellow leading-none tracking-tighter drop-shadow-2xl">{state.refVarGo || "0.0"}</span>
                                    {state.refVarCalls && (
                                        <div className="mt-2 text-xs font-bold opacity-80 text-white uppercase tracking-tighter">Çağrı: {state.refVarCalls}</div>
                                    )}
                                </div>
                                <div className="bg-black/30 backdrop-blur-3xl border-t-4 border-red-500 p-5 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(239,68,68,0.2)] border-x border-b border-white/5">
                                    <span className="text-[9px] font-bold opacity-90 mb-1 uppercase tracking-tight leading-tight h-6 flex items-center justify-center">YORUMCU İSTATİSTİKLERİNE GÖRE</span>
                                    <span className="text-6xl font-black text-red-500 leading-none tracking-tighter drop-shadow-2xl">{state.refWrongDecision || "0.0"}</span>
                                    <span className="text-xs font-bold opacity-80 text-white uppercase tracking-tight mt-1">HATALI KARAR</span>
                                </div>
                            </div>

                            {/* 2. SATIR: KARTLAR (2x2 Grid) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-yellow-400/10 backdrop-blur-3xl border-t-2 border-yellow-400 p-4 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase">SARI KART (M.B.O)</span>
                                    <span className="text-4xl font-black text-yellow-400 drop-shadow-md">{state.refYellowCards || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-[11px] font-bold opacity-90 mt-2 border-t border-white/5 pt-1">
                                        <span>EV: {state.refHomeYellow || "0"}</span>
                                        <span>DEP: {state.refAwayYellow || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-red-500/10 backdrop-blur-3xl border-t-2 border-red-500 p-4 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase">KIRMIZI KART (M.B.O)</span>
                                    <span className="text-4xl font-black text-red-500 drop-shadow-md">{state.refRedCards || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-[11px] font-bold opacity-90 mt-2 border-t border-white/5 pt-1">
                                        <span>EV: {state.refHomeRed || "0"}</span>
                                        <span>DEP: {state.refAwayRed || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-3xl border-t-2 border-white p-4 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase">PENALTI</span>
                                    <span className="text-4xl font-black text-white drop-shadow-md">{state.refPenalties || "0"}</span>
                                    <div className="flex w-full justify-between items-center text-[11px] font-bold opacity-90 mt-2 border-t border-white/5 pt-1">
                                        <span>EV: {state.refHomePenalty || "0"}</span>
                                        <span>DEP: {state.refAwayPenalty || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-v-pink/10 backdrop-blur-3xl border-t-2 border-v-pink p-4 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase">FAUL (M.B.O)</span>
                                    <span className="text-4xl font-black text-v-pink drop-shadow-md">{state.refFouls || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-[11px] font-bold opacity-90 mt-2 border-t border-white/5 pt-1">
                                        <span>EV: {state.refHomeFoul || "0"}</span>
                                        <span>DEP: {state.refAwayFoul || "0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* YATAY (LANDSCAPE) DÜZENİ */}
                {isLandscape && (
                    <div className="flex flex-row items-center justify-between w-full max-w-full px-4 mt-8 flex-1">
                        {/* SOL TARAFTA BOŞLUK (FOTOĞRAF ARTIK ARKA PLANDA) */}
                        <div className="flex-1" />

                        {/* SAĞ: İSTATİSTİK KOLONU (GÖREVLER, VAR, HATALI KARAR) */}
                        <div className={`${isLandscape ? 'w-[30%]' : 'w-[40%]'} flex flex-col gap-4 items-center justify-center`}>
                            {/* GÖREVLER KUTUSU */}
                            <div className="w-full bg-black/30 backdrop-blur-3xl border-t-4 border-white p-5 flex flex-col items-center justify-center text-center shadow-2xl border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-2 uppercase tracking-wider text-white">TOPLAM GÖREV</span>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                                        <span className="text-[9px] font-bold opacity-80 uppercase text-white">HAKEM</span>
                                        <span className="text-2xl font-black text-white leading-none">{state.refMatches || "0"}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                                        <span className="text-[9px] font-bold opacity-80 uppercase text-white">VAR</span>
                                        <span className="text-2xl font-black text-white leading-none">{state.refVarMatches || "0"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-bold opacity-80 uppercase text-white">AVAR</span>
                                        <span className="text-2xl font-black text-white leading-none">{state.refAvarMatches || "0"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* VAR KUTUSU */}
                            <div className="w-full bg-black/30 backdrop-blur-3xl border-t-4 border-v-yellow p-5 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(250,204,21,0.2)] border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-1 uppercase tracking-wider text-white">VAR MÜDAHALESİ</span>
                                <span className="text-6xl font-black text-v-yellow leading-none tracking-tighter drop-shadow-2xl">{state.refVarGo || "0.0"}</span>
                                {state.refVarCalls && (
                                    <div className="mt-3 pt-2 border-t border-white/10 w-full flex flex-col items-center">
                                        <span className="text-[8px] font-bold opacity-80 uppercase text-white">VAR'a Çağırma</span>
                                        <span className="text-2xl font-black text-white">{state.refVarCalls}</span>
                                    </div>
                                )}
                            </div>

                            {/* HATALI KARAR KUTUSU */}
                            <div className="w-full bg-black/30 backdrop-blur-3xl border-t-4 border-red-500 p-5 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(239,68,68,0.2)] border-x border-b border-white/5">
                                <span className="text-[9px] font-bold opacity-90 mb-1 uppercase tracking-tight leading-tight h-6 flex items-center justify-center text-white text-center">YORUMCU İSTATİSTİKLERİNE GÖRE</span>
                                <span className="text-6xl font-black text-red-500 leading-none tracking-tighter mt-2 drop-shadow-2xl">{state.refWrongDecision || "0.0"}</span>
                                <span className="text-xs font-bold opacity-80 text-white uppercase tracking-tight mt-1">HATALI KARAR</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ALT: KARTLAR GRİDİ (SADECE LANDSCAPE İÇİN ALTTA) */}
                {isLandscape && (
                    <div className="w-full max-w-6xl mt-8 px-12">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-yellow-400/20 backdrop-blur-3xl border-t-4 border-yellow-400 p-4 flex flex-col items-center justify-center text-center shadow-[0px_0px_20px_rgba(250,204,21,0.2)] overflow-hidden border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-1 uppercase tracking-wider">SARI KART (M.B.O)</span>
                                <span className="text-5xl font-black text-yellow-400 leading-none tracking-tighter drop-shadow-md">{state.refYellowCards || "0.0"}</span>
                            </div>
                            <div className="bg-red-500/20 backdrop-blur-3xl border-t-4 border-red-500 p-4 flex flex-col items-center justify-center text-center shadow-[0px_0px_20px_rgba(239,68,68,0.2)] overflow-hidden border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-1 uppercase tracking-wider">KIRMIZI KART (M.B.O)</span>
                                <span className="text-5xl font-black text-red-500 leading-none tracking-tighter drop-shadow-md">{state.refRedCards || "0.0"}</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-3xl border-t-4 border-white p-4 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-1 uppercase tracking-wider">PENALTI</span>
                                <span className="text-5xl font-black text-white leading-none tracking-tighter drop-shadow-md">{state.refPenalties || "0"}</span>
                            </div>
                            <div className="bg-v-pink/20 backdrop-blur-3xl border-t-4 border-v-pink p-4 flex flex-col items-center justify-center text-center shadow-[0px_0px_20px_rgba(244,114,182,0.2)] overflow-hidden border-x border-b border-white/5">
                                <span className="text-[10px] font-bold opacity-90 mb-1 uppercase tracking-wider">FAUL (M.B.O)</span>
                                <span className="text-5xl font-black text-v-pink leading-none tracking-tighter drop-shadow-md">{state.refFouls || "0.0"}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* DİKEY (PORTRAIT/STORY) DÜZENİ */}
                {isPortrait && (
                    <div className="w-full">
                        <div className="space-y-6">
                            {/* MOBİL GÖREVLER KUTUSU (ÜSTTE) */}
                            <div className="bg-black/30 backdrop-blur-3xl border-t-4 border-white p-6 flex flex-col items-center justify-center text-center shadow-2xl border-x border-b border-white/5">
                                <span className="text-xs font-bold opacity-90 mb-4 uppercase tracking-[0.2em]">TOPLAM GÖREV</span>
                                <div className="flex w-full gap-4 justify-around">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[11px] font-bold opacity-80 uppercase mb-1">HAKEM</span>
                                        <span className="text-4xl font-black text-white leading-none drop-shadow-md">{state.refMatches || "0"}</span>
                                    </div>
                                    <div className="flex flex-col items-center border-l border-white/10 pl-4">
                                        <span className="text-[11px] font-bold opacity-80 uppercase mb-1">VAR</span>
                                        <span className="text-4xl font-black text-white leading-none drop-shadow-md">{state.refVarMatches || "0"}</span>
                                    </div>
                                    <div className="flex flex-col items-center border-l border-white/10 pl-4">
                                        <span className="text-[11px] font-bold opacity-80 uppercase mb-1">AVAR</span>
                                        <span className="text-4xl font-black text-white leading-none drop-shadow-md">{state.refAvarMatches || "0"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* MOBİL VAR VE HATALI KARAR */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-black/30 backdrop-blur-3xl border-t-4 border-v-yellow p-8 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(250,204,21,0.2)] border-x border-b border-white/5">
                                    <span className="text-xs font-bold opacity-90 mb-2 uppercase tracking-wider">VAR MÜDAHALESİ</span>
                                    <span className="text-7xl font-black text-v-yellow leading-none tracking-tighter drop-shadow-2xl">{state.refVarGo || "0.0"}</span>
                                </div>
                                <div className="bg-black/30 backdrop-blur-3xl border-t-4 border-red-500 p-8 flex flex-col items-center justify-center text-center shadow-[0px_0px_30px_rgba(239,68,68,0.2)] border-x border-b border-white/5">
                                    <span className="text-[9px] font-bold opacity-90 mb-1 uppercase tracking-tight leading-tight h-6 flex items-center justify-center">YORUMCU İSTATİSTİKLERİNE GÖRE</span>
                                    <span className="text-7xl font-black text-red-500 leading-none tracking-tighter drop-shadow-2xl">{state.refWrongDecision || "0.0"}</span>
                                    <span className="text-xs font-bold opacity-80 text-white uppercase tracking-tight mt-1">HATALI KARAR</span>
                                </div>
                            </div>

                            {/* ALT KARTLAR (2x2) */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-yellow-400/10 backdrop-blur-3xl border-t-2 border-yellow-400 p-6 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">SARI KART (M.B.O)</span>
                                    <span className="text-5xl font-black text-yellow-400 drop-shadow-md leading-none">{state.refYellowCards || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-xs font-bold opacity-90 mt-3 border-t border-white/5 pt-2">
                                        <span>EV SAHİBİ: {state.refHomeYellow || "0"}</span>
                                        <span>DEPLASMAN: {state.refAwayYellow || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-red-500/10 backdrop-blur-3xl border-t-2 border-red-500 p-6 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">KIRMIZI KART (M.B.O)</span>
                                    <span className="text-5xl font-black text-red-500 drop-shadow-md leading-none">{state.refRedCards || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-xs font-bold opacity-90 mt-3 border-t border-white/5 pt-2">
                                        <span>EV SAHİBİ: {state.refHomeRed || "0"}</span>
                                        <span>DEPLASMAN: {state.refAwayRed || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-3xl border-t-2 border-white p-6 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">PENALTI</span>
                                    <span className="text-5xl font-black text-white drop-shadow-md leading-none">{state.refPenalties || "0"}</span>
                                    <div className="flex w-full justify-between items-center text-xs font-bold opacity-90 mt-3 border-t border-white/5 pt-2">
                                        <span>EV SAHİBİ: {state.refHomePenalty || "0"}</span>
                                        <span>DEPLASMAN: {state.refAwayPenalty || "0"}</span>
                                    </div>
                                </div>
                                <div className="bg-v-pink/10 backdrop-blur-3xl border-t-2 border-v-pink p-6 flex flex-col items-center border-x border-b border-white/5">
                                    <span className="text-[11px] font-bold opacity-80 uppercase mb-1">FAUL (M.B.O)</span>
                                    <span className="text-5xl font-black text-v-pink drop-shadow-md leading-none">{state.refFouls || "0.0"}</span>
                                    <div className="flex w-full justify-between items-center text-xs font-bold opacity-90 mt-3 border-t border-white/5 pt-2">
                                        <span>EV SAHİBİ: {state.refHomeFoul || "0"}</span>
                                        <span>DEPLASMAN: {state.refAwayFoul || "0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ALT BİLGİ VE MARKA ALANI */}
            <div className="relative z-50 flex flex-col items-center">

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

export default Template2;
