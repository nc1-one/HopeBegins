import type { FeelingLang } from './feelingPages';

/**
 * Heavy thoughts many Filipinos know, the thinking trap each one usually
 * falls into, and kinder, truer ways to see it. The tools offer these to
 * tap, so nobody has to find the words first; writing their own stays
 * optional.
 *
 * In French, German, Spanish and Korean each thought is said the way people
 * there think it, with the same trap, ids and risk flags in every language.
 * Thoughts, the questions to ask yourself and balanced thoughts are the
 * reader's own inner voice, so Korean has them in plain speech (반말).
 *
 * Built on CBT's thought record (notice the thought, rate it, name the
 * trap, weigh it, find a balanced thought, rate it again). The balanced
 * thoughts aim for believable, not cheerful. Clinical wording is reviewed
 * by the founder.
 */

type Both = Record<FeelingLang, string>;

export type TrapId =
  | 'mind-reading'
  | 'fortune-telling'
  | 'catastrophizing'
  | 'all-or-nothing'
  | 'labeling'
  | 'should'
  | 'personalizing'
  | 'emotional'
  | 'overgeneralizing';

export interface Trap {
  name: Both;
  means: Both;
  /** The question to ask yourself. */
  ask: Both;
  /** Balanced thoughts that fit any thought caught in this trap. */
  balanced: Both[];
}

