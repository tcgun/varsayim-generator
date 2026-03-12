import React from "react";
import { AppState } from "../../types";
import PhotoControl from "./Common/PhotoControl";

interface Props {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Template2Form: React.FC<Props> = ({ state, setState, handleChange }) => {
    return (
        <div className="space-y-6">
            <div className="bg-v-yellow p-4 border-2 border-black rounded-brutal shadow-brutal flex items-center gap-3">
                <div className="bg-black text-white p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                </div>
                <h4 className="font-black text-black uppercase tracking-tighter">HAKEM İSTATİSTİKLERİ</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <PhotoControl
                    label="Hakem Fotoğrafı"
                    imageKey="authorImage"
                    xKey="authorImageX"
                    yKey="authorImageY"
                    state={state}
                    setState={setState}
                />

                <div className="space-y-4">
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">HAKEM ADI</span>
                        <input
                            type="text"
                            name="author"
                            value={state.author || ""}
                            onChange={handleChange}
                            className="brutal-input h-10 text-sm font-black uppercase"
                            placeholder="HAKEM İSMİ"
                        />
                    </label>
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">MAÇ SAYISI (HAKEM)</span>
                        <input
                            type="text"
                            name="refMatches"
                            value={state.refMatches || ""}
                            onChange={handleChange}
                            className="brutal-input h-10 text-sm font-black"
                            placeholder="Örn: 12"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="block space-y-1">
                            <span className="font-bold text-[8px] uppercase opacity-60">VAR GÖREVİ</span>
                            <input
                                type="text"
                                name="refVarMatches"
                                value={state.refVarMatches || ""}
                                onChange={handleChange}
                                className="brutal-input h-8 text-xs font-bold"
                                placeholder="Örn: 5"
                            />
                        </label>
                        <label className="block space-y-1">
                            <span className="font-bold text-[8px] uppercase opacity-60">AVAR GÖREVİ</span>
                            <input
                                type="text"
                                name="refAvarMatches"
                                value={state.refAvarMatches || ""}
                                onChange={handleChange}
                                className="brutal-input h-8 text-xs font-bold"
                                placeholder="Örn: 3"
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase opacity-50">VAR'A GİTME (M.B)</span>
                        <input
                            type="text"
                            name="refVarGo"
                            value={state.refVarGo || ""}
                            onChange={handleChange}
                            placeholder="0.5"
                            className="brutal-input text-xs"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase opacity-50 text-v-pink">VAR'A ÇAĞIRMA (TOPLAM)</span>
                        <input
                            type="text"
                            name="refVarCalls"
                            value={state.refVarCalls || ""}
                            onChange={handleChange}
                            placeholder="Örn: 8"
                            className="brutal-input text-xs border-v-pink"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">HATALI KARAR (YORUMCU)</span>
                    <input
                        type="text"
                        name="refWrongDecision"
                        value={state.refWrongDecision || ""}
                        onChange={handleChange}
                        placeholder="1.2"
                        className="brutal-input text-xs border-red-200"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">SARI KART (ORT)</span>
                    <input
                        type="text"
                        name="refYellowCards"
                        value={state.refYellowCards || ""}
                        onChange={handleChange}
                        placeholder="4.2"
                        className="brutal-input text-xs border-yellow-400 bg-yellow-50"
                    />
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">KIRMIZI KART (ORT)</span>
                    <input
                        type="text"
                        name="refRedCards"
                        value={state.refRedCards || ""}
                        onChange={handleChange}
                        placeholder="0.3"
                        className="brutal-input text-xs border-red-500 bg-red-50"
                    />
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">PENALTI (TOPLAM)</span>
                    <input
                        type="text"
                        name="refPenalties"
                        value={state.refPenalties || ""}
                        onChange={handleChange}
                        placeholder="5"
                        className="brutal-input text-xs"
                    />
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">FAUL (ORT)</span>
                    <input
                        type="text"
                        name="refFouls"
                        value={state.refFouls || ""}
                        onChange={handleChange}
                        placeholder="22.5"
                        className="brutal-input text-xs"
                    />
                </div>
            </div>

            {/* Dağılımlar */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/5">
                <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase opacity-40">Sarı Kart Dağılımı</span>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" name="refHomeYellow" value={state.refHomeYellow || ""} onChange={handleChange} placeholder="EV SAHİBİ" className="brutal-input text-[10px] h-7" />
                        <input type="text" name="refAwayYellow" value={state.refAwayYellow || ""} onChange={handleChange} placeholder="DEPLASMAN" className="brutal-input text-[10px] h-7" />
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase opacity-40">Kırmızı Kart Dağılımı</span>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" name="refHomeRed" value={state.refHomeRed || ""} onChange={handleChange} placeholder="EV SAHİBİ" className="brutal-input text-[10px] h-7" />
                        <input type="text" name="refAwayRed" value={state.refAwayRed || ""} onChange={handleChange} placeholder="DEPLASMAN" className="brutal-input text-[10px] h-7" />
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase opacity-40">Penaltı Dağılımı</span>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" name="refHomePenalty" value={state.refHomePenalty || ""} onChange={handleChange} placeholder="EV SAHİBİ" className="brutal-input text-[10px] h-7" />
                        <input type="text" name="refAwayPenalty" value={state.refAwayPenalty || ""} onChange={handleChange} placeholder="DEPLASMAN" className="brutal-input text-[10px] h-7" />
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase opacity-40">Faul Dağılımı</span>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" name="refHomeFoul" value={state.refHomeFoul || ""} onChange={handleChange} placeholder="EV SAHİBİ" className="brutal-input text-[10px] h-7" />
                        <input type="text" name="refAwayFoul" value={state.refAwayFoul || ""} onChange={handleChange} placeholder="DEPLASMAN" className="brutal-input text-[10px] h-7" />
                    </div>
                </div>
            </div>

            {/* Galibiyet Oranları */}
            <div className="pt-4 border-t border-black/10">
                <span className="font-bold text-[10px] uppercase opacity-60 block mb-2">GALİBİYET / BERABERLİK YÜZDELERİ</span>
                <div className="grid grid-cols-3 gap-2">
                    <input type="text" name="refHomeWin" value={state.refHomeWin || ""} onChange={handleChange} placeholder="EV %45" className="brutal-input text-[10px] h-8" />
                    <input type="text" name="refDraw" value={state.refDraw || ""} onChange={handleChange} placeholder="BER %25" className="brutal-input text-[10px] h-8" />
                    <input type="text" name="refAwayWin" value={state.refAwayWin || ""} onChange={handleChange} placeholder="DEP %30" className="brutal-input text-[10px] h-8" />
                </div>
            </div>
        </div>
    );
};

export default Template2Form;
