import type { Guide } from "../types";

export const guideApiEn: Guide = {
  slug: "requests-api",
  title: "Scripts that talk to the internet",
  intro:
    "This guide serves Week 6. Everything so far lived on your machine; this week your scripts fetch live data from a real API (Frankfurter — the free, key-less exchange-rate service your real project will use). The simulator below has a fake internet with the same endpoints — plus a typo URL and a flaky one that fails on the first call, on purpose, so you can practice the honest pattern: check the status, retry once, log and skip.",
  week: "06-scripts-apis",
  sections: [
    {
      heading: "1. What an API really is",
      body: "An API is a program that answers at a URL. Your script makes a request ('what is the USD→JPY rate today?'); the server answers a response — a status code plus data. That request/response contract is the whole idea, and it is everywhere: every app on your phone is talking to APIs right now. Frankfurter (api.frankfurter.app) is the friendliest one you'll meet: free, no key, no account — just URLs. In this simulator, import requests works and the three real endpoints are wired in, so the muscle memory you build here transfers directly to your machine.",
      examples: [
        {
          label: "The contract",
          cmd: "your script --requests.get(url)--> the server\nthe server --status 200 + JSON data--> your script",
          note: "Ask at a URL, get a status plus data. That's the deal.",
        },
      ],
    },
    {
      heading: "2. On your real machine: venv and pip (once per project)",
      body: "Requests is not built into Python — it's a package, and packages are installed per project, not globally. The ritual: create a virtual environment (a private Python for this folder), activate it, then pip install. The activation command differs by system — this is a genuine Windows/Linux split, no shared version exists.",
      steps: [
        {
          title: "Create the virtual environment (both, once per project)",
          detail:
            "python -m venv .venv — creates a folder named .venv with a private Python inside. Commit-friendly hint: the .gitignore from Week 2 already covers .venv.",
        },
        {
          title: "Activate — Windows (PowerShell)",
          detail:
            ".venv\\Scripts\\Activate.ps1 — the prompt gets a (.venv) prefix. If PowerShell complains about scripts, run: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned once (a known Windows rite of passage).",
        },
        {
          title: "Activate — Linux / macOS",
          detail: "source .venv/bin/activate — same (.venv) prefix in the prompt.",
        },
        {
          title: "Install requests (with the venv active)",
          detail:
            "pip install requests — downloads it into .venv, nowhere else. From now on this project has requests; other projects stay clean.",
        },
        {
          title: "In this simulator",
          detail:
            "None of this is needed — import requests simply works. The venv ritual is for your real project this week; knowing why it exists is what matters.",
        },
      ],
    },
    {
      heading: "3. requests.get() and the response object",
      body: "response = requests.get(url) sends the request and captures the answer in an object with two things you'll touch constantly: .status_code (the number — 200 means OK) and .json() (the data, converted from JSON text into dicts and lists you already know how to walk). Print the response itself and Python shows <Response [200]> — the object, not the data. The data appears when you ask for it: response.json().",
      examples: [
        {
          label: "Both (simulator and real machine — same code)",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/latest?from=USD&to=JPY\"\nresponse = requests.get(url)\nprint(response.status_code)\nprint(response.json())",
          output:
            "200\n{'amount': 1.0, 'base': 'USD', 'date': '2026-10-15', 'rates': {'JPY': 149.98}}",
        },
      ],
    },
    {
      heading: "4. Reading nested JSON: dicts all the way down",
      body: "JSON data arrives as dicts inside dicts — and you already own that skill from Week 5. response.json() gives the whole thing; each [\"key\"] goes one level deeper: [\"rates\"][\"JPY\"] is the rate itself. Navigate one level at a time, reading each [\"key\"] as 'the field with this name'. If you guess a level wrong, KeyError tells you the exact key that doesn't exist — the same honest error as Week 5. And a professional habit: park the data in a variable (data = response.json()) instead of re-calling .json() on every line.",
      examples: [
        {
          label: "Both",
          cmd: "data = response.json()\nprint(data[\"rates\"])\nprint(data[\"rates\"][\"JPY\"])\nprint(data[\"date\"])",
          output: "{'JPY': 149.98}\n149.98\n2026-10-15",
          note: "One [\"key\"] per level. Parking it in a variable first is the pro habit.",
        },
      ],
    },
    {
      heading: "5. Status codes: check before you trust",
      body: "The status code is the server's first word, and it never lies: 200 means 'here's your data'; 404 means 'that URL doesn't exist' (typo, most often); 500 means 'the server broke — not your fault, not your problem to fix'. The rule: never use data from a response you didn't check. The one-line habit: if response.status_code == 200: — trust the data, else skip it and say so.",
      examples: [
        {
          label: "Both",
          cmd: "bad = requests.get(\"https://api.frankfurter.app/typo\")\nprint(bad.status_code)\nif bad.status_code != 200:\n    print(\"skipping: bad status\")",
          output: "404\nskipping: bad status",
          note: "404 → the URL is wrong. 500 → the server is having a bad day. Either way: don't touch the data.",
        },
      ],
    },
    {
      heading: "6. try / except: the safety net (and raise_for_status)",
      body: "Sometimes failure arrives as an exception, not a status you can read. response.raise_for_status() is the sharp tool: it raises HTTPError (a loud exception) whenever the status is 400 or worse. And try/except is the net around the sharp tool: the try block runs; if an error of the named kind happens, the except block runs INSTEAD of crashing — the program survives, says what it did, and moves on. Catch errors BY NAME (except HTTPError:) — a bare except: also works but catches everything, including your own bugs, which is how real problems hide. finally: runs no matter what — success, failure, anything: the place for 'cleanup must always happen'.",
      examples: [
        {
          label: "Both",
          cmd: "try:\n    response = requests.get(\"https://api.frankfurter.app/typo\")\n    response.raise_for_status()\nexcept HTTPError:\n    print(\"handled: skipped\")\nprint(\"the program continues\")",
          output: "handled: skipped\nthe program continues",
          note: "The error was caught, the message printed, and the program continued. No crash.",
        },
        {
          label: "finally: runs no matter what",
          cmd: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"caught\")\nfinally:\n    print(\"always runs\")",
          output: "caught\nalways runs",
        },
      ],
    },
    {
      heading: "7. The honest pattern: retry once, log, skip",
      body: "Real networks fail sometimes — a timeout, a blip. Production scripts don't pretend otherwise; they follow one honest pattern: try; if the status is bad, retry ONCE (transient failures often cure themselves); if it's still bad, log the failure and SKIP that item — one bad month must not kill the whole run. The simulator has a special endpoint for exactly this: /flaky answers 500 on the first call of every run and 200 after — your retry practice field. This pattern is the heart of Week 6 and of every data pipeline you'll ever run.",
      examples: [
        {
          label: "Both — retry once",
          cmd: "response = requests.get(\"https://api.frankfurter.app/flaky\")\nif response.status_code != 200:\n    response = requests.get(\"https://api.frankfurter.app/flaky\")\nprint(f\"recovered: {response.status_code}\")",
          output: "recovered: 200",
          note: "First call: 500. One retry: 200. Transient failures often cure themselves.",
        },
      ],
    },
    {
      heading: "8. Fetched data meets storage (the fx-tracker, whole)",
      body: "Week 5 taught files; this week taught fetching. The fx-tracker project is just the two glued: fetch each endpoint, check the status, read the nested JSON, and write one CSV line per currency — date,base,rate. Next run reads it back. Your missions build exactly this, and the final one proves it: rates.csv on the fake disk, both rates, readable after the program ends.",
      examples: [
        {
          label: "The whole pipeline in miniature",
          cmd: "rates = []\nresponse = requests.get(url)\nif response.status_code == 200:\n    data = response.json()\n    rate = data[\"rates\"][\"JPY\"]\n    rates.append(f\"{data['date']},USD,{rate}\")\nwith open(\"rates.csv\", \"w\") as f:\n    for r in rates:\n        f.write(r + \"\\n\")",
          note: "Fetch → check → read → collect → store. The shape of every data pipeline in the world.",
        },
      ],
    },
    {
      heading: "9. When things go wrong — the Week 6 classics",
      body: "KeyError inside JSON — the API doesn't have the field you assumed: print(response.json()) and LOOK at the real shape before navigating. HTTPError from raise_for_status — the status was bad and you asked loudly: catch it or check the status before. ConnectionError / getaddrinfo failed (real machine) — the URL is misspelled or you're offline: no request ever left. requests not found / ModuleNotFoundError (real machine) — you forgot the venv ritual from section 2, or the venv isn't active. And the silent trap: a script that crashes nowhere but also writes nothing — because every fetch failed the status check and every skip was silent. Log your skips; silence is how data goes missing without anyone noticing.",
      examples: [
        {
          label: "Always look at the real shape first",
          cmd: "print(response.json())",
          note: "Before navigating ['rates']['JPY'], print the whole thing once and read it. One print saves ten guesses.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Requests and errors — quick reference",
    rows: [
      { action: "Make the module available", command: "import requests", result: "nothing shows — it's a definition" },
      { action: "Ask a URL", command: 'requests.get("https://...")' },
      { action: "Capture the answer", command: "response = requests.get(url)", result: "(the response object is stored)" },
      { action: "The server's first word", command: "response.status_code", result: "200 / 404 / 500" },
      { action: "The data as dicts", command: "response.json()", result: "{'base': 'USD', 'rates': {...}, ...}" },
      { action: "Go one level deeper", command: 'data["rates"]["JPY"]', result: "149.98" },
      { action: "Fail loudly on bad status", command: "response.raise_for_status()", result: "HTTPError when 400+" },
      { action: "The net", command: "try: ... except HTTPError:", result: "(no crash — the except runs)" },
      { action: "Always-run cleanup", command: "finally:", result: "runs on success AND failure" },
      { action: "The honest pattern", command: "retry once, then log and skip", result: "(one bad item never kills the run)" },
      { action: "Real machine only", command: "pip install requests", result: "(installs into .venv)" },
    ],
  },
  missions: [
    {
      id: "r1",
      prompt: "First contact: import requests, fetch the USD→JPY endpoint with requests.get, store it in response, and print response.status_code.",
      hint: 'url = "https://api.frankfurter.app/latest?from=USD&to=JPY" then response = requests.get(url) and print(response.status_code)',
    },
    {
      id: "r2",
      prompt: "Read the rate: park response.json() in a variable, then print the JPY rate — navigate the nested dicts.",
      hint: 'data = response.json() then print(data["rates"]["JPY"]) — one key per level',
    },
    {
      id: "r3",
      prompt: "Second currency: fetch the EUR→JPY endpoint (store it in response too) and print its JPY rate.",
      hint: 'Same URL with from=EUR — then the same navigation. The rate is 163.55.',
    },
    {
      id: "r4",
      prompt: "Collect for the CSV: an empty list rates, then append \"USD,JPY,149.98\" and \"EUR,JPY,163.55\".",
      hint: 'rates = [] then rates.append("USD,JPY,149.98") and rates.append("EUR,JPY,163.55")',
    },
    {
      id: "r5",
      prompt: "Handle the typo: fetch \"https://api.frankfurter.app/typo\" — print its status code, and if it is not 200, print exactly: skipping: bad status.",
      hint: "bad = requests.get(...) / print(bad.status_code) / if bad.status_code != 200: print(\"skipping: bad status\")",
    },
    {
      id: "r6",
      prompt: "Retry practice: the /flaky endpoint answers 500 on the FIRST call and 200 after. Fetch it; if the status is not 200, fetch once more; print(f\"recovered: {response.status_code}\").",
      hint: "url = \"https://api.frankfurter.app/flaky\" — fetch, check, fetch again if needed, print the final status.",
    },
    {
      id: "r7",
      prompt: "The net: inside a try, fetch the typo URL and call response.raise_for_status() — catch HTTPError and print exactly: handled: skipped.",
      hint: "try: / fetch + raise_for_status() / except HTTPError: / print(\"handled: skipped\") — note it's except HTTPError: with the error name.",
    },
    {
      id: "r8",
      prompt: "The fx-tracker, whole: write every rate in rates to rates.csv (one per line), then read it back and print it.",
      hint: 'with open("rates.csv", "w") as f: for r in rates: f.write(r + "\\n") — then open it with "r" and print f.read()',
    },
  ],
  quiz: [
    {
      q: "What is an API, in one sentence?",
      options: [
        "A database",
        "A program that answers at a URL: you send a request, it answers a status plus data",
        "A programming language",
        "A Python library",
      ],
      answer: 1,
      why: "The request/response contract is the whole idea — and it's behind every app you use.",
    },
    {
      q: "What is a virtual environment for?",
      options: [
        "Making Python faster",
        "Giving each project its own private packages, so projects don't poison each other",
        "Hiding your code",
        "Connecting to the internet",
      ],
      answer: 1,
      why: "pip install goes into .venv, nowhere else. Project isolation is the entire point of the ritual.",
    },
    {
      q: "After requests.get(url), what does response.status_code == 200 mean?",
      options: [
        "The download finished",
        "The server answered OK — here's your data, safe to read",
        "The server is busy",
        "The URL was redirected",
      ],
      answer: 1,
      why: "200 is the server's first word: OK. Never use data from a response you didn't check.",
    },
    {
      q: "What is 404 telling you?",
      options: [
        "The server broke",
        "That URL doesn't exist — most often a typo in it",
        "You are offline",
        "The data is empty",
      ],
      answer: 1,
      why: "404 = 'no such address'. 500 = the server broke. Different words, different meanings — learn both.",
    },
    {
      q: 'What does response.json() return?',
      options: [
        "A string of text",
        "The data converted into dicts and lists — structures you already walk",
        "The status code",
        "A file",
      ],
      answer: 1,
      why: "JSON text becomes dicts/lists on arrival — Week 5 skills apply immediately.",
    },
    {
      q: 'data["rates"]["JPY"] raises KeyError. Most likely cause?',
      options: [
        "requests is broken",
        "The data doesn\'t have that field — print the whole response.json() and look at the real shape",
        "The rate is zero",
        "The URL is too long",
      ],
      answer: 1,
      why: "You guessed a level wrong. One print of the real shape saves ten guesses.",
    },
    {
      q: "What does response.raise_for_status() do?",
      options: [
        "Prints the status code",
        "Raises HTTPError when the status is 400 or worse — turns a bad status into a loud exception",
        "Retries the request",
        "Closes the connection",
      ],
      answer: 1,
      why: "The sharp tool: fail loudly on bad statuses. try/except is the net that catches it.",
    },
    {
      q: "What is the difference between except HTTPError: and except:?",
      options: [
        "None",
        "except HTTPError: catches only that error; except: catches everything — including your own bugs, which is how problems hide",
        "except: is faster",
        "except HTTPError: is only for APIs",
      ],
      answer: 1,
      why: "Catch errors by name. A bare except swallows your own mistakes along with the network's.",
    },
    {
      q: "When does a finally: block run?",
      options: [
        "Only on success",
        "Only on failure",
        "Always — success, failure, anything: the place for cleanup that must happen",
        "Never — it's documentation",
      ],
      answer: 2,
      why: "finally is the unconditional one. Files closed, notes written, no matter how the try went.",
    },
    {
      q: "A fetch fails with 500. What does the honest pattern do?",
      options: [
        "Retry forever until it works",
        "Crash loudly",
        "Retry ONCE (transient failures cure themselves), then log the failure and skip that item",
        "Ignore the item silently",
      ],
      answer: 2,
      why: "One bad item must not kill the whole run — and silent skips are how data goes missing. Log everything you skip.",
    },
    {
      q: "ModuleNotFoundError: No module named 'requests' on your real machine. Most likely cause?",
      options: [
        "requests is broken",
        "The venv ritual was skipped — either not installed, or .venv isn't active",
        "The URL is wrong",
        "Python is out of date",
      ],
      answer: 1,
      why: "Section 2's ritual: create, activate, install. The (.venv) prefix in your prompt tells you it's active.",
    },
    {
      q: "Your script runs with no errors but writes an empty CSV. Most likely cause?",
      options: [
        "The file is broken",
        "Every fetch failed the status check and every skip was silent — silent skips lose data without a trace",
        "CSV needs a license",
        "The rates were too small",
      ],
      answer: 1,
      why: "The silent trap of Week 6: logging your skips is not optional polish — it's the difference between 'no data' and 'I know exactly what failed'.",
    },
  ],
  outro:
    "When the eight missions pass, you have written the skeleton of the real Week 6 project: fetch two endpoints, check statuses, read nested JSON, retry a flaky one, and store the result in a CSV that survives the run. On your machine, the same code runs against the real Frankfurter API — same URLs, same shapes, live numbers. Next week: the consolidation project — a market-watch tool that does all of this on a schedule.",
};
