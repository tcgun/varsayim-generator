export type PresetDimensions = {
  width: number;
  height: number;
  name: string;
  category: "Instagram" | "Twitter";
};

export const PRESETS: Record<string, PresetDimensions> = {
  "ig-square": { width: 1080, height: 1080, name: "Kare (1:1)", category: "Instagram" },
  "ig-portrait": { width: 1080, height: 1350, name: "Dikey (4:5)", category: "Instagram" },
  "ig-story": { width: 1080, height: 1920, name: "Story (9:16)", category: "Instagram" },
  "tw-landscape": { width: 1600, height: 900, name: "Yatay (16:9)", category: "Twitter" },
  "tw-post": { width: 1200, height: 675, name: "Post (16:9)", category: "Twitter" },
};

export interface AppState {
  comment: string;
  highlight: string;
  author: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  minute: string;
  date: string;
  separator: "·" | "—";
  bgColor: string;
  currentPreset: string;
  pattern: "none" | "dots" | "grid" | "noise";
  handleX: string;
  handleInstagram: string;
  handleFacebook: string;
  handleYoutube: string;
  website: string;
  showIcon: boolean;
  selectedIcon: string;
  showMatchInfo: boolean;
  showBrandingBar: boolean;
  authorImage?: string;
  sticker: "none" | "gol" | "var" | "ofsayt" | "penalti" | "kirmizi";
  template: "template1" | "template2" | "template3";
  theme: "default" | "gs" | "fb" | "bjk" | "ts" | "basak" | "kasimpasa" | "eyup" | "goztepe" | "samsun" | "hatay" | "rize" | "sivas" | "konya" | "antalya" | "alanya" | "kayseri" | "bodrum" | "gaziantep";
  showPositionBox: boolean;
  positionText: string;
  positionMinute: string;
  showSponsor: boolean;
  sponsorName: string;
  sponsorLogo?: string;
}
