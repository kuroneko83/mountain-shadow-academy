import type { Guide } from "../types";

export const guidePythonEn: Guide = {
  slug: "python-basics",
  title: "Python I: values, text, decisions — slowly",
  intro:
    "This guide serves Week 3. These are the atoms of every program you'll ever write: storing values, shaping text, and making decisions. SLOW DOWN here — a shaky foundation costs you weeks later. Read the lesson with the simulator open: write the programs, run them, break them on purpose, read the errors. Then take the quiz.",
  week: "03-python-basics-1",
  sections: [
    {
      heading: "1. What a program really is",
      body: "A program is a list of instructions the computer follows top to bottom, one line at a time. The computer is very fast and very literal: it does exactly what you wrote, not what you meant. Python was designed to read almost like English — which is why it's the world's most common first language. In the simulator on this page, your program runs line by line: print() shows something, = remembers something, if decides something.",
      examples: [
        {
          label: "Both",
          cmd: "print(\"hello\")\nprint(\"goodbye\")",
          output: "hello\ngoodbye",
          note: "Top to bottom. Always.",
        },
      ],
    },
    {
      heading: "2. Variables: labels, not equations",
      body: "A variable is a label you attach to a value so you can use it later. The = sign is not math equality — it's an instruction: 'calculate the right side, then store it under this name'. Read assignments right-to-left. Names: lowercase with underscores (usd, learning_log) — descriptive names cost nothing and pay forever. A variable only exists after you assign it: using it before that is the classic NameError.",
      examples: [
        {
          label: "Both",
          cmd: "rate = 150.0\nyen = 30000\nusd = yen / rate\nprint(usd)",
          output: "200",
          note: "Right side first, then the name. rate, yen, usd — words, not x1, x2.",
        },
        {
          label: "The classic NameError",
          cmd: "print(rtae)",
          output: "NameError: name 'rtae' is not defined",
          note: "Misspelled — the computer does exactly what you wrote, not what you meant.",
        },
      ],
    },
    {
      heading: "3. Numbers: int, float, and the operators",
      body: "Python has two number types for you: int (30000, whole) and float (150.0, decimal point). The dot is what makes it a float. Arithmetic: + - * and parentheses work as in math. Three operators surprise everyone: / is ALWAYS float division (7 / 2 is 3.5, even for whole numbers), // is floor division (7 // 2 is 3), and % is the remainder (7 % 2 is 1 — 'odd or even' checks use it). ** is power: 2 ** 10 is 1024. Dividing by zero is an error — a real one, not a crash: ZeroDivisionError.",
      examples: [
        {
          label: "Both",
          cmd: "print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 10)",
          output: "3.5\n3\n1\n1024",
        },
        {
          label: "The money case",
          cmd: "yen = 30500\nrate = 150.0\nprint(yen / rate)",
          output: "203.33333333333334",
          note: "Floats carry many decimals — that's normal. f-strings (next) format them for humans.",
        },
      ],
    },
    {
      heading: "4. Strings: text, exactly as written",
      body: "A string is text between single or double quotes — same meaning, pick one and be consistent. Strings concatenate with + (glue), repeat with * (\"ab\" * 3 is \"ababab\"). The trap everyone hits: \"text\" + number is a TypeError — the computer refuses to guess whether you wanted math or glue. The fix is conversion (str(number)) or, better, f-strings — the next section.",
      examples: [
        {
          label: "Both",
          cmd: "print(\"30000\" + \" JPY\")",
          output: "30000 JPY",
          note: "Both sides strings: + glues.",
        },
        {
          label: "The TypeError everyone meets",
          cmd: "print(\"yen: \" + 30000)",
          output: "TypeError: can only concatenate str (not \"int\") to str",
          note: "The computer refuses to guess. Convert, or use an f-string.",
        },
      ],
    },
    {
      heading: "5. f-strings: the one feature to fall in love with",
      body: "Put an f before the quote and { } becomes a window into your program: f\"{yen} JPY = {usd} USD\" fills in the current values. Inside the braces you can use any expression — f\"{yen / rate}\". And the money trick: a format spec like :.2f forces exactly 2 decimals: f\"{usd:.2f}\" turns 200.0 into 200.00. For data reports and money, you'll use this every single day of your career. It is the single most useful thing in this whole guide.",
      examples: [
        {
          label: "Both",
          cmd: "yen = 30000\nrate = 150.0\nusd = yen / rate\nprint(f\"{yen} JPY = {usd:.2f} USD\")",
          output: "30000 JPY = 200.00 USD",
        },
        {
          label: "Expressions inside braces work",
          cmd: "print(f\"{30000 / 150} dollars\")",
          output: "200 dollars",
        },
      ],
    },
    {
      heading: "6. String methods: tools that return new text",
      body: "Strings come with attached tools called methods: .strip() removes spaces at the ends, .lower() and .upper() change case, .title() capitalizes each word, .replace(a, b) swaps text. Call them with parentheses: name.strip(). They chain: name.strip().lower(). One crucial fact: strings are immutable — methods never change the original; they RETURN a new string. If you don't use the result, nothing happened.",
      examples: [
        {
          label: "Both",
          cmd: "name = \"  Mountain Shadow  \"\nprint(name.strip())\nprint(name.strip().lower())",
          output: "Mountain Shadow\nmountain shadow",
          note: "name itself is unchanged — the methods return new strings.",
        },
      ],
    },
    {
      heading: "7. Counting and cutting: len() and slicing",
      body: "len() counts characters: len(\"hello\") is 5. Strings are sequences, and every character has a position — starting from ZERO, not one. s[0] is the first character, s[-1] the last (counting from the end — very convenient). Slicing cuts a piece: s[0:8] is characters 0 up to 7 (end excluded). This feels strange for a day, then becomes second nature. Off-by-one is the classic beginner bug — when a slice is one character short, look at the end index.",
      examples: [
        {
          label: "Both",
          cmd: "s = \"Mountain Shadow\"\nprint(s[0])\nprint(s[-1])\nprint(s[0:8])\nprint(len(s))",
          output: "M\nn\nMountain\n15",
          note: "s[0:8] = positions 0..7. The end is excluded. Always.",
        },
      ],
    },
    {
      heading: "8. Comparisons and booleans: True, False",
      body: "== asks 'are these equal?' and answers True or False. The trap of traps: = assigns, == compares — writing = inside a condition is a SyntaxError in Python, which saves you from yourself. Other comparisons: != (not equal), < <= > >=. Booleans combine with and, or, not. Python's truth rules: 0, \"\", and False are falsy; almost everything else is truthy.",
      examples: [
        {
          label: "Both",
          cmd: "yen = 30000\nprint(yen == 30000)\nprint(yen > 10000 and yen < 100000)",
          output: "True\nTrue",
        },
        {
          label: "The = vs == trap",
          cmd: "if yen = 30000:\n    print(\"ok\")",
          output: "SyntaxError: invalid syntax",
          note: "= assigns, == compares. Python refuses the wrong one — on purpose.",
        },
      ],
    },
    {
      heading: "9. if / elif / else: the program decides",
      body: "if runs a block of code only when a condition is True. The structure has exactly three parts: the word if, the condition, a colon — then the block, indented by 4 spaces. The colon and the indentation ARE the syntax: forget the colon and Python says SyntaxError; forget the indentation and it says IndentationError. elif adds another condition ('else if'), else is the fallback. Exactly one branch of the whole chain runs — never two, never zero.",
      examples: [
        {
          label: "Both",
          cmd: "yen = 30000\nif yen > 10000:\n    print(\"big\")\nelif yen > 0:\n    print(\"ok\")\nelse:\n    print(\"invalid: negative amount\")",
          output: "big",
          note: "One of the three ran. Indentation tells Python what belongs where.",
        },
      ],
    },
    {
      heading: "10. Converting types: the interpreter's honesty",
      body: "int(\"30000\") turns text into a number, float(\"150.5\") into a float, str(200) a number into text. Why? Because data from files, the internet and input() ALWAYS arrives as text — converting is your job. And the conversion is honest: int(\"hello\") is a ValueError ('invalid literal'), because hello isn't a number. Catch the pattern: TypeError means wrong TYPE for the operation; ValueError means the right type but impossible CONTENT.",
      examples: [
        {
          label: "Both",
          cmd: "text = \"30000\"\nprint(text + \" JPY\")\nprint(int(text) + 1)",
          output: "30000 JPY\n30001",
          note: "Same value, different types, different behaviors.",
        },
        {
          label: "The honest refusal",
          cmd: "print(int(\"hello\"))",
          output: "ValueError: invalid literal for int() with base 10: 'hello'",
        },
      ],
    },
    {
      heading: "11. When things go wrong — reading the error first",
      body: "The discipline that separates learners from strugglers: read the LAST line of the error, out loud, before typing anything. NameError: name 'x' is not defined — used before assignment, or misspelled. TypeError: can only concatenate str — mixed a string with a number: convert or f-string. SyntaxError: invalid syntax — usually a missing colon or quote; the error points AT the problem or just before it. IndentationError: unexpected indent — the lines don't line up; make every block level exactly 4 spaces. ZeroDivisionError — the math refused. In the simulator, errors print with the line number: go to that line, read it out loud.",
      examples: [
        {
          label: "In the simulator, errors show the line",
          cmd: "rate = 150.0\nprint(rtae)",
          output: "NameError: name 'rtae' is not defined (line 2)",
          note: "Line 2. Read the line out loud, letter by letter. It's always something small.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "The Week-3 toolkit — quick reference",
    rows: [
      { action: "Store a value", command: "rate = 150.0" },
      { action: "Show something", command: "print(f\"{usd:.2f} USD\")" },
      { action: "Float division", command: "yen / rate" },
      { action: "Floor / remainder", command: "7 // 2, 7 % 2" },
      { action: "Glue strings", command: "f\"{a} and {b}\"" },
      { action: "2-decimal money", command: "f\"{usd:.2f}\"" },
      { action: "Clean text", command: "name.strip().lower()" },
      { action: "Count characters", command: "len(name)" },
      { action: "Slice", command: "s[0:8]" },
      { action: "Compare", command: "yen == 30000, yen > 0" },
      { action: "Decide", command: "if / elif / else" },
      { action: "Convert types", command: "int(\"30000\"), str(200)" },
    ],
  },
  missions: [
    {
      id: "p1",
      prompt: "Start your converter: create a variable rate with the value 150.0 (the USD/JPY rate), and print it.",
      hint: "rate = 150.0, then print(rate)",
    },
    {
      id: "p2",
      prompt: "Add a variable yen with the value 30000 — the amount to convert.",
      hint: "yen = 30000 — you can add lines without deleting the old ones; your program grows.",
    },
    {
      id: "p3",
      prompt: "Compute usd — yen divided by rate.",
      hint: "usd = yen / rate",
    },
    {
      id: "p4",
      prompt: "Print a real sentence with an f-string: the yen amount and the usd result in one line.",
      hint: "print(f\"{yen} JPY = {usd} USD\")",
    },
    {
      id: "p5",
      prompt: "Money needs exactly 2 decimals — print the sentence again with the :.2f format spec.",
      hint: "print(f\"{yen} JPY = {usd:.2f} USD\") — look at the .00",
    },
    {
      id: "p6",
      prompt: "Add a decision: if yen is more than 10000, print big — otherwise print small (with yen still 30000).",
      hint: "if yen > 10000: then 4 spaces of indentation. Don't forget the colon.",
    },
    {
      id: "p7",
      prompt: "Handle bad input: set yen to -500 and print a polite error message instead of a negative amount.",
      hint: "Change yen after the first if: yen = -500, then a new if/else — if yen < 0: print(\"invalid: negative amount\"). The old print of usd stays fine.",
    },
    {
      id: "p8",
      prompt: "Text tools: create name = \"  Mountain Shadow  \" (with the extra spaces) and print it cleaned and lowercase — one print, two methods.",
      hint: "print(name.strip().lower()) — methods return new strings; chaining them just works.",
    },
  ],
  quiz: [
    {
      q: "What is a variable, really?",
      options: [
        "A mathematical equation to solve",
        "A label attached to a value, so you can use it later",
        "A box that can only hold numbers",
        "A reserved word of Python",
      ],
      answer: 1,
      why: "= stores the right side's value under the name on the left. It's an instruction, not math equality.",
    },
    {
      q: "What does rate = 150.0 do, exactly?",
      options: [
        "Compares rate with 150.0",
        "Calculates 150.0 and stores it under the name rate",
        "Declares that rate will always be 150.0 forever",
        "Prints rate",
      ],
      answer: 1,
      why: "Assignment reads right-to-left: compute the right side, store under the left name.",
    },
    {
      q: "What does 7 / 2 evaluate to in Python 3?",
      options: ["3", "3.5", "4", "An error — odd numbers can't divide"],
      answer: 1,
      why: "/ is always float division: 3.5. // is floor division: 3. Two different tools, one character apart.",
    },
    {
      q: "print(\"yen: \" + 30000) raises a TypeError. Why?",
      options: [
        "print can only take one argument",
        "30000 is too big a number",
        "You can't glue a string and a number — the computer refuses to guess",
        "The quotes are wrong",
      ],
      answer: 2,
      why: 'TypeError: can only concatenate str (not "int") to str. Fix: convert with str(30000) or use an f-string.',
    },
    {
      q: "What does print(f\"{yen} JPY\") show when yen is 30000?",
      options: ["{yen} JPY", "30000 JPY", "yen JPY", "An error"],
      answer: 1,
      why: "The f turns { } into windows: the current value of yen is placed into the text.",
    },
    {
      q: "What is the difference between = and ==?",
      options: [
        "Nothing, they're synonyms",
        "= assigns a value, == compares two values",
        "= compares, == assigns",
        "== is only used in loops",
      ],
      answer: 1,
      why: "= stores. == asks 'are these equal?' and answers True or False. Python blocks = inside conditions to save you.",
    },
    {
      q: "In an if statement, what are the two things that ARE the syntax?",
      options: [
        "Curly braces and semicolons",
        "The colon at the end of the line and the indentation of the block",
        "Parentheses around the condition",
        "The word 'then' and a comma",
      ],
      answer: 1,
      why: "if condition: — colon, then the block indented (4 spaces). Forget either and you get SyntaxError or IndentationError.",
    },
    {
      q: 'What does name = "hi"; name.upper() do to name?',
      options: [
        "Changes name to HI",
        "Nothing — strings are immutable; the method returns a NEW string",
        "Deletes name",
        "Makes name uppercase only inside print",
      ],
      answer: 1,
      why: "name.upper() returns 'HI' — if you don't use the result, nothing happened. Use name = name.upper() to keep it.",
    },
    {
      q: "What is int(\"hello\")?",
      options: ["0", "None", "A ValueError — 'hello' can't be an integer", "The string 'hello'"],
      answer: 2,
      why: "The conversion is honest: right type (str), impossible content. ValueError with a message telling you exactly why.",
    },
    {
      q: "Your program prints the wrong result but no error. Best first move?",
      options: [
        "Rewrite everything from scratch",
        "Add prints of the variables right before the wrong line, and read the values",
        "Restart the computer",
        "Delete the program",
      ],
      answer: 1,
      why: "Print debugging — the oldest, most honest technique in the world: see what the values actually are at each step. In Week 4 you'll wrap this into functions.",
    },
    {
      q: "s = \"Mountain\" — what is s[-1]?",
      options: ["M", "n", "The whole string", "An IndexError"],
      answer: 1,
      why: "Negative indexes count from the end: -1 is the last character, -2 the second to last. Very convenient.",
    },
    {
      q: "How many branches of an if/elif/else chain run?",
      options: ["All that are true", "Exactly one — the first whose condition is true", "At most two", "None"],
      answer: 1,
      why: "Python checks top to bottom, runs the FIRST true branch, and skips the rest — including else.",
    },
  ],
  outro:
    "If the missions felt easy, good — that's the point of slowing down: these atoms (values, text, decisions) are 80% of every program you'll ever write. Keep practicing in the simulator until NameError and TypeError feel like old acquaintances who tell you exactly where to look. Next week: loops and functions — repeating work and packaging logic. Same place, same pace.",
};
