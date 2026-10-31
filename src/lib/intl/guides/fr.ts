import type { Guide } from '../../guidePages';
import { VERSE_ATTRIBUTION, versesIn } from '@/lib/blog';

/** The guides in fr, each written from the English guide in `pair`. */
export const frGuides: Guide[] = [
  {
    slug: 'que-dire-a-un-ami-en-depression',
    lang: 'fr',
    pair: 'what-to-say-to-a-depressed-friend',
    metaTitle: 'Que dire à un ami en dépression, et ce qu’il faut éviter',
    metaDescription:
      'Tu t’inquiètes pour un ami ? Quoi lui dire, quoi éviter, et que faire s’il parle de ne plus vouloir vivre. Des mots simples et concrets, pour aider vraiment.',
    keywords: [
      'que dire à une personne en dépression',
      'que dire à un ami en dépression',
      'comment aider un ami en dépression',
      'comment soutenir une personne en dépression',
      'ce qu’il ne faut pas dire à une personne dépressive',
      'comment aider un proche en dépression',
    ],
    label: 'Que dire à un ami en dépression',
    heading: 'Que dire à un ami en dépression ?',
    intro:
      'Les mots parfaits comptent moins que ta présence. Écoute, reste là, et reviens prendre des nouvelles. Voici ce qui aide, et ce qu’il vaut mieux éviter.',
    photo: 'care',
    sections: [
      {
        title: 'Ce que tu peux dire',
        sayings: [
          'J’ai l’impression que ça ne va pas trop en ce moment. Comment tu vas, vraiment ?',
          'Je suis là. Tu veux en parler, ou juste un peu de compagnie ?',
          'Prends ton temps. Je t’écoute.',
          'Je peux t’aider pour quelque chose aujourd’hui, comme t’apporter à manger ou t’emmener quelque part ?',
          'Ça t’aiderait d’en parler à un psy ? Je peux t’aider à en trouver un.',
        ],
        paragraphs: [
          'Ensuite, écoute plus que tu ne parles. Tu peux dire « Ça a l’air vraiment dur » sans chercher à tout régler.',
        ],
      },
      {
        title: 'Ce qu’il vaut mieux éviter',
        list: [
          '« Tu ne pries pas assez. » La prière peut aider, mais ces mots culpabilisent quelqu’un qui va déjà mal.',
          '« Pense positif » ou « Secoue-toi ». La dépression ne se choisit pas.',
          '« Il y a des gens qui vivent bien pire. » Ça laisse entendre qu’on n’a pas le droit d’avoir du mal.',
          'Une avalanche de conseils tout de suite. Écoute d’abord, et demande avant de proposer quelque chose.',
        ],
      },
      {
        title: 'Si ton ami parle de ne plus vouloir vivre',
        safety: true,
        paragraphs: [
          'Pose-lui la question directement : « Est-ce que tu penses à mettre fin à ta vie ? » Poser la question ne lui met pas l’idée en tête. Ça montre que tu es là pour l’écouter.',
          'Reste avec ton ami, ou assure-toi que quelqu’un est à ses côtés. Appelez ensemble le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7. En cas de danger immédiat, appelle le 112 (ou le 15).',
        ],
      },
      {
        title: 'Continue à prendre des nouvelles',
        paragraphs: [
          'Un message quelques jours plus tard, comme « Je pense à toi. On prend un café cette semaine ? », compte beaucoup. Continue à l’inviter, même quand la réponse est non.',
          'Aider quelqu’un peut peser lourd. Parle aussi à quelqu’un de ton côté : une ligne d’écoute gratuite peut t’écouter, toi aussi.',
        ],
      },
    ],
    faq: [
      {
        q: 'Faut-il demander à mon ami s’il pense au suicide ?',
        a: 'Oui. Poser la question directement et calmement ne lui met pas l’idée en tête, et en parler peut être un vrai soulagement. Si la réponse est oui, reste avec ton ami et appelez ensemble le 3114.',
      },
    ],
    related: ['i-feel-depressed', 'i-feel-alone'],
    sources: [
      {
        label: 'OMS : Suicide',
        href: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
      },
      {
        label: 'OMS : Trouble dépressif (dépression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
  },
  {
    slug: 'versets-bibliques-contre-l-anxiete',
    lang: 'fr',
    pair: 'bible-verses-for-anxiety',
    metaTitle: '8 versets bibliques contre l’anxiété, et une courte prière',
    metaDescription:
      'Des versets bibliques pour les moments d’anxiété, d’angoisse ou de peur, une courte prière à dire maintenant, et de l’aide gratuite si l’inquiétude reste.',
    keywords: [
      'verset biblique anxiété',
      'verset biblique contre l’angoisse',
      'que dit la Bible sur l’anxiété',
      'prière contre l’angoisse',
      'verset biblique inquiétude',
      'verset biblique peur',
      'verset biblique stress',
    ],
    label: 'Versets bibliques contre l’anxiété',
    heading: 'Versets bibliques contre l’anxiété',
    intro:
      'Quand l’inquiétude ne te lâche pas, ces versets rappellent que Dieu est proche. Lis-en un lentement, puis expire doucement.',
    photo: 'hope',
    sections: [
      {
        title: 'Huit versets pour les jours d’inquiétude',
        verses: versesIn('fr', [
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
        title: 'Une courte prière',
        paragraphs: [
          'Seigneur, Tu vois ce que je porte aujourd’hui. Je Te confie mes soucis, un par un. Apaise mon cœur et mes pensées, et aide-moi à faire le prochain petit pas. Merci de prendre soin de moi. Amen.',
        ],
      },
      {
        title: 'Si l’inquiétude ne te lâche pas',
        paragraphs: [
          'La prière et la Parole de Dieu aident, et parler à quelqu’un aussi. Si l’anxiété est là presque tous les jours, essaie la respiration de 2 minutes, fais ton propre plan, ou appelle une ligne d’écoute gratuite. Tu peux aussi demander à nos Hope Carriers de prier pour toi.',
        ],
      },
    ],
    faq: [
      {
        q: 'Que dit la Bible sur l’anxiété ?',
        a: 'En Philippiens 4:6-7, la Bible t’invite à tout présenter à Dieu dans la prière, avec reconnaissance, et promet que Sa paix veillera sur ton cœur et ton esprit. En 1 Pierre 5:7, elle t’invite à Lui remettre tous tes soucis, parce qu’Il se soucie de toi.',
      },
    ],
    related: ['how-to-calm-anxiety', 'bible-verses-when-you-feel-down'],
    attribution: VERSE_ATTRIBUTION.fr,
  },
  {
    slug: 'versets-bibliques-quand-on-est-triste',
    lang: 'fr',
    pair: 'bible-verses-when-you-feel-down',
    metaTitle: 'Versets bibliques quand on est triste ou sans espoir',
    metaDescription:
      'Des versets bibliques pour les jours de tristesse, de découragement ou de fatigue, une courte prière, et de l’aide gratuite si la tristesse ne passe pas.',
    keywords: [
      'verset biblique tristesse',
      'verset biblique quand on est triste',
      'verset biblique découragement',
      'verset biblique espoir',
      'verset biblique désespoir',
      'verset biblique dépression',
      'prière quand on est triste',
    ],
    label: 'Versets bibliques quand on est triste',
    heading: 'Versets bibliques pour les jours où ça ne va pas',
    intro:
      'Les jours où tout pèse, prier peut être difficile. Commence par l’un de ces versets. Lis-le lentement, autant de fois qu’il le faut.',
    photo: 'morning',
    sections: [
      {
        title: 'Huit versets pour les jours difficiles',
        verses: versesIn('fr', [
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
        title: 'Une courte prière',
        paragraphs: [
          'Seigneur, mon cœur est lourd aujourd’hui. Tu es proche des cœurs brisés, alors sois proche de moi maintenant. Donne-moi de la force pour cette journée, et des personnes pour m’accompagner. Amen.',
        ],
      },
      {
        title: 'Si la tristesse ne passe pas',
        safety: true,
        paragraphs: [
          'Si tu as le moral au plus bas presque tous les jours depuis deux semaines ou plus, c’est peut-être une dépression, et ça se soigne. Parles-en à un médecin ou à un psychologue, ou commence par appeler une ligne d’écoute gratuite. Si tu penses à mettre fin à ta vie, appelle le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quel verset biblique lire quand on est triste ?',
        a: 'Psaumes 34:19 rappelle que Dieu se tient près des cœurs brisés. Psaumes 42:12 parle avec franchise à une âme abattue et la tourne vers l’espérance en Dieu. Beaucoup s’accrochent aussi à Lamentations 3:22-23 : la bonté du Seigneur est nouvelle chaque matin.',
      },
      {
        q: 'Que dit la Bible quand on n’a plus d’espoir ?',
        a: 'En Psaumes 42:12, l’auteur parle à sa propre âme abattue et l’invite à espérer en Dieu. Lamentations 3:22-23 rappelle que la bonté du Seigneur est nouvelle chaque matin. Se sentir sans espoir pendant des semaines peut aussi être un signe de dépression : parles-en à quelqu’un, et si tu penses à mettre fin à ta vie, appelle le 3114.',
      },
    ],
    related: ['i-feel-depressed', 'bible-verses-for-anxiety'],
    attribution: VERSE_ATTRIBUTION.fr,
  },
];
