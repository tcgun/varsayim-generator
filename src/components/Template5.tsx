import React, { useMemo } from "react";
import { useStore } from "../store/useStore";
import { PRESETS } from "../types";
import BaseTemplate from "./common/BaseTemplate";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template5: React.FC<Props> = ({ domRef }) => {
    const {
        currentPreset,
        theme,
        positionText,
        comment,
        highlight,
        showSponsor,
        sponsorName,
        sponsorLogo,
        author,
        showMatchInfo,
        homeTeam,
        awayTeam,
        score,
        matchWeek,
        separator,
        date,
        fontSizeMultiplier
    } = useStore();

    const preset = PRESETS[currentPreset] || PRESETS["ig-square"];
    const ratio = preset.height / preset.width;

    const isTall = ratio > 1.5;
    const isPortrait = ratio > 1.1;
    const isSquare = ratio >= 1 && ratio <= 1.1;
    const isWide = ratio < 1;

    // Üst Bilgiler (Yazı boyutundan bağımsız - Statik)
    const mainTitlePx = isTall ? 24 : isWide ? 18 : 24;
    const refereeNamePx = mainTitlePx;
    const labelPx = isTall ? 14 : isWide ? 10 : 12;

    // Tema Renkleri
    const THEMES: Record<string, any> = {
        varsayim: { primary: "bg-[#E2E8F0]", bg: "#FDF6E3", cardBg: "bg-[#FFFFFF]", badge: "bg-[#E2E8F0]", highlight: "bg-[#94A3B8]", border: "border-slate-300", shadow: "shadow-[8px_8px_0px_0px_#CBD5E1]", text: "text-slate-800", quote: "text-slate-300" },
    };

    const currentTheme = THEMES[theme] || THEMES.varsayim;

    const headlineFontSize = useMemo(() => {
        const text = (positionText || "").trim();
        const len = text.length;

        // Baz boyut belirle
        let base = 64;
        if (len > 50) base = isWide ? 24 : 32;
        else if (len > 30) base = isWide ? 32 : 48;
        else {
            if (isTall) base = 96;
            else if (isPortrait) base = 80;
            else if (isSquare) base = 72;
            else base = 64;
        }

        return base * (fontSizeMultiplier || 1);
    }, [positionText, isTall, isPortrait, isSquare, isWide, fontSizeMultiplier]);

    const commentFontSize = useMemo(() => {
        const len = comment.length;

        let base = 32;
        if (len > 300) base = isWide ? 14 : 18;
        else if (len > 200) base = isWide ? 18 : 24;
        else if (len > 100) base = isWide ? 24 : 32;
        else {
            if (isTall) base = 48;
            else if (isPortrait) base = 40;
            else base = 32;
        }

        return base * (fontSizeMultiplier || 1);
    }, [comment, isTall, isPortrait, isWide, fontSizeMultiplier]);

    const renderedComment = useMemo(() => {
        const trimmedComment = comment.trim();
        if (!highlight) return trimmedComment;

        const highlights = highlight.split('*').map(h => h.trim()).filter(h => h !== "");
        if (highlights.length === 0) return trimmedComment;

        const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');

        const parts = trimmedComment.split(regex);
        return parts.map((part, i) => {
            const isMatch = highlights.some(h => h.toLowerCase() === part.toLowerCase());
            if (isMatch) {
                return (
                    <mark key={i} className={`${currentTheme.highlight || 'bg-red-600'} text-white px-2 py-0.5 rounded-sm mx-1`}>
                        {part}
                    </mark>
                );
            }
            return part;
        });
    }, [comment, highlight, currentTheme]);

    const overlayContent = (
        <>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundColor: currentTheme.bg }} />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="absolute top-0 left-0 right-0 h-1.5 z-50 bg-white/20">
                <div className="h-full bg-red-600 w-1/3" />
            </div>

            {showSponsor && (sponsorName || sponsorLogo) && (
                <div className={`absolute ${isWide ? 'top-8 left-8' : 'top-12 left-12'} z-50`}>
                    <div className={`${currentTheme.cardBg || 'bg-white'} border-brutal border-black p-2 flex items-center gap-3 shadow-brutal h-[60px] min-w-[150px]`}>
                        {sponsorLogo && (
                            <img src={sponsorLogo} alt="Sponsor" className="h-full object-contain" />
                        )}
                        <div className="flex flex-col items-start leading-none pr-4 text-black">
                            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 italic">DESTEĞİYLE</span>
                            <span className="text-base font-black italic uppercase tracking-tighter">
                                {sponsorName || "SPONSOR"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <BaseTemplate domRef={domRef} overlayContent={overlayContent} showBrandingHeader={true}>
            {/* ÜST SOL: BAŞLIK VE MAÇ BİLGİSİ */}
            <div className="absolute top-0 left-0 p-4 z-[60] flex flex-col items-start gap-2">
                <div className="bg-[#FFD700] text-black border-[3px] border-black px-6 py-2 shadow-[4px_4px_0px_#000]">
                    <span
                        style={{ fontSize: `${mainTitlePx}px` }}
                        className="font-black uppercase tracking-tighter leading-none"
                    >
                        DİJİTAL ANALİZ
                    </span>
                </div>
                {showMatchInfo && (
                    <div className="bg-black/40 backdrop-blur-3xl px-4 py-2 border-l-8 border-[#FFD700] shadow-[4px_4px_20px_rgba(255,215,0,0.2)] flex flex-col items-start">
                        <span
                            style={{ fontSize: `${refereeNamePx}px` }}
                            className="text-white font-black uppercase italic tracking-tighter leading-none mb-1 drop-shadow-md"
                        >
                            {homeTeam} {score || "-"} {awayTeam}
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

            <div className={`relative z-10 flex-1 flex flex-col justify-center px-10 md:px-16 ${isTall ? 'pt-32 pb-56' : isPortrait ? 'pt-24 pb-48' : 'pt-16 pb-32'}`}>
                <div className="flex flex-col gap-12 w-full">
                    {positionText && (
                        <div className="flex flex-col gap-4 max-w-[95%]">
                            <h1
                                className={`font-bold leading-tight tracking-normal uppercase italic text-left text-white max-w-[15ch] break-words`}
                                style={{ fontSize: `${headlineFontSize}px` }}
                            >
                                {positionText}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-16 bg-red-600" />
                                <div className="h-[1px] flex-1 bg-white/20" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 border-l-2 border-red-600">
                            <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">DİJİTAL ANALİZ</span>
                        </div>
                        <div className={`${currentTheme.cardBg || 'bg-white'} text-black shadow-brutal border-2 border-black p-6 max-w-[95%] w-fit mt-2`}>
                            <p
                                className={`font-black leading-relaxed text-left text-black uppercase`}
                                style={{ fontSize: `${commentFontSize}px` }}
                            >
                                {renderedComment || "İçerik bekleniyor..."}
                            </p>
                        </div>
                    </div>
                </div>

                {author && (
                    <div className="flex flex-col bg-white text-black px-6 py-3 border-2 border-black shadow-brutal ml-4 mt-8 w-fit">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-red-600" />
                            <span className="text-2xl font-black italic uppercase tracking-tighter text-black">
                                {author}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </BaseTemplate>
    );
};

export default Template5;
