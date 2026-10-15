import type { Guide } from "../types";

export const guideDataEn: Guide = {
  slug: "data-files",
  title: "Data structures & files: making programs remember",
  intro:
    "This guide serves Week 5. So far, every program forgot everything the moment it ended. This week fixes that twice over: structures (lists, dicts) hold data during the run, and files hold data between runs. In the simulator below, files really persist between presses of Run — like a real disk. Build the expense-tracker: a list, a dict, a file, and the function that totals it all.",
  week: "05-structures-files",
  sections: [
    {
      heading: "1. Programs forget — the two remedies",
      body: "Every variable dies when the program ends. Two remedies, for two different problems: during ONE run, structures keep data organized (a list of expenses, a dict of one expense's fields). BETWEEN runs, files keep data alive on disk. The expense-tracker project uses both: a list while you work, a file so yesterday's expenses are still there tomorrow. This is the exact split every data system in the world uses — memory for now, storage for later.",
      examples: [
        {
          label: "The two lifetimes",
          cmd: "expenses = []\nexpenses.append(\"coffee,500\")\n# ...dies at the end of the run\n\nwith open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\")\n# ...survives the end of the run",
          note: "The list dies. The file survives. In this simulator: press Run twice and see.",
        },
      ],
    },
    {
      heading: "2. Lists in depth — and the mutation surprise",
      body: "You met lists in Week 4. Three things deepen now. append() changes the list itself and returns None — unlike string methods, which return new strings and change nothing: strings are immutable, lists are mutable. Indexes start at 0 and can be negative from the end. And lists can be changed item by item: expenses[0] = \"tea,300\" replaces one element. That mutability is exactly why lists are the workhorse of data work.",
      examples: [
        {
          label: "Both",
          cmd: "expenses = [\"coffee,500\", \"train,2000\"]\nexpenses.append(\"lunch,900\")\nexpenses[0] = \"tea,300\"\nprint(expenses)",
          output: "['tea,300', 'train,2000', 'lunch,900']",
          note: "append returns None (print it and see) — the change is IN the list.",
        },
      ],
    },
    {
      heading: "3. in and not in: asking if something is there",
      body: "\"coffee\" in expenses answers True or False — is it in the list? 'ff' in \"coffee\" asks substring. \"item\" in expense_dict asks: is that KEY in the dict. And not in flips it. This tiny operator removes an entire category of loops: instead of looping to search, you ask in one line. You'll use it every day — mostly in the pattern 'if the thing is not in the collection, add it'.",
      examples: [
        {
          label: "Both",
          cmd: "print(\"coffee\" in [\"coffee\", \"train\"])\nprint(\"ff\" in \"coffee\")\nprint(\"tea\" not in [\"coffee\", \"train\"])",
          output: "True\nTrue\nTrue",
        },
      ],
    },
    {
      heading: "4. Dictionaries: labels instead of positions",
      body: "A list answers 'what's at position 2?'. A dict answers 'what's the amount?'. Curly braces, key: value pairs: expense = {\"item\": \"coffee\", \"amount\": 500}. Access by key: expense[\"amount\"] is 500. Missing keys are the classic trap: expense[\"date\"] is a KeyError — Python refuses to invent a value, loudly. Assigning to a key ADDS it if it's new: expense[\"date\"] = \"2026-10-15\". Dicts keep order (insertion order) and can hold anything — strings, numbers, lists, other dicts.",
      examples: [
        {
          label: "Both",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense[\"amount\"])\nexpense[\"date\"] = \"2026-10-15\"\nprint(expense)",
          output: "500\n{'item': 'coffee', 'amount': 500, 'date': '2026-10-15'}",
          note: "Access by key, assign to a key to add. Order is insertion order.",
        },
        {
          label: "The KeyError",
          cmd: "expense = {\"item\": \"coffee\"}\nprint(expense[\"date\"])",
          output: "KeyError: 'date'",
          note: "The missing-key error — loud and precise, on purpose.",
        },
      ],
    },
    {
      heading: "5. The polite alternative: .get(), and walking a dict",
      body: "expense.get(\"date\") returns None instead of exploding; .get(\"date\", \"unknown\") returns your default. Looping: for k in expense walks the KEYS. for v in expense.values() walks the values; for k, v in expense.items() — Week 5's most elegant pair — we'll keep items() simple here (a list of pairs). Rule of thumb: when a key SHOULD exist and its absence is a bug, use [] (loud KeyError); when absence is normal life, use .get (silent default).",
      examples: [
        {
          label: "Both",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense.get(\"date\"))\nprint(expense.get(\"date\", \"no date\"))\nfor k in expense:\n    print(k)",
          output: "None\nno date\nitem\namount",
          note: "[] is loud on missing keys; .get is polite. Choose by meaning, not habit.",
        },
      ],
    },
    {
      heading: "6. Tuples: lists that cannot change",
      body: "A tuple is a list that's locked: (\"2026-10-15\", \"coffee\", 500). Parentheses instead of brackets, and no append, no item assignment — try and Python says tuples don't support item assignment. Why want something locked? Because immutability is a promise: this will not change under your feet. Tuples are the natural shape of a fixed record — a date-item-amount triple is born together and stays together. In this simulator you'll use lists and dicts; tuples you'll meet for real in the project week.",
      examples: [
        {
          label: "Both",
          cmd: "expense = (\"2026-10-15\", \"coffee\", 500)\nprint(expense[0])\nprint(expense[2])",
          output: "2026-10-15\n500",
          note: "Read by position — but never written. Locked at birth.",
        },
      ],
    },
    {
      heading: "7. Files: open, with, and the three modes",
      body: "open(\"expenses.txt\", \"w\") opens a file: mode \"w\" writes (and erases existing content — careful), \"a\" appends to the end, \"r\" reads (and fails loudly if the file doesn't exist: FileNotFoundError). The professional shape is with open(...) as f: — the with guarantees the file is closed when the block ends, even if an error happens inside. Inside the block: f.write(text) writes, f.read() reads everything into one string, f.readlines() gives a list of lines.",
      examples: [
        {
          label: "Both — write",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")\n    f.write(\"train,2000\\n\")",
          note: "Write mode erases the file first. Append mode (\"a\") adds to the end instead.",
        },
        {
          label: "Both — read",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    content = f.read()\nprint(content)",
          output: "coffee,500\ntrain,2000\n",
        },
      ],
    },
    {
      heading: "8. The CSV idea: text that means a table",
      body: "A CSV file is just text where each line is a row and commas separate the columns — coffee,500 is one expense. You already know all the tools: write lines with f.write(item + \"\\n\"), read them back with content.split(\"\\n\"), and split each line with line.split(\",\") — which gives [\"coffee\", \"500\"]. Converting the price back: int(\"500\"). That's the whole csv idea; Python's real csv module just automates the splitting (and quoting) — in this simulator you'll do it by hand, which is exactly how you'll understand what the module does later. To join a list back into text: \", \".join(items) — the mirror of split.",
      examples: [
        {
          label: "Both",
          cmd: "line = \"coffee,500\"\nparts = line.split(\",\")\nprint(parts)\nprint(parts[0])\nprint(int(parts[1]))\nprint(\", \".join([\"a\", \"b\"]))",
          output: "['coffee', '500']\ncoffee\n500\na, b",
          note: "split turns text into a list; join turns a list back into text.",
        },
      ],
    },
    {
      heading: "9. Persistence: press Run twice",
      body: "Here's the moment this simulator earns its keep: variables die at the end of every run, but files survive it. Write a file in one program, press Run again with a different program that reads it — the content is still there (the simulator keeps files in your browser's storage; on your machine, that's the disk). That persistence is the entire reason files exist. And the reset button wipes the fake disk — a fresh start when you want one.",
      examples: [
        {
          label: "Run 1: write",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")",
          note: "Run this. Then replace the whole program with the next example and Run again.",
        },
        {
          label: "Run 2 (a different program!): read",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    print(f.read())",
          output: "coffee,500\n",
          note: "The variable expenses is long dead — the file remembers. That's storage.",
        },
      ],
    },
    {
      heading: "10. When things go wrong — the Week 5 classics",
      body: "KeyError: 'date' — missing dict key: add the key, or use .get with a default. FileNotFoundError — reading a file that doesn't exist: create it first (write once) or check the name with ls. io.UnsupportedOperation: not writable / not readable — the file was opened with the wrong mode: 'r' files can't write, 'w' files can't read. The trailing empty line: files end with \\n, so split(\"\\n\") gives an empty string at the end — filter it (if line != \"\"), or you'll total a line that isn't there. And the silence trap: append() returns None — printing it shows None, not the list.",
      examples: [
        {
          label: "The trailing empty line",
          cmd: "content = \"coffee,500\\ntrain,2000\\n\"\nprint(content.split(\"\\n\"))",
          output: "['coffee,500', 'train,2000', '']",
          note: "See the '' at the end? That's the newline ending the file. Filter it before counting.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Structures and files — quick reference",
    rows: [
      { action: "Add to end of list", command: "expenses.append(\"coffee,500\")", result: "None (the list itself changed)" },
      { action: "Replace one item", command: "expenses[0] = \"tea,300\"", result: "(the item changed — silence)" },
      { action: "Is it there?", command: "\"coffee\" in expenses", result: "True / False" },
      { action: "Make a dict", command: "{\"item\": \"coffee\", \"amount\": 500}" },
      { action: "Read a key (loud)", command: "expense[\"amount\"]", result: "500" },
      { action: "Read a key (polite)", command: "expense.get(\"date\", \"none\")", result: "None, or your default" },
      { action: "Walk keys / values", command: "for k in d: / d.values()", result: "item, amount" },
      { action: "Write a file", command: "with open(\"f.txt\", \"w\") as f:", result: "(the file empties — silence)" },
      { action: "Append to a file", command: "with open(\"f.txt\", \"a\") as f:", result: "(silence = success)" },
      { action: "Read a file", command: "with open(\"f.txt\") as f:" },
      { action: "Text → list", command: "line.split(\",\")", result: "['coffee', '500']" },
      { action: "List → text", command: "\", \".join(items)", result: "a, b" },
    ],
  },
  missions: [
    {
      id: "d1",
      prompt: "Start the tracker: create an empty list called expenses and print it.",
      hint: "expenses = [] — empty list literal. print(expenses) shows []",
    },
    {
      id: "d2",
      prompt: "Add the first expense: append the string \"coffee,500\" to expenses, and print the list.",
      hint: "expenses.append(\"coffee,500\") then print(expenses). Note: append returns None — print the LIST, not the append.",
    },
    {
      id: "d3",
      prompt: "Two more: append \"train,2000\" and \"lunch,900\". The list now has exactly 3 expenses.",
      hint: "expenses.append(\"train,2000\") and expenses.append(\"lunch,900\")",
    },
    {
      id: "d4",
      prompt: "Walk the list: a for loop printing each expense, one per line.",
      hint: "for e in expenses: print(e) — your Week-4 loop, unchanged.",
    },
    {
      id: "d5",
      prompt: "One expense, properly structured: a dict expense = {\"item\": \"coffee\", \"amount\": 500}, and print(f\"{expense['item']}: {expense['amount']} yen\").",
      hint: "Inside the f-string braces, dict access works: {expense['item']} — single quotes inside double quotes.",
    },
    {
      id: "d6",
      prompt: "Make it survive: write all three expenses to expenses.txt, one per line (with open and a loop).",
      hint: "with open(\"expenses.txt\", \"w\") as f: then for e in expenses: f.write(e + \"\\n\")",
    },
    {
      id: "d7",
      prompt: "Prove the persistence: READ the file back (f.read()), split it into lines, print each expense line. This can be a later Run — the file remembers.",
      hint: "with open(\"expenses.txt\", \"r\") as f: content = f.read() — then for line in content.split(\"\\n\"): print(line). Filter the trailing empty line: if line != \"\"",
    },
    {
      id: "d8",
      prompt: "The payoff: read the file, split each line by the comma, convert the amount with int(), and print(f\"total: {total}\") — 3400.",
      hint: "for line in content.split(\"\\n\"): if line != \"\": parts = line.split(\",\") and total += int(parts[1])",
    },
  ],
  quiz: [
    {
      q: "Why does the program 'forget' expenses between runs?",
      options: [
        "A bug in Python",
        "Variables live in memory, which is wiped when the program ends — files survive because they live on storage",
        "Files are also wiped, you just don't notice",
        "Lists need a special flag to persist",
      ],
      answer: 1,
      why: "Memory is for now, storage is for later. This exact split is the foundation of every data system.",
    },
    {
      q: "What is the difference between append() and string methods like .upper()?",
      options: [
        "None, both change the object",
        "append() changes the list itself and returns None; .upper() changes nothing and returns a NEW string",
        "append() returns a new list",
        ".upper() changes the string itself",
      ],
      answer: 1,
      why: "Lists are mutable, strings are immutable. That's the week's most practical surprise.",
    },
    {
      q: 'expense = {"item": "coffee"} — what is expense["date"]?',
      options: ["None", "An empty string", "KeyError: 'date'", "False"],
      answer: 2,
      why: "[] is loud on missing keys — Python refuses to invent a value. Absence being normal → use .get.",
    },
    {
      q: 'How do you read the key "date" politely, getting "no date" when it is missing?',
      options: [
        'expense["date", "no date"]',
        'expense.get("date", "no date")',
        'expense.read("date")',
        'expense.key("no date")',
      ],
      answer: 1,
      why: ".get(key, default): silent default instead of an explosion. Choose by meaning: bug → [], normal life → .get.",
    },
    {
      q: 'What does for k in expense: walk?',
      options: [
        "The values",
        "The (key, value) pairs",
        "The keys",
        "The characters of the first value",
      ],
      answer: 2,
      why: "Looping a dict walks its keys — the natural 'for each field' shape.",
    },
    {
      q: "What is the difference between \"w\" and \"a\" when opening a file?",
      options: [
        "Nothing",
        "\"w\" writes and ERASES existing content; \"a\" appends to the end, keeping what was there",
        "\"a\" is only for adding numbers",
        "\"w\" is only for new files",
      ],
      answer: 1,
      why: "The classic data-loss trap: open an existing file with \"w\" and yesterday's data is gone. Append keeps it.",
    },
    {
      q: "What does with open(\"f.txt\") as f: guarantee?",
      options: [
        "The file is read automatically",
        "The file is closed when the block ends — even if an error happens inside",
        "The file cannot be modified",
        "The file is written to disk",
      ],
      answer: 1,
      why: "with is a promise: the door closes behind you, whatever happens. That's why it's the professional shape.",
    },
    {
      q: 'open("expenses.txt", "r") fails with FileNotFoundError. Most likely cause?',
      options: [
        "Files need to be created by the OS first",
        "The file doesn\'t exist — it was never written, or the name is misspelled",
        "The mode is wrong",
        "Reads are not allowed in this folder",
      ],
      answer: 1,
      why: "Reading a file that doesn't exist fails loudly (on purpose). Write it once, or check the name.",
    },
    {
      q: 'line = "coffee,500" — what is line.split(",")?',
      options: [
        "\"coffee 500\"",
        "[\"coffee\", \"500\"]",
        "500",
        "[\"coffee,500\"]",
      ],
      answer: 1,
      why: "split turns text into a list, cutting at the separator — the whole CSV idea in one method.",
    },
    {
      q: 'Why is int(line.split(",")[1]) needed after splitting "coffee,500"?',
      options: [
        "split returns text pieces — \"500\" is still a string, and you cannot do math with strings",
        "It sorts the list",
        "It removes the comma",
        "It isn't needed",
      ],
      answer: 0,
      why: "Data from files ALWAYS arrives as text. Converting is your job — the Week-3 lesson, now with storage.",
    },
    {
      q: "A file's content ends with a newline. What does content.split(\"\\n\") give?",
      options: [
        "Only the real lines",
        "The real lines PLUS an empty string at the end",
        "An error",
        "One single string",
      ],
      answer: 1,
      why: "The trailing empty line is the classic off-by-one of file work — filter it (if line != \"\") before counting or totaling.",
    },
    {
      q: "Why is a tuple the natural shape for one expense record (date, item, amount)?",
      options: [
        "It's faster",
        "It's immutable — a promise that the record won't change under your feet",
        "It uses less memory",
        "Tuples can hold more items",
      ],
      answer: 1,
      why: "The three values are born together and stay together — immutability is a feature, not a limitation.",
    },
  ],
  outro:
    "When the eight missions pass, you have built the heart of Week 5's real project: a tracker that survives its own end. Press Run again with only the reading part — the file still remembers. Then do the real thing on your machine: same structure, real files on your real disk, and the real csv module instead of your hand-rolled split. Next week, Week 6: your scripts talk to the internet — requests, JSON, and the fx-tracker project.",
};
