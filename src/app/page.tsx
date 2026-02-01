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

export default function Home() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [mounted, setMounted] = useState(false);
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
      // Create a temporary clone for high-res capture to avoid scaling issues? 
      // html-to-image usually handles this well with pixelRatio.
      const dataUrl = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 2, // Double quality for crispness
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
    <div className="h-screen w-screen flex items-center justify-center bg-v-gray">
      <div className="text-2xl font-black italic tracking-tighter animate-pulse">VARSAYIM LABS</div>
    </div>
  );

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-v-gray text-black overflow-hidden font-sans">
      {/* Editor Panel (Top on Mobile) */}
      <div className="order-1 md:order-1 w-full md:w-96 lg:w-[400px] h-[50vh] md:h-full flex-shrink-0 z-10 shadow-xl overflow-y-auto md:border-r-brutal border-black bg-white pb-32 md:pb-40">
        <Editor
          state={state}
          setState={setState}
          onDownload={handleDownload}
          onSavePreset={handleSavePreset}
        />
      </div>

      {/* Preview Area (Bottom on Mobile) */}
      <div className="order-2 md:order-2 flex-1 md:h-full overflow-hidden flex flex-col relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat p-2 md:p-10 border-t-brutal md:border-t-0 border-black mb-0">
        <Preview state={state} domRef={captureRef} />
      </div>

      {/* Global Bottom Buttons (Mobile: Fixed Full Width, Desktop: Fixed under Sidebar) */}
      <div className="fixed bottom-0 left-0 right-0 md:right-auto md:w-96 lg:w-[400px] bg-white border-t-brutal border-black p-4 grid grid-cols-2 gap-4 z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
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
    </main>
  );
}
