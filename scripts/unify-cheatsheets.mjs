import { readFileSync, writeFileSync, readdirSync } from "node:fs";

// Unifies cheat-sheet rows where win === linux into a single `command` field.
// Run once: node scripts/unify-cheatsheets.mjs
const dir = new URL("../src/data/guides/", import.meta.url);
const files = readdirSync(dir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts",
);

const q = `(?:"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')`;
const re = new RegExp(`(\\{ action: "[^"]*", )win: (${q}), linux: (${q})`, "g");

let total = 0;
for (const f of files) {
  const p = new URL(f, dir).pathname;
  let src = readFileSync(p, "utf8");
  let n = 0;
  src = src.replace(re, (m, pre, w, l) => {
    if (w === l) {
      n++;
      return `${pre}command: ${w}`;
    }
    return m;
  });
  if (n) {
    writeFileSync(p, src);
    console.log(f, "->", n, "rows unified");
    total += n;
  }
}
console.log("total:", total);
