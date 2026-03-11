export type PresetDimensions = {
  width: number;
  height: number;
  name: string;
  category: "Instagram" | "Twitter" | "Facebook" | "YouTube" | "WhatsApp";
};

export const PRESETS: Record<string, PresetDimensions> = {
  // Instagram
  "ig-square": { width: 1080, height: 1080, name: "Kare (1:1)", category: "Instagram" },
  "ig-portrait": { width: 1080, height: 1350, name: "Dikey (4:5)", category: "Instagram" },
  "ig-land": { width: 1080, height: 566, name: "Yatay (1.91:1)", category: "Instagram" },
  "ig-story": { width: 1080, height: 1920, name: "Story/Reels (9:16)", category: "Instagram" },

  // Twitter (X)
  "tw-square": { width: 1080, height: 1080, name: "Kare (1:1)", category: "Twitter" },
  "tw-landscape": { width: 1600, height: 900, name: "Yatay (16:9)", category: "Twitter" },
  "tw-portrait": { width: 1080, height: 1350, name: "Dikey (4:5)", category: "Twitter" },
  "tw-video-land": { width: 1280, height: 720, name: "Video Yatay (16:9)", category: "Twitter" },
  "tw-video-vert": { width: 1080, height: 1920, name: "Video Dikey (9:16)", category: "Twitter" },

  // Facebook
  "fb-square": { width: 1080, height: 1080, name: "Kare (1:1)", category: "Facebook" },
  "fb-portrait": { width: 1080, height: 1350, name: "Dikey (4:5)", category: "Facebook" },
  "fb-land": { width: 1200, height: 630, name: "Yatay/Link (1.91:1)", category: "Facebook" },

  // YouTube
  "yt-land": { width: 1920, height: 1080, name: "Video (16:9)", category: "YouTube" },
  "yt-shorts": { width: 1080, height: 1920, name: "Shorts (9:16)", category: "YouTube" },

  // WhatsApp
  "wa-square": { width: 1080, height: 1080, name: "Foto (1:1)", category: "WhatsApp" },
  "wa-portrait": { width: 1080, height: 1920, name: "Dikey (9:16)", category: "WhatsApp" },
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
  handleTiktok: string;
  website: string;
  authorTitle: string;
  showMatchInfo: boolean;
  showBrandingBar: boolean;
  showMinute: boolean;
  contentLayout?: "compact" | "spread";
  authorImage?: string;
  showAuthorImage: boolean;
  template: "template1" | "template2" | "template3" | "template4" | "template5";
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
  refMatches?: string;
  refYellowCards?: string;
  refRedCards?: string;
  refPenalties?: string;
  refHomeWin?: string;
  refAwayWin?: string;
  refDraw?: string;
  refVarGo?: string;
  refWrongDecision?: string;
  refHomeYellow?: string;
  refAwayYellow?: string;
  refHomeRed?: string;
  refAwayRed?: string;
  refHomePenalty?: string;
  refAwayPenalty?: string;
  refFouls?: string;
  refHomeFoul?: string;
  refAwayFoul?: string;
  refVarMatches?: string;
  refAvarMatches?: string;
  refVarCalls?: string;
  // Match Officials (Template 3)
  assistant1Name?: string;
  assistant2Name?: string;
  fourthOfficialName?: string;
  varName?: string;
  avarName?: string;
  avar2Name?: string;
  observerName?: string;
  representativeName?: string;
  representative2Name?: string;
  representative3Name?: string;
  representative4Name?: string;
  // Official Images
  varImage?: string;
  avarImage?: string;
  avar2Image?: string;
  observerImage?: string;
  representativeImage?: string;
  representative2Image?: string;
  representative3Image?: string;
  representative4Image?: string;
  showObserver?: boolean;
  showRepresentative?: boolean;
  // Image Positioning
  authorImageX?: number;
  authorImageY?: number;
  authorImageScale?: number;
  // Official Photo Positioning
  varX?: number;
  varY?: number;
  varScale?: number;
  avarX?: number;
  avarY?: number;
  avarScale?: number;
  avar2X?: number;
  avar2Y?: number;
  avar2Scale?: number;
  observerX?: number;
  observerY?: number;
  observerScale?: number;
  rep1X?: number;
  rep1Y?: number;
  rep1Scale?: number;
  rep2X?: number;
  rep2Y?: number;
  rep2Scale?: number;
  rep3X?: number;
  rep3Y?: number;
  rep3Scale?: number;
  rep4X?: number;
  rep4Y?: number;
  rep4Scale?: number;
}
