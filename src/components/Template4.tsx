"use client";

import React, { useMemo } from "react";
import { AppState, PRESETS } from "../types";
import { Globe } from "lucide-react";

interface Props {
    state: AppState;
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template4: React.FC<Props> = ({ state, domRef }) => {
    const preset = PRESETS[state.currentPreset] || PRESETS["ig-square"];
    const isLandscape = preset.width > preset.height;
    const isPortrait = preset.height > preset.width;
    const isVarAvarOnly = useMemo(() => {
        return (state.varName || state.avarName || state.avar2Name) &&
            !(state.showObserver && state.observerName) &&
            !(state.showRepresentative && (state.representativeName || state.representative2Name || state.representative3Name || state.representative4Name));
    }, [state]);

    return (
        <div
            ref={domRef}
            className="relative flex flex-col items-center justify-between overflow-hidden bg-black font-sans"
            style={{
                width: preset.width,
                height: preset.height,
            }}
            id="capture-area"
        >
            {/* ARKAPLAN: VURGULU VE DERİNLİKLİ */}
            <div className="absolute inset-0 z-0">
                {/* Dinamik Degrade Arkaplan */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-[#1a1a1a]" />
                {/* Grainy Noise Dokusu */}
                <div className="absolute inset-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                {/* Vurgu Işıkları */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-v-yellow/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-v-pink/5 rounded-full blur-[120px]" />
            </div>

            {/* ÜST BİLGİLER: Maç Bilgisi (SOL) & Logo (SAĞ) */}
            <div className="absolute top-0 left-0 right-0 p-4 z-50 flex items-start justify-between pointer-events-none">
                {/* MAÇ BİLGİSİ (SOL ÜST) */}
                <div className="flex flex-col items-start gap-2 pointer-events-auto">
                    {/* Şablon Başlığı removed */}

                    {state.showMatchInfo && (state.homeTeam || state.awayTeam || state.date || state.matchWeek) && (
                        <div className="bg-black/40 backdrop-blur-3xl px-4 py-2 border-l-8 border-v-yellow shadow-[4px_4px_20px_rgba(255,215,0,0.2)] flex flex-col items-start gap-1 animate-in fade-in slide-in-from-left-4 duration-500">
                            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-white drop-shadow-md">
                                {state.homeTeam || "EV SAHİBİ"} - {state.awayTeam || "DEPLASMAN"}
                            </span>
                            {(state.matchWeek || state.date) && (
                                <div className="flex items-center gap-2 opacity-80">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
                                        {state.matchWeek} {state.matchWeek && state.date ? " | " : ""} {state.date}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* VARSAYIM Logo (Sağ Üst) */}
                <div className="bg-[#FFD700] text-black border-[3px] border-black shadow-[4px_4px_15px_rgba(255,0,150,0.6)] px-8 py-3 pointer-events-auto">
                    <span className="text-4xl font-black tracking-tighter uppercase text-black leading-none">
                        VARSAYIM
                    </span>
                </div>
            </div>

            {/* ANA İÇERİK: GÖREVLİLER LİSTESİ */}
            <div className={`relative z-10 flex-1 w-full flex flex-col items-center justify-center p-8 ${isPortrait ? 'pt-48 pb-24 gap-6' : 'pt-32 pb-24 gap-4'}`}>
                {/* GÖREVLİ KARTLARI */}
                <div className="w-full max-w-5xl flex flex-col gap-6">


                    {/* VAR / AVAR GRUBU */}
                    {(state.varName || state.avarName || state.avar2Name) && (
                        <div className={`w-full flex flex-col gap-12 items-center ${isVarAvarOnly ? 'max-w-4xl' : 'max-w-5xl'}`}>
                            {/* VAR HAKEMİ - BÜYÜK TASARIMSAL KART */}
                            {state.varName && (
                                <div className={`group relative ${isVarAvarOnly ? 'w-[480px] h-[560px]' : 'w-80 h-96'} transition-all duration-500`}>
                                    {/* Kart Arkası Dekor */}
                                    <div className="absolute inset-0 bg-v-pink translate-x-3 translate-y-3 opacity-20 blur-xl" />

                                    <div className="relative w-full h-full bg-[#111] border-[6px] border-v-pink shadow-[15px_15px_0px_rgba(255,0,150,0.2)] flex flex-col overflow-hidden">
                                        <div className="flex-1 min-h-0 relative bg-black overflow-hidden">
                                            {state.varImage ? (
                                                <img
                                                    src={state.varImage}
                                                    style={{
                                                        objectPosition: `${state.varX ?? 50}% ${state.varY ?? 50}%`,
                                                        transform: `scale(${state.varScale || 1})`,
                                                    }}
                                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                    <span className="text-v-pink/20 font-black text-6xl italic">VAR</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* İsim Alanı - Tasarımsal Blok */}
                                        <div className="bg-black border-t-4 border-v-pink p-5 flex flex-col items-center text-center">
                                            <span className="text-v-pink text-2xl font-black uppercase tracking-[0.3em] block mb-2 opacity-90 italic">VAR HAKEMİ</span>
                                            <h3 className={`${isVarAvarOnly ? 'text-6xl' : 'text-4xl'} font-black text-white uppercase tracking-tighter leading-none break-words w-full`}>
                                                {state.varName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* AVAR HAKEMLERİ - KART TASARIMI */}
                            {(state.avarName || state.avar2Name) && (
                                <div className={`flex flex-wrap justify-center gap-8 w-full`}>
                                    {[
                                        { name: state.avarName, img: state.avarImage },
                                        { name: state.avar2Name, img: state.avar2Image }
                                    ].map((avar, idx) => avar.name && (
                                        <div key={idx} className={`group relative ${isVarAvarOnly ? 'w-80 h-96' : 'w-64 h-80'} transition-all`}>
                                            <div className="absolute inset-0 bg-v-pink translate-x-2 translate-y-2 opacity-10 blur-lg" />
                                            <div className="relative w-full h-full bg-[#111] border-[4px] border-v-pink/60 flex flex-col overflow-hidden opacity-90 hover:opacity-100 hover:border-v-pink transition-all">
                                                <div className="flex-1 relative bg-black overflow-hidden">
                                                    {avar.img ? (
                                                        <img
                                                            src={avar.img}
                                                            style={{
                                                                objectPosition: `${idx === 0 ? (state.avarX ?? 50) : (state.avar2X ?? 50)}% ${idx === 0 ? (state.avarY ?? 50) : (state.avar2Y ?? 50)}%`,
                                                                transform: `scale(${idx === 0 ? (state.avarScale || 1) : (state.avar2Scale || 1)})`,
                                                            }}
                                                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                            <span className="text-v-pink/10 font-black text-4xl italic">AVAR</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-v-pink/60 to-transparent" />
                                                </div>
                                                <div className="bg-black/80 border-t border-v-pink/40 p-4">
                                                    <span className="text-v-pink text-2xl font-black uppercase tracking-widest block mb-1">AVAR HAKEMİ</span>
                                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                                                        {avar.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* GÖZLEMCİ / TEMSİLCİ GRUBU - KUTULU TASARIM */}
                    {((state.showObserver && state.observerName) || (state.showRepresentative && (state.representativeName || state.representative2Name || state.representative3Name || state.representative4Name))) && (
                        <div className={`mt-12 flex flex-wrap justify-center gap-6 w-full max-w-6xl`}>
                            {/* GÖZLEMCİ KARTI */}
                            {state.showObserver && state.observerName && (
                                <div className="group relative w-80 h-96">
                                    <div className="absolute inset-0 bg-white/5 translate-x-2 translate-y-2" />
                                    <div className="relative w-full h-full bg-[#111] border-[4px] border-white/20 flex flex-col overflow-hidden hover:border-white/40 transition-all">
                                        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                                            {state.observerImage ? (
                                                <img
                                                    src={state.observerImage}
                                                    style={{
                                                        objectPosition: `${state.observerX ?? 50}% ${state.observerY ?? 50}%`,
                                                        transform: `scale(${state.observerScale || 1})`,
                                                    }}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-10">
                                                    <Globe className="w-24 h-24 text-white" />
                                                </div>
                                            )}
                                            <div className="absolute top-0 left-0 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/60">GÖZLEMCİ</div>
                                        </div>
                                        <div className="bg-white/5 p-4 border-t border-white/10 backdrop-blur-md">
                                            <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                                                {state.observerName}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TEMSİLCİ KARTLARI */}
                            {state.showRepresentative && (state.representativeName || state.representative2Name || state.representative3Name || state.representative4Name) && (
                                <>
                                    {[
                                        { name: state.representativeName, img: state.representativeImage },
                                        { name: state.representative2Name, img: state.representative2Image },
                                        { name: state.representative3Name, img: state.representative3Image },
                                        { name: state.representative4Name, img: state.representative4Image }
                                    ].map((rep, idx) => rep.name && (
                                        <div key={idx} className="group relative w-72 h-80 opacity-90 hover:opacity-100 transition-opacity">
                                            <div className="absolute inset-0 bg-white/5 translate-x-1 translate-y-1" />
                                            <div className="relative w-full h-full bg-[#111] border-[3px] border-white/10 flex flex-col overflow-hidden hover:border-v-yellow/40 transition-all">
                                                <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                                                    {rep.img ? (
                                                        <img
                                                            src={rep.img}
                                                            style={{
                                                                objectPosition: `${idx === 0 ? (state.rep1X ?? 50) : idx === 1 ? (state.rep2X ?? 50) : idx === 2 ? (state.rep3X ?? 50) : (state.rep4X ?? 50)}% ${idx === 0 ? (state.rep1Y ?? 50) : idx === 1 ? (state.rep2Y ?? 50) : idx === 2 ? (state.rep3Y ?? 50) : (state.rep4Y ?? 50)}%`,
                                                                transform: `scale(${idx === 0 ? (state.rep1Scale || 1) : idx === 1 ? (state.rep2Scale || 1) : idx === 2 ? (state.rep3Scale || 1) : (state.rep4Scale || 1)})`,
                                                            }}
                                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-v-yellow/5">
                                                            <div className="w-16 h-1 w-16 bg-white/5 rotate-45" />
                                                            <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white/5">REP</div>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-0 right-0 bg-white/5 px-2 py-1 text-[8px] font-black uppercase text-white/40">TEMSİLCİ</div>
                                                </div>
                                                <div className="bg-black/50 p-3 backdrop-blur-sm border-t border-white/5">
                                                    <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-tight line-clamp-2">
                                                        {rep.name}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ALT BİLGİ VE MARKA ALANI */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
                {/* Sponsor Alanı */}
                {state.showSponsor && state.sponsorLogo && (
                    <div className="absolute bottom-20 left-8 bg-white/5 p-4 rounded-brutal border border-white/10 backdrop-blur-sm flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col items-start">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-v-yellow opacity-50 italic">DESTEKLERİYLE</span>
                            <span className="text-white font-black italic uppercase tracking-tighter text-xl">{state.sponsorName || "VARSAYIM PRO"}</span>
                        </div>
                        <img src={state.sponsorLogo} alt="Sponsor" className="h-10 object-contain brightness-0 invert opacity-80" />
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

                        {/* Sosyal Medya Kanalları */}
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
