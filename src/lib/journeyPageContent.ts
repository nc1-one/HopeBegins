import { VERSES } from './blog/verses';
import type { IntlLang, Lang } from './i18n';

export type JourneyStepKey =
  | 'welcome'
  | 'word'
  | 'prayer'
  | 'devotional'
  | 'next-steps';

export type JourneyActionIcon =
  | 'heart'
  | 'mail'
  | 'message-square'
  | 'headphones';

export interface JourneyProgressStep {
  key: JourneyStepKey;
  label: string;
}

export interface JourneyWelcomeSection {
  title: string;
  body: string;
  expectations_title: string;
  expectations: string[];
  button_text: string;
}

export interface JourneyWordSection {
  title: string;
  description: string;
  video_embed_url: string;
  verse_text: string;
  verse_reference: string;
  previous_button_text: string;
  next_button_text: string;
}

export interface JourneyPrayerItem {
  title: string;
  text: string;
}

export interface JourneyPrayerSection {
  title: string;
  description: string;
  steps: JourneyPrayerItem[];
  back_button_text: string;
  next_button_text: string;
  final_button_text: string;
}

export interface JourneyDevotionalSection {
  title: string;
  subtitle: string;
  content_cards: string[];
  verse_text: string;
  verse_reference: string;
  good_news_title: string;
  good_news_body: string;
  reflection_title: string;
  reflection_prompt: string;
  previous_button_text: string;
  next_button_text: string;
}

export interface JourneyNextStepAction {
  title: string;
  href: string;
  icon: JourneyActionIcon;
}

export interface JourneyNextStepsSection {
  title: string;
  description: string;
  actions: JourneyNextStepAction[];
  home_link_text: string;
}

export interface JourneyCrisisLine {
  label: string;
  value: string;
}

export interface JourneyCrisisContact {
  title: string;
  icon?: JourneyActionIcon;
  lines: JourneyCrisisLine[];
}

export interface JourneyCrisisSection {
  heading: string;
  contacts: JourneyCrisisContact[];
}

export interface JourneyPageContent {
  id?: number;
  page_title: string;
  page_subtitle: string;
  steps: JourneyProgressStep[];
  welcome_section: JourneyWelcomeSection;
  word_section: JourneyWordSection;
  prayer_section: JourneyPrayerSection;
  devotional_section: JourneyDevotionalSection;
  next_steps_section: JourneyNextStepsSection;
  crisis_section: JourneyCrisisSection;
  updated_at?: string;
}

export interface LegacyJourneyContent {
  id: number;
  title: string;
  description: string;
  video_embed_url: string;
  updated_at: string;
}

export const JOURNEY_ACTION_ICON_OPTIONS: {
  value: JourneyActionIcon;
  label: string;
}[] = [
  { value: 'heart', label: 'Heart' },
  { value: 'mail', label: 'Mail' },
  { value: 'message-square', label: 'Message' },
  { value: 'headphones', label: 'Headphones' },
];

