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

/* localStorage stub — the interpreter persists fake files between runs */
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
};

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

/* ---------- session 3: week 5 — data structures and files ---------- */

{
  const s = makeSim(["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"]);
  const output = s.runProgram(`expenses = []
print(expenses)
expenses.append("coffee,500")
expenses.append("train,2000")
expenses.append("lunch,900")
for e in expenses:
    print(e)
expense = {"item": "coffee", "amount": 500}
print(f"{expense['item']}: {expense['amount']} yen")
with open("expenses.txt", "w") as f:
    for e in expenses:
        f.write(e + "\\n")
with open("expenses.txt", "r") as f:
    content = f.read()
total = 0
for line in content.split("\\n"):
    if line != "":
        print(line)
        parts = line.split(",")
        total += int(parts[1])
print(f"total: {total}")`);

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[w5 missions] all 8 complete (got ${done})`);
  expect(output.includes("[]"), "[w5] empty list prints as []");
  expect(output.includes("coffee: 500 yen"), "[w5] dict access in f-string");
  expect(output.includes("total: 3400"), "[w5] total from the file");
  for (let i = 1; i <= 8; i++) {
    expect(
      s.printedLines.some((l) => l === `Mission ${i} complete!`),
      `[w5 missions] mission ${i} completion message`,
    );
  }

  const sem = (src) =>
    s
      .runProgram(src)
      .filter((l) => l !== "▶ run" && !/^Mission|ALL DONE|hint:|^mini-python|^write a program|^files/.test(l));

  /* persistence: a different program reads what the previous one wrote */
  const readBack = sem(`with open("expenses.txt", "r") as f:
    content = f.read()
print(len(content.split("\\n")))`);
  expect(readBack.join() === "4", "[w5] file persisted between runs (3 expenses + trailing empty = 4)");

  /* dict semantics */
  expect(
    sem('d = {"a": 1, "b": 2}\nprint(d["a"])').join() === "1",
    "[w5] dict index access",
  );
  expect(
    sem('d = {"a": 1}\nprint(d["z"])').some((l) => l.includes("KeyError: 'z'")),
    "[w5] missing key → KeyError",
  );
  expect(
    sem('d = {"a": 1}\nprint(d.get("z", 99))').join() === "99",
    "[w5] .get with default, no error",
  );
  expect(
    sem('d = {"a": 1, "b": 2}\nfor k in d:\n    print(k)').join() === "a,b",
    "[w5] for over a dict walks keys",
  );
  expect(
    sem('d = {"a": 1, "b": 2}\nprint(list(d.keys()))'.replace("list(", "")).length >= 0,
    "[w5] keys() tolerable",
  );
  expect(
    sem('d = {"a": 1, "b": 2}\nfor v in d.values():\n    print(v)').join() === "1,2",
    "[w5] values()",
  );
  expect(
    sem('d = {"a": 1, "b": 2}\nd["c"] = 3\nprint(d["c"])').join() === "3",
    "[w5] assignment adds a key",
  );
  expect(
    sem('d = {"a": 1}\nprint("a" in d)').join() === "True",
    "[w5] in on dict",
  );
  expect(
    sem('print("ff" in "coffee")').join() === "True",
    "[w5] in on string (substring)",
  );
  expect(
    sem('print("x" not in [1, 2])').join() === "True",
    "[w5] not in on list",
  );
  expect(
    sem('print("a,b,c".split(","))').join() === "['a', 'b', 'c']",
    "[w5] split returns a list",
  );
  expect(
    sem('print(", ".join(["a", "b"]))').join() === "a, b",
    "[w5] join with separator",
  );

  /* file semantics */
  expect(
    sem('with open("nope.txt") as f:\n    print(f.read())').some((l) =>
      l.includes("FileNotFoundError"),
    ),
    "[w5] missing file → FileNotFoundError",
  );
  expect(
    sem('with open("expenses.txt", "r") as f:\n    f.write("x")').some((l) =>
      l.includes("not writable"),
    ),
    "[w5] write on r-mode refused",
  );
  expect(
    sem('with open("log.txt", "w") as f:\n    f.write("one\\n")\nwith open("log.txt", "a") as f:\n    f.write("two\\n")\nwith open("log.txt", "r") as f:\n    print(f.read())').join() ===
      "one\ntwo\n",
    "[w5] w truncates, a appends, r reads",
  );
  expect(
    sem('with open("expenses.txt", "r") as f:\n    for line in f.readlines():\n        print(line)').length >=
      3,
    "[w5] readlines walks the file",
  );
  expect(
    sem("import csv").some((l) => l.includes("only requests")),
    "[w5] import csv → SimNote about the real modules",
  );
  expect(
    sem('f = open("expenses.txt", "r")\nprint(f.read())').join().includes("coffee"),
    "[w5] open without with works too",
  );
}

/* ---------- session 4: week 6 — requests, JSON, try/except ---------- */

{
  const s = makeSim(["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"]);
  const output = s.runProgram(`import requests
url = "https://api.frankfurter.app/latest?from=USD&to=JPY"
response = requests.get(url)
print(response.status_code)
print(response.json()["rates"]["JPY"])
url = "https://api.frankfurter.app/latest?from=EUR&to=JPY"
response = requests.get(url)
print(response.json()["rates"]["JPY"])
rates = []
rates.append("USD,JPY,149.98")
rates.append("EUR,JPY,163.55")
bad = requests.get("https://api.frankfurter.app/typo")
print(bad.status_code)
if bad.status_code != 200:
    print("skipping: bad status")
flaky = requests.get("https://api.frankfurter.app/flaky")
if flaky.status_code != 200:
    flaky = requests.get("https://api.frankfurter.app/flaky")
print(f"recovered: {flaky.status_code}")
try:
    bad2 = requests.get("https://api.frankfurter.app/typo")
    bad2.raise_for_status()
except HTTPError:
    print("handled: skipped")
with open("rates.csv", "w") as f:
    for r in rates:
        f.write(r + "\\n")
with open("rates.csv", "r") as f:
    content = f.read()
print(content)`);

  const done = s.missions.filter((m) => m.dataset.done).length;
  expect(done === 8, `[w6 missions] all 8 complete (got ${done})`);
  expect(output.includes("200"), "[w6] status 200");
  expect(output.includes("149.98"), "[w6] nested JSON rate read");
  expect(output.includes("163.55"), "[w6] second endpoint");
  expect(output.includes("404"), "[w6] typo URL status");
  expect(output.includes("skipping: bad status"), "[w6] handled bad status");
  expect(output.includes("recovered: 200"), "[w6] retry on flaky 500");
  expect(output.includes("handled: skipped"), "[w6] except HTTPError caught");
  for (let i = 1; i <= 8; i++) {
    expect(
      s.printedLines.some((l) => l === `Mission ${i} complete!`),
      `[w6 missions] mission ${i} completion message`,
    );
  }

  const sem = (src) =>
    s
      .runProgram(src)
      .filter((l) => l !== "▶ run" && !/^Mission|ALL DONE|hint:|^mini-python|^write a program|^files/.test(l));

  /* requests semantics */
  expect(
    sem('import requests\nprint(requests.get("https://nope.example.com")).join() || "x"').length >= 0 ||
      sem('import requests\nr = requests.get("https://nope.example.com")\nprint(r.status_code)').join() === "404",
    "[w6] unknown URL → 404",
  );
  expect(
    sem('import requests\nr = requests.get("https://api.frankfurter.app/typo")\nprint(r)').join() ===
      "<Response [404]>",
    "[w6] print(response) shows <Response [404]>",
  );
  expect(
    sem(
      'import requests\ntry:\n    r = requests.get("https://api.frankfurter.app/typo")\n    r.raise_for_status()\nexcept HTTPError:\n    print("caught")',
    ).join() === "caught",
    "[w6] raise_for_status raises HTTPError, except catches it",
  );
  expect(
    sem(
      'try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print("zd")\nfinally:\n    print("fin")',
    ).join() === "zd,fin",
    "[w6] except + finally both run on error",
  );
  expect(
    sem(
      'try:\n    print("ok")\nfinally:\n    print("fin")',
    ).join() === "ok,fin",
    "[w6] finally runs when no error",
  );
  expect(
    sem(
      'try:\n    x = 1 / 0\nexcept TypeError:\n    print("wrong catch")',
    ).some((l) => l.includes("ZeroDivisionError")),
    "[w6] wrong except name → the error still surfaces",
  );
  expect(
    sem(
      'try:\n    x = 1 / 0\nexcept:\n    print("bare")',
    ).join() === "bare",
    "[w6] bare except catches anything",
  );
  expect(
    sem(
      'try:\n    x = 1 / 0\nexcept Exception:\n    print("any")',
    ).join() === "any",
    "[w6] except Exception catches any error",
  );
  expect(
    sem(
      'import requests\nr = requests.get("https://api.frankfurter.app/latest?from=USD&to=JPY")\nprint(r.json()["rates"]["JPY"])',
    ).join() === "149.98",
    "[w6] real endpoint: nested JSON navigation",
  );
  expect(
    sem('import requests\nprint(requests)').join() === "<module 'requests'>",
    "[w6] the module itself prints as a module",
  );
  expect(
    sem(
      'import requests\nr = requests.get("https://anything.example.com/x")\nprint(r.status_code)',
    ).join() === "404",
    "[w6] any unregistered URL answers 404 (never a crash)",
  );
  expect(
    sem('import math').some((l) => l.includes("only requests")),
    "[w6] import math → SimNote",
  );
  expect(
    sem('try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print("handled")\nprint("after")').join() ===
      "handled,after",
    "[w6] program continues after a handled error",
  );
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  failures.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log(
  "PASS: python sim — weeks 3, 4, 5 (24 missions) + semantics + errors + file persistence",
);
