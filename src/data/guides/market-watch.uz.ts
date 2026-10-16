import type { Guide } from "../types";

export const guideWatchUz: Guide = {
  slug: "market-watch",
  title: "market-watch: bitta skript, bitta ish",
  intro:
    "Bu qoʻllanma 7-haftaga xizmat qiladi. Mustahkamlash haftasi: olish skriptini kichkina va ishonchli vositaga aylantiring. Simulyator internetida yangi endpoint bor — 30 kunlik USD/JPY tarixi. Uni oling, roʻyxatga aylantiring, haqiqiy statistikani hisoblang (min, max, mean, std), eng katta harakatni toping va running omon qoladigan hisobotni yozing. Missiyalar haftalik rejaning haqiqiy market-watch.py ini quradi.",
  week: "07-market-watch",
  sections: [
    {
      heading: "1. Haqiqiy vositaning shakli",
      body: "6-haftadagi skript bitta olish qildi. Haqiqiy vositaning shakli bor: olish → tozalash → tahlil → hisobot. Olish xom maʼlumotni oladi (sanalar dicti). Tozalash uni tahlil kerak qiladigan shaklga (oddiy sonlar roʻyxati) aylantiradi. Tahlil javoblarni hisoblaydi (min, max, mean, std, eng katta harakat). Hisobot javoblarni odam oʻqiydigan matnga aylantiradi — va bu haftada, run dan omon qoladigan faylga. Toʻrtta feʼl, bitta yoʻnalish, yondashuvsiz: bu skriptdan eng katta tizimlargacha — har qanday data vositasining aynan shu quvuri.",
      examples: [
        {
          label: "Toʻrtta feʼl",
          cmd: "fetch (requests) --> clean (loops) --> analyze (math) --> report (f-strings + files)",
          note: "Toʻrtta feʼl, bitta yoʻnalish. Bu yerni oʻrgan, abadiy qayta ishlat.",
        },
      ],
    },
    {
      heading: "2. Tarix endpointi: yangi JSON shakli",
      body: "Internetga ikkinchi turdagi endpoint qoʻshildi: tarix. https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY birdan 30 kun javob beradi — va yangi shaklga eʼtibor: rates — KALITLARI sanalar boʻlgan dict, va har sana oʻzining kichik kurs dictini ushlaydi. Sanalar kalit sifatida: for date in data[\"rates\"] bilan kunlarni aylan; data[\"rates\"][date][\"JPY\"] — oʻsha kun kursi. Haqiqiy APIlar doim shunday shakllar qaytaradi — sanalar bilan kalitlangan dict-in-dict — 8-haftadagi pandasda yana uchraysiz.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY\"\ndata = requests.get(url).json()\nprint(len(data[\"rates\"]))\nprint(data[\"rates\"][\"2026-09-16\"])\nprint(data[\"rates\"][\"2026-09-16\"][\"JPY\"])",
          output: "30\n{'JPY': 147.8}\n147.8",
          note: "30 kun, bitta soʻrov. Sanalar kalit — klassik vaqt qatorlari shakli.",
        },
      ],
    },
    {
      heading: "3. Tozalash: dict-in-dict dan sonlar roʻyxatiga",
      body: "Tahlil dict-in-dict emas — sonlar roʻyxatini istaydi. Shuning uchun tozalash qadami qayta shakllantiradi: ikkita boʻsh roʻyxat, sanalar boʻylab for tsikl va append. values — 30 ta oddiy son, dates — 30 ta sana satr, bir xil tartibda — ikkita parallel roʻyxat. Bu qayta shakllantirish — data tozalashning oʻzagi: olgan shaklingiz hech qachon kerakli shaklga mos kelmaydi, va shakllar orasida oʻgirish — data ishining yarmi. Intizomga eʼtibor: bitta tsikl ikkala roʻyxatni toʻldiradi va pozitsiyalarni tekislaydi — values[i] va dates[i] har doim bir kun.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "values = []\ndates = []\nfor date in data[\"rates\"]:\n    values.append(data[\"rates\"][date][\"JPY\"])\n    dates.append(date)",
          note: "Ikki roʻyxat, bitta tsikl, bir tartib — values[i] va dates[i] bir kun. Ana shu tekislik eng katta harakat tahliliga kerak.",
        },
      ],
    },
    {
      heading: "4. min, max, sum: tsikllaringizning mukofoti",
      body: "4-haftada total() ni oʻz tsiklingiz bilan yozgansiz va keyinchalik til mukofot beradi deb vaʼda qilganman. Mana: min(values), max(values), sum(values) — tsiklingiz aynan qilgan ishni bitta chaqiruvda qiladigan oʻrnatilgan funksiyalar. Mukofot ikki karra: kod kamayadi VA ichida nima ishlayotganini aniq bilasiz — chunki qoʻlda qurgansiz. Boʻsh roʻyxatda min() baland ovozdan rad etadi (ValueError: min() arg is an empty sequence) — halol xato, chunki «hech narsaning minimumi» javobi yoʻq.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "print(min(values))\nprint(max(values))\nprint(sum(values) / len(values))",
          output: "146.5\n151.6\n148.91933333333334",
          note: "4-haftadagi akkumulyatorning zavod versiyasi. Ichida nima borini bilasiz — chunki oʻzingiz qurgansiz.",
        },
      ],
    },
    {
      heading: "5. Mean va std: ikki halol son",
      body: "Mean — jami soniga boʻlinishi: sum(values) / len(values). Std (standart chetlanish) — kunlar mean atrofida qancha tarqalganini oʻlchaydi — treyder uchun bu volatillik: tinoy oy va yovvoyi oy orasidagi farq. Retsept, sekin: har qiymatdan mean ni ayir (har kun oʻrtachadan qancha uzoqda), har masofani kvadratga oshir (manfiylarni musbat qiladi), kvadratlarni oʻrtachalashtir, kvadrat ildizini ol (** 0.5 — yarim daraja kvadratni bekor qiladi). [1, 2, 3] bilan yuring: mean 2, masofalar -1, 0, 1, kvadratlar 1, 0, 1, oʻrtacha 0.667, ildiz 0.82. Kichik roʻyxat, kichik std — raqamlar intuition aytganini qilmoqda.",
      examples: [
        {
          label: "Ikkalasi — mean va std",
          cmd: "mean = sum(values) / len(values)\ntotal = 0\nfor v in values:\n    total += (v - mean) ** 2\nstd = (total / len(values)) ** 0.5\nprint(f\"mean: {mean:.2f}\")\nprint(f\"std: {std:.2f}\")",
          output: "mean: 148.92\nstd: 1.38",
          note: "Ayirish, kvadrat, oʻrtacha, kvadrat ildiz. Toʻrt qadam, .2f uni odam qiladi.",
        },
      ],
    },
    {
      heading: "6. Eng katta harakat: kecha va bugun",
      body: "Hisobotning sarlavhasi: qaysi kun eng koʻp harakat qildi? Har kunni oldingisi bilan solishtiring: change = values[i] - values[i - 1], for i in range(1, len(values)) — 1 dan, chunki 0-kunining kechasi yoʻq. Eng katta absolyut harakatni kuzating: if abs(change) > abs(biggest) boʻlsa, change VA uning sanasini (dates[i]) ikkalasini eslang. Bizning datada 2026-10-15 dagi -1.62 tushish yutadi — va abs() funksiyasi 3-haftadan sizniki ekaniga eʼtibor. Haqiqiy tahlil har doim shu: allaqachon egalik qilgan kichik boʻlaklarning birlashuvi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "biggest = 0\nbiggest_date = \"\"\nfor i in range(1, len(values)):\n    change = values[i] - values[i - 1]\n    if abs(change) > abs(biggest):\n        biggest = change\n        biggest_date = dates[i]\nprint(f\"biggest move: {biggest_date} ({biggest:.2f})\")",
          output: "biggest move: 2026-10-15 (-1.62)",
          note: "1 dan (0-kunining kechasi yoʻq). abs() harakat kattaligini solishtiradi; belgisi yoʻnalishni aytadi.",
        },
      ],
    },
    {
      heading: "7. Hisobot: birlashtir va yozib qoʻy",
      body: "Hisobot qadami — boshqa har qanday funksiya kabi: def report(values): qatorlarni quradi (f-stringlar roʻyxati), ularni \"\\n\" bilan birlashtiradi va matnni return qiladi — print emas, return, chunki chaqiruvchi nima qilishini hal qiladi: chop etish yoki open bilan report.txt ga yozish. Bu — vosita miqyosidagi 4-hafta sabogʻi: funksiyalar qiymat ishlab chiqaradi; asosiy dastur manzilni tanlaydi. Va hisobotni faylga yozish uni run dan omon qoldiradi — faqat oʻqish qismi bilan yana Run bosing, u hali ham bor. Sizning chiqishingiz endi ekrangina emas — mahsulot.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "def report(values):\n    lines = []\n    lines.append(\"USD/JPY 30-day report\")\n    lines.append(f\"min: {min(values)}\")\n    lines.append(f\"mean: {sum(values) / len(values):.2f}\")\n    return \"\\n\".join(lines)\n\ntext = report(values)\nprint(text)\nwith open(\"report.txt\", \"w\") as f:\n    f.write(text)",
          output: "USD/JPY 30-day report\nmin: 146.5\nmean: 148.92",
          note: "Qatorlarni qur, birlashtir, RETURN. Chaqiruvchi chop etadi yoki yozadi — funksiya begamub.",
        },
      ],
    },
    {
      heading: "8. print() va logging: yumshoq kattalash",
      body: "Bu hafta vositangiz printlar bilan halol: hodisaga bitta qator, aniq qoʻshimcha ('skipping: bad status'). Skriptlar oʻsib, odamsiz ishlay boshlaganda, printlar loggingga oʻtadi: xuddi oʻsha xabarlar, lekin darajalar bilan (INFO oddiy ish uchun, WARNING skiplar uchun, ERROR muvaffaqiyatsizlik uchun) va vaqt belgisi bilan — log soʻralmasdan ertalab soat 3da nima boʻlganini aytadi. Bu loyiha uchun intizomli printlar yetarli; farqni bilish — asosiy narsa. Simulyator printlarni saqlaydi — hozir quriladigan odat — «kim gapirdi» degan qoʻshimchadir.",
      examples: [
        {
          label: "Koʻchadigan odat",
          cmd: "print(\"skipping: bad status\")\nprint(\"fetched: 30 days\")\nprint(\"report: written to report.txt\")",
          note: "Har qator kim gapirganini aytadi. Bu odat — loggingning 90%i; darajalar va vaqt belgisi keyin keladi.",
        },
      ],
    },
    {
      heading: "9. Har kuni ishga tushirish (real mashina, ixtiyoriy)",
      body: "Haqiqiy market-watch oʻzini oʻzi ishga tushirish orqali qiymat oladi. Linux/macOS: cron — crontab.guru jadvalni yozishda yordam beradi; 0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py qatori uni ish kunlari 09:00 da ishga tushiradi. Windows: Task Scheduler — Create Basic Task → kunlik trigger → amal: dasturni ishga tushirish → .venv pythony va skript yoʻli. Ikkalasi bir ishni qiladi: sizning OS — dunyodagi eng ishonchli while-tsikl — Run ni siz uchun bosadi. Bu hafta ixtiyoriy — lekin tasavvur muhim: oʻzini oʻzi ishga tushiradigan vositalar.",
      examples: [
        {
          label: "Linux / macOS (cron)",
          cmd: "0 9 * * 1-5 /home/you/market-watch/.venv/bin/python scripts/market_watch.py",
          note: "Ish kunlari 09:00. crontab.guru bularni yozib beradi.",
        },
        {
          label: "Windows (Task Scheduler)",
          cmd: "Task Scheduler → Create Basic Task → Daily 09:00 → Start a program → python.exe + skript yoʻli",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "market-watch — tezkor jadval",
    rows: [
      { action: "Bitta soʻrovda 30 kun", command: 'requests.get("...2026-09-16..2026-10-15?from=USD&to=JPY")', result: "(30 kunlik response)" },
      { action: "Vaqt qatori shakli", command: 'data["rates"][date]["JPY"]', result: "147.8 (oʻsha kun kursi)" },
      { action: "Kunlarni aylanish", command: 'for date in data["rates"]:', result: "(bir aylanishga bitta sana)" },
      { action: "Roʻyxatga shakllantirish", command: "values.append(data[\"rates\"][date][\"JPY\"])", result: "(hech narsa koʻrinmaydi — roʻyxat oʻsadi)" },
      { action: "Eng kichik / eng katta", command: "min(values), max(values)", result: "146.5 / 151.6" },
      { action: "Oʻrtacha", command: "sum(values) / len(values)", result: "148.92 (.2f bilan)" },
      { action: "Std (volatillik)", command: "(total / len(values)) ** 0.5", result: "1.38 (.2f bilan)" },
      { action: "Kvadrat ildiz", command: "x ** 0.5", result: "x ning kvadrat ildizi" },
      { action: "Har kun kechaga qarshi", command: "for i in range(1, len(values)):", result: "(1 dan — 0-kunining kechasi yoʻq)" },
      { action: "Bugungi harakat", command: "values[i] - values[i - 1]", result: "+0.30 / -1.62 ..." },
      { action: "Hisobot qurish", command: 'lines.append(f"min: {min(values)}")', result: "(bir appendga bitta qator)" },
      { action: "Qatorlar → matn", command: '"\\n".join(lines)', result: "(bitta matn, qatorlar orasida \\n)" },
      { action: "Omon qoldirish", command: 'with open("report.txt", "w") as f:', result: "(fayl runlar orasida qoladi)" },
    ],
  },
  missions: [
    {
      id: "s1",
      prompt: "Tarixni oling: 2026-09-16..2026-10-15 USD→JPY endpoint, response.json() ni data ga toʻxtatib, kunlar sonini chop eting — len(data[\"rates\"]).",
      hint: "URL: https://api.frankfurter.app/2026-09-16..2026-10-15?from=USD&to=JPY — keyin print(len(data[\"rates\"])).",
    },
    {
      id: "s2",
      prompt: "Tozalash: values va dates boʻsh roʻyxatlari; sanalar boʻylab bitta for tsikl har kunining JPY kursini va sanasini append qilsin.",
      hint: "for date in data[\"rates\"]: keyin values.append(data[\"rates\"][date][\"JPY\"]) va dates.append(date).",
    },
    {
      id: "s3",
      prompt: "Birinchi statistikalar: print(f\"min: {min(values)}\") va print(f\"max: {max(values)}\") — 4-haftadagi tsikllaringizning zavod versiyasi.",
      hint: "min(values) va max(values) — 4-boʻlimdagi oʻrnatilganlar.",
    },
    {
      id: "s4",
      prompt: "Oʻrtacha: mean = sum(values) / len(values), aynan 2 kasr bilan chop etilgan.",
      hint: 'print(f"mean: {mean:.2f}") — sum va len, har biri bitta qator.',
    },
    {
      id: "s5",
      prompt: "Volatillik: std ni hisoblang — mean dan kvadrat masofalar, oʻrtachalashtirilgan, kvadrat ildiz — 2 kasr bilan chop etilgan.",
      hint: "total = 0 / for v in values: total += (v - mean) ** 2 / std = (total / len(values)) ** 0.5 — keyin print(f\"std: {std:.2f}\").",
    },
    {
      id: "s6",
      prompt: "Sarlavha: eng katta kunlik harakat — har kunni kecha bilan solishtiring, eng katta absolyut oʻzgarishni kuzating va print(f\"biggest move: {biggest_date} ({biggest:.2f})\").",
      hint: "for i in range(1, len(values)): change = values[i] - values[i - 1] — if abs(change) > abs(biggest): change VA dates[i] ni eslab qoling.",
    },
    {
      id: "s7",
      prompt: "Omon qoldiring: report(values) funksiyasi qatorlarni qursin (sarlavha 'USD/JPY 30-day report', min, mean), birlashtirsin, matnni RETURN qilsin; chop etib report.txt ga yozing.",
      hint: 'lines = [] / lines.append("USD/JPY 30-day report") / ... / return "\\n".join(lines) — keyin text = report(values), print(text) va with open("report.txt", "w") bilan saqlash.',
    },
    {
      id: "s8",
      prompt: "Yuborish: toʻliq quvur — olish, tozalash, statistika, eng katta harakat, hisobot, fayl — bitta dastur, tartibda. Run qiling; yuqoridagi hammasi birdan yonadi.",
      hint: "Qurgan hamma narsangizni boʻlimlar tartibida: olish → values/dates → min/max/mean/std → eng katta harakat → report(values) → report.txt. Bitta Run, hammasi yashil.",
    },
  ],
  quiz: [
    {
      q: "Haqiqiy data vositasining shakli qanday?",
      options: [
        "Hammasini qiladigan bitta ulkan funksiya",
        "Olish → tozalash → tahlil → hisobot — toʻrt feʼl, bitta yoʻnalish",
        "Maʼlumotni oʻqi, maʼlumotni chop et",
        "API nima qaytarsa oʻsha",
      ],
      answer: 1,
      why: "Toʻrt feʼl, bitta yoʻnalish, yondashuvsiz — bu skriptdan eng katta tizimlargacha boʻlgan har qanday data vositasining quvuri.",
    },
    {
      q: "Tarix endpointining JSON shaklidagi yangilik nima?",
      options: [
        "Hech narsa — latest bilan bir xil",
        "rates — kalitlari sanalar boʻlgan dict, har sana oʻz kurs dictini ushlaydi — klassik vaqt qatori shakli",
        "Dict emas, roʻyxat qaytaradi",
        "JSON emas, matn qaytaradi",
      ],
      answer: 1,
      why: "Sanalar kalit: dict tsikli kunlarni aylanadi. Bu shaklni pandasda yana uchratasiz.",
    },
    {
      q: "Tozalash qadami dict-in-dict ni roʻyxatga nega aylantiradi?",
      options: [
        "Roʻyxatlar tezroq boʻlgani uchun",
        "Tahlil oddiy sonlar roʻyxatini kerak qiladi — olingan shakl kerakli shaklga hech qachon mos kelmasligi uchun",
        "Dictlarni aylanib boʻlmaganligi uchun",
        "Faylni kichraytirish uchun",
      ],
      answer: 1,
      why: "Shakllar orasida oʻgirish — data ishining yarmi; «tozalash» asosan shuni anglatadi.",
    },
    {
      q: "values[i] va dates[i] ning umumiyligi nima?",
      options: [
        "Hech narsa",
        "Bir tsiklda toʻldirilgan, shuning uchun ikkalasidagi i pozitsiyasi bir kun — parallel roʻyxatlar",
        "Har doim teng",
        "Bittasi ikkinchisining nusxasi",
      ],
      answer: 1,
      why: "Bitta tsikl ikkalasini bir tartibda toʻldiradi. Ana shu tekislik eng katta harakat tahliliga kerak.",
    },
    {
      q: "min([]) — boʻsh roʻyxat — nima qiladi?",
      options: [
        "0 qaytaradi",
        "None qaytaradi",
        "ValueError: min() arg is an empty sequence koʻtaradi — «hech narsaning minimumi» javobi yoʻq",
        "Boʻsh roʻyxat qaytaradi",
      ],
      answer: 2,
      why: "Halol rad etish. Data boʻsh boʻlsa, jim 0 emas — baland xato kerak.",
    },
    {
      q: "std qanday tartibda hisoblanadi?",
      options: [
        "Qiymatlani saralab oʻrtasini olish",
        "Har qiymatdan mean ni ayirish, masofalarni kvadratga oshirish, kvadratlarni oʻrtachalashtirish, kvadrat ildiz olish",
        "Hammasini qoʻshib ikkiga boʻlish",
        "Eng kattadan eng kichikni ayirish",
      ],
      answer: 1,
      why: "Ayirish, kvadrat, oʻrtacha, kvadrat ildiz. Treyder uchun bu — volatillik: tinch oy va yovvoyi oy farqi.",
    },
    {
      q: "x ** 0.5 nima?",
      options: [
        "x ni 0.5 ga boʻlingani",
        "x ning yarim darajasi — x ning kvadrat ildizi",
        "x ning yarmi",
        "Xato — darajalar butun boʻlishi kerak",
      ],
      answer: 1,
      why: "Yarim daraja kvadratni bekor qiladi — std retseptining kvadrat-ildiz hiylasi.",
    },
    {
      q: "Eng katta harakat tsikli range(1, len(values)) dan nega boshlanadi?",
      options: [
        "0-kun yaroqsiz data boʻlgani uchun",
        "0-kunining solishtiradigan kechasi yoʻqligi uchun — change = values[i] - values[i - 1] ga i - 1 kerak",
        "Dam olish kunini oʻtkazib yuborish uchun",
        "Python roʻyxatlari 1 dan boshlanishi uchun",
      ],
      answer: 1,
      why: "Solishtirishga juftlik kerak. 1 dan boshlasangiz, har kunining kechasi bor.",
    },
    {
      q: "report() print oʻrniga matnni nega return qilishi kerak?",
      options: [
        "Print sekin boʻlgani uchun",
        "Chaqiruvchi nima qilishini hal qiladi — chop etish, faylga yozish: funksiyalar ishlab chiqaradi, chaqiruvchilar hal qiladi",
        "Python funksiya ichida printni taqiqlagani uchun",
        "Fayllarga print emas, matn kerak boʻlgani uchun",
      ],
      answer: 1,
      why: "Vosita miqyosidagi 4-hafta sabogʻi: funksiyalar RETURN qiladi. print — asosiy dasturning qarori.",
    },
    {
      q: "Dasturingizning ikki Run orasida nima omon qoladi?",
      options: [
        "Barcha oʻzgaruvchilar",
        "Fayllar — oʻzgaruvchilar har run oxirida oʻladi; fayllar qoladi (simulyatorda soxta disk, uyda haqiqiy disk)",
        "Hech narsa",
        "Faqat oxirgi print",
      ],
      answer: 1,
      why: "Hozir uchun xotira, keyin uchun saqlash — 5-haftadan beri boʻlgan bir xil taqsimot, endi mahsulot chiqaradi: report.txt.",
    },
    {
      q: "print() va logging farqi nima?",
      options: [
        "logging tezroq",
        "logging — oʻsgan print: darajalar (INFO/WARNING/ERROR) va vaqt belgisi — soʻralmasdan ertalab 3:00 dagi run ni tushuntira oladigan xabarlar",
        "logging faqat fayllarda ishlaydi",
        "Hech narsa — sinonim",
      ],
      answer: 1,
      why: "Bu loyiha uchun intizomli printlar yetarli. HOZIR koʻchadigan odat — «kim gapirdi» qoʻshimchasi.",
    },
    {
      q: "cron va Task Scheduler vositangiz uchun haqiqatan nima qiladi?",
      options: [
        "Skriptni tezlashtiradi",
        "Jadval boʻyicha Run ni siz uchun bosadi — sizning OS, dunyodagi eng ishonchli while-tsikl",
        "Buglarni avtomatik tuzatadi",
        "Hisobotni siqadi",
      ],
      answer: 1,
      why: "Oʻzini oʻzi ishga tushiradigan vositalar: ish kunlari 09:00, odam aralashmaydi. Bu hafta ixtiyoriy — tasavvur muhim.",
    },
  ],
  outro:
    "Sakkizinchi missiya bitta Run da yonganda, 7-hafta loyihasini yuborgansiz: 30 kun olish, qayta shakllantirish, haqiqiy statistika, sarlavha harakati, omon qoladigan hisobot. Boʻsh muharrirdan yana bir marta qiling — toʻrt feʼl oʻylamasdan tartibda chiqsa, 8-haftaga tayyorsiz: pandas tozalash va hisoblashni olib ketadi va tsikllaringiz nima uchun mashq boʻlganini oxirgi koʻrasiz.",
};
