import type { Guide } from "../types";

export const guideGitEn: Guide = {
  slug: "git",
  title: "Git & GitHub, step by step",
  intro:
    "This guide serves Week 2. Git has a reputation for being scary — it isn't. It's a time machine for your folder: it takes named snapshots (commits) you can always return to, and GitHub is where those snapshots live publicly. Read the lesson, practice the full journey — init, status, add, commit, log, remote, push — in the simulated terminal, take the quiz, and follow sections 10–14 for the real-world bridge: creating your GitHub account and connecting your computer, click by click.",
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
      heading: "10. Creating your GitHub account — step by step",
      body: "Everything so far happened on your machine. Before you can push anything real, you need the GitHub account — and it deserves more care than most people give it, because the username you choose becomes your public professional identity. About 15 minutes, click by click.",
      steps: [
        {
          title: "Go to github.com and click Sign up",
          detail:
            "Any browser. The green button, top right. The signup form asks three things in order: email, password, username.",
        },
        {
          title: "Email: use one you'll keep for years",
          detail:
            "This email appears in every commit you'll ever push — employers see it. Gmail is fine. Avoid work emails: they die when jobs change, and commits made with them belong to the employer.",
        },
        {
          title: "Password: long, and unique to GitHub",
          detail:
            "A password manager helps. If you don't have one yet, a long sentence-style password beats a short scrambled one.",
        },
        {
          title: "Username: this is your professional identity — think before typing",
          detail:
            "Your profile URL becomes github.com/YOURNAME and it goes on your CV and job applications. firstname-lastname style is perfect. Avoid gamer or anime handles and unnecessary numbers — this is the name Japanese recruiters will click.",
        },
        {
          title: "Solve the puzzle and click Create account",
          detail:
            "A captcha, sometimes a small quiz. Then GitHub sends a verification code to your email.",
        },
        {
          title: "Open your email and paste the code",
          detail:
            "If it doesn't arrive within a minute, check spam. The code expires quickly — if it runs out, just request a new one.",
        },
        {
          title: "Answer the personalization questions (or skip)",
          detail:
            "GitHub asks about your experience and goals. Honest answers give you nicer dashboard recommendations, but skipping is fine too.",
        },
        {
          title: "Choose the Free plan",
          detail:
            "Free is all you'll ever need for a public portfolio: unlimited public repositories. Do not enter a credit card anywhere.",
        },
        {
          title: "Set up 2FA — two-factor authentication (GitHub requires it)",
          detail:
            "First install an authenticator app on your phone (Microsoft Authenticator or Google Authenticator, both free). Then choose 'Use an authenticator app', scan the QR code with the app, and type the 6-digit code it shows. SMS also works, but an app is safer and works without signal.",
        },
        {
          title: "Save your recovery codes — seriously, this step",
          detail:
            "GitHub shows you 16 one-time codes. Download the file and keep it somewhere safe, not only on that phone. If you lose the phone, these codes are the only way back into your account.",
        },
        {
          title: "Minimum profile polish (5 minutes)",
          detail:
            "Top right → your avatar → 'Your profile'. Add a face photo (a real, friendly face — not a cat, not a logo; Japanese employers especially value this), your display name, a one-line bio, and your location. The full portfolio polish comes in Week 12 — the photo is worth doing today.",
        },
      ],
    },
    {
      heading: "11. Creating the learning-log repository on GitHub",
      body: "Two minutes, click by click — and one trap to avoid. The goal: an empty repository on GitHub that your local learning-log will connect to in the next section.",
      steps: [
        {
          title: "Click the + at the top right → 'New repository'",
          detail: "Or go directly to github.com/new.",
        },
        {
          title: "Repository name: learning-log",
          detail:
            "Matching your local folder name exactly is a convention, not a requirement — but matching names keep you sane.",
        },
        {
          title: "Description (optional): one honest line",
          detail:
            "Example: 'My study log — Python, scripting, and data engineering'. Recruiters read this before clicking anything.",
        },
        {
          title: "Choose Public",
          detail:
            "Public is the whole point: this is your portfolio, invisible employers can't hire you. (Secrets still never go into public repos — that's what .gitignore is for, two sections below.)",
        },
        {
          title: "Do NOT tick 'Add a README file' — this is the trap",
          detail:
            "If GitHub creates a README, your first push will be rejected ('remote contains work you do not have locally') — because the GitHub copy would have a commit yours doesn't. Keep the repository born empty; you already have your own README on your machine.",
        },
        {
          title: "Click 'Create repository'",
          detail:
            "GitHub shows a page with the exact commands for your situation — under '…or push an existing repository from the command line'. Those two lines are literally your remote add and push commands. GitHub writes them for you; you never need to memorize them.",
        },
      ],
      examples: [
        {
          label: "The two lines GitHub shows you after creating the repo",
          cmd: "git remote add origin https://github.com/you/learning-log.git\ngit push -u origin main",
          note: "Copy them from the page — they're customized with your username and repo name.",
        },
      ],
    },
    {
      heading: "12. Connecting your computer — Windows",
      body: "Important reality first: since August 13, 2021, GitHub does not accept your account password for git push. The age of typing your GitHub password into git is over. On Windows, the bridge is Git Credential Manager — your first push opens a browser, you log in once, and the machine remembers it forever.",
      steps: [
        {
          title: "Install Git for Windows (if you haven't yet)",
          detail:
            "Download from git-scm.com/download/win and run it. The installer has about ten screens of options — the defaults are all fine. Keep 'Git Credential Manager' ticked (it is by default). Click Next until it's done.",
        },
        {
          title: "Open a NEW terminal after installing",
          detail:
            "PowerShell must be reopened to see git. Type git --version — if it answers with a number, you're connected to the tool.",
        },
        {
          title: "Tell Git who you are — once per machine",
          detail:
            "git config --global user.name \"Your Name\" and git config --global user.email \"you@example.com\" — the same email you used on GitHub. This is what puts your name on commits.",
        },
        {
          title: "Do your first push — a browser window will open",
          detail:
            "The first time you git push, Git Credential Manager opens a window offering 'Sign in with your browser'. Choose it: the browser opens GitHub, you log in, click Authorize — the window closes and your push continues automatically. This login is stored by Windows; you won't see the window again on this machine.",
        },
      ],
      examples: [
        {
          label: "Both (once per machine)",
          cmd: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
        },
        {
          label: "Check that git works",
          cmd: "git --version",
          output: "git version 2.45.0",
        },
      ],
    },
    {
      heading: "13. Connecting your computer — Linux, path A: personal access token",
      body: "Same reality on Linux: account passwords never work for git. You have two honest paths. Path A is the token: quick, works over HTTPS, but it expires and lives in a file. Path B (next section) is the SSH key: ten minutes, works forever, the professional standard — pick B if you're willing. Both paths need git installed (sudo apt install git on Ubuntu/Debian, sudo dnf install git on Fedora) and the two git config commands done.",
      steps: [
        {
          title: "Create the token on GitHub",
          detail:
            "Top right → Settings → Developer settings (bottom left) → Personal access tokens → Tokens (classic) → Generate new token (classic). Name it 'my-laptop', tick the 'repo' scope, choose 90 days expiration, click Generate.",
        },
        {
          title: "COPY THE TOKEN NOW — it is shown exactly once",
          detail:
            "A ghp_... string. Copy it into a password manager or a temporary note. If you close the page without copying: delete that token and generate another — the old one is gone forever, by design.",
        },
        {
          title: "First push: username = your GitHub name, password = the token",
          detail:
            "When git asks 'Username for https://github.com': your GitHub username. 'Password for https://you@github.com': paste the TOKEN — not your account password. The account password stopped working in 2021; this error is the number-one beginner wall.",
        },
        {
          title: "Optionally: tell git to remember it",
          detail:
            "git config --global credential.helper store — saves it in plain text at ~/.git-credentials (fine for a personal laptop; use a password manager's approach if you prefer). After this, pushes stop asking.",
        },
      ],
      examples: [
        {
          label: "What git asks on first push",
          cmd: "Username for 'https://github.com': you\nPassword for 'https://you@github.com': ghp_paste_the_token_here",
          note: "The password slot wants the token, never the account password.",
        },
      ],
    },
    {
      heading: "14. Connecting your computer — Linux, path B: SSH key (set once, works forever)",
      body: "The professional standard. One key pair: the private key stays on your machine forever, the public key is pasted into GitHub once. No tokens, no expirations, no browser popups. You'll do this again on every new machine — it becomes routine in a year.",
      steps: [
        {
          title: "Generate the key",
          detail:
            "ssh-keygen -t ed25519 -C \"you@example.com\" — then press Enter to accept the default location (~/.ssh/id_ed25519) and Enter again for an empty passphrase (fine for a personal laptop; a passphrase is safer but asks after each reboot).",
        },
        {
          title: "Show the PUBLIC key and copy it",
          detail:
            "cat ~/.ssh/id_ed25519.pub — one line starting with ssh-ed25519 and ending with your email. Select and copy the whole line. The PRIVATE key (~/.ssh/id_ed25519, no .pub) never leaves your machine — never paste it anywhere, not to GitHub, not to a colleague, not anywhere.",
        },
        {
          title: "On GitHub: Settings → SSH and GPG keys → New SSH key",
          detail:
            "Title: something you'll recognize in a year ('ubuntu-laptop', 'thinkpad'). Key type stays 'Authentication Key'. Paste the public key into the big box. Click Add SSH key.",
        },
        {
          title: "Test it",
          detail:
            "ssh -T git@github.com — the first time it asks about the host fingerprint: type yes. The success message is 'Hi YOURNAME! You've successfully authenticated, but GitHub does not provide shell access.' That's your green light.",
        },
        {
          title: "Use SSH URLs for your remotes",
          detail:
            "git remote add origin git@github.com:you/learning-log.git — note the git@ start and the colon. If you already added an HTTPS remote, switch it without recreating: git remote set-url origin git@github.com:you/learning-log.git.",
        },
      ],
      examples: [
        {
          label: "Linux / macOS",
          cmd: "ssh-keygen -t ed25519 -C \"you@example.com\"",
          note: "Enter, Enter — defaults are fine for a personal laptop.",
        },
        {
          label: "The test — this message means success",
          cmd: "ssh -T git@github.com",
          output:
            "Hi you! You've successfully authenticated, but GitHub does not provide shell access.",
        },
        {
          label: "Switch an existing remote to SSH",
          cmd: "git remote set-url origin git@github.com:you/learning-log.git",
        },
      ],
    },
    {
      heading: "15. .gitignore — what never goes to GitHub",
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
      heading: "16. When things go wrong — the classic errors",
      body: "'fatal: not a git repository' — you ran a git command outside any repo: cd into your project folder first. 'nothing to commit, working tree clean' — everything is already committed: not an error, just information. 'fatal: pathspec did not match any files' — git add with a name that doesn't exist: ls, fix the name. 'Please tell me who you are' — the identity error from section 5: two git config commands, once per machine. 'Support for password authentication was removed' — you (or a saved old password) tried the account password instead of the browser login (Windows) or a token/SSH key (Linux): sections 12–14 fix it. 'push rejected — remote contains work you do not have locally' — the GitHub repo isn't empty (usually the README trap from section 11). The golden rule of Git mistakes: almost nothing is truly lost, and panic commands (reset --hard, push --force) cause more damage than the mistake itself — when in doubt, ask your mentor.",
      examples: [
        {
          label: "Outside a repo",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "cd into the project folder. Git only works inside a repo.",
        },
        {
          label: "The 2021 password wall (everyone hits this)",
          cmd: "git push",
          output:
            "remote: Support for password authentication was removed on August 13, 2021.\nfatal: Authentication failed for 'https://github.com/...'",
          note: "Not a bug, not your fault. Windows: redo the browser sign-in. Linux: use a token (path A) or an SSH key (path B).",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "The Git loop — quick reference",
    rows: [
      { action: "Make folder a repo", command: "git init", result: "Initialized empty Git repository in .git/" },
      { action: "See what's going on", command: "git status", result: "(a report of your files — always read it)" },
      { action: "Stage one file", command: "git add readme.md", result: "(silence = success)" },
      { action: "Stage everything", command: "git add .", result: "(silence = success)" },
      { action: "Take the snapshot", command: 'git commit -m "message"', result: "[main (root-commit) 9f2a1bc] add readme" },
      { action: "Read the history", command: "git log", result: "9f2a1bc  add readme" },
      { action: "Set your identity (once)", command: 'git config --global user.name "Your Name"', result: "(silence = success)" },
      { action: "Connect GitHub", command: "git remote add origin <url>", result: "(silence = success)" },
      { action: "Publish (first time)", command: "git push -u origin main", result: "main -> main (the upload line)" },
      { action: "Publish (every time after)", command: "git push", result: "Everything up-to-date" },
      { action: "Test SSH connection", command: "ssh -T git@github.com", result: "Hi you! You've successfully authenticated" },
      { action: "Switch remote to SSH", command: "git remote set-url origin git@github.com:you/repo.git", result: "(silence = success)" },
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
    "The simulator took you through the exact journey of Week 2's project: folder → repo → readme → commits → GitHub. Do it once more from scratch without looking at the hints — when init/add/commit/push come out of your fingers automatically, you're ready for the real thing. Then sections 10–14 walk you through the real version of the last steps: the account, the empty repo, and the one-time connection to your machine. And remember: git status is always the answer when you're lost.",
};
