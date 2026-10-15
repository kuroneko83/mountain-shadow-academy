import { curriculumEn } from "./curriculum/en";
import { curriculumJa } from "./curriculum/ja";
import { curriculumUz } from "./curriculum/uz";
import type { Curriculum, Lang, Week } from "./types";

const CURRICULA: Record<Lang, Curriculum> = {
  en: curriculumEn,
  ja: curriculumJa,
  uz: curriculumUz,
};

export function getCurriculum(lang: Lang): Curriculum {
  return CURRICULA[lang];
}

export function getWeeks(lang: Lang): Week[] {
  return CURRICULA[lang].weeks;
}

export function getWeek(lang: Lang, slug: string): Week | undefined {
  return CURRICULA[lang].weeks.find((w) => w.slug === slug);
}

export function getWeekIndex(lang: Lang, slug: string): number {
  return CURRICULA[lang].weeks.findIndex((w) => w.slug === slug);
}

export function getPhaseName(lang: Lang, phaseId: string): string {
  return (
    CURRICULA[lang].phases.find((p) => p.id === phaseId)?.name ?? phaseId
  );
}

/** e.g. /ja/curriculum/ with lang swapped -> /en/curriculum/ */
export function swapLang(pathname: string, target: Lang): string {
  const rest = pathname.replace(/^\/(en|ja|uz)(\/|$)/, "/");
  return `/${target}${rest === "/" ? "/" : rest}`;
}

/** Convert 1 -> "01" for week numbering */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
