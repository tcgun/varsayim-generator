import React from "react";
import { FONT_WEIGHT_OPTIONS, FontWeightOption } from "../../types";

interface Props {
    label: string;
    value: FontWeightOption;
    onChange: (val: FontWeightOption) => void;
    accentColor?: "yellow" | "pink" | "black";
}

const FontWeightPicker: React.FC<Props> = ({
    label,
    value,
    onChange,
    accentColor = "yellow"
}) => {
    const activeBorderClass =
        accentColor === "pink"
            ? "shadow-[2px_2px_0px_#FF5DAD]"
            : accentColor === "black"
            ? "shadow-[2px_2px_0px_#000]"
            : "shadow-[2px_2px_0px_#FFD700]";

    return (
        <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-black uppercase text-black">
                <span>{label}</span>
                <span className="bg-black text-white px-2 py-0.5 text-[9px] rounded font-mono">
                    {FONT_WEIGHT_OPTIONS.find(w => w.value === value)?.weightName || value} ({value})
                </span>
            </div>

            <div className="grid grid-cols-3 gap-1">
                {FONT_WEIGHT_OPTIONS.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onChange(opt.value)}
                            className={`px-1.5 py-1 text-left rounded transition-all flex flex-col items-start justify-between border ${
                                isSelected
                                    ? `bg-black text-white border-black ${activeBorderClass}`
                                    : "bg-white text-black border-black/20 hover:border-black hover:bg-zinc-50"
                            }`}
                        >
                            <span
                                className="text-[11px] truncate w-full"
                                style={{ fontWeight: Number(opt.value) }}
                            >
                                {opt.weightName}
                            </span>
                            <span className={`text-[8px] opacity-60 font-mono ${isSelected ? 'text-white' : 'text-black'}`}>
                                {opt.value}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FontWeightPicker;
