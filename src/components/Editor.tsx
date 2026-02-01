"use client";

import React from "react";
import { AppState, PRESETS } from "../types";
import { Download, Save, Image as ImageIcon } from "lucide-react";

interface Props {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    onDownload: () => void;
    onSavePreset: () => void;
    isMobile?: boolean;
}

const Editor: React.FC<Props> = ({ state, setState, onDownload, onSavePreset, isMobile }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setState((prev) => ({ ...prev, [name]: val }));
    };

    return (
        <div className="h-full overflow-y-auto p-6 space-y-8 bg-white border-r-brutal border-black">
            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                    <ImageIcon className="w-6 h-6" /> Görünüm & Tasarım
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <span className="font-bold text-xs uppercase opacity-70">Paylaşım Boyutu</span>
                        <select
                            name="currentPreset"
                            value={state.currentPreset}
                            onChange={handleChange}
                            className="brutal-input font-bold"
                        >
                            {Object.entries(PRESETS).map(([id, p]) => (
                                <option key={id} value={id}>
                                    {p.category} - {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <span className="font-bold text-xs uppercase opacity-70">Tasarım Şablonu</span>
                        <select
                            name="template"
                            value={state.template || "template1"}
                            onChange={handleChange}
                            className="brutal-input font-bold"
                        >
                            <option value="template1">Şablon 1 (Klasik Balon)</option>
                            <option value="template2">Şablon 2 (Modern Haber)</option>
                            <option value="template3">Şablon 3 (Minimalist)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <span className="font-bold text-xs uppercase opacity-70">Takım Teması (18 Takım)</span>
                        <div className="grid grid-cols-6 gap-2">
                            {[
                                { id: "default", name: "Düz", colors: "bg-v-yellow" },
                                { id: "gs", name: "GS", colors: "bg-[#A32638]" },
                                { id: "fb", name: "FB", colors: "bg-[#002D72]" },
                                { id: "bjk", name: "BJK", colors: "bg-black" },
                                { id: "ts", name: "TS", colors: "bg-[#711628]" },
                                { id: "basak", name: "IBFK", colors: "bg-[#ED782F]" },
                                { id: "kasimpasa", name: "KASM", colors: "bg-[#002D72]" },
                                { id: "eyup", name: "EYUP", colors: "bg-[#5D3EBC]" },
                                { id: "goztepe", name: "GOZ", colors: "bg-[#FFD700]" },
                                { id: "samsun", name: "SAM", colors: "bg-[#E30613]" },
                                { id: "hatay", name: "HTY", colors: "bg-[#600000]" },
                                { id: "rize", name: "RIZE", colors: "bg-[#008000]" },
                                { id: "sivas", name: "SVS", colors: "bg-[#FF0000]" },
                                { id: "konya", name: "KON", colors: "bg-[#006400]" },
                                { id: "antalya", name: "ANT", colors: "bg-[#FF0000]" },
                                { id: "alanya", name: "ALN", colors: "bg-[#FFA500]" },
                                { id: "kayseri", name: "KAY", colors: "bg-[#FFFF00]" },
                                { id: "bodrum", name: "BDRM", colors: "bg-[#00FF00]" },
                                { id: "gaziantep", name: "GFK", colors: "bg-[#FF0000]" }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setState(prev => ({ ...prev, theme: t.id as any }))}
                                    className={`h-12 border-2 border-black rounded-brutal flex flex-col items-center justify-center transition-all ${state.theme === t.id ? 'scale-110 shadow-brutal translate-y-[-2px] z-10' : 'opacity-60 hover:opacity-100'}`}
                                    title={t.name}
                                >
                                    <div className={`w-full h-1/2 ${t.colors} rounded-t-sm`} />
                                    <span className="text-[8px] font-black">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="font-bold text-xs uppercase">Renk</span>
                            <input
                                type="color"
                                name="bgColor"
                                value={state.bgColor}
                                onChange={handleChange}
                                disabled={state.theme !== "default"}
                                className="w-full h-10 border-brutal border-black rounded-brutal cursor-pointer disabled:opacity-30"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="font-bold text-xs uppercase">Desen</span>
                            <select
                                name="pattern"
                                value={state.pattern}
                                onChange={handleChange}
                                className="brutal-input text-xs font-bold"
                            >
                                <option value="none">Düz</option>
                                <option value="dots">Noktalı</option>
                                <option value="grid">Izgara</option>
                                <option value="noise">Noise</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase text-v-pink underline decoration-4">İçerik Editörü</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <span className="font-bold text-sm">Durum Stickerı</span>
                        <div className="flex flex-wrap gap-2">
                            {["none", "gol", "var", "ofsayt", "penalti", "kirmizi"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setState(prev => ({ ...prev, sticker: s as any }))}
                                    className={`px-3 py-1.5 border-2 border-black rounded-brutal text-[10px] font-black uppercase transition-all ${state.sticker === s ? 'bg-black text-white shadow-brutal translate-y-[-2px]' : 'bg-white hover:bg-v-gray'}`}
                                >
                                    {s === "none" ? "Yok" : s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="block space-y-1">
                        <span className="font-bold text-sm">Yorum Metni</span>
                        <textarea
                            name="comment"
                            value={state.comment || ""}
                            onChange={handleChange}
                            rows={3}
                            className="brutal-input resize-none"
                        />
                    </label>

                    <label className="block space-y-1 text-v-pink">
                        <span className="font-bold text-sm">Vurgulanacak Kelimeler</span>
                        <input
                            type="text"
                            name="highlight"
                            value={state.highlight || ""}
                            onChange={handleChange}
                            className="brutal-input border-v-pink"
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <span className="font-bold text-xs uppercase">Yorumcu Fotoğrafı</span>
                            <div className="h-24 w-full border-2 border-dashed border-black/30 rounded-brutal relative flex items-center justify-center overflow-hidden hover:border-v-pink transition-colors">
                                {state.authorImage ? (
                                    <img src={state.authorImage} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[10px] text-center font-bold px-4">Foto Yükle</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setState(prev => ({ ...prev, authorImage: reader.result as string }));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {state.authorImage && (
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, authorImage: undefined }))}
                                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-black z-20"
                                    >X</button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pt-4">
                                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                                    <input
                                        type="checkbox"
                                        name="showIcon"
                                        checked={!!state.showIcon}
                                        onChange={handleChange}
                                        className="w-5 h-5 border-brutal border-black accent-v-pink"
                                    />
                                    İkon:
                                </label>
                                <input
                                    type="text"
                                    name="selectedIcon"
                                    value={state.selectedIcon || ""}
                                    onChange={handleChange}
                                    className="w-10 h-10 text-center text-xl brutal-input p-0"
                                    maxLength={2}
                                />
                            </div>

                            <label className="block space-y-1">
                                <span className="font-bold text-[10px] uppercase opacity-60">Yorumcu İsmi</span>
                                <input
                                    type="text"
                                    name="author"
                                    value={state.author || ""}
                                    onChange={handleChange}
                                    className="brutal-input h-9 text-sm"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pb-24">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase">Pozisyon & Dakika</h3>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs bg-black text-white px-2 py-1 rounded-brutal">
                        <input
                            type="checkbox"
                            name="showPositionBox"
                            checked={!!state.showPositionBox}
                            onChange={handleChange}
                            className="w-4 h-4 accent-v-yellow"
                        />
                        AKTİF
                    </label>
                </div>

                {state.showPositionBox && (
                    <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <input
                            type="text"
                            name="positionText"
                            value={state.positionText || ""}
                            onChange={handleChange}
                            placeholder="Pozisyon (Örn: Ceza Sahası)"
                            className="brutal-input text-xs col-span-2"
                        />
                        <input
                            type="text"
                            name="positionMinute"
                            value={state.positionMinute || ""}
                            onChange={handleChange}
                            placeholder="DK"
                            className="brutal-input text-center font-black"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <h3 className="text-xl font-black uppercase">Maç Detayları</h3>
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
                        <input
                            type="text"
                            name="homeTeam"
                            value={state.homeTeam || ""}
                            onChange={handleChange}
                            placeholder="Ev Sahibi"
                            className="brutal-input text-xs"
                        />
                        <input
                            type="text"
                            name="awayTeam"
                            value={state.awayTeam || ""}
                            onChange={handleChange}
                            placeholder="Deplasman"
                            className="brutal-input text-xs"
                        />
                        <input
                            type="text"
                            name="score"
                            value={state.score || ""}
                            onChange={handleChange}
                            placeholder="0-0"
                            className="brutal-input text-center font-black text-lg col-span-2"
                        />
                        <input
                            type="text"
                            name="date"
                            value={state.date || ""}
                            onChange={handleChange}
                            className="brutal-input col-span-2"
                        />
                    </div>
                )}

                {/* Markalama & Sponsor Ayarları */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <h3 className="text-xl font-black uppercase inline-flex items-center gap-2">
                        Markalama <span className="bg-v-pink text-white text-[8px] px-1 rounded">YENİ</span>
                    </h3>
                </div>

                <div className="space-y-3">
                    <div className="bg-black/5 p-4 rounded-brutal space-y-4">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                            <input
                                type="checkbox"
                                name="showBrandingBar"
                                checked={!!state.showBrandingBar}
                                onChange={handleChange}
                                className="w-4 h-4 accent-black"
                            />
                            ALT BİLGİ ÇUBUĞUNU GÖSTER
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs border-t border-black/10 pt-3">
                            <input
                                type="checkbox"
                                name="showSponsor"
                                checked={!!state.showSponsor}
                                onChange={handleChange}
                                className="w-4 h-4 accent-v-pink"
                            />
                            SPONSOR ALANINI AKTİF ET
                        </label>

                        {state.showSponsor && (
                            <div className="animate-in zoom-in-95 duration-200">
                                <input
                                    type="text"
                                    name="sponsorName"
                                    value={state.sponsorName || ""}
                                    onChange={handleChange}
                                    placeholder="Sponsor İsmi (Örn: VARSAYIM PRO)"
                                    className="brutal-input text-xs w-full bg-white transition-all"
                                />
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest italic pt-2">
                                    * Sponsor ismi şablonlarda özel bir konumda görünecektir.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Editor;
