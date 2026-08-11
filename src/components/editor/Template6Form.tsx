import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import { FixtureMatch } from "../../types";
import FontWeightPicker from "./FontWeightPicker";
import { Plus, Trash2, Calendar, Sparkles } from "lucide-react";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Template6Form: React.FC<Props> = ({ handleChange }) => {
    const { fixtureData, titleFontWeight = "900", fixtureFontWeight = "700", setState, updateState } = useStore();
    const [automationText, setAutomationText] = useState("");

    const TEAM_NAME_MAP: Record<string, string> = {
        "BEŞİKTAŞ": "Beşiktaş",
        "KONYASPOR": "Konyaspor",
        "GALATASARAY": "Galatasaray",
        "GÖZTEPE": "Göztepe",
        "BAŞAKŞEHİR": "Başakşehir FK",
        "ANTALYASPOR": "Antalyaspor",
        "SAMSUNSPOR": "Samsunspor",
        "TRABZONSPOR": "Trabzonspor",
        "ALANYASPOR": "Alanyaspor",
        "FENERBAHÇE": "Fenerbahçe",
        "GENÇLERBİRLİĞİ": "Gençlerbirliği",
        "KASIMPAŞA": "Kasımpaşa",
        "KOCAELİSPOR": "Kocaelispor",
        "KARAGÜMRÜK": "Fatih Karagümrük",
        "EYÜPSPOR": "Eyüpspor",
        "RİZESPOR": "Rizespor",
        "GAZİANTEP": "Gaziantep FK",
        "KAYSERİSPOR": "Kayserispor"
    };

    const cleanTeamName = (rawName: string) => {
        const upperRaw = rawName.toUpperCase();
        for (const [key, cleanValue] of Object.entries(TEAM_NAME_MAP)) {
            if (upperRaw.includes(key)) {
                return cleanValue;
            }
        }
        return rawName.replace(/\s+A\.Ş\.$/i, "").trim();
    };

    const handleAutomate = () => {
        if (!automationText.trim()) return;

        const lines = automationText.split('\n').map(l => l.trim()).filter(l => l);
        let currentDateGroup = "6 MAYIS CUMARTESİ";
        const parsedMatches: FixtureMatch[] = [];
        let leagueName = fixtureData?.leagueName || "SÜPER LİG";
        let weekTitle = fixtureData?.weekTitle || "25. HAFTA FİKSTÜRÜ";
        let byeTeam = fixtureData?.byeTeam || "";

        lines.forEach((line) => {
            const upper = line.toUpperCase();

            if (upper.startsWith("BAY")) {
                byeTeam = line;
                return;
            }

            if (upper.includes("SÜPER LİG") || upper.includes("LİG")) {
                leagueName = line;
                return;
            }

            if (upper.includes("HAFTA") || upper.includes("FİKSTÜR")) {
                weekTitle = line;
                return;
            }

            // Tarih Grubu Tespiti (Örn: "6 MAYIS" veya "PAZAR" veya "CUMARTESİ")
            if (/\d{1,2}\s+(OCAK|ŞUBAT|MART|NİSAN|MAYIS|HAZİRAN|TEMMUZ|AĞUSTOS|EYLÜL|EKİM|KASIM|ARALIK)/i.test(line) || upper.includes("PAZAR") || upper.includes("CUMARTESİ") || upper.includes("CUMA") || upper.includes("PAZARTESİ")) {
                currentDateGroup = line;
                return;
            }

            // Maç Satırı Tespiti: "Antalyaspor 19.00 Beşiktaş" veya "Galatasaray 2-1 Fenerbahçe"
            const matchRegex = /^(.*?)\s+(\d{1,2}[:.]\d{2}|\d+\s*-\s*\d+)\s+(.*)$/;
            const matchResult = line.match(matchRegex);

            if (matchResult) {
                const home = cleanTeamName(matchResult[1]);
                const timeScore = matchResult[2].replace(':', '.');
                const away = cleanTeamName(matchResult[3]);

                parsedMatches.push({
                    id: String(Date.now() + Math.random()),
                    dateGroup: currentDateGroup,
                    homeTeam: home,
                    timeOrScore: timeScore,
                    awayTeam: away
                });
            }
        });

        if (parsedMatches.length > 0) {
            setState(prev => ({
                ...prev,
                fixtureData: {
                    ...prev.fixtureData,
                    leagueName,
                    weekTitle,
                    byeTeam: byeTeam || prev.fixtureData.byeTeam,
                    matches: parsedMatches
                }
            }));
            setAutomationText("");
            alert(`${parsedMatches.length} adet maç fikstüre aktarıldı!`);
        } else {
            alert("Maç formatı algılanamadı. Lütfen 'EvSahibi 19.00 Deplasman' şeklinde yapıştırın.");
        }
    };

    const addMatch = () => {
        const newMatch: FixtureMatch = {
            id: String(Date.now()),
            dateGroup: "YENİ TARİH",
            homeTeam: "Ev Sahibi",
            timeOrScore: "19.00",
            awayTeam: "Deplasman"
        };

        setState(prev => ({
            ...prev,
            fixtureData: {
                ...prev.fixtureData,
                matches: [...(prev.fixtureData?.matches || []), newMatch]
            }
        }));
    };

    const removeMatch = (id: string) => {
        setState(prev => ({
            ...prev,
            fixtureData: {
                ...prev.fixtureData,
                matches: prev.fixtureData.matches.filter(m => m.id !== id)
            }
        }));
    };

    const updateMatch = (id: string, field: keyof FixtureMatch, value: string) => {
        setState(prev => ({
            ...prev,
            fixtureData: {
                ...prev.fixtureData,
                matches: prev.fixtureData.matches.map(m => m.id === id ? { ...m, [field]: value } : m)
            }
        }));
    };

    return (
        <div className="space-y-6">
            {/* HIZLI OTOMASYON */}
            <div className="bg-[#FFD700]/10 border-2 border-black p-4 space-y-3 rounded-brutal">
                <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-black" />
                    <h3 className="font-black uppercase text-xs text-black">HIZLI FİKSTÜR YÜKLEYİCİ</h3>
                </div>
                <textarea
                    rows={4}
                    value={automationText}
                    onChange={(e) => setAutomationText(e.target.value)}
                    placeholder={`Metni buraya yapıştırın. Örnek:\nSÜPER LİG 25. HAFTA\n6 MAYIS CUMARTESİ\nAntalyaspor 19.00 Beşiktaş\nGalatasaray 2-1 Fenerbahçe`}
                    className="w-full bg-white border border-black p-2 text-xs font-mono resize-y"
                />
                <button
                    onClick={handleAutomate}
                    className="w-full bg-[#FFD700] text-black font-black uppercase text-xs py-2 border border-black shadow-[2px_2px_0px_#000] hover:translate-x-px hover:translate-y-px transition-all"
                >
                    BİLGİLERİ FİKSTÜRE AKTAR
                </button>
            </div>

            {/* GENEL BAŞLIK BİLGİLERİ */}
            <div className="space-y-3 pt-2">
                <h3 className="font-black uppercase text-sm border-b border-black/10 pb-1">Genel Fikstür Başlığı</h3>

                <div className="grid grid-cols-2 gap-3">
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] opacity-60 uppercase">Lig Adı</span>
                        <input
                            type="text"
                            name="fixtureData.leagueName"
                            value={fixtureData?.leagueName || ""}
                            onChange={handleChange}
                            placeholder="SÜPER LİG"
                            className="brutal-input text-xs w-full"
                        />
                    </label>
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] opacity-60 uppercase">Hafta / Rozet</span>
                        <input
                            type="text"
                            name="fixtureData.weekTitle"
                            value={fixtureData?.weekTitle || ""}
                            onChange={handleChange}
                            placeholder="25. HAFTA FİKSTÜRÜ"
                            className="brutal-input text-xs w-full"
                        />
                    </label>
                </div>

                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-60 uppercase">Alt Dipnot</span>
                    <input
                        type="text"
                        name="fixtureData.note"
                        value={fixtureData?.note || ""}
                        onChange={handleChange}
                        placeholder="Tüm maç anlatımları varsayim.com'da"
                        className="brutal-input text-xs w-full"
                    />
                </label>
            </div>

            {/* FONT KALINLIĞI SEÇİCİLERİ */}
            <div className="space-y-4 pt-2 border-t border-black/10">
                <FontWeightPicker
                    label="Genel Fikstür Başlığı Font Kalınlığı"
                    value={titleFontWeight}
                    onChange={(val) => updateState("titleFontWeight", val)}
                    accentColor="yellow"
                />

                <FontWeightPicker
                    label="Fikstür Takım İsimleri Font Kalınlığı"
                    value={fixtureFontWeight}
                    onChange={(val) => updateState("fixtureFontWeight", val)}
                    accentColor="yellow"
                />
            </div>

            {/* MAÇ LİSTESİ DÜZENLEME */}
            <div className="space-y-3 pt-2 border-t border-black/10">
                <div className="flex items-center justify-between">
                    <h3 className="font-black uppercase text-sm">Maç Listesi ({fixtureData?.matches?.length || 0})</h3>
                    <button
                        onClick={addMatch}
                        className="flex items-center gap-1 bg-black text-white px-2.5 py-1 text-[10px] font-bold uppercase rounded shadow-[2px_2px_0px_#FFD700]"
                    >
                        <Plus size={12} /> Maç Ekle
                    </button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {fixtureData?.matches?.map((m, idx) => (
                        <div key={m.id} className="bg-zinc-50 border border-black p-3 rounded space-y-2 relative">
                            <div className="flex justify-between items-center pb-1 border-b border-black/10">
                                <span className="text-[10px] font-black uppercase text-black/50 flex items-center gap-1">
                                    <Calendar size={12} /> Maç #{idx + 1}
                                </span>
                                <button
                                    onClick={() => removeMatch(m.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Sil"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <label className="block space-y-0.5 col-span-2">
                                    <span className="font-bold text-[9px] opacity-60 uppercase">Tarih Grubu</span>
                                    <input
                                        type="text"
                                        value={m.dateGroup || ""}
                                        onChange={(e) => updateMatch(m.id, "dateGroup", e.target.value)}
                                        placeholder="6 MAYIS CUMARTESİ"
                                        className="brutal-input text-[11px] h-7 w-full font-bold"
                                    />
                                </label>
                                <label className="block space-y-0.5">
                                    <span className="font-bold text-[9px] opacity-60 uppercase">Ev Sahibi</span>
                                    <input
                                        type="text"
                                        value={m.homeTeam}
                                        onChange={(e) => updateMatch(m.id, "homeTeam", e.target.value)}
                                        className="brutal-input text-[11px] h-7 w-full"
                                    />
                                </label>
                                <label className="block space-y-0.5">
                                    <span className="font-bold text-[9px] opacity-60 uppercase">Saat / Skor</span>
                                    <input
                                        type="text"
                                        value={m.timeOrScore}
                                        onChange={(e) => updateMatch(m.id, "timeOrScore", e.target.value)}
                                        className="brutal-input text-[11px] h-7 w-full text-center font-bold"
                                    />
                                </label>
                                <label className="block space-y-0.5 col-span-2">
                                    <span className="font-bold text-[9px] opacity-60 uppercase">Deplasman</span>
                                    <input
                                        type="text"
                                        value={m.awayTeam}
                                        onChange={(e) => updateMatch(m.id, "awayTeam", e.target.value)}
                                        className="brutal-input text-[11px] h-7 w-full"
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Template6Form;
