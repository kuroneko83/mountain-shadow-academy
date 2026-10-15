import type { Guide } from "../types";

export const guideGitEn: Guide = {
  slug: "git",
  title: "Git & GitHub, step by step",
  intro:
    "This guide serves Week 2. Git has a reputation for being scary — it isn't. It's a time machine for your folder: it takes named snapshots (commits) you can always return to, and GitHub is where those snapshots live publicly. Read the lesson, then practice the full journey — init, status, add, commit, log, remote, push — in the simulated terminal, and take the quiz.",
  week: "02-git-github",
  sections: [
    {
      heading: "1. What Git actually is",
      body: "Git is a time machine for a folder. At any moment you can take a snapshot of all your files and give it a name and a message — that snapshot is a commit. You can look at the full history anytime, return to any point, and nothing is ever lost by accident. Companies use it for one more reason: many people can work on the same files without stepping on each other. For now you only need the solo part: checkpoint your work, often and with clear messages.",
      examples: [
        {
          label: "The whole idea",
          cmd: "working folder --git commit--> snapshots, forever",
          note: "A commit is a named checkpoint. That's 80% of Git.",
        },
      ],
    },
    {
      heading: "2. git init — making a folder into a repository",
      body: "A normal folder becomes a Git repository (repo) the moment you run git init inside it. Git creates a hidden .git folder that stores all the history — you never touch it, but now the folder is being watched. Critical habit: run git init INSIDE your project folder, not at home. If you accidentally run it in the wrong place, delete the hidden .git folder and you're back to a normal folder.",
      examples: [
        {
          label: "Both",
          cmd: "cd learning-log && git init",
          output: "Initialized empty Git repository in ~/learning-log/.git/",
        },
      ],
    },
    {
      heading: "3. git status — your new best friend",
      body: "git status asks Git how things are going, and it always answers honestly. It tells you three kinds of things: untracked files (Git has never seen them), modified files (Git knows them, but they changed since the last commit), and staged files (ready to be committed). When you don't know what to do next: git status. Lost? git status. Professionals run it constantly — there is no such thing as too much status.",
      examples: [
        {
          label: "Both",
          cmd: "git status",
          output:
            "On branch main\nUntracked files:\n\treadme.md\n\nnothing added to commit but untracked files present",
        },
      ],
    },
    {
      heading: "4. git add — the waiting room",
      body: "Before a file can be committed, it goes to the staging area: a waiting room for the next snapshot. git add readme.md stages one file; git add . stages everything in the current folder. Why a waiting room at all? So you can commit exactly what you want, not everything at once. At your level, git add . is usually fine — but look at git status first so you know what 'everything' means.",
      examples: [
        {
          label: "Both",
          cmd: "git add readme.md",
          note: "One file into the waiting room.",
        },
        {
          label: "Both",
          cmd: "git add .",
          note: "Everything in this folder. Check git status first.",
        },
      ],
    },
    {
      heading: "5. git commit -m — taking the snapshot",
      body: 'git commit -m "add first script" takes the snapshot and stores it forever, with your name, the date, and the message. The message matters: write it for future you. Good messages say what the commit does in one line: "add yen-converter script", not "update" or "stuff". The first time you commit on a new machine, Git will ask who you are — that\'s the identity error, and the next section fixes it.',
      examples: [
        {
          label: "Both",
          cmd: 'git commit -m "add readme"',
          output: "[main (root-commit) 9f2a1bc] add readme\n 1 file changed",
        },
        {
          label: "The first-time identity error (everyone hits this)",
          cmd: 'git commit -m "add readme"',
          output:
            '*** Please tell me who you are.\nRun\n  git config --global user.name "Your Name"\n  git config --global user.email "you@example.com"',
          note: "Not a failure — Git just wants your name on your work. Run the two commands once, forever.",
        },
      ],
    },
    {
      heading: "6. git log — reading your own history",
      body: "git log shows every commit, newest first: a short ID (the hash), the author, the date, and your message. The hash is the commit's ID number — you'll use it later for time travel (checkout, revert), but for now just recognize it. If your history reads like a clear story — 'add readme', 'add converter', 'fix rounding' — your future self and any employer will thank you.",
      examples: [
        {
          label: "Both",
          cmd: "git log",
          output:
            "commit 9f2a1bc (HEAD -> main)\nAuthor: you <you@example.com>\n    add readme",
        },
      ],
    },
    {
      heading: "7. The three places a file can be",
      body: "Every file in a repo is in one of three places: the working directory (your normal folder, where you edit), the staging area (the waiting room, after git add), and the repository (the permanent history, after git commit). Edit → add → commit is the loop you'll repeat thousands of times in your career. When something feels wrong, ask: which of the three places is this file in right now? git status answers exactly that.",
      examples: [
        {
          label: "The loop",
          cmd: "edit --> git add --> git commit --> repeat",
          note: "Working directory → staging area → repository. Then again.",
        },
      ],
    },
    {
      heading: "8. Changing a file after committing",
      body: "Here's the part that confuses everyone: committing is not a one-time ceremony. You change a file, Git sees it as modified, you git add it again, and commit again. Two commits, both in history, nothing overwritten. The rule of thumb: one commit per meaningful change, and run git status before each one so you always know what's going into the snapshot.",
      examples: [
        {
          label: "Both",
          cmd: "echo day 2 >> readme.md && git add readme.md && git commit -m \"day 2\"",
          output: "[main 4d7e2fa] day 2\n 1 file changed",
        },
      ],
    },
    {
      heading: "9. git remote add + git push — going public",
      body: "Everything so far happened only on your machine. A remote is a copy of your repo that lives somewhere else — usually GitHub. git remote add origin <url> connects your local repo to a GitHub repo (origin is just the traditional name for 'my main remote'). Then git push uploads your commits to GitHub. The first push uses git push -u origin main — the -u remembers the connection so that after that, plain git push is enough. This exact moment — push — is when your work becomes part of your public portfolio.",
      examples: [
        {
          label: "Both",
          cmd: "git remote add origin https://github.com/you/learning-log.git",
          note: "Connect local repo to GitHub. origin is the traditional name.",
        },
        {
          label: "First time",
          cmd: "git push -u origin main",
          output: "Enumerating objects: 3, done.\nTo https://github.com/you/learning-log.git\n * [new branch] main -> main",
          note: "After the first -u push, plain 'git push' works.",
        },
      ],
    },
    {
      heading: "10. .gitignore — what never goes to GitHub",
      body: "Some files should never be committed: passwords and API keys (.env files), junk folders (node_modules, .venv, __pycache__), and big data files. A .gitignore file in the repo root lists them, and Git pretends they don't exist. GitHub is public by default — an API key pushed there is leaked, bots scan for them within minutes, and deleting the file later does NOT remove it from history. Before your first push: write the .gitignore.",
      examples: [
        {
          label: ".gitignore file contents",
          cmd: ".env\n.venv/\n__pycache__/\nnode_modules/",
          note: "One pattern per line. Git now ignores all of these.",
        },
      ],
    },
    {
      heading: "11. When things go wrong — the classic errors",
      body: "'fatal: not a git repository' — you ran a git command outside any repo: cd into your project folder first. 'nothing to commit, working tree clean' — everything is already committed: not an error, just information. 'fatal: pathspec did not match any files' — git add with a name that doesn't exist: ls, fix the name. 'Please tell me who you are' — the identity error from section 5: two git config commands, once per machine. 'push rejected' — the GitHub copy has commits yours doesn't (someone else pushed, or you edited on the website): ask your mentor before force-anything. The golden rule of Git mistakes: almost nothing is truly lost, and panic commands (reset --hard, push --force) cause more damage than the mistake itself.",
      examples: [
        {
          label: "Outside a repo",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "cd into the project folder. Git only works inside a repo.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "The Git loop — quick reference",
    rows: [
      { action: "Make folder a repo", win: "git init", linux: "git init" },
      { action: "See what's going on", win: "git status", linux: "git status" },
      { action: "Stage one file", win: "git add readme.md", linux: "git add readme.md" },
      { action: "Stage everything", win: "git add .", linux: "git add ." },
      { action: "Take the snapshot", win: 'git commit -m "message"', linux: 'git commit -m "message"' },
      { action: "Read the history", win: "git log", linux: "git log" },
      { action: "Set your identity (once)", win: 'git config --global user.name "Your Name"', linux: 'git config --global user.name "Your Name"' },
      { action: "Connect GitHub", win: "git remote add origin <url>", linux: "git remote add origin <url>" },
      { action: "Publish (first time)", win: "git push -u origin main", linux: "git push -u origin main" },
      { action: "Publish (every time after)", win: "git push", linux: "git push" },
    ],
  },
  missions: [
    {
      id: "g1",
      prompt: "Create a folder called learning-log and go inside it.",
      hint: "mkdir learning-log, then cd learning-log",
    },
    {
      id: "g2",
      prompt: "Turn learning-log into a Git repository.",
      hint: "git init — run it INSIDE learning-log, not at home. If you ran it in the wrong place, use the reset button.",
    },
    {
      id: "g3",
      prompt: "Create a file readme.md inside learning-log with some content.",
      hint: "echo learning log > readme.md",
    },
    {
      id: "g4",
      prompt: "Ask Git how things are going — you should see readme.md as untracked.",
      hint: "git status",
    },
    {
      id: "g5",
      prompt: "Stage readme.md so it's ready to be committed.",
      hint: "git add readme.md — or git add . for everything",
    },
    {
      id: "g6",
      prompt: "Take your first snapshot — commit with a clear message.",
      hint: 'git commit -m "add readme" — if Git asks who you are: git config --global user.name "Your Name" and git config --global user.email "you@example.com", then commit again',
    },
    {
      id: "g7",
      prompt: "Change readme.md any way you like, and commit again.",
      hint: 'echo day 2 >> readme.md, then git add readme.md and git commit -m "day 2"',
    },
    {
      id: "g8",
      prompt: "Connect a GitHub remote and push your work public.",
      hint: "git remote add origin https://github.com/you/learning-log.git, then git push -u origin main",
    },
  ],
  quiz: [
    {
      q: "What is a commit, really?",
      options: [
        "A backup of your whole computer",
        "A named snapshot of your files that stays in history forever",
        "A message sent to GitHub",
        "A copy of a file",
      ],
      answer: 1,
      why: "A commit is a snapshot with a name (hash), a message, your name and the date — stored permanently in history.",
    },
    {
      q: "Which command tells you which files are untracked, modified or staged?",
      options: ["git log", "git commit", "git status", "git push"],
      answer: 2,
      why: "git status is the honest answer to 'what's going on right now' — professionals run it constantly.",
    },
    {
      q: "What does git add actually do?",
      options: [
        "Uploads files to GitHub",
        "Saves the files permanently",
        "Moves changes to the staging area — the waiting room for the next commit",
        "Creates a new folder",
      ],
      answer: 2,
      why: "Staging means 'ready to be included in the next commit'. Nothing is permanent until git commit.",
    },
    {
      q: "You run git commit and Git says: 'nothing to commit, working tree clean'. Why?",
      options: [
        "Git is broken",
        "You forgot to create files",
        "There are no staged changes since the last commit — it's information, not an error",
        "You must push first",
      ],
      answer: 2,
      why: "'working tree clean' means everything is already committed. One of the friendliest messages in Git.",
    },
    {
      q: "First commit on a new machine fails with 'Please tell me who you are'. What's missing?",
      options: [
        "A GitHub account",
        "git config --global user.name and user.email",
        "git push",
        "A .gitignore file",
      ],
      answer: 1,
      why: "Git wants your name on your work. Two config commands, once per machine, and it never asks again.",
    },
    {
      q: "What is origin?",
      options: [
        "The first commit ever",
        "The traditional name for your main remote — usually the GitHub copy of your repo",
        "A Git administrator account",
        "The main branch",
      ],
      answer: 1,
      why: "origin is just the conventional name given to the remote you push to. It could be called anything; everyone calls it origin.",
    },
    {
      q: "What does git push do?",
      options: [
        "Downloads commits from GitHub",
        "Installs your project on the internet",
        "Uploads your commits to the remote (GitHub)",
        "Creates a new branch",
      ],
      answer: 2,
      why: "Push uploads your local commits to GitHub — it's the moment your work becomes part of your public portfolio.",
    },
    {
      q: "Which of these must NEVER be committed to a public repo?",
      options: [
        "README.md",
        "A .env file with API keys and passwords",
        "Your Python scripts",
        "Your notes",
      ],
      answer: 1,
      why: "Secrets pushed to GitHub are leaked — bots find them in minutes, and history keeps them even after deletion. .gitignore exists for exactly this.",
    },
    {
      q: "Why do commit messages matter so much?",
      options: [
        "GitHub requires perfect grammar",
        "Future you — and colleagues — read the history to understand what changed and why",
        "Long messages make commits faster",
        "They don't — only the code matters",
      ],
      answer: 1,
      why: "History is a story written once and read many times. 'add yen-converter script' vs 'update' — six months later, one of these is useful.",
    },
    {
      q: "You edited a file after committing it. What happens now?",
      options: [
        "The old commit is overwritten",
        "Nothing — files can only be committed once",
        "Git sees it as modified; you git add and commit again — two commits in history",
        "You must delete the file and start over",
      ],
      answer: 2,
      why: "Edit → add → commit is a loop, not a ceremony. History keeps every version; nothing is overwritten.",
    },
  ],
  outro:
    "The simulator took you through the exact journey of Week 2's project: folder → repo → readme → commits → GitHub. Do it once more from scratch without looking at the hints — when init/add/commit/push come out of your fingers automatically, you're ready to do it for real on GitHub. And remember: git status is always the answer when you're lost.",
};
