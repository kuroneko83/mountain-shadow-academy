import type { Guide } from "../types";

export const guideDataJa: Guide = {
  slug: "data-files",
  title: "データ構造とファイル：プログラムに覚えさせる",
  intro:
    "このガイドは第5週に対応します。これまで、プログラムは終わった瞬間にすべてを忘れていました。今週はそれを2つの方法で直します：構造（リスト、dict）は1回の実行の中でデータを保持し、ファイルは実行と実行の間でデータを生かし続けます。下のシミュレーターでは、ファイルはRunボタンを押すたびに本当に残ります — 本物のディスクのように。expense-tracker を作ってください：リスト、dict、ファイル、そして合計を出す関数。",
  week: "05-structures-files",
  sections: [
    {
      heading: "1. プログラムは忘れる — 2つの薬",
      body: "すべての変数はプログラムが終わると死にます。2つの薬が、2つの別々の問題に効きます：1回の実行の中では、構造がデータを整理して保持します（支出のリスト、1件の支出のdict）。実行と実行の間は、ファイルがデータをディスク上に生かします。expense-tracker プロジェクトは両方を使います：作業中はリスト、明日も昨日の支出が在るようにファイル。これは世界のあらゆるデータシステムが使う正確な分担です — 今はメモリ、後のためにストレージ。",
      examples: [
        {
          label: "2つの寿命",
          cmd: "expenses = []\nexpenses.append(\"coffee,500\")\n# ...run が終わると死ぬ\n\nwith open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\")\n# ...run が終わっても生き残る",
          note: "リストは死ぬ。ファイルは生き残る。このシミュレーターで：Run を2回押して確認。",
        },
      ],
    },
    {
      heading: "2. リスト深掘り — そして突然変異の驚き",
      body: "リストは第4週で出会いました。今週深まるのは3つ。append() はリスト自身を変えて None を返す — 文字列メソッドとは逆（新しい文字列を返して元は変えない）：文字列は不変、リストは可変です。インデックスは0から始まり、末尾からは負で数えられます。そしてリストは要素ごとに書き換えられます：expenses[0] = \"tea,300\" は1要素を置き換えます。この可変性こそ、リストがデータ作業の主力である理由です。",
      examples: [
        {
          label: "両方",
          cmd: "expenses = [\"coffee,500\", \"train,2000\"]\nexpenses.append(\"lunch,900\")\nexpenses[0] = \"tea,300\"\nprint(expenses)",
          output: "['tea,300', 'train,2000', 'lunch,900']",
          note: "append は None を返す（print して確かめて）— 変化はリストの中に在る。",
        },
      ],
    },
    {
      heading: "3. in と not in：在るかどうか尋ねる",
      body: "\"coffee\" in expenses は True か False で答えます — リストに在る？ 'ff' in \"coffee\" は部分文字列を尋ねます。\"item\" in expense_dict は「そのキーがdictに在る？」と尋ねます。not in は反転。この小さな演算子がループの丸ごと1カテゴリーを消します：探すためにループを回す代わりに、1行で尋ねる。「コレクションに無ければ追加する」というパターンで毎日使うことになります。",
      examples: [
        {
          label: "両方",
          cmd: "print(\"coffee\" in [\"coffee\", \"train\"])\nprint(\"ff\" in \"coffee\")\nprint(\"tea\" not in [\"coffee\", \"train\"])",
          output: "True\nTrue\nTrue",
        },
      ],
    },
    {
      heading: "4. dict：位置でなくラベル",
      body: "リストは「位置2には何が？」に答えます。dictは「amountはいくら？」に答えます。波括弧と key: value の組：expense = {\"item\": \"coffee\", \"amount\": 500}。キーでアクセス：expense[\"amount\"] は 500。キーが無いのが定番の罠：expense[\"date\"] は KeyError — Pythonは値を捏造せず、大声で拒否します。キーへの代入は、新しいキーなら追加します：expense[\"date\"] = \"2026-10-15\"。dictは順序を保ち（挿入順）、何でも保持できます — 文字列、数、リスト、別のdict。",
      examples: [
        {
          label: "両方",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense[\"amount\"])\nexpense[\"date\"] = \"2026-10-15\"\nprint(expense)",
          output: "500\n{'item': 'coffee', 'amount': 500, 'date': '2026-10-15'}",
          note: "キーで読み、キーに代入して追加。順序は挿入順。",
        },
        {
          label: "KeyError",
          cmd: "expense = {\"item\": \"coffee\"}\nprint(expense[\"date\"])",
          output: "KeyError: 'date'",
          note: "キー無しエラー — 大声で、正確に。わざとです。",
        },
      ],
    },
    {
      heading: "5. 丁寧な代替：.get() と dict を歩く",
      body: "expense.get(\"date\") は爆発せず None を返します；.get(\"date\", \"unknown\") はデフォルトを返します。ループ：for k in expense はキーを歩きます。for v in expense.values() は値を；expense.items() は（キー、値）の組 — ここでは単純に保ちます。経験則：キーが在るべきで、無いのがバグなら [] （大声のKeyError）；無いのが普通の暮らしなら .get（静かなデフォルト）。",
      examples: [
        {
          label: "両方",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense.get(\"date\"))\nprint(expense.get(\"date\", \"no date\"))\nfor k in expense:\n    print(k)",
          output: "None\nno date\nitem\namount",
          note: "[] はキー無しに大声、.get は丁寧。習慣でなく意味で選ぶ。",
        },
      ],
    },
    {
      heading: "6. tuple：変われないリスト",
      body: "tupleはロックされたリストです：(\"2026-10-15\", \"coffee\", 500)。角括弧でなく丸括弧、そして append も要素の代入も無い — 試すと Python は「tuple は要素の代入をサポートしない」と言います。なぜロックが欲しい？不変性は約束だから：足元で勝手に変わらない。tupleは固定されたレコードの自然な形です — 日付・項目・金額の3つ組は一緒に生まれ、一緒に留まる。このシミュレーターではリストとdictを使います；tupleは実プロジェクトで本物に出会います。",
      examples: [
        {
          label: "両方",
          cmd: "expense = (\"2026-10-15\", \"coffee\", 500)\nprint(expense[0])\nprint(expense[2])",
          output: "2026-10-15\n500",
          note: "位置で読める — でも書けない。生まれた時にロックされる。",
        },
      ],
    },
    {
      heading: "7. ファイル：open、with、3つのモード",
      body: "open(\"expenses.txt\", \"w\") はファイルを開きます：モード \"w\" は書き込み（そして既存の中身を消す — 注意）、\"a\" は末尾に追加、\"r\" は読み込み（ファイルが無ければ大声で失敗：FileNotFoundError）。プロの形は with open(...) as f: — with は、中でエラーが起きても、ブロックが終わればファイルが閉じられることを保証します。ブロックの中で：f.write(text) が書き、f.read() が全部を1つの文字列として読み、f.readlines() が行のリストをくれます。",
      examples: [
        {
          label: "両方 — 書き込み",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")\n    f.write(\"train,2000\\n\")",
          note: "書き込みモードは先にファイルを消す。追記モード（\"a\"）は末尾に足す。",
        },
        {
          label: "両方 — 読み込み",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    content = f.read()\nprint(content)",
          output: "coffee,500\ntrain,2000\n",
        },
      ],
    },
    {
      heading: "8. CSVの考え方：表を意味するテキスト",
      body: "CSVファイルは、1行が1レコードでカンマが列を分けるただのテキストです — coffee,500 は1件の支出。道具はもう全部知っています：f.write(item + \"\\n\") で行を書き、content.split(\"\\n\") で読み返し、line.split(\",\") で各行を分ける — これで [\"coffee\", \"500\"] が得られます。金額を数に戻すのは：int(\"500\")。これがCSVの考え方の全部；Pythonの本物の csv モジュールは、この分割（とクォート処理）を自動化するだけです — このシミュレーターでは手でやります。後でモジュールが何をしているか理解できるのは、そのためです。リストをテキストに戻すには：\", \".join(items) — split の鏡。",
      examples: [
        {
          label: "両方",
          cmd: "line = \"coffee,500\"\nparts = line.split(\",\")\nprint(parts)\nprint(parts[0])\nprint(int(parts[1]))\nprint(\", \".join([\"a\", \"b\"]))",
          output: "['coffee', '500']\ncoffee\n500\na, b",
          note: "split はテキストをリストに；join はリストをテキストに戻す。",
        },
      ],
    },
    {
      heading: "9. 永続化：Run を2回押す",
      body: "ここがこのシミュレーターの見せ場です：変数は毎回のrun の終わりで死にますが、ファイルは生き残ります。1つのプログラムでファイルを書き、別のプログラムで読むrun を押す — 中身はまだ在ります（シミュレーターはブラウザのストレージに保管します；あなたのマシンではディスクです）。この永続化こそ、ファイルが存在する理由の全部です。リセットボタンは疑似ディスクを消します — 新しいスタートが欲しいときに。",
      examples: [
        {
          label: "Run 1：書く",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")",
          note: "これを実行。それから全体を次の例に置き換えて、もう一度Run。",
        },
        {
          label: "Run 2（別のプログラム！）：読む",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    print(f.read())",
          output: "coffee,500\n",
          note: "変数 expenses はとうに死んでいる — ファイルは覚えている。それがストレージ。",
        },
      ],
    },
    {
      heading: "10. うまくいかないとき — 第5週の定番",
      body: "KeyError: 'date' — dictのキーが無い：キーを追加するか、デフォルト付きの .get を使う。FileNotFoundError — 存在しないファイルを読もうとした：先に書くか、名前を ls で確認。io.UnsupportedOperation: not writable / not readable — 間違ったモードで開いた：'r' は書けない、'w' は読めない。末尾の空行：ファイルは \\n で終わるので、split(\"\\n\") は最後に空文字列を1つ返す — フィルターして（if line != \"\"）、存在しない行を合計しない。そして沈黙の罠：append() は None を返す — それを print してもリストではなく None が出る。",
      examples: [
        {
          label: "末尾の空行",
          cmd: "content = \"coffee,500\\ntrain,2000\\n\"\nprint(content.split(\"\\n\"))",
          output: "['coffee,500', 'train,2000', '']",
          note: "最後の '' が見える？ファイル末尾の改行。数える前にフィルターする。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "構造とファイル — クイックリファレンス",
    rows: [
      { action: "リスト末尾に追加", command: "expenses.append(\"coffee,500\")", result: "None（リスト自身が変わった）" },
      { action: "1要素を置換", command: "expenses[0] = \"tea,300\"", result: "（要素が変わる — 静寂）" },
      { action: "在る？", command: "\"coffee\" in expenses", result: "True / False" },
      { action: "dictを作る", command: "{\"item\": \"coffee\", \"amount\": 500}" },
      { action: "キー読み（大声）", command: "expense[\"amount\"]", result: "500" },
      { action: "キー読み（丁寧）", command: "expense.get(\"date\", \"none\")", result: "None、またはデフォルト値" },
      { action: "キー / 値を歩く", command: "for k in d: / d.values()", result: "item, amount" },
      { action: "ファイルに書く", command: "with open(\"f.txt\", \"w\") as f:", result: "（ファイルが空になる — 静寂）" },
      { action: "ファイルに追記", command: "with open(\"f.txt\", \"a\") as f:", result: "（沈黙＝成功）" },
      { action: "ファイルを読む", command: "with open(\"f.txt\") as f:" },
      { action: "テキスト → リスト", command: "line.split(\",\")", result: "['coffee', '500']" },
      { action: "リスト → テキスト", command: "\", \".join(items)", result: "a, b" },
    ],
  },
  missions: [
    {
      id: "d1",
      prompt: "トラッカー開始：expenses という空のリストを作って表示。",
      hint: "expenses = [] — 空リストリテラル。print(expenses) は [] を表示",
    },
    {
      id: "d2",
      prompt: "最初の支出：文字列 \"coffee,500\" を expenses に append し、リストを表示。",
      hint: "expenses.append(\"coffee,500\") それから print(expenses)。注意：append は None を返す — append でなくリストを print。",
    },
    {
      id: "d3",
      prompt: "さらに2件：\"train,2000\" と \"lunch,900\" を append。リストはちょうど3件に。",
      hint: "expenses.append(\"train,2000\") と expenses.append(\"lunch,900\")",
    },
    {
      id: "d4",
      prompt: "リストを歩く：各支出を1行に1件表示する for ループ。",
      hint: "for e in expenses: print(e) — 第4週のループがそのまま。",
    },
    {
      id: "d5",
      prompt: "1件を正しく構造化：dict expense = {\"item\": \"coffee\", \"amount\": 500} を作り、print(f\"{expense['item']}: {expense['amount']} yen\")。",
      hint: "f-string の波括弧の中では dict アクセスが使える：{expense['item']} — 二重引用符の中に単一引用符。",
    },
    {
      id: "d6",
      prompt: "生き残らせる：3件の支出を expenses.txt に1行ずつ書く（with とループで）。",
      hint: "with open(\"expenses.txt\", \"w\") as f: それから for e in expenses: f.write(e + \"\\n\")",
    },
    {
      id: "d7",
      prompt: "永続化の証明：ファイルを読み返して（f.read()）、行に分割し、各行を表示。これは後のRunでもいい — ファイルは覚えている。",
      hint: "with open(\"expenses.txt\", \"r\") as f: content = f.read() — それから for line in content.split(\"\\n\"): print(line)。末尾の空行はフィルター：if line != \"\"",
    },
    {
      id: "d8",
      prompt: "見せ場：ファイルを読み、各行をカンマで分割し、金額を int() で変換し、print(f\"total: {total}\") — 3400。",
      hint: "for line in content.split(\"\\n\"): if line != \"\": parts = line.split(\",\") そして total += int(parts[1])",
    },
  ],
  quiz: [
    {
      q: "プログラムがrun とrun の間で支出を「忘れる」のはなぜ？",
      options: [
        "Python のバグ",
        "変数はメモリに生き、プログラムが終わると消される — ファイルはストレージに生きるので生き残る",
        "ファイルも消えていて、気づいていないだけ",
        "リストには特別なフラグが必要",
      ],
      answer: 1,
      why: "今はメモリ、後のためにストレージ。この正確な分担があらゆるデータシステムの基礎。",
    },
    {
      q: "append() と .upper() のような文字列メソッドの違いは？",
      options: [
        "無い、どちらもオブジェクトを変える",
        "append() はリスト自身を変えて None を返す；.upper() は何も変えず新しい文字列を返す",
        "append() は新しいリストを返す",
        ".upper() は文字列自身を変える",
      ],
      answer: 1,
      why: "リストは可変、文字列は不変。今週の一番実用的な驚き。",
    },
    {
      q: "expense = {\"item\": \"coffee\"} のとき、expense[\"date\"] は？",
      options: ["None", "空文字列", "KeyError: 'date'", "False"],
      answer: 2,
      why: "[] はキー無しに大声 — Pythonは値を捏造しない。無いのが普通なら .get。",
    },
    {
      q: "キー \"date\" を、無いときに \"no date\" が返るように丁寧に読むには？",
      options: [
        "expense[\"date\", \"no date\"]",
        "expense.get(\"date\", \"no date\")",
        "expense.read(\"date\")",
        "expense.key(\"no date\")",
      ],
      answer: 1,
      why: ".get(キー, デフォルト)：爆発の代わりに静かなデフォルト。バグ→[]、普通→.get。",
    },
    {
      q: "for k in expense: は何を歩く？",
      options: ["値", "（キー、値）の組", "キー", "最初の値の文字"],
      answer: 2,
      why: "dictのループはキーを歩く — 「各フィールドについて」の自然な形。",
    },
    {
      q: "ファイルを開くときの \"w\" と \"a\" の違いは？",
      options: [
        "無い",
        "\"w\" は書き込みで既存の中身を消す；\"a\" は末尾に追加し、既存を保つ",
        "\"a\" は数字の追加専用",
        "\"w\" は新しいファイル専用",
      ],
      answer: 1,
      why: "定番のデータ消失の罠：既存のファイルを \"w\" で開くと昨日のデータは消える。追記は保つ。",
    },
    {
      q: "with open(\"f.txt\") as f: が保証するのは？",
      options: [
        "ファイルが自動で読まれる",
        "ブロックが終わればファイルが閉じられる — 中でエラーが起きても",
        "ファイルが変更できない",
        "ファイルがディスクに書かれる",
      ],
      answer: 1,
      why: "with は約束：何が起きようと、出るときに扉は閉まる。だからプロの形。",
    },
    {
      q: "open(\"expenses.txt\", \"r\") が FileNotFoundError。最も可能性が高い原因は？",
      options: [
        "ファイルは先にOSで作る必要がある",
        "ファイルが存在しない — 書かれていない、または名前のスペルミス",
        "モードが間違っている",
        "このフォルダは読み取り禁止",
      ],
      answer: 1,
      why: "存在しないファイルの読み取りは大声で失敗する（わざと）。一度書くか、名前を確認。",
    },
    {
      q: "line = \"coffee,500\" のとき line.split(\",\") は？",
      options: ["\"coffee 500\"", "[\"coffee\", \"500\"]", "500", "[\"coffee,500\"]"],
      answer: 1,
      why: "split は区切りで切ってテキストをリストに — CSVの考え方が1メソッドに。",
    },
    {
      q: "\"coffee,500\" を分割した後、int(line.split(\",\")[1]) が必要なのはなぜ？",
      options: [
        "split はテキストを返す — \"500\" はまだ文字列で、文字列では計算できない",
        "リストを並べ替えるため",
        "カンマを消すため",
        "必要ない",
      ],
      answer: 0,
      why: "ファイルから来るデータは常にテキスト。変換はあなたの仕事 — 第3週の教訓にストレージが加わった。",
    },
    {
      q: "ファイルの中身が改行で終わるとき、content.split(\"\\n\") は何を返す？",
      options: [
        "本物の行だけ",
        "本物の行 + 最後に空文字列1つ",
        "エラー",
        "1つの文字列",
      ],
      answer: 1,
      why: "末尾の空行はファイル作業の定番オフバイワン — 数えたり合計したりする前にフィルター（if line != \"\"）。",
    },
    {
      q: "1件の支出 (日付, 項目, 金額) に tuple が自然な形なのはなぜ？",
      options: [
        "速いから",
        "不変だから — 足元で変わらないという約束",
        "メモリが少ないから",
        "tuple の方が多く保持できるから",
      ],
      answer: 1,
      why: "3つの値は一緒に生まれ、一緒に留まる — 不変性は制限ではなく機能。",
    },
  ],
  outro:
    "8つのミッションが通ったとき、第5週の本物のプロジェクトの心臓を建てたことになります：自分の終わりを生き延びるトラッカー。読む部分だけのプログラムでもう一度Run — ファイルはまだ覚えています。それからマシンで本物を：同じ構造、本物のディスク上の本物のファイル、手作りの split の代わりに本物の csv モジュール。来週、第6週：スクリプトがインターネットと話します — requests、JSON、fx-tracker プロジェクト。",
}

