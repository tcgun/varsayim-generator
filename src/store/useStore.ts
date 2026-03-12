import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, OfficialData, PRESETS } from '../types';

interface StoreState extends AppState {
    updateState: (name: string, value: any) => void;
    setState: (newState: Partial<AppState> | ((prev: AppState) => AppState)) => void;
    resetState: () => void;
}

export const INITIAL_STATE: AppState = {
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
    bgColor: "#42403b",
    currentPreset: "ratio-9-16",
    pattern: "dots",
    handles: {
        twitter: "varsayimcom",
        instagram: "varsayimcom",
        facebook: "varsayimcom",
        youtube: "varsayimcom",
        tiktok: "varsayimcom",
        website: "varsayim.com",
    },
    showMatchInfo: true,
    showBrandingBar: true,
    template: "template2",
    theme: "varsayim",
    showObserver: true,
    showRepresentative: true,
    showVar: true,
    showAvar: true,
    showPositionBox: true,
    positionText: "Ceza Sahası İçi",
    positionMinute: "57'",
    positionLabel: "DAKİKA",
    refereeDecision: "PENALTI",
    showMinute: true,
    contentLayout: "compact",
    showSponsor: false,
    sponsorName: "Sponsorunuz",
    showAuthorImage: true,
    authorImageX: 50,
    authorImageY: 50,
    authorImageScale: 1,
    stats: {},
    officials: {
        referee: { name: "Bahattin Duran", x: 50, y: 50, scale: 1 },
        assistant1: { name: "Ceyhun Sesigüzel", x: 50, y: 50, scale: 1 },
        assistant2: { name: "Erdem Bayık", x: 50, y: 50, scale: 1 },
        fourthOfficial: { name: "Yiğit Arslan", x: 50, y: 50, scale: 1 },
        var: { name: "Mustafa İlker Coşkun", x: 50, y: 50, scale: 1 },
        avar: { name: "Serkan Çimen", x: 50, y: 50, scale: 1 },
        observer: { name: "Yunus Yıldırım", x: 50, y: 50, scale: 1 },
        representative1: { name: "Mehmet Tunçak", x: 50, y: 50, scale: 1 },
        representative2: { name: "Kirami Çelik", x: 50, y: 50, scale: 1 },
        representative3: { name: "Levent Kalkan", x: 50, y: 50, scale: 1 },
        representative4: { name: "Ferzende Emre", x: 50, y: 50, scale: 1 },
    },
    fontSizeMultiplier: 1
};

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,

            updateState: (name, value) => {
                set((state) => {
                    if (name.includes('.')) {
                        const keys = name.split('.');
                        const newState = { ...state };
                        let current: any = newState;
                        for (let i = 0; i < keys.length - 1; i++) {
                            current[keys[i]] = { ...current[keys[i]] };
                            current = current[keys[i]];
                        }
                        current[keys[keys.length - 1]] = value;
                        return newState;
                    }
                    return { [name]: value };
                });
            },

            setState: (updater) => {
                set((state) => {
                    if (typeof updater === 'function') {
                        return updater(state);
                    }
                    return { ...updater };
                });
            },

            resetState: () => set(INITIAL_STATE),
        }),
        {
            name: 'varsayim_state',
            storage: createJSONStorage(() => localStorage),
            // Custom merge to ensure defaults for new properties
            merge: (persistedState: any, currentState) => {
                if (!persistedState) return currentState;
                const merged = {
                    ...currentState,
                    ...persistedState,
                    handles: { ...currentState.handles, ...(persistedState.handles || {}) },
                    stats: { ...currentState.stats, ...(persistedState.stats || {}) },
                    officials: { ...currentState.officials, ...(persistedState.officials || {}) },
                };

                // Validate currentPreset exists in PRESETS
                if (!PRESETS[merged.currentPreset]) {
                    merged.currentPreset = INITIAL_STATE.currentPreset;
                }

                return merged;
            }
        }
    )
);
