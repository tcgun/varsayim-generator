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
  authorTitle: "VARSAYIM ÖZEL YORUMCU",
  homeTeam: "Kasımpaşa",
  awayTeam: "Samsunspor",
  score: "0-1",
  minute: "57",
  matchWeek: "24. HAFTA",
  date: "02.02.2026",
  separator: "·",
  bgColor: "#F3F4F6",
  currentPreset: "ig-story",
  pattern: "dots",
  handleX: "varsayimcom",
  handleInstagram: "varsayimcom",
  handleFacebook: "varsayimcom",
  handleYoutube: "varsayimcom",
  website: "varsayim.com",
  showMatchInfo: true,
  showBrandingBar: true,
  template: "template2",
  theme: "default",
  showPositionBox: true,
  positionText: "Ceza Sahası İçi",
  positionMinute: "57'",
  positionLabel: "DAKİKA",
  showMinute: true,
  contentLayout: "compact",
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
    <div className="h-dvh w-screen flex items-center justify-center bg-v-gray text-black font-bold italic">
      VARSAYIM LABS
    </div>
  );

  return (
    <main className="min-h-dvh bg-v-gray flex flex-col md:flex-row overflow-hidden relative">
      <Editor
        state={state}
        setState={setState}
        onSavePreset={handleSavePreset}
        onDownload={handleDownload}
      />
      <Preview
        state={state}
        domRef={captureRef}
      />
    </main>
  );
}
