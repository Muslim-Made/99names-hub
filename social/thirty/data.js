/* ============================================================
   99NAMES · NOOR · THE FIRST THIRTY · data.js
   The month itself: Monday 14 September to Tuesday 13 October 2026.
   Thirty days, every sheet, every story, every caption. Not
   templates. Finished.

   The month is one day. Five posts at each hour:

     Fajr      1–5    THE BEGINNING     the light, the mark, why 99
     Morning   6–10   HOW IT WORKS      the deck, the practice, the app
     Dhuhr     11–15  KEEP IT NEAR      names for a heavy week, the wall, no streaks
     Asr       16–20  REMEMBER          the quiz, the hours, the pace
     Maghrib   21–25  GIVE IT AWAY      send a name, the envelope, the question
     Isha      26–30  THE PATIENT ONES  the light, As-Salam, after dark, the handoff

   Posted in order, the profile grid reads as one sky: night at the
   top, dawn at the bottom. Name of the week lands every Monday at
   dawn (Tuesday in week one, after the launch) and matches the
   site's rotation: 37 Al-Kabir, 38 Al-Hafiz, 39 Al-Muqit,
   40 Al-Hasib, 41 Al-Jalil. Jumu'ah every Friday at 11:00 WAT,
   before the prayer in Lagos and London. Reels on Wednesdays.

   THE STANDING RULE. Gentle, present tense, no urgency. Nothing
   counts against the reader. Every caption ends with a reason to
   send it to one person, because sends per reach is the signal
   Instagram ranks on in 2026 and because sending a name is the
   product. Five hashtags, never more.
   ============================================================ */
window.THIRTY_FACTS = { url: "99names.net", handle: "@official99names", tagline: "Light, by name.", deck: "$34", card: "$6" };
window.THIRTY_BANDS = [
  { hour: "fajr", name: "The beginning" },
  { hour: "morning", name: "How it works" },
  { hour: "dhuhr", name: "Keep it near" },
  { hour: "asr", name: "Remember" },
  { hour: "maghrib", name: "Give it away" },
  { hour: "isha", name: "The patient ones" },
];