export const TRAPS: Record<TrapId, Trap> = {
  'mind-reading': {
    name: {
      en: 'Mind reading',
      tl: 'Mind reading',
      fr: 'Lire dans les pensées',
      de: 'Gedankenlesen',
      es: 'Leer la mente',
      ko: '독심술',
    },
    means: {
      en: 'Guessing what other people think of you, without proof.',
      tl: 'Hinuhulaan mo ang iniisip ng iba tungkol sa iyo, kahit walang patunay.',
      fr: 'Deviner ce que les autres pensent de toi, sans preuve.',
      de: 'Du glaubst zu wissen, was andere über dich denken, ohne Beweise dafür.',
      es: 'Adivinar lo que los demás piensan de ti, sin pruebas.',
      ko: '증거도 없이 다른 사람들이 나를 어떻게 생각하는지 짐작하는 거예요.',
    },
    ask: {
      en: 'What do I actually know, and what am I guessing?',
      tl: 'Ano ang talagang alam ko, at ano ang hula ko lang?',
      fr: 'Qu’est-ce que je sais vraiment, et qu’est-ce que je devine ?',
      de: 'Was weiß ich wirklich, und was vermute ich nur?',
      es: '¿Qué sé de verdad y qué estoy adivinando?',
      ko: '내가 정말 아는 건 뭐고, 짐작하는 건 뭘까?',
    },
    balanced: [
      {
        en: "I can't read minds. I can ask, or let it go.",
        tl: 'Hindi ko nababasa ang isip ng iba. Puwede akong magtanong, o bitawan na lang ito.',
        fr: 'Je ne peux pas lire dans les pensées. Je peux demander, ou laisser couler.',
        de: 'Ich kann keine Gedanken lesen. Ich kann nachfragen oder es loslassen.',
        es: 'No puedo leer mentes. Puedo preguntar o dejarlo ir.',
        ko: '나는 남의 마음을 읽을 수 없어. 물어보거나, 그냥 흘려보낼 수 있어.',
      },
      {
        en: 'Most people are busy with their own worries.',
        tl: 'Abala ang karamihan sa sarili nilang mga problema.',
        fr: 'La plupart des gens sont occupés par leurs propres soucis.',
        de: 'Die meisten Menschen sind mit ihren eigenen Sorgen beschäftigt.',
        es: 'La mayoría de la gente está ocupada con sus propias preocupaciones.',
        ko: '사람들은 대부분 자기 걱정만으로도 바빠.',
      },
    ],
  },
  'fortune-telling': {
    name: {
      en: 'Fortune telling',
      tl: 'Fortune telling',
      fr: 'Prédire l’avenir',
      de: 'Hellsehen',
      es: 'Adivinar el futuro',
      ko: '점쟁이 오류',
    },
    means: {
      en: 'Being sure something will go badly before it has happened.',
      tl: 'Sigurado kang papalpak ang isang bagay kahit hindi pa ito nangyayari.',
      fr: 'Croire dur comme fer que quelque chose va mal tourner, avant même que ça arrive.',
      de: 'Du bist dir sicher, dass etwas schiefgeht, bevor es überhaupt passiert ist.',
      es: 'Dar por hecho que algo va a salir mal antes de que pase.',
      ko: '아직 일어나지도 않은 일이 잘못될 거라고 확신하는 거예요.',
    },
    ask: {
      en: 'What else could happen? What happened the last time?',
      tl: 'Ano pa ang puwedeng mangyari? Ano ang nangyari noong huli?',
      fr: 'Qu’est-ce qui pourrait se passer d’autre ? Que s’est-il passé la dernière fois ?',
      de: 'Was könnte sonst noch passieren? Was ist beim letzten Mal passiert?',
      es: '¿Qué más podría pasar? ¿Qué pasó la última vez?',
      ko: '다르게 될 수도 있지 않을까? 지난번엔 어떻게 됐지?',
    },
    balanced: [
      {
        en: "I don't know how this will turn out yet.",
        tl: 'Hindi ko pa alam kung paano ito matatapos.',
        fr: 'Je ne sais pas encore comment ça va tourner.',
        de: 'Ich weiß noch nicht, wie es ausgeht.',
        es: 'Todavía no sé cómo va a salir esto.',
        ko: '이 일이 어떻게 될지 아직은 몰라.',
      },
      {
        en: "I've expected the worst before, and it didn't happen.",
        tl: 'Inasahan ko na dati ang pinakamasama, at hindi ito nangyari.',
        fr: 'J’ai déjà imaginé le pire, et ce n’est pas arrivé.',
        de: 'Ich habe schon früher mit dem Schlimmsten gerechnet, und es ist nicht passiert.',
        es: 'Ya antes esperé lo peor, y no pasó.',
        ko: '전에도 최악을 예상했지만, 그런 일은 일어나지 않았어.',
      },
    ],
  },
  catastrophizing: {
    name: {
      en: 'Catastrophizing',
      tl: 'Catastrophizing',
      fr: 'Catastrophisme',
      de: 'Katastrophisieren',
      es: 'Catastrofizar',
      ko: '파국화',
    },
    means: {
      en: 'Jumping straight to the worst thing that could happen.',
      tl: 'Pinakamasamang posibleng mangyari agad ang naiisip mo.',
      fr: 'Imaginer tout de suite le pire qui pourrait arriver.',
      de: 'Du springst sofort zum Schlimmsten, was passieren könnte.',
      es: 'Saltar directo a lo peor que podría pasar.',
      ko: '일어날 수 있는 최악의 상황으로 곧장 건너뛰는 거예요.',
    },
    ask: {
      en: 'What is most likely to happen, and how would I cope?',
      tl: 'Ano ang pinakamalamang na mangyari, at paano ko ito haharapin?',
      fr: 'Qu’est-ce qui est le plus probable, et comment je ferais face ?',
      de: 'Was wird am wahrscheinlichsten passieren, und wie würde ich damit umgehen?',
      es: '¿Qué es lo más probable que pase y cómo lo enfrentaría?',
      ko: '가장 일어날 법한 일은 뭘까? 그러면 나는 어떻게 대처할 수 있을까?',
    },
    balanced: [
      {
        en: 'This is hard, and I have got through hard things.',
        tl: 'Mahirap ito, at nalampasan ko na ang mahihirap na bagay.',
        fr: 'C’est dur, et j’ai déjà traversé des choses difficiles.',
        de: 'Das ist schwer, und ich habe schon Schweres durchgestanden.',
        es: 'Esto es difícil, y ya he superado cosas difíciles.',
        ko: '힘든 일이야. 그리고 나는 힘든 일을 이겨 낸 적이 있어.',
      },
      {
        en: 'The worst is possible. It is also unlikely.',
        tl: 'Posible ang pinakamasama. Malabo rin itong mangyari.',
        fr: 'Le pire est possible. Il est aussi peu probable.',
        de: 'Das Schlimmste ist möglich. Es ist auch unwahrscheinlich.',
        es: 'Lo peor es posible. También es poco probable.',
        ko: '최악의 일도 일어날 수는 있어. 동시에, 그럴 가능성은 낮아.',
      },
    ],
  },
  'all-or-nothing': {
    name: {
      en: 'All-or-nothing',
      tl: 'All-or-nothing',
      fr: 'Tout ou rien',
      de: 'Schwarz-Weiß-Denken',
      es: 'Todo o nada',
      ko: '흑백논리',
    },
    means: {
      en: 'Seeing things as perfect or a total failure, with nothing in between.',
      tl: 'Perpekto o palpak lang ang tingin mo, walang gitna.',
      fr: 'Voir les choses comme parfaites ou comme un échec total, sans rien entre les deux.',
      de: 'Für dich ist etwas entweder perfekt oder ein kompletter Misserfolg, nichts dazwischen.',
      es: 'Ver las cosas como perfectas o como un fracaso total, sin nada en medio.',
      ko: '중간 없이 완벽하거나 완전한 실패라고만 보는 거예요.',
    },
    ask: {
      en: 'Is there a middle ground here?',
      tl: 'May gitna ba rito?',
      fr: 'Est-ce qu’il y a un juste milieu, ici ?',
      de: 'Gibt es hier auch etwas dazwischen?',
      es: '¿Hay un punto medio aquí?',
      ko: '여기에 중간은 없을까?',
    },
    balanced: [
      {
        en: 'Some of it went wrong. Some of it went okay.',
        tl: 'May hindi naging maayos. May naging okay din.',
        fr: 'Une partie s’est mal passée. Une partie s’est bien passée.',
        de: 'Manches ist schiefgegangen. Manches lief okay.',
        es: 'Algunas cosas salieron mal. Otras salieron bien.',
        ko: '어떤 건 잘 안 됐어. 어떤 건 괜찮았어.',
      },
      {
        en: 'Doing part of it still counts.',
        tl: 'May halaga pa rin ang nagawa ko, kahit bahagi lang.',
        fr: 'En faire une partie, ça compte quand même.',
        de: 'Einen Teil geschafft zu haben, zählt trotzdem.',
        es: 'Hacer una parte también cuenta.',
        ko: '일부만 해낸 것도 여전히 의미가 있어.',
      },
    ],
  },
  labeling: {
    name: {
      en: 'Labeling',
      tl: 'Labeling',
      fr: 'Coller une étiquette',
      de: 'Etikettieren',
      es: 'Ponerse etiquetas',
      ko: '낙인찍기',
    },
    means: {
      en: 'Calling yourself a harsh name because of one mistake or one hard day.',
      tl: 'Tinatawag mo ang sarili mo ng masakit na pangalan dahil sa isang pagkakamali o isang mahirap na araw.',
      fr: 'Te coller une étiquette blessante à cause d’une seule erreur ou d’une journée difficile.',
      de: 'Du stempelst dich ab, nur wegen eines Fehlers oder eines schweren Tages.',
      es: 'Ponerte una etiqueta dura por un solo error o un día difícil.',
      ko: '실수 한 번이나 힘든 하루 때문에 스스로에게 모진 꼬리표를 붙이는 거예요.',
    },
    ask: {
      en: 'Would I call a friend that for the same thing?',
      tl: 'Tatawagin ko ba ang kaibigan ko ng ganyan dahil sa parehong bagay?',
      fr: 'Est-ce que je parlerais comme ça à quelqu’un que j’aime, pour la même chose ?',
      de: 'Würde ich jemanden, den ich gernhabe, wegen derselben Sache so nennen?',
      es: '¿Le diría eso a alguien que quiero por lo mismo?',
      ko: '친구가 같은 일을 했다면, 나는 친구를 그렇게 부를까?',
    },
    balanced: [
      {
        en: 'I made a mistake. It is something I did, and it is only one part of me.',
        tl: 'Nagkamali ako. Ginawa ko iyon, at isang bahagi lang iyon ng pagkatao ko.',
        fr: 'J’ai fait une erreur. C’est quelque chose que j’ai fait, et ce n’est qu’une partie de moi.',
        de: 'Ich habe einen Fehler gemacht. Das ist etwas, das ich getan habe, und es ist nur ein Teil von mir.',
        es: 'Cometí un error. Es algo que hice, y es solo una parte de mí.',
        ko: '나는 실수를 했어. 그건 내가 한 일이고, 나의 한 부분일 뿐이야.',
      },
      {
        en: "I'm a person who is still learning.",
        tl: 'Tao lang ako, at natututo pa.',
        fr: 'Je suis quelqu’un qui apprend encore.',
        de: 'Ich bin ein Mensch, der noch lernt.',
        es: 'Soy una persona que todavía está aprendiendo.',
        ko: '나는 아직 배우는 중인 사람이야.',
      },
    ],
  },
  should: {
    name: {
      en: 'Should statements',
      tl: "Puro 'dapat'",
      fr: 'Les « il faut »',
      de: 'Muss-Sätze',
      es: 'Los “debería”',
      ko: '당위적 사고',
    },
    means: {
      en: "Pushing yourself with 'should' and 'must' until it feels heavy.",
      tl: "Puro 'dapat' at 'kailangan' ang sinasabi mo sa sarili mo hanggang bumigat ang loob mo.",
      fr: 'Te pousser à coups de « il faut » et de « je dois », jusqu’à ce que ça devienne lourd.',
      de: 'Du setzt dich mit „sollte“ und „muss“ unter Druck, bis es sich schwer anfühlt.',
      es: 'Presionarte con “debería” y “tengo que” hasta sentir que todo pesa.',
      ko: '‘해야 해’, ‘꼭 그래야 해’ 같은 말로 스스로를 몰아붙여서 마음이 무거워지는 거예요.',
    },
    ask: {
      en: 'Who says I should? What would I tell a friend?',
      tl: 'Sino ang nagsabing dapat? Ano ang sasabihin ko sa isang kaibigan?',
      fr: 'Qui dit que je devrais ? Qu’est-ce que je dirais à quelqu’un que j’aime ?',
      de: 'Wer sagt, dass ich das muss? Was würde ich jemandem sagen, den ich gernhabe?',
      es: '¿Quién dice que debería? ¿Qué le diría a alguien que quiero?',
      ko: '누가 꼭 그래야 한다고 했지? 친구에게는 뭐라고 말해 줄까?',
    },
    balanced: [
      {
        en: "I'd like to do better, and I can be patient with myself.",
        tl: 'Gusto kong mas gumaling pa, at kaya kong habaan ang pasensya ko sa sarili ko.',
        fr: 'J’aimerais faire mieux, et je peux m’accorder de la patience.',
        de: 'Ich möchte es besser machen, und ich kann geduldig mit mir sein.',
        es: 'Me gustaría hacerlo mejor, y puedo tenerme paciencia.',
        ko: '더 잘하고 싶어. 그리고 나 자신을 너그럽게 기다려 줄 수 있어.',
      },
      {
        en: 'My pace is my own.',
        tl: 'May sarili akong takbo.',
        fr: 'J’avance à mon rythme.',
        de: 'Ich gehe in meinem eigenen Tempo.',
        es: 'Voy a mi propio ritmo.',
        ko: '나에게는 나만의 속도가 있어.',
      },
    ],
  },
  personalizing: {
    name: {
      en: 'Personalizing',
      tl: 'Personalizing',
      fr: 'Tout prendre pour soi',
      de: 'Personalisieren',
      es: 'Tomarlo todo personal',
      ko: '개인화',
    },
    means: {
      en: "Taking all the blame for things that weren't only up to you.",
      tl: 'Inaako mo ang lahat ng sisi sa mga bagay na hindi lang ikaw ang may hawak.',
      fr: 'Prendre toute la faute sur toi pour des choses qui ne dépendaient pas que de toi.',
      de: 'Du gibst dir die ganze Schuld an Dingen, die nicht nur von dir abhingen.',
      es: 'Echarte toda la culpa por cosas que no dependían solo de ti.',
      ko: '혼자만의 몫이 아니었던 일까지 전부 자기 탓으로 돌리는 거예요.',
    },
    ask: {
      en: 'What else played a part here?',
      tl: 'Ano pa ang naging dahilan nito?',
      fr: 'Qu’est-ce qui a aussi joué un rôle, ici ?',
      de: 'Was hat hier sonst noch eine Rolle gespielt?',
      es: '¿Qué más influyó aquí?',
      ko: '여기에 영향을 준 다른 건 뭐가 있을까?',
    },
    balanced: [
      {
        en: 'I can own my part without carrying all of it.',
        tl: 'Kaya kong akuin ang bahagi ko nang hindi binubuhat ang lahat.',
        fr: 'Je peux assumer ma part sans tout porter.',
        de: 'Ich kann meinen Teil übernehmen, ohne alles zu tragen.',
        es: 'Puedo hacerme cargo de mi parte sin cargar con todo.',
        ko: '전부를 짊어지지 않고도 내 몫을 책임질 수 있어.',
      },
      {
        en: 'Other people and other things played a part too.',
        tl: 'May bahagi rin ang ibang tao at ibang bagay.',
        fr: 'D’autres personnes et d’autres choses ont aussi joué un rôle.',
        de: 'Auch andere Menschen und andere Dinge haben eine Rolle gespielt.',
        es: 'Otras personas y otras cosas también influyeron.',
        ko: '다른 사람들과 다른 일들도 영향을 주었어.',
      },
    ],
  },
  emotional: {
    name: {
      en: 'Emotional reasoning',
      tl: 'Emotional reasoning',
      fr: 'Raisonnement émotionnel',
      de: 'Emotionale Beweisführung',
      es: 'Razonamiento emocional',
      ko: '감정적 추론',
    },
    means: {
      en: 'Believing something is true because it feels true.',
      tl: 'Iniisip mong totoo ang isang bagay dahil ganoon ang pakiramdam mo.',
      fr: 'Croire qu’une chose est vraie parce que tu la ressens comme vraie.',
      de: 'Du hältst etwas für wahr, weil es sich wahr anfühlt.',
      es: 'Creer que algo es cierto porque se siente cierto.',
      ko: '그렇게 느껴진다는 이유만으로 그게 사실이라고 믿는 거예요.',
    },
    ask: {
      en: 'If I felt calmer, would I still believe this?',
      tl: 'Kung mas kalmado ako, ganito pa rin ba ang paniniwala ko?',
      fr: 'Si je me sentais plus calme, est-ce que j’y croirais encore ?',
      de: 'Wenn ich ruhiger wäre, würde ich das dann immer noch glauben?',
      es: 'Si me sintiera con más calma, ¿seguiría creyendo esto?',
      ko: '마음이 좀 더 차분하다면, 그래도 이렇게 믿을까?',
    },
    balanced: [
      {
        en: 'My feelings are real, and they can still be wrong about the facts.',
        tl: 'Totoo ang nararamdaman ko, at puwede pa rin itong magkamali tungkol sa nangyayari.',
        fr: 'Mes émotions sont réelles, et elles peuvent quand même se tromper sur les faits.',
        de: 'Meine Gefühle sind echt, und trotzdem können sie sich bei den Tatsachen irren.',
        es: 'Mis sentimientos son reales, y aun así pueden equivocarse sobre los hechos.',
        ko: '내 감정은 진짜야. 그래도 사실에 대해서는 틀릴 수 있어.',
      },
      {
        en: 'This feeling will pass, even if the problem takes longer.',
        tl: 'Lilipas din ang pakiramdam na ito, kahit matagal pa bago maayos ang problema.',
        fr: 'Ce sentiment va passer, même si le problème prend plus de temps.',
        de: 'Dieses Gefühl geht vorbei, auch wenn das Problem länger dauert.',
        es: 'Este sentimiento va a pasar, aunque el problema tarde más.',
        ko: '문제가 풀리기까지는 더 걸려도, 이 감정은 지나갈 거야.',
      },
    ],
  },
  overgeneralizing: {
    name: {
      en: 'Overgeneralizing',
      tl: 'Overgeneralizing',
      fr: 'Généraliser',
      de: 'Übergeneralisieren',
      es: 'Generalizar',
      ko: '과잉일반화',
    },
    means: {
      en: "Turning one bad moment into 'always' or 'never'.",
      tl: "Isang masamang pangyayari, tapos ginagawa mo nang 'palagi' o 'hindi kailanman'.",
      fr: 'Faire d’un mauvais moment un « toujours » ou un « jamais ».',
      de: 'Aus einem schlechten Moment machst du ein „immer“ oder ein „nie“.',
      es: 'Hacer de un mal momento un “siempre” o un “nunca”.',
      ko: '한 번의 나쁜 순간을 ‘항상’이나 ‘절대’로 키우는 거예요.',
    },
    ask: {
      en: 'Is it really always? When was it different?',
      tl: 'Palagi ba talaga? Kailan ito naging iba?',
      fr: 'Est-ce que c’est vraiment toujours le cas ? Quand est-ce que ça s’est passé autrement ?',
      de: 'Ist es wirklich immer so? Wann war es anders?',
      es: '¿De verdad es siempre? ¿Cuándo fue diferente?',
      ko: '정말 항상 그럴까? 다르게 흘러간 적은 언제였지?',
    },
    balanced: [
      {
        en: "This happened, and it hasn't happened every time.",
        tl: 'Nangyari ito, at hindi ito nangyayari sa lahat ng pagkakataon.',
        fr: 'C’est arrivé, et ce n’est pas arrivé à chaque fois.',
        de: 'Das ist passiert. Es passiert aber nicht jedes Mal.',
        es: 'Esto pasó, y no ha pasado todas las veces.',
        ko: '이번엔 이런 일이 있었지만, 매번 그랬던 건 아니야.',
      },
      {
        en: 'There have been times it went differently.',
        tl: 'May mga pagkakataong iba ang nangyari.',
        fr: 'Il y a eu des fois où ça s’est passé autrement.',
        de: 'Es gab Zeiten, in denen es anders lief.',
        es: 'Ha habido veces en que salió distinto.',
        ko: '다르게 흘러간 때도 있었어.',
      },
    ],
  },
};

