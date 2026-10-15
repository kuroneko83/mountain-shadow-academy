import type { Curriculum } from "./types";

export const curriculumUz: Curriculum = {
  phases: [
    {
      id: "foundations",
      name: "1-bosqich — Poydevor",
      description:
        "Vositalaringiz, Git & GitHub va birinchi Python qadamlaringiz. Tajriba noldan boshlanadi.",
    },
    {
      id: "python",
      name: "2-bosqich — Python va skriptlar",
      description:
        "Kichik dasturlardan internetdan real maʼlumot oladigan skriptlargacha.",
    },
    {
      id: "data",
      name: "3-bosqich — Maʼlumotlar bilan ishlash",
      description:
        "pandas va SQL: maʼlumotlarni tozalash, tahlil qilish va toʻgʻri saqlash.",
    },
    {
      id: "capstone",
      name: "4-bosqich — Yakuniy loyiha va portfel",
      description:
        "Toʻliq bozor maʼlumotlari quvuri (pipeline) — deploy qilingan va ochiq. Bu ish beruvchilarga koʻrsatadigan portfelingiz.",
    },
  ],
  weeks: [
    {
      slug: "01-setup-terminal",
      title: "Vositalaringiz: terminal, Python, VS Code",
      phase: "foundations",
      why: "Keyingi 12 haftada — va butun karyeringizda — qiladigan barcha ishlaringiz shu uchta vositada boʻlib oʻtadi. Ularga hozir oʻrganib qoʻysangiz, keyingi har bir hafta tezroq va kamroq qoʻrqinchli boʻladi.",
      guide: "command-line",
      objectives: [
        "Faqat bosish emas, terminal (Windowsʼda PowerShell, Linuxʼda bash) bilan kompyuterda harakat qilish.",
        "Terminaldan Python ishga tushirish va qaysi versiyaga ega ekanligini bilish.",
        "VS Codeʼda .py fayl yaratish, tahrirlash va ishga tushirish.",
      ],
      topics: [
        "Terminal nima: PowerShell (Windows) va bash (Linux)",
        "Fayllar, papkalar va yoʻllar — pwd, ls/dir, cd, mkdir",
        "Python 3 va VS Code oʻrnatish",
        "python --version, kodni python fayl.py bilan ishga tushirish",
        "Birinchi skript: print() va # izohlar",
      ],
      project: {
        title: "setup-log.py",
        description:
          "Kompyuteringiz keyingi 11 haftaga tayyor ekanini isbotlovchi birinchi skript.",
        steps: [
          "Bu oʻquv rejasi uchun papka yarating (masalan msa-academy), ichida data/ va scripts/ papkalari bilan.",
          "setup-log.py yozing: ismingiz, bugungi sana (import datetime) va Python versiyangizni (import sys) chiqarsin.",
          "Uni tahrirlovchi tugmasidan emas, terminaldan ishga tushiring — kamida bir marta.",
        ],
      },
      resources: [
        {
          title: "VS Code — rasmiy Python qoʻllanmasi",
          url: "https://code.visualstudio.com/docs/python/python-tutorial",
          note: "Faqat oʻrnatish va ishga tushirish boʻlimlari; qolganini hozir oʻtkazib yuboring.",
        },
        {
          title: "MIT — The Missing Semester (shell)",
          url: "https://missing.csail.mit.edu/",
          note: "Faqat 1-dars. Oʻqing, yodlash shart emas.",
        },
        {
          title: "Python — rasmiy boshlangʻich qoʻllanmasi",
          url: "https://www.python.org/about/gettingstarted/",
        },
      ],
    },
    {
      slug: "02-git-github",
      title: "Git & GitHub: portfelingiz bugun boshlanadi",
      phase: "foundations",
      why: "Bu haftadan boshlab yozgan har bir qator kodingiz ommaviy GitHub repozitoriyaga commit qilinadi. Yaʼni hali yaxshi dasturlashni bilmaganingizda ham portfelingiz oʻsishni boshlaydi.",
      guide: "git",
      objectives: [
        "Git repozitoriya yaratish, commit qilish va GitHubʼga push qilish.",
        "Har bir repozitoriya uchun tushunarli README.md yozish.",
        "Toza va tushunarli commit tarixini saqlash.",
      ],
      topics: [
        "Versiya boshqaruvi nima va nega har bir kompaniya uni ishlatadi",
        "git init, git add, git commit -m, git log",
        "git remote va git push bilan GitHubʼga ulash",
        "README.md — nima uchun va ichiga nima yoziladi",
        ".gitignore — keraksiz fayllar va maxfiy maʼlumotlarni hech qachon commit qilmaslik",
      ],
      project: {
        title: "learning-log repozitoriyasi",
        description:
          "Birinchi ommaviy repozitoriyangiz: bu yerda oʻrgangan hamma narsangizning kundaligi.",
        steps: [
          "Professional foydalanuvchi nomi bilan GitHub akkaunt yarating.",
          "learning-log repozitoriyasini yarating va setup-log.py ni push qiling.",
          "Bu repozitoriya nima ekanligi va nima qoʻshilishini READMEʼga yozing.",
          "Endi har hafta: learning-log yoki loyiha repozitoriyalariga kamida haftada bir marta commit qiling.",
        ],
      },
      resources: [
        {
          title: "GitHub Skills — Introduction to Git",
          url: "https://skills.github.com/",
          note: "'Introduction to Git' kursi. Interaktiv, brauzerda bajariladi.",
        },
        {
          title: "Pro Git (kitob) — 1- va 2-boblar",
          url: "https://git-scm.com/book/en/v2",
          note: "Bepul rasmiy kitob. 1-bobni toʻliq oʻqing, 2-bobni lugʻat sifatida.",
        },
      ],
    },
    {
      slug: "03-python-basics-1",
      title: "Python I: qiymatlar, matn, qarorlar",
      phase: "foundations",
      why: "Bular — kelajakda yozadigan har bir dasturingizning atomlari: qiymat saqlash, matn qurish, qaror qabul qilish. Bu yerda shoshilmang — poydevor boʻsh boʻlsa, keyin bir necha hafta yoʻqotasiz.",
      objectives: [
        "Oʻzgaruvchi yaratish va asosiy turlarni ishlatish: int, float, str, bool.",
        "f-string bilan matn qurish va foydalanuvchidan kirish olish.",
        "Taqqoslashlar bilan if / elif / else qarorlarini yozish.",
      ],
      topics: [
        "Oʻzgaruvchilar va qiymat berish",
        "Sonlar (int, float) va arifmetik operatorlar",
        "Stringlar: f-string, .strip(), .lower(), kesish (slicing)",
        "input() va tur almashtirish (int(), float())",
        "Taqqoslash operatorlari va if / elif / else",
      ],
      project: {
        title: "yen-converter.py",
        description:
          "Interaktiv JPY ↔ USD konvertori — birinchi 'haqiqiy' dasturingiz.",
        steps: [
          "USD/JPY kursini oʻzgaruvchiga saqlang (bu haftada doimiy qiymat yetarli).",
          "Foydalanuvchidan summa va yoʻnalishni soʻrang (JPY→USD yoki USD→JPY).",
          "Natijani f-string bilan toza gap koʻrinishida chiqaring.",
          "Oddiy tekshiruv qoʻshing: manfiy summa uchun ado maslahat xatosi chiqsin.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (1–3-darslar)",
          url: "https://www.kaggle.com/learn/python",
          note: "Bepul, interaktiv, ~4 soat. Bu haftada 1–3-darslar.",
        },
        {
          title: "freeCodeCamp — Scientific Computing with Python",
          url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
          note: "Uzoq muddatli sertifikat yoʻnalishi. Bu haftada boshlang, butun oʻquv rejasi davomida davom ettiring.",
        },
        {
          title: "Automate the Boring Stuff — 1- va 2-boblar",
          url: "https://automatetheboringstuff.com/",
          note: "Onlaynda bepul oʻqiladi. Boshlovchilar uchun eng yaxshi skripting kitobi.",
        },
      ],
    },
    {
      slug: "04-python-basics-2",
      title: "Python II: tsikllar va funksiyalar",
      phase: "python",
      why: "Dasturlar kuchli boʻladi, qachonki ishni sizsiz takrorlasa va logikani nomlangan, qayta ishlatiladigan funksiyalarga joylasa. Shu yerda xato xabarlarini oʻqishni ham oʻrganasiz — bu kunilik koʻnikma.",
      objectives: [
        "for va while tsikllari bilan ishni takrorlash.",
        "Parametr va qiymat qaytaradigan funksiyalar yozish.",
        "Tracebackʼni oʻqib, oʻz xatolaringizni tuzatish.",
      ],
      topics: [
        "for tsikllari va range()",
        "while tsikllari (va cheksiz tsikldan qochish)",
        "def, parametrlar, return, docstring",
        "Xato xabarlarini oʻqish: traceback nimani aytadi",
        "Muammoni kichik funksiyalarga boʻlish",
      ],
      project: {
        title: "daily-report.py",
        description: "Bir haftalik sonlarni tsikllar va funksiyalar bilan xulosa qilish.",
        steps: [
          "7 kunlik sonlar roʻyxatini (masalan, soxta savdo hajmlari) kodga yozing.",
          "total(), average() va best_day() funksiyalarini yozing — har biri roʻyxat oladi va natija qaytaradi.",
          "Kichik hisobot chiqaring: jami, oʻrtacha, eng yaxshi kun va uning qiymati.",
          "Bir marta ataylab buzing (ikki nuqtani oʻchiring), tracebackʼni oʻqing va tuzating — bu ham mashq.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (4–5-darslar)",
          url: "https://www.kaggle.com/learn/python",
          note: "Tsikllar, funksiyalar va mantiq darslari.",
        },
        {
          title: "Automate the Boring Stuff — 3-bob",
          url: "https://automatetheboringstuff.com/",
        },
      ],
    },
    {
      slug: "05-structures-files",
      title: "Maʼlumot tuzilmalari va fayllar",
      phase: "python",
      why: "Haqiqiy dasturlar maʼlumotni saqlab qoladi: roʻyxat va lugʻatlar bilan ushlab turadi, fayllarga saqlaydi. Bu haftadan dasturlaringiz tugagandan keyin ham hamma narsani unutmaydi.",
      objectives: [
        "Toʻgʻri tuzilmani tanlash: roʻyxat (list), lugʻat (dict) yoki tuple.",
        "Matn va CSV fayllarni oʻqish va yozish.",
        "Skript tugagachdan keyin ham saqlanadigan tuzilgan maʼlumot joylash.",
      ],
      topics: [
        "Roʻyxatlar chuqurroq: append, remove, takrorlash",
        "Lugʻatlar: kalitlar, qiymatlar, .get(), items() boʻylab tsikl",
        "Tuple va oʻzgarmaslikning afzalligi",
        "with open(...) as f — fayllarni oʻqish va yozish",
        "csv moduli; json bilan birinchi tanishuv",
      ],
      project: {
        title: "expense-tracker.py",
        description:
          "Doimiy saqlashga ega kichik CLI ilova — ikkinchi ommaviy repozitoriyangiz.",
        steps: [
          "Yangi GitHub repozitoriyasi yarating: expense-tracker.",
          "input() orqali xarajat qoʻshish: sana, modda, JPY miqdori → expenses.csv ga qoʻshish.",
          "'summary' buyrugʻi jami, oʻrtacha va eng qimmat moddani chiqaradi.",
          "Fayl mazmunini qoʻlda kodga koʻchirmang — CSV ni toʻgʻri parsing qiling.",
          "Misol koʻrsatilgan README yozing.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Python (6–7-darslar)",
          url: "https://www.kaggle.com/learn/python",
          note: "Roʻyxat va lugʻatlar darslari.",
        },
        {
          title: "Automate the Boring Stuff — 4–6-boblar, 9–10-boblar",
          url: "https://automatetheboringstuff.com/",
          note: "4–6-boblarni hozir oʻqing; 9–10-boblardan (fayllar) loyiha qurishda foydalaning.",
        },
      ],
    },
    {
      slug: "06-scripts-apis",
      title: "Internet bilan gaplashadigan skriptlar",
      phase: "python",
      why: "Bu haftada skriptlar haqiqiy ishni boshlaydi: ochiq APIʼdan jonli maʼlumot olish, xatoliklarni hal qilish va natijani saqlash. Aynan shu — olish, tozalash, saqlash — data muhandisligining yuragi.",
      objectives: [
        "Virtual muhit yaratish va pip bilan paketlar oʻrnatish.",
        "requests bilan ochiq API chaqirish va JSON javobni tahlil qilish.",
        "try/except bilan xatoliklarni hal qilish — bir yomon kun butun ishni toʻxtatmasin.",
      ],
      topics: [
        "python -m venv .venv, faollashtirish, pip install requests",
        "requests.get() va HTTP status kodlari (200, 404, 500)",
        "response.json() — ichma-ich dict va roʻyxatlar bilan ishlash",
        "try / except / finally",
        "Xato boʻlsa bir marta qayta urinish, keyin log qilib oʻtkazib yuborish",
      ],
      project: {
        title: "fx-tracker",
        description:
          "Haqiqiy valyuta kurslarini oladigan skript — uchinchi repozitoriyangiz.",
        steps: [
          "Frankfurter API hujjatlarini oʻqing (bepul, kalitsiz valyuta APIʼsi).",
          "fetch_rates.py yozing: oxirgi 90 kunlik USD→JPY va EUR→JPY kurslarini oling.",
          "Ularni toza rates.csv (date, usd_jpy, eur_jpy) sifatida saqlang.",
          "Soʻrovni try/except bilan oʻrang va bir marta qayta urining.",
          "README bilan yangi fx-tracker repozitoriyasiga push qiling.",
        ],
      },
      resources: [
        {
          title: "Frankfurter API — hujjatlar",
          url: "https://www.frankfurter.app/docs/",
          note: "Ishlatadigan APIʼngiz. Bepul va kalit talab qilmaydi.",
        },
        {
          title: "Automate the Boring Stuff — 11-bob",
          url: "https://automatetheboringstuff.com/",
          note: "Web scraping bobi — requests qismlarini oʻqing.",
        },
        {
          title: "requests — quickstart",
          url: "https://requests.readthedocs.io/en/latest/user/quickstart/",
        },
      ],
    },
    {
      slug: "07-market-watch",
      title: "Mini-loyiha: market-watch",
      phase: "python",
      why: "Mustahkamlash haftasi: olish skriptini kichkina, ishonchli vositaga aylantiring va har kunlik ishlatib koʻring. Takrorlash — sintaksis qoʻrqinchli boʻlishni toʻxtatib, avtomatik boʻlishini taʼminlaydigan yagona yoʻl.",
      objectives: [
        "Repozitoriyani haqiqiy loyiha kabi tuzish (papkalar, README, alohida qadamlar).",
        "Xom olish skriptini kunlik hisobot generatoriga aylantirish.",
        "Vazifani jadval bilan avtomatik ishga tushirish (ixtiyoriy, ammo kuchli).",
      ],
      topics: [
        "Repo tuzilishi: scripts/, data/, README.md",
        "Funksiyalarni birlashtirish: olish → tozalash → tahlil → hisobot",
        "Statistika asoslari: min, max, oʻrtacha va oddiy standart chetlanish",
        "print() va logging farqi",
        "Jadval: cron (Linux) / Task Scheduler (Windows) — ixtiyoriy",
      ],
      project: {
        title: "market-watch.py",
        description:
          "USD/JPY uchun kunlik bozor hisoboti: sonlar, harakat va matnli xulosa.",
        steps: [
          "Oxirgi 30 kunlik USD/JPY kurslarini oling (yana Frankfurter).",
          "Davr uchun min, max, oʻrtacha va standart chetlanishni hisoblang.",
          "Inson oʻqiydigan report.txt yozing: davr, statistika, eng katta koʻtarilish/tushish kuni.",
          "Bir hafta davomida har ish kuni ishga tushiring va hisobotni har kuni commit qiling.",
          "Ixtiyoriy: jadvalga qoʻyib, mashinaga qildiring.",
        ],
      },
      resources: [
        {
          title: "Automate the Boring Stuff — 12-bob",
          url: "https://automatetheboringstuff.com/",
        },
        {
          title: "crontab.guru — cron sintaksisi yordamchisi",
          url: "https://crontab.guru/",
          note: "Faqat jadval mashqini sinab koʻrsangiz.",
        },
      ],
    },
    {
      slug: "08-pandas-1",
      title: "pandas I: birinchi DataFrame",
      phase: "data",
      why: "pandas — Yaponiyada va butun dunyoda analitik va data muhandislardan kutiladigan asosiy vosita. U tartibsiz fayllarni bir qatorda kesib boʻladigan jadvollarga aylantiradi.",
      objectives: [
        "CSV ni DataFrameʼga yuklab, koʻzdan kechirish (head, info, describe).",
        "Ustunlarni tanlash va shartlar bilan qatorlarni filtrlash.",
        "Yetishmayotgan qiymatlarga ajablanmasdan, ularga munosabat bildirish.",
      ],
      topics: [
        "Series va DataFrame — bu nima",
        "read_csv, head, info, describe",
        "Ustun tanlash; shartlar bilan filtrlash",
        "Yetishmayotgan maʼlumot: isna, dropna, fillna",
        "Nomlarni oʻzgartirish va ustun turlarini almashtirish",
      ],
      project: {
        title: "rates-exploration.py",
        description:
          "Oʻz rates.csv faylingiz haqida yozilgan 10 savolga pandas bilan javob berish.",
        steps: [
          "fx-tracker dagi rates.csv ni DataFrameʼga yuklang.",
          "10 ta savol yozing (READMEʼga) — masalan: 'davrdagi eng yuqori USD/JPY kuni qaysi?'",
          "Har biriga pandas bilan javob bering — CSV ni qoʻlda oʻqimasdan.",
          "Skript + savollar + javoblarni fx-tracker repozitoriyasiga commit qiling.",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas (1–3-darslar)",
          url: "https://www.kaggle.com/learn/pandas",
          note: "Eng yaxshi bepul pandas kursi. ~4 soat.",
        },
        {
          title: "freeCodeCamp — Data Analysis with Python",
          url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
          note: "pandas + matplotlib ni oʻz ichiga olgan sertifikat kursi. Hozir boshlang, 10-haftagacha tugating.",
        },
      ],
    },
    {
      slug: "09-pandas-2",
      title: "pandas II: guruhlash, agregatsiya, grafik",
      phase: "data",
      why: "Maʼlumotni xulosa qilish va vizuallashtirish — tahlil aloqaga aylanadigan moment. READMEʼdagi bitta grafik, 50 qator koddan koʻproq narsani ish beruvchiga aytadi.",
      objectives: [
        "groupby bilan maʼlumotni guruhlash va agregatsiya qilish.",
        "Sanalarni sana sifatida ishlatish — haftalik/oylik resample.",
        "matplotlib bilan oddiy chiziqli grafik yaratib, PNG sifatida saqlash.",
      ],
      topics: [
        "groupby() bilan mean/sum/count",
        "Saralash va nlargest",
        "to_datetime va sana qismlari (oy, hafta kuni)",
        "resample — haftalik va oylik koʻrinishlar",
        "matplotlib: plot, sarlavha, yorliqlar, savefig",
      ],
      project: {
        title: "market-report.py",
        description:
          "USD/JPY oylik agregatsiyasi va grafik — bu yakuniy loyihaga aylanadi.",
        steps: [
          "Butun maʼlumot boʻyicha USD/JPY oylik oʻrtachasini hisoblang.",
          "30 kunlik harakatlanuvchi oʻrtachani hisoblab, ustun sifatida qoʻshing.",
          "Kunlik kurs va harakatlanuvchi oʻrtachani bitta grafikka chizing; usd_jpy.png sifatida saqlang.",
          "Grafikni repozitoriyangiz READMEʼsiga joylang (ha, READMEʼda rasmlar ishlaydi).",
        ],
      },
      resources: [
        {
          title: "Kaggle Learn — Pandas (4–6-darslar)",
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
      title: "SQL va SQLite: maʼlumotni toʻgʻri saqlash",
      phase: "data",
      why: "CSV kichik ishlar uchun yaxshi, lekin kompaniyalar aslida bazalarda ishlaydi. SQL — karyeringizdagi eng barqaror koʻnikma: u hech qachon eskirmaydi.",
      objectives: [
        "SELECT, WHERE, GROUP BY va ORDER BY soʻrovlarini ishonch bilan yozish.",
        "Pythonʼdan SQLite baza yaratish va maʼlumot yuklash.",
        "Parametrlangan soʻrovlar bilan qaytarib olish (matn birlashtirish hech qachon emas).",
      ],
      topics: [
        "SELECT / WHERE / ORDER BY / LIMIT",
        "Agregatsiyalar: SUM, COUNT, AVG, MIN, MAX va GROUP BY",
        "JOIN (inner, left) — qaysi biri toʻgʻri ekanini bilish",
        "sqlite3 moduli: connect, execute, commit",
        "Parametrlangan soʻrovlar — ? nima uchun muhim (SQL inʼeksiya)",
      ],
      project: {
        title: "fx-db.py + queries.sql",
        description: "rates.csv faylingiz haqiqiy bazaga aylanadi.",
        steps: [
          "rates jadvali bilan rates.db (SQLite) yarating va CSV tarixini yuklang.",
          "6 ta soʻrovni queries.sql ga saqlang: oylik oʻrtacha, min/max kun, eng katta kunlik oʻzgarish, oylik oʻzgarish, oy boʻyicha yozuvlar soni va kichik currencies jadvali bilan JOIN.",
          "Pythonʼning sqlite3 modulidan soʻrovlarni qayta ishga tushirib, natijalarni CSV sifatida saqlang.",
        ],
      },
      resources: [
        {
          title: "SQLBolt — 1–12-darslar",
          url: "https://sqlbolt.com/",
          note: "Interaktiv va tez. Barcha darslarni tugatib chiqing.",
        },
        {
          title: "Mode — SQL Basic + Intermediate",
          url: "https://mode.com/sql-tutorial/",
          note: "Advancedʼni oʻtkazib yuboring. SQLBolt takrori uchun ishlating.",
        },
        {
          title: "Kaggle Learn — Intro to SQL",
          url: "https://www.kaggle.com/learn/intro-to-sql",
        },
      ],
    },
    {
      slug: "11-capstone-1",
      title: "Yakuniy loyiha I: bozor maʼlumotlari quvuri",
      phase: "capstone",
      why: "Hammasini yigʻish vaqti: olish → tozalash → saqlash → tahlil → hisobot. Bu haqiqiy, soʻzsiz data pipeline — kichkina, lekin kompaniyalar ishlatadigan shaklda.",
      objectives: [
        "APIʼdan bazagacha va hisobotgacha bitta skript quvurini qurish.",
        "Qayta ishga tushirganda maʼlumot takrorlanmasligiga erishish (idempotentlik).",
        "Notoʻgʻri odam ham loyihangizni ishga tushira oladigan darajada yaxshi README yozish.",
      ],
      topics: [
        "Quvur tuzilishi: fetch.py, transform.py, load.py yoki yaxshi tashkil etilgan bitta skript",
        "Idempotentlik: UPSERT / ON CONFLICT yoki sana oraligʻi boʻyicha oʻchirish va qayta yuklash",
        "Konfiguratsiya: yoʻllar va sozlamalar tepada, oʻrtaga koʻmmang",
        "Hammasini bitta buyruq bilan ishga tushirish",
      ],
      project: {
        title: "market-pipeline",
        description:
          "Flagman repozitoriyangiz: toʻliq, qayta ishga tushiriladigan valyuta maʼlumotlari quvuri.",
        steps: [
          "Aniq papka tuzilishi bilan market-pipeline repozitoriyasini yarating.",
          "Quvur: USD/JPY + EUR/JPY tarixini olish (Frankfurter) → pandas bilan tozalash → SQLiteʼga saqlash → oylik agregatsiyalar + harakatlanuvchi oʻrtachalar → grafik PNG + report.txt.",
          "Ikki marta qayta ishga tushiring — takrorlangan qatorlar yoʻqligini isbotlang.",
          "README: nima qiladi, qanday ishga tushiriladi (venv, pip install, bitta buyruq), natija namunasi, grafik.",
        ],
      },
      resources: [
        {
          title: "SQLite — UPSERT hujjati",
          url: "https://www.sqlite.org/lang_UPSERT.html",
        },
        {
          title: "Make a README — qoʻllanma",
          url: "https://www.makeareadme.com/",
        },
      ],
    },
    {
      slug: "12-capstone-2-portfolio",
      title: "Yakuniy loyiha II: deploy va portfel",
      phase: "capstone",
      why: "Suhbat ekranida hech kim kodni oʻqimaydi — hamma havolani bosadi. Bu hafta ishingizni bir bosishda yetib boradigan qilasiz va uni mehnat emas, natija tili bilan yozib berasan.",
      objectives: [
        "Grafik va asosiy sonlar bilan ommaviy sahifa deploy qilish.",
        "GitHub profilingizni ish beruvchi 30 soniyada tushunadigan portfelga aylantirish.",
        "Har bir loyihani natijaga yoʻnaltirilgan 2–3 punktda tasvirlash.",
      ],
      topics: [
        "Quvurdan oddiy report.html yaratish (shablon + grafik rasmi)",
        "Statik sahifa deploy: GitHub Pages (yoki murabbingiz bilan Vercel)",
        "Profil README va pin qilingan repozitoriyalar",
        "Arizalar uchun loyihalarni yozish (Yaponiya: 履歴書・職務経歴書, LinkedIn)",
      ],
      project: {
        title: "Ommaviy chiqish",
        description:
          "Ishlaydigan URL, sayqallangan profil va arizaga tayyor loyiha tavsiflari.",
        steps: [
          "market-pipeline dan report.html yaratish (grafik + oylik xulosa jadvali).",
          "GitHub Pages bilan deploy qilish — telefondagi ham ishlaydigan bitta ommaviy URL.",
          "Profil README: kimsiz, nima oʻrganmoqdasiz, repozitoriyalar va jonli hisobot havolalari.",
          "Eng yaxshi 4 repozitoriyani pin qiling. Har biri 2–3 punkt: nima qiladi, nima oʻrgandingiz, keyin nima.",
          "Hammasini murabbingizga koʻrsating — mulohaza oling va bir marta takomillashtiring.",
        ],
      },
      resources: [
        {
          title: "GitHub Pages — hujjatlar",
          url: "https://docs.github.com/en/pages/quickstart",
        },
        {
          title: "GitHub — profil README qoʻllanmasi",
          url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
        },
      ],
    },
  ],
};
