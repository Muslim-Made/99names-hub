/* ============================================================
   99NAMES · NOOR · THE QUIET MONTHS · data.js
   Monday 5 October to Sunday 13 December 2026. Replaces the First Thirty.
   Jumada al-Ula and Jumada al-Akhirah 1448, the two quiet months
   of the Hijri year, ending as Rajab opens sixty days before Ramadan.

   FOUR A WEEK, EACH IN THE HOUR IT GOES UP AT
     Monday     06:30  Fajr     THE NAME     carousel, 6 slides, to save
     Wednesday  19:00  Maghrib  THE REEL     18 to 26 seconds, to reach
     Friday     11:00  Dhuhr    JUMU'AH      carousel, 3 slides, to send
     Sunday     16:00  Asr      THE SET      a set of five names to send,
                                             as a carousel or as a reel
   Stories six days a week. None carries a sticker, a poll or a
   question, so Metricool publishes every one of them on its own.

   Names of the week follow the site (site/lib/names.ts weeklyIndex):
   40 Al-Hasib, 41 Al-Jalil, 42 Al-Karim, 43 Ar-Raqib, 44 Al-Mujib,
   45 Al-Wasi', 46 Al-Hakim, 47 Al-Wadud, 48 Al-Majid, 49 Al-Ba'ith.

   THE STANDING RULES. Gentle, present tense, no urgency, no streaks,
   no questions that wait for answers yet. Every caption opens with
   the words someone would search for and ends with a reason to send
   it to one person. Five hashtags, the cap since December 2025.
   Every verse is the Uthmani text from api.alquran.cloud; every
   hadith carries its collection and number. Text never sits on a
   drawn thing.
   ============================================================ */
window.NOOR_FACTS = { url: "99names.net", handle: "@official99names", tagline: "Light, by name.", deck: "$34", card: "$6" };