(function () {
  const H = "#99names #AsmaUlHusna #NamesOfAllah #الأسماء_الحسنى #LightByName";
  const HJ = "#JumuahMubarak #99names #AsmaUlHusna #NamesOfAllah #الأسماء_الحسنى";
  const HD = "#99names #AsmaUlHusna #NamesOfAllah #دعاء #الأسماء_الحسنى";
  const NAME = (n, slug) => `#99names #AsmaUlHusna #${slug} #NamesOfAllah #الأسماء_الحسنى`;
  const WEEK = "Read it slowly. Say it once. Keep it near this week.";

  window.THIRTY_DAYS = [

  /* ================================================================ FAJR · THE BEGINNING */
  { n: 1, hour: "fajr", at: "07:00", title: "Light, <em>by name.</em>",
    feed: { kind: "statement", kicker: "A beginning", ring: 220, disp: "Light,<br><em>by name.</em>", d: 150, sub: "The 99 Names of Allah, one a week, dawn to night. Cards you can hold, an app that knows the hour, and a quiet place to remember." },
    stories: [
      { kind: "s-fact", kicker: "New here", ring: 180, disp: "This account is<br>about to get<br><em>very quiet.</em>", d: 92, sub: "One name a week. No streaks, no guilt. Just light." },
      { kind: "s-swipe", kicker: "Where to start", obj: "ring", disp: "Ninety-nine names.<br><em>One at a time.</em>", sub: "The site knows what time it is. Open it at Fajr and see.", cta: "Start at 99names.net" },
    ],
    why: "The first tile is the thesis. A stranger learns what this is in one line, and the ring becomes the avatar they will recognise from here on.",
    caption: `Light, by name.

There are ninety-nine names of Allah, and most of us know a handful. Ar-Rahman. Ar-Rahim. Maybe As-Salam, from the greeting.

This is a place to meet the rest. One name a week, at the pace of a slow year: what it means, where its root goes, one line to carry into your day. Cards you can hold. An app that knows what time it is. Nothing that counts the days you missed.

We start tomorrow with No. 37. Follow along, and send this to the one person you'd like to learn them with.

${H}` },

  { n: 2, hour: "fajr", at: "06:30", title: "Al-Kabir, this week",
    feed: { kind: "card", n: 37, kicker: "This week's name", sub: "Greater than anything. Which is exactly why they say <b>Allahu Akbar.</b>" },
    stories: [
      { kind: "s-name", n: 37, kicker: "This week", cta: "Read it at 99names.net" },
      { kind: "s-poll", kicker: "Be honest", disp: "Do you know<br>this one?", opts: ["I know it", "Meet it"] },
    ],
    why: "The weekly ritual starts on day two so the account has a rhythm before it has a following. Mondays from here.",
    caption: `Al-Kabir. The Most Great. No. 37 of 99.

Say it once and mean it: He is greater. Greater than the thing on your mind right now, greater than the plan that fell through, greater than the version of you that thinks it has to carry all of this.

That is the whole week's assignment. ${WEEK}

Every card in the deck is tinted for its hour of the day. Al-Kabir lives at Dhuhr, full daylight.

Save this for the week. Send it to someone who's carrying too much.

${NAME(37, "AlKabir")}` },

  { n: 3, hour: "fajr", at: "19:00", title: "Count them",
    feed: { kind: "cover", obj: "ring", kicker: "The mark", disp: "Ninety-nine<br><em>rays.</em>", sub: "One for every name. Count them. We'll wait." },
    reel: { len: 12, script: [["0–1s", "One ray on the dawn. Text: Count them."], ["1–9s", "Ninety-nine rays draw in, one per name, while the sky moves from fajr toward morning."], ["9–11s", "The ring completes and breathes once. Nothing in the middle."], ["11–12s", "99names. Light, by name."]] },
    stories: [
      { kind: "s-reel", disp: "The mark has<br>ninety-nine rays.", sub: "One for every name. Twelve seconds, sound on." },
      { kind: "s-fact", kicker: "On purpose", disp: "Nothing in<br>the middle.", d: 104, sub: "The centre is the light. The names are what it throws." },
    ],
    why: "A twelve-second reel with no talking, built to loop. The count is the hook and the mark becomes something people remember.",
    caption: `Our mark has exactly ninety-nine rays. One for every name.

Nothing sits in the middle, on purpose. The centre is the light; the names are what it throws.

Count them. We'll wait.

${H}` },

  { n: 4, hour: "fajr", at: "19:00", title: "Why ninety-nine?",
    feed: { kind: "carousel", slides: [
      { kind: "c-hook", disp: "Why<br>ninety-<br><em>nine?</em>", d: 150, sub: "One hadith, one word inside it, and how to start." },
      { kind: "c-text", disp: "“Allah has ninety-nine names. Whoever preserves them enters Paradise.”", d: 72, sub: "Sahih al-Bukhari 2736 · Sahih Muslim 2677", role: "The hadith" },
      { kind: "c-text", num: "01", disp: "Not memorises.<br><em>Preserves.</em>", sub: "The word is <b>ahsaha</b>: to count, to keep, to live beside. Knowing them is the start, not the finish.", role: "The word" },
      { kind: "c-text", num: "02", disp: "You already<br>know some.", sub: "Ar-Rahman. Ar-Rahim. As-Salam, from the greeting you say every day. Al-Malik. That's four.", role: "The start" },
      { kind: "c-text", num: "03", disp: "One a week is<br><em>under two years.</em>", sub: "Ninety-nine weeks. No streaks, no catching up. Miss one and it waits for you.", role: "The pace" },
      { kind: "c-text", num: "04", disp: "They are for<br><em>calling with.</em>", sub: "“And to Allah belong the best names, so call on Him by them.” Al-A'raf 7:180. A name is a way in.", role: "The point" },
      { kind: "c-end", disp: "Start with one.<br><em>This week's is Al-Kabir.</em>", role: "Save this · send it on" },
    ] },
    stories: [
      { kind: "s-poll", kicker: "Quick one", disp: "How many of the 99<br>could you name<br>right now?", opts: ["Under ten", "More than ten"] },
      { kind: "s-swipe", kicker: "On the feed", obj: "card", n: 37, disp: "Why ninety-nine,<br><em>in six slides.</em>", sub: "The hadith, the word, and how to start.", cta: "Read it" },
    ],
    why: "Carousels earn saves, and Instagram re-serves slide two to anyone who did not swipe. The hadith is the reason the account exists, so it goes first.",
    caption: `Why ninety-nine?

Because of one hadith, and one word inside it. “Allah has ninety-nine names. Whoever preserves them enters Paradise.” (Bukhari, Muslim)

The word is ahsaha. It gets translated as memorise, but it means to count, to keep, to live beside. You don't finish the 99 names. You keep them.

Six slides on what that means and how to start: you already know four, one a week is under two years, and the names are for calling with, not for reciting at.

Save this for the person who says they'll learn them one day. Then send it to them.

${H}` },

  { n: 5, hour: "fajr", at: "11:00", title: "Jumu'ah · the ayah",
    feed: { kind: "ayah", kicker: "Jumu'ah", ar: "وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا", en: "And to Allah belong the best names, <em>so call on Him by them.</em>", ref: "Al-A'raf · 7:180" },
    stories: [
      { kind: "s-fact", kicker: "Friday", disp: "Jumu'ah<br><em>Mubarak.</em>", d: 120, sub: "There's an hour in this day when asking is answered. Ask by His names." },
      { kind: "s-question", kicker: "Today", disp: "Which name are you<br>calling with today?", q: "Tell us the name" },
    ],
    why: "Jumu'ah is the one moment the whole audience shares. Posted before the prayer in Lagos and London, it is the week's most shared tile.",
    caption: `Jumu'ah Mubarak.

“And to Allah belong the best names, so call on Him by them.” Al-A'raf 7:180.

Everything we make starts from this ayah. The names aren't a list to admire. They're the way you address Him: Ya Shafi when you're ill, Ya Fattah when the door won't open, Ya Sabur when you're the one who can't wait.

There's an hour in this day when asking is answered. Ask by name.

Send this to someone you're praying for.

${HJ}` },

  /* ================================================================ MORNING · HOW IT WORKS */
  { n: 6, hour: "morning", at: "11:00", title: "The deck",
    feed: { kind: "fan", ns: [1, 47, 99], h: 700, kicker: "The Deck · $34", disp: "Ninety-nine cards,<br><em>dawn to night.</em>", sub: "Cards 1 to 33 are dawn, 34 to 66 day, 67 to 99 night. Fan the deck in order and it's one sky." },
    stories: [
      { kind: "s-swipe", kicker: "The deck", obj: "card", n: 47, disp: "Soft-touch.<br><em>Ships worldwide.</em>", sub: "Ninety-nine cards, $34.", cta: "Shop at 99names.net" },
      { kind: "s-poll", kicker: "Pick one", disp: "Which card would you<br>keep on your desk?", opts: ["A dawn one", "A night one"] },
    ],
    why: "The object post, on a Saturday, when people shop. The first commercial tile arrives after five days of giving.",
    caption: `Ninety-nine cards, dawn to night.

The deck: every name on its own soft-touch card, numbered, rooted, and tinted for its hour of the day. Cards 1 to 33 are dawn, 34 to 66 are daylight, 67 to 99 are night. Fan it in order across a table and it's one gradient.

Keep one out where you'll actually see it. Swap it on Monday. That's the whole practice.

$34, ships worldwide. Link in bio.

${H}` },

  { n: 7, hour: "morning", at: "11:00", title: "How it works",
    feed: { kind: "steps", kicker: "The practice", disp: "Three steps.<br><em>Ninety-nine times, gently.</em>", d: 70, steps: [["1", "Meet <em>one.</em>", "Read it slowly. Say it once out loud. That's the whole assignment."], ["2", "Keep it <em>near.</em>", "A card on the desk, the app at the hour, one line you carry."], ["3", "Send it <em>on.</em>", "Someone you love is having a week. Pick the name they need."]] },
    stories: [
      { kind: "s-fact", kicker: "The practice", disp: "Meet one.<br>Keep it near.<br><em>Send it on.</em>", d: 96, sub: "That's it. Ninety-nine times, gently." },
      { kind: "s-quiz", n: 37, kicker: "This week's", opts: ["The Most Great", "The Preserver", "The Sustainer"], ok: 0, sticker: true, sub: "Tap the one you think. Wrong answers just show you the name again." },
    ],
    why: "The operating manual in one tile. Everything the account will ask of a follower, said once.",
    caption: `How it works, in three steps.

1. Meet one. Read it slowly, say it once out loud. That's the whole assignment for the week.
2. Keep it near. A card on the desk. The app, which shows you the name at the hour you open it. One line you carry.
3. Send it on. Someone you love is having a week. Pick the name they need and send it, as a link tonight or a real card in the post.

Then do it again next Monday. Ninety-nine times, gently.

Save this so you have the practice. Send it to whoever is starting with you.

${H}` },

  { n: 8, hour: "morning", at: "06:30", title: "Al-Hafiz, this week",
    feed: { kind: "name", n: 38, kicker: "This week" },
    stories: [
      { kind: "s-name", n: 38, kicker: "This week", cta: "Read it at 99names.net" },
      { kind: "s-breath", n: 38, kicker: "One breath", disp: "Breathe in.<br><em>Breathe out.</em>", sub: "Everything that's kept safe is kept safe by Him. Say it once." },
    ],
    caption: `Al-Hafiz. The Preserver. No. 38 of 99.

Everything that's kept safe is kept safe by Him. The child asleep in the next room. The thing you forgot to lock. The part of you that survived the year you don't talk about.

You were never the one holding it all together. That's the relief in this name.

${WEEK}

Send Al-Hafiz to someone who's been trying to protect everyone.

${NAME(38, "AlHafiz")}` },

  { n: 9, hour: "morning", at: "19:00", title: "The app",
    feed: { kind: "phone", n: 38, time: "Morning · 07:40", week: 12, greet: "Good morning,<br><em>Amaar.</em>", tab: 0, kicker: "The app", disp: "It knows<br>what time<br><em>it is.</em>", d: 84, sub: "Open it at Fajr, it's blush. At Isha, navy. One name, one breath, no red badge." },
    stories: [
      { kind: "s-swipe", kicker: "The app", obj: "phone", ph: { n: 38, time: "Isha · 21:10", week: 12, greet: "Good night,<br><em>Amaar.</em>", screen: "isha", tab: 0, breath: true }, disp: "The same app<br><em>after dark.</em>", d: 72, sub: "Navy, never black. The name, then a breath.", cta: "99names.net" },
      { kind: "s-poll", kicker: "Honest answer", disp: "When do you open<br>your phone first?", opts: ["Before Fajr", "After"] },
    ],
    why: "The hour-tinted screen is the idea nobody else in the category has. Shown, not described. The app is not in the stores yet, so the caption says so and points to the site.",
    caption: `The app knows what time it is, so you don't have to.

Open it at Fajr and it's blush. At Dhuhr, sand. At Maghrib, ember. At Isha, navy, never black. It shows you one name, the one for this week, and offers you a breath. That's the screen.

No red badges. No streak to protect. Nothing that counts against you.

The app is on its way to iOS and Android; the website already does everything it does, at any hour. Link in bio.

#99names #AsmaUlHusna #NamesOfAllah #MuslimApp #الأسماء_الحسنى` },

  { n: 10, hour: "morning", at: "19:00", title: "Breathe with a name",
    feed: { kind: "cover", obj: "breath", kicker: "Reel", disp: "Breathe in.<br><em>Breathe out.</em>", sub: "Twelve seconds with Al-Hafiz." },
    reel: { len: 12, script: [["0–1s", "The dot, still, on the morning. Text: Breathe in."], ["1–5s", "The dot swells for four seconds. Al-Hafiz rises beneath it."], ["5–9s", "The dot settles for four. Text: Everything that's kept safe is kept safe by Him."], ["9–12s", "A shorter breath. 99names."]] },
    stories: [
      { kind: "s-reel", disp: "Four seconds in,<br>four seconds out.", sub: "A breath with this week's name. Sound on." },
      { kind: "s-breath", n: 38, kicker: "Once more", disp: "Once more,<br><em>slowly.</em>" },
    ],
    why: "Watch time is the other signal. A breath is the one reel people watch twice, and it needs no footage.",
    caption: `Breathe in for four. Out for four. That's the whole reel.

Al-Hafiz, the Preserver, sits under the breath this week. Everything that's kept safe is kept safe by Him. Say it on the exhale.

Watch it once. Then put the phone down.

#99names #AsmaUlHusna #AlHafiz #Breathe #الأسماء_الحسنى` },

  /* ================================================================ DHUHR · KEEP IT NEAR */
  { n: 11, hour: "dhuhr", at: "19:00", title: "Five names for a heavy week",
    feed: { kind: "carousel", slides: [
      { kind: "c-hook", disp: "Five names<br>for a<br><em>heavy week.</em>", d: 128, sub: "Save it. You'll need one of these." },
      { kind: "c-name", n: 9, num: "01", role: "For the one who's been broken" },
      { kind: "c-name", n: 5, num: "02", role: "For the one who can't settle" },
      { kind: "c-name", n: 47, num: "03", role: "For the one who feels unlovable" },
      { kind: "c-name", n: 30, num: "04", role: "For the one who can't see the point yet" },
      { kind: "c-name", n: 99, num: "05", role: "For the one who can't wait" },
      { kind: "c-end", disp: "Send this to<br>the one having<br><em>the week.</em>", role: "Save this · send it on" },
    ] },
    stories: [
      { kind: "s-poll", kicker: "This week", disp: "Which one is yours<br>this week?", opts: ["Al-Jabbar", "As-Sabur"] },
      { kind: "s-swipe", kicker: "On the feed", obj: "card", n: 9, disp: "Five names for<br><em>a heavy week.</em>", sub: "Save it for the next one.", cta: "See the five" },
    ],
    why: "The month's most sendable post. Reference content earns saves. A name chosen for one person earns the send.",
    caption: `Five names for a heavy week. Save this; you'll need one of them.

1. Al-Jabbar, the Restorer. The same hand that can break anything is the one that mends you.
2. As-Salam, the Source of Peace. Peace isn't found. It's given.
3. Al-Wadud, the Most Loving. He loves you in the mess, not after it.
4. Al-Latif, the Subtle and Kind. Some of His kindness you'll only recognise in hindsight.
5. As-Sabur, the Infinitely Patient. He has never once rushed you.

You don't need all five. You need the one that's yours this week. Say it on the way home.

Send this to the one who's having the week. They'll know why.

${HD}` },

  { n: 12, hour: "dhuhr", at: "11:00", title: "Jumu'ah · ask by name",
    feed: { kind: "statement", kicker: "Jumu'ah", disp: "Ask by<br><em>His names.</em>", d: 140, sub: "Ya Fattah when the door won't open. Ya Shafi when you're ill. Ya Sabur when you're the one who can't wait.", subw: 800 },
    stories: [
      { kind: "s-fact", kicker: "Friday", disp: "Jumu'ah<br><em>Mubarak.</em>", d: 120, sub: "Say the name before the ask." },
      { kind: "s-question", kicker: "Quietly", disp: "One thing you're<br>asking for today?", q: "You can say it here, quietly" },
    ],
    caption: `Jumu'ah Mubarak. Ask by His names.

Ya Fattah, when the door won't open.
Ya Razzaq, when the month is longer than the money.
Ya Shafi, for the one who's ill.
Ya Sabur, when you're the one who can't wait.

A name before the ask is a way in. It's how the du'a of the Prophets reads, and how ours can.

There's an hour in this day when asking is answered. Send this to someone who has something to ask.

#JumuahMubarak #99names #AsmaUlHusna #دعاء #الأسماء_الحسنى` },

  { n: 13, hour: "dhuhr", at: "11:00", title: "All ninety-nine",
    feed: { kind: "wall", kicker: "The wall", on: [37, 38], disp: "How many can you name<br><em>without looking?</em>", d: 58 },
    stories: [
      { kind: "s-fact", kicker: "The wall", disp: "All ninety-nine,<br><em>one wall.</em>", d: 100, sub: "Zoom in on the post. Count the ones you know." },
      { kind: "s-quiz", n: 5, kicker: "Quick check", opts: ["The Source of Peace", "The Light", "The Guide"], ok: 0, sticker: true, sub: "You say this one every day." },
    ],
    why: "A save-and-screenshot tile. The two gold names are the month so far; the wall fills one a week.",
    caption: `All ninety-nine, on one wall.

Zoom in. How many can you name without looking? Most people land somewhere between four and twelve, and that's a perfectly good place to start from.

The two in gold are this month's so far: Al-Kabir and Al-Hafiz. The wall fills one a week.

Save this as your checklist. Screenshot it and mark the ones you know.

${H}` },

  { n: 14, hour: "dhuhr", at: "11:00", title: "No streaks",
    feed: { kind: "statement", kicker: "The standing rule", disp: "Miss a day.<br><em>Nothing breaks.</em>", d: 132, sub: "No flame icon, no guilt loop. The name is still there, still patient, like the One it points to." },
    stories: [
      { kind: "s-fact", kicker: "The rule", disp: "No streaks.<br><em>No guilt.</em>", d: 112, sub: "Come back whenever. The name waits." },
      { kind: "s-poll", kicker: "Be honest", disp: "Has an app ever made<br>you feel guilty<br>for resting?", opts: ["Yes", "Every one"] },
    ],
    why: "The counter-position to every habit app. It is the line people quote back, and the one that gets screenshotted.",
    caption: `Miss a day. Nothing breaks.

There's no flame icon here. No streak to protect, no red badge, no “you've lost your progress.” We built the whole thing so that resting isn't a failure state.

Miss a week and next Monday's name is still there, still patient. Which is the point: it's a name of the One who has never once rushed you.

Send this to the friend who deletes apps for making them feel bad.

${H}` },

  { n: 15, hour: "dhuhr", at: "06:30", title: "Al-Muqit, this week",
    feed: { kind: "card", n: 39, kicker: "This week's name", tilt: -3, sub: "You'll have enough for today. <b>That was the deal.</b>" },
    stories: [
      { kind: "s-name", n: 39, kicker: "This week", cta: "Read it at 99names.net" },
      { kind: "s-poll", kicker: "Today", disp: "Enough for today?", opts: ["Yes, alhamdulillah", "Working on it"] },
    ],
    caption: `Al-Muqit. The Sustainer. No. 39 of 99.

You'll have enough for today. That was the deal. Not for the year, not for the plan, not for the version of the future you rehearse at 2am. For today.

The Nourisher who gives every creature its portion. Yours is coming too.

${WEEK}

Send Al-Muqit to someone who's worried about the month.

${NAME(39, "AlMuqit")}` },

  /* ================================================================ ASR · REMEMBER */
  { n: 16, hour: "asr", at: "19:00", title: "Remember",
    feed: { kind: "quiz", n: 38, kicker: "Remember · quick check", opts: ["The Preserver", "The Sustainer", "The Opener"], ok: 0, sub: "Wrong answers just show you the name again, warmly." },
    stories: [
      { kind: "s-quiz", n: 39, kicker: "One more", opts: ["The Reckoner", "The Sustainer", "The Majestic"], ok: 1, sticker: true },
      { kind: "s-swipe", kicker: "The quiz", obj: "ring", disp: "Ten questions,<br><em>no shame.</em>", sub: "Nine levels, a certificate at each, a gold one at 99.", cta: "Try a round" },
    ],
    why: "The first ask to remember. It sends people to the quiz on the site, which is the retention loop.",
    caption: `Quick check, no shame. Which name is this?

It's Al-Hafiz, the Preserver, from last week. If you got it, you've kept it. If you didn't, you've just met it twice, which is how keeping works.

The quiz on the site runs in nine levels of eleven names. Two right answers in two different ways and a name is yours. Miss one and it simply comes back. There's a certificate at each level and a gold one at 99.

Link in bio. Send this to your study partner.

${H}` },

  { n: 17, hour: "asr", at: "19:00", title: "Dawn to night",
    feed: { kind: "cover", obj: "bands", kicker: "Reel", disp: "A day, in<br><em>twelve seconds.</em>", d: 80, sub: "Six hours, six names." },
    reel: { len: 13, script: [["0–1s", "Fajr. Rose into blue. Text: Your day already has a shape."], ["1–11s", "The sky moves through morning, dhuhr, asr, maghrib and isha, two seconds each. The name that opens each hour surfaces and fades."], ["11–13s", "Night. Ninety-nine rays settle. 99names."]] },
    stories: [
      { kind: "s-reel", disp: "The 99, in the<br>order of a day.", sub: "Fajr to Isha in twelve seconds. Sound on." },
      { kind: "s-poll", kicker: "Yours", disp: "Your hour?", opts: ["Fajr", "Isha"] },
    ],
    caption: `Your day already has a shape. The names just light it.

The ninety-nine run in order through the day. Ar-Rahman opens Fajr. Al-Fattah opens the morning. Ash-Shakur at Dhuhr, Al-Haqq at Asr, Al-Ahad at Maghrib, Ar-Ra'uf at Isha. As-Sabur closes the night.

Twelve seconds, six hours, six names. Sound on.

${H}` },

  { n: 18, hour: "asr", at: "19:00", title: "The hours",
    feed: { kind: "carousel", slides: [
      { kind: "c-hook", disp: "Which hour<br>is your<br><em>name in?</em>", d: 128, sub: "The 99, in the order of a day." },
      { kind: "c-hour", hour: "fajr", role: "Names 1 to 17" },
      { kind: "c-hour", hour: "morning", role: "Names 18 to 34" },
      { kind: "c-hour", hour: "dhuhr", role: "Names 35 to 50" },
      { kind: "c-hour", hour: "asr", role: "Names 51 to 66" },
      { kind: "c-hour", hour: "maghrib", role: "Names 67 to 82" },
      { kind: "c-hour", hour: "isha", role: "Names 83 to 99" },
      { kind: "c-end", disp: "Find yours.<br><em>Say it at its hour.</em>", role: "Save this · the map of the deck" },
    ] },
    stories: [
      { kind: "s-fact", kicker: "On the feed", disp: "Six hours.<br><em>Ninety-nine names.</em>", d: 96, sub: "Which hour is yours in? The carousel is up." },
      { kind: "s-question", kicker: "Tell us", disp: "Which hour do you<br>feel most yourself?", q: "Fajr, Dhuhr, Maghrib…" },
    ],
    why: "The carousel that carries the brand's one idea: the day has a shape and the names follow it. Each slide is its own hour, so the swipe itself moves through the day.",
    caption: `Which hour is your name in?

The ninety-nine run through the day in order, seventeen or so to each hour. Names 1 to 17 belong to Fajr, 18 to 34 to the morning, 35 to 50 to Dhuhr, 51 to 66 to Asr, 67 to 82 to Maghrib and 83 to 99 to the night.

Eight slides: each hour, the name that opens it, and one line for it. Find yours. Say it at its hour.

Save this; it's the map of the deck.

${H}` },

  { n: 19, hour: "asr", at: "11:00", title: "Jumu'ah · Al-Fattah",
    feed: { kind: "quote", n: 18, kicker: "Jumu'ah", d: 104 },
    stories: [
      { kind: "s-fact", kicker: "Friday", disp: "Jumu'ah<br><em>Mubarak.</em>", d: 120, sub: "Ya Fattah. For the door that won't open." },
      { kind: "s-question", kicker: "This week", disp: "What's the door<br>this week?", q: "Say it here, or just to Him" },
    ],
    caption: `Jumu'ah Mubarak. Closed doors are His specialty.

Al-Fattah, the Opener. The One who opens closed doors, hearts and matters, and judges between people with truth.

If there's a door this week, the job, the visa, the conversation you keep not having, this is the name for the hour that's answered.

Ya Fattah. Send it to someone waiting on a door.

#JumuahMubarak #99names #AsmaUlHusna #AlFattah #الأسماء_الحسنى` },

  { n: 20, hour: "asr", at: "11:00", title: "Under two years",
    feed: { kind: "dots", kicker: "The pace", on: 3, disp: "Three down.<br><em>Ninety-six to go.</em>", d: 84, sub: "At one a week you know all ninety-nine in under two years. Slower is fine. This was never a race." },
    stories: [
      { kind: "s-fact", kicker: "Three weeks", disp: "Three names in.<br><em>Ninety-six to go.</em>", d: 92, sub: "No hurry. The grid fills at your pace." },
      { kind: "s-poll", kicker: "Honest", disp: "Have you kept<br>all three?", opts: ["All three", "Getting there"] },
    ],
    why: "The 99-dot grid from the second direction, kept as the progress device. Three dots lit says the account keeps its own promise.",
    caption: `Three names in. Ninety-six to go.

Al-Kabir, Al-Hafiz, Al-Muqit. Three weeks, three dots. At one a week you'll know all ninety-nine in a little under two years, which sounds long until you remember how fast the last two went.

Slower is fine. This was never a race. The grid fills at whatever pace you keep.

Save this and come back to it at 33.

${H}` },

  /* ================================================================ MAGHRIB · GIVE IT AWAY */
  { n: 21, hour: "maghrib", at: "11:00", title: "Send a name",
    feed: { kind: "env", n: 9, to: "Nayla", state: "open", kicker: "Send a name · $6", disp: "Somebody you love<br>is having <em>a week.</em>", d: 70, sub: "Pick the name they need. Write who it's for. We post the card." },
    stories: [
      { kind: "s-swipe", kicker: "Send a name", obj: "env", n: 9, to: "Nayla", disp: "A real card,<br><em>in the post.</em>", sub: "From you, to whoever needs it. $6, worldwide.", cta: "Send one" },
      { kind: "s-question", kicker: "This week", disp: "Who needs a name<br>this week?", q: "Just their first name" },
    ],
    why: "The growth product, introduced in the giving band. Each card sent is a new person meeting the names.",
    caption: `Somebody you love is having a week.

Send them a name. Pick the one they need, Al-Jabbar for the one who's been broken, As-Salam for the one who can't settle, write who it's for, and we post a real card to their door. $6, worldwide. Or send it free as a link tonight and they open an envelope on their phone.

It's the smallest thing we make and the one that gets the names into homes.

The link is in bio. Send this to the person who'd send one back.

#99names #SendAName #AsmaUlHusna #NamesOfAllah #الأسماء_الحسنى` },

  { n: 22, hour: "maghrib", at: "06:30", title: "Al-Hasib, this week",
    feed: { kind: "name", n: 40, kicker: "This week" },
    stories: [
      { kind: "s-name", n: 40, kicker: "This week", cta: "Read it at 99names.net" },
      { kind: "s-breath", n: 40, kicker: "Say it", disp: "Hasbunallah.", d: 110, sub: "He is enough. Say it when nothing else is." },
    ],
    caption: `Al-Hasib. The Reckoner, and the One who is enough. No. 40 of 99.

Hasbunallah wa ni'mal wakil. He is enough for us, and the best one to trust with it. Say it when nothing else is.

The same name holds both meanings: the One who takes account of everything, and the One who is sufficient. You are counted. You are also covered.

${WEEK}

Send Al-Hasib to someone who feels like it's all on them.

${NAME(40, "AlHasib")}` },

  { n: 23, hour: "maghrib", at: "19:00", title: "Which name do you return to?",
    feed: { kind: "question", kicker: "Tell us", disp: "Which name<br>do you<br><em>return to?</em>", d: 108, sub: "The one you reach for when the day gets heavy." },
    stories: [
      { kind: "s-question", kicker: "Tell us", disp: "Which name do you<br>return to?", q: "Someone in the comments needs your answer" },
      { kind: "s-fact", kicker: "Ours", disp: "Ours, this week:<br><em>As-Sabur.</em>", d: 100, sub: "He has never once rushed you." },
    ],
    why: "Comments are the third signal after sends and saves. A question with a real use for the answers gets real replies; the answers become next month's carousel.",
    caption: `Which name do you return to?

Not the one you know best. The one you reach for when the day gets heavy, the one that comes out before you've decided to say it.

Tell us below. Someone reading the comments needs exactly your answer, and we'll build a post around the ones that come up most.

${HD}` },

  { n: 24, hour: "maghrib", at: "19:00", title: "The envelope",
    feed: { kind: "cover", obj: "env", n: 9, to: "Nayla", kicker: "Reel", disp: "For whoever<br><em>needs it.</em>", sub: "An envelope, a card, a name." },
    reel: { len: 12, script: [["0–1s", "A sealed envelope on the ember sky. Text: For Nayla."], ["1–5s", "The flap lifts. The card rises: Al-Jabbar, the Restorer."], ["5–10s", "The line: The same hand that can break anything is the one that mends you."], ["10–12s", "Send a name. 99names.net."]] },
    stories: [
      { kind: "s-reel", disp: "Open it.", d: 130, sub: "Twelve seconds, one envelope. Sound on." },
      { kind: "s-swipe", kicker: "Hint", obj: "env", n: 5, to: "you", state: "closed", disp: "Someone could<br><em>send you one.</em>", sub: "Share this to your story so they know.", cta: "Send a name" },
    ],
    caption: `For Nayla. From Amaar. Al-Jabbar, the Restorer.

This is what arrives when someone sends you a name: an envelope, a card tinted for its hour, and one line to keep. The same hand that can break anything is the one that mends you.

Twelve seconds. Then go send one.

#99names #SendAName #AsmaUlHusna #AlJabbar #الأسماء_الحسنى` },

  { n: 25, hour: "maghrib", at: "19:00", title: "How to send a name",
    feed: { kind: "carousel", slides: [
      { kind: "c-hook", disp: "How to send<br>a name in<br><em>four steps.</em>", d: 118, sub: "A real card, from you, to their door." },
      { kind: "c-text", num: "01", disp: "Pick the<br><em>name they need.</em>", sub: "Five suggestions for the mood, or search all ninety-nine.", role: "Choose" },
      { kind: "c-text", num: "02", disp: "Write<br><em>who it's for.</em>", sub: "To, from, and a note of up to 240 characters. Or nothing at all; the name says enough.", role: "Write" },
      { kind: "c-card", n: 9, tag: "03", disp: "We print it and <em>post it.</em>", d: 58, role: "$6 · worldwide" },
      { kind: "c-env", n: 9, to: "Nayla", state: "closed", tag: "04", disp: "They open <em>an envelope.</em>", d: 58, role: "Arrives" },
      { kind: "c-text", disp: "Or send it free tonight,<br><em>as a link.</em>", d: 72, sub: "Same envelope, on their phone. No address? The card can ask them for it from inside.", role: "Free · now" },
      { kind: "c-end", disp: "Send one<br><em>tonight.</em>", role: "99names.net/send" },
    ] },
    stories: [
      { kind: "s-fact", kicker: "On the feed", disp: "Four steps.<br><em>One envelope.</em>", d: 100, sub: "How to send a name. The carousel is up." },
      { kind: "s-poll", kicker: "Tonight?", disp: "Send one tonight?", opts: ["Tonight", "This weekend"] },
    ],
    caption: `How to send a name, in four steps.

1. Pick the name they need. Five suggestions for the mood, or search all ninety-nine.
2. Write who it's for. To, from, a note if you want one.
3. We print it and post it. $6, anywhere in the world.
4. They open an envelope.

No address? Send it free as a link tonight; they open the same envelope on their phone, and the card can ask them for their address from inside.

Save this for the next birthday, the next hard week, the next time you don't know what to say.

#99names #SendAName #AsmaUlHusna #NamesOfAllah #الأسماء_الحسنى` },

  /* ================================================================ ISHA · THE PATIENT ONES */
  { n: 26, hour: "isha", at: "11:00", title: "Jumu'ah · the Light",
    feed: { kind: "ayah", kicker: "Jumu'ah", ar: "ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ", en: "Allah is the Light of the heavens <em>and the earth.</em>", ref: "An-Nur · 24:35" },
    stories: [
      { kind: "s-fact", kicker: "Friday", disp: "Jumu'ah<br><em>Mubarak.</em>", d: 120, sub: "An-Nur. The Light. The name we're named after." },
      { kind: "s-question", kicker: "This week", disp: "Who lit the way<br>for you this week?", q: "Make du'a for them here" },
    ],
    caption: `Jumu'ah Mubarak. Allah is the Light of the heavens and the earth. An-Nur, 24:35.

An-Nur, the Light, is No. 93 and the name this whole place is named after. The Light by which all things are seen and guided. Light, by name.

There's an hour in this day when asking is answered. Ask for light.

Send this to whoever lit the way for you this week.

#JumuahMubarak #99names #AsmaUlHusna #AnNur #الأسماء_الحسنى` },

  { n: 27, hour: "isha", at: "11:00", title: "As-Salam, for the heavy days",
    feed: { kind: "card", n: 5, kicker: "World Mental Health Day", sub: "Peace isn't found. It's given. <b>For the heavy days, and the people in them.</b>" },
    stories: [
      { kind: "s-name", n: 5, kicker: "Today", sub: "Peace isn't found. It's given.", cta: "Send As-Salam to someone" },
      { kind: "s-question", kicker: "Today", disp: "Check on someone<br>today. Who?", q: "Their name, quietly" },
    ],
    why: "The one calendar moment in the window that fits the voice. As-Salam is the name most people send.",
    caption: `Peace isn't found. It's given.

As-Salam, the Source of Peace. No. 5 of 99. Today is World Mental Health Day, and this is the name for it: not a peace you have to go and earn, but one that is given, by the One who is Peace itself.

If the days have been heavy, this one is yours. If you know someone whose days have been heavy, send it to them tonight, as a link or a card. Check on them while you're there.

You are not a burden. You are counted, and covered.

#99names #AsSalam #WorldMentalHealthDay #AsmaUlHusna #الأسماء_الحسنى` },

  { n: 28, hour: "isha", at: "19:00", title: "After dark",
    feed: { kind: "phone", n: 99, time: "Isha · 21:40", week: 13, greet: "Good night,<br><em>Amaar.</em>", screen: "isha", breath: true, tab: 0, kicker: "The app · after dark", disp: "Navy,<br><em>never black.</em>", d: 84, sub: "The last screen of the day: one name, one breath, and it lets you go." },
    stories: [
      { kind: "s-breath", n: 99, kicker: "Before sleep", disp: "One breath<br><em>before sleep.</em>", sub: "He has never once rushed you." },
      { kind: "s-swipe", kicker: "After dark", obj: "phone", ph: { n: 99, time: "Isha · 21:40", week: 13, greet: "Good night,<br><em>Amaar.</em>", screen: "isha", tab: 0, breath: true }, disp: "The night<br><em>screen.</em>", d: 72, sub: "The app is on its way. The site already knows the hour.", cta: "99names.net" },
    ],
    caption: `Navy, never black.

After Maghrib the whole thing goes night: the site, the app, the cards from 67 to 99. The last screen of the day shows one name, offers one breath, and then lets you go. No “one more.” No badge in the morning.

Tonight's is As-Sabur. He has never once rushed you.

Send this to the friend who reads in bed.

${H}` },

  { n: 29, hour: "isha", at: "06:30", title: "Al-Jalil, this week",
    feed: { kind: "card", n: 41, kicker: "This week's name", tilt: 3, sub: "Majesty is <b>His default setting.</b>" },
    stories: [
      { kind: "s-name", n: 41, kicker: "This week", cta: "Read it at 99names.net" },
      { kind: "s-poll", kicker: "Five in", disp: "Five names in.<br>Still with us?", opts: ["Every week", "Catching up, no guilt"] },
    ],
    caption: `Al-Jalil. The Majestic. No. 41 of 99.

Majesty is His default setting. Not a mood, not an occasion. Sublime in every attribute, beyond every description you'll try.

This is the fifth name of the month, which means five cards, five dots on the grid, and one habit that's quietly taken. ${WEEK}

Send Al-Jalil to someone who needs reminding how big He is.

${NAME(41, "AlJalil")}` },

  { n: 30, hour: "isha", at: "19:00", title: "From here, one a week",
    feed: { kind: "statement", kicker: "Day thirty", ring: 200, disp: "From here,<br><em>one a week.</em>", d: 128, sub: "A new name every Monday at dawn. A reel on Wednesday. Jumu'ah on Friday. On Sunday, five names to send." },
    stories: [
      { kind: "s-fact", kicker: "Thank you", disp: "Thirty days.<br><em>Five names.</em>", d: 110, sub: "Thank you for being here for the first month." },
      { kind: "s-swipe", kicker: "From here", obj: "ring", disp: "The week,<br><em>from here.</em>", sub: "Monday: the name. Wednesday: a reel. Friday: Jumu'ah. Sunday: a set to send.", cta: "99names.net" },
    ],
    why: "The handoff. It tells the follower what to expect and hands the account to the quiet months (../quiet/): four posts a week from 14 October.",
    caption: `Thirty days. Five names. One sky.

Scroll back down our grid and it dawns: isha at the top, fajr at the bottom, five posts at every hour. That was the first month, and it's the last time we'll post every day.

From here, four a week: a new name every Monday at dawn, a reel on Wednesday evening, Jumu'ah on Friday, and on Sunday a set of names to send to someone. Everything else is quiet on purpose.

Thank you for being here for the first thirty. If one of these names found you, send it to someone it can find next.

${H}` },
  ];
})();