export const DEFAULT_JOURNEY_PAGE_CONTENT: JourneyPageContent = {
  page_title: 'Hopeful Beginning',
  page_subtitle: 'Five short steps for when you feel hopeless.',
  steps: [
    { key: 'welcome', label: 'Welcome' },
    { key: 'word', label: 'A word for you' },
    { key: 'prayer', label: 'Guided prayer' },
    { key: 'devotional', label: 'Devotional' },
    { key: 'next-steps', label: 'Next steps' },
  ],
  welcome_section: {
    title: 'Your Hopeful Beginning',
    body: "Feeling hopeless is hard. Thank you for coming here.\nThere are five short steps. Move to the next one whenever you're ready.",
    expectations_title: 'What to expect:',
    expectations: [
      'A short video message of encouragement',
      'A guided prayer',
      'A short reading on what the Bible says about hope',
      'Ways to get more support',
    ],
    button_text: 'Continue',
  },
  word_section: {
    title: 'A word for you',
    description: 'Before anything else, we want you to hear this.',
    video_embed_url: 'https://www.youtube.com/embed/zHPaFDRZMUo?rel=0',
    // Public-domain WEB text from verses.ts, as on the rest of the site.
    verse_text: VERSES['psa-147-3'].en.text,
    verse_reference: VERSES['psa-147-3'].en.reference,
    previous_button_text: 'Back',
    next_button_text: 'Continue',
  },
  prayer_section: {
    title: 'Guided prayer',
    description: 'Read each step slowly. Pray the words, or just read them.',
    steps: [
      {
        title: 'Be still',
        text: 'Sit still for a moment. Let your shoulders drop and breathe slowly.',
      },
      {
        title: 'Acknowledge',
        text: "Name what you're feeling, like sadness, fear or tiredness. Breathe in slowly.",
      },
      {
        title: 'Release',
        text: 'Lord, I give You my fear, my pain and my worry. You said to cast my burdens on You, so here they are.',
      },
      {
        title: 'Receive',
        text: 'I receive Your peace, which passes understanding, and Your love, which never fails. I hold on to the hope that You are working all things together for my good.',
      },
      {
        title: 'Rest',
        text: 'I rest in You, Lord. Things are not okay right now, but You are with me. Amen.',
      },
    ],
    back_button_text: 'Back',
    next_button_text: 'Next',
    final_button_text: 'Continue to devotional',
  },
  devotional_section: {
    title: 'What is hope?',
    subtitle: 'A short reading on hope.',
    content_cards: [
      "In the Bible, hope is trust that God will keep His promises, even when you can't yet see how.",
      "Hebrews calls hope an anchor for the soul. An anchor doesn't stop the storm. It keeps the boat from drifting until the storm passes.",
    ],
    verse_text: VERSES['heb-6-19'].en.text,
    verse_reference: VERSES['heb-6-19'].en.reference,
    good_news_title: 'The good news',
    good_news_body:
      "God loves you as you are, and that love doesn't depend on what you've done. He sent His Son, Jesus, to be with you, even on your darkest days. You can talk to Him today.",
    reflection_title: 'Reflect on this:',
    reflection_prompt:
      'What would change if you believed, even a little, that tomorrow could be different?',
    previous_button_text: 'Back',
    next_button_text: 'Continue',
  },
  next_steps_section: {
    title: 'Your next step',
    description: "You've finished all five steps. Here are ways to keep going.",
    actions: [
      {
        title: 'Ask someone to pray for you',
        href: '/prayers',
        icon: 'heart',
      },
      {
        title: 'Get Daily Hope by email',
        href: '/daily-hope',
        icon: 'mail',
      },
      {
        title: 'Talk to Hope AI',
        href: '/hope-ai',
        icon: 'message-square',
      },
      {
        title: 'Listen to a HopeCast',
        href: '/hopecasts',
        icon: 'headphones',
      },
    ],
    home_link_text: 'Back to home',
  },
  crisis_section: {
    heading: 'In crisis in the Philippines? Call one of these lines:',
    contacts: [
      {
        title: 'National Center for Mental Health 24/7 Crisis Hotline',
        icon: 'heart',
        lines: [
          { label: 'Landline (nationwide):', value: '1553' },
          { label: 'Mobile:', value: '0917-899-8727 / 0966-351-4518' },
        ],
      },
      {
        title: 'Hopeline Philippines Emotional Crisis Support',
        icon: 'message-square',
        lines: [
          { label: 'Call:', value: '(02) 8804-4673' },
          { label: 'Mobile:', value: '0917-558-4673 / 0918-873-4673' },
        ],
      },
      {
        title: 'In Touch Community Services Crisis Line (24/7)',
        icon: 'heart',
        lines: [
          { label: 'Call:', value: '(02) 8893-7603' },
          { label: 'Mobile:', value: '0917-800-1123' },
        ],
      },
    ],
  },
};

export function getDefaultJourneyPageContent(): JourneyPageContent {
  return structuredClone(DEFAULT_JOURNEY_PAGE_CONTENT);
}

type VerseFields = 'verse_text' | 'verse_reference';

/** The page in another language, before its verses are filled in. */
type IntlJourneyPageContent = Omit<
  JourneyPageContent,
  'word_section' | 'devotional_section'
> & {
  word_section: Omit<JourneyWordSection, VerseFields>;
  devotional_section: Omit<JourneyDevotionalSection, VerseFields>;
};

const VIDEO = DEFAULT_JOURNEY_PAGE_CONTENT.word_section.video_embed_url;

/*
 * The page in French, German, Spanish and Korean. The admin edits the page
 * in English, so readers in these languages always get these words. The
 * crisis lines are the visitor's own country's (the page shows them), so
 * no contacts are listed here. Links are English paths; they keep readers
 * in their language.
 */
