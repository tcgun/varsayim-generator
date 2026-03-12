import React, { useMemo } from "react";
import { useStore } from "../store/useStore";
import { PRESETS } from "../types";
import { Globe } from "lucide-react";
import BaseTemplate from "./common/BaseTemplate";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template4: React.FC<Props> = ({ domRef }) => {
    const {
        currentPreset,
        officials,
        showObserver,
        showRepresentative,
        showSponsor,
        sponsorLogo,
        sponsorName,
        showMatchInfo,
        homeTeam,
        awayTeam,
        date,
        matchWeek,
        fontSizeMultiplier
    } = useStore();

    const preset = PRESETS[currentPreset] || PRESETS["ig-square"];
    const ratio = preset.height / preset.width;

    const isTall = ratio > 1.5;
    const isPortrait = ratio > 1.1;
    const isSquare = ratio >= 1 && ratio <= 1.1;
    const isWide = ratio < 1;

    // Dinamik Font ve Kutu Boyutları
    const multiplier = fontSizeMultiplier || 1;
    const mainTitlePx = (isWide ? 18 : 24) * multiplier;
    const varNamePx = (isTall ? 72 : isWide ? 24 : 36) * multiplier;
    const avarNamePx = (isTall ? 32 : isWide ? 20 : 24) * multiplier;

    const isVarAvarOnly = useMemo(() => {
        return (officials.var?.name || officials.avar?.name || officials.avar2?.name) &&
            !(showObserver && officials.observer?.name) &&
            !(showRepresentative && (officials.representative?.name || officials.representative2?.name || officials.representative3?.name || officials.representative4?.name));
    }, [officials, showObserver, showRepresentative]);

    const overlayContent = (
        <>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-v-yellow/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-v-pink/5 rounded-full blur-[120px]" />
            </div>

            {showSponsor && sponsorLogo && (
                <div className="absolute bottom-20 left-8 bg-white/5 p-4 rounded-brutal border border-white/10 backdrop-blur-sm flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-v-yellow opacity-50 italic">DESTEKLERİYLE</span>
                        <span className="text-white font-black italic uppercase tracking-tighter text-xl">{sponsorName || "VARSAYIM PRO"}</span>
                    </div>
                    <img src={sponsorLogo} alt="Sponsor" className="h-10 object-contain brightness-0 invert opacity-80" />
                </div>
            )}
        </>
    );

    return (
        <BaseTemplate domRef={domRef} overlayContent={overlayContent}>
            <div className="absolute top-0 left-0 p-4 z-50 flex flex-col items-start gap-2">
                <div className="bg-black/40 backdrop-blur-3xl px-4 py-2 border-l-8 border-v-yellow shadow-[4px_4px_20px_rgba(255,215,0,0.2)] flex flex-col items-start gap-1 animate-in fade-in slide-in-from-left-4 duration-500">
                    <span
                        className={`font-black uppercase tracking-tighter italic text-white drop-shadow-md`}
                        style={{ fontSize: `${mainTitlePx}px` }}
                    >
                        {homeTeam || "EV SAHİBİ"} - {awayTeam || "DEPLASMAN"}
                    </span>
                    {(matchWeek || date) && (
                        <div className="flex items-center gap-2 opacity-80">
                            <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
                                {matchWeek} {matchWeek && date ? " | " : ""} {date}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={`relative z-10 flex-1 w-full flex flex-col items-center justify-center p-8 ${isTall ? 'pt-48 pb-24 gap-6' : isPortrait ? 'pt-40 pb-20 gap-4' : 'pt-24 pb-16 gap-3'}`}>
                <div className="w-full max-w-5xl flex flex-col gap-6">
                    {(officials.var?.name || officials.avar?.name || officials.avar2?.name) && (
                        <div className={`w-full flex flex-col gap-12 items-center mx-auto ${isVarAvarOnly ? 'max-w-4xl' : 'max-w-5xl'}`}>
                            {officials.var?.name && (
                                <div className={`group relative ${isVarAvarOnly ? 'w-[480px] h-[560px]' : 'w-80 h-96'} transition-all duration-500`}>
                                    <div className="absolute inset-0 bg-v-pink translate-x-3 translate-y-3 opacity-20 blur-xl" />
                                    <div className="relative w-full h-full bg-[#111] border-[6px] border-v-pink shadow-[15px_15px_0px_rgba(255,0,150,0.2)] flex flex-col overflow-hidden">
                                        <div className="flex-1 min-h-0 relative bg-black overflow-hidden">
                                            {officials.var.image ? (
                                                <img
                                                    src={officials.var.image}
                                                    style={{
                                                        objectPosition: `${officials.var.x ?? 50}% ${officials.var.y ?? 50}%`,
                                                        transform: `scale(${officials.var.scale || 1})`,
                                                    }}
                                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                                    <span className="text-v-pink/20 font-black text-6xl italic">VAR</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-black border-t-4 border-v-pink p-5 flex flex-col items-center text-center">
                                            <span className="text-v-pink text-2xl font-black uppercase tracking-[0.3em] block mb-2 opacity-90 italic">VAR HAKEMİ</span>
                                            <h3
                                                className={`font-black text-white uppercase tracking-tighter leading-none break-words w-full`}
                                                style={{ fontSize: `${(isVarAvarOnly && isTall) ? varNamePx * 1.5 : varNamePx}px` }}
                                            >
                                                {officials.var.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(officials.avar?.name || officials.avar2?.name) && (
                                <div className={`flex flex-wrap justify-center gap-8 w-full`}>
                                    {[
                                        officials.avar,
                                        officials.avar2
                                    ].map((avar, idx) => avar?.name && (
                                        <div key={idx} className={`group relative ${isVarAvarOnly ? 'w-80 h-96' : 'w-64 h-80'} transition-all`}>
                                            <div className="absolute inset-0 bg-v-pink translate-x-2 translate-y-2 opacity-10 blur-lg" />
                                            <div className="relative w-full h-full bg-[#111] border-[4px] border-v-pink/60 flex flex-col overflow-hidden opacity-90 hover:opacity-100 hover:border-v-pink transition-all">
                                                <div className="flex-1 relative bg-black overflow-hidden">
                                                    {avar.image ? (
                                                        <img
                                                            src={avar.image}
                                                            style={{
                                                                objectPosition: `${avar.x ?? 50}% ${avar.y ?? 50}%`,
                                                                transform: `scale(${avar.scale || 1})`,
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
                                                    <span className={`${isWide ? 'text-lg' : 'text-2xl'} font-black uppercase tracking-widest block mb-1 text-v-pink`}>AVAR HAKEMİ</span>
                                                    <h3
                                                        className={`font-black text-white uppercase tracking-tighter leading-tight`}
                                                        style={{ fontSize: `${avarNamePx}px` }}
                                                    >
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

                    {((showObserver && officials.observer?.name) || (showRepresentative && (officials.representative?.name || officials.representative2?.name || officials.representative3?.name || officials.representative4?.name))) && (
                        <div className={`mt-12 flex flex-wrap justify-center gap-6 w-full max-w-6xl`}>
                            {showObserver && officials.observer?.name && (
                                <div className="group relative w-80 h-96">
                                    <div className="absolute inset-0 bg-white/5 translate-x-2 translate-y-2" />
                                    <div className="relative w-full h-full bg-[#111] border-[4px] border-white/20 flex flex-col overflow-hidden hover:border-white/40 transition-all">
                                        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                                            {officials.observer.image ? (
                                                <img
                                                    src={officials.observer.image}
                                                    style={{
                                                        objectPosition: `${officials.observer.x ?? 50}% ${officials.observer.y ?? 50}%`,
                                                        transform: `scale(${officials.observer.scale || 1})`,
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
                                                {officials.observer.name}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showRepresentative && (officials.representative?.name || officials.representative2?.name || officials.representative3?.name || officials.representative4?.name) && (
                                <>
                                    {[
                                        officials.representative,
                                        officials.representative2,
                                        officials.representative3,
                                        officials.representative4
                                    ].map((rep, idx) => rep?.name && (
                                        <div key={idx} className="group relative w-72 h-80 opacity-90 hover:opacity-100 transition-opacity">
                                            <div className="absolute inset-0 bg-white/5 translate-x-1 translate-y-1" />
                                            <div className="relative w-full h-full bg-[#111] border-[3px] border-white/10 flex flex-col overflow-hidden hover:border-v-yellow/40 transition-all">
                                                <div className="flex-1 relative bg-zinc-900 overflow-hidden">
                                                    {rep.image ? (
                                                        <img
                                                            src={rep.image}
                                                            style={{
                                                                objectPosition: `${rep.x ?? 50}% ${rep.y ?? 50}%`,
                                                                transform: `scale(${rep.scale || 1})`,
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
        </BaseTemplate>
    );
};

export default Template4;
