import React from "react";
import { AppState } from "../../types";

interface Props {
    state: AppState;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    title?: string;
    showLabel?: string;
}

const MatchInfoSection: React.FC<Props> = ({ state, handleChange, title = "Maç Bilgileri", showLabel = "ŞABLON 1" }) => {
    return (
        <div className="space-y-4 pt-4 border-t border-black/10">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase inline-flex items-center gap-2">
                    {title} {showLabel && <span className="bg-black text-white text-[8px] px-1 rounded">{showLabel}</span>}
                </h3>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs bg-black text-white px-2 py-1 rounded-brutal">
                    <input
                        type="checkbox"
                        name="showMatchInfo"
                        checked={state.showMatchInfo}
                        onChange={handleChange}
                        className="w-4 h-4 accent-v-yellow"
                    />
                    GÖSTER
                </label>
            </div>

            {state.showMatchInfo && (
                <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Ev Sahibi</span>
                        <input
                            type="text"
                            name="homeTeam"
                            value={state.homeTeam || ""}
                            onChange={handleChange}
                            placeholder="Ev Sahibi"
                            className="brutal-input text-xs w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Deplasman</span>
                        <input
                            type="text"
                            name="awayTeam"
                            value={state.awayTeam || ""}
                            onChange={handleChange}
                            placeholder="Deplasman"
                            className="brutal-input text-xs w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Tarih</span>
                        <input
                            type="text"
                            name="date"
                            value={state.date || ""}
                            onChange={handleChange}
                            placeholder="01.01.2024"
                            className="brutal-input text-xs w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Sıralama / Hafta</span>
                        <input
                            type="text"
                            name="matchWeek"
                            value={state.matchWeek || ""}
                            onChange={handleChange}
                            placeholder="Örn: 21. HAFTA"
                            className="brutal-input text-xs w-full"
                        />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60 block text-center">Skor</span>
                        <input
                            type="text"
                            name="score"
                            value={state.score || ""}
                            onChange={handleChange}
                            placeholder="0-0"
                            className="brutal-input text-center font-black text-lg w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchInfoSection;