const INTL_JOURNEY_PAGE_CONTENT: Record<IntlLang, IntlJourneyPageContent> = {
  fr: {
    page_title: 'Premiers pas vers l’espoir',
    page_subtitle:
      'Cinq courtes étapes pour les jours où tu n’as plus d’espoir.',
    steps: [
      { key: 'welcome', label: 'Bienvenue' },
      { key: 'word', label: 'Un mot pour toi' },
      { key: 'prayer', label: 'Prière guidée' },
      { key: 'devotional', label: 'Méditation' },
      { key: 'next-steps', label: 'La suite' },
    ],
    welcome_section: {
      title: 'Tes premiers pas vers l’espoir',
      body: 'Perdre espoir, c’est dur. Merci d’être là.\nIl y a cinq courtes étapes. Passe à la suivante quand tu veux, à ton rythme.',
      expectations_title: 'Ce qui t’attend :',
      expectations: [
        'Une courte vidéo d’encouragement (en anglais)',
        'Une prière guidée',
        'Une courte lecture sur ce que la Bible dit de l’espérance',
        'Des façons de trouver plus de soutien',
      ],
      button_text: 'Continuer',
    },
    word_section: {
      title: 'Un mot pour toi',
      description:
        'Avant tout, on aimerait que tu entendes ceci. La vidéo est en anglais.',
      video_embed_url: VIDEO,
      previous_button_text: 'Retour',
      next_button_text: 'Continuer',
    },
    prayer_section: {
      title: 'Prière guidée',
      description:
        'Lis chaque étape lentement. Prie avec ces mots, ou contente-toi de les lire.',
      steps: [
        {
          title: 'Pose-toi',
          text: 'Reste immobile un instant. Relâche tes épaules et respire lentement.',
        },
        {
          title: 'Reconnais',
          text: 'Mets un nom sur ce que tu ressens, comme la tristesse, la peur ou la fatigue. Inspire lentement.',
        },
        {
          title: 'Lâche prise',
          text: 'Seigneur, je te donne ma peur, ma douleur et mon inquiétude. Tu m’invites à te confier mes fardeaux, alors les voici.',
        },
        {
          title: 'Reçois',
          text: 'Je reçois ta paix, qui surpasse toute intelligence. Je reçois ton amour, qui ne faillit jamais. Je reçois l’espérance que tu fais tout concourir à mon bien.',
        },
        {
          title: 'Repose-toi',
          text: 'Je me repose en toi, Seigneur. En ce moment, ça ne va pas, et pourtant tu es avec moi. Au nom de Jésus. Amen.',
        },
      ],
      back_button_text: 'Retour',
      next_button_text: 'Suivant',
      final_button_text: 'Passer à la méditation',
    },
    devotional_section: {
      title: 'Qu’est-ce que l’espérance ?',
      subtitle: 'Une courte lecture sur l’espérance.',
      content_cards: [
        'Dans la Bible, l’espérance, c’est faire confiance à Dieu : il tiendra ses promesses, même quand tu ne vois pas encore comment.',
        'Hébreux 6:19 compare l’espérance à une ancre pour l’âme. Pendant la tempête, l’ancre retient le bateau pour qu’il ne dérive pas, jusqu’à ce que le calme revienne.',
      ],
      good_news_title: 'La bonne nouvelle',
      good_news_body:
        'Dieu t’aime comme tu es, et cet amour ne dépend pas de ce que tu as fait. Il a envoyé son Fils, Jésus, pour être avec toi, même dans tes jours les plus sombres. Tu peux lui parler dès aujourd’hui.',
      reflection_title: 'Réfléchis à ceci :',
      reflection_prompt:
        'Qu’est-ce qui changerait si tu croyais, même un peu, que demain pourrait être différent ?',
      previous_button_text: 'Retour',
      next_button_text: 'Continuer',
    },
    next_steps_section: {
      title: 'Ta prochaine étape',
      description: 'Tu as fait les cinq étapes. Voici des façons de continuer.',
      actions: [
        {
          title: 'Demander qu’on prie pour toi',
          href: '/prayers',
          icon: 'heart',
        },
        {
          title: 'Recevoir Daily Hope par e-mail',
          href: '/daily-hope',
          icon: 'mail',
        },
        { title: 'Parler à Hope AI', href: '/hope-ai', icon: 'message-square' },
        {
          title: 'Écouter un HopeCast (en anglais ou en filipino)',
          href: '/hopecasts',
          icon: 'headphones',
        },
      ],
      home_link_text: 'Retour à l’accueil',
    },
    crisis_section: { heading: 'En cas de crise', contacts: [] },
  },
  de: {
    page_title: 'Ein hoffnungsvoller Anfang',
    page_subtitle: 'Fünf kurze Schritte, wenn du keine Hoffnung mehr hast.',
    steps: [
      { key: 'welcome', label: 'Willkommen' },
      { key: 'word', label: 'Ein Wort für dich' },
      { key: 'prayer', label: 'Gebet' },
      { key: 'devotional', label: 'Andacht' },
      { key: 'next-steps', label: 'Wie es weitergeht' },
    ],
    welcome_section: {
      title: 'Dein hoffnungsvoller Anfang',
      body: 'Keine Hoffnung mehr zu haben, ist schwer. Danke, dass du hier bist.\nEs gibt fünf kurze Schritte. Geh zum nächsten weiter, wenn du so weit bist.',
      expectations_title: 'Was dich erwartet:',
      expectations: [
        'Eine kurze, ermutigende Videobotschaft (auf Englisch)',
        'Ein Gebet zum Mitbeten',
        'Eine kurze Andacht darüber, was die Bibel über Hoffnung sagt',
        'Wege, wie du mehr Unterstützung bekommst',
      ],
      button_text: 'Weiter',
    },
    word_section: {
      title: 'Ein Wort für dich',
      description:
        'Vor allem anderen möchten wir, dass du das hörst. Das Video ist auf Englisch.',
      video_embed_url: VIDEO,
      previous_button_text: 'Zurück',
      next_button_text: 'Weiter',
    },
    prayer_section: {
      title: 'Ein Gebet zum Mitbeten',
      description:
        'Lies jeden Schritt langsam. Bete die Worte mit, oder lies sie nur.',
      steps: [
        {
          title: 'Still werden',
          text: 'Sei einen Moment ganz still. Lass die Schultern sinken und atme langsam.',
        },
        {
          title: 'Wahrnehmen',
          text: 'Benenne, was du gerade fühlst, zum Beispiel Traurigkeit, Angst oder Müdigkeit. Atme langsam ein.',
        },
        {
          title: 'Loslassen',
          text: 'Herr, ich gebe dir meine Angst, meinen Schmerz und meine Sorgen. Du sagst, ich darf meine Lasten bei dir abladen. Hier sind sie.',
        },
        {
          title: 'Empfangen',
          text: 'Ich empfange deinen Frieden, der höher ist als alle Vernunft. Ich empfange deine Liebe, die niemals aufhört. Ich empfange die Hoffnung, dass du alles zu meinem Besten wendest.',
        },
        {
          title: 'Ruhen',
          text: 'Ich ruhe in dir, Herr. Gerade geht es mir nicht gut, und trotzdem bist du bei mir. In Jesu Namen. Amen.',
        },
      ],
      back_button_text: 'Zurück',
      next_button_text: 'Weiter',
      final_button_text: 'Weiter zur Andacht',
    },
    devotional_section: {
      title: 'Was ist Hoffnung?',
      subtitle: 'Eine kurze Andacht über Hoffnung.',
      content_cards: [
        'In der Bibel bedeutet Hoffnung, Gott zu vertrauen, dass er seine Versprechen hält, auch wenn du noch nicht siehst, wie.',
        'Hebräer 6,19 nennt die Hoffnung einen Anker der Seele. Im Sturm hält der Anker das Boot fest, damit es nicht abtreibt, bis der Sturm vorüber ist.',
      ],
      good_news_title: 'Die gute Nachricht',
      good_news_body:
        'Gott liebt dich so, wie du bist, und diese Liebe hängt nicht davon ab, was du getan hast. Er hat seinen Sohn Jesus gesandt, damit er bei dir ist, auch an deinen dunkelsten Tagen. Du kannst heute mit ihm reden.',
      reflection_title: 'Denk darüber nach:',
      reflection_prompt:
        'Was würde sich ändern, wenn du auch nur ein bisschen glauben würdest, dass morgen anders sein kann?',
      previous_button_text: 'Zurück',
      next_button_text: 'Weiter',
    },
    next_steps_section: {
      title: 'Dein nächster Schritt',
      description:
        'Du hast alle fünf Schritte geschafft. Hier findest du Wege, wie es weitergeht.',
      actions: [
        {
          title: 'Jemanden bitten, für dich zu beten',
          href: '/prayers',
          icon: 'heart',
        },
        {
          title: 'Daily Hope per E-Mail bekommen',
          href: '/daily-hope',
          icon: 'mail',
        },
        {
          title: 'Mit Hope AI reden',
          href: '/hope-ai',
          icon: 'message-square',
        },
        {
          title: 'Einen HopeCast hören (auf Englisch oder Filipino)',
          href: '/hopecasts',
          icon: 'headphones',
        },
      ],
      home_link_text: 'Zurück zur Startseite',
    },
    crisis_section: { heading: 'Wenn du in einer Krise bist', contacts: [] },
  },
  es: {
    page_title: 'Un comienzo con esperanza',
    page_subtitle:
      'Cinco pasos cortos para cuando sientes que ya no hay esperanza.',
    steps: [
      { key: 'welcome', label: 'Para empezar' },
      { key: 'word', label: 'Una palabra para ti' },
      { key: 'prayer', label: 'Oración guiada' },
      { key: 'devotional', label: 'Devocional' },
      { key: 'next-steps', label: 'Próximos pasos' },
    ],
    welcome_section: {
      title: 'Empecemos con esperanza',
      body: 'Sentir que no hay esperanza es muy duro. Gracias por estar aquí.\nSon cinco pasos cortos. Pasa al siguiente cuando quieras, a tu ritmo.',
      expectations_title: 'Lo que vas a encontrar:',
      expectations: [
        'Un video corto con un mensaje de ánimo (en inglés)',
        'Una oración guiada',
        'Una lectura corta sobre lo que dice la Biblia de la esperanza',
        'Formas de recibir más apoyo',
      ],
      button_text: 'Continuar',
    },
    word_section: {
      title: 'Una palabra para ti',
      description:
        'Antes que nada, queremos que escuches esto. El video está en inglés.',
      video_embed_url: VIDEO,
      previous_button_text: 'Atrás',
      next_button_text: 'Continuar',
    },
    prayer_section: {
      title: 'Oración guiada',
      description:
        'Lee cada paso despacio. Ora con estas palabras o solo léelas.',
      steps: [
        {
          title: 'Quédate en calma',
          text: 'Tómate un momento de quietud. Relaja los hombros y respira despacio.',
        },
        {
          title: 'Reconoce',
          text: 'Ponle nombre a lo que sientes, como tristeza, miedo o cansancio. Inhala despacio.',
        },
        {
          title: 'Entrega',
          text: 'Señor, te entrego mi miedo, mi dolor y mi preocupación. Tú me pides que eche mis cargas sobre ti, así que aquí están.',
        },
        {
          title: 'Recibe',
          text: 'Recibo tu paz, que sobrepasa todo entendimiento. Recibo tu amor, que nunca falla. Recibo la esperanza de que tú haces que todas las cosas obren para mi bien.',
        },
        {
          title: 'Descansa',
          text: 'Descanso en ti, Señor. Ahora mismo las cosas no están bien, y aun así tú estás conmigo. En el nombre de Jesús. Amén.',
        },
      ],
      back_button_text: 'Atrás',
      next_button_text: 'Siguiente',
      final_button_text: 'Continuar al devocional',
    },
    devotional_section: {
      title: '¿Qué es la esperanza?',
      subtitle: 'Una lectura corta sobre la esperanza.',
      content_cards: [
        'En la Biblia, la esperanza es confiar en que Dios cumplirá sus promesas, aunque todavía no veas cómo.',
        'Hebreos 6:19 dice que la esperanza es como un ancla para el alma. En medio de la tormenta, el ancla sostiene el barco para que no se lo lleve la corriente, hasta que pase la tormenta.',
      ],
      good_news_title: 'La buena noticia',
      good_news_body:
        'Dios te ama tal como eres, y ese amor no depende de lo que hayas hecho. Envió a su Hijo, Jesús, para estar contigo, incluso en tus días más oscuros. Puedes hablar con él hoy mismo.',
      reflection_title: 'Piensa en esto:',
      reflection_prompt:
        '¿Qué cambiaría si creyeras, aunque sea un poco, que mañana puede ser diferente?',
      previous_button_text: 'Atrás',
      next_button_text: 'Continuar',
    },
    next_steps_section: {
      title: 'Tu próximo paso',
      description:
        'Terminaste los cinco pasos. Aquí tienes formas de seguir adelante.',
      actions: [
        { title: 'Pedir que oren por ti', href: '/prayers', icon: 'heart' },
        {
          title: 'Recibir Daily Hope por correo',
          href: '/daily-hope',
          icon: 'mail',
        },
        {
          title: 'Hablar con Hope AI',
          href: '/hope-ai',
          icon: 'message-square',
        },
        {
          title: 'Escuchar un HopeCast (en inglés o en filipino)',
          href: '/hopecasts',
          icon: 'headphones',
        },
      ],
      home_link_text: 'Volver al inicio',
    },
    crisis_section: { heading: 'Si estás en crisis', contacts: [] },
  },
  ko: {
    page_title: '희망의 첫걸음',
    page_subtitle: '희망이 보이지 않을 때를 위한 짧은 다섯 단계예요.',
    steps: [
      { key: 'welcome', label: '시작하며' },
      { key: 'word', label: '들려주고 싶은 말씀' },
      { key: 'prayer', label: '따라 하는 기도' },
      { key: 'devotional', label: '묵상' },
      { key: 'next-steps', label: '다음 단계' },
    ],
    welcome_section: {
      title: '희망의 첫걸음에 오신 걸 환영해요',
      body: '희망이 없다고 느껴질 때는 정말 힘들어요. 여기까지 와 주셔서 고마워요.\n짧은 단계가 다섯 개 있어요. 준비되면 언제든 다음 단계로 넘어가세요.',
      expectations_title: '이렇게 진행돼요',
      expectations: [
        '짧은 격려 영상 (영어)',
        '따라 하는 기도',
        '성경이 말하는 소망에 대한 짧은 글',
        '더 많은 도움을 받을 수 있는 방법',
      ],
      button_text: '계속하기',
    },
    word_section: {
      title: '들려주고 싶은 말씀',
      description:
        '무엇보다 먼저 이 이야기를 들려주고 싶어요. 영상은 영어로 되어 있어요.',
      video_embed_url: VIDEO,
      previous_button_text: '이전',
      next_button_text: '계속하기',
    },
    prayer_section: {
      title: '따라 하는 기도',
      description:
        '한 단계씩 천천히 읽어 보세요. 이 말로 기도해도 되고, 읽기만 해도 괜찮아요.',
      steps: [
        {
          title: '가만히 있기',
          text: '잠시 가만히 있어 보세요. 어깨에 힘을 빼고 천천히 숨을 쉬어 보세요.',
        },
        {
          title: '인정하기',
          text: '지금 느끼는 감정에 이름을 붙여 보세요. 슬픔, 두려움, 피곤함 같은 것들이요. 천천히 숨을 들이쉬어 보세요.',
        },
        {
          title: '내려놓기',
          text: '주님, 제 두려움과 아픔과 걱정을 주님께 드려요. 무거운 짐을 주님께 맡기라고 하셨으니, 여기 다 맡겨 드려요.',
        },
        {
          title: '받아들이기',
          text: '모든 지각에 뛰어난 주님의 평안을 받아요. 변함없는 주님의 사랑을 받아요. 주님이 저를 위해 모든 일을 합력하여 선을 이루게 하신다는 소망을 받아요.',
        },
        {
          title: '쉬기',
          text: '주님 안에서 쉬어요. 지금은 괜찮지 않지만, 주님이 저와 함께 계세요. 예수님 이름으로 기도드려요. 아멘.',
        },
      ],
      back_button_text: '이전',
      next_button_text: '다음',
      final_button_text: '묵상으로 넘어가기',
    },
    devotional_section: {
      title: '소망이란 뭘까요?',
      subtitle: '소망에 대한 짧은 글이에요.',
      content_cards: [
        '성경에서 소망은 하나님이 약속을 지키실 거라고 믿는 거예요. 아직 어떻게 될지 보이지 않을 때에도요.',
        '히브리서 6:19에서는 소망을 영혼의 닻이라고 불러요. 폭풍이 지나갈 때까지 닻은 배가 떠내려가지 않게 꼭 붙잡아 줘요.',
      ],
      good_news_title: '기쁜 소식',
      good_news_body:
        '하나님은 지금 모습 그대로 우리를 사랑하세요. 그 사랑은 우리가 무엇을 했는지에 달려 있지 않아요. 하나님은 아들 예수님을 보내셔서 가장 어두운 날에도 우리와 함께하게 하셨어요. 오늘 바로 하나님께 이야기할 수 있어요.',
      reflection_title: '생각해 보세요',
      reflection_prompt:
        '내일은 다를 수 있다고 조금이라도 믿는다면, 무엇이 달라질까요?',
      previous_button_text: '이전',
      next_button_text: '계속하기',
    },
    next_steps_section: {
      title: '다음 걸음',
      description:
        '다섯 단계를 모두 마쳤어요. 계속 나아갈 수 있는 방법들이에요.',
      actions: [
        { title: '기도 부탁하기', href: '/prayers', icon: 'heart' },
        {
          title: 'Daily Hope 이메일 받기',
          href: '/daily-hope',
          icon: 'mail',
        },
        {
          title: 'Hope AI와 이야기하기',
          href: '/hope-ai',
          icon: 'message-square',
        },
        {
          title: 'HopeCast 듣기 (영어 또는 필리핀어)',
          href: '/hopecasts',
          icon: 'headphones',
        },
      ],
      home_link_text: '홈으로 돌아가기',
    },
    crisis_section: { heading: '위기 상황이라면', contacts: [] },
  },
};

