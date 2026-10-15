import type { Curriculum } from "./types";

export const curriculumJa: Curriculum = {
  phases: [
    {
      id: "foundations",
      name: "フェーズ1 — 基礎",
      description:
        "開発ツール、Git & GitHub、そして最初のPythonコード。経験ゼロを前提にしています。",
    },
    {
      id: "python",
      name: "フェーズ2 — Pythonとスクリプティング",
      description:
        "小さなプログラムから、インターネットからリアルデータを取得するスクリプトへ。",
    },
    {
      id: "data",
      name: "フェーズ3 — データを扱う",
      description:
        "pandasとSQL：データのクレンジング、分析、そして適切な保存方法。",
    },
    {
      id: "capstone",
      name: "フェーズ4 — 卒業プロジェクトとポートフォリオ",
      description:
        "完全なマーケットデータパイプラインを構築し、公開する — それが雇用主に見せるポートフォリオです。",
    },
  ],
  weeks: [
    {
      slug: "01-setup-terminal",
      title: "あなたの道具：ターミナル、Python、VS Code",
      phase: "foundations",
      why: "これからの12週間 — そして今後のキャリア — で行うすべての作業は、この3つの道具の中で行われます。今この3つに慣れておくことで、後の毎週が速く、そして怖くなくなります。",
      guide: "command-line",
      objectives: [
        "クリックだけではなく、ターミナル（WindowsはPowerShell、Linuxはbash）でPC内を移動できる。",
        "ターミナルからPythonを実行し、自分のバージョンを把握できる。",
        "VS Codeで.pyファイルを作成・編集・実行できる。",
      ],
      topics: [
        "ターミナルとは：PowerShell（Windows）と bash（Linux）",
        "ファイル・フォルダ・パス — pwd、ls/dir、cd、mkdir",
        "Python 3とVS Codeのインストール",
        "python --version、python ファイル名.py での実行",
        "最初のスクリプト：print() と # コメント",
      ],
      project: {
        title: "setup-log.py",
        description:
          "あなたのPCが次の11週間の準備ができていることを証明する最初のスクリプト。",
        steps: [
          "本カリキュラム用のフォルダ（例：msa-academy）を作り、その中に data/ と scripts/ を作る。",
          "setup-log.py に、自分の名前、今日の日付（import datetime）、Pythonのバージョン（import sys）を表示させる。",
          "エディタのボタンではなく、ターミナルから実行する — 少なくとも一度は。",
        ],
      },
      resources: [
        {
          title: "VS Code — 公式Pythonチュートリアル",
          url: "https://code.visualstudio.com/docs/python/python-tutorial",
          note: "「インストール」と「実行」のセクションのみ。残りは今は不要です。",
        },
        {
          title: "MIT — The Missing Semester（シェル）",
          url: "https://missing.csail.mit.edu/",
          note: "レッスン1のみ。読むだけで暗記しなくてOK。",
        },
        {
          title: "Python — 公式ビギナーズガイド",
          url: "https://www.python.org/about/gettingstarted/",
        },
      ],
    },
    {
      slug: "02-git-github",
      title: "Git & GitHub：今日からポートフォリオ開始",
      phase: "foundations",
      why: "今週から、あなたが書くすべてのコードは公開されたGitHubリポジトリにコミットされます。つまり、まだ上手にプログラミングができないうちから、ポートフォリオは育ち始めるのです。",
      guide: "git",
      objectives: [
        "Gitリポジトリを作成し、コミットし、GitHubにプッシュできる。",
        "各リポジトリに分かりやすいREADME.mdを書ける。",
        "クリーンで理解しやすいコミット履歴を保てる。",
      ],
      topics: [
        "バージョン管理とは、そしてなぜ全ての企業が使うのか",
        "git init、git add、git commit -m、git log",
        "git remote と git push でGitHubに接続",
        "README.md — 何を書くべきか",
        ".gitignore — ゴミや秘密情報は絶対にコミットしない",
      ],
      project: {
        title: "learning-log リポジトリ",
        description:
          "あなた最初の公開リポジトリ：このカリキュラムで学んだすべての記録。",
        steps: [
          "プロフェッショナルなユーザー名でGitHubアカウントを作る。",
          "learning-log リポジトリを作り、setup-log.py をプッシュする。",
          "このリポジトリが何で、これから何を追加していくかをREADMEに書く。",
          "以降の毎週：learning-log またはプロジェクトリポジトリに少なくとも週1回コミットする。",
        ],
      },
      resources: [
        {
          title: "GitHub Skills — Introduction to Git",
          url: "https://skills.github.com/",
          note: "「Introduction to Git」コース。ブラウザ上で完結する対話型教材。",
        },
        {
          title: "Pro Git（書籍）— 第1章・第2章",
          url: "https://git-scm.com/book/ja/v2",
          note: "無料の公式書籍（日本語版あり）。第1章は通読、第2章は辞書として。",
        },
      ],
    },
    {
      slug: "03-python-basics-1",
      title: "Python I：値、テキスト、判断",
      phase: "foundations",
      why: "これは今後あなたが書くすべてのプログラムの原子です：値を保存し、テキストを組み立て、判断を下す。ここで急がずしっかり固めること — 基礎が甘いと後で数週間を失います。",
      guide: "python-basics",
      objectives: [
        "変数を作り、基本型（int、float、str、bool）を使える。",
        "f-stringでテキストを組み立て、ユーザーから入力を受け取れる。",
        "比較と if / elif / else で判断を書ける。",
      ],
      topics: [
        "変数と代入",
        "数値（int、float）と算術演算子",
        "文字列：f-string、.strip()、.lower()、スライス",
        "input() と型変換（int()、float()）",
        "比較演算子と if / elif / else",
      ],
      project: {
        title: "yen-converter.py",
        description:
          "対話型のJPY ↔ USD変換ツール — あなた最初の「本物」のプログラム。",
        steps: [
          "USD/JPYレートを変数に保存する（今週は固定値でOK）。",
          "ユーザーに金額と方向（JPY→USD か USD→JPY）を尋ねる。",
          "結果をf-stringできれいな文章で表示する。",
          "簡単なチェックを追加：マイナスの金額には丁寧なエラーメッセージを返す。",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python（レッスン1〜3）",
          url: "https://www.kaggle.com/learn/python",
          note: "無料・対話型・約4時間。今週はレッスン1〜3を。",
        },
        {
          title: "freeCodeCamp — Scientific Computing with Python",
          url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
          note: "長期の認定コース。今週始めて、カリキュラム全体を通じて継続します。",
        },
        {
          title: "Automate the Boring Stuff — 第1章・第2章",
          url: "https://automatetheboringstuff.com/",
          note: "オンラインで無料で読めます。初心者向けスクリプティングの最高の書籍。",
        },
      ],
    },
    {
      slug: "04-python-basics-2",
      title: "Python II：ループと関数",
      phase: "python",
      why: "プログラムが強力になるのは、あなたの代わりに仕事を繰り返し、ロジックを名前付きの再利用可能な関数にまとめられるときです。また、エラーメッセージを読む練習もここでします — 毎日使うスキルです。",
      guide: "python-loops",
      objectives: [
        "forループとwhileループで処理を繰り返せる。",
        "引数と戻り値を持つ関数を書ける。",
        "トレースバックを読んで、自分のバグを直せる。",
      ],
      topics: [
        "forループと range()",
        "whileループ（と無限ループの避け方）",
        "def、引数、return、docstring",
        "エラーメッセージの読み方：トレースバックが教えてくれること",
        "問題を小さな関数に分解する",
      ],
      project: {
        title: "daily-report.py",
        description: "1週間分の数値をループと関数で要約する。",
        steps: [
          "7日分の数値（例：練習用の取引量）をリストとしてコードに書く。",
          "total()、average()、best_day() の各関数を書く — それぞれリストを受け取り結果を返す。",
          "合計、平均、最高の日とその値をレポートとして表示する。",
          "わざと一度壊す（コロンを消す）、トレースバックを読み、直す — これも立派な練習です。",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python（レッスン4〜5）",
          url: "https://www.kaggle.com/learn/python",
          note: "ループ、関数、ブールのレッスン。",
        },
        {
          title: "Automate the Boring Stuff — 第3章",
          url: "https://automatetheboringstuff.com/",
        },
      ],
    },
    {
      slug: "05-structures-files",
      title: "データ構造とファイル",
      phase: "python",
      why: "本物のプログラムはデータを手元に残します：リストや辞書で保持し、ファイルに保存する。今週から、あなたのプログラムは終了してもすべてを忘れなくなります。",
      objectives: [
        "list、dict、tupleの中から適切な構造を選べる。",
        "テキストファイルとCSVファイルを読み書きできる。",
        "スクリプト終了後も残る構造化データを保存できる。",
      ],
      topics: [
        "リストの深掘り：append、remove、反復",
        "辞書：キー、値、.get()、items()のループ",
        "タプルと、変更できないことの利点",
        "with open(...) as f — ファイルの読み書き",
        "csvモジュール、jsonの初見",
      ],
      project: {
        title: "expense-tracker.py",
        description:
          "永続化されたストレージを持つ小さなCLIアプリ — 2つ目の公開リポジトリ。",
        steps: [
          "新しいGitHubリポジトリ expense-tracker を作る。",
          "input() で支出を追加：日付、項目、JPY金額 → expenses.csv に追記。",
          "'summary' コマンドで合計、平均、最高額の項目を表示。",
          "ファイルの中身を手でコードに貼るのではなく、CSVを正しくパースする。",
          "使用例を載せたREADMEを書く。",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python（レッスン6〜7）",
          url: "https://www.kaggle.com/learn/python",
          note: "リストと辞書のレッスン。",
        },
        {
          title: "Automate the Boring Stuff — 第4〜6章・第9〜10章",
          url: "https://automatetheboringstuff.com/",
          note: "第4〜6章は今読む。第9〜10章（ファイル）はプロジェクト作成時に。",
        },
      ],
    },
    {
      slug: "06-scripts-apis",
      title: "インターネットと話すスクリプト",
      phase: "python",
      why: "今週からスクリプトが本物の仕事を始めます：公開APIからライブデータを取得し、失敗を処理し、結果を保存する。「取得 → クレンジング → 保存」というこのスキルこそ、データエンジニアリングの核心です。",
      objectives: [
        "仮想環境をセットアップし、pipでパッケージを入れられる。",
        "requestsで公開APIを呼び、JSONレスポンスをパースできる。",
        "try/exceptで失敗を処理し、1つの悪い日が全体を止めないようにできる。",
      ],
      topics: [
        "python -m venv .venv、有効化、pip install requests",
        "requests.get() とHTTPステータスコード（200、404、500）",
        "response.json() — ネストされたdictとlistの操作",
        "try / except / finally",
        "失敗時は1回リトライ、それでもダメならログを残してスキップ",
      ],
      project: {
        title: "fx-tracker",
        description:
          "本物の為替レートを取得するスクリプト — 3つ目のリポジトリ。",
        steps: [
          "Frankfurter API のドキュメントを読む（無料・APIキー不要の為替API）。",
          "fetch_rates.py を書く：過去90日の USD→JPY と EUR→JPY レートを取得。",
          "きれいな rates.csv（date、usd_jpy、eur_jpy）として保存。",
          "リクエストを try/except で囲み、1回リトライする。",
          "README付きの新しい fx-tracker リポジトリにプッシュする。",
        ],
      },
      resources: [
        {
          title: "Frankfurter API — ドキュメント",
          url: "https://www.frankfurter.app/docs/",
          note: "使用するAPI。無料でキー不要です。",
        },
        {
          title: "Automate the Boring Stuff — 第11章",
          url: "https://automatetheboringstuff.com/",
          note: "Webスクレイピングの章 — requests関連の部分を読む。",
        },
        {
          title: "requests — クイックスタート",
          url: "https://requests.readthedocs.io/en/latest/user/quickstart/",
        },
      ],
    },
    {
      slug: "07-market-watch",
      title: "ミニプロジェクト：market-watch",
      phase: "python",
      why: "総まとめの1週間：取得スクリプトを小さくて信頼できるツールに育て、毎日使ってみましょう。反復こそ、文法が怖くなくなり自然に書けるようになる唯一の道です。",
      objectives: [
        "本物のプロジェクトのようにリポジトリを構成できる（フォルダ、README、工程の分離）。",
        "生の取得スクリプトを日次レポート生成ツールに変えられる。",
        "タスクをスケジュールで自動実行できる（任意だが強力）。",
      ],
      topics: [
        "リポジトリ構成：scripts/、data/、README.md",
        "関数の組み合わせ：取得 → クレンジング → 分析 → レポート",
        "統計の基礎：min、max、平均、簡単な標準偏差",
        "print() と logging の違い",
        "スケジューリング：cron（Linux）/ タスクスケジューラ（Windows）— 任意",
      ],
      project: {
        title: "market-watch.py",
        description:
          "USD/JPYの日次マーケットレポート：数値、動き、テキスト要約。",
        steps: [
          "過去30日のUSD/JPYレートを取得（引き続きFrankfurter）。",
          "期間のmin、max、平均、標準偏差を計算する。",
          "人間が読める report.txt を書く：期間、統計、最大の上昇/下落日。",
          "1週間、毎営業日実行し、レポートを毎日コミットする。",
          "任意：スケジュールしてPCにやらせてみる。",
        ],
      },
      resources: [
        {
          title: "Automate the Boring Stuff — 第12章",
          url: "https://automatetheboringstuff.com/",
        },
        {
          title: "crontab.guru — cron記法ヘルパー",
          url: "https://crontab.guru/",
          note: "スケジューリング練習に挑戦した場合のみ。",
        },
      ],
    },
    {
      slug: "08-pandas-1",
      title: "pandas I：最初のDataFrame",
      phase: "data",
      why: "pandasは、日本でも世界中でも、アナリストやデータエンジニアに求められる定番ツールです。散らかったファイルを1行で切れる表に変えてくれます。",
      objectives: [
        "CSVをDataFrameに読み込み、確認できる（head、info、describe）。",
        "列を選択し、条件で行を絞り込める。",
        "欠損値に驚かされず、対処できる。",
      ],
      topics: [
        "SeriesとDataFrame — それって何？",
        "read_csv、head、info、describe",
        "列の選択、条件によるフィルタリング",
        "欠損データ：isna、dropna、fillna",
        "列名の変更と型の変換",
      ],
      project: {
        title: "rates-exploration.py",
        description:
          "自分の rates.csv について、文章で書いた10個の質問にpandasで答える。",
        steps: [
          "fx-tracker の rates.csv をDataFrameに読み込む。",
          "10個の質問を（READMEに）書く — 例：「期間内でUSD/JPYが最高だった日は？」",
          "それぞれpandasで答える — CSVを手で読まない。",
          "スクリプト＋質問＋回答を fx-tracker リポジトリにコミットする。",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas（レッスン1〜3）",
          url: "https://www.kaggle.com/learn/pandas",
          note: "最高の無料pandasコース。約4時間。",
        },
        {
          title: "freeCodeCamp — Data Analysis with Python",
          url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
          note: "pandas + matplotlibを含む認定コース。今週始めて、第10週までに終える。",
        },
      ],
    },
    {
      slug: "09-pandas-2",
      title: "pandas II：集計とグラフ",
      phase: "data",
      why: "データの要約と可視化は、分析が伝達になる瞬間です。READMEに1枚のグラフは、50行のコード以上のことを雇用主に伝えます。",
      objectives: [
        "groupbyでデータをグループ化し、集計できる。",
        "日付を日付として扱い、週次・月次にリサンプルできる。",
        "matplotlibで基本的な折れ線グラフを作り、PNGで保存できる。",
      ],
      topics: [
        "groupby() と mean/sum/count",
        "ソートと nlargest",
        "to_datetime と日付パーツ（月、曜日）",
        "resample — 週次・月次ビュー",
        "matplotlib：plot、タイトル、ラベル、savefig",
      ],
      project: {
        title: "market-report.py",
        description:
          "USD/JPYの月次集計とグラフ — これは卒業プロジェクトへと育ちます。",
        steps: [
          "全データのUSD/JPY月次平均を計算する。",
          "30日移動平均を計算し、列として追加する。",
          "日次レートと移動平均を1枚のグラフにプロットし、usd_jpy.png として保存。",
          "グラフをリポジトリのREADMEに載せる（そう、READMEにも画像は使えます）。",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas（レッスン4〜6）",
          url: "https://www.kaggle.com/learn/pandas",
        },
        {
          title: "Kaggle Learn — Data Visualization",
          url: "https://www.kaggle.com/learn/data-visualization",
        },
      ],
    },
    {
      slug: "10-sql",
      title: "SQLとSQLite：データを正しく保存する",
      phase: "data",
      why: "CSVは小さい用途には十分ですが、企業が実際に動かしているのはデータベースです。SQLはキャリアの中で最も長持ちするスキル — 決して古くなりません。",
      objectives: [
        "SELECT、WHERE、GROUP BY、ORDER BY を自信を持って書ける。",
        "PythonからSQLiteデータベースを作り、データをロードできる。",
        "パラメータ化クエリで取り出す（文字列連結は絶対にしない）。",
      ],
      topics: [
        "SELECT / WHERE / ORDER BY / LIMIT",
        "集計：SUM、COUNT、AVG、MIN、MAX と GROUP BY",
        "JOIN（内部、左）— どちらが正しいかの判断",
        "sqlite3モジュール：connect、execute、commit",
        "パラメータ化クエリ — ? が重要な理由（SQLインジェクション）",
      ],
      project: {
        title: "fx-db.py + queries.sql",
        description: "あなたの rates.csv が本物のデータベースになります。",
        steps: [
          "rates テーブルを持つ rates.db（SQLite）を作り、CSVの履歴をロードする。",
          "6つのクエリを queries.sql に保存：月次平均、min/maxの日、最大の日次変動、前月比変化、月ごとの件数、小さな currencies テーブルとのJOIN。",
          "Pythonの sqlite3 からクエリを再実行し、結果をCSVで保存する。",
        ],
      },
      resources: [
        {
          title: "SQLBolt — レッスン1〜12",
          url: "https://sqlbolt.com/",
          note: "対話型で速い。全レッスンを修了する。",
        },
        {
          title: "Mode — SQL Basic + Intermediate",
          url: "https://mode.com/sql-tutorial/",
          note: "Advancedは省略。SQLBoltの復習に使う。",
        },
        {
          title: "Kaggle Learn — Intro to SQL",
          url: "https://www.kaggle.com/learn/intro-to-sql",
        },
      ],
    },
    {
      slug: "11-capstone-1",
      title: "卒業プロジェクト I：マーケットデータパイプライン",
      phase: "capstone",
      why: "すべてを組み立てる週です：取得 → クレンジング → 保存 → 分析 → レポート。これは本物の、正直なデータパイプラインです — 小さいけれど、企業が使うのと同じ形をしています。",
      objectives: [
        "APIからデータベース、レポートまでを1本のスクリプトパイプラインで構築できる。",
        "再実行してもデータが重複しない（冪等性）ようにできる。",
        "初見の他人が実行できるほど良いREADMEを書ける。",
      ],
      topics: [
        "パイプライン構成：fetch.py、transform.py、load.py、または整理された1本のスクリプト",
        "冪等性：UPSERT / ON CONFLICT、または日付範囲での削除＆再ロード",
        "設定：パスや設定は先頭に、途中に埋め込まない",
        "コマンド1つで全体を実行する",
      ],
      project: {
        title: "market-pipeline",
        description:
          "あなたの旗艦リポジトリ：完全で再実行可能な為替データパイプライン。",
        steps: [
          "明確なフォルダ構成で market-pipeline リポジトリを作る。",
          "パイプライン：USD/JPY + EUR/JPY 履歴を取得（Frankfurter）→ pandasでクレンジング → SQLiteに保存 → 月次集計 + 移動平均 → グラフPNG + report.txt。",
          "2回続けて再実行する — 重複行がないことを証明する。",
          "README：何をするか、実行方法（venv、pip install、コマンド1つ）、出力サンプル、グラフ。",
        ],
      },
      resources: [
        {
          title: "SQLite — UPSERTドキュメント",
          url: "https://www.sqlite.org/lang_UPSERT.html",
        },
        {
          title: "Make a README — ガイド",
          url: "https://www.makeareadme.com/",
        },
      ],
    },
    {
      slug: "12-capstone-2-portfolio",
      title: "卒業プロジェクト II：公開とポートフォリオ",
      phase: "capstone",
      why: "面接画面でコードを読む人はいません — みんなリンクをクリックします。今週は、あなたの成果を1クリックで届くようにして、努力ではなく成果を語る言葉で書き表します。",
      objectives: [
        "グラフと主要数値を載せた公開ページをデプロイできる。",
        "GitHubプロフィールを、採用担当者が30秒で理解できるポートフォリオに変えられる。",
        "各プロジェクトを成果ベースの2〜3行の箇条書きで説明できる。",
      ],
      topics: [
        "パイプラインからシンプルな report.html を生成する（テンプレート + グラフ画像）",
        "静的ページのデプロイ：GitHub Pages（またはメンターと一緒にVercel）",
        "プロフィールREADMEとピン留めリポジトリ",
        "応募用のプロジェクトの書き方（日本：履歴書・職務経歴書、LinkedIn）",
      ],
      project: {
        title: "公開する",
        description:
          "稼働するURL、磨かれたプロフィール、応募準備のできたプロジェクト説明。",
        steps: [
          "market-pipeline から report.html を生成する（グラフ + 月次サマリーテーブル）。",
          "GitHub Pages でデプロイする — スマホでも開ける公開URLを1つ。",
          "プロフィールREADME：自分は誰か、何を学んでいるか、リポジトリとライブレポートへのリンク。",
          "一番良い4リポジトリをピン留めする。各2〜3行：何をするか、何を学んだか、次は何か。",
          "すべてをメンターに見せる — フィードバックをもらい、一度改善する。",
        ],
      },
      resources: [
        {
          title: "GitHub Pages — ドキュメント",
          url: "https://docs.github.com/ja/pages/quickstart",
        },
        {
          title: "GitHub — プロフィールREADMEガイド",
          url: "https://docs.github.com/ja/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
        },
      ],
    },
  ],
};
