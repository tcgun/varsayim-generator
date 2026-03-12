import React from "react";
import { AppState } from "../../types";
import MatchInfoSection from "./MatchInfoSection";
import PhotoControl from "./Common/PhotoControl";

interface Props {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Template3Form: React.FC<Props> = ({ state, setState, handleChange }) => {
    return (
        <div className="space-y-6">
            <div className="bg-black text-white p-4 border-2 border-black rounded-brutal shadow-brutal flex items-center gap-3">
                <div className="bg-v-yellow text-black p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4 className="font-black uppercase tracking-tighter text-v-yellow">MAÇ GÖREVLİLERİ</h4>
            </div>

            <MatchInfoSection state={state} handleChange={handleChange} title="Maç Bilgileri" showLabel="" />

            {/* Saha Hakemleri (Sadece T3 için gösterilebilir ama ikisi de kullanıyor şu an) */}
            <div className="space-y-4 animate-in fade-in duration-300">
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] uppercase opacity-60">MAÇIN HAKEMİ</span>
                    <input
                        type="text"
                        name="author"
                        value={state.author || ""}
                        onChange={handleChange}
                        className="brutal-input h-10 text-sm font-black uppercase"
                        placeholder="HAKEM İSMİ"
                    />
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Yardımcı Hakem 1</span>
                        <input
                            type="text"
                            name="assistant1Name"
                            value={state.assistant1Name || ""}
                            onChange={handleChange}
                            className="brutal-input h-10 text-sm font-bold uppercase"
                            placeholder="YARDIMCI 1"
                        />
                    </label>
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Yardımcı Hakem 2</span>
                        <input
                            type="text"
                            name="assistant2Name"
                            value={state.assistant2Name || ""}
                            onChange={handleChange}
                            className="brutal-input h-10 text-sm font-bold uppercase"
                            placeholder="YARDIMCI 2"
                        />
                    </label>
                </div>

                <label className="block space-y-1">
                    <span className="font-bold text-[10px] uppercase opacity-60">Dördüncü Hakem</span>
                    <input
                        type="text"
                        name="fourthOfficialName"
                        value={state.fourthOfficialName || ""}
                        onChange={handleChange}
                        className="brutal-input h-10 text-sm font-bold uppercase"
                        placeholder="4. HAKEM"
                    />
                </label>
            </div>

            {/* VAR / AVAR Bölümü */}
            <div className="space-y-6 pt-4 border-t border-black/10">
                <h4 className="font-black uppercase tracking-tighter text-v-pink underline decoration-2">VAR ODASI & GÖREVLİLER</h4>

                <div className="grid grid-cols-2 gap-4">
                    <PhotoControl
                        label="VAR Hakemi"
                        imageKey="varImage"
                        xKey="varX"
                        yKey="varY"
                        scaleKey="varScale"
                        state={state}
                        setState={setState}
                        accentColor="v-pink"
                        showControls={state.template === 'template4'}
                    />
                    <div className="space-y-4">
                        <label className="block space-y-1">
                            <span className="font-bold text-[10px] uppercase opacity-60">VAR ADI</span>
                            <input type="text" name="varName" value={state.varName || ""} onChange={handleChange} className="brutal-input h-10 text-xs font-bold uppercase" placeholder="VAR İSMİ" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <PhotoControl
                        label="AVAR Hakemi"
                        imageKey="avarImage"
                        xKey="avarX"
                        yKey="avarY"
                        scaleKey="avarScale"
                        state={state}
                        setState={setState}
                        accentColor="v-pink"
                        showControls={state.template === 'template4'}
                    />
                    <div className="space-y-4">
                        <label className="block space-y-1">
                            <span className="font-bold text-[10px] uppercase opacity-60">AVAR ADI</span>
                            <input type="text" name="avarName" value={state.avarName || ""} onChange={handleChange} className="brutal-input h-10 text-xs font-bold uppercase" placeholder="AVAR İSMİ" />
                        </label>
                    </div>
                </div>

                {/* Gözlemci / Temsilci */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-[10px] uppercase opacity-60">GÖZLEMCİ</span>
                            <input type="checkbox" name="showObserver" checked={state.showObserver} onChange={handleChange} className="accent-black" />
                        </div>
                        {state.showObserver && (
                            <div className="space-y-2">
                                <input type="text" name="observerName" value={state.observerName || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="İSİM" />
                                <PhotoControl label="FOTO" imageKey="observerImage" xKey="observerX" yKey="observerY" scaleKey="observerScale" state={state} setState={setState} accentColor="black" showControls={state.template === 'template4'} />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-[10px] uppercase opacity-60">TEMSİLCİ</span>
                            <input type="checkbox" name="showRepresentative" checked={state.showRepresentative} onChange={handleChange} className="accent-black" />
                        </div>
                        {state.showRepresentative && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                        <input type="text" name="representativeName" value={state.representativeName || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 1" />
                                        <PhotoControl label="FOTO 1" imageKey="representativeImage" xKey="rep1X" yKey="rep1Y" scaleKey="rep1Scale" state={state} setState={setState} accentColor="black" showControls={state.template === 'template4'} />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="representative2Name" value={state.representative2Name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 2" />
                                        <PhotoControl label="FOTO 2" imageKey="representative2Image" xKey="rep2X" yKey="rep2Y" scaleKey="rep2Scale" state={state} setState={setState} accentColor="black" showControls={state.template === 'template4'} />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="representative3Name" value={state.representative3Name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 3" />
                                        <PhotoControl label="FOTO 3" imageKey="representative3Image" xKey="rep3X" yKey="rep3Y" scaleKey="rep3Scale" state={state} setState={setState} accentColor="black" showControls={state.template === 'template4'} />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="representative4Name" value={state.representative4Name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 4" />
                                        <PhotoControl label="FOTO 4" imageKey="representative4Image" xKey="rep4X" yKey="rep4Y" scaleKey="rep4Scale" state={state} setState={setState} accentColor="black" showControls={state.template === 'template4'} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template3Form;
