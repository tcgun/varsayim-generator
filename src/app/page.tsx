"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { toPng } from "html-to-image";

type Tab = 'editor' | 'preview';

export default function Home() {
  const state = useStore();
  const [mounted, setMounted] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    // Zustand's persist middleware handles localStorage automatically.
    // We just show a confirmation here to maintain UX.
    alert("Ayarlar otomatik olarak kaydedildi!");
  };

  if (!mounted) return (
    <div className="h-dvh w-screen flex items-center justify-center bg-v-gray text-black font-bold italic">
      VARSAYIM LABS
    </div>
  );

  return (
    <main className="min-h-dvh bg-v-gray flex flex-col md:flex-row overflow-hidden relative">
      <Editor />
      <Preview
        domRef={captureRef}
        onSavePreset={handleSavePreset}
        onDownload={handleDownload}
      />
    </main>
  );
}