(function () {
  const X = (n) => window.NAMES99[n - 1];
  const plain = (h) => String(h || "").replace(/<br>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const tags = (...t) => t.map((x) => "#" + x).join(" ");
  const WEEK = "Read it slowly. Say it once. Keep it near this week.";
  const FMT = {
    name: "Six slides of reference people come back to: the meaning, the root, the verse, when to say it. Carousels earn about nine times the saves of a single image, and Instagram shows slide two again to anyone who scrolled past slide one.",
    jumuah: "Three slides instead of one image: the verse, a thought, and the hour. Single images lost almost half their engagement this year; a carousel keeps the verse as slide one for the people who screenshot it and gives everyone else a second chance at slide two.",
    set: "A set is a list, and a list is a carousel: one name per page, read at the speed of a swipe, saved for the day it's needed and sent to the one it's for.",
    deal: "The same set as a reel: the cards are dealt one by one, so the motion carries the list. Reels are the only format shown widely to people who don't follow yet, and the deal is drawn, not typed, so it isn't a text reel.",
    reel: "Reels reach people who don't follow yet. Drawn motion and original sound, with the hook on screen from the very first frame and every word inside the reel safe area.",
  };

  /* ---------------------------------------------------------------- the four formats */
  function theName(o) {
    const x = X(o.n);
    return { at: "06:30", hour: "fajr", type: "carousel", title: `${x.tr}, this week`,
      slides: [
        { kind: "n-cover", n: o.n, week: o.week },
        { kind: "n-meaning", n: o.n, text: o.meaning, line: o.line },
        Object.assign({ kind: "n-root", n: o.n }, o.root),
        Object.assign({ kind: "n-verse", n: o.n }, o.verse),
        { kind: "n-when", n: o.n, voc: o.voc, vocTr: o.vocTr, rows: o.when },
        { kind: "n-end", n: o.n, next: o.n + 1, sub: o.send },
      ],
      fmt: FMT.name, why: o.why, caption: o.caption,
      alt: [
        `The name of the week, number ${o.n} of 99: ${x.tr}, ${x.en}, with its Arabic ${x.ar}.`,
        `What it means: ${plain(o.meaning || x.meaning)} ${plain(o.line || x.line)}`,
        `The root ${o.root.rootTr}: ${o.root.fam.map((f) => `${plain(f[1])}, ${plain(f[2])}`).join("; ")}.`,
        `${o.verse.ref} in Arabic and English: ${plain(o.verse.en)}`,
        `Say ${o.vocTr} when: ${o.when.map(plain).join("; ")}.`,
        `The ${x.tr} card from the deck, with: Keep it near this week. ${plain(o.send)}`,
      ] };
  }
  function jumuah(o) {
    const x = X(o.n);
    return { at: "11:00", hour: "dhuhr", type: "carousel", title: `Jumu'ah · ${o.title}`,
      slides: [
        Object.assign({ kind: "n-verse", n: o.n, kicker: `Jumu'ah · ${o.day}` }, o.verse),
        { kind: "c-text", tag: "A thought", disp: o.thought, d: o.td || 84, sub: o.sub, left: `${x.tr} · ${x.en}` },
        { kind: "j-hour", voc: o.voc, vocTr: o.vocTr },
      ],
      fmt: FMT.jumuah, why: o.why, caption: o.caption,
      alt: [`${o.verse.ref} in Arabic and English: ${plain(o.verse.en)}`, `${plain(o.thought)} ${plain(o.sub)}`, `Ask in the last hour: the six hours of the day with the last hour before Maghrib marked. Seek it in the last hour after Asr, Abu Dawud 1048. Ask by this week's name: ${o.vocTr}.`] };
  }
  function set(o) {
    return { at: "16:00", hour: "asr", type: "carousel", title: o.title,
      slides: [
        { kind: "c-cover", kicker: o.kicker || "A set of five · save it", disp: o.disp, d: o.d, sub: o.sub, obj: { kind: "fan", ns: o.fan || [o.ns[0], o.ns[2], o.ns[1]], h: 470 } },
        ...o.ns.map((n, i) => ({ kind: "c-name", n, tag: o.tag, role: o.roles[i], line: (o.lines || [])[i] })),
        { kind: "c-end", disp: o.end, sub: o.endSub, foot: "99names.net/send" },
      ],
      fmt: FMT.set, why: o.why, caption: o.caption,
      alt: [`Three cards from the deck, fanned, with: ${plain(o.disp)}`, ...o.ns.map((n, i) => `${X(n).tr}, ${X(n).en}, ${X(n).ar}. ${plain(o.roles[i])}`), plain(o.end) + " " + plain(o.endSub)] };
  }
  function deal(o) {
    return { at: "16:00", hour: "asr", type: "reel", title: o.title,
      cover: { kicker: "Reel · a set of five", disp: o.disp, d: 108, sub: o.sub, obj: { kind: "fan", ns: [o.ns[0], o.ns[2], o.ns[1]], h: 520 }, len: 26 },
      reel: { id: "deal", len: 26, ns: o.ns, roles: o.roles, hook: o.disp, end: o.end,
        script: [["0–3s", `On screen from the first frame: ${plain(o.disp)} The deck sits on the asr sky.`], ...o.ns.map((n, i) => [`${3 + i * 4}–${7 + i * 4}s`, `A card is dealt: ${X(n).tr}, ${X(n).en}. Above it: ${plain(o.roles[i])}`]), ["23–26s", `${plain(o.end)} 99names.net/send`]] },
      fmt: FMT.deal, why: o.why, caption: o.caption,
      alt: [`Reel cover: three cards from the deck fanned on an afternoon sky, with: ${plain(o.disp)}`] };
  }
  function reel(o) {
    return Object.assign({ at: "19:00", hour: "maghrib", type: "reel", fmt: FMT.reel }, o);
  }

  /* ---------------------------------------------------------------- the stories (no stickers, ever) */
  const S = {
    monday: (n) => ({ at: "07:00", kind: "qs-name", hour: "fajr", n, kicker: "This week" }),
    still: (n) => ({ at: "13:00", kind: "qs-name", hour: "dhuhr", n, kicker: "Still near", sub: `Last week's name. ${X(n).line} Say it once more.` }),
    breath: (n, disp, sub) => ({ at: "21:00", kind: "qs-text", hour: "isha", kicker: "Before sleep", disp: disp || "One breath<br><em>before sleep.</em>", sub: sub || `${X(n).tr}. ${X(n).line}`, obj: { kind: "breath" } }),
    jumuah: (voc, line) => ({ at: "11:15", kind: "qs-text", hour: "dhuhr", kicker: "Friday", disp: "Jumu'ah<br><em>Mubarak.</em>", sub: line, obj: { kind: "ring", size: 240 } }),
    hour: (vocTr) => ({ at: "15:00", kind: "qs-obj", hour: "asr", kicker: "The last hour", disp: "Before Maghrib,<br><em>wherever you are.</em>", obj: { kind: "dial", on: "asr" }, sub: `“Seek it in the last hour after Asr.” Abu Dawud 1048. Ask by name: ${vocTr}.`, center: true }),
    line: (at, hour, kicker, disp, sub, obj) => ({ at, kind: "qs-text", hour, kicker, disp, sub, obj }),
    // with a sticker, placed by hand: one tap to answer, so even a small audience answers
    know: () => ({ at: "07:05", kind: "qs-stk", hour: "fajr", kicker: "Be honest", disp: "Did you know<br><em>this one</em><br>before today?", d: 96, sticker: { type: "poll", opts: ["I knew it", "First time"] } }),
    quiz: (n) => { const pool = [n, ((n + 18) % 99) + 1, ((n + 37) % 99) + 1], ok = n % 3, opts = pool.slice(1); opts.splice(ok, 0, n); return { at: "13:00", kind: "qs-stk", hour: "dhuhr", n, kicker: "Last week's", disp: "Which name<br><em>is this?</em>", d: 76, gap: 34, sticker: { type: "quiz", q: "Which name is this?", opts: opts.map((k) => X(k).en), ok } }; },
    slider: (disp) => ({ at: "19:35", kind: "qs-stk", hour: "maghrib", kicker: "Honestly", disp, d: 92, sticker: { type: "slider", q: plain(disp), emoji: "🤲" } }),
    send: (n, to) => ({ at: "16:35", kind: "qs-stk", hour: "asr", kicker: "Send one", disp: "Post someone<br><em>a name.</em>", sub: "A real card, anywhere in the world, $6. Or free tonight, as a link.", obj: { kind: "env", n, to, state: "closed", w: 560 }, sticker: { type: "link", url: "https://99names.net/send", label: "Send a name" } }),
    reveal: (n, when) => ({ at: "20:00", kind: "qs-stk", hour: "isha", kicker: "Next week", disp: `${when || "Tomorrow's"}<br><em>name.</em>`, d: 96, obj: { kind: "card", n, w: 380 }, sticker: { type: "reveal", q: `DM us to see ${when ? when.toLowerCase() : "tomorrow's"} name` } }),
    ask: (at, hour, disp, q) => ({ at, kind: "qs-stk", hour, kicker: "Quietly", disp, d: 92, sticker: { type: "question", q } }),
  };

  window.QUIET = {
    start: "2026-10-05", end: "2026-12-13",
    weeks: [
      { i: 1, n: 40, mon: "2026-10-05", from: "2026-10-05", to: "2026-10-11", theme: "Enough" },
      { i: 2, n: 41, mon: "2026-10-12", from: "2026-10-12", to: "2026-10-18", theme: "Majesty, then generosity" },
      { i: 3, n: 42, mon: "2026-10-19", from: "2026-10-19", to: "2026-10-25", theme: "Ask for more" },
      { i: 4, n: 43, mon: "2026-10-26", from: "2026-10-26", to: "2026-11-01", theme: "Seen, and kept" },
      { i: 5, n: 44, mon: "2026-11-02", from: "2026-11-02", to: "2026-11-08", theme: "Every du'a is answered" },
      { i: 6, n: 45, mon: "2026-11-09", from: "2026-11-09", to: "2026-11-15", theme: "No edge to fall off" },
      { i: 7, n: 46, mon: "2026-11-16", from: "2026-11-16", to: "2026-11-22", theme: "Reasons, later" },
      { i: 8, n: 47, mon: "2026-11-23", from: "2026-11-23", to: "2026-11-29", theme: "Loved in the mess" },
      { i: 9, n: 48, mon: "2026-11-30", from: "2026-11-30", to: "2026-12-06", theme: "You already say it" },
      { i: 10, n: 49, mon: "2026-12-07", from: "2026-12-07", to: "2026-12-13", theme: "A heart revived, and Rajab" },
    ],
    days: [

    /* ================================================================ WEEK 1 · AL-HASIB · ENOUGH */
    { date: "2026-10-05", events: ["The season begins"],
      post: theName({ n: 40, week: "Week of 5 October",
        root: { letters: ["ح", "س", "ب"], rootTr: "ḥ · s · b", gloss: "Ḥ · S · B · to count, and to be enough",
          fam: [["حِسَاب", "<em>hisab</em>", "A reckoning. An account kept."], ["حَسْب", "<em>hasb</em>", "Enough: hasbunallah, Allah is enough for us."], ["يَحْتَسِبُ", "<em>yahtasib</em>", "To reckon on: provision “from where you never reckoned.” 65:3"], ["حَسِيب", "<em>hasib</em>", "The One who counts every greeting. 4:86"]] },
        verse: { ar: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ <b>حَسْبُهُۥٓ</b>", arS: 108, en: "Whoever relies on Allah, He is <b>enough</b> for him.", enS: 68, ref: "At-Talaq · 65:3" },
        voc: "يَا حَسِيبُ", vocTr: "Ya Hasib",
        when: ["When nothing else <em>is enough.</em>", "When you're keeping score <em>of what you're owed.</em>", "When the month <em>doesn't add up.</em>"],
        send: "Send Al-Hasib to someone who feels like it's all on them.",
        why: "The season opens on the name that holds both meanings people need: everything is counted, and He is enough.",
        caption: `Al-Hasib meaning: The Reckoner, and the One who is enough. No. 40 of the 99 Names of Allah, and this week's name.

One root, two comforts. Hisab is a reckoning: nothing you did, and nothing done to you, goes uncounted. Hasb is enough: hasbunallah, Allah is enough for us.

And from the same root, the promise in At-Talaq 65:3: provision “from where you never reckoned.” Whoever relies on Allah, He is enough for him.

From today we post four times a week: the name every Monday at dawn, a reel on Wednesday, Jumu'ah on Friday, and on Sunday a set of names to send to someone.

${WEEK}

Save this. Send it to someone who feels like it's all on them.

${tags("AlHasib", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(40), S.know()] },
    { date: "2026-10-06", stories: [S.quiz(39)], why: "Tuesday is for remembering: a quiz on last week's name." },
    { date: "2026-10-07",
      post: reel({ title: "Counted, and covered",
        cover: { kicker: "Reel · Al-Hasib", disp: "You are counted.<br><em>You are covered.</em>", d: 104, sub: "Hasbunallah, in twenty seconds.", obj: { kind: "dots" }, len: 20 },
        reel: { id: "hasib", len: 20, script: [["0–4s", "On screen from frame one: Hasbunallah. Ninety-nine dots wait, unlit, on the maghrib sky."], ["4–10s", "The dots light one by one, quickly. He counts everything."], ["10–15s", "And He is enough. Arabic: حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ. Al 'Imran 3:173."], ["15–20s", "You are counted. You are covered. 99names."]] },
        why: "The two meanings of Al-Hasib, drawn: every dot counted, and the count itself is the comfort.",
        alt: ["Reel cover: ninety-nine dots in a grid on a dusk sky, with: You are counted. You are covered."],
        caption: `Hasbunallah wa ni'mal wakil. Allah is enough for us, and the best one to trust with it. Al 'Imran 3:173.

Al-Hasib, No. 40 of the 99 Names of Allah, holds two meanings at once: the One who counts everything, and the One who is enough.

So both are true tonight. You are counted: nothing you carried went unseen. And you are covered: He is enough for whatever is left.

Send this to someone who has been carrying everything on their own.

${tags("AlHasib", "Hasbunallah", "99NamesOfAllah", "AsmaUlHusna", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "Hasbunallah<br><em>wa ni'mal wakil.</em>", "Allah is enough for us. 3:173", { kind: "ring", size: 260 }), S.slider("How much are you<br><em>carrying alone?</em>")] },
    { date: "2026-10-08", stories: [S.breath(40)] },
    { date: "2026-10-09", events: ["Jumu'ah"],
      post: jumuah({ n: 40, day: "9 October", title: "even a greeting is counted",
        verse: { ar: "فَحَيُّوا۟ بِأَحْسَنَ مِنْهَآ أَوْ رُدُّوهَآ ۗ إِنَّ ٱللَّهَ كَانَ عَلَىٰ كُلِّ شَىْءٍ <b>حَسِيبًا</b>", arS: 84, en: "Greet back with better, or return it. Allah keeps <b>account</b> of all things.", enS: 60, ref: "An-Nisa · 4:86" },
        thought: "Even a greeting<br>is <em>counted.</em>", td: 96, sub: "Say salam back with something a little better today. It is written down by Al-Hasib.",
        voc: "يَا حَسِيبُ", vocTr: "Ya Hasib",
        why: "The smallest act in the Qur'an that Allah says He keeps count of, on the day everyone greets everyone.",
        caption: `Jumu'ah Mubarak. “When you are greeted, greet back with something better, or return it. Allah keeps account of all things.” An-Nisa 4:86.

Even a greeting is counted. On the day you'll greet more people than any other, say salam back with something a little better. Al-Hasib, this week's name, writes it down.

Swipe for the hour on Friday when asking is answered.

Send this to the first person who says salam to you today.

${tags("JumuahMubarak", "AlHasib", "Quran", "AsmaUlHusna", "99names")}` }),
      stories: [S.jumuah("", "Ya Hasib. Greet back with better."), S.hour("Ya Hasib")] },
    { date: "2026-10-11", events: ["World Mental Health Day was Sat"],
      post: set({ title: "Names for a chest that's tight", tag: "For a tight chest",
        disp: "Five names<br>for a chest<br><em>that's tight.</em>", sub: "Save it for the night it's needed. Send it to the one who needs it now.",
        ns: [5, 6, 52, 38, 21], roles: ["When you can't <em>settle.</em>", "When you're <em>afraid of what's next.</em>", "When it's all <em>on you.</em>", "When you're <em>bracing for it.</em>", "When there's <em>no room to breathe.</em>"],
        end: "Send it to<br>the one who<br><em>can't settle.</em>", endSub: "Or post them one of these as a real card. 99names.net/send, $6, anywhere.",
        why: "Anxiety is the most common reason people send a name on the site. A list for it is the most sendable thing the account can make.",
        caption: `5 Names of Allah for anxiety, for a chest that's tight.

As-Salam, the Source of Peace. Peace isn't found. It's given.
Al-Mu'min, the Giver of Security. He has never once broken a promise to you.
Al-Wakil, the Trustee. Hand it over. He's better at this than you.
Al-Hafiz, the Preserver. Everything that's kept safe is kept safe by Him.
Al-Basit, the Expander. Room will be made. It always is.

Yesterday was World Mental Health Day. You don't need all five. Say the one that fits, slowly, on the out-breath.

Save this for the night it's needed. Send it to the one who can't settle.

${tags("99NamesOfAllah", "AsmaUlHusna", "Anxiety", "Dua", "99names")}` }),
      stories: [S.line("16:30", "asr", "For a tight chest", "Say it on<br><em>the out-breath.</em>", "As-Salam. Peace isn't found. It's given.", { kind: "breath" }), S.send(5, "Nayla"), S.reveal(41) ] },
    /* ================================================================ WEEK 2 · AL-JALIL · MAJESTY, THEN GENEROSITY */
    { date: "2026-10-12", events: ["1 Jumada al-Ula"],
      post: theName({ n: 41, week: "Week of 12 October",
        root: { letters: ["ج", "ل", "ل"], rootTr: "j · l · l", gloss: "J · L · L · to be great, to be exalted",
          fam: [["جَلَال", "<em>jalal</em>", "Majesty. Greatness that needs no proof."], ["إِجْلَال", "<em>ijlal</em>", "Reverence: holding someone in awe."], ["جَلِيل", "<em>jalil</em>", "Momentous. Of great weight."], ["جَلَّ جَلَالُهُ", "<em>jalla jalaluhu</em>", "Exalted is His majesty."]] },
        verse: { ar: "تَبَٰرَكَ ٱسْمُ رَبِّكَ <b>ذِى ٱلْجَلَٰلِ</b> وَٱلْإِكْرَامِ", arS: 100, en: "Blessed is the name of your Lord, <b>Owner of Majesty</b> and Honour.", enS: 64, ref: "Ar-Rahman · 55:78", note: "The last verse of Ar-Rahman" },
        voc: "يَا جَلِيلُ", vocTr: "Ya Jalil",
        when: ["When your problem feels <em>bigger than everything.</em>", "When you're in awe <em>and have no words.</em>", "When you've made Him <em>small in your head.</em>"],
        send: "Send Al-Jalil to someone who needs reminding how big He is.",
        why: "Jumada al-Ula begins today. The week's phrase, Dhul-Jalali wal-Ikram, closes Surah Ar-Rahman and carries this week's name and next week's.",
        caption: `Al-Jalil meaning: The Majestic. No. 41 of the 99 Names of Allah, and this week's name.

Majesty is His default setting. Not a mood, not an occasion: greatness that needs no proof and no audience.

Surah Ar-Rahman ends on it: “Blessed is the name of your Lord, Owner of Majesty and Honour.” 55:78. Dhul-Jalali wal-Ikram. Jalal is this week. Ikram, from the root of Al-Karim, is next.

Jumada al-Ula begins today, the first of two quiet months before Rajab.

${WEEK}

Save this. Send it to someone who needs reminding how big He is.

${tags("AlJalil", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(41), S.know()] },
    { date: "2026-10-13", stories: [S.quiz(40)] },
    { date: "2026-10-14",
      post: reel({ title: "Two names in one phrase",
        cover: { kicker: "Reel · Al-Jalil", disp: "Two names<br>in one <em>phrase.</em>", d: 120, sub: "Majesty, and generosity. Ar-Rahman 55:27.", obj: { kind: "ring", size: 340, w: 3 }, len: 20 },
        reel: { id: "jalal", len: 20, script: [["0–4s", "On screen from frame one: Two names in one phrase. Ninety-nine rays draw in around an empty centre on the maghrib sky."], ["4–10s", "The ring is whole. The phrase rises beneath it: ذُو ٱلْجَلَٰلِ وَٱلْإِكْرَامِ, Owner of Majesty and Honour."], ["10–16s", "Jalal: Al-Jalil, this week's name. Ikram: the root of Al-Karim, next week's. The sky turns to isha."], ["16–20s", "Ya Dhal-Jalali wal-Ikram. Say it often. 99names."]] },
        why: "The bridge between the last name of the First Thirty and the first name of the quiet months, in a phrase most people already say without knowing it holds two names.",
        alt: ["Reel cover: the ring of ninety-nine rays on a dusk sky, with: Two names in one phrase."],
        caption: `Ya Dhal-Jalali wal-Ikram: the phrase that holds two of the 99 Names of Allah.

“And there remains the Face of your Lord, Owner of Majesty and Honour.” Ar-Rahman 55:27.

Jalal is majesty: Al-Jalil, this week's name. Ikram is honour and generosity, from the same root as Al-Karim, next week's. One phrase, two names, and the Prophet ﷺ told us to hold on to it: “Cling to Ya Dhal-Jalali wal-Ikram.” Tirmidhi 3525.

Say it once tonight. Then send this to someone who says it without knowing what it holds.

${tags("AlJalil", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "Ya Dhal-Jalali<br><em>wal-Ikram.</em>", "Owner of Majesty and Honour. Say it once before you sleep.", { kind: "ring", size: 260 }), S.slider("How often do you<br><em>say this phrase?</em>") ] },
    { date: "2026-10-15", stories: [S.breath(41)], why: "Thursday night: one breath and the week's name, nothing asked." },
    { date: "2026-10-16", events: ["Jumu'ah"],
      post: jumuah({ n: 41, day: "16 October", title: "what remains",
        verse: { ar: "وَيَبْقَىٰ وَجْهُ رَبِّكَ <b>ذُو ٱلْجَلَٰلِ</b> وَٱلْإِكْرَامِ", arS: 104, en: "And there remains the Face of your Lord, <b>Owner of Majesty</b> and Honour.", enS: 62, ref: "Ar-Rahman · 55:27" },
        thought: "Everything on<br>the earth passes.<br><em>Majesty remains.</em>", td: 92, sub: "The verse before says it plainly: everyone upon it will perish. Al-Jalil isn't a mood or an occasion. It's what is still there when everything else has gone.",
        voc: "يَا ذَا ٱلْجَلَٰلِ وَٱلْإِكْرَامِ", vocTr: "Ya Dhal-Jalali wal-Ikram",
        why: "The first Jumu'ah after the launch month, on the verse that names this week and the next.",
        caption: `Jumu'ah Mubarak. “And there remains the Face of your Lord, Owner of Majesty and Honour.” Ar-Rahman 55:27.

The verse before it is four words: everyone upon the earth will perish. Then this one. Everything passes; His majesty is what remains.

Al-Jalil, The Majestic, is the week's name. Swipe for a thought, and for the hour on Friday when asking is answered.

Ya Dhal-Jalali wal-Ikram. Send this to someone you'll be making du'a for today.

${tags("JumuahMubarak", "AlJalil", "Quran", "AsmaUlHusna", "99names")}` }),
      stories: [S.jumuah("", "Ya Dhal-Jalali wal-Ikram. Ask before the prayer."), S.hour("Ya Dhal-Jalali wal-Ikram")] },
    { date: "2026-10-18",
      post: set({ title: "Names for someone grieving", tag: "For someone grieving",
        disp: "Five names<br>for someone<br><em>who is grieving.</em>", sub: "For the one carrying a loss. Send it when you don't know what to say.",
        ns: [99, 9, 96, 2, 30], fan: [9, 96, 2], roles: ["For the days <em>that won't end.</em>", "For what's <em>broken in you.</em>", "This will pass. <em>He will not.</em>", "Mercy that is <em>a habit, not a moment.</em>", "For the kindness <em>you'll only see later.</em>"],
        end: "Send it to<br>the one who<br><em>lost someone.</em>", endSub: "Or post them one of these as a real card. 99names.net/send, $6, anywhere.",
        why: "Grief is the first mood on Send-a-Name, and the hardest moment to find words. A set someone can send instead of words.",
        caption: `5 Names of Allah for someone who is grieving.

As-Sabur, the Infinitely Patient. For the days that won't end.
Al-Jabbar, the Restorer. The same hand that can break anything is the one that mends you.
Al-Baqi, the Everlasting. This will pass. He will not.
Ar-Rahim, the Most Merciful. His mercy isn't a moment. It's a habit.
Al-Latif, the Subtle and Kind. Some of His kindness you'll only recognise in hindsight.

When you don't know what to say to someone who has lost someone, a name says it for you.

Save this. Send it to the one who is grieving, gently.

${tags("99NamesOfAllah", "AsmaUlHusna", "Grief", "Dua", "99names")}` }),
      stories: [S.line("16:30", "asr", "For someone grieving", "This will pass.<br><em>He will not.</em>", "Al-Baqi, The Everlasting.", { kind: "card", n: 96, w: 380 }), S.send(9, "Nayla"), S.reveal(42)] },

    /* ================================================================ WEEK 3 · AL-KARIM · ASK FOR MORE */
    { date: "2026-10-19",
      post: theName({ n: 42, week: "Week of 19 October",
        root: { letters: ["ك", "ر", "م"], rootTr: "k · r · m", gloss: "K · R · M · to be generous, to be noble",
          fam: [["كَرَم", "<em>karam</em>", "Generosity. The open hand."], ["إِكْرَام", "<em>ikram</em>", "Honouring someone: Dhul-Jalali wal-Ikram."], ["كَرَّمْنَا", "<em>karramna</em>", "“We have honoured the children of Adam.” 17:70"], ["ٱلْأَكْرَم", "<em>al-akram</em>", "The Most Generous, in the first verses revealed."]] },
        verse: { ar: "ٱقْرَأْ وَرَبُّكَ <b>ٱلْأَكْرَمُ</b>", arS: 128, en: "Read, and your Lord is <b>the Most Generous.</b>", enS: 70, ref: "Al-'Alaq · 96:3", note: "Among the first words revealed" },
        voc: "يَا كَرِيمُ", vocTr: "Ya Karim",
        when: ["Before you ask for something <em>you don't think you deserve.</em>", "When someone was generous to you <em>and you can't repay it.</em>", "When you've run out, <em>and you're embarrassed to ask again.</em>"],
        send: "Send Al-Karim to the friend who always gives and never asks for anything back.",
        why: "The weekly ritual, now with depth. The root slide is the one people screenshot: karam, ikram, and the honour every person is born with.",
        caption: `Al-Karim meaning: The Most Generous. No. 42 of the 99 Names of Allah, and this week's name.

Generosity that gives before you ask, beyond what you deserve, and more than you hoped for.

Six slides: what it means, where the root k-r-m goes, a verse from the very first revelation, and when to say Ya Karim.

The same root is in “We have honoured the children of Adam.” Al-Karim gives, and He honours. You were given dignity before you did a single thing to earn it.

${WEEK}

Save this for the week. Send it to the friend who always gives and never asks for anything back.

${tags("AlKarim", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(42), S.know()] },
    { date: "2026-10-20", stories: [S.quiz(41)], why: "Tuesday keeps last week's name near while the new one settles." },
    { date: "2026-10-21",
      post: reel({ title: "Hands raised",
        cover: { kicker: "Reel · Al-Karim", disp: "Too generous<br>to send them<br><em>back empty.</em>", d: 112, sub: "A hadith in eighteen seconds.", obj: { kind: "breath" }, len: 18 },
        reel: { id: "karim", len: 18, script: [["0–4s", "On screen from frame one: When you raise your hands to Him. The sun rises from the foot of the maghrib sky."], ["4–9s", "He is too generous to send them back empty. The light settles and breathes."], ["9–14s", "“Your Lord is shy and generous.” Abu Dawud 1488. Al-Karim, The Most Generous."], ["14–18s", "Ask for more. 99names."]] },
        why: "Al-Karim in motion. The line is the one people send to a friend who has stopped asking.",
        alt: ["Reel cover: a sun rising on a dusk sky, with: Too generous to send them back empty."],
        caption: `When you raise your hands to Him, He is too generous to send them back empty.

“Your Lord is shy and generous. When His servant raises his hands to Him, He is shy to return them empty.” Abu Dawud 1488.

That is Al-Karim, The Most Generous, No. 42 of the 99 Names of Allah. The shyness is His, as befits Him: the One who never runs out doesn't like to see you leave with nothing.

So ask. Ask for more than you think you deserve. That's the point.

Send this to someone who stopped asking.

${tags("AlKarim", "Dua", "99NamesOfAllah", "AsmaUlHusna", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "Ask for more<br>than you think<br><em>you deserve.</em>", "That's the point of Al-Karim.", { kind: "ring", size: 260 }), S.slider("How much did you<br><em>need this today?</em>") ] },
    { date: "2026-10-22", stories: [S.breath(42)] },
    { date: "2026-10-23", events: ["Jumu'ah", "White days start Sat"],
      post: jumuah({ n: 42, day: "23 October", title: "your Lord, the Generous",
        verse: { ar: "يَٰٓأَيُّهَا ٱلْإِنسَٰنُ مَا غَرَّكَ بِرَبِّكَ <b>ٱلْكَرِيمِ</b>", arS: 96, en: "O human being, what has lured you away from your Lord, <b>the Most Generous?</b>", enS: 60, ref: "Al-Infitar · 82:6" },
        thought: "It isn't an<br>accusation.<br><em>It's a way back.</em>", sub: "Read slowly, the question is asked by the One who has been generous the whole time you were away, and still is.",
        voc: "يَا كَرِيمُ", vocTr: "Ya Karim",
        why: "The week's name, used by Allah of Himself, in a verse that reads as an invitation.",
        caption: `Jumu'ah Mubarak. “O human being, what has lured you away from your Lord, the Most Generous?” Al-Infitar 82:6.

Read it slowly. It isn't an accusation. It's a question asked by the One who has been generous the whole time you were away, and still is.

Al-Karim is this week's name. Swipe to the last slide for the hour on Friday when asking is answered, and ask Him for more than you think you deserve.

Send this to someone you'd love to see come back.

${tags("JumuahMubarak", "AlKarim", "Quran", "AsmaUlHusna", "99names")}` }),
      stories: [S.jumuah("", "Ya Karim. Ask before the prayer."), S.hour("Ya Karim"),
        S.line("20:00", "isha", "The white days", "Saturday, Sunday<br><em>and Monday.</em>", "The 13th, 14th and 15th of Jumada al-Ula fall on 24 to 26 October by the Umm al-Qura calendar. The Prophet ﷺ told Abu Dharr to fast these three. Tirmidhi 761. Your local calendar may differ by a day.")] },
    { date: "2026-10-25", events: ["UK clocks go back"],
      post: deal({ title: "Five names for someone far away",
        disp: "Five names for<br><em>someone far away.</em>", sub: "Dealt one at a time.",
        ns: [38, 52, 7, 43, 77], roles: ["For the journey,<br><em>kept safe the whole way.</em>", "For the plans you<br><em>can't manage from here.</em>", "Watched over,<br><em>not watched.</em>", "He doesn't look away,<br><em>even across an ocean.</em>", "The world is managed.<br><em>Breathe.</em>"],
        end: "Send them <em>one.</em>",
        why: "Half the audience has someone abroad. Ar-Raqib is in the set, so tomorrow's name arrives already met.",
        caption: `5 Names of Allah for someone far away: travelling, studying abroad, or just missed.

Al-Hafiz, the Preserver. Kept safe the whole way.
Al-Wakil, the Trustee. For the plans you can't manage from here.
Al-Muhaymin, the Guardian. Watched over, not watched.
Ar-Raqib, the Watchful. He doesn't look away, even across an ocean.
Al-Wali, the Governor. The world is managed. Breathe.

Twenty-six seconds, five cards. Sound on.

Send this to the one who's far away. Or send them one of these as a real card, posted to wherever they are: 99names.net/send.

${tags("99NamesOfAllah", "AsmaUlHusna", "Dua", "MuslimAbroad", "99names")}` }),
      stories: [S.line("16:30", "asr", "Far away", "Someone<br><em>far away?</em>", "Al-Hafiz. Everything that's kept safe is kept safe by Him.", { kind: "card", n: 38, w: 380 }), S.send(38, "Nayla"), S.reveal(43) ] },

    /* ================================================================ WEEK 4 · AR-RAQIB · SEEN, AND KEPT */
    { date: "2026-10-26",
      post: theName({ n: 43, week: "Week of 26 October",
        root: { letters: ["ر", "ق", "ب"], rootTr: "r · q · b", gloss: "R · Q · B · to watch over, to keep in view",
          fam: [["رَقَبَة", "<em>raqabah</em>", "The neck. The watcher lifts it to see."], ["مُرَاقَبَة", "<em>muraqabah</em>", "Watchfulness: living as one who is seen."], ["تَرَقُّب", "<em>taraqqub</em>", "Waiting, with your eyes on the door."], ["ٱلرَّقِيب", "<em>ar-raqib</em>", "“You were the Watcher over them.” 5:117"]] },
        verse: { ar: "إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ <b>رَقِيبًۭا</b>", arS: 116, en: "Indeed Allah is ever, over you, <b>Watchful.</b>", enS: 70, ref: "An-Nisa · 4:1", note: "The close of a verse about family" },
        voc: "يَا رَقِيبُ", vocTr: "Ya Raqib",
        when: ["When no one is watching <em>and you're deciding who to be.</em>", "When you did something good <em>that nobody saw.</em>", "When someone you love is <em>out of your sight.</em>"],
        send: "Send Ar-Raqib to someone who feels unseen, or someone who's far from home.",
        why: "A name that can sound stern, taught as a comfort: seen, and kept.",
        caption: `Ar-Raqib meaning: The Watchful. No. 43 of the 99 Names of Allah, and this week's name.

Ever-observant, never distracted, never asleep. He doesn't look away, even when you wish He would.

It can sound like a warning. Read it the way An-Nisa 4:1 uses it: at the end of a verse about family, the wombs, the people you're tied to. He is watching over them, and you.

Six slides: the meaning, the root r-q-b, the verse, and when to say Ya Raqib.

${WEEK}

Save this. Send it to someone who feels unseen.

${tags("ArRaqib", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(43), S.know()] },
    { date: "2026-10-27", stories: [S.quiz(42)] },
    { date: "2026-10-28",
      post: reel({ title: "He never looks away",
        cover: { kicker: "Reel · Ar-Raqib", disp: "Neither drowsiness<br>nor <em>sleep.</em>", d: 112, sub: "Ayat al-Kursi, 2:255, around a ring of light.", obj: { kind: "ring", size: 340, w: 3 }, len: 22 },
        reel: { id: "raqib", len: 22, script: [["0–4s", "On screen from frame one: He never looks away. A single ray of light sweeps the ring on the isha sky."], ["4–11s", "The sweep goes round, lighting every ray it passes. Arabic: لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ."], ["11–17s", "Neither drowsiness overtakes Him nor sleep. Ayat al-Kursi, 2:255. The ring is whole."], ["17–22s", "Ar-Raqib, The Watchful. You are seen, and kept. 99names."]] },
        why: "Ayat al-Kursi is the verse most of the audience knows by heart. One line of it, drawn as a watch that never stops, makes Ar-Raqib a comfort.",
        alt: ["Reel cover: the ring of ninety-nine rays on a night sky, with: Neither drowsiness nor sleep."],
        caption: `He never looks away. “Neither drowsiness overtakes Him nor sleep.” Al-Baqarah 2:255, Ayat al-Kursi.

You've said it a thousand times before bed. This week, say it knowing the name inside it: Ar-Raqib, The Watchful, No. 43 of the 99 Names of Allah.

Watched over, all night, every night. You can sleep. He doesn't.

Send this to someone who doesn't sleep well.

${tags("ArRaqib", "AyatAlKursi", "99NamesOfAllah", "AsmaUlHusna", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "You can sleep.<br><em>He doesn't.</em>", "Ar-Raqib. Neither drowsiness nor sleep. 2:255", { kind: "ring", size: 260 }), S.slider("How seen do you<br><em>feel this week?</em>") ] },
    { date: "2026-10-29", stories: [S.breath(43), S.ask("21:05", "isha", "Is there something<br>we can make<br><em>du'a for?</em>", "We read every one. We share none.")] },
    { date: "2026-10-30", events: ["Jumu'ah"],
      post: jumuah({ n: 43, day: "30 October", title: "He sees you",
        verse: { ar: "فَلَمَّا تَوَفَّيْتَنِى كُنتَ أَنتَ <b>ٱلرَّقِيبَ</b> عَلَيْهِمْ", arS: 92, en: "When You took me up, You were <b>the Watcher</b> over them.", enS: 62, ref: "Al-Ma'idah · 5:117", note: "The words of 'Isa, peace be upon him" },
        thought: "If you do not<br>see Him,<br><em>He sees you.</em>", sub: "Ihsan: to worship Allah as though you see Him, and if you do not see Him, He sees you. Bukhari 50, Muslim 8.",
        voc: "يَا رَقِيبُ", vocTr: "Ya Raqib",
        why: "A Prophet handing his people back to Allah's watching, and the hadith of Jibril. Both make Ar-Raqib a rest, not a test.",
        caption: `Jumu'ah Mubarak. “When You took me up, You were the Watcher over them.” Al-Ma'idah 5:117.

'Isa, peace be upon him, speaking of the people he left behind. Even a Prophet hands the ones he loves back to Ar-Raqib's watching. You can hand yours over too.

And the hadith of Jibril: worship Allah as though you see Him, and if you don't see Him, He sees you. Bukhari 50, Muslim 8.

Swipe for the hour on Friday when asking is answered. Send this to someone who's worried about the people they love.

${tags("JumuahMubarak", "ArRaqib", "Quran", "AsmaUlHusna", "99names")}` }),
      stories: [S.jumuah("", "Ya Raqib. Hand them over before the prayer."), S.hour("Ya Raqib")] },
    { date: "2026-11-01", events: ["US clocks go back"],
      post: set({ title: "Names for someone who feels unseen", tag: "For the unseen",
        disp: "Five names<br>for someone who<br><em>feels unseen.</em>", sub: "For the one who feels lonely in a full room.",
        ns: [47, 44, 26, 27, 55], roles: ["When you feel <em>hard to love.</em>", "When you've called <em>and heard nothing.</em>", "When no one is <em>listening.</em>", "When nobody <em>noticed the effort.</em>", "When you need <em>a friend.</em>"],
        end: "Send it to the<br>one who feels<br><em>invisible.</em>", endSub: "Or send them one as a card. 99names.net/send",
        why: "Loneliness is the second most chosen mood on Send-a-Name. Al-Mujib is in the set, so tomorrow's name arrives already met.",
        caption: `5 Names of Allah for loneliness, for someone who feels unseen.

Al-Wadud, the Most Loving. He loves you in the mess, not after it.
Al-Mujib, the Responsive. Every du'a has been answered. Not every answer was yes, yet.
As-Sami', the All-Hearing. You've never once spoken to no one.
Al-Basir, the All-Seeing. He saw the effort nobody else noticed.
Al-Waliyy, the Protecting Friend. You have a friend in high places. The highest.

Save this. Send it to the one who feels invisible, even in a full room.

${tags("99NamesOfAllah", "AsmaUlHusna", "Loneliness", "Dua", "99names")}` }),
      stories: [S.line("16:30", "asr", "For the unseen", "You've never once<br><em>spoken to no one.</em>", "As-Sami', The All-Hearing.", { kind: "card", n: 26, w: 380 }), S.send(47, "Nayla"), S.reveal(44) ] },

    /* ================================================================ WEEK 5 · AL-MUJIB · EVERY DU'A IS ANSWERED */
    { date: "2026-11-02",
      post: theName({ n: 44, week: "Week of 2 November",
        root: { letters: ["ج", "و", "ب"], rootTr: "j · w · b", gloss: "J · W · B · to cut through, to answer",
          fam: [["جَوَاب", "<em>jawab</em>", "An answer."], ["إِجَابَة", "<em>ijabah</em>", "Responding to a call."], ["أَسْتَجِبْ", "<em>astajib</em>", "“Call on Me; I will answer you.” 40:60"], ["جَابُوا۟", "<em>jabu</em>", "They cut through rock. 89:9. An answer is a call that got through."]] },
        verse: { ar: "إِنَّ رَبِّى قَرِيبٌۭ <b>مُّجِيبٌۭ</b>", arS: 128, en: "Indeed my Lord is near, <b>and answers.</b>", enS: 72, ref: "Hud · 11:61", note: "The Prophet Salih, to his people" },
        voc: "يَا مُجِيبُ", vocTr: "Ya Mujib",
        when: ["When you've asked so long <em>you've stopped expecting.</em>", "When the answer was no, <em>and it still hurts.</em>", "Before you ask, <em>and after.</em>"],
        send: "Send Al-Mujib to someone who has been asking for a long time.",
        why: "The root slide carries the week: the first meaning of j-w-b is to cut through, so an answer is a call that got through.",
        caption: `Al-Mujib meaning: The Responsive, the One who answers. No. 44 of the 99 Names of Allah, and this week's name.

The One who answers every call, in the form and at the time that is best. Every du'a has been answered. Not every answer was yes, yet.

The root j-w-b first means to cut through: Thamud cut through rock with it (89:9). An answer is a call that got through. Yours do.

${WEEK}

Save this. Send it to someone who has been asking for a long time.

${tags("AlMujib", "Dua", "99NamesOfAllah", "AsmaUlHusna", "99names")}` }),
      stories: [S.monday(44), S.know()] },
    { date: "2026-11-03", stories: [S.quiz(43)] },
    { date: "2026-11-04",
      post: reel({ title: "Three ways every du'a is answered",
        cover: { kicker: "Reel · Al-Mujib", disp: "Every du'a<br>is answered.<br><em>Three ways.</em>", d: 116, sub: "A hadith, in three cards.", obj: { kind: "fan", ns: [44, 30, 99], h: 520 }, len: 24 },
        reel: { id: "mujib", len: 24, script: [["0–4s", "On screen from frame one: Every du'a is answered. Three ways. Three cards wait face down on the maghrib sky."], ["4–9s", "The first turns: Given now."], ["9–14s", "The second: Kept for you, for later, in the Hereafter."], ["14–19s", "The third: A harm turned away that you never saw coming. al-Adab al-Mufrad 710."], ["19–24s", "Al-Mujib, The Responsive. Not every answer was yes, yet. 99names."]] },
        why: "The hadith most people need and few can quote. Three cards make it countable, and the third answer is the one people send.",
        alt: ["Reel cover: three cards from the deck fanned on a dusk sky, with: Every du'a is answered. Three ways."],
        caption: `Every du'a is answered, in one of three ways.

The Prophet ﷺ said that whenever a Muslim makes a du'a with no sin in it and no cutting of family ties, Allah gives one of three: He hastens it, He keeps it for the Hereafter, or He turns away an equal harm. al-Adab al-Mufrad 710.

Given now. Kept for later. Or a harm turned away that you never saw.

That's Al-Mujib, The Responsive, No. 44 of the 99 Names of Allah. Not every answer was yes, yet.

Send this to someone who thinks their du'a wasn't heard.

${tags("AlMujib", "Dua", "99NamesOfAllah", "IslamicReminder", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "Not every answer<br>was yes,<br><em>yet.</em>", "Al-Mujib, The Responsive.", { kind: "ring", size: 260 }), S.slider("How long have you<br><em>been asking?</em>") ] },
    { date: "2026-11-05", stories: [S.breath(44)] },
    { date: "2026-11-06", events: ["Jumu'ah"],
      post: jumuah({ n: 44, day: "6 November", title: "I am near",
        verse: { ar: "فَإِنِّى قَرِيبٌ ۖ <b>أُجِيبُ</b> دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ", arS: 90, en: "I am near. <b>I answer</b> the call of the one who calls, when he calls on Me.", enS: 58, ref: "Al-Baqarah · 2:186" },
        thought: "Every other<br>“they ask you”<br>is answered <em>“say”.</em>", td: 86, sub: "Here there's no “say”. When they ask about Him, He answers Himself: I am near.",
        voc: "يَا مُجِيبُ", vocTr: "Ya Mujib",
        why: "The best-known reflection on 2:186, said in one slide, on the Friday of the name that answers.",
        caption: `Jumu'ah Mubarak. “I am near. I answer the call of the one who calls, when he calls on Me.” Al-Baqarah 2:186.

Elsewhere in the Qur'an, when people ask the Prophet ﷺ something, the reply begins with “say”. Here it doesn't. When they ask about Him, He answers Himself.

Al-Mujib is this week's name. Swipe for the hour on Friday when asking is answered.

Send this to someone who has a du'a waiting.

${tags("JumuahMubarak", "AlMujib", "Quran", "Dua", "99names")}` }),
      stories: [S.jumuah("", "Ya Mujib. He is near."), S.hour("Ya Mujib")] },
    { date: "2026-11-08",
      post: deal({ title: "Five names for someone unwell",
        disp: "Five names for<br><em>someone unwell.</em>", sub: "Dealt one at a time.",
        ns: [30, 2, 60, 83, 53], roles: ["For the slow days<br><em>of getting better.</em>", "His mercy isn't a moment.<br><em>It's a habit.</em>", "For a tired body:<br><em>He gives life.</em>", "Kinder to you<br><em>than you are to yourself.</em>", "Borrow strength from<br><em>the One who never runs out.</em>"],
        end: "Send them <em>one.</em>",
        why: "Everyone knows someone unwell. A set they can send without having to find the words.",
        caption: `5 Names of Allah for someone who is unwell.

Al-Latif, the Subtle and Kind. For the slow days of getting better.
Ar-Rahim, the Most Merciful. His mercy isn't a moment. It's a habit.
Al-Muhyi, the Giver of Life. For a tired body.
Ar-Ra'uf, the Most Kind. Kinder to you than you are to yourself.
Al-Qawiyy, the All-Strong. Borrow strength from the One who never runs out.

Sound on. Then send this to the one who's unwell, or post them one of these as a real card: 99names.net/send.

${tags("99NamesOfAllah", "AsmaUlHusna", "Dua", "Shifa", "99names")}` }),
      stories: [S.line("16:30", "asr", "For someone unwell", "For the slow days<br><em>of getting better.</em>", "Al-Latif, The Subtle, The Kind.", { kind: "card", n: 30, w: 380 }), S.send(30, "Nayla"), S.reveal(45) ] },

    /* ================================================================ WEEK 6 · AL-WASI' · NO EDGE TO FALL OFF */
    { date: "2026-11-09",
      post: theName({ n: 45, week: "Week of 9 November",
        root: { letters: ["و", "س", "ع"], rootTr: "w · s · ʿ", gloss: "W · S · ʿ · to be wide, to have room",
          fam: [["سَعَة", "<em>sa'ah</em>", "Room. Ease. Plenty."], ["وُسْعَهَا", "<em>wus'aha</em>", "Its capacity: “no soul is burdened beyond it.” 2:286"], ["وَسِعَتْ", "<em>wasi'at</em>", "“My mercy encompasses all things.” 7:156"], ["وَسِعَ كُرْسِيُّهُ", "<em>wasi'a kursiyyuhu</em>", "His Kursi extends over the heavens and the earth. 2:255"]] },
        verse: { ar: "فَأَيْنَمَا تُوَلُّوا۟ فَثَمَّ وَجْهُ ٱللَّهِ ۚ إِنَّ ٱللَّهَ <b>وَٰسِعٌ</b> عَلِيمٌۭ", arS: 88, en: "Wherever you turn, there is the Face of Allah. Allah is <b>All-Encompassing</b>, All-Knowing.", enS: 56, ref: "Al-Baqarah · 2:115" },
        voc: "يَا وَاسِعُ", vocTr: "Ya Wasi'",
        when: ["When your world <em>feels small.</em>", "When you think you've gone <em>too far for mercy.</em>", "When the money, the time, the room <em>is running out.</em>"],
        send: "Send Al-Wasi' to someone whose world feels small right now.",
        why: "The root holds the most comforting verse in the Qur'an for a tired person: no soul is burdened beyond its capacity, wus'aha, the same word.",
        caption: `Al-Wasi' meaning: The All-Encompassing. No. 45 of the 99 Names of Allah, and this week's name.

Boundless in mercy, knowledge and provision. There's no edge to Him for you to fall off.

The root w-s-ʿ is room, ease, plenty. It's the same root as “Allah does not burden a soul beyond its capacity” (2:286): wus'aha, its room. Whatever you're carrying was measured to you by the One who has no edge.

${WEEK}

Save this. Send it to someone whose world feels small right now.

${tags("AlWasi", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(45), S.know()] },
    { date: "2026-11-10", stories: [S.quiz(44)] },
    { date: "2026-11-11", events: ["1 Jumada al-Akhirah"],
      post: reel({ title: "No edge",
        cover: { kicker: "Reel · Al-Wasi'", disp: "There's no edge<br>to Him for you<br><em>to fall off.</em>", d: 108, sub: "Eighteen seconds, sound on.", obj: { kind: "ring", size: 340, w: 3 }, len: 18 },
        reel: { id: "wasi", len: 18, script: [["0–4s", "On screen from frame one: There's no edge to Him. The ring sits small in the middle of the maghrib sky."], ["4–10s", "It grows, ray by ray, past the edges of the frame, until the light is the whole sky."], ["10–15s", "for you to fall off. Al-Wasi', The All-Encompassing. No soul is burdened beyond its capacity, wus'aha, the same root. 2:286"], ["15–18s", "99names."]] },
        why: "The name drawn literally: a ring that outgrows the frame. The motion is the meaning, so the reel isn't text.",
        alt: ["Reel cover: the ring of ninety-nine rays on a dusk sky, with: There's no edge to Him for you to fall off."],
        caption: `There's no edge to Him for you to fall off.

Al-Wasi', The All-Encompassing, No. 45 of the 99 Names of Allah. Mercy, knowledge, provision: none of it runs out at a border.

And the same root is in “Allah does not burden a soul beyond its capacity.” Al-Baqarah 2:286. Wus'aha: its room. You were given exactly the room you need for what you're carrying.

Send this to someone who feels like they're at the edge.

${tags("AlWasi", "99NamesOfAllah", "IslamicReminder", "AsmaUlHusna", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Today", "Jumada<br><em>al-Akhirah.</em>", "The second of the two quiet months begins, by the Umm al-Qura calendar. Rajab follows in thirty days.", { kind: "ring", size: 240 }), S.slider("How small does your<br><em>world feel lately?</em>") ] },
    { date: "2026-11-12", stories: [S.breath(45)] },
    { date: "2026-11-13", events: ["Jumu'ah", "World Kindness Day"],
      post: jumuah({ n: 45, day: "13 November", title: "mercy encompasses all",
        verse: { ar: "وَرَحْمَتِى <b>وَسِعَتْ</b> كُلَّ شَىْءٍۢ", arS: 132, en: "And My mercy <b>encompasses</b> all things.", enS: 72, ref: "Al-A'raf · 7:156" },
        thought: "Kindness was His<br><em>before it was ours.</em>", td: 92, sub: "“Allah is kind and loves kindness in all things.” Bukhari 6927. Be kind today, and remember whose it is.",
        voc: "يَا وَاسِعُ", vocTr: "Ya Wasi'",
        why: "World Kindness Day falls on a Friday, in the week of the name whose root is in “My mercy encompasses all things”. No better day for this verse.",
        caption: `Jumu'ah Mubarak. “And My mercy encompasses all things.” Al-A'raf 7:156.

Today is also World Kindness Day. Kindness was His before it was ours: “Allah is kind and loves kindness in all things.” Bukhari 6927.

Encompasses is wasi'at, the root of this week's name, Al-Wasi'. Nothing you've done has put you outside it.

Swipe for the hour on Friday when asking is answered. Then send this to someone who was kind to you this week.

${tags("JumuahMubarak", "AlWasi", "Quran", "WorldKindnessDay", "99names")}` }),
      stories: [S.jumuah("", "And My mercy encompasses all things. 7:156"), S.hour("Ya Wasi'")] },
    { date: "2026-11-15",
      post: { at: "16:00", hour: "asr", type: "carousel", title: "Names the Qur'an keeps together",
        slides: [
          { kind: "c-cover", kicker: "Five pairs · save it", disp: "Names the<br>Qur'an keeps<br><em>together.</em>", sub: "When two names close a verse, read them as one sentence.", obj: { kind: "fan", ns: [19, 46, 8], h: 470 } },
          { kind: "c-pair", ns: [19, 46], tag: "Pair one", line: "Knowing what's best, <em>and doing it.</em> The angels' words when they didn't know.", ref: "Al-Baqarah 2:32" },
          { kind: "c-pair", ns: [8, 46], tag: "Pair two", line: "Power that is never <em>careless.</em> Might, and the wisdom to hold it.", ref: "Al-Baqarah 2:209" },
          { kind: "c-pair", ns: [34, 2], tag: "Pair three", line: "He forgives, <em>and then He is kind about it.</em>", ref: "Al-Baqarah 2:173" },
          { kind: "c-pair", ns: [26, 27], tag: "Pair four", line: "Heard, <em>and seen.</em> Nothing like Him, and nothing missed.", ref: "Ash-Shura 42:11" },
          { kind: "c-pair", ns: [30, 31], tag: "Pair five", line: "Gentle, <em>because He knows the details.</em>", ref: "Al-Mulk 67:14" },
          { kind: "c-end", disp: "Read the end<br>of the next verse<br><em>you pass.</em>", sub: "There's often a pair waiting. Send this to whoever you read with.", foot: "99names.net" },
        ],
        fmt: "Five pairs is reference content: a page each, meant to be kept beside the mushaf and opened again. That is a carousel's job.",
        why: "Al-Hakim, next week's name, closes two of the five pairs, so the week after begins already met.",
        alt: ["Three cards fanned, with: Names the Qur'an keeps together.", "Al-'Alim Al-Hakim, the All-Knowing, the All-Wise. Al-Baqarah 2:32.", "Al-Aziz Al-Hakim, the Almighty, the All-Wise. Al-Baqarah 2:209.", "Al-Ghafur Ar-Rahim, the Much-Forgiving, the Most Merciful. Al-Baqarah 2:173.", "As-Sami' Al-Basir, the All-Hearing, the All-Seeing. Ash-Shura 42:11.", "Al-Latif Al-Khabir, the Subtle, the All-Aware. Al-Mulk 67:14.", "Read the end of the next verse you pass."],
        caption: `Names of Allah the Qur'an keeps together, and what each pair says.

So many verses close on two names. Read them as one sentence:

Al-'Alim Al-Hakim: knowing what's best, and doing it. 2:32
Al-'Aziz Al-Hakim: power that is never careless. 2:209
Al-Ghafur Ar-Rahim: He forgives, and then He is kind about it. 2:173
As-Sami' Al-Basir: heard, and seen. 42:11
Al-Latif Al-Khabir: gentle, because He knows the details. 67:14

Read the end of the next verse you pass. There's often a pair waiting.

Save this beside your mushaf. Send it to whoever you read with.

${tags("99NamesOfAllah", "Quran", "AsmaUlHusna", "QuranStudy", "99names")}` },
      stories: [S.line("16:30", "asr", "Read them together", "Gentle, because<br><em>He knows the details.</em>", "Al-Latif Al-Khabir. Al-Mulk 67:14.", { kind: "ring", size: 240 }), S.send(26, "Nayla"), S.reveal(46) ] },

    /* ================================================================ WEEK 7 · AL-HAKIM · REASONS, LATER */
    { date: "2026-11-16",
      post: theName({ n: 46, week: "Week of 16 November",
        root: { letters: ["ح", "ك", "م"], rootTr: "ḥ · k · m", gloss: "Ḥ · K · M · to hold back, to judge, to make firm",
          fam: [["حَكَمَة", "<em>hakamah</em>", "The bit that holds a horse back. The root's first meaning."], ["حِكْمَة", "<em>hikmah</em>", "Wisdom: what holds you back from the mistake."], ["حُكْم", "<em>hukm</em>", "A judgement. A ruling."], ["أُحْكِمَتْ", "<em>uhkimat</em>", "“A Book whose verses are made firm.” 11:1"]] },
        verse: { ar: "إِنَّكَ أَنتَ ٱلْعَلِيمُ <b>ٱلْحَكِيمُ</b>", arS: 120, en: "It is You who is the All-Knowing, <b>the All-Wise.</b>", enS: 68, ref: "Al-Baqarah · 2:32", note: "The angels, when they didn't know" },
        voc: "يَا حَكِيمُ", vocTr: "Ya Hakim",
        when: ["When it <em>doesn't make sense</em> yet.", "When a door closed <em>and you don't know why.</em>", "Before a decision <em>you can't undo.</em>"],
        send: "Send Al-Hakim to someone in the middle of something that doesn't make sense yet.",
        why: "The root's first meaning, the bit that holds a horse back, turns wisdom from an abstraction into something you can feel.",
        caption: `Al-Hakim meaning: The All-Wise. No. 46 of the 99 Names of Allah, and this week's name.

Perfect wisdom in every decree, even the ones that don't make sense yet. He allows hardship for reasons you'll understand later.

The root ḥ-k-m first meant the bit in a horse's mouth: what holds it back. Wisdom is what holds you back from the mistake. Some of what was held back from you was wisdom too.

${WEEK}

Save this. Send it to someone in the middle of something that doesn't make sense yet.

${tags("AlHakim", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(46), S.know()] },
    { date: "2026-11-17", stories: [S.quiz(45)] },
    { date: "2026-11-18",
      post: reel({ title: "The other side",
        cover: { kicker: "Reel · Al-Hakim", disp: "Some things you<br>only see from<br><em>the other side.</em>", d: 108, sub: "A card, turned over. Al-Baqarah 2:216.", obj: { kind: "card", n: 46, w: 360, tilt: -4 }, len: 22 },
        reel: { id: "hakim", len: 22, script: [["0–4s", "On screen from frame one: Some things you only see from the other side. A card lies face down on the maghrib sky, its navy back showing the rays."], ["4–10s", "Perhaps you dislike a thing and it is good for you. The card begins to turn."], ["10–16s", "It turns over: Al-Hakim, The All-Wise. Allah knows, and you do not know. 2:216"], ["16–22s", "He allows hardship for reasons you'll understand later. 99names."]] },
        why: "The verse is about not seeing the reason yet; the reel lets the viewer wait for the turn, which is exactly the feeling.",
        alt: ["Reel cover: the Al-Hakim card from the deck on a dusk sky, with: Some things you only see from the other side."],
        caption: `“Perhaps you dislike a thing and it is good for you. Allah knows, and you do not know.” Al-Baqarah 2:216.

Some things you only see from the other side.

Al-Hakim, The All-Wise, No. 46 of the 99 Names of Allah. He allows hardship for reasons you'll understand later, and some you'll understand only when you meet Him.

Watch the card turn. Then send this to someone who's still waiting to see the other side.

${tags("AlHakim", "Quran", "99NamesOfAllah", "IslamicReminder", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "Allah knows,<br><em>and you do not.</em>", "That's a relief, not a rebuke. 2:216", { kind: "ring", size: 260 }), S.slider("How much of this year<br><em>makes sense yet?</em>") ] },
    { date: "2026-11-19", stories: [S.breath(46)] },
    { date: "2026-11-20", events: ["Jumu'ah"],
      post: jumuah({ n: 46, day: "20 November", title: "wisdom is much good",
        verse: { ar: "وَمَن يُؤْتَ <b>ٱلْحِكْمَةَ</b> فَقَدْ أُوتِىَ خَيْرًۭا كَثِيرًۭا", arS: 92, en: "Whoever is given <b>wisdom</b> has been given much good.", enS: 66, ref: "Al-Baqarah · 2:269" },
        thought: "Ask for wisdom<br><em>before you ask<br>for answers.</em>", td: 88, sub: "An answer settles one question. Wisdom settles the next hundred.",
        voc: "يَا حَكِيمُ", vocTr: "Ya Hakim",
        why: "A du'a people don't think to make, on the Friday of the name it comes from.",
        caption: `Jumu'ah Mubarak. “He gives wisdom to whom He wills, and whoever is given wisdom has been given much good.” Al-Baqarah 2:269.

Ask for wisdom before you ask for answers. An answer settles one question. Wisdom settles the next hundred.

Hikmah shares its root with this week's name, Al-Hakim. Swipe for the hour on Friday when asking is answered.

Send this to someone facing a big decision.

${tags("JumuahMubarak", "AlHakim", "Quran", "Dua", "99names")}` }),
      stories: [S.jumuah("", "Ya Hakim. Ask for wisdom first."), S.hour("Ya Hakim")] },
    { date: "2026-11-22", events: ["White days start Mon"],
      post: deal({ title: "Five names for exam season",
        disp: "Five names for<br><em>exam season.</em>", sub: "For the one studying late.",
        ns: [18, 19, 46, 24, 23], roles: ["Before you<br><em>open the paper.</em>", "For what you studied,<br><em>and what you forgot.</em>", "For the result,<br><em>whatever it is.</em>", "Honour is given,<br><em>not taken.</em>", "Your rise doesn't need<br><em>their permission.</em>"],
        end: "Send them <em>one.</em>",
        why: "December is exams for students in Lagos, London and everywhere between. A set they can send to the one studying late.",
        caption: `5 Names of Allah for exam season, for the one studying late.

Al-Fattah, the Opener. Before you open the paper.
Al-'Alim, the All-Knowing. For what you studied, and what you forgot.
Al-Hakim, the All-Wise. For the result, whatever it is.
Al-Mu'izz, the Giver of Honour. Honour is given, not taken.
Ar-Rafi', the Exalter. Your rise doesn't need their permission.

Sound on. Send this to the one with exams, or post them a card for their desk: 99names.net/send.

${tags("99NamesOfAllah", "ExamDua", "AsmaUlHusna", "MuslimStudent", "99names")}` }),
      stories: [S.line("16:30", "asr", "Exam season", "Before you<br><em>open the paper.</em>", "Al-Fattah, The Opener.", { kind: "card", n: 18, w: 380 }),
        S.line("20:00", "isha", "The white days", "Monday, Tuesday<br><em>and Wednesday.</em>", "The 13th to 15th of Jumada al-Akhirah: 23 to 25 November by the Umm al-Qura calendar. Tirmidhi 761. Your local calendar may differ by a day."), S.send(18, "Nayla"), S.reveal(47) ] },

    /* ================================================================ WEEK 8 · AL-WADUD · LOVED IN THE MESS */
    { date: "2026-11-23",
      post: theName({ n: 47, week: "Week of 23 November",
        root: { letters: ["و", "د", "د"], rootTr: "w · d · d", gloss: "W · D · D · to love, and to show it",
          fam: [["وُدّ", "<em>wudd</em>", "Love that shows. “The Most Merciful will appoint for them love.” 19:96"], ["مَوَدَّة", "<em>mawaddah</em>", "The love between two people made a home. 30:21"], ["وَدَّ", "<em>wadda</em>", "To wish. To long for."], ["ٱلْوَدُود", "<em>al-wadud</em>", "The One who loves, and is loved."]] },
        verse: { ar: "وَهُوَ ٱلْغَفُورُ <b>ٱلْوَدُودُ</b>", arS: 136, en: "And He is the Forgiving, <b>the Loving.</b>", enS: 74, ref: "Al-Buruj · 85:14", note: "Forgiving first. Then loving." },
        voc: "يَا وَدُودُ", vocTr: "Ya Wadud",
        when: ["When you feel <em>hard to love.</em>", "After you've <em>let Him down</em> again.", "When you're the one who has to <em>love someone difficult.</em>"],
        send: "Send Al-Wadud to someone who feels hard to love.",
        why: "The most sent name on the site, in the week the white days begin. The verse slide carries the order: forgiving first.",
        caption: `Al-Wadud meaning: The Most Loving. No. 47 of the 99 Names of Allah, and this week's name.

Love that is active and affectionate. He loves His servants, and makes them loved. He loves you in the mess, not after it.

Wudd is love that shows. Mawaddah, from the same root, is the love Allah places between two people who make a home (30:21).

And notice the order in Al-Buruj 85:14: the Forgiving, then the Loving. He doesn't wait for you to be fixed.

${WEEK}

Save this. Send it to someone who feels hard to love.

${tags("AlWadud", "99NamesOfAllah", "AsmaUlHusna", "الأسماء_الحسنى", "99names")}` }),
      stories: [S.monday(47), S.know()] },
    { date: "2026-11-24", stories: [S.quiz(46)] },
    { date: "2026-11-25",
      post: reel({ title: "Notice the order",
        cover: { kicker: "Reel · Al-Wadud", disp: "Forgiving first.<br><em>Then loving.</em>", d: 120, sub: "Al-Buruj 85:14, in two cards.", obj: { kind: "fan", ns: [34, 47, 2], h: 520 }, len: 20 },
        reel: { id: "wadud", len: 20, script: [["0–4s", "On screen from frame one: Notice the order. Two cards wait on the maghrib sky."], ["4–9s", "The first is laid down: Al-Ghafur, The Forgiving."], ["9–14s", "The second, beside it: Al-Wadud, The Loving. Arabic: وَهُوَ ٱلْغَفُورُ ٱلْوَدُودُ. 85:14"], ["14–20s", "He doesn't wait for you to be fixed. He forgives, then He loves. 99names."]] },
        why: "A detail in the verse most people have never noticed, shown by laying two cards down in order.",
        alt: ["Reel cover: three cards from the deck fanned on a dusk sky, with: Forgiving first. Then loving."],
        caption: `“And He is the Forgiving, the Loving.” Al-Buruj 85:14. Notice the order.

Forgiving first. Then loving. He doesn't wait for you to be fixed before He loves you. He forgives, and the love is already there.

Al-Wadud, The Most Loving, No. 47 of the 99 Names of Allah.

Send this to someone who thinks they have to earn it first.

${tags("AlWadud", "Quran", "99NamesOfAllah", "IslamicReminder", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "Tonight", "He loves you<br>in the mess,<br><em>not after it.</em>", "Al-Wadud, The Most Loving.", { kind: "ring", size: 260 }), S.slider("How hard is it to<br><em>feel loved lately?</em>") ] },
    { date: "2026-11-26", events: ["Thanksgiving (US)"],
      post: { at: "19:00", hour: "maghrib", type: "single", title: "Nothing is on sale",
        feed: { kind: "statement", kicker: "This week", disp: "Nothing is<br><em>on sale.</em>", d: 150, sub: "No countdown. No last chance. The deck is $34 today and it will be $34 on Monday. Take your time. That's the whole point of a name a week.", obj: { kind: "card", n: 47, w: 330, tilt: 4 }, objFirst: true, gap: 60 },
        fmt: "The one single image in two months, on purpose: one line, meant to be screenshotted, where a second slide would only dilute it.",
        why: "Every other account is shouting this week. The brand that says no streaks, no guilt also says no countdown, and that is the post people quote.",
        alt: ["The Al-Wadud card from the deck above the words: Nothing is on sale. No countdown. No last chance. The deck is $34 today and it will be $34 on Monday."],
        caption: `Nothing is on sale this week.

No countdown. No “last chance”. No timer in the corner of the screen. The deck is $34 today, and it will be $34 on Monday, and in March.

We built 99names so that nothing counts against you: no streaks, no guilt, no hurry. It would be strange to start hurrying you now.

If you want the deck, it's there. If you'd rather send one name to one person, that's $6, or free as a link. Take your time.

Send this to the friend who hates this week as much as we do.

${tags("99names", "NoBlackFriday", "AsmaUlHusna", "99NamesOfAllah", "SlowLiving")}` },
      stories: [S.line("21:00", "isha", "Tonight", "He noticed.<br><em>He remembers.</em>", "Ash-Shakur, The Appreciative. He'll multiply it.", { kind: "card", n: 35, w: 380 }), S.ask("21:05", "isha", "One thing you're<br><em>grateful for</em><br>this week?", "However small")] },
    { date: "2026-11-27", events: ["Jumu'ah", "Black Friday"],
      post: jumuah({ n: 47, day: "27 November", title: "turning back is open",
        verse: { ar: "وَٱسْتَغْفِرُوا۟ رَبَّكُمْ ثُمَّ تُوبُوٓا۟ إِلَيْهِ ۚ إِنَّ رَبِّى رَحِيمٌۭ <b>وَدُودٌۭ</b>", arS: 86, en: "Ask your Lord's forgiveness, then turn back to Him. My Lord is Merciful, <b>Loving.</b>", enS: 58, ref: "Hud · 11:90", note: "The Prophet Shu'ayb, to his people" },
        thought: "The door back<br>has no<br><em>closing time.</em>", td: 92, sub: "Ask forgiveness, then turn. He is Merciful, and He is Loving, in that order and at any hour.",
        voc: "يَا وَدُودُ", vocTr: "Ya Wadud",
        why: "On the loudest shopping day of the year, a verse about the one door that never closes.",
        caption: `Jumu'ah Mubarak. “Ask your Lord's forgiveness, then turn back to Him. My Lord is Merciful, Loving.” Hud 11:90.

The door back has no closing time. Today the whole internet is counting down; this never does.

Al-Wadud is this week's name. Swipe for the hour on Friday when asking is answered.

Send this to someone who thinks it's too late to turn back.

${tags("JumuahMubarak", "AlWadud", "Quran", "Tawbah", "99names")}` }),
      stories: [S.jumuah("", "Ya Wadud. No closing time."), S.hour("Ya Wadud")] },

    { date: "2026-11-29", stories: [S.reveal(48)], why: "No feed post this Sunday: Thursday and Friday already went up. The reveal keeps the Sunday-night ritual." },

    /* ================================================================ WEEK 9 · AL-MAJID · YOU ALREADY SAY IT */
    { date: "2026-11-30",
      post: theName({ n: 48, week: "Week of 30 November",
        root: { letters: ["م", "ج", "د"], rootTr: "m · j · d", gloss: "M · J · D · glory, honour without limit",
          fam: [["مَجْد", "<em>majd</em>", "Glory. Honour that is full and generous."], ["مَجِيد", "<em>majid</em>", "Glorious. Said of Allah, and of the Qur'an. 85:21"], ["مَجَّدَنِى", "<em>majjadani</em>", "“My servant has glorified Me”: His reply to Maliki yawm id-din. Muslim 395"], ["حَمِيدٌ مَجِيدٌ", "<em>hamidun majid</em>", "The last words of the salawat in every prayer."]] },
        verse: { ar: "إِنَّهُۥ حَمِيدٌۭ <b>مَّجِيدٌۭ</b>", arS: 136, en: "Indeed He is Praiseworthy, <b>Glorious.</b>", enS: 74, ref: "Hud · 11:73", note: "The angels, to the household of Ibrahim" },
        voc: "يَا مَجِيدُ", vocTr: "Ya Majid",
        when: ["At the end of <em>every prayer.</em> You already do.", "When you want to be <em>seen</em> for what you did.", "When someone else <em>gets the credit.</em>"],
        send: "Send Al-Majid to someone who prays five times a day and has never noticed they say it.",
        why: "The hook is that the audience already says this name five times a day without knowing it. That is the most sendable fact of the season.",
        caption: `Al-Majid meaning: The Most Glorious. No. 48 of the 99 Names of Allah, and you already say it every day.

The salawat at the end of every prayer closes with it: innaka Hamidun Majid. You are Praiseworthy, Glorious. Bukhari 3370.

And when you recite Maliki yawm id-din in Al-Fatihah, Allah replies: “My servant has glorified Me.” Majjadani. The same root. Muslim 395.

Glory that doesn't need an audience. ${WEEK}

Save this. Send it to someone who prays and has never noticed they say it.

${tags("AlMajid", "99NamesOfAllah", "Salah", "AsmaUlHusna", "99names")}` }),
      stories: [S.monday(48), S.know()] },
    { date: "2026-12-01", events: ["GivingTuesday"],
      post: reel({ at: "19:00", title: "Give a name",
        cover: { kicker: "Reel · GivingTuesday", disp: "Give<br><em>a name.</em>", d: 150, sub: "A real card, in the post, anywhere.", obj: { kind: "env", n: 47, to: "Mum", state: "closed", w: 640 }, len: 20 },
        reel: { id: "give", len: 20, script: [["0–4s", "On screen from frame one: Give a name. An envelope addressed For Mum sits on the maghrib sky."], ["4–10s", "The flap lifts. The card rises: Al-Wadud, The Most Loving."], ["10–15s", "He loves you in the mess, not after it. A real card, posted anywhere in three days."], ["15–20s", "$6, or free as a link tonight. 99names.net/send"]] },
        why: "GivingTuesday is the one shopping moment that fits the brand: the product is giving. Send-a-Name is the growth product, and every card sent is a new person meeting the names.",
        alt: ["Reel cover: a closed envelope addressed For Mum, with a 99-ray stamp, and: Give a name."],
        caption: `GivingTuesday: give a name.

Pick the name someone needs. Write who it's for. We print it on a soft-touch card, hand-address the envelope and post it anywhere in the world within three days. $6. Or send it free tonight as a link, and they open the same envelope on their phone.

This one's Al-Wadud, The Most Loving, for Mum. He loves you in the mess, not after it.

Send one tonight: 99names.net/send. Then send this to the person you'd most like to get one from.

${tags("GivingTuesday", "SendAName", "99NamesOfAllah", "AsmaUlHusna", "99names")}` }),
      stories: [Object.assign(S.send(9, "Nayla"), { at: "19:30", hour: "maghrib", kicker: "GivingTuesday", disp: "Somebody you love<br>is having <em>a week.</em>" }), S.slider("How long since you<br><em>sent a real card?</em>")] },
    { date: "2026-12-02", stories: [S.quiz(47)] },
    { date: "2026-12-03", stories: [S.breath(48)] },
    { date: "2026-12-04", events: ["Jumu'ah"],
      post: jumuah({ n: 48, day: "4 December", title: "the Glorious",
        verse: { ar: "ذُو ٱلْعَرْشِ <b>ٱلْمَجِيدُ</b>", arS: 150, en: "Owner of the Throne, <b>the Glorious.</b>", enS: 76, ref: "Al-Buruj · 85:15", note: "The verse after the Forgiving, the Loving" },
        thought: "Glory that doesn't<br>need an audience.<br><em>Yours doesn't either.</em>", td: 84, sub: "The good you did that nobody saw was seen by the One whose glory needs no one. It counted.",
        voc: "يَا مَجِيدُ", vocTr: "Ya Majid",
        why: "The verse right after Al-Wadud's, so the two weeks read as one passage.",
        caption: `Jumu'ah Mubarak. “Owner of the Throne, the Glorious.” Al-Buruj 85:15, the verse right after “and He is the Forgiving, the Loving.”

Al-Majid is glory that doesn't need an audience. Yours doesn't either. The good you did this week that nobody saw was seen, and it counted.

Swipe for the hour on Friday when asking is answered.

Send this to someone who does good quietly.

${tags("JumuahMubarak", "AlMajid", "Quran", "AsmaUlHusna", "99names")}` }),
      stories: [S.jumuah("", "Ya Majid. Seen, and counted."), S.hour("Ya Majid")] },
    { date: "2026-12-06",
      post: set({ title: "Five people to send a name to before the year ends", tag: "Before the year ends", kicker: "Five people · five names",
        disp: "Five people<br>to send a name<br><em>before the year ends.</em>", d: 100, sub: "Cards post within three days, anywhere. There's still time.",
        ns: [38, 9, 18, 52, 35], fan: [38, 18, 9], roles: ["The one who <em>moved away</em> this year.", "The one who <em>lost someone.</em>", "The one who <em>started something new.</em>", "The one who <em>carried everyone.</em>", "The one who was <em>always there for you.</em>"],
        end: "Pick one.<br><em>Send it tonight.</em>", endSub: "$6 for a real card, posted anywhere. Free as a link. 99names.net/send",
        why: "The year-end list. Five people, five names, five cards: the most natural way into Send-a-Name the account will have before Ramadan.",
        caption: `Five people to send a name of Allah to before the year ends.

The one who moved away this year: Al-Hafiz, the Preserver.
The one who lost someone: Al-Jabbar, the Restorer.
The one who started something new: Al-Fattah, the Opener.
The one who carried everyone: Al-Wakil, the Trustee.
The one who was always there for you: Ash-Shakur, the Appreciative. He noticed.

A real card posts within three days, anywhere in the world, for $6. Or send it free as a link tonight: 99names.net/send.

Save this list. Then send it to one of the five.

${tags("SendAName", "99NamesOfAllah", "AsmaUlHusna", "IslamicGift", "99names")}` }),
      stories: [Object.assign(S.send(38, "Nayla"), { at: "16:30", kicker: "Before the year ends", disp: "Pick one.<br><em>Send it tonight.</em>" }), S.reveal(49)] },

    /* ================================================================ WEEK 10 · AL-BA'ITH · A HEART REVIVED, AND RAJAB */
    { date: "2026-12-07",
      post: theName({ n: 49, week: "Week of 7 December",
        root: { letters: ["ب", "ع", "ث"], rootTr: "b · ʿ · th", gloss: "B · ʿ · TH · to raise up, to send out",
          fam: [["بَعْث", "<em>ba'th</em>", "Raising: the Day the dead stand up."], ["بِعْثَة", "<em>bi'thah</em>", "A sending: the mission of the Prophet ﷺ."], ["بَعَثْنَٰهُمْ", "<em>ba'athnahum</em>", "“We raised them”: the sleepers of the cave, waking. 18:19"], ["مَبْعُوث", "<em>mab'uth</em>", "One who is sent. One who is raised."]] },
        verse: { ar: "وَأَنَّ ٱللَّهَ <b>يَبْعَثُ</b> مَن فِى ٱلْقُبُورِ", arS: 112, en: "And that Allah <b>will raise</b> those in the graves.", enS: 70, ref: "Al-Hajj · 22:7" },
        voc: "يَا بَاعِثُ", vocTr: "Ya Ba'ith",
        when: ["When your heart <em>feels dead</em> to it all.", "When something you buried <em>needs to come back.</em>", "When you're <em>starting again</em> after a long time."],
        send: "Send Al-Ba'ith to someone starting again after a long time away.",
        why: "The last name of the quiet months, the week Rajab opens: a name about raising up, before the season of turning back.",
        caption: `Al-Ba'ith meaning: The Resurrector. No. 49 of the 99 Names of Allah, and this week's name.

The One who raises the dead, sends the messengers, and brings hearts back to life. If He can raise the dead, He can revive your heart.

The root b-ʿ-th is to raise up and to send out. It's the word for the sleepers of the cave waking after three hundred years (18:19), and for the mission of the Prophet ﷺ.

Rajab begins this week. Two months to Ramadan. A good week to be raised.

${WEEK}

Save this. Send it to someone starting again after a long time away.

${tags("AlBaith", "99NamesOfAllah", "AsmaUlHusna", "Rajab", "99names")}` }),
      stories: [S.monday(49), S.know()] },
    { date: "2026-12-08", stories: [S.quiz(48)] },
    { date: "2026-12-09", events: ["Rajab begins Thu"],
      post: reel({ title: "Sixty days",
        cover: { kicker: "Reel · Rajab 1448", disp: "Rajab. Sha'ban.<br><em>Then Ramadan.</em>", d: 108, sub: "Sixty days, in dots.", obj: { kind: "months", rows: [["Rajab", 30, 30], ["Sha'ban", 30, 0], ["Ramadan", 30, 0]] }, len: 20 },
        reel: { id: "rajab", len: 20, script: [["0–4s", "On screen from frame one: Rajab begins this week. Three rows of thirty dots on the isha sky."], ["4–10s", "Rajab's thirty light one by one. Of the twelve months, four are sacred. At-Tawbah 9:36. Rajab is one."], ["10–16s", "Sha'ban's thirty follow. Then the third row, Ramadan, waits, unlit."], ["16–20s", "Sixty days. Start slowly. 99names."]] },
        why: "The run-in to Ramadan starts here, gently. Dots instead of a countdown: the brand counts what is coming, never what you've missed. No crescent, by the brand's rule.",
        alt: ["Reel cover: three rows of thirty dots, the first lit, labelled Rajab, Sha'ban and Ramadan, with: Rajab. Sha'ban. Then Ramadan."],
        caption: `Rajab 1448 begins this week, by the Umm al-Qura calendar on Thursday 10 December. Your local announcement may differ by a day.

“Of the twelve months, four are sacred.” At-Tawbah 9:36. Rajab is one of them: the Prophet ﷺ named it, the month that comes between Jumada and Sha'ban. Bukhari 4662.

Then Sha'ban. Then Ramadan. About sixty days.

Not a countdown. Start slowly: one name a week, one more page, one more du'a.

Send this to the person you want to be ready for Ramadan with.

${tags("Rajab", "Ramadan2027", "99NamesOfAllah", "IslamicCalendar", "99names")}` }),
      stories: [S.line("19:30", "maghrib", "This week", "Rajab begins<br><em>on Thursday.</em>", "One of the four sacred months. 9:36. By the Umm al-Qura calendar; your local announcement may differ by a day.", { kind: "ring", size: 240 }), S.slider("How ready do you<br><em>feel for Ramadan?</em>") ] },
    { date: "2026-12-10", events: ["1 Rajab 1448"],
      stories: [S.line("07:00", "fajr", "1 Rajab 1448", "Rajab<br><em>Mubarak.</em>", "A sacred month. Do not wrong yourselves in it. 9:36", { kind: "ring", size: 260 })], why: "The first day of Rajab gets a story, not a post: the reel on Wednesday already said it to everyone." },
    { date: "2026-12-11", events: ["Jumu'ah", "First Jumu'ah of Rajab"],
      post: jumuah({ n: 49, day: "11 December", title: "life after death, for the earth and the heart",
        verse: { ar: "ٱعْلَمُوٓا۟ أَنَّ ٱللَّهَ <b>يُحْىِ</b> ٱلْأَرْضَ بَعْدَ مَوْتِهَا", arS: 92, en: "Know that Allah <b>gives life</b> to the earth after its death.", enS: 64, ref: "Al-Hadid · 57:17" },
        thought: "Has the time<br>not come for<br><em>hearts to soften?</em>", td: 88, sub: "The verse before asks it, 57:16. This one answers: dead earth comes back. So can a heart.",
        voc: "يَا بَاعِثُ", vocTr: "Ya Ba'ith",
        why: "The first Jumu'ah of a sacred month, on the two verses that turn Al-Ba'ith from the Day of Judgement into today.",
        caption: `Jumu'ah Mubarak, the first of Rajab. “Know that Allah gives life to the earth after its death.” Al-Hadid 57:17.

The verse before it asks: has the time not come for the hearts of those who believe to soften at the remembrance of Allah? (57:16). Then this, the answer: dead earth comes back.

Al-Ba'ith is this week's name. If He can raise the dead, He can revive your heart. Swipe for the hour on Friday when asking is answered.

Send this to someone whose heart has felt hard lately. Gently.

${tags("JumuahMubarak", "Rajab", "AlBaith", "Quran", "99names")}` }),
      stories: [S.jumuah("", "The first Jumu'ah of Rajab. Ya Ba'ith."), S.hour("Ya Ba'ith")] },
    { date: "2026-12-13",
      post: { at: "16:00", hour: "asr", type: "carousel", title: "Thirteen names in",
        slides: [
          { kind: "c-text", tag: "Since September", disp: "Thirteen names<br><em>since September.</em>", d: 96, obj: { kind: "dots" }, left: "No. 37 to No. 49" },
          { kind: "c-list", tag: "The thirteen", disp: "One a week,<br><em>every Monday.</em>", ns: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49] },
          { kind: "c-text", tag: "Next", disp: "Rajab. Sha'ban.<br><em>Then Ramadan.</em>", d: 88, sub: "Still one a week. Ash-Shahid, The Witness, on Monday. Eighty-six to go, and no hurry.", obj: { kind: "months", rows: [["Rajab", 30, 4], ["Sha'ban", 30, 0], ["Ramadan", 30, 0]] } },
          { kind: "c-end", disp: "Thank you for<br>keeping them<br><em>with us.</em>", sub: "If one of these found you, send it to someone it can find next." },
        ],
        fmt: "A look back is a list, and a list is a carousel. The dots slide shows thirteen of ninety-nine lit, which is the brand's progress device and the most saved picture of the season.",
        why: "The close of the quiet months: what was met, what comes next, and a thank-you that asks for nothing but a send.",
        alt: ["Ninety-nine dots, thirteen lit, with: Thirteen names since September.", "The thirteen names met so far, from No. 37 Al-Kabir to No. 49 Al-Ba'ith, in two columns.", "Three rows of thirty dots labelled Rajab, Sha'ban and Ramadan, with: Still one a week. Ash-Shahid on Monday.", "Thank you for keeping them with us."],
        caption: `Thirteen of the 99 Names of Allah since September.

Al-Kabir, Al-Hafiz, Al-Muqit, Al-Hasib, Al-Jalil, Al-Karim, Ar-Raqib, Al-Mujib, Al-Wasi', Al-Hakim, Al-Wadud, Al-Majid, Al-Ba'ith. One a week, every Monday, at dawn.

Eighty-six to go, and no hurry. Rajab has begun; Sha'ban and Ramadan follow. We'll keep the same pace through all three: one name a week, Ash-Shahid on Monday.

Thank you for keeping them with us. If one of these found you, send it to someone it can find next.

${tags("99NamesOfAllah", "AsmaUlHusna", "Rajab", "الأسماء_الحسنى", "99names")}` },
      stories: [S.line("16:30", "asr", "Thirteen in", "Eighty-six to go,<br><em>and no hurry.</em>", "One a week, still. Ash-Shahid on Monday.", { kind: "dots" }), S.reveal(50, "Monday's")] },
    ],
  };
})();
