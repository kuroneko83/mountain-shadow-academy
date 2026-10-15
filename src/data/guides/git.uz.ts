import type { Guide } from "../types";

export const guideGitUz: Guide = {
  slug: "git",
  title: "Git va GitHub — qadam ba qadam",
  intro:
    "Bu qoʻllanma 2-haftaga xizmat qiladi. Git qoʻrqinchli degan obroʻyga ega — asossiz. Bu papkangiz uchun vaqt mashinasi: nomlangan suratlar (commit) olasiz va ularga istagan vaqt qaytasiz. GitHub esa oʻsha suratlar ochiq saqlanadigan joy. Darslikni oʻqing, keyin simulyatorda toʻliq sayohatni — init, status, add, commit, log, remote, push — mashq qiling va testni yeching.",
  week: "02-git-github",
  sections: [
    {
      heading: "1. Git aslida nima",
      body: "Git — papka uchun vaqt mashinasi. Istalgan paytda barcha fayllaringizning suratini olib, unga nom va xabar bera olasiz — oʻsha surat commit deb ataladi. Tarixni istagan payt koʻrasiz, istalgan nuqtaga qaytasiz va hech narsa tasodifan yoʻqolmaydi. Kompaniyalar yana bir sababga koʻra ishlatadi: koʻp odam bir-biriga toʻsqinlik qilmasdan bir xil fayllarda ishlay oladi. Hozircha sizga yakka qismi yetarli: ishingizni tekshiruv nuqtalariga saqlang — tez-tez va aniq xabarlar bilan.",
      examples: [
        {
          label: "Butun gʻoya",
          cmd: "ish papkasi --git commit--> suratlar, abadiy",
          note: "Commit — nomlangan tekshiruv nuqtasi. Gitʼning 80%i shu.",
        },
      ],
    },
    {
      heading: "2. git init — papkani repozitoriyaga aylantirish",
      body: "Oddiy papka, uning ichida git init ni ishga tushirganingiz zahoti Git repozitoriyasiga (repo) aylanadi. Git yashirin .git papkasini yaratadi va butun tarixni shu yerda saqlaydi — uni hech qachon tegmaysiz, lekin papka endi kuzatiladi. Muhim odat: git init ni loyiha papkangizning ICHIDA ishga tushiring, uyda emas. Notoʻgʻri joyda ishga tushirib qoʻysangiz, yashirin .git papkasini oʻchirsangiz oddiy papkaga qaytadi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "cd learning-log && git init",
          output: "Initialized empty Git repository in ~/learning-log/.git/",
        },
      ],
    },
    {
      heading: "3. git status — yangi eng yaqin doʻstingiz",
      body: "git status — Gitga ishlar qanday ketayotganini soʻraydi va u har doim halol javob beradi. Uch xil narsani aytadi: untracked fayllar (Git ularni hech koʻrmagan), modified fayllar (Git biladi, lekin oxirgi commitdan keyin oʻzgargan) va staged fayllar (commitga tayyor). Keyin nima qilishni bilmasangiz: git status. Adashdingizmi: git status. Professionallar uni uzluksiz ishlatadi — status juda koʻp boʻlmaydi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "git status",
          output:
            "On branch main\nUntracked files:\n\treadme.md\n\nnothing added to commit but untracked files present",
        },
      ],
    },
    {
      heading: "4. git add — kutish xonasi",
      body: "Fayl commit qilinishidan oldin staging area deb atalgan kutish xonasiga oʻtadi. git add readme.md bitta faylni, git add . esa joriy papkadagi hamma narsani staged qiladi. Nega kutish xonasi kerak? Commitga nimani kiritishni oʻzingiz tanlash uchun. Sizning darajangizda git add . odatda yetarli — lekin avval git status ni koʻrib, 'hamma narsa' nimani anglatishini bilib oling.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "git add readme.md",
          note: "Bitta fayl kutish xonasiga.",
        },
        {
          label: "Ikkalasi",
          cmd: "git add .",
          note: "Bu papkadagi hamma narsa. Avval git status.",
        },
      ],
    },
    {
      heading: "5. git commit -m — suratni olish",
      body: 'git commit -m "add first script" suratni oladi va ismingiz, sana va xabar bilan abadiy saqlaydi. Xabar muhim: uni kelajakdagi oʻzingiz uchun yozing. Yaxshi xabar bitta qatorda commit nima qilishini aytadi: "add yen-converter script" — "update" yoki "turli narsalar" emas. Yangi mashinada birinchi commitda Git siz kim ekaningizni soʻraydi — bu identifikatsiya xatosi, keyingi boʻlim hal qiladi.',
      examples: [
        {
          label: "Ikkalasi",
          cmd: 'git commit -m "add readme"',
          output: "[main (root-commit) 9f2a1bc] add readme\n 1 file changed",
        },
        {
          label: "Birinchi marta uchraydigan xato (hamma uchraydi)",
          cmd: 'git commit -m "add readme"',
          output:
            '*** Please tell me who you are.\nRun\n  git config --global user.name "Your Name"\n  git config --global user.email "you@example.com"',
          note: "Bu muvaffaqiyatsizlik emas — Git ishga ismingiz kerak deb soʻrayapti. Ikkita buyruqni bir marta bajarsangiz, abadiy hal boʻladi.",
        },
      ],
    },
    {
      heading: "6. git log — oʻz tarixingizni oʻqish",
      body: "git log har bir commitni yangisidan boshlab koʻrsatadi: qisqa ID (hash), muallif, sana va sizning xabaringiz. Hash — commitning ID raqami; keyinchalik vaqt sayohati (checkout, revert) uchun ishlatasiz, hozir faqat tanib olsangiz yetarli. Tarixingiz tushunarli hikoya kabi oʻqilsa — 'add readme', 'add converter', 'fix rounding' — kelajakdagi oʻzingiz va har qanday ish beruvchi minnatdor boʻladi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "git log",
          output:
            "commit 9f2a1bc (HEAD -> main)\nAuthor: you <you@example.com>\n    add readme",
        },
      ],
    },
    {
      heading: "7. Fayl boʻlishi mumkin boʻlgan 3 joy",
      body: "Repodagi har bir fayl uch joyning birida: ishchi papka (oddiy papka, tahrirlaydigan joy), staging area (git add dan keyingi kutish xonasi) va repozitoriya (git commit dan keyingi abadiy tarix). Tahrirlash → add → commit — karyeringizda minglab marta takrorlaydigan tsikl. Biror narsa notoʻgʻri tuyilsa oʻzingizdan soʻrang: bu fayl hozir uch joyning qaysi birida? git status aynan shunga javob beradi.",
      examples: [
        {
          label: "Tsikl",
          cmd: "tahrirlash --> git add --> git commit --> takrorlash",
          note: "Ishchi papka → staging area → repozitoriya. Va yana.",
        },
      ],
    },
    {
      heading: "8. Commitdan keyin faylni oʻzgartirish",
      body: "Hammani chalgʻitadigan qism: commit bir martalik marosim emas. Faylni oʻzgartirasiz, Git uni modified deb koʻradi, yana git add qilasiz va yana commit. Ikki commit tarixda yonma-yon turadi, hech narsa ustidan yozilmaydi. Qoida: maʼnoli oʻzgarishga bitta commit, va har biridan oldin git status ni ishga tushirib, suratga nima kiryotganini bilib oling.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: 'echo day 2 >> readme.md && git add readme.md && git commit -m "day 2"',
          output: "[main 4d7e2fa] day 2\n 1 file changed",
        },
      ],
    },
    {
      heading: "9. git remote add + git push — ochiq boʻlish",
      body: "Hozirgacha hammasi faqat sizning mashinangizda boʻldi. Remote — repozitoriyangizning boshqa joyda, odatda GitHubʼda yashaydigan nusxasi. git remote add origin <url> lokal repogʻa GitHub repomini ulaydi (origin — 'asosiy remotem' ning anʼanaviy nomi). Keyin git commitlarni GitHubʼga yuklaydi. Birinchi push: git push -u origin main — -u ulanishni eslab qoladi, undan keyin oddiy git push yetarli. Aynan shu push lahzasida ishingiz ochiq portfelingizning bir qismiga aylanadi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "git remote add origin https://github.com/you/learning-log.git",
          note: "Likal repozitoriyani GitHubʼga ulash. origin — anʼanaviy nom.",
        },
        {
          label: "Birinchi marta",
          cmd: "git push -u origin main",
          output: "Enumerating objects: 3, done.\nTo https://github.com/you/learning-log.git\n * [new branch] main -> main",
          note: "Birinchi -u pushdan keyin oddiy 'git push' yetarli.",
        },
      ],
    },
    {
      heading: "10. .gitignore — GitHubʼga hech qachon bormaydigan narsalar",
      body: "Baʼzi fayllar hech qachon commit qilinmasligi kerak: parollar va API kalitlar (.env fayllari), keraksiz papkalar (node_modules, .venv, __pycache__), katta data fayllar. Repo ildizidagi .gitignore fayli ularni sanab oʻtadi va Git mavjud emasdek eʼtiborsiz qoldiradi. GitHub standart tarzda ochiq — u yerga push qilingan API kaliti sizib chiqqanlikdir; botlar bir necha daqiqada topadi va keyin faylni oʻchirsangiz ham tarixda qoladi. Birinchi pushdan oldin: .gitignore yozing.",
      examples: [
        {
          label: ".gitignore fayli mazmuni",
          cmd: ".env\n.venv/\n__pycache__/\nnode_modules/",
          note: "Har qatorga bitta andoza. Git endi bularning hammasini eʼtiborsiz qoldiradi.",
        },
      ],
    },
    {
      heading: "11. Yomon ketganda — klassik xatolar",
      body: "'fatal: not a git repository' — git buyrugʻini repodan tashqarida ishga tushirganingiz: avval loyiha papkasiga cd. 'nothing to commit, working tree clean' — hammasi allaqachon commit qilingan: xato emas, maʼlumot. 'fatal: pathspec did not match any files' — mavjud boʻlmagan nom bilan git add: ls bilan nomni tekshiring. 'Please tell me who you are' — 5-boʻlimdagi identifikatsiya xatosi: ikkita git config, mashinaga bir marta. 'push rejected' — GitHub nusxasida sizda yoʻq commitlar bor (boshqa birov push qilgan yoki saytda tahrirlagan): force bilan boshlanadigan buyruqlardan oldin murabbingizdan soʻrang. Git xatolarining oltin qoidasi: haqiqatan yoʻqoladigan narsa deyarli yoʻq, vahima buyruqlari (reset --hard, push --force) oʻzgarishning oʻzidan koʻproq zarar yetkazadi.",
      examples: [
        {
          label: "Repodan tashqarida",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "Loyiha papkasiga kiring. Git faqat repo ichida ishlaydi.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Git tsikli — tezkor jadval",
    rows: [
      { action: "Papkani repoga aylantirish", win: "git init", linux: "git init" },
      { action: "Holatni koʻrish", win: "git status", linux: "git status" },
      { action: "Bitta faylni staged", win: "git add readme.md", linux: "git add readme.md" },
      { action: "Hamasini staged", win: "git add .", linux: "git add ." },
      { action: "Suratni olish", win: 'git commit -m "xabar"', linux: 'git commit -m "xabar"' },
      { action: "Tarixni oʻqish", win: "git log", linux: "git log" },
      { action: "Shaxsni belgilash (bir marta)", win: 'git config --global user.name "Ismingiz"', linux: 'git config --global user.name "Ismingiz"' },
      { action: "GitHubʼga ulash", win: "git remote add origin <url>", linux: "git remote add origin <url>" },
      { action: "Nashr (birinchi marta)", win: "git push -u origin main", linux: "git push -u origin main" },
      { action: "Nashr (keyingi marta)", win: "git push", linux: "git push" },
    ],
  },
  missions: [
    {
      id: "g1",
      prompt: "learning-log nomli papka yarating va ichiga kiring.",
      hint: "mkdir learning-log, keyin cd learning-log",
    },
    {
      id: "g2",
      prompt: "learning-log ni Git repozitoriyasiga aylantiring.",
      hint: "git init — uni learning-log ICHIDA ishga tushiring, uyda emas. Xato joyga ishga tushirib qoʻysangiz, reset tugmasini bosing.",
    },
    {
      id: "g3",
      prompt: "learning-log ichida biror matnli readme.md fayli yarating.",
      hint: "echo learning log > readme.md",
    },
    {
      id: "g4",
      prompt: "Gitga ishlar qanday ketayotganini soʻrang — readme.md untracked koʻrinishi kerak.",
      hint: "git status",
    },
    {
      id: "g5",
      prompt: "readme.md ni commitga tayyor holatga keltiring.",
      hint: "git add readme.md — yoki hamma narsa uchun git add .",
    },
    {
      id: "g6",
      prompt: "Birinchi suratingizni oling — aniq xabar bilan commit qiling.",
      hint: 'git commit -m "add readme" — Git kim ekaningizni soʻrasa: git config --global user.name "Ismingiz" va git config --global user.email "you@example.com", keyin yana commit',
    },
    {
      id: "g7",
      prompt: "readme.md ni xohlagancha oʻzgartiring va yana commit qiling.",
      hint: 'echo day 2 >> readme.md, keyin git add readme.md va git commit -m "day 2"',
    },
    {
      id: "g8",
      prompt: "GitHub remoteni ulaning va ishingizni push qiling.",
      hint: "git remote add origin https://github.com/you/learning-log.git, keyin git push -u origin main",
    },
  ],
  quiz: [
    {
      q: "Commit aslida nima?",
      options: [
        "Butun kompyuteringizning zaxira nusxasi",
        "Tarixda abadiy qoladigan, nomlangan fayl surati",
        "GitHubʼga yuboriladigan xabar",
        "Fayl nusxasi",
      ],
      answer: 1,
      why: "Commit — nom (hash), xabar, ismingiz va sanali surat boʻlib, tarixda abadiy saqlanadi.",
    },
    {
      q: "Qaysi buyruq fayllar untracked, modified yoki staged ekanini aytadi?",
      options: ["git log", "git commit", "git status", "git push"],
      answer: 2,
      why: "git status — 'hozir nima boʻlyapti' savoliga halol javob; professionallar uni uzluksiz ishlatadi.",
    },
    {
      q: "git add aslida nima qiladi?",
      options: [
        "Fayllarni GitHubʼga yuklaydi",
        "Fayllarni abadiy saqlaydi",
        "Oʻzgarishlarni staging area — keyingi commitning kutish xonasi — ga oʻtkazadi",
        "Yangi papka yaratadi",
      ],
      answer: 2,
      why: "Staged — 'keyingi commitga kirishga tayyor' degani. git commit boʻlmaguncha hech narsa abadiy boʻlmaydi.",
    },
    {
      q: "git commit ni ishga tushirsangiz 'nothing to commit, working tree clean' chiqdi. Nega?",
      options: [
        "Git buzilgan",
        "Fayl yaratishni unutgansiz",
        "Oxirgi commitdan keyin staged oʻzgarish yoʻq — bu xato emas, maʼlumot",
        "Avval push qilish kerak",
      ],
      answer: 2,
      why: "'working tree clean' — hammasi commit qilingan degani. Gitʼdagi eng doʻstona xabarlaridan biri.",
    },
    {
      q: "Yangi mashinadagi birinchi commit 'Please tell me who you are' bilan muvaffaqiyatsiz. Nima yetishmayapti?",
      options: [
        "GitHub akkaunt",
        "git config --global user.name va user.email",
        "git push",
        ".gitignore fayli",
      ],
      answer: 1,
      why: "Git ishingizga ismingiz kerak deb soʻraydi. Ikki config buyrugʻi, mashinaga bir marta — boshqa soʻramaydi.",
    },
    {
      q: "origin nima?",
      options: [
        "Eng birinchi commit",
        "Asosiy remotem — odatda repozitoriyangizning GitHub nusxasi — ning anʼanaviy nomi",
        "Git administrator akkaunti",
        "Asosiy branch",
      ],
      answer: 1,
      why: "origin — push qiladigan remotemga beriladigan odatiy nom. Xohlagan nomni bersa boʻladi, lekin hamma origin deydi.",
    },
    {
      q: "git push nima qiladi?",
      options: [
        "GitHubʼdan commitlarni yuklab oladi",
        "Loyihani internetga oʻrnatadi",
        "Commitlaringizni remotega (GitHub) yuklaydi",
        "Yangi branch yaratadi",
      ],
      answer: 2,
      why: "Push — lokal commitlarni GitHubʼga yuklash. Aynan shu lahzada ishingiz ochiq portfelingizning bir qismiga aylanadi.",
    },
    {
      q: "Bularning qaysi biri ochiq repoga hech qachon commit qilinmasligi kerak?",
      options: [
        "README.md",
        "API kalitlar va parollar bilan .env fayli",
        "Python skriptlaringiz",
        "Yozuvlaringiz",
      ],
      answer: 1,
      why: "GitHubʼga push qilingan sir — sizib chiqqanlik; botlar bir necha daqiqada topadi va oʻchirilsa ham tarixda qoladi. .gitignore aynan shuning uchun bor.",
    },
    {
      q: "Commit xabarlari nega shunchalik muhim?",
      options: [
        "GitHub mukammal grammatika talab qilgani uchun",
        "Kelajakdagi oʻzingiz va hamkasblar tarixdan nima va nega oʻzgarganini oʻqigani uchun",
        "Uzoq xabarlar commitni tezlashtirgani uchun",
        "Muhim emas — faqat kod muhim",
      ],
      answer: 1,
      why: "Tarix — bir marta yozilib, koʻp marta oʻqiladigan hikoya. 'add yen-converter script' va 'update' — olti oydan keyin qaysi biri foydali?",
    },
    {
      q: "Faylni commit qilgandan keyin tahrirladingiz. Endi nima boʻladi?",
      options: [
        "Eski commit ustidan yoziladi",
        "Hech narsa — fayllar faqat bir marta commit qilinadi",
        "Git uni modified deb koʻradi; git add va yana commit — tarixda ikki commit",
        "Faylni oʻchirib qaytadan boshlash kerak",
      ],
      answer: 2,
      why: "Tahrirlash → add → commit — marosim emas, tsikl. Tarix har bir versiyani saqlaydi, hech narsa ustidan yozilmaydi.",
    },
  ],
  outro:
    "Simulyator sizni 2-hafta loyihasining aynan sayohati boʻylab olib bordi: papka → repo → readme → commitlar → GitHub. Maslahatlarsiz yana bir marta noldan qiling — init/add/commit/push barmoqlaringizdan avtomatik chiqqanda, haqiqiy GitHubʼda qilishga tayyorsiz. Va esda tuting: adashganingizda javob har doim — git status.",
};
