/**
 * Functional test for the TerminalSim component logic.
 * Extracts the <script> from TerminalSim.astro, runs it against a fake DOM,
 * and simulates the full mission session end-to-end.
 *
 * Run: node scripts/sim-terminal.test.mjs
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

/* ---------- fake DOM ---------- */

const printedLines = [];

function makeMission(id) {
  return {
    dataset: { mission: id },
    querySelector: () => ({ removeAttribute: () => {} }),
  };
}

const missions = Array.from({ length: 8 }, (_, i) => makeMission(`m${i + 1}`));

const screenState = { scrollTop: 0, scrollHeight: 0 };
const outEl = {
  appendChild: (d) => printedLines.push(d.textContent),
  parentElement: screenState,
};
const screenEl = { scrollTop: 0, scrollHeight: 0, addEventListener: () => {} };

const inputEl = {
  value: "",
  addEventListener: (evt, handler) => {
    if (evt === "keydown") inputEl._keydown = handler;
  },
  focus: () => {},
};

const app = {
  dataset: {
    missionComplete: "Mission {n} complete!",
    missionsDone: "ALL DONE",
    freePlay: "free play",
  },
  querySelectorAll: (sel) => (sel === ".mission" ? missions : []),
};

const promptEl = { textContent: "" };
const resetBtn = { addEventListener: () => {} };

globalThis.document = {
  getElementById: (id) =>
    ({
      "term-app": app,
      "term-out": outEl,
      "term-in": inputEl,
      "term-prompt": promptEl,
      "term-reset": resetBtn,
      "term-screen": screenEl,
    })[id] ?? null,
  createElement: () => ({ className: "", textContent: "" }),
};

/* ---------- run the component script ---------- */

new Function(script)();

/* ---------- simulate a session ---------- */

function type(line) {
  inputEl.value = line;
  inputEl._keydown({ key: "Enter", preventDefault: () => {} });
}

function lastLine() {
  return printedLines[printedLines.length - 1] ?? "";
}

const failures = [];
function expect(cond, label) {
  if (!cond) failures.push(label);
}

const session = [
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
];

session.forEach(type);

const doneCount = missions.filter((m) => m.dataset.done).length;
expect(doneCount === 8, `all 8 missions complete (got ${doneCount})`);
expect(
  printedLines.some((l) => l.includes("ALL DONE")),
  "final all-done message printed",
);
expect(promptEl.textContent === "~ $", `prompt back at home (got '${promptEl.textContent}')`);
expect(
  printedLines.some((l) => l === "learning log"),
  "cat printed the file content",
);

// error-path sanity: unknown command
type("frobnicate");
expect(
  printedLines.some((l) => l.includes("command not found")),
  "unknown command handled",
);

// mission-complete messages should have fired for 1..8
for (let i = 1; i <= 8; i++) {
  expect(
    printedLines.some((l) => l === `Mission ${i} complete!`),
    `mission ${i} completion message`,
  );
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  failures.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log("PASS: terminal simulator session — all 8 missions, output, prompt, errors");
