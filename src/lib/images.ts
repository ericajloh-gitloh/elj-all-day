/**
 * Site imagery — local assets in /public/images
 *
 * Stock photography uses Unsplash-sourced files (*-unsplash.jpg).
 * Founder portrait and work project screenshots are separate assets.
 */

const IMG = "/images";

export type SiteImage = {
  src: string;
  alt: string;
};

/** Hero campaign — layered editorial stack */
export const HERO_IMAGES = {
  primary: {
    src: `${IMG}/renith-r-A9VpotrPr1k-unsplash.jpg`,
    alt: "Women's tennis player on court, seen from above in ready stance",
  },
  secondary: {
    src: `${IMG}/tom-briskey-AddAnDkkovM-unsplash.jpg`,
    alt: "Outdoor basketball shot arcing toward the hoop at golden hour",
  },
  accent: {
    src: `${IMG}/rinald-rolle-CxLnrerxO7w-unsplash.jpg`,
    alt: "Editorial portrait of a woman athlete running with a football",
  },
} as const satisfies Record<string, SiteImage>;

/** Section banners & backgrounds */
export const SECTION_IMAGES = {
  approachBanner: {
    src: `${IMG}/abigail-keenan-8-s5QuUBtyM-unsplash.jpg`,
    alt: "Soccer match under stadium lights with fans in the stands",
  },
  practiceSprint: {
    src: `${IMG}/braden-collum-9HI8UJMSdZA-unsplash.jpg`,
    alt: "Sprinter in starting blocks on a track — speed and focus",
  },
  practiceEmbedded: {
    src: `${IMG}/markus-spiske-XHTBZpRBoi0-unsplash.jpg`,
    alt: "Hockey face-off on the ice — team sport in motion",
  },
  testimonialsBg: {
    src: `${IMG}/daniel-van-den-berg-29Jx9qyTW14-unsplash.jpg`,
    alt: "Stadium floodlights at night with rain in the light beams",
  },
  founderPortrait: {
    src: `${IMG}/erica-loh-jones.jpg`,
    alt: "Portrait of Erica Loh Jones, founder of ELJ All Day",
  },
} as const satisfies Record<string, SiteImage>;

/** Work project cards — product screenshots (one path per project) */
export const WORK_PROJECT_IMAGES = {
  "yahoo-fantasy-redesign": {
    src: `${IMG}/yahoo-fantasy-redesign.jpg`,
    alt: "Yahoo Fantasy app redesign showing fantasy football home, team, and lineup screens",
  },
  "yahoo-sportsbook-betmgm": {
    src: "/work/yahoo-sportsbook-betmgm.jpg",
    alt: "Yahoo Sportsbook product screens with BetMGM partnership branding",
  },
  "nfl-live-on-yahoo-sports": {
    src: "/work/nfl-live-on-yahoo-sports.jpg",
    alt: "NFL Live streaming experience on Yahoo Sports with scores and game video",
  },
  "draft-together": {
    src: "/work/draft-together.jpg",
    alt: "Draft Together co-viewing fantasy draft experience on desktop and mobile",
  },
  "yahoo-sports-draft-reactions": {
    src: "/work/yahoo-sports-draft-reactions.jpg",
    alt: "Yahoo Sports NFL Draft live reactions and social commentary interface",
  },
  "yahoo-fantasy-plus": {
    src: "/work/yahoo-fantasy-plus.jpg",
    alt: "Yahoo Fantasy Plus subscription upgrade and premium feature screens",
  },
  "yahoo-sports-discussions": {
    src: "/work/yahoo-sports-discussions.jpg",
    alt: "Yahoo Sports Discussions community feed during live games",
  },
  "yahoo-dfs-quick-match": {
    src: "/work/yahoo-dfs-quick-match.jpg",
    alt: "Yahoo Daily Fantasy Quick Match lineup and contest screens",
  },
} as const satisfies Record<string, SiteImage>;

/** Work editorial collage — stock inserts between project cards */
export const WORK_COLLAGE_IMAGES = {
  womensBasketball: {
    src: `${IMG}/markus-spiske-BfphcCvhl6E-unsplash.jpg`,
    alt: "Basketball swishing through the net in arena light",
  },
  fansCheering: {
    src: `${IMG}/ashton-clark-02bN29Dz9Sg-unsplash.jpg`,
    alt: "Aerial view of a packed football stadium during a game",
  },
  pickupCourt: {
    src: `${IMG}/tom-briskey-AddAnDkkovM-unsplash.jpg`,
    alt: "Outdoor basketball hoop against an open sky",
  },
  athleteFocus: {
    src: `${IMG}/connor-coyne-OgqWLzWRSaI-unsplash.jpg`,
    alt: "Close-up of a soccer cleat on the ball — detail and control",
  },
  communityFans: {
    src: `${IMG}/daniel-van-den-berg-29Jx9qyTW14-unsplash.jpg`,
    alt: "Stadium lights cutting through the night — live sports atmosphere",
  },
} as const satisfies Record<string, SiteImage>;

/** @deprecated Use SECTION_IMAGES — kept for existing imports */
export const STOCK_IMAGES = SECTION_IMAGES;
