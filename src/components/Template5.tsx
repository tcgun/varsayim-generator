import React from "react";
import { useStore } from "../store/useStore";
import { PRESETS } from "../types";
import { MessageSquareWarning, Check, X, HelpCircle } from "lucide-react";
import BaseTemplate from "./common/BaseTemplate";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template5: React.FC<Props> = ({ domRef }) => {
    const {
        currentPreset,
        matchMistakes,
        showSponsor,
        sponsorLogo,
        sponsorName,
        showMatchInfo,
        homeTeam,
        awayTeam,
        date,
        matchWeek,
        fontSizeMultiplier,
        showNextPageIndicator
    } = useStore();

    const preset = PRESETS[currentPreset] || PRESETS["ratio-1-1"];
    const ratio = preset.height / preset.width;

    const isTall = ratio > 1.5;     // 9:16
    const isWide = ratio < 1;       // 16:9

    const multiplier = fontSizeMultiplier || 1;

    // Font Sizes
    const mainTitlePx = isTall ? 24 : isWide ? 18 : 24;
    const refereeNamePx = mainTitlePx;
    const labelPx = isTall ? 14 : isWide ? 10 : 12;

    const rowTitlePx = Math.min(20 * multiplier, 24);
    const rowDescPx = Math.min(14 * multiplier, 16);
    const minutePx = Math.min(24 * multiplier, 28);

    const overlayContent = (
        <>
            {showSponsor && sponsorLogo && (
                <div className="absolute bottom-20 left-8 bg-black/40 p-4 border border-white/10 backdrop-blur-sm flex items-center gap-4">
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] font-black uppercase text-v-pink opacity-50 italic">DESTEKLERİYLE</span>
                        <span className="text-white font-black italic uppercase tracking-tighter text-xl">{sponsorName || "VARSAYIM"}</span>
                    </div>
                    <img src={sponsorLogo} alt="Sponsor" className="h-10 object-contain brightness-0 invert opacity-80" />
                </div>
            )}
        </>
    );

    return (
        <BaseTemplate domRef={domRef} overlayContent={overlayContent} showBrandingHeader={true} showBrandingBar={true}>
            {/* Background Gradient matching brand theme */}
            <div className="absolute inset-0 bg-[#0a0a0a] z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#050505]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,20,147,0.03)_0%,transparent_70%)]" />
            </div>

            {/* HEADER */}
            <div className="absolute top-0 left-0 p-4 z-50 flex flex-col items-start gap-2">
                <div className="bg-[#FFD700] text-black border-[3px] border-black px-6 py-2 shadow-[4px_4px_0px_#000]">
                    <span
                        style={{ fontSize: `${mainTitlePx}px` }}
                        className="font-black uppercase tracking-tighter leading-none"
                    >
                        TARTIŞMALI POZİSYONLAR
                    </span>
                </div>
                {showMatchInfo && (
                    <div className="bg-black/40 backdrop-blur-3xl px-4 py-2 border-l-8 border-[#FFD700] shadow-[4px_4px_20px_rgba(255,215,0,0.2)] flex flex-col items-start">
                        <span
                            style={{ fontSize: `${refereeNamePx}px` }}
                            className="text-white font-black uppercase italic tracking-tighter leading-none mb-1 drop-shadow-md"
                        >
                            {homeTeam} - {awayTeam}
                        </span>
                        <div className="flex items-center gap-2">
                            <span
                                style={{ fontSize: `${labelPx}px` }}
                                className="text-[#FFD700] font-black uppercase tracking-widest opacity-90"
                            >
                                {matchWeek}
                            </span>
                            <span className="text-white/40 text-[10px]">|</span>
                            <span
                                style={{ fontSize: `${labelPx}px` }}
                                className="text-white/60 font-bold uppercase"
                            >
                                {date}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* CONTENT LIST */}
            <div className={`relative z-10 flex-1 w-full flex flex-col items-center justify-center gap-6 px-12 ${isWide ? 'mt-32' : 'mt-48'}`}>
                {matchMistakes.map((mistake, index) => (
                    <div 
                        key={mistake.id}
                        className="w-full max-w-4xl flex items-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* OUTSIDE ICON */}
                        {mistake.icon && mistake.icon !== 'none' ? (
                            <div className="w-12 md:w-16 shrink-0 flex justify-center">
                                {mistake.icon === 'check' && (
                                    <div className="bg-green-500 rounded-full p-2 md:p-3 flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_#FFD700]">
                                        <Check className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[3]" />
                                    </div>
                                )}
                                {mistake.icon === 'cross' && (
                                    <div className="bg-red-500 rounded-full p-2 md:p-3 flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_#FFD700]">
                                        <X className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[3]" />
                                    </div>
                                )}
                                {mistake.icon === 'question' && (
                                    <div className="bg-blue-500 rounded-full p-2 md:p-3 flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_#FFD700]">
                                        <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[3]" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-12 md:w-16 shrink-0" /> // Placeholder to keep alignment
                        )}

                        <div className="flex-1 bg-[#151515] border-2 border-white/10 flex flex-row shadow-[4px_4px_0px_#FFD700]">
                            {/* LEFT: MINUTE */}
                            <div className="w-24 md:w-32 shrink-0 bg-[#FFD700] flex flex-col items-center justify-center border-r-2 border-black p-4">
                                <span className="text-black font-black uppercase tracking-widest text-xs md:text-sm opacity-80 mb-1">DAKİKA</span>
                                <span style={{ fontSize: `${minutePx}px` }} className="text-black font-black italic tracking-tighter leading-none">
                                    {mistake.minute}
                                </span>
                            </div>

                        {/* MIDDLE: TITLE & ICON */}
                        <div className="flex-1 shrink-0 flex items-center justify-start border-r-2 border-black/30 p-6 relative overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)] pointer-events-none" />
                            
                            <div className="flex items-center gap-4 z-10 pl-4 w-full">
                                <MessageSquareWarning className="w-10 h-10 shrink-0 text-white/50" />
                                <h3 style={{ fontSize: `${rowTitlePx}px` }} className="text-white font-black uppercase italic tracking-tighter leading-tight text-left drop-shadow-lg">
                                    {mistake.title}
                                </h3>
                            </div>
                        </div>

                        {/* RIGHT: DESCRIPTIONS */}
                        <div className="flex-1 flex flex-col justify-center p-6 gap-2 bg-[#1a1a1a]">
                            {[mistake.description1, mistake.description2, mistake.description3].map((desc, i) => (
                                desc ? (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                                        <span style={{ fontSize: `${rowDescPx}px` }} className="text-white/90 font-bold uppercase tracking-wide">
                                            {desc}
                                        </span>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            ))}

                {/* NEXT PAGE INDICATOR */}
                {showNextPageIndicator && (
                    <div className="w-full max-w-4xl mt-4 flex items-center justify-center">
                        <div className="bg-[#FFD700] text-black px-8 py-2 md:py-3 rounded-full flex items-center shadow-[0_0_15px_rgba(255,215,0,0.3)] border-2 border-black">
                            <div className="flex gap-1.5 items-center mr-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            </div>
                            <span className="font-black italic uppercase tracking-wider text-sm md:text-base">Devamı Diğer Sayfada</span>
                        </div>
                    </div>
                )}
            </div>
        </BaseTemplate>
    );
};

export default Template5;
