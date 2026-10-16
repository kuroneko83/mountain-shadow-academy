import type { Guide } from "../types";

export const guideWatchEn: Guide = {
  slug: "market-watch",
  title: "market-watch: one script, one job",
  intro:
    "This guide serves Week 7. One week to consolidate: turn the fetch script into a small, reliable tool. The simulator's internet has a new endpoint — 30 days of USD/JPY history — and this week you fetch it, turn it into a list, compute real statistics (min, max, mean, std), find the biggest move, and write a report that survives the run. The missions build the actual market-watch.py of the weekly plan.",
  week: "07-market-watch",
  sections: [
    {
      heading: "1. The shape of a real tool",
      body: "Week 6's script did one fetch. A real tool has a shape: fetch → clean → analyze → report. Fetch gets the raw data (a dict of dates). Clean reshapes it into what the analysis needs (a plain list of numbers). Analyze computes the answers (min, max, mean, std, biggest move). Report turns the answers into text a human reads — and this week, into a file that survives the run. Four verbs, one direction, no shortcuts: the exact pipeline of every data tool from this script to the biggest systems you'll ever touch.",
      examples: [
        {
          label: "The four verbs",
          cmd: "fetch (requests) --> clean (loops) --> analyze (math) --> report (f-strings + files)",
          note: "Four verbs, one direction. Learn it here; reuse it forever.",
        },
      ],
    },
    {
      heading: "2. The history endpoint: a new JSON shape",
      body: "The internet got a second kind of endpoint: history. https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY answers 30 days at once — and notice the new shape: rates is a dict whose KEYS are dates, each date holding its own little dict of rates. Dates as keys: iterate with for date in data[\"rates\"] and you walk the days; data[\"rates\"][date][\"JPY\"] is that day's rate. Real APIs return shapes like this constantly — a dict of dicts keyed by date is the classic time-series shape you'll meet again in pandas in Week 8.",
      examples: [
        {
          label: "Both",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY\"\ndata = requests.get(url).json()\nprint(len(data[\"rates\"]))\nprint(data[\"rates\"][\"2026-09-16\"])\nprint(data[\"rates\"][\"2026-09-16\"][\"JPY\"])",
          output: "30\n{'JPY': 147.8}\n147.8",
          note: "30 days, one request. Dates as keys — the classic time-series shape.",
        },
      ],
    },
    {
      heading: "3. Clean: from dict-of-dicts to a list of numbers",
      body: "The analysis doesn't want a dict of dicts — it wants a list of numbers. So the clean step reshapes: two empty lists, a for loop over the dates, and appends. values ends up as 30 plain numbers, dates as 30 date strings, in the same order — two parallel lists. This reshaping IS data cleaning at its core: the shape you get is never the shape you need, and converting between shapes is half of all data work. Note the discipline: one loop fills both lists, keeping positions aligned — values[i] and dates[i] are always the same day.",
      examples: [
        {
          label: "Both",
          cmd: "values = []\ndates = []\nfor date in data[\"rates\"]:\n    values.append(data[\"rates\"][date][\"JPY\"])\n    dates.append(date)",
          note: "Two lists, one loop, same order — values[i] and dates[i] are the same day. That alignment is what the biggest-move analysis needs.",
        },
      ],
    },
    {
      heading: "4. min, max, sum: your loops, paid off",
      body: "In Week 4 you wrote total() with your own loop and I promised the language would reward you later. Here it is: min(values), max(values), sum(values) — built-ins that do exactly what your loops did, in one call each. The reward is double: less code AND you know exactly what they do inside, because you've built them by hand. min() and max() on an empty list refuse loudly (ValueError: min() arg is an empty sequence) — an honest error, because 'the minimum of nothing' has no answer.",
      examples: [
        {
          label: "Both",
          cmd: "print(min(values))\nprint(max(values))\nprint(sum(values) / len(values))",
          output: "146.5\n151.6\n148.91933333333334",
          note: "Week 4's accumulator, factory-made. You know what's inside because you built it.",
        },
      ],
    },
    {
      heading: "5. Mean and std: the two honest numbers",
      body: "The mean is sum divided by count: sum(values) / len(values). The std (standard deviation) measures how spread out the days are around the mean — for a trader, that's volatility, and it's the difference between a calm month and a wild one. The recipe, slow: subtract the mean from every value (how far each day is from average), square each distance (makes negatives positive), average those squares, take the square root (** 0.5 — the power of a half undoes the squaring). Walk it with [1, 2, 3]: mean 2, distances -1, 0, 1, squares 1, 0, 1, average 0.667, sqrt 0.82. Small list, small std — the numbers are doing exactly what intuition says.",
      examples: [
        {
          label: "Both — mean and std",
          cmd: "mean = sum(values) / len(values)\ntotal = 0\nfor v in values:\n    total += (v - mean) ** 2\nstd = (total / len(values)) ** 0.5\nprint(f\"mean: {mean:.2f}\")\nprint(f\"std: {std:.2f}\")",
          output: "mean: 148.92\nstd: 1.38",
          note: "Subtract, square, average, square-root. Four steps, and .2f makes it human.",
        },
      ],
    },
    {
      heading: "6. The biggest move: yesterday vs today",
      body: "The report's headline: which day moved the most? Compare each day with the one before: change = values[i] - values[i - 1], for i in range(1, len(values)) — from 1, because day 0 has no yesterday. Track the biggest absolute move: if abs(change) > abs(biggest), keep BOTH the change and its date (dates[i]). The -1.62 drop of 2026-10-15 wins in our data — and notice: the function abs() was already yours since Week 3. Real analysis is always this: small pieces you already own, composed.",
      examples: [
        {
          label: "Both",
          cmd: "biggest = 0\nbiggest_date = \"\"\nfor i in range(1, len(values)):\n    change = values[i] - values[i - 1]\n    if abs(change) > abs(biggest):\n        biggest = change\n        biggest_date = dates[i]\nprint(f\"biggest move: {biggest_date} ({biggest:.2f})\")",
          output: "biggest move: 2026-10-15 (-1.62)",
          note: "From 1 (day 0 has no yesterday). abs() compares sizes of moves; the sign tells the direction.",
        },
      ],
    },
    {
      heading: "7. Report: compose, then write it down",
      body: "The report step is a function like any other: def report(values): that builds lines (a list of f-strings), joins them with \"\\n\", and RETURNS the text — return, not print, because the caller decides what to do with it: print it, or write it to report.txt with open. That's the Week-4 lesson at tool scale: functions produce values; the main program decides where they go. And writing the report to a file makes it survive the run — press Run again with only the reading part and it's still there. Your output is now a product, not just a screen.",
      examples: [
        {
          label: "Both",
          cmd: "def report(values):\n    lines = []\n    lines.append(\"USD/JPY 30-day report\")\n    lines.append(f\"min: {min(values)}\")\n    lines.append(f\"mean: {sum(values) / len(values):.2f}\")\n    return \"\\n\".join(lines)\n\ntext = report(values)\nprint(text)\nwith open(\"report.txt\", \"w\") as f:\n    f.write(text)",
          output: "USD/JPY 30-day report\nmin: 146.5\nmean: 148.92",
          note: "Build lines, join, RETURN. The caller prints or writes — the function doesn't care.",
        },
      ],
    },
    {
      heading: "8. print() vs logging: growing up gently",
      body: "This week your tool is honest with prints: a line per event, a clear prefix ('skipping: bad status'). When scripts grow up and run unattended, prints graduate into logging: the same messages, but with levels (INFO for normal work, WARNING for skips, ERROR for failures) and timestamps — so a log can tell you what happened at 3 a.m. without you asking. For this project, disciplined prints are enough; knowing the difference is the point. The simulator keeps prints — the habit to build now is the prefix, the one that says WHO spoke.",
      examples: [
        {
          label: "The habit that transfers",
          cmd: "print(\"skipping: bad status\")\nprint(\"fetched: 30 days\")\nprint(\"report: written to report.txt\")",
          note: "Every line says WHO spoke. That habit is 90% of logging — the levels and timestamps come later.",
        },
      ],
    },
    {
      heading: "9. Running it daily (real machine, optional)",
      body: "The real market-watch earns its keep by running itself. Linux/macOS: cron — crontab.guru helps you write the schedule; a line like 0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py runs it 09:00, weekdays. Windows: Task Scheduler — Create Basic Task → trigger daily → action: start a program → your .venv python and the script path. Both do the same job: your OS, the world's most reliable while-loop, presses Run for you. Optional this week — but the mental image matters: tools that run themselves.",
      examples: [
        {
          label: "Linux / macOS (cron)",
          cmd: "0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py",
          note: "09:00 on weekdays. crontab.guru writes these for you.",
        },
        {
          label: "Windows (Task Scheduler)",
          cmd: "Task Scheduler → Create Basic Task → Daily 09:00 → Start a program → python.exe + script path",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "market-watch — quick reference",
    rows: [
      { action: "30 days in one request", command: 'requests.get("...2026-09-16..2026-10-15?from=USD&to=JPY")', result: "(a 30-day response)" },
      { action: "The time-series shape", command: 'data["rates"][date]["JPY"]', result: "147.8 (that day's rate)" },
      { action: "Walk the days", command: 'for date in data["rates"]:', result: "(one date per turn)" },
      { action: "Reshape to a list", command: "values.append(data[\"rates\"][date][\"JPY\"])", result: "(nothing shows — the list grows)" },
      { action: "Smallest / largest", command: "min(values), max(values)", result: "146.5 / 151.6" },
      { action: "The mean", command: "sum(values) / len(values)", result: "148.92 (with .2f)" },
      { action: "The std (volatility)", command: "(total / len(values)) ** 0.5", result: "1.38 (with .2f)" },
      { action: "Square root", command: "x ** 0.5", result: "the square root of x" },
      { action: "Each day vs yesterday", command: "for i in range(1, len(values)):", result: "(from 1 — day 0 has no yesterday)" },
      { action: "Today's move", command: "values[i] - values[i - 1]", result: "+0.30 / -1.62 ..." },
      { action: "Build the report", command: 'lines.append(f"min: {min(values)}")', result: "(one line per append)" },
      { action: "Lines → text", command: '"\\n".join(lines)', result: "(one text, newlines between)" },
      { action: "Make it survive", command: 'with open("report.txt", "w") as f:', result: "(the file persists between runs)" },
    ],
  },
  missions: [
    {
      id: "s1",
      prompt: "Fetch the history: the 2026-09-16..2026-10-15 USD→JPY endpoint, park response.json() in data, and print the number of days — len(data[\"rates\"]).",
      hint: "The URL is https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY — then print(len(data[\"rates\"])).",
    },
    {
      id: "s2",
      prompt: "Clean: two empty lists values and dates; one for loop over the dates appending each day's JPY rate and each date.",
      hint: "for date in data[\"rates\"]: then values.append(data[\"rates\"][date][\"JPY\"]) and dates.append(date).",
    },
    {
      id: "s3",
      prompt: "First stats: print(f\"min: {min(values)}\") and print(f\"max: {max(values)}\") — your Week-4 loops, factory-made.",
      hint: "min(values) and max(values) — the built-ins from section 4.",
    },
    {
      id: "s4",
      prompt: "The mean: mean = sum(values) / len(values), printed with exactly 2 decimals.",
      hint: 'print(f"mean: {mean:.2f}") — sum and len, one line each.',
    },
    {
      id: "s5",
      prompt: "Volatility: compute the std — squared distances from the mean, averaged, square root — printed with 2 decimals.",
      hint: "total = 0 / for v in values: total += (v - mean) ** 2 / std = (total / len(values)) ** 0.5 — then print(f\"std: {std:.2f}\").",
    },
    {
      id: "s6",
      prompt: "The headline: the biggest daily move — compare each day with yesterday, track the biggest absolute change, and print(f\"biggest move: {biggest_date} ({biggest:.2f})\").",
      hint: "for i in range(1, len(values)): change = values[i] - values[i - 1] — if abs(change) > abs(biggest): keep change AND dates[i].",
    },
    {
      id: "s7",
      prompt: "Make it survive: a function report(values) that builds the lines (title 'USD/JPY 30-day report', min, mean), joins them, RETURNS the text; print it and write it to report.txt.",
      hint: 'lines = [] / lines.append("USD/JPY 30-day report") / ... / return "\\n".join(lines) — then text = report(values), print(text), and with open("report.txt", "w") to save it.',
    },
    {
      id: "s8",
      prompt: "Ship it: the full pipeline — fetch, clean, stats, biggest move, report, file — one program, in order. Run it; everything above lights up at once.",
      hint: "Everything you built, in the order of the sections: fetch → values/dates → min/max/mean/std → biggest move → report(values) → report.txt. One Run, all green.",
    },
  ],
  quiz: [
    {
      q: "What is the shape of a real data tool?",
      options: [
        "One big function that does everything",
        "Fetch → clean → analyze → report — four verbs, one direction",
        "Read the data, print the data",
        "Whatever the API returns",
      ],
      answer: 1,
      why: "Four verbs, one direction, no shortcuts — the pipeline of every data tool from this script to the biggest systems.",
    },
    {
      q: "What's new about the history endpoint's JSON shape?",
      options: [
        "Nothing — same as latest",
        "rates is a dict whose KEYS are dates, each holding its own dict of rates — the classic time-series shape",
        "It returns a list, not a dict",
        "It returns text instead of JSON",
      ],
      answer: 1,
      why: "Dates as keys: iterating the dict walks the days. You'll meet this exact shape again in pandas.",
    },
    {
      q: "Why does the clean step reshape the dict-of-dicts into a list?",
      options: [
        "Lists are faster",
        "The analysis needs a plain list of numbers — the shape you get is never the shape you need",
        "Dicts can't be iterated",
        "To make the file smaller",
      ],
      answer: 1,
      why: "Converting between shapes is half of all data work — that's what 'cleaning' mostly means.",
    },
    {
      q: "What do values[i] and dates[i] have in common?",
      options: [
        "Nothing",
        "They were filled in the same loop, so position i in both is the same day — parallel lists",
        "They are always equal",
        "One is a copy of the other",
      ],
      answer: 1,
      why: "One loop fills both, in the same order. That alignment is exactly what the biggest-move analysis needs.",
    },
    {
      q: "What does min([]) — an empty list — do?",
      options: [
        "Returns 0",
        "Returns None",
        "Raises ValueError: min() arg is an empty sequence — 'the minimum of nothing' has no answer",
        "Returns an empty list",
      ],
      answer: 2,
      why: "An honest refusal. If your data is empty, you want the loud error, not a silent 0.",
    },
    {
      q: "How is the std computed, in order?",
      options: [
        "Sort the values and take the middle",
        "Subtract the mean from each value, square the distances, average the squares, take the square root",
        "Add everything and divide by two",
        "Take the biggest minus the smallest",
      ],
      answer: 1,
      why: "Subtract, square, average, square-root. For a trader that number is volatility — the difference between a calm and a wild month.",
    },
    {
      q: "What is x ** 0.5?",
      options: [
        "x divided by 0.5",
        "x to the power of a half — the square root of x",
        "Half of x",
        "An error — powers must be integers",
      ],
      answer: 1,
      why: "The power of a half undoes squaring — the square-root trick used by the std recipe.",
    },
    {
      q: "Why does the biggest-move loop start at range(1, len(values))?",
      options: [
        "Day 0 is invalid data",
        "Because day 0 has no yesterday to compare with — change = values[i] - values[i - 1] needs i - 1 to exist",
        "To skip the weekend",
        "Because Python lists start at 1",
      ],
      answer: 1,
      why: "Comparisons need a pair. Start at 1 and every day has its yesterday.",
    },
    {
      q: "Why should report() return the text instead of printing it?",
      options: [
        "Printing is slower",
        "The caller decides what to do with it — print it, write it to a file: functions produce, callers decide",
        "Python forbids printing inside functions",
        "Files need text, not prints",
      ],
      answer: 1,
      why: "The Week-4 lesson at tool scale: functions RETURN. print is a decision that belongs to the main program.",
    },
    {
      q: "What survives between two Runs of your program?",
      options: [
        "All variables",
        "Files — variables die at the end of every run; files persist (the fake disk in the simulator, your real disk at home)",
        "Nothing",
        "Only the last print",
      ],
      answer: 1,
      why: "Memory is for now, storage is for later — the same split since Week 5, now producing a product: report.txt.",
    },
    {
      q: "What is the difference between print() and logging?",
      options: [
        "logging is faster",
        "logging is prints grown up: levels (INFO/WARNING/ERROR) and timestamps — messages that can explain a 3 a.m. run without being asked",
        "logging only works in files",
        "Nothing — synonyms",
      ],
      answer: 1,
      why: "For this project, disciplined prints are enough. The habit that transfers NOW is the prefix that says who spoke.",
    },
    {
      q: "What do cron and Task Scheduler actually do for your tool?",
      options: [
        "Make the script faster",
        "Press Run for you on a schedule — your OS, the world's most reliable while-loop",
        "Fix bugs automatically",
        "Compress the report",
      ],
      answer: 1,
      why: "Tools that run themselves: 09:00 every weekday, no human involved. Optional this week — the mental image is the point.",
    },
  ],
  outro:
    "When the eighth mission lights up in one Run, you have shipped the Week 7 project: fetch 30 days, reshape, real statistics, the headline move, a report that survives. Do it once more from an empty editor — when the four verbs come out in order without thinking, you're ready for Week 8, where pandas takes over the cleaning and the math, and your loops finally see what they've been training for.",
};
