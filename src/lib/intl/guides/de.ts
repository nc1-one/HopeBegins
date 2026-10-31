import type { Guide } from '../../guidePages';
import { VERSE_ATTRIBUTION, versesIn } from '@/lib/blog';

/** The guides in de, each written from the English guide in `pair`. */
export const deGuides: Guide[] = [
  {
    slug: 'was-sagt-man-einem-depressiven-menschen',
    lang: 'de',
    pair: 'what-to-say-to-a-depressed-friend',
    metaTitle: 'Was sagt man einem depressiven Menschen? Und was nicht?',
    metaDescription:
      'Sorgen um einen Freund oder eine Freundin? Was du sagen kannst, was du besser vermeidest und was du tun kannst, wenn jemand nicht mehr leben will.',
    keywords: [
      'was sagt man einem depressiven Menschen',
      'depressiven Freund helfen',
      'was sollte man depressiven Menschen nicht sagen',
      'Freundin depressiv was tun',
      'wie kann ich depressiven Menschen helfen',
    ],
    label: 'Was man einem depressiven Menschen sagen kann',
    heading: 'Was sage ich einem Menschen mit Depressionen?',
    intro:
      'Es kommt weniger auf die perfekten Worte an als darauf, da zu sein. Hör zu, bleib da und melde dich wieder. Hier steht, was hilft und was du besser vermeidest.',
    photo: 'care',
    sections: [
      {
        title: 'Was du sagen kannst',
        sayings: [
          'Mir ist aufgefallen, dass du in letzter Zeit bedrückt wirkst. Wie geht es dir wirklich?',
          'Ich bin da. Willst du reden, oder soll ich einfach bei dir sein?',
          'Lass dir Zeit. Ich höre dir zu.',
          'Kann ich heute etwas für dich tun, zum Beispiel einkaufen oder dich irgendwo hinfahren?',
          'Würde es dir helfen, mit einer Beratungsstelle zu sprechen? Ich helfe dir, eine zu finden.',
        ],
        paragraphs: [
          'Dann hör mehr zu, als du redest. Du kannst sagen: „Das klingt wirklich schwer“, ohne gleich eine Lösung zu suchen.',
        ],
      },
      {
        title: 'Was du besser vermeidest',
        list: [
          '„Du betest einfach zu wenig.“ Beten kann helfen, aber solche Worte geben Menschen das Gefühl, selbst schuld daran zu sein, dass es ihnen schlecht geht.',
          '„Denk einfach positiv“ oder „Reiß dich zusammen“. Eine Depression sucht sich niemand aus.',
          '„Anderen geht es noch viel schlechter.“ Das klingt, als dürfte es der Person nicht schlecht gehen.',
          'Sofort viele Ratschläge. Hör zuerst zu und frag, bevor du etwas vorschlägst.',
        ],
      },
      {
        title: 'Wenn jemand davon spricht, nicht mehr leben zu wollen',
        safety: true,
        paragraphs: [
          'Frag direkt: „Denkst du daran, dir das Leben zu nehmen?“ Die Frage bringt niemanden erst auf die Idee. Sie zeigt, dass du bereit bist zuzuhören.',
          'Bleib bei der Person oder sorg dafür, dass jemand bei ihr ist. Ruft gemeinsam die TelefonSeelsorge an: 0800 111 0 111 oder 0800 111 0 222, kostenlos und rund um die Uhr. In Österreich hilft die 142, in der Schweiz die 143. Bei akuter Gefahr ruf die 112 an.',
        ],
      },
      {
        title: 'Melde dich immer wieder',
        paragraphs: [
          'Eine Nachricht ein paar Tage später, wie „Ich denk an dich. Kaffee diese Woche?“, bedeutet viel. Lade die Person weiter ein, auch wenn sie absagt.',
          'Jemandem zu helfen, kann auch dich belasten. Such dir selbst jemanden zum Reden: Bei der TelefonSeelsorge hört dir jemand zu, kostenlos und rund um die Uhr.',
        ],
      },
    ],
    faq: [
      {
        q: 'Soll ich direkt fragen, ob jemand an Suizid denkt?',
        a: 'Ja. Wenn du ruhig und direkt fragst, bringst du niemanden erst auf die Idee, und darüber reden zu können, kann entlasten. Wenn die Antwort Ja ist, bleib bei der Person und ruf die TelefonSeelsorge an: 0800 111 0 111 oder 0800 111 0 222. In Österreich hilft die 142, in der Schweiz die 143.',
      },
    ],
    related: ['i-feel-depressed', 'i-feel-alone'],
    sources: [
      {
        label: 'WHO: Suizid',
        href: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
      },
      {
        label: 'WHO: Depressive Störung (Depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
  },
  {
    slug: 'bibelverse-gegen-angst',
    lang: 'de',
    pair: 'bible-verses-for-anxiety',
    metaTitle: 'Bibelverse gegen Angst: 8 Verse und ein kurzes Gebet',
    metaDescription:
      'Bibelverse für Momente, in denen du Angst hast oder dir Sorgen machst, ein kurzes Gebet für jetzt und kostenlose Hilfe, wenn die Sorgen dich nicht loslassen.',
    keywords: [
      'Bibelverse gegen Angst',
      'Bibelvers Angst',
      'Bibelstellen gegen Angst',
      'Bibelverse gegen Sorgen',
      'Gebet bei Angst',
      'Bibelverse, wenn man Angst hat',
    ],
    label: 'Bibelverse gegen Angst',
    heading: 'Bibelverse gegen Angst',
    intro:
      'Wenn die Sorgen nicht loslassen, erinnern uns diese Verse daran, dass Gott nah ist. Lies einen langsam und atme dann aus.',
    photo: 'hope',
    sections: [
      {
        title: 'Acht Verse für ängstliche Tage',
        verses: versesIn('de', [
          'php-4-6-7',
          '1pe-5-7',
          'mat-6-34',
          'isa-41-10',
          'jhn-14-27',
          'psa-94-19',
          'mat-11-28-30',
          'psa-56-3',
        ]),
      },
      {
        title: 'Ein kurzes Gebet',
        paragraphs: [
          'Herr, du siehst, was ich heute mit mir trage. Ich gebe dir meine Sorgen, eine nach der anderen. Beruhige mein Herz und meine Gedanken und hilf mir, den nächsten kleinen Schritt zu gehen. Danke, dass du für mich sorgst. In Jesu Namen. Amen.',
        ],
      },
      {
        title: 'Wenn die Sorgen nicht loslassen',
        paragraphs: [
          'Gebet und Gottes Wort helfen, und ein Gespräch mit jemandem hilft auch. Wenn die Angst dich an den meisten Tagen begleitet, probier die Atemübung für 2 Minuten, mach dir einen kostenlosen Plan oder sprich kostenlos mit jemandem am Telefon. Du kannst auch unsere Hope Carrier bitten, für dich zu beten.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was sagt die Bibel über Angst?',
        a: 'In Philipper 4,6-7 heißt es, dass wir mit allem im Gebet und mit Dank zu Gott kommen dürfen und dass sein Frieden unser Herz und unsere Gedanken schützt. In 1. Petrus 5,7 heißt es, dass wir ihm alles abgeben dürfen, was uns Sorgen macht, weil er sich um uns kümmert.',
      },
    ],
    related: ['how-to-calm-anxiety', 'bible-verses-when-you-feel-down'],
    attribution: VERSE_ATTRIBUTION.de,
  },
  {
    slug: 'bibelverse-trost-und-hoffnung',
    lang: 'de',
    pair: 'bible-verses-when-you-feel-down',
    metaTitle: 'Bibelverse für Trost und Hoffnung, wenn du traurig bist',
    metaDescription:
      'Bibelverse für schwere Tage, wenn du traurig, niedergeschlagen oder müde von allem bist, mit einem kurzen Gebet und kostenloser Hilfe, wenn es schwer bleibt.',
    keywords: [
      'Bibelverse Trost',
      'Bibelverse Hoffnung',
      'Bibelverse Trost und Hoffnung',
      'Bibelverse gegen Traurigkeit',
      'Bibelverse für schwere Zeiten',
      'Bibelverse bei Hoffnungslosigkeit',
      'Gebet, wenn man traurig ist',
    ],
    label: 'Bibelverse für Trost und Hoffnung',
    heading: 'Bibelverse für Trost und Hoffnung',
    intro:
      'An schweren Tagen fällt sogar das Beten schwer. Fang mit einem dieser Verse an. Lies ihn langsam, so oft du ihn brauchst.',
    photo: 'morning',
    sections: [
      {
        title: 'Acht Verse für schwere Tage',
        verses: versesIn('de', [
          'psa-34-18',
          'psa-42-11',
          'psa-46-1',
          'isa-40-31',
          'psa-147-3',
          '2co-4-8-9',
          'lam-3-22-23',
          'psa-23-4',
        ]),
      },
      {
        title: 'Ein kurzes Gebet',
        paragraphs: [
          'Herr, mein Herz ist heute schwer. Du bist nahe bei denen, die ein gebrochenes Herz haben, also sei mir jetzt nahe. Gib mir Kraft für diesen Tag und Menschen, die mit mir gehen. In Jesu Namen. Amen.',
        ],
      },
      {
        title: 'Wenn es schwer bleibt',
        safety: true,
        paragraphs: [
          'Wenn du dich seit zwei Wochen oder länger an den meisten Tagen niedergeschlagen fühlst, kann das eine Depression sein, und sie lässt sich behandeln. Wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle, oder fang mit einem kostenlosen Gespräch am Telefon an. Wenn du daran denkst, dir das Leben zu nehmen, ruf die TelefonSeelsorge an: 0800 111 0 111 oder 0800 111 0 222, kostenlos und rund um die Uhr. In Österreich hilft die 142, in der Schweiz die 143.',
        ],
      },
    ],
    faq: [
      {
        q: 'Welcher Bibelvers hilft, wenn man traurig ist?',
        a: 'In Psalm 34,19 heißt es, dass der Herr denen nahe ist, die ein gebrochenes Herz haben. Psalm 42,12 spricht ehrlich mit einer verzweifelten Seele und richtet sie auf die Hoffnung auf Gott aus. Vielen gibt auch Klagelieder 3,22-23 Halt: Gottes Erbarmen ist jeden Morgen neu.',
      },
      {
        q: 'Was sagt die Bibel, wenn man keine Hoffnung mehr hat?',
        a: 'Psalm 42 spricht zu einer verzweifelten Seele und antwortet mit der Hoffnung auf Gott. Nach Klagelieder 3,22-23 ist das Erbarmen des Herrn jeden Morgen neu. Wenn du seit Wochen keine Hoffnung mehr siehst, kann das auch ein Anzeichen einer Depression sein. Sprich deshalb mit jemandem, und wenn du daran denkst, dir das Leben zu nehmen, ruf die TelefonSeelsorge an: 0800 111 0 111 oder 0800 111 0 222. In Österreich hilft die 142, in der Schweiz die 143.',
      },
    ],
    related: ['i-feel-depressed', 'bible-verses-for-anxiety'],
    attribution: VERSE_ATTRIBUTION.de,
  },
];