/**
 * A verse in a language, only ever from the checked Bible text in
 * verses.ts. Empty while verses.ts doesn't have that verse in that
 * language yet; the page then leaves the verse out.
 */
function verseIn(
  key: string,
  lang: IntlLang
): Pick<JourneyWordSection, VerseFields> {
  const verses = VERSES as Record<
    string,
    Partial<Record<Lang, { reference: string; text: string }>>
  >;
  const verse = verses[key]?.[lang];
  return {
    verse_text: verse?.text ?? '',
    verse_reference: verse?.reference ?? '',
  };
}

/**
 * The page in French, German, Spanish or Korean, with the same verses as
 * the English: Psalm 147:3 and Hebrews 6:19.
 */
export function getIntlJourneyPageContent(lang: IntlLang): JourneyPageContent {
  const content = structuredClone(INTL_JOURNEY_PAGE_CONTENT[lang]);
  return {
    ...content,
    word_section: { ...content.word_section, ...verseIn('psa-147-3', lang) },
    devotional_section: {
      ...content.devotional_section,
      ...verseIn('heb-6-19', lang),
    },
  };
}

export function legacyToJourneyPageContent(
  legacy: LegacyJourneyContent
): JourneyPageContent {
  return normalizeJourneyPageContent({
    ...getDefaultJourneyPageContent(),
    id: legacy.id,
    word_section: {
      ...DEFAULT_JOURNEY_PAGE_CONTENT.word_section,
      title: legacy.title,
      description: legacy.description,
      video_embed_url: legacy.video_embed_url,
    },
    updated_at: legacy.updated_at,
  });
}

