import { guideCommandLineEn } from "./command-line.en";
import { guideCommandLineJa } from "./command-line.ja";
import { guideCommandLineUz } from "./command-line.uz";
import { guideGitEn } from "./git.en";
import { guideGitJa } from "./git.ja";
import { guideGitUz } from "./git.uz";
import { guidePythonEn } from "./python-basics.en";
import { guidePythonJa } from "./python-basics.ja";
import { guidePythonUz } from "./python-basics.uz";
import { guideLoopsEn } from "./python-loops.en";
import { guideLoopsJa } from "./python-loops.ja";
import { guideLoopsUz } from "./python-loops.uz";
import { guideDataEn } from "./data-files.en";
import { guideDataJa } from "./data-files.ja";
import { guideDataUz } from "./data-files.uz";
import { guideApiEn } from "./requests-api.en";
import { guideApiJa } from "./requests-api.ja";
import { guideApiUz } from "./requests-api.uz";
import type { Guide } from "../types";
import type { Lang } from "../types";

const GUIDES: Record<Lang, Guide[]> = {
  en: [guideCommandLineEn, guideGitEn, guidePythonEn, guideLoopsEn, guideDataEn, guideApiEn],
  ja: [guideCommandLineJa, guideGitJa, guidePythonJa, guideLoopsJa, guideDataJa, guideApiJa],
  uz: [guideCommandLineUz, guideGitUz, guidePythonUz, guideLoopsUz, guideDataUz, guideApiUz],
};

export function getGuides(lang: Lang): Guide[] {
  return GUIDES[lang];
}

export function getGuide(lang: Lang, slug: string): Guide | undefined {
  return GUIDES[lang].find((g) => g.slug === slug);
}

export const GUIDE_SLUGS: string[] = GUIDES.en.map((g) => g.slug);
