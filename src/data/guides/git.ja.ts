import type { Guide } from "../types";

export const guideGitJa: Guide = {
  slug: "git",
  title: "Git & GitHubを、一歩ずつ",
  intro:
    "このガイドは第2週に対応します。Gitには怖いという評判があります — が、違います。フォルダのためのタイムマシンです：名前付きのスナップショット（コミット）を撮って、いつでもそこに戻れます。GitHubはそのスナップショットが公開される場所です。レッスンを読み、シミュレーターで init → status → add → commit → log → remote → push の旅を全部練習し、クイズで確認し、そして10〜14節で本番への架け橋 — GitHubアカウントの作成とコンピューターの接続 — をクリックごとにたどってください。",
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
      heading: "10. GitHubアカウントを作る — クリックごとの手順",
      body: "ここまではすべて自分のマシン上の話でした。実際にpushする前にGitHubアカウントが必要です — そして選ぶユーザー名が公開の職業上のアイデンティティになるので、ほとんどの人が払うより丁寧な注意を払う価値があります。所要時間：約15分、クリックごとに。",
      steps: [
        {
          title: "github.com を開き Sign up をクリック",
          detail:
            "どのブラウザでも。右上の緑のボタン。登録フォームは順に3つ尋ねます：メール、パスワード、ユーザー名。",
        },
        {
          title: "メール：何年も使い続けるものを",
          detail:
            "このメールはpushするすべてのコミットに表示されます — 雇用主に見えます。GmailでOK。会社のメールは避けて：仕事が変わると消え、そのコミットは会社の所有物になります。",
        },
        {
          title: "パスワード：長く、GitHub専用に",
          detail:
            "パスワードマネージャーがあれば助けになります。まだなければ、短い文字の羅列より長い文章型の方が強いです。",
        },
        {
          title: "ユーザー名：これが職業上のアイデンティティ — 打つ前に考える",
          detail:
            "プロフィールURLは github.com/ユーザー名 になり、履歴書や応募書類に載ります。firstname-lastname の形が完璧です。ゲーマー名・アニメ名・不要な数字は避けて — 日本の採用担当者がクリックする名前です。",
        },
        {
          title: "パズルを解いて Create account をクリック",
          detail:
            "キャプチャ、時々小さいクイズ。その後GitHubからメールに認証コードが届きます。",
        },
        {
          title: "メールを開いてコードを貼り付け",
          detail:
            "1分以内に届かなければ迷惑メールフォルダを確認。コードはすぐ期限切れになります — 切れたら新しいのを要求すればいいだけです。",
        },
        {
          title: "パーソナライズの質問に答える（またはスキップ）",
          detail:
            "GitHubは経験と目標について尋ねます。正直に答えるとダッシュボードのおすすめが良くなりますが、スキップでも構いません。",
        },
        {
          title: "Freeプランを選ぶ",
          detail:
            "公開ポートフォリオにはFreeで十分：公開リポジトリは無制限です。クレジットカードはどこにも入れないでください。",
        },
        {
          title: "2要素認証（2FA）を設定 — GitHubが必須にしています",
          detail:
            "まずスマホに認証アプリを入れます（Microsoft Authenticator か Google Authenticator、どちらも無料）。それから 'Use an authenticator app' を選び、QRコードをアプリでスキャンし、表示された6桁のコードを入力。SMSでも機能しますが、アプリの方が安全で圏外でも使えます。",
        },
        {
          title: "リカバリーコードを保存 — マジで、このステップ",
          detail:
            "GitHubが16個の1回限りコードを表示します。ファイルをダウンロードして、そのスマホだけではない安全な場所に保管。スマホを失くしたとき、これらのコードがアカウントに戻る唯一の道です。",
        },
        {
          title: "最小限のプロフィール整備（5分）",
          detail:
            "右上 → アバター → 'Your profile'。顔写真（猫やロゴではなく実際の、感じの良い顔 — 日本の雇用主は特にこれを重視します）、表示名、1行の自己紹介、場所を追加。本格的な整備は第12週 — 写真だけ今日やる価値があります。",
        },
      ],
    },
    {
      heading: "11. GitHubに learning-log リポジトリを作る",
      body: "所要2分、クリックごとに — そして避けるべき罠が1つ。目標：次のセクションでローカルの learning-log が接続する、GitHub上の空のリポジトリ。",
      steps: [
        {
          title: "右上の + をクリック → 'New repository'",
          detail: "または github.com/new に直接行く。",
        },
        {
          title: "Repository name: learning-log",
          detail:
            "ローカルのフォルダ名と完全に一致させるのは慣習であって必須ではありません — でも一致している方が正気を保てます。",
        },
        {
          title: "Description（任意）：正直な1行",
          detail:
            "例：'My study log — Python, scripting, and data engineering'。採用担当者は何もクリックする前にこれを読みます。",
        },
        {
          title: "Public を選ぶ",
          detail:
            "Public こそが要点です：これがポートフォリオ。見えない雇用主は採用できません。（秘密は公開リポジトリには絶対に入れない — それが2つ下の .gitignore の仕事です。）",
        },
        {
          title: "'Add a README file' にはチェックを入れない — これが罠",
          detail:
            "GitHubがREADMEを作ると、最初のpushは拒否されます（'remote contains work you do not have locally'）— GitHub側にあなたにないコミットができるからです。リポジトリは生まれたままの空に。あなたには自分のREADMEが既に手元にあります。",
        },
        {
          title: "'Create repository' をクリック",
          detail:
            "GitHubが状況に合ったコマンドを表示するページを出します — '…or push an existing repository from the command line' の下。この2行が文字通りあなたの remote add と push コマンドです。GitHubが書いてくれる — 暗記する必要はありません。",
        },
      ],
      examples: [
        {
          label: "リポジトリ作成後にGitHubが表示する2行",
          cmd: "git remote add origin https://github.com/you/learning-log.git\ngit push -u origin main",
          note: "ページからコピーして — ユーザー名とリポジトリ名でカスタマイズ済みです。",
        },
      ],
    },
    {
      heading: "12. コンピューターを接続 — Windows",
      body: "まず重要な現実：2021年8月13日以降、GitHubは git push にアカウントのパスワードを受け付けません。git にGitHubのパスワードを打つ時代は終わりました。Windowsでは、架け橋は Git Credential Manager — 最初のpushでブラウザが開き、一度ログインすればマシンがずっと覚えています。",
      steps: [
        {
          title: "Git for Windows をインストール（まだなら）",
          detail:
            "git-scm.com/download/win からダウンロードして実行。インストーラーには約10画面のオプションがありますが — デフォルトはすべて問題なし。'Git Credential Manager' にチェックが入ったままに（デフォルトで入っています）。終わるまでNext。",
        },
        {
          title: "インストール後に新しいターミナルを開く",
          detail:
            "git を認識させるにはPowerShellを開き直す必要があります。git --version と打つ — 数字で答えたらOK。",
        },
        {
          title: "Git に自分が誰か伝える — マシンごとに一度",
          detail:
            'git config --global user.name "Your Name" と git config --global user.email "you@example.com" — GitHubで使ったのと同じメール。これがコミットに名前を刻みます。',
        },
        {
          title: "最初のpushをする — ブラウザウィンドウが開く",
          detail:
            "初めて git push すると、Git Credential Manager が 'Sign in with your browser' へのウィンドウを開きます。それを選ぶ：ブラウザがGitHubを開き、ログインし、Authorize をクリック — ウィンドウが閉じてpushが自動的に続きます。このログインはWindowsに保存される — このマシンでは二度と見ません。",
        },
      ],
      examples: [
        {
          label: "両方（マシンごとに一度）",
          cmd: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
        },
        {
          label: "git が動くか確認",
          cmd: "git --version",
          output: "git version 2.45.0",
        },
      ],
    },
    {
      heading: "13. コンピューターを接続 — Linux、道A：パーソナルアクセストークン",
      body: "Linuxでも同じ現実：アカウントのパスワードはgitに絶対に通りません。正直な道が2つあります。道Aはトークン：速く、HTTPSで機能するが、期限切れがありファイルに保存されます。道B（次のセクション）はSSHキー：10分、永遠に機能、プロの標準 — 意欲があるならBを選んで。どちらの道も git インストール済み（Ubuntu/Debianは sudo apt install git、Fedoraは sudo dnf install git）と git config 2つ完了が前提です。",
      steps: [
        {
          title: "GitHubでトークンを作る",
          detail:
            "右上 → Settings → Developer settings（左下）→ Personal access tokens → Tokens (classic) → Generate new token (classic)。名前は 'my-laptop'、'repo' スコープにチェック、90日間の有効期限、Generate をクリック。",
        },
        {
          title: "今すぐトークンをコピー — 一度しか表示されない",
          detail:
            "ghp_... という文字列。パスワードマネージャーか一時メモにコピー。コピーせずにページを閉じたら：そのトークンを削除してもう一つ作る — 設計上、古いのは永遠に見えなくなります。",
        },
        {
          title: "最初のpush：ユーザー名＝GitHubの名前、パスワード＝トークン",
          detail:
            "git が 'Username for https://github.com' と尋ねたら：GitHubのユーザー名。'Password for https://you@github.com' には：トークンを貼り付け — アカウントのパスワードではない。アカウントのパスワードは2021年に機能しなくなりました。このエラーが初心者の1番の壁です。",
        },
        {
          title: "任意：覚えさせる",
          detail:
            "git config --global credential.helper store — ~/.git-credentials に平文で保存（個人ノートPCなら問題なし）。これ以降pushは尋ねなくなります。",
        },
      ],
      examples: [
        {
          label: "最初のpushでgitが尋ねるもの",
          cmd: "Username for 'https://github.com': you\nPassword for 'https://you@github.com': ghp_paste_the_token_here",
          note: "パスワード欄が欲しいのはトークン。アカウントのパスワードは永遠に不可。",
        },
      ],
    },
    {
      heading: "14. コンピューターを接続 — Linux、道B：SSHキー（一度だけ、永遠に）",
      body: "プロの標準。1組のキー：秘密鍵はマシンに永遠に残り、公開鍵はGitHubに一度貼り付けるだけ。トークンなし、期限切れなし、ブラウザのポップアップなし。新しいマシンを買うたびにこれを繰り返すことになります — 1年後には単なる日課です。",
      steps: [
        {
          title: "キーを生成",
          detail:
            "ssh-keygen -t ed25519 -C \"you@example.com\" — Enter でデフォルトの場所（~/.ssh/id_ed25519）を受け入れ、もう一度 Enter で空のパスフレーズ（個人ノートPCなら問題なし；パスフレーズの方が安全だが再起動ごとに尋ねられます）。",
        },
        {
          title: "公開鍵を表示してコピー",
          detail:
            "cat ~/.ssh/id_ed25519.pub — ssh-ed25519 で始まりメールアドレスで終わる1行。行全体を選択してコピー。秘密鍵（~/.ssh/id_ed25519、.pubなし）はマシンから絶対に出さない — GitHubにも同僚にもどこにも貼らない。",
        },
        {
          title: "GitHubで：Settings → SSH and GPG keys → New SSH key",
          detail:
            "Title: 1年後に自分で分かる名前（'ubuntu-laptop'、'thinkpad'）。Key type は 'Authentication Key' のまま。大きいボックスに公開鍵を貼り付け。Add SSH key をクリック。",
        },
        {
          title: "テストする",
          detail:
            "ssh -T git@github.com — 初回はホストフィンガープリントについて尋ねられるので yes と入力。成功メッセージは 'Hi ユーザー名! You've successfully authenticated, but GitHub does not provide shell access.' これが緑の合図です。",
        },
        {
          title: "リモートにはSSHのURLを使う",
          detail:
            "git remote add origin git@github.com:you/learning-log.git — git@ で始まりコロンがある点に注意。既にHTTPSのremoteを追加済みなら、作り直さず切替：git remote set-url origin git@github.com:you/learning-log.git。",
        },
      ],
      examples: [
        {
          label: "Linux / macOS",
          cmd: "ssh-keygen -t ed25519 -C \"you@example.com\"",
          note: "Enter、Enter — 個人ノートPCならデフォルトでOK。",
        },
        {
          label: "テスト — このメッセージが出たら成功",
          cmd: "ssh -T git@github.com",
          output:
            "Hi you! You've successfully authenticated, but GitHub does not provide shell access.",
        },
        {
          label: "既存のremoteをSSHに切替",
          cmd: "git remote set-url origin git@github.com:you/learning-log.git",
        },
      ],
    },
    {
      heading: "15. .gitignore — GitHubに絶対行ってはいけないもの",
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
      heading: "16. うまくいかないとき — 定番のエラー",
      body: "'fatal: not a git repository' — リポジトリの外でgitコマンドを実行しました：プロジェクトフォルダに cd から。'nothing to commit, working tree clean' — すべてコミット済み：エラーではなく情報。'fatal: pathspec did not match any files' — 存在しない名前で git add しました：ls で名前を確認。'Please tell me who you are' — 5節のアイデンティティエラー：git config を2つ、マシンごとに一度。'Support for password authentication was removed' — あなた（または保存された古いパスワード）がアカウントのパスワードを試しました：Windowsならブラウザログイン（12節）、LinuxならトークンかSSHキー（13〜14節）で解決。'push rejected — remote contains work you do not have locally' — GitHub側のリポジトリが空ではありません（たいてい11節のREADMEの罠）。Gitの失敗の黄金則：ほぼ何も本当に失われることはなく、パニックコマンド（reset --hard、push --force）は失敗そのものより多くの被害を出します — 迷ったらメンターに相談。",
      examples: [
        {
          label: "リポジトリの外で",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "プロジェクトフォルダに入ってから。Gitはリポジトリ内でしか動きません。",
        },
        {
          label: "2021年のパスワードの壁（全員がぶつかる）",
          cmd: "git push",
          output:
            "remote: Support for password authentication was removed on August 13, 2021.\nfatal: Authentication failed for 'https://github.com/...'",
          note: "バグでもあなたのミスでもありません。Windows：ブラウザログインをやり直す。Linux：トークン（道A）かSSHキー（道B）。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Gitループ — クイックリファレンス",
    rows: [
      { action: "フォルダをリポジトリに", command: "git init" },
      { action: "状況を見る", command: "git status" },
      { action: "1ファイルをステージ", command: "git add readme.md" },
      { action: "すべてをステージ", command: "git add ." },
      { action: "スナップショットを撮る", command: 'git commit -m "message"' },
      { action: "履歴を読む", command: "git log" },
      { action: "身元設定（一度だけ）", command: 'git config --global user.name "Your Name"' },
      { action: "GitHubと接続", command: "git remote add origin <url>" },
      { action: "公開（初回）", command: "git push -u origin main" },
      { action: "公開（2回目以降）", command: "git push" },
      { action: "SSH接続をテスト", command: "ssh -T git@github.com" },
      { action: "remoteをSSHに切替", command: "git remote set-url origin git@github.com:you/repo.git" },
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
    "シミュレーターは第2週のプロジェクトと同じ旅を案内しました：フォルダ → リポジトリ → readme → コミット → GitHub。ヒントを見ないでもう一度最初からやってみてください — init/add/commit/push が指から自然に出てきたら、本番の準備はできています。そして10〜14節が最後のステップの本番版です：アカウント、空のリポジトリ、マシンへの一度きりの接続。迷ったらいつでも：git status。",
};
