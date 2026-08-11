"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import AppearanceSection from "./editor/AppearanceSection";
import Template1Form from "./editor/Template1Form";
import Template2Form from "./editor/Template2Form";
import Template3Form from "./editor/Template3Form";
import Template4Form from "./editor/Template4Form";
import Template5Form from "./editor/Template5Form";
import Template6Form from "./editor/Template6Form";
import BrandingSection from "./editor/BrandingSection";
import SponsorSection from "./editor/SponsorSection";
import TypographySection from "./editor/TypographySection";
import MatchInfoSection from "./editor/MatchInfoSection";
import { Palette, Edit3, Trophy, Share2, Award, Layers } from "lucide-react";

type EditorTab = "content" | "match" | "branding" | "sponsor" | "design" | "all";

const Editor: React.FC = () => {
    const { template, updateState } = useStore();
    const [activeTab, setActiveTab] = useState<EditorTab>("content");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const val = type === "checkbox" ? target.checked : value;
        updateState(name, val);
    };

    const renderTemplateForm = () => {
        switch (template) {
            case "template1":
                return <Template1Form handleChange={handleChange} />;
            case "template2":
                return <Template2Form handleChange={handleChange} />;
            case "template3":
                return <Template3Form handleChange={handleChange} />;
            case "template4":
                return <Template4Form handleChange={handleChange} />;
            case "template5":
                return <Template5Form />;
            case "template6":
                return <Template6Form handleChange={handleChange} />;
            default:
                return (
                    <div className="space-y-6">
                        <div className="bg-v-yellow/10 p-6 border-2 border-black rounded-brutal text-center space-y-2">
                            <p className="text-sm font-black uppercase text-black">ÖZEL FORM HAZIRLANIYOR</p>
                            <p className="text-[10px] font-bold uppercase text-black/50 italic">
                                Bu şablon için özel form yapısı hazırlanmaktadır.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [
        { id: "content", label: "İçerik Editörü", icon: <Edit3 size={15} /> },
        { id: "match", label: "Maç Bilgileri", icon: <Trophy size={15} /> },
        { id: "branding", label: "Sosyal Medya", icon: <Share2 size={15} /> },
        { id: "sponsor", label: "Sponsor", icon: <Award size={15} /> },
        { id: "design", label: "Tasarım & Font", icon: <Palette size={15} /> },
        { id: "all", label: "Tümü", icon: <Layers size={15} /> },
    ];

    useEffect(() => {
        if (template === "template6" && activeTab === "match") {
            setActiveTab("content");
        }
    }, [template, activeTab]);

    return (
        <div className="w-full md:w-120 md:flex-none h-full overflow-y-auto p-6 space-y-6 bg-white border-r-brutal border-black min-w-0">
            {/* SEKMELER / BÖLÜM SEÇİMİ (TABS) */}
            <div className="space-y-2 sticky top-0 bg-white z-20 pt-1 pb-3 border-b border-black/10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-widest text-black/40">DÜZENLEME MENÜSÜ</h2>
                    <span className="text-[10px] font-bold uppercase bg-black text-white px-2 py-0.5 rounded">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-zinc-100 p-1.5 rounded-brutal border border-black">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const isDisabled = tab.id === "match" && template === "template6";

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => !isDisabled && setActiveTab(tab.id)}
                                title={isDisabled ? "Haftanın Fikstürü şablonunda Maç Bilgileri kullanılmaz" : ""}
                                className={`flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-black uppercase rounded transition-all select-none ${
                                    isDisabled
                                        ? "opacity-30 cursor-not-allowed bg-zinc-200 text-zinc-400 pointer-events-none line-through"
                                        : isActive
                                        ? "bg-black text-white shadow-[2px_2px_0px_#FFD700]"
                                        : "bg-white text-black hover:bg-zinc-200 border border-black/10"
                                }`}
                            >
                                {tab.icon}
                                <span className="truncate">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SEÇİLİ SEKMEYE GÖRE GÖRÜNTÜLEME */}
            {(activeTab === "content" || activeTab === "all") && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase text-v-pink underline decoration-4 flex items-center gap-2">
                        <Edit3 size={20} />
                        İçerik Editörü
                    </h3>
                    {renderTemplateForm()}
                </div>
            )}

            {(activeTab === "match" || activeTab === "all") && (
                <div className="space-y-4 pt-2">
                    <MatchInfoSection handleChange={handleChange} title="MAÇ BİLGİLERİ" showLabel="" />
                </div>
            )}

            {(activeTab === "branding" || activeTab === "all") && (
                <div className="space-y-4 pt-2">
                    <BrandingSection handleChange={handleChange} />
                </div>
            )}

            {(activeTab === "sponsor" || activeTab === "all") && (
                <div className="space-y-4 pt-2">
                    <SponsorSection handleChange={handleChange} />
                </div>
            )}

            {(activeTab === "design" || activeTab === "all") && (
                <div className="space-y-6 pt-2 pb-12">
                    <AppearanceSection handleChange={handleChange} />
                    <TypographySection />
                </div>
            )}
        </div>
    );
};

export default Editor;
