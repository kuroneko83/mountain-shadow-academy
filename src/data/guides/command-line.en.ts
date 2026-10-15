import type { Guide } from "../types";

export const guideCommandLineEn: Guide = {
  slug: "command-line",
  title: "The command line, slowly and honestly",
  intro:
    "This guide takes Week 1's hardest topic and goes through it slowly: what the terminal actually is, what each command really does, how Windows and Linux differ, and — most importantly — how it feels to use one. Read it with a real terminal open next to it, then practice in the simulator and take the quiz.",
  week: "01-setup-terminal",
  sections: [
    {
      heading: "1. What the terminal actually is",
      body: "The terminal is a text window where you talk to your computer by typing commands instead of clicking icons. The program that answers you is called the shell. On Windows the default shell is PowerShell, and its prompt looks like PS C:\\Users\\you>. On Linux (and macOS) the default shell is bash, and the prompt usually ends in $. Everything in this curriculum works in both — the ideas are identical, only some command names differ. You never memorize commands; you remember that a solution exists and look it up.",
      examples: [
        {
          label: "Windows (PowerShell)",
          cmd: "PS C:\\Users\\you>",
          note: "The prompt: it shows where you are. You type after the >.",
        },
        {
          label: "Linux / macOS (bash)",
          cmd: "you@laptop:~$",
          note: "Same idea: prompt, then your command, then Enter.",
        },
      ],
    },
    {
      heading: "2. Where am I — pwd",
      body: "Every terminal session has a current directory (also called working directory): the folder your commands act on. pwd (print working directory) asks the computer where you currently are. In PowerShell, pwd also works — it's an alias for Get-Location. Use it whenever you feel lost: it's free and never wrong.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "pwd",
          output: "/home/you",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "pwd",
          output: "C:\\Users\\you",
        },
      ],
    },
    {
      heading: "3. Looking around — ls / dir",
      body: "ls (list) shows what's in the current folder. ls -a also shows hidden files (files starting with a dot). ls -l shows details: permissions, size, date. In PowerShell, ls works as an alias for Get-ChildItem, but the classic Windows command is dir — both are fine. The colors, if any, mean something: folders often blue, executable files green, plain files white or gray.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "ls",
          output: "projects  notes.txt",
        },
        {
          label: "Linux / macOS",
          cmd: "ls -a",
          output: ".  ..  .bashrc  projects  notes.txt",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "dir",
          output: "projects  notes.txt",
        },
      ],
    },
    {
      heading: "4. Paths — the map of your computer",
      body: "A path is an address for a file or folder. An absolute path starts from the root of the disk and always works: /home/you/projects on Linux, C:\\Users\\you\\projects on Windows. A relative path starts from where you are right now: from inside /home/you, the path projects means the same folder. Three shortcuts work everywhere: ~ means your home folder, . means here, and .. means one folder up. Linux uses / between names, Windows uses \\ — that's the main difference, and you get used to it in a day.",
      examples: [
        {
          label: "Both",
          cmd: "cd ~",
          note: "Jump straight to your home folder, from anywhere.",
        },
        {
          label: "Both",
          cmd: "cd ..",
          note: "Go one folder up.",
        },
        {
          label: "Linux / macOS",
          cmd: "cd /home/you/projects",
          note: "An absolute path — starts from the root /.",
        },
      ],
    },
    {
      heading: "5. Moving — cd",
      body: "cd (change directory) is how you move. It takes one argument: the folder to go to. If you type cd projects, you go into the projects folder that is inside your current folder. If you type cd .., you climb one level up. Typing cd with nothing after it takes you home. And if you get an error like 'No such file or directory', it almost always means the folder name is misspelled — check with ls first.",
      examples: [
        {
          label: "Both",
          cmd: "cd projects",
          note: "Enter the projects folder.",
        },
        {
          label: "Both",
          cmd: "cd ..",
          note: "Back up one level.",
        },
        {
          label: "Linux / macOS",
          cmd: "cd",
          note: "With no argument: go to your home folder.",
        },
      ],
    },
    {
      heading: "6. Creating things — mkdir and touch",
      body: "mkdir (make directory) creates a folder. You can create several at once: mkdir data scripts. touch creates an empty file — useful as a placeholder, like touch notes.txt. In PowerShell, touch doesn't exist; the equivalent is New-Item notes.txt (or ni notes.txt, its short alias). None of these asks 'are you sure?' — the terminal trusts you.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "mkdir data scripts",
          note: "Creates two folders at once.",
        },
        {
          label: "Linux / macOS",
          cmd: "touch notes.txt",
          note: "Creates an empty file.",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "New-Item notes.txt",
          note: "The PowerShell way to create an empty file.",
        },
      ],
    },
    {
      heading: "7. Reading files — cat / type",
      body: "cat (concatenate) prints a file's content to the screen. In PowerShell, type is the classic name, and cat also works. For long files, less (Linux) or more (both) shows it page by page — press q to quit, space for the next page. head -n 5 shows the first 5 lines, tail -n 5 the last 5 — extremely useful later for checking big CSV files.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cat notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "type notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Linux / macOS",
          cmd: "head -n 5 rates.csv",
          note: "First 5 lines — your future best friend for data files.",
        },
      ],
    },
    {
      heading: "8. Changing things — cp, mv, rm",
      body: "cp (copy) copies a file: cp notes.txt backup.txt. mv (move) moves it to another folder — or, if you give it a new name in the same folder, renames it: mv notes.txt day1.txt. rm (remove) deletes — and here is the one serious warning in this whole guide: rm does not use the recycle bin. What it removes is gone. Before any rm, run ls once and look at what you're about to delete. For folders, rm -r deletes a folder and everything inside it — triple-check before that one. PowerShell: Copy-Item, Move-Item, Remove-Item.",
      examples: [
        {
          label: "Both (Linux) / PowerShell alias works too",
          cmd: "cp notes.txt backup.txt",
          note: "Make a copy.",
        },
        {
          label: "Linux / macOS",
          cmd: "mv notes.txt day1.txt",
          note: "Rename: same folder, new name.",
        },
        {
          label: "Linux / macOS",
          cmd: "rm day1.txt",
          note: "Delete — no recycle bin. Look before you delete.",
        },
      ],
    },
    {
      heading: "9. Working faster — the habits of professionals",
      body: "Nobody types full names. Press Tab while typing a folder name and the terminal completes it: cd pro<Tab> becomes cd projects. Press the up arrow ↑ to bring back your last command — and keep pressing to go back through history. Ctrl+C cancels a command that's stuck. clear (or Ctrl+L) cleans the screen. These four habits alone put you ahead of many people who've 'used computers' for years.",
      examples: [
        {
          label: "Both",
          cmd: "cd pro<Tab>",
          note: "Tab completion: the terminal types the rest for you.",
        },
        {
          label: "Both",
          cmd: "↑",
          note: "Up arrow: bring back the last command.",
        },
        {
          label: "Both",
          cmd: "clear",
          note: "Clean screen. Also Ctrl+L.",
        },
      ],
    },
    {
      heading: "10. Running Python from the terminal",
      body: "This is why the terminal matters for this whole curriculum. The command python hello.py means: use the Python program to execute the file hello.py in this folder. python --version tells you which Python you have. If the computer says 'command not found' or 'not recognized', Python isn't installed correctly — go back to Week 1's setup. From now on, in this curriculum, always run your scripts from the terminal: it's how real tools run.",
      examples: [
        {
          label: "Both",
          cmd: "python --version",
          output: "Python 3.12.0",
        },
        {
          label: "Both",
          cmd: "python hello.py",
          output: "Hello, world!",
        },
      ],
    },
    {
      heading: "11. When things go wrong — reading errors",
      body: "Errors in the terminal are honest, not hostile. 'command not found' (bash) or 'is not recognized' (PowerShell): you typed a name the computer doesn't know — misspelled, or the program isn't installed. 'No such file or directory': the file or folder you mentioned doesn't exist where you think it does — run ls and pwd and look. 'Permission denied': the system is protecting you — usually you're in the wrong place or you need to be careful. The habit that separates learners from struggling learners: read the error message fully, out loud, before typing anything else.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cd projct",
          output: "bash: cd: projct: No such file or directory",
          note: "Misspelled. Run ls, look at the real name, retry with Tab.",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "pythn --version",
          output: "pythn : The term 'pythn' is not recognized...",
          note: "Same lesson: the computer only knows exact names.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Windows vs Linux — quick reference",
    rows: [
      { action: "Where am I?", command: "pwd", result: "/home/you" },
      { action: "List files", win: "dir / ls", linux: "ls", result: "projects   notes.txt" },
      { action: "Change folder", command: "cd projects", result: "(silence = success)" },
      { action: "Go up one level", command: "cd ..", result: "(silence = success)" },
      { action: "Go home", win: "cd ~", linux: "cd", result: "(silence = success)" },
      { action: "Create a folder", command: "mkdir data", result: "(silence = success)" },
      { action: "Create empty file", win: "New-Item notes.txt", linux: "touch notes.txt", result: "(silence = success)" },
      { action: "Show a file", win: "type notes.txt", linux: "cat notes.txt", result: "Terminal practice — day 1" },
      { action: "Copy a file", win: "Copy-Item a.txt b.txt", linux: "cp a.txt b.txt", result: "(silence = success)" },
      { action: "Move / rename", win: "Move-Item a.txt b.txt", linux: "mv a.txt b.txt", result: "(silence = success)" },
      { action: "Delete a file", win: "Remove-Item notes.txt", linux: "rm notes.txt", result: "(silence = success)" },
      { action: "Clean the screen", command: "clear", result: "(the screen goes empty)" },
      { action: "Run a script", command: "python hello.py", result: "Hello, world!" },
    ],
  },
  missions: [
    {
      id: "m1",
      prompt: "Ask the computer where you are right now.",
      hint: "print working directory — three letters.",
    },
    {
      id: "m2",
      prompt: "List everything in the current folder.",
      hint: "One word, two letters.",
    },
    {
      id: "m3",
      prompt: "Go inside the projects folder.",
      hint: "change directory — cd projects",
    },
    {
      id: "m4",
      prompt: "Inside projects, create a folder called data.",
      hint: "make directory",
    },
    {
      id: "m5",
      prompt: "Inside projects/data, create a folder called scripts.",
      hint: "You can cd into data first, or create it with a path: mkdir data/scripts from inside projects.",
    },
    {
      id: "m6",
      prompt: "Create a file notes.txt in projects/data/scripts with the text: learning log",
      hint: "First cd into data/scripts, then echo learning log > notes.txt — or from projects, use the path: echo learning log > data/scripts/notes.txt",
    },
    {
      id: "m7",
      prompt: "Show the content of notes.txt on the screen.",
      hint: "The good old concatenate command.",
    },
    {
      id: "m8",
      prompt: "Return to your home folder (~).",
      hint: "cd ~ works from anywhere. Or climb: cd ../..",
    },
  ],
  quiz: [
    {
      q: "Which command tells you which folder you are currently in?",
      options: ["ls", "pwd", "cd", "cat"],
      answer: 1,
      why: "pwd — print working directory. It shows your current location, always.",
    },
    {
      q: "What does cd .. do?",
      options: [
        "Goes into a folder called '..'",
        "Deletes the current folder",
        "Goes up one folder level",
        "Goes back to the previous command",
      ],
      answer: 2,
      why: ".. means 'the folder above this one'. cd .. moves one level up.",
    },
    {
      q: "Which command creates a new folder called data?",
      options: ["touch data", "mkdir data", "new data", "ls data"],
      answer: 1,
      why: "mkdir — make directory. touch creates an empty file, not a folder.",
    },
    {
      q: "In a path, what does ~ mean?",
      options: ["The root of the disk", "The current folder", "The folder above", "Your home folder"],
      answer: 3,
      why: "~ is shorthand for your home folder — from there, relative paths start.",
    },
    {
      q: "Which one is an absolute path (Linux)?",
      options: ["projects/data", "./data", "/home/you/projects", "../projects"],
      answer: 2,
      why: "Absolute paths start from the root / — they work no matter where you currently are.",
    },
    {
      q: "What is the safest thing to do before using rm on a file?",
      options: [
        "Nothing — rm asks for confirmation",
        "Run ls first to see exactly what you're deleting",
        "Open the file with cat to check its size",
        "Rename the file first",
      ],
      answer: 1,
      why: "rm does not use the recycle bin — what it removes is gone. Looking at ls first is the cheap insurance habit.",
    },
    {
      q: "What does pressing Tab do while typing cd proj?",
      options: [
        "Suggests help",
        "Deletes the word",
        "Completes the name automatically",
        "Opens the folder",
      ],
      answer: 2,
      why: "Tab completion finishes folder and file names — faster and typo-free. It's the number one speed habit.",
    },
    {
      q: "You run python hello.py and get: 'python: command not found'. Most likely cause?",
      options: [
        "hello.py has a bug",
        "You are in the wrong folder",
        "Python is not installed or not in your PATH",
        "The file is empty",
      ],
      answer: 2,
      why: "The computer doesn't know a program called python — it's not installed correctly or not on PATH. Revisit the Week 1 setup.",
    },
    {
      q: "In PowerShell, which command shows the content of notes.txt?",
      options: ["type notes.txt", "show notes.txt", "open notes.txt", "read notes.txt"],
      answer: 0,
      why: "type is the classic Windows command. (cat also works in modern PowerShell as an alias.)",
    },
    {
      q: "Why does this curriculum insist you run scripts from the terminal instead of pressing 'Run' in the editor?",
      options: [
        "Because it's faster to type",
        "Because real tools, servers and automation all run programs from the command line",
        "Because the editor button is broken",
        "Because Python refuses to run otherwise",
      ],
      answer: 1,
      why: "Servers, scheduled jobs, pipelines and automation don't have an editor button. The command line is how programs actually get run in the real world.",
    },
  ],
  outro:
    "If you completed the missions and got most of the quiz right, you already command a computer better than most people who've used one for years. Keep this page open during Week 1 — and whenever you feel lost in any later week, come back: pwd, ls, cd are the three moves you'll repeat your entire career.",
};
