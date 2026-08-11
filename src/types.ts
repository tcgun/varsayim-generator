export type PresetDimensions = {
  width: number;
  height: number;
  name: string;
  category: "Instagram" | "Twitter" | "Facebook" | "YouTube" | "WhatsApp";
};

export const PRESETS: Record<string, PresetDimensions> = {
  "ratio-1-1": { width: 1080, height: 1080, name: "Kare (1:1)", category: "Instagram" },
  "ratio-4-5": { width: 1080, height: 1350, name: "Portre (4:5)", category: "Instagram" },
  "ratio-9-16": { width: 1080, height: 1920, name: "Hikaye (9:16)", category: "Instagram" },
  "ratio-16-9": { width: 1920, height: 1080, name: "Yatay (16:9)", category: "Instagram" },
};

export interface OfficialData {
  name: string;
  image?: string;
  x: number;
  y: number;
  scale: number;
  show?: boolean;
}

export interface MistakeItem {
  id: string;
  minute: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  icon?: "check" | "cross" | "question" | "none";
  inc?: string;
  refDecision?: string;
  finalDecision?: string;
  cardPlayer?: string;
  varIntervention?: string;
}

export type FontWeightOption = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export const FONT_WEIGHT_OPTIONS: { label: string; value: FontWeightOption; weightName: string }[] = [
  { label: "Thin (100)", value: "100", weightName: "Thin" },
  { label: "ExtraLight (200)", value: "200", weightName: "ExtraLight" },
  { label: "Light (300)", value: "300", weightName: "Light" },
  { label: "Regular (400)", value: "400", weightName: "Regular" },
  { label: "Medium (500)", value: "500", weightName: "Medium" },
  { label: "SemiBold (600)", value: "600", weightName: "SemiBold" },
  { label: "Bold (700)", value: "700", weightName: "Bold" },
  { label: "ExtraBold (800)", value: "800", weightName: "ExtraBold" },
  { label: "Black (900)", value: "900", weightName: "Black" },
];

export interface FixtureMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  timeOrScore: string;
  dateGroup?: string;
}

export interface FixtureData {
  leagueName?: string;
  weekTitle?: string;
  byeTeam?: string;
  note?: string;
  matches: FixtureMatch[];
}

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

  // Branding & Handles
  handles: {
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    website: string;
  };

  authorTitle: string;
  showMatchInfo: boolean;
  showBrandingBar: boolean;
  showMinute: boolean;
  contentLayout?: "compact" | "spread";
  authorImage?: string;
  showAuthorImage: boolean;
  template: "template1" | "template2" | "template3" | "template4" | "template5" | "template6";
  theme: "varsayim";
  showPositionBox: boolean;
  positionText: string;
  positionMinute: string;
  positionLabel: string;
  refereeDecision: string;
  showSponsor: boolean;
  sponsorName: string;
  sponsorLogo?: string;
  matchWeek: string;

  // Referee Stats
  stats: {
    matches?: string;
    yellowCards?: string;
    redCards?: string;
    penalties?: string;
    homeWin?: string;
    awayWin?: string;
    draw?: string;
    varGo?: string;
    wrongDecision?: string;
    homeYellow?: string;
    awayYellow?: string;
    homeRed?: string;
    awayRed?: string;
    homePenalty?: string;
    awayPenalty?: string;
    fouls?: string;
    homeFoul?: string;
    awayFoul?: string;
    varMatches?: string;
    avarMatches?: string;
    varCalls?: string;
  };

  // Match Officials (Normalized)
  officials: Record<string, OfficialData>;

  showObserver?: boolean;
  showRepresentative?: boolean;
  showVar?: boolean;
  showAvar?: boolean;
  showAvar2?: boolean;

  // Template 5
  matchMistakes: MistakeItem[];
  showNextPageIndicator?: boolean;

  // Author Image Positioning
  authorImageX?: number;
  authorImageY?: number;
  authorImageScale?: number;
  fontSizeMultiplier: number;
  headingFontWeight?: FontWeightOption;
  bodyFontWeight?: FontWeightOption;
  titleFontWeight?: FontWeightOption;
  matchInfoFontWeight?: FontWeightOption;
  decisionFontWeight?: FontWeightOption;
  commentFontWeight?: FontWeightOption;
  authorFontWeight?: FontWeightOption;
  brandingFontWeight?: FontWeightOption;
  brandingFontSizeMultiplier?: number;
  sponsorFontWeight?: FontWeightOption;
  fixtureFontWeight?: FontWeightOption;
  fontStyle?: "normal" | "italic";
  commentFontStyle?: "normal" | "italic";

  // Template 6 - Fixture Data
  fixtureData: FixtureData;
}
