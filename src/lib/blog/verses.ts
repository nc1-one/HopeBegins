/**
 * The verses the stories quote, copied by script from the checked text in
 * growth/research/bible-verses.md: the World English Bible (public domain)
 * for English and Ang Dating Biblia (1905, public domain) for Taglish.
 * French (Louis Segond 1910) and Spanish (Reina-Valera 1909) were fetched by
 * script from the getbible.net v2 API, German (Luther 1912) from eBible.org
 * and Korean (개역한글판 1961, public domain in Korea since 2012) from the
 * Korean Bible Society's own reader at bskorea.or.kr, then each verse was
 * checked against a second copy of the same edition. Louis Segond and Luther
 * count a psalm's title as verse 1, so four of their psalm references are one
 * verse higher than the key.
 * Never retype a verse here; add new ones the same way.
 */

export const VERSES = {
  'php-4-6-7': {
    en: {
      reference: 'Philippians 4:6-7',
      text: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.',
    },
    tl: {
      reference: 'Filipos 4:6-7',
      text: 'Huwag kayong mangabalisa sa anomang bagay; kundi sa lahat ng mga bagay sa pamamagitan ng panalangin at daing na may pagpapasalamat ay ipakilala ninyo ang inyong mga kahilingan sa Dios. At ang kapayapaan ng Dios, na di masayod ng pagiisip, ay magiingat ng inyong mga puso at ng inyong mga pagiisip kay Cristo Jesus.',
    },
    fr: {
      reference: 'Philippiens 4:6-7',
      text: 'Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.',
    },
    de: {
      reference: 'Philipper 4,6-7',
      text: 'Sorget nichts! sondern in allen Dingen lasset eure Bitten im Gebet und Flehen mit Danksagung vor Gott kund werden. Und der Friede Gottes, welcher höher ist denn alle Vernunft, bewahre eure Herzen und Sinne in Christo Jesu!',
    },
    es: {
      reference: 'Filipenses 4:6-7',
      text: 'Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús.',
    },
    ko: {
      reference: '빌립보서 4:6-7',
      text: '아무 것도 염려하지 말고 오직 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라',
    },
  },
  '1pe-5-7': {
    en: {
      reference: '1 Peter 5:7',
      text: 'casting all your worries on him, because he cares for you.',
    },
    tl: {
      reference: '1 Pedro 5:7',
      text: "Na inyong ilagak sa kaniya ang lahat ng inyong kabalisahan, sapagka't kayo'y ipinagmamalasakit niya.",
    },
    fr: {
      reference: '1 Pierre 5:7',
      text: 'et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.',
    },
    de: {
      reference: '1. Petrus 5,7',
      text: 'Alle Sorge werfet auf ihn; denn er sorgt für euch.',
    },
    es: {
      reference: '1 Pedro 5:7',
      text: 'Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros.',
    },
    ko: {
      reference: '베드로전서 5:7',
      text: '너희 염려를 다 주께 맡겨 버리라 이는 저가 너희를 권고하심이니라',
    },
  },
  'mat-6-34': {
    en: {
      reference: 'Matthew 6:34',
      text: 'Therefore don’t be anxious for tomorrow, for tomorrow will be anxious for itself. Each day’s own evil is sufficient.',
    },
    tl: {
      reference: 'Mateo 6:34',
      text: "Kaya't huwag ninyong ikabalisa ang sa araw ng bukas: sapagka't ang araw ng bukas ay mababalisa sa kaniyang sarili. Sukat na sa kaarawan ang kaniyang kasamaan.",
    },
    fr: {
      reference: 'Matthieu 6:34',
      text: 'Ne vous inquiétez donc pas du lendemain ; car le lendemain aura soin de lui-même. À chaque jour suffit sa peine.',
    },
    de: {
      reference: 'Matthäus 6,34',
      text: 'Darum sorgt nicht für den andern Morgen; denn der morgende Tag wird für das Seine sorgen. Es ist genug, daß ein jeglicher Tag seine eigene Plage habe.',
    },
    es: {
      reference: 'Mateo 6:34',
      text: 'Así que, no os congojéis por el día de mañana; que el día de mañana traerá su fatiga: basta al día su afán.',
    },
    ko: {
      reference: '마태복음 6:34',
      text: '그러므로 내일 일을 위하여 염려하지 말라 내일 일은 내일 염려할 것이요 한 날 괴로움은 그 날에 족하니라',
    },
  },
  'isa-41-10': {
    en: {
      reference: 'Isaiah 41:10',
      text: 'Don’t you be afraid, for I am with you. Don’t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.',
    },
    tl: {
      reference: 'Isaias 41:10',
      text: "Huwag kang matakot, sapagka't ako'y sumasaiyo; huwag kang manglupaypay, sapagka't ako'y iyong Dios; aking palalakasin ka; oo, aking tutulungan ka; oo, aking aalalayan ka ng kanang kamay ng aking katuwiran.",
    },
    fr: {
      reference: 'Ésaïe 41:10',
      text: 'Ne crains rien, car je suis avec toi ; Ne promène pas des regards inquiets, car je suis ton Dieu ; Je te fortifie, je viens à ton secours, Je te soutiens de ma droite triomphante.',
    },
    de: {
      reference: 'Jesaja 41,10',
      text: 'fürchte dich nicht, ich bin mit dir; weiche nicht, denn ich bin dein Gott; ich stärke dich, ich helfe dir auch, ich erhalte dich durch die rechte Hand meiner Gerechtigkeit.',
    },
    es: {
      reference: 'Isaías 41:10',
      text: 'No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
    },
    ko: {
      reference: '이사야 41:10',
      text: '두려워 말라 내가 너와 함께 함이니라 놀라지 말라 나는 네 하나님이 됨이니라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라',
    },
  },
  'jhn-14-27': {
    en: {
      reference: 'John 14:27',
      text: 'Peace I leave with you. My peace I give to you; not as the world gives, I give to you. Don’t let your heart be troubled, neither let it be fearful.',
    },
    tl: {
      reference: 'Juan 14:27',
      text: 'Ang kapayapaan ay iniiwan ko sa inyo; ang aking kapayapaan ay ibinibigay ko sa inyo: hindi gaya ng ibinibigay ng sanglibutan, ang ibinibigay ko sa inyo. Huwag magulumihanan ang inyong puso, ni matakot man.',
    },
    fr: {
      reference: 'Jean 14:27',
      text: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s’alarme point.',
    },
    de: {
      reference: 'Johannes 14,27',
      text: 'Den Frieden lasse ich euch, meinen Frieden gebe ich euch. Nicht gebe ich euch, wie die Welt gibt. Euer Herz erschrecke nicht und fürchte sich nicht.',
    },
    es: {
      reference: 'Juan 14:27',
      text: 'La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy. No se turbe vuestro corazón, ni tenga miedo.',
    },
    ko: {
      reference: '요한복음 14:27',
      text: '평안을 너희에게 끼치노니 곧 나의 평안을 너희에게 주노라 내가 너희에게 주는 것은 세상이 주는 것 같지 아니하니라 너희는 마음에 근심도 말고 두려워하지도 말라',
    },
  },
  'psa-94-19': {
    en: {
      reference: 'Psalm 94:19',
      text: 'In the multitude of my thoughts within me, your comforts delight my soul.',
    },
    tl: {
      reference: 'Awit 94:19',
      text: 'Sa karamihan ng aking mga pagiisip sa loob ko ang iyong mga pagaliw ay nagbibigay lugod sa aking kaluluwa.',
    },
    fr: {
      reference: 'Psaumes 94:19',
      text: 'Quand les pensées s’agitent en foule au dedans de moi, Tes consolations réjouissent mon âme.',
    },
    de: {
      reference: 'Psalm 94,19',
      text: 'Ich hatte viel Bekümmernisse in meinem Herzen; aber deine Tröstungen ergötzten meine Seele.',
    },
    es: {
      reference: 'Salmos 94:19',
      text: 'En la multitud de mis pensamientos dentro de mí, tus consolaciones alegraban mi alma.',
    },
    ko: {
      reference: '시편 94:19',
      text: '내 속에 생각이 많을 때에 주의 위안이 내 영혼을 즐겁게 하시나이다',
    },
  },
  'mat-11-28-30': {
    en: {
      reference: 'Matthew 11:28-30',
      text: '“Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light.”',
    },
    tl: {
      reference: 'Mateo 11:28-30',
      text: "Magsiparito sa akin, kayong lahat na nangapapagal at nangabibigatang lubha, at kayo'y aking papagpapahingahin. Pasanin ninyo ang aking pamatok, at magaral kayo sa akin; sapagka't ako'y maamo at mapagpakumbabang puso: at masusumpungan ninyo ang kapahingahan ng inyong mga kaluluwa. Sapagka't malambot ang aking pamatok, at magaan ang aking pasan.",
    },
    fr: {
      reference: 'Matthieu 11:28-30',
      text: 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. Prenez mon joug sur vous et recevez mes instructions, car je suis doux et humble de cœur ; et vous trouverez du repos pour vos âmes. Car mon joug est doux, et mon fardeau léger.',
    },
    de: {
      reference: 'Matthäus 11,28-30',
      text: 'Kommet her zu mir alle, die ihr mühselig und beladen seid; ich will euch erquicken. Nehmet auf euch mein Joch und lernet von mir; denn ich bin sanftmütig und von Herzen demütig; so werdet ihr Ruhe finden für eure Seelen. Denn mein Joch ist sanft, und meine Last ist leicht.',
    },
    es: {
      reference: 'Mateo 11:28-30',
      text: 'Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas. Porque mi yugo es fácil, y ligera mi carga.',
    },
    ko: {
      reference: '마태복음 11:28-30',
      text: '수고하고 무거운 짐진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라 나는 마음이 온유하고 겸손하니 나의 멍에를 메고 내게 배우라 그러면 너희 마음이 쉼을 얻으리니 이는 내 멍에는 쉽고 내 짐은 가벼움이라 하시니라',
    },
  },
  'psa-56-3': {
    en: {
      reference: 'Psalm 56:3',
      text: 'When I am afraid, I will put my trust in you.',
    },
    tl: {
      reference: 'Awit 56:3',
      text: "Sa panahong ako'y matakot, aking ilalagak ang aking tiwala sa iyo.",
    },
    fr: {
      reference: 'Psaumes 56:4',
      text: 'Quand je suis dans la crainte, En toi je me confie.',
    },
    de: {
      reference: 'Psalm 56,4',
      text: 'Wenn ich mich fürchte, so hoffe ich auf dich.',
    },
    es: {
      reference: 'Salmos 56:3',
      text: 'En el día que temo, yo en ti confío.',
    },
    ko: {
      reference: '시편 56:3',
      text: '내가 두려워하는 날에는 주를 의지하리이다',
    },
  },
  'psa-34-18': {
    en: {
      reference: 'Psalm 34:18',
      text: 'The LORD is near to those who have a broken heart, and saves those who have a crushed spirit.',
    },
    tl: {
      reference: 'Awit 34:18',
      text: 'Ang Panginoon ay malapit sa kanila na may bagbag na puso, at inililigtas ang mga may pagsisising diwa.',
    },
    fr: {
      reference: 'Psaumes 34:19',
      text: 'L’Éternel est près de ceux qui ont le cœur brisé, Et il sauve ceux qui ont l’esprit dans l’abattement.',
    },
    de: {
      reference: 'Psalm 34,19',
      text: 'Der HERR ist nahe bei denen, die zerbrochnes Herzens sind, und hilft denen, die ein zerschlagen Gemüt haben.',
    },
    es: {
      reference: 'Salmos 34:18',
      text: 'Cercano está Jehová á los quebrantados de corazón; y salvará á los contritos de espíritu.',
    },
    ko: {
      reference: '시편 34:18',
      text: '여호와는 마음이 상한 자에게 가까이 하시고 중심에 통회하는 자를 구원하시는도다',
    },
  },
  'psa-42-11': {
    en: {
      reference: 'Psalm 42:11',
      text: 'Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him, the saving help of my countenance, and my God.',
    },
    tl: {
      reference: 'Awit 42:11',
      text: "Bakit ka nanglulumo, Oh kaluluwa ko? At bakit ka nababagabag sa loob ko? Umasa ka sa Dios: sapagka't pupuri pa ako sa kaniya, na siyang kagalingan ng aking mukha, at aking Dios.",
    },
    fr: {
      reference: 'Psaumes 42:12',
      text: 'Pourquoi t’abats-tu, mon âme, et gémis-tu au dedans de moi ? Espère en Dieu, car je le louerai encore ; Il est mon salut et mon Dieu.',
    },
    de: {
      reference: 'Psalm 42,12',
      text: 'Was betrübst du dich, meine Seele, und bist so unruhig in mir? Harre auf Gott! denn ich werde ihm noch danken, daß er meines Angesichts Hilfe und mein Gott ist.',
    },
    es: {
      reference: 'Salmos 42:11',
      text: '¿Por qué te abates, oh alma mía, y por qué te conturbas en mí? Espera á Dios; porque aun le tengo de alabar; es él salvamento delante de mí, y el Dios mío.',
    },
    ko: {
      reference: '시편 42:11',
      text: '내 영혼아 네가 어찌하여 낙망하며 어찌하여 내 속에서 불안하여 하는고 너는 하나님을 바라라 나는 내 얼굴을 도우시는 내 하나님을 오히려 찬송하리로다',
    },
  },
  'psa-46-1': {
    en: {
      reference: 'Psalm 46:1',
      text: 'God is our refuge and strength, a very present help in trouble.',
    },
    tl: {
      reference: 'Awit 46:1',
      text: 'Ang Dios ay ating ampunan at kalakasan, handang saklolo sa kabagabagan.',
    },
    fr: {
      reference: 'Psaumes 46:2',
      text: 'Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.',
    },
    de: {
      reference: 'Psalm 46,2',
      text: 'Gott ist unsre Zuversicht und Stärke. Eine Hilfe in den großen Nöten, die uns getroffen haben.',
    },
    es: {
      reference: 'Salmos 46:1',
      text: 'DIOS es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
    },
    ko: {
      reference: '시편 46:1',
      text: '하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라',
    },
  },
  'isa-40-31': {
    en: {
      reference: 'Isaiah 40:31',
      text: 'but those who wait for the LORD will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.',
    },
    tl: {
      reference: 'Isaias 40:31',
      text: "Nguni't silang nangaghihintay sa Panginoon ay mangagbabagong lakas; sila'y paiilanglang na may mga pakpak na parang mga aguila; sila'y magsisitakbo, at hindi mangapapagod; sila'y magsisilakad, at hindi manganghihina.",
    },
    fr: {
      reference: 'Ésaïe 40:31',
      text: 'Mais ceux qui se confient en l’Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.',
    },
    de: {
      reference: 'Jesaja 40,31',
      text: 'aber die auf den HERRN harren, kriegen neue Kraft, daß sie auffahren mit Flügeln wie Adler, daß sie laufen und nicht matt werden, daß sie wandeln und nicht müde werden.',
    },
    es: {
      reference: 'Isaías 40:31',
      text: 'Mas los que esperan á Jehová tendrán nuevas fuerzas; levantarán las alas como águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.',
    },
    ko: {
      reference: '이사야 40:31',
      text: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리의 날개치며 올라감 같을 것이요 달음박질하여도 곤비치 아니하겠고 걸어가도 피곤치 아니하리로다',
    },
  },
  'psa-147-3': {
    en: {
      reference: 'Psalm 147:3',
      text: 'He heals the broken in heart, and binds up their wounds.',
    },
    tl: {
      reference: 'Awit 147:3',
      text: 'Kaniyang pinagagaling ang mga may bagbag na puso, at tinatalian niya ang kanilang mga sugat.',
    },
    fr: {
      reference: 'Psaumes 147:3',
      text: 'Il guérit ceux qui ont le cœur brisé, Et il panse leurs blessures.',
    },
    de: {
      reference: 'Psalm 147,3',
      text: 'Er heilt, die zerbrochnes Herzens sind, und verbindet ihre Schmerzen.',
    },
    es: {
      reference: 'Salmos 147:3',
      text: 'El sana á los quebrantados de corazón, y liga sus heridas.',
    },
    ko: {
      reference: '시편 147:3',
      text: '상심한 자를 고치시며 저희 상처를 싸매시는도다',
    },
  },
  '2co-4-8-9': {
    en: {
      reference: '2 Corinthians 4:8-9',
      text: 'We are pressed on every side, yet not crushed; perplexed, yet not to despair; pursued, yet not forsaken; struck down, yet not destroyed;',
    },
    tl: {
      reference: '2 Corinto 4:8-9',
      text: "Sa magkabikabila ay nangagigipit kami, gayon ma'y hindi nangaghihinagpis; nangatitilihan, gayon ma'y hindi nangawawalan ng pagasa; Pinaguusig, gayon ma'y hindi pinababayaan; inilulugmok, gayon ma'y hindi nangasisira;",
    },
    fr: {
      reference: '2 Corinthiens 4:8-9',
      text: 'Nous sommes pressés de toute manière, mais non réduits à l’extrémité ; dans la détresse, mais non dans le désespoir ; persécutés, mais non abandonnés ; abattus, mais non perdus ;',
    },
    de: {
      reference: '2. Korinther 4,8-9',
      text: 'Wir haben allenthalben Trübsal, aber wir ängsten uns nicht; uns ist bange, aber wir verzagen nicht; wir leiden Verfolgung, aber wir werden nicht verlassen; wir werden unterdrückt, aber wir kommen nicht um;',
    },
    es: {
      reference: '2 Corintios 4:8-9',
      text: 'Estando atribulados en todo, mas no angustiados; en apuros, mas no desesperamos; Perseguidos, mas no desamparados; abatidos, mas no perecemos;',
    },
    ko: {
      reference: '고린도후서 4:8-9',
      text: '우리가 사방으로 우겨쌈을 당하여도 싸이지 아니하며 답답한 일을 당하여도 낙심하지 아니하며 핍박을 받아도 버린바 되지 아니하며 거꾸러뜨림을 당하여도 망하지 아니하고',
    },
  },
  'lam-3-22-23': {
    en: {
      reference: 'Lamentations 3:22-23',
      text: 'It is because of the LORD’s loving kindnesses that we are not consumed, because his mercies don’t fail. They are new every morning. Great is your faithfulness.',
    },
    tl: {
      reference: 'Panaghoy 3:22-23',
      text: "Sa mga kaawaan nga ng Panginoon ay hindi tayo nalipol, sapagka't ang kaniyang mga habag ay hindi nauubos. Ang mga yao'y bago tuwing umaga, dakila ang inyong pagtatapat.",
    },
    fr: {
      reference: 'Lamentations 3:22-23',
      text: 'Les bontés de l’Éternel ne sont pas épuisées, Ses compassions ne sont pas à leur terme ; Elles se renouvellent chaque matin. Oh ! que ta fidélité est grande !',
    },
    de: {
      reference: 'Klagelieder 3,22-23',
      text: "Die Güte des HERRN ist's, daß wir nicht gar aus sind; seine Barmherzigkeit hat noch kein Ende, sondern sie ist alle Morgen neu, und deine Treue ist groß.",
    },
    es: {
      reference: 'Lamentaciones 3:22-23',
      text: 'Es por la misericordia de Jehová que no somos consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
    },
    ko: {
      reference: '예레미야애가 3:22-23',
      text: '여호와의 자비와 긍휼이 무궁하시므로 우리가 진멸되지 아니함이니이다 이것이 아침마다 새로우니 주의 성실이 크도소이다',
    },
  },
  'psa-23-4': {
    en: {
      reference: 'Psalm 23:4',
      text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.',
    },
    tl: {
      reference: 'Awit 23:4',
      text: "Oo, bagaman ako'y lumalakad sa libis ng lilim ng kamatayan, wala akong katatakutang kasamaan; sapagka't ikaw ay sumasa akin: ang iyong pamalo at ang iyong tungkod, ay nagsisialiw sa akin.",
    },
    fr: {
      reference: 'Psaumes 23:4',
      text: 'Quand je marche dans la vallée de l’ombre de la mort, Je ne crains aucun mal, car tu es avec moi : Ta houlette et ton bâton me rassurent.',
    },
    de: {
      reference: 'Psalm 23,4',
      text: 'Und ob ich schon wanderte im finstern Tal, fürchte ich kein Unglück; denn du bist bei mir, dein Stecken und dein Stab trösten mich.',
    },
    es: {
      reference: 'Salmos 23:4',
      text: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tú estarás conmigo: tu vara y tu cayado me infundirán aliento.',
    },
    ko: {
      reference: '시편 23:4',
      text: '내가 사망의 음침한 골짜기로 다닐찌라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다',
    },
  },
  'heb-6-19': {
    en: {
      reference: 'Hebrews 6:19',
      text: 'This hope we have as an anchor of the soul, a hope both sure and steadfast and entering into that which is within the veil;',
    },
    tl: {
      reference: 'Hebreo 6:19',
      text: 'Na ating inaring tulad sa sinepete ng kaluluwa, isang pagasa na matibay at matatag at pumapasok sa nasa loob ng tabing;',
    },
    fr: {
      reference: 'Hébreux 6:19',
      text: 'Cette espérance, nous la possédons comme une ancre de l’âme, sûre et solide ; elle pénètre au delà du voile,',
    },
    de: {
      reference: 'Hebräer 6,19',
      text: 'welche wir haben als einen sichern und festen Anker unsrer Seele, der auch hineingeht in das Inwendige des Vorhangs,',
    },
    es: {
      reference: 'Hebreos 6:19',
      text: 'La cual tenemos como segura y firme ancla del alma, y que entra hasta dentro del velo;',
    },
    ko: {
      reference: '히브리서 6:19',
      text: '우리가 이 소망이 있는 것은 영혼의 닻 같아서 튼튼하고 견고하여 휘장 안에 들어 가나니',
    },
  },
  'gal-5-13': {
    en: {
      reference: 'Galatians 5:13',
      text: 'For you, brothers, were called for freedom. Only don’t use your freedom for gain to the flesh, but through love be servants to one another.',
    },
    tl: {
      reference: 'Galacia 5:13',
      text: "Sapagka't kayo, mga kapatid, ay tinawag sa kalayaan; huwag lamang gamitin ang inyong kalayaan, upang magbigay kadahilanan sa laman, kundi sa pamamagitan ng pagibig ay mangaglingkuran kayo.",
    },
    fr: {
      reference: 'Galates 5:13',
      text: 'Frères, vous avez été appelés à la liberté, seulement ne faites pas de cette liberté un prétexte de vivre selon la chair ; mais rendez-vous, par la charité, serviteurs les uns des autres.',
    },
    de: {
      reference: 'Galater 5,13',
      text: 'Ihr aber, liebe Brüder, seid zur Freiheit berufen! Allein sehet zu, daß ihr durch die Freiheit dem Fleisch nicht Raum gebet; sondern durch die Liebe diene einer dem andern.',
    },
    es: {
      reference: 'Gálatas 5:13',
      text: 'Porque vosotros, hermanos, á libertad habéis sido llamados; solamente que no uséis la libertad como ocasión á la carne, sino servíos por amor los unos á los otros.',
    },
    ko: {
      reference: '갈라디아서 5:13',
      text: '형제들아 너희가 자유를 위하여 부르심을 입었으나 그러나 그 자유로 육체의 기회를 삼지 말고 오직 사랑으로 서로 종노릇하라',
    },
  },
} as const;

export type VerseKey = keyof typeof VERSES;

export const VERSE_ATTRIBUTION = {
  en: 'Scripture quotations are from the World English Bible (WEB), public domain.',
  tl: 'Galing ang mga verse sa Ang Dating Biblia (1905), public domain.',
  fr: 'Les citations bibliques sont tirées de la Bible Louis Segond (1910), domaine public.',
  de: 'Die Bibelzitate stammen aus der Lutherbibel (1912), gemeinfrei.',
  es: 'Las citas bíblicas son tomadas de la Reina-Valera (1909), de dominio público.',
  ko: '성경 구절은 저작권 보호 기간이 끝난 개역한글판(1961)에서 인용했어요.',
};