export const TRAP_IDS = Object.keys(TRAPS) as TrapId[];

export interface Thought {
  id: string;
  text: Both;
  trap: TrapId;
  balanced: Both[];
  /** Thoughts that can come with thinking of ending your life. */
  risk?: boolean;
}

export const THOUGHTS: Thought[] = [
  {
    id: 'not-enough',
    text: {
      en: "I'm not good enough.",
      tl: 'Hindi ako sapat.',
      fr: 'Je ne suis pas à la hauteur.',
      de: 'Ich bin nicht gut genug.',
      es: 'No soy suficiente.',
      ko: '나는 부족한 사람이야.',
    },
    trap: 'labeling',
    balanced: [
      {
        en: "I'm still learning, like everyone else.",
        tl: 'Natututo pa ako, gaya ng lahat.',
        fr: 'J’apprends encore, comme tout le monde.',
        de: 'Ich lerne noch, wie alle anderen auch.',
        es: 'Todavía estoy aprendiendo, como todos.',
        ko: '나도 다른 사람들처럼 아직 배우는 중이야.',
      },
      {
        en: 'One mistake or one bad day is only a small part of me.',
        tl: 'Maliit na bahagi lang ng pagkatao ko ang isang pagkakamali o isang masamang araw.',
        fr: 'Une erreur ou une mauvaise journée n’est qu’une petite partie de moi.',
        de: 'Ein Fehler oder ein schlechter Tag ist nur ein kleiner Teil von mir.',
        es: 'Un error o un mal día es solo una pequeña parte de mí.',
        ko: '실수 한 번, 안 좋은 하루는 나의 아주 작은 부분일 뿐이야.',
      },
      {
        en: "God's love for me doesn't depend on how well I do.",
        tl: 'Hindi nakadepende sa galing ko ang pagmamahal ng Diyos sa akin.',
        fr: 'L’amour de Dieu pour moi ne dépend pas de mes réussites.',
        de: 'Gottes Liebe zu mir hängt nicht davon ab, wie gut ich etwas mache.',
        es: 'El amor de Dios por mí no depende de qué tan bien lo haga.',
        ko: '하나님의 사랑은 내가 얼마나 잘하느냐에 달려 있지 않아.',
      },
    ],
  },
  {
    id: 'judging',
    text: {
      en: "Everyone's judging me.",
      tl: 'Hinuhusgahan ako ng lahat.',
      fr: 'Tout le monde me juge.',
      de: 'Alle denken schlecht über mich.',
      es: 'Todos me están juzgando.',
      ko: '다들 나를 한심하게 보고 있어.',
    },
    trap: 'mind-reading',
    balanced: [
      {
        en: "I can't know what they're thinking. Most people are busy with their own worries.",
        tl: 'Hindi ko alam ang iniisip nila. Abala rin ang karamihan sa sarili nilang problema.',
        fr: 'Je ne peux pas savoir ce qu’ils pensent. La plupart des gens sont occupés par leurs propres soucis.',
        de: 'Ich kann nicht wissen, was sie denken. Die meisten Menschen sind mit ihren eigenen Sorgen beschäftigt.',
        es: 'No puedo saber lo que están pensando. La mayoría de la gente está ocupada con sus propias preocupaciones.',
        ko: '그 사람들이 무슨 생각을 하는지 나는 알 수 없어. 사람들은 대부분 자기 걱정만으로도 바빠.',
      },
      {
        en: 'Even if a few people judge me, the people who matter know me better.',
        tl: 'Kahit may manghusga, mas kilala ako ng mga taong mahalaga sa akin.',
        fr: 'Même si quelques personnes me jugent, celles qui comptent me connaissent mieux que ça.',
        de: 'Auch wenn ein paar Leute über mich urteilen: Die Menschen, die mir wichtig sind, kennen mich besser.',
        es: 'Aunque algunas personas me juzguen, las que importan me conocen mejor.',
        ko: '몇몇 사람이 나를 판단하더라도, 나에게 소중한 사람들은 나를 더 잘 알아.',
      },
      {
        en: 'How I see myself matters more than my guess about how they see me.',
        tl: 'Mas mahalaga ang tingin ko sa sarili ko kaysa sa hula ko sa tingin nila.',
        fr: 'Le regard que je porte sur moi compte plus que ce que j’imagine du leur.',
        de: 'Wie ich mich selbst sehe, zählt mehr als meine Vermutung, wie sie mich sehen.',
        es: 'Cómo me veo yo importa más que lo que imagino sobre cómo me ven.',
        ko: '그들이 나를 어떻게 볼지 짐작하는 것보다, 내가 나를 어떻게 보는지가 더 중요해.',
      },
    ],
  },
  {
    id: 'never',
    text: {
      en: "I'll never get through this.",
      tl: 'Hindi ko na ito malalampasan.',
      fr: 'Je ne m’en sortirai jamais.',
      de: 'Das schaffe ich nie.',
      es: 'Nunca voy a salir de esto.',
      ko: '나는 이걸 절대 못 이겨 낼 거야.',
    },
    trap: 'fortune-telling',
    balanced: [
      {
        en: "This is hard right now. I've got through hard things before.",
        tl: 'Mahirap ito ngayon. Nalampasan ko na ang mahihirap na bagay dati.',
        fr: 'C’est dur en ce moment. J’ai déjà traversé des choses difficiles.',
        de: 'Das ist gerade schwer. Ich habe schon früher Schweres durchgestanden.',
        es: 'Esto es difícil ahora. Ya he superado cosas difíciles antes.',
        ko: '지금은 힘들어. 그래도 전에 힘든 일을 이겨 낸 적이 있어.',
      },
      {
        en: 'Today I only need the next small step.',
        tl: 'Ang susunod na maliit na hakbang lang ang kailangan ko ngayon.',
        fr: 'Aujourd’hui, j’ai seulement besoin du prochain petit pas.',
        de: 'Heute brauche ich nur den nächsten kleinen Schritt.',
        es: 'Hoy solo necesito dar el siguiente pasito.',
        ko: '오늘은 다음 작은 한 걸음만 있으면 돼.',
      },
      {
        en: "Feelings this heavy do change, even when it seems they won't.",
        tl: 'Nagbabago rin ang ganito kabigat na pakiramdam, kahit parang hindi.',
        fr: 'Des émotions aussi lourdes finissent par changer, même quand on a l’impression que non.',
        de: 'Auch so schwere Gefühle verändern sich, selbst wenn es nicht danach aussieht.',
        es: 'Los sentimientos así de pesados sí cambian, aunque parezca que no.',
        ko: '이렇게 무거운 감정도 결국 달라져. 그렇지 않을 것 같아 보여도.',
      },
    ],
  },
  {
    id: 'something-bad',
    text: {
      en: 'Something bad is going to happen.',
      tl: 'May masamang mangyayari.',
      fr: 'Quelque chose de grave va arriver.',
      de: 'Bestimmt passiert etwas Schlimmes.',
      es: 'Algo malo va a pasar.',
      ko: '뭔가 안 좋은 일이 생길 거야.',
    },
    trap: 'catastrophizing',
    balanced: [
      {
        en: "I'm picturing the worst. What usually happens is much smaller.",
        tl: 'Pinakamasama agad ang naiisip ko. Kadalasan, mas maliit ang talagang nangyayari.',
        fr: 'J’imagine le pire. Ce qui arrive d’habitude est bien plus petit.',
        de: 'Ich male mir das Schlimmste aus. Was wirklich passiert, ist meistens viel kleiner.',
        es: 'Me estoy imaginando lo peor. Lo que suele pasar es mucho más pequeño.',
        ko: '나는 지금 최악을 떠올리고 있어. 실제로 일어나는 일은 대개 훨씬 작아.',
      },
      {
        en: "If something hard happens, I'll find a way through it, with help.",
        tl: 'Kung may mahirap na mangyari, makakahanap ako ng paraan, sa tulong ng iba.',
        fr: 'Si quelque chose de dur arrive, je trouverai un moyen de m’en sortir, avec de l’aide.',
        de: 'Wenn etwas Schweres passiert, finde ich mit Hilfe einen Weg hindurch.',
        es: 'Si pasa algo difícil, voy a encontrar la manera de salir adelante, con ayuda.',
        ko: '힘든 일이 생겨도, 도움을 받으며 헤쳐 나갈 길을 찾을 거야.',
      },
      {
        en: 'Right now, I can focus on what is in front of me.',
        tl: 'Ngayon, ang nasa harap ko lang ang kailangan kong harapin.',
        fr: 'Là, maintenant, je peux me concentrer sur ce qui est devant moi.',
        de: 'Gerade jetzt kann ich mich auf das konzentrieren, was vor mir liegt.',
        es: 'Ahora mismo puedo enfocarme en lo que tengo enfrente.',
        ko: '지금은 눈앞에 있는 일에 집중할 수 있어.',
      },
    ],
  },
  {
    id: 'my-fault',
    text: {
      en: "It's all my fault.",
      tl: 'Kasalanan ko lahat.',
      fr: 'Tout est de ma faute.',
      de: 'Das ist alles meine Schuld.',
      es: 'Todo es mi culpa.',
      ko: '다 내 잘못이야.',
    },
    trap: 'personalizing',
    balanced: [
      {
        en: 'Many things played a part, and some were out of my hands.',
        tl: 'Maraming dahilan kung bakit ito nangyari, at may mga bagay na hindi ko hawak.',
        fr: 'Beaucoup de choses ont joué un rôle, et certaines ne dépendaient pas de moi.',
        de: 'Vieles hat eine Rolle gespielt, und manches lag nicht in meiner Hand.',
        es: 'Muchas cosas influyeron, y algunas no estaban en mis manos.',
        ko: '여러 가지가 영향을 주었고, 그중엔 내 손을 벗어난 일도 있었어.',
      },
      {
        en: 'I can own my part without carrying all of it.',
        tl: 'Kaya kong akuin ang bahagi ko nang hindi binubuhat ang lahat.',
        fr: 'Je peux assumer ma part sans tout porter.',
        de: 'Ich kann meinen Teil übernehmen, ohne alles zu tragen.',
        es: 'Puedo hacerme cargo de mi parte sin cargar con todo.',
        ko: '전부를 짊어지지 않고도 내 몫을 책임질 수 있어.',
      },
      {
        en: "If a friend were in my place, I wouldn't blame them for everything.",
        tl: 'Kung kaibigan ko ang nasa lugar ko, hindi ko siya sisisihin sa lahat.',
        fr: 'Si une personne que j’aime était à ma place, je ne lui reprocherais pas tout.',
        de: 'Wenn ein lieber Mensch an meiner Stelle wäre, würde ich ihm nicht an allem die Schuld geben.',
        es: 'Si alguien que quiero estuviera en mi lugar, no le echaría la culpa de todo.',
        ko: '친구가 내 입장이었다면, 모든 걸 친구 탓으로 돌리지 않았을 거야.',
      },
    ],
  },
  {
    id: 'behind',
    text: {
      en: 'I should be further along by now.',
      tl: 'Dapat may narating na ako sa edad ko.',
      fr: 'À mon âge, je devrais déjà en être plus loin.',
      de: 'In meinem Alter sollte ich schon viel weiter sein.',
      es: 'A mi edad ya debería tener la vida resuelta.',
      ko: '이 나이면 벌써 자리 잡았어야 해.',
    },
    trap: 'should',
    balanced: [
      {
        en: 'Everyone has their own timeline. Social media only shows the highlights.',
        tl: 'Iba-iba ang timeline ng bawat tao. Highlights lang ang nakikita ko sa social media.',
        fr: 'Chacun avance à son rythme. Les réseaux sociaux ne montrent que les meilleurs moments.',
        de: 'Jeder Mensch hat sein eigenes Tempo. Social Media zeigt nur die schönsten Momente.',
        es: 'Cada persona tiene sus propios tiempos. Las redes sociales solo muestran lo mejor.',
        ko: '사람마다 자기만의 시간표가 있어. SNS에는 좋은 순간만 올라와.',
      },
      {
        en: "I've come further than I give myself credit for.",
        tl: 'Mas malayo na ang narating ko kaysa sa inaamin ko sa sarili ko.',
        fr: 'J’ai fait plus de chemin que je ne le reconnais.',
        de: 'Ich bin schon weiter, als ich mir selbst zugestehe.',
        es: 'He avanzado más de lo que me reconozco.',
        ko: '나는 내가 인정하는 것보다 더 멀리 왔어.',
      },
      {
        en: 'I can take one step forward from where I am today.',
        tl: 'Kaya kong humakbang mula sa kung nasaan ako ngayon.',
        fr: 'Je peux faire un pas en avant, à partir de là où j’en suis aujourd’hui.',
        de: 'Ich kann von dort aus, wo ich heute stehe, einen Schritt nach vorn gehen.',
        es: 'Puedo dar un paso adelante desde donde estoy hoy.',
        ko: '오늘 내가 있는 자리에서 한 걸음 내디딜 수 있어.',
      },
    ],
  },
  {
    id: 'burden',
    text: {
      en: "I'm a burden to everyone.",
      tl: 'Pabigat lang ako sa lahat.',
      fr: 'Je suis un poids pour tout le monde.',
      de: 'Ich bin für alle nur eine Last.',
      es: 'Soy una carga para todos.',
      ko: '나는 모두에게 짐만 돼.',
    },
    trap: 'emotional',
    risk: true,
    balanced: [
      {
        en: "I'm going through a hard season. Needing help is part of being human.",
        tl: 'Mabigat ang pinagdadaanan ko ngayon. Normal sa tao ang mangailangan ng tulong.',
        fr: 'Je traverse une période difficile. Avoir besoin d’aide, c’est humain.',
        de: 'Ich gehe gerade durch eine schwere Zeit. Hilfe zu brauchen, gehört zum Menschsein dazu.',
        es: 'Estoy pasando por una temporada difícil. Necesitar ayuda es parte de ser humano.',
        ko: '나는 지금 힘든 시기를 지나고 있어. 도움이 필요한 건 사람이라면 당연한 일이야.',
      },
      {
        en: 'The people who care about me would want to help if they knew.',
        tl: 'Gugustuhin ng mga nagmamalasakit sa akin na tumulong kung alam nila.',
        fr: 'Les personnes qui tiennent à moi voudraient m’aider si elles savaient.',
        de: 'Die Menschen, denen ich wichtig bin, würden helfen wollen, wenn sie es wüssten.',
        es: 'Las personas que me quieren querrían ayudarme si lo supieran.',
        ko: '나를 아끼는 사람들이 알게 되면 돕고 싶어 할 거야.',
      },
      {
        en: "I've been there for others. Now I can let them be there for me.",
        tl: 'Nandiyan din ako dati para sa iba. Okay lang na ako naman ang tulungan ngayon.',
        fr: 'J’ai été là pour les autres. Maintenant, c’est mon tour de recevoir de l’aide.',
        de: 'Ich war für andere da. Jetzt darf mir auch geholfen werden.',
        es: 'He estado ahí para otros. Ahora está bien que me ayuden a mí.',
        ko: '나도 다른 사람들 곁에 있어 줬어. 이제는 내가 도움을 받아도 괜찮아.',
      },
    ],
  },
  {
    id: 'nobody-cares',
    text: {
      en: 'Nobody really cares about me.',
      tl: 'Wala talagang may pakialam sa akin.',
      fr: 'Personne ne tient vraiment à moi.',
      de: 'Eigentlich bin ich allen egal.',
      es: 'A nadie le importo de verdad.',
      ko: '아무도 진짜로 나를 신경 쓰지 않아.',
    },
    trap: 'overgeneralizing',
    risk: true,
    balanced: [
      {
        en: 'It feels that way right now. Some people have shown me they care.',
        tl: 'Ganoon ang pakiramdam ko ngayon. May mga taong nagpakita na nagmamalasakit sila.',
        fr: 'C’est ce que je ressens en ce moment. Certaines personnes m’ont montré qu’elles tenaient à moi.',
        de: 'So fühlt es sich gerade an. Manche Menschen haben mir gezeigt, dass ich ihnen wichtig bin.',
        es: 'Así se siente ahora. Algunas personas me han demostrado que les importo.',
        ko: '지금은 그렇게 느껴져. 그래도 나를 아낀다는 걸 보여 준 사람들이 있어.',
      },
      {
        en: "Some people don't know how I feel because I haven't told them yet.",
        tl: 'May mga hindi nakakaalam ng nararamdaman ko dahil hindi ko pa nasasabi.',
        fr: 'Certaines personnes ne savent pas ce que je ressens, parce que je ne le leur ai pas encore dit.',
        de: 'Manche wissen nicht, wie es mir geht, weil ich es ihnen noch nicht gesagt habe.',
        es: 'Algunas personas no saben cómo me siento porque todavía no les he contado.',
        ko: '내가 아직 말하지 않아서 내 마음을 모르는 사람들도 있어.',
      },
      {
        en: 'God sees me and cares for me, even when people fall short.',
        tl: 'Nakikita ako ng Diyos at mahalaga ako sa Kanya, kahit nagkukulang ang mga tao.',
        fr: 'Dieu me voit et prend soin de moi, même quand les gens me déçoivent.',
        de: 'Gott sieht mich und sorgt für mich, auch wenn Menschen mich enttäuschen.',
        es: 'Dios me ve y me cuida, aunque las personas me fallen.',
        ko: '사람들이 나를 실망시킬 때도, 하나님은 나를 보시고 돌보셔.',
      },
    ],
  },
];

