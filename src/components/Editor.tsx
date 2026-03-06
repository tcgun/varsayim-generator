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
                        <button
                            onClick={() => setIsThemeOpen(!isThemeOpen)}
                            className="w-full flex items-center justify-between font-bold text-xs uppercase opacity-80 hover:opacity-100 transition-opacity"
                            title="Temaları Göster/Gizle"
                        >
                            <span>Takım Teması (18 Takım)</span>
                            {isThemeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isThemeOpen && (
                            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-6 gap-2">
                                    {[
                                        { id: "default", name: "VARSAYIM", colors: "bg-[#FF5DAD]" },
                                        { id: "gs", name: "GS", colors: "bg-[#A90432]" },
                                        { id: "fb", name: "FB", colors: "bg-[#002d72]" },
                                        { id: "bjk", name: "BJK", colors: "bg-black" },
                                        { id: "ts", name: "TS", colors: "bg-[#A52A2A]" },
                                        { id: "basak", name: "IBFK", colors: "bg-[#E56B25]" },
                                        { id: "kasimpasa", name: "KASM", colors: "bg-[#004A99]" },
                                        { id: "eyup", name: "EYUP", colors: "bg-[#800080]" },
                                        { id: "goztepe", name: "GOZ", colors: "bg-[#FFFF00]" },
                                        { id: "samsun", name: "SAM", colors: "bg-[#CC0000]" },
                                        { id: "rize", name: "RIZE", colors: "bg-[#008C45]" },
                                        { id: "konya", name: "KON", colors: "bg-[#008000]" },
                                        { id: "antalya", name: "ANT", colors: "bg-[#E30613]" },
                                        { id: "alanya", name: "ALN", colors: "bg-[#F9B517]" },
                                        { id: "kayseri", name: "KAY", colors: "bg-[#FFD700]" },
                                        { id: "gaziantep", name: "GFK", colors: "bg-[#DA291C]" },
                                        { id: "gencler", name: "GB", colors: "bg-[#ff0000]" },
                                        { id: "kocaeli", name: "KOCA", colors: "bg-[#008000]" },
                                        { id: "karagumruk", name: "FKG", colors: "bg-[#ff0000]" }
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

                                <div className="grid grid-cols-2 gap-4 mt-4">
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
                        )}
                    </div>
                </div>
            </div>

            {/* İçerik Editörü */}
            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase text-v-pink underline decoration-4">İçerik Editörü</h3>
                <div className="space-y-4">
                    {state.template === 'template1' ? (
                        <>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase opacity-50">Dakika</span>
                                        <input
                                            type="checkbox"
                                            name="showMinute"
                                            checked={!!state.showMinute}
                                            onChange={handleChange}
                                            className="w-3 h-3 accent-black"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="positionMinute"
                                        value={state.positionMinute || ""}
                                        onChange={handleChange}
                                        placeholder="DK"
                                        disabled={!state.showMinute}
                                        className="brutal-input text-center font-black disabled:opacity-30"
                                    />
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <span className="text-[10px] font-bold uppercase opacity-50">Olay</span>
                                    <input
                                        type="text"
                                        name="positionLabel"
                                        value={state.positionLabel || ""}
                                        onChange={handleChange}
                                        placeholder="Örn: FAUL / GOL"
                                        className="brutal-input text-xs uppercase font-black"
                                    />
                                </div>
                            </div>

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
                        </>
                    ) : (
                        <>
                            <label className="block space-y-1">
                                <span className="font-bold text-sm">
                                    {state.template === 'template2' ? 'Haber İçeriği' : 'Yorum Metni'}
                                </span>
                                <textarea
                                    name="comment"
                                    value={state.comment || ""}
                                    onChange={handleChange}
                                    rows={8}
                                    className="brutal-input resize-y text-lg"
                                    placeholder={state.template === 'template2' ? 'Flaas haber veya detaylı metni buraya yazın...' : 'Yorum veya görüş metni...'}
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
                        </>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xs uppercase">Yorumcu Fotoğrafı</span>
                                <label className="flex items-center gap-1 cursor-pointer font-bold text-[8px] bg-black text-white px-1 rounded">
                                    <input
                                        type="checkbox"
                                        name="showAuthorImage"
                                        checked={!!state.showAuthorImage}
                                        onChange={handleChange}
                                        className="w-3 h-3 accent-v-yellow"
                                    />
                                    GÖSTER
                                </label>
                            </div>
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

                        <div className="space-y-2 w-full">
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
                            <label className="block space-y-1">
                                <span className="font-bold text-[10px] uppercase opacity-60">Yorumcu Ünvanı</span>
                                <input
                                    type="text"
                                    name="authorTitle"
                                    value={state.authorTitle || ""}
                                    onChange={handleChange}
                                    className="brutal-input h-9 text-xs"
                                    placeholder="Örn: VARSAYIM ÖZEL YORUMCU"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pozisyon & Dakika (Template 1 dışındakiler için) */}
            {state.template !== 'template1' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <h3 className="text-xl font-black uppercase">
                            {state.template === 'template2' ? 'Haber Detayları' : 'Pozisyon & Dakika'}
                        </h3>
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
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2 space-y-1">
                                    <span className="text-[10px] font-bold uppercase opacity-50">
                                        {state.template === 'template2' ? 'HABER ETİKETİ (Örn: FLAŞ)' : 'KUTU ETİKETİ (Örn: DAKİKA)'}
                                    </span>
                                    <input
                                        type="text"
                                        name="positionLabel"
                                        value={state.positionLabel || ""}
                                        onChange={handleChange}
                                        placeholder="DAKİKA / FLAŞ"
                                        className="brutal-input text-xs uppercase font-black"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase opacity-50">ZAMAN</span>
                                        <input
                                            type="checkbox"
                                            name="showMinute"
                                            checked={!!state.showMinute}
                                            onChange={handleChange}
                                            className="w-3 h-3 accent-black"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="positionMinute"
                                        value={state.positionMinute || ""}
                                        onChange={handleChange}
                                        placeholder="DK"
                                        disabled={!state.showMinute}
                                        className="brutal-input text-center font-black disabled:opacity-30"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase opacity-50">
                                    {state.template === 'template2' ? 'HABER BAŞLIĞI' : 'POZİSYON DETAYI'}
                                </span>
                                <input
                                    type="text"
                                    name="positionText"
                                    value={state.positionText || ""}
                                    onChange={handleChange}
                                    placeholder={state.template === 'template2' ? 'ANA KONU VEYA BAŞLIK' : 'Pozisyon (Örn: Ceza Sahası)'}
                                    className="brutal-input text-xs w-full"
                                />
                            </div>
                        </div>
                    )}

                    {state.template === 'template2' && (
                        <div className="pt-4 border-t border-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block space-y-1">
                                <span className="font-bold text-[10px] uppercase opacity-60">Haber Yerleşimi (Uzun Metin Ayarı)</span>
                                <select
                                    name="contentLayout"
                                    value={state.contentLayout || "compact"}
                                    onChange={handleChange}
                                    className="brutal-input text-xs font-bold w-full"
                                >
                                    <option value="compact">Altta Toplu (Standart)</option>
                                    <option value="spread">Yukarı Taşı (Uzun Metin İçin)</option>
                                </select>
                            </label>
                        </div>
                    )}
                </div>
            )}

            {/* Maç Bilgileri */}
            <div className="space-y-4">
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <h3 className="text-xl font-black uppercase inline-flex items-center gap-2">
                        Maç Bilgileri <span className="bg-black text-white text-[8px] px-1 rounded">OPSİYONEL</span>
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

        </div>
    );
};

export default Editor;
