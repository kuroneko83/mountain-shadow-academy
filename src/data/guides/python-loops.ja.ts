import type { Guide } from "../types";

export const guideLoopsJa: Guide = {
  slug: "python-loops",
  title: "Python II：ループと関数、恐れずに",
  intro:
    "このガイドは第4週に対応します。プログラムが強力になるのは、あなたの代わりに仕事を繰り返し、ロジックを名前付きの再利用可能な関数にまとめるときです。そして、エラーメッセージを落ち着いて読む練習もここでする — 毎日使うスキルです。レッスンを読み、シミュレーターで日次レポートのプログラム全体を作ってください：volumes のリスト、それを巡るループ、そして total・average・best_day・report の関数。",
  week: "04-python-basics-2",
  sections: [
    {
      heading: "1. ループが存在する理由",
      body: "コンピューターは文句を言わずに仕事を繰り返すために存在します。ループなしでは、7つの数の合計は7行；ループを使えば1行で7個でも700万個でも扱えます。Pythonのループは2つだけ：for（各項目に1回ずつ）と while（何かが真の間）。実コードの90%は for — while は特別な場合と、うっかりプログラムを凍らせる場合用です。だから慎重に扱います。",
      examples: [
        {
          label: "同じ仕事、ループなしとあり",
          cmd: "print(1000 + 2000 + 3000 + 4000 + 5000 + 6000 + 7000)\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "28000\n28000",
          note: "同じ答え。片方は問題と一緒に成長し、もう片方はそうではない。",
        },
      ],
    },
    {
      heading: "2. for：項目ごとに1回",
      body: "for v in volumes: は「リストの各値を v と呼び、ブロックを実行せよ」と読みます。ループ変数（v）は現在の項目の一時的な名前 — あなたが選び、変数と同じ規則に従います。コロンと4スペースのインデントは、第3週の if とまったく同じ。ループはリストを前から後ろへ1回だけ歩き、その後ブロックの後に進みます。文字列もループできます：for letter in \"JPY\": は J、P、Y を訪れます。",
      examples: [
        {
          label: "両方",
          cmd: "volumes = [1000, 2000, 3000]\nfor v in volumes:\n    print(v)\nprint(\"done\")",
          output: "1000\n2000\n3000\ndone",
          note: "ブロックは項目ごとに1回。その後、ループの後へ進む。",
        },
      ],
    },
    {
      heading: "3. range()：必要なときに数を",
      body: "range() はリストなしでカウントループの数を作ります。range(7) は 0 から 6（そう、0から始まり終端は含まれない — 第3週のスライスと同じ規則）。range(1, 8) は 1 から 7。定番の組み合わせ：for i in range(len(volumes)) は「位置」（0, 1, 2...）を歩き、値は volumes[i] で読む — 日番号と値の両方が分かる、best_day() に必要なものです。",
      examples: [
        {
          label: "両方",
          cmd: "for i in range(1, 8):\n    print(f\"day {i}\")",
          output: "day 1\nday 2\nday 3\nday 4\nday 5\nday 6\nday 7",
          note: "range(1, 8)：1から始まり、8の手前で止まる。",
        },
        {
          label: "位置と値を同時に",
          cmd: "volumes = [1000, 2000, 3000]\nfor i in range(len(volumes)):\n    print(f\"day {i + 1}: {volumes[i]}\")",
          output: "day 1: 1000\nday 2: 2000\nday 3: 3000",
        },
      ],
    },
    {
      heading: "4. アキュムレータ：この週のパターン",
      body: "sum() でズルすることが許されないとして、リストの合計はどう出す？合計を持続的に蓄積します：ループの前にゼロで始め、ループの中で各項目を足す：total = total + v（略記：total += v）。3つの項目でゆっくり歩くと：total は 0 で始まり、1000の後は 1000、2000の後は 3000、3000の後は 6000。この「外で初期化、中で更新」というパターンが、第4週で最も重要なパターンです。カウント、平均、最高値、そして後のキャリアでのpandasの集計も、みんなこう動きます。",
      examples: [
        {
          label: "両方",
          cmd: "volumes = [1000, 2000, 3000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "6000",
          note: "ループの前に初期化。ループの中で更新。両方が大事。",
        },
      ],
    },
    {
      heading: "5. while：真である限り",
      body: "while condition: は条件が True である限りブロックを繰り返します。正しい while は必ず3つの部品を持ちます：前に何かをセット（カウンタ）、条件、ブロックの中でカウンタを動かすもの（i += 1）。3つ目を忘れるとループは決して終わりません — 有名な無限ループ。実生活では Ctrl+C で止めます；このシミュレーターでは番犬が10000回転後に親切な注意で止めてくれます。while はいつ？繰り返し回数が分からないとき — 「ユーザーが数を打つまで尋ね続ける」。回数が分かるなら for。",
      examples: [
        {
          label: "両方",
          cmd: "i = 1\nwhile i <= 3:\n    print(f\"day {i}\")\n    i += 1",
          output: "day 1\nday 2\nday 3",
          note: "前にセット、テスト、中で動かす — 3つとも在る。i += 1 を消すと終わらない。",
        },
      ],
    },
    {
      heading: "6. def：自分の道具を作る",
      body: "関数は名前付きのミニプログラムです：def total(values): は values というものを受け取り、インデントされたブロックを実行し、return で結果を返す total という道具を定義します。定義だけでは何も起きません — レシピです。魔法は呼び出しで起きます：total(volumes) があなたのリストでレシピを実行します。関数名は変数と同じ規則：小文字＋アンダースコア。パラメータは材料 — 1〜2個が健康な目安です。",
      examples: [
        {
          label: "両方",
          cmd: "def total(values):\n    \"sum of a list, the long honest way\"\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nvolumes = [1000, 2000, 3000]\nprint(total(volumes))",
          output: "6000",
          note: "def はレシピ；最後の行が調理。呼び出されるまで何も起きない。",
        },
      ],
    },
    {
      heading: "7. return と print：初心者を食べる混乱",
      body: "print は人間に何かを見せる。return は「プログラム」に値を返す — 残りのコードがそれを使えるように。別の道具、別の仕事 — 混ぜたときの兆候が決まっています：return を忘れた関数を print すると None（Pythonの「何もない」）と表示されます。出力に best day: None と出たら、best_day() は return でなく print しています。経験則：関数は return；メインプログラムが print。print だけの関数は行き止まり — 誰もその結果を使えない。",
      examples: [
        {
          label: "決定的な None",
          cmd: "def best_day(values):\n    print(7)\n\nprint(f\"best day: {best_day([1, 2])}\")",
          output: "7\nbest day: None",
          note: "7 を（人間に）表示し、None を（プログラムに）返した。print を return に変えると1行になる。",
        },
      ],
    },
    {
      heading: "8. 関数が関数を呼ぶ：大きい問題を小さく",
      body: "average() はリストを足し直しません：total() を呼んで len() で割ります。これがプログラミングの技法の核心：大きい問題を小さい問題に分けて組み合わせる。各関数は1つの仕事をし、明確な名前を持ち、呼び出してテストする。おまけにバグも小さくなる — 平均が間違っていたら「total() が違うのか、割り算が違うのか」と問える。関数が関数を呼ぶ関数を呼ぶ — 本物のプログラムはこの塔です。",
      examples: [
        {
          label: "両方",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\ndef average(values):\n    return total(values) / len(values)\n\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nprint(average(volumes))",
          output: "4000",
          note: "total が在るから average は3行。複製でなく合成。",
        },
      ],
    },
    {
      heading: "9. プロのようにエラーを読む",
      body: "このシミュレーターのエラーは名前と行番号を示します：その行へ行き、声に出して読む。実Pythonのトレースバックは長い：最終行がエラー名、その上の行が経路（どの関数が走っていたか）を示します。規律は同じ：最終行を最初に読み、次に行番号を探す。第4週の定番：まだ定義していない（またはスペルミスの）関数の NameError；'takes exactly 1 argument (0 given)' の TypeError — 材料の数が合わない呼び出し；def/for/while のコロン忘れの SyntaxError；そして無限ループの凍結 — エラーですらなく、プログラムがただ…永遠に。",
      examples: [
        {
          label: "引数の個数エラー",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nprint(total())",
          output: "TypeError: total() takes exactly 1 argument (0 given)",
          note: "メッセージが正確に何が悪いかを言っている。コードに触れる前に読む。",
        },
      ],
    },
    {
      heading: "10. 週全体を1枚の絵で",
      body: "第4週のプロジェクトは日次レポート：7つの volumes のリスト、それを歩くループ、そして質問に答える小さな関数 — total・average・best_day — を1つの report() が束ねて要約を表示します。シミュレーターのミッションはまさにこれを1ピースずつ作ります。全ミッションが通ったとき、あなたは本物の第4週のプロジェクトを書いたことになります — 第8週でpandasと本物のデータに再利用するのと同じ構造です。",
      examples: [
        {
          label: "最終形",
          cmd: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nreport(volumes)\n\ndef report(values):\n    print(f\"total: {total(values)}\")\n    print(f\"average: {average(values)}\")\n    print(f\"best day: {best_day(values)}\")",
          output: "total: 28000\naverage: 4000\nbest day: 7",
          note: "1つのリスト。小さな関数。1つのレポート。それが本物のデータプログラム。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "ループと関数 — クイックリファレンス",
    rows: [
      { action: "項目ごとに1回", command: "for v in volumes:" },
      { action: "1..7を数える", command: "for i in range(1, 8):" },
      { action: "位置と値", command: "for i in range(len(values)):" },
      { action: "走る合計", command: "result = 0 ... result += v" },
      { action: "while（3部品）", command: "i = 1 / while i <= 7: / i += 1" },
      { action: "道具を定義", command: "def total(values):" },
      { action: "結果を返す", command: "return result" },
      { action: "道具を使う", command: "total(volumes)" },
      { action: "合成", command: "return total(values) / len(values)" },
      { action: "リストに追加", command: "items.append(3)" },
    ],
  },
  missions: [
    {
      id: "l1",
      prompt: "データを作る：volumes というリストに、ちょうど 1000, 2000, 3000, 4000, 5000, 6000, 7000 の7つの値を。",
      hint: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]",
    },
    {
      id: "l2",
      prompt: "リストを歩く：各値を1行に1つずつ表示する for ループ。",
      hint: "for v in volumes: それから4スペースと print(v)",
    },
    {
      id: "l3",
      prompt: "関数 total(values) を書く — リストをループで足し（ズルの sum() は第8週のご褒美）、結果を return。print(total(volumes)) — 28000。",
      hint: "ループの前に result = 0、中で result += v、最後に return result。print(total(volumes))",
    },
    {
      id: "l4",
      prompt: "average(values) を書く — でもリストを足し直さない：total() を中で呼ぶ。print(average(volumes)) — 4000。",
      hint: "def average(values): return total(values) / len(values)",
    },
    {
      id: "l5",
      prompt: "最高値の日番号（1〜7）を返す best_day(values) を書き、print(f\"best day: {best_day(volumes)}\")。",
      hint: "for i in range(len(values)): — if values[i] > best: 値と日（i + 1）を両方覚える。日を return。",
    },
    {
      id: "l6",
      prompt: "数えられる証明：day 1 から day 7 まで表示する while ループ（リストではなくカウンタで）。",
      hint: "i = 1 / while i <= 7: print(f\"day {i}\") / i += 1 — 3部品ぜんぶ。",
    },
    {
      id: "l7",
      prompt: "第3週の関数を正しく：yen_to_usd(amount) — rate 150 で \"200.00 USD\" のような f-string を return し、print(yen_to_usd(30000))。",
      hint: "def yen_to_usd(amount): rate = 150.0 / return f\"{amount / rate:.2f} USD\" — 中で print でなく return。",
    },
    {
      id: "l8",
      prompt: "フィナーレ：report(values) が total・average・best_day を使って要約を表示 — \"total: 28000\"、\"average: 4000\"、\"best day: 7\"。自分の volumes で呼ぶ。",
      hint: "def report(values): f-string の print 3つ、それぞれ1つの関数を呼ぶ。そして report(volumes)。",
    },
  ],
  quiz: [
    {
      q: "for v in volumes: は何をしますか？",
      options: [
        "リスト全体を1回でブロックに渡す",
        "項目ごとに1回、v を現在の項目としてブロックを実行する",
        "1からリストの長さまで数える",
        "ユーザーが値を打つのを待つ",
      ],
      answer: 1,
      why: "「リストの各値を v と呼び、ブロックを実行」。項目ごとに1回、前から後ろへ。",
    },
    {
      q: "range(1, 8) はどの数を作りますか？",
      options: ["1から8", "1から7", "0から8", "0から7"],
      answer: 1,
      why: "1から始まり、8の手前で止まる：1〜7。スライスと同じ「終端は含まれない」規則。",
    },
    {
      q: "アキュムレータパターンで result = 0 はどこに置く？",
      options: ["ループの中", "ループが始まる前", "ループの後", "どこでもいい"],
      answer: 1,
      why: "前に初期化、中で更新。中で初期化すると毎ターンゼロに戻り、合計は育たない。",
    },
    {
      q: "while ループが止まらない。最も可能性が高い原因は？",
      options: [
        "while が Python で壊れている",
        "ブロックの中に条件を動かすもの（i += 1 など）がない",
        "コロンが無い",
        "カウンタが0から始まった",
      ],
      answer: 1,
      why: "while の3部品：前にセット、テスト、中で動かす。実生活では Ctrl+C；シミュレーターでは番犬が注意で止める。",
    },
    {
      q: "def total(values): だけを実行すると何が起きますか？",
      options: [
        "関数がすぐ実行される",
        "結果が表示される",
        "レシピを定義するだけ — total(...) を呼ぶまで何も動かない",
        "total という変数ができる",
      ],
      answer: 2,
      why: "def はレシピ、呼び出しが調理。定義だけでは何も出力されない — それが普通。",
    },
    {
      q: "return と print の違いは？",
      options: [
        "無い、同義語",
        "print は人間に見せ、return はプログラムに値を返して使わせる",
        "return は人間に見せ、print は値を返す",
        "print は関数の中でしか使えない",
      ],
      answer: 1,
      why: "関数は return；メインプログラムが print。print だけの関数は行き止まり。",
    },
    {
      q: "print(f\"best day: {best_day(volumes)}\") が 'best day: None'。なぜ？",
      options: [
        "f-string に関数は入れられないから",
        "best_day が return を忘れて print した — 何も返ってこなかった（None）",
        "None が正しい答えだから",
        "f-string の f が無いから",
      ],
      answer: 1,
      why: "決定的な None：関数が答えを人間に見せるだけでプログラムに返さなかった。print を return に変える。",
    },
    {
      q: "average() を return total(values) / len(values) と書く理由は？",
      options: [
        "速く動くから",
        "合成が複製に勝つ — 小さな関数、1つ1つの仕事、どこでも再利用",
        "Python がそう要求するから",
        "他の方法では動かないから",
      ],
      answer: 1,
      why: "大きい問題を小さい問題に分けて組み合わせる。おまけにバグも小さくなる。",
    },
    {
      q: "'total() takes exactly 1 argument (0 given)' — 何が起きた？",
      options: [
        "total が壊れている",
        "total() を材料なしで呼んだ — メッセージが正確に何が悪いか言っている",
        "関数に2つのリストが必要",
        "Python が引数を1つに制限している",
      ],
      answer: 1,
      why: "引数の個数が合わない TypeError。メッセージを読む — それは贈り物。",
    },
    {
      q: "for でなく while を選ぶときは？",
      options: [
        "絶対無い — for の方が常に良い",
        "繰り返し回数が正確に分かるとき",
        "回数が分からないとき — 「何かが起きるまで」",
        "リストを扱うとき",
      ],
      answer: 2,
      why: "回数が分かる → for。回数不明、「ユーザーが数を打つまで」→ while。実コードの90%は for。",
    },
    {
      q: "def の本体1行目の単独の文字列は何？",
      options: [
        "バグ — Python はエラーを出す",
        "docstring — 関数が何をするかの人間向けの説明",
        "呼び出されたときに表示される",
        "関数名を変える",
      ],
      answer: 1,
      why: "docstring はレシピの説明書き — 未来の自分と、それを読む道具のため。",
    },
    {
      q: "items = [1, 2] のとき items.append(3) は何をする？",
      options: [
        "items に触れず新しいリスト [1, 2, 3] を返す",
        "items 自身の末尾に 3 を追加し、None を返す",
        "先頭に 3 を追加する",
        "リストを表示する",
      ],
      answer: 1,
      why: "append はその場でリストを変える（新しい文字列を返す string メソッドと違う）。None を返す — print(items) で確認。",
    },
  ],
  outro:
    "8つのミッションが通ったとき、あなたは本物の第4週のプロジェクトを書いています — 週次計画が求めるのと同じプログラムを、1行ずつテストしながら。ヒントなしで空のエディタからもう一度やってください：for・while・def・return が考えるより先に指から出てきたら、第5週の権利が得られた証拠です — プログラムが実行の間も覚えていられるようになる：ファイル、リストの深掘り、expense-tracker プロジェクト。",
}

