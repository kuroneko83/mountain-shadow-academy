/**
 * Functional test for the PythonSim mini-interpreter.
 * Extracts the <script> from PythonSim.astro, runs it against a fake DOM,
 * and simulates mission sessions (Week 3 and Week 4) plus interpreter
 * semantics and errors.
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

/* ---------- fake DOM, one instance per mission set ---------- */

function makeSim(missionIds) {
  const printedLines = [];
  const missions = missionIds.map((id) => ({
    dataset: { mission: id },
    querySelector: () => ({ removeAttribute: () => {} }),
  }));
  const out = { appendChild: (d) => printedLines.push(d.textContent), innerHTML: "" };
  const codeArea = { value: "" };
  let runHandler = null;
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
        "py-run": { addEventListener: (e, h) => (runHandler = h) },
        "py-reset": { addEventListener: () => {} },
      })[id] ?? null,
    createElement: () => ({ className: "", textContent: "" }),
  };
  new Function(script)();

  const runProgram = (src) => {
    const marker = printedLines.length;
    codeArea.value = src;
    runHandler && runHandler();
    return printedLines.slice(marker);
  };
  return { runProgram, missions, printedLines };
}

const failures = [];
function expect(cond, label) {
  if (!cond) failures.push(label);
}

/* ---------- session 1: week 3 missions ---------- */

{
  const s = makeSim(["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]);
  const output = s.runProgram(`rate = 150.0
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

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[w3 missions] all 8 complete (got ${done})`);
  expect(output.includes("30000 JPY = 200.00 USD"), "[w3] f-string with .2f");
  expect(output.includes("big"), "[w3] if branch (big)");
  expect(output.includes("invalid: negative amount"), "[w3] negative branch");
  expect(output.includes("mountain shadow"), "[w3] strip().lower()");
  expect(s.printedLines.some((l) => l.includes("ALL DONE")), "[w3] all-done message");
  for (let i = 1; i <= 8; i++) {
    expect(
      s.printedLines.some((l) => l === `Mission ${i} complete!`),
      `[w3 missions] mission ${i} completion message`,
    );
  }

  const sem = (src) =>
    s
      .runProgram(src)
      .filter((l) => l !== "▶ run" && !/^Mission|ALL DONE|hint:|^mini-python|^write a program/.test(l));

  /* week 3 semantics */
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

  /* week 3 errors */
  expect(sem("print(missing)").some((l) => l.includes("NameError")), "[err] NameError");
  expect(
    sem('print("yen: " + 30000)').some((l) =>
      l.includes("can only concatenate str (not \"int\") to str"),
    ),
    "[err] TypeError str + int",
  );
  expect(sem("print(1 / 0)").some((l) => l.includes("ZeroDivisionError")), "[err] ZeroDivisionError");
  expect(sem('print(int("hello"))').some((l) => l.includes("ValueError")), "[err] ValueError int()");
  expect(sem("if x > 1\n    print(1)").some((l) => l.includes("SyntaxError")), "[err] missing colon");
  expect(
    sem("if True:\nprint(1)").some((l) => l.includes("IndentationError")),
    "[err] missing indent",
  );
  expect(
    sem("while True:\n    print(1)").some((l) => l.includes("looks infinite")),
    "[err] infinite while → friendly SimNote with the fix",
  );
  expect(sem("print(input())").some((l) => l.includes("SimNote")), "[err] input() → friendly SimNote");

  /* error must come AFTER partial output (like real Python) */
  {
    const o = s.runProgram('print("before")\nprint(undefined_var)');
    const bi = o.indexOf("before");
    const ni = o.findIndex((l) => l.includes("NameError"));
    expect(bi !== -1 && ni !== -1 && bi < ni, "[err] partial output printed before error");
  }
}

/* ---------- session 2: week 4 — loops and functions ---------- */

{
  const s = makeSim(["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8"]);
  const output = s.runProgram(`volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]
for v in volumes:
    print(v)

def total(values):
    "sum of a list, the long honest way"
    result = 0
    for v in values:
        result += v
    return result

def average(values):
    return total(values) / len(values)

def best_day(values):
    best = 0
    day = 0
    for i in range(len(values)):
        if values[i] > best:
            best = volumes[i]
            day = i + 1
    return day

def yen_to_usd(amount):
    rate = 150.0
    return f"{amount / rate:.2f} USD"

def report(values):
    print(f"total: {total(values)}")
    print(f"average: {average(values)}")
    print(f"best day: {best_day(values)}")

report(volumes)
print(yen_to_usd(30000))
i = 1
while i <= 7:
    print(f"day {i}")
    i += 1`);

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[w4 missions] all 8 complete (got ${done})`);
  expect(output.includes("total: 28000"), "[w4] report total");
  expect(output.includes("average: 4000"), "[w4] report average");
  expect(output.includes("best day: 7"), "[w4] report best day");
  expect(output.includes("200.00 USD"), "[w4] yen_to_usd f-string");
  expect(output.includes("day 1") && output.includes("day 7"), "[w4] while counter");
  for (let i = 1; i <= 8; i++) {
    expect(
      s.printedLines.some((l) => l === `Mission ${i} complete!`),
      `[w4 missions] mission ${i} completion message`,
    );
  }

  const sem = (src) =>
    s
      .runProgram(src)
      .filter((l) => l !== "▶ run" && !/^Mission|ALL DONE|hint:|^mini-python|^write a program/.test(l));

  /* week 4 semantics */
  expect(sem("for i in range(3):\n    print(i)").join() === "0,1,2", "[w4] range(3) starts at 0");
  expect(
    sem("for i in range(1, 8):\n    print(i)").join() === "1,2,3,4,5,6,7",
    "[w4] range(1, 8) end excluded",
  );
  expect(sem('for c in "abc":\n    print(c)').join() === "a,b,c", "[w4] for over a string");
  expect(
    sem("items = [1, 2]\nitems.append(3)\nprint(items)").join() === "[1, 2, 3]",
    "[w4] append mutates",
  );
  expect(sem("print([1, 2] + [3])").join() === "[1, 2, 3]", "[w4] list concatenation");
  expect(sem("print([10, 20, 30][1])").join() === "20", "[w4] list index");
  expect(sem("print([10, 20, 30][0:2])").join() === "[10, 20]", "[w4] list slice");
  expect(sem("print(len([4, 5, 6]))").join() === "3", "[w4] len of list");
  expect(
    sem("def f(x):\n    return x * 2\nprint(f(21))").join() === "42",
    "[w4] function with return",
  );
  expect(
    sem('def f():\n    print("side effect")\nprint(f())').join() === "side effect,None",
    "[w4] no return → None (the print/return distinction)",
  );
  expect(
    sem("def f(a, b):\n    return a + b\nprint(f(1))").some((l) =>
      l.includes("f() takes exactly 2 arguments (1 given)"),
    ),
    "[w4] argument count TypeError",
  );
  expect(
    sem("def outer(x):\n    def inner(y):\n        return y + 1\n    return inner(x) * 2\nprint(outer(5))").join() === "12",
    "[w4] functions calling functions",
  );
  expect(sem("return 5").some((l) => l.includes("'return' outside function")), "[w4] return outside function");
  expect(
    sem("def g(x):\n    return x + 1\nprint(g(g(1)))").join() === "3",
    "[w4] nested calls compose",
  );
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  failures.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log(
  "PASS: python sim — week 3 (8 missions, 14 semantics, 9 errors) + week 4 (8 missions, 13 semantics)",
);
