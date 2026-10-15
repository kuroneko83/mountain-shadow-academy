import type { Curriculum } from "./types";

export const curriculumEn: Curriculum = {
  phases: [
    {
      id: "foundations",
      name: "Phase 1 — Foundations",
      description:
        "Your tools, Git & GitHub, and your first lines of Python. Zero experience assumed.",
    },
    {
      id: "python",
      name: "Phase 2 — Python & scripting",
      description:
        "From small programs to scripts that pull real data from the internet.",
    },
    {
      id: "data",
      name: "Phase 3 — Working with data",
      description: "pandas and SQL: cleaning, analyzing, and storing data properly.",
    },
    {
      id: "capstone",
      name: "Phase 4 — Capstone & portfolio",
      description:
        "A complete market-data pipeline, deployed and public — your portfolio piece for employers.",
    },
  ],
  weeks: [
    {
      slug: "01-setup-terminal",
      title: "Your tools: terminal, Python, VS Code",
      phase: "foundations",
      why: "Everything you will do for the next 12 weeks — and the rest of your career — happens in these three tools. Getting comfortable with them now makes every later week faster and less scary.",
      guide: "command-line",
      objectives: [
        "Move around your computer with the terminal (PowerShell on Windows, bash on Linux) instead of only clicking.",
        "Run Python from the terminal and know which version you have.",
        "Create, edit, and run a .py file in VS Code.",
      ],
      topics: [
        "What a terminal is: PowerShell (Windows) vs bash (Linux)",
        "Files, folders, and paths — pwd, ls/dir, cd, mkdir",
        "Installing Python 3 and VS Code",
        "python --version, running code with python file.py",
        "Your first script: print(), and comments with #",
      ],
      project: {
        title: "setup-log.py",
        description:
          "A first script proving your machine is ready for the next 11 weeks.",
        steps: [
          "Create a folder for this curriculum (e.g. msa-academy) and inside it a data/ and scripts/ folder.",
          "Write setup-log.py that prints your name, today's date (import datetime), and your Python version (import sys).",
          "Run it from the terminal, not from the editor button — at least once.",
        ],
      },
      resources: [
        {
          title: "VS Code — Python tutorial (official)",
          url: "https://code.visualstudio.com/docs/python/python-tutorial",
          note: "Do the Install & Run sections; skip the rest for now.",
        },
        {
          title: "MIT — The Missing Semester (shell)",
          url: "https://missing.csail.mit.edu/",
          note: "Lesson 1 only. Read, don't memorize.",
        },
        {
          title: "Python — Official beginner's guide",
          url: "https://www.python.org/about/gettingstarted/",
        },
      ],
    },
    {
      slug: "02-git-github",
      title: "Git & GitHub: your portfolio starts today",
      phase: "foundations",
      why: "From this week on, every line of code you write will be committed to a public GitHub repository. This means your portfolio starts growing from day one — before you even know how to program well.",
      guide: "git",
      objectives: [
        "Create a Git repository, make commits, and push to GitHub.",
        "Write a clear README.md for each repository.",
        "Keep a clean, understandable commit history.",
      ],
      topics: [
        "What version control is and why every company uses it",
        "git init, git add, git commit -m, git log",
        "Connecting a repo to GitHub with git remote and git push",
        "README.md — what it is and what to put in it",
        ".gitignore — never commit junk or secrets",
      ],
      project: {
        title: "learning-log repository",
        description:
          "Your first public repository: the journal of everything you learn here.",
        steps: [
          "Create a GitHub account with a professional username.",
          "Create the repo learning-log and push setup-log.py to it.",
          "Write a README that says what this repo is and what you'll add to it.",
          "Each week from now on: commit at least once a week to learning-log or your project repos.",
        ],
      },
      resources: [
        {
          title: "GitHub Skills — Introduction to Git",
          url: "https://skills.github.com/",
          note: "The 'Introduction to Git' course. Interactive, runs in your browser.",
        },
        {
          title: "Pro Git (book) — chapters 1 & 2",
          url: "https://git-scm.com/book/en/v2",
          note: "Free official book. Read ch. 1 fully, ch. 2 as reference.",
        },
      ],
    },
    {
      slug: "03-python-basics-1",
      title: "Python I: values, text, decisions",
      phase: "foundations",
      why: "These are the atoms of every program you will ever write: storing values, shaping text, and making decisions. SLOW DOWN here — a shaky foundation costs you weeks later.",
      guide: "python-basics",
      objectives: [
        "Create variables and use the basic types: int, float, str, bool.",
        "Build text with f-strings and read input from the user.",
        "Write if / elif / else decisions with comparisons.",
      ],
      topics: [
        "Variables and assignment",
        "Numbers (int, float) and arithmetic operators",
        "Strings: f-strings, .strip(), .lower(), slicing",
        "input() and converting types (int(), float())",
        "Comparison operators and if / elif / else",
      ],
      project: {
        title: "yen-converter.py",
        description:
          "An interactive JPY ↔ USD converter — your first 'real' program.",
        steps: [
          "Store a USD/JPY rate in a variable (a fixed value is fine this week).",
          "Ask the user for an amount and a direction (JPY→USD or USD→JPY).",
          "Print the result as a clean sentence with an f-string.",
          "Add a simple sanity check: negative amounts get a polite error message.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (lessons 1–3)",
          url: "https://www.kaggle.com/learn/python",
          note: "Free, interactive, ~4 hours. Do lessons 1–3 this week.",
        },
        {
          title: "freeCodeCamp — Scientific Computing with Python",
          url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
          note: "The long-term certification track. Start it this week, continue it across the whole curriculum.",
        },
        {
          title: "Automate the Boring Stuff — chapters 1 & 2",
          url: "https://automatetheboringstuff.com/",
          note: "Free to read online. Best scripting book for beginners, period.",
        },
      ],
    },
    {
      slug: "04-python-basics-2",
      title: "Python II: loops and functions",
      phase: "python",
      why: "Programs become powerful when they repeat work without you and when logic is packaged into named, reusable functions. This is also where you learn to read error messages — a skill you'll use daily.",
      guide: "python-loops",
      objectives: [
        "Repeat work with for loops and while loops.",
        "Write functions with parameters and return values.",
        "Read a traceback and fix your own bugs.",
      ],
      topics: [
        "for loops and range()",
        "while loops (and how to avoid infinite ones)",
        "def, parameters, return, docstrings",
        "Reading error messages: what the traceback tells you",
        "Break problems into small functions",
      ],
      project: {
        title: "daily-report.py",
        description:
          "Summarize a week of numbers with loops and functions.",
        steps: [
          "Hard-code a list of 7 daily values (e.g. fake trading volumes).",
          "Write functions total(), average(), and best_day() — each takes a list and returns a result.",
          "Print a small report: total, average, best day and its value.",
          "Deliberately break it once (remove a colon), read the traceback, and fix it — this is practice too.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (lessons 4–5)",
          url: "https://www.kaggle.com/learn/python",
          note: "Loops, functions, and booleans lessons.",
        },
        {
          title: "Automate the Boring Stuff — chapter 3",
          url: "https://automatetheboringstuff.com/",
        },
      ],
    },
    {
      slug: "05-structures-files",
      title: "Data structures & files",
      phase: "python",
      why: "Real programs keep data around: lists and dicts to hold it, files to persist it. This week your programs stop forgetting everything when they end.",
      guide: "data-files",
      objectives: [
        "Choose the right structure: list, dict, or tuple.",
        "Read and write text files and CSV files.",
        "Store structured data that survives after the script ends.",
      ],
      topics: [
        "Lists in depth: append, remove, iterate",
        "Dictionaries: keys, values, .get(), looping over items",
        "Tuples and when immutability is a feature",
        "with open(...) as f — reading and writing files",
        "The csv module; a first look at json",
      ],
      project: {
        title: "expense-tracker.py",
        description:
          "A small CLI app with persistent storage — your second public repo.",
        steps: [
          "Create a new GitHub repo: expense-tracker.",
          "Add expenses via input(): date, item, amount in JPY → append to expenses.csv.",
          "A 'summary' command prints total, average, and the most expensive item.",
          "Never load the whole file into your code by hand — parse the CSV properly.",
          "Write a README showing example usage.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (lessons 6–7)",
          url: "https://www.kaggle.com/learn/python",
          note: "Lists and dictionaries lessons.",
        },
        {
          title: "Automate the Boring Stuff — chapters 4–6, 9–10",
          url: "https://automatetheboringstuff.com/",
          note: "Read 4–6 now; use 9–10 (files) while building the project.",
        },
      ],
    },
    {
      slug: "06-scripts-apis",
      title: "Scripts that talk to the internet",
      phase: "python",
      why: "This is the week scripts start doing real work: pulling live data from a public API, handling failure, and saving the result. This exact skill — fetch, clean, save — is the heart of data engineering.",
      guide: "requests-api",
      objectives: [
        "Set up a virtual environment and install packages with pip.",
        "Call a public API with requests and parse the JSON response.",
        "Handle failures with try/except so one bad day doesn't kill the run.",
      ],
      topics: [
        "python -m venv .venv, activate, pip install requests",
        "requests.get() and HTTP status codes (200, 404, 500)",
        "response.json() — navigating nested dicts and lists",
        "try / except / finally",
        "Retry once on failure, log and skip otherwise",
      ],
      project: {
        title: "fx-tracker",
        description:
          "A script that pulls real foreign-exchange rates — your third repo.",
        steps: [
          "Read the Frankfurter API docs (a free, key-less FX rate API).",
          "Write fetch_rates.py: pull the last 90 days of USD→JPY and EUR→JPY rates.",
          "Save them as a clean rates.csv (date, usd_jpy, eur_jpy).",
          "Wrap the request in try/except with one retry.",
          "Push to a new fx-tracker repo with a README.",
        ],
      },
      resources: [
        {
          title: "Frankfurter API — docs",
          url: "https://www.frankfurter.app/docs/",
          note: "The API you'll use. It's free and needs no key.",
        },
        {
          title: "Automate the Boring Stuff — chapter 11",
          url: "https://automatetheboringstuff.com/",
          note: "Web scraping chapter — read the requests parts.",
        },
        {
          title: "requests — quickstart",
          url: "https://requests.readthedocs.io/en/latest/user/quickstart/",
        },
      ],
    },
    {
      slug: "07-market-watch",
      title: "Mini-project: market-watch",
      phase: "python",
      why: "One week to consolidate: turn the fetch script into a small, reliable tool and start using it daily. Repetition is how syntax stops being scary and starts being automatic.",
      objectives: [
        "Structure a repo like a real project (folders, README, separate steps).",
        "Turn a raw fetch script into a daily report generator.",
        "Automate a task to run on a schedule (optional but powerful).",
      ],
      topics: [
        "Repo layout: scripts/, data/, README.md",
        "Composing functions: fetch → clean → analyze → report",
        "Statistics basics: min, max, mean, and a simple std dev",
        "print() vs logging",
        "Scheduling: cron (Linux) / Task Scheduler (Windows) — optional",
      ],
      project: {
        title: "market-watch.py",
        description:
          "A daily market report for USD/JPY: numbers, movement, and a text summary.",
        steps: [
          "Fetch the last 30 days of USD/JPY rates (Frankfurter again).",
          "Compute min, max, average, and standard deviation of the period.",
          "Write a human-readable report.txt: period, stats, biggest up/down day.",
          "Run it every workday for one week; commit the report each day.",
          "Optional: schedule it and let the machine do it for you.",
        ],
      },
      resources: [
        {
          title: "Automate the Boring Stuff — chapter 12",
          url: "https://automatetheboringstuff.com/",
        },
        {
          title: "crontab.guru — cron syntax helper",
          url: "https://crontab.guru/",
          note: "Only if you try the scheduling exercise.",
        },
      ],
    },
    {
      slug: "08-pandas-1",
      title: "pandas I: your first DataFrame",
      phase: "data",
      why: "pandas is the tool every analyst and data engineer in Japan — and everywhere — expects you to know. It turns messy files into tables you can slice with one line.",
      objectives: [
        "Load a CSV into a DataFrame and inspect it (head, info, describe).",
        "Select columns and filter rows with conditions.",
        "Handle missing values instead of being surprised by them.",
      ],
      topics: [
        "Series and DataFrame — what they are",
        "read_csv, head, info, describe",
        "Selecting columns; filtering with conditions",
        "Missing data: isna, dropna, fillna",
        "Renaming and converting column types",
      ],
      project: {
        title: "rates-exploration.py",
        description:
          "Answer 10 written questions about your own rates.csv using pandas.",
        steps: [
          "Load your fx-tracker rates.csv into a DataFrame.",
          "Write (in the README) 10 questions — e.g. 'highest USD/JPY day of the period?'",
          "Answer each one with pandas — no manual CSV reading.",
          "Commit the script + questions + answers in your fx-tracker repo.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas (lessons 1–3)",
          url: "https://www.kaggle.com/learn/pandas",
          note: "The best free pandas course. ~4 hours.",
        },
        {
          title: "freeCodeCamp — Data Analysis with Python",
          url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
          note: "The certification that includes pandas + matplotlib. Start it now, finish it by Week 10.",
        },
      ],
    },
    {
      slug: "09-pandas-2",
      title: "pandas II: group, aggregate, plot",
      phase: "data",
      why: "Summarizing and visualizing data is the moment analysis becomes communication. One chart in a README tells an employer more than 50 lines of code.",
      objectives: [
        "Group data and compute aggregates with groupby.",
        "Handle dates as dates — resample to weekly/monthly.",
        "Create a basic line chart with matplotlib and save it as PNG.",
      ],
      topics: [
        "groupby() with mean/sum/count",
        "Sorting and nlargest",
        "to_datetime and date parts (month, weekday)",
        "resample — weekly and monthly views",
        "matplotlib: plot, title, labels, savefig",
      ],
      project: {
        title: "market-report.py",
        description:
          "Monthly aggregates and a chart of USD/JPY — this grows into the capstone.",
        steps: [
          "Compute monthly averages of USD/JPY over your whole data.",
          "Compute a rolling 30-day average and add it as a column.",
          "Plot the daily rate and the rolling average on one chart; save usd_jpy.png.",
          "Put the chart in your repo's README (yes, images work in READMEs).",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas (lessons 4–6)",
          url: "https://www.kaggle.com/learn/pandas",
        },
        {
          title: "Kaggle Learn — Data Visualization",
          url: "https://www.kaggle.com/learn/data-visualization",
        },
      ],
    },
    {
      slug: "10-sql",
      title: "SQL & SQLite: storing data properly",
      phase: "data",
      why: "CSVs are fine for small things; databases are what companies actually run on. SQL is the single most durable skill in your career — it never becomes obsolete.",
      objectives: [
        "Write SELECT, WHERE, GROUP BY and ORDER BY queries with confidence.",
        "Create an SQLite database from Python and load data into it.",
        "Query it back with parameterized queries (never string-concatenated).",
      ],
      topics: [
        "SELECT / WHERE / ORDER BY / LIMIT",
        "Aggregates: SUM, COUNT, AVG, MIN, MAX with GROUP BY",
        "JOIN (inner, left) — when each is correct",
        "The sqlite3 module: connect, execute, commit",
        "Parameterized queries — why ? matters (SQL injection)",
      ],
      project: {
        title: "fx-db.py + queries.sql",
        description: "Your rates.csv becomes a real database.",
        steps: [
          "Create rates.db (SQLite) with a rates table and load your CSV history into it.",
          "Save 6 queries in queries.sql: monthly avg, min/max day, biggest daily move, month-over-month change, count per month, and a JOIN with a small currencies table.",
          "Re-run the queries from Python with sqlite3 and save the results as CSV.",
        ],
      },
      resources: [
        {
          title: "SQLBolt — lessons 1–12",
          url: "https://sqlbolt.com/",
          note: "Interactive, fast. Finish all lessons.",
        },
        {
          title: "Mode — SQL Basic + Intermediate",
          url: "https://mode.com/sql-tutorial/",
          note: "Skip Advanced. Use it to review what SQLBolt taught you.",
        },
        {
          title: "Kaggle Learn — Intro to SQL",
          url: "https://www.kaggle.com/learn/intro-to-sql",
        },
      ],
    },
    {
      slug: "11-capstone-1",
      title: "Capstone I: the market-data pipeline",
      phase: "capstone",
      why: "Time to assemble everything: fetch → clean → store → analyze → report. This is a real, honest data pipeline — small, but with the same shape companies use.",
      objectives: [
        "Build one script pipeline from API to database to report.",
        "Make it safe to re-run without duplicating data (idempotency).",
        "Write a README so good that a stranger can run your project.",
      ],
      topics: [
        "Pipeline structure: fetch.py, transform.py, load.py or one well-organized script",
        "Idempotency: UPSERT / ON CONFLICT or delete-and-reload by date range",
        "Config: paths and settings at the top, not buried in the middle",
        "Running the whole thing with one command",
      ],
      project: {
        title: "market-pipeline",
        description:
          "Your flagship repo: a complete, re-runnable FX data pipeline.",
        steps: [
          "Create the repo market-pipeline with a clear folder structure.",
          "Pipeline: fetch USD/JPY + EUR/JPY history (Frankfurter) → clean with pandas → store in SQLite → monthly aggregates + rolling averages → chart PNG + report.txt.",
          "Re-run it twice — prove no duplicated rows.",
          "README: what it does, how to run it (venv, pip install, one command), sample output, chart.",
        ],
      },
      resources: [
        {
          title: "SQLite — UPSERT documentation",
          url: "https://www.sqlite.org/lang_UPSERT.html",
        },
        {
          title: "Make a README — guide",
          url: "https://www.makeareadme.com/",
        },
      ],
    },
    {
      slug: "12-capstone-2-portfolio",
      title: "Capstone II: deploy & portfolio",
      phase: "capstone",
      why: "Nobody reads code in an interview screen — they click links. This week you make your work one click away, and you write about it in the language employers read: outcomes, not effort.",
      objectives: [
        "Deploy a public page with your chart and key numbers.",
        "Turn your GitHub profile into a portfolio recruiters understand in 30 seconds.",
        "Describe each project with 2–3 outcome-focused bullet points.",
      ],
      topics: [
        "Generating a simple report.html from your pipeline (template + chart image)",
        "Deploying a static page: GitHub Pages (or Vercel, with your mentor)",
        "Profile README and pinned repositories",
        "Writing about projects for job applications (JP: 履歴書/職務経歴書 culture, LinkedIn)",
      ],
      project: {
        title: "Go public",
        description:
          "A live URL, a polished profile, and application-ready project descriptions.",
        steps: [
          "Generate report.html from market-pipeline (chart + monthly summary table).",
          "Deploy it with GitHub Pages — one public URL that works on a phone.",
          "Profile README: who you are, what you're learning, links to your repos and the live report.",
          "Pin your best 4 repos. Write 2–3 bullets each: what it does, what you learned, what's next.",
          "Show everything to your mentor — get feedback, iterate once.",
        ],
      },
      resources: [
        {
          title: "GitHub Pages — documentation",
          url: "https://docs.github.com/en/pages/quickstart",
        },
        {
          title: "GitHub — Profile README guide",
          url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
        },
      ],
    },
  ],
};
