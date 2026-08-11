import React from "react";
import { useStore } from "../../store/useStore";
import FontWeightPicker from "./FontWeightPicker";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Template1Form: React.FC<Props> = ({ handleChange }) => {
    const {
        positionText,
        refereeDecision,
        comment,
        highlight,
        author,
        decisionFontWeight = "900",
        commentFontWeight = "700",
        authorFontWeight = "900",
        updateState
    } = useStore();

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase opacity-50">Pozisyon Bilgisi</span>
                <input
                    type="text"
                    name="positionText"
                    value={positionText || ""}
                    onChange={handleChange}
                    placeholder="Örn: Ceza Sahası İçi"
                    className="brutal-input text-xs w-full"
                />
            </div>

            <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase opacity-50 block">Hakemin Kararı</span>
                <input
                    type="text"
                    name="refereeDecision"
                    value={refereeDecision || ""}
                    onChange={handleChange}
                    placeholder="Örn: PENALTI"
                    className="brutal-input text-xs w-full font-black mb-1"
                />
                <FontWeightPicker
                    label="Karar Kutusu Font Kalınlığı"
                    value={decisionFontWeight}
                    onChange={(val) => updateState("decisionFontWeight", val)}
                    accentColor="pink"
                />
            </div>

            <div className="space-y-2 pt-2 border-t border-black/10">
                <label className="block space-y-1">
                    <span className="font-bold text-sm">Yorumcuların Yorumu</span>
                    <textarea
                        name="comment"
                        value={comment || ""}
                        onChange={handleChange}
                        rows={6}
                        className="brutal-input resize-y text-base"
                        placeholder="Yorum veya görüş metni..."
                    />
                </label>
                <FontWeightPicker
                    label="Yorum Metni Font Kalınlığı"
                    value={commentFontWeight}
                    onChange={(val) => updateState("commentFontWeight", val)}
                    accentColor="pink"
                />
            </div>

            <label className="block space-y-1 text-v-pink pt-2">
                <span className="font-bold text-sm">Vurgulanacak Kelimeler (Yıldız * ile Ayırın)</span>
                <input
                    type="text"
                    name="highlight"
                    value={highlight || ""}
                    onChange={handleChange}
                    placeholder="örn: kelime1 * kelime2"
                    className="brutal-input border-v-pink"
                />
            </label>

            <div className="space-y-2 pt-2 border-t border-black/10">
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] uppercase opacity-60">KİM DEDİ?</span>
                    <input
                        type="text"
                        name="author"
                        value={author || ""}
                        onChange={handleChange}
                        className="brutal-input h-12 text-lg font-black uppercase mb-1"
                        placeholder="İSİM YAZIN"
                    />
                </label>
                <FontWeightPicker
                    label="Yazar İsmi Font Kalınlığı"
                    value={authorFontWeight}
                    onChange={(val) => updateState("authorFontWeight", val)}
                    accentColor="black"
                />
            </div>
        </div>
    );
};

export default Template1Form;
