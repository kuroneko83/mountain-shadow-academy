import type { Guide } from "../types";

export const guideGitUz: Guide = {
  slug: "git",
  title: "Git va GitHub — qadam ba qadam",
  intro:
    "Bu qoʻllanma 2-haftaga xizmat qiladi. Git qoʻrqinchli degan obroʻyga ega — asossiz. Bu papkangiz uchun vaqt mashinasi: nomlangan suratlar (commit) olasiz va ularga istagan vaqt qaytasiz. GitHub esa oʻsha suratlar ochiq saqlanadigan joy. Darslikni oʻqing, simulyatorda toʻliq sayohatni — init, status, add, commit, log, remote, push — mashq qiling, testni yeching va 10–14-boʻlimlarda real dunyo koʻprigini — GitHub akkaunt yaratish va kompyuterni ulashni — bosqichma-bosqich bajaring.",
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
      heading: "10. GitHub akkaunt yaratish — bosqichma-bosqich",
      body: "Hozirgacha hammasi mashinangizda boʻldi. Real push qilishdan oldin GitHub akkaunt kerak — va tanlagan username ingiz ochiq kasbiy identifikatsiyangizga aylanadi, shuning uchun aksariyat odam berganidan koʻproq eʼtibor talab qiladi. Vaqti: taxminan 15 daqiqa, bosishma-bosish.",
      steps: [
        {
          title: "github.com ga kiring va Sign up ni bosing",
          detail:
            "Istalgan brauzer. Yuqori oʻngdagi yashil tugma. Roʻyxatdan oʻtish formasi tartib bilan uch narsani soʻraydi: email, parol, foydalanuvchi nomi.",
        },
        {
          title: "Email: yillar davomida saqlaydiganingizni",
          detail:
            "Bu email push qiladigan har bir commitda koʻrinadi — ish beruvchilar uni koʻradi. Gmail yaxshi. Ish emailidan saqlaning: ish almanganda oʻchadi va u bilan qilingan commitlar ish beruvchiga tegishli boʻladi.",
        },
        {
          title: "Parol: uzun va GitHub uchun alohida",
          detail:
            "Parol menejeri yordam beradi. Hali boʻlmasa, qisqa aralashmatondan koʻra uzun gap uslubidagi parol kuchliroq.",
        },
        {
          title: "Foydalanuvchi nomi: bu kasbiy identifikatsiyangiz — yozishdan oldin oʻylang",
          detail:
            "Profil URL manzilingiz github.com/NOMINGIZ boʻladi va u rezyume va arizalarga tushadi. firstname-lastname uslubi mukammal. Gamer va anime taxalluslari hamda ortiqcha raqamlardan saqlaning — bu nomni yaponiyalik ish beruvchilar bosadi.",
        },
        {
          title: "Maslahani yechib Create account ni bosing",
          detail:
            "Captcha, baʼzan kichik test. Keyin GitHub emailingizga tasdiqlash kodi yuboradi.",
        },
        {
          title: "Emailni ochib kodni qoʻying",
          detail:
            "Bir daqiqada kelmasa, spamni tekshiring. Kod tez tugaydi — tugasa, yangisini soʻrang, shunchaki.",
        },
        {
          title: "Shaxsiylashtirish savollariga javob bering (yoki oʻtkazib yuboring)",
          detail:
            "GitHub tajriba va maqsadlaringizni soʻraydi. Rost javoblar panel tavsiyalarini yaxshilaydi, lekin oʻtkazib yuborish ham yaxshi.",
        },
        {
          title: "Free tarifni tanlang",
          detail:
            "Ochiq portfel uchun Free yetarli: ochiq repozitoriyalar cheksiz. Hech qanday karta maʼlumotini kiritmang.",
        },
        {
          title: "2FA — ikki faktorli autentifikatsiya (GitHub talab qiladi)",
          detail:
            "Avval telefonda autentifikatsiya ilova oʻrnating (Microsoft Authenticator yoki Google Authenticator, ikkalasi bepul). Keyin 'Use an authenticator app' ni tanlang, QR kodni ilova bilan skanerlang va koʻrsatgan 6 xonali kodni kiriting. SMS ham ishlaydi, lekin ilova xavfsizroq va signalsiz ham ishlaydi.",
        },
        {
          title: "Tiklash kodlarini saqlang — jiddiy, aynan shu qadam",
          detail:
            "GitHub 16 ta bir martalik kod koʻrsatadi. Faylni yuklab olib, faqat oʻsha telefonda emas, xavfsiz joyda saqlang. Telefonni yoʻqotsangiz, akkauntga qaytishning yagona yoʻli shu kodlar.",
        },
        {
          title: "Minimal profil parvarishi (5 daqiqa)",
          detail:
            "Yuqori oʻng → avatar → 'Your profile'. Yuz surati (mushuk yoki logo emas — haqiqiy, doʻstona yuz; yapon ish beruvchilar bunga ayniqsa eʼtibor beradi), koʻrsatiladigan ism, bir qatorlik bio va joyingizni qoʻshing. Toʻliq parvarish 12-haftada — suratni bugun qilishga arziydi.",
        },
      ],
    },
    {
      heading: "11. GitHubʼda learning-log repozitoriyasi yaratish",
      body: "Iki daqiqa, bosishma-bosish — va chetlab oʻtiladigan bitta tuzoq. Maqsad: keyingi boʻlimda lokal learning-log ulanadigan, GitHubʼdagi boʻsh repozitoriya.",
      steps: [
        {
          title: "Yuqori oʻngdagi + → 'New repository'",
          detail: "Yoki toʻgʻridan-toʻgʻri github.com/new ga boring.",
        },
        {
          title: "Repository name: learning-log",
          detail:
            "Lokal papka nomi bilan aynan moslashtirish odat, majburiyat emas — lekin mos nomlar aqlda sogʻliqni saqlaydi.",
        },
        {
          title: "Description (ixtiyoriy): halol bir qator",
          detail:
            "Misol: 'My study log — Python, scripting, and data engineering'. Ish beruvchilar uni bosishdan oldin oʻqiydi.",
        },
        {
          title: "Public ni tanlang",
          detail:
            "Public — butun maqsad: bu portfelingiz. Koʻrinmas ish beruvchi sizni ishga ololmaydi. (Maxfiy maʼlumotlar ochiq repoga baribir kirmaydi — bu ikki boʻlim pastdagi .gitignore vazifasi.)",
        },
        {
          title: "'Add a README file' ni belgilamang — tuzoq shu",
          detail:
            "GitHub README yaratsa, birinchi push rad etiladi ('remote contains work you do not have locally') — GitHub nusxasida sizda yoʻq commit paydo boʻlgani uchun. Repozitoriyani boʻsh holatda qoldiring; oʻz READMEngiz allaqachon mashinangizda bor.",
        },
        {
          title: "'Create repository' ni bosing",
          detail:
            "GitHub holatingizga mos aniq buyruqlarni koʻrsatadigan sahifa chiqaradi — '…or push an existing repository from the command line' ostida. Oʻsha ikki qator — aynan sizning remote add va push buyruqlaringiz. GitHub ularni oʻzi yozadi; yodlash shart emas.",
        },
      ],
      examples: [
        {
          label: "Repo yaratilgandan keyin GitHub koʻrsatadigan ikki qator",
          cmd: "git remote add origin https://github.com/you/learning-log.git\ngit push -u origin main",
          note: "Sahifadan nusxa oling — username va repo nomi bilan moslashtirilgan.",
        },
      ],
    },
    {
      heading: "12. Kompyuterni ulash — Windows",
      body: "Avval muhim haqiqat: 2021-yil 13-avgustdan boshlab GitHub git push uchun akkaunt parolini qabul qilmaydi. Git ichiga GitHub parolini yozish davri tugadi. Windowsʼda koʻprik — Git Credential Manager: birinchi push brauzerni ochadi, bir marta kirasiz va mashina buni abadiy eslab qoladi.",
      steps: [
        {
          title: "Git for Windows oʻrnating (hali boʻlmasa)",
          detail:
            "git-scm.com/download/win dan yuklab oʻrnating. Oʻrnatuvchida taxminan oʻn ekran variant bor — standartlarning hammasi yaxshi. 'Git Credential Manager' belgilangan qolsin (standart shunday). Tugaguncha Next.",
        },
        {
          title: "Oʻrnatgandan keyin YANGI terminal oching",
          detail:
            "git koʻrinishi uchun PowerShellni qayta ochish kerak.git --version deb yozing — raqam bilan javob bersa, asbob ulandi.",
        },
        {
          title: "Gitga kim ekaningizni ayting — mashinaga bir marta",
          detail:
            "git config --global user.name \"Ismingiz\" va git config --global user.email \"you@example.com\" — GitHubʼda ishlatgan emailingiz. Aynan shu commitlarga ismingizni qoʻyadi.",
        },
        {
          title: "Birinchi pushni qiling — brauzer oynasi ochiladi",
          detail:
            "Birinchi marta git push qilganingizda Git Credential Manager 'Sign in with your browser' oynasini ochadi. Uni tanlang: brauzer GitHubni ochadi, kirasiz, Authorize ni bosasiz — oyna yopiladi va push avtomatik davom etadi. Bu login Windows tomonidan saqlanadi — bu mashinada oynani yana koʻrmaysiz.",
        },
      ],
      examples: [
        {
          label: "Ikkalasi (mashinaga bir marta)",
          cmd: 'git config --global user.name "Ismingiz"\ngit config --global user.email "you@example.com"',
        },
        {
          label: "Git ishlayotganini tekshirish",
          cmd: "git --version",
          output: "git version 2.45.0",
        },
      ],
    },
    {
      heading: "13. Kompyuterni ulash — Linux, A yoʻl: shaxsiy kirish tokeni (PAT)",
      body: "Linuxʼda ham xuddi shu haqiqat: akkaunt paroli gitga hech qachon oʻtmaydi. Ikki halol yoʻl bor. A yoʻl — token: tez, HTTPS bilan ishlaydi, lekin muddati tugaydi va faylda saqlanadi. B yoʻl (keyingi boʻlim) — SSH kalit: oʻn daqiqa, abadiy ishlaydi, professional standart — ixtiyori boʻlsangiz B ni tanlang. Ikki yoʻl ham git oʻrnatilganini (Ubuntu/Debianʼda sudo apt install git, Fedoraʼda sudo dnf install git) va ikkala git config bajarilganini talab qiladi.",
      steps: [
        {
          title: "GitHubʼda token yarating",
          detail:
            "Yuqori oʻng → Settings → Developer settings (chap pastda) → Personal access tokens → Tokens (classic) → Generate new token (classic). Nom: 'my-laptop', 'repo' belgisini qoʻying, 90 kun muddat, Generate.",
        },
        {
          title: "TOKENNI HOZIR NUSXALANG — faqat bir marta koʻrsatiladi",
          detail:
            "ghp_... bilan boshlanadigan satr. Parol menejeriga yoki vaqtincha yozuvga nusxa oling. Nusxalamasdan sahifani yopsangiz: oʻsha tokenni oʻchirib, yangisini yarating — eskisi dizayn boʻyicha abadiy yoʻqoladi.",
        },
        {
          title: "Birinchi push: username = GitHub nomingiz, password = token",
          detail:
            "git 'Username for https://github.com' deb soʻrasa: GitHub foydalanuvchi nomingiz. 'Password for https://you@github.com' ga: TOKENNI qoʻying — akkaunt parolini emas. Akkaunt paroli 2021-yildan ishlamaydi; bu xato boshlanuvchining birinchi devori.",
        },
        {
          title: "Ixtiyoriy: eslab qolishni ayting",
          detail:
            "git config --global credential.helper store — ~/.git-credentials ga oddiy matnda saqlaydi (shaxsiy noutbuk uchun yaxshi). Shundan keyin pushlar soʻramaydi.",
        },
      ],
      examples: [
        {
          label: "Birinchi pushda git soʻraydigan narsa",
          cmd: "Username for 'https://github.com': you\nPassword for 'https://you@github.com': ghp_paste_the_token_here",
          note: "Parol maydoni tokenni istaydi. Akkaunt paroli hech qachon emas.",
        },
      ],
    },
    {
      heading: "14. Kompyuterni ulash — Linux, B yoʻl: SSH kalit (bir marta, abadiy)",
      body: "Professional standart. Bitta kalit juftligi: maxfiy kalit mashinangizda abadiy qoladi, ochiq kalit GitHubʼga bir marta qoʻyiladi. Tokenlar yoʻq, muddatlar yoʻq, brauzer oynalari yoʻq. Har yangi mashinada buni yana qilasiz — bir yildan keyin bu oddiy kunlik ish.",
      steps: [
        {
          title: "Kalitni yarating",
          detail:
            "ssh-keygen -t ed25519 -C \"you@example.com\" — keyin Enter: standart joylashuv (~/.ssh/id_ed25519) yana Enter: boʻsh parol frazasi (shaxsiy noutbuk uchun yaxshi; parol frazasi xavfsizroq, lekin har rebootdan keyin soʻraydi).",
        },
        {
          title: "OCHIQ kalitni koʻrsatib nusxa oling",
          detail:
            "cat ~/.ssh/id_ed25519.pub — ssh-ed25519 bilan boshlanib emailingiz bilan tugaydigan bitta qator. Butun qatorni tanlab nusxa oling. MAXFIY kalit (~/.ssh/id_ed25519, .pub yoʻq) mashinangizdan hech qachon chiqmaydi — uni hech qayerga, GitHubʼga ham, hamkasbga ham qoʻymang.",
        },
        {
          title: "GitHubʼda: Settings → SSH and GPG keys → New SSH key",
          detail:
            "Title: bir yildan keyin oʻzingiz tanidigan nom ('ubuntu-laptop', 'thinkpad'). Key type 'Authentication Key' qoladi. Katta maydonga ochiq kalitni qoʻying. Add SSH key ni bosing.",
        },
        {
          title: "Sinab koʻring",
          detail:
            "ssh -T git@github.com — birinchi marta host barmoq izi soʻraydi: yes deb yozing. Muvaffaqiyat xabari: 'Hi NOMINGIZ! You've successfully authenticated, but GitHub does not provide shell access.' Bu — yashil chiroq.",
        },
        {
          title: "Remotelaringizda SSH URL ishlating",
          detail:
            "git remote add origin git@github.com:you/learning-log.git — git@ bilan boshlanib ikki nuqta borasiga eʼtibor. HTTPS remote allaqachon qoʻshilgan boʻlsa, qayta yaratmaysiz, almashtirasiz: git remote set-url origin git@github.com:you/learning-log.git.",
        },
      ],
      examples: [
        {
          label: "Linux / macOS",
          cmd: "ssh-keygen -t ed25519 -C \"you@example.com\"",
          note: "Enter, Enter — shaxsiy noutbuk uchun standartlar yetarli.",
        },
        {
          label: "Test — bu xabar muvaffaqiyat degani",
          cmd: "ssh -T git@github.com",
          output:
            "Hi you! You've successfully authenticated, but GitHub does not provide shell access.",
        },
        {
          label: "Mavjud remoteni SSHʼga almashtirish",
          cmd: "git remote set-url origin git@github.com:you/learning-log.git",
        },
      ],
    },
    {
      heading: "15. .gitignore — GitHubʼga hech qachon bormaydigan narsalar",
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
      heading: "16. Yomon ketganda — klassik xatolar",
      body: "'fatal: not a git repository' — git buyrugʻini repodan tashqarida ishga tushirganingiz: avval loyiha papkasiga cd. 'nothing to commit, working tree clean' — hammasi allaqachon commit qilingan: xato emas, maʼlumot. 'fatal: pathspec did not match any files' — mavjud boʻlmagan nom bilan git add: ls bilan nomni tekshiring. 'Please tell me who you are' — 5-boʻlimdagi identifikatsiya xatosi: ikkita git config, mashinaga bir marta. 'Support for password authentication was removed' — siz (yoki saqlangan eski parol) akkaunt parolini sinab koʻrdingiz: Windowsʼda brauzer loginini qayta qiling (12-boʻlim), Linuxʼda token yoki SSH kalit (13–14-boʻlimlar) yordam beradi. 'push rejected — remote contains work you do not have locally' — GitHub repozitoriyasi boʻsh emas (odatda 11-boʻlimdagi README tuzogʻi). Git xatolarining oltin qoidasi: haqiqatan yoʻqoladigan narsa deyarli yoʻq, vahima buyruqlari (reset --hard, push --force) oʻzgarishning oʻzidan koʻproq zarar yetkazadi — shubhada boʻlsangiz, murabbingizdan soʻrang.",
      examples: [
        {
          label: "Repodan tashqarida",
          cmd: "git status",
          output: "fatal: not a git repository (or any of the parent directories): .git",
          note: "Loyiha papkasiga kiring. Git faqat repo ichida ishlaydi.",
        },
        {
          label: "2021-yilgi parol devori (hamma uriladi)",
          cmd: "git push",
          output:
            "remote: Support for password authentication was removed on August 13, 2021.\nfatal: Authentication failed for 'https://github.com/...'",
          note: "Bu xato ham, sizning aybingiz ham emas. Windows: brauzer loginini qayta qiling. Linux: token (A yoʻl) yoki SSH kalit (B yoʻl).",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Git tsikli — tezkor jadval",
    rows: [
      { action: "Papkani repoga aylantirish", command: "git init", result: "Initialized empty Git repository in .git/" },
      { action: "Holatni koʻrish", command: "git status", result: "(fayllaringiz hisoboti — har doim oʻqing)" },
      { action: "Bitta faylni staged", command: "git add readme.md", result: "(jimlik = muvaffaqiyat)" },
      { action: "Hamasini staged", command: "git add .", result: "(jimlik = muvaffaqiyat)" },
      { action: "Suratni olish", command: 'git commit -m "xabar"', result: "[main (root-commit) 9f2a1bc] add readme" },
      { action: "Tarixni oʻqish", command: "git log", result: "9f2a1bc  add readme" },
      { action: "Shaxsni belgilash (bir marta)", command: 'git config --global user.name "Ismingiz"', result: "(jimlik = muvaffaqiyat)" },
      { action: "GitHubʼga ulash", command: "git remote add origin <url>", result: "(jimlik = muvaffaqiyat)" },
      { action: "Nashr (birinchi marta)", command: "git push -u origin main", result: "main -> main (the upload line)" },
      { action: "Nashr (keyingi marta)", command: "git push", result: "Everything up-to-date" },
      { action: "SSH ulanishini test", command: "ssh -T git@github.com", result: "Hi you! You've successfully authenticated" },
      { action: "Remoteni SSHʼga almashtirish", command: "git remote set-url origin git@github.com:you/repo.git", result: "(jimlik = muvaffaqiyat)" },
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
    "Simulyator sizni 2-hafta loyihasining aynan sayohati boʻylab olib bordi: papka → repo → readme → commitlar → GitHub. Maslahatlarsiz yana bir marta noldan qiling — init/add/commit/push barmoqlaringizdan avtomatik chiqqanda, haqiqiy ishga tayyorsiz. Keyin 10–14-boʻlimlar oxirgi qadamlarning real versiyasini bosib oʻtadi: akkaunt, boʻsh repozitoriya va mashinaga bir martalik ulanish. Va esda tuting: adashganingizda javob har doim — git status.",
};
