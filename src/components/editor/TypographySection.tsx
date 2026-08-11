import React from "react";
import { useStore } from "../../store/useStore";
import FontWeightPicker from "./FontWeightPicker";
import { Type, Italic } from "lucide-react";

const TypographySection: React.FC = () => {
    const {
        template,
        fontSizeMultiplier,
        titleFontWeight = "900",
        matchInfoFontWeight = "700",
        decisionFontWeight = "900",
        commentFontWeight = "700",
        authorFontWeight = "900",
        brandingFontWeight = "700",
        sponsorFontWeight = "900",
        fixtureFontWeight = "700",
        fontStyle = "normal",
        updateState
    } = useStore();

    const isTemplate6 = template === "template6";

    const handleMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateState("fontSizeMultiplier", parseFloat(e.target.value));
    };

    return (
        <div className="bg-[#f8f9fa] p-5 border-brutal border-black flex flex-col gap-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-black text-white rounded-md">
                        <Type size={18} />
                    </div>
                    <div>
                        <h4 className="text-base font-black uppercase text-black tracking-tight">Öğe Bazlı Font Kalınlıkları</h4>
                        <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest">Poppins Font Ayarları</p>
                    </div>
                </div>
                <div className="bg-[#FFD700] border border-black px-2 py-0.5 text-[10px] font-black text-black uppercase">
                    Poppins
                </div>
            </div>

            {/* ANA BAŞLIK / GENEL FİKSTÜR BAŞLIĞI KALINLIĞI */}
            <FontWeightPicker
                label={isTemplate6 ? "1. Genel Fikstür Başlığı" : "1. Ana Başlık & Rozetler"}
                value={titleFontWeight}
                onChange={(val) => updateState("titleFontWeight", val)}
                accentColor="yellow"
            />

            {!isTemplate6 && (
                <>
                    {/* MAÇ BİLGİLERİ KALINLIĞI */}
                    <FontWeightPicker
                        label="2. Maç Bilgileri (Takım, Skor, Tarih)"
                        value={matchInfoFontWeight}
                        onChange={(val) => updateState("matchInfoFontWeight", val)}
                        accentColor="yellow"
                    />

                    {/* POZİSYON VE KARAR KALINLIĞI */}
                    <FontWeightPicker
                        label="3. Pozisyon & Hakem Kararı"
                        value={decisionFontWeight}
                        onChange={(val) => updateState("decisionFontWeight", val)}
                        accentColor="pink"
                    />

                    {/* YORUM METNİ KALINLIĞI */}
                    <FontWeightPicker
                        label="4. Yorum / Alıntı Metni"
                        value={commentFontWeight}
                        onChange={(val) => updateState("commentFontWeight", val)}
                        accentColor="pink"
                    />

                    {/* YAZAR & HAKEM İSİMLERİ KALINLIĞI */}
                    <FontWeightPicker
                        label="5. Yazar & Hakem İsimleri"
                        value={authorFontWeight}
                        onChange={(val) => updateState("authorFontWeight", val)}
                        accentColor="black"
                    />
                </>
            )}

            {/* SOSYAL MEDYA / MARKA KALINLIĞI */}
            <FontWeightPicker
                label="6. Sosyal Medya & Çubuk Yazıları"
                value={brandingFontWeight}
                onChange={(val) => updateState("brandingFontWeight", val)}
                accentColor="yellow"
            />

            {/* SPONSOR KALINLIĞI */}
            <FontWeightPicker
                label="7. Sponsor Adı"
                value={sponsorFontWeight}
                onChange={(val) => updateState("sponsorFontWeight", val)}
                accentColor="pink"
            />

            {/* FİKSTÜR TAKIM İSİMLERİ KALINLIĞI */}
            <FontWeightPicker
                label="8. Fikstür Takım İsimleri"
                value={fixtureFontWeight}
                onChange={(val) => updateState("fixtureFontWeight", val)}
                accentColor="yellow"
            />

            {/* YAZI STİLİ */}
            <div className="space-y-2 pt-2 border-t border-black/10">
                <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <Italic size={14} className="text-black/60" />
                    Genel Yazı Stili
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => updateState("fontStyle", "normal")}
                        className={`py-2 px-3 border text-xs font-bold uppercase rounded transition-all ${
                            fontStyle === "normal"
                                ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white text-black border-black/20 hover:border-black"
                        }`}
                    >
                        Düz (Normal)
                    </button>
                    <button
                        type="button"
                        onClick={() => updateState("fontStyle", "italic")}
                        className={`py-2 px-3 border text-xs font-bold italic uppercase rounded transition-all ${
                            fontStyle === "italic"
                                ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white text-black border-black/20 hover:border-black"
                        }`}
                    >
                        İtalik (Italic)
                    </button>
                </div>
            </div>

            {/* YAZI BOYUTU (FONT SIZE MULTIPLIER) */}
            <div className="space-y-3 pt-2 border-t border-black/10">
                <div className="flex justify-between items-center text-xs font-black uppercase text-black">
                    <span>Yazı Boyutu Çarpanı</span>
                    <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        {fontSizeMultiplier.toFixed(1)}x
                    </span>
                </div>

                <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={fontSizeMultiplier}
                    onChange={handleMultiplierChange}
                    className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black border border-black/10"
                />

                <div className="flex gap-1.5 justify-between">
                    {[0.8, 1.0, 1.2, 1.5].map((presetVal) => (
                        <button
                            key={presetVal}
                            type="button"
                            onClick={() => updateState("fontSizeMultiplier", presetVal)}
                            className={`flex-1 py-1 text-[10px] font-bold rounded border ${
                                fontSizeMultiplier === presetVal
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-black/20 hover:border-black"
                            }`}
                        >
                            {presetVal}x
                        </button>
                    ))}
                </div>

                <p className="text-[10px] font-bold text-black/40 italic leading-tight">
                    * Görseldeki metin boyutunu ölçeklendirmek için slider&apos;ı veya butonları kullanabilirsiniz.
                </p>
            </div>
        </div>
    );
};

export default TypographySection;