/** How strongly the thought feels true, from 1 (a little) to 5 (completely). */
export const BELIEF: Both[] = [
  {
    en: 'A little',
    tl: 'Kaunti',
    fr: 'Un peu',
    de: 'Ein wenig',
    es: 'Un poco',
    ko: '조금',
  },
  {
    en: 'Somewhat',
    tl: 'Medyo',
    fr: 'Moyennement',
    de: 'Teilweise',
    es: 'Algo',
    ko: '어느 정도',
  },
  {
    en: 'Quite a bit',
    tl: 'Malaki',
    fr: 'Pas mal',
    de: 'Ziemlich',
    es: 'Bastante',
    ko: '꽤',
  },
  {
    en: 'A lot',
    tl: 'Sobra',
    fr: 'Beaucoup',
    de: 'Sehr',
    es: 'Mucho',
    ko: '많이',
  },
  {
    en: 'Completely',
    tl: 'Buong-buo',
    fr: 'Complètement',
    de: 'Völlig',
    es: 'Completamente',
    ko: '완전히',
  },
];

/** Worries people tap instead of typing, for worry time and the worry note. */
export const WORRY_TOPICS: Both[] = [
  {
    en: 'Money and bills',
    tl: 'Pera at bayarin',
    fr: 'L’argent et les factures',
    de: 'Geld und Rechnungen',
    es: 'Dinero y cuentas',
    ko: '돈과 생활비',
  },
  {
    en: 'Family',
    tl: 'Pamilya',
    fr: 'La famille',
    de: 'Familie',
    es: 'Familia',
    ko: '가족',
  },
  {
    en: 'Work or school',
    tl: 'Trabaho o school',
    fr: 'Le travail ou les études',
    de: 'Arbeit oder Schule',
    es: 'Trabajo o estudios',
    ko: '직장이나 학교',
  },
  {
    en: 'My health',
    tl: 'Kalusugan ko',
    fr: 'Ma santé',
    de: 'Meine Gesundheit',
    es: 'Mi salud',
    ko: '내 건강',
  },
  {
    en: 'A relationship',
    tl: 'Isang relasyon',
    fr: 'Une relation',
    de: 'Eine Beziehung',
    es: 'Una relación',
    ko: '인간관계',
  },
  {
    en: 'The future',
    tl: 'Ang hinaharap',
    fr: 'L’avenir',
    de: 'Die Zukunft',
    es: 'El futuro',
    ko: '미래',
  },
];
