import type { Guide } from "../types";

export const guideApiUz: Guide = {
  slug: "requests-api",
  title: "Internet bilan gaplashadigan skriptlar",
  intro:
    "Bu qoʻllanma 6-haftaga xizmat qiladi. Hozirgacha hammasi mashinangizda edi; bu hafta skriptlaringiz haqiqiy APIdan jonli maʼlumot oladi (Frankfurter — real loyihada ishlatadigan bepul, kalitsiz valyuta kursi APIʼsi). Quyidagi simulyatorda bir xil endpointlar bilan soxta internet bor — va qoʻshimcha: typo URL va ataylab birinchi chaqiruvda ishdan chiqadigan flaky endpoint. Halol namunani mashq qilish uchun: statusni tekshir, bir marta qayta urin, yozib qoʻy va oʻtkazib yubor.",
  week: "06-scripts-apis",
  sections: [
    {
      heading: "1. API aslida nima",
      body: "API — URL manzilda javob beradigan dastur. Skriptingiz soʻrov yuboradi («bugungi USD→JPY kursi qancha?»); server javob beradi — status kodi va maʼlumot. Soʻrov/javob shartnomasi — butun gʻoya shu, va u hamma joyda: telefoningizdagi har bir ilova hozir APIlar bilan gaplashyapti. Frankfurter (api.frankfurter.app) — uchratasiz eng mehribon API: bepul, kalit yoʻq, akkaunt yoʻq — faqat URLlar. Bu simulyatorda import requests ishlaydi va uchta haqiqiy endpoint ulangan, shuning uchun bu yerda qurgan mushak xotirasi mashinangizga toʻgʻridan-toʻgʻri koʻchadi.",
      examples: [
        {
          label: "Shartnoma",
          cmd: "skriptingiz --requests.get(url)--> server\nserver --status 200 + JSON data--> skriptingiz",
          note: "URL manzilda soʻra, status va data ol. Savdo shunday.",
        },
      ],
    },
    {
      heading: "2. Haqiqiy mashinada: venv va pip (loyihaga bir marta)",
      body: "requests Python ichiga qoʻyilmagan — bu paket, va paketlar global emas, loyiha uchun oʻrnatiladi. Marosim: virtual muhit yaratish (bu papka uchun shaxsiy Python), faollashtirish va pip install. Faollashtirish buyrugʻi tizimga qarab farq qiladi — bu haqiqiy Windows/Linux boʻlinishi, umumiy versiya mavjud emas.",
      steps: [
        {
          title: "Virtual muhit yaratish (ikkalasi, loyihaga bir marta)",
          detail:
            "python -m venv .venv — ichida shaxsiy Python boʻlgan .venv papka yaratadi. 2-haftadagi .gitignore .venf ni allaqachon qamrab olgan.",
        },
        {
          title: "Faollashtirish — Windows (PowerShell)",
          detail:
            ".venv\\Scripts\\Activate.ps1 — promptga (.venf) qoʻshiladi. PowerShell skriptni rad etsa: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned ni bir marta bajaring (mashhur Windows marosimi).",
        },
        {
          title: "Faollashtirish — Linux / macOS",
          detail: "source .venv/bin/activate — promptda xuddi shu (.venv) qoʻshiladi.",
        },
        {
          title: "requests oʻrnatish (venv faol holatda)",
          detail:
            "pip install requests — .venv ichiga yuklaydi, boshqa joyga emas. Endi bu loyihada requests bor; boshqa loyihalar toza qoladi.",
        },
        {
          title: "Bu simulyatorda",
          detail:
            "Hech biri kerak emas — import requests shunchaki ishlaydi. venv marosimi shu haftagi real loyiha uchun; nega mavjudligini bilish muhim.",
        },
      ],
    },
    {
      heading: "3. requests.get() va response obyekti",
      body: "response = requests.get(url) soʻrov yuboradi va javobni obyektda oladi. Doim tegadigan ikki narsa: .status_code (raqam — 200 OK degani) va .json() (JSON matndan, allaqachon yurishni biladigan dict va roʻyxatlarga aylangan data). response ning oʻzini print qilsangiz <Response [200]> — data emas, obyekt. Data soʻraganda paydo boʻladi: response.json().",
      examples: [
        {
          label: "Ikkalasi (simulyator va real mashina — bir xil kod)",
          cmd: "import requests\nurl = \"https://api.frankfurter.app/latest?from=USD&to=JPY\"\nresponse = requests.get(url)\nprint(response.status_code)\nprint(response.json())",
          output:
            "200\n{'amount': 1.0, 'base': 'USD', 'date': '2026-10-15', 'rates': {'JPY': 149.98}}",
        },
      ],
    },
    {
      heading: "4. Ichma-ich JSON oʻqish: dictning tagiga dict",
      body: "JSON data ichma-ich dictlar boʻlib keladi — va bu koʻnikmani 5-haftadan olgansiz. response.json() butun narsani beradi; har [\"key\"] bir daraja chuqurroq: [\"rates\"][\"JPY\"] — kursning oʻzi. Bir darajadan birga oʻtib oʻqing. Darajani notoʻgʻri oʻqisasangiz KeyError mavjud boʻlmagan kalitni aniq aytadi — 5-haftadagi halol xato. Professional odat: har qatorda .json() chaqirmasdan, oʻzgaruvchiga toʻxtatish (data = response.json()).",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "data = response.json()\nprint(data[\"rates\"])\nprint(data[\"rates\"][\"JPY\"])\nprint(data[\"date\"])",
          output: "{'JPY': 149.98}\n149.98\n2026-10-15",
          note: "Bir darajaga bitta [\"key\"]. Avval oʻzgaruvchiga toʻxtatish — pro odati.",
        },
      ],
    },
    {
      heading: "5. Status kodlar: ishonishdan oldin tekshirish",
      body: "Status kodi — serverning birinchi soʻzi va u hech qachon yolgʻon gapirmaydi: 200 — «data bu»; 404 — «bunday URL yoʻq» (koʻpincha typo); 500 — «server buzildi — sizning aybingiz ham, tuzatish vazifangiz ham emas». Qoida: tekshirmagan responsening datasini hech qachon ishlatmang. Bir qatorlik odat: if response.status_code == 200: — dataga ishon, aks holda oʻtkazib yubor va shuni ayting.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "bad = requests.get(\"https://api.frankfurter.app/typo\")\nprint(bad.status_code)\nif bad.status_code != 200:\n    print(\"skipping: bad status\")",
          output: "404\nskipping: bad status",
          note: "404 → URL xato. 500 → server yomon kunda. Har ikkala holda: dataga tegmang.",
        },
      ],
    },
    {
      heading: "6. try / except: xavfsizlik toʻri (va raise_for_status)",
      body: "Baʼzan muvaffaqiyatsizlik oʻqiladigan status emas, istisno sifatida keladi. response.raise_for_status() — oʻtkir asbob: status 400 yoki undan yomon boʻlsa HTTPError (baland ovozli istisno) koʻtaradi. Va try/except — oʻtkir asbob atrofidagi toʻr: try bloki ishlaydi; nomlangan turdagi xato yuz bersa, krajj oʻrniga except bloki ishlaydi — dastur tirik qoladi, nima qilganini aytadi va davom etadi. Xatolarni NOM BILAN ushlang (except HTTPError:) — yalangʻoch except: ham ishlaydi, lekin oʻzingizning buglaringizni ham yutadi — muammolar shunday yashiringan. finally: nima boʻlsa ham ishlaydi — muvaffaqiyat, muvaffaqiyatsizlik: «tozalash har doim boʻlishi shart» joyi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "try:\n    response = requests.get(\"https://api.frankfurter.app/typo\")\n    response.raise_for_status()\nexcept HTTPError:\n    print(\"handled: skipped\")\nprint(\"the program continues\")",
          output: "handled: skipped\nthe program continues",
          note: "Xato ushlandi, xabar chiqdi, dastur davom etdi. Krajj yoʻq.",
        },
        {
          label: "finally: nima boʻlsa ham ishlaydi",
          cmd: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"caught\")\nfinally:\n    print(\"always runs\")",
          output: "caught\nalways runs",
        },
      ],
    },
    {
      heading: "7. Halol namuna: bir marta qayta urin, yoz, oʻtkaz",
      body: "Haqiqiy tarmoq baʼzan ishdan chiqadi — timeout, bir lahzalik uzilish. Ishlab chiqarish skriptlari buni koʻrmaganlik qilmaydi; bitta halol namunaga amal qiladi: urin; status yomon boʻlsa BIR MARTA qayta urin (vaqtinchalik xatolar koʻpincha oʻz-oʻzidan tuzaladi); hali ham yomon boʻlsa, xatoni yozib qoʻy va oʻsha elementni oʻtkazib yubor — bitta yomon oy butun ishni oʻldirmasin. Simulyatorda aynan shunga maxsus endpoint bor: /flaky har running birinchi chaqiruviga 500, keyin 200 deydi — qayta urinish mashq maydoningiz. Bu namuna 6-haftaning yuragi va quradigan har bir data quvurining yuragi.",
      examples: [
        {
          label: "Ikkalasi — bir marta qayta urin",
          cmd: "response = requests.get(\"https://api.frankfurter.app/flaky\")\nif response.status_code != 200:\n    response = requests.get(\"https://api.frankfurter.app/flaky\")\nprint(f\"recovered: {response.status_code}\")",
          output: "recovered: 200",
          note: "Birinchi chaqiruv: 500. Bir marta qayta: 200. Vaqtinchalik xatolar koʻp hollarda oʻzi tuzaladi.",
        },
      ],
    },
    {
      heading: "8. Olingan data va saqlash uchrashuvi (fx-tracker, toʻliq)",
      body: "5-hafta fayllarni, bu hafta olishni oʻrgatdi. fx-tracker loyihasi ikkalasini yopishtirishdan iborat: har endpointni ol, statusni tekshir, ichma-ich JSONni oʻqi va har valyutaga bitta CSV qatori yoz — date,base,rate. Keyingi run oʻqib oladi. Missiyalar aynan shuni quradi va oxirgisi isbotlaydi: soxta diskdagi rates.csv, ikkala kurs, dastur tugagandan keyin ham oʻqiladigan.",
      examples: [
        {
          label: "Toʻliq quvurning miniatyrasi",
          cmd: "rates = []\nresponse = requests.get(url)\nif response.status_code == 200:\n    data = response.json()\n    rate = data[\"rates\"][\"JPY\"]\n    rates.append(f\"{data['date']},USD,{rate}\")\nwith open(\"rates.csv\", \"w\") as f:\n    for r in rates:\n        f.write(r + \"\\n\")",
          note: "Olish → tekshirish → oʻqish → yigʻish → saqlash. Dunyodagi har bir data quvurining shakli.",
        },
      ],
    },
    {
      heading: "9. Yomon ketganda — 6-haftaning klassikasi",
      body: "JSON ichidagi KeyError — API siz taxmin qilgan maydonni yoʻqotgan: response.json() ni print qilib, ilgarishdan oldin haqiqiy shaklni KOʻRING. raise_for_status dan HTTPError — status yomon edi va siz baland ovozda soʻragansiz: ushlang yoki oldindan statusni tekshiring. ConnectionError / getaddrinfo failed (real mashina) — URL typo yoki oflayn: soʻrov umuman uchmagan. requests not found / ModuleNotFoundError (real mashina) — 2-boʻlimdagi venv marosimi yoddan chiqqan yoki venv faol emas. Va jimlik tuzogʻi: hech qayerda krayj boʻlmaydigan, lekin hech narsa yozmaydigan skript — hammasi olish status tekshiruvida muvaffaqiyatsiz boʻlgan va har skip jim boʻlgani uchun. Skiplaringizni yozing; jimlik — maʼlumot hech kim sezmay yoʻqoladigan yoʻl.",
      examples: [
        {
          label: "Avval haqiqiy shaklni koʻrish",
          cmd: "print(response.json())",
          note: "['rates']['JPY'] ga oʻtishdan oldin butun narsani bir marta print qilib oʻqing. Bitta print oʻnta taxminni qutqaradi.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "requests va xatolar — tezkor jadval",
    rows: [
      { action: "Modulni tayyorlash", command: "import requests", result: "hech narsa koʻrinmaydi — taʼrif" },
      { action: "URL ga soʻrash", command: 'requests.get("https://...")' },
      { action: "Javobni olish", command: "response = requests.get(url)", result: "(response obyekti saqlanadi)" },
      { action: "Serverning birinchi soʻzi", command: "response.status_code", result: "200 / 404 / 500" },
      { action: "Dict sifatida data", command: "response.json()", result: "{'base': 'USD', 'rates': {...}, ...}" },
      { action: "Bir daraja chuqurroq", command: 'data["rates"]["JPY"]', result: "149.98" },
      { action: "Yomon statusda baland ovoz", command: "response.raise_for_status()", result: "400+ boʻlsa HTTPError" },
      { action: "Xavfsizlik toʻri", command: "try: ... except HTTPError:", result: "(krajj yoʻq — except ishlaydi)" },
      { action: "Har doim ishlaydigan tozalash", command: "finally:", result: "muvaffaqiyatda ham, xatoda ham" },
      { action: "Halol namuna", command: "bir marta qayta urin, yoz va oʻtkaz", result: "(bitta yomon element butun ishni oʻldirmaydi)" },
      { action: "Faqat real mashina", command: "pip install requests", result: "(.venv ichiga oʻrnatiladi)" },
    ],
  },
  missions: [
    {
      id: "r1",
      prompt: "Birinchi aloqa: import requests, requests.get bilan USD→JPY endpointini oling, response ga saqlang va print(response.status_code).",
      hint: 'url = "https://api.frankfurter.app/latest?from=USD&to=JPY" keyin response = requests.get(url) va print(response.status_code)',
    },
    {
      id: "r2",
      prompt: "Kursni oʻqing: response.json() ni oʻzgaruvchiga toʻxtatib, JPY kursini print qiling — ichma-ich dictlarni oʻtib.",
      hint: 'data = response.json() keyin print(data["rates"]["JPY"]) — bir darajaga bitta kalit',
    },
    {
      id: "r3",
      prompt: "Ikkinchi valyuta: EUR→JPY endpointini oling (buni ham response ga saqlang) va uning JPY kursini print qiling.",
      hint: "from=EUR bilan bir xil URL — va bir xil navigatsiya. Kurs 163.55.",
    },
    {
      id: "r4",
      prompt: "CSV uchun yigʻish: boʻsh rates roʻyxatiga \"USD,JPY,149.98\" va \"EUR,JPY,163.55\" ni append qiling.",
      hint: 'rates = [] keyin rates.append("USD,JPY,149.98") va rates.append("EUR,JPY,163.55")',
    },
    {
      id: "r5",
      prompt: "Typo ga munosabat: \"https://api.frankfurter.app/typo\" ni oling — status kodini print qiling, va 200 boʻlmasa, aynan: skipping: bad status chiqaring.",
      hint: "bad = requests.get(...) / print(bad.status_code) / if bad.status_code != 200: print(\"skipping: bad status\")",
    },
    {
      id: "r6",
      prompt: "Qayta urinish mashqi: /flaky endpointi birinchi chaqiruvda 500, keyin 200 deydi. Oling; status 200 boʻlmasa, yana bir marta oling; print(f\"recovered: {response.status_code}\").",
      hint: "url = \"https://api.frankfurter.app/flaky\" — oling, tekshiring, kerak boʻlsa yana, oxirgi statusni print qiling.",
    },
    {
      id: "r7",
      prompt: "Xavfsizlik toʻri: try ichida typo URL ni oling va response.raise_for_status() ni chaqiring — HTTPError ni ushlab, aynan: handled: skipped chiqaring.",
      hint: "try: / olish + raise_for_status() / except HTTPError: / print(\"handled: skipped\") — xato nomi bilan except HTTPError: ekaniga eʼtibor.",
    },
    {
      id: "r8",
      prompt: "fx-tracker, toʻliq: rates dagi har bir kursni rates.csv ga har birini bitta qatorda yozing, keyin oʻqib qaytaring va print qiling.",
      hint: 'with open("rates.csv", "w") as f: for r in rates: f.write(r + "\\n") — keyin "r" bilan ochib f.read() ni print qiling',
    },
  ],
  quiz: [
    {
      q: "API nima, bitta gapda?",
      options: [
        "Maʼlumotlar bazasi",
        "URL manzilda javob beradigan dastur: soʻrov yuborasiz, u status va data bilan javob beradi",
        "Dasturlash tili",
        "Python kutubxonasi",
      ],
      answer: 1,
      why: "Soʻrov/javob shartnomasi — butun gʻoya, va ishlatadigan har bir ilovaning orqasida.",
    },
    {
      q: "Virtual muhit nima uchun?",
      options: [
        "Pythonni tezlashtirish uchun",
        "Har loyihaga oʻz shaxsiy paketlarini berish uchun — loyihalar bir-birini zaharlamasin",
        "Kodni yashirish uchun",
        "Internetga ulanish uchun",
      ],
      answer: 1,
      why: "pip install .venv ichigagina tushadi. Loyihalarni ajratish — marosimning butun maqsadi.",
    },
    {
      q: "requests.get(url) dan keyin response.status_code == 200 nimani anglatadi?",
      options: [
        "Yuklab olish tugadi",
        "Server OK dedi — data shu, xavfsiz oʻqiy olasiz",
        "Server band",
        "URL yoʻnaltirildi",
      ],
      answer: 1,
      why: "200 — serverning birinchi soʻzi: OK. Tekshirmagan responsening datasini ishlatmang.",
    },
    {
      q: "404 nimani aityapti?",
      options: [
        "Server buzildi",
        "Bunday URL yoʻq — koʻpincha undagi typo",
        "Oflaysiz",
        "Data boʻsh",
      ],
      answer: 1,
      why: "404 = «bunday manzil yoʻq». 500 = server buzildi. Har xil soʻz, har xil maʼno — ikkalasini oʻrganing.",
    },
    {
      q: "response.json() nima qaytaradi?",
      options: [
        "Matn stringi",
        "Datani dict va roʻyxatlarga aylantirilgan holda — allaqachon yurishni biladigan tuzilmalar",
        "Status kodini",
        "Faylni",
      ],
      answer: 1,
      why: "JSON matn kelganda dict/roʻyxat boʻladi — 5-hafta koʻnikmalari darhol ishlaydi.",
    },
    {
      q: "data[\"rates\"][\"JPY\"] KeyError berdi. Eng ehtimol sabab?",
      options: [
        "requests buzilgan",
        "Datada bunday maydon yoʻq — response.json() ning butunini print qilib, haqiqiy shaklni koʻring",
        "Kurs nol",
        "URL juda uzun",
      ],
      answer: 1,
      why: "Darajani notoʻgʻri oʻqigansiz. Haqiqiy shaklni bir marta print qilish, oʻnta taxmindan arzon.",
    },
    {
      q: "response.raise_for_status() nima qiladi?",
      options: [
        "Status kodini print qiladi",
        "Status 400 yoki undan yomon boʻlsa HTTPError koʻtaradi — yomon statusni baland istisnoga aylantiradi",
        "Soʻrovni qayta uradi",
        "Ulanishni yopadi",
      ],
      answer: 1,
      why: "Oʻtkir asbob: yomon statuslarda baland ovozdan xato. try/except — uni ushlaydigan toʻr.",
    },
    {
      q: "except HTTPError: va except: orasidagi farq?",
      options: [
        "Yoʻq",
        "except HTTPError: faqat oʻsha xatoni ushlaydi; except: hammasini — oʻzingizning buglaringizni ham, muammolar shunday yashiringan",
        "except: tezroq",
        "except HTTPError: faqat APIlar uchun",
      ],
      answer: 1,
      why: "Xatolarni nom bilan ushlang. Yalangʻoch except tarmoqning xatosi bilan birga sizning xatingizni ham yutadi.",
    },
    {
      q: "finally: bloki qachon ishlaydi?",
      options: [
        "Faqat muvaffaqiyatda",
        "Faqat xatoda",
        "Har doim — muvaffaqiyat, xato, har narsada: boʻlishi shart boʻlgan tozalash joyi",
        "Hech qachon — bu hujjat",
      ],
      answer: 2,
      why: "finally — shartsiz qorovul. try qanday tugasa ham, fayllar yopiladi, yozuvlar qoladi.",
    },
    {
      q: "Olish 500 bilan muvaffaqiyatsiz. Halol namuna nima qiladi?",
      options: [
        "Ishlaguncha abadiy qayta urinadi",
        "Baland ovozdan krayj qiladi",
        "BIR MARTA qayta urinadi (vaqtinchalik xatolar oʻzi tuzaladi), hali ham yomon boʻlsa, yozib qoʻyib oʻsha elementni oʻtkazib yuboradi",
        "Elementni jimsigina eʼtiborsiz qoldiradi",
      ],
      answer: 2,
      why: "Bitta yomon element butun ishni oʻldirmasin — va jim skip datani izsiz yoʻq qiladi. Skip qilganingizni yozing.",
    },
    {
      q: "Real mashinada ModuleNotFoundError: No module named 'requests'. Eng ehtimol sabab?",
      options: [
        "requests buzilgan",
        "venv marosimi tashlab yuborilgan — oʻrnatilmagan yoki .venv faol emas",
        "URL xato",
        "Python eskirgan",
      ],
      answer: 1,
      why: "2-boʻlim marosimi: yaratish, faollashtirish, oʻrnatish. Promptdagi (.venv) qoʻshilishi faol ekanini bildiradi.",
    },
    {
      q: "Skript xatosiz ishlaydi, lekin CSV boʻsh. Eng ehtimol sabab?",
      options: [
        "Fayl buzilgan",
        "Hammasi olishda status tekshiruvidan oʻtolmagan va har skip jim boʻlgan — jim skiplar datani izsiz yoʻq qiladi",
        "CSV ga litsenziya kerak",
        "Kurslar juda kichik edi",
      ],
      answer: 1,
      why: "6-haftaning jimlik tuzogʻi: skiplarni yozish bezatish emas — «data yoʻq» va «nimadir muvaffaqiyatsiz ekanini aniq bilaman» oʻrtasidagi farq.",
    },
  ],
  outro:
    "Sakkiz missiya oʻtganda, real 6-hafta loyihasining skeletini yozgansiz: ikki endpointni olish, statuslarni tekshirish, ichma-ich JSONni oʻqish, flaky ni qayta urish va natijani run dan omon qoladigan CSV ga saqlash. Mashinangizda xuddi shu kod haqiqiy Frankfurter API ga qarshi ishlaydi — bir xil URLlar, bir xil shakllar, jonli raqamlar. Keyingi hafta: mustahkamlash loyihasi — bularning hammasini jadval boʻyicha bajadigan market-watch vositasi.",
};
