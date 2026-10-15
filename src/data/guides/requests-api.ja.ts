import type { Guide } from "../types";

export const guideApiJa: Guide = {
  slug: "requests-api",
  title: "インターネットと話すスクリプト",
  intro:
    "このガイドは第6週に対応します。ここまではすべてマシン上の話でした；今週、スクリプトは本物のAPIからライブデータを取得します（Frankfurter — 実プロジェクトで使う、無料・キー不要の為替レートAPI）。下のシミュレーターには同じエンドポイントを持つ疑似インターネットがあります — さらに、タイプミス用URLと、わざと最初の呼び出しだけ失敗するflakyエンドポイントも。正直なパターンを練習するために：ステータスを確認し、1回だけリトライし、記録して飛ばす。",
  week: "06-scripts-apis",
  sections: [
    {
      heading: "1. APIとは実際何か",
      body: "APIとは、URLで応答するプログラムです。スクリプトがリクエストを送り（「今日のUSD→JPYレートは？」）；サーバーがレスポンス — ステータスコードとデータ — で答えます。このリクエスト／レスポンスの契約がアイデアの全部で、どこにでも在ります：今この瞬間もあなたのスマホのアプリはAPIと話しています。Frankfurter（api.frankfurter.app）は出会う中で一番優しいAPIです：無料、キー不要、アカウント不要 — URLだけ。このシミュレーターでは import requests が動き、3つの実エンドポイントが組み込まれているので、ここで作る筋肉記憶はそのまま実機に移植できます。",
      examples: [
        {
          label: "契約",
          cmd: "あなたのスクリプト --requests.get(url)--> サーバー\nサーバー --status 200 + JSONデータ--> あなたのスクリプト",
          note: "URLで尋ね、ステータスとデータをもらう。それが取引。",
        },
      ],
    },
    {
      heading: "2. 実機にて：venvとpip（プロジェクトごとに一度）",
      body: "requestsはPythonに組み込まれていません — パッケージであり、パッケージはグローバルでなくプロジェクトごとにインストールします。儀式：仮想環境（このフォルダ専用のプライベートPython）を作り、有効化し、pip install。有効化コマンドはシステムによって異なります — これは本物のWindows/Linux分化で、共通版は存在しません。",
      steps: [
        {
          title: "仮想環境を作る（両方、プロジェクトごとに一度）",
          detail:
            "python -m venv .venv — プライベートPython入りの.venvフォルダを作る。第2週の.gitignoreが.venvを既にカバーしている、という点もおまけに。",
        },
        {
          title: "有効化 — Windows（PowerShell）",
          detail:
            ".venv\\Scripts\\Activate.ps1 — プロンプトに(.venv)が付く。PowerShellがスクリプト実行を拒否したら、Set-ExecutionPolicy -Scope CurrentUser RemoteSigned を一度実行（Windowsの通過儀礼として有名）。",
        },
        {
          title: "有効化 — Linux / macOS",
          detail: "source .venv/bin/activate — 同じくプロンプトに(.venv)が付く。",
        },
        {
          title: "requestsをインストール（venv有効状態で）",
          detail:
            "pip install requests — .venvの中だけにダウンロード。以後このプロジェクトにはrequestsがあり、他のプロジェクトは汚れません。",
        },
        {
          title: "このシミュレーターでは",
          detail:
            "どれも不要 — import requestsがそのまま動く。venv儀式は今週の実プロジェクト用；なぜ存在するかを知っていることが大事。",
        },
      ],
    },
    {
      heading: "3. requests.get()とresponseオブジェクト",
      body: "response = requests.get(url) はリクエストを送り、答えをオブジェクトで受け取ります。絶えず触るのは2つ：.status_code（数字 — 200はOKの意味）と .json()（JSONテキストから、既に歩き方を知っているdictとリストに変換されたデータ）。response自身をprintすると <Response [200]> — データではなくオブジェクト。データは要求したときに現れる：response.json()。",
      examples: [
        {
          label: "両方（シミュレーターも実機も — 同じコード）",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/latest?from=USD&to=JPY\"\nresponse = requests.get(url)\nprint(response.status_code)\nprint(response.json())",
          output:
            "200\n{'amount': 1.0, 'base': 'USD', 'date': '2026-10-15', 'rates': {'JPY': 149.98}}",
        },
      ],
    },
    {
      heading: "4. ネストされたJSONを読む：dictの底までdict",
      body: "JSONデータはdictの中のdictとして到着します — その技術は第5週で既にあなたのものです。response.json()が全体をくれます；[\"key\"]ごとに1レベル深く：[\"rates\"][\"JPY\"]がレートそのもの。1レベルずつ、「この名前のフィールド」として読み進める。レベルを読み違えたらKeyErrorが、存在しないキーを正確に教えてくれます — 第5週と同じ正直なエラー。プロの習慣：.json()を毎行呼び直すのではなく、変数に駐車する（data = response.json()）。",
      examples: [
        {
          label: "両方",
          cmd: "data = response.json()\nprint(data[\"rates\"])\nprint(data[\"rates\"][\"JPY\"])\nprint(data[\"date\"])",
          output: "{'JPY': 149.98}\n149.98\n2026-10-15",
          note: "1レベルに1つの[\"key\"]。先に変数へ駐車するのがプロの習慣。",
        },
      ],
    },
    {
      heading: "5. ステータスコード：信じる前に確認",
      body: "ステータスコードはサーバーの最初の言葉で、決して嘘をつきません：200は「データはこれ」；404は「そのURLは存在しない」（たいていタイプミス）；500は「サーバーが壊れた — あなたのせいでも、直す仕事でもない」。ルール：確認していないレスポンスのデータは決して使わない。1行の習慣：if response.status_code == 200: — データを信じ、そうでなければ飛ばしてその旨を伝える。",
      examples: [
        {
          label: "両方",
          cmd: "bad = requests.get(\"https://api.frankfurter.app/typo\")\nprint(bad.status_code)\nif bad.status_code != 200:\n    print(\"skipping: bad status\")",
          output: "404\nskipping: bad status",
          note: "404 → URLが違う。500 → サーバーが不調。どちらでも：データには触れない。",
        },
      ],
    },
    {
      heading: "6. try / except：安全網（とraise_for_status）",
      body: "失敗は、読めるステータスではなく例外として届くこともある。response.raise_for_status()が鋭い道具：ステータスが400以上のときHTTPError（大声の例外）を投げます。そしてtry/exceptが鋭い道具の周りの網：tryブロックが走り；名前の種類のエラーが起きたら、クラッシュの代わりにexceptブロックが走る — プログラムは生き残り、何をしたか言い、先へ進む。エラーは名前で捕まえる（except HTTPError:）— 素の except: も動くが、自分のバグまで何でも飲み込む、それが問題の隠れ方。finally: は何があっても走る — 成功、失敗、何でも：「後始末は必須」の場所。",
      examples: [
        {
          label: "両方",
          cmd: "try:\n    response = requests.get(\"https://api.frankfurter.app/typo\")\n    response.raise_for_status()\nexcept HTTPError:\n    print(\"handled: skipped\")\nprint(\"the program continues\")",
          output: "handled: skipped\nthe program continues",
          note: "エラーは捕まり、メッセージは表示され、プログラムは続いた。クラッシュなし。",
        },
        {
          label: "finally: は何があっても走る",
          cmd: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"caught\")\nfinally:\n    print(\"always runs\")",
          output: "caught\nalways runs",
        },
      ],
    },
    {
      heading: "7. 正直なパターン：1回リトライ、記録、飛ばす",
      body: "実ネットワークは時々失敗します — タイムアウト、瞬断。本番スクリプトは知らんぷりをせず、1つの正直なパターンに従います：試す；ステータスが悪ければ1回だけリトライ（一時的な失敗はしばしば自分で直る）；まだ悪ければ、失敗を記録してその項目を飛ばす — 1つの悪い月が全体の実行を殺してはならない。シミュレーターには、まさにこれ用の特別なエンドポイントがあります：/flakyは毎runの最初の呼び出しで500、その後200と答える — あなたのリトライ練習場。このパターンは第6週の心臓であり、これから走らせるすべてのデータパイプラインの心臓です。",
      examples: [
        {
          label: "両方 — 1回リトライ",
          cmd: "response = requests.get(\"https://api.frankfurter.app/flaky\")\nif response.status_code != 200:\n    response = requests.get(\"https://api.frankfurter.app/flaky\")\nprint(f\"recovered: {response.status_code}\")",
          output: "recovered: 200",
          note: "最初の呼び出し：500。1回のリトライ：200。一時的な失敗はしばしば自分で直る。",
        },
      ],
    },
    {
      heading: "8. 取得データと保存の出会い（fx-tracker、全体）",
      body: "第5週がファイルを、今週が取得を教えました。fx-trackerプロジェクトは2つを貼り合わせただけ：各エンドポイントを取得し、ステータスを確認し、ネストされたJSONを読み、通貨ごとに1行のCSV — date,base,rate — を書く。次のrunで読み返す。ミッションがまさにこれを作り、最後の1つが証明します：疑似ディスク上の rates.csv、両方のレート、プログラム終了後も読める。",
      examples: [
        {
          label: "ミニチュアの全体パイプライン",
          cmd: "rates = []\nresponse = requests.get(url)\nif response.status_code == 200:\n    data = response.json()\n    rate = data[\"rates\"][\"JPY\"]\n    rates.append(f\"{data['date']},USD,{rate}\")\nwith open(\"rates.csv\", \"w\") as f:\n    for r in rates:\n        f.write(r + \"\\n\")",
          note: "取得 → 確認 → 読む → 集める → 保存。世界中のあらゆるデータパイプラインの形。",
        },
      ],
    },
    {
      heading: "9. うまくいかないとき — 第6週の定番",
      body: "JSONの中のKeyError — APIがあなたが想定したフィールドを持っていない：response.json() をprintして、進む前に現実の形を見る。raise_for_statusからのHTTPError — ステータスが悪く、あなたが大声で尋ねた：捕まえるか、事前にステータス確認。ConnectionError / getaddrinfo failed（実機）— URLのタイプミスか、オフライン：リクエスト自体が飛んでいない。requests not found / ModuleNotFoundError（実機）— 第2節のvenv儀式を忘れた、またはvenvが有効でない。そして沈黙の罠：どこでもクラッシュしないのに何も書かないスクリプト — すべての取得がステータス確認で失敗し、すべてのスキップが沈黙だったから。スキップは記録する；沈黙は、誰も気づかないうちにデータが消える道。",
      examples: [
        {
          label: "まず現実の形を見る",
          cmd: "print(response.json())",
          note: "['rates']['JPY'] と進む前に、全体を一度printして読む。1つのprintが10の推測を救う。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "requestsとエラー — クイックリファレンス",
    rows: [
      { action: "モジュールを使えるように", command: "import requests", result: "何も表示されない — 定義だから" },
      { action: "URLに尋ねる", command: 'requests.get("https://...")' },
      { action: "答えを受け取る", command: "response = requests.get(url)", result: "（responseオブジェクトが保存される）" },
      { action: "サーバーの最初の言葉", command: "response.status_code", result: "200 / 404 / 500" },
      { action: "dictとしてのデータ", command: "response.json()", result: "{'base': 'USD', 'rates': {...}, ...}" },
      { action: "1レベル深く", command: 'data["rates"]["JPY"]', result: "149.98" },
      { action: "悪いステータスで大声", command: "response.raise_for_status()", result: "400以上でHTTPError" },
      { action: "安全網", command: "try: ... except HTTPError:", result: "（クラッシュなし — exceptが走る）" },
      { action: "必ず走る後始末", command: "finally:", result: "成功でも失敗でも走る" },
      { action: "正直なパターン", command: "1回リトライ、記録して飛ばす", result: "（1つの悪い項目が全体を殺さない）" },
      { action: "実機のみ", command: "pip install requests", result: "（.venvの中にインストール）" },
    ],
  },
  missions: [
    {
      id: "r1",
      prompt: "初コンタクト：import requests、requests.getでUSD→JPYエンドポイントを取得しresponseに保存、print(response.status_code)。",
      hint: 'url = "https://api.frankfurter.app/latest?from=USD&to=JPY" それから response = requests.get(url) と print(response.status_code)',
    },
    {
      id: "r2",
      prompt: "レートを読む：response.json() を変数に駐車し、JPYレートをprint — ネストされたdictを進む。",
      hint: 'data = response.json() それから print(data["rates"]["JPY"]) — 1レベルに1キー',
    },
    {
      id: "r3",
      prompt: "2つ目の通貨：EUR→JPYエンドポイントを取得（これもresponseに保存）し、そのJPYレートをprint。",
      hint: "from=EUR の同じURL — そして同じナビゲーション。レートは 163.55。",
    },
    {
      id: "r4",
      prompt: "CSV用に収集：空のリスト rates に \"USD,JPY,149.98\" と \"EUR,JPY,163.55\" を append。",
      hint: 'rates = [] それから rates.append("USD,JPY,149.98") と rates.append("EUR,JPY,163.55")',
    },
    {
      id: "r5",
      prompt: "タイプミスへの対応：\"https://api.frankfurter.app/typo\" を取得 — ステータスコードをprintし、200でなければ、ちょうど skipping: bad status と表示。",
      hint: "bad = requests.get(...) / print(bad.status_code) / if bad.status_code != 200: print(\"skipping: bad status\")",
    },
    {
      id: "r6",
      prompt: "リトライ練習：/flaky エンドポイントは最初の呼び出しで500、その後200。取得し；ステータスが200でなければもう一度取得；print(f\"recovered: {response.status_code}\")。",
      hint: "url = \"https://api.frankfurter.app/flaky\" — 取得、確認、必要ならもう一度、最終ステータスをprint。",
    },
    {
      id: "r7",
      prompt: "安全網：tryの中でタイプミスURLを取得し response.raise_for_status() を呼ぶ — HTTPErrorを捕まえて、ちょうど handled: skipped と表示。",
      hint: "try: / 取得 + raise_for_status() / except HTTPError: / print(\"handled: skipped\") — エラー名付きの except HTTPError: である点に注意。",
    },
    {
      id: "r8",
      prompt: "fx-tracker、全体：rates の全レートを rates.csv に1行ずつ書き、読み返してprint。",
      hint: 'with open("rates.csv", "w") as f: for r in rates: f.write(r + "\\n") — それから "r" で開いて f.read() をprint',
    },
  ],
  quiz: [
    {
      q: "APIとは、一文で言うと？",
      options: [
        "データベース",
        "URLで応答するプログラム：リクエストを送ると、ステータスとデータで答える",
        "プログラミング言語",
        "Pythonのライブラリ",
      ],
      answer: 1,
      why: "リクエスト／レスポンスの契約がアイデアの全部 — あなたが使うあらゆるアプリの背後に在る。",
    },
    {
      q: "仮想環境は何のため？",
      options: [
        "Pythonを速くするため",
        "プロジェクトごとにプライベートなパッケージを与え、プロジェクト同士が毒し合わないようにするため",
        "コードを隠すため",
        "インターネットに接続するため",
      ],
      answer: 1,
      why: "pip installは.venvの中だけに入る。プロジェクト分離が儀式の全目的。",
    },
    {
      q: "requests.get(url) の後、response.status_code == 200 は何を意味する？",
      options: [
        "ダウンロードが終わった",
        "サーバーがOKと答えた — データはこれ、安全に読める",
        "サーバーが忙しい",
        "URLがリダイレクトされた",
      ],
      answer: 1,
      why: "200はサーバーの最初の言葉：OK。確認していないレスポンスのデータは決して使わない。",
    },
    {
      q: "404は何を伝えている？",
      options: [
        "サーバーが壊れた",
        "そのURLは存在しない — たいていURL内のタイプミス",
        "オフラインだ",
        "データが空だ",
      ],
      answer: 1,
      why: "404 = 「その住所はない」。500 = サーバーが壊れた。違う言葉、違う意味 — 両方覚える。",
    },
    {
      q: "response.json() は何を返す？",
      options: [
        "テキストの文字列",
        "データをdictとリストに変換したもの — 既に歩き方を知っている構造",
        "ステータスコード",
        "ファイル",
      ],
      answer: 1,
      why: "JSONテキストは到着時にdict/リストになる — 第5週の技術が即座に使える。",
    },
    {
      q: "data[\"rates\"][\"JPY\"] がKeyError。最も可能性が高い原因は？",
      options: [
        "requestsが壊れている",
        "データにそのフィールドがない — response.json() 全体をprintして現実の形を見る",
        "レートがゼロ",
        "URLが長すぎる",
      ],
      answer: 1,
      why: "レベルの読み違え。現実の形を1回printする方が、10回推測するより安い。",
    },
    {
      q: "response.raise_for_status() は何をする？",
      options: [
        "ステータスコードをprintする",
        "ステータスが400以上のときHTTPErrorを投げる — 悪いステータスを大声の例外に変える",
        "リクエストをリトライする",
        "接続を閉じる",
      ],
      answer: 1,
      why: "鋭い道具：悪いステータスで大声で失敗する。try/exceptがそれを捕まえる網。",
    },
    {
      q: "except HTTPError: と except: の違いは？",
      options: [
        "無い",
        "except HTTPError: はそのエラーだけを捕まえる；except: は何でも — 自分のバグも飲み込み、それが問題の隠れ方",
        "except: の方が速い",
        "except HTTPError: はAPI専用",
      ],
      answer: 1,
      why: "エラーは名前で捕まえる。素のexceptは、ネットワークの失敗と一緒にあなたのミスも飲み込む。",
    },
    {
      q: "finally: ブロックはいつ走る？",
      options: [
        "成功時だけ",
        "失敗時だけ",
        "常に — 成功、失敗、何でも：必須の後始末の場所",
        "決して — ドキュメントだから",
      ],
      answer: 2,
      why: "finallyは無条件の番人。tryがどう終わっても、ファイルは閉じ、記録は残る。",
    },
    {
      q: "取得が500で失敗。正直なパターンは何をする？",
      options: [
        "直るまで永遠にリトライ",
        "大声でクラッシュ",
        "1回だけリトライし（一時的失敗は自分で直る）、まだ悪ければ記録してその項目を飛ばす",
        "黙って項目を無視",
      ],
      answer: 2,
      why: "1つの悪い項目が全体の実行を殺してはならない — そして沈黙のスキップはデータが消える道。スキップはすべて記録する。",
    },
    {
      q: "実機で ModuleNotFoundError: No module named 'requests'。最も可能性が高い原因は？",
      options: [
        "requestsが壊れている",
        "venv儀式が飛ばされた — 未インストールか、.venvが有効でない",
        "URLが間違っている",
        "Pythonが古い",
      ],
      answer: 1,
      why: "第2節の儀式：作る、有効化、インストール。プロンプトの(.venv)接頭辞が有効の印。",
    },
    {
      q: "エラーなしに走るのに、CSVが空。最も可能性が高い原因は？",
      options: [
        "ファイルが壊れている",
        "全取得がステータス確認で失敗し、全スキップが沈黙だった — 沈黙のスキップは跡形なくデータを消す",
        "CSVにはライセンスが必要",
        "レートが小さすぎた",
      ],
      answer: 1,
      why: "第6週の沈黙の罠：スキップの記録は飾りではなく、「データなし」と「何が失敗したか正確に分かる」の違い。",
    },
  ],
  outro:
    "8つのミッションが通ったとき、実第6週プロジェクトの骨格を書いています：2つのエンドポイントを取得し、ステータスを確認し、ネストJSONを読み、flakyをリトライし、結果をrunを生き延びるCSVに保存する。実機では、同じコードが本物のFrankfurter APIに対して走る — 同じURL、同じ形、ライブの数字。来週：総まとめプロジェクト — これら全部をスケジュール上で行う market-watch ツール。",
}

