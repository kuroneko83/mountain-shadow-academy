# Mountain Shadow Academy

Free 12-week study path — Python, scripting, and data engineering from absolute zero to a deployed portfolio. Built for future interns at Mountain Shadow Trade (Tokyo). Available in **English**, **日本語**, and **O‘zbekcha**, with full parity across all three languages.

**Live at:** https://kuroneko83.github.io/mountain-shadow-academy/

## What it is

- 4 phases, 12 weeks, one applied project per week (~4–6 h/week, evening pace)
- **Deep-dive guides** (`/guides/`) with plain-language lessons, Windows/Linux examples, a **simulated terminal** with auto-checked missions, and a **quiz** — currently: *The command line* (Week 1), *Git & GitHub* (Week 2, with a fake git: init/status/add/commit/log/remote/push), *Python I* (Week 3) and *Python II* (Week 4, loops & functions) — the last two with a mini-Python interpreter in the browser: variables, strings, f-strings, if/elif/else, for/while, range(), lists, def/return. Each guide is labeled with the week it serves; more guides to come.
- 100% free learning resources (freeCodeCamp, Kaggle Learn, SQLBolt, Automate the Boring Stuff, Pro Git, Frankfurter API, ...)
- Final outcome: a public GitHub portfolio with 4+ repos and a deployed market-data pipeline report

## Stack

- [Astro](https://astro.build) — static site (JS only in the interactive guides' simulator/quiz and the language redirect at `/`)
- No CSS framework — one hand-written stylesheet (`src/styles/global.css`)
- Content lives in plain TypeScript data files (one per language)

## Project structure

```
src/
  data/
    types.ts               # Lang, Week, Guide, Mission, QuizQuestion interfaces
    ui.ts                  # header/footer/hero/practice/quiz strings, per language
    curriculum/
      en.ts                # source of truth (12 weeks, 4 phases)
      ja.ts                # Japanese translation
      uz.ts                # Uzbek translation
    guides/
      command-line.{en,ja,uz}.ts   # deep-dive guide + missions + quiz
      index.ts
  components/
    TerminalSim.astro       # simulated terminal (fake FS, commands, mission checks)
    Quiz.astro              # self-check quiz
  layouts/Base.astro        # header, nav, language switcher, footer
  styles/global.css
  utils.ts                 # base-path handling (GitHub Pages)
  pages/
    index.astro            # root: redirects by browser language
    [lang]/index.astro     # home
    [lang]/curriculum.astro
    [lang]/guides/index.astro
    [lang]/guides/[slug].astro   # lesson + simulator + quiz
    [lang]/week/[slug].astro
    [lang]/resources.astro
    404.astro
scripts/sim-terminal.test.mjs  # functional test of the simulator logic (node scripts/...)
.github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

Routes: `/en/...`, `/ja/...`, `/uz/...` — `/` redirects by browser language (`ja` → 日本語, `uz` → O‘zbekcha, else English).

The site is served under the base path `/mountain-shadow-academy/` (GitHub Pages project site). **Never hardcode links like `/en/...`** — use the `href()` helper from `src/utils.ts`, which prefixes the base automatically.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run test     # functional test of the terminal simulator logic
npm run preview
```

**Adding a new guide:** create `src/data/guides/<slug>.{en,ja,uz}.ts` (same structure as `command-line.*`), register it in `src/data/guides/index.ts`, and optionally link it from a week by adding `guide: "<slug>"` to that week in all three curriculum files. If the guide adds missions with new `id`s, add matching checks to `CHECKS` in `src/components/TerminalSim.astro` (mission validation logic is language-independent).

## Deploy (GitHub Pages — automatic)

Deploys on every push to `main` via `.github/workflows/deploy.yml`. Setup (one time only):

1. Push this repo to GitHub (`kuroneko83/mountain-shadow-academy`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Done — every push to `main` rebuilds and deploys automatically.

If you rename the repo or move to a custom domain, update `site` and `base` in `astro.config.mjs`.

## Maintenance

- **Editing a week:** edit `src/data/curriculum/en.ts` first, then mirror the change in `ja.ts` and `uz.ts`. The three files must stay in sync (same weeks, same slugs, same resource URLs).
- **Adding/removing a week:** update all three files; pages and nav are generated automatically.
- **Uzbek copy note:** machine-assisted draft — worth a native-speaker read-through before sending to the intern.

## Translations checklist

- [ ] Native-speaker review of `uz.ts` (Uzbek)
- [ ] Review of `ja.ts` (Japanese) by Atila or the intern
- [x] Live URL set (GitHub Pages)
