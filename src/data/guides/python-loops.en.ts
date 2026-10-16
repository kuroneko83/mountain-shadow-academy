import type { Guide } from "../types";

export const guideLoopsEn: Guide = {
  slug: "python-loops",
  title: "Python II: loops and functions, without fear",
  intro:
    "This guide serves Week 4. Programs become powerful when they repeat work without you, and when logic is packaged into named, reusable functions. This is also where you learn to read error messages calmly — a skill you'll use daily. Read the lesson, then build the whole daily-report program in the simulator: a list of volumes, loops that walk it, and the functions total, average, best_day, and report.",
  week: "04-python-basics-2",
  sections: [
    {
      heading: "1. Why loops exist at all",
      body: "Computers exist to repeat work without complaining. Without loops, adding 7 numbers means 7 lines; with a loop, one line works for 7 or 7 million. Python has exactly two loops: for (do this once for each item) and while (do this as long as something is true). 90% of real code uses for; while is for the special cases — and for accidentally freezing your program, which is why we'll handle it carefully.",
      examples: [
        {
          label: "The same job, without and with a loop",
          cmd: "print(1000 + 2000 + 3000 + 4000 + 5000 + 6000 + 7000)\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "28000\n28000",
          note: "Same answer. One grows with the problem; the other doesn't.",
        },
      ],
    },
    {
      heading: "2. for: once per item",
      body: "for v in volumes: reads: 'for each value in the list, call it v and run the block'. The loop variable (v) is your temporary name for the current item — you choose it, same rules as any variable. The colon and 4-space indentation are exactly like if from Week 3. The loop walks the list front to back, once, and then continues after the block. You can loop over strings too: for letter in \"JPY\": visits J, then P, then Y.",
      examples: [
        {
          label: "Both",
          cmd: "volumes = [1000, 2000, 3000]\nfor v in volumes:\n    print(v)\nprint(\"done\")",
          output: "1000\n2000\n3000\ndone",
          note: "The block runs once per item; then the program continues after the loop.",
        },
      ],
    },
    {
      heading: "3. range(): numbers on demand",
      body: "range() produces the numbers of a counting loop, without a list. range(7) is 0 to 6 (yes, it starts at 0 and the end is excluded — the same rule as slicing in Week 3). range(1, 8) is 1 to 7. The classic pair: for i in range(len(volumes)) walks the POSITIONS (0, 1, 2...) while you read the values with volumes[i] — that's how you know both the day number and the value, which best_day() needs.",
      examples: [
        {
          label: "Both",
          cmd: "for i in range(1, 8):\n    print(f\"day {i}\")",
          output: "day 1\nday 2\nday 3\nday 4\nday 5\nday 6\nday 7",
          note: "range(1, 8): starts at 1, stops BEFORE 8.",
        },
        {
          label: "Positions and values together",
          cmd: "volumes = [1000, 2000, 3000]\nfor i in range(len(volumes)):\n    print(f\"day {i + 1}: {volumes[i]}\")",
          output: "day 1: 1000\nday 2: 2000\nday 3: 3000",
        },
      ],
    },
    {
      heading: "4. The accumulator: the pattern of this whole week",
      body: "How do you total a list if you're not allowed to cheat with sum()? You keep a running total: start it at zero BEFORE the loop, and inside the loop add each item: total = total + v (shorthand: total += v). Walk it slowly with 3 items: total starts 0; after 1000 it's 1000; after 2000 it's 3000; after 3000 it's 6000. This pattern — initialize outside, update inside — is the single most important pattern of Week 4. It's also how counting, averages, best-values, and (later in your career) aggregations in pandas all work.",
      examples: [
        {
          label: "Both",
          cmd: "volumes = [1000, 2000, 3000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "6000",
          note: "Initialize BEFORE the loop. Update INSIDE the loop. Both matter.",
        },
      ],
    },
    {
      heading: "5. while: as long as it's true",
      body: "while condition: repeats its block as long as the condition stays True. A correct while always has three parts: something set BEFORE it (the counter), the condition, and something INSIDE the block that moves the counter (i += 1). Forget the third part and the loop never ends — the famous infinite loop. In real life, Ctrl+C stops it; in this simulator, a watchdog stops you after 10000 turns with a friendly note. When do you use while? When you don't know how many repetitions you need — 'keep asking until the user types a number'. Known count → for.",
      examples: [
        {
          label: "Both",
          cmd: "i = 1\nwhile i <= 3:\n    print(f\"day {i}\")\n    i += 1",
          output: "day 1\nday 2\nday 3",
          note: "Set before, test, move inside — all three present. Remove i += 1 and it never ends.",
        },
      ],
    },
    {
      heading: "6. def: building your own tools",
      body: "A function is a mini-program with a name: def total(values): defines a tool called total that receives something called values, runs its indented block, and hands a result back with return. The definition alone does nothing — it's a recipe. The magic happens at the call: total(volumes) runs the recipe with your list. Function names follow the same rules as variables: lowercase_with_underscores. Parameters are the ingredients; each function should need very few — one or two is healthy.",
      examples: [
        {
          label: "Both",
          cmd: "def total(values):\n    \"sum of a list, the long honest way\"\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nvolumes = [1000, 2000, 3000]\nprint(total(volumes))",
          output: "6000",
          note: "def is the recipe; the last line is the cooking. Nothing happens until the call.",
        },
      ],
    },
    {
      heading: "7. return vs print: the confusion that eats beginners",
      body: "print shows something to a human. return hands a value back to the PROGRAM, so the rest of the code can use it. They are different tools for different jobs — and mixing them up has a telltale symptom: printing a function that forgot return shows None (Python's 'nothing'). If you see best day: None in your output, best_day() is printing instead of returning. The rule of thumb: functions RETURN; the main program PRINTS. A function that only prints is a dead end — nothing can use its result.",
      examples: [
        {
          label: "The telltale None",
          cmd: "def best_day(values):\n    print(7)\n\nprint(f\"best day: {best_day([1, 2])}\")",
          output: "7\nbest day: None",
          note: "It printed 7 (to the human), then returned None (to the program). Change print to return and both lines become one.",
        },
      ],
    },
    {
      heading: "8. Functions calling functions: breaking big problems small",
      body: "average() doesn't re-add the list: it calls total() and divides by len(). This is the whole craft of programming: solve a big problem by solving small ones and composing them. Each function does ONE job, gets a clear name, and gets tested by calling it. bonus: bugs get small too — when the average is wrong, you ask: is total() wrong, or the division? You can even define functions that call functions that call functions — real programs are towers of this.",
      examples: [
        {
          label: "Both",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\ndef average(values):\n    return total(values) / len(values)\n\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nprint(average(volumes))",
          output: "4000",
          note: "average is 3 lines because total exists. Composition, not duplication.",
        },
      ],
    },
    {
      heading: "9. Reading error messages like a professional",
      body: "Errors in this simulator show name and line: go to the line, read it out loud. In real Python the traceback is longer: the LAST line names the error, the lines above show the path (which function was running). The discipline stays the same: read the last line first, then find the line number. The classics of Week 4: NameError for a function you haven't defined yet (or misspelled); TypeError 'takes exactly 1 argument (0 given)' — a call with the wrong number of ingredients; SyntaxError for a missing colon on def/for/while; and the infinite-loop freeze, which is not an error at all — the program is just... forever.",
      examples: [
        {
          label: "The argument count error",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nprint(total())",
          output: "TypeError: total() takes exactly 1 argument (0 given)",
          note: "The message says exactly what's wrong. Read it before touching the code.",
        },
      ],
    },
    {
      heading: "10. The whole week in one picture",
      body: "Week 4's project is a daily report: a list of 7 volumes, loops that walk it, and small functions that answer questions about it — total, average, best day — composed by one report() that prints the summary. The missions in the simulator build exactly this, one piece at a time. When each mission passes, you have written the real Week 4 project — the same structure you'll reuse in Week 8 on real data with pandas.",
      examples: [
        {
          label: "The final shape",
          cmd: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nreport(volumes)\n\ndef report(values):\n    print(f\"total: {total(values)}\")\n    print(f\"average: {average(values)}\")\n    print(f\"best day: {best_day(values)}\")",
          output: "total: 28000\naverage: 4000\nbest day: 7",
          note: "One list. Small functions. One report. That's a real data program.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Loops and functions — quick reference",
    rows: [
      { action: "Once per item", command: "for v in volumes:", result: "(one print per item)" },
      { action: "Count 1..7", command: "for i in range(1, 8):", result: "1, 2, 3, 4, 5, 6, 7" },
      { action: "Positions + values", command: "for i in range(len(values)):", result: "0, 1, 2, ..." },
      { action: "Running total", command: "result = 0 ... result += v", result: "28000 (after the last item)" },
      { action: "While (3 parts)", command: "i = 1 / while i <= 7: / i += 1", result: "day 1 ... day 7" },
      { action: "Define a tool", command: "def total(values):", result: "(nothing runs — it's a definition)" },
      { action: "Hand a result back", command: "return result", result: "(the value goes back to the caller)" },
      { action: "Use the tool", command: "total(volumes)", result: "28000" },
      { action: "Compose", command: "return total(values) / len(values)", result: "4000" },
      { action: "Add to a list", command: "items.append(3)", result: "None (the list itself changed)" },
    ],
  },
  missions: [
    {
      id: "l1",
      prompt: "Create the data: a list volumes with exactly these 7 values — 1000, 2000, 3000, 4000, 5000, 6000, 7000.",
      hint: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]",
    },
    {
      id: "l2",
      prompt: "Walk the list: a for loop that prints each value, one per line.",
      hint: "for v in volumes: then 4 spaces and print(v)",
    },
    {
      id: "l3",
      prompt: "Write a function total(values) that adds the list with a loop (no built-in sum() — that's Week 7's reward) and returns the result. Print total(volumes) — 28000.",
      hint: "result = 0 BEFORE the loop, result += v INSIDE it, return result at the end. print(total(volumes))",
    },
    {
      id: "l4",
      prompt: "Write average(values) — but don't re-add the list: call total() inside it. Print average(volumes) — 4000.",
      hint: "def average(values): return total(values) / len(values)",
    },
    {
      id: "l5",
      prompt: "Write best_day(values) that returns the DAY NUMBER (1-7) with the highest value, and print(f\"best day: {best_day(volumes)}\").",
      hint: "for i in range(len(values)): — if values[i] > best: keep the value AND the day (i + 1). Return the day.",
    },
    {
      id: "l6",
      prompt: "Prove you can count: a while loop that prints day 1 through day 7 (with a counter, not a list).",
      hint: "i = 1 / while i <= 7: print(f\"day {i}\") / i += 1 — all three parts present.",
    },
    {
      id: "l7",
      prompt: "A function from Week 3, properly: yen_to_usd(amount) that returns an f-string like \"200.00 USD\" (rate 150), then print(yen_to_usd(30000)).",
      hint: "def yen_to_usd(amount): rate = 150.0 / return f\"{amount / rate:.2f} USD\" — RETURN, don't print inside.",
    },
    {
      id: "l8",
      prompt: "The finale: report(values) prints the summary using total, average and best_day — lines \"total: 28000\", \"average: 4000\", \"best day: 7\". Call it with your volumes.",
      hint: "def report(values): three prints with f-strings, each calling one function. Then report(volumes).",
    },
  ],
  quiz: [
    {
      q: "What does for v in volumes: do?",
      options: [
        "Runs the block once with the whole list",
        "Runs the block once per item, v being the current item",
        "Counts from 1 to the list length",
        "Waits for the user to type values",
      ],
      answer: 1,
      why: "'For each value in the list, call it v, run the block.' Once per item, front to back.",
    },
    {
      q: "Which numbers does range(1, 8) produce?",
      options: ["1 to 8", "1 to 7", "0 to 8", "0 to 7"],
      answer: 1,
      why: "Starts at 1, stops BEFORE 8: 1, 2, 3, 4, 5, 6, 7. Same end-excluded rule as slicing.",
    },
    {
      q: "In the accumulator pattern, where does result = 0 go?",
      options: [
        "Inside the loop",
        "Before the loop starts",
        "After the loop",
        "It doesn't matter",
      ],
      answer: 1,
      why: "Initialize BEFORE, update INSIDE. Initialize inside and each turn resets it to zero — the total never grows.",
    },
    {
      q: "Your while loop never stops. Most likely cause?",
      options: [
        "while is broken in Python",
        "Nothing inside the block changes the condition (e.g. i += 1 missing)",
        "The colon is missing",
        "The counter started at 0",
      ],
      answer: 1,
      why: "A while needs its three parts: set before, test, MOVE inside. Ctrl+C in real life; the simulator's watchdog stops you with a note.",
    },
    {
      q: "What does def total(values): do by itself?",
      options: [
        "Runs the function immediately",
        "Prints the result",
        "Defines the recipe — nothing runs until you call total(...)",
        "Creates a variable named total",
      ],
      answer: 2,
      why: "def is a recipe; the call is the cooking. Defining without calling produces no output — that's normal.",
    },
    {
      q: "What is the difference between return and print?",
      options: [
        "None, they're synonyms",
        "print shows a human; return hands a value back to the program to use",
        "return shows a human; print hands a value back",
        "print only works inside functions",
      ],
      answer: 1,
      why: "Functions RETURN; the main program PRINTS. A function that only prints is a dead end — nothing can use its result.",
    },
    {
      q: "print(f\"best day: {best_day(volumes)}\") shows 'best day: None'. Why?",
      options: [
        "best_day is broken because functions can't go in f-strings",
        "best_day forgot return — it printed instead, and returned nothing (None)",
        "None is the correct answer",
        "The f-string is missing the f",
      ],
      answer: 1,
      why: "The telltale None: the function showed its answer to the human instead of returning it to the program. Change print to return.",
    },
    {
      q: "Why is average() written as return total(values) / len(values) instead of re-adding the list?",
      options: [
        "It runs faster",
        "Because composition beats duplication — small functions, each one job, reused everywhere",
        "Because Python requires it",
        "It doesn't work any other way",
      ],
      answer: 1,
      why: "Solve big problems by solving small ones and composing. Bonus: bugs get small too — when the average is wrong, you know where to look.",
    },
    {
      q: "total() takes exactly 1 argument (0 given) — what happened?",
      options: [
        "total is broken",
        "You called total() without its ingredient — the message says exactly what's wrong",
        "The function needs two lists",
        "Python limits arguments to one",
      ],
      answer: 1,
      why: "TypeError with an exact count: the call and the recipe disagree about ingredients. Read the message — it's a gift.",
    },
    {
      q: "When should you choose while instead of for?",
      options: [
        "Never — for is always better",
        "When you know exactly how many repetitions you need",
        "When you DON'T know how many repetitions — 'until something happens'",
        "When working with lists",
      ],
      answer: 2,
      why: "Known count → for (or for over the list directly). Unknown count, 'until the user types a number' → while. 90% of real loops are for.",
    },
    {
      q: "What does a lone string as the first line of a def body mean?",
      options: [
        "A bug — Python will error",
        "A docstring — a human-readable note about what the function does",
        "It prints when the function is called",
        "It renames the function",
      ],
      answer: 1,
      why: "The docstring documents the recipe — for future you and for tools that read it. It doesn't run anything.",
    },
    {
      q: "items = [1, 2] — what does items.append(3) do?",
      options: [
        "Returns a new list [1, 2, 3] without touching items",
        "Adds 3 to the END of items itself and returns None",
        "Adds 3 to the front",
        "Prints the list",
      ],
      answer: 1,
      why: "append mutates the list in place (unlike string methods, which return new strings). It returns None — print(items) to see the change.",
    },
  ],
  outro:
    "When the eight missions pass, you have written the real Week 4 project — the same program the weekly plan asks for, tested line by line. Do it once more from an empty editor without the hints: when for, while, def and return come out of your fingers without thinking, you've earned Week 5, where programs start remembering things between runs: files, lists in depth, and the expense-tracker project.",
};
