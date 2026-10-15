import type { Guide } from "../types";

export const guideDataUz: Guide = {
  slug: "data-files",
  title: "Maʼlumot tuzilmalari va fayllar: dasturni eslatish",
  intro:
    "Bu qoʻllanma 5-haftaga xizmat qiladi. Hozirgacha har bir dastur tugashi bilan hammasini unutardi. Bu hafta buni ikki usulda hal qilamiz: tuzilmalar (roʻyxatlar, dict) bitta ishga tushirish davomida maʼlumotni ushlab turadi, fayllar esa ishga tushirishlar orasida maʼlumotni tirik saqlaydi. Quyidagi simulyatorda fayllar Run tugmasini bosganingizda haqiqatan qoladi — haqiqiy disk kabi. Expense-tracker quring: roʻyxat, dict, fayl va hammasini jamlovchi funksiya.",
  week: "05-structures-files",
  sections: [
    {
      heading: "1. Dasturlar unutadi — ikki davo",
      body: "Har bir oʻzgaruvchi dastur tugaganda oʻladi. Ikki davo, ikki xil muammoga: BITTA ishga tushirish davomida tuzilmalar maʼlumotni tartiblangan ushlab turadi (xarajatlar roʻyxati, bitta xarajatning dicti). Ishga tushirishlar ORASIDA fayllar maʼlumotni diskda tirik saqlaydi. Expense-tracker loyihasi ikkalasini ishlatadi: ish payti roʻyxat, ertaga ham kechagi xarajatlar qolsin deb fayl. Bu — dunyodagi har qanday data tizimi ishlatadigan aynan shu taqsimot: hozir uchun xotira, keyin uchun saqlash.",
      examples: [
        {
          label: "Ikki umr",
          cmd: "expenses = []\nexpenses.append(\"coffee,500\")\n# ...run oxirida oʻladi\n\nwith open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\")\n# ...run oxirida ham tirik qoladi",
          note: "Roʻyxat oʻladi. Fayl tirik qoladi. Bu simulyatorda: Run ni ikki marta bosib koʻring.",
        },
      ],
    },
    {
      heading: "2. Roʻyxatlar chuqur — va oʻzgarish kutilmagani",
      body: "Roʻyxatlar bilan 4-haftada tanishgansiz. Endi uch narsa chuqurlashadi. append() roʻyxatning OʻZINI oʻzgartiradi va None qaytaradi — string metodlari esa yangi string qaytaradi va asl matnni oʻzgartirmaydi: stringlar oʻzgarmas, roʻyxatlar oʻzgaruvchan. Indekslar 0 dan boshlanadi, oxiridan manfiy bilan sanaladi. Va roʻyxat elementlari bittalab yoziladi: expenses[0] = \"tea,300\" bitta elementni almashtiradi. Ana shu oʻzgaruvchanlik sababli roʻyxatlar data ishining asosiy qurolidir.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "expenses = [\"coffee,500\", \"train,2000\"]\nexpenses.append(\"lunch,900\")\nexpenses[0] = \"tea,300\"\nprint(expenses)",
          output: "['tea,300', 'train,2000', 'lunch,900']",
          note: "append None qaytaradi (print qilib koʻring) — oʻzgarish ROʻYXAT ichida.",
        },
      ],
    },
    {
      heading: "3. in va not in: bor-yoʻqligini soʻrash",
      body: "\"coffee\" in expenses True yoki False deydi — roʻyxatda bormi? 'ff' in \"coffee\" qism satrni soʻraydi. \"item\" in expense_dict 'bu KALIT dictda bormi?' degani. not in teskarisiga. Bu kichik operator tsikllarning butun bir toifasini yoʻq qiladi: qidirish uchun tsikl aylantirish oʻrniga bitta qatorda soʻraysiz. 'agar toʻplamda boʻlmasa, qoʻsh' namunasida uni har kuni ishlatasiz.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "print(\"coffee\" in [\"coffee\", \"train\"])\nprint(\"ff\" in \"coffee\")\nprint(\"tea\" not in [\"coffee\", \"train\"])",
          output: "True\nTrue\nTrue",
        },
      ],
    },
    {
      heading: "4. Dict: pozitsiya emas, yorliqlar",
      body: "Roʻyxat '2-pozitsiyada nima bor?' degan savolga javob beradi. Dict 'amount qancha?' degan savolga javob beradi. Figurali qavslar va key: value juftlari: expense = {\"item\": \"coffee\", \"amount\": 500}. Kalit bilan murojaat: expense[\"amount\"] = 500. Kalit yoʻqligi — klassik tuzoq: expense[\"date\"] KeyError — Python qiymat oʻylab topmaydi, baland ovozdan rad etadi. Kalitga tayinlash YANGI kalit boʻlsa qoʻshadi: expense[\"date\"] = \"2026-10-15\". Dict tartibni saqlaydi (qoʻshilish tartibi) va istagan narsani ushlaydi — string, son, roʻyxat, boshqa dict.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense[\"amount\"])\nexpense[\"date\"] = \"2026-10-15\"\nprint(expense)",
          output: "500\n{'item': 'coffee', 'amount': 500, 'date': '2026-10-15'}",
          note: "Kalit bilan oʻqish, kalitga tayinlash bilan qoʻshish. Tartib — qoʻshilish tartibi.",
        },
        {
          label: "KeyError",
          cmd: "expense = {\"item\": \"coffee\"}\nprint(expense[\"date\"])",
          output: "KeyError: 'date'",
          note: "Kalit yoʻq xatosi — baland va aniq. Ataylab.",
        },
      ],
    },
    {
      heading: "5. Doʻstona muqobil: .get() va dictni aylanish",
      body: "expense.get(\"date\") portlash oʻrniga None qaytaradi; .get(\"date\", \"unknown\") sizning standart qiymatingizni qaytaradi. Aylanish: for k in expense KALITLARNI aylanadi. for v in expense.values() qiymatlarni; expense.items() (kalit, qiymat) juftlarini beradi — bu yerda oddiy qoldiramiz. Qoida: kalit BOʻLISHI kerak va yoʻqligi bug boʻlsa — [] (baland KeyError); yoʻqligi oddiy hayot boʻlsa — .get (jim standart).",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "expense = {\"item\": \"coffee\", \"amount\": 500}\nprint(expense.get(\"date\"))\nprint(expense.get(\"date\", \"no date\"))\nfor k in expense:\n    print(k)",
          output: "None\nno date\nitem\namount",
          note: "[] kalit yoʻq boʻlsa baland, .get doʻstona. Odat emas, maʼno bilan tanlang.",
        },
      ],
    },
    {
      heading: "6. Tuple: oʻzgarolmaydigan roʻyxat",
      body: "Tuple — qulflangan roʻyxat: (\"2026-10-15\", \"coffee\", 500). Kvadrat emas, oddiy qavslar; va append ham, elementga tayinlash ham yoʻq — urinsangiz Python 'tuple element tayinlashni qoʻllamaydi' deydi. Nega qulf kerak? Oʻzgarmaslik — vaʼdadir: bu oyoq ostida oʻzgarib ketmaydi. Tuple — qoʻzgʻalmas yozuvning tabiiy shakli: sana-modda-summa uchligi birga tugʻiladi va birga qoladi. Bu simulyatorda roʻyxat va dict ishlatasiz; tuple bilan real loyihada tanishasiz.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "expense = (\"2026-10-15\", \"coffee\", 500)\nprint(expense[0])\nprint(expense[2])",
          output: "2026-10-15\n500",
          note: "Pozitsiya bilan oʻqiladi — lekin yozilmaydi. Tugʻilishda qulflanadi.",
        },
      ],
    },
    {
      heading: "7. Fayllar: open, with va uch rejim",
      body: "open(\"expenses.txt\", \"w\") faylni ochadi: 'w' rejimi yozadi (va mavjud mazmuni OʻCHIRADI — ehtiyot), 'a' oxiriga qoʻshadi, 'r' oʻqiydi (fayl yoʻq boʻlsa baland ovozdan xato: FileNotFoundError). Professional shakl: with open(...) as f: — with, blok ichida xato boʻlsa ham, blok tugagach fayl yopilishini vaʼda qiladi. Blok ichida: f.write(text) yozadi, f.read() hammasini bitta string sifatida oʻqiydi, f.readlines() qatorlar roʻyxatini beradi.",
      examples: [
        {
          label: "Ikkalasi — yozish",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")\n    f.write(\"train,2000\\n\")",
          note: "Yozish rejimi avval faylni boʻshatadi. Qoʻshish rejimi ('a') oxiriga qoʻshadi.",
        },
        {
          label: "Ikkalasi — oʻqish",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    content = f.read()\nprint(content)",
          output: "coffee,500\ntrain,2000\n",
        },
      ],
    },
    {
      heading: "8. CSV gʻoyasi: jadvalni anglatuvchi matn",
      body: "CSV fayli — har qatori bitta yozuv, vergullar ustunlarni ajratadigan oddiy matn: coffee,500 bitta xarajat. Asboblarning hammasini allaqachon bilasiz: f.write(item + \"\\n\") bilan qator yozasiz, content.split(\"\\n\") bilan oʻqib olasiz, line.split(\",\") bilan har qatorni ajratasiz — bu [\"coffee\", \"500\"] beradi. Summani songa qaytarish: int(\"500\"). CSV gʻoyasining hammasi shu; Pythonning haqiqiy csv moduli faqat shu ajratishni (va qoʻshtirnoqlashni) avtomatlashtiradi — bu simulyatorda qoʻlda qilasiz, keyin modul nima qilayotganini tushunasiz. Roʻyxatni matnga qaytarish: \", \".join(items) — split ning koʻzgusi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "line = \"coffee,500\"\nparts = line.split(\",\")\nprint(parts)\nprint(parts[0])\nprint(int(parts[1]))\nprint(\", \".join([\"a\", \"b\"]))",
          output: "['coffee', '500']\ncoffee\n500\na, b",
          note: "split matnni roʻyxatga, join roʻyxatni matnga qaytaradi.",
        },
      ],
    },
    {
      heading: "9. Barqarorlik: Run ni ikki marta bosing",
      body: "Mana bu simulyatorning oʻzini oqlash lahzasi: oʻzgaruvchilar har run oxirida oʻladi, fayllar esa tirik qoladi. Bir dasturda fayl yozing, keyin BOSHQA dastur bilan oʻqigan holda Run bosing — mazmun hali ham bor (simulyator fayllaringizni brauzeringiz xotirasida saqlaydi; sizning mashinangizda bu disk). Ana shu barqarorlik fayllarning mavjudlik sababidir. Reset tugmasi soxta diskni tozalaydi — yangi boshlanish kerak boʻlganda.",
      examples: [
        {
          label: "Run 1: yozish",
          cmd: "with open(\"expenses.txt\", \"w\") as f:\n    f.write(\"coffee,500\\n\")",
          note: "Buni ishga tushiring. Keyin butun dasturni keyingi misol bilan almashtirib yana Run.",
        },
        {
          label: "Run 2 (boshqa dastur!): oʻqish",
          cmd: "with open(\"expenses.txt\", \"r\") as f:\n    print(f.read())",
          output: "coffee,500\n",
          note: "expenses oʻzgaruvchisi oʻlgan — fayl eslab qolgan. Mana bu — saqlash.",
        },
      ],
    },
    {
      heading: "10. Yomon ketganda — 5-haftaning klassikasi",
      body: "KeyError: 'date' — dict kaliti yoʻq: kalit qoʻshing yoki standartli .get ishlating. FileNotFoundError — mavjud boʻlmagan faylni oʻqish: avval yozing yoki nomni ls bilan tekshiring. io.UnsupportedOperation: not writable / not readable — fayl notoʻgʻri rejimda ochilgan: 'r' fayllar yozilmaydi, 'w' oʻqilmaydi. Oxiridagi boʻsh qator: fayllar \\n bilan tugaydi, shuning uchun split(\"\\n\") oxirida bitta boʻsh string beradi — filtrlang (if line != \"\"), aks holda mavjud boʻlmagan qatorni jamlaysiz. Va jimlik tuzogʻi: append() None qaytaradi — uni print qilsangiz roʻyxat emas, None chiqadi.",
      examples: [
        {
          label: "Oxiridagi boʻsh qator",
          cmd: "content = \"coffee,500\\ntrain,2000\\n\"\nprint(content.split(\"\\n\"))",
          output: "['coffee,500', 'train,2000', '']",
          note: "Oxiridagi '' ni koʻryapsizmi? Fayl oxiridagi yangi qator. Sanashdan oldin filtrlash kerak.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Tuzilmalar va fayllar — tezkor jadval",
    rows: [
      { action: "Roʻyxat oxiriga qoʻshish", command: "expenses.append(\"coffee,500\")", result: "None (roʻyxatning oʻzi oʻzgardi)" },
      { action: "Bitta elementni almashtirish", command: "expenses[0] = \"tea,300\"", result: "(element oʻzgaradi — jimlik)" },
      { action: "Bormi?", command: "\"coffee\" in expenses", result: "True / False" },
      { action: "Dict yaratish", command: "{\"item\": \"coffee\", \"amount\": 500}" },
      { action: "Kalitni oʻqish (baland)", command: "expense[\"amount\"]", result: "500" },
      { action: "Kalitni oʻqish (doʻstona)", command: "expense.get(\"date\", \"none\")", result: "None yoki standart qiymat" },
      { action: "Kalitlar / qiymatlar", command: "for k in d: / d.values()", result: "item, amount" },
      { action: "Faylga yozish", command: "with open(\"f.txt\", \"w\") as f:", result: "(fayl boʻshadi — jimlik)" },
      { action: "Faylga qoʻshish", command: "with open(\"f.txt\", \"a\") as f:", result: "(jimlik = muvaffaqiyat)" },
      { action: "Faylni oʻqish", command: "with open(\"f.txt\") as f:" },
      { action: "Matn → roʻyxat", command: "line.split(\",\")", result: "['coffee', '500']" },
      { action: "Roʻyxat → matn", command: "\", \".join(items)", result: "a, b" },
    ],
  },
  missions: [
    {
      id: "d1",
      prompt: "Trackerni boshlang: expenses deb nomlangan boʻsh roʻyxat yarating va chop eting.",
      hint: "expenses = [] — boʻsh roʻyxat. print(expenses) [] chiqaradi",
    },
    {
      id: "d2",
      prompt: "Birinchi xarajat: \"coffee,500\" satrini expenses ga qoʻshing va roʻyxatni chop eting.",
      hint: "expenses.append(\"coffee,500\") keyin print(expenses). Eslatma: append None qaytaradi — append ni emas, ROʻYXATNI print qiling.",
    },
    {
      id: "d3",
      prompt: "Yana ikkita: \"train,2000\" va \"lunch,900\" ni qoʻshing. Roʻyxatda aynan 3 xarajat boʻlsin.",
      hint: "expenses.append(\"train,2000\") va expenses.append(\"lunch,900\")",
    },
    {
      id: "d4",
      prompt: "Roʻyxatni aylaning: har xarajatni bitta qatorda chiqaradigan for tsikl.",
      hint: "for e in expenses: print(e) — 4-haftadagi tsiklingiz oʻzgarmagan.",
    },
    {
      id: "d5",
      prompt: "Bitta xarajat, toʻgʻri tuzilgan: dict expense = {\"item\": \"coffee\", \"amount\": 500} yarating va print(f\"{expense['item']}: {expense['amount']} yen\").",
      hint: "f-string qavslari ichida dict murojaati ishlaydi: {expense['item']} — ikki qoʻshtirnoq ichida bir qoʻshtirnoq.",
    },
    {
      id: "d6",
      prompt: "Tirik qoldiring: uchta xarajatni expenses.txt ga har birini bitta qatorda yozing (with va tsikl bilan).",
      hint: "with open(\"expenses.txt\", \"w\") as f: keyin for e in expenses: f.write(e + \"\\n\")",
    },
    {
      id: "d7",
      prompt: "Barqarorlikni isbotlang: faylni OʻQIB qaytaring (f.read()), qatorlarga boʻling, har xarajat qatorini chiqaring. Bu keyingi Run da ham boʻlishi mumkin — fayl eslab qoladi.",
      hint: "with open(\"expenses.txt\", \"r\") as f: content = f.read() — keyin for line in content.split(\"\\n\"): print(line). Oxiridagi boʻsh qatorni filtrlang: if line != \"\"",
    },
    {
      id: "d8",
      prompt: "Yakuniy natija: faylni oʻqing, har qatorni vergul bilan boʻling, summani int() bilan songa aylantiring va print(f\"total: {total}\") — 3400.",
      hint: "for line in content.split(\"\\n\"): if line != \"\": parts = line.split(\",\") va total += int(parts[1])",
    },
  ],
  quiz: [
    {
      q: "Dastur xarajatlarni run lar orasida nega 'unutadi'?",
      options: [
        "Python dagi bug",
        "Oʻzgaruvchilar xotirada yashaydi va dastur tugaganda tozalanadi — fayllar saqlashda yashagani uchun tirik qoladi",
        "Fayllar ham oʻchadi, shunchaki sezmayapsiz",
        "Roʻyxatlarga maxsus bayroq kerak",
      ],
      answer: 1,
      why: "Hozir uchun xotira, keyin uchun saqlash. Bu aynan shu taqsimot — har qanday data tizimining poydevori.",
    },
    {
      q: "append() va .upper() kabi string metodlari orasidagi farq nima?",
      options: [
        "Yoʻq, ikkalasi obyektni oʻzgartiradi",
        "append() roʻyxatning oʻzini oʻzgartiradi va None qaytaradi; .upper() hech narsani oʻzgartirmaydi va YANGI string qaytaradi",
        "append() yangi roʻyxat qaytaradi",
        ".upper() stringning oʻzini oʻzgartiradi",
      ],
      answer: 1,
      why: "Roʻyxatlar oʻzgaruvchan, stringlar oʻzgarmas. Bu haftaning eng amaliy kutilmagani.",
    },
    {
      q: "expense = {\"item\": \"coffee\"} boʻlsa, expense[\"date\"] nima?",
      options: ["None", "Boʻsh satr", "KeyError: 'date'", "False"],
      answer: 2,
      why: "[] kalit yoʻq boʻlsa baland ovozdan — Python qiymat oʻylab topmaydi. Yoʻqligi oddiy boʻlsa .get ishlating.",
    },
    {
      q: "\"date\" kalitini, yoʻq boʻlsa \"no date\" qaytaradigan qilib doʻstona oʻqish qanday?",
      options: [
        "expense[\"date\", \"no date\"]",
        "expense.get(\"date\", \"no date\")",
        "expense.read(\"date\")",
        "expense.key(\"no date\")",
      ],
      answer: 1,
      why: ".get(kalit, standart): portlash oʻrniga jim standart. Bug → [], oddiy hayot → .get.",
    },
    {
      q: "for k in expense: nima aylanadi?",
      options: ["Qiymatlar", "(kalit, qiymat) juftlari", "Kalitlar", "Birinchi qiymatning harflari"],
      answer: 2,
      why: "Dict tsikli kalitlarni aylanadi — 'har maydon uchun'ning tabiiy shakli.",
    },
    {
      q: "Faylni ochishda \"w\" va \"a\" farqi nima?",
      options: [
        "Hech narsa",
        "\"w\" yozadi va MAVJUD mazmunni oʻchiradi; \"a\" oxiriga qoʻshadi, borini saqlaydi",
        "\"a\" faqat sonlar uchun",
        "\"w\" faqat yangi fayllar uchun",
      ],
      answer: 1,
      why: "Klassik data yoʻqotish tuzogʻi: mavjud faylni \"w\" bilan ochsangiz kechagi data ketadi. Qoʻshish saqlaydi.",
    },
    {
      q: "with open(\"f.txt\") as f: nimani vaʼda qiladi?",
      options: [
        "Fayl avtomatik oʻqiladi",
        "Blok tugagach fayl yopiladi — ichida xato boʻsa ham",
        "Fayl oʻzgartirilolmaydi",
        "Fayl diskka yoziladi",
      ],
      answer: 1,
      why: "with — vaʼd: nima boʻlsa ham, chiqishda eshik yopiladi. Shu sabab professional shakl.",
    },
    {
      q: "open(\"expenses.txt\", \"r\") FileNotFoundError berdi. Eng ehtimol sabab?",
      options: [
        "Fayllarni avval OS yaratishi kerak",
        "Fayl mavjud emas — hech yozilmagan yoki nomning imlo xatosi",
        "Rejim notoʻgʻri",
        "Bu papkada oʻqish taqiqlangan",
      ],
      answer: 1,
      why: "Mavjud boʻlmagan faylni oʻqish baland ovozdan xato beradi (ataylab). Bir marta yozing yoki nomni tekshiring.",
    },
    {
      q: "line = \"coffee,500\" boʻlsa, line.split(\",\") nima?",
      options: ["\"coffee 500\"", "[\"coffee\", \"500\"]", "500", "[\"coffee,500\"]"],
      answer: 1,
      why: "split matnni ajratuvchidan kesib roʻyxatga aylantiradi — butun CSV gʻoyasi bitta metodda.",
    },
    {
      q: "\"coffee,500\" ni ajratgandan keyin int(line.split(\",\")[1]) nega kerak?",
      options: [
        "split matn boʻlaklari qaytaradi — \"500\" hali string va string bilan hisob qilmaysiz",
        "Roʻyxatni tartiblash uchun",
        "Vergulni oʻchirish uchun",
        "Kerak emas",
      ],
      answer: 0,
      why: "Fayllardan keladigan data HAR DOIM matn. Almashtirish — sizning ishingiz: 3-hafta sabogʻi, endi saqlash bilan.",
    },
    {
      q: "Fayl mazmuni yangi qator bilan tugasa, content.split(\"\\n\") nima beradi?",
      options: [
        "Faqat haqiqiy qatorlar",
        "Haqiqiy qatorlar + oxirida bitta boʻsh string",
        "Xato",
        "Bitta string",
      ],
      answer: 1,
      why: "Oxiridagi boʻsh qator — fayl ishining klassik off-by-one: sanashdan yoki jamlashdan oldin filtrlang (if line != \"\").",
    },
    {
      q: "Bitta xarajat yozuvi (sana, modda, summa) uchun tuple tabiiy shakl nega?",
      options: [
        "Tezroq boʻlgani uchun",
        "Oʻzgarmas boʻlgani uchun — oyoq ostida oʻzgarmaydi degan vaʼd",
        "Kamroq xotira olgani uchun",
        "Tuple koʻproq saqlay olgani uchun",
      ],
      answer: 1,
      why: "Uchta qiymat birga tugʻiladi va birga qoladi — oʻzgarmaslik cheklov emas, imkoniyat.",
    },
  ],
  outro:
    "Sakkiz missiya oʻtganda, 5-haftaning haqiqiy loyihasining yuragini qurgansiz: oʻz oxiridan omon qoladigan tracker. Faqat oʻqish qismi bilan yana Run bosing — fayl hali eslab qoladi. Keyin mashinangizda haqiqiysini qiling: xuddi shu tuzilish, haqiqiy diskdagi haqiqiy fayllar, va qoʻlda yasalgan split oʻrniga haqiqiy csv moduli. Keyingi hafta, 6-hafta: skriptlaringiz internet bilan gaplashadi — requests, JSON va fx-tracker loyihasi.",
};
