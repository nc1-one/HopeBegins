import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { VERSES } from '@/lib/blog/verses';

// The values section's verse, in the page's language, from the checked Bible
// text: never typed here.
const verse = (lang: 'en' | 'fr' | 'de' | 'es' | 'ko') => ({
  quote: VERSES['gal-5-13'][lang].text,
  reference: VERSES['gal-5-13'][lang].reference,
});

const h2Class =
  'font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const h3Class =
  'font-playfair text-xl md:text-2xl text-[#6E5F47] leading-[1.05] tracking-[-0.03em]';
const listClass = 'list-disc pl-5 space-y-1';

const EMAIL = 'connect@hopebegins.today';

/** A heading, the line before a list, the list, and a closing line. */
interface ListBlock {
  heading: string;
  intro: string;
  items: string[];
  outro?: string;
}

interface GuidelinesCopy {
  title: string;
  subtitle: string;
  mission: { heading: string; text: string[] };
  values: {
    heading: string;
    intro: string;
    faith: {
      heading: string;
      text: string;
      /** Galatians 5:13, from VERSES (src/lib/blog/verses.ts). */
      verse: { quote: string; reference: string };
      after: string;
    };
    compassion: ListBlock;
    integrity: ListBlock;
    humility: { heading: string; text: string };
  };
  conduct: {
    heading: string;
    intro: string;
    respect: ListBlock;
    confidentiality: ListBlock;
    boundaries: ListBlock;
    communication: {
      heading: string;
      text: string;
      avoid: string;
      items: string[];
    };
  };
  digital: ListBlock;
  growth: ListBlock;
  reliability: ListBlock;
  social: ListBlock;
  safety: {
    heading: string;
    intro: string;
    signs: string[];
    then: string;
    actions: string[];
    outro: string;
  };
  accountability: ListBlock;
  commitment: ListBlock;
  /** The words before and after the email address. */
  questions: { before: string; after: string };
}

/*
 * The volunteers' code of conduct. In French, German, Spanish and Korean
 * there are no e-coaches, so "e-coaching" becomes the free lines HopeBegins
 * points people to.
 */
