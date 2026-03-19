const fs = require('fs');
const file = 'src/components/Template5.tsx';
let txt = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* RIGHT: DESCRIPTIONS \*\/\}[\s\S]*?(?=\{\(\!mistake\.refDecision \&\& \!mistake\.finalDecision\))/;

const newHTML = `{/* RIGHT: DESCRIPTIONS */}
                        <div className="flex-1 flex flex-row items-center justify-between p-4 md:p-6 gap-4 bg-[#1a1a1a] relative overflow-hidden">
                            {/* DECISIONS COLUMN */}
                            <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                                {mistake.refDecision && (
                                    <div className="flex flex-col gap-0.5 relative z-10">
                                        <span className="text-[12px] md:text-[14px] text-white/40 font-bold uppercase tracking-widest">HAKEM KARARI</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                                            <span style={{ fontSize: \`\${rowDescPx}px\` }} className="text-white/80 font-bold uppercase tracking-wide">
                                                {mistake.refDecision}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {mistake.finalDecision && (
                                    <div className="flex flex-col gap-0.5 relative z-10">
                                        <span className="text-[12px] md:text-[14px] text-[#FFD700]/60 font-bold uppercase tracking-widest">NET KARAR</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                                            <span style={{ fontSize: \`\${rowDescPx}px\` }} className="text-[#FFD700] font-black uppercase tracking-wide">
                                                {mistake.finalDecision}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* DETAILS COLUMN (VAR & KART) */}
                            {(mistake.cardPlayer || mistake.varIntervention) && (
                                <div className="flex flex-col items-end justify-center gap-3 shrink-0 ml-auto border-l-2 border-white/5 pl-4 md:pl-6 max-w-[45%]">
                                    {mistake.varIntervention && (
                                        <div className="flex flex-col items-end gap-1 text-right">
                                            <span className="text-[11px] md:text-[12px] text-sky-400/50 font-bold uppercase tracking-widest">VAR MÜDAHALESİ</span>
                                            <div className="bg-sky-500/10 border border-sky-500/30 px-3 py-1.5 rounded-md shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                                                <span style={{ fontSize: \`\${rowDescPx * 0.85}px\` }} className="text-sky-400 font-bold uppercase tracking-wide">
                                                    {mistake.varIntervention}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {mistake.cardPlayer && (
                                        <div className="flex flex-col items-end gap-1 text-right">
                                            <span className="text-[11px] md:text-[12px] text-red-100/40 font-bold uppercase tracking-widest">HATALI/EKSİK KART</span>
                                            <div className="bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-[0_0_10px_rgba(239,68,68,0.1)] min-w-0">
                                                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                                                    <div className="absolute w-2.5 h-3.5 bg-red-500 rounded-[1px] border border-black rotate-[15deg] shadow-sm ml-1" />
                                                    <div className="absolute w-2.5 h-3.5 bg-yellow-400 rounded-[1px] border border-black -rotate-[10deg] -ml-2 shadow-sm" />
                                                </div>
                                                <span style={{ fontSize: \`\${rowDescPx * 0.85}px\` }} className="text-red-100 font-bold uppercase tracking-wide truncate">
                                                    {mistake.cardPlayer}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        `;

if (txt.match(regex)) {
    fs.writeFileSync(file, txt.replace(regex, newHTML));
    console.log("REPLACED SUCCESSFULLY!");
} else {
    console.log("MATCH NOT FOUND!");
}
