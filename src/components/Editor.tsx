"use client";

import React from "react";
import { AppState } from "../types";
import AppearanceSection from "./editor/AppearanceSection";
import Template1Form from "./editor/Template1Form";
import Template2Form from "./editor/Template2Form";
import Template3Form from "./editor/Template3Form";
import BrandingSection from "./editor/BrandingSection";
import SponsorSection from "./editor/SponsorSection";

interface Props {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    isMobile?: boolean;
}

const Editor: React.FC<Props> = ({ state, setState }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const val = type === "checkbox" ? target.checked : value;
        setState((prev) => ({ ...prev, [name]: val }));
    };

    const renderTemplateForm = () => {
        switch (state.template) {
            case "template1":
                return <Template1Form state={state} handleChange={handleChange} />;
            case "template2":
                return <Template2Form state={state} setState={setState} handleChange={handleChange} />;
            case "template3":
            case "template4":
                return <Template3Form state={state} setState={setState} handleChange={handleChange} />;
            default:
                return (
                    <div className="space-y-6">
                        <div className="bg-v-yellow/10 p-6 border-2 border-black rounded-brutal text-center space-y-2">
                            <p className="text-sm font-black uppercase text-black">ÖZEL FORM HAZIRLANIYOR</p>
                            <p className="text-[10px] font-bold uppercase text-black/50 italic">
                                Bu şablon için dile getirdiğiniz özel form yapısı yakında eklenecektir.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full md:w-[480px] md:flex-none h-full overflow-y-auto p-6 space-y-8 bg-white border-r-brutal border-black min-w-0">
            {/* Görünüm & Tasarım Ayarları */}
            <AppearanceSection state={state} handleChange={handleChange} />

            {/* Şablona Özel İçerik Editörü */}
            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase text-v-pink underline decoration-4">İçerik Editörü</h3>
                {renderTemplateForm()}
            </div>

            {/* Sosyal Medya & Marka Ayarları */}
            <div className="space-y-8 pb-24">
                <BrandingSection state={state} handleChange={handleChange} />
                <SponsorSection state={state} setState={setState} handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Editor;
