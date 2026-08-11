import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, PRESETS } from '../types';

interface StoreState extends AppState {
    updateState: (name: string, value: unknown) => void;
    setState: (newState: Partial<AppState> | ((prev: AppState) => AppState)) => void;
    resetState: () => void;
    resetAllPhotos: () => void;
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
    showAvar2: false,
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
    matchMistakes: [
        {
            id: "1",
            minute: "15'",
            title: "PENALTI BEKLENTİSİ",
            description1: "Hakem devam dedi",
            description2: "VAR müdahalesi olmadı",
            description3: "Yanlış karar"
        },
        {
            id: "2",
            minute: "45+2'",
            title: "KIRMIZI KART",
            description1: "İkinci sarı kart",
            description2: "Doğru karar",
            description3: ""
        }
    ],
    showNextPageIndicator: false,
    officials: {
        referee: { name: "Bahattin Duran", x: 50, y: 50, scale: 1 },
        assistant1: { name: "Ceyhun Sesigüzel", x: 50, y: 50, scale: 1 },
        assistant2: { name: "Erdem Bayık", x: 50, y: 50, scale: 1 },
        fourthOfficial: { name: "Yiğit Arslan", x: 50, y: 50, scale: 1 },
        var: { name: "Mustafa İlker Coşkun", x: 50, y: 50, scale: 1 },
        avar: { name: "Serkan Çimen", x: 50, y: 50, scale: 1 },
        avar2: { name: "İbrahim Çağlar Uyarcan", x: 50, y: 50, scale: 1 },
        observer: { name: "Yunus Yıldırım", x: 50, y: 50, scale: 1 },
        representative1: { name: "Mehmet Tunçak", x: 50, y: 50, scale: 1 },
        representative2: { name: "Kirami Çelik", x: 50, y: 50, scale: 1 },
        representative3: { name: "Levent Kalkan", x: 50, y: 50, scale: 1 },
        representative4: { name: "Ferzende Emre", x: 50, y: 50, scale: 1 },
    },
    fontSizeMultiplier: 1,
    headingFontWeight: "900",
    bodyFontWeight: "700",
    titleFontWeight: "900",
    matchInfoFontWeight: "700",
    decisionFontWeight: "900",
    commentFontWeight: "700",
    authorFontWeight: "900",
    brandingFontWeight: "700",
    brandingFontSizeMultiplier: 1,
    sponsorFontWeight: "900",
    fixtureFontWeight: "700",
    fontStyle: "normal",
    commentFontStyle: "normal",

    fixtureData: {
        leagueName: "SÜPER LİG",
        weekTitle: "25. HAFTA FİKSTÜRÜ",
        byeTeam: "BAY GEÇEN TAKIM | KASIMPAŞA",
        note: "Tüm maç anlatımları ve puan durumu varsayim.com'da",
        matches: [
            { id: "1", dateGroup: "6 MAYIS CUMARTESİ", homeTeam: "Antalyaspor", timeOrScore: "19.00", awayTeam: "Beşiktaş" },
            { id: "2", dateGroup: "6 MAYIS CUMARTESİ", homeTeam: "Adana Demirspor", timeOrScore: "21.00", awayTeam: "Alanyaspor" },
            { id: "3", dateGroup: "7 MAYIS PAZAR", homeTeam: "Ümraniyespor", timeOrScore: "13.30", awayTeam: "Sivasspor" },
            { id: "4", dateGroup: "7 MAYIS PAZAR", homeTeam: "Konyaspor", timeOrScore: "16.00", awayTeam: "Kayserispor" },
            { id: "5", dateGroup: "7 MAYIS PAZAR", homeTeam: "Giresunspor", timeOrScore: "19.00", awayTeam: "Fenerbahçe" },
            { id: "6", dateGroup: "8 MAYIS PAZARTESİ", homeTeam: "Galatasaray", timeOrScore: "20.00", awayTeam: "Başakşehir" },
            { id: "7", dateGroup: "8 MAYIS PAZARTESİ", homeTeam: "Trabzonspor", timeOrScore: "20.00", awayTeam: "Ankaragücü" },
        ]
    }
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
                        let current: Record<string, unknown> = newState as unknown as Record<string, unknown>;
                        for (let i = 0; i < keys.length - 1; i++) {
                            current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
                            current = current[keys[i]] as Record<string, unknown>;
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
            
            resetAllPhotos: () => set((state) => {
                const newOfficials = { ...state.officials };
                // Keep the names and positions but remove the images
                Object.keys(newOfficials).forEach(key => {
                    const officialKey = key as keyof typeof newOfficials;
                    if (newOfficials[officialKey]) {
                        newOfficials[officialKey] = {
                            ...newOfficials[officialKey]!,
                            image: undefined,
                            x: 50,
                            y: 50,
                            scale: 1
                        };
                    }
                });
                return { officials: newOfficials };
            }),
        }),
        {
            name: 'varsayim_state',
            storage: createJSONStorage(() => localStorage),
            // Custom merge to ensure defaults for new properties
            merge: (persistedState: unknown, currentState) => {
                if (!persistedState) return currentState;
                const pState = persistedState as Partial<AppState>;
                const merged = {
                    ...currentState,
                    ...pState,
                    handles: { ...currentState.handles, ...(pState.handles || {}) },
                    stats: { ...currentState.stats, ...(pState.stats || {}) },
                    officials: { ...currentState.officials, ...(pState.officials || {}) },
                    matchMistakes: pState.matchMistakes || currentState.matchMistakes,
                    showNextPageIndicator: pState.showNextPageIndicator ?? currentState.showNextPageIndicator,
                    headingFontWeight: pState.headingFontWeight || currentState.headingFontWeight || "900",
                    bodyFontWeight: pState.bodyFontWeight || currentState.bodyFontWeight || "700",
                    titleFontWeight: pState.titleFontWeight || currentState.titleFontWeight || "900",
                    matchInfoFontWeight: pState.matchInfoFontWeight || currentState.matchInfoFontWeight || "700",
                    decisionFontWeight: pState.decisionFontWeight || currentState.decisionFontWeight || "900",
                    commentFontWeight: pState.commentFontWeight || currentState.commentFontWeight || "700",
                    authorFontWeight: pState.authorFontWeight || currentState.authorFontWeight || "900",
                    brandingFontWeight: pState.brandingFontWeight || currentState.brandingFontWeight || "700",
                    brandingFontSizeMultiplier: pState.brandingFontSizeMultiplier ?? currentState.brandingFontSizeMultiplier ?? 1,
                    sponsorFontWeight: pState.sponsorFontWeight || currentState.sponsorFontWeight || "900",
                    fixtureFontWeight: pState.fixtureFontWeight || currentState.fixtureFontWeight || "700",
                    fontStyle: pState.fontStyle || currentState.fontStyle || "normal",
                    commentFontStyle: pState.commentFontStyle || currentState.commentFontStyle || "normal",
                    fixtureData: pState.fixtureData || currentState.fixtureData,
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
