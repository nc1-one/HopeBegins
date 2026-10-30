import type { FeelingPage } from '../../feelingPages';

/** The feeling pages in es, each written from the English page in `pair`. */
export const esFeelingPages: FeelingPage[] = [
  {
    slug: 'me-canse-de-todo',
    photo: 'tired',
    lang: 'es',
    pair: 'tired-of-everything',
    metaTitle: 'Me cansé de todo: qué hacer con el cansancio emocional',
    metaDescription:
      '¿Todo te cansa? Prueba 2 minutos de respiración, habla con alguien en una línea de ayuda gratuita o haz un plan gratis para esta semana.',
    keywords: [
      'me cansé de todo',
      'estoy cansado de todo',
      'estoy cansada de todo',
      'cansancio emocional',
      'agotamiento emocional',
      'qué hacer cuando estás cansado de todo',
      'ejercicio de respiración',
      'cansancio aunque descanse',
    ],
    label: 'Me cansé de todo',
    heading: 'Me cansé de todo.',
    intro:
      'Cuando todo te cansa, hasta lo más simple pesa. Empieza con una cosa pequeña, o con dos minutos de respiración lenta.',
    safetyFirst:
      'Si te cansaste de vivir o sientes que ya no quieres estar aquí, por favor, habla con alguien ahora.',
    toolsHeading: 'Empieza por algo pequeño',
    tools: ['one-thing', 'breathe'],
    related: ['i-feel-depressed'],
    faq: [
      {
        q: '¿Es normal cansarse de todo?',
        a: 'Todos nos agotamos de vez en cuando. Pero si durante dos semanas o más, la mayoría de los días, sientes cansancio y falta de interés en casi todo, puede ser depresión o burnout. Habla con un médico o con un psicólogo.',
      },
      {
        q: '¿Por qué siento cansancio todo el tiempo, aunque descanse?',
        a: 'El cansancio puede venir del estrés, de las preocupaciones, de dormir mal o de un ánimo bajo que ya lleva tiempo, y también del cuerpo. Si te sientes así casi todos los días durante dos semanas o más, consulta a un médico, que puede revisar las dos cosas.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'no-tengo-con-quien-hablar',
    photo: 'alone',
    lang: 'es',
    pair: 'i-feel-alone',
    metaTitle: 'No tengo con quién hablar: hoy alguien puede escucharte',
    metaDescription:
      '¿Sientes que no tienes con quién hablar? Llama gratis a una línea de ayuda, escríbele a Hope AI a cualquier hora o envía un mensaje a alguien de confianza.',
    keywords: [
      'no tengo con quién hablar',
      'me siento solo',
      'me siento sola',
      'necesito hablar con alguien',
      'hablar con alguien gratis',
      'siento que no tengo a nadie',
      'a nadie le importo',
    ],
    label: 'No tengo con quién hablar',
    heading: 'No tengo con quién hablar.',
    intro: 'Duele sentir que nadie te escucha. Hoy puedes hablar con alguien.',
    toolsHeading: 'Solo un mensaje',
    tools: ['message'],
    tip: {
      title: 'Si es tarde y solo quieres escribir',
      body: 'Hope AI es un asistente de IA. No puede darte terapia ni ayudarte en una emergencia, pero puedes escribirle a cualquier hora, incluso a mitad de la noche.',
      hopeAi: true,
    },
    faq: [
      {
        q: '¿Dónde puedo hablar con alguien gratis?',
        a: 'En muchos países hay líneas de ayuda gratuitas donde una persona real te escucha, y desde esta página puedes encontrar las de tu país. Si estás en crisis, llama a la línea de crisis de tu país.',
      },
      {
        q: '¿Qué hago si siento que a nadie le importo?',
        a: 'Envía un mensaje corto a una persona, aunque solo diga “¿Podemos hablar esta semana?”. Si ahora no se te ocurre nadie, una línea de ayuda gratuita puede escucharte. Si estás pensando en quitarte la vida, llama ahora a la línea de crisis de tu país.',
      },
    ],
    related: ['free-mental-health-help-philippines'],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'como-calmar-la-ansiedad',
    photo: 'anxious',
    lang: 'es',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Cómo calmar la ansiedad ahora: un ejercicio de 2 minutos',
    metaDescription:
      '¿Se te acelera el corazón y tu mente no se calma? Prueba 2 minutos de respiración, el ejercicio 5-4-3-2-1 o un juego rápido, y luego haz un plan gratis.',
    keywords: [
      'cómo calmar la ansiedad',
      'cómo calmar la ansiedad rápido',
      'ejercicios de respiración para la ansiedad',
      'técnica 5-4-3-2-1',
      'cómo controlar la ansiedad',
      'cómo bajar la ansiedad',
      'cómo manejar la ansiedad todos los días',
    ],
    label: 'Cómo calmar la ansiedad',
    heading: '¿Cómo puedo calmar mi ansiedad?',
    intro:
      'Cuando el corazón se te acelera y tu mente no se calma, prueba una de estas opciones. La respiración y el 5-4-3-2-1 ayudan a tu cuerpo a recuperar la calma. El juego le da a tu mente otra cosa en qué ocuparse.',
    toolsHeading: 'Prueba esto ahora',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Por qué ayuda la respiración',
      body: 'Cuando sueltas el aire durante más tiempo del que tardas en tomarlo, el corazón late más despacio y el cuerpo empieza a calmarse. Si esto te pasa con frecuencia, te puede ayudar tener un plan y hablar con un psicólogo.',
    },
    related: ['panic-attack-what-to-do', 'bible-verses-for-anxiety'],
    faq: [
      {
        q: '¿Cuál es la forma más rápida de calmar la ansiedad?',
        a: 'Respira más despacio: inhala en 4 tiempos y exhala en 6, durante unos dos minutos. Después nombra 5 cosas que puedes ver, 4 que puedes oír y 3 que puedes tocar, para que tu mente vuelva al lugar donde estás.',
      },
      {
        q: '¿Por qué siento ansiedad sin motivo?',
        a: 'La ansiedad se puede ir acumulando por el estrés, por dormir mal, por la cafeína o por preocupaciones que todavía no has puesto en palabras, y por eso parece salir de la nada. Si te pasa casi todos los días, habla con un médico o con un psicólogo.',
      },
      {
        q: '¿Qué ayuda con la ansiedad en el día a día?',
        a: 'Practica la respiración lenta cuando estés en calma, así te saldrá fácil cuando la necesites. Duerme lo suficiente, toma menos café y escribe tus preocupaciones a una hora fija cada día. Si la ansiedad interfiere con tu trabajo, tus estudios o tu sueño, consulta a un médico o a un psicólogo.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'no-puedo-dormir-por-pensar-mucho',
    photo: 'sleep',
    lang: 'es',
    pair: 'cant-sleep-overthinking',
    metaTitle: 'No puedo dormir por pensar mucho: qué hacer esta noche',
    metaDescription:
      '¿Es tarde y tu mente no se detiene? Escribe lo que estás pensando, respira despacio y prueba estas formas de conciliar el sueño esta noche.',
    keywords: [
      'no puedo dormir por pensar mucho',
      'no puedo dormir de tanto pensar',
      'pienso mucho en la noche',
      'cómo dejar de pensar para dormir',
      'cómo dejar de sobrepensar',
      'pensamientos acelerados en la noche',
      'por qué pienso más en la noche',
    ],
    label: 'No puedo dormir por pensar mucho',
    heading: 'No puedo dormir. No dejo de pensar.',
    intro:
      'Es tarde y tu mente no se detiene. Escribe lo que te da vueltas en la cabeza y después prueba la respiración lenta.',
    toolsHeading: 'Primero, sácalo de tu cabeza',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Si después de unos 20 minutos sigues sin dormir',
      body: 'Levántate y haz algo tranquilo con poca luz, como leer, hasta que te dé sueño. Por ahora, deja el celular lejos. Mañana, intenta levantarte a la hora de siempre.',
    },
    faq: [
      {
        q: '¿Cómo dejo de pensar tanto en la noche?',
        a: 'Antes de acostarte, escribe lo que piensas para que tu mente pueda soltarlo, deja el celular fuera de tu alcance y respira despacio. Si después de unos 20 minutos sigues sin dormir, levántate y haz algo tranquilo hasta que te dé sueño.',
      },
      {
        q: '¿Por qué pienso más en la noche?',
        a: 'Durante el día, el trabajo y la gente mantienen tu mente ocupada. En la noche todo se queda en silencio, y vuelven las preocupaciones que dejaste a un lado. Además, el cansancio las hace parecer más grandes.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'creo-que-tengo-depresion',
    photo: 'alone',
    lang: 'es',
    pair: 'i-feel-depressed',
    metaTitle: 'Creo que tengo depresión: qué hacer y cuándo pedir ayuda',
    metaDescription:
      '¿Ánimo bajo casi todos los días, sin energía ni ganas de nada? Empieza hoy con una cosa pequeña, habla con alguien y descubre cuándo ir al médico.',
    keywords: [
      'creo que tengo depresión',
      'me siento deprimido',
      'me siento deprimida',
      'síntomas de depresión',
      'cómo saber si tengo depresión',
      'qué hacer si tengo depresión',
      'ayuda para la depresión',
      'depresión sin motivo',
    ],
    label: 'Creo que tengo depresión',
    heading: 'Creo que tengo depresión.',
    intro:
      'Cuando todo pesa y nada te interesa, hasta levantarte cuesta. Hoy puedes empezar con una cosa pequeña, y puedes hablar con alguien.',
    safetyFirst:
      'Si has pensado en quitarte la vida, por favor, habla con alguien ahora.',
    toolsHeading: 'Empieza con una cosa pequeña',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Cuándo puede ser depresión',
      intro:
        'Todos tenemos días tristes. Puede ser depresión cuando, durante dos semanas o más, sientes tristeza o vacío casi todo el día, o pierdes el interés en lo que antes disfrutabas, junto con algunas de estas cosas:',
      points: [
        'dormir mucho más o mucho menos que de costumbre',
        'comer mucho más o mucho menos que de costumbre',
        'sentir cansancio y falta de energía',
        'tener problemas para concentrarte o tomar decisiones',
        'sentir que no vales nada o sentir culpa',
        'no ver esperanza en el futuro',
        'tener pensamientos de muerte o de quitarte la vida',
      ],
      note: 'La depresión es común y tiene tratamiento. Un médico, un psicólogo o un terapeuta pueden ayudarte a entender qué necesitas. Si no sabes por dónde empezar, llama a una línea de ayuda gratuita de tu país.',
    },
    tip: {
      title: 'Por qué ayuda una cosa pequeña',
      body: 'La depresión te hace esperar a sentirte mejor antes de hacer algo. Si primero haces algo pequeño que sí puedas lograr, como bañarte o caminar un rato, muchas veces el ánimo mejora un poco, y lo siguiente se vuelve más fácil.',
    },
    related: [
      'tired-of-everything',
      'i-feel-alone',
      'what-to-say-to-a-depressed-friend',
      'bible-verses-when-you-feel-down',
    ],
    sources: [
      {
        label: 'OMS: Trastorno depresivo (depresión)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: '¿Qué es la depresión?',
        a: 'Es un ánimo bajo o una pérdida de interés que dura dos semanas o más y afecta el sueño, el apetito, la energía y la forma de pensar.',
      },
      {
        q: '¿La depresión se quita sola?',
        a: 'A veces mejora, pero con ayuda la recuperación es más rápida y más probable. La depresión se trata con terapia psicológica y, a veces, con medicamentos que receta un médico.',
      },
      {
        q: '¿Por qué siento depresión sin motivo?',
        a: 'La depresión no siempre tiene una causa clara. Puede venir del estrés, de una pérdida, de dormir mal, de la salud o de cambios en el cuerpo, a veces de todo junto. Un médico o un psicólogo pueden ayudarte a entenderlo, y la depresión tiene tratamiento.',
      },
      {
        q: '¿Qué hago si tengo depresión y siento que no tengo a nadie?',
        a: 'Cuéntaselo hoy a una persona, aunque sea en un mensaje corto. Si no se te ocurre nadie, llama a una línea de ayuda gratuita de tu país. Si estás pensando en quitarte la vida, llama ahora a la línea de crisis de tu país.',
      },
    ],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'ataque-de-panico-que-hacer',
    photo: 'anxious',
    lang: 'es',
    pair: 'panic-attack-what-to-do',
    metaTitle: 'Ataque de pánico: qué hacer ahora, paso a paso',
    metaDescription:
      '¿El corazón a mil, te falta el aire y sientes que algo terrible está pasando? Puede ser un ataque de pánico. Respira con nosotros 2 minutos mientras pasa.',
    keywords: [
      'ataque de pánico qué hacer',
      'cómo controlar un ataque de pánico',
      'síntomas de un ataque de pánico',
      'respiración para ataques de pánico',
      'cómo calmar un ataque de pánico rápido',
      'crisis de pánico',
      'ataque de ansiedad',
    ],
    label: 'Ataque de pánico',
    heading: 'Creo que estoy teniendo un ataque de pánico.',
    intro:
      'Un ataque de pánico da mucho miedo, pero pasa, por lo general en 5 a 20 minutos. Respiremos ahora: inhala en 4 tiempos, exhala en 6.',
    medicalNote:
      'Si es la primera vez que te pasa, o tienes dolor en el pecho que se extiende al brazo o a la mandíbula, o te cuesta respirar y no mejora, llama al número de emergencias de tu país o ve a urgencias en el hospital más cercano.',
    toolsHeading: 'Respira con nosotros ahora',
    tools: ['breathe', 'ground'],
    explain: {
      title: 'Qué se puede sentir en un ataque de pánico',
      intro:
        'Un miedo intenso que llega de repente, con algunas de estas sensaciones:',
      points: [
        'palpitaciones o el corazón muy acelerado',
        'falta de aire o el pecho apretado',
        'temblores, sudor, o sensación de calor o de frío',
        'mareo o sensación de desmayo',
        'hormigueo o entumecimiento en las manos o la cara',
        'la sensación de que algo terrible va a pasar, o de que pierdes el control',
      ],
      note: 'Se siente peligroso, pero el ataque de pánico en sí no le hace daño a tu cuerpo, y pasa. Si los ataques se repiten, o empiezas a evitar lugares por miedo a que vuelvan, habla con un médico o con un psicólogo. Los ataques de pánico tienen tratamiento.',
    },
    tip: {
      title: 'Por qué ayuda soltar el aire despacio',
      body: 'En un ataque de pánico respiras rápido, y eso empeora el mareo y el hormigueo. Si sueltas el aire durante más tiempo del que tardas en tomarlo, el corazón se desacelera y el cuerpo se calma.',
    },
    related: ['how-to-calm-anxiety'],
    sources: [
      {
        label: 'NHS: Trastorno de pánico',
        href: 'https://www.nhs.uk/mental-health/conditions/panic-disorder/',
      },
      {
        label: 'OMS: Trastornos de ansiedad',
        href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
      },
    ],
    faq: [
      {
        q: '¿Cuánto dura un ataque de pánico?',
        a: 'La mayoría de los ataques de pánico duran entre 5 y 20 minutos, y lo más intenso suele llegar en los primeros minutos.',
      },
      {
        q: '¿Un ataque de pánico me puede hacer daño?',
        a: 'Un ataque de pánico asusta mucho, pero no le hace daño a tu cuerpo. Si tienes dudas de si es pánico o algo como un problema del corazón, ve al médico para que te revise.',
      },
      {
        q: '¿Cómo puedo detener rápido un ataque de pánico?',
        a: 'Respira más despacio, inhalando en 4 tiempos y exhalando en 6, apoya bien los pies en el piso y repítete que es un ataque de pánico y que va a pasar. Para tener menos ataques, practica la respiración todos los días y habla con un médico o con un psicólogo.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'no-se-que-hacer-con-mi-vida',
    photo: 'unsure',
    lang: 'es',
    pair: 'i-feel-lost',
    metaTitle: 'No sé qué hacer con mi vida: por dónde empezar hoy',
    metaDescription:
      '¿Sientes que no tienes rumbo o que hay un vacío dentro de ti? Da hoy un paso pequeño y habla con alguien que te ayude a ordenar lo que sientes. Gratis.',
    keywords: [
      'no sé qué hacer con mi vida',
      'me siento perdido',
      'me siento perdida',
      'siento un vacío por dentro',
      'vacío existencial',
      'sin rumbo en la vida',
      'qué hacer cuando no sabes qué hacer con tu vida',
    ],
    label: 'No sé qué hacer con mi vida',
    heading: 'No sé qué hacer con mi vida.',
    intro:
      'Cuando no sabes hacia dónde va tu vida, o sientes un vacío por dentro, cuesta saber por dónde empezar. Puedes empezar con algo pequeño, hoy.',
    safetyFirst:
      'Si ese vacío viene con pensamientos de quitarte la vida, por favor, habla con alguien ahora.',
    toolsHeading: 'Empieza por algo pequeño',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Cuándo pedir ayuda',
      intro:
        'Sentir que no tienes rumbo de vez en cuando es parte de la vida, sobre todo en los grandes cambios, como graduarte, empezar un trabajo nuevo o terminar una relación. Habla con un médico o con un psicólogo si, durante dos semanas o más:',
      points: [
        'sientes un vacío casi todo el día',
        'has perdido el interés en casi todo',
        'duermes o comes mucho más o mucho menos que antes',
        'te cuesta cumplir con el trabajo, los estudios o las cosas de la casa',
      ],
      note: 'Pueden ser señales de depresión, que tiene tratamiento. En nuestra página sobre la depresión te lo explicamos mejor.',
    },
    tip: {
      title: 'Una forma de empezar',
      body: 'Escribe tres cosas que han sido importantes para ti, aunque sean pequeñas: una persona, un lugar, algo que antes disfrutabas. Elige una y da un paso pequeño hacia ella esta semana.',
    },
    related: ['i-feel-depressed', 'tired-of-everything'],
    sources: [
      {
        label: 'OMS: Trastorno depresivo (depresión)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: '¿Por qué siento un vacío por dentro?',
        a: 'Esa sensación de vacío puede venir del estrés, de la soledad, de una pérdida o un cambio grande, o de la depresión. Si dura dos semanas o más, o viene con pérdida de interés en casi todo, habla con un médico o con un psicólogo.',
      },
      {
        q: '¿Qué hago si siento que no tengo rumbo en la vida?',
        a: 'Elige un paso pequeño para hoy y otro para mañana, y cuéntale a alguien de confianza cómo te sientes. Por ahora basta con el siguiente paso; el plan más grande puede llegar después.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'burnout-laboral',
    photo: 'tired',
    lang: 'es',
    pair: 'burnout',
    metaTitle: 'Burnout laboral: señales y qué hacer si el trabajo te agota',
    metaDescription:
      '¿Sin energía, con rechazo al trabajo y rindiendo menos aunque te esfuerces? Puede ser burnout. Descansa de verdad hoy, pon un límite y haz un plan gratis.',
    keywords: [
      'burnout laboral',
      'síndrome de burnout',
      'síntomas de burnout',
      'agotamiento laboral',
      'cómo recuperarse del burnout',
      'qué hacer con el burnout',
      'burnout en español',
    ],
    label: 'Burnout laboral',
    heading: 'Creo que tengo burnout.',
    intro:
      'Cuando el trabajo, los estudios o cuidar de otros te dejan sin fuerzas, ni el descanso se siente como descanso. Empieza hoy con una pausa de verdad, aunque sea de diez minutos.',
    toolsHeading: 'Haz una pausa',
    tools: ['breathe', 'one-thing'],
    explain: {
      title: 'Señales de burnout',
      intro:
        'La Organización Mundial de la Salud describe el burnout como el resultado de un estrés crónico en el trabajo que no se ha logrado manejar. Suele notarse así:',
      points: [
        'sentir agotamiento o falta de energía casi todo el tiempo',
        'sentir distancia de tu trabajo, o una actitud negativa y cínica hacia él',
        'rendir menos, aunque te esfuerces mucho',
      ],
      note: 'El burnout tiene que ver con el trabajo y con largos periodos de estrés. Si además sientes tristeza casi todo el día, o has perdido el interés en cosas fuera del trabajo, también puede ser depresión. Habla con un médico o con un psicólogo.',
    },
    tip: {
      title: 'Un límite para esta semana',
      body: 'Elige una cosa que vas a cuidar: un descanso de verdad para comer, una hora a partir de la cual ya no revisas mensajes, o un día libre. Cuéntaselo a alguien, así te será más fácil cumplirlo.',
    },
    related: ['tired-of-everything', 'i-feel-depressed'],
    sources: [
      {
        label: 'OMS: El burnout, un “fenómeno ocupacional”',
        href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      },
    ],
    faq: [
      {
        q: '¿El burnout es lo mismo que la depresión?',
        a: 'No. El burnout viene del estrés crónico en el trabajo y afecta sobre todo cómo te sientes con tu trabajo. La depresión afecta todas las áreas de la vida. Los dos pueden darse al mismo tiempo, así que si sientes tristeza casi todo el día, habla con un médico o con un psicólogo.',
      },
      {
        q: '¿Cómo se dice burnout en español?',
        a: 'Se le llama síndrome de desgaste profesional o síndrome del trabajador quemado, aunque mucha gente dice simplemente burnout: un cansancio que no se quita con descanso, junto con hartazgo del trabajo y un rendimiento más bajo.',
      },
    ],
    firstStep: 'plan',
  },
];
