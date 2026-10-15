export type Lang = "en" | "ja" | "uz";

export const LANGS: Lang[] = ["en", "ja", "uz"];

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  ja: "日本語",
  uz: "O‘zbekcha",
};

export interface Resource {
  title: string;
  url: string;
  note?: string;
}

export interface Week {
  slug: string;
  title: string;
  phase: string;
  why: string;
  objectives: string[];
  topics: string[];
  project: {
    title: string;
    description: string;
    steps: string[];
  };
  resources: Resource[];
}

export interface Phase {
  id: string;
  name: string;
  description: string;
}

export interface Curriculum {
  phases: Phase[];
  weeks: Week[];
}

export interface UI {
  siteName: string;
  tagline: string;
  nav: { home: string; curriculum: string; resources: string };
  hero: {
    heading: string;
    body: string;
    audienceTitle: string;
    audience: string[];
    howTitle: string;
    how: string[];
    cta: string;
  };
  curriculumPage: {
    heading: string;
    intro: string;
    phaseLabel: string;
    weeksLabel: string;
    projectLabel: string;
    hoursLabel: string;
    hoursNote: string;
  };
  weekPage: {
    whyLabel: string;
    objectivesLabel: string;
    topicsLabel: string;
    projectLabel: string;
    resourcesLabel: string;
    prev: string;
    next: string;
    back: string;
    weekLabel: string;
  };
  resourcesPage: {
    heading: string;
    intro: string;
    byStage: string;
    freeNote: string;
  };
  footer: {
    org: string;
    note: string;
  };
  notFound: string;
}