const copy: PerLangNoTl<GuidelinesCopy> = {
  en: {
    title: 'Volunteer code of conduct',
    subtitle: 'For every HopeBegins volunteer. Last updated March 2026.',
    mission: {
      heading: '1. Our mission',
      text: [
        'HopeBegins gives free, faith-driven support to people dealing with anxiety, depression and hopelessness, through prayer, self-help tools and e-coaching.',
        'As a volunteer, you represent HopeBegins. Serve with compassion, humility, integrity and faithfulness when you help people who may be dealing with anxiety, discouragement or a loss of purpose.',
      ],
    },
    values: {
      heading: '2. Core values for every volunteer',
      intro: 'Every HopeBegins volunteer commits to the following values:',
      faith: {
        heading: 'Faith-centered service',
        text: 'We honor God in the way we serve others.',
        verse: verse('en'),
        after:
          'Our encouragement, guidance, and interactions should reflect biblical wisdom, grace, and truth.',
      },
      compassion: {
        heading: 'Compassion before correction',
        intro: 'Many people we serve are hurting. Volunteers must:',
        items: [
          'Listen first',
          'Respond with empathy',
          'Avoid judgment or condemnation',
        ],
        outro: 'Never pressure or shame anyone.',
      },
      integrity: {
        heading: 'Integrity and honesty',
        intro:
          'Volunteers must represent HopeBegins truthfully and ethically. You should:',
        items: [
          'Speak honestly',
          'Avoid exaggerating claims',
          'Respect confidentiality',
          'Maintain moral and ethical conduct',
        ],
      },
      humility: {
        heading: 'Humility in service',
        text: 'Serve quietly and support others, so people see Christ in how you treat them.',
      },
    },
    conduct: {
      heading: '3. Volunteer conduct expectations',
      intro: 'All volunteers agree to the following behavioral standards.',
      respect: {
        heading: 'Respect and dignity',
        intro: 'Treat everyone with respect regardless of:',
        items: ['Background', 'Struggles', 'Beliefs', 'Personal history'],
        outro: 'We serve people with patience, grace, and dignity.',
      },
      confidentiality: {
        heading: 'Confidentiality',
        intro:
          'Many participants may share personal struggles including anxiety, depression, or life challenges. Volunteers must:',
        items: [
          'Keep personal information confidential',
          'Never share private stories without permission',
          'Avoid discussing participant situations outside approved ministry contexts',
        ],
        outro: 'Confidentiality protects trust and emotional safety.',
      },
      boundaries: {
        heading: 'Healthy boundaries',
        intro:
          'Volunteers must maintain appropriate relational boundaries. This includes:',
        items: [
          'Avoiding dependency or emotional over-involvement',
          'Not presenting yourself as a therapist',
          'Not giving medical or psychological diagnoses',
          'Directing individuals to professional help when necessary',
        ],
        outro:
          'HopeBegins volunteers encourage and guide, but do not replace professional care.',
      },
      communication: {
        heading: 'Safe communication',
        text: 'All communication should be respectful, encouraging and free from manipulation or coercion.',
        avoid: 'Volunteers must avoid:',
        items: [
          'Harassment',
          'Discrimination',
          'Spiritual manipulation',
          'Romantic or inappropriate relationships with participants',
        ],
      },
    },
    digital: {
      heading: '4. Digital and AI responsibility',
      intro:
        'HopeBegins uses technology and AI tools to support coaching and encouragement. Volunteers must:',
      items: [
        'Use digital tools responsibly',
        'Never misuse personal data',
        'Avoid generating misleading or harmful AI content',
        'Respect the privacy of all users',
      ],
      outro: 'Never use these tools to exploit anyone.',
    },
    growth: {
      heading: '5. Commitment to spiritual growth',
      intro:
        'HopeBegins volunteers are encouraged to maintain a healthy spiritual life. This includes:',
      items: [
        'Personal prayer',
        'Reading Scripture',
        'Being accountable in a Christian community',
        'Continuing to grow in character and faith',
      ],
    },
    reliability: {
      heading: '6. Professionalism and reliability',
      intro:
        'Volunteers must demonstrate commitment and responsibility. This includes:',
      items: [
        'Showing up on time',
        'Following program guidelines',
        'Completing assigned responsibilities',
        'Communicating clearly with team leaders',
      ],
    },
    social: {
      heading: '7. Social media guidelines',
      intro:
        'Volunteers represent HopeBegins both online and offline. Please ensure that:',
      items: [
        'Social media posts reflect Christian values',
        'Personal opinions are not presented as official HopeBegins statements',
        'Confidential information is never shared online',
      ],
    },
    safety: {
      heading: '8. Safety and crisis awareness',
      intro: 'If a participant expresses:',
      signs: [
        'suicidal thoughts',
        'self-harm',
        'danger to themselves or others',
      ],
      then: 'Volunteers must:',
      actions: [
        'Stay calm and compassionate',
        'Immediately escalate the concern to a HopeBegins leader',
        'Encourage the person to seek professional help',
      ],
      outro:
        'Volunteers should never attempt to manage crisis situations alone.',
    },
    accountability: {
      heading: '9. Accountability',
      intro: 'Volunteers who violate this code of conduct may face:',
      items: [
        'Warning or corrective coaching',
        'Temporary suspension from volunteering',
        'Removal from the HopeBegins volunteer team',
      ],
    },
    commitment: {
      heading: '10. Volunteer commitment',
      intro: 'By volunteering with HopeBegins, I commit to:',
      items: [
        'Serve with humility and compassion',
        'Uphold Christian values in my conduct',
        'Protect the confidentiality of participants',
        'Maintain healthy boundaries',
        'Support the mission of restoring hope',
      ],
      outro:
        'I understand that serving with HopeBegins is both a privilege and a responsibility.',
    },
    questions: { before: 'Questions about this code? Email ', after: '.' },
  },
  fr: {
    title: 'Code de conduite des bénévoles',
    subtitle:
      'Pour chaque bénévole de HopeBegins. Dernière mise à jour : mars 2026.',
    mission: {
      heading: '1. Notre mission',
      text: [
        'HopeBegins offre un soutien gratuit, porté par la foi, aux personnes qui traversent l’anxiété, la dépression ou le désespoir, à travers la prière, des outils pour s’aider soi-même et des lignes d’écoute pour parler à quelqu’un.',
        'En tant que bénévole, tu représentes HopeBegins. Sers avec compassion, humilité, intégrité et fidélité quand tu aides des personnes qui traversent peut-être l’anxiété, le découragement ou une perte de sens.',
      ],
    },
    values: {
      heading: '2. Les valeurs de chaque bénévole',
      intro: 'Chaque bénévole de HopeBegins s’engage à vivre ces valeurs :',
      faith: {
        heading: 'Un service centré sur la foi',
        text: 'Nous honorons Dieu par notre manière de servir les autres.',
        verse: verse('fr'),
        after:
          'Nos encouragements, nos conseils et nos échanges doivent refléter la sagesse, la grâce et la vérité de la Bible.',
      },
      compassion: {
        heading: 'La compassion avant la correction',
        intro:
          'Beaucoup de personnes que nous servons souffrent. Les bénévoles doivent :',
        items: [
          'Écouter d’abord',
          'Répondre avec empathie',
          'Éviter de juger ou de condamner',
        ],
        outro:
          'Ne fais jamais pression sur personne et ne fais honte à personne.',
      },
      integrity: {
        heading: 'Intégrité et honnêteté',
        intro:
          'Les bénévoles doivent représenter HopeBegins avec honnêteté et dans le respect de l’éthique. Tu dois :',
        items: [
          'Parler avec honnêteté',
          'Éviter les affirmations exagérées',
          'Respecter la confidentialité',
          'Garder une conduite morale et éthique',
        ],
      },
      humility: {
        heading: 'L’humilité dans le service',
        text: 'Sers avec discrétion et soutiens les autres, pour que les gens voient le Christ dans ta façon de les traiter.',
      },
    },
    conduct: {
      heading: '3. Ce que nous attendons des bénévoles',
      intro: 'Chaque bénévole accepte les règles de conduite suivantes.',
      respect: {
        heading: 'Respect et dignité',
        intro: 'Traite chaque personne avec respect, quelles que soient :',
        items: [
          'Ses origines',
          'Ses difficultés',
          'Ses croyances',
          'Son histoire personnelle',
        ],
        outro: 'Nous servons les autres avec patience, grâce et dignité.',
      },
      confidentiality: {
        heading: 'Confidentialité',
        intro:
          'Beaucoup de personnes que nous accompagnons peuvent confier des difficultés personnelles, comme l’anxiété, la dépression ou les épreuves de la vie. Les bénévoles doivent :',
        items: [
          'Garder les informations personnelles confidentielles',
          'Ne jamais partager une histoire personnelle sans permission',
          'Ne pas parler de la situation d’une personne en dehors des cadres prévus par le ministère',
        ],
        outro:
          'La confidentialité protège la confiance et la sécurité émotionnelle.',
      },
      boundaries: {
        heading: 'Des limites saines',
        intro:
          'Les bénévoles doivent garder des limites relationnelles appropriées. Cela comprend :',
        items: [
          'Éviter la dépendance ou un engagement émotionnel excessif',
          'Ne pas se présenter comme thérapeute',
          'Ne pas poser de diagnostic médical ou psychologique',
          'Orienter les personnes vers une aide professionnelle quand c’est nécessaire',
        ],
        outro:
          'Les bénévoles de HopeBegins encouragent et guident, mais ne remplacent pas un suivi professionnel.',
      },
      communication: {
        heading: 'Une communication sécurisante',
        text: 'Toute communication doit être respectueuse, encourageante, sans manipulation ni contrainte.',
        avoid: 'Les bénévoles doivent éviter :',
        items: [
          'Le harcèlement',
          'La discrimination',
          'La manipulation spirituelle',
          'Les relations amoureuses ou inappropriées avec les personnes accompagnées',
        ],
      },
    },
    digital: {
      heading: '4. Responsabilité face au numérique et à l’IA',
      intro:
        'HopeBegins utilise la technologie et des outils d’IA pour accompagner et encourager les personnes. Les bénévoles doivent :',
      items: [
        'Utiliser les outils numériques de façon responsable',
        'Ne jamais faire un mauvais usage des données personnelles',
        'Ne pas produire de contenu IA trompeur ou nuisible',
        'Respecter la vie privée de chaque personne',
      ],
      outro: 'N’utilise jamais ces outils pour exploiter quelqu’un.',
    },
    growth: {
      heading: '5. S’engager à grandir dans la foi',
      intro:
        'Nous encourageons les bénévoles de HopeBegins à garder une vie spirituelle saine. Cela comprend :',
      items: [
        'La prière personnelle',
        'La lecture de la Bible',
        'Rendre des comptes au sein d’une communauté chrétienne',
        'Continuer à grandir dans son caractère et dans sa foi',
      ],
    },
    reliability: {
      heading: '6. Professionnalisme et fiabilité',
      intro:
        'Les bénévoles doivent faire preuve d’engagement et de sens des responsabilités. Cela comprend :',
      items: [
        'Être à l’heure',
        'Suivre les consignes du programme',
        'Accomplir les tâches confiées',
        'Communiquer clairement avec les responsables d’équipe',
      ],
    },
    social: {
      heading: '7. Règles pour les réseaux sociaux',
      intro:
        'Les bénévoles représentent HopeBegins en ligne comme hors ligne. Veille à ce que :',
      items: [
        'Tes publications sur les réseaux sociaux reflètent les valeurs chrétiennes',
        'Tes opinions personnelles ne soient pas présentées comme des positions officielles de HopeBegins',
        'Aucune information confidentielle ne soit jamais partagée en ligne',
      ],
    },
    safety: {
      heading: '8. Sécurité et situations de crise',
      intro: 'Si une personne évoque :',
      signs: [
        'des pensées suicidaires',
        'de l’automutilation',
        'un danger pour elle-même ou pour les autres',
      ],
      then: 'Les bénévoles doivent :',
      actions: [
        'Garder son calme et sa compassion',
        'Signaler immédiatement la situation à une personne responsable de HopeBegins',
        'Encourager la personne à chercher une aide professionnelle',
      ],
      outro:
        'Les bénévoles ne doivent jamais essayer de gérer une crise sans aide.',
    },
    accountability: {
      heading: '9. Responsabilité',
      intro: 'Le non-respect de ce code de conduite peut entraîner :',
      items: [
        'Un avertissement ou un accompagnement pour corriger la situation',
        'Une suspension temporaire du bénévolat',
        'Un retrait de l’équipe de bénévoles de HopeBegins',
      ],
    },
    commitment: {
      heading: '10. Mon engagement',
      intro: 'En étant bénévole chez HopeBegins, je m’engage à :',
      items: [
        'Servir avec humilité et compassion',
        'Honorer les valeurs chrétiennes par ma conduite',
        'Protéger la confidentialité des personnes accompagnées',
        'Garder des limites saines',
        'Soutenir la mission de redonner espoir',
      ],
      outro:
        'Je comprends que servir avec HopeBegins est à la fois un privilège et une responsabilité.',
    },
    questions: {
      before: 'Des questions sur ce code ? Écris à ',
      after: '.',
    },
  },
  de: {
    title: 'Verhaltenskodex für Ehrenamtliche',
    subtitle:
      'Für alle Ehrenamtlichen bei HopeBegins. Zuletzt aktualisiert im März 2026.',
    mission: {
      heading: '1. Unser Auftrag',
      text: [
        'HopeBegins bietet Menschen, die mit Angst, Depression oder Hoffnungslosigkeit kämpfen, kostenlose Unterstützung aus dem Glauben heraus: durch Gebet, Übungen zur Selbsthilfe und Telefonnummern, unter denen jemand kostenlos zuhört.',
        'Mit deinem Ehrenamt vertrittst du HopeBegins. Diene mit Mitgefühl, Demut, Integrität und Treue, wenn du Menschen hilfst, die vielleicht mit Angst, Entmutigung oder dem Verlust von Sinn kämpfen.',
      ],
    },
    values: {
      heading: '2. Grundwerte für alle Ehrenamtlichen',
      intro:
        'Alle Ehrenamtlichen bei HopeBegins verpflichten sich zu diesen Werten:',
      faith: {
        heading: 'Ein Dienst mit dem Glauben im Mittelpunkt',
        text: 'Wir ehren Gott durch die Art, wie wir anderen dienen.',
        verse: verse('de'),
        after:
          'Unsere Ermutigung, unsere Begleitung und unser Umgang mit anderen sollen biblische Weisheit, Gnade und Wahrheit widerspiegeln.',
      },
      compassion: {
        heading: 'Mitgefühl vor Zurechtweisung',
        intro:
          'Viele Menschen, für die wir da sind, leiden. Ehrenamtliche müssen:',
        items: [
          'Zuerst zuhören',
          'Mit Einfühlungsvermögen antworten',
          'Nicht urteilen oder verurteilen',
        ],
        outro: 'Setz nie jemanden unter Druck und beschäme niemanden.',
      },
      integrity: {
        heading: 'Integrität und Ehrlichkeit',
        intro:
          'Ehrenamtliche müssen HopeBegins wahrheitsgemäß und ethisch vertreten. Das heißt für dich:',
        items: [
          'Ehrlich sprechen',
          'Keine übertriebenen Behauptungen aufstellen',
          'Vertraulichkeit wahren',
          'Sich moralisch und ethisch verhalten',
        ],
      },
      humility: {
        heading: 'Demut im Dienst',
        text: 'Diene still und unterstütze andere, damit Menschen in deinem Umgang mit ihnen Christus sehen.',
      },
    },
    conduct: {
      heading: '3. Was wir von Ehrenamtlichen erwarten',
      intro: 'Alle Ehrenamtlichen stimmen diesen Verhaltensregeln zu.',
      respect: {
        heading: 'Respekt und Würde',
        intro: 'Begegne allen mit Respekt, unabhängig von:',
        items: [
          'Herkunft',
          'Schwierigkeiten',
          'Überzeugungen',
          'Lebensgeschichte',
        ],
        outro: 'Wir dienen Menschen mit Geduld, Gnade und Würde.',
      },
      confidentiality: {
        heading: 'Vertraulichkeit',
        intro:
          'Viele Menschen, die sich an uns wenden, erzählen vielleicht von persönlichen Kämpfen wie Angst, Depression oder schweren Lebenslagen. Ehrenamtliche müssen:',
        items: [
          'Persönliche Informationen vertraulich behandeln',
          'Private Geschichten nie ohne Erlaubnis weitergeben',
          'Über die Situation von Menschen, die wir begleiten, nicht außerhalb des vorgesehenen Rahmens unseres Dienstes sprechen',
        ],
        outro: 'Vertraulichkeit schützt Vertrauen und emotionale Sicherheit.',
      },
      boundaries: {
        heading: 'Gesunde Grenzen',
        intro:
          'Ehrenamtliche müssen angemessene Grenzen in Beziehungen wahren. Dazu gehört:',
        items: [
          'Abhängigkeit und zu starke emotionale Verstrickung vermeiden',
          'Sich nicht als therapeutische Fachkraft ausgeben',
          'Keine medizinischen oder psychologischen Diagnosen stellen',
          'Menschen bei Bedarf an professionelle Hilfe verweisen',
        ],
        outro:
          'Ehrenamtliche bei HopeBegins ermutigen und begleiten, ersetzen aber keine professionelle Behandlung.',
      },
      communication: {
        heading: 'Sichere Kommunikation',
        text: 'Jede Kommunikation sollte respektvoll und ermutigend sein, frei von Manipulation und Zwang.',
        avoid: 'Ehrenamtliche müssen Folgendes vermeiden:',
        items: [
          'Belästigung',
          'Diskriminierung',
          'Geistliche Manipulation',
          'Romantische oder unangemessene Beziehungen zu Menschen, die wir begleiten',
        ],
      },
    },
    digital: {
      heading: '4. Verantwortung bei digitalen Tools und KI',
      intro:
        'HopeBegins nutzt Technik und KI-Tools, um Menschen zu begleiten und zu ermutigen. Ehrenamtliche müssen:',
      items: [
        'Digitale Tools verantwortungsvoll nutzen',
        'Persönliche Daten nie missbrauchen',
        'Keine irreführenden oder schädlichen KI-Inhalte erzeugen',
        'Die Privatsphäre aller Menschen respektieren, die HopeBegins nutzen',
      ],
      outro: 'Nutze diese Tools nie, um jemanden auszunutzen.',
    },
    growth: {
      heading: '5. Verpflichtung zu geistlichem Wachstum',
      intro:
        'Wir ermutigen Ehrenamtliche bei HopeBegins, ein gesundes geistliches Leben zu pflegen. Dazu gehört:',
      items: [
        'Persönliches Gebet',
        'Bibellesen',
        'Verbindlich in einer christlichen Gemeinschaft leben',
        'Im Charakter und im Glauben weiter wachsen',
      ],
    },
    reliability: {
      heading: '6. Professionalität und Verlässlichkeit',
      intro:
        'Ehrenamtliche müssen Engagement und Verantwortungsbewusstsein zeigen. Dazu gehört:',
      items: [
        'Pünktlich sein',
        'Die Richtlinien des Programms befolgen',
        'Übertragene Aufgaben erledigen',
        'Klar mit der Teamleitung kommunizieren',
      ],
    },
    social: {
      heading: '7. Regeln für soziale Medien',
      intro:
        'Ehrenamtliche vertreten HopeBegins online wie offline. Bitte achte darauf, dass:',
      items: [
        'Beiträge in sozialen Medien christliche Werte widerspiegeln',
        'Persönliche Meinungen nicht als offizielle Aussagen von HopeBegins erscheinen',
        'Vertrauliche Informationen nie online geteilt werden',
      ],
    },
    safety: {
      heading: '8. Sicherheit und Umgang mit Krisen',
      intro: 'Wenn jemand Folgendes äußert:',
      signs: [
        'Suizidgedanken',
        'Selbstverletzung',
        'Gefahr für sich selbst oder andere',
      ],
      then: 'Ehrenamtliche müssen:',
      actions: [
        'Ruhig und mitfühlend bleiben',
        'Die Sorge sofort an die Leitung von HopeBegins weitergeben',
        'Die Person ermutigen, sich professionelle Hilfe zu suchen',
      ],
      outro:
        'Ehrenamtliche sollten nie versuchen, eine Krise allein zu bewältigen.',
    },
    accountability: {
      heading: '9. Verantwortlichkeit',
      intro:
        'Wer gegen diesen Verhaltenskodex verstößt, muss mit Folgendem rechnen:',
      items: [
        'Eine Verwarnung oder ein korrigierendes Gespräch',
        'Ein vorübergehender Ausschluss vom Ehrenamt',
        'Der Ausschluss aus dem Ehrenamtsteam von HopeBegins',
      ],
    },
    commitment: {
      heading: '10. Mein Versprechen im Ehrenamt',
      intro: 'Mit meinem Ehrenamt bei HopeBegins verpflichte ich mich:',
      items: [
        'Mit Demut und Mitgefühl zu dienen',
        'Christliche Werte in meinem Verhalten zu leben',
        'Die Vertraulichkeit der Menschen zu schützen, die wir begleiten',
        'Gesunde Grenzen zu wahren',
        'Die Mission zu unterstützen, Menschen neue Hoffnung zu geben',
      ],
      outro:
        'Mir ist bewusst, dass der Dienst bei HopeBegins ein Privileg und eine Verantwortung zugleich ist.',
    },
    questions: { before: 'Fragen zu diesem Kodex? Schreib an ', after: '.' },
  },
  es: {
    title: 'Código de conducta del voluntariado',
    subtitle:
      'Para cada persona voluntaria de HopeBegins. Última actualización: marzo de 2026.',
    mission: {
      heading: '1. Nuestra misión',
      text: [
        'HopeBegins ofrece apoyo gratuito, inspirado en la fe, a personas que enfrentan ansiedad, depresión o desesperanza, por medio de la oración, herramientas de autoayuda y líneas de ayuda para hablar con alguien.',
        'Como parte del voluntariado, representas a HopeBegins. Sirve con compasión, humildad, integridad y fidelidad cuando ayudes a personas que quizá estén enfrentando ansiedad, desánimo o una pérdida de propósito.',
      ],
    },
    values: {
      heading: '2. Valores esenciales del voluntariado',
      intro:
        'Cada persona voluntaria de HopeBegins se compromete con estos valores:',
      faith: {
        heading: 'Un servicio centrado en la fe',
        text: 'Honramos a Dios en la forma en que servimos a los demás.',
        verse: verse('es'),
        after:
          'Nuestro ánimo, nuestra guía y nuestro trato con los demás deben reflejar la sabiduría, la gracia y la verdad de la Biblia.',
      },
      compassion: {
        heading: 'Compasión antes que corrección',
        intro:
          'Muchas de las personas a quienes servimos están sufriendo. Las personas voluntarias deben:',
        items: [
          'Escuchar primero',
          'Responder con empatía',
          'Evitar juzgar o condenar',
        ],
        outro: 'Nunca presiones ni avergüences a nadie.',
      },
      integrity: {
        heading: 'Integridad y honestidad',
        intro:
          'Las personas voluntarias deben representar a HopeBegins con verdad y ética. Debes:',
        items: [
          'Hablar con honestidad',
          'Evitar afirmaciones exageradas',
          'Respetar la confidencialidad',
          'Mantener una conducta moral y ética',
        ],
      },
      humility: {
        heading: 'Humildad al servir',
        text: 'Sirve sin buscar protagonismo y apoya a los demás, para que la gente vea a Cristo en la manera en que la tratas.',
      },
    },
    conduct: {
      heading: '3. Lo que esperamos del voluntariado',
      intro: 'Todas las personas voluntarias aceptan estas normas de conducta.',
      respect: {
        heading: 'Respeto y dignidad',
        intro: 'Trata a todas las personas con respeto, sin importar:',
        items: [
          'Su origen',
          'Sus luchas',
          'Sus creencias',
          'Su historia personal',
        ],
        outro: 'Servimos a las personas con paciencia, gracia y dignidad.',
      },
      confidentiality: {
        heading: 'Confidencialidad',
        intro:
          'Muchas personas pueden compartir luchas personales, como ansiedad, depresión o dificultades de la vida. Las personas voluntarias deben:',
        items: [
          'Mantener en confidencialidad la información personal',
          'Nunca compartir historias privadas sin permiso',
          'No hablar de la situación de las personas fuera de los espacios aprobados del ministerio',
        ],
        outro:
          'La confidencialidad protege la confianza y la seguridad emocional.',
      },
      boundaries: {
        heading: 'Límites sanos',
        intro:
          'Las personas voluntarias deben mantener límites adecuados en sus relaciones. Esto incluye:',
        items: [
          'Evitar la dependencia o involucrarse demasiado en lo emocional',
          'No presentarse como terapeuta',
          'No dar diagnósticos médicos ni psicológicos',
          'Orientar a las personas hacia ayuda profesional cuando haga falta',
        ],
        outro:
          'Las personas voluntarias de HopeBegins animan y orientan, pero no reemplazan la atención profesional.',
      },
      communication: {
        heading: 'Comunicación segura',
        text: 'Toda comunicación debe ser respetuosa, alentadora y libre de manipulación o coerción.',
        avoid: 'Las personas voluntarias deben evitar:',
        items: [
          'El acoso',
          'La discriminación',
          'La manipulación espiritual',
          'Las relaciones románticas o inapropiadas con las personas que acompañan',
        ],
      },
    },
    digital: {
      heading: '4. Responsabilidad digital y con la IA',
      intro:
        'HopeBegins usa tecnología y herramientas de IA para acompañar y animar a las personas. Las personas voluntarias deben:',
      items: [
        'Usar las herramientas digitales con responsabilidad',
        'Nunca hacer mal uso de los datos personales',
        'Evitar crear contenido con IA que sea engañoso o dañino',
        'Respetar la privacidad de todas las personas que usan HopeBegins',
      ],
      outro: 'Nunca uses estas herramientas para aprovecharte de nadie.',
    },
    growth: {
      heading: '5. Compromiso con el crecimiento espiritual',
      intro:
        'Animamos a las personas voluntarias de HopeBegins a cuidar una vida espiritual sana. Esto incluye:',
      items: [
        'La oración personal',
        'La lectura de la Biblia',
        'Rendir cuentas en una comunidad cristiana',
        'Seguir creciendo en carácter y en fe',
      ],
    },
    reliability: {
      heading: '6. Profesionalismo y confiabilidad',
      intro:
        'Las personas voluntarias deben mostrar compromiso y responsabilidad. Esto incluye:',
      items: [
        'Llegar a tiempo',
        'Seguir las pautas del programa',
        'Cumplir con las tareas asignadas',
        'Comunicarse con claridad con el liderazgo del equipo',
      ],
    },
    social: {
      heading: '7. Pautas para redes sociales',
      intro:
        'Las personas voluntarias representan a HopeBegins dentro y fuera de internet. Asegúrate de que:',
      items: [
        'Tus publicaciones en redes reflejen valores cristianos',
        'Tus opiniones personales no se presenten como declaraciones oficiales de HopeBegins',
        'La información confidencial nunca se comparta en internet',
      ],
    },
    safety: {
      heading: '8. Seguridad y atención a las crisis',
      intro: 'Si una persona habla de:',
      signs: [
        'pensamientos suicidas',
        'autolesiones',
        'peligro para sí misma o para otras personas',
      ],
      then: 'Las personas voluntarias deben:',
      actions: [
        'Mantener la calma y la compasión',
        'Informar de inmediato la situación al liderazgo de HopeBegins',
        'Animar a la persona a buscar ayuda profesional',
      ],
      outro:
        'Las personas voluntarias nunca deben intentar manejar una crisis sin ayuda.',
    },
    accountability: {
      heading: '9. Rendición de cuentas',
      intro: 'No respetar este código de conducta puede llevar a:',
      items: [
        'Una advertencia o un acompañamiento para corregir',
        'Una suspensión temporal del voluntariado',
        'La salida del equipo de voluntariado de HopeBegins',
      ],
    },
    commitment: {
      heading: '10. Mi compromiso en el voluntariado',
      intro: 'Al servir en el voluntariado de HopeBegins, me comprometo a:',
      items: [
        'Servir con humildad y compasión',
        'Vivir los valores cristianos en mi conducta',
        'Proteger la confidencialidad de las personas que acompañamos',
        'Mantener límites sanos',
        'Apoyar la misión de devolver la esperanza',
      ],
      outro:
        'Entiendo que servir en HopeBegins es un privilegio y también una responsabilidad.',
    },
    questions: {
      before: '¿Preguntas sobre este código? Escribe a ',
      after: '.',
    },
  },
  ko: {
    title: '봉사자 행동 강령',
    subtitle:
      'HopeBegins의 모든 봉사자를 위한 강령이에요. 2026년 3월에 마지막으로 업데이트했어요.',
    mission: {
      heading: '1. 우리의 사명',
      text: [
        'HopeBegins는 기도, 스스로 해 볼 수 있는 도구, 그리고 이야기를 들어 줄 상담 전화 안내를 통해, 불안과 우울, 절망감으로 힘든 사람들에게 신앙에 바탕을 둔 무료 지원을 해요.',
        '봉사자는 HopeBegins를 대표해요. 불안이나 낙심, 삶의 목적을 잃은 느낌으로 힘들어할 수 있는 사람들을 도울 때, 긍휼과 겸손, 진실함과 신실함으로 섬겨 주세요.',
      ],
    },
    values: {
      heading: '2. 모든 봉사자의 핵심 가치',
      intro: 'HopeBegins의 모든 봉사자는 다음 가치를 지키기로 약속해요:',
      faith: {
        heading: '신앙 중심의 섬김',
        text: '우리는 다른 사람을 섬기는 방식으로 하나님께 영광을 돌려요.',
        verse: verse('ko'),
        after:
          '우리의 격려와 안내, 모든 대화에는 성경의 지혜와 은혜와 진리가 담겨 있어야 해요.',
      },
      compassion: {
        heading: '바로잡기보다 긍휼이 먼저',
        intro:
          '우리가 섬기는 많은 사람이 아픔을 겪고 있어요. 봉사자는 이렇게 해야 해요:',
        items: [
          '먼저 들어 주기',
          '공감하며 답하기',
          '판단하거나 정죄하지 않기',
        ],
        outro: '누구에게도 압박을 주거나 수치심을 주지 마세요.',
      },
      integrity: {
        heading: '진실함과 정직',
        intro:
          '봉사자는 HopeBegins를 진실하고 윤리적으로 대표해야 해요. 이렇게 해 주세요:',
        items: [
          '정직하게 말하기',
          '과장해서 말하지 않기',
          '비밀 지키기',
          '도덕적이고 윤리적으로 행동하기',
        ],
      },
      humility: {
        heading: '겸손한 섬김',
        text: '드러나지 않게 섬기고 다른 사람을 도와, 사람들이 그 모습에서 그리스도를 볼 수 있게 해 주세요.',
      },
    },
    conduct: {
      heading: '3. 봉사자에게 기대하는 행동',
      intro: '모든 봉사자는 다음 행동 기준에 동의해요.',
      respect: {
        heading: '존중과 존엄',
        intro: '다음과 상관없이 모든 사람을 존중해 주세요:',
        items: ['배경', '겪고 있는 어려움', '신념', '살아온 이야기'],
        outro: '우리는 인내와 은혜로, 존엄을 지키며 사람들을 섬겨요.',
      },
      confidentiality: {
        heading: '비밀 유지',
        intro:
          '많은 참여자가 불안, 우울, 삶의 어려움 같은 개인적인 고민을 나눌 수 있어요. 봉사자는 이렇게 해야 해요:',
        items: [
          '개인정보를 비밀로 지키기',
          '허락 없이 개인적인 이야기를 절대 공유하지 않기',
          '승인된 사역 자리 밖에서 참여자의 사정을 이야기하지 않기',
        ],
        outro: '비밀 유지는 신뢰와 정서적 안전을 지켜 줘요.',
      },
      boundaries: {
        heading: '건강한 경계',
        intro:
          '봉사자는 관계에서 적절한 경계를 지켜야 해요. 여기에는 다음이 포함돼요:',
        items: [
          '의존 관계나 감정적으로 지나치게 얽히는 것을 피하기',
          '자신을 치료사로 소개하지 않기',
          '의학적·심리적 진단을 내리지 않기',
          '필요할 때 전문가의 도움을 받도록 안내하기',
        ],
        outro:
          'HopeBegins 봉사자는 격려하고 안내하지만, 전문적인 치료를 대신하지는 않아요.',
      },
      communication: {
        heading: '안전한 소통',
        text: '모든 소통은 존중과 격려를 담아야 하며, 조종이나 강요가 없어야 해요.',
        avoid: '봉사자는 다음을 하지 말아야 해요:',
        items: [
          '괴롭힘',
          '차별',
          '신앙을 이용한 조종',
          '참여자와의 연애 관계나 부적절한 관계',
        ],
      },
    },
    digital: {
      heading: '4. 디지털과 AI를 책임 있게 사용하기',
      intro:
        'HopeBegins는 사람들을 돕고 격려하기 위해 기술과 AI 도구를 사용해요. 봉사자는 이렇게 해야 해요:',
      items: [
        '디지털 도구를 책임 있게 사용하기',
        '개인정보를 절대 잘못 사용하지 않기',
        '오해를 부르거나 해로운 AI 콘텐츠를 만들지 않기',
        '모든 이용자의 사생활 존중하기',
      ],
      outro: '이 도구를 누군가를 이용하는 데 절대 쓰지 마세요.',
    },
    growth: {
      heading: '5. 영적 성장에 힘쓰기',
      intro:
        'HopeBegins 봉사자가 건강한 영적 생활을 이어 가도록 격려해요. 여기에는 다음이 포함돼요:',
      items: [
        '개인 기도',
        '성경 읽기',
        '그리스도인 공동체 안에서 서로 책임지는 관계 맺기',
        '성품과 믿음이 계속 자라기',
      ],
    },
    reliability: {
      heading: '6. 전문성과 신뢰성',
      intro:
        '봉사자는 헌신과 책임감을 보여 줘야 해요. 여기에는 다음이 포함돼요:',
      items: [
        '시간 지키기',
        '프로그램 지침 따르기',
        '맡은 일 끝까지 해내기',
        '팀 리더와 분명하게 소통하기',
      ],
    },
    social: {
      heading: '7. 소셜 미디어 지침',
      intro:
        '봉사자는 온라인과 오프라인 모두에서 HopeBegins를 대표해요. 다음을 꼭 지켜 주세요:',
      items: [
        '소셜 미디어 게시물에 그리스도인의 가치가 드러나게 하기',
        '개인 의견을 HopeBegins의 공식 입장처럼 말하지 않기',
        '비밀 정보를 온라인에 절대 올리지 않기',
      ],
    },
    safety: {
      heading: '8. 안전과 위기 대응',
      intro: '참여자가 다음과 같은 이야기를 하면:',
      signs: ['자살에 대한 생각', '자해', '자신이나 다른 사람을 해칠 위험'],
      then: '봉사자는 이렇게 해야 해요:',
      actions: [
        '침착하고 따뜻하게 대하기',
        '즉시 HopeBegins 리더에게 알리기',
        '전문가의 도움을 받도록 권하기',
      ],
      outro: '봉사자는 위기 상황을 절대 혼자 감당하려고 하면 안 돼요.',
    },
    accountability: {
      heading: '9. 책임',
      intro: '이 행동 강령을 어긴 봉사자는 다음과 같은 조치를 받을 수 있어요:',
      items: [
        '경고 또는 바로잡기 위한 지도',
        '봉사 활동 일시 중단',
        'HopeBegins 봉사팀에서 제외',
      ],
    },
    commitment: {
      heading: '10. 봉사자의 다짐',
      intro: 'HopeBegins에서 봉사하며 저는 이렇게 다짐해요:',
      items: [
        '겸손과 긍휼로 섬기기',
        '제 행동으로 그리스도인의 가치를 지키기',
        '참여자의 비밀 지키기',
        '건강한 경계 지키기',
        '희망을 되찾아 주는 사명에 함께하기',
      ],
      outro: 'HopeBegins에서 섬기는 일이 특권이자 책임이라는 것을 이해해요.',
    },
    questions: {
      before: '이 강령에 대해 궁금한 점이 있으면 ',
      after: '로 이메일을 보내 주세요.',
    },
  },
};

