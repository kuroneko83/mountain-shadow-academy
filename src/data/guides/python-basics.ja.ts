import type { Guide } from "../types";

export const guidePythonJa: Guide = {
  slug: "python-basics",
  title: "Python I：値、テキスト、判断 — ゆっくりと",
  intro:
    "このガイドは第3週に対応します。これは今後書くすべてのプログラムの原子です：値を保存し、テキストを整え、判断を下す。ここで急がないで — 基礎が甘いと後で数週間を失います。シミュレーターを開いたままレッスンを読んでください：プログラムを書き、実行し、わざと壊し、エラーを読む。それからクイズへ。",
  week: "03-python-basics-1",
  sections: [
    {
      heading: "1. プログラムとは実際何か",
      body: "プログラムとは、コンピューターが上から下へ1行ずつ実行する指示のリストです。コンピューターは非常に速く、非常に文字通りです：書いた通りに動き、意図した通りには動きません。Pythonはほとんど英語のように読めるよう設計されています — だから世界で一番よく使われる最初の言語です。このページのシミュレーターでは、プログラムは1行ずつ動きます：print() は表示、= は記憶、if は決定。",
      examples: [
        {
          label: "両方",
          cmd: "print(\"hello\")\nprint(\"goodbye\")",
          output: "hello\ngoodbye",
          note: "上から下へ。いつでも。",
        },
      ],
    },
    {
      heading: "2. 変数：ラベルであって方程式ではない",
      body: "変数は、後で使えるように値に付けるラベルです。= は数学の等号ではなく、指示です：「右辺を計算し、この名前で保存せよ」。代入は右から左へ読みます。名前の付け方：小文字＋アンダースコア（usd、learning_log）— 説明的な名前はコストゼロで永久に利益を払います。変数は代入した後にしか存在しません：その前に使うと古典的な NameError です。",
      examples: [
        {
          label: "両方",
          cmd: "rate = 150.0\nyen = 30000\nusd = yen / rate\nprint(usd)",
          output: "200",
          note: "右辺が先、それから名前。rate、yen、usd — x1、x2 ではなく単語を。",
        },
        {
          label: "古典的な NameError",
          cmd: "print(rtae)",
          output: "NameError: name 'rtae' is not defined",
          note: "スペルミス — コンピューターは意図ではなく、書いた通りに動きます。",
        },
      ],
    },
    {
      heading: "3. 数値：int、float、そして演算子",
      body: "Pythonには2つの数値型があります：int（30000、整数）と float（150.0、小数点付き）。小数点があるだけでfloatになります。算術：+ - * と括弧は数学どおり。誰もが驚く3つの演算子：/ は常にfloat除算（7 / 2 は 3.5、整数同士でも）、// は切り捨て除算（7 // 2 は 3）、% は余り（7 % 2 は 1 — 奇数偶数判定に使います）。** はべき乗：2 ** 10 は 1024。ゼロ除算はエラー — クラッシュではなく、ZeroDivisionError という丁寧なエラーです。",
      examples: [
        {
          label: "両方",
          cmd: "print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 10)",
          output: "3.5\n3\n1\n1024",
        },
        {
          label: "お金のケース",
          cmd: "yen = 30500\nrate = 150.0\nprint(yen / rate)",
          output: "203.33333333333334",
          note: "floatは小数をたくさん持ちます — それが普通。f-string（次節）が人間向けに整えます。",
        },
      ],
    },
    {
      heading: "4. 文字列：書いた通りのテキスト",
      body: "文字列はシングルまたはダブルクォートの間のテキストです — 意味は同じ、どちらか選んで統一しましょう。+ で連結（接着）し、* で反復（\"ab\" * 3 は \"ababab\"）。全員が踏む罠：\"テキスト\" + 数値 は TypeError — 計算か接着か、コンピューターは当ててくれません。直し方は変換（str(数値)）か、もっと良い f-string — 次の節。",
      examples: [
        {
          label: "両方",
          cmd: "print(\"30000\" + \" JPY\")",
          output: "30000 JPY",
          note: "両辺が文字列なら：+ は接着。",
        },
        {
          label: "全員が出会う TypeError",
          cmd: "print(\"yen: \" + 30000)",
          output: "TypeError: can only concatenate str (not \"int\") to str",
          note: "当てることを拒否します。変換するか、f-string を。",
        },
      ],
    },
    {
      heading: "5. f-string：恋に落ちるべき唯一の機能",
      body: "クォートの前に f を置くと、{ } がプログラムへの窓になります：f\"{yen} JPY = {usd} USD\" が現在の値を埋め込みます。波括弧の中にはどんな式でも書けます — f\"{yen / rate}\"。そしてお金の技：:.2f のようなフォーマット指定子が小数をちょうど2桁に固定します：f\"{usd:.2f}\" は 200.0 を 200.00 にします。データレポートとお金で、キャリアの毎日使うことになります。このガイド全体で一番役に立つものです。",
      examples: [
        {
          label: "両方",
          cmd: "yen = 30000\nrate = 150.0\nusd = yen / rate\nprint(f\"{yen} JPY = {usd:.2f} USD\")",
          output: "30000 JPY = 200.00 USD",
        },
        {
          label: "波括弧の中に式も書ける",
          cmd: "print(f\"{30000 / 150} dollars\")",
          output: "200 dollars",
        },
      ],
    },
    {
      heading: "6. 文字列メソッド：新しいテキストを返す道具",
      body: "文字列には道具が付属しています：.strip() は両端の空白を除去、.lower() と .upper() は大文字小文字の変換、.title() は各単語を先頭大文字に、.replace(a, b) はテキストを置換。括弧を付けて呼びます：name.strip()。連結もできます：name.strip().lower()。1つの重要な事実：文字列は不変です — メソッドは元を変えず、新しい文字列を返します。結果を使わなければ、何も起きていません。",
      examples: [
        {
          label: "両方",
          cmd: "name = \"  Mountain Shadow  \"\nprint(name.strip())\nprint(name.strip().lower())",
          output: "Mountain Shadow\nmountain shadow",
          note: "name 自体は不変 — メソッドは新しい文字列を返します。",
        },
      ],
    },
    {
      heading: "7. 数えて切る：len() とスライス",
      body: "len() は文字数を数えます：len(\"hello\") は 5。文字列はシーケンスで、すべての文字に位置があります — 1 ではなく ZERO から始まります。s[0] は最初の文字、s[-1] は最後（末尾から数える — とても便利）。スライスは一部を切り取ります：s[0:8] は位置 0 から 7 まで（終端を含まない）。1日は奇妙に感じ、その後第二の天性になります。1文字足りないときは終端インデックスを見る — オフバイワンは初心者の古典的なバグです。",
      examples: [
        {
          label: "両方",
          cmd: "s = \"Mountain Shadow\"\nprint(s[0])\nprint(s[-1])\nprint(s[0:8])\nprint(len(s))",
          output: "M\nn\nMountain\n15",
          note: "s[0:8] ＝ 位置 0..7。終端は含まない。いつでも。",
        },
      ],
    },
    {
      heading: "8. 比較とブール：True、False",
      body: "== は「等しいか？」と尋ねて True か False で答えます。罠中の罠：= は代入、== は比較 — 条件の中に = を書くと SyntaxError になり、Pythonがあなたを守ってくれます。他の比較：!=（等しくない）、< <= > >=。ブール値は and、or、not で組み合わせます。Pythonの真偽ルール：0、\"\"、False は偽；それ以外ほぼすべては真。",
      examples: [
        {
          label: "両方",
          cmd: "yen = 30000\nprint(yen == 30000)\nprint(yen > 10000 and yen < 100000)",
          output: "True\nTrue",
        },
        {
          label: "= vs == の罠",
          cmd: "if yen = 30000:\n    print(\"ok\")",
          output: "SyntaxError: invalid syntax",
          note: "= は代入、== は比較。Pythonは間違った方を拒否します — わざと。",
        },
      ],
    },
    {
      heading: "9. if / elif / else：プログラムが決める",
      body: "if は条件が True のときだけブロックを実行します。構造は3つの部品で成り立ちます：if という単語、条件、コロン — そして4スペース字下げのブロック。コロンとインデントこそが文法です：コロンを忘れれば SyntaxError、インデントを忘れれば IndentationError。elif は別の条件を追加（「else if」）、else は受け皿。チェーン全体からちょうど1つの枝が実行されます — 2つにも0にもなりません。",
      examples: [
        {
          label: "両方",
          cmd: "yen = 30000\nif yen > 10000:\n    print(\"big\")\nelif yen > 0:\n    print(\"ok\")\nelse:\n    print(\"invalid: negative amount\")",
          output: "big",
          note: "3つのうち1つが実行。インデントが、どこまでがブロックかを Python に教えます。",
        },
      ],
    },
    {
      heading: "10. 型の変換：インタプリタの正直さ",
      body: "int(\"30000\") はテキストを数に、float(\"150.5\") はfloatに、str(200) は数をテキストに変えます。なぜ？ファイル、インターネット、input() から来るデータは常にテキストとして届くから — 変換はあなたの仕事です。そして変換は正直です：int(\"hello\") は ValueError（'invalid literal'）、hello は数ではないからです。パターンを掴みましょう：TypeError は操作に対して間違った「型」、ValueError は正しい型だが内容が不可能。",
      examples: [
        {
          label: "両方",
          cmd: "text = \"30000\"\nprint(text + \" JPY\")\nprint(int(text) + 1)",
          output: "30000 JPY\n30001",
          note: "同じ値、違う型、違う振る舞い。",
        },
        {
          label: "正直な拒否",
          cmd: "print(int(\"hello\"))",
          output: "ValueError: invalid literal for int() with base 10: 'hello'",
        },
      ],
    },
    {
      heading: "11. うまくいかないとき — まずエラーを読む",
      body: "伸びる学習者と苦労する学習者を分ける規律：何かを打つ前に、エラーの最終行を声に出して読む。NameError: name 'x' is not defined — 代入前に使った、またはスペルミス。TypeError: can only concatenate str — 文字列と数を混ぜた：変換かf-string。SyntaxError: invalid syntax — たいていコロンかクォートの欠落；エラーは問題の箇所か直前を指します。IndentationError: unexpected indent — 行が揃っていない；すべてのブロックレベルをちょうど4スペースに。ZeroDivisionError — 数学が拒否しました。シミュレーターではエラーに行番号が付きます：その行に行き、声に出して読む。",
      examples: [
        {
          label: "シミュレーターでは行番号付き",
          cmd: "rate = 150.0\nprint(rtae)",
          output: "NameError: name 'rtae' is not defined (line 2)",
          note: "2行目。その行を声に出して、1文字ずつ読む。原因はいつも小さいものです。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "第3週の道具箱 — クイックリファレンス",
    rows: [
      { action: "値を保存", command: "rate = 150.0" },
      { action: "表示", command: "print(f\"{usd:.2f} USD\")" },
      { action: "float除算", command: "yen / rate" },
      { action: "切り捨て / 余り", command: "7 // 2, 7 % 2" },
      { action: "文字列の接着", command: "f\"{a} and {b}\"" },
      { action: "小数2桁のお金", command: "f\"{usd:.2f}\"" },
      { action: "テキストの清掃", command: "name.strip().lower()" },
      { action: "文字数", command: "len(name)" },
      { action: "スライス", command: "s[0:8]" },
      { action: "比較", command: "yen == 30000, yen > 0" },
      { action: "判断", command: "if / elif / else" },
      { action: "型変換", command: "int(\"30000\"), str(200)" },
    ],
  },
  missions: [
    {
      id: "p1",
      prompt: "コンバーターを始める：USD/JPYレート 150.0 の変数 rate を作って表示してください。",
      hint: "rate = 150.0、それから print(rate)",
    },
    {
      id: "p2",
      prompt: "変換する金額 — 変数 yen に 30000 を入れてください。",
      hint: "yen = 30000 — 古い行は消さずに行を追加します。プログラムは育ちます。",
    },
    {
      id: "p3",
      prompt: "usd を計算してください — yen を rate で割る。",
      hint: "usd = yen / rate",
    },
    {
      id: "p4",
      prompt: "f-string で本物の文章を1行で表示：yen の金額と usd の結果。",
      hint: "print(f\"{yen} JPY = {usd} USD\")",
    },
    {
      id: "p5",
      prompt: "お金は小数2桁 — :.2f フォーマット指定子でもう一度表示してください。",
      hint: "print(f\"{yen} JPY = {usd:.2f} USD\") — .00 に注目",
    },
    {
      id: "p6",
      prompt: "判断を追加：yen が 10000 より多ければ big、そうでなければ small を表示（yen は 30000 のまま）。",
      hint: "if yen > 10000: それから4スペースのインデント。コロンを忘れずに。",
    },
    {
      id: "p7",
      prompt: "悪い入力への対応：yen を -500 にして、マイナス金額の代わりに丁寧なエラーメッセージを表示してください。",
      hint: "最初の if の後に yen を変える：yen = -500、そして新しい if/else — if yen < 0: print(\"invalid: negative amount\")。usd の表示はそのままで構いません。",
    },
    {
      id: "p8",
      prompt: "テキスト道具：name = \"  Mountain Shadow  \"（余分な空白付き）を作り、清掃して小文字にして1回の print で表示 — メソッド2つ。",
      hint: "print(name.strip().lower()) — メソッドは新しい文字列を返す。連結もそのまま動く。",
    },
  ],
  quiz: [
    {
      q: "変数とは実際何ですか？",
      options: [
        "解くべき数学の方程式",
        "後で使えるように値に付けたラベル",
        "数しか入れられない箱",
        "Pythonの予約語",
      ],
      answer: 1,
      why: "= は右辺の値を左の名前で保存します。指示であって数学の等号ではありません。",
    },
    {
      q: "rate = 150.0 は正確には何をしますか？",
      options: [
        "rate と 150.0 を比較する",
        "150.0 を計算し、rate という名前で保存する",
        "rate が永遠に 150.0 だと宣言する",
        "rate を表示する",
      ],
      answer: 1,
      why: "代入は右から左へ：右辺を計算し、左の名前の下に保存。",
    },
    {
      q: "Python 3 で 7 / 2 は？",
      options: ["3", "3.5", "4", "エラー — 奇数は割れない"],
      answer: 1,
      why: "/ は常にfloat除算：3.5。// は切り捨て：3。1文字違いの別の道具です。",
    },
    {
      q: "print(\"yen: \" + 30000) が TypeError。なぜ？",
      options: [
        "print は引数1つしか取れない",
        "30000 は大きすぎる数",
        "文字列と数は接着できない — コンピューターは当てたくない",
        "クォートが間違っている",
      ],
      answer: 2,
      why: 'TypeError: can only concatenate str (not "int") to str。str(30000) で変換するか f-string を使いましょう。',
    },
    {
      q: "yen が 30000 のとき、print(f\"{yen} JPY\") は何を表示？",
      options: ["{yen} JPY", "30000 JPY", "yen JPY", "エラー"],
      answer: 1,
      why: "f が { } を窓に変えます：yen の現在の値がテキストに埋め込まれます。",
    },
    {
      q: "= と == の違いは？",
      options: [
        "同じものの別名",
        "= は代入、== は2つの値を比較",
        "= は比較、== は代入",
        "== はループでしか使わない",
      ],
      answer: 1,
      why: "= は保存。== は「等しいか？」と尋ねて True/False を返す。Pythonは条件内の = を拒否して守ってくれます。",
    },
    {
      q: "if 文で、文法そのものである2つのものは？",
      options: [
        "波括弧とセミコロン",
        "行末のコロンとブロックのインデント",
        "条件を囲む括弧",
        "'then' という単語とカンマ",
      ],
      answer: 1,
      why: "if 条件: — コロン、そして4スペース字下げのブロック。どちらかを忘れると SyntaxError か IndentationError です。",
    },
    {
      q: "name = \"hi\" の後、name.upper() は name に何をしますか？",
      options: [
        "name を HI に変える",
        "何もしない — 文字列は不変。メソッドは新しい文字列を返す",
        "name を削除する",
        "print の中だけで大文字にする",
      ],
      answer: 1,
      why: "name.upper() は 'HI' を返します — 結果を使わなければ何も起きていません。残すなら name = name.upper()。",
    },
    {
      q: "int(\"hello\") は何になりますか？",
      options: ["0", "None", "ValueError — 'hello' は整数になれない", "文字列 'hello'"],
      answer: 2,
      why: "変換は正直です：型は正しい（str）、内容が不可能。理由まで教えてくれる ValueError です。",
    },
    {
      q: "エラーなしに間違った結果が出る。最初の一手は？",
      options: [
        "すべて最初から書き直す",
        "間違った行の直前に変数の print を足して、値を読む",
        "パソコンを再起動する",
        "プログラムを消す",
      ],
      answer: 1,
      why: "print デバッグ — 世界で最も古く最も正直な技法：各ステップで値が実際に何かを見る。第4週でこれを関数にまとめます。",
    },
    {
      q: "s = \"Mountain\" のとき、s[-1] は？",
      options: ["M", "n", "文字列全体", "IndexError"],
      answer: 1,
      why: "負のインデックスは末尾から数えます：-1 が最後の文字、-2 が後ろから2番目。とても便利。",
    },
    {
      q: "if/elif/else のチェーンで実行される枝はいくつ？",
      options: ["真であるものすべて", "ちょうど1つ — 最初に真になったもの", "最大2つ", "0個"],
      answer: 1,
      why: "Python は上から確認し、最初に真になった枝だけ実行し、残り（else を含む）を飛ばします。",
    },
  ],
  outro:
    "ミッションが簡単に感じられたなら、それが正解です — ゆっくり行く意味はそこにあります：この原子たち（値、テキスト、判断）は、書くすべてのプログラムの80%です。NameError と TypeError が「どこを見ればいいか教えてくれる知り合い」に感じられるまで、シミュレーターで練習を続けてください。来週はループと関数 — 仕事の繰り返しとロジックの梱包。同じ場所、同じペースで。",
};
