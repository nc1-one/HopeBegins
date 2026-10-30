import type { FeelingPage } from '../../feelingPages';

/** The feeling pages in de, each written from the English page in `pair`. */
export const deFeelingPages: FeelingPage[] = [
  {
    slug: 'ich-kann-nicht-mehr',
    photo: 'tired',
    lang: 'de',
    pair: 'tired-of-everything',
    metaTitle: 'Ich kann nicht mehr: was hilft, wenn dich alles erschöpft',
    metaDescription:
      'Du kannst nicht mehr und bist müde von allem? Probier eine Atemübung für 2 Minuten, sprich kostenlos mit jemandem oder mach einen Plan für diese Woche.',
    keywords: [
      'ich kann nicht mehr',
      'müde von allem',
      'keine Kraft mehr',
      'emotional erschöpft',
      'ich bin so erschöpft, was kann ich tun',
      'immer müde trotz ausreichend Schlaf',
      'alles ist zu viel',
    ],
    label: 'Ich kann nicht mehr',
    heading: 'Ich kann nicht mehr.',
    intro:
      'Wenn du müde von allem bist, fühlen sich sogar kleine Dinge schwer an. Fang mit einer kleinen Sache an oder mit zwei Minuten langsamem Atmen.',
    safetyFirst:
      'Wenn du müde vom Leben bist oder denkst, du wärst lieber nicht mehr da, sprich bitte jetzt mit jemandem.',
    toolsHeading: 'Fang klein an',
    tools: ['one-thing', 'breathe'],
    related: ['i-feel-depressed'],
    faq: [
      {
        q: 'Ist es normal, so müde von allem zu sein?',
        a: 'Jeder Mensch ist mal erschöpft. Wenn du dich aber seit zwei Wochen oder länger an den meisten Tagen müde fühlst und dich fast nichts mehr interessiert, kann das eine Depression oder ein Burnout sein. Wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
      {
        q: 'Warum bin ich immer müde, obwohl ich genug schlafe?',
        a: 'Müdigkeit kann vom Körper kommen, aber auch von Stress, Sorgen, schlechtem Schlaf oder einer gedrückten Stimmung, die schon länger anhält. Wenn es dir zwei Wochen oder länger an den meisten Tagen so geht, lass dich ärztlich untersuchen. Dabei kann beides geprüft werden.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'ich-fuehle-mich-einsam',
    photo: 'alone',
    lang: 'de',
    pair: 'i-feel-alone',
    metaTitle: 'Ich fühle mich einsam: Heute kann jemand mit dir reden',
    metaDescription:
      'Niemand zum Reden? Ruf kostenlos ein Sorgentelefon an, schreib jederzeit mit Hope AI oder schick einem Menschen, dem du vertraust, eine Nachricht.',
    keywords: [
      'ich fühle mich einsam',
      'niemand zum Reden',
      'ich habe niemanden zum Reden',
      'jemanden zum Reden finden',
      'Einsamkeit was tun',
      'keiner interessiert sich für mich',
      'anonym mit jemandem reden',
    ],
    label: 'Ich fühle mich einsam',
    heading: 'Ich fühle mich einsam.',
    intro:
      'Es ist schwer, wenn es sich anfühlt, als würde dir niemand zuhören. Heute kannst du mit jemandem reden.',
    toolsHeading: 'Nur eine Nachricht',
    tools: ['message'],
    tip: {
      title: 'Wenn es spät ist und du einfach nur schreiben willst',
      body: 'Hope AI ist ein KI-Assistent. Er ersetzt keine Beratung und kann im Notfall nicht helfen, aber du kannst ihm jederzeit schreiben, auch mitten in der Nacht.',
      hopeAi: true,
    },
    faq: [
      {
        q: 'Wo kann ich kostenlos mit jemandem reden?',
        a: 'Bei der TelefonSeelsorge hört dir jemand zu, kostenlos, anonym und rund um die Uhr: 0800 111 0 111 oder 0800 111 0 222. In Österreich wählst du die 142, in der Schweiz die 143. Auch in einer Krise bist du dort richtig. Bei akuter Gefahr ruf die 112 an.',
      },
      {
        q: 'Was kann ich tun, wenn ich das Gefühl habe, dass sich niemand für mich interessiert?',
        a: 'Schick einem Menschen eine kurze Nachricht, zum Beispiel: „Hast du diese Woche Zeit zum Reden?“ Wenn dir gerade niemand einfällt, hört dir bei der TelefonSeelsorge jemand zu, kostenlos und rund um die Uhr: 0800 111 0 111 oder 0800 111 0 222 (in Österreich 142, in der Schweiz 143). Wenn du daran denkst, dir das Leben zu nehmen, ruf jetzt dort an.',
      },
    ],
    related: ['free-mental-health-help-philippines'],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'was-hilft-gegen-angst',
    photo: 'anxious',
    lang: 'de',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Was hilft gegen Angst? Eine 2-Minuten-Übung für jetzt',
    metaDescription:
      'Dein Herz rast und dein Kopf kommt nicht zur Ruhe? Probier langsames Atmen, die 5-4-3-2-1-Übung oder ein kurzes Spiel und mach dann einen kostenlosen Plan.',
    keywords: [
      'was hilft gegen Angst',
      'Angstzustände was tun',
      'Angst beruhigen',
      'wie beruhige ich mich bei Angst',
      'Atemübung bei Angst',
      '5-4-3-2-1-Methode',
      'Angst im Alltag bewältigen',
    ],
    label: 'Was gegen Angst hilft',
    heading: 'Was hilft gegen Angst?',
    intro:
      'Wenn dein Herz rast und dein Kopf nicht zur Ruhe kommt, probier eins davon aus. Langsames Atmen und die 5-4-3-2-1-Übung helfen deinem Körper, ruhiger zu werden. Das Spiel gibt deinem Kopf etwas anderes zu tun.',
    toolsHeading: 'Probier das jetzt',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Warum Atmen hilft',
      body: 'Wenn du länger aus- als einatmest, schlägt dein Herz langsamer und dein Körper kommt zur Ruhe. Wenn dir das oft passiert, können ein Plan und Gespräche in einer Beratungsstelle helfen.',
    },
    related: ['panic-attack-what-to-do', 'bible-verses-for-anxiety'],
    faq: [
      {
        q: 'Was hilft am schnellsten gegen Angst?',
        a: 'Atme langsamer: Zähl beim Einatmen bis 4 und beim Ausatmen bis 6, etwa zwei Minuten lang. Nenn dann 5 Dinge, die du siehst, 4, die du hörst, und 3, die du anfassen kannst. So holst du deinen Kopf zurück ins Hier und Jetzt.',
      },
      {
        q: 'Warum habe ich ohne Grund Angst?',
        a: 'Angst kann sich durch Stress, schlechten Schlaf, Koffein oder Sorgen aufbauen, die du noch nicht in Worte gefasst hast. Deshalb wirkt sie manchmal, als käme sie aus dem Nichts. Wenn das an den meisten Tagen passiert, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
      {
        q: 'Was hilft im Alltag gegen Angst?',
        a: 'Übe das langsame Atmen, wenn du ruhig bist. Dann gelingt es dir leichter, wenn du es brauchst. Schlaf genug, trink weniger Kaffee und schreib deine Sorgen jeden Tag zu einer festen Zeit auf. Wenn die Angst dich bei der Arbeit, in der Schule oder beim Schlafen einschränkt, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'kann-nicht-schlafen-gedanken-kreisen',
    photo: 'sleep',
    lang: 'de',
    pair: 'cant-sleep-overthinking',
    metaTitle: 'Kann nicht schlafen, Gedanken kreisen? Was jetzt hilft',
    metaDescription:
      'Es ist spät und die Gedanken kreisen? Schreib auf, was dir durch den Kopf geht, atme langsam und probier diese Wege, heute Nacht einzuschlafen.',
    keywords: [
      'kann nicht schlafen Gedanken kreisen',
      'Gedankenkarussell nachts stoppen',
      'Gedankenkreisen stoppen',
      'kann nicht einschlafen zu viele Gedanken',
      'nachts grübeln was tun',
      'warum grüble ich nachts so viel',
    ],
    label: 'Kann nicht schlafen, Gedanken kreisen',
    heading: 'Ich kann nicht schlafen. Meine Gedanken kreisen.',
    intro:
      'Es ist spät und dein Kopf hört nicht auf. Schreib erst auf, was sich immer wieder im Kreis dreht, und probier dann das langsame Atmen.',
    toolsHeading: 'Erst mal raus aus dem Kopf',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Wenn du nach etwa 20 Minuten noch wach bist',
      body: 'Steh auf und mach bei gedämpftem Licht etwas Ruhiges, lies zum Beispiel ein paar Seiten, bis du müde wirst. Leg das Handy so lange weg. Versuch morgen, zur gewohnten Zeit aufzustehen.',
    },
    faq: [
      {
        q: 'Wie stoppe ich das Gedankenkarussell in der Nacht?',
        a: 'Schreib deine Gedanken vor dem Schlafengehen auf, damit dein Kopf sie loslassen kann, leg das Handy außer Reichweite und atme langsam. Wenn du nach etwa 20 Minuten noch wach bist, steh auf und mach etwas Ruhiges, bis du müde wirst.',
      },
      {
        q: 'Warum wird das Grübeln nachts schlimmer?',
        a: 'Tagsüber halten Arbeit und andere Menschen deinen Kopf beschäftigt. Nachts wird es still, und die Sorgen, die du zur Seite geschoben hast, kommen zurück. Wenn du müde bist, wirken sie außerdem größer.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'bin-ich-depressiv',
    photo: 'alone',
    lang: 'de',
    pair: 'i-feel-depressed',
    metaTitle: 'Bin ich depressiv? Was heute hilft und wann du Hilfe holst',
    metaDescription:
      'Fast jeden Tag niedergeschlagen, ohne Kraft und Freude? Fang heute mit einer kleinen Sache an, rede mit jemandem und lies, wann ärztliche Hilfe wichtig ist.',
    keywords: [
      'bin ich depressiv',
      'habe ich Depressionen',
      'Depression Anzeichen',
      'Depressionen was tun',
      'ich glaube, ich habe Depressionen',
      'Depressionen ohne Grund',
      'Depressionen und Einsamkeit',
    ],
    label: 'Bin ich depressiv?',
    heading: 'Bin ich depressiv?',
    intro:
      'Wenn sich alles schwer anfühlt und dich nichts mehr interessiert, ist sogar das Aufstehen schwer. Du kannst heute mit einer kleinen Sache anfangen, und du kannst mit jemandem reden.',
    safetyFirst:
      'Wenn du daran denkst, dir das Leben zu nehmen, sprich bitte jetzt mit jemandem.',
    toolsHeading: 'Fang mit einer kleinen Sache an',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Wann es eine Depression sein kann',
      intro:
        'Jeder Mensch hat mal schlechte Tage. Eine Depression kann es sein, wenn du dich zwei Wochen oder länger fast den ganzen Tag niedergeschlagen oder leer fühlst oder das Interesse an Dingen verlierst, die dir früher Freude gemacht haben, und wenn dazu einiges hiervon kommt:',
      points: [
        'du schläfst viel mehr oder viel weniger als sonst',
        'du isst viel mehr oder viel weniger als sonst',
        'du bist müde und hast keine Kraft',
        'es fällt dir schwer, dich zu konzentrieren oder Entscheidungen zu treffen',
        'du fühlst dich wertlos oder schuldig',
        'du siehst keine Hoffnung für die Zukunft',
        'du denkst an den Tod oder daran, dir das Leben zu nehmen',
      ],
      note: 'Depressionen sind häufig, und man kann sie behandeln. Deine Hausarztpraxis, eine Psychotherapiepraxis oder eine Beratungsstelle kann dir helfen herauszufinden, was du brauchst. Wenn du nicht weißt, wo du anfangen sollst, ruf die TelefonSeelsorge an: 0800 111 0 111 oder 0800 111 0 222, kostenlos und rund um die Uhr (in Österreich 142, in der Schweiz 143).',
    },
    tip: {
      title: 'Warum eine kleine Sache hilft',
      body: 'Eine Depression lässt dich darauf warten, dass es dir besser geht, bevor du etwas tust. Wenn du zuerst eine kleine, machbare Sache tust, wie eine Dusche oder einen kurzen Spaziergang, hebt das oft ein wenig die Stimmung, und das Nächste fällt leichter.',
    },
    related: [
      'tired-of-everything',
      'i-feel-alone',
      'what-to-say-to-a-depressed-friend',
      'bible-verses-when-you-feel-down',
    ],
    sources: [
      {
        label: 'WHO: Depressive Störung (Depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Bin ich depressiv oder nur traurig?',
        a: 'Traurig ist jeder Mensch mal. Von einer Depression spricht man, wenn du zwei Wochen oder länger niedergeschlagen bist oder an kaum etwas Interesse hast und das deinen Schlaf, deinen Appetit, deinen Antrieb und dein Denken beeinträchtigt.',
      },
      {
        q: 'Geht eine Depression von allein wieder weg?',
        a: 'Manchmal wird sie von allein leichter. Mit Hilfe erholst du dich aber schneller, und die Chancen dafür stehen besser. Depressionen lassen sich mit Psychotherapie behandeln und manchmal auch mit Medikamenten, die eine Ärztin oder ein Arzt verschreibt.',
      },
      {
        q: 'Kann man ohne Grund Depressionen haben?',
        a: 'Eine Depression hat nicht immer eine klare Ursache. Sie kann sich aus Stress, einem Verlust, schlechtem Schlaf, gesundheitlichen Problemen oder Veränderungen im Körper entwickeln, manchmal aus allem auf einmal. Eine Ärztin, ein Arzt oder eine Beratungsstelle kann dir helfen, das zu sortieren, und eine Depression lässt sich behandeln.',
      },
      {
        q: 'Was kann ich tun, wenn ich depressiv und einsam bin?',
        a: 'Erzähl heute einem Menschen davon, auch mit einer kurzen Nachricht. Wenn dir niemand einfällt, ruf die TelefonSeelsorge an, kostenlos und rund um die Uhr: 0800 111 0 111 oder 0800 111 0 222 (in Österreich 142, in der Schweiz 143). Wenn du daran denkst, dir das Leben zu nehmen, ruf jetzt dort an.',
      },
    ],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'panikattacke-was-tun',
    photo: 'anxious',
    lang: 'de',
    pair: 'panic-attack-what-to-do',
    metaTitle: 'Panikattacke: Was tun? Jetzt sofort, Schritt für Schritt',
    metaDescription:
      'Herzrasen, kaum Luft und das Gefühl, gleich passiert etwas Schlimmes? Das kann eine Panikattacke sein. Atme 2 Minuten mit uns, bis sie vorbeigeht.',
    keywords: [
      'Panikattacke was tun',
      'Panikattacke stoppen',
      'Panikattacke Symptome',
      'Atemübung bei Panikattacke',
      'Panikattacke sofort stoppen',
      'wie lange dauert eine Panikattacke',
    ],
    label: 'Panikattacke',
    heading: 'Ich glaube, ich habe eine Panikattacke.',
    intro:
      'Eine Panikattacke macht große Angst, aber sie geht vorbei, meist innerhalb von 5 bis 20 Minuten. Lass uns jetzt atmen: Zähl beim Einatmen bis 4 und beim Ausatmen bis 6.',
    medicalNote:
      'Wenn du so etwas zum ersten Mal erlebst, wenn du Schmerzen in der Brust hast, die in den Arm oder Kiefer ausstrahlen, oder wenn du schwer Luft bekommst und es nicht besser wird: Ruf die 112 an oder geh in die nächste Notaufnahme.',
    toolsHeading: 'Atme jetzt mit uns',
    tools: ['breathe', 'ground'],
    explain: {
      title: 'Wie sich eine Panikattacke anfühlen kann',
      intro: 'Eine plötzliche Welle von Angst, dazu einige dieser Anzeichen:',
      points: [
        'Herzklopfen oder Herzrasen',
        'Atemnot oder Enge in der Brust',
        'Zittern, Schwitzen, Hitze- oder Kältegefühl',
        'Schwindel oder das Gefühl, gleich ohnmächtig zu werden',
        'Kribbeln oder Taubheit in Händen oder Gesicht',
        'das Gefühl, dass gleich etwas Schlimmes passiert oder dass du die Kontrolle verlierst',
      ],
      note: 'Es fühlt sich gefährlich an, aber eine Panikattacke selbst schadet deinem Körper nicht, und sie geht vorbei. Wenn Panikattacken immer wiederkommen oder du deshalb Orte meidest, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle. Panikattacken lassen sich behandeln.',
    },
    tip: {
      title: 'Warum langsames Ausatmen hilft',
      body: 'Bei einer Panikattacke atmest du schnell, und das verstärkt Schwindel und Kribbeln. Wenn du länger aus- als einatmest, schlägt dein Herz langsamer und dein Körper kommt zur Ruhe.',
    },
    related: ['how-to-calm-anxiety'],
    sources: [
      {
        label: 'NHS: Panikstörung',
        href: 'https://www.nhs.uk/mental-health/conditions/panic-disorder/',
      },
      {
        label: 'WHO: Angststörungen',
        href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
      },
    ],
    faq: [
      {
        q: 'Wie lange dauert eine Panikattacke?',
        a: 'Die meisten Panikattacken dauern 5 bis 20 Minuten. Am schlimmsten ist es meist in den ersten Minuten.',
      },
      {
        q: 'Ist eine Panikattacke gefährlich?',
        a: 'Eine Panikattacke macht große Angst, aber sie schadet deinem Körper nicht. Wenn du nicht sicher bist, ob es Panik ist oder zum Beispiel ein Herzproblem, lass dich ärztlich untersuchen.',
      },
      {
        q: 'Wie stoppe ich eine Panikattacke schnell?',
        a: 'Atme langsam (zähl beim Einatmen bis 4 und beim Ausatmen bis 6), stell beide Füße flach auf den Boden und sag dir: Das ist eine Panikattacke, und sie geht vorbei. Damit sie seltener kommen, übe das Atmen jeden Tag und wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'ich-fuehle-mich-verloren',
    photo: 'unsure',
    lang: 'de',
    pair: 'i-feel-lost',
    metaTitle: 'Ich fühle mich verloren und leer: Was kann ich tun?',
    metaDescription:
      'Verloren im Leben oder innerlich leer? Fang heute mit einem kleinen Schritt an und sprich mit jemandem, der dir hilft, Klarheit zu finden. Kostenlos.',
    keywords: [
      'ich fühle mich verloren',
      'ich fühle mich verloren im Leben',
      'ich fühle mich leer',
      'innere Leere was tun',
      'ich weiß nicht, was ich mit meinem Leben anfangen soll',
      'keine Richtung im Leben',
    ],
    label: 'Ich fühle mich verloren',
    heading: 'Ich fühle mich verloren.',
    intro:
      'Wenn du nicht weißt, wohin dein Leben geht, oder dich innerlich leer fühlst, ist es schwer zu wissen, wo du anfangen sollst. Du kannst klein anfangen, heute.',
    safetyFirst:
      'Wenn mit der Leere Gedanken kommen, dir das Leben zu nehmen, sprich bitte jetzt mit jemandem.',
    toolsHeading: 'Fang klein an',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Wann du dir Hilfe holen solltest',
      intro:
        'Sich ab und zu verloren zu fühlen, gehört zum Leben, vor allem an großen Wendepunkten wie dem Ende der Schulzeit oder des Studiums, einem neuen Job oder einer Trennung. Wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle, wenn du seit mindestens zwei Wochen:',
      points: [
        'dich fast den ganzen Tag leer fühlst',
        'an fast allem das Interesse verloren hast',
        'viel mehr oder viel weniger schläfst oder isst als sonst',
        'Arbeit, Schule oder den Alltag zu Hause kaum noch schaffst',
      ],
      note: 'Das können Anzeichen einer Depression sein, die sich behandeln lässt. Mehr dazu steht auf unserer Seite über Depressionen.',
    },
    tip: {
      title: 'So kannst du anfangen',
      body: 'Schreib drei Dinge auf, die dir wichtig waren, auch kleine: ein Mensch, ein Ort, etwas, das dir früher Freude gemacht hat. Such dir eins aus und geh diese Woche einen kleinen Schritt darauf zu.',
    },
    related: ['i-feel-depressed', 'tired-of-everything'],
    sources: [
      {
        label: 'WHO: Depressive Störung (Depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Warum fühle ich mich innerlich leer?',
        a: 'Leere kann von Stress, Einsamkeit, einem großen Verlust oder einer großen Veränderung kommen, oder von einer Depression. Wenn sie zwei Wochen oder länger anhält oder du an den meisten Dingen das Interesse verlierst, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
      {
        q: 'Was kann ich tun, wenn ich mich im Leben verloren fühle?',
        a: 'Such dir einen kleinen Schritt für heute aus und einen für morgen, und erzähl einem Menschen, dem du vertraust, wie es dir geht. Der nächste Schritt reicht für jetzt. Der größere Plan kann später kommen.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'burnout-anzeichen',
    photo: 'tired',
    lang: 'de',
    pair: 'burnout',
    metaTitle: 'Burnout: Anzeichen, Symptome und was jetzt hilft',
    metaDescription:
      'Erschöpft, genervt vom Job und du schaffst immer weniger? Das kann Burnout sein. Mach heute eine echte Pause, setz eine Grenze und mach dir einen Plan.',
    keywords: [
      'Burnout Anzeichen',
      'Burnout Symptome',
      'Burnout was tun',
      'ich bin ausgebrannt',
      'Burnout oder Depression',
      'Burnout erste Anzeichen',
    ],
    label: 'Burnout',
    heading: 'Ich bin ausgebrannt.',
    intro:
      'Wenn dich Arbeit, Schule oder das Kümmern um andere ausgelaugt hat, fühlt sich Ausruhen nicht mehr nach Erholung an. Fang heute mit einer echten Pause an, auch wenn es nur zehn Minuten sind.',
    toolsHeading: 'Halt kurz inne',
    tools: ['breathe', 'one-thing'],
    explain: {
      title: 'Anzeichen von Burnout',
      intro:
        'Die Weltgesundheitsorganisation beschreibt Burnout als Folge von lang anhaltendem Stress bei der Arbeit, der nicht bewältigt wurde. Meist zeigt es sich so:',
      points: [
        'du fühlst dich die meiste Zeit ausgelaugt oder erschöpft',
        'du gehst innerlich auf Abstand zu deiner Arbeit oder siehst sie nur noch negativ und zynisch',
        'du schaffst weniger, obwohl du dich sehr anstrengst',
      ],
      note: 'Burnout hat mit der Arbeit und mit langen Phasen von Stress zu tun. Wenn du dich außerdem fast den ganzen Tag niedergeschlagen fühlst oder auch außerhalb der Arbeit das Interesse an Dingen verloren hast, kann es auch eine Depression sein. Wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
    },
    tip: {
      title: 'Eine Grenze für diese Woche',
      body: 'Such dir eine Sache aus, die du schützt: eine echte Mittagspause, eine Uhrzeit, ab der du keine Nachrichten mehr liest, oder einen freien Tag. Erzähl jemandem davon, dann hältst du sie leichter ein.',
    },
    related: ['tired-of-everything', 'i-feel-depressed'],
    sources: [
      {
        label: 'WHO: Burn-out als „berufsbedingtes Phänomen“',
        href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      },
    ],
    faq: [
      {
        q: 'Ist Burnout dasselbe wie eine Depression?',
        a: 'Nein. Burnout entsteht durch lang anhaltenden Stress bei der Arbeit und betrifft vor allem dein Verhältnis zur Arbeit. Eine Depression betrifft alle Bereiche des Lebens. Beides kann sich überschneiden. Wenn du dich also fast den ganzen Tag niedergeschlagen fühlst, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle.',
      },
      {
        q: 'Was bedeutet es, ausgebrannt zu sein?',
        a: 'So beschreiben viele ein Burnout: eine Müdigkeit, die auch Ausruhen nicht vertreibt, dazu das Gefühl, die Arbeit satt zu haben, und dass man immer weniger schafft.',
      },
    ],
    firstStep: 'plan',
  },
];
