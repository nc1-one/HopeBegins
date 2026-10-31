# Writing HopeBegins in French, German, Spanish and Korean

HopeBegins is free, faith-driven (Christian, evangelical-leaning) mental health support. It started for Filipinos and now also speaks French (`fr`), German (`de`), Spanish (`es`) and Korean (`ko`), beside English (`en`) and Taglish (`tl`). This guide is for anyone writing or reviewing those four languages, people or AI.

Write like a native speaker who works in youth mental health and goes to church: warm, plain, short sentences, never clinical jargon, never preachy. Translate the meaning and the feeling, not the words. If an English line would sound odd translated literally, rewrite it the way a native speaker would say it.

## Faith and sources (the founder's rules)

1. **Evangelical Christian stance.** Prayer is to God through Jesus; Jesus is Saviour; the Bible is God's Word. Never prayer to or through saints, Mary or angels; never "the universe", destiny, karma, energy or New Age language; never prosperity-gospel promises. Churches in stories are Protestant or evangelical (église évangélique, Freikirche or evangelische Gemeinde, iglesia cristiana evangélica, 교회), never a Catholic parish, Mass or rosary. Korean: 하나님, never 하느님.
2. **Faith goes with care, never instead of it.** Never say prayer, faith or Bible reading replaces a doctor, counsellor, medicine or a crisis line. Never suggest anxiety, depression or suicidal thoughts come from weak faith, sin or a spiritual attack, or that someone should "just pray more". When the English quotes a line like that as something not to say, keep it clearly framed as unhelpful.
3. **Bible translations are Protestant and public domain**, the ones evangelical churches read: Louis Segond 1910 (fr), Luther 1912 (de), Reina-Valera 1909 (es), 개역한글 (ko). Verses come only from `src/lib/blog/verses.ts`. Segond and Luther count some psalm titles as verse 1, so their psalm numbers can be one higher than the English: take references from VERSES.
4. **Only official, legitimate references.** Crisis numbers only as listed in this guide and `src/lib/helplines.ts`, each checked against the service's own official page or a health ministry's. Sources only from official bodies (WHO, national health services, the line operators' own sites). Never link to blogs, commercial therapy or wellness apps, forums or religious organisations. If you are unsure whether something is official, leave it out.

## Who reads it

- **French**: France first (also Belgium, Switzerland, Québec). Standard French, not regional slang.
- **German**: Germany first (also Austria, Switzerland). Standard German.
- **Spanish**: neutral **Latin American** Spanish: tú (never vos), ustedes (never vosotros), vocabulary that works from Mexico to Argentina. Avoid words that are rude or odd in some countries (e.g. "coger"); "celular", not "móvil".
- **Korean**: South Korea. Standard Korean.

## Voice

- **Informal and warm**: French *tu*, German *du* (lowercase), Spanish *tú*, Korean **해요체** (polite casual: -아요/-어요). Never 합니다체, vous, Sie or usted, even on the privacy page.
- Talk to one person. Short sentences. Active verbs.
- Gender: don't make the reader's gender matter. Rephrase instead of using gendered adjectives about the reader (French "Tu te sens seul ?" → "La solitude te pèse ?"; Spanish "¿Te sientes solo?" → "¿Te sientes en soledad?" or "¿Sientes que no tienes a nadie?"). No gender star, colon or point médian. Korean has no issue.
- Faith: Christian and warm, not churchy. Prayer is offered, never pushed. Korean Protestant usage: **하나님**, never 하느님. No Catholic-only imagery or words (rosary, saints, Mary, novena).

## Rules from the founder (all languages)

1. **No dashes**: never an em dash (—) or en dash (–). Use a comma, colon, full stop or brackets. A hyphen inside a word is fine (French "peut-être", German "Check-in", Korean ranges like 6-7).
2. **Banned phrases**, and their equivalents in every language:
   - "you're not alone": fr *tu n'es pas seul(e)*, de *du bist nicht allein*, es *no estás solo/sola*, ko *혼자가 아니에요*
   - "it's okay to not be okay": fr *ce n'est pas grave de ne pas aller bien*, de *es ist okay, nicht okay zu sein*, es *está bien no estar bien*, ko *괜찮지 않아도 괜찮아요*
   - "you don't have to": fr *tu n'as pas à / tu n'es pas obligé(e)*, de *du musst nicht*, es *no tienes que*, ko *~하지 않아도 돼요*. Say what they **can** do instead.
3. **No "not X but Y"** constructions: fr *ce n'est pas X, c'est Y*, de *nicht X, sondern Y*, es *no es X, sino Y*, ko *X가 아니라 Y*.
4. **Banned words**: journey (fr *voyage, parcours*; de *Reise*; es *viaje, travesía*; ko *여정*), transform (*transformer, verwandeln, transformar, 변화시키다*), empower (*autonomiser, empowern, empoderar, 역량 강화*), safe space (*espace sûr, Safe Space / geschützter Raum, espacio seguro, 안전한 공간*), deeply (*profondément, zutiefst, profundamente, 깊이*).
5. No emojis. No exclamation marks unless the English has one.
6. Crisis wording follows WHO safe-messaging guidance: name it plainly, never mention a method, always pair it with hope and a number.

## Fixed names and lines

Keep as written: **HopeBegins**, **Hope AI**, **Hope Carrier** (a volunteer who prays for you), **Daily Hope**, **HopeCasts**, **Prayer War Room**.

| English | fr | de | es | ko |
|---|---|---|---|---|
| Not okay today? | Ça ne va pas aujourd'hui ? | Heute nicht okay? | ¿No estás bien hoy? | 오늘 괜찮지 않나요? |
| That's me (button) | C'est moi | Das bin ich | Así me siento | 제 얘기예요 |
| I Want Someone to Journey With Me | Je veux quelqu'un pour m'accompagner | Ich möchte, dass mich jemand begleitet | Quiero que alguien me acompañe | 누군가 곁에 있어 주면 좋겠어요 |
| Stories of Hope (the blog) | Histoires d'espoir | Geschichten der Hoffnung | Historias de esperanza | 희망 이야기 |
| Daily check-in | Bilan du jour | Täglicher Check-in | Check-in diario | 오늘의 체크인 |
| Tools | Outils | Übungen | Herramientas | 도구 |
| Talk to someone (where English says "Talk to an e-coach") | Parler à quelqu'un | Mit jemandem reden | Hablar con alguien | 누군가와 이야기하기 |
| Make your own plan | Faire ton propre plan | Deinen eigenen Plan machen | Haz tu propio plan | 나만의 계획 만들기 |
| Would you like us to pray for you? | Veux-tu qu'on prie pour toi ? | Sollen wir für dich beten? | ¿Quieres que oremos por ti? | 우리가 당신을 위해 기도해도 될까요? |

The check-in's growing plant is a sampaguita, a jasmine: call it jasmine (*jasmin*, *Jasmin*, *jazmín*, *재스민*).

## No e-coach in these four languages

The e-coaches (Himala Everyday, on Messenger) speak English and Filipino. In fr, de, es and ko **never mention e-coaches, Messenger or Himala Everyday**. Every `EcoachLink` on those pages already goes to the help page (`/fr/help` and so on): free phone lines in the visitor's country, and Hope AI. So translate an e-coach line as talking to someone at a free helpline: "Talk to an e-coach" → "Talk to someone", "An e-coach can listen, free" → "A free helpline can listen". Don't promise chat or Messenger.

## Crisis lines

Most crisis text is a component that shows the visitor's own country's line (`CrisisSentence`, `CallCrisisButton`, `CrisisList` in `src/components/help/Crisis.tsx`). Use it instead of typing numbers whenever text sits in a component.

In written content (feeling pages, guides, stories, FAQs), name the line of the country the text is for:

- **fr**: France: le **3114**, numéro national de prévention du suicide, gratuit, 24h/24 et 7j/7. Danger immédiat: le **112** (ou le 15).
- **de**: Germany: **TelefonSeelsorge**, kostenlos, rund um die Uhr: **0800 111 0 111** oder **0800 111 0 222**. Austria **142**, Switzerland **143**. Danger: **112**.
- **es**: content is read across Latin America, so don't name one country's number in general text: say *la línea de crisis de tu país* and point to the help page or the crisis box on the page. A story set in one country may name that country's line (Mexico: **Línea de la Vida 800 911 2000**; danger **911**).
- **ko**: **자살예방상담전화 109** (24시간, 무료). Mental health crisis: **1577-0199**. Danger: **119** (or 112).

Never mention the Philippines' lines (NCMH 1553, Hopeline, In Touch) or PhilHealth in these languages.

## Adapting, not translating

The English and Taglish content is full of Filipino life: jeepneys, OFWs, board exams, typhoons, barkada, lola, panganay, pandesal, PhilHealth, peso amounts, Manila and Cebu. In fr, de, es and ko, swap each one for what a reader there would recognise:

- transport: métro/RER, U-Bahn/S-Bahn, el metro/el camión/el micro, 지하철/버스
- big exams: le bac, concours, Abitur, Staatsexamen, examen de admisión a la universidad, 수능, 공무원 시험
- working abroad, far from home: expats, Montage im Ausland, migrants to the US or Spain, 기러기 아빠
- storms and floods: local weather events, without naming a real disaster's dead
- family words: use the local ones (Korean 엄마/아빠/할머니, 장녀; Spanish abuela, hermano mayor)
- money: euros, pesos (say which country only if it matters), 원

Keep the same struggle, the same CBT step and the same verse. Names, cities, jobs and ages should be ordinary and believable for the country.

## CBT words

| English | fr | de | es | ko |
|---|---|---|---|---|
| thinking trap | piège de pensée | Denkfalle | trampa de pensamiento | 생각의 함정 |
| kinder / balanced thought | pensée plus juste | ausgewogener Gedanke | pensamiento más amable | 더 다정한 생각 / 균형 잡힌 생각 |
| catastrophizing | catastrophisme | Katastrophisieren | catastrofizar | 파국화 |
| mind reading | lire dans les pensées | Gedankenlesen | leer la mente | 독심술 |
| fortune telling | prédire l'avenir | Hellsehen | adivinar el futuro | 점쟁이 오류 |
| all-or-nothing | tout ou rien | Schwarz-Weiß-Denken | todo o nada | 흑백논리 |
| labeling | coller une étiquette | Etikettieren | ponerse etiquetas | 낙인찍기 |
| should statements | les « il faut » | Muss-Sätze | los "debería" | 당위적 사고 |
| personalizing | tout prendre pour soi | Personalisieren | tomarlo todo personal | 개인화 |
| emotional reasoning | raisonnement émotionnel | emotionale Beweisführung | razonamiento emocional | 감정적 추론 |
| overgeneralizing | généraliser | Übergeneralisieren | generalizar | 과잉일반화 |
| worry time | le moment pour s'inquiéter | Sorgenzeit | tiempo para preocuparte | 걱정 시간 |
| 5-4-3-2-1 grounding | l'ancrage 5-4-3-2-1 | die 5-4-3-2-1-Übung | el ejercicio 5-4-3-2-1 | 5-4-3-2-1 그라운딩 |
| slow breathing | respiration lente | langsames Atmen | respiración lenta | 천천히 숨쉬기 |

Tools with Tagalog names get a local name: Saranggola (kite) → *Le cerf-volant / Der Drachen / La cometa / 연날리기*; Laro muna (play first) → *Une pause jeu / Kurz spielen / Un rato de juego / 잠깐 놀이*; Biyahe (a trip) → *Le trajet / Die Fahrt / El viaje en camión* (or similar) */ 여행길*. Read the component to see what it is before naming it.

## Typography

- **French**: non-breaking space (U+00A0) before `: ; ! ?` and inside `« »`. Typographic apostrophe `’`. Quotes « like this ».
- **German**: „like this“. Nouns capitalised. Numbers with a decimal comma.
- **Spanish**: opening `¿ ¡`. Quotes “like this”.
- **Korean**: “like this” or ‘this’. Natural spacing (띄어쓰기). No full stop after a heading.

## Bible verses

Never type a verse. They come from `src/lib/blog/verses.ts` (Louis Segond 1910, Luther 1912, Reina-Valera 1909, 개역한글), by key: `VERSES['php-4-6-7'].fr`. In a guide, use `versesIn(lang, [keys])` from `@/lib/blog`. If a line quotes a verse in passing ("Lamentations 3:22-23 says the Lord's mercies are new every morning"), paraphrase it in your own words and give the reference in that translation's form (French "Lamentations 3:22-23", German "Klagelieder 3,22-23", Spanish "Lamentaciones 3:22-23", Korean "예레미야애가 3:22-23").

## Code conventions

- Copy objects keyed by language: add `fr`, `de`, `es`, `ko` beside `en` and `tl`, same shape and order. Types `Record<Lang, …>` or `PerLang<…>` from `@/lib/i18n`.
- Pages that were English only (no `tl`) use `PerLangNoTl<…>` and read with `noTl(copy, lang)`: Taglish readers keep the English.
- Internal links: write the English path (`/tools`, `/how-to-calm-anxiety`). Links already keep readers in their language.
- Don't change behaviour, styles, analytics names or anything outside the text, except what a rule above asks.
- After editing: `npx prettier --write <your files>` and `npx tsc --noEmit -p .`, reading only the errors in your files.
