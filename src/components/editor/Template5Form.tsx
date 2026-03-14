import React from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Trash2 } from 'lucide-react';

const Template5Form = () => {
    const { 
        matchMistakes,
        showNextPageIndicator,
        setState
    } = useStore();

    const handleMistakeChange = (index: number, field: string, value: string) => {
        const newMistakes = [...matchMistakes];
        newMistakes[index] = { ...newMistakes[index], [field]: value };
        setState({ matchMistakes: newMistakes });
    };

    const addMistake = () => {
        setState({
            matchMistakes: [
                ...matchMistakes,
                {
                    id: Math.random().toString(36).substr(2, 9),
                    minute: "0'",
                    title: "YENİ POZİSYON",
                    description1: "",
                    description2: "",
                    description3: "",
                    icon: "question"
                }
            ]
        });
    };

    const removeMistake = (index: number) => {
        const newMistakes = [...matchMistakes];
        newMistakes.splice(index, 1);
        setState({ matchMistakes: newMistakes });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Tartışmalı Pozisyonlar</h3>
                <button
                    onClick={addMistake}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#FFD700] text-black font-bold uppercase text-sm hover:bg-[#FFD700]/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Pozisyon Ekle
                </button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                <input
                    type="checkbox"
                    id="showNextPageIndicator"
                    checked={showNextPageIndicator}
                    onChange={(e) => setState({ showNextPageIndicator: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-zinc-900"
                />
                <label htmlFor="showNextPageIndicator" className="text-sm font-bold text-zinc-300 select-none cursor-pointer">
                    En Alt Kısımda "Devamı Diğer Sayfada" İbaresini Göster
                </label>
            </div>

            <div className="space-y-4">
                {matchMistakes.map((mistake, index) => (
                    <div key={mistake.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#FFD700] font-bold">Pozisyon {index + 1}</span>
                            <button
                                onClick={() => removeMistake(index)}
                                className="text-red-500 hover:text-red-400 p-1 transition-colors"
                                title="Sil"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Dakika</label>
                                <input
                                    type="text"
                                    value={mistake.minute}
                                    onChange={(e) => handleMistakeChange(index, 'minute', e.target.value)}
                                    className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                                    placeholder="Örn: 15'"
                                />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Pozisyon Başlığı</label>
                                <input
                                    type="text"
                                    value={mistake.title}
                                    onChange={(e) => handleMistakeChange(index, 'title', e.target.value)}
                                    className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                                    placeholder="Örn: PENALTI BEKLENTİSİ"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-zinc-400 uppercase">Karar İkonu (Dakikanın Solunda)</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`icon-${index}`}
                                        value="none"
                                        checked={!mistake.icon || mistake.icon === 'none'}
                                        onChange={(e) => handleMistakeChange(index, 'icon', e.target.value)}
                                        className="text-[#FFD700] focus:ring-[#FFD700] bg-black border-zinc-700"
                                    />
                                    <span className="text-sm font-bold text-zinc-300">Yok</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`icon-${index}`}
                                        value="check"
                                        checked={mistake.icon === 'check'}
                                        onChange={(e) => handleMistakeChange(index, 'icon', e.target.value)}
                                        className="text-[#FFD700] focus:ring-[#FFD700] bg-black border-zinc-700"
                                    />
                                    <span className="text-sm font-bold text-green-500">Doğru (✓)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`icon-${index}`}
                                        value="cross"
                                        checked={mistake.icon === 'cross'}
                                        onChange={(e) => handleMistakeChange(index, 'icon', e.target.value)}
                                        className="text-[#FFD700] focus:ring-[#FFD700] bg-black border-zinc-700"
                                    />
                                    <span className="text-sm font-bold text-red-500">Yanlış (✕)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`icon-${index}`}
                                        value="question"
                                        checked={mistake.icon === 'question'}
                                        onChange={(e) => handleMistakeChange(index, 'icon', e.target.value)}
                                        className="text-[#FFD700] focus:ring-[#FFD700] bg-black border-zinc-700"
                                    />
                                    <span className="text-sm font-bold text-blue-400">Kararsız (?)</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-zinc-400 uppercase">Açıklamalar (Maks 3 satır)</label>
                            <input
                                type="text"
                                value={mistake.description1}
                                onChange={(e) => handleMistakeChange(index, 'description1', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                                placeholder="1. Satır (Örn: Hakem devam dedi)"
                            />
                            <input
                                type="text"
                                value={mistake.description2}
                                onChange={(e) => handleMistakeChange(index, 'description2', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                                placeholder="2. Satır (Örn: VAR müdahalesi olmadı)"
                            />
                            <input
                                type="text"
                                value={mistake.description3}
                                onChange={(e) => handleMistakeChange(index, 'description3', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFD700]"
                                placeholder="3. Satır (İsteğe bağlı)"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Template5Form;
