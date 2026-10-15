/**
 * Adds `result` fields to cheat-sheet rows, selectively.
 * Run once: node scripts/add-cheat-results.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

// language-dependent notes (outputs themselves are language-neutral)
const NOTES = {
  en: {
    silence: "(silence = success)",
    stored: "(the value is stored — nothing shows)",
    definition: "(nothing runs — it's a definition)",
    oneBranch: "(exactly one branch runs)",
    valueBack: "(the value goes back to the caller)",
    noneList: "None (the list itself changed)",
    getDefault: "None, or your default",
    statusDepends: "(a report of your files — always read it)",
    fileEmpties: "(the file empties — silence)",
    numberNotText: "30000 (a number, not text)",
    screenEmpty: "(the screen goes empty)",
    onePerItem: "(one print per item)",
    afterLast: "28000 (after the last item)",
    dayRange: "day 1 ... day 7",
    itemChanged: "(the item changed — silence)",
  },
  ja: {
    silence: "（沈黙＝成功）",
    stored: "（値が保存される — 表示なし）",
    definition: "（何も動かない — 定義だけ）",
    oneBranch: "（ちょうど1つの枝だけ実行）",
    valueBack: "（値が呼び出し元へ戻る）",
    noneList: "None（リスト自身が変わった）",
    getDefault: "None、またはデフォルト値",
    statusDepends: "（ファイル状態の報告 — 毎回読む）",
    fileEmpties: "（ファイルが空になる — 静寂）",
    numberNotText: "30000（テキストではなく数値）",
    screenEmpty: "（画面が空になる）",
    onePerItem: "（項目ごとに1回表示）",
    afterLast: "28000（最後の項目の後）",
    dayRange: "day 1 ... day 7",
    itemChanged: "（要素が変わる — 静寂）",
  },
  uz: {
    silence: "(jimlik = muvaffaqiyat)",
    stored: "(qiymat saqlanadi — chiqish yoʻq)",
    definition: "(hech narsa ishlamaydi — faqat taʼrif)",
    oneBranch: "(aynan bitta shox ishlaydi)",
    valueBack: "(qiymat chaqiruvchiga qaytadi)",
    noneList: "None (roʻyxatning oʻzi oʻzgardi)",
    getDefault: "None yoki standart qiymat",
    statusDepends: "(fayllaringiz hisoboti — har doim oʻqing)",
    fileEmpties: "(fayl boʻshadi — jimlik)",
    numberNotText: "30000 (matn emas, son)",
    screenEmpty: "(ekran boʻsh boʻladi)",
    onePerItem: "(har elementga bitta chiqish)",
    afterLast: "28000 (oxirgi elementdan keyin)",
    dayRange: "day 1 ... day 7",
    itemChanged: "(element oʻzgaradi — jimlik)",
  },
};

// [unique substring of the row line, result: literal string or "@noteKey"]
const PER_FILE = {
  "command-line": [
    ['command: "pwd"', "/home/you"],
    ['win: "dir / ls"', "projects   notes.txt"],
    ['command: "cd projects"', "@silence"],
    ['command: "cd .."', "@silence"],
    ['win: "cd ~"', "@silence"],
    ['command: "mkdir data"', "@silence"],
    ['win: "New-Item notes.txt"', "@silence"],
    ['win: "type notes.txt"', "Terminal practice — day 1"],
    ['win: "Copy-Item a.txt b.txt"', "@silence"],
    ['win: "Move-Item a.txt b.txt"', "@silence"],
    ['win: "Remove-Item notes.txt"', "@silence"],
    ['command: "clear"', "@screenEmpty"],
    ['command: "python hello.py"', "Hello, world!"],
  ],
  git: [
    ['command: "git init"', "Initialized empty Git repository in .git/"],
    ['command: "git status"', "@statusDepends"],
    ['command: "git add readme.md"', "@silence"],
    ['command: "git add ."', "@silence"],
    ["git commit -m", "[main (root-commit) 9f2a1bc] add readme"],
    ['command: "git log"', "9f2a1bc  add readme"],
    ["git config --global", "@silence"],
    ["git remote add origin", "@silence"],
    ['command: "git push -u origin main"', "main -> main (the upload line)"],
    ['command: "git push"', "Everything up-to-date"],
    ["ssh -T git@github.com", "Hi you! You've successfully authenticated"],
    ["git remote set-url origin", "@silence"],
  ],
  "python-basics": [
    ['command: "rate = 150.0"', "@stored"],
    ['print(f\\"{usd:.2f} USD\\")', "200.00 USD"],
    ['command: "yen / rate"', "200"],
    ['command: "7 // 2, 7 % 2"', "3 and 1"],
    ['command: "f\\"{a} and {b}\\"', null],
    ['command: "f\\"{usd:.2f}\\"', "200.00"],
    ["name.strip().lower()", "mountain shadow"],
    ['command: "len(name)"', "15"],
    ['command: "s[0:8]"', "Mountain"],
    ["yen == 30000", "True / False"],
    ['command: "if / elif / else"', "@oneBranch"],
    ['command: "int(\\"30000\\"), str(200)"', "@numberNotText"],
  ],
  "python-loops": [
    ['command: "for v in volumes:"', "@onePerItem"],
    ['command: "for i in range(1, 8):"', "1, 2, 3, 4, 5, 6, 7"],
    ["range(len(values))", "0, 1, 2, ..."],
    ["result += v", "@afterLast"],
    ["while i <= 7", "@dayRange"],
    ['command: "def total(values):"', "@definition"],
    ['command: "return result"', "@valueBack"],
    ['command: "total(volumes)"', "28000"],
    ["total(values) / len(values)", "4000"],
    ["items.append(3)", "@noneList"],
  ],
  "data-files": [
    ['expenses.append(\\"coffee,500\\")', "@noneList"],
    ['expenses[0] = \\"tea,300\\"', "@itemChanged"],
    ['\\"coffee\\" in expenses', "True / False"],
    ['command: "{\\"item\\": \\"coffee\\", \\"amount\\": 500}"', null],
    ['expense[\\"amount\\"]', "500"],
    ["expense.get(", "@getDefault"],
    ["d.values()", "item, amount"],
    ['open(\\"f.txt\\", \\"w\\")', "@fileEmpties"],
    ['open(\\"f.txt\\", \\"a\\")', "@silence"],
    ['open(\\"f.txt\\")', null],
    ['line.split(\\",\\")', "['coffee', '500']"],
    ["join(items)", "a, b"],
  ],
};

let touched = 0;
for (const [guide, entries] of Object.entries(PER_FILE)) {
  for (const lang of ["en", "ja", "uz"]) {
    const path = `src/data/guides/${guide}.${lang}.ts`;
    let src = readFileSync(path, "utf8");
    for (const [match, result] of entries) {
      const value =
        result === null ? null : result.startsWith("@") ? NOTES[lang][result.slice(1)] : result;
      if (value === null) continue; // deliberately no result → "—" in the table
      const lines = src.split("\n");
      let inRows = false;
      let applied = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("rows: [")) {
          inRows = true;
          continue;
        }
        if (inRows && /^\s*\],\s*$/.test(line)) break; // rows array ended
        if (!applied && inRows && line.includes(match) && !line.includes("result:")) {
          lines[i] = line.replace(/\s*\},$/, `, result: ${JSON.stringify(value)} },`);
          applied = true;
        }
      }
      if (!applied) {
        console.warn(`WARN: no row matched "${match}" in ${path}`);
      }
      src = lines.join("\n");
    }
    writeFileSync(path, src);
    touched++;
  }
}
console.log("files touched:", touched);
