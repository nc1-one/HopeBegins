import type { FeelingPage } from '../../feelingPages';

/** The feeling pages in fr, each written from the English page in `pair`. */
export const frFeelingPages: FeelingPage[] = [
  {
    slug: 'marre-de-tout',
    photo: 'tired',
    lang: 'fr',
    pair: 'tired-of-everything',
    metaTitle: 'Marre de tout ? Que faire quand tu es à bout de forces',
    metaDescription:
      'Marre de tout, fatigue morale, plus la force de rien ? Essaie 2 minutes de respiration lente, appelle une ligne d’écoute gratuite ou fais ton plan.',
    keywords: [
      'j’en ai marre de tout',
      'marre de tout que faire',
      'fatigué de tout',
      'fatigue morale',
      'épuisement émotionnel',
      'épuisé moralement et physiquement',
      'toujours fatigué même après avoir dormi',
    ],
    label: 'Marre de tout',
    heading: 'J’en ai marre de tout.',
    intro:
      'Quand tu en as marre de tout, même les petites choses pèsent lourd. Commence par une petite chose, ou par deux minutes de respiration lente.',
    safetyFirst:
      'Si tu en as marre de vivre, ou si tu penses que tu préférerais ne plus être là, parles-en à quelqu’un maintenant.',
    toolsHeading: 'Commence par un petit pas',
    tools: ['one-thing', 'breathe'],
    related: ['i-feel-depressed'],
    faq: [
      {
        q: 'C’est normal d’en avoir marre de tout ?',
        a: 'Tout le monde s’épuise parfois. Mais si, depuis deux semaines ou plus, tu ressens presque chaque jour de la fatigue et un manque d’intérêt pour à peu près tout, c’est peut-être une dépression ou un burn-out. Parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Pourquoi cette fatigue ne part pas, même après du repos ?',
        a: 'La fatigue peut venir du stress, des soucis, d’un mauvais sommeil ou d’un moral en berne depuis un moment, mais aussi du corps. Si tu te sens comme ça presque tous les jours depuis deux semaines ou plus, consulte un médecin : il pourra regarder du côté du corps comme du moral.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'personne-a-qui-parler',
    photo: 'alone',
    lang: 'fr',
    pair: 'i-feel-alone',
    metaTitle: 'Solitude, personne à qui parler ? Quelqu’un peut t’écouter',
    metaDescription:
      'Personne à qui parler ? Appelle une ligne d’écoute gratuite, écris à Hope AI à toute heure, ou envoie un message à une personne de confiance.',
    keywords: [
      'je me sens seul',
      'je me sens seule',
      'personne à qui parler',
      'besoin de parler à quelqu’un',
      'parler à quelqu’un gratuitement',
      'sentiment de solitude',
      'personne ne se soucie de moi',
    ],
    label: 'Personne à qui parler',
    heading: 'Je n’ai personne à qui parler.',
    intro:
      'C’est dur quand on a l’impression que personne n’écoute. Tu peux parler à quelqu’un aujourd’hui.',
    toolsHeading: 'Un seul message',
    tools: ['message'],
    tip: {
      title: 'S’il est tard et que tu as juste envie d’écrire',
      body: 'Hope AI est un assistant IA. Il ne peut ni t’accompagner comme un thérapeute ni t’aider en cas d’urgence, mais tu peux lui écrire à toute heure, même au milieu de la nuit.',
      hopeAi: true,
    },
    faq: [
      {
        q: 'Où parler à quelqu’un gratuitement ?',
        a: 'En France, des lignes d’écoute gratuites te mettent en contact avec une vraie personne, au téléphone. En cas de crise, appelle le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7.',
      },
      {
        q: 'Que faire quand j’ai l’impression que personne ne se soucie de moi ?',
        a: 'Envoie un court message à quelqu’un, même juste « On peut se parler cette semaine ? » Si personne ne te vient à l’esprit pour l’instant, une ligne d’écoute gratuite peut t’écouter. Si tu penses à mettre fin à ta vie, appelle le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7.',
      },
    ],
    related: ['free-mental-health-help-philippines'],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'comment-calmer-son-anxiete',
    photo: 'anxious',
    lang: 'fr',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Comment calmer son anxiété tout de suite, en 2 minutes',
    metaDescription:
      'Le cœur qui s’emballe, les pensées qui tournent ? Essaie 2 minutes de respiration, l’ancrage 5-4-3-2-1 ou un petit jeu, puis fais ton plan contre l’anxiété.',
    keywords: [
      'comment calmer son anxiété',
      'calmer son anxiété rapidement',
      'comment calmer une crise d’angoisse',
      'exercice de respiration anxiété',
      'technique 5-4-3-2-1',
      'anxiété sans raison',
      'comment gérer son anxiété au quotidien',
    ],
    label: 'Calmer son anxiété',
    heading: 'Comment calmer mon anxiété ?',
    intro:
      'Quand ton cœur s’emballe et que tes pensées tournent sans arrêt, essaie l’un de ces exercices. La respiration et l’ancrage 5-4-3-2-1 aident ton corps à se calmer. Le jeu donne à ton esprit autre chose à faire.',
    toolsHeading: 'Essaie maintenant',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Pourquoi la respiration aide',
      body: 'Quand tu expires plus longtemps que tu n’inspires, ton cœur ralentit et ton corps commence à s’apaiser. Si ça t’arrive souvent, faire un plan et en parler à un psychologue peut t’aider.',
    },
    related: ['panic-attack-what-to-do', 'bible-verses-for-anxiety'],
    faq: [
      {
        q: 'Quel est le moyen le plus rapide de calmer son anxiété ?',
        a: 'Ralentis ta respiration : inspire sur 4 temps, expire sur 6, pendant environ deux minutes. Ensuite, nomme 5 choses que tu vois, 4 que tu entends et 3 que tu peux toucher, pour ramener ton esprit dans la pièce où tu es.',
      },
      {
        q: 'Pourquoi je ressens de l’anxiété sans raison ?',
        a: 'L’anxiété peut monter avec le stress, le manque de sommeil, la caféine ou des soucis que tu n’as pas encore mis en mots. Elle peut donc sembler venir de nulle part. Si ça arrive presque tous les jours, parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Qu’est-ce qui aide contre l’anxiété au quotidien ?',
        a: 'Entraîne-toi à respirer lentement quand tu es calme, pour que ça vienne facilement le moment venu. Dors suffisamment, réduis le café, et note tes soucis à une heure fixe chaque jour. Si l’anxiété gêne ton travail, tes études ou ton sommeil, consulte un médecin ou un psychologue.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'je-n-arrive-pas-a-dormir-je-pense-trop',
    photo: 'sleep',
    lang: 'fr',
    pair: 'cant-sleep-overthinking',
    metaTitle: 'Je n’arrive pas à dormir, je pense trop : que faire ce soir',
    metaDescription:
      'Il est tard et ta tête ne s’arrête pas ? Note ce qui tourne en boucle, respire lentement, et essaie ces conseils pour trouver le sommeil ce soir.',
    keywords: [
      'je n’arrive pas à dormir je pense trop',
      'je n’arrive pas à dormir',
      'trop penser la nuit',
      'comment arrêter de ruminer la nuit',
      'pensées qui tournent en boucle',
      'pourquoi je pense trop la nuit',
      'insomnie pensées envahissantes',
    ],
    label: 'Je n’arrive pas à dormir',
    heading: 'Je n’arrive pas à dormir. Je pense trop.',
    intro:
      'Il est tard et ton esprit ne s’arrête pas. Note ce qui tourne en boucle dans ta tête, puis essaie la respiration lente.',
    toolsHeading: 'D’abord, vide ta tête',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Si tu ne dors toujours pas au bout de 20 minutes environ',
      body: 'Lève-toi et fais quelque chose de calme sous une lumière douce, comme lire, jusqu’à ce que le sommeil vienne. Laisse ton téléphone de côté pour l’instant. Demain, essaie de te lever à ton heure habituelle.',
    },
    faq: [
      {
        q: 'Comment arrêter de trop penser la nuit ?',
        a: 'Note tes pensées avant de te coucher pour que ton esprit puisse les lâcher, garde ton téléphone hors de portée, et respire lentement. Si tu ne dors toujours pas au bout de 20 minutes environ, lève-toi et fais quelque chose de calme jusqu’à ce que le sommeil vienne.',
      },
      {
        q: 'Pourquoi je pense trop la nuit ?',
        a: 'En journée, le travail et les gens occupent ton esprit. La nuit, tout devient calme, alors les soucis que tu avais mis de côté reviennent. La fatigue les fait aussi paraître plus gros.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'je-deprime',
    photo: 'alone',
    lang: 'fr',
    pair: 'i-feel-depressed',
    metaTitle: 'Je déprime : que faire, et quand est-ce une dépression ?',
    metaDescription:
      'Le moral au plus bas presque tous les jours, plus de force ni d’envie ? Commence par une petite chose aujourd’hui, parle à quelqu’un, et sache quand consulter.',
    keywords: [
      'je déprime',
      'je déprime que faire',
      'je suis en dépression que faire',
      'signes de dépression',
      'déprime ou dépression',
      'je déprime sans raison',
      'je me sens déprimé',
      'je me sens déprimée',
    ],
    label: 'Je déprime',
    heading: 'Je déprime.',
    intro:
      'Quand tout pèse lourd et que plus rien ne t’intéresse, même te lever devient difficile. Tu peux commencer par une petite chose aujourd’hui, et tu peux parler à quelqu’un.',
    safetyFirst:
      'Si tu penses à mettre fin à ta vie, parles-en à quelqu’un maintenant.',
    toolsHeading: 'Commence par une petite chose',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Quand ça peut être une dépression',
      intro:
        'Tout le monde a des jours sans. Ça peut être une dépression quand, pendant deux semaines ou plus, tu te sens triste ou vide presque toute la journée, ou que tu perds l’intérêt pour ce que tu aimais, avec certains de ces signes :',
      points: [
        'dormir beaucoup plus ou beaucoup moins que d’habitude',
        'manger beaucoup plus ou beaucoup moins que d’habitude',
        'ressentir de la fatigue et un manque d’énergie',
        'avoir du mal à se concentrer ou à prendre des décisions',
        'avoir l’impression de ne rien valoir, ou se sentir coupable',
        'ne plus voir d’espoir pour l’avenir',
        'penser à la mort ou à mettre fin à sa vie',
      ],
      note: 'La dépression est fréquente, et elle se soigne. Un médecin ou un psychologue peut t’aider à comprendre ce dont tu as besoin. Si tu ne sais pas par où commencer, ton médecin traitant peut t’orienter, et tu peux appeler le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7.',
    },
    tip: {
      title: 'Pourquoi une petite chose aide',
      body: 'La dépression pousse à attendre d’aller mieux avant de faire quoi que ce soit. Faire d’abord une petite chose faisable, comme prendre une douche ou marcher un peu, remonte souvent un peu le moral, et la chose suivante devient plus facile.',
    },
    related: [
      'tired-of-everything',
      'i-feel-alone',
      'what-to-say-to-a-depressed-friend',
      'bible-verses-when-you-feel-down',
    ],
    sources: [
      {
        label: 'OMS : Trouble dépressif (dépression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Quelle différence entre la déprime et la dépression ?',
        a: 'La déprime est une baisse de moral passagère, souvent liée à une période difficile. On parle de dépression quand la tristesse ou la perte d’intérêt dure deux semaines ou plus et touche le sommeil, l’appétit, l’énergie et la concentration. La dépression se soigne.',
      },
      {
        q: 'La dépression peut-elle passer toute seule ?',
        a: 'Elle s’atténue parfois, mais on s’en sort plus vite et plus sûrement avec de l’aide. La dépression se soigne avec une psychothérapie, et parfois avec des médicaments prescrits par un médecin.',
      },
      {
        q: 'Pourquoi je déprime sans raison ?',
        a: 'La dépression n’a pas toujours une cause claire et unique. Elle peut venir du stress, d’une perte, d’un mauvais sommeil, de la santé ou de changements dans ton corps, parfois tout à la fois. Un médecin ou un psychologue peut t’aider à y voir clair, et la dépression se soigne.',
      },
      {
        q: 'Que faire si je déprime et que la solitude me pèse ?',
        a: 'Parles-en à une personne aujourd’hui, même par un court message. Si personne ne te vient à l’esprit, une ligne d’écoute gratuite peut t’écouter. Si tu penses à mettre fin à ta vie, appelle le 3114, le numéro national de prévention du suicide : gratuit, 24h/24 et 7j/7.',
      },
    ],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'crise-d-angoisse-que-faire',
    photo: 'anxious',
    lang: 'fr',
    pair: 'panic-attack-what-to-do',
    metaTitle: 'Crise d’angoisse ou de panique : que faire, étape par étape',
    metaDescription:
      'Cœur qui cogne, souffle court, peur que le pire arrive ? C’est peut-être une crise d’angoisse. Respire avec nous 2 minutes, le temps qu’elle passe.',
    keywords: [
      'crise d’angoisse que faire',
      'crise de panique que faire',
      'crise d’angoisse symptômes',
      'attaque de panique',
      'comment calmer une crise d’angoisse',
      'combien de temps dure une crise d’angoisse',
      'crise d’angoisse ou crise cardiaque',
    ],
    label: 'Crise d’angoisse',
    heading: 'Je crois que je fais une crise d’angoisse.',
    intro:
      'Une crise d’angoisse fait peur, mais elle passe, en général en 5 à 20 minutes. On respire maintenant : on inspire sur 4 temps, on expire sur 6.',
    medicalNote:
      'Si c’est la première fois, ou si tu as une douleur dans la poitrine qui s’étend au bras ou à la mâchoire, ou du mal à respirer qui ne s’améliore pas, appelle le 15 (SAMU) ou le 112, ou va aux urgences les plus proches.',
    toolsHeading: 'Respire avec nous maintenant',
    tools: ['breathe', 'ground'],
    explain: {
      title: 'Ce qu’on peut ressentir pendant une crise d’angoisse',
      intro:
        'Une peur qui monte d’un coup (on parle aussi d’attaque de panique), avec certains de ces signes :',
      points: [
        'le cœur qui bat très fort ou très vite',
        'le souffle court ou une oppression dans la poitrine',
        'des tremblements, de la transpiration, des bouffées de chaleur ou des frissons',
        'des vertiges ou l’impression qu’on va s’évanouir',
        'des fourmillements ou un engourdissement dans les mains ou le visage',
        'l’impression que quelque chose de terrible va arriver, ou de perdre le contrôle',
      ],
      note: 'Ça semble dangereux, mais une crise d’angoisse en elle-même ne fait pas de mal à ton corps, et elle passe. Si les crises reviennent souvent, ou si tu commences à éviter certains endroits à cause d’elles, parles-en à un médecin ou à un psychologue. Les crises d’angoisse se soignent.',
    },
    tip: {
      title: 'Pourquoi expirer lentement aide',
      body: 'Pendant une crise d’angoisse, tu respires vite, et ça aggrave les vertiges et les fourmillements. Expirer plus longtemps que tu n’inspires ralentit ton cœur et apaise ton corps.',
    },
    related: ['how-to-calm-anxiety'],
    sources: [
      {
        label: 'NHS : Trouble panique',
        href: 'https://www.nhs.uk/mental-health/conditions/panic-disorder/',
      },
      {
        label: 'OMS : Troubles anxieux',
        href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
      },
    ],
    faq: [
      {
        q: 'Combien de temps dure une crise d’angoisse ?',
        a: 'La plupart des crises d’angoisse durent entre 5 et 20 minutes, et le moment le plus intense arrive en général dans les premières minutes.',
      },
      {
        q: 'Une crise d’angoisse est-elle dangereuse ?',
        a: 'Une crise d’angoisse fait peur, mais elle ne fait pas de mal à ton corps. Si tu ne sais pas si c’est une crise d’angoisse ou autre chose, comme un problème cardiaque, fais-toi examiner par un médecin.',
      },
      {
        q: 'Comment arrêter une crise d’angoisse rapidement ?',
        a: 'Ralentis ta respiration, inspire sur 4 temps et expire sur 6, pose tes pieds bien à plat sur le sol, et dis-toi que c’est une crise d’angoisse et qu’elle va passer. Pour en avoir moins, entraîne-toi chaque jour à respirer ainsi et parles-en à un médecin ou à un psychologue.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'je-ne-sais-plus-ou-j-en-suis',
    photo: 'unsure',
    lang: 'fr',
    pair: 'i-feel-lost',
    metaTitle: 'Je ne sais plus où j’en suis : quand plus rien n’a de sens',
    metaDescription:
      'Plus de direction, un vide à l’intérieur ? Commence par un petit pas aujourd’hui, et parle à quelqu’un qui peut t’aider à y voir plus clair. C’est gratuit.',
    keywords: [
      'je ne sais plus où j’en suis',
      'je me sens perdu',
      'je me sens perdue dans ma vie',
      'je me sens vide',
      'sentiment de vide',
      'perdu dans la vie que faire',
      'je ne sais pas quoi faire de ma vie',
    ],
    label: 'Je ne sais plus où j’en suis',
    heading: 'Je ne sais plus où j’en suis.',
    intro:
      'Quand tu ne sais plus où va ta vie, ou que tu te sens vide à l’intérieur, c’est dur de savoir par où commencer. Tu peux commencer petit, dès aujourd’hui.',
    safetyFirst:
      'Si ce vide s’accompagne de l’idée de mettre fin à ta vie, parles-en à quelqu’un maintenant.',
    toolsHeading: 'Commence par un petit pas',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Quand demander de l’aide',
      intro:
        'Ne plus savoir où on en est, de temps en temps, fait partie de la vie, surtout dans les grands tournants : la fin des études, un nouveau travail, une rupture. Parles-en à un médecin ou à un psychologue si, depuis deux semaines ou plus :',
      points: [
        'tu te sens vide presque toute la journée',
        'tu as perdu l’intérêt pour presque tout',
        'tu dors ou tu manges beaucoup plus ou beaucoup moins',
        'tu as du mal à tenir au travail, en cours ou à la maison',
      ],
      note: 'Ce sont parfois des signes de dépression, et la dépression se soigne. Notre page sur la dépression en dit plus.',
    },
    tip: {
      title: 'Une façon de commencer',
      body: 'Note trois choses qui ont compté pour toi, même petites : une personne, un lieu, quelque chose que tu aimais faire. Choisis-en une et fais un petit pas vers elle cette semaine.',
    },
    related: ['i-feel-depressed', 'tired-of-everything'],
    sources: [
      {
        label: 'OMS : Trouble dépressif (dépression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Pourquoi je me sens vide à l’intérieur ?',
        a: 'Ce sentiment de vide peut venir du stress, de la solitude, d’une grande perte ou d’un grand changement, ou d’une dépression. S’il dure deux semaines ou plus, ou s’il s’accompagne d’une perte d’intérêt pour presque tout, parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Que faire quand je ne sais plus où j’en suis dans ma vie ?',
        a: 'Choisis un petit pas pour aujourd’hui et un autre pour demain, et dis à quelqu’un de confiance ce que tu ressens. Le prochain pas suffit pour l’instant ; le plan plus large viendra plus tard.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'burn-out',
    photo: 'tired',
    lang: 'fr',
    pair: 'burnout',
    metaTitle: 'Burn-out : signes et que faire quand le travail t’épuise',
    metaDescription:
      'Épuisement, ras-le-bol du travail, moins d’efficacité malgré tes efforts ? C’est peut-être un burn-out. Fais une vraie pause, pose une limite et fais ton plan.',
    keywords: [
      'burn out',
      'burn out symptômes',
      'burn out que faire',
      'signes du burn out',
      'épuisement professionnel',
      'burn out ou dépression',
      'je suis en burn out que faire',
    ],
    label: 'Burn-out',
    heading: 'Je suis en burn-out.',
    intro:
      'Quand le travail, les études ou le soin des autres t’ont pris toutes tes forces, le repos ne repose plus. Commence par une vraie pause aujourd’hui, même dix minutes.',
    toolsHeading: 'Arrête-toi un instant',
    tools: ['breathe', 'one-thing'],
    explain: {
      title: 'Les signes du burn-out',
      intro:
        'L’Organisation mondiale de la santé décrit le burn-out comme le résultat d’un stress chronique au travail qui n’a pas été géré avec succès. Il se manifeste en général par :',
      points: [
        'un épuisement ou un manque d’énergie la plupart du temps',
        'une prise de distance avec ton travail, ou un regard négatif et cynique sur ce travail',
        'une baisse d’efficacité, même quand tu te donnes beaucoup de mal',
      ],
      note: 'Le burn-out est lié au travail et à un stress qui dure. Si tu as aussi le moral au plus bas presque toute la journée, ou si tu as perdu l’intérêt pour ce qui se passe en dehors du travail, c’est peut-être aussi une dépression. Parles-en à un médecin ou à un psychologue.',
    },
    tip: {
      title: 'Une limite pour cette semaine',
      body: 'Choisis une chose à protéger : une vraie pause déjeuner, une heure après laquelle tu ne regardes plus tes messages, ou un jour de repos. Dis-le à quelqu’un, ce sera plus facile de t’y tenir.',
    },
    related: ['tired-of-everything', 'i-feel-depressed'],
    sources: [
      {
        label: 'OMS : le burn-out, un « phénomène lié au travail »',
        href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      },
    ],
    faq: [
      {
        q: 'Burn-out et dépression, c’est la même chose ?',
        a: 'Non. Le burn-out vient d’un stress prolongé au travail et touche surtout ton rapport au travail. La dépression touche tous les aspects de la vie. Les deux peuvent se mêler, alors si tu as le moral au plus bas presque toute la journée, parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Comment dit-on burn-out en français ?',
        a: 'On parle aussi d’épuisement professionnel : une fatigue que le repos ne répare pas, avec un ras-le-bol du travail et l’impression d’en faire de moins en moins.',
      },
    ],
    firstStep: 'plan',
  },
];
