import { VERSE_ATTRIBUTION, versesIn } from '@/lib/blog';
import type { Guide } from '../../guidePages';

/** The guides in es, each written from the English guide in `pair`. */
export const esGuides: Guide[] = [
  {
    slug: 'que-decirle-a-alguien-con-depresion',
    lang: 'es',
    pair: 'what-to-say-to-a-depressed-friend',
    metaTitle: 'Qué decirle a alguien con depresión y qué evitar',
    metaDescription:
      '¿Te preocupa alguien cercano? Qué decir, qué no decir y qué hacer si habla de no querer vivir. Palabras sencillas y prácticas para acompañar.',
    keywords: [
      'qué decirle a alguien con depresión',
      'cómo ayudar a un amigo con depresión',
      'cómo ayudar a una persona con depresión',
      'qué no decirle a una persona con depresión',
      'cómo apoyar a alguien con depresión',
    ],
    label: 'Qué decirle a alguien con depresión',
    heading: '¿Qué le digo a alguien con depresión?',
    intro:
      'Importa más estar presente que encontrar las palabras perfectas. Escucha, acompaña y vuelve a preguntar cómo está. Aquí tienes lo que ayuda y lo que conviene evitar.',
    photo: 'care',
    sections: [
      {
        title: 'Lo que puedes decir',
        sayings: [
          'Últimamente te noto con el ánimo bajo. ¿Cómo estás, de verdad?',
          'Aquí estoy. ¿Quieres hablar, o prefieres que solo te acompañe?',
          'Tómate tu tiempo. Te escucho.',
          '¿Te puedo ayudar con algo hoy, como traerte comida o llevarte a algún lado?',
          '¿Te serviría ir a terapia? Puedo ayudarte a buscar dónde.',
        ],
        paragraphs: [
          'Después, escucha más de lo que hablas. Puedes decir “Qué difícil lo que estás viviendo” sin intentar resolverlo.',
        ],
      },
      {
        title: 'Lo que conviene evitar',
        list: [
          '“Lo que te falta es orar más”. La oración puede ayudar, pero estas palabras hacen que la persona sienta que es su culpa estar mal.',
          '“Piensa positivo” o “Pon de tu parte”. La depresión no se elige.',
          '“Hay gente que está peor”. Es como decirle que no tiene derecho a estar mal.',
          'Dar muchos consejos enseguida. Primero escucha, y pregunta antes de sugerir algo.',
        ],
      },
      {
        title: 'Si habla de no querer vivir',
        safety: true,
        paragraphs: [
          'Pregúntale directamente: “¿Estás pensando en quitarte la vida?”. Preguntar no le mete la idea en la cabeza. Le muestra que quieres escuchar.',
          'Quédate con esa persona, o asegúrate de que alguien la acompañe. Llamen juntos a la línea de crisis de tu país. Si está en peligro inmediato, llama al número de emergencias de tu país.',
        ],
      },
      {
        title: 'Sigue en contacto',
        paragraphs: [
          'Un mensaje unos días después, como “Me acordé de ti. ¿Un café esta semana?”, significa mucho. Sigue invitando a esa persona, aunque te diga que no.',
          'Acompañar a alguien puede pesar mucho. Busca tú también con quién hablar: una línea de ayuda gratuita puede escucharte.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Está bien preguntarle a alguien si piensa en el suicidio?',
        a: 'Sí. Preguntarlo de forma directa y con calma no le mete la idea en la cabeza, y hablar puede ser un alivio. Si te dice que sí, quédate con esa persona y llamen juntos a la línea de crisis de tu país.',
      },
    ],
    related: ['i-feel-depressed', 'i-feel-alone'],
    sources: [
      {
        label: 'OMS: Suicidio',
        href: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
      },
      {
        label: 'OMS: Trastorno depresivo (depresión)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
  },
  {
    slug: 'versiculos-para-la-ansiedad',
    lang: 'es',
    pair: 'bible-verses-for-anxiety',
    metaTitle: 'Versículos para la ansiedad: 8 pasajes y una oración corta',
    metaDescription:
      'Versículos de la Biblia para cuando sientes ansiedad o miedo, una oración corta para orar ahora y ayuda gratuita si la preocupación no te suelta.',
    keywords: [
      'versículos para la ansiedad',
      'versículos de la Biblia para la ansiedad',
      'textos bíblicos para la ansiedad',
      'versículos sobre la preocupación',
      'oración para la ansiedad',
      'versículos para el miedo',
      'promesas de Dios para la ansiedad',
    ],
    label: 'Versículos para la ansiedad',
    heading: 'Versículos para la ansiedad',
    intro:
      'Cuando la preocupación no te suelta, estos versículos nos recuerdan que Dios está cerca. Lee uno despacio y luego suelta el aire.',
    photo: 'hope',
    sections: [
      {
        title: 'Ocho versículos para los días de ansiedad',
        verses: versesIn('es', [
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
        title: 'Una oración corta',
        paragraphs: [
          'Señor, Tú ves lo que cargo hoy. Te entrego mis preocupaciones, una por una. Calma mi corazón y mis pensamientos, y ayúdame a dar el siguiente paso, aunque sea pequeño. Gracias porque cuidas de mí. Amén.',
        ],
      },
      {
        title: 'Si la preocupación no te suelta',
        paragraphs: [
          'La oración y la Palabra de Dios ayudan, y también hablar con alguien. Si la ansiedad te acompaña casi todos los días, prueba la respiración de 2 minutos, haz un plan gratis o habla con alguien en una línea de ayuda gratuita. También puedes pedirles a nuestros Hope Carriers que oren por ti.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué dice la Biblia sobre la ansiedad?',
        a: 'Filipenses 4:6-7 nos invita a presentarle todo a Dios en oración, con gratitud, y dice que Su paz cuidará nuestro corazón y nuestros pensamientos. Y en 1 Pedro 5:7 se nos anima a dejar en Sus manos todas nuestras preocupaciones, porque Él cuida de nosotros.',
      },
    ],
    related: ['how-to-calm-anxiety', 'bible-verses-when-you-feel-down'],
    attribution: VERSE_ATTRIBUTION.es,
  },
  {
    slug: 'versiculos-para-cuando-estas-triste',
    lang: 'es',
    pair: 'bible-verses-when-you-feel-down',
    metaTitle: 'Versículos para cuando estás triste o sin esperanza',
    metaDescription:
      'Versículos para los días pesados, cuando sientes tristeza, desánimo o que todo te cansa, con una oración corta y ayuda gratuita si el peso no se va.',
    keywords: [
      'versículos para cuando estás triste',
      'versículos para la tristeza',
      'versículos de esperanza',
      'versículos de ánimo',
      'versículos para cuando no hay esperanza',
      'oración para cuando estás triste',
    ],
    label: 'Versículos para cuando estás triste',
    heading: 'Versículos para cuando estás triste',
    intro:
      'En los días pesados puede costar orar. Empieza con uno de estos versículos. Léelo despacio, todas las veces que lo necesites.',
    photo: 'morning',
    sections: [
      {
        title: 'Ocho versículos para los días pesados',
        verses: versesIn('es', [
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
        title: 'Una oración corta',
        paragraphs: [
          'Señor, hoy siento el corazón pesado. Tú estás cerca de los que tienen el corazón quebrantado: quédate cerca de mí ahora. Dame fuerzas para este día y personas que caminen conmigo. Amén.',
        ],
      },
      {
        title: 'Si el peso no se va',
        safety: true,
        paragraphs: [
          'Si casi todos los días, durante dos semanas o más, has sentido el ánimo bajo, puede ser depresión, y tiene tratamiento. Busca atención médica o psicológica, o empieza llamando a una línea de ayuda gratuita. Si estás pensando en quitarte la vida, llama ahora a la línea de crisis de tu país.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué versículo ayuda cuando estás triste?',
        a: 'Salmos 34:18 dice que el Señor está cerca de los que tienen el corazón quebrantado. Salmos 42:11 le habla con honestidad a un alma abatida y la lleva a poner su esperanza en Dios. Muchas personas también se aferran a Lamentaciones 3:22-23: las misericordias del Señor se renuevan cada mañana.',
      },
      {
        q: '¿Qué dice la Biblia cuando sientes que no hay esperanza?',
        a: 'En Salmos 42, el salmista le habla a su alma abatida y la invita a esperar en Dios. Lamentaciones 3:22-23 dice que las misericordias del Señor se renuevan cada mañana. Sentir que no hay esperanza durante semanas también puede ser una señal de depresión: habla con alguien, y si estás pensando en quitarte la vida, llama a la línea de crisis de tu país.',
      },
    ],
    related: ['i-feel-depressed', 'bible-verses-for-anxiety'],
    attribution: VERSE_ATTRIBUTION.es,
  },
];
