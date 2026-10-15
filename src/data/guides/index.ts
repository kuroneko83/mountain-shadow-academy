import { guideCommandLineEn } from "./command-line.en";
import { guideCommandLineJa } from "./command-line.ja";
import { guideCommandLineUz } from "./command-line.uz";
import type { Guide } from "./types";
import type { Lang } from "./types";

const GUIDES: Record<Lang, Guide[]> = {
  en: [guideCommandLineEn],
  ja: [guideCommandLineJa],
  uz: [guideCommandLineUz],
};

export function getGuides(lang: Lang): Guide[] {
  return GUIDES[lang];
}

export function getGuide(lang: Lang, slug: string): Guide | undefined {
  return GUIDES[lang].find((g) => g.slug === slug);
}

export const GUIDE_SLUGS: string[] = GUIDES.en.map((g) => g.slug);
