import type { Guide } from "../types";

export const guideGitJa: Guide = {
  slug: "git",
  title: "Git & GitHubを、一歩ずつ",
  intro:
    "このガイドは第2週に対応します。Gitには怖いという評判があります — が、違います。フォルダのためのタイムマシンです：名前付きのスナップショット（コミット）を撮って、いつでもそこに戻れます。GitHubはそのスナップショットが公開される場所です。レッスンを読み、シミュレーターで init → status → add → commit → log → remote → push の旅を全部練習し、クイズで確認してください。",
  week: "02-git-github",
  sections: [
    {
      heading: "1. Gitとは実際何か",
      body: "Gitはフォルダのためのタイムマシンです。いつでも全ファイルのスナップショットを撮り、名前とメッセージを付けられます — それがコミットです。履歴はいつでも見られ、どの時点にも戻れ、うっかり失われるものはありません。企業が使う理由はもう1つ：多くの人が同じファイルを踏み合わずに編集できるから。今はソロ部分だけで十分です：仕事をチェックポイントし、明確なメッセージを付ける。それだけです。",
      examples: [
        {
          label: "すべてのアイデア",
          cmd: "作業フォルダ --git commit--> スナップショット、永遠に",
          note: "コミット＝名前付きチェックポイント。Gitの80%はこれです。",
        },
      ],
    },
    {
      heading: "2. git init — フォルダをリポジトリにする",
      body: "普通のフォルダは、中で git init を実行した瞬間にGitリポジトリ（リポジトリ）になります。Gitは隠しフォルダ .git を作り、そこに履歴を全部保存します — 触ることはありませんが、フォルダは監視されるようになりました。重要な習慣：git init はプロジェクトフォルダの中で、ホームではなく。間違った場所で実行したら、隠し .git フォルダを消せば普通のフォルダに戻ります。",
      examples: [
        {
          label: "両方",
          cmd: "cd learning-log && git init",
          output: "Initialized empty Git repository in ~/learning-log/.git/",
        },
      ],
    },
    {
      heading: "3. git status — 新しい親友",
      body: "git status はGitに調子を尋ねるコマンドで、必ず正直に答えてくれます。3種類のことを教えてくれます：untracked（Gitが見たことのないファイル）、modified（Gitは知っているが、最後のコミット以降に変わったファイル）、staged（コミット準備完了のファイル）。次に何をすべきか分からなければ：git status。迷ったら：git status。プロでも絶えず実行します — status は何度打っても打ちすぎということはありません。",
      examples: [
        {
          label: "両方",
          cmd: "git status",
          output:
            "On branch main\nUntracked files:\n\treadme.md\n\nnothing added to commit but untracked files present",
        },
      ],
    },
    {
      heading: "4. git add — 待合室",
      body: "ファイルがコミットできる前に、ステージングエリアという待合室に入ります。git add readme.md は1ファイルを、git add . はこのフォルダのすべてをステージします。なぜ待合室が要るのか？コミットに含めるものを自分で選べるようにです。あなたのレベルでは git add . で大体大丈夫 — ですが先に git status を見て「すべて」が何を意味するか把握しましょう。",
      examples: [
        {
          label: "両方",
          cmd: "git add readme.md",
          note: "1ファイルを待合室へ。",
        },
        {
          label: "両方",
          cmd: "git add .",
          note: "このフォルダのすべて。先に git status を。",
        },
      ],
    },
    {
      heading: "5. git commit -m — スナップショットを撮る",
      body: 'git commit -m "add first script" はスナップショットを撮り、あなたの名前、日付、メッセージとともに永遠に保存します。メッセージは大事です：未来の自分のために書きます。良いメッセージは1行でそのコミットが何をするかを言います："add yen-converter script"。「update」や「いろいろ」ではダメ。新しいマシンで初めてコミットすると、Gitはあなたが誰か尋ねます — それがアイデンティティエラーで、次のセクションで解決します。',
      examples: [
        {
          label: "両方",
          cmd: 'git commit -m "add readme"',
          output: "[main (root-commit) 9f2a1bc] add readme\n 1 file changed",
        },
        {
          label: "初回のアイデンティティエラー（全員が遭遇）",
          cmd: 'git commit -m "add readme"',
          output:
            '*** Please tell me who you are.\nRun\n  git config --global user.name "Your Name"\n  git config --global user.email "you@example.com"',
          note: "失敗ではありません — Gitは仕事にあなたの名前が要るだけ。2つのコマンドを一度だけ実行すれば、以後ずっと解決です。",
        },
      ],
    },
    {
      heading: "6. git log — 自分の履歴を読む",
      body: "git log は新しい順にすべてのコミットを表示します：短いID（ハッシュ）、作者、日付、あなたのメッセージ。ハッシュはコミットのID番号です — 後でタイムトラベル（checkout、revert）に使いますが、今は見分けられれば十分です。履歴が物語のように読める — 「add readme」「add converter」「fix rounding」— 未来の自分も雇用主も感謝します。",
      examples: [
        {
          label: "両方",
          cmd: "git log",
          output:
            "commit 9f2a1bc (HEAD -> main)\nAuthor: you <you@example.com>\n    add readme",
        },
      ],
    },
    {
      heading: "7. ファイルのいる3つの場所",
      body: "リポジトリ内のすべてのファイルは3つの場所のどれかにいます：作業ディレクトリ（普通のフォルダ、編集する場所）、ステージングエリア（git add の後の待合室）、リポジトリ（git commit の後の永遠の履歴）。編集 → add → commit がキャリアで何千回も繰り返すループです。何か変だと感じたら自問しましょう：このファイルは今、3つのうちどこにいる？git status がまさにそれに答えます。",
      examples: [
        {
          label: "ループ",
          cmd: "編集 --> git add --> git commit --> 繰り返し",
          note: "作業ディレクトリ → ステージングエリア → リポジトリ。そしてまた。",
        },
      ],
    },
    {
      heading: "8. コミット後にファイルを変える",
      body: "全員が混乱する部分です：コミットは一度きりの儀式ではありません。ファイルを変えるとGitはそれを modified と見なし、また git add して、またコミットします。2つのコミットが履歴に並び、何も上書きされません。経験則：意味のある変更ごとに1コミット、その前に git status を実行してスナップショットに何が入るか常に把握。",
      examples: [
        {
          label: "両方",
          cmd: 'echo day 2 >> readme.md && git add readme.md && git commit -m "day 2"',
          output: "[main 4d7e2fa] day 2\n 1 file changed",
        },
      ],
    },
    {
      heading: "9. git remote add + git push — 公開する",
      body: "ここまでのすべては自分のマシン内だけの話です。リモートはリポジトリのコピーが別の場所 — 普通はGitHub — に住んでいるものです。git remote add origin <url> でローカルリポジトリとGitHubのリポジトリを接続します（originは「メインのリモート」の伝統的な名前です）。そして git push がコミットをGitHubへアップロードします。最初のpushは git push -u origin main — -u が接続を覚えてくれて、以後は git push だけで済みます。このpushの瞬間こそ、仕事が公開ポートフォリオの一部になる瞬間です。",
      examples: [
        {
          label: "両方",
          cmd: "git remote add origin https://github.com/you/learning-log.git",
          note: "ローカルリポジトリとGitHubを接続。originは伝統的な名前。",
        },
        {
          label: "初回のみ",
          cmd: "git push -u origin main",
          output: "Enumerating objects: 3, done.\nTo https://github.com/you/learning-log.git\n * [new branch] main -> main",
          note: "最初の -u push の後は、単なる git push でOK。",
        },
      ],
    },
    {
      heading: "10. .gitignore — GitHubに絶対行ってはいけないもの",
      body: "コミットしてはいけないファイルがあります：パスワードやAPIキー（.envファイル）、ゴミフォルダ（node_modules、.venv、__pycache__）、巨大なデータファイル。リポジトリのルートに .gitignore ファイルを置いてそれらを列挙すると、Gitは存在しないものとして無視します。GitHubはデフォルトで公開です — そこにpushされたAPIキーは流出です。ボットが数分で見つけ、後でファイルを消しても履歴には残ります。最初のpushの前に：.gitignore を書く。",
      examples: [
        {
          label: ".gitignore ファイルの中身",
          cmd: ".env\n.venv/\n__pycache__/\nnode_modules/",
          note: "1行に1パターン。Gitはこれらをすべて無視します。",
        },
      ],
    },
    {
      heading: "11. うまくいかないとき — 定番のエラー",
      body: "'fatal: not a git repository' — リポジトリの外でgitコマンドを実行しました：プロジェクトフォルダに cd から。'nothing to commit, working tree clean' — すべてコミット済み：エラーではなく情報。'fatal: pathspec did not match any files' — 存在しない名前で git add しました：ls で名前を確認。'Please tell me who you are' — 5節のアイデンティティエラー：git config を2つ、マシンごとに一度。'push rejected' — GitHub側にあなたにないコミットがあります（他の人がpushした、またはサイト上で編集した）：force系のコマンドの前にメンターに相談。Gitの失敗の黄金則：ほぼ何も本当に失われることはなく、パニックコマンド（reset --hard、push --force）は失敗そのものより多くの被害を出します。",
      examples: [
        {
          label: "リポジトリの外で",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "プロジェクトフォルダに入ってから。Gitはリポジトリ内でしか動きません。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Gitループ — クイックリファレンス",
    rows: [
      { action: "フォルダをリポジトリに", win: "git init", linux: "git init" },
      { action: "状況を見る", win: "git status", linux: "git status" },
      { action: "1ファイルをステージ", win: "git add readme.md", linux: "git add readme.md" },
      { action: "すべてをステージ", win: "git add .", linux: "git add ." },
      { action: "スナップショットを撮る", win: 'git commit -m "message"', linux: 'git commit -m "message"' },
      { action: "履歴を読む", win: "git log", linux: "git log" },
      { action: "身元設定（一度だけ）", win: 'git config --global user.name "Your Name"', linux: 'git config --global user.name "Your Name"' },
      { action: "GitHubと接続", win: "git remote add origin <url>", linux: "git remote add origin <url>" },
      { action: "公開（初回）", win: "git push -u origin main", linux: "git push -u origin main" },
      { action: "公開（2回目以降）", win: "git push", linux: "git push" },
    ],
  },
  missions: [
    {
      id: "g1",
      prompt: "learning-log というフォルダを作り、中に入ってください。",
      hint: "mkdir learning-log、そして cd learning-log",
    },
    {
      id: "g2",
      prompt: "learning-log をGitリポジトリにしてください。",
      hint: "git init — learning-log の中で実行すること、ホームではなく。間違えたらリセットボタンを。",
    },
    {
      id: "g3",
      prompt: "learning-log の中に何か書いた readme.md を作ってください。",
      hint: "echo learning log > readme.md",
    },
    {
      id: "g4",
      prompt: "Gitに調子を尋ねてください — readme.md が untracked と出るはずです。",
      hint: "git status",
    },
    {
      id: "g5",
      prompt: "readme.md をコミット準備完了にしてください。",
      hint: "git add readme.md — または git add .",
    },
    {
      id: "g6",
      prompt: "最初のスナップショットを撮ってください — 明確なメッセージ付きでコミット。",
      hint: 'git commit -m "add readme" — Gitが誰か尋ねたら：git config --global user.name "Your Name" と git config --global user.email "you@example.com" を実行して、もう一度コミット',
    },
    {
      id: "g7",
      prompt: "readme.md を好きなように変えて、もう一度コミットしてください。",
      hint: 'echo day 2 >> readme.md、そして git add readme.md と git commit -m "day 2"',
    },
    {
      id: "g8",
      prompt: "GitHubのリモートを接続して、仕事をpushしてください。",
      hint: "git remote add origin https://github.com/you/learning-log.git、そして git push -u origin main",
    },
  ],
  quiz: [
    {
      q: "コミットとは実際何ですか？",
      options: [
        "コンピューター全体のバックアップ",
        "履歴に永遠に残る、名前付きのファイルのスナップショット",
        "GitHubに送るメッセージ",
        "ファイルのコピー",
      ],
      answer: 1,
      why: "コミットとは、名前（ハッシュ）・メッセージ・作者・日付付きのスナップショットで、履歴に永遠に保存されます。",
    },
    {
      q: "untracked / modified / staged を教えてくれるコマンドは？",
      options: ["git log", "git commit", "git status", "git push"],
      answer: 2,
      why: "git status は「今どうなってるか」への正直な答えです — プロでも絶えず実行します。",
    },
    {
      q: "git add は実際何をしますか？",
      options: [
        "GitHubにファイルをアップロードする",
        "ファイルを永遠に保存する",
        "変更をステージングエリア — 次のコミットの待合室 — に移す",
        "新しいフォルダを作る",
      ],
      answer: 2,
      why: "ステージ＝「次のコミットに入れる準備完了」。git commit するまでは何も永遠になりません。",
    },
    {
      q: "git commit を実行したら 'nothing to commit, working tree clean' と出た。なぜ？",
      options: [
        "Gitが壊れている",
        "ファイルを作り忘れた",
        "最後のコミット以降にステージされた変更がない — エラーではなく情報",
        "先にpushしないといけない",
      ],
      answer: 2,
      why: "'working tree clean' はすべてコミット済みという意味。Gitで一番優しいメッセージの1つです。",
    },
    {
      q: "新しいマシンで最初のコミットが 'Please tell me who you are' で失敗。何が足りない？",
      options: [
        "GitHubアカウント",
        "git config --global user.name と user.email",
        "git push",
        ".gitignore ファイル",
      ],
      answer: 1,
      why: "Gitは仕事にあなたの名前が要ります。config を2つ、マシンごとに一度だけ。以後尋ねられません。",
    },
    {
      q: "origin とは何ですか？",
      options: [
        "最初のコミットのこと",
        "メインのリモート — 普通はGitHub上のリポジトリのコピー — の伝統的な名前",
        "Gitの管理者アカウント",
        "メインブランチ",
      ],
      answer: 1,
      why: "origin はpush先のリモートに付けられる慣習的な名前です。何でも名付けられますが、みんな origin と呼びます。",
    },
    {
      q: "git push は何をしますか？",
      options: [
        "GitHubからコミットをダウンロードする",
        "プロジェクトをインターネットにインストールする",
        "コミットをリモート（GitHub）にアップロードする",
        "新しいブランチを作る",
      ],
      answer: 2,
      why: "pushはローカルのコミットをGitHubにアップロードします — 仕事が公開ポートフォリオになる瞬間です。",
    },
    {
      q: "公開リポジトリに絶対コミットしてはいけないのは？",
      options: [
        "README.md",
        "APIキーやパスワード入りの .env ファイル",
        "Pythonスクリプト",
        "メモ",
      ],
      answer: 1,
      why: "GitHubにpushされた秘密は流出です — ボットが数分で見つけ、削除しても履歴に残ります。.gitignore はまさにこのためにあります。",
    },
    {
      q: "コミットメッセージがそれほど大事な理由は？",
      options: [
        "GitHubが完璧な文法を要求するから",
        "未来の自分と同僚が、何が・なぜ変わったかを履歴から読むから",
        "長いメッセージの方がコミットが速いから",
        "大事ではない — コードだけが大事だから",
      ],
      answer: 1,
      why: "履歴は一度書いて何度も読まれる物語です。「add yen-converter script」vs「update」— 6ヶ月後に役立つのはどちらか。",
    },
    {
      q: "コミット後にファイルを編集しました。どうなりますか？",
      options: [
        "古いコミットが上書きされる",
        "何も起きない — ファイルは一度しかコミットできない",
        "Gitはmodifiedと見なす。git add してもう一度コミット — 履歴に2つのコミット",
        "ファイルを消して最初からやり直す必要がある",
      ],
      answer: 2,
      why: "編集 → add → commit は儀式でなくループ。履歴はすべての版を保持し、何も上書きされません。",
    },
  ],
  outro:
    "シミュレーターは第2週のプロジェクトと同じ旅を案内しました：フォルダ → リポジトリ → readme → コミット → GitHub。ヒントを見ないでもう一度最初からやってみてください — init/add/commit/push が指から自然に出てきたら、本番のGitHubでやる準備はできています。迷ったらいつでも：git status。",
};
