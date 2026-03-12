import React, { useMemo } from "react";
import { useStore } from "../store/useStore";
import { PRESETS } from "../types";
import BaseTemplate from "./common/BaseTemplate";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template1: React.FC<Props> = ({ domRef }) => {
    const {
        currentPreset,
        theme,
        comment,
        highlight,
        showPositionBox,
        positionText,
        refereeDecision,
        author,
        showMatchInfo,
        homeTeam,
        score,
        awayTeam,
        matchWeek,
        separator,
        date,
        fontSizeMultiplier
    } = useStore();

    const isLandscape = currentPreset.includes('land') || currentPreset.includes('square');
    const isExtremeLandscape = isLandscape && (currentPreset.includes('land'));

    const THEMES: Record<string, any> = {
        varsayim: { highlight: "bg-[#94A3B8]", cardBg: "bg-[#FFFFFF]", text: "text-slate-800" },
    };

    const currentTheme = THEMES[theme] || THEMES.varsayim;

    const renderedComment = useMemo(() => {
        const trimmedComment = comment.trim();
        if (!highlight) return trimmedComment;

        const highlights = highlight.split('*').map(h => h.trim()).filter(h => h !== "");
        if (highlights.length === 0) return trimmedComment;

        const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');
        const parts = trimmedComment.split(regex);

        return (
            <>
                {parts.map((part, i) => {
                    const isMatch = highlights.some(h => h.toLowerCase() === part.toLowerCase());
                    if (isMatch) {
                        return (
                            <span key={i} className={`${currentTheme.highlight} ${theme === 'varsayim' ? 'text-white' : 'text-black'} px-1`}>
                                {part}
                            </span>
                        );
                    }
                    return part;
                })}
            </>
        );
    }, [comment, highlight, currentTheme, theme]);

    const dynamicFontSize = useMemo(() => {
        const len = comment.length;
        const preset = PRESETS[currentPreset] || PRESETS["ig-square"];
        const ratio = preset.height / preset.width;

        let baseSize = 48;
        const isTall = ratio > 1.5;     // 9:16
        const isPortrait = ratio > 1.1; // 4:5

        if (len > 400) baseSize = isTall ? 24 : isPortrait ? 20 : 16;
        else if (len > 300) baseSize = isTall ? 32 : isPortrait ? 24 : 18;
        else if (len > 200) baseSize = isTall ? 40 : isPortrait ? 32 : 24;
        else if (len > 150) baseSize = isTall ? 48 : isPortrait ? 40 : 32;
        else if (len > 100) baseSize = isTall ? 64 : isPortrait ? 48 : 40;
        else if (len > 50) baseSize = isTall ? 80 : isPortrait ? 64 : 48;
        else if (len > 25) baseSize = isTall ? 100 : isPortrait ? 80 : 64;
        else baseSize = isTall ? 120 : isPortrait ? 100 : 80;

        return baseSize * (fontSizeMultiplier || 1);
    }, [comment, currentPreset, fontSizeMultiplier]);

    const positionFontSize = useMemo(() => {
        const base = isLandscape ? 30 : 40;
        return base * (fontSizeMultiplier || 1);
    }, [isLandscape, fontSizeMultiplier]);

    const decisionFontSize = useMemo(() => {
        const base = isLandscape ? 36 : 52;
        return base * (fontSizeMultiplier || 1);
    }, [isLandscape, fontSizeMultiplier]);

    return (
        <BaseTemplate domRef={domRef} bgColor="#42403b">
            <div className={`flex-1 flex flex-col items-center justify-center p-[60px]`}>
                {showPositionBox && (
                    <div className={`relative z-40 ${isExtremeLandscape ? 'mb-2 scale-[0.55] mt-0' : (isLandscape ? 'mt-12 mb-4 scale-75' : 'mt-20 mb-8')} origin-center flex flex-col items-center gap-4 w-full max-w-[90%]`}>
                        {positionText && (
                            <div className={`bg-white text-black border-brutal border-black ${isLandscape ? 'px-6 py-2' : 'px-10 py-3'} shadow-brutal flex items-center justify-center`}>
                                <span
                                    className={`font-black uppercase tracking-tighter text-left text-black leading-snug inline-block`}
                                    style={{ fontSize: `${positionFontSize}px` }}
                                >
                                    {positionText}
                                </span>
                            </div>
                        )}

                        {refereeDecision && (
                            <div className={`bg-slate-800 border-brutal border-black ${isLandscape ? 'px-6 py-2' : 'px-10 py-3'} shadow-brutal flex items-center justify-center`}>
                                <span
                                    className={`font-black uppercase tracking-tighter text-center text-slate-100 leading-snug`}
                                    style={{ fontSize: `${decisionFontSize}px` }}
                                >
                                    {refereeDecision}
                                </span>
                            </div>
                        )}

                        <div className={`w-full max-w-[98%] ${showMatchInfo ? (isExtremeLandscape ? 'mt-1' : (isLandscape ? 'mt-4' : 'mt-8')) : 'mt-0'} mb-0 relative z-10 flex flex-col items-center`}>
                            <div className={`${currentTheme.cardBg} border-brutal border-black shadow-[8px_8px_0px_0px_#CBD5E1] rounded-brutal flex flex-col items-center justify-center relative min-h-[350px] min-w-[300px] w-fit max-w-full`}>
                                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-10 text-center">
                                    <p
                                        className={`font-black leading-relaxed text-center whitespace-pre-wrap break-words w-full tracking-normal uppercase ${currentTheme.text}`}
                                        style={{ fontSize: `${dynamicFontSize}px` }}
                                    >
                                        <span className={`select-none ${currentTheme.text} opacity-10 text-[1.2rem] absolute top-4 left-4 font-serif`}>“</span>
                                        {renderedComment}
                                        <span className={`select-none ${currentTheme.text} opacity-10 text-[1.2rem] absolute bottom-4 right-4 font-serif`}>”</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`${isExtremeLandscape ? 'mt-1 mb-1 scale-[0.6]' : (isLandscape ? 'mt-1 mb-2' : 'mt-2 mb-8')} z-10 flex items-center gap-6`}>
                    <div className={`bg-white border-brutal border-black px-6 py-2 shadow-brutal flex flex-col items-center`}>
                        <h2 className={`${isExtremeLandscape ? 'text-2xl' : (isLandscape ? 'text-3xl' : 'text-5xl')} font-black uppercase tracking-tighter text-center text-black`}>
                            {author}
                        </h2>
                    </div>
                </div>

                {showMatchInfo && (
                    <div className="mt-auto mb-12 flex flex-col items-center">
                        <div className={`${isExtremeLandscape ? 'scale-[0.8]' : ''} flex flex-col items-center drop-shadow-[1px_1px_0.5px_#fff]`}>
                            <p className={`text-2xl font-black uppercase tracking-widest text-center text-black leading-tight`}>
                                {homeTeam} {score} {awayTeam}
                            </p>
                            {matchWeek && (
                                <p className="text-[12px] font-black text-black/80 text-center tracking-[0.4em] mt-1.5 uppercase">
                                    {matchWeek} {separator} {date}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </BaseTemplate>
    );
};

export default Template1;
