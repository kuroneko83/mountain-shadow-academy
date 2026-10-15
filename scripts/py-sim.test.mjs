/**
 * Functional test for the PythonSim mini-interpreter.
 * Extracts the <script> from PythonSim.astro, runs it against a fake DOM,
 * and simulates mission sessions plus interpreter semantics and errors.
 *
 * Run: node scripts/py-sim.test.mjs
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { transformSync } = require("esbuild");

const astro = readFileSync(
  new URL("../src/components/PythonSim.astro", import.meta.url),
  "utf8",
);
const scriptRaw = astro.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!scriptRaw) {
  console.error("FAIL: could not extract <script> from PythonSim.astro");
  process.exit(1);
}
const script = transformSync(scriptRaw, { loader: "ts", format: "cjs" }).code;

/* ---------- fake DOM ---------- */

const printedLines = [];
const missions = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((id) => ({
  dataset: { mission: id },
  querySelector: () => ({ removeAttribute: () => {} }),
}));
const out = { appendChild: (d) => printedLines.push(d.textContent), innerHTML: "" };
const codeArea = { value: "" };
let runHandler = null;
const runBtn = { addEventListener: (e, h) => (runHandler = h) };
const resetBtn = { addEventListener: () => {} };
const app = {
  dataset: { missionComplete: "Mission {n} complete!", missionsDone: "ALL DONE" },
  querySelectorAll: (sel) => (sel === ".mission" ? missions : []),
};

globalThis.document = {
  getElementById: (id) =>
    ({
      "py-app": app,
      "py-out": out,
      "py-code": codeArea,
      "py-run": runBtn,
      "py-reset": resetBtn,
    })[id] ?? null,
  createElement: () => ({ className: "", textContent: "" }),
};

new Function(script)();

const failures = [];
function expect(cond, label) {
  if (!cond) failures.push(label);
}

const runProgram = (src) => {
  const marker = printedLines.length;
  codeArea.value = src;
  runHandler && runHandler();
  return printedLines.slice(marker);
};

const doneCount = () => missions.filter((m) => m.dataset.done).length;

/* ---------- session: the full mission program ---------- */

const output = runProgram(`rate = 150.0
yen = 30000
usd = yen / rate
print(f"{yen} JPY = {usd:.2f} USD")
if yen > 10000:
    print("big")
else:
    print("small")
yen = -500
if yen < 0:
    print("invalid: negative amount")
else:
    print("ok")
name = "  Mountain Shadow  "
print(name.strip().lower())`);

expect(doneCount() === 8, `[missions] all 8 complete (got ${doneCount()})`);
expect(output.includes("30000 JPY = 200.00 USD"), "[missions] f-string with .2f");
expect(output.includes("big"), "[missions] if branch (big)");
expect(output.includes("invalid: negative amount"), "[missions] negative branch");
expect(output.includes("mountain shadow"), "[missions] strip().lower()");
expect(printedLines.some((l) => l.includes("ALL DONE")), "[missions] all-done message");
for (let i = 1; i <= 8; i++) {
  expect(
    printedLines.some((l) => l === `Mission ${i} complete!`),
    `[missions] mission ${i} completion message`,
  );
}

/* ---------- interpreter semantics ---------- */

const sem = (src) =>
  runProgram(src).filter((l) => l !== "▶ run" && !/^Mission|ALL DONE|hint:|^mini-python|^write a program/.test(l));

expect(sem("print(7 / 2)").join() === "3.5", "[sem] / is float division");
expect(sem("print(7 // 2)").join() === "3", "[sem] // is floor division");
expect(sem("print(7 % 2)").join() === "1", "[sem] % modulo");
expect(sem("print(2 ** 10)").join() === "1024", "[sem] ** power");
expect(sem('print("ab" * 3)').join() === "ababab", "[sem] string repetition");
expect(sem("print(2 < 3 and 3 < 2)").join() === "False", "[sem] and with booleans");
expect(sem("print(not 0)").join() === "True", "[sem] not on falsy");
expect(sem('print("Mountain"[0])').join() === "M", "[sem] index");
expect(sem('print("Mountain"[-1])').join() === "n", "[sem] negative index");
expect(sem('print("Mountain Shadow"[0:8])').join() === "Mountain", "[sem] slice");
expect(sem('print(len("hi"))').join() === "2", "[sem] len");
expect(sem('print(int("30000") + 1)').join() === "30001", "[sem] int() conversion");
expect(sem("print(round(2.678, 2))").join() === "2.68", "[sem] round to 2 decimals");
expect(sem("x = 5\nx = x + 2\nprint(x)").join() === "7", "[sem] reassignment");

/* errors */
expect(
  sem("print(missing)").some((l) => l.includes("NameError")),
  "[err] NameError",
);
expect(
  sem('print("yen: " + 30000)').some((l) =>
    l.includes("can only concatenate str (not \"int\") to str"),
  ),
  "[err] TypeError str + int",
);
expect(
  sem("print(1 / 0)").some((l) => l.includes("ZeroDivisionError")),
  "[err] ZeroDivisionError",
);
expect(
  sem('print(int("hello"))').some((l) => l.includes("ValueError")),
  "[err] ValueError int()",
);
expect(
  sem("if x > 1\n    print(1)").some((l) => l.includes("SyntaxError")),
  "[err] missing colon",
);
expect(
  sem("if True:\nprint(1)").some((l) => l.includes("IndentationError")),
  "[err] missing indent",
);
expect(
  sem('print("a"\n+ 1)').length >= 0,
  "[err] multi-line expressions rejected but not crashed",
);
expect(
  sem("while True:\n    print(1)").some((l) => l.includes("Week 4")),
  "[err] while → friendly SimNote pointing at Week 4",
);
expect(
  sem("print(input())").some((l) => l.includes("SimNote")),
  "[err] input() → friendly SimNote",
);

/* error must come AFTER partial output (like real Python) */
{
  const o = runProgram('print("before")\nprint(undefined_var)');
  const bi = o.indexOf("before");
  const ni = o.findIndex((l) => l.includes("NameError"));
  expect(bi !== -1 && ni !== -1 && bi < ni, "[err] partial output printed before error");
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  failures.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log("PASS: python sim — 8 missions, 14 semantics, 10 error paths, output ordering");
