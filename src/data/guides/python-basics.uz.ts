import type { Guide } from "../types";

export const guidePythonUz: Guide = {
  slug: "python-basics",
  title: "Python I: qiymatlar, matn, qarorlar — sekin",
  intro:
    "Bu qoʻllanma 3-haftaga xizmat qiladi. Bular — kelajakda yozadigan har bir dasturingizning atomlari: qiymat saqlash, matn qurish, qaror qabul qilish. BU YERDA SHOSHMANG — poydevor boʻsh boʻlsa, keyin bir necha hafta yoʻqotasiz. Simulyatorni ochib qoʻygan holda darslikni oʻqing: dasturlarni yozing, ishga tushiring, ataylab buzing, xatolarni oʻqing. Keyin testni yeching.",
  week: "03-python-basics-1",
  sections: [
    {
      heading: "1. Dastur aslida nima",
      body: "Dastur — kompyuter yuqoridan pastga, qatorma-qator bajaradigan koʻrsatmalar roʻyxati. Kompyuter juda tez va juda harfiy: siz yozganingizni qiladi, nazarda qilganingizni emas. Python deyarli ingliz tili kabi oʻqiladigan qilib dizayn qilingan — shu sababli dunyoda eng koʻp uchraydigan birinchi til. Bu sahifadagi simulyatorda dasturingiz qator-ma qator ishlaydi: print() biror narsa koʻrsatadi, = eslab qoladi, if qaror qabul qiladi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "print(\"hello\")\nprint(\"goodbye\")",
          output: "hello\ngoodbye",
          note: "Yuqoridan pastga. Har doim.",
        },
      ],
    },
    {
      heading: "2. Oʻzgaruvchilar: yorliqlar, tenglamalar emas",
      body: "Oʻzgaruvchi — qiymatga keyinroq ishlatish uchun ilingiz yorliq. = belgisi matematik tenglik emas — bu koʻrsatma: 'oʻng tomonni hisobla, keyin shu nom ostida saqla'. Tayinlashlar oʻngdan chapga oʻqiladi. Nomlar: kichik harflar va pastki chiziq (usd, learning_log) — tushuntiruvchi nomlar bepul va abadiy toʻlaydi. Oʻzgaruvchi tayinlangandan keyingina mavjud: undan oldin ishlatish — klassik NameError.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "rate = 150.0\nyen = 30000\nusd = yen / rate\nprint(usd)",
          output: "200",
          note: "Avval oʻng tomon, keyin nom. rate, yen, usd — x1, x2 emas, soʻzlar.",
        },
        {
          label: "Klassik NameError",
          cmd: "print(rtae)",
          output: "NameError: name 'rtae' is not defined",
          note: "Imlo xatosi — kompyuter nazarda tutinganingizni emas, yozganingizni qiladi.",
        },
      ],
    },
    {
      heading: "3. Sonlar: int, float va operatorlar",
      body: "Pythonʼda ikki xil son turi bor: int (30000, butun) va float (150.0, kasr nuqtali). Nuqta uni float qiladi. Arifmetika: + - * va qavslar matematikadagidek. Hammoylni hayron qiladigan uchta operator: / har doim float boʻlinish (7 / 2 = 3.5, butunlar uchun ham), // butun boʻlinish (7 // 2 = 3), % qoldiq (7 % 2 = 1 — juft-toq tekshiruvida ishlatiladi). ** daraja: 2 ** 10 = 1024. Nolga boʻlish xato — haqiqiy, lekin qulay: ZeroDivisionError.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 10)",
          output: "3.5\n3\n1\n1024",
        },
        {
          label: "Pul holati",
          cmd: "yen = 30500\nrate = 150.0\nprint(yen / rate)",
          output: "203.33333333333334",
          note: "Float koʻp kasr olib yuradi — bu oddiy. f-string (keyingi) ularni odam uchun yigʻadi.",
        },
      ],
    },
    {
      heading: "4. Stringlar: yozilganidek matn",
      body: "String — bir yoki ikki qoʻshtirnoq orasidagi matn — maʼnosi bir xil, bittasini tanlab izchil boʻling. Stringlar + bilan qoʻshiladi (yopishtirish), * bilan takrorlanadi (\"ab\" * 3 = \"ababab\"). Hammoyi uradigan tuzoq: \"matn\" + son — TypeError — hisobmi, yopishtirishmi, kompyuter taxmin qilishdan bosh tortadi. Yechim: almashtirish (str(son)) yoki, yaxshisi, f-string — keyingi boʻlim.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "print(\"30000\" + \" JPY\")",
          output: "30000 JPY",
          note: "Ikkala tomon string: + yopishtiradi.",
        },
        {
          label: "Hammoyi uchraydigan TypeError",
          cmd: "print(\"yen: \" + 30000)",
          output: "TypeError: can only concatenate str (not \"int\") to str",
          note: "Kompyuter taxmin qilishdan bosh tortadi. Almashtiring yoki f-string ishlating.",
        },
      ],
    },
    {
      heading: "5. f-string: oshiq boʻlish kerak boʻlgan yagona imkoniyat",
      body: "Qoʻshtirnoqdan oldin f qoʻysangiz, { } dasturingizga oyna boʻladi: f\"{yen} JPY = {usd} USD\" joriy qiymatlarni joylaydi. Qavslar ichida istagan ifoda ishlatiladi — f\"{yen / rate}\". Va pul hiylasi: :.2f format belgisi aynan 2 kasr qoldiradi: f\"{usd:.2f}\" 200.0 ni 200.00 qiladi. Data hisobotlari va pul uchun karyeringizning har kuni ishlatasiz. Bu butun qoʻllanmadagi eng foydali narsa.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "yen = 30000\nrate = 150.0\nusd = yen / rate\nprint(f\"{yen} JPY = {usd:.2f} USD\")",
          output: "30000 JPY = 200.00 USD",
        },
        {
          label: "Qavslar ichida ifoda ham ishlaydi",
          cmd: "print(f\"{30000 / 150} dollars\")",
          output: "200 dollars",
        },
      ],
    },
    {
      heading: "6. String metodlari: yangi matn qaytaradigan asboblar",
      body: "Stringlarga asboblar biriktirilgan: .strip() oxiridagi boʻshliqlarni olib tashlaydi, .lower() va .upper() registerni oʻzgartiradi, .title() har soʻzni bosh harfdan boshlaydi, .replace(a, b) matnni almashtiradi. Qavslar bilan chaqiring: name.strip(). Zanjirlanadi: name.strip().lower(). Bitta muhim fakt: stringlar oʻzgarmas — metodlar asl matnni oʻzgartirmaydi, ular YANGI string qaytaradi. Natijani ishlatmasangiz — hech narsa boʻlmagan.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "name = \"  Mountain Shadow  \"\nprint(name.strip())\nprint(name.strip().lower())",
          output: "Mountain Shadow\nmountain shadow",
          note: "name oʻzi oʻzgarmagan — metodlar yangi string qaytardi.",
        },
      ],
    },
    {
      heading: "7. Sanash va kesish: len() va slice",
      body: "len() harflarni sanaydi: len(\"hello\") = 5. Stringlar ketma-ketlik va har bir belgi pozitsiyaga ega — BIRDAN emas, NOLDAN boshlanadi. s[0] birinchi belgi, s[-1] oxirgi (oxiridan sanaydi — juda qulay). Slice bir boʻlak kesadi: s[0:8] — 0-pozitsiyadan 7-gacha (oxiri kirmaydi). Bir kun gʻalati tuyuladi, keyin ikkinchi tabiat boʻladi. Bir harf yetishmasa oxirgi indeksga qarang — off-by-one boshlanuvchining klassik xatosi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "s = \"Mountain Shadow\"\nprint(s[0])\nprint(s[-1])\nprint(s[0:8])\nprint(len(s))",
          output: "M\nn\nMountain\n15",
          note: "s[0:8] = 0..7-pozitsiyalar. Oxiri kirmaydi. Har doim.",
        },
      ],
    },
    {
      heading: "8. Taqqoslash va boolean: True, False",
      body: "== 'bular tengmi?' deb soʻraydi va True yoki False deb javob beradi. Tuzoqlar tuzogʻi: = tayinlaydi, == taqqoslaydi — shart ichida = yozish Pythonʼda SyntaxError va bu sizni oʻzingizdan himoya qilish. Boshqalari: != (teng emas), < <= > >=. Booleanlar and, or, not bilan birikadi. Python haqiqat qoidalari: 0, \"\" va False — yolgʻon; qolganlarning deyarli hammasi — rost.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "yen = 30000\nprint(yen == 30000)\nprint(yen > 10000 and yen < 100000)",
          output: "True\nTrue",
        },
        {
          label: "= va == tuzogʻi",
          cmd: "if yen = 30000:\n    print(\"ok\")",
          output: "SyntaxError: invalid syntax",
          note: "= tayinlaydi, == taqqoslaydi. Python xato qilganini rad etadi — ataylab.",
        },
      ],
    },
    {
      heading: "9. if / elif / else: dastur qaror qabul qiladi",
      body: "if shart True boʻlgandagina blokni bajaradi. Tuzilish aniq uch qismdan: if soʻzi, shart, ikki nuqta — keyin 4 boʻsh joy bilan surilgan blok. Ikki nuqta va surish — mana shu GRAMMATIKA: nuqtani unutsangiz SyntaxError, surishni unutsangiz IndentationError. elif boshqa shart qoʻshadi ('else if'), else — zaxira. Butun zanjirdan aynan BITTA shox bajariladi — ikki ham, nol ham emas.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "yen = 30000\nif yen > 10000:\n    print(\"big\")\nelif yen > 0:\n    print(\"ok\")\nelse:\n    print(\"invalid: negative amount\")",
          output: "big",
          note: "Uchtadan biri bajarildi. Surish Pythonʼga nima qayerga tegishli.ligini aytadi.",
        },
      ],
    },
    {
      heading: "10. Turlarni almashtirish: interpretatorning halolligi",
      body: "int(\"30000\") matnni songa, float(\"150.5\") floatga, str(200) sonni matnga aylantiradi. Nega? Fayllardan, internetdan va input() dan keladigan maʼlumot HAR DOIM matn sifatida keladi — almashtirish sizning ishingiz. Va almashtirish halol: int(\"hello\") — ValueError ('invalid literal'), chunki hello son emas. Namunani ushlang: TypeError — amal uchun notoʻgʻri TUR; ValueError — tur toʻgʻri, lekin MAZMUN imkonsiz.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "text = \"30000\"\nprint(text + \" JPY\")\nprint(int(text) + 1)",
          output: "30000 JPY\n30001",
          note: "Bir xil qiymat, har xil tur, har xil xatti-harakat.",
        },
        {
          label: "Halol rad etish",
          cmd: "print(int(\"hello\"))",
          output: "ValueError: invalid literal for int() with base 10: 'hello'",
        },
      ],
    },
    {
      heading: "11. Yomon ketganda — avval xatoni oʻqish",
      body: "Oʻsadigan oʻquvchini qiynaladigan oʻquvchidan ajratadigan intizom: biror narsa yozishdan oldin xatoning oxirgi qatorini ovoz chiqarib oʻqish. NameError: name 'x' is not defined — tayinlashdan oldin ishlatgan yoki imlo xatosi. TypeError: can only concatenate str — string va sonni aralashtirgan: almashtir yoki f-string. SyntaxError: invalid syntax — odatda ikki nuqta yoki qoʻshtirnoq yetishmaydi; xato muammoning oʻzini yoki darhol oldini koʻrsatadi. IndentationError: unexpected indent — qatorlar tekis emas; har blok darajasini aynan 4 boʻsh joy qiling. ZeroDivisionError — matematika rad etdi. Simulyatorda xatolar qator raqami bilan chiqadi: oʻsha qatorga boring va ovoz chiqarib oʻqing.",
      examples: [
        {
          label: "Simulyatorda qator raqami bilan",
          cmd: "rate = 150.0\nprint(rtae)",
          output: "NameError: name 'rtae' is not defined (line 2)",
          note: "2-qator. Oʻsha qatorni ovoz chiqarib, harfma-harf oʻqing. Sabab har doim mayda narsa.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "3-hafta asboblari — tezkor jadval",
    rows: [
      { action: "Qiymat saqlash", win: "rate = 150.0", linux: "rate = 150.0" },
      { action: "Koʻrsatish", win: "print(f\"{usd:.2f} USD\")", linux: "print(f\"{usd:.2f} USD\")" },
      { action: "Float boʻlish", win: "yen / rate", linux: "yen / rate" },
      { action: "Butun / qoldiq", win: "7 // 2, 7 % 2", linux: "7 // 2, 7 % 2" },
      { action: "String yopishtirish", win: "f\"{a} and {b}\"", linux: "f\"{a} and {b}\"" },
      { action: "2 kasrli pul", win: "f\"{usd:.2f}\"", linux: "f\"{usd:.2f}\"" },
      { action: "Matnni tozalash", win: "name.strip().lower()", linux: "name.strip().lower()" },
      { action: "Belgilar soni", win: "len(name)", linux: "len(name)" },
      { action: "Kesish", win: "s[0:8]", linux: "s[0:8]" },
      { action: "Taqqoslash", win: "yen == 30000, yen > 0", linux: "yen == 30000, yen > 0" },
      { action: "Qaror", win: "if / elif / else", linux: "if / elif / else" },
      { action: "Tur almashtirish", win: "int(\"30000\"), str(200)", linux: "int(\"30000\"), str(200)" },
    ],
  },
  missions: [
    {
      id: "p1",
      prompt: "Konvertoringizni boshlang: USD/JPY kursi 150.0 qiymatli rate oʻzgaruvchisini yarating va chop eting.",
      hint: "rate = 150.0, keyin print(rate)",
    },
    {
      id: "p2",
      prompt: "Konvertatsiya qilinadigan summa — 30000 qiymatli yen oʻzgaruvchisini qoʻshing.",
      hint: "yen = 30000 — eski qatorlarni oʻchirmasdan qoʻshasiz. Dastur oʻsadi.",
    },
    {
      id: "p3",
      prompt: "usd ni hisoblang — yen ni rate ga boʻling.",
      hint: "usd = yen / rate",
    },
    {
      id: "p4",
      prompt: "f-string bilan haqiqiy gap chiqaring: yen summasi va usd natijasi bitta qatorda.",
      hint: "print(f\"{yen} JPY = {usd} USD\")",
    },
    {
      id: "p5",
      prompt: "Pulga aynan 2 kasr kerak — gapni :.2f format belgisi bilan yana chiqaring.",
      hint: "print(f\"{yen} JPY = {usd:.2f} USD\") — .00 ga eʼtibor bering",
    },
    {
      id: "p6",
      prompt: "Qaror qoʻshing: yen 10000 dan koʻp boʻlsa big, aks holda small chiqaring (yen hali 30000).",
      hint: "if yen > 10000: keyin 4 boʻsh joy surish. Ikki nuqtani unutmang.",
    },
    {
      id: "p7",
      prompt: "Yomon kirishga munosabat: yen ni -500 qilib, manfiy summa oʻrniga ado xato xabari chiqaring.",
      hint: "Birinchi if dan keyin yen ni oʻzgartiring: yen = -500, keyin yangi if/else — if yen < 0: print(\"invalid: negative amount\"). Eski usd chop etilishi shunchaki qoladi.",
    },
    {
      id: "p8",
      prompt: "Matn asboblari: name = \"  Mountain Shadow  \" (ortiqcha boʻshliqlar bilan) yarating va tozalab kichik harflarda, bitta print bilan chiqaring — ikkita metod.",
      hint: "print(name.strip().lower()) — metodlar yangi string qaytaradi, zanjirlash shunchaki ishlaydi.",
    },
  ],
  quiz: [
    {
      q: "Oʻzgaruvchi aslida nima?",
      options: [
        "Yechilishi kerak boʻlgan matematik tenglama",
        "Keyin ishlatish uchun qiymatga ilingan yorliq",
        "Faqat son saqlaydigan quti",
        "Pythonʼning zaxira soʻzi",
      ],
      answer: 1,
      why: "= oʻng tomondagi qiymatni chap tomondagi nom ostida saqlaydi. Bu koʻrsatma, matematik tenglik emas.",
    },
    {
      q: "rate = 150.0 aynan nima qiladi?",
      options: [
        "rate va 150.0 ni taqqoslaydi",
        "150.0 ni hisoblab, rate nomi ostida saqlaydi",
        "rate abadiy 150.0 boʻlishini eʼlon qiladi",
        "rate ni chop etadi",
      ],
      answer: 1,
      why: "Tayinlash oʻngdan chapga oʻqiladi: oʻng tomonni hisobla, chap nom ostida saqla.",
    },
    {
      q: "Python 3 da 7 / 2 nimaga teng?",
      options: ["3", "3.5", "4", "Xato — toq sonlar boʻlinmaydi"],
      answer: 1,
      why: "/ har doim float boʻlinish: 3.5. // butun: 3. Bitta belgi farqi — boshqa asbob.",
    },
    {
      q: "print(\"yen: \" + 30000) TypeError beradi. Nega?",
      options: [
        "print faqat bitta argument oladi",
        "30000 juda katta son",
        "String va sonni yopishtirib boʻlmaydi — kompyuter taxmin qilishdan bosh tortadi",
        "Qoʻshtirnoqlar xato",
      ],
      answer: 2,
      why: 'TypeError: can only concatenate str (not "int") to str. Yechim: str(30000) bilan almashtiring yoki f-string ishlating.',
    },
    {
      q: "yen 30000 boʻlganda print(f\"{yen} JPY\") nima chiqaradi?",
      options: ["{yen} JPY", "30000 JPY", "yen JPY", "Xato"],
      answer: 1,
      why: "f belgisi { } ni oynaga aylantiradi: yen ning joriy qiymati matnga joylanadi.",
    },
    {
      q: "= va == farqi nima?",
      options: [
        "Hech narsa, ular sinonim",
        "= tayinlaydi, == ikki qiymatni taqqoslaydi",
        "= taqqoslaydi, == tayinlaydi",
        "== faqat tsikllarda ishlatiladi",
      ],
      answer: 1,
      why: "= saqlaydi. == 'tengmi?' deb soʻraydi va True/False qaytaradi. Python shart ichidagi = ni rad etib sizni himoya qiladi.",
    },
    {
      q: "if gapida grammatikaning oʻzi boʻlgan ikki narsa nima?",
      options: [
        "Qavslar va nuqtali vergul",
        "Qator oxiridagi ikki nuqta va blokning surilishi",
        "Shartni oʻragan qavslar",
        "'then' soʻzi va vergul",
      ],
      answer: 1,
      why: "if shart: — ikki nuqta, keyin 4 boʻsh joy bilan surilgan blok. Bittasini unutsangiz SyntaxError yoki IndentationError.",
    },
    {
      q: "name = \"hi\" dan keyin name.upper() name ga nima qiladi?",
      options: [
        "name ni HI ga oʻzgartiradi",
        "Hech narsa — stringlar oʻzgarmas; metod YANGI string qaytaradi",
        "name ni oʻchiradi",
        "Faqat print ichida katta harf qiladi",
      ],
      answer: 1,
      why: "name.upper() 'HI' qaytaradi — natijani ishlatmasangiz, hech narsa boʻlmagan. Saqlash uchun: name = name.upper().",
    },
    {
      q: "int(\"hello\") nimaga aylanadi?",
      options: ["0", "None", "ValueError — 'hello' butun son boʻlolmaydi", "'hello' stringi"],
      answer: 2,
      why: "Almashtirish halol: tur toʻgʻri (str), mazmun imkonsiz. Sababini ham aytib beradigan ValueError.",
    },
    {
      q: "Dasturingiz xatosiz, lekin natija notoʻgʻri. Birinchi harakat nima boʻlishi kerak?",
      options: [
        "Hammasini noldan qayta yozish",
        "Xato qatordan oldin oʻzgaruvchilarning print larini qoʻshib, qiymatlarni oʻqish",
        "Kompyuterni qayta yoqish",
        "Dasturni oʻchirib tashlash",
      ],
      answer: 1,
      why: "Print bilan debugging — dunyodagi eng qadimiy va eng halol usul: har qadamda qiymatlar aslida nima ekanini koʻrish. 4-haftada buni funksiyalarga joylaysiz.",
    },
    {
      q: "s = \"Mountain\" boʻlsa, s[-1] nima?",
      options: ["M", "n", "Butun string", "IndexError"],
      answer: 1,
      why: "Manfiy indekslar oxiridan sanaydi: -1 oxirgi belgi, -2 oxiridan ikkinchisi. Juda qulay.",
    },
    {
      q: "if/elif/else zanjirida nechta shox bajariladi?",
      options: ["Rost boʻlganlarning hammasi", "Aynan bittasi — birinchi rost boʻlgani", "Koʻpi bilan ikkita", "Nolta"],
      answer: 1,
      why: "Python yuqoridan tekshiradi, BIRINCHI rost shoxni bajaradi va qolganlarini (else ni ham) oʻtkazib yuboradi.",
    },
  ],
  outro:
    "Missiyalar oson tuyulganda — toʻgʻri yoʻldasiz: bu atomlar (qiymatlar, matn, qarorlar) yozadigan har bir dasturingizning 80%i. NameError va TypeError 'qayerga qarashni aytadigan tanish odam' boʻlib tuyulguncha simulyatorda mashq qiling. Keyingi hafta: tsikllar va funksiyalar — ishni takrorlash va logikani qadoqlash. Xuddi shu joyda, xuddi shu sur’atda.",
};
