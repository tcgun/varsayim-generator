"use client";

import React, { useState } from "react";
import { AppState, PRESETS } from "../types";
import { Download, Save, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    isMobile?: boolean;
}

const Editor: React.FC<Props> = ({ state, setState, isMobile }) => {
    const [isThemeOpen, setIsThemeOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setState((prev) => ({ ...prev, [name]: val }));
    };

    return (
        <div className="w-full md:w-[480px] md:flex-none h-full overflow-y-auto p-6 space-y-8 bg-white border-r-brutal border-black min-w-0">
            {/* Görünüm & Tasarım */}
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
                            <option value="template1">Görüş / Yorum</option>
                            <option value="template2">Fotoğraflı Haber</option>
                            <option value="template3">Minimal Poster</option>
                            <option value="template4">4. Şablon (Haber Grafiği)</option>
                            <option value="template5">5. Şablon (VAR/Hakem Analizi)</option>
                        </select>
                    </div>

                    <div className="space-y-4 border-2 border-black p-4 rounded-brutal bg-v-gray/20">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <span className="font-bold text-xs uppercase">Arka Plan Deseni</span>
                                <select
                                    name="pattern"
                                    value={state.pattern}
                                    onChange={handleChange}
                                    className="brutal-input text-xs font-bold w-full"
                                >
                                    <option value="none">Düz (Krem Rengi)</option>
                                    <option value="dots">Noktalı</option>
                                    <option value="grid">Izgara</option>
                                    <option value="noise">Noise</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* İçerik Editörü */}
            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase text-v-pink underline decoration-4">İçerik Editörü</h3>

                {state.template === 'template1' ? (
                    /* TEMPLATE 1: VAR / HAKEM ANALİZİ FORMU */
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase opacity-50">Pozisyon Bilgisi</span>
                            <input
                                type="text"
                                name="positionText"
                                value={state.positionText || ""}
                                onChange={handleChange}
                                placeholder="Örn: Ceza Sahası İçi"
                                className="brutal-input text-xs w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase opacity-50">Hakemin Kararı</span>
                            <input
                                type="text"
                                name="refereeDecision"
                                value={state.refereeDecision || ""}
                                onChange={handleChange}
                                placeholder="Örn: PENALTI"
                                className="brutal-input text-xs w-full font-black"
                            />
                        </div>

                        <label className="block space-y-1">
                            <span className="font-bold text-sm">Yorumcuların Yorumu</span>
                            <textarea
                                name="comment"
                                value={state.comment || ""}
                                onChange={handleChange}
                                rows={8}
                                className="brutal-input resize-y text-lg"
                                placeholder="Yorum veya görüş metni..."
                            />
                        </label>

                        <label className="block space-y-1 text-v-pink">
                            <span className="font-bold text-sm">Vurgulanacak Kelimeler (Yıldız * ile Ayırın)</span>
                            <input
                                type="text"
                                name="highlight"
                                value={state.highlight || ""}
                                onChange={handleChange}
                                placeholder="örn: kelime1 * kelime2"
                                className="brutal-input border-v-pink"
                            />
                        </label>

                        <label className="block space-y-1">
                            <span className="font-bold text-[10px] uppercase opacity-60">KİM DEDİ?</span>
                            <input
                                type="text"
                                name="author"
                                value={state.author || ""}
                                onChange={handleChange}
                                className="brutal-input h-12 text-lg font-black uppercase"
                                placeholder="İSİM YAZIN"
                            />
                        </label>

                        {/* Maç Bilgileri - Sadece Template 1 için */}
                        <div className="space-y-4 pt-4 border-t border-black/10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black uppercase inline-flex items-center gap-2">
                                    Maç Bilgileri <span className="bg-black text-white text-[8px] px-1 rounded">ŞABLON 1</span>
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
                                        name="date"
                                        value={state.date || ""}
                                        onChange={handleChange}
                                        placeholder="01.01.2024"
                                        className="brutal-input text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="matchWeek"
                                        value={state.matchWeek || ""}
                                        onChange={handleChange}
                                        placeholder="Örn: 21. HAFTA"
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
                                </div>
                            )}
                        </div>
                    </div>
                ) : state.template === 'template2' ? (
                    /* TEMPLATE 2: HAKEM İSTATİSTİKLERİ FORMU */
                    <div className="space-y-6">
                        <div className="bg-v-yellow p-4 border-2 border-black rounded-brutal shadow-brutal flex items-center gap-3">
                            <div className="bg-black text-white p-2 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                            </div>
                            <h4 className="font-black text-black uppercase tracking-tighter">HAKEM İSTATİSTİKLERİ</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="font-bold text-xs uppercase">Hakem Fotoğrafı</span>
                                <div className="h-28 w-full border-2 border-dashed border-black/30 rounded-brutal relative flex items-center justify-center overflow-hidden hover:border-black transition-colors bg-white">
                                    {state.authorImage ? (
                                        <img src={state.authorImage} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[10px] text-center font-bold px-4 opacity-40">Hakem Fotosu Yükle</span>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        authorImage: reader.result as string,
                                                        authorImageX: 50,
                                                        authorImageY: 50
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>

                                {/* Fotoğraf Konumlandırma Kontrolleri */}
                                {state.authorImage && (
                                    <div className="mt-4 pt-4 border-t border-black/5 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-[10px] uppercase opacity-60">Fotoğrafı Konumlandır</span>
                                            <button
                                                onClick={() => setState(prev => ({ ...prev, authorImageX: 50, authorImageY: 50 }))}
                                                className="text-[10px] font-black underline hover:text-v-yellow transition-colors"
                                            >
                                                SIFIRLA
                                            </button>
                                        </div>

                                        {/* İnteraktif Sürükleme Alanı */}
                                        <div
                                            className="h-32 w-full bg-slate-100 rounded-brutal border-2 border-black relative cursor-move overflow-hidden"
                                            onMouseMove={(e) => {
                                                if (e.buttons === 1) {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                                                    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                                                    setState(prev => ({
                                                        ...prev,
                                                        authorImageX: Math.min(Math.max(x, 0), 100),
                                                        authorImageY: Math.min(Math.max(y, 0), 100)
                                                    }));
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                                                const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                                                setState(prev => ({
                                                    ...prev,
                                                    authorImageX: Math.min(Math.max(x, 0), 100),
                                                    authorImageY: Math.min(Math.max(y, 0), 100)
                                                }));
                                            }}
                                        >
                                            {/* Küçük Görsel Önizleme */}
                                            <img
                                                src={state.authorImage}
                                                className="w-full h-full object-cover opacity-20 pointer-events-none"
                                            />
                                            {/* Hedef Göstergesi */}
                                            <div
                                                className="absolute w-6 h-6 border-2 border-black bg-v-yellow rounded-full -translate-x-1/2 -translate-y-1/2 shadow-brutal pointer-events-none flex items-center justify-center after:content-[''] after:w-1 after:h-1 after:bg-black after:rounded-full"
                                                style={{ left: `${state.authorImageX}%`, top: `${state.authorImageY}%` }}
                                            />
                                        </div>

                                        {/* Slider Kontrolleri */}
                                        <div className="space-y-4 mt-6">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[9px] font-black italic">
                                                    <span>YATAY (X)</span>
                                                    <span>%{state.authorImageX}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={state.authorImageX || 50}
                                                    onChange={(e) => setState(prev => ({ ...prev, authorImageX: parseInt(e.target.value) }))}
                                                    className="w-full accent-v-yellow cursor-pointer"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[9px] font-black italic">
                                                    <span>DİKEY (Y)</span>
                                                    <span>%{state.authorImageY}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={state.authorImageY || 50}
                                                    onChange={(e) => setState(prev => ({ ...prev, authorImageY: parseInt(e.target.value) }))}
                                                    className="w-full accent-v-yellow cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
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

                        <div className="pt-4 border-t border-black/10">
                            <span className="font-bold text-[10px] uppercase opacity-60 block mb-2">GALİBİYET / BERABERLİK YÜZDELERİ</span>
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    name="refHomeWin"
                                    value={state.refHomeWin || ""}
                                    onChange={handleChange}
                                    placeholder="EV %45"
                                    className="brutal-input text-[10px] h-8"
                                />
                                <input
                                    type="text"
                                    name="refDraw"
                                    value={state.refDraw || ""}
                                    onChange={handleChange}
                                    placeholder="BER %25"
                                    className="brutal-input text-[10px] h-8"
                                />
                                <input
                                    type="text"
                                    name="refAwayWin"
                                    value={state.refAwayWin || ""}
                                    onChange={handleChange}
                                    placeholder="DEP %30"
                                    className="brutal-input text-[10px] h-8"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* DİĞER ŞABLONLAR İÇİN BASİT FORM */
                    <div className="space-y-6">
                        <div className="bg-v-yellow/10 p-6 border-2 border-black rounded-brutal text-center space-y-2">
                            <p className="text-sm font-black uppercase text-black">ÖZEL FORM HAZIRLANIYOR</p>
                            <p className="text-[10px] font-bold uppercase text-black/50 italic">Bu şablon için dile getirdiğiniz özel form yapısı yakında eklenecektir.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Markalama & Sponsor Ayarları */}
            <div className="space-y-4 pb-24">
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

                        {state.showBrandingBar && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3 border-t border-black/10 pt-3">
                                <span className="font-bold text-[10px] uppercase opacity-60">Sosyal Medya Hesapları</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">Instagram</span>
                                        <input
                                            type="text"
                                            name="handleInstagram"
                                            value={state.handleInstagram || ""}
                                            onChange={handleChange}
                                            placeholder="varsayimcom"
                                            className="brutal-input text-[10px] h-8 py-1"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">TikTok</span>
                                        <input
                                            type="text"
                                            name="handleTiktok"
                                            value={state.handleTiktok || ""}
                                            onChange={handleChange}
                                            placeholder="varsayimcom"
                                            className="brutal-input text-[10px] h-8 py-1 border-v-pink"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">X (Twitter)</span>
                                        <input
                                            type="text"
                                            name="handleX"
                                            value={state.handleX || ""}
                                            onChange={handleChange}
                                            placeholder="varsayimcom"
                                            className="brutal-input text-[10px] h-8 py-1"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">Facebook</span>
                                        <input
                                            type="text"
                                            name="handleFacebook"
                                            value={state.handleFacebook || ""}
                                            onChange={handleChange}
                                            placeholder="varsayimcom"
                                            className="brutal-input text-[10px] h-8 py-1"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">YouTube</span>
                                        <input
                                            type="text"
                                            name="handleYoutube"
                                            value={state.handleYoutube || ""}
                                            onChange={handleChange}
                                            placeholder="varsayimcom"
                                            className="brutal-input text-[10px] h-8 py-1"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold opacity-50 uppercase tracking-tighter">Web Sitesi</span>
                                        <input
                                            type="text"
                                            name="website"
                                            value={state.website || ""}
                                            onChange={handleChange}
                                            placeholder="varsayim.com"
                                            className="brutal-input text-[10px] h-8 py-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

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
                            <div className="animate-in zoom-in-95 duration-200 space-y-4">
                                <div className="space-y-2">
                                    <span className="font-bold text-[10px] uppercase opacity-60">Sponsor Logosu</span>
                                    <div className="h-20 w-full border-2 border-dashed border-black/30 rounded-brutal relative flex items-center justify-center overflow-hidden hover:border-v-pink transition-colors bg-white">
                                        {state.sponsorLogo ? (
                                            <img src={state.sponsorLogo} className="h-full object-contain p-2" />
                                        ) : (
                                            <span className="text-[10px] text-center font-bold px-4">Logo Yükle</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setState(prev => ({ ...prev, sponsorLogo: reader.result as string }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        {state.sponsorLogo && (
                                            <button
                                                onClick={() => setState(prev => ({ ...prev, sponsorLogo: undefined }))}
                                                className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-black z-20"
                                            >X</button>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="sponsorName"
                                    value={state.sponsorName || ""}
                                    onChange={handleChange}
                                    placeholder="Sponsor İsmi (Örn: VARSAYIM PRO)"
                                    className="brutal-input text-xs w-full bg-white transition-all"
                                />
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest italic pt-2">
                                    * Sponsor logo ve ismi sol alt köşede görünecektir.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Editor;
