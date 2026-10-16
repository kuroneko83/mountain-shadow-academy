import type { Guide } from "../types";

export const guideWatchJa: Guide = {
  slug: "market-watch",
  title: "market-watch：1つのスクリプト、1つの仕事",
  intro:
    "このガイドは第7週に対応します。総まとめの1週間：取得スクリプトを小さくて信頼できる道具に育てます。シミュレーターのインターネットには新しいエンドポイントがあります — 30日分のUSD/JPY履歴。これを取得し、リストに整形し、本物の統計（min、max、mean、std）を計算し、最大の動きを見つけ、runを生き延びるレポートを書きます。ミッションが週次計画の本物のmarket-watch.pyを組み立てます。",
  week: "07-market-watch",
  sections: [
    {
      heading: "1. 本物の道具の形",
      body: "第6週のスクリプトは1回の取得をしました。本物の道具には形があります：取得 → クレンジング → 分析 → レポート。取得は生データを（日付のdictを）もらう。クレンジングは分析に必要な形（素朴な数のリスト）に整形する。分析は答えを計算する（min、max、mean、std、最大の動き）。レポートは答えを人間が読めるテキストに — 今週は、runを生き延びるファイルに。4つの動詞、1つの方向、近道なし：このスクリプトから、いつか触る最大のシステムまで、あらゆるデータ道具の正確なパイプラインです。",
      examples: [
        {
          label: "4つの動詞",
          cmd: "fetch (requests) --> clean (loops) --> analyze (math) --> report (f-strings + files)",
          note: "4つの動詞、1つの方向。ここで学び、永遠に再利用する。",
        },
      ],
    },
    {
      heading: "2. 履歴エンドポイント：新しいJSONの形",
      body: "インターネットに2種類目のエンドポイントが増えました：履歴です。https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY は30日分を一度に答えます — そして新しい形に注目：ratesはキーが日付のdictで、各日付が自分の小さなレートのdictを持っています。日付をキーに：for date in data[\"rates\"] で日々を歩き、data[\"rates\"][date][\"JPY\"] がその日のレート。実APIはこんな形を絶えず返します — 日付をキーにしたdictのdictは、第8週のpandasで再び出会う古典的な時系列の形です。",
      examples: [
        {
          label: "両方",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY\"\ndata = requests.get(url).json()\nprint(len(data[\"rates\"]))\nprint(data[\"rates\"][\"2026-09-16\"])\nprint(data[\"rates\"][\"2026-09-16\"][\"JPY\"])",
          output: "30\n{'JPY': 147.8}\n147.8",
          note: "30日分を1リクエストで。日付をキーに — 古典的な時系列の形。",
        },
      ],
    },
    {
      heading: "3. クレンジング：dictのdictから数のリストへ",
      body: "分析が欲しいのはdictのdictではなく、数のリスト。だからクレンジングのステップで整形します：2つの空リスト、日付上のforループ、append。valuesは30個の素朴な数に、datesは30個の日付文字列に、同じ順序で — 2つの並行リスト。この整形こそデータクレンジングの核心です：もらう形は必要な形と決して一致せず、形の変換がデータ作業の半分です。規律に注目：1つのループが両方のリストを埋め、位置を揃える — values[i] と dates[i] は常に同じ日。",
      examples: [
        {
          label: "両方",
          cmd: "values = []\ndates = []\nfor date in data[\"rates\"]:\n    values.append(data[\"rates\"][date][\"JPY\"])\n    dates.append(date)",
          note: "2つのリスト、1つのループ、同じ順序 — values[i] と dates[i] は同じ日。この整列が最大の動きの分析に必要。",
        },
      ],
    },
    {
      heading: "4. min、max、sum：あなたのループの報酬",
      body: "第4週でtotal()を自分のループで書き、後で言語が報酬をくれると約束しました。ここにあります：min(values)、max(values)、sum(values) — あなたのループがやったのと正確に同じことを1呼び出しでやる組み込み関数。報酬は二重：コードが減り、かつ中身を正確に知っている — 手で作ったから。空リストでの min() は大声で拒否します（ValueError: min() arg is an empty sequence） — 「何もないの最小」に答えはないので、これは正直なエラーです。",
      examples: [
        {
          label: "両方",
          cmd: "print(min(values))\nprint(max(values))\nprint(sum(values) / len(values))",
          output: "146.5\n151.6\n148.91933333333334",
          note: "第4週のアキュムレータの工場製版。中身を知っている — 作ったから。",
        },
      ],
    },
    {
      heading: "5. mean と std：2つの正直な数",
      body: "meanは合計を個数で割ったもの：sum(values) / len(values)。std（標準偏差）は日々がmeanの周りにどれだけ散らばっているかを測ります — トレーダーにとってそれはボラティリティで、穏やかな月と荒れた月の違いです。レシピをゆっくり：各値からmeanを引く（各日は平均からどれだけ離れているか）、各距離を2乗（マイナスをプラスに）、2乗を平均、平方根（** 0.5 — 半分のべきは2乗を取り消す）。[1, 2, 3] で歩くと：mean 2、距離 -1, 0, 1、2乗 1, 0, 1、平均 0.667、平方根 0.82。小さいリスト、小さいstd — 数は直感が言う通りに動いています。",
      examples: [
        {
          label: "両方 — mean と std",
          cmd: "mean = sum(values) / len(values)\ntotal = 0\nfor v in values:\n    total += (v - mean) ** 2\nstd = (total / len(values)) ** 0.5\nprint(f\"mean: {mean:.2f}\")\nprint(f\"std: {std:.2f}\")",
          output: "mean: 148.92\nstd: 1.38",
          note: "引く、2乗、平均、平方根。4ステップ、.2fが人間らしくする。",
        },
      ],
    },
    {
      heading: "6. 最大の動き：昨日と今日",
      body: "レポートの見出し：どの日が一番動いた？各日をその前日と比べる：change = values[i] - values[i - 1]、for i in range(1, len(values)) — 1から始めるのは、0日目には昨日がないから。最大の絶対的な動きを追跡：if abs(change) > abs(biggest) なら、change とその日付（dates[i]）の両方を覚える。我々のデータでは 2026-10-15 の -1.62 の下落が勝ちます — そして、abs() は第3週からあなたのものだったことに注目。本物の分析はいつもこれ：もう持っている小さな部品の組み合わせ。",
      examples: [
        {
          label: "両方",
          cmd: "biggest = 0\nbiggest_date = \"\"\nfor i in range(1, len(values)):\n    change = values[i] - values[i - 1]\n    if abs(change) > abs(biggest):\n        biggest = change\n        biggest_date = dates[i]\nprint(f\"biggest move: {biggest_date} ({biggest:.2f})\")",
          output: "biggest move: 2026-10-15 (-1.62)",
          note: "1から（0日目に昨日はない）。abs() が動きの大きさを比べ、符号が方向を教える。",
        },
      ],
    },
    {
      heading: "7. レポート：組み立て、そして書き留める",
      body: "レポートのステップは他と同じ関数です：def report(values): が行（f-stringのリスト）を組み立て、「\\n」で連結し、テキストを return する — print ではなく return、呼び出し側がどうするかを決めるから：表示するか、open で report.txt に書くか。これは道具の規模での第4週の教訓：関数は値を作る、メインプログラムが行き先を決める。そしてレポートをファイルに書くと run を生き延びる — 読む部分だけのプログラムでもう一度Runすれば、まだそこにあります。あなたの出力はもう、画面だけでなく製品です。",
      examples: [
        {
          label: "両方",
          cmd: "def report(values):\n    lines = []\n    lines.append(\"USD/JPY 30-day report\")\n    lines.append(f\"min: {min(values)}\")\n    lines.append(f\"mean: {sum(values) / len(values):.2f}\")\n    return \"\\n\".join(lines)\n\ntext = report(values)\nprint(text)\nwith open(\"report.txt\", \"w\") as f:\n    f.write(text)",
          output: "USD/JPY 30-day report\nmin: 146.5\nmean: 148.92",
          note: "行を組み立て、連結し、return。呼び出し側が表示または書き込み — 関数は気にしない。",
        },
      ],
    },
    {
      heading: "8. print() と logging：優しい大人の階段",
      body: "今週、あなたの道具はprintで正直です：イベントごとに1行、明確な接頭辞（'skipping: bad status'）。スクリプトが育って無人で走るようになると、printはloggingへ進級します：同じメッセージ、しかしレベル付き（INFO は通常の仕事、WARNING はスキップ、ERROR は失敗）とタイムスタンプ付き — ログは、尋ねなくても午前3時に何が起きたかを教えられる。このプロジェクトでは規律あるprintで十分；違いを知っていることがポイント。シミュレーターはprintのまま — 今すぐ作る習慣は、「誰が話したか」を言う接頭辞です。",
      examples: [
        {
          label: "移る習慣",
          cmd: "print(\"skipping: bad status\")\nprint(\"fetched: 30 days\")\nprint(\"report: written to report.txt\")",
          note: "すべての行が誰が話したかを言う。この習慣がloggingの90% — レベルとタイムスタンプは後から。",
        },
      ],
    },
    {
      heading: "9. 毎日走らせる（実機、任意）",
      body: "本物のmarket-watchは自分で走ることで存在価値を得ます。Linux/macOS：cron — crontab.guru がスケジュールの書き方を手伝う；0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py のような1行で、平日09:00に走る。Windows：タスクスケジューラ — 基本タスクの作成 → トリガー日次 → 操作：プログラムの開始 → .venvのpythonとスクリプトのパス。どちらも同じ仕事：あなたのOS、世界で最も信頼できるwhileループが、Runを押してくれる。今週は任意 — しかし精神画像が大事：自分で走る道具。",
      examples: [
        {
          label: "Linux / macOS（cron）",
          cmd: "0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py",
          note: "平日09:00。crontab.guru がこれらを書いてくれる。",
        },
        {
          label: "Windows（タスクスケジューラ）",
          cmd: "タスクスケジューラ → 基本タスクの作成 → 毎日 09:00 → プログラムの開始 → python.exe + スクリプトのパス",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "market-watch — クイックリファレンス",
    rows: [
      { action: "1リクエストで30日", command: 'requests.get("...2026-09-16..2026-10-15?from=USD&to=JPY")', result: "（30日分のresponse）" },
      { action: "時系列の形", command: 'data["rates"][date]["JPY"]', result: "147.8（その日のレート）" },
      { action: "日々を歩く", command: 'for date in data["rates"]:', result: "（1ターンに1日付）" },
      { action: "リストに整形", command: "values.append(data[\"rates\"][date][\"JPY\"])", result: "（何も表示されない — リストが育つ）" },
      { action: "最小 / 最大", command: "min(values), max(values)", result: "146.5 / 151.6" },
      { action: "平均", command: "sum(values) / len(values)", result: "148.92（.2f付き）" },
      { action: "std（ボラティリティ）", command: "(total / len(values)) ** 0.5", result: "1.38（.2f付き）" },
      { action: "平方根", command: "x ** 0.5", result: "xの平方根" },
      { action: "各日と昨日", command: "for i in range(1, len(values)):", result: "（1から — 0日目に昨日はない）" },
      { action: "今日の動き", command: "values[i] - values[i - 1]", result: "+0.30 / -1.62 ..." },
      { action: "レポートの組み立て", command: 'lines.append(f"min: {min(values)}")', result: "（1行に1つのappend）" },
      { action: "行 → テキスト", command: '"\\n".join(lines)', result: "（1つのテキスト、改行で区切り）" },
      { action: "生き延びさせる", command: 'with open("report.txt", "w") as f:', result: "（ファイルはrun間で存続）" },
    ],
  },
  missions: [
    {
      id: "s1",
      prompt: "履歴を取得：2026-09-16..2026-10-15 のUSD→JPYエンドポイント、response.json() を data に駐車し、日数を print — len(data[\"rates\"])。",
      hint: "URLは https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY — それから print(len(data[\"rates\"]))。",
    },
    {
      id: "s2",
      prompt: "クレンジング：空のリスト values と dates；日付上の1つのforループで、各日のJPYレートと各日付を append。",
      hint: "for date in data[\"rates\"]: それから values.append(data[\"rates\"][date][\"JPY\"]) と dates.append(date)。",
    },
    {
      id: "s3",
      prompt: "最初の統計：print(f\"min: {min(values)}\") と print(f\"max: {max(values)}\") — 第4週のループの工場製版。",
      hint: "min(values) と max(values) — 4節の組み込み関数。",
    },
    {
      id: "s4",
      prompt: "平均：mean = sum(values) / len(values)、小数ちょうど2桁で表示。",
      hint: 'print(f"mean: {mean:.2f}") — sum と len、それぞれ1行。',
    },
    {
      id: "s5",
      prompt: "ボラティリティ：stdを計算 — meanからの2乗距離、その平均、平方根 — 小数2桁で表示。",
      hint: "total = 0 / for v in values: total += (v - mean) ** 2 / std = (total / len(values)) ** 0.5 — それから print(f\"std: {std:.2f}\")。",
    },
    {
      id: "s6",
      prompt: "見出し：最大の日次変動 — 各日を昨日と比べ、最大の絶対変化を追跡し、print(f\"biggest move: {biggest_date} ({biggest:.2f})\")。",
      hint: "for i in range(1, len(values)): change = values[i] - values[i - 1] — if abs(change) > abs(biggest): change と dates[i] の両方を覚える。",
    },
    {
      id: "s7",
      prompt: "生き延びさせる：関数 report(values) が行（タイトル 'USD/JPY 30-day report'、min、mean）を組み立て、連結し、テキストを return；print して report.txt に書く。",
      hint: 'lines = [] / lines.append("USD/JPY 30-day report") / ... / return "\\n".join(lines) — それから text = report(values)、print(text)、with open("report.txt", "w") で保存。',
    },
    {
      id: "s8",
      prompt: "出荷：完全パイプライン — 取得、クレンジング、統計、最大の動き、レポート、ファイル — 1つのプログラム、順番に。Runすれば、上のすべてが一度に灯ります。",
      hint: "作ったもの全部を節の順に：取得 → values/dates → min/max/mean/std → 最大の動き → report(values) → report.txt。1回のRunで全部緑。",
    },
  ],
  quiz: [
    {
      q: "本物のデータ道具の形は？",
      options: [
        "全部をやる1つの巨大関数",
        "取得 → クレンジング → 分析 → レポート — 4つの動詞、1つの方向",
        "データを読み、データを表示",
        "APIが返すもの何でも",
      ],
      answer: 1,
      why: "4つの動詞、1つの方向、近道なし — このスクリプトから最大のシステムまで、あらゆるデータ道具のパイプライン。",
    },
    {
      q: "履歴エンドポイントのJSONの形の新しい点は？",
      options: [
        "何も — latestと同じ",
        "ratesはキーが日付のdictで、各日付が自分のレートのdictを持つ — 古典的な時系列の形",
        "dictではなくリストを返す",
        "JSONではなくテキストを返す",
      ],
      answer: 1,
      why: "日付をキーに：dictのループで日々を歩く。この形はpandasで再び出会う。",
    },
    {
      q: "クレンジングがdictのdictをリストに整形する理由は？",
      options: [
        "リストの方が速いから",
        "分析は素朴な数のリストが必要 — もらう形は必要な形と決して一致しないから",
        "dictはループできないから",
        "ファイルを小さくするため",
      ],
      answer: 1,
      why: "形の変換がデータ作業の半分 — 「クレンジング」が主に意味するもの。",
    },
    {
      q: "values[i] と dates[i] の共通点は？",
      options: [
        "何もない",
        "同じループで埋められたので、両方の位置 i は同じ日 — 並行リスト",
        "常に等しい",
        "片方はもう片方のコピー",
      ],
      answer: 1,
      why: "1つのループが同じ順序で両方を埋める。この整列が最大の動きの分析に必要。",
    },
    {
      q: "min([]) — 空リスト — は何をする？",
      options: [
        "0を返す",
        "Noneを返す",
        "ValueError: min() arg is an empty sequence を投げる — 「何もないの最小」に答えはない",
        "空リストを返す",
      ],
      answer: 2,
      why: "正直な拒否。データが空なら、静かな0より大声のエラーが欲しい。",
    },
    {
      q: "stdの計算順序は？",
      options: [
        "値を並べ替えて真ん中を取る",
        "各値からmeanを引き、距離を2乗し、2乗を平均し、平方根を取る",
        "全部足して2で割る",
        "最大から最小を引く",
      ],
      answer: 1,
      why: "引く、2乗、平均、平方根。トレーダーにとってその数はボラティリティ — 穏やかな月と荒れた月の違い。",
    },
    {
      q: "x ** 0.5 は何？",
      options: [
        "xを0.5で割ったもの",
        "xの半分のべき — xの平方根",
        "xの半分",
        "エラー — べきは整数でなければならない",
      ],
      answer: 1,
      why: "半分のべきは2乗を取り消す — stdレシピが使う平方根の技。",
    },
    {
      q: "最大の動きのループが range(1, len(values)) から始める理由は？",
      options: [
        "0日目が無効データだから",
        "0日目には比べる昨日がないから — change = values[i] - values[i - 1] に i - 1 の存在が必要",
        "週末を飛ばすため",
        "Pythonのリストは1から始まるから",
      ],
      answer: 1,
      why: "比較にはペアが必要。1から始めれば毎日に昨日がある。",
    },
    {
      q: "report() が print ではなくテキストを return すべき理由は？",
      options: [
        "printが遅いから",
        "呼び出し側がどうするか決める — 表示するか、ファイルに書くか：関数は作り、呼び出し側が決める",
        "Pythonが関数内のprintを禁じているから",
        "ファイルにはprintではなくテキストが必要だから",
      ],
      answer: 1,
      why: "道具の規模での第4週の教訓：関数は return。printはメインプログラムの決定。",
    },
    {
      q: "プログラムの2回のRunの間に生き延びるものは？",
      options: [
        "すべての変数",
        "ファイル — 変数は毎runの終わりで死に、ファイルは存続する（シミュレーターの疑似ディスク、実家では本物のディスク）",
        "何もない",
        "最後のprintだけ",
      ],
      answer: 1,
      why: "今はメモリ、後のためにストレージ — 第5週からの同じ分担が、今は製品を作る：report.txt。",
    },
    {
      q: "print() と logging の違いは？",
      options: [
        "loggingの方が速い",
        "loggingは大人になったprint：レベル（INFO/WARNING/ERROR）とタイムスタンプ — 尋ねられなくても午前3時のrunを説明できるメッセージ",
        "loggingはファイルでしか動かない",
        "何もない — 同義語",
      ],
      answer: 1,
      why: "このプロジェクトでは規律あるprintで十分。今すぐ移る習慣は「誰が話したか」を言う接頭辞。",
    },
    {
      q: "cronとタスクスケジューラが道具にしてくれることは？",
      options: [
        "スクリプトを速くする",
        "スケジュールでRunを押してくれる — あなたのOS、世界で最も信頼できるwhileループ",
        "バグを自動で直す",
        "レポートを圧縮する",
      ],
      answer: 1,
      why: "自分で走る道具：平日09:00、人間不要。今週は任意 — 精神画像がポイント。",
    },
  ],
  outro:
    "8番目のミッションが1回のRunで灯ったとき、第7週のプロジェクトを出荷しています：30日の取得、整形、本物の統計、見出しの動き、生き延びるレポート。空のエディタからもう一度 — 4つの動詞が考えるより先に順番に出てきたら、第8週の準備はできています：pandasがクレンジングと計算を引き継ぎ、あなたのループが何の訓練だったのかをついに見ます。",
}

