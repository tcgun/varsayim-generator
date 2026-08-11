import React, { useMemo } from "react";
import { useStore } from "../store/useStore";
import { PRESETS, FixtureMatch } from "../types";
import BaseTemplate from "./common/BaseTemplate";

interface Props {
    domRef: React.RefObject<HTMLDivElement | null>;
}

const Template6: React.FC<Props> = ({ domRef }) => {
    const {
        currentPreset,
        fixtureData,
        showSponsor,
        sponsorLogo,
        sponsorName,
        fontSizeMultiplier,
        titleFontWeight = "900",
        matchInfoFontWeight = "700",
        fixtureFontWeight = "700"
    } = useStore();

    const preset = PRESETS[currentPreset] || PRESETS["ratio-1-1"];
    const ratio = preset.height / preset.width;

    const isTall = ratio > 1.5;     // 9:16
    const isWide = ratio < 1;       // 16:9

    const multiplier = fontSizeMultiplier || 1;

    // Font Boyutları
    const mainTitlePx = Math.min((isTall ? 32 : isWide ? 22 : 28) * multiplier, 48);
    const dateLabelPx = Math.min((isTall ? 16 : isWide ? 12 : 14) * multiplier, 22);
    const teamNamePx = Math.min((isTall ? 26 : isWide ? 18 : 22) * multiplier, 38);
    const timeBadgePx = Math.min((isTall ? 22 : isWide ? 16 : 18) * multiplier, 32);

    // Group matches by dateGroup
    const groupedMatches = useMemo(() => {
        const matches = fixtureData?.matches || [];
        const groups: { dateGroup: string; list: FixtureMatch[] }[] = [];

        matches.forEach((m) => {
            const groupName = m.dateGroup?.trim() || "MAÇLAR";
            let existing = groups.find((g) => g.dateGroup === groupName);
            if (!existing) {
                existing = { dateGroup: groupName, list: [] };
                groups.push(existing);
            }
            existing.list.push(m);
        });

        return groups;
    }, [fixtureData]);

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
            {/* ARKAPLAN GRADYANI */}
            <div className="absolute inset-0 bg-[#070709] z-0">
                <div className="absolute inset-0 bg-linear-to-b from-[#13141c] via-[#090a0f] to-[#040406]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.04)_0%,transparent_70%)]" />
            </div>

            {/* BAŞLIK & LİG BİLGİSİ */}
            <div className="relative z-20 pt-20 md:pt-24 px-8 flex flex-col items-center text-center">
                <div className="bg-[#FFD700] text-black border-[3px] border-black px-8 py-3.5 shadow-[5px_5px_0px_#000] rounded-sm">
                    <h1
                        style={{
                            fontSize: `${mainTitlePx}px`,
                            fontWeight: Number(titleFontWeight) || 900,
                            fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                        }}
                        className="uppercase tracking-tighter leading-tight"
                    >
                        {fixtureData?.leagueName || "SÜPER LİG"} - HAFTANIN FİKSTÜRÜ
                    </h1>
                </div>

                {fixtureData?.weekTitle && (
                    <div
                        style={{
                            fontWeight: Number(titleFontWeight) || 900,
                            fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                        }}
                        className="mt-3.5 bg-black/60 border border-white/20 text-[#FFD700] px-5 py-1.5 rounded-brutal text-xs uppercase tracking-widest backdrop-blur-md"
                    >
                        {fixtureData.weekTitle}
                    </div>
                )}
            </div>

            {/* FİKSTÜR MAÇ LİSTESİ */}
            <div className={`relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6 md:p-10 ${isWide ? 'gap-4 overflow-y-auto' : 'gap-6'}`}>
                <div className="w-full max-w-4xl flex flex-col gap-6">
                    {groupedMatches.map((group, gIdx) => (
                        <div key={gIdx} className="flex flex-col items-center gap-3 w-full">
                            {/* Tarih Başlığı Pill */}
                            <div
                                className="bg-[#FFD700] text-black uppercase px-6 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] text-center"
                                style={{
                                    fontSize: `${dateLabelPx}px`,
                                    fontWeight: Number(matchInfoFontWeight) || 700,
                                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                                }}
                            >
                                {group.dateGroup}
                            </div>

                            {/* Maç Kartları */}
                            <div className="w-full flex flex-col gap-2.5">
                                {group.list.map((match) => (
                                    <div
                                        key={match.id}
                                        className="w-full bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000] rounded-brutal px-6 py-3 flex items-center justify-between hover:translate-x-px hover:translate-y-px transition-all"
                                    >
                                        {/* EV SAHİBİ TAKIM (SOL) */}
                                        <div className="flex-1 text-right pr-4">
                                            <span
                                                style={{
                                                    fontSize: `${teamNamePx}px`,
                                                    fontWeight: Number(fixtureFontWeight) || 700,
                                                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                                                }}
                                                className="uppercase tracking-tight text-black block truncate"
                                            >
                                                {match.homeTeam}
                                            </span>
                                        </div>

                                        {/* SAAT / SKOR (ORTA ROZET) */}
                                        <div className="bg-black text-[#FFD700] border-2 border-black px-4 py-1.5 rounded flex items-center justify-center shadow-[2px_2px_0px_#FFD700] shrink-0">
                                            <span
                                                style={{
                                                    fontSize: `${timeBadgePx}px`,
                                                    fontWeight: Number(matchInfoFontWeight) || 700,
                                                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                                                }}
                                                className="font-mono uppercase tracking-wider leading-none"
                                            >
                                                {match.timeOrScore}
                                            </span>
                                        </div>

                                        {/* DEPLASMAN TAKIMI (SAĞ) */}
                                        <div className="flex-1 text-left pl-4">
                                            <span
                                                style={{
                                                    fontSize: `${teamNamePx}px`,
                                                    fontWeight: Number(fixtureFontWeight) || 700,
                                                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
                                                }}
                                                className="uppercase tracking-tight text-black block truncate"
                                            >
                                                {match.awayTeam}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ALT DİPNOT */}
            {fixtureData?.note && (
                <div className="relative z-20 pb-8 px-8 flex flex-col items-center text-center">
                    <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest max-w-2xl">
                        {fixtureData.note}
                    </p>
                </div>
            )}
        </BaseTemplate>
    );
};

export default Template6;
