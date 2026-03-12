import React from "react";
import { AppState, PRESETS } from "../../types";
import { Image as ImageIcon } from "lucide-react";

interface Props {
    state: AppState;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AppearanceSection: React.FC<Props> = ({ state, handleChange }) => {
    return (
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
                        <option value="template2">Hakem İstatistikleri</option>
                        <option value="template3">Saha Görevlileri</option>
                        <option value="template4">VAR / AVAR</option>
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
    );
};

export default AppearanceSection;
