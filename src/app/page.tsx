"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppState, PRESETS } from "../types";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { toPng } from "html-to-image";

const INITIAL_STATE: AppState = {
  comment: "Penaltı yok. Hücum faulü var.",
  highlight: "Penaltı yok.",
  author: "Bahattin Duran",
  homeTeam: "Kasımpaşa",
  awayTeam: "Samsunspor",
  score: "0-1",
  minute: "57",
  date: "01.02.2026",
  separator: "·",
  bgColor: "#F3F4F6",
  currentPreset: "ig-square",
  pattern: "dots",
  handleX: "varsayimcom",
  handleInstagram: "varsayimcom",
  handleFacebook: "varsayimcom",
  handleYoutube: "varsayimcom",
  website: "varsayim.com",
  showIcon: true,
  selectedIcon: "🚨",
  showMatchInfo: true,
  showBrandingBar: true,
  sticker: "none",
  template: "template1",
  theme: "default",
  showPositionBox: true,
  positionText: "Ceza Sahası İçi",
  positionMinute: "57'",
  showSponsor: false,
  sponsorName: "Sponsorunuz",
};

type Tab = 'editor' | 'preview';

export default function Home() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const captureRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("varsayim_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState({ ...INITIAL_STATE, ...parsed });
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("varsayim_state", JSON.stringify(state));
    }
  }, [state, mounted]);

  const handleDownload = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `varsayim-${state.currentPreset}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("Görsel oluşturulurken bir hata oluştu.");
    }
  };

  const handleSavePreset = () => {
    localStorage.setItem("varsayim_state", JSON.stringify(state));
    alert("Ayarlar başarıyla kaydedildi!");
  };

  if (!mounted) return (
    <div className="h-dvh w-screen flex items-center justify-center bg-v-gray">
      <div className="text-2xl font-black italic tracking-tighter animate-pulse">VARSAYIM LABS</div>
    </div>
  );

  return (
    <main className="flex flex-col md:flex-row h-dvh w-full bg-v-gray text-black overflow-hidden font-sans">

      {/* Mobile Tab Switcher */}
      <div className="md:hidden shrink-0 flex items-center justify-between p-2 bg-white border-b-brutal border-black z-50">
        <div className="flex bg-v-gray p-1 rounded-brutal border-2 border-black/10 mx-auto">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-2 rounded-lg font-black italic upppercase transition-all ${activeTab === 'editor' ? 'bg-black text-white shadow-lg' : 'text-black/50 hover:text-black'}`}
          >
            EDİTÖR
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-2 rounded-lg font-black italic upppercase transition-all ${activeTab === 'preview' ? 'bg-v-pink text-white shadow-lg' : 'text-black/50 hover:text-black'}`}
          >
            ÖNİZLEME
          </button>
        </div>
      </div>

      {/* Editor Panel */}
      <div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} md:flex order-1 w-full md:w-96 lg:w-[400px] h-full flex-col z-10 shadow-xl border-r-brutal border-black bg-white`}>
        <div className="flex-1 overflow-y-auto pb-40 md:pb-32">
          <Editor
            state={state}
            setState={setState}
            onDownload={handleDownload}
            onSavePreset={handleSavePreset}
            isMobile={true}
          />
        </div>
      </div>

      {/* Preview Area */}
      <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex order-2 flex-1 h-full overflow-hidden flex-col relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat p-0 md:p-10 mb-0`}>
        <Preview state={state} domRef={captureRef} />
      </div>

      {/* Global Bottom Buttons (Mobile: Fixed Full Width, Desktop: Included in Editor or Specific Area) */}
      <div className={`${activeTab === 'editor' ? 'grid' : 'hidden'} md:grid fixed md:absolute bottom-0 left-0 right-0 md:left-0 md:right-auto md:w-96 lg:w-[400px] bg-white border-t-brutal border-black p-4 grid-cols-2 gap-4 z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.1)]`}>
        <button
          onClick={handleDownload}
          className="brutal-button bg-black text-white hover:bg-v-pink py-4 transition-all"
        >
          PNG İNDİR
        </button>
        <button
          onClick={handleSavePreset}
          className="brutal-button bg-v-yellow hover:bg-black hover:text-white py-4 transition-all"
        >
          KAYDET
        </button>
      </div>

      {/* Mobile Preview Action Button */}
      {activeTab === 'preview' && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
          <button
            onClick={handleDownload}
            className="brutal-button bg-black text-white hover:bg-v-pink py-3 px-8 text-lg shadow-2xl animate-bounce"
          >
            GÖRSELİ İNDİR
          </button>
        </div>
      )}

    </main>
  );
}
