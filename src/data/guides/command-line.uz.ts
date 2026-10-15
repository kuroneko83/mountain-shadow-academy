import type { Guide } from "../types";

export const guideCommandLineUz: Guide = {
  slug: "command-line",
  title: "Buyruqlar satri — sekin va halol qilib",
  intro:
    "Bu qoʻllanma 1-haftaning eng qiyin mavzusini sekin oʻrganadi: terminal aslida nima, har bir buyruq nima qiladi, Windows va Linux qanday farq qiladi va eng muhimi — uni ishlatish qanday tuyuladi. Yonida haqiqiy terminalni ochib oʻqing, keyin simulyatorda mashq qiling va testni yeching.",
  week: "01-setup-terminal",
  sections: [
    {
      heading: "1. Terminal aslida nima",
      body: "Terminal — matn oynasi boʻlib, unda ikonkalarni bosish oʻrniga buyruqlar yozib kompyuter bilan gaplashasiz. Javob beruvchi dastur shell deb ataladi. Windowsʼda standart shell — PowerShell, uning promti PS C:\\Users\\you> koʻrinishida. Linux (va macOS)ʼda standart shell — bash, promt odatda $ bilan tugaydi. Bu oʻquv rejasi ikkalasida ham ishlaydi — gʻoyalar bir xil, faqat baʼzi buyruq nomlari farq qiladi. Buyruqlarni yodlamaysiz — 'yechim mavjud' deb eslab qolib, kerak boʻlganda qidirasan.",
      examples: [
        {
          label: "Windows (PowerShell)",
          cmd: "PS C:\\Users\\you>",
          note: "Promt: u hozir qayerdaligingizni koʻrsatadi. > dan keyin yozasiz.",
        },
        {
          label: "Linux / macOS (bash)",
          cmd: "you@laptop:~$",
          note: "Xuddi shu tizim: promt → buyruq → Enter.",
        },
      ],
    },
    {
      heading: "2. Men qayerdaman — pwd",
      body: "Har bir terminal sessiyasida joriy papka (ishchi papka) bor: buyruqlaringiz shu papkaga taʼsir qiladi. pwd (print working directory) — hozir qayerdaligingizni soʻraydi. PowerShellʼda ham pwd ishlaydi — bu Get-Location nomining qisqartmasi. Adashganingizni his qilsangiz darhol pwd bosing: bu bepul va hech qachon xato qilmaydi.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "pwd",
          output: "/home/you",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "pwd",
          output: "C:\\Users\\you",
        },
      ],
    },
    {
      heading: "3. Atrofga qarash — ls / dir",
      body: "ls (list) — joriy papkadagi narsalarni koʻrsatadi. ls -a yashirin fayllarni (nuqtadan boshlanadigan) ham koʻrsatadi, ls -l esa tafsilotlarni (huquqlar, hajm, sana) beradi. PowerShellʼda ls Get-ChildItem nomining taxallusi sifatida ishlaydi, lekin klassik Windows buyrugʻi — dir. Ikkalasi ham yaxshi. Ranglar maʼno anglatadi: papkalar koʻk, ijro etiladigan fayllar yashil, oddiy fayllar oq yoki kulrang.",
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
          label: "Windows (PowerShell)",
          cmd: "dir",
          output: "projects  notes.txt",
        },
      ],
    },
    {
      heading: "4. Yoʻllar — kompyuteringizning xaritasi",
      body: "Yoʻl (path) — fayl yoki papkaning manzili. Mutlaq yoʻl diskning ildizidan boshlanadi va har doim ishlaydi: Linuxʼda /home/you/projects, Windowsʼda C:\\Users\\you\\projects. Nisbiy yoʻl hozir turgan joyingizdan boshlanadi: /home/you ichida boʻlsangiz, projects deb yozish xuddi shu papkani anglatadi. Hamma joyda ishlaydigan 3 qisqartma bor: ~ — uy papkangiz, . — hozirgi joy, .. — bir papka yuqori. Linux nomlar orasida /, Windows \\ ishlatadi — asosiy farq shu, bir kunda koʻnikib qolasiz.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "cd ~",
          note: "Qayerdan boʻlsangiz ham birdan uy papkangizga oʻting.",
        },
        {
          label: "Ikkalasi",
          cmd: "cd ..",
          note: "Bir daraja yuqoriga chiqish.",
        },
        {
          label: "Linux / macOS",
          cmd: "cd /home/you/projects",
          note: "Mutlaq yoʻl — ildizdagi / dan boshlanadi.",
        },
      ],
    },
    {
      heading: "5. Harakat — cd",
      body: "cd (change directory) — harakat buyrugʻi. Bitta argument oladi: boradigan papka. cd projects yozsangiz, joriy papkadagi projects ichiga kirasiz. cd .. — bir daraja yuqoriga. cd yolgʻiz yozilsa — uyga qaytasiz. 'No such file or directory' xatosi chiqsa, deyarli har doim papka nomi xato yozilgan — avval ls bilan tekshiring.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "cd projects",
          note: "projects papkasiga kirish.",
        },
        {
          label: "Ikkalasi",
          cmd: "cd ..",
          note: "Bir daraja orqaga.",
        },
        {
          label: "Linux / macOS",
          cmd: "cd",
          note: "Argument yoʻq: uy papkangizga borish.",
        },
      ],
    },
    {
      heading: "6. Yaratish — mkdir va touch",
      body: "mkdir (make directory) papka yaratadi. Birdan bir nechta ham boʻladi: mkdir data scripts. touch — boʻsh fayl yaratadi, joy egallagich sifatida foydali: touch notes.txt. PowerShellʼda touch yoʻq; muqobili — New-Item notes.txt (yoki qisqartmasi ni notes.txt). Ularning hech biri 'ishonchingiz komilmi?' deb soʻramaydi — terminal sizga ishonadi.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "mkdir data scripts",
          note: "Ikkita papkani birdan yaratish.",
        },
        {
          label: "Linux / macOS",
          cmd: "touch notes.txt",
          note: "Boʻsh fayl yaratish.",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "New-Item notes.txt",
          note: "PowerShellʼda boʻsh fayl yaratish usuli.",
        },
      ],
    },
    {
      heading: "7. Oʻqish — cat / type",
      body: "cat (concatenate) — fayl mazmunini ekranga chiqaradi. PowerShellʼda klassik nom — type, lekin cat ham ishlaydi. Uzun fayllar uchun less (Linux) yoki more (ikkalasi) sahifa-sahifa koʻrsatadi — q chiqish, boʻsh joy — keyingi sahifa. head -n 5 birinchi 5 qatorni, tail -n 5 oxirgi 5 qatorni koʻrsatadi — keyinchalik katta CSV fayllarni tekshirishda juda foydali.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cat notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "type notes.txt",
          output: "Terminal practice — day 1",
        },
        {
          label: "Linux / macOS",
          cmd: "head -n 5 rates.csv",
          note: "Birinchi 5 qator — data fayllaringizning kelajakdagi eng yaqin doʻsti.",
        },
      ],
    },
    {
      heading: "8. Oʻzgartirish — cp, mv, rm",
      body: "cp (copy) — nusxa oladi: cp notes.txt backup.txt. mv (move) — boshqa papkaga koʻchiradi; xuddi shu papkada yangi nom bersangiz — nomini oʻzgartiradi: mv notes.txt day1.txt. rm (remove) — oʻchiradi va bu butun qoʻllanmadagi yagona jiddiy ogohlantirish: rm savat (recycle bin) ishlatmaydi. Oʻchirilgani qaytmaydi. Har qanday rm dan oldin bir marta ls ni ishga tushirib, nimani oʻchirayotganingizga qarang. Papkalar uchun rm -r — papka va ichidagi hamma narsani oʻchiradi — buni qilishdan oldin uch marta tekshiring. PowerShell: Copy-Item, Move-Item, Remove-Item.",
      examples: [
        {
          label: "Linux (PowerShellʼda ham taxallus sifatida ishlaydi)",
          cmd: "cp notes.txt backup.txt",
          note: "Nusxa yaratish.",
        },
        {
          label: "Linux / macOS",
          cmd: "mv notes.txt day1.txt",
          note: "Nom oʻzgartirish: xuddi shu papka, yangi nom.",
        },
        {
          label: "Linux / macOS",
          cmd: "rm day1.txt",
          note: "Oʻchirish — savat yoʻq. Oʻchirishdan oldin qarang.",
        },
      ],
    },
    {
      heading: "9. Tez ishlash — professionallar odatlari",
      body: "Hech kim toʻliq nom yozmaydi. Papka nomini yozayotganda Tab ni bosing — terminal uni tugatadi: cd pro<Tab> → cd projects. Yuqoriga strelka ↑ — oxirgi buyrugʻingizni qaytaradi, bosaverib tarix orqaga ketasiz. Ctrl+C — qotib qolgan buyruqni bekor qiladi. clear (yoki Ctrl+L) — ekranni tozalaydi. Shu toʻrt odatning oʻzi sizni 'koʻp yillardan beri kompyuter ishlataman' deydigan koʻp odamdan oʻzib ketadi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "cd pro<Tab>",
          note: "Tab toʻldirish: qolganini terminal yozib beradi.",
        },
        {
          label: "Ikkalasi",
          cmd: "↑",
          note: "Yuqoriga strelka: oxirgi buyruqni qaytarish.",
        },
        {
          label: "Ikkalasi",
          cmd: "clear",
          note: "Ekranni tozalash. Ctrl+L ham boʻladi.",
        },
      ],
    },
    {
      heading: "10. Terminaldan Python ishga tushirish",
      body: "Butun oʻquv rejasi uchun terminalning muhimligi sababi — shu. python hello.py buyrugʻi 'Python dasturidan foydalanib, shu papkadagi hello.py faylini bajar' degani. python --version — qaysi Python borligini aytadi. 'command not found' yoki 'not recognized' desa, Python toʻgʻri oʻrnatilmagan — 1-hafta sozlashiga qayting. Endi buyruqlar satri orqali ishga tushirasiz: haqiqiy vositalar shunday ishlaydi.",
      examples: [
        {
          label: "Ikkalasi",
          cmd: "python --version",
          output: "Python 3.12.0",
        },
        {
          label: "Ikkalasi",
          cmd: "python hello.py",
          output: "Hello, world!",
        },
      ],
    },
    {
      heading: "11. Bir narsa yomon ketganda — xatolarni oʻqish",
      body: "Terminaldagi xatolar dushman emas, halol hisobotdir. 'command not found' (bash) yoki 'is not recognized' (PowerShell): kompyuter bilmas nom yozdingiz — imlo xatosi yoki dastur oʻrnatilmagan. 'No such file or directory': sanab bergan fayl yoki papka siz oʻylagan joyda yoʻq — ls va pwd ni ishga tushirib qarang. 'Permission denied': tizim sizni himoya qilmoqda — odatda notoʻgʻri joydasiz yoki ehtiyot boʻlish kerak. Oʻquvchini oʻsadigan va qiynaladigan qilib ajratadigan odat: birorta buyruq yozishdan oldin xato xabarini toʻliq, ovoz chiqarib oʻqish.",
      examples: [
        {
          label: "Linux / macOS",
          cmd: "cd projct",
          output: "bash: cd: projct: No such file or directory",
          note: "Imlo xatosi. ls bilan haqiqiy nomni koʻring va Tab bilan qayta urin.",
        },
        {
          label: "Windows (PowerShell)",
          cmd: "pythn --version",
          output: "pythn : The term 'pythn' is not recognized...",
          note: "Xuddi shu saboq: kompyuter faqat toʻliq mos nomlarni biladi.",
        },
      ],
    },
  ],
  cheatSheet: {
    heading: "Windows vs Linux — tezkor jadval",
    rows: [
      { action: "Men qayerdaman?", command: "pwd" },
      { action: "Fayllar roʻyxati", win: "dir / ls", linux: "ls" },
      { action: "Papkaga oʻtish", command: "cd projects" },
      { action: "Bir daraja yuqori", command: "cd .." },
      { action: "Uyga", win: "cd ~", linux: "cd" },
      { action: "Papka yaratish", command: "mkdir data" },
      { action: "Boʻsh fayl yaratish", win: "New-Item notes.txt", linux: "touch notes.txt" },
      { action: "Faylni koʻrsatish", win: "type notes.txt", linux: "cat notes.txt" },
      { action: "Nusxalash", win: "Copy-Item a.txt b.txt", linux: "cp a.txt b.txt" },
      { action: "Koʻchirish / nom", win: "Move-Item a.txt b.txt", linux: "mv a.txt b.txt" },
      { action: "Oʻchirish", win: "Remove-Item notes.txt", linux: "rm notes.txt" },
      { action: "Ekranni tozalash", command: "clear" },
      { action: "Skript ishga tushirish", command: "python hello.py" },
    ],
  },
  missions: [
    {
      id: "m1",
      prompt: "Kompyuterdan hozir qayerdaligingizni soʻrang.",
      hint: "print working directory — uch harf.",
    },
    {
      id: "m2",
      prompt: "Joriy papkadagi hamma narsani koʻrsating.",
      hint: "Bitta soʻz, ikki harf.",
    },
    {
      id: "m3",
      prompt: "projects papkasining ichiga kiring.",
      hint: "change directory — cd projects",
    },
    {
      id: "m4",
      prompt: "projects ichida data nomli papka yarating.",
      hint: "make directory",
    },
    {
      id: "m5",
      prompt: "projects/data ichida scripts nomli papka yarating.",
      hint: "Avval cd data bilan kirasiz, yoki projects ichidan yoʻl bilan: mkdir data/scripts.",
    },
    {
      id: "m6",
      prompt: "projects/data/scripts ichida learning log matni bilan notes.txt fayli yarating.",
      hint: "Avval cd data/scripts bilan kirib, echo learning log > notes.txt yozing. Yoki projects ichidan yoʻl bilan: echo learning log > data/scripts/notes.txt",
    },
    {
      id: "m7",
      prompt: "notes.txt mazmunini ekranda koʻrsating.",
      hint: "Doʻstimiz concatenate buyrugʻi.",
    },
    {
      id: "m8",
      prompt: "Uy papkangizga (~) qayting.",
      hint: "cd ~ har qayerdan ishlaydi. Yoki chiqib boring: cd ../..",
    },
  ],
  quiz: [
    {
      q: "Hozir qaysi papkadaligingizni aytadigan buyruq qaysi?",
      options: ["ls", "pwd", "cd", "cat"],
      answer: 1,
      why: "pwd — print working directory. U joylashuvingizni har doim koʻrsatadi.",
    },
    {
      q: "cd .. nima qiladi?",
      options: [
        "'..' nomli papkaga kiradi",
        "Joriy papkani oʻchiradi",
        "Bir daraja yuqoriga chiqadi",
        "Oldingi buyruqqa qaytadi",
      ],
      answer: 2,
      why: ".. — 'bu papkadan yuqoridagi papka' degani. cd .. bir daraja yuqoriga koʻtaradi.",
    },
    {
      q: "data nomli yangi papka yaratadigan buyruq qaysi?",
      options: ["touch data", "mkdir data", "new data", "ls data"],
      answer: 1,
      why: "mkdir — make directory. touch boʻsh fayl yaratadi, papka emas.",
    },
    {
      q: "Yoʻldagi ~ nima degani?",
      options: ["Diskning ildizi", "Joriy papka", "Bir yuqoridagi papka", "Uy papkangiz"],
      answer: 3,
      why: "~ — uy papkangizning qisqartmasi, nisbiy yoʻllar shu yerdan boshlanadi.",
    },
    {
      q: "Qaysi biri mutlaq yoʻl (Linux)?",
      options: ["projects/data", "./data", "/home/you/projects", "../projects"],
      answer: 2,
      why: "Mutlaq yoʻllar ildizdagi / dan boshlanadi — hozir qayerda boʻlsangiz ham ishlaydi.",
    },
    {
      q: "rm ishlatishdan oldin eng xavfsiz harakat nima?",
      options: [
        "Hech narsa — rm tasdiq soʻraydi",
        "Avval ls ni ishga tushirib, nimani oʻchirayotganingizni aniq koʻrish",
        "Faylni cat bilan ochib hajmini tekshirish",
        "Avval fayl nomini oʻzgartirish",
      ],
      answer: 1,
      why: "rm savat ishlatmaydi — oʻchirilgani qaytmaydi. Avval ls bilan koʻrish — eng arzon sugʻurta odati.",
    },
    {
      q: "cd proj deb yozayotganda Tab ni bossangiz nima boʻladi?",
      options: [
        "Yordam taklif qiladi",
        "Soʻzni oʻchirib tashlaydi",
        "Nomni avtomatik toʻldiradi",
        "Papkani ochadi",
      ],
      answer: 2,
      why: "Tab toʻldirish papka va fayl nomlarini tugatadi — tezroq va imlo xatosiz. Birinchi tezlik odati.",
    },
    {
      q: "python hello.py ishga tushirganingizda 'python: command not found' chiqdi. Eng ehtimol sabab?",
      options: [
        "hello.py da xato bor",
        "Notoʻgʻri papkadasiz",
        "Python oʻrnatilmagan yoki PATHʼda yoʻq",
        "Fayl boʻsh",
      ],
      answer: 2,
      why: "Kompyuter python nomli dasturni bilmaydi — toʻgʻri oʻrnatilmagan yoki PATHʼga kirmagan. 1-hafta sozlashiga qayting.",
    },
    {
      q: "PowerShellʼda notes.txt mazmunini koʻrsatadigan buyruq qaysi?",
      options: ["type notes.txt", "show notes.txt", "open notes.txt", "read notes.txt"],
      answer: 0,
      why: "type — Windowsʼning klassik buyrugʻi (zamonaviy PowerShellʼda cat ham taxallus sifatida ishlaydi).",
    },
    {
      q: "Nega bu oʻquv rejasi tahrirlovchining 'Ishga tushirish' tugmasi oʻrniga terminaldan skript ishga tushirishni talab qiladi?",
      options: [
        "Yozish tezroq boʻlgani uchun",
        "Haqiqiy vositalar, serverlar va avtomatlashtirish hammasi buyruqlar satri orqali ishlagani uchun",
        "Tahrirlovchi tugmasi buzilgani uchun",
        "Python boshqacha ishlashdan bosh tortgani uchun",
      ],
      answer: 1,
      why: "Serverlar, rejalashtirilgan vazifalar, quvurlar va avtomatlashtirishda tahrirlovchi tugmasi yoʻq. Buyruqlar satri — dasturlar real ishlaydigan joy.",
    },
  ],
  outro:
    "Missiyalarni tugatib, testning katta qismini toʻgʻri yechgan boʻlsangiz, kompyuterni koʻp yillardan beri ishlatadigan koʻp odamdan yaxshiroq boshqarayotgansiz. 1-hafta davomida bu sahifani ochiq tutib turing — keyingi haftalarda adashsangiz, qaytib keling: pwd, ls, cd — butun karyeringizda takrorlaydigan uchta harakat.",
};
