import type { IntlLang, IntlPage } from './i18n';

/**
 * What search results and browser tabs show for each core page in French,
 * German, Spanish and Korean: a title under 60 characters, a description of
 * about 150 characters saying what the reader gets, and about 5 phrases
 * people there search for. The English lines are in each page's own file.
 */
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  /** The page's short name in the breadcrumb: HopeBegins › crumb. */
  crumb: string;
}

export type IntlMetaPage = '/' | IntlPage;

/*
 * Titles leave out "HopeBegins": the root layout adds " | HopeBegins" to
 * every one, the home page's too. No e-coach or Messenger in these
 * languages: help means the free lines in the visitor's own country, on the
 * help page. Daily Hope's emails and the HopeCasts are in English, so their
 * lines say so. Korean lines are shorter: Hangul takes about twice the width
 * of a Latin letter in search results.
 */
export const INTL_META: Record<IntlMetaPage, Record<IntlLang, PageMeta>> = {
  '/': {
    fr: {
      title: 'Ça ne va pas aujourd’hui ? Soutien gratuit et prière',
      description:
        'Un soutien gratuit porté par la foi, en France et dans la francophonie, quand l’anxiété ou la solitude pèsent : outils, plan, prière. En crise : 3114.',
      keywords: [
        'HopeBegins',
        'je ne vais pas bien',
        'aide psychologique gratuite',
        'besoin de parler à quelqu’un',
        'foi et santé mentale',
      ],
      crumb: 'Accueil',
    },
    de: {
      title: 'Heute nicht okay? Kostenlose Hilfe und Gebet',
      description:
        'Kostenlose, christlich geprägte Hilfe in Deutschland, Österreich und der Schweiz bei Angst und Einsamkeit: Übungen, ein Plan, Gebet. Krise: 0800 111 0 111.',
      keywords: [
        'HopeBegins',
        'mir geht es nicht gut',
        'kostenlose Hilfe bei Angst',
        'jemanden zum Reden',
        'Glaube und psychische Gesundheit',
      ],
      crumb: 'Startseite',
    },
    es: {
      title: '¿No estás bien hoy? Apoyo gratis y oración',
      description:
        'Apoyo gratuito y basado en la fe para México y toda Latinoamérica cuando la ansiedad o la soledad pesan: herramientas, un plan, oración y ayuda en tu país.',
      keywords: [
        'HopeBegins',
        'no me siento bien',
        'ayuda psicológica gratis',
        'necesito hablar con alguien',
        'fe y salud mental',
      ],
      crumb: 'Inicio',
    },
    ko: {
      title: '오늘 괜찮지 않나요? 무료 마음 돌봄과 기도',
      description:
        'HopeBegins는 불안하고 우울하고 외로울 때 기댈 수 있는 무료 기독교 마음 돌봄이에요. 나만의 계획, 마음을 가라앉히는 도구, 기도가 있어요. 위기라면 109에 전화하세요.',
      keywords: [
        'HopeBegins',
        '마음이 힘들 때',
        '불안할 때',
        '우울할 때',
        '기독교 위로',
      ],
      crumb: '홈',
    },
  },
  '/tools': {
    fr: {
      title: 'Outils gratuits contre l’anxiété et les ruminations',
      description:
        'Pour l’anxiété, les ruminations et les jours où tout pèse : respiration lente, ancrage 5-4-3-2-1, quart d’heure des soucis, jeux, prière et Hope AI. Gratuit.',
      keywords: [
        'exercice de respiration anxiété',
        'ancrage 5-4-3-2-1',
        'arrêter de ruminer',
        'gérer son stress',
        'outils contre l’anxiété',
      ],
      crumb: 'Outils',
    },
    de: {
      title: 'Kostenlose Übungen gegen Angst, Stress und Grübeln',
      description:
        'Kostenlose Übungen bei Angst, Grübeln und an schweren Tagen: langsames Atmen, die 5-4-3-2-1-Übung, Sorgenzeit und Spiele, dazu Gebet und Hope AI.',
      keywords: [
        'Übungen gegen Angst',
        'Atemübung bei Angst',
        '5-4-3-2-1-Übung',
        'Grübeln stoppen',
        'Stress abbauen',
      ],
      crumb: 'Übungen',
    },
    es: {
      title: 'Herramientas gratis contra la ansiedad y el estrés',
      description:
        'Para la ansiedad, el pensar demasiado y los días difíciles: respiración lenta, el ejercicio 5-4-3-2-1, tiempo para preocuparte, juegos, oración y Hope AI. Gratis.',
      keywords: [
        'ejercicios de respiración para la ansiedad',
        'técnica 5-4-3-2-1',
        'cómo dejar de pensar demasiado',
        'cómo manejar el estrés',
        'herramientas para la ansiedad',
      ],
      crumb: 'Herramientas',
    },
    ko: {
      title: '불안, 스트레스, 많은 생각을 다스리는 무료 도구',
      description:
        '불안하고 생각이 멈추지 않는 날을 위한 무료 도구예요. 천천히 숨쉬기, 5-4-3-2-1 그라운딩, 걱정 시간, 게임, 그리고 기도와 Hope AI까지 있어요.',
      keywords: [
        '불안할 때 호흡법',
        '5-4-3-2-1 그라운딩',
        '생각 멈추는 법',
        '스트레스 해소법',
        '걱정 시간',
      ],
      crumb: '도구',
    },
  },
  '/check-in': {
    fr: {
      title: 'Bilan du jour : comment vas-tu aujourd’hui ?',
      description:
        'En 20 secondes, choisis ce que tu ressens et reçois une petite chose à essayer. Ton jasmin pousse à chaque retour. Gratuit, et tout reste sur ton téléphone.',
      keywords: [
        'bilan d’humeur quotidien',
        'suivi de l’humeur',
        'journal d’humeur',
        'comment je me sens',
        'check-in santé mentale',
      ],
      crumb: 'Bilan du jour',
    },
    de: {
      title: 'Täglicher Check-in: Wie geht es dir heute?',
      description:
        'In 20 Sekunden: Wähl aus, wie du dich fühlst, und bekomm eine kleine Sache zum Ausprobieren. Dein Jasmin wächst an jedem Tag, an dem du wiederkommst. Kostenlos.',
      keywords: [
        'Stimmungstagebuch',
        'Stimmung tracken',
        'Mood Tracker',
        'täglicher Check-in',
        'Wie geht es mir heute',
      ],
      crumb: 'Täglicher Check-in',
    },
    es: {
      title: 'Chequeo diario: ¿cómo estás hoy?',
      description:
        'Un chequeo de 20 segundos: elige cómo te sientes y recibe una cosa pequeña para probar. Tu jazmín crece cada día que vuelves. Gratis, y todo se queda en tu celular.',
      keywords: [
        'registro del estado de ánimo',
        'diario de emociones',
        'cómo me siento hoy',
        'seguimiento del ánimo',
        'chequeo emocional',
      ],
      crumb: 'Chequeo diario',
    },
    ko: {
      title: '오늘의 체크인: 오늘 기분은 어때요?',
      description:
        '20초면 끝나는 오늘의 체크인이에요. 지금 기분을 누르면 해 볼 작은 일 하나를 알려 드리고, 다시 올 때마다 재스민이 자라요. 무료이고, 기록은 내 휴대폰에만 남아요.',
      keywords: [
        '감정 기록',
        '기분 체크',
        '무드 트래커',
        '오늘의 기분',
        '마음 체크인',
      ],
      crumb: '오늘의 체크인',
    },
  },
  '/action-plan': {
    fr: {
      title: 'Un plan gratuit contre l’anxiété et le moral en berne',
      description:
        'Réponds à 9 questions rapides et reçois un plan gratuit, avec des outils pour t’apaiser et de petits pas pour chaque jour. Tes réponses restent sur ton téléphone.',
      keywords: [
        'plan contre l’anxiété',
        'gérer l’anxiété au quotidien',
        'plan de bien-être personnalisé',
        'aller mieux petit à petit',
        'outils pour se calmer',
      ],
      crumb: 'Ton plan',
    },
    de: {
      title: 'Kostenloser Plan bei Angst und gedrückter Stimmung',
      description:
        'Beantworte 9 kurze Fragen und bekomm deinen kostenlosen Plan: Übungen zur Beruhigung und kleine Schritte für jeden Tag. Deine Antworten bleiben auf deinem Handy.',
      keywords: [
        'Plan gegen Angst',
        'Selbsthilfe bei Angst',
        'Selbsthilfe bei Depression',
        'persönlicher Wohlfühlplan',
        'kleine Schritte aus dem Tief',
      ],
      crumb: 'Dein Plan',
    },
    es: {
      title: 'Plan gratis para la ansiedad y el ánimo bajo',
      description:
        'Responde 9 preguntas rápidas y recibe un plan personal gratis, con herramientas para calmarte y pasos pequeños para cada día. Tus respuestas se quedan en tu celular.',
      keywords: [
        'plan para la ansiedad',
        'plan de autocuidado',
        'cómo salir del ánimo bajo',
        'plan de salud mental',
        'pasos para sentirme mejor',
      ],
      crumb: 'Tu plan',
    },
    ko: {
      title: '불안하고 우울할 때, 나만의 무료 계획',
      description:
        '짧은 질문 9개에 답하면 마음을 가라앉히는 도구와 매일 해 볼 작은 걸음이 담긴 나만의 계획을 무료로 받아요. 답변은 내 휴대폰에만 남아요.',
      keywords: [
        '불안 극복 방법',
        '우울할 때 하면 좋은 것',
        '마음 건강 계획',
        '자기 돌봄 계획',
        '스트레스 관리',
      ],
      crumb: '나만의 계획',
    },
  },
  '/blog': {
    fr: {
      title: 'Histoires d’espoir : le blog de HopeBegins',
      description:
        'Le blog de HopeBegins : des histoires d’anxiété, de burn-out, de deuil et de foi, et les petites choses qui ont aidé à traverser des périodes difficiles.',
      keywords: [
        'Histoires d’espoir',
        'témoignage anxiété',
        'témoignage burn-out',
        'témoignage deuil',
        'témoignage de foi',
      ],
      crumb: 'Histoires d’espoir',
    },
    de: {
      title: 'Geschichten der Hoffnung: der Blog von HopeBegins',
      description:
        'Der Blog von HopeBegins: Geschichten über Angst, Burnout, Trauer und Glauben und die kleinen Dinge, die Menschen durch schwere Zeiten geholfen haben.',
      keywords: [
        'Geschichten der Hoffnung',
        'Erfahrungsberichte Angst',
        'Burnout Erfahrungen',
        'Trauer Erfahrungen',
        'Glaube in schweren Zeiten',
      ],
      crumb: 'Geschichten der Hoffnung',
    },
    es: {
      title: 'Historias de esperanza: el blog de HopeBegins',
      description:
        'El blog de HopeBegins: historias de ansiedad, burnout, duelo y fe, y las pequeñas cosas que ayudaron a otras personas a salir adelante en épocas difíciles.',
      keywords: [
        'Historias de esperanza',
        'testimonios de ansiedad',
        'historias de superación',
        'cómo superar un duelo',
        'fe en tiempos difíciles',
      ],
      crumb: 'Historias de esperanza',
    },
    ko: {
      title: '희망 이야기: HopeBegins 블로그',
      description:
        '불안, 번아웃, 상실, 믿음에 관한 이야기와 힘든 시기를 지나게 해 준 작은 것들을 담은 HopeBegins 블로그예요.',
      keywords: [
        '희망 이야기',
        '불안 극복 후기',
        '번아웃 극복',
        '이별 후 회복',
        '위로가 되는 이야기',
      ],
      crumb: '희망 이야기',
    },
  },
  '/help': {
    fr: {
      title: 'Lignes d’écoute gratuites : quelqu’un à qui parler',
      description:
        'Des lignes d’écoute gratuites dans ton pays, dont des numéros de prévention du suicide ouverts jour et nuit, plus Hope AI et la prière. Choisis ton pays pour voir ses numéros.',
      keywords: [
        'ligne d’écoute gratuite',
        'numéro national de prévention du suicide',
        '3114',
        'parler à quelqu’un',
        'écoute gratuite et anonyme',
      ],
      crumb: 'Lignes d’écoute',
    },
    de: {
      title: 'Kostenlose Hilfetelefone: jetzt mit jemandem reden',
      description:
        'Kostenlose Krisen- und Hilfetelefone in deinem Land, die meisten rund um die Uhr, dazu Hope AI und Gebet. Wähl dein Land, um die Nummern zu sehen.',
      keywords: [
        'TelefonSeelsorge',
        'Krisentelefon',
        'Hilfe bei Suizidgedanken',
        'jemanden zum Reden',
        'kostenlose Beratung am Telefon',
      ],
      crumb: 'Hilfetelefone',
    },
    es: {
      title: 'Líneas de ayuda gratis: alguien con quien hablar ahora',
      description:
        'Líneas de crisis y de escucha gratuitas en tu país, muchas abiertas día y noche, además de Hope AI y oración. Elige tu país para ver sus números.',
      keywords: [
        'línea de ayuda gratuita',
        'línea de prevención del suicidio',
        'necesito hablar con alguien',
        'línea de crisis',
        'apoyo emocional gratis',
      ],
      crumb: 'Líneas de ayuda',
    },
    ko: {
      title: '무료 상담 전화: 지금 이야기할 사람',
      description:
        '내가 있는 나라의 무료 위기 상담 전화와 마음 상담 전화를 모았어요. 대부분 24시간 열려 있고, Hope AI와 기도도 있어요. 나라를 고르면 번호가 보여요.',
      keywords: [
        '자살예방상담전화 109',
        '무료 상담 전화',
        '정신건강 위기상담',
        '마음 상담 전화',
        '이야기할 사람',
      ],
      crumb: '상담 전화',
    },
  },
  '/our-approach': {
    fr: {
      title: 'Notre approche',
      description:
        'Comment HopeBegins t’aide, du moment où ça ne va pas jusqu’aux mois suivants : pourquoi nous existons, nos buts, les six étapes et tous les outils gratuits.',
      keywords: [
        'HopeBegins',
        'soutien chrétien en santé mentale',
        'aide psychologique gratuite',
        'foi et santé mentale',
        'comment fonctionne HopeBegins',
      ],
      crumb: 'Notre approche',
    },
    de: {
      title: 'Unser Ansatz',
      description:
        'So hilft HopeBegins, vom Moment, in dem etwas nicht stimmt, bis Monate später: warum es uns gibt, unsere Ziele, die sechs Schritte und alle kostenlosen Angebote.',
      keywords: [
        'HopeBegins',
        'christliche Hilfe bei psychischen Problemen',
        'kostenlose Unterstützung',
        'Glaube und Psyche',
        'so hilft HopeBegins',
      ],
      crumb: 'Unser Ansatz',
    },
    es: {
      title: 'Nuestro enfoque',
      description:
        'Cómo ayuda HopeBegins, desde que algo no anda bien hasta meses después: por qué existimos, qué buscamos, los seis pasos y todas las herramientas gratis.',
      keywords: [
        'HopeBegins',
        'apoyo cristiano en salud mental',
        'ayuda emocional gratis',
        'fe y salud mental',
        'cómo funciona HopeBegins',
      ],
      crumb: 'Nuestro enfoque',
    },
    ko: {
      title: '우리의 방식',
      description:
        '무언가 잘못됐다고 느낀 순간부터 몇 달 뒤까지 HopeBegins가 돕는 방법이에요. 우리가 있는 이유, 목표, 여섯 단계, 모든 무료 도구를 소개해요.',
      keywords: [
        'HopeBegins',
        '기독교 마음 돌봄',
        '무료 마음 건강 지원',
        '신앙과 정신 건강',
        'HopeBegins 소개',
      ],
      crumb: '우리의 방식',
    },
  },
  '/privacy': {
    fr: {
      title: 'Confidentialité et vie privée',
      description:
        'Ce que HopeBegins collecte, qui peut le voir, comment nous le protégeons et quels sont tes droits. Ton plan et tes réponses restent sur ton téléphone.',
      keywords: [
        'HopeBegins confidentialité',
        'politique de confidentialité',
        'protection des données personnelles',
        'vie privée',
        'confidentialité',
      ],
      crumb: 'Confidentialité',
    },
    de: {
      title: 'Datenschutz und Vertraulichkeit',
      description:
        'Was HopeBegins sammelt, wer es sehen kann, wie wir es schützen und welche Rechte du hast. Dein Plan und deine Antworten bleiben auf deinem Handy.',
      keywords: [
        'HopeBegins Datenschutz',
        'Datenschutzerklärung',
        'Vertraulichkeit',
        'Schutz persönlicher Daten',
        'Privatsphäre',
      ],
      crumb: 'Datenschutz',
    },
    es: {
      title: 'Privacidad y confidencialidad',
      description:
        'Qué datos recoge HopeBegins, quién puede verlos, cómo los protegemos y cuáles son tus derechos. Tu plan y tus respuestas se quedan en tu celular.',
      keywords: [
        'HopeBegins privacidad',
        'aviso de privacidad',
        'política de privacidad',
        'protección de datos personales',
        'confidencialidad',
      ],
      crumb: 'Privacidad',
    },
    ko: {
      title: '개인정보와 비밀 보장',
      description:
        'HopeBegins가 무엇을 모으는지, 누가 볼 수 있는지, 어떻게 보호하는지, 당신의 권리는 무엇인지 알려 드려요. 계획과 답변은 내 휴대폰에만 남아요.',
      keywords: [
        'HopeBegins 개인정보',
        '개인정보 처리방침',
        '개인정보 보호',
        '비밀 보장',
        '개인정보 권리',
      ],
      crumb: '개인정보',
    },
  },
  '/guidelines': {
    fr: {
      title: 'Code de conduite des bénévoles',
      description:
        'Comment les bénévoles de HopeBegins prennent soin des personnes, gardent confidentiel ce qu’elles partagent et réagissent face à une crise.',
      keywords: [
        'code de conduite des bénévoles',
        'charte du bénévole',
        'Hope Carrier',
        'bénévolat de prière',
        'confidentialité',
      ],
      crumb: 'Code de conduite',
    },
    de: {
      title: 'Verhaltenskodex für Ehrenamtliche',
      description:
        'Wie Ehrenamtliche bei HopeBegins für Menschen da sind, Anvertrautes vertraulich behandeln und in einer Krise richtig reagieren.',
      keywords: [
        'Verhaltenskodex Ehrenamt',
        'Richtlinien für Ehrenamtliche',
        'Hope Carrier',
        'Gebetsdienst',
        'Schweigepflicht im Ehrenamt',
      ],
      crumb: 'Verhaltenskodex',
    },
    es: {
      title: 'Código de conducta del voluntariado',
      description:
        'Cómo el voluntariado de HopeBegins cuida a las personas, protege lo que comparten con total confidencialidad y responde ante una crisis.',
      keywords: [
        'código de conducta del voluntariado',
        'normas de voluntariado',
        'Hope Carrier',
        'voluntariado de oración',
        'confidencialidad',
      ],
      crumb: 'Código de conducta',
    },
    ko: {
      title: '봉사자 행동 지침',
      description:
        'HopeBegins 봉사자가 사람들을 어떻게 돌보는지, 나눈 이야기의 비밀을 어떻게 지키는지, 위기 상황에 어떻게 대응하는지 담았어요.',
      keywords: [
        '봉사자 행동 강령',
        '자원봉사 지침',
        'Hope Carrier',
        '중보기도 봉사',
        '비밀 보장',
      ],
      crumb: '봉사자 행동 지침',
    },
  },
  '/hope-ai': {
    fr: {
      title: 'Parle à Hope AI, à toute heure',
      description:
        'Écris à Hope AI, un assistant IA, quand tu as besoin de vider ton sac, de jour comme de nuit. Tu préfères une vraie personne ? Trouve une ligne d’écoute gratuite.',
      keywords: [
        'Hope AI',
        'parler à quelqu’un',
        'IA de soutien émotionnel',
        'chat anxiété',
        'besoin de vider mon sac',
      ],
      crumb: 'Hope AI',
    },
    de: {
      title: 'Rede mit Hope AI, jederzeit',
      description:
        'Rede mit Hope AI, einem KI-Assistenten, wenn du etwas loswerden musst, Tag und Nacht. Lieber ein echter Mensch? Finde ein kostenloses Hilfetelefon in deinem Land.',
      keywords: [
        'Hope AI',
        'mit jemandem reden',
        'KI-Chat bei Angst',
        'Sorgen loswerden',
        'jemanden zum Reden',
      ],
      crumb: 'Hope AI',
    },
    es: {
      title: 'Habla con Hope AI, a cualquier hora',
      description:
        'Escríbele a Hope AI, un asistente de IA, para desahogarte de día o de noche. ¿Prefieres a una persona real? Encuentra una línea de ayuda gratuita en tu país.',
      keywords: [
        'Hope AI',
        'hablar con alguien',
        'chat para la ansiedad',
        'IA de apoyo emocional',
        'necesito desahogarme',
      ],
      crumb: 'Hope AI',
    },
    ko: {
      title: 'Hope AI와 언제든 대화하기',
      description:
        '마음을 털어놓고 싶을 때, 밤이든 낮이든 AI 도우미 Hope AI와 이야기해 보세요. 실제 사람과 이야기하고 싶다면 무료 상담 전화도 있어요.',
      keywords: [
        'Hope AI',
        'AI 채팅',
        '이야기할 사람',
        '마음 털어놓기',
        '불안할 때 대화',
      ],
      crumb: 'Hope AI',
    },
  },
  '/prayers': {
    fr: {
      title: 'Demande à quelqu’un de prier pour toi',
      description:
        'Envoie une demande de prière et un Hope Carrier de HopeBegins priera pour toi. Partage autant ou aussi peu que tu veux.',
      keywords: [
        'demande de prière',
        'demande de prière en ligne',
        'sujet de prière',
        'prière pour l’anxiété',
        'quelqu’un pour prier pour moi',
      ],
      crumb: 'Demandes de prière',
    },
    de: {
      title: 'Bitte jemanden, für dich zu beten',
      description:
        'Schick ein Gebetsanliegen, und ein Hope Carrier von HopeBegins betet für dich. Teil so viel oder so wenig, wie du möchtest.',
      keywords: [
        'Gebetsanliegen',
        'Gebetsanliegen online',
        'bitte bete für mich',
        'Gebet bei Angst',
        'Fürbitte',
      ],
      crumb: 'Gebetsanliegen',
    },
    es: {
      title: 'Pide que alguien ore por ti',
      description:
        'Envía una petición de oración y un Hope Carrier de HopeBegins orará por ti. Comparte tanto o tan poco como quieras.',
      keywords: [
        'petición de oración',
        'oren por mí',
        'pedir oración en línea',
        'oración para la ansiedad',
        'motivos de oración',
      ],
      crumb: 'Peticiones de oración',
    },
    ko: {
      title: '누군가에게 기도를 부탁하세요',
      description:
        '기도 제목을 보내면 HopeBegins의 Hope Carrier가 당신을 위해 기도해요. 나누고 싶은 만큼만 나눠 주세요.',
      keywords: [
        '기도 부탁',
        '기도 제목',
        '중보기도 요청',
        '불안할 때 기도',
        '온라인 기도 요청',
      ],
      crumb: '기도 부탁',
    },
  },
  '/get-started': {
    fr: {
      title: 'Cinq petites étapes quand tu perds espoir',
      description:
        'Tu perds espoir ? Suis cinq petites étapes : un mot d’accueil, une parole pour toi, une prière guidée, une méditation biblique et ce que tu peux faire ensuite.',
      keywords: [
        'perdre espoir',
        'que faire quand on perd espoir',
        'prière guidée',
        'méditation biblique',
        'encouragement chrétien',
      ],
      crumb: 'Cinq petites étapes',
    },
    de: {
      title: 'Fünf kleine Schritte, wenn dir die Hoffnung fehlt',
      description:
        'Keine Hoffnung mehr? Geh fünf kleine Schritte: ein Willkommen, ein Wort für dich, ein angeleitetes Gebet, eine Andacht und wie es weitergeht.',
      keywords: [
        'keine Hoffnung mehr',
        'was tun ohne Hoffnung',
        'Gebet in schweren Zeiten',
        'Andacht',
        'christliche Ermutigung',
      ],
      crumb: 'Fünf kleine Schritte',
    },
    es: {
      title: 'Cinco pasos cortos para cuando pierdes la esperanza',
      description:
        '¿Sientes que perdiste la esperanza? Da cinco pasos cortos: una bienvenida, una palabra para ti, una oración guiada, un devocional y lo que sigue.',
      keywords: [
        'perdí la esperanza',
        'qué hacer cuando no hay esperanza',
        'oración guiada',
        'devocional',
        'palabras de aliento cristianas',
      ],
      crumb: 'Cinco pasos',
    },
    ko: {
      title: '희망이 보이지 않을 때, 다섯 걸음',
      description:
        '희망이 보이지 않나요? 환영 인사, 당신을 위한 말씀, 함께 드리는 기도, 묵상, 그리고 다음 걸음까지 다섯 걸음을 천천히 걸어 보세요.',
      keywords: [
        '희망이 없을 때',
        '절망할 때',
        '기도문',
        '묵상',
        '위로의 말씀',
      ],
      crumb: '다섯 걸음',
    },
  },
  '/daily-hope': {
    fr: {
      title: 'Daily Hope : 21 jours d’encouragement par e-mail',
      description:
        'Un court e-mail encourageant chaque jour pendant 21 jours, quand l’anxiété, la tristesse ou la fatigue pèsent. Gratuit.',
      keywords: [
        'Daily Hope',
        'encouragement quotidien',
        'encouragement chrétien par e-mail',
        'pensée chrétienne du jour',
        '21 jours d’espoir',
      ],
      crumb: 'Daily Hope',
    },
    de: {
      title: 'Daily Hope: 21 Tage Ermutigung per E-Mail',
      description:
        '21 Tage lang jeden Tag eine kurze, ermutigende E-Mail, wenn Angst, Traurigkeit oder Müdigkeit dich runterziehen. Kostenlos.',
      keywords: [
        'Daily Hope',
        'tägliche Ermutigung',
        'Andacht per E-Mail',
        'Mut machende Worte',
        '21 Tage Hoffnung',
      ],
      crumb: 'Daily Hope',
    },
    es: {
      title: 'Daily Hope: 21 días de ánimo por correo',
      description:
        'Un correo corto y alentador cada día durante 21 días, para cuando la ansiedad, la tristeza o el cansancio pesan. Gratis.',
      keywords: [
        'Daily Hope',
        'mensajes de ánimo diarios',
        'devocional por correo',
        'palabras de aliento',
        '21 días de esperanza',
      ],
      crumb: 'Daily Hope',
    },
    ko: {
      title: 'Daily Hope: 21일 동안 받는 격려 메일',
      description:
        '불안하거나 우울하거나 지칠 때, 21일 동안 매일 짧은 격려 메일을 받아 보세요. 무료예요. 메일은 영어로 보내 드려요.',
      keywords: [
        'Daily Hope',
        '매일 격려 메시지',
        '묵상 메일',
        '위로의 말',
        '21일 희망',
      ],
      crumb: 'Daily Hope',
    },
  },
  '/hopecasts': {
    fr: {
      title: 'HopeCasts : écoute des messages d’espoir',
      description:
        'Écoute les HopeCasts, de courts messages audio sur l’anxiété, la guérison, la famille, le deuil et la foi, quand tu as besoin d’entendre de l’espoir. En anglais.',
      keywords: [
        'HopeCasts',
        'messages d’espoir',
        'podcast chrétien',
        'podcast sur l’anxiété',
        'message d’encouragement',
      ],
      crumb: 'HopeCasts',
    },
    de: {
      title: 'HopeCasts: Botschaften der Hoffnung hören',
      description:
        'Hör HopeCasts, kurze Audiobotschaften über Angst, Heilung, Familie, Trauer und Glauben, wann immer du Hoffnung brauchst. Auf Englisch.',
      keywords: [
        'HopeCasts',
        'Botschaften der Hoffnung',
        'christlicher Podcast',
        'Podcast gegen Angst',
        'Ermutigung zum Hören',
      ],
      crumb: 'HopeCasts',
    },
    es: {
      title: 'HopeCasts: escucha mensajes de esperanza',
      description:
        'Escucha HopeCasts, mensajes cortos en audio sobre ansiedad, heridas que sanan, familia, duelo y fe, cuando necesites oír esperanza. En inglés.',
      keywords: [
        'HopeCasts',
        'mensajes de esperanza',
        'podcast cristiano',
        'podcast para la ansiedad',
        'mensajes de ánimo',
      ],
      crumb: 'HopeCasts',
    },
    ko: {
      title: 'HopeCasts: 희망의 메시지 듣기',
      description:
        '불안, 치유, 가족, 상실, 믿음에 관한 짧은 오디오 메시지 HopeCasts를 들어 보세요. 희망이 필요할 때 언제든요. 영어로 되어 있어요.',
      keywords: [
        'HopeCasts',
        '희망의 메시지',
        '기독교 팟캐스트',
        '불안 팟캐스트',
        '위로의 말씀 듣기',
      ],
      crumb: 'HopeCasts',
    },
  },
  '/give-hope': {
    fr: {
      title: 'Donner de l’espoir : faire un don ou devenir bénévole',
      description:
        'Fais un don, ou offre ton cœur et ton temps comme Hope Carrier, pour que HopeBegins reste gratuit pour la prochaine personne anxieuse, triste ou seule.',
      keywords: [
        'faire un don',
        'don à une association chrétienne',
        'soutenir la santé mentale',
        'bénévolat de prière',
        'Hope Carrier',
      ],
      crumb: 'Faire un don',
    },
    de: {
      title: 'Hoffnung schenken: spenden oder mithelfen',
      description:
        'Spende oder schenk dein Herz und deine Zeit als Hope Carrier, damit HopeBegins kostenlos bleibt für den nächsten Menschen, der Angst hat, traurig oder einsam ist.',
      keywords: [
        'spenden',
        'christliche Organisation unterstützen',
        'psychische Gesundheit unterstützen',
        'Ehrenamt Gebet',
        'Hope Carrier',
      ],
      crumb: 'Spenden',
    },
    es: {
      title: 'Da esperanza: dona o haz voluntariado',
      description:
        'Dona, o regala tu corazón y tu tiempo como Hope Carrier, para que HopeBegins siga siendo gratis para la próxima persona que sienta ansiedad, tristeza o soledad.',
      keywords: [
        'donar',
        'donar a una organización cristiana',
        'apoyar la salud mental',
        'voluntariado de oración',
        'Hope Carrier',
      ],
      crumb: 'Donar',
    },
    ko: {
      title: '희망 나누기: 후원 또는 봉사',
      description:
        '후원하거나, Hope Carrier로 마음과 시간을 나눠 주세요. 불안하고 우울하고 외로운 다음 사람에게도 HopeBegins가 계속 무료로 남을 수 있어요.',
      keywords: [
        '후원하기',
        '기독교 단체 후원',
        '정신 건강 후원',
        '중보기도 봉사',
        'Hope Carrier',
      ],
      crumb: '후원하기',
    },
  },
  '/laro-muna': {
    fr: {
      title: 'Une pause jeu : petits jeux pour une tête trop pleine',
      description:
        'Des petits jeux gratuits quand tes pensées tournent en boucle : trouve les paires, fais voler un cerf-volant ou fais le trajet jusqu’à la mer. Sans inscription.',
      keywords: [
        'jeux anti-stress',
        'jeux contre l’anxiété',
        'jeux relaxants gratuits',
        'arrêter de ruminer',
        'jeux sans inscription',
      ],
      crumb: 'Une pause jeu',
    },
    de: {
      title: 'Kurz spielen: kleine Spiele für einen vollen Kopf',
      description:
        'Kostenlose kurze Spiele, wenn deine Gedanken kreisen: Paare finden, einen Drachen steigen lassen oder die Fahrt bis ans Meer schaffen. Ohne Anmeldung.',
      keywords: [
        'Spiele gegen Stress',
        'Spiele bei Angst',
        'beruhigende Spiele',
        'Gedankenkarussell stoppen',
        'Spiele ohne Anmeldung',
      ],
      crumb: 'Kurz spielen',
    },
    es: {
      title: 'Un rato de juego: juegos cortos para una mente llena',
      description:
        'Juegos cortos y gratis para cuando tus pensamientos no paran: encuentra las parejas, vuela una cometa o cumple pequeñas misiones hasta llegar al mar. Sin registrarte.',
      keywords: [
        'juegos para la ansiedad',
        'juegos antiestrés',
        'juegos relajantes gratis',
        'dejar de pensar demasiado',
        'juegos sin registro',
      ],
      crumb: 'Un rato de juego',
    },
    ko: {
      title: '잠깐 놀이: 머리가 복잡할 때 하는 짧은 게임',
      description:
        '생각이 멈추지 않을 때 하는 무료 짧은 게임이에요. 짝 맞추기, 연날리기, 바다까지 가는 여행길이 있어요. 가입 없이 바로 할 수 있어요.',
      keywords: [
        '스트레스 해소 게임',
        '불안할 때 하는 게임',
        '힐링 게임',
        '생각 멈추기',
        '가입 없는 게임',
      ],
      crumb: '잠깐 놀이',
    },
  },
};
