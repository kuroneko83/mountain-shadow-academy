import type { Guide } from "../types";

export const guideLoopsUz: Guide = {
  slug: "python-loops",
  title: "Python II: tsikllar va funksiyalar — qoʻrqmasdan",
  intro:
    "Bu qoʻllanma 4-haftaga xizmat qiladi. Dasturlar kuchli boʻladi, qachonki ishni sizsiz takrorlasa va logikani nomlangan, qayta ishlatiladigan funksiyalarga joylasa. Shu yerda xato xabarlarini tinch oʻqishni ham oʻrganasiz — kunilik koʻnikma. Darslikni oʻqing, keyin simulyatorda butun kunlik-hisobot dasturini quring: volumes roʻyxati, uni aylanadigan tsikllar va total, average, best_day, report funksiyalari.",
  week: "04-python-basics-2",
  sections: [
    {
      heading: "1. Tsikllar nega mavjud",
      body: "Kompyuterlar shikoyatsiz ishni takrorlash uchun mavjud. Tsikllarsiz 7 sonni qoʻshish 7 qator; tsikl bilan bitta qator 7 ta ham, 7 million ham ishlaydi. Pythonʼda aynan ikkita tsikl bor: for (har bir elementga bir marta) va while (biror narsa rost boʻlguncha). Real kodning 90%i for — while maxsus hollar va, tasodifan, dasturni muzlatib qoʻyish uchun. Shuning uchun ehtiyotkorlik bilan oʻrganamiz.",
      examples: [
        {
          label: "Bir xil ish, tsiklsiz va tsikl bilan",
          cmd: "print(1000 + 2000 + 3000 + 4000 + 5000 + 6000 + 7000)\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "28000\n28000",
          note: "Bir xil javob. Bittasi muammo bilan birga oʻsadi, boshqasi yoʻq.",
        },
      ],
    },
    {
      heading: "2. for: har elementga bir marta",
      body: "for v in volumes: 'roʻyxatdagi har bir qiymatni v deb atab, blokni bajar' degani. Tsikl oʻzgaruvchisi (v) — joriy elementning vaqtinchalik nomi — siz tanlaysiz, oʻzgaruvchilar bilan bir xil qoidalar. Ikkini nuqta va 4 boʻsh joy surish — 3-haftadagi if bilan aynan bir xil. Tsikl roʻyxatni oldindan orqaga bir marta aylanadi, keyin blokdan keyinga oʻtadi. Stringlarni ham aylanasiz: for letter in \"JPY\": J, keyin P, keyin Y ni koʻradi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "volumes = [1000, 2000, 3000]\nfor v in volumes:\n    print(v)\nprint(\"done\")",
          output: "1000\n2000\n3000\ndone",
          note: "Blok har elementga bir marta. Keyin dastur tsikldan keyinga oʻtadi.",
        },
      ],
    },
    {
      heading: "3. range(): kerak boʻlganda raqamlar",
      body: "range() roʻyxatsiz sanash tsiklining raqamlarini beradi. range(7) — 0 dan 6 gacha (ha, 0 dan boshlanadi, oxiri kirmaydi — 3-haftadagi slice bilan bir xil qoida). range(1, 8) — 1 dan 7 gacha. Klassik juftlik: for i in range(len(volumes)) 'pozitsiyalarni' (0, 1, 2...) aylanadi, qiymatlarni volumes[i] bilan oʻqiysiz — kunning raqami ham, qiymat ham maʼlum boʻladi, best_day() uchun aynan kerak.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "for i in range(1, 8):\n    print(f\"day {i}\")",
          output: "day 1\nday 2\nday 3\nday 4\nday 5\nday 6\nday 7",
          note: "range(1, 8): 1 dan boshlanadi, 8 dan OLDIN toʻxtaydi.",
        },
        {
          label: "Pozitsiya va qiymat birga",
          cmd: "volumes = [1000, 2000, 3000]\nfor i in range(len(volumes)):\n    print(f\"day {i + 1}: {volumes[i]}\")",
          output: "day 1: 1000\nday 2: 2000\nday 3: 3000",
        },
      ],
    },
    {
      heading: "4. Akkumulyator: butun haftaning namunasi",
      body: "sum() bilan hiyla qilish taqiqlangan boʻlsa, roʻyxat jami qanday chiqariladi? Jamiy uzluksiz toʻplab borasiz: tsikldan OLDIN noldan boshlaning, tsikl ICHIDA har elementni qoʻshing: total = total + v (qisqacha: total += v). 3 element bilan sekin yuring: total 0 dan boshlanadi; 1000 dan keyin 1000; 2000 dan keyin 3000; 3000 dan keyin 6000. 'Tashqarida boshlash, ichida yangilash' — 4-haftaning eng muhim namunasi. Sanash, oʻrtacha, eng katta va keyingi karyerangizdagi pandas agregatsiyalari ham shunday ishlaydi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "volumes = [1000, 2000, 3000]\nresult = 0\nfor v in volumes:\n    result += v\nprint(result)",
          output: "6000",
          note: "Tsikldan oldin boshlang. Tsikl ichida yangilang. Ikkalasi muhim.",
        },
      ],
    },
    {
      heading: "5. while: rost boʻlguncha",
      body: "while condition: sharti True boʻlgancha blokni takrorlaydi. Toʻgʻri while har doim uch qismdan iborat: OLDINDAN biror narsa belgilash (sanoq), shart va BLOK ICHIDA sanoni harakatga keltiradigan narsa (i += 1). Uchinchisini unutsangiz tsikl hech qachon tugamaydi — mashhur cheksiz tsikl. Real hayotda Ctrl+C toʻxtatadi; bu simulyatorda qoʻriqchi it 10000 aylanishdan keyin doʻstona eslatma bilan toʻxtatadi. while qachon? Takrorlar soni nomaʼlum boʻlganda — 'foydalanuvchi raqam yozmaguncha soʻraver'. Soni maʼlum boʻlsa — for.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "i = 1\nwhile i <= 3:\n    print(f\"day {i}\")\n    i += 1",
          output: "day 1\nday 2\nday 3",
          note: "Oldindan belgilash, tekshirish, ichida harakat — uchtasi ham bor. i += 1 ni oʻchirsa, tugamaydi.",
        },
      ],
    },
    {
      heading: "6. def: oʻz asboblaringizni yasash",
      body: "Funksiya — nomli mini-dastur: def total(values): values degan narsani oladigan, surilgan blokini bajaradigan va natijani return bilan qaytaradigan total asbobini belgilaydi. Taʼrif oʻzi hech narsa qilmaydi — bu retsept. Sihr chaqiruvda boʻladi: total(volumes) retseptni sizning roʻyxatingiz bilan bajaradi. Funksiya nomlari oʻzgaruvchilar kabi: kichik_harf_pastki_chiziq. Parametrlar — masalliqlar; har funksiyaga 1-2 tasi sogʻlom koʻrsatkich.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "def total(values):\n    \"sum of a list, the long honest way\"\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nvolumes = [1000, 2000, 3000]\nprint(total(volumes))",
          output: "6000",
          note: "def — retsept; oxirgi qator — pishirish. Chaqirilguncha hech narsa boʻlmaydi.",
        },
      ],
    },
    {
      heading: "7. return va print: boshlanuvchilarni yutadigan chalkashlik",
      body: "print odamga biror narsani koʻrsatadi. return qiymatni DASTURGA qaytaradi — qolgan kod uni ishlata oladi. Boshqa asbob, boshqa ish — va aralashtirishning aniq belgisi bor: returnni unutgan funksiyani print qilsangiz None (Pythonʼning 'hech narsa yoʻq') chiqadi. Chiqishingizda best day: None koʻrsangiz, best_day() return oʻrniga print qilyapti. Qoida: funksiyalar return qiladi; asosiy dastur print qiladi. Faqat print qiladigan funksiya — toʻliq yoʻl: hech kim natijasini ishlata olmaydi.",
      examples: [
        {
          label: "Aniq belgi — None",
          cmd: "def best_day(values):\n    print(7)\n\nprint(f\"best day: {best_day([1, 2])}\")",
          output: "7\nbest day: None",
          note: "7 ni (odamga) koʻrsatdi va None ni (dasturga) qaytardi. printni returnga oʻzgartirsangiz, ikki qator bittaga aylanadi.",
        },
      ],
    },
    {
      heading: "8. Funksiyalar funksiyalarni chaqiradi: katta muammoni kichik qilish",
      body: "average() roʻyxatni qayta qoʻshmaydi: total() ni chaqiradi va len() ga boʻladi. Bu — butun dasturlash hunarining markazi: katta muammoni kichiklariga boʻlib, ularni birlashtirish. Har funksiya BITTA ish qiladi, aniq nom oladi va chaqirib sinaladi. Bonus: xatolar ham kichik boʻladi — oʻrtacha notoʻgʻri boʻlsa, 'total() xatomi, boʻlinishmi?' deb soʻraysiz. Funksiya funksiyani chaqiradigan funksiyani chaqiradi — real dasturlar mana shu minora.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\ndef average(values):\n    return total(values) / len(values)\n\nvolumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nprint(average(volumes))",
          output: "4000",
          note: "total boʻlgani uchun average 3 qator. Nusxa koʻchirish emas — birlashtirish.",
        },
      ],
    },
    {
      heading: "9. Xato xabarlarini professional kabi oʻqish",
      body: "Bu simulyatordagi xatolar nom va qator raqamini koʻrsatadi: oʻsha qatorga boring va ovoz chiqarib oʻqing. Real Pythonʼda traceback uzunroq: OXIRGI qator xato nomi, tepasidagi qatlar yoʻlni (qaysi funksiya ishlayotgan edi) koʻrsatadi. Intizom bir xil: oxirgi qatorni birinchi oʻqing, keyin qator raqamini toping. 4-haftaning klassikasi: hali belgilanmagan (yoki imlo xatosi) funksiyaning NameError; 'takes exactly 1 argument (0 given)' TypeError — masalliq soni mos kelmaydi; def/for/while ikki nuqtasiz SyntaxError; va cheksiz tsikl muzlatishi — bu xato ham emas, dastur shunchaki... abadiy.",
      examples: [
        {
          label: "Argument soni xatosi",
          cmd: "def total(values):\n    result = 0\n    for v in values:\n        result += v\n    return result\n\nprint(total())",
          output: "TypeError: total() takes exactly 1 argument (0 given)",
          note: "Xabar aynan nimani aytyapti. Kodga tegishdan oldin oʻqing.",
        },
      ],
    },
    {
      heading: "10. Butun hafta bir rasmda",
      body: "4-hafta loyihasi — kunlik hisobot: 7 talik volumes roʻyxati, uni aylanadigan tsikllar va savollarga javob beradigan kichik funksiyalar — total, average, best_day — bitta report() ichida jamlangan. Simulyatordagi missiyalar aynan shuni boʻlakma-boʻlak quradi. Barcha missiyalar oʻtganda, siz 4-haftaning haqiqiy loyihasini yozgansiz — 8-haftada pandas bilan haqiqiy maʼlumotlarda qayta ishlatadigan tuzilish.",
      examples: [
        {
          label: "Yakuniy shakl",
          cmd: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]\nreport(volumes)\n\ndef report(values):\n    print(f\"total: {total(values)}\")\n    print(f\"average: {average(values)}\")\n    print(f\"best day: {best_day(values)}\")",
          output: "total: 28000\naverage: 4000\nbest day: 7",
          note: "Bitta roʻyxat. Kichik funksiyalar. Bitta hisobot. Mana bu — haqiqiy data dasturi.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Tsikllar va funksiyalar — tezkor jadval",
    rows: [
      { action: "Har elementga bir marta", win: "for v in volumes:", linux: "for v in volumes:" },
      { action: "1..7 ni sanash", win: "for i in range(1, 8):", linux: "for i in range(1, 8):" },
      { action: "Pozitsiya va qiymat", win: "for i in range(len(values)):", linux: "for i in range(len(values)):" },
      { action: "Harakatlanuvchi jami", win: "result = 0 ... result += v", linux: "result = 0 ... result += v" },
      { action: "while (3 qism)", win: "i = 1 / while i <= 7: / i += 1", linux: "i = 1 / while i <= 7: / i += 1" },
      { action: "Asbob belgilash", win: "def total(values):", linux: "def total(values):" },
      { action: "Natijani qaytarish", win: "return result", linux: "return result" },
      { action: "Asbobni ishlatish", win: "total(volumes)", linux: "total(volumes)" },
      { action: "Birlashtirish", win: "return total(values) / len(values)", linux: "return total(values) / len(values)" },
      { action: "Roʻyxatga qoʻshish", win: "items.append(3)", linux: "items.append(3)" },
    ],
  },
  missions: [
    {
      id: "l1",
      prompt: "Maʼlumot yarating: volumes roʻyxatida aynan 1000, 2000, 3000, 4000, 5000, 6000, 7000 qiymatlari boʻlsin.",
      hint: "volumes = [1000, 2000, 3000, 4000, 5000, 6000, 7000]",
    },
    {
      id: "l2",
      prompt: "Roʻyxatni aylaning: har qiymatni bir qatorda chiqaradigan for tsikl.",
      hint: "for v in volumes: keyin 4 boʻsh joy va print(v)",
    },
    {
      id: "l3",
      prompt: "total(values) funksiyasini yozing — roʻyxatni tsikl bilan qoʻshsin (sum() bilan hiyla — 8-haftaning mukofoti), natijani return qilsin. print(total(volumes)) — 28000.",
      hint: "Tsikldan oldin result = 0, ichida result += v, oxirida return result. print(total(volumes))",
    },
    {
      id: "l4",
      prompt: "average(values) yozing — lekin roʻyxatni qayta qoʻshmang: ichida total() ni chaqiring. print(average(volumes)) — 4000.",
      hint: "def average(values): return total(values) / len(values)",
    },
    {
      id: "l5",
      prompt: "Eng katta qiymatli KUN RAQAMINI (1-7) qaytaradigan best_day(values) yozing va print(f\"best day: {best_day(volumes)}\").",
      hint: "for i in range(len(values)): — if values[i] > best: boʻlsa qiymat va kunni (i + 1) ikkalasini eslang. KunnI return qiling.",
    },
    {
      id: "l6",
      prompt: "Sanay olishingizni isbotlang: day 1 dan day 7 gacha chiqaradigan while tsikl (roʻyxat emas, sanoq bilan).",
      hint: "i = 1 / while i <= 7: print(f\"day {i}\") / i += 1 — uch qismning hammasi.",
    },
    {
      id: "l7",
      prompt: "3-hafta funksiyasini toʻgʻri: yen_to_usd(amount) — rate 150 bilan \"200.00 USD\" kabi f-stringni return qilsin, keyin print(yen_to_usd(30000)).",
      hint: "def yen_to_usd(amount): rate = 150.0 / return f\"{amount / rate:.2f} USD\" — ichida print emas, RETURN.",
    },
    {
      id: "l8",
      prompt: "Final: report(values) — total, average va best_day dan foydalanib xulosa chiqarsin: \"total: 28000\", \"average: 4000\", \"best day: 7\". Oʻz volumes bilan chaqiring.",
      hint: "def report(values): uchta f-string print, har biri bitta funksiyani chaqiradi. Keyin report(volumes).",
    },
  ],
  quiz: [
    {
      q: "for v in volumes: nima qiladi?",
      options: [
        "Blokn butun roʻyxat bilan bir marta bajaradi",
        "Har elementga bir marta bajaradi, v — joriy element",
        "1 dan roʻyxat uzunligigacha sanaydi",
        "Foydalanuvchi qiymat yozishini kutadi",
      ],
      answer: 1,
      why: "'Roʻyxatdagi har qiymatni v deb atab, blokni bajar.' Har elementga bir marta, oldindan orqaga.",
    },
    {
      q: "range(1, 8) qaysi raqamlarni beradi?",
      options: ["1 dan 8 gacha", "1 dan 7 gacha", "0 dan 8 gacha", "0 dan 7 gacha"],
      answer: 1,
      why: "1 dan boshlanadi, 8 dan OLDIN toʻxtaydi: 1-7. Slice bilan bir xil 'oxiri kirmaydi' qoidasi.",
    },
    {
      q: "Akkumulyator namunasida result = 0 qayerga qoʻyiladi?",
      options: ["Tsikl ichiga", "Tsikl boshlanishidan oldin", "Tsikldan keyin", "Farqi yoʻq"],
      answer: 1,
      why: "Oldin boshlash, ichida yangilash. Ichida boshlansa har aylanishda nolga qaytadi — jami oʻsmaydi.",
    },
    {
      q: "while tsiklingiz toʻxtamayapti. Eng ehtimol sabab?",
      options: [
        "while Pythonʼda buzilgan",
        "Blok ichida shartni harakatga keltiradigan narsa yoʻq (i += 1)",
        "Ikkini nuqta yoʻq",
        "Sanoq 0 dan boshlangan",
      ],
      answer: 1,
      why: "while ning uch qismi: oldin belgilash, tekshirish, ICHIDA harakat. Real hayotda Ctrl+C; simulyatorda qoʻriqchi it eslatma bilan toʻxtatadi.",
    },
    {
      q: "def total(values): yolgʻiz oʻzi nima qiladi?",
      options: [
        "Funksiyani darhol bajaradi",
        "Natijani chiqaradi",
        "Retseptni belgilaydi — total(...) ni chaqirmaguncha hech narsa ishlamaydi",
        "total nomli oʻzgaruvchi yaratadi",
      ],
      answer: 2,
      why: "def — retsept, chaqiruv — pishirish. Chaqirmasdan belgilash chiqish bermaydi — bu oddiy holat.",
    },
    {
      q: "return va print farqi nima?",
      options: [
        "Yoʻq, ular sinonim",
        "print odamga koʻrsatadi; return qiymatni dasturga qaytaradi, qolgan kod ishlatsin",
        "return odamga koʻrsatadi; print qiymat qaytaradi",
        "print faqat funksiya ichida ishlaydi",
      ],
      answer: 1,
      why: "Funksiyalar return qiladi; asosiy dastur print qiladi. Faqat print qiladigan funksiya — toʻliq yoʻl.",
    },
    {
      q: "print(f\"best day: {best_day(volumes)}\") 'best day: None' chiqardi. Nega?",
      options: [
        "f-string ichiga funksiya qoʻyib boʻlmaganligi uchun",
        "best_day returnni unutib print qilgan — hech narsa qaytmagan (None)",
        "None toʻgʻri javob boʻlgani uchun",
        "f-stringning f si yoʻqligi uchun",
      ],
      answer: 1,
      why: "Aniq belgi — None: funksiya javobni odamga koʻrsatib, dasturga qaytarmadi. printni returnga oʻzgartiring.",
    },
    {
      q: "average() ni return total(values) / len(values) deb yozishning sababi?",
      options: [
        "Tezroq ishlagani uchun",
        "Birlashtirish nusxa koʻchirishdan yutadi — kichik funksiyalar, bittadan ish, hamma joyda qayta ishlatish",
        "Python shuni talab qilgani uchun",
        "Boshqa usulda ishlamaganligi uchun",
      ],
      answer: 1,
      why: "Katta muammoni kichiklarga boʻlib birlashtirish. Bonus: xatolar ham kichik boʻladi.",
    },
    {
      q: "'total() takes exactly 1 argument (0 given)' — nima boʻldi?",
      options: [
        "total buzilgan",
        "total() ni masalliqsiz chaqirdingiz — xabar aynan nimani aytib turibdi",
        "Funksiyaga ikki roʻyxat kerak",
        "Python argumentlarni bittaga cheklaydi",
      ],
      answer: 1,
      why: "Argument soni mos kelmagan TypeError. Xabarni oʻqing — bu sovgʻa.",
    },
    {
      q: "for oʻrniga while qachon tanlanadi?",
      options: [
        "Hech qachon — for har doim yaxshi",
        "Takrorlar soni aniq maʼlum boʻlganda",
        "Takrorlar soni NOMAʼLUM boʻlganda — 'biror narsa boʻlguncha'",
        "Roʻyxatlar bilan ishlaganda",
      ],
      answer: 2,
      why: "Soni maʼlum → for. Soni nomaʼlum, 'foydalanuvchi raqam yozmaguncha' → while. Real kodning 90%i for.",
    },
    {
      q: "def tanasining birinchi qatoridagi yolgʻiz string nima?",
      options: [
        "Xato — Python xato chiqaradi",
        "Docstring — funksiya nima qilishini tushuntiruvchi odam oʻqiydigan izoh",
        "Chaqirilganda chiqariladi",
        "Funksiya nomini oʻzgartiradi",
      ],
      answer: 1,
      why: "Docstring — retseptning izohi: kelajakdagi oʻzingiz va uni oʻqiydigan asboblar uchun.",
    },
    {
      q: "items = [1, 2] boʻlsa, items.append(3) nima qiladi?",
      options: [
        "items ga tegmay, yangi [1, 2, 3] roʻyxatini qaytaradi",
        "items ning OXIRIGA 3 ni qoʻshadi va None qaytaradi",
        "Boshiga 3 qoʻshadi",
        "Roʻyxatni chiqaradi",
      ],
      answer: 1,
      why: "append roʻyxatni joyida oʻzgartiradi (yangi string qaytaradigan string metodlaridan farqli). None qaytaradi — print(items) bilan tekshiring.",
    },
  ],
  outro:
    "Sakkiz missiya oʻtganda, siz 4-haftaning haqiqiy loyihasini yozgansiz — haftalik rejada soʻralgan dasturni, qatorma-qator sinab. Maslahatlarsiz boʻsh muharrirdan yana bir marta qiling: for, while, def va return oʻylashdan oldin barmoqlaringizdan chiqsa — 5-hafta huquqini qozongansiz: dasturlar oʻrtasida eslab qoladigan boʻladi: fayllar, roʻyxatlar chuqur va expense-tracker loyihasi.",
};
