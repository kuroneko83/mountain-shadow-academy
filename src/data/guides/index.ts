import { guideCommandLineEn } from "./command-line.en";
import { guideCommandLineJa } from "./command-line.ja";
import { guideCommandLineUz } from "./command-line.uz";
import { guideGitEn } from "./git.en";
import { guideGitJa } from "./git.ja";
import { guideGitUz } from "./git.uz";
import { guidePythonEn } from "./python-basics.en";
import { guidePythonJa } from "./python-basics.ja";
import { guidePythonUz } from "./python-basics.uz";
import type { Guide } from "../types";
import type { Lang } from "../types";

const GUIDES: Record<Lang, Guide[]> = {
  en: [guideCommandLineEn, guideGitEn, guidePythonEn],
  ja: [guideCommandLineJa, guideGitJa, guidePythonJa],
  uz: [guideCommandLineUz, guideGitUz, guidePythonUz],
};

export function getGuides(lang: Lang): Guide[] {
  return GUIDES[lang];
}

export function getGuide(lang: Lang, slug: string): Guide | undefined {
  return GUIDES[lang].find((g) => g.slug === slug);
}

export const GUIDE_SLUGS: string[] = GUIDES.en.map((g) => g.slug);
