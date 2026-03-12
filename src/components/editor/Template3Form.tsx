import React from "react";
import { useStore } from "../../store/useStore";
import MatchInfoSection from "./MatchInfoSection";
import PhotoControl from "./Common/PhotoControl";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Template3Form: React.FC<Props> = ({ handleChange }) => {
    const {
        author,
        officials,
        showObserver,
        showRepresentative,
        showVar,
        showAvar,
        template,
        setState
    } = useStore();

    return (
        <div className="space-y-6">
            <div className="bg-black text-white p-4 border-2 border-black rounded-brutal shadow-brutal flex items-center gap-3">
                <div className="bg-v-yellow text-black p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4 className="font-black uppercase tracking-tighter text-v-yellow">MAÇ GÖREVLİLERİ</h4>
            </div>

            <MatchInfoSection handleChange={handleChange} title="Maç Bilgileri" showLabel="" />

            {/* Saha Hakemleri */}
            <div className="space-y-4 animate-in fade-in duration-300">
                <label className="block space-y-1">
                    <span className="font-bold text-[10px] uppercase opacity-60">MAÇIN HAKEMİ</span>
                    <input
                        type="text"
                        name="officials.referee.name"
                        value={officials.referee?.name || ""}
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
                            name="officials.assistant1.name"
                            value={officials.assistant1?.name || ""}
                            onChange={handleChange}
                            className="brutal-input h-10 text-sm font-bold uppercase"
                            placeholder="YARDIMCI 1"
                        />
                    </label>
                    <label className="block space-y-1">
                        <span className="font-bold text-[10px] uppercase opacity-60">Yardımcı Hakem 2</span>
                        <input
                            type="text"
                            name="officials.assistant2.name"
                            value={officials.assistant2?.name || ""}
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
                        name="officials.fourthOfficial.name"
                        value={officials.fourthOfficial?.name || ""}
                        onChange={handleChange}
                        className="brutal-input h-10 text-sm font-black uppercase"
                        placeholder="4. HAKEM"
                    />
                </label>
            </div>

            {/* VAR / AVAR Bölümü */}
            <div className="space-y-6 pt-4 border-t border-black/10">
                <div className="flex items-center justify-between">
                    <h4 className="font-black uppercase tracking-tighter text-v-pink underline decoration-2">VAR ODASI & GÖREVLİLER</h4>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <span className="text-[10px] font-bold opacity-60">VAR</span>
                            <input type="checkbox" name="showVar" checked={showVar} onChange={handleChange} className="accent-v-pink" />
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <span className="text-[10px] font-bold opacity-60">AVAR</span>
                            <input type="checkbox" name="showAvar" checked={showAvar} onChange={handleChange} className="accent-v-pink" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <PhotoControl
                        label="VAR Hakemi"
                        image={officials.var?.image}
                        x={officials.var?.x ?? 50}
                        y={officials.var?.y ?? 50}
                        scale={officials.var?.scale}
                        onUpdate={(data) => setState(prev => ({
                            ...prev,
                            officials: {
                                ...prev.officials,
                                var: { ...prev.officials.var, ...data as any }
                            }
                        }))}
                        accentColor="v-pink"
                        showControls={template === 'template4'}
                    />
                    <div className="space-y-4">
                        <label className="block space-y-1">
                            <span className="font-bold text-[10px] uppercase opacity-60">VAR ADI</span>
                            <input type="text" name="officials.var.name" value={officials.var?.name || ""} onChange={handleChange} className="brutal-input h-10 text-xs font-bold uppercase" placeholder="VAR İSMİ" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <PhotoControl
                        label="AVAR Hakemi"
                        image={officials.avar?.image}
                        x={officials.avar?.x ?? 50}
                        y={officials.avar?.y ?? 50}
                        scale={officials.avar?.scale}
                        onUpdate={(data) => setState(prev => ({
                            ...prev,
                            officials: {
                                ...prev.officials,
                                avar: { ...prev.officials.avar, ...data as any }
                            }
                        }))}
                        accentColor="v-pink"
                        showControls={template === 'template4'}
                    />
                    <div className="space-y-4">
                        <label className="block space-y-1">
                            <span className="font-bold text-[10px] uppercase opacity-60">AVAR ADI</span>
                            <input type="text" name="officials.avar.name" value={officials.avar?.name || ""} onChange={handleChange} className="brutal-input h-10 text-xs font-bold uppercase" placeholder="AVAR İSMİ" />
                        </label>
                    </div>
                </div>

                {/* Gözlemci / Temsilci */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-[10px] uppercase opacity-60">GÖZLEMCİ</span>
                            <input type="checkbox" name="showObserver" checked={showObserver} onChange={handleChange} className="accent-black" />
                        </div>
                        {showObserver && (
                            <div className="space-y-2">
                                <input type="text" name="officials.observer.name" value={officials.observer?.name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="İSİM" />
                                <PhotoControl
                                    label="FOTO"
                                    image={officials.observer?.image}
                                    x={officials.observer?.x ?? 50}
                                    y={officials.observer?.y ?? 50}
                                    scale={officials.observer?.scale}
                                    onUpdate={(data) => setState(prev => ({
                                        ...prev,
                                        officials: {
                                            ...prev.officials,
                                            observer: { ...prev.officials.observer, ...data as any }
                                        }
                                    }))}
                                    accentColor="black"
                                    showControls={template === 'template4'}
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-[10px] uppercase opacity-60">TEMSİLCİ</span>
                            <input type="checkbox" name="showRepresentative" checked={showRepresentative} onChange={handleChange} className="accent-black" />
                        </div>
                        {showRepresentative && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                        <input type="text" name="officials.representative1.name" value={officials.representative1?.name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 1" />
                                        <PhotoControl
                                            label="FOTO 1"
                                            image={officials.representative1?.image}
                                            x={officials.representative1?.x ?? 50}
                                            y={officials.representative1?.y ?? 50}
                                            scale={officials.representative1?.scale}
                                            onUpdate={(data) => setState(prev => ({
                                                ...prev,
                                                officials: {
                                                    ...prev.officials,
                                                    representative1: { ...prev.officials.representative1, ...data as any }
                                                }
                                            }))}
                                            accentColor="black"
                                            showControls={template === 'template4'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="officials.representative2.name" value={officials.representative2?.name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 2" />
                                        <PhotoControl
                                            label="FOTO 2"
                                            image={officials.representative2?.image}
                                            x={officials.representative2?.x ?? 50}
                                            y={officials.representative2?.y ?? 50}
                                            scale={officials.representative2?.scale}
                                            onUpdate={(data) => setState(prev => ({
                                                ...prev,
                                                officials: {
                                                    ...prev.officials,
                                                    representative2: { ...prev.officials.representative2, ...data as any }
                                                }
                                            }))}
                                            accentColor="black"
                                            showControls={template === 'template4'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="officials.representative3.name" value={officials.representative3?.name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 3" />
                                        <PhotoControl
                                            label="FOTO 3"
                                            image={officials.representative3?.image}
                                            x={officials.representative3?.x ?? 50}
                                            y={officials.representative3?.y ?? 50}
                                            scale={officials.representative3?.scale}
                                            onUpdate={(data) => setState(prev => ({
                                                ...prev,
                                                officials: {
                                                    ...prev.officials,
                                                    representative3: { ...prev.officials.representative3, ...data as any }
                                                }
                                            }))}
                                            accentColor="black"
                                            showControls={template === 'template4'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="text" name="officials.representative4.name" value={officials.representative4?.name || ""} onChange={handleChange} className="brutal-input h-8 text-[10px] font-bold uppercase" placeholder="TEMSİLCİ 4" />
                                        <PhotoControl
                                            label="FOTO 4"
                                            image={officials.representative4?.image}
                                            x={officials.representative4?.x ?? 50}
                                            y={officials.representative4?.y ?? 50}
                                            scale={officials.representative4?.scale}
                                            onUpdate={(data) => setState(prev => ({
                                                ...prev,
                                                officials: {
                                                    ...prev.officials,
                                                    representative4: { ...prev.officials.representative4, ...data as any }
                                                }
                                            }))}
                                            accentColor="black"
                                            showControls={template === 'template4'}
                                        />
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