function List({ items }: { items: string[] }) {
  return (
    <ul className={listClass}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** A value or a standard inside a numbered section. */
function Part({ block }: { block: ListBlock }) {
  return (
    <div className="space-y-3">
      <h3 className={h3Class}>{block.heading}</h3>
      <p>{block.intro}</p>
      <List items={block.items} />
      {block.outro && <p>{block.outro}</p>}
    </div>
  );
}

/** A numbered section that is one list. */
function ListSection({ block }: { block: ListBlock }) {
  return (
    <Reveal as="section" className="space-y-4">
      <h2 className={h2Class}>{block.heading}</h2>
      <p>{block.intro}</p>
      <List items={block.items} />
      {block.outro && <p>{block.outro}</p>}
    </Reveal>
  );
}

export function Guidelines({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  const { values, conduct, safety } = t;
  const verse = values.faith.verse;

  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          <div className="mt-12 space-y-12 text-lg leading-relaxed text-[#6E5F47]">
            <section className="space-y-4">
              <h2 className={h2Class}>{t.mission.heading}</h2>
              {t.mission.text.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>{values.heading}</h2>
              <p>{values.intro}</p>

              <div className="space-y-8 pt-4">
                <div className="space-y-3">
                  <h3 className={h3Class}>{values.faith.heading}</h3>
                  <p>{values.faith.text}</p>
                  <figure>
                    <blockquote className="font-playfair text-xl md:text-2xl italic leading-[1.25] tracking-[-0.02em]">
                      {verse.quote}
                    </blockquote>
                    <figcaption className="mt-1 text-sm text-[#6E5F47]/85">
                      {verse.reference}
                    </figcaption>
                  </figure>
                  <p>{values.faith.after}</p>
                </div>

                <Part block={values.compassion} />
                <Part block={values.integrity} />

                <div className="space-y-3">
                  <h3 className={h3Class}>{values.humility.heading}</h3>
                  <p>{values.humility.text}</p>
                </div>
              </div>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>{conduct.heading}</h2>
              <p>{conduct.intro}</p>

              <div className="space-y-8 pt-4">
                <Part block={conduct.respect} />
                <Part block={conduct.confidentiality} />
                <Part block={conduct.boundaries} />

                <div className="space-y-3">
                  <h3 className={h3Class}>{conduct.communication.heading}</h3>
                  <p>{conduct.communication.text}</p>
                  <p>{conduct.communication.avoid}</p>
                  <List items={conduct.communication.items} />
                </div>
              </div>
            </Reveal>

            <ListSection block={t.digital} />
            <ListSection block={t.growth} />
            <ListSection block={t.reliability} />
            <ListSection block={t.social} />

            <Reveal
              as="section"
              className="space-y-4 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]"
            >
              <h2 className={h2Class}>{safety.heading}</h2>
              <p>{safety.intro}</p>
              <List items={safety.signs} />
              <p>{safety.then}</p>
              <List items={safety.actions} />
              <p>{safety.outro}</p>
            </Reveal>

            <ListSection block={t.accountability} />
            <ListSection block={t.commitment} />

            <p>
              {t.questions.before}
              <a
                href={`mailto:${EMAIL}`}
                className="font-bold underline underline-offset-4"
              >
                {EMAIL}
              </a>
              {t.questions.after}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
