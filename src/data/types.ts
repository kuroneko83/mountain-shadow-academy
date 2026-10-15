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
  guide?: string; // slug of a deep-dive guide, e.g. "command-line"
  project: {
    title: string;
    description: string;
    steps: string[];
  };
  resources: Resource[];
}

/* ---------- guides (deep-dive lessons) ---------- */

export interface CommandExample {
  label?: string; // e.g. "Windows" / "Linux & macOS" / "Both"
  cmd: string;
  output?: string;
  note?: string;
}

export interface GuideSection {
  heading: string;
  body: string;
  examples?: CommandExample[];
}

export interface CheatRow {
  action: string;
  win: string;
  linux: string;
}

export interface Mission {
  id: string;
  prompt: string;
  hint: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export interface Guide {
  slug: string;
  title: string;
  intro: string;
  sections: GuideSection[];
  cheatSheet?: { heading: string; rows: CheatRow[] };
  missions: Mission[];
  quiz: QuizQuestion[];
  outro: string;
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
  nav: { home: string; curriculum: string; guides: string; resources: string };
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
    guideLabel: string;
    projectLabel: string;
    resourcesLabel: string;
    prev: string;
    next: string;
    back: string;
    weekLabel: string;
  };
  guidesPage: {
    heading: string;
    intro: string;
    readLabel: string;
    backToCurriculum: string;
    lessonLabel: string;
    cheatLabel: string;
  };
  practice: {
    title: string;
    intro: string;
    missionsLabel: string;
    missionsDone: string;
    missionComplete: string; // {n} is replaced with the mission number
    freePlay: string;
    reset: string;
    helpHint: string;
  };
  quizPage: {
    title: string;
    intro: string;
    correct: string;
    wrong: string;
    retry: string;
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
