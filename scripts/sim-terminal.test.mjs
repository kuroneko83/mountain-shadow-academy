/**
 * Functional test for the TerminalSim component logic.
 * Extracts the <script> from TerminalSim.astro, runs it against a fake DOM,
 * and simulates full mission sessions for both sims (command-line and git).
 *
 * Run: node scripts/sim-terminal.test.mjs   (or: npm run test)
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { transformSync } = require("esbuild");

const astro = readFileSync(
  new URL("../src/components/TerminalSim.astro", import.meta.url),
  "utf8",
);
const scriptRaw = astro.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!scriptRaw) {
  console.error("FAIL: could not extract <script> from TerminalSim.astro");
  process.exit(1);
}
// the component script is TypeScript — strip types before running it in Node
const script = transformSync(scriptRaw, { loader: "ts", format: "cjs" }).code;

/* ---------- fake DOM, one instance per sim ---------- */

function makeSim(sim, missionIds) {
  const printedLines = [];
  const missions = missionIds.map((id) => ({
    dataset: { mission: id },
    querySelector: () => ({ removeAttribute: () => {} }),
  }));
  const screen = { scrollTop: 0, scrollHeight: 0, addEventListener: () => {} };
  const out = { appendChild: (d) => printedLines.push(d.textContent), parentElement: screen };
  const input = {
    value: "",
    addEventListener: (evt, handler) => {
      if (evt === "keydown") input._keydown = handler;
    },
    focus: () => {},
  };
  const app = {
    dataset: {
      sim,
      missionComplete: "Mission {n} complete!",
      missionsDone: "ALL DONE",
      freePlay: "free play",
    },
    querySelectorAll: (sel) => (sel === ".mission" ? missions : []),
  };
  const promptEl = { textContent: "" };
  globalThis.document = {
    getElementById: (id) =>
      ({
        "term-app": app,
        "term-out": out,
        "term-in": input,
        "term-prompt": promptEl,
        "term-reset": { addEventListener: () => {} },
        "term-screen": screen,
      })[id] ?? null,
    createElement: () => ({ className: "", textContent: "" }),
  };

  new Function(script)();

  const type = (line) => {
    input.value = line;
    input._keydown({ key: "Enter", preventDefault: () => {} });
  };
  return { type, missions, printedLines, prompt: promptEl };
}

const failures = [];
function expect(cond, label) {
  if (!cond) failures.push(label);
}

/* ---------- session 1: command-line sim ---------- */

{
  const ids = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"];
  const s = makeSim("command-line", ids);

  [
    "pwd",
    "ls",
    "cd projects",
    "mkdir data",
    "mkdir data/scripts",
    "echo learning log > notes.txt", // deliberately wrong place (still in projects)
    "rm notes.txt", // clean up
    "cd data/scripts",
    "echo learning log > notes.txt",
    "cat notes.txt",
    "cd ~",
    "frobnicate", // error-path sanity
  ].forEach(s.type);

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[command-line] all 8 missions complete (got ${done})`);
  expect(s.printedLines.some((l) => l.includes("ALL DONE")), "[command-line] all-done message");
  expect(s.prompt.textContent === "~ $", `[command-line] prompt back at home (got '${s.prompt.textContent}')`);
  expect(s.printedLines.some((l) => l === "learning log"), "[command-line] cat printed file content");
  expect(
    s.printedLines.some((l) => l.includes("command not found")),
    "[command-line] unknown command handled",
  );
  for (let i = 1; i <= 8; i++) {
    expect(
      s.printedLines.some((l) => l === `Mission ${i} complete!`),
      `[command-line] mission ${i} completion message`,
    );
  }
}

/* ---------- session 2: git sim ---------- */

{
  const ids = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"];
  const s = makeSim("git", ids);

  [
    "mkdir learning-log",
    "cd learning-log",
    "git init",
    "echo learning log > readme.md",
    "git status", // untracked
    "git add readme.md",
    'git commit -m "add readme"', // first try: identity error (expected)
    'git config --global user.name "Test User"',
    'git config --global user.email "test@example.com"',
    'git commit -m "add readme"',
    "echo day 2 >> readme.md",
    "git add .",
    'git commit -m "day 2"',
    "git log",
    "git remote add origin https://github.com/you/learning-log.git",
    "git push -u origin main",
  ].forEach(s.type);

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[git] all 8 missions complete (got ${done})`);
  expect(s.printedLines.some((l) => l.includes("ALL DONE")), "[git] all-done message");
  expect(
    s.printedLines.some((l) => l.includes("Please tell me who you are")),
    "[git] identity error on first commit",
  );
  expect(
    s.printedLines.some((l) => l === "Untracked files:"),
    "[git] status shows untracked section",
  );
  expect(
    s.printedLines.some((l) => l.includes("add readme")),
    "[git] commit message recorded",
  );
  expect(
    s.printedLines.some((l) => /^\w{7}  day 2$/.test(l)) &&
      s.printedLines.some((l) => /^\w{7}  add readme$/.test(l)),
    "[git] log lists both commits",
  );
  expect(
    s.printedLines.some((l) => l.includes("main -> main")),
    "[git] push output",
  );
}

/* ---------- session 3: git error paths ---------- */

{
  const ids = ["g1"];
  const s = makeSim("git", ids);
  ["git status", "git add .", "git commit -m x", "git push", "git frobnicate"].forEach(s.type);
  expect(
    s.printedLines.some((l) => l.includes("fatal: not a git repository")),
    "[git errors] status outside a repo",
  );
  expect(
    s.printedLines.some((l) => l.includes("is not a git command")),
    "[git errors] unknown git subcommand",
  );
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  failures.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log("PASS: command-line session (8 missions) + git session (8 missions) + git error paths");
