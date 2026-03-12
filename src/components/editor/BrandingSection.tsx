import React from "react";
import { AppState } from "../../types";

interface Props {
    state: AppState;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BrandingSection: React.FC<Props> = ({ state, handleChange }) => {
    return (
        <div className="space-y-4 pt-8 border-t-2 border-black border-dashed">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase text-black">SOSYAL MEDYA / MARKA</h3>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs bg-black text-white px-2 py-1 rounded-brutal">
                    <input
                        type="checkbox"
                        name="showBrandingBar"
                        checked={state.showBrandingBar}
                        onChange={handleChange}
                        className="w-4 h-4 accent-v-yellow"
                    />
                    BARI GÖSTER
                </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">Facebook</span>
                    <input
                        type="text"
                        name="handleFacebook"
                        value={state.handleFacebook || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="varsayimcom"
                    />
                </label>
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">YouTube</span>
                    <input
                        type="text"
                        name="handleYoutube"
                        value={state.handleYoutube || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="varsayimcom"
                    />
                </label>
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">Web Sitesi</span>
                    <input
                        type="text"
                        name="website"
                        value={state.website || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="varsayim.com"
                    />
                </label>
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">X (Twitter)</span>
                    <input
                        type="text"
                        name="handleX"
                        value={state.handleX || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="@username"
                    />
                </label>
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">Instagram</span>
                    <input
                        type="text"
                        name="handleInstagram"
                        value={state.handleInstagram || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="@username"
                    />
                </label>
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] opacity-40 uppercase">TikTok</span>
                    <input
                        type="text"
                        name="handleTiktok"
                        value={state.handleTiktok || ""}
                        onChange={handleChange}
                        className="brutal-input h-8 text-xs font-bold"
                        placeholder="@username"
                    />
                </label>
            </div>
        </div>
    );
};

export default BrandingSection;
