import type { Guide } from "../types";

export const guideCommandLineJa: Guide = {
  slug: "command-line",
  title: "コマンドラインを、ゆっくり、丁寧に",
  intro:
    "このガイドは第1週で一番難しいテーマを、ゆっくり掘り下げます：ターミナルとは何か、各コマンドが実際に何をするか、WindowsとLinuxの違い、そして一番大事な「使っている感覚」。本物のターミナルを開いたまま読み、その後シミュレーターで練習し、クイズで確認してください。",
  sections: [
    {
      heading: "1. ターミナルとは実際何か",
      body: "ターミナルは、アイコンをクリックする代わりにコマンドを打ち込んでコンピューターと対話するテキスト窓です。応答してくれるプログラムをシェルと呼びます。WindowsのデフォルトシェルはPowerShellで、プロンプトは PS C:\\Users\\you> の形。Linux（とmacOS）ではbashが基本で、プロンプトは通常 $ で終わります。本カリキュラムの内容は両方で動きます — 考え方は同じで、コマンド名の一部だけが違います。コマンドは暗記するものではありません。「解決策が存在する」と覚えて、必要な時に調べます。",
      examples: [
        {
          label: "Windows（PowerShell）",
          cmd: "PS C:\\Users\\you>",
          note: "プロンプト：今いる場所を示します。> の後ろに入力します。",
        },
        {
          label: "Linux / macOS（bash）",
          cmd: "you@laptop:~$",
          note: "同じ仕組み：プロンプト → コマンド → Enter。",
        },
      ],
    },
    {
      heading: "2. 今どこにいる？ — pwd",
      body: "ターミナルのセッションには必ずカレントディレクトリ（作業フォルダ）があります：コマンドが作用する場所です。pwd（print working directory）は今どこにいるかを尋ねるコマンドです。PowerShellでも pwd は使えます — Get-Location の別名です。迷ったらとりあえず pwd：無料で、決して間違いません。",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "pwd",
          output: "/home/you",
        },
        {
          label: "Windows（PowerShell）",
          cmd: "pwd",
          output: "C:\\Users\\you",
        },
      ],
    },
    {
      heading: "3. 見て回る — ls / dir",
      body: "ls（list）は今のフォルダの中身を表示します。ls -a は隠しファイル（ドットから始まるファイル）も表示し、ls -l は詳細（権限、サイズ、日付）を表示します。PowerShellでは ls は Get-ChildItem の別名として動きますが、古典的なWindowsコマンドは dir です — どちらでも構いません。色に意味がある場合もあります：フォルダは青、実行ファイルは緑、普通のファイルは白やグレー。",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "ls",
          output: "projects  notes.txt",
        },
        {
          label: "Linux / macOS",
          cmd: "ls -a",
          output: ".  ..  .bashrc  projects  notes.txt",
        },
        {
          label: "Windows（PowerShell）",
          cmd: "dir",
          output: "projects  notes.txt",
        },
      ],
    },
    {
      heading: "4. パス — コンピューターの地図",
      body: "パスはファイルやフォルダの住所です。絶対パスはディスクの最上位（ルート）から始まり、どこからでも機能します：Linuxなら /home/you/projects、Windowsなら C:\\Users\\you\\projects。相対パスは今いる場所から始まります：/home/you の中にいるなら projects と書くだけで同じフォルダを指します。どこでも使える3つのショートカットがあります：~ はホームフォルダ、. は今いる場所、.. は1つ上のフォルダ。Linuxは名前の区切りに / 、Windowsは \\ を使います — これが主な違いで、1日で慣れます。",
      examples: [
        {
          label: "両方",
          cmd: "cd ~",
          note: "どこからでも一発でホームフォルダへ。",
        },
        {
          label: "両方",
          cmd: "cd ..",
          note: "1つ上のフォルダへ。",
        },
        {
          label: "Linux / macOS",
          cmd: "cd /home/you/projects",
          note: "絶対パス — ルートの / から始まります。",
        },
      ],
    },
    {
      heading: "5. 移動 — cd",
      body: "cd（change directory）が移動のコマンドです。引数を1つ取ります：行き先のフォルダ。cd projects と打てば、今のフォルダの中にある projects に入ります。cd .. は1階層上へ。何も付けずに cd だけ打つとホームに戻ります。'No such file or directory' というエラーが出たら、ほぼ常にフォルダ名のタイプミスです — まず ls で確認しましょう。",
      examples: [
        {
          label: "両方",
          cmd: "cd projects",
          note: "projects フォルダに入る。",
        },
        {
          label: "両方",
          cmd: "cd ..",
          note: "1つ上に戻る。",
        },
        {
          label: "Linux / macOS",
          cmd: "cd",
          note: "引数なし：ホームフォルダへ。",
        },
      ],
    },
    {
      heading: "6. 作る — mkdir と touch",
      body: "mkdir（make directory）はフォルダを作ります。一度に複数も作れます：mkdir data scripts。touch は空のファイルを作ります — 仮置きとして便利です、例：touch notes.txt。PowerShellに touch はありません；相当するのは New-Item notes.txt（短縮形は ni notes.txt）。これらはどれも「本当によろしいですか？」と聞いてきません — ターミナルはあなたを信頼しています。",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "mkdir data scripts",
          note: "フォルダを2つ同時に作る。",
        },
        {
          label: "Linux / macOS",
          cmd: "touch notes.txt",
          note: "空のファイルを作る。",
        },
        {
          label: "Windows（PowerShell）",
          cmd: "New-Item notes.txt",
          note: "PowerShellでの空ファイル作成。",
        },
      ],
    },
    {
      heading: "7. 読む — cat / type",
      body: "cat（concatenate）はファイルの中身を画面に出力します。PowerShellでは type が古典的な名前で、cat も動きます。長いファイルには less（Linux）や more（両方）で1ページずつ表示します — q で終了、スペースで次ページ。head -n 5 は最初の5行、tail -n 5 は最後の5行を表示します — 後で大きなCSVファイルを確認するときに非常に役立ちます。",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cat notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Windows（PowerShell）",
          cmd: "type notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Linux / macOS",
          cmd: "head -n 5 rates.csv",
          note: "最初の5行 — データファイルの将来の親友。",
        },
      ],
    },
    {
      heading: "8. 変える — cp、mv、rm",
      body: "cp（copy）はコピーします：cp notes.txt backup.txt。mv（move）は別のフォルダへ移動します — 同じフォルダ内で新しい名前を渡せばリネームです：mv notes.txt day1.txt。rm（remove）は削除します — そしてここがこのガイド全体で唯一の真面目な警告です：rm はごみ箱を使いません。消したものは戻りません。rm の前には必ず ls を一度実行し、何を消そうとしているか確認しましょう。フォルダの場合、rm -r はフォルダと中身すべてを消します — 実行前に3回確認。PowerShellでは Copy-Item、Move-Item、Remove-Item です。",
      examples: [
        {
          label: "Linux（PowerShellでも別名で動作）",
          cmd: "cp notes.txt backup.txt",
          note: "コピーを作る。",
        },
        {
          label: "Linux / macOS",
          cmd: "mv notes.txt day1.txt",
          note: "リネーム：同じフォルダで新しい名前。",
        },
        {
          label: "Linux / macOS",
          cmd: "rm day1.txt",
          note: "削除 — ごみ箱なし。消す前に必ず見る。",
        },
      ],
    },
    {
      heading: "9. 速く働く — プロの習慣",
      body: "プロでもフルネームは打ちません。フォルダ名の途中でTabを押すと補完されます：cd pro<Tab> は cd projects になります。上矢印 ↑ は直前のコマンドを呼び戻します — 押し続ければ履歴を遡れます。Ctrl+C は固まったコマンドを中止します。clear（または Ctrl+L）は画面を掃除します。この4つの習慣だけで、「パソコン歴何年」という多くの人より先へ行けます。",
      examples: [
        {
          label: "両方",
          cmd: "cd pro<Tab>",
          note: "Tab補完：残りはターミナルが打ってくれます。",
        },
        {
          label: "両方",
          cmd: "↑",
          note: "上矢印：直前のコマンドを呼び戻す。",
        },
        {
          label: "両方",
          cmd: "clear",
          note: "画面クリア。Ctrl+L でも。",
        },
      ],
    },
    {
      heading: "10. ターミナルからPythonを実行する",
      body: "これが本カリキュラム全体でターミナルが重要な理由です。python hello.py は「Pythonプログラムを使って、このフォルダの hello.py を実行せよ」という意味です。python --version はPythonのバージョンを教えます。'command not found' や '認識されません' と言われたら、Pythonが正しく入っていません — 第1週のセットアップに戻ってください。これからは必ずターミナルからスクリプトを実行します：本物のツールはそう動くからです。",
      examples: [
        {
          label: "両方",
          cmd: "python --version",
          output: "Python 3.12.0",
        },
        {
          label: "両方",
          cmd: "python hello.py",
          output: "Hello, world!",
        },
      ],
    },
    {
      heading: "11. うまくいかないとき — エラーを読む",
      body: "ターミナルのエラーは敵ではなく、正直な報告です。'command not found'（bash）や 'is not recognized'（PowerShell）：コンピューターが知らない名前を打った — タイプミスか、未インストール。'No such file or directory'：挙げたファイルやフォルダが、思っている場所に存在しない — ls と pwd を実行して確認。'Permission denied'：システムがあなたを守っている — たいてい違う場所にいるか、慎重さが必要です。学習者を伸びる人と苦労する人に分ける習慣は1つ：何かを打つ前に、エラーメッセージを最後まで、声に出して読むこと。",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cd projct",
          output: "bash: cd: projct: No such file or directory",
          note: "スペルミス。ls で本物の名前を確認し、Tab補完で再挑戦。",
        },
        {
          label: "Windows（PowerShell）",
          cmd: "pythn --version",
          output: "pythn : The term 'pythn' is not recognized...",
          note: "同じ教訓：コンピューターは完全一致の名前しか知りません。",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Windows vs Linux — クイックリファレンス",
    rows: [
      { action: "今どこ？", win: "pwd", linux: "pwd" },
      { action: "ファイル一覧", win: "dir / ls", linux: "ls" },
      { action: "フォルダ移動", win: "cd projects", linux: "cd projects" },
      { action: "1つ上へ", win: "cd ..", linux: "cd .." },
      { action: "ホームへ", win: "cd ~", linux: "cd" },
      { action: "フォルダ作成", win: "mkdir data", linux: "mkdir data" },
      { action: "空ファイル作成", win: "New-Item notes.txt", linux: "touch notes.txt" },
      { action: "ファイル表示", win: "type notes.txt", linux: "cat notes.txt" },
      { action: "コピー", win: "Copy-Item a.txt b.txt", linux: "cp a.txt b.txt" },
      { action: "移動 / リネーム", win: "Move-Item a.txt b.txt", linux: "mv a.txt b.txt" },
      { action: "削除", win: "Remove-Item notes.txt", linux: "rm notes.txt" },
      { action: "画面クリア", win: "clear", linux: "clear" },
      { action: "スクリプト実行", win: "python hello.py", linux: "python hello.py" },
    ],
  },
  missions: [
    {
      id: "m1",
      prompt: "今どこにいるか、コンピューターに尋ねてください。",
      hint: "print working directory — 3文字。",
    },
    {
      id: "m2",
      prompt: "今のフォルダの中身をすべて表示してください。",
      hint: "1単語、2文字。",
    },
    {
      id: "m3",
      prompt: "projects フォルダの中に入ってください。",
      hint: "change directory — cd projects",
    },
    {
      id: "m4",
      prompt: "projects の中に data というフォルダを作ってください。",
      hint: "make directory",
    },
    {
      id: "m5",
      prompt: "projects/data の中に scripts というフォルダを作ってください。",
      hint: "まず cd data で入るか、projects の中からパス指定で mkdir data/scripts。",
    },
    {
      id: "m6",
      prompt: "projects/data/scripts に learning log と書かれた notes.txt を作ってください。",
      hint: "まず cd data/scripts で中に入り、echo learning log > notes.txt。または projects 内からパス指定：echo learning log > data/scripts/notes.txt",
    },
    {
      id: "m7",
      prompt: "notes.txt の中身を画面に表示してください。",
      hint: "おなじみ concatenate コマンド。",
    },
    {
      id: "m8",
      prompt: "ホームフォルダ（~）に戻ってください。",
      hint: "cd ~ はどこからでも使えます。または cd ../.. で登る。",
    },
  ],
  quiz: [
    {
      q: "今いるフォルダを教えてくれるコマンドはどれ？",
      options: ["ls", "pwd", "cd", "cat"],
      answer: 1,
      why: "pwd — print working directory。現在地を必ず表示します。",
    },
    {
      q: "cd .. は何をしますか？",
      options: [
        "'..' というフォルダに入る",
        "現在のフォルダを削除する",
        "1つ上の階層へ移動する",
        "前のコマンドに戻る",
      ],
      answer: 2,
      why: ".. は「この1つ上のフォルダ」の意味。cd .. で1階層上へ移動します。",
    },
    {
      q: "data という新しいフォルダを作るコマンドは？",
      options: ["touch data", "mkdir data", "new data", "ls data"],
      answer: 1,
      why: "mkdir — make directory。touch は空ファイルを作るコマンドです。",
    },
    {
      q: "パスの中の ~ は何を意味しますか？",
      options: ["ディスクの最上位", "今のフォルダ", "1つ上のフォルダ", "ホームフォルダ"],
      answer: 3,
      why: "~ はホームフォルダの略記 — 相対パスの基点になります。",
    },
    {
      q: "絶対パスはどれ（Linux）？",
      options: ["projects/data", "./data", "/home/you/projects", "../projects"],
      answer: 2,
      why: "絶対パスはルートの / から始まります — 今どこにいても機能します。",
    },
    {
      q: "rm を使う前の最も安全な行動は？",
      options: [
        "何もしない — rm は確認を求めてくる",
        "まず ls を実行して、消す対象を正確に確認する",
        "cat でファイルを開いてサイズを確認する",
        "先にファイルをリネームする",
      ],
      answer: 1,
      why: "rm はごみ箱を使いません — 消えたら戻りません。まず ls で見るのが最も安い保険の習慣です。",
    },
    {
      q: "cd proj と打っている途中にTabを押すとどうなりますか？",
      options: [
        "ヘルプを提案する",
        "単語を削除する",
        "名前を自動補完する",
        "フォルダを開く",
      ],
      answer: 2,
      why: "Tab補完はフォルダ名・ファイル名を完成させます — 速く、タイポなし。最重要のスピード習慣です。",
    },
    {
      q: "python hello.py を実行して 'python: command not found' 。最も可能性が高い原因は？",
      options: [
        "hello.py にバグがある",
        "違うフォルダにいる",
        "Pythonが未インストールか、PATHに通っていない",
        "ファイルが空",
      ],
      answer: 2,
      why: "コンピューターが python というプログラムを知りません — 正しくインストールされていないかPATHに入っていません。第1週のセットアップを見直しましょう。",
    },
    {
      q: "PowerShellで notes.txt の中身を表示するコマンドは？",
      options: ["type notes.txt", "show notes.txt", "open notes.txt", "read notes.txt"],
      answer: 0,
      why: "type がWindowsの古典コマンドです（最近のPowerShellでは cat も別名で動きます）。",
    },
    {
      q: "なぜこのカリキュラムはエディタの「実行」ボタンではなく、ターミナルからスクリプトを実行させるの？",
      options: [
        "打つ方が速いから",
        "本物のツール・サーバー・自動化はすべてコマンドラインから動くから",
        "エディタのボタンが壊れているから",
        "Pythonがそれを拒否するから",
      ],
      answer: 1,
      why: "サーバー、定期実行、パイプライン、自動化にエディタのボタンはありません。コマンドラインこそ、プログラムが現実に動く場所です。",
    },
  ],
  outro:
    "ミッションをクリアし、クイズのほとんどで正解できたなら、パソコンを何年も使っている多くの人より、もうコンピューターを操れています。第1週の間はこのページを開いておいてください — そして後の週で迷ったらいつでも戻ってきてください：pwd、ls、cd はキャリア全体で繰り返す3つの動作です。",
};
