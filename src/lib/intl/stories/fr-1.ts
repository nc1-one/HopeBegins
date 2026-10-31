import type { Story } from '../../blog/types';
import { storyPhoto } from '@/lib/photos';

/** Stories adapted for fr readers, each from the English story in `pair`. */
export const frStories1: Story[] = [
  {
    slug: 'arreter-de-ruminer-la-nuit',
    lang: 'fr',
    pair: 'stop-overthinking-at-night',
    theme: 'anxiety',
    metaTitle: 'Arrêter de ruminer la nuit : l’histoire de Manon',
    metaDescription:
      'Manon rejouait chaque conversation à une heure du matin depuis presque un an. Ce qui l’a aidée à arrêter de ruminer la nuit, et une chose à essayer ce soir.',
    title: 'Comment Manon a arrêté de ruminer la nuit',
    dek: 'Pendant presque un an, dès qu’elle éteignait la lumière, sa tête rejouait chaque conversation. Ce qui a changé est venu petit à petit, une habitude après l’autre.',
    who: 'Manon, 27 ans, support informatique à Nantes',
    photo: storyPhoto('fr', 'sleep'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le film qui repartait à 23h48',
        paragraphs: [
          'Le service de Manon au support informatique d’une entreprise nantaise finissait à 21 heures. À 23h30, elle était au lit, lumière éteinte, téléphone retourné sur la table de nuit. À 23h48, elle était parfaitement réveillée, en train de rejouer un appel de l’après-midi.',
          'Un client avait été sec avec elle. Elle avait réglé le problème, fermé le ticket et était passée à autre chose, du moins elle le croyait. Dans le noir, l’appel revenait mot pour mot, puis il grossissait. Est-ce que j’ai été désagréable ? Est-ce qu’il va se plaindre ? Est-ce que ma responsable va m’en parler lundi ? Et si c’était ça qui me faisait perdre mon poste ?',
          'À une heure du matin, elle avait répété trois conversations qui n’auraient jamais lieu et rédigé dans sa tête un mail de démission. À deux heures, elle faisait défiler des offres d’emploi. À 6h30, son réveil sonnait et elle commençait la journée déjà fatiguée.',
          '« Je n’arrive plus à dormir tellement je réfléchis », avait-elle dit un jour à sa grande sœur, à moitié pour rire. Sa sœur avait ri et répondu que tout le monde se prenait la tête. Manon avait ri aussi, et elle n’en avait plus reparlé pendant des mois.',
        ],
        pullQuote:
          'Dans le noir, l’appel revenait mot pour mot, puis il grossissait.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi on rumine plus fort la nuit',
        paragraphs: [
          'La journée occupe l’esprit. Il y a les tickets, les messages, les collègues, le bruit. La nuit, tout ça s’arrête, et les soucis qui ont attendu toute la journée prennent enfin la parole.',
          'Les inquiétudes de Manon suivaient toujours le même chemin. Elles partaient d’un petit fait bien réel, puis couraient vers la pire version de l’avenir. Chaque « et si » ressemblait à un problème à régler tout de suite, à une heure du matin, sans aucun moyen de le régler.',
          'La fatigue aggravait tout. Après une nuit trop courte, les petites choses paraissaient plus grosses et plus dures à lâcher. Moins elle dormait, plus les pensées faisaient de bruit la nuit suivante. Rester allongée à forcer le sommeil ne faisait que resserrer la boucle.',
          'Elle avait honte, aussi. Rien de grave ne clochait dans sa vie. Elle avait un travail, une famille qui l’aimait et une église où elle allait presque tous les dimanches. Elle se répétait qu’elle n’avait aucune raison de se sentir comme ça, ce qui lui faisait une chose de plus à ruminer la nuit.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Manon à arrêter de ruminer la nuit',
        paragraphs: [
          'Rien n’a tout réglé en une nuit. Quelques petits changements, tenus la plupart des soirs, ont peu à peu baissé le volume.',
          'Le premier, c’était une liste des soucis. À 20 heures, avant le dîner, Manon prenait dix minutes pour noter tout ce qui lui trottait dans la tête. À côté de chaque souci, elle écrivait la prochaine petite étape, s’il y en avait une. « Parler à ma responsable de l’appel du client » allait sur la liste. « Et si je me fais virer » recevait une autre note : pas le problème d’aujourd’hui. Quand l’appel revenait à minuit, elle pouvait se dire : « C’est sur la liste. Je verrai ça demain. »',
          'Le deuxième, c’était de se lever. Quand elle avait l’impression d’être réveillée depuis vingt minutes, elle arrêtait de lutter. Elle allait à la cuisine, buvait un verre d’eau et lisait quelque chose d’ennuyeux sous une lumière douce jusqu’à ce que le sommeil revienne. À force de se battre avec ses pensées au lit, le lit lui-même était devenu l’endroit où elle s’inquiétait.',
          'Le troisième, c’était sa respiration. Quand sa poitrine se serrait, elle inspirait sur 4 temps et expirait sur 6, pendant environ deux minutes. Les soucis étaient toujours là après. Ils étaient plus petits, assez petits pour qu’elle puisse les poser.',
          'Le quatrième a été le plus dur. Cette fois, elle n’a pas fait de blague. Autour d’un café avec une amie de son groupe de maison, elle l’a dit sans détour : « Je dors mal depuis des mois. Ma tête ne s’arrête jamais. » Son amie n’avait pas de solution. Elle a dit : « Moi aussi, en fait », puis : « On prie pour ça, et on prend des nouvelles l’une de l’autre cette semaine. » Manon a un peu mieux dormi cette nuit-là, peut-être parce qu’elle ne portait plus ça toute seule.',
          'Elle s’est mise à prier autrement, aussi. Elle confiait chaque souci à Dieu, un par un, et s’imaginait le poser sur une table. Psaumes 94:19 est devenu son verset du soir.',
          'Comme les nuits restaient difficiles au bout de deux mois, elle en a parlé à son médecin traitant, qui l’a orientée vers une psychologue. En parler avec elle l’a aidée à voir d’où venaient tous ces « et si », et pourquoi ils arrivaient toujours la nuit.',
        ],
        pullQuote: 'C’est sur la liste. Je verrai ça demain.',
      },
      {
        kind: 'hope',
        heading: 'Si ta tête ne s’éteint pas ce soir',
        paragraphs: [
          'Tu lis peut-être ceci à une heure du matin. Si c’est le cas, rien ne cloche chez toi. Ta tête essaie de te protéger en réglant tout d’un coup. Elle a juste choisi la pire heure pour le faire.',
          'Ce soir, essaie une seule chose de la liste de Manon, pas toutes : noter tes soucis, te lever si le sommeil ne vient pas, ou inspirer sur 4 et expirer sur 6. Demain, raconte à une personne comment se passent tes nuits.',
          'Si tes pensées t’empêchent de dormir la plupart des nuits depuis des semaines, ou si ça commence à peser sur tes journées, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Et si tu veux un point de départ tout de suite, [HopeBegins](/) est gratuit. Dis comment tu te sens et tu reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser les nuits comme celle-ci, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites si tu as besoin de parler à quelqu’un. La page [Je n’arrive pas à dormir, je pense trop](/cant-sleep-overthinking) propose un exercice de respiration de deux minutes à faire dans ton lit.',
        ],
      },
    ],
    tryThis: {
      title: 'Ce soir : une liste des soucis en 10 minutes',
      steps: [
        'Avant le dîner, note tout ce qui te trotte dans la tête. Ne trie rien pour l’instant.',
        'À côté de chaque souci, écris une petite prochaine étape, ou « pas le problème d’aujourd’hui ».',
        'Ferme le carnet. Si un souci revient quand tu es au lit, dis-toi qu’il est sur la liste.',
        'Le sommeil ne vient toujours pas ? Lève-toi, bois un peu d’eau et installe-toi sous une lumière douce jusqu’à ce que le sommeil revienne.',
      ],
    },
    verse: 'psa-94-19',
    related: 'cant-sleep-overthinking',
    faq: [
      {
        q: 'Pourquoi je rumine autant la nuit ?',
        a: 'Le jour, le travail et les gens occupent ton esprit. La nuit, tout s’arrête, et les soucis mis de côté reviennent. La fatigue grossit aussi les inquiétudes, et ça peut tourner en boucle : moins de sommeil, des pensées plus fortes, encore moins de sommeil.',
      },
      {
        q: 'Comment arrêter de ruminer le soir au lit ?',
        a: 'Note tes soucis en début de soirée avec une prochaine étape pour chacun, lève-toi si tu n’arrives pas à dormir, et ralentis ta respiration : inspire sur 4, expire sur 6. Si ça dure depuis des semaines, parles-en à un médecin ou à un psychologue.',
      },
    ],
    keywords: [
      'arrêter de ruminer la nuit',
      'ruminer le soir au lit',
      'trop réfléchir la nuit',
      'impossible de dormir je pense trop',
      'anxiété la nuit',
    ],
  },
  {
    slug: 'epuise-par-mon-travail-de-nuit',
    lang: 'fr',
    pair: 'tired-of-my-job-night-shift',
    theme: 'pressure',
    metaTitle: 'Épuisé par le travail de nuit : l’histoire de Julien',
    metaDescription:
      'Julien, infirmier de nuit, s’endormait chaque matin dans le tram. Ce qui l’a aidé quand le travail l’épuisait, et une petite chose à essayer aujourd’hui.',
    title: 'Épuisé par son travail : Julien raconte ses nuits',
    dek: 'Il dormait dans le tram du retour, mais sa tête restait à l’hôpital. Voici comment ses journées se sont peu à peu allégées.',
    who: 'Julien, 29 ans, infirmier de nuit à Lyon',
    photo: storyPhoto('fr', 'tired'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Sept heures du matin, Julien rentre chez lui',
        paragraphs: [
          'À sept heures du matin, Julien sort de l’hôpital. L’équipe de jour arrive, café à la main. Lui rentre en sweat à capuche, le stéthoscope encore autour du cou parce qu’il a oublié de l’enlever.',
          'Il monte dans le tram pour Villeurbanne et s’endort avant le deuxième arrêt. Plus d’une fois, c’est l’annonce du terminus qui l’a réveillé. Il descend, traverse le quai et reprend le tram dans l’autre sens.',
          'Il travaille dans ce service depuis trois ans, et il est doué. Les patients l’apprécient, et c’est lui qu’on appelle quand une famille s’énerve. Depuis quelque temps, pourtant, quelque chose a changé. Avant même d’enfiler sa tenue, il a mal à la nuque. Quand une sonnette retentit dans le couloir, son ventre se serre.',
          '« Maman, je suis épuisé par le boulot », a-t-il dit un dimanche, chez sa mère. « Tout le monde est fatigué, mon grand », a-t-elle répondu en servant le gratin. Elle n’avait pas tort, s’est dit Julien, alors il ne l’a plus répété.',
          'Chaque soir, pourtant, ses pas ralentissent sur le chemin de l’hôpital. Parfois, il reste cinq minutes sur le parking, les yeux sur son téléphone, avant d’entrer.',
        ],
        pullQuote:
          'Quand une sonnette retentit dans le couloir, son ventre se serre.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi dormir ne répare pas ce genre de fatigue',
        paragraphs: [
          'Le sommeil ne réparait plus la fatigue de Julien. Même après huit heures au lit pendant la journée, sa tête restait au travail. Parfois, il entendait les bips des moniteurs dans ses rêves.',
          'Le travail de nuit est dur. Tes horaires vont à l’envers de ceux du reste du monde. Les voisins font des travaux, la cour d’école d’en face se remplit à la récré, le livreur sonne à l’interphone. Quand tu te lèves, tes amis vont se coucher. Petit à petit, la vie se réduit au travail et au sommeil.',
          'Il s’est rendu compte qu’il était devenu irritable, aussi. Un peu de bruit de son neveu le dimanche, et il s’agaçait. Il adorait le foot à cinq avec ses amis le samedi. Maintenant, il restait au lit à faire défiler son téléphone jusqu’à l’heure de repartir.',
          'Le burn-out peut ressembler à ça : une fatigue que le repos ne répare pas, un ras-le-bol ou une indifférence face au travail, et l’impression que quoi que tu fasses, ce n’est jamais assez.',
          'Le plus lourd, c’était la honte d’en parler. Sa mère comptait sur lui pour boucler les fins de mois, et il remboursait encore sa voiture. Comment se plaindre alors qu’il avait un poste stable ?',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Julien quand son travail l’épuisait',
        paragraphs: [
          'Il n’y a pas eu de grande réponse unique. Il a changé quelques petites choses, une à la fois, et c’est là que les journées se sont peu à peu allégées.',
          'D’abord, il a protégé son sommeil avec des moyens simples : un masque pour les yeux, des bouchons d’oreilles, un rideau occultant à la fenêtre. Il a laissé un petit mot dans le hall pour prévenir les voisins qu’il travaillait de nuit et dormait jusqu’à 14 heures. Ce n’était pas parfait, mais il dormait plus longtemps.',
          'Ensuite, il s’est créé une « clôture » à la fin de chaque garde. Avant de rentrer, il s’asseyait dix minutes en salle de pause, buvait un peu d’eau et notait dans son téléphone les moments de la nuit qui le travaillaient. Puis il se disait : « La garde est finie. On verra demain. »',
          'Puis il a pris ses congés. Il gardait ses RTT pour une urgence. Une collègue lui a dit : « Franchement, l’urgence, c’est maintenant. » Il a posé trois jours. Il n’a rien fait de spécial. Il a dormi, mangé avec sa famille et marché le matin au parc. C’était ce qu’il lui fallait.',
          'Il a aussi parlé à sa cadre de santé. Il avait le trac, et il l’a quand même dit sans détour : les nuits où il enchaînait les situations difficiles l’usaient. À sa grande surprise, sa cadre a répondu qu’elle l’avait remarqué. L’équipe a mieux réparti les patients les plus lourds, et elle lui a parlé du psychologue que l’hôpital met gratuitement à disposition du personnel. Il y est allé. C’était la première fois qu’il disait à voix haute à quel point il était fatigué.',
          'Et il s’est remis à prier. Un soir, avant sa garde, sa prière a été courte. Il a lu Matthieu 11:28 et a juste dit : « Seigneur, je suis fatigué. » Pour Julien, c’était la prière la plus honnête qu’il avait faite depuis longtemps.',
          'Quelques mois plus tard, il est encore fatigué de temps en temps, et il travaille toujours de nuit. Mais il se lève de nouveau pour le foot du samedi, et il ne s’arrête plus sur le parking avant d’entrer.',
        ],
        pullQuote: 'Franchement, l’urgence, c’est maintenant.',
      },
      {
        kind: 'hope',
        heading: 'Si ton travail t’épuise, toi aussi',
        paragraphs: [
          'Si tu lis ceci pendant ta pause, ou dans les transports du retour, respire d’abord. Une fatigue comme celle-là montre que tu portes quelque chose de lourd depuis longtemps.',
          'Choisis une chose que Julien a faite et essaie-la cette semaine : un petit rituel pour clôturer ton service, une discussion avec ta hiérarchie, ou les congés que tu mets de côté.',
          'Si tu te sens comme ça depuis plus de deux semaines, ou s’il devient difficile de te lever et de faire ce que tu faisais avant, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Si tu veux un point de départ tout de suite, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. La page [Burn-out](/burnout) donne aussi d’autres pistes concrètes.',
        ],
      },
    ],
    tryThis: {
      title: 'Après ton service : 10 minutes pour clôturer',
      steps: [
        'Avant de rentrer, assieds-toi dix minutes et bois un peu d’eau.',
        'Note dans ton téléphone les moments ou les choses qui te restent en tête.',
        'À côté de chacun, écris la prochaine étape, ou « demain ».',
        'Dis-toi : « Le service est fini. » Puis rentre chez toi.',
      ],
    },
    verse: 'mat-11-28-30',
    related: 'burnout',
    faq: [
      {
        q: 'Est-ce normal que la fatigue du travail ne passe pas, même en dormant ?',
        a: 'Quand le sommeil et le repos ne suffisent plus, c’est peut-être un burn-out. Il s’accompagne souvent d’irritabilité, d’une perte d’intérêt pour le travail et de l’impression que rien de ce que tu fais ne va. Si ça dure depuis des semaines, parles-en à ton médecin traitant ou à un psychologue.',
      },
      {
        q: 'Que faire quand on n’en peut plus de son travail ?',
        a: 'Commence petit : protège ton sommeil, termine chaque service par un court rituel, prends tes congés, et dis à ta hiérarchie ce qui pèse trop. Parles-en aussi à quelqu’un de confiance, et à ton médecin traitant si ça dure.',
      },
    ],
    keywords: [
      'épuisé par mon travail',
      'burn-out travail de nuit',
      'burn-out infirmier',
      'fatigué de mon travail',
      'épuisement professionnel',
    ],
  },
  {
    slug: 'mal-du-pays-loin-de-sa-famille',
    lang: 'fr',
    pair: 'ofw-loneliness-homesick',
    theme: 'lonely',
    metaTitle: 'Mal du pays : Romain, loin de sa famille à Dubaï',
    metaDescription:
      'Romain rentrait seul en métro et manquait tous les anniversaires. Comment il a fait face au mal du pays loin des siens, et une chose à essayer cette semaine.',
    title: 'Loin de sa famille : ce qui a aidé Romain les soirs à Dubaï',
    dek: 'Des journées de douze heures, un métro vide pour rentrer et des appels vidéo toujours trop courts. Voici ce qui a rendu la distance plus facile à porter.',
    who: 'Romain, 33 ans, pâtissier à Dubaï',
    photo: storyPhoto('fr', 'alone'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le trajet du retour après douze heures de travail',
        paragraphs: [
          'Le service de Romain, pâtissier dans un grand hôtel de Dubaï, se termine à 23 heures. Quand il monte dans le métro, la rame est presque vide. Il s’assoit côté fenêtre, fait défiler les photos de ses enfants et regarde les lumières de la ville glisser.',
          'En Normandie, il est 20 heures. Élodie, sa femme, vient de coucher les enfants. La plupart de leurs appels vidéo se passent comme ça : son visage éclairé par le téléphone, sa voix basse pour ne pas réveiller les petits, le lave-vaisselle qui tourne derrière elle.',
          'Il est parti il y a quatre ans. Depuis, il a manqué quatre anniversaires de sa fille, la rentrée de son fils en CP et l’opération de son père. Il a vu les fêtes d’anniversaire en vidéo, en chantant avec une seconde de retard sur tout le monde à cause de la connexion.',
          '« T’inquiète, ça va », dit-il à Élodie tous les soirs. Il le dit si souvent qu’il finit presque par y croire. Puis l’appel se termine, la chambre qu’il partage avec trois collègues redevient silencieuse, et il reste allongé sur la couchette du haut à fixer le plafond.',
        ],
        pullQuote:
          'Il a vu les fêtes d’anniversaire en vidéo, en chantant avec une seconde de retard sur tout le monde à cause de la connexion.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi la solitude loin des siens pèse plus qu’on ne croit',
        paragraphs: [
          'Vue de France, sa vie avait l’air réussie. Chaque mois, il versait l’essentiel de son salaire sur le compte commun, et la maison se remboursait plus vite. Il postait des photos de la plage le jour de repos. Dans la famille, on disait qu’il avait réussi.',
          'Personne ne voyait l’autre côté. Ses trois colocataires travaillaient en horaires décalés, alors il y en avait toujours un qui dormait et personne ne parlait vraiment. Son ami le plus proche de la première année était rentré en France. Il se sentait de passage partout : un employé à Dubaï, une voix dans un téléphone en Normandie.',
          'Pour Romain, le mal du pays, c’était le manque des jours ordinaires : entendre parler de la maîtresse que son fils n’aimait pas, être là quand la gouttière a lâché, manger une blanquette qui avait le bon goût. Chaque « ça va » creusait un peu plus l’écart, parce que sa famille ne connaissait que la version de lui qu’il choisissait de montrer.',
          'Il culpabilisait aussi d’être triste. Il était là-bas pour sa famille. Se plaindre lui semblait ingrat, alors il gardait tout pour lui. Les jours de repos, il dormait surtout, et au réveil, la solitude était toujours là.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Comment Romain a fait face au mal du pays, pas à pas',
        paragraphs: [
          'Tout a commencé par un appel honnête. Un soir, Élodie lui a demandé : « Comment tu vas, vraiment ? » Il a mis trop de temps à répondre, et elle l’a entendu. Alors il lui a dit : il se sentait seul, il était fatigué, et il ne savait pas combien d’années il tiendrait encore. Elle a pleuré un peu. Puis elle a dit : « Il fallait me le dire tout de suite. On est mari et femme. »',
          'Après ça, ils ont changé leur façon de se parler. Ils ont gardé un long appel le jour de repos, avec les enfants réveillés. Pendant la semaine, ils s’envoyaient des messages vocaux sur des petites choses : ce qu’il avait mangé à midi, la dernière bêtise du chien, une chanson à la radio. Ces petits messages lui ont redonné une place dans leurs journées.',
          'Il a aussi cherché des gens. Un collègue belge l’a invité à un groupe de chrétiens francophones qui se retrouvait le samedi matin. Il a failli rester au lit. Il y est allé, s’est assis au fond et a mangé une part de quiche avec des inconnus qui comprenaient exactement ce qu’il voulait dire quand il disait que la pluie lui manquait. En quelques semaines, il avait un petit groupe avec qui prier et partager un repas.',
          'Il a donné une forme à son jour de repos. Grasse matinée, appel à la maison, puis une marche ou un foot, puis le groupe. Avoir quelque chose à attendre raccourcissait les longues semaines.',
          'Il s’est mis à parler à Dieu dans le métro du retour, parfois juste une phrase. Ésaïe 41:10 est devenu son fond d’écran, alors il le voyait chaque fois qu’il regardait l’heure.',
          'Quand le poids est resté des semaines, le responsable du groupe lui a conseillé de consulter un psychologue en ligne. Parler à quelqu’un de formé a aidé Romain à faire le tri entre ce qu’il pouvait changer et ce dont il lui fallait faire le deuil.',
        ],
        pullQuote: 'Il fallait me le dire tout de suite. On est mari et femme.',
      },
      {
        kind: 'hope',
        heading: 'Si tu es loin de chez toi ce soir',
        paragraphs: [
          'Si tu lis ceci dans une chambre partagée, pendant une pause ou dans un train loin de chez toi, ce manque se comprend : tu aimes des gens qui sont à un vol d’ici, et ils te manquent parce que tu les aimes.',
          'Cette semaine, essaie une de ces choses : dire à une personne de ta famille comment tu vas vraiment, trouver un groupe de francophones près de chez toi (une église, un club de sport, une association) ou envoyer un message vocal sur une petite chose.',
          'Si la solitude dure depuis plus de deux semaines, ou si elle t’empêche de dormir, de manger ou de travailler, parles-en à un médecin ou à un psychologue. Beaucoup consultent en ligne, et prendre rendez-vous est une démarche normale.',
          'Si tu veux un point de départ ce soir, [HopeBegins](/) est gratuit et fonctionne où que tu sois. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Tu peux aussi lire [Je n’ai personne à qui parler](/i-feel-alone), avec quelques idées pour les jours de solitude.',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : réduire un peu la distance',
      steps: [
        'Réponds honnêtement à « Comment tu vas ? » avec une personne de ta famille.',
        'Remplace un appel pressé par un appel plus long le jour de repos, quand les enfants sont réveillés.',
        'Envoie un message vocal sur une petite chose : ton repas, la météo, une chanson.',
        'Cherche un groupe de francophones ou une église près de chez toi, et vas-y une fois.',
      ],
    },
    verse: 'isa-41-10',
    related: 'i-feel-alone',
    faq: [
      {
        q: 'Comment gérer le mal du pays quand on travaille à l’étranger ?',
        a: 'Ce sont les petites choses régulières qui aident le plus : des appels honnêtes avec ta famille, une communauté ou une église francophone près de chez toi, un rythme pour tes jours de repos, et quelqu’un à qui parler quand ça devient lourd. Si la solitude dure des semaines, un psychologue peut t’aider, et beaucoup consultent en ligne.',
      },
      {
        q: 'Est-ce normal d’avoir le mal du pays après des années à l’étranger ?',
        a: 'Oui. Le mal du pays peut revenir à tout moment, surtout autour des anniversaires, des fêtes ou des soucis de famille que tu vis à distance. Dire à quelqu’un ce que tu ressens allège souvent le poids.',
      },
    ],
    keywords: [
      'mal du pays',
      'solitude expatriation',
      'travailler loin de sa famille',
      'comment gérer le mal du pays',
      'expatrié loin de sa famille',
    ],
  },
  {
    slug: 'echec-au-concours-que-faire',
    lang: 'fr',
    pair: 'failed-board-exam-what-now',
    theme: 'new-start',
    metaTitle: 'Échec au concours : ce que Camille a fait ensuite',
    metaDescription:
      'Camille a raté le concours de professeur des écoles et n’osait plus voir sa famille ni sa promo. Ce qui l’a aidée à se relever, et quoi faire après un échec.',
    title: 'Échec au concours : comment Camille s’est relevée',
    dek: 'Son nom n’était pas sur la liste. Pendant des semaines, elle a fui sa famille, sa promo et son téléphone. Voici comment elle a retrouvé pied.',
    who: 'Camille, 23 ans, étudiante à Angers',
    photo: storyPhoto('fr', 'unsure'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le soir des résultats',
        paragraphs: [
          'Les résultats du concours de professeur des écoles sont tombés un jeudi soir. Camille était dans sa chambre, chez ses parents, près d’Angers, à rafraîchir la liste sur son téléphone, pendant que sa famille regardait la télé au salon en faisant semblant de ne pas attendre.',
          'Elle a cherché son nom de famille trois fois. Puis son prénom. Puis elle a fait défiler toute la liste depuis le début, lettre par lettre, comme si la recherche avait pu la rater.',
          'Le groupe de discussion de sa promo s’est mis à vibrer sans arrêt : des félicitations, des messages en majuscules, des photos de bouteilles déjà ouvertes. Sa mère a frappé doucement. « Camille ? » Elle a dit qu’elle avait besoin d’une minute. Elle n’est sortie que le lendemain après-midi.',
          'Ses parents avaient puisé dans leur livret A pour lui payer une prépa privée en plus de son master. Sa tante avait déjà annoncé à toute la famille que Camille serait maîtresse à la rentrée, la première de la famille à devenir prof. Camille pensait à tout ça en même temps, en boucle.',
        ],
        pullQuote: 'Elle a cherché son nom de famille trois fois.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi un échec au concours fait si mal',
        paragraphs: [
          'Pour beaucoup d’étudiants, un concours compte bien plus qu’une note. Il porte l’argent que ta famille a dépensé, les espoirs des proches et tous les projets construits autour de ton avenir.',
          'Alors quand Camille a échoué, elle a eu l’impression d’avoir déçu tout le monde. Elle a mis le groupe de la promo en sourdine et n’a plus rien publié. Quand de la famille passait, elle restait dans sa chambre. À l’église, elle s’asseyait près de la porte pour partir avant qu’on lui pose la question.',
          'Les mêmes pensées tournaient dans sa tête : je ne suis peut-être pas faite pour enseigner, j’ai peut-être gâché leur argent, tout le monde parle peut-être de moi. La nuit, elle restait éveillée à calculer combien la prépa avait coûté.',
          'Son corps le sentait aussi. Elle se levait tard, mangeait à peine et se sentait fatiguée même sans avoir rien fait. Les semaines passaient, et ses fiches de révision restaient dans le carton près de la porte.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce que Camille a fait après son échec au concours',
        paragraphs: [
          'Le premier pas est venu de son père. Un soir, il s’est assis au bout de son lit et lui a dit : « Ma chérie, on t’a payé tes études parce qu’on t’aime. On t’aime toujours autant aujourd’hui. » Elle a pleuré longtemps. C’était la première fois qu’elle se le permettait.',
          'Le deuxième, ça a été de dire la vérité à une amie. Elle a écrit à Inès, une amie de promo qui avait raté le concours l’année d’avant et l’avait eu à la deuxième tentative. « Comment tu as tenu le coup ? » Inès l’a appelée tout de suite et lui a parlé pendant une heure. Entendre quelqu’un dire « Je suis passée par là » a rendu la honte plus petite.',
          'Ensuite, elle a regardé le concours en face. Elle a consulté ses notes et vu quelles épreuves l’avaient fait chuter. L’échec immense et flou est devenu deux points faibles qu’elle pouvait travailler.',
          'Elle s’est donné du temps avant de recommencer : deux semaines de repos, de sommeil et de balades l’après-midi au bord de la Maine. Puis elle a fait un petit planning, trois heures de révisions par jour avec le dimanche libre. Elle révisait avec Inès deux fois par semaine en visio.',
          'Elle s’est remise à prier, honnêtement cette fois. Certains soirs, toute la prière tenait en une phrase : « Seigneur, j’ai peur de réessayer. » Sa mère venait parfois s’asseoir avec elle pour prier aussi. Elle a scotché 2 Corinthiens 4:8-9 au-dessus de son bureau.',
          'Camille a repassé le concours à la session suivante, et elle l’a eu. Ce dont elle se souvient le plus, c’est du soir où elle a décidé de recommencer, avant de savoir comment ça finirait.',
        ],
        pullQuote: 'Ma chérie, on t’a payé tes études parce qu’on t’aime.',
      },
      {
        kind: 'hope',
        heading: 'Si tu as raté ton concours',
        paragraphs: [
          'Si ton nom n’était pas sur la liste, laisse-toi le temps de le ressentir. La déception, la honte et la tristesse sont normales après quelque chose pour lequel tu as tant travaillé. Pour la plupart des gens, elles s’apaisent avec le temps.',
          'Quand le moment te semble venu, fais un petit pas : dire la vérité à une personne, regarder tes notes pour voir ce qu’il faut retravailler, ou écrire un planning qui laisse de la place au repos. Beaucoup de gens réussissent à la deuxième ou à la troisième tentative.',
          'Si les semaines passent et que tu n’arrives toujours pas à dormir, à manger ou à sortir du lit, ou si tout te semble sans espoir, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Et si tu veux un point de départ aujourd’hui, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Si tu ne sais pas quoi faire ensuite, [Je ne sais plus où j’en suis](/i-feel-lost) propose quelques petits pas pour des jours comme celui-ci.',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : un pas vers une nouvelle tentative',
      steps: [
        'Dis à une personne de confiance ce que tu ressens vraiment face au résultat.',
        'Repose-toi quelques jours exprès : dors, mange, marche.',
        'Regarde tes notes et écris les deux épreuves à retravailler en premier.',
        'Fais un planning de révisions avec un vrai jour de repos par semaine.',
      ],
    },
    verse: '2co-4-8-9',
    related: 'i-feel-lost',
    faq: [
      {
        q: 'Que faire après un échec au concours ?',
        a: 'Laisse-toi le temps de te reposer et de ressentir la déception, puis parles-en à quelqu’un de confiance. Quand le moment te semble venu, regarde tes notes pour voir quelles épreuves retravailler, et prépare un planning avec des jours de repos. Beaucoup de gens réussissent à la tentative suivante.',
      },
      {
        q: 'Comment annoncer à ses parents qu’on a raté un concours ?',
        a: 'Dis-leur ce que tu ressens, même en quelques mots. Souvent, les familles s’inquiètent plus pour toi que pour le résultat. Si ça t’aide, demande à une personne d’être à tes côtés quand tu en parles aux autres.',
      },
    ],
    keywords: [
      'échec au concours',
      'raté le concours que faire',
      'échec CRPE',
      'rebondir après un échec',
      'repasser un concours',
    ],
  },
  {
    slug: 'premiere-crise-d-angoisse-dans-le-rer',
    lang: 'fr',
    pair: 'first-panic-attack-jeepney',
    theme: 'anxiety',
    metaTitle: 'Première crise d’angoisse : ce qui est arrivé à Léa',
    metaDescription:
      'Léa a cru faire un malaise cardiaque dans un RER bloqué. Ce qu’on ressent lors d’une première crise d’angoisse, les symptômes, et ce qui l’a aidée ensuite.',
    title: 'La première crise de panique de Léa, dans le RER, un soir de pluie',
    dek: 'Son cœur s’emballait, ses mains s’engourdissaient, et elle était sûre de mourir. Le médecin des urgences a mis un mot dessus, et c’est là que les choses ont commencé à aller mieux.',
    who: 'Léa, 26 ans, comptable à Paris',
    photo: storyPhoto('fr', 'anxious'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Bloquée en pleine voie sur la ligne A',
        paragraphs: [
          'Il pleuvait depuis midi. Vers 18 heures, le RER s’est arrêté en pleine voie, entre deux gares, à cause d’un problème de signalisation. Léa était assise au fond de la voiture, son sac d’ordinateur sur les genoux, à penser au bilan qu’elle devait rendre vendredi.',
          'Tout a commencé par son cœur. Il s’est mis à battre fort et vite, sans raison apparente. Puis sa poitrine s’est serrée. Ses mains se sont mises à fourmiller et sont devenues froides. La voiture lui a soudain paru trop petite, la pluie trop bruyante, l’air trop épais pour respirer.',
          'Elle était sûre qu’il se passait quelque chose de terrible. Une crise cardiaque, a-t-elle pensé, à 26 ans, dans le RER. Elle a agrippé la barre et a dit à la femme assise à côté d’elle : « Pardon, madame, je n’arrive plus à respirer. » La femme lui a tenu le bras et a prévenu le conducteur par l’interphone. À la gare suivante, les pompiers l’attendaient sur le quai et l’ont emmenée aux urgences.',
          'Aux urgences, on a contrôlé son cœur, sa tension et sa respiration. Tout était normal. Le médecin a tiré une chaise et lui a dit : « Je crois que c’était une crise de panique. »',
        ],
        pullQuote: 'Pardon, madame, je n’arrive plus à respirer.',
      },
      {
        kind: 'struggle',
        heading: 'Des symptômes de crise de panique qui font penser au pire',
        paragraphs: [
          'Léa était soulagée que son cœur aille bien, et gênée d’avoir fait tout un drame pour ce que sa tante a appelé plus tard « juste les nerfs ».',
          'Pourtant, rien de tout ça n’avait semblé petit. Une crise de panique, qu’on appelle souvent crise d’angoisse, peut provoquer un cœur qui s’emballe, une poitrine serrée, un souffle court, des tremblements, des sueurs, des vertiges, des fourmillements dans les mains, et la sensation forte qu’il va se passer quelque chose de grave. La première fois, beaucoup de gens pensent faire une crise cardiaque.',
          'Le plus dur est venu après. Elle s’est mise à avoir peur de la prochaine. Elle évitait le RER et se payait des VTC qu’elle n’avait pas vraiment les moyens de prendre. Elle prenait son pouls au bureau. Chaque battement un peu bizarre lui faisait penser : « Est-ce que ça recommence ? »',
          'Avec le recul, les signes s’accumulaient depuis des mois : la période des bilans, les soirées tardives, les repas sautés, beaucoup de café et presque pas de repos. Son corps vivait en alerte depuis longtemps.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Léa après sa première crise de panique',
        paragraphs: [
          'Le médecin des urgences lui avait dit deux choses auxquelles elle s’est accrochée. Une crise de panique fait peur, et elle passe, souvent en 5 à 20 minutes. Et si les crises revenaient, il faudrait consulter pour un suivi. Elle a pris rendez-vous chez son médecin traitant la semaine même.',
          'Son médecin lui a expliqué ce qui se passe dans le corps pendant la panique et lui a conseillé la respiration lente. Léa s’est entraînée quand elle était calme, pour que ça vienne facilement quand elle ne le serait pas : inspirer par le nez sur 4 temps, expirer par la bouche sur 6, pendant deux minutes. Elle le faisait tous les matins avant le travail, comme se brosser les dents.',
          'Elle a appris à parler à la panique quand elle arrivait. « C’est une crise de panique. C’est horrible, et ça va passer. » Elle posait les pieds bien à plat sur le sol et nommait cinq choses qu’elle voyait. La deuxième fois, en pleine réunion, c’était toujours désagréable, mais ça s’est arrêté plus vite.',
          'Elle a aussi repris le RER, petit à petit. D’abord quelques stations avec sa petite sœur, puis le trajet entier un jour sans pluie, puis un soir de pluie. Chaque trajet qui se passait bien rendait le suivant plus facile.',
          'Elle a parlé de sa charge de travail à sa responsable, est passée à un seul café par jour et a commencé à déjeuner ailleurs qu’à son bureau. Sa mère priait avec elle au téléphone le dimanche soir. Psaumes 56:4 est devenu le verset qu’elle se répétait dans les transports.',
          'Comme la peur d’une nouvelle crise pesait encore sur elle au bout de quelques mois, son médecin l’a orientée vers une psychologue. Ça l’a aidée à comprendre l’inquiétude cachée sous la panique, et quoi en faire.',
        ],
        pullQuote:
          'C’est une crise de panique. C’est horrible, et ça va passer.',
      },
      {
        kind: 'hope',
        heading: 'Si tu viens de faire ta première crise de panique',
        paragraphs: [
          'Si ton cœur s’emballe pendant que tu lis ceci, pose tes pieds bien à plat sur le sol. Inspire sur 4, expire sur 6. La panique monte, atteint un sommet, puis redescend. Tu peux laisser passer celle-ci.',
          'Si c’est la première fois que tu as mal à la poitrine ou du mal à respirer, fais-toi examiner : appelle le 15 (ou le 112) ou va aux urgences. C’était la bonne décision pour Léa, et c’est la bonne pour toi. Une fois les autres causes écartées, tu pourras soigner la panique pour ce qu’elle est.',
          'Si les crises reviennent, ou si tu commences à éviter des endroits à cause d’elles, parles-en à un médecin ou à un psychologue. Les crises de panique se soignent, et consulter pour ça est une démarche normale.',
          'Pour la prochaine fois, [Crise d’angoisse : que faire, étape par étape](/panic-attack-what-to-do) te guide pendant deux minutes de respiration, étape par étape. Et [HopeBegins](/) est gratuit : choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un.',
        ],
      },
    ],
    tryThis: {
      title: 'Aujourd’hui : entraîne-toi à respirer avant d’en avoir besoin',
      steps: [
        'Assieds-toi, les deux pieds bien à plat sur le sol.',
        'Inspire par le nez sur 4 temps.',
        'Expire par la bouche sur 6 temps.',
        'Continue pendant deux minutes. Fais-le une fois par jour, pour que ça vienne facilement quand la panique arrive.',
      ],
    },
    verse: 'psa-56-3',
    related: 'panic-attack-what-to-do',
    faq: [
      {
        q: 'Qu’est-ce qu’on ressent pendant une première crise d’angoisse ?',
        a: 'Beaucoup de gens ressentent un cœur qui s’emballe, une poitrine serrée, un souffle court, des tremblements, des sueurs, des vertiges ou des fourmillements, avec l’impression que quelque chose de grave arrive. Ça passe souvent en 5 à 20 minutes. Si c’est la première fois que tu as mal à la poitrine, fais-toi examiner par un médecin.',
      },
      {
        q: 'Comment savoir si c’est une crise d’angoisse ou une crise cardiaque ?',
        a: 'On ne peut pas toujours faire la différence par soi-même. Alors si tu as mal à la poitrine ou du mal à respirer pour la première fois, appelle le 15 (ou le 112) ou va aux urgences. Une fois les autres causes écartées, un médecin peut t’aider à gérer les crises.',
      },
    ],
    keywords: [
      'première crise d’angoisse',
      'crise de panique symptômes',
      'crise d’angoisse ou crise cardiaque',
      'crise d’angoisse dans les transports',
      'comment arrêter une crise d’angoisse',
    ],
  },
  {
    slug: 'faire-le-deuil-de-sa-grand-mere',
    lang: 'fr',
    pair: 'grieving-a-grandparent',
    theme: 'loss',
    metaTitle: 'Deuil d’une grand-mère : comment Maëlle a tenu le coup',
    metaDescription:
      'Chaque matin, la grand-mère de Maëlle préparait le café. Après sa mort, la cuisine est restée silencieuse. Comment elle a vécu son deuil, et ce qui aide.',
    title: 'Le matin où le café s’est arrêté : le deuil d’une grand-mère',
    dek: 'Pendant 25 ans, Maëlle s’est réveillée avec le café de sa grand-mère. Après l’enterrement, la cuisine est restée dans le noir. Voici comment elle a appris à porter son chagrin.',
    who: 'Maëlle, 25 ans, professeure dans un collège près de Quimper',
    photo: storyPhoto('fr', 'morning'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le café de six heures',
        paragraphs: [
          'Aussi loin que Maëlle se souvienne, sa grand-mère était debout avant tout le monde. À six heures, la cuisine de la maison familiale, près de Quimper, sentait le café, et une baguette tiède attendait sur la table à côté du beurre salé. Mamie servait une tasse à Maëlle et posait chaque jour la même question : « Alors, qu’est-ce que tu fais de beau aujourd’hui ? »',
          'Mamie est tombée malade en juin. En août, elle était partie. Il y a eu ensuite le culte d’obsèques à l’église, les cantiques et les prières, la famille venue de Rennes et de Paris, puis le café après l’enterrement, avec les gâteaux et les cousins qu’on ne voyait plus. Maëlle servait les invités et restait occupée. Elle a à peine pleuré.',
          'Puis tout le monde est rentré chez soi. Le premier lundi après l’enterrement, Maëlle s’est réveillée à six heures par habitude et a poussé la porte de la cuisine. La cuisine était dans le noir, sans café ni pain. Elle est restée là, en pyjama, et elle s’est enfin effondrée.',
        ],
        pullQuote: 'La cuisine était dans le noir, sans café ni pain.',
      },
      {
        kind: 'struggle',
        heading:
          'Pourquoi le deuil frappe souvent plus fort après l’enterrement',
        paragraphs: [
          'Pendant les obsèques, il y avait toujours quelque chose à faire. Après l’enterrement, l’agitation s’est arrêtée, et le manque s’est installé dans les moments ordinaires : la chaise où Mamie s’asseyait toujours, ses chaussons près de la porte, son numéro encore enregistré dans le téléphone de Maëlle sous « Mamie Jeanne ».',
          'Maëlle a repris les cours au bout d’une semaine. Elle souriait devant ses sixièmes et pleurait dans les toilettes de la salle des profs à midi. Elle s’agaçait contre sa mère, puis s’en voulait. Certains jours, elle ne ressentait plus rien du tout, et ça lui faisait encore plus peur.',
          'Les gens voulaient bien faire. « Elle est partie en paix. » « Au moins, elle ne souffre plus. » Maëlle croyait les deux, et pourtant ces phrases ne touchaient pas le vide de ses matins.',
          'Elle avait aussi l’impression qu’elle aurait déjà dû aller mieux. Mamie avait 84 ans. D’autres avaient perdu un parent, et même un enfant. Qui était-elle pour s’effondrer pour une grand-mère ? Alors elle gardait son chagrin petit et silencieux, et il restait lourd.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Comment Maëlle a appris à vivre son deuil',
        paragraphs: [
          'Ce qui a aidé d’abord, c’est de laisser le chagrin être aussi grand qu’il l’était. Un soir, le pasteur de son église est passé et lui a dit : « Tu l’as eue tous les matins pendant 25 ans. Évidemment que ça fait mal. » Pour la première fois depuis l’enterrement, Maëlle a pleuré devant quelqu’un.',
          'Elle a fait revivre les matins autrement. Un samedi, elle a acheté une baguette, fait le café dans la vieille cafetière de Mamie et s’est assise à table avec sa mère. Elles ont parlé de Mamie : ses blagues nulles, ses remontrances, sa façon de fredonner des cantiques en balayant la cour. Elles ont ri, puis pleuré, puis ri encore. C’est devenu leur rendez-vous du samedi.',
          'Elle écrivait à Mamie dans un petit carnet, les choses qu’elle lui aurait dites autour d’un café. « Mamie, mes sixièmes sont intenables cette année. » « Mamie, tu me manques aujourd’hui. » Certains jours, elle n’écrivait rien. Le carnet était là quand elle en avait besoin.',
          'Elle a laissé son corps vivre le deuil, aussi. Elle dormait quand elle était fatiguée, marchait le long de l’Odet en fin d’après-midi et a dit non aux projets en plus au collège pendant un temps.',
          'Et elle priait honnêtement. Certains soirs, elle était en colère. D’autres soirs, elle disait seulement : « Seigneur, elle me manque. » Psaumes 34:19 lui a semblé vrai comme jamais.',
          'Des mois plus tard, le chagrin était toujours là, et il avait changé. Il venait par vagues. Les bons jours, elle pouvait penser à Mamie et sourire. Les jours difficiles, elle savait qui appeler.',
        ],
        pullQuote:
          'Tu l’as eue tous les matins pendant 25 ans. Évidemment que ça fait mal.',
      },
      {
        kind: 'hope',
        heading: 'Si tu es en deuil de quelqu’un que tu aimes',
        paragraphs: [
          'Si quelqu’un te manque en ce moment, il n’y a pas de calendrier pour ça. Le deuil vient par vagues, souvent dans les petites choses du quotidien que tu partageais avec cette personne. Le ressentir fait partie de l’amour que tu lui portais.',
          'Cette semaine, essaie une petite chose : raconter à quelqu’un une histoire sur la personne que tu as perdue, garder vivante une de ses habitudes (une recette, une chanson, un café le matin) ou lui écrire un petit mot.',
          'Si le chagrin t’empêche de dormir, de manger, de travailler ou de passer la journée pendant des semaines, ou si tout te semble sans espoir, parles-en à un médecin ou à un psychologue. Demander de l’aide pour traverser un deuil est une démarche normale.',
          'Et si tu veux un point de départ aujourd’hui, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Pour les jours lourds, [Versets bibliques pour les jours où ça ne va pas](/bible-verses-when-you-feel-down) rassemble quelques versets et une courte prière.',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : garder une de ses habitudes',
      steps: [
        'Choisis une chose que la personne faisait : une recette, une chanson, un café le matin.',
        'Fais-la une fois cette semaine, de ton côté ou avec quelqu’un qui l’aimait aussi.',
        'Raconte une histoire sur elle pendant que tu le fais.',
        'Si tu pleures, laisse-toi pleurer. Si tu ris, laisse-toi rire aussi.',
      ],
    },
    verse: 'psa-34-18',
    related: 'bible-verses-when-you-feel-down',
    faq: [
      {
        q: 'Comment surmonter la mort de sa grand-mère ?',
        a: 'Laisse-toi vivre ton chagrin, parle d’elle avec les gens qui l’aimaient, et garde de petits rituels qui te la rappellent. Repose-toi, mange et dors du mieux que tu peux. Si le deuil rend la vie quotidienne très difficile pendant des semaines, parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Est-ce normal d’être aussi triste après la mort de sa grand-mère ?',
        a: 'Oui. Si ta grand-mère faisait partie de ton quotidien, la perdre peut faire aussi mal que n’importe quel deuil. Il n’y a pas de bonne durée pour faire son deuil.',
      },
    ],
    keywords: [
      'deuil grand-mère',
      'mort de ma grand-mère',
      'comment faire son deuil',
      'surmonter la perte d’un proche',
      'deuil après l’enterrement',
    ],
  },
  {
    slug: 'se-remettre-d-une-rupture',
    lang: 'fr',
    pair: 'how-to-move-on-after-a-breakup',
    theme: 'loss',
    metaTitle: 'Se remettre d’une rupture : l’histoire de Chloé',
    metaDescription:
      'Cinq ans ensemble, puis plus rien. Comment Chloé s’est remise de sa rupture alors qu’elle n’arrivait pas à supprimer leur playlist, et quelques pas pour toi.',
    title: 'Comment se remettre d’une rupture après cinq ans ensemble',
    dek: 'Elle n’arrivait pas à supprimer leur playlist, et chaque soir elle allait voir son profil. Voici comment Chloé a peu à peu recommencé à respirer.',
    who: 'Chloé, 24 ans, graphiste à Bordeaux',
    photo: storyPhoto('fr', 'alone'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'La playlist qu’elle n’arrivait pas à supprimer',
        paragraphs: [
          'Chloé avait une playlist intitulée « Nous deux ». Cent quatorze chansons : cinq ans de road trips, de disputes et de réconciliations. Trois mois avaient passé depuis sa rupture avec Hugo, et la playlist était toujours sur son téléphone.',
          'Chaque soir, après le travail, elle s’asseyait sur le balcon de son appartement, écouteurs sur les oreilles, et passait leurs chansons. Puis elle ouvrait le profil de Hugo pour voir s’il avait posté quelque chose, qui avait réagi, s’il avait l’air heureux.',
          '« Désabonne-toi, franchement », lui disait Sarah, sa meilleure amie. « Oui, demain », répondait Chloé. Les « demain » se sont enchaînés.',
          'Le dimanche était le pire. Le dimanche, c’était leur jour : le culte, le déjeuner chez les parents de Hugo, puis un film. Maintenant, elle restait au lit toute la journée avec la télé allumée, sans vraiment la regarder.',
          'Au travail, elle avait du mal à se concentrer. Avant, elle était la plus rapide de l’équipe. Maintenant, une seule affiche lui prenait la journée. Quand une de leurs chansons passait à la radio dans un VTC, elle regardait par la fenêtre pour que le chauffeur ne la voie pas pleurer.',
        ],
        pullQuote: 'Les « demain » se sont enchaînés.',
      },
      {
        kind: 'struggle',
        heading:
          'Pourquoi c’est si dur de tourner la page après une longue relation',
        paragraphs: [
          'En cinq ans, ils avaient construit des habitudes, des amis communs et des projets déjà discutés. Quand Hugo est parti, le rythme des journées de Chloé est parti avec lui : le déjeuner du dimanche, le texto du matin, la première personne qu’elle appelait pour annoncer une nouvelle.',
          'Aller voir son profil, c’était comme gratter une plaie : un bref soulagement, puis encore plus mal. Chaque visite renvoyait Chloé au point de départ.',
          'Il y avait aussi la honte. Tous leurs amis savaient ce qui s’était passé. Aux repas de famille, quelqu’un demandait encore : « Et avec Hugo, ça va ? » Elle souriait et disait que ça allait.',
          'Son corps le sentait aussi. Elle n’avait plus d’appétit et maigrissait sans le vouloir. « Tu as maigri, Chloé », lui a dit une collègue. Elle a souri, encore une fois.',
          'Le plus lourd, c’étaient les questions de la nuit, qui tournaient en boucle sans réponse jusqu’à l’aube : est-ce que je suis assez bien, qu’est-ce qui ne va pas chez moi, est-ce qu’il y a quelqu’un d’autre ?',
        ],
      },
      {
        kind: 'helped',
        heading: 'Comment Chloé a tourné la page, petit à petit',
        paragraphs: [
          'Il n’y a pas eu de jour où, d’un coup, tout allait bien. Elle a fait quelques petites choses qui l’ont aidée, une à la fois.',
          'D’abord, elle a mis Hugo en sourdine avant de se désabonner. Ça, elle y arrivait. Ses publications ont cessé de s’afficher, et les soirées passées à fixer son profil se sont faites plus rares. Un mois plus tard, elle a pu se désabonner.',
          'Ensuite, elle a rangé la playlist dans un dossier appelé « Pour un autre jour ». Elle en a créé une nouvelle, « Moi d’abord », pleine de chansons qui ne lui rappelaient encore rien.',
          'Puis elle a dit la vérité à Sarah : elle pleurait tous les soirs et ne savait pas comment s’arrêter. À partir de là, Sarah est restée tout près. Chaque jeudi après le travail, elles dînaient ensemble ou marchaient le long des quais.',
          'Elle a aussi noté les questions qui tournaient la nuit. À côté de « Est-ce que je suis assez bien ? », elle a écrit ce que Sarah et sa famille disaient d’elle. Peu à peu, la voix qui lui disait que quelque chose n’allait pas chez elle s’est faite plus discrète.',
          'Elle a donné quelque chose de nouveau à ses soirées. Elle s’est inscrite à un atelier de poterie le mardi. Elle est retournée au groupe de jeunes adultes de son église, où elle n’allait plus depuis longtemps. Certains soirs étaient encore lourds, mais il y en avait moins.',
          'Et elle priait honnêtement. Au début, sa prière était : « Seigneur, ramène-le-moi. » Avec le temps, c’est devenu : « Seigneur, guéris-moi. » Psaumes 147:3 était sur un post-it collé à son écran, au bureau.',
          'Six mois plus tard, un soir, elle a entendu une de leurs chansons dans un café. Elle a souri. Ça faisait encore un peu mal, et elle a souri quand même.',
        ],
        pullQuote: 'Ça faisait encore un peu mal, et elle a souri quand même.',
      },
      {
        kind: 'hope',
        heading: 'Si tu n’arrives pas à tourner la page en ce moment',
        paragraphs: [
          'Si tu lis ceci en fixant le profil de quelqu’un, respire d’abord. C’est normal d’avoir aussi mal. Tu as aimé cette personne, et cette douleur fait partie de cet amour.',
          'Cette semaine, choisis un petit pas : mettre son compte en sourdine, ranger la playlist, dire la vérité à quelqu’un de proche, ou prévoir une chose rien que pour toi.',
          'Si depuis plus de deux semaines tu n’arrives plus à dormir ni à manger, ou si tu as du mal à tenir au travail, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Si tu veux un point de départ tout de suite, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Si tu as l’impression de n’avoir personne à qui parler, lis la page [Personne à qui parler](/i-feel-alone).',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : un pas loin de son profil',
      steps: [
        'Mets d’abord son compte en sourdine. Le désabonnement peut attendre.',
        'Range la playlist du couple dans un dossier « Pour un autre jour ».',
        'Crée une nouvelle playlist rien que pour toi.',
        'Écris à quelqu’un de proche : « On peut se voir cette semaine ? J’ai besoin de parler. »',
      ],
    },
    verse: 'psa-147-3',
    related: 'i-feel-alone',
    faq: [
      {
        q: 'Comment se remettre d’une longue relation ?',
        a: 'Petit à petit. Va moins voir son profil (mets-le d’abord en sourdine), dis la vérité à quelqu’un de proche, et donne quelque chose de nouveau à tes journées. C’est normal que ça prenne du temps avant que ça s’allège, surtout après des années ensemble.',
      },
      {
        q: 'Combien de temps faut-il pour se remettre d’une rupture ?',
        a: 'Il n’y a pas de nombre de jours précis. Pour beaucoup de gens, ça s’allège en quelques mois. Si depuis plus de deux semaines tu n’arrives plus à dormir ou à manger correctement, parles-en à un médecin ou à un psychologue.',
      },
    ],
    keywords: [
      'se remettre d’une rupture',
      'comment tourner la page après une rupture',
      'rupture après 5 ans',
      'oublier son ex',
      'chagrin d’amour',
    ],
  },
  {
    slug: 'aine-qui-fait-vivre-sa-famille',
    lang: 'fr',
    pair: 'eldest-child-breadwinner-pressure',
    theme: 'pressure',
    metaTitle: 'L’aîné qui fait vivre sa famille : l’histoire de Kévin',
    metaDescription:
      'Kévin, l’aîné, fait vivre sa famille depuis ses 19 ans et ne se repose jamais. Ce qui l’a aidé à souffler, et une petite chose à essayer cette semaine.',
    title: 'L’aîné qui porte toute la famille : la fatigue que Kévin a cachée',
    dek: 'Il porte sa famille depuis ses 19 ans. Il n’a jamais dit non, et il ne s’est jamais reposé. Voici ce qui a changé, petit à petit.',
    who: 'Kévin, 31 ans, chauffeur VTC à Marseille',
    photo: storyPhoto('fr', 'tired'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: '5 heures du matin, Kévin est déjà au volant',
        paragraphs: [
          'À cinq heures du matin, Kévin attend déjà sa première course près de la gare Saint-Charles, à Marseille. Il est l’aîné de cinq enfants. Depuis la mort de leur père, quand Kévin avait 19 ans, c’est lui qui fait vivre la famille et paie les études des plus jeunes.',
          'Laura est en troisième année d’école d’infirmières. Théo est en première. Jade, la petite dernière, est en sixième. Chaque semaine, il y a quelque chose à payer : la cantine, les fournitures, la carte de bus, le forfait du téléphone. Kévin couvre tout, plus l’électricité et les médicaments de leur mère que la mutuelle rembourse mal.',
          'Au lycée, Kévin rêvait d’être marin. Il venait d’entrer à l’école de la marine marchande quand leur père est mort. Il n’y est jamais retourné. Parfois, quand un ferry sort du port, il se surprend encore à le suivre des yeux.',
          'Il ne se plaint pas. « Ça va, je gère », répète-t-il. Certains après-midi, pourtant, il s’endort dans sa voiture garée, en attendant une course, la tête contre la vitre, le téléphone encore dans la main.',
          'Un soir, Théo lui a envoyé un message : « Kévin, la classe part en séjour à Barcelone, c’est 250 €. Désolé. » Kévin a fixé son téléphone. Il n’avait plus rien jusqu’à vendredi. Il a quand même répondu : « T’inquiète, je m’en occupe. » Puis il est sorti dans la rue et a pleuré là où personne ne pouvait le voir.',
        ],
        pullQuote:
          'Puis il est sorti dans la rue et a pleuré là où personne ne pouvait le voir.',
      },
      {
        kind: 'struggle',
        heading:
          'Pourquoi être l’aîné et le soutien de la famille épuise autant',
        paragraphs: [
          'L’argent pèse lourd. Plus lourd encore, il y a ce sentiment que si tu t’arrêtes, tout s’écroule. Kévin le portait chaque jour, même les jours où les courses marchaient bien.',
          'En tant qu’aîné, il avait appris tôt à faire passer les autres avant lui. Dans sa famille, personne ne parlait de fatigue. La question, c’était toujours « T’as de l’argent ? » Presque jamais « Et toi, ça va ? »',
          'Alors quand il était fatigué, il avait honte. Se reposer lui semblait presque une faute. Les jours où son dos l’empêchait de conduire, il restait éveillé toute la nuit à calculer comment rattraper l’argent perdu.',
          'Il y avait aussi de la colère, celle qu’il n’arrivait pas à s’avouer. De la colère contre la situation, et parfois contre ses frères et sœurs, qui ne semblaient pas comprendre combien c’était dur de gagner 250 €. Puis venait la culpabilité, parce qu’il les aimait tant. Ça tournait en rond : la fatigue, la colère, la culpabilité, et de nouveau la fatigue.',
          'Son corps criait aussi. Il avait toujours mal au dos et à la tête, et même épuisé, il se réveillait à deux heures du matin.',
          'Le plus dur, c’est qu’il n’avait personne à qui le dire. Il ne voulait pas ajouter aux soucis de sa mère. Ses amis avaient leurs propres problèmes. Alors il gardait tout pour lui, année après année.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Kévin, l’aîné qui faisait vivre la famille',
        paragraphs: [
          'Tout a commencé par une question qu’il n’attendait pas. Un samedi, Laura a remarqué quelque chose. « Kévin, ton dernier jour de repos, c’était quand ? » Il n’a pas su répondre. Il ne s’en souvenait pas.',
          'C’était la première fois qu’il disait la vérité. « Je suis épuisé, Laura. Je ne sais pas combien de temps je vais tenir. » Il s’attendait à ce qu’elle soit fâchée ou blessée. Elle l’a pris dans ses bras et a dit : « Pourquoi tu ne l’as pas dit plus tôt ? On va t’aider. »',
          'Un dimanche, les frères et sœurs et leur mère se sont assis autour de la table pour en parler. Ils ont noté toutes les dépenses au dos d’un vieux calendrier des pompiers. Laura donnerait des cours de soutien le week-end. Théo aiderait au marché le samedi matin. Ça ne rapportait pas grand-chose. Le vrai changement, c’est que Kévin avait enfin quelqu’un pour porter la charge avec lui.',
          'Il a aussi appris à dire non, en commençant petit. Quand un cousin lui a encore demandé de l’argent, il a répondu : « Désolé, je ne peux pas en ce moment. » Il a été nerveux toute la journée, et rien ne s’est écroulé.',
          'Il a commencé à prendre ses dimanches après-midi. Au début, ça lui semblait mal. Le matin, il allait au culte avec sa mère, puis il dormait longtemps en rentrant. Dans un groupe de maison de l’église, il a rencontré un homme plus âgé qui faisait lui aussi vivre sa famille. « On est pareils, en fait », a dit l’homme, et ils ont ri tous les deux.',
          'Il a aussi fait voir son dos à son médecin traitant. Le médecin lui a dit qu’il avait besoin de vrai repos et qu’il devait s’étirer avant et après ses journées au volant. Un conseil simple, et pour la première fois, il l’a suivi régulièrement.',
          '1 Pierre 5:7 est devenu sa prière avant chaque journée. Un par un, il confiait ses soucis à Dieu : la cantine, les médicaments, le séjour à Barcelone. Puis il essayait de les laisser là, même juste quelques heures.',
          'Certaines semaines sont encore dures, et certaines semaines l’argent manque toujours. C’est différent quand quelqu’un d’autre y réfléchit avec toi.',
        ],
        pullQuote: 'Il a été nerveux toute la journée, et rien ne s’est écroulé.',
      },
      {
        kind: 'hope',
        heading: 'Si toute la famille repose sur toi et que tu es à bout',
        paragraphs: [
          'Si c’est toujours sur toi que ta famille compte, tu connais cette fatigue-là. Tu les aimes, et tu n’en peux plus. Les deux peuvent être vrais en même temps.',
          'Aider ta famille, c’est de l’amour. Te reposer en fait partie aussi : c’est ce qui te laissera la force d’aider demain.',
          'Essaie d’en parler à une personne à la maison, même une seule. Fais la liste des dépenses avec elle. Choisis un petit « non » cette semaine, et une heure de repos rien que pour toi.',
          'Si tu te sens comme ça depuis plus de deux semaines, ou si ça commence à toucher ton travail et ton sommeil, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et ça aide.',
          'Si tu veux un point de départ aujourd’hui, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Pour les jours où tu n’as plus de forces, lis [J’en ai marre de tout](/tired-of-everything).',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : une discussion, un non',
      steps: [
        'Note tout ce que tu paies chaque mois, même les petites choses.',
        'Montre la liste à un frère, une sœur ou un parent et dis : « J’ai besoin d’aide pour ça. »',
        'Choisis une demande que tu refuseras calmement cette semaine.',
        'Bloque une heure de repos dans ton agenda et traite-la comme un rendez-vous.',
      ],
    },
    verse: '1pe-5-7',
    related: 'tired-of-everything',
    faq: [
      {
        q: 'Est-ce normal d’être à bout quand on fait vivre toute sa famille ?',
        a: 'Oui. Faire vivre toute une famille, c’est lourd, surtout quand tu le fais sans aide depuis des années. Ça s’allège quand quelqu’un partage les dépenses et que tu as quelqu’un à qui parler.',
      },
      {
        q: 'Comment dire à sa famille qu’on n’en peut plus de tout porter ?',
        a: 'Choisis un moment calme et dis-le clairement : « Je suis à bout et j’ai besoin d’aide. » Apporte la liste des dépenses pour parler ensemble d’un vrai plan.',
      },
    ],
    keywords: [
      'aîné de la famille pression',
      'faire vivre sa famille',
      'soutien de famille épuisé',
      'aider financièrement sa famille',
      'pression de l’aîné',
    ],
  },
  {
    slug: 'depression-post-partum-les-signes',
    lang: 'fr',
    pair: 'new-mom-feeling-overwhelmed',
    theme: 'low',
    metaTitle: 'Dépression post-partum : les premiers mois de Julie',
    metaDescription:
      'Julie aimait son bébé et pleurait chaque après-midi. Les signes de dépression post-partum qu’elle a failli manquer, ce qui l’a aidée, et quand consulter.',
    title: 'Jeune maman, cœur lourd : les signes que Julie a failli manquer',
    dek: 'Elle avait le bébé pour lequel elle avait tant prié, et elle pleurait pourtant chaque après-midi. Tout a commencé à changer le jour où elle a dit la vérité à sa sage-femme.',
    who: 'Julie, 30 ans, jeune maman près de Lille',
    photo: storyPhoto('fr', 'care'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le bébé pour lequel elle avait prié',
        paragraphs: [
          'Julie et son mari, Thomas, ont attendu quatre ans avant d’avoir un bébé. Quand Noé est né en mars, la moitié de la famille est passée à la maternité. Sa mère a fait sa valise la semaine même et s’est installée dans leur petite maison, près de Lille, pour aider.',
          'Tout le monde disait la même chose. « Tu dois être tellement heureuse. » Julie souriait et disait oui. Puis elle allait dans la salle de bains, ouvrait le robinet pour que personne n’entende, et pleurait.',
          'Ça ne s’est pas arrêté après la première semaine. Au deuxième mois, elle pleurait presque tous les après-midi. Elle ne ressentait rien quand Noé lui souriait, puis culpabilisait de ne rien ressentir. Elle s’énervait contre Thomas pour des détails, comme sa façon de plier les bodies. À trois heures du matin, en donnant le biberon, elle pensait : maman est peut-être une meilleure mère pour lui que moi.',
          'C’est sa mère qui l’a remarqué la première. Un après-midi, elle a pris Noé des bras de Julie, s’est assise à côté d’elle sur le lit et lui a demandé : « Ma chérie, ça fait combien de temps que tu es comme ça ? » Julie n’a pas pu répondre. Elle a secoué la tête et a pleuré encore plus fort.',
        ],
        pullQuote:
          'Puis elle allait dans la salle de bains, ouvrait le robinet pour que personne n’entende, et pleurait.',
      },
      {
        kind: 'struggle',
        heading:
          'Baby blues ou dépression post-partum : pourquoi Julie s’est tue',
        paragraphs: [
          'Julie avait entendu parler du baby blues. Beaucoup de jeunes mamans ont les larmes faciles, l’humeur en dents de scie et l’impression d’être submergées dans les deux semaines qui suivent l’accouchement, et ça passe en général tout seul. Alors elle s’est dit que ce n’était que ça, et elle a attendu.',
          'Ça n’est pas passé. La tristesse est restée des semaines. Elle avait perdu le goût des choses qu’elle aimait, dormait mal même quand Noé dormait, et se sentait nulle comme mère. Quelque part, elle savait que c’étaient des signes à prendre au sérieux, mais elle avait trop peur de les dire.',
          'La honte était le plus grand mur. Elle avait prié pour cet enfant. Comment pouvait-elle ressentir ça face à la réponse à sa prière ? Elle avait peur qu’à l’église, on pense que sa foi était faible, et que sa famille la trouve ingrate.',
          'Et elle était épuisée. Des biberons toutes les deux ou trois heures, un corps qui se remettait de l’accouchement, de la visite tous les week-ends. Avec une telle fatigue, c’est difficile de savoir où elle s’arrête et où commence quelque chose de plus lourd.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Julie à se retrouver',
        paragraphs: [
          'Sa mère a fait simple. « Je viens avec toi. On va en parler à ta sage-femme. » La semaine suivante, à son rendez-vous après l’accouchement, Julie a dit la vérité : les pleurs, le vide, la pensée de trois heures du matin.',
          'La sage-femme l’a écoutée calmement. Elle lui a dit que ça arrive à beaucoup de mères, que ça se soigne, et que le dire à voix haute était exactement ce qu’il fallait faire. Elle l’a orientée vers un médecin qui pouvait l’aider, et Julie a commencé un traitement. Dans les semaines qui ont suivi, lentement, le poids s’est levé.',
          'À la maison, la famille a changé quelques petites choses. Thomas s’est chargé du biberon de 2 heures en semaine pour que Julie puisse dormir d’une traite. Sa mère emmenait Noé en promenade tous les après-midi, à l’heure où Julie pleurait le plus, et Julie en profitait pour prendre une douche, manger un repas chaud ou juste s’allonger.',
          'Thomas a appris, lui aussi. Il lisait sur la dépression post-partum pendant sa pause déjeuner et a arrêté de prendre ses mots durs pour lui. « Tu es épuisée et tu traverses quelque chose de difficile, mon amour. Je suis là », lui a-t-il dit un soir.',
          'Julie a aussi arrêté de se cacher. Elle en a parlé à deux amies de l’église, mamans toutes les deux. L’une d’elles a dit : « Moi aussi, après mon premier. » Julie ne l’avait jamais su. Elles ont créé un groupe de discussion où elles pouvaient tout envoyer, même « journée difficile » à quatre heures du matin.',
          'Elle priait par petits morceaux. Ésaïe 40:31 était scotché sur le placard au-dessus du stérilisateur, et elle le lisait pendant que l’eau chauffait. Certains jours, c’était la seule prière qu’elle avait, et ça suffisait pour ce jour-là.',
        ],
        pullQuote: 'Julie ne l’avait jamais su.',
      },
      {
        kind: 'hope',
        heading: 'Si tu viens d’avoir un bébé et que tu ressens ça',
        paragraphs: [
          'Si tu viens d’avoir un bébé et que le moral est au plus bas, que tu ne ressens plus rien ou que tout te dépasse, ça ne dit rien de mal sur la mère que tu es. Ton corps et ta vie entière ont changé d’un coup.',
          'Avoir les larmes faciles pendant les deux premières semaines est fréquent. Si la tristesse dure plus de deux semaines, ou si elle t’empêche de prendre soin de toi ou de ton bébé, parles-en à ta sage-femme ou à un médecin. Si tu as des pensées de te faire du mal ou de faire du mal à ton bébé, dis-le tout de suite à ton médecin. C’est une démarche normale, et se faire aider, ça marche.',
          'Si tu penses à mettre fin à ta vie, appelle le 3114, le numéro national de prévention du suicide, gratuit, 24h/24 et 7j/7. En cas de danger immédiat, appelle le 112 (ou le 15).',
          'Aujourd’hui, laisse quelqu’un te décharger d’une chose, même un biberon ou une heure. Quand le moment te semble venu pour un petit pas de plus, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser pendant les biberons de trois heures du matin, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. La page [Je déprime](/i-feel-depressed) est un bon point de départ.',
        ],
      },
    ],
    tryThis: {
      title: 'Aujourd’hui : confier une chose',
      steps: [
        'Choisis l’heure la plus difficile de ta journée et demande à quelqu’un de prendre le bébé à ce moment-là.',
        'Utilise cette heure pour un seul besoin : dormir, te doucher ou manger un repas chaud.',
        'Écris à une personne de confiance : « Journée difficile. Je peux t’appeler plus tard ? »',
        'Note comment se sont passées tes journées cette semaine et apporte tes notes à ton prochain rendez-vous.',
      ],
    },
    verse: 'isa-40-31',
    related: 'i-feel-depressed',
    faq: [
      {
        q: 'Quels sont les signes de la dépression post-partum ?',
        a: 'Une tristesse, un sentiment de vide ou des pleurs qui durent plus de deux semaines après l’accouchement, une perte d’intérêt pour les choses, un mauvais sommeil même quand le bébé dort, et un sentiment d’inutilité ou de culpabilité. Si tu remarques ces signes, parles-en à ta sage-femme ou à un médecin.',
      },
      {
        q: 'Est-ce normal d’être triste après la naissance de son bébé ?',
        a: 'Avoir les larmes faciles et l’impression que tout déborde pendant les deux premières semaines est fréquent, et ça passe en général. Si ça dure plus longtemps, ou si tu as des pensées de te faire du mal ou de faire du mal à ton bébé, dis-le tout de suite à ton médecin. Si tu penses à mettre fin à ta vie, appelle le 3114, gratuit, 24h/24.',
      },
    ],
    keywords: [
      'dépression post-partum symptômes',
      'baby blues ou dépression post-partum',
      'jeune maman débordée',
      'triste après l’accouchement',
      'dépression après bébé',
    ],
  },
  {
    slug: 'stress-des-etudes-et-du-memoire',
    lang: 'fr',
    pair: 'college-stress-thesis',
    theme: 'pressure',
    metaTitle: 'Stress des études : comment Lucas a tenu le coup',
    metaDescription:
      'Lucas a craqué à 2 heures du matin à cause de son projet de fin d’études et de la peur de décevoir ses parents. Ce qui l’a aidé, et une chose à essayer.',
    title:
      'Projet de fin d’études, une crise à 2 heures du matin, et ce qui a aidé Lucas',
    dek: 'Il était le premier de sa famille à faire des études d’ingénieur. Quand le projet a commencé à s’effondrer, il s’est effondré aussi, jusqu’au jour où il a osé dire la chose difficile à voix haute.',
    who: 'Lucas, 22 ans, étudiant ingénieur à Toulouse',
    photo: storyPhoto('fr', 'sleep'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'La nuit où le fichier ne voulait plus s’ouvrir',
        paragraphs: [
          'Lucas était en quatrième année de génie civil dans une école d’ingénieurs de Toulouse. Il partageait une colocation près du campus avec trois autres étudiants. Ses parents tenaient une petite quincaillerie dans le Gers, et il était le premier de la famille à faire des études d’ingénieur.',
          'Chaque semaine, sa mère lui envoyait le même message : « Alors, ce projet, mon grand ? On est fiers de toi. » Il répondait avec un pouce levé. Il ne leur disait pas que les données du groupe étaient un vrai fouillis, que l’encadrant du groupe avait renvoyé la troisième partie deux fois, et que la soutenance était dans cinq semaines.',
          'Un mardi, à deux heures du matin, après trois nuits de quatre heures de sommeil, son ordinateur a planté et le fichier ne voulait plus s’ouvrir. Quelque chose en lui a lâché. Il s’est assis par terre dans la salle de bains, les mains tremblantes, à pleurer si fort qu’il arrivait à peine à respirer. Il ne pensait qu’à une chose : je vais rater, et tout ce qu’ils ont fait pour moi n’aura servi à rien.',
          'Son colocataire, Bastien, a frappé. « Ça va, mec ? » Lucas a dit oui. Bastien n’est pas parti. Il s’est assis derrière la porte jusqu’à ce que Lucas sorte, lui a tendu un verre d’eau et a dit : « Viens, je nous fais des pâtes. »',
        ],
        pullQuote: 'Bastien n’est pas parti.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi le stress de fin d’études frappe si fort',
        paragraphs: [
          'La dernière ligne droite empile tout en même temps : les rendus des autres matières, des camarades de groupe avec leurs propres soucis, un encadrant qui a peu de temps, et une soutenance qui semble décider de tout ton avenir.',
          'Pour Lucas, le travail n’était que la moitié du problème. L’autre moitié, c’était ce qu’il représentait. Son loyer et ses frais d’école venaient des sacs de ciment et des boîtes de clous que vendait son père. Échouer, c’était les décevoir, alors il cachait chaque mauvaise semaine et répétait « ça va » jusqu’à ce qu’il n’en reste plus rien.',
          'Son corps payait aussi : peu de sommeil, trop de café soluble, des repas sautés, aucun jour de repos. Après des semaines comme ça, les petits problèmes finissent par ressembler à la fin du monde. Un ordinateur planté a été la goutte d’eau.',
          'Et puis il y avait les réseaux. D’autres groupes postaient des photos de rapports terminés et de soirées pour fêter ça. Chaque publication semblait prouver qu’il était en retard.',
          'Il croyait aussi que demander de l’aide voulait dire qu’il était faible. Tout le monde avait l’air de s’en sortir. Des mois plus tard, il a appris que la plupart de sa promo ressentait la même chose, et que tous se le cachaient.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Lucas à gérer le stress des études',
        paragraphs: [
          'Devant une assiette de pâtes à trois heures du matin, Lucas a tout raconté à Bastien. Bastien a écouté, puis l’a aidé à découper les cinq semaines suivantes en une liste sur une serviette en papier : ce qui était à rendre, qui s’en occupait, et ce qui pouvait attendre.',
          'Le lendemain, Lucas a fait ce qu’il évitait depuis un mois. Il a écrit à leur encadrant, expliqué où le groupe bloquait et demandé quinze minutes. L’encadrant leur en a accordé trente et a trouvé le problème dans leurs données en dix. « Il fallait venir me voir plus tôt », a-t-il dit.',
          'Lucas s’est fixé quelques règles pour les cinq dernières semaines : au lit avant une heure du matin, sans exception, un vrai repas par jour avec quelqu’un, et une heure chaque dimanche sans rien qui touche au projet. Il était sûr de perdre du temps. En fait, son travail s’est amélioré, parce qu’il arrivait enfin à réfléchir.',
          'Bastien gardait un œil sur lui. Vers minuit, il frappait et posait une seule question : « Tu vas bientôt dormir ? » La plupart des soirs, Lucas fermait l’ordinateur.',
          'Bastien lui a conseillé le service de santé universitaire, et Lucas y est allé, nerveux tout le long du chemin. La psychologue l’a aidé avec la panique qui le prenait chaque fois qu’il ouvrait le fichier, et avec la voix dans sa tête qui disait qu’une mauvaise note faisait de lui un raté.',
          'Puis il a appelé chez lui. « Maman, c’est plus dur que prévu. Je vais peut-être prendre du retard. » Il s’attendait au pire. Sa mère est restée silencieuse un moment, puis elle a dit : « Mon grand, tu comptes plus que le diplôme. Rentre à la maison ce week-end. » Il est rentré, a dormi douze heures et a mangé la garbure de sa mère. Au dîner du dimanche, son père a prié pour lui, ce que Lucas n’avait plus entendu depuis qu’il était petit.',
          'La veille de la soutenance, sa mère lui a envoyé Matthieu 6:34 par texto. Ils ont validé, avec des corrections à faire.',
        ],
        pullQuote: 'Mon grand, tu comptes plus que le diplôme.',
      },
      {
        kind: 'hope',
        heading: 'Si le stress des études t’écrase en ce moment',
        paragraphs: [
          'Si tu lis ceci à deux heures du matin avec ton mémoire ouvert dans un autre onglet, ferme-le pour ce soir. Un cerveau reposé règle en une heure ce contre quoi un cerveau fatigué se bat toute la nuit.',
          'Ton travail compte, et tu comptes encore plus. Un chapitre en retard, ça se rattrape. Un corps qui tourne avec trois heures de sommeil a d’abord besoin de soin.',
          'Demain, fais une seule chose : dis à quelqu’un à quel point c’est vraiment dur, que ce soit un colocataire, quelqu’un de ta promo, ton encadrant ou tes parents. La plupart des gens veulent aider et n’ont aucune idée que tu en as besoin.',
          'Si tout te semble sans espoir, ou si tu n’arrives plus à dormir ni à suivre le quotidien depuis plus de deux semaines, parles-en au service de santé de ton université ou à un médecin. C’est une démarche normale, et se faire aider, ça marche.',
          'Si tu veux un point de départ tout de suite, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser les soirs de révisions, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Si tu tournes à vide, lis [J’en ai marre de tout](/tired-of-everything).',
        ],
      },
    ],
    tryThis: {
      title: 'Aujourd’hui : le plan de la serviette en papier',
      steps: [
        'Note tout ce que tu dois rendre dans les deux prochaines semaines.',
        'À côté de chaque chose, écris la toute prochaine étape, assez petite pour être finie en 30 minutes.',
        'Envoie un message pour demander de l’aide : à ton encadrant, à quelqu’un de ton groupe ou à un ami.',
        'Choisis l’heure où tu arrêteras de travailler ce soir, et tiens-la.',
      ],
    },
    verse: 'mat-6-34',
    related: 'tired-of-everything',
    faq: [
      {
        q: 'Comment gérer le stress du mémoire ou du projet de fin d’études ?',
        a: 'Découpe le travail en petites étapes, va voir ton encadrant tôt quand tu bloques, et protège ton sommeil et tes repas. Si le stress t’empêche de fonctionner pendant des semaines, parles-en au service de santé de ton université.',
      },
      {
        q: 'Est-ce normal de craquer à cause du stress des études ?',
        a: 'Beaucoup d’étudiants atteignent un point de rupture quand la pression s’accumule pendant des semaines sans repos. C’est un signe qu’il faut ralentir et se faire aider, et en parler à quelqu’un de confiance est un bon premier pas.',
      },
    ],
    keywords: [
      'stress des études',
      'stress mémoire',
      'stress soutenance',
      'pression des études',
      'burn-out étudiant',
    ],
  },
  {
    slug: 'solitude-dans-une-nouvelle-ville',
    lang: 'fr',
    pair: 'lonely-in-a-new-city',
    theme: 'lonely',
    metaTitle: 'Solitude dans une nouvelle ville : Pauline à Paris',
    metaDescription:
      'Pauline a quitté Pau pour un poste à Paris et dînait seule depuis des mois. Ce qui l’a aidée face à la solitude dans une nouvelle ville, un petit pas à la fois.',
    title: 'La solitude dans une nouvelle ville : la première année de Pauline',
    dek: 'Le poste, c’était le rêve. Les week-ends, c’était le plus dur. Voici comment Pauline a peu à peu fait de Paris un endroit un peu plus à elle.',
    who: 'Pauline, 24 ans, nouvelle à Paris, originaire de Pau',
    photo: storyPhoto('fr', 'alone'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Dîner seule au milieu de millions de gens',
        paragraphs: [
          'Pauline a reçu l’offre en janvier : un poste d’analyste junior dans une banque à La Défense. Sa famille, à Pau, a fêté ça avec un gâteau basque de la boulangerie d’à côté. Deux semaines plus tard, elle déballait ses cartons dans un studio de 18 m² à Montreuil, à peine plus grand que son ancienne chambre.',
          'La semaine, ça allait. Le travail l’occupait, et le métro mangeait le reste de la journée. Le week-end, c’était autre chose. Le samedi matin, elle se réveillait dans le silence. Elle dînait debout devant le plan de travail, en regardant des vidéos de chez elle. Sa mère appelait tous les dimanches. « Qu’est-ce que tu as mangé, ma puce ? » Pauline racontait toujours quelque chose de plus joli que la vérité.',
          'Elle se disait que c’était temporaire. Une fois habituée à la ville, ça irait mieux. Les mois ont passé, et les week-ends sont restés les mêmes.',
          'Au travail, tout le monde avait déjà sa bande. Les collègues sortaient boire un verre après le boulot avec des amis rencontrés des années avant son arrivée. Pauline souriait à la machine à café, disait « bonne soirée » devant l’ascenseur et rentrait chez elle.',
          'Un samedi de mai, ça lui est tombé dessus. Elle n’avait pas dit un seul mot à voix haute depuis vendredi après-midi. Elle s’est assise par terre dans son studio et a pleuré, puis s’est trouvée bête de pleurer. Elle avait le poste qu’elle voulait. Pourquoi se sentait-elle comme ça ?',
        ],
        pullQuote:
          'Elle n’avait pas dit un seul mot à voix haute depuis vendredi après-midi.',
      },
      {
        kind: 'struggle',
        heading:
          'Pourquoi la solitude pèse autant quand on arrive dans une nouvelle ville',
        paragraphs: [
          'Pauline n’avait jamais vraiment vécu seule. À Pau, il y avait toujours une tante qui passait, un cousin au portail, le culte du dimanche avec les mêmes visages depuis l’enfance. Elle ne s’était jamais fait d’amis en partant de zéro. Ils avaient toujours été là.',
          'À Paris, tout demandait un effort, et la solitude vide justement l’énergie dont cet effort a besoin. Après une longue semaine, rester chez elle semblait plus facile qu’entrer dans une pièce pleine d’inconnus. Chaque week-end passé à la maison rendait le suivant plus difficile.',
          'Elle avait aussi l’impression de ne pas avoir le droit de se plaindre. C’était elle qui était partie, elle qui avait le bon poste. Dire « je me sens seule » lui semblait avouer un échec.',
          'La solitude changeait aussi sa façon de lire les gens. Une collègue qui répondait tard semblait agacée contre elle. Un déjeuner où on ne l’avait pas invitée devenait la preuve qu’elle n’avait pas sa place. La plupart du temps, elle l’a compris plus tard, tout ça se passait dans sa tête fatiguée.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Pauline à se sentir moins seule',
        paragraphs: [
          'Le changement a commencé petit. Une collègue, Mélanie, a mentionné qu’elle venait de Bayonne. Pauline a failli laisser passer le moment. Puis elle a dit : « Moi, je suis de Pau. On déjeune ensemble ? » Elles ont mangé à la cantine de la tour et sont tombées d’accord : à Paris, personne ne sait ce qu’est une chocolatine.',
          'Pauline s’est fixé une règle : dire oui à une chose par semaine, même fatiguée, comme un pot d’équipe le vendredi ou un club de course à pied qui se retrouvait le samedi à 7 heures le long du canal. La plupart des semaines, c’était gênant. Certaines semaines, ça ne l’était pas, et ça suffisait pour continuer.',
          'Elle a trouvé une église évangélique près de chez elle et y est allée trois dimanches de suite avant que quelqu’un lui parle. Le troisième dimanche, une femme, Nathalie, lui a proposé de rejoindre un groupe de maison de jeunes actifs qui se retrouvait le mercredi soir. Pauline y est allée. Six mois plus tard, c’était la soirée qu’elle attendait toute la semaine.',
          'Elle a fait de son studio un endroit à elle : une petite plante du marché aux fleurs, une photo encadrée de sa famille sur la plage de Biarritz, et une cocotte pour cuisiner la poule au pot de sa mère le dimanche. L’odeur de la maison rendait le silence plus facile.',
          'Elle a arrêté de faire semblant avec sa mère. Un dimanche, au téléphone, elle a dit : « Maman, des fois, je me sens seule ici. » Sa mère n’a pas paniqué. Elle s’est mise à lui envoyer des messages vocaux chaque matin, des petites nouvelles du chien et du figuier du voisin. Pauline les écoutait dans le métro.',
          'Les soirs les plus durs, elle lisait Psaumes 46:2. Sa grand-mère l’avait recopié sur la première page de la Bible que Pauline avait emportée.',
        ],
        pullQuote:
          'La plupart des semaines, c’était gênant. Certaines semaines, ça ne l’était pas, et ça suffisait pour continuer.',
      },
      {
        kind: 'hope',
        heading: 'Si la solitude te pèse dans une nouvelle ville',
        paragraphs: [
          'Si tu as déménagé pour le travail ou les études et que tes week-ends sont silencieux, cette solitude se comprend. Tu as laissé derrière toi tout un réseau de gens, et un nouveau réseau prend du temps à se tisser.',
          'Choisis un petit oui cette semaine : un déjeuner, un cours, un culte, ou un bonjour à quelqu’un de ta région. Certains seront gênants, et il suffit que quelques-uns marchent.',
          'Si la solitude devient une tristesse qui dure plus de deux semaines, ou si elle commence à toucher ton sommeil et ton travail, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Et pour ce soir, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un quand l’appartement est trop calme. Tu aimeras peut-être aussi la page [Personne à qui parler](/i-feel-alone).',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : un petit oui',
      steps: [
        'Regarde ta semaine et choisis une chose à laquelle dire oui : un déjeuner, un cours ou un culte.',
        'Écris à quelqu’un de chez toi juste pour dire bonjour, sans raison particulière.',
        'Apprends le prénom d’une personne que tu croises souvent, comme le gardien ou la boulangère.',
        'Un week-end calme, prévois une raison de sortir, même une balade jusqu’à un café.',
      ],
    },
    verse: 'psa-46-1',
    related: 'i-feel-alone',
    faq: [
      {
        q: 'Est-ce normal de souffrir de solitude après un déménagement dans une nouvelle ville ?',
        a: 'Oui. Tu as laissé ta famille et tes amis derrière toi, et les nouvelles amitiés mettent des mois à se créer. En général, ça s’apaise à mesure que tu construis de petites habitudes avec des gens.',
      },
      {
        q: 'Comment se faire des amis dans une nouvelle ville quand on est adulte ?',
        a: 'Dis oui à de petites choses régulières où tu revois les mêmes personnes chaque semaine, comme un groupe de maison à l’église, un cours ou un club. C’est en revoyant les mêmes visages, encore et encore, que les amitiés commencent.',
      },
    ],
    keywords: [
      'solitude nouvelle ville',
      'se sentir seule à Paris',
      'se faire des amis à l’âge adulte',
      'déménager seule dans une nouvelle ville',
      'solitude',
    ],
  },
  {
    slug: 'quand-dieu-semble-loin',
    lang: 'fr',
    pair: 'when-god-feels-far',
    theme: 'faith',
    metaTitle: 'Quand Dieu semble loin : un chrétien face à la dépression',
    metaDescription:
      'Mathieu servait à l’église chaque dimanche, et ses prières sonnaient creux. Ce qui l’a aidé quand Dieu semblait loin, et pourquoi le médecin en faisait partie.',
    title: 'Quand Dieu semble loin : la longue saison silencieuse de Mathieu',
    dek: 'Il menait la louange chaque dimanche alors que ses propres prières lui semblaient vides. Un pasteur qui a écouté, un médecin et quelques amis honnêtes l’ont aidé à traverser.',
    who: 'Mathieu, 34 ans, bénévole dans son église à Strasbourg',
    photo: storyPhoto('fr', 'hope'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Chanter le dimanche, se taire le reste de la semaine',
        paragraphs: [
          'Mathieu servait dans l’équipe de louange de son église, à Strasbourg, depuis douze ans. Il installait la sono à 8 heures, jouait de la guitare pendant le culte et restait pour ranger les chaises. Pour tout le monde, c’était un peu le grand frère, même pour ceux qui étaient plus âgés que lui.',
          'L’année de ses 33 ans, quelque chose s’est tu en lui. Il jouait toujours chaque dimanche et connaissait toujours chaque accord. À la maison, pourtant, ses prières semblaient se cogner au plafond et retomber. Il ouvrait sa Bible, et les pages n’étaient plus que du papier.',
          'Ça s’est étendu. La nourriture n’avait plus de goût. Il dormait mal et se réveillait fatigué. Il s’emportait contre sa femme pour un rien, puis restait vingt minutes dans la voiture avant de rentrer. Les semaines sont devenues des mois.',
          'Un dimanche après le culte, il s’est assis dans la salle vide pendant que les autres partageaient le repas. Il a murmuré : « Seigneur, où es-tu ? » Rien ne semblait répondre. Il se sentait comme un imposteur à chanter des chants de joie.',
        ],
        pullQuote: 'Il a murmuré : « Seigneur, où es-tu ? »',
      },
      {
        kind: 'struggle',
        heading:
          'Pourquoi Dieu peut sembler loin quand on traverse une dépression',
        paragraphs: [
          'Pour un croyant, une saison comme celle-là pèse encore plus. Mathieu avait le moral au plus bas, et en plus, il culpabilisait d’avoir le moral au plus bas. Est-ce qu’il n’était pas censé avoir de la joie ? Est-ce que la foi n’était pas censée régler ça ?',
          'Il avait entendu des gens affirmer, à tort, que la dépression venait d’un manque de foi ou d’un péché caché. Alors il a confessé tout ce qui lui venait à l’esprit et a prié plus longtemps. Comme rien ne changeait, il en a conclu que le problème, c’était lui.',
          'Certains amis, pleins de bonnes intentions, ont aggravé les choses. L’un lui a dit de « proclamer sa joie ». Un autre a dit qu’il devait subir une attaque spirituelle. Mathieu hochait la tête, les remerciait et rentrait chez lui en se sentant encore plus seul.',
          'La dépression peut éteindre ce qu’on ressentait dans la prière et la louange, comme elle éteint le goût de la nourriture ou le plaisir d’une belle chanson. Ce vide a convaincu Mathieu que Dieu était parti. C’était le poids de la dépression qui parlait, et il ressemblait beaucoup à sa propre voix.',
          'Il continuait à servir, parce qu’arrêter lui semblait avouer un échec. Personne à l’église ne savait. C’était lui qu’on venait voir quand on avait besoin d’aide.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ce qui a aidé Mathieu quand Dieu semblait loin',
        paragraphs: [
          'C’est sa femme, Claire, qui a fini par le dire. « Tu ne vas pas bien, Mathieu. Va parler au pasteur. » Il a failli ne pas y aller. Il avait peur qu’on lui dise de prier plus fort.',
          'Le pasteur Daniel l’a écouté pendant une heure sans l’interrompre. Puis il a ouvert sa Bible au psaume 42 et l’a lu lentement. « L’homme qui a écrit ça ressentait le même poids, a-t-il dit. Il a continué à parler à Dieu quand même. Tes questions sont encore des prières. » Puis il a ajouté quelque chose que Mathieu n’attendait pas : « Je veux aussi que tu voies un médecin. Dieu agit aussi à travers les médecins. »',
          'Mathieu a vu un médecin le mois suivant. Le médecin a diagnostiqué une dépression, a commencé un traitement et l’a orienté vers un psychologue. Il a fallu plusieurs semaines avant qu’il remarque une différence. Le premier signe était tout petit : un matin, le café a de nouveau eu le goût du café.',
          'Il a pris trois mois de pause dans l’équipe de louange. Le responsable de l’équipe lui a dit : « Ta place est là quand tu seras prêt. Repose-toi d’abord. » Mathieu s’asseyait au dernier rang avec Claire et laissait d’autres mener les chants.',
          'Ses prières ont changé de forme. Certains jours, elles tenaient en une phrase, avec Psaumes 42:12 sur un post-it collé au tableau de bord. D’autres jours, il restait en silence et faisait confiance à Dieu, présent même quand il ne le sentait pas. Quelques hommes de son groupe de maison se sont mis à lui écrire chaque vendredi : « Un café ? » La plupart des vendredis, il a dit oui.',
          'Claire est restée tout près pendant tout ce temps. La plupart des soirs, elle s’asseyait avec lui sur le balcon, parfois pour parler, parfois juste pour écouter la pluie.',
          'Ça a été une longue saison, presque un an. Quand Mathieu a repris sa guitare, il a joué les mêmes chants. Ils comptaient davantage, maintenant. Il savait ce que c’était de les chanter dans le noir.',
        ],
        pullQuote: 'Tes questions sont encore des prières.',
      },
      {
        kind: 'hope',
        heading: 'Si Dieu te semble loin en ce moment',
        paragraphs: [
          'Si tu crois et que tu te sens quand même vide, ta foi est toujours là. Beaucoup de personnes dans la Bible se sont senties loin de Dieu et ont continué à lui parler malgré tout. Dis-lui exactement ce que tu ressens. Ça compte comme une prière.',
          'Les saisons comme celle de Mathieu ont une fin. Beaucoup de gens en ressortent avec une foi plus calme et plus stable, une foi qui sait que Dieu reste même quand les émotions s’en vont.',
          'Parles-en aussi à une personne : un pasteur, un responsable de groupe de maison, un ami qui saura écouter. Si ce poids dure plus de deux semaines, ou si tu as perdu l’envie de faire ce que tu aimais, va voir un médecin ou un psychologue. Se faire soigner fait partie de prendre soin de la vie que Dieu t’a donnée, et se faire aider, ça marche.',
          'Quand tu veux un point de départ, [HopeBegins](/) est gratuit et porté par la foi chrétienne. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Pour les jours lourds, lis [Versets bibliques pour les jours où ça ne va pas](/bible-verses-when-you-feel-down).',
        ],
      },
    ],
    tryThis: {
      title: 'Aujourd’hui : une prière honnête en une phrase',
      steps: [
        'Écris à Dieu une phrase honnête sur ce que tu ressens, même « Je n’arrive pas à te sentir proche en ce moment ».',
        'Lis le psaume 42 lentement, à voix haute si tu peux.',
        'Écris à une personne de ton église : « On peut parler cette semaine ? »',
        'Si ce poids dure depuis des semaines, prends rendez-vous chez un médecin aujourd’hui.',
      ],
    },
    verse: 'psa-42-11',
    related: 'bible-verses-when-you-feel-down',
    faq: [
      {
        q: 'Un chrétien peut-il faire une dépression ?',
        a: 'Oui. La dépression est un problème de santé qui peut toucher tout le monde, y compris des personnes à la foi solide. Elle ne vient pas d’un manque de foi. La prière et l’aide d’un médecin ou d’un psychologue peuvent aller ensemble.',
      },
      {
        q: 'Que faire quand Dieu semble loin ?',
        a: 'Continue à lui parler honnêtement, même en une seule phrase, et lis les Psaumes, où des croyants prient à travers ce même sentiment. Parles-en à un pasteur ou à un ami, et consulte un médecin si ce poids dure plus de deux semaines.',
      },
    ],
    keywords: [
      'quand Dieu semble loin',
      'chrétien et dépression',
      'un chrétien peut-il faire une dépression',
      'foi et dépression',
      'se sentir loin de Dieu',
    ],
  },
  {
    slug: 'anxiete-sociale-petits-pas',
    lang: 'fr',
    pair: 'social-anxiety-small-steps',
    theme: 'anxiety',
    metaTitle: 'Anxiété sociale : ce qui a aidé Emma à rester',
    metaDescription:
      'Emma répétait chaque phrase et a failli annuler les retrouvailles du lycée. Les petits pas contre l’anxiété sociale qui l’ont aidée à rester, et un à essayer.',
    title:
      'Les retrouvailles qu’Emma a failli manquer : des petits pas contre l’anxiété sociale',
    dek: 'Elle répétait chaque phrase sous la douche et voulait quand même annuler. Voici ce qui l’a aidée à entrer, à rester un moment et à revenir la fois suivante.',
    who: 'Emma, 22 ans, jeune diplômée à Rennes',
    photo: storyPhoto('fr', 'talk'),
    published: '2026-10-30',
    parts: [
      {
        kind: 'story',
        heading: 'Le message de groupe qui lui a noué le ventre',
        paragraphs: [
          'Le message est arrivé un lundi : « Retrouvailles samedi, 18 heures chez Tom. » Douze personnes de la bande du lycée d’Emma, à Rennes, réunies pour la première fois depuis le bac.',
          'Tout le monde a répondu avec des stickers. Emma a tapé « Je suis partante » et a senti son ventre se nouer. Le reste de la semaine, elle a répété. Qu’est-ce qu’elle dirait quand on lui demanderait ce qu’elle faisait ? Elle cherchait encore du travail. Et si elle riait au mauvais moment ? Et si personne ne lui parlait ?',
          'Le samedi, elle s’est changée trois fois. À 17h45, elle était devant le portail de Tom, sous la pluie, le parapluie dans une main, le téléphone dans l’autre, le cœur battant. Elle a tapé : « Désolée, je ne me sens pas bien ce soir. » Son pouce est resté au-dessus du bouton d’envoi.',
          'Ce n’était pas la première fois. Elle était déjà partie tôt de soirées, avait manqué les 18 ans d’une cousine et évité la visite des locaux après un entretien d’embauche. Après, elle se sentait soulagée pendant une heure et seule pendant une semaine.',
          '« Toujours aussi sauvage, Emma », la taquinaient ses tantes aux repas de famille. Emma riait avec elles. À l’intérieur, elle aurait voulu que quelqu’un comprenne à quel point elle avait peur.',
        ],
        pullQuote:
          'Après, elle se sentait soulagée pendant une heure et seule pendant une semaine.',
      },
      {
        kind: 'struggle',
        heading: 'Pourquoi l’anxiété sociale donne envie d’annuler',
        paragraphs: [
          'L’anxiété sociale va plus loin que la timidité. C’est une peur forte du jugement, du regard des autres ou de la gêne, assez forte pour qu’on se mette à éviter des choses qu’on a vraiment envie de faire.',
          'Chez Emma, la peur commençait des jours avant. Elle se jouait chaque conversation possible dans sa tête, et dans la plupart, elle se ridiculisait. Son corps s’y mettait aussi : le cœur qui s’emballe, le visage qui chauffe, la gorge serrée.',
          'Éviter marchait sur le moment. Annuler faisait retomber la peur tout de suite. Le piège, c’est que son esprit retenait « c’était dangereux, heureusement qu’on y a échappé », et l’invitation suivante faisait encore plus peur.',
          'Elle s’observait aussi sans arrêt. Pendant que les autres parlaient, elle surveillait son visage, sa voix, ses mains. Ça l’empêchait de vraiment écouter, et les conversations semblaient encore plus gênantes.',
          'Se faire traiter de timide ou de sauvage rendait tout ça encore plus difficile à dire. Emma pensait que c’était juste son caractère, quelque chose qu’elle devrait toujours supporter.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Les petits pas qui ont aidé Emma à rester',
        paragraphs: [
          'Devant le portail, Emma a fait ce que sa grande sœur lui avait appris. Elle a effacé le message, mis le téléphone dans sa poche et respiré : inspirer sur 4, expirer sur 6, cinq fois. Son cœur battait toujours fort, et elle est entrée quand même.',
          'Elle s’est fixé un petit objectif clair : rester une heure et parler à deux personnes. Après ça, elle était libre de partir. Savoir qu’elle avait une porte de sortie rendait la porte d’entrée plus facile à franchir.',
          'Elle s’est trouvé une tâche. Elle a aidé la mère de Tom à installer l’apéro : les quiches, les chips, les tartinades. Avoir quelque chose dans les mains donnait à son attention un endroit où aller, et les gens venaient vers elle.',
          'Elle a dit la vérité à une amie. Elle a pris à part Zoé, sa voisine de table depuis la sixième, et lui a avoué : « J’ai vraiment eu du mal à entrer. » Zoé a ri gentiment. « Moi aussi. C’est pour ça que je reste collée au buffet. » Après ça, elles ont veillé l’une sur l’autre toute la soirée.',
          'Elle a tourné son attention vers les autres. Elle s’est intéressée à ses amis. « Alors, ton master, ça se passe comment ? » « Tu bosses où, maintenant ? » Poser des questions détournait les projecteurs d’elle, et les gens adoraient qu’on leur en pose.',
          'Elle est restée trois heures. Dans le bus du retour, elle a remarqué que la peur avait rétréci. Ce soir-là, elle a encore repassé quelques moments gênants dans sa tête, mais elle se souvenait aussi des rires.',
          'Les mois suivants, elle a continué à s’entraîner avec de petites choses : commander au comptoir, poser une question pendant un entretien, dire bonjour la première. Elle a vu une psychologue en ville, qui l’a aidée à sortir de ses répétitions sans fin. Avant les journées difficiles, elle priait en pensant à Jean 14:27 et demandait la paix pour l’heure à venir, rien de plus.',
        ],
        pullQuote:
          'Son cœur battait toujours fort, et elle est entrée quand même.',
      },
      {
        kind: 'hope',
        heading: 'Si l’anxiété sociale te retient',
        paragraphs: [
          'Si tu répètes tes conversations à l’avance, si tu redoutes les soirées ou si tu annules à la dernière minute, ce que tu vis est bien réel, et ça peut s’améliorer avec de l’entraînement.',
          'L’anxiété sociale est fréquente, et beaucoup de gens apprennent à bien la gérer, avec de l’entraînement et du soutien.',
          'Commence plus petit que tu ne le penses : une courte visite avec une heure de départ claire, ou une question à poser à quelqu’un d’autre. Chaque fois que tu restes, ton esprit apprend que la pièce était moins dangereuse qu’il ne le craignait.',
          'Si la peur t’empêche de travailler, d’étudier ou de voir des gens depuis plus de deux semaines, parles-en à un médecin ou à un psychologue. C’est une démarche normale, et se faire aider, ça marche.',
          'Si tu veux de l’aide pour commencer, [HopeBegins](/) est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser dans les minutes avant d’entrer, quelqu’un qui prie pour toi, et des lignes d’écoute gratuites pour parler à quelqu’un. Pour calmer ton corps rapidement, va voir [Comment calmer son anxiété](/how-to-calm-anxiety).',
        ],
      },
    ],
    tryThis: {
      title: 'Cette semaine : un petit oui, pas trop long',
      steps: [
        'Choisis une petite sortie que tu évites depuis un moment.',
        'Décide de ton heure de départ avant d’y aller : une heure, et ensuite tu peux partir.',
        'Avant d’entrer, inspire sur 4 et expire sur 6, cinq fois.',
        'Prépare une question à poser à quelqu’un, comme « Et le boulot, ça se passe comment ? »',
      ],
    },
    verse: 'jhn-14-27',
    related: 'how-to-calm-anxiety',
    faq: [
      {
        q: 'Quelle est la différence entre la timidité et l’anxiété sociale ?',
        a: 'La timidité, c’est un peu de nervosité face à des gens nouveaux. L’anxiété sociale, c’est une peur forte du jugement des autres, qui pousse à éviter des choses que tu veux ou dois faire. Si elle gêne ta vie de tous les jours, parles-en à un médecin ou à un psychologue.',
      },
      {
        q: 'Comment arrêter d’annuler ses sorties à cause de l’anxiété ?',
        a: 'Fixe-toi un petit objectif avec une heure de départ claire, calme ton corps par une respiration lente avant d’entrer, et concentre-toi sur les questions à poser aux autres. Chaque fois que tu restes, la peur diminue en général.',
      },
    ],
    keywords: [
      'anxiété sociale',
      'comment vaincre l’anxiété sociale',
      'peur du regard des autres',
      'phobie sociale',
      'angoisse avant une soirée',
    ],
  },
];