export function normalizeJourneyPageContent(
  content: Partial<JourneyPageContent> | null | undefined
): JourneyPageContent {
  const defaults = getDefaultJourneyPageContent();

  if (!content) {
    return defaults;
  }

  return {
    ...defaults,
    ...content,
    steps: content.steps?.length ? content.steps : defaults.steps,
    welcome_section: {
      ...defaults.welcome_section,
      ...content.welcome_section,
      expectations: content.welcome_section?.expectations?.length
        ? content.welcome_section.expectations
        : defaults.welcome_section.expectations,
    },
    word_section: {
      ...defaults.word_section,
      ...content.word_section,
    },
    prayer_section: {
      ...defaults.prayer_section,
      ...content.prayer_section,
      steps: content.prayer_section?.steps?.length
        ? content.prayer_section.steps
        : defaults.prayer_section.steps,
    },
    devotional_section: {
      ...defaults.devotional_section,
      ...content.devotional_section,
      content_cards: content.devotional_section?.content_cards?.length
        ? content.devotional_section.content_cards
        : defaults.devotional_section.content_cards,
    },
    next_steps_section: {
      ...defaults.next_steps_section,
      ...content.next_steps_section,
      actions: content.next_steps_section?.actions?.length
        ? content.next_steps_section.actions
        : defaults.next_steps_section.actions,
    },
    crisis_section: {
      ...defaults.crisis_section,
      ...content.crisis_section,
      contacts: content.crisis_section?.contacts?.length
        ? content.crisis_section.contacts
        : defaults.crisis_section.contacts,
    },
  };
}
