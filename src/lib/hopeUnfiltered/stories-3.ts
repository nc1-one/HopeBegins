import type { Story } from './types';

const photos = '/assets/images/photos';

export const stories3: Story[] = [
  {
    slug: 'panganay-breadwinner',
    lang: 'tl',
    theme: 'pressure',
    metaTitle: 'Panganay breadwinner: ang pagod ni Jun',
    metaDescription:
      'Si Jun, panganay at breadwinner, nagpapaaral ng mga kapatid at hindi marunong magpahinga. Ano ang nakatulong sa kanya, at isang bagay na puwede mong subukan.',
    title: 'Panganay breadwinner: si Jun at ang pagod na walang nakakakita',
    dek: 'Siya ang taya sa pamilya mula 19 siya. Hindi siya marunong humindi, at hindi rin siya marunong magpahinga. Ito ang nagbago, paunti-unti.',
    who: 'Jun, 31, tricycle driver sa Dumaguete',
    photo: {
      src: `${photos}/tired-tricycle.jpg`,
      alt: 'A tricycle driver asleep in his tricycle',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Alas-singko ng umaga, nasa pila na si Jun',
        paragraphs: [
          'Alas-singko pa lang ng umaga, nasa pila na ng tricycle si Jun sa may palengke sa Dumaguete. Panganay siya sa limang magkakapatid. Mula nang mamatay ang tatay nila noong 19 siya, siya na ang nagpapaaral sa mga kapatid niya.',
          'Si Carmela, third year nursing. Si Paolo, Grade 11. Si Bunso, Grade 6. Every week may bayarin: tuition, project, baon, load para sa online class. Si Jun ang sumasagot sa lahat, pati kuryente at maintenance na gamot ni Nanay.',
          'Noong high school, pangarap ni Jun maging seaman. Naka-enroll na siya sa maritime school nang mamatay ang tatay nila. Hindi na niya itinuloy. Minsan, kapag may dumaang barko sa pantalan, napapatingin pa rin siya.',
          'Hindi siya nagrereklamo. "Okay lang, kaya ko \'to," lagi niyang sinasabi. Pero may mga hapon na nakakatulog siya sa loob ng tricycle habang naghihintay ng pasahero, nakasandal ang ulo sa bakal, hawak pa rin ang susi.',
          'Isang gabi, nag-text si Paolo: "Kuya, may field trip kami, 1,500. Sorry." Napatitig si Jun sa phone. Wala na siyang pera hanggang Biyernes. Nag-reply pa rin siya: "Sige, ako bahala." Tapos lumabas siya sa kalye at umiyak nang walang nakakakita.',
        ],
        pullQuote:
          'Tapos lumabas siya sa kalye at umiyak nang walang nakakakita.',
      },
      {
        kind: 'struggle',
        heading: 'Bakit nakakapagod maging panganay at breadwinner',
        paragraphs: [
          "Mabigat ang pera, at mas mabigat pa ang pakiramdam na kapag huminto ka, babagsak ang lahat. 'Yan ang dala ni Jun araw-araw, kahit sa mga araw na maganda ang kita.",
          'Bilang panganay, maaga siyang natutong unahin ang iba. Sa pamilya nila, hindi pinag-uusapan ang pagod. Ang lagi nilang tanong, "May pera ka ba?" Bihira ang "Kumusta ka, Kuya?"',
          'Kaya nang mapagod siya, nahiya siya. Parang kasalanan ang magpahinga. Kapag may araw na hindi siya nakapasada dahil masakit ang likod niya, buong gabi siyang hindi makatulog sa kakaisip kung paano babawiin ang kita.',
          'May galit din siyang hindi niya maamin. Galit sa sitwasyon, minsan sa mga kapatid na parang hindi nakakaintindi kung gaano kahirap kitain ang 1,500. Tapos guilty siya dahil mahal na mahal niya sila. Paikot-ikot lang: pagod, galit, guilt, pagod ulit.',
          'Pati katawan niya, sumisigaw na. Laging masakit ang likod at ulo niya, at kahit pagod na pagod, gising pa rin siya nang alas-dos ng madaling-araw.',
          'Ang pinakamahirap, wala siyang mapagsabihan. Si Nanay, ayaw na niyang dagdagan ang iniisip. Ang barkada, may kanya-kanyang problema. Kaya sinarili niya, taon-taon.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ano ang nakatulong kay Jun bilang panganay',
        paragraphs: [
          'Nagsimula sa isang tanong na hindi niya inaasahan. Isang Sabado, si Carmela ang nakapansin. "Kuya, kailan ka huling nag-day off?" Hindi niya masagot. Hindi niya maalala.',
          'Doon siya unang nagsabi ng totoo. "Pagod na ako, Mela. Hindi ko alam kung hanggang kailan ko kaya." Akala niya magagalit o malulungkot ang kapatid niya. Niyakap lang siya nito at sinabing, "Bakit ngayon mo lang sinabi? Tutulong kami."',
          'Nag-usap silang magkakapatid at si Nanay sa hapag isang Linggo. Inilista nila lahat ng gastos sa likod ng lumang kalendaryo. Si Carmela, kukuha ng tutoring sa weekends. Si Paolo, magtitinda ng ice candy ni Nanay sa school. Maliit lang ang dagdag na kita. Ang malaking pagbabago, may kahati na si Jun.',
          'Natuto rin siyang humindi, maliit muna. Nang humiram ulit ang isang pinsan, sinabi niyang, "Pasensya na, hindi ko kaya ngayon." Kinabahan siya buong araw. Walang gumuho.',
          'Nag-day off siya tuwing Linggo ng hapon. Noong una, para siyang nagkakasala. Sumasama siya kay Nanay sa church sa umaga, tapos natutulog siya nang mahaba pagkauwi. Sa isang small group doon, may nakilala siyang kuya na breadwinner din. "Pareho pala tayo," sabi nito, at natawa silang dalawa.',
          'Nagpatingin din siya sa health center dahil sa likod niya. Sabi ng doktor, kailangan niyang magpahinga nang maayos at mag-stretch bago at pagkatapos pumasada. Simple lang, at ngayon lang niya ginawa nang regular.',
          'Ang 1 Pedro 5:7 ang naging dasal niya bago pumasada. Isa-isa niyang binabanggit sa Diyos ang mga iniisip niya: tuition, gamot, field trip. Tapos sinusubukan niyang iwan doon, kahit ilang oras lang.',
          'Mahirap pa rin minsan. May mga linggong kulang pa rin ang kita. Iba na ang pakiramdam kapag may kasama kang nag-iisip.',
        ],
        pullQuote: 'Kinabahan siya buong araw. Walang gumuho.',
      },
      {
        kind: 'hope',
        heading: 'Kung ikaw ang panganay na pagod na',
        paragraphs: [
          "Kung ikaw ang laging taya sa pamilya, kilala mo ang pagod na ito. Mahal mo sila, at pagod ka. Puwedeng sabay 'yon.",
          'Ang pagtulong sa pamilya ay pagmamahal. Ang pag-aalaga sa sarili mo, pagmamahal din, para may lakas ka pang tumulong bukas.',
          'Subukan mong magsabi sa isang tao sa bahay, kahit isa lang. Ilista ninyo ang gastos nang magkakasama. Pumili ng isang maliit na "hindi" ngayong linggo, at isang oras ng pahinga para sa sarili mo lang.',
          "Kung higit dalawang linggo ka nang ganito, o nakakaapekto na ito sa trabaho at tulog mo, kausapin ang isang doktor o counselor. Normal na hakbang 'yan, at nakakatulong.",
          "Kung gusto mo ng masisimulan ngayon, libre ang [HopeBegins](/). Piliin mo kung ano ang nararamdaman mo at bibigyan ka ng isang maliit na bagay na puwede mong subukan ngayong araw. May calming tools, may magdarasal para sa 'yo, at may e-coach na puwede mong i-message sa Messenger. Basahin din ang [Pagod na ako](/pagod-na-ako) para sa mga araw na ubos ka na.",
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong linggo: isang usapan, isang "hindi"',
      steps: [
        'Isulat lahat ng binabayaran mo buwan-buwan, kahit maliit.',
        'Ipakita ito sa isang kapatid o magulang at sabihin: "Kailangan ko ng tulong dito."',
        'Pumili ng isang hiling na tatanggihan mo nang mahinahon ngayong linggo.',
        'Mag-block ng isang oras na pahinga sa calendar mo, at ituring itong appointment.',
      ],
    },
    verse: '1pe-5-7',
    related: 'pagod-na-ako',
    faq: [
      {
        q: 'Normal ba na mapagod maging breadwinner?',
        a: 'Oo. Mabigat ang pagsuporta sa buong pamilya, lalo na kung matagal na at mag-isa ka. Gumagaan ito kapag may kahati ka sa gastos at may napagsasabihan ka.',
      },
      {
        q: 'Paano sasabihin sa pamilya na pagod ka na?',
        a: 'Pumili ng tahimik na oras at sabihin nang diretso: "Pagod na ako at kailangan ko ng tulong." Magdala ng listahan ng gastos para may konkretong plano kayong mapag-usapan.',
      },
    ],
    keywords: [
      'panganay breadwinner',
      'pagod na maging breadwinner',
      'breadwinner sa pamilya',
      'panganay problems',
      'pagod na ako',
    ],
  },
  {
    slug: 'new-mom-feeling-overwhelmed',
    lang: 'en',
    theme: 'low',
    metaTitle: "Postpartum depression signs: Ana's first months",
    metaDescription:
      'Ana loved her baby and still cried every afternoon. The postpartum depression signs she almost missed, what helped her, and when to call your doctor.',
    title: 'New mom, heavy heart: the signs Ana almost missed',
    dek: 'She had the baby she prayed for, and she still cried every afternoon. Telling her OB the truth was where things started to change.',
    who: 'Ana, 30, first-time mom in Laguna',
    photo: {
      src: `${photos}/care-lola.jpg`,
      alt: 'A lola laughing with the baby in her arms',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The baby she prayed for',
        paragraphs: [
          'Ana and her husband Joel waited four years for a baby. When Gabby was born in March, half the family came to the hospital in Calamba. Her mother packed a bag that same week and moved into their small house in Laguna to help.',
          'Everyone said the same thing. "You must be so happy." Ana smiled and said yes. Then she went to the bathroom, turned on the faucet so nobody would hear, and cried.',
          "It didn't stop after the first week. By the second month she cried most afternoons. She felt flat when Gabby smiled at her, and then guilty for feeling flat. She snapped at Joel over small things, like the way he folded the lampin. At three in the morning, feeding the baby, she thought: maybe Mama is a better mother to him than I am.",
          'Her mother noticed first. One afternoon she took Gabby from Ana\'s arms, sat beside her on the bed and asked, "Anak, ilang araw ka nang ganyan?" Ana couldn\'t answer. She shook her head and cried harder.',
        ],
        pullQuote:
          'Then she went to the bathroom, turned on the faucet so nobody would hear, and cried.',
      },
      {
        kind: 'struggle',
        heading: 'Baby blues or postpartum depression: why Ana kept quiet',
        paragraphs: [
          'Ana had heard of the baby blues. Many new moms feel weepy, moody and overwhelmed in the first two weeks after giving birth, and it usually eases on its own. So she told herself that was all it was, and waited.',
          "It didn't pass. The low mood stayed for weeks. She lost interest in things she used to enjoy, slept badly even when Gabby slept, and felt worthless as a mother. Somewhere inside she knew these were signs to take seriously. She was too afraid to say them.",
          'Shame was the biggest wall. She had prayed for this child. How could she feel this way about the answer to her prayer? She worried people at church would think her faith was weak, and that her relatives would call her ungrateful.',
          'And she was exhausted. Feeding every two to three hours, healing from the birth, visitors every weekend. When you are that tired, it is hard to tell where tiredness ends and something heavier begins.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Ana feel like herself again',
        paragraphs: [
          'Her mother kept it simple. "Sasamahan kita. Sabihin natin sa doktor mo." The next week, at her postpartum checkup, Ana told her OB the truth: the crying, the flat feeling, the thought at three in the morning.',
          'Her OB listened calmly. She told Ana this happens to many mothers, that it is treatable, and that saying it out loud was exactly the right thing to do. She referred Ana to a doctor who could help, and Ana started treatment. Over the next weeks, slowly, the heaviness lifted.',
          'At home, the family changed a few things. Joel took the 2 a.m. feeding on weekdays so Ana could sleep one long stretch. Her mother took Gabby for a walk every afternoon, the hour Ana used to cry the most, and Ana used it to shower, eat a warm meal or simply lie down.',
          'Joel learned too. He read about postpartum depression on his phone during lunch breaks and stopped taking her sharp words personally. "Pagod ka lang at may pinagdadaanan ka, mahal. Nandito ako," he told her one night.',
          'Ana stopped hiding, too. She told two friends from church, both moms. One of them said, "Ako rin, noong panganay ko." Ana had never known. They started a group chat where they could send anything, even "rough day" at four in the morning.',
          'She prayed in small pieces. Isaiah 40:31 was taped on the cabinet above the bottle sterilizer, and she read it while the water boiled. Some days that was the only prayer she had, and it was enough for that day.',
        ],
        pullQuote: 'Ana had never known.',
      },
      {
        kind: 'hope',
        heading: 'If you just had a baby and feel this way',
        paragraphs: [
          'If you are a new mom and you feel low, numb or overwhelmed, it says nothing bad about you as a mother. Your body and your whole life changed at once.',
          'Feeling weepy in the first two weeks is common. If the low mood lasts longer than two weeks, or it gets in the way of caring for yourself or your baby, talk to your OB or a doctor. If you have thoughts of harming yourself or your baby, tell your doctor right away. That is a normal next step, and help works.',
          'If you are thinking of ending your life, call the NCMH Crisis Hotline, 24/7: 1553 or 0917 899 8727. If you are in immediate danger, call 911.',
          'Today, let someone take one thing off your hands, even one feeding or one hour. When you are ready for a small next step, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools for the 3 a.m. feeds, someone to pray for you, and an e-coach you can message on Messenger. The page [I feel depressed](/i-feel-depressed) is a gentle place to start.',
        ],
      },
    ],
    tryThis: {
      title: 'Today: hand off one thing',
      steps: [
        'Pick the hardest hour of your day and ask someone to take the baby for it.',
        'Use that hour for one need: sleep, a shower or a warm meal.',
        'Text one person you trust: "Rough day. Can I call you later?"',
        'Write down how you have felt this week and bring it to your next checkup.',
      ],
    },
    verse: 'isa-40-31',
    related: 'i-feel-depressed',
    faq: [
      {
        q: 'What are the signs of postpartum depression?',
        a: 'Low mood, emptiness or crying that lasts more than two weeks after giving birth, losing interest in things, sleeping badly even when the baby sleeps, and feeling worthless or guilty. If you notice these, talk to your OB or a doctor.',
      },
      {
        q: 'Is it normal to feel sad after having a baby?',
        a: 'Feeling weepy and overwhelmed in the first two weeks is common and usually eases. If it lasts longer, or you have thoughts of harming yourself or your baby, tell your doctor right away.',
      },
    ],
    keywords: [
      'postpartum depression signs',
      'new mom overwhelmed',
      'baby blues or postpartum depression',
      'sad after having a baby',
      'postpartum depression Philippines',
    ],
  },
  {
    slug: 'college-stress-thesis',
    lang: 'en',
    theme: 'pressure',
    metaTitle: 'College stress: how Josh got through thesis year',
    metaDescription:
      'Josh broke down at 2 a.m. over his thesis and the fear of letting his parents down. What helped him handle college stress, and one thing to try today.',
    title: 'Thesis year, a 2 a.m. breakdown, and what helped Josh',
    dek: 'He was the first in his family to take engineering. When the thesis started falling apart, so did he, until he said the hard thing out loud.',
    who: 'Josh, 21, engineering student in Manila',
    photo: {
      src: `${photos}/sleep-night.jpg`,
      alt: 'A student still awake at night',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: "The night the thesis file wouldn't open",
        paragraphs: [
          'Josh was in his fourth year of civil engineering at a university in Manila. He rented a bedspace near España with three other students. His parents ran a small hardware store in Nueva Ecija, and he was the first in the family to study engineering.',
          "Every week his mother sent the same message: \"Kumusta ang thesis, anak? Proud kami sa 'yo.\" He replied with a thumbs up. He didn't tell them his group's data was a mess, his adviser had sent back their chapter three twice, and the defense was in five weeks.",
          "One Tuesday at 2 a.m., after three nights of four-hour sleep, his laptop froze and the file wouldn't open. Something in him gave way. He sat on the bathroom floor, hands shaking, crying so hard he could barely breathe. All he could think was: I'm going to fail, and everything they worked for will be wasted.",
          'His roommate Kiko knocked. "Pre, okay ka lang?" Josh said yes. Kiko didn\'t leave. He sat outside the door until Josh came out, handed him a glass of water and said, "Kain muna tayo. Bukas pa \'yung lugawan sa kanto."',
        ],
        pullQuote: "Kiko didn't leave.",
      },
      {
        kind: 'struggle',
        heading: 'Why thesis stress hits so hard',
        paragraphs: [
          'Thesis year piles everything on at once. Deadlines from other subjects, group mates with their own problems, an adviser with little time, and a defense that feels like it decides your whole future.',
          'For Josh, the work was only half of it. The other half was what it meant. Every tuition payment came from bags of cement and boxes of nails his father sold. Failing felt like failing them, so he hid every bad week and kept saying "okay lang" until he had no okay left.',
          'His body was paying for it too: little sleep, too much 3-in-1 coffee, skipped meals, no rest days. After weeks of that, small problems start to feel like the end of the world. A frozen laptop became the last straw.',
          'Then there was his feed. Other groups posted photos of finished manuscripts and celebratory milk tea. Every post felt like proof that he was behind.',
          'He also believed that asking for help meant he was weak. Everyone else seemed to be coping. Months later he found out most of his block felt the same, and they had all been hiding it from each other.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Josh handle college stress',
        paragraphs: [
          'Over lugaw at 3 a.m., Josh told Kiko everything. Kiko listened, then helped him break the next five weeks into a list on a paper napkin: what was due, who was doing it, and what could wait.',
          'The next day Josh did something he had avoided for a month. He emailed his adviser, explained where the group was stuck and asked for fifteen minutes. The adviser gave them thirty and found the problem with their data in ten. "Sana nagtanong kayo agad," he said.',
          'Josh set a few rules for the last five weeks. Sleep by 1 a.m., no exceptions. One real meal a day with someone else. One hour every Sunday with no thesis at all. He was sure he was losing time. His work got better because he could finally think straight.',
          'Kiko kept an eye on him. Around midnight he would knock and ask one question: "Tulog na?" Most nights Josh closed the laptop.',
          "Kiko suggested the university's guidance office, and Josh went, nervous the whole way. The counselor helped him with the panic he felt every time he opened the file, and with the voice in his head that said one bad grade made him a failure.",
          'Then he called home. "Ma, mahirap pala. Baka ma-delay ako." He braced himself. His mother was quiet for a moment, then said, "Anak, mas mahalaga ka kaysa sa diploma. Uwi ka muna this weekend." He went home, slept twelve hours and ate his mother\'s sinigang. At dinner on Sunday his father prayed for him, something Josh hadn\'t heard since he was little.',
          'The night before the defense, his mother texted him Matthew 6:34. They passed, with revisions.',
        ],
        pullQuote: 'Anak, mas mahalaga ka kaysa sa diploma.',
      },
      {
        kind: 'hope',
        heading: 'If college stress is crushing you right now',
        paragraphs: [
          'If you are reading this at 2 a.m. with a thesis open in another tab, close it for tonight. A rested brain will fix in an hour what a tired one fights with all night.',
          'Your thesis matters, and you matter more. A late chapter can be fixed. A body running on three hours of sleep needs care first.',
          'Tomorrow, do one thing: tell one person how bad it really is. A roommate, a classmate, your adviser, your parents. Most people want to help and have no idea you need it.',
          "If you feel hopeless, can't sleep or can't keep up with daily life for more than two weeks, talk to your school's guidance counselor or a doctor. That is a normal next step, and help works.",
          'If you want somewhere to start right now, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools for exam nights, someone to pray for you, and an e-coach you can message on Messenger. If you are running on empty, read [Tired of everything](/tired-of-everything).',
        ],
      },
    ],
    tryThis: {
      title: 'Today: the napkin plan',
      steps: [
        'Write down everything due in the next two weeks.',
        'Next to each one, write the very next step, small enough to finish in 30 minutes.',
        'Send one message asking for help: to your adviser, a group mate or a friend.',
        'Pick a time you will stop working tonight, and keep it.',
      ],
    },
    verse: 'mat-6-34',
    related: 'tired-of-everything',
    faq: [
      {
        q: 'How do I deal with thesis stress?',
        a: 'Break the work into small next steps, ask your adviser early when you are stuck, and protect your sleep and meals. If the stress keeps you from functioning for weeks, talk to your guidance counselor.',
      },
      {
        q: 'Is it normal to break down from college stress?',
        a: 'Many students hit a breaking point when pressure builds for weeks without rest. It is a sign to slow down and get support, and telling someone you trust is a good first step.',
      },
    ],
    keywords: [
      'college stress',
      'thesis stress',
      'stress in college Philippines',
      'academic pressure',
      'student burnout',
    ],
  },
  {
    slug: 'lonely-in-a-new-city',
    lang: 'en',
    theme: 'lonely',
    metaTitle: "Feeling lonely in a new city: Joy's first year",
    metaDescription:
      'Joy moved from Iloilo to Manila for work and ate dinner alone for months. What helped her with feeling lonely in a new city, one small step at a time.',
    title: "Feeling lonely in a new city: Joy's first year in Manila",
    dek: 'The job was the dream. The weekends were the hard part. Here is how Joy slowly made Manila feel a little more like home.',
    who: 'Joy, 24, new hire in Manila from Iloilo',
    photo: {
      src: `${photos}/alone-bay.jpg`,
      alt: 'A woman reading alone on the rocks by Manila Bay',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Dinner for one in a city of millions',
        paragraphs: [
          'Joy got the offer in January: a junior analyst role at a bank in Makati. Her family in Iloilo celebrated with pancit and a cake from the bakery near their church. Two weeks later she was unpacking in a condo unit in Mandaluyong the size of her old bedroom.',
          'Weekdays were fine. Work kept her busy, and the MRT ate up the rest of the day. Weekends were different. On Saturday mornings she woke up to silence. She ate dinner standing at the counter, watching videos from back home. Her mother called every Sunday. "Ano kinain mo, \'Day?" Joy always said something nicer than the truth.',
          'She told herself it was temporary. Once she got used to the city, things would get better. Months went by and the weekends stayed the same.',
          'At work, everyone already had their people. They went out after shift in barkadas that had formed years before she arrived. Joy smiled in the pantry, said "ingat" at the elevator and went home.',
          "One Saturday in May it hit her. She hadn't said a single word out loud since Friday afternoon. She sat on the floor of her unit and cried, then felt silly for crying. She had the job she wanted. Why did she feel this way?",
        ],
        pullQuote:
          "She hadn't said a single word out loud since Friday afternoon.",
      },
      {
        kind: 'struggle',
        heading: 'Why moving to a new city can feel so lonely',
        paragraphs: [
          'Joy had never really been alone before. In Iloilo there was always a tita dropping by, a cousin at the gate, church on Sunday with the same faces since she was a kid. She had never made friends from scratch. They were simply there.',
          'In Manila everything took effort, and loneliness drains the energy that effort needs. After a long week, staying in felt easier than walking into a room full of strangers. Every weekend she stayed in made the next one harder.',
          'She also felt she had no right to complain. She was the one who left, the one with the good job. Saying "I\'m lonely" felt like admitting she had failed.',
          "Loneliness changed how she read people, too. A colleague who replied late seemed annoyed with her. A lunch she wasn't invited to felt like proof she didn't belong. Most of it, she found out later, was all in her tired head.",
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Joy feel less lonely',
        paragraphs: [
          'The change started small. A colleague named Rhea mentioned she was from Bacolod. Joy almost let the moment pass. Then she said, "Taga-Iloilo ako! Lunch tayo?" They ate at the food stalls and agreed that nobody in Manila made batchoy right.',
          "Joy made herself a rule: say yes to one thing a week, even when she was tired. A Friday merienda with the team. A run club in BGC that met at 6 a.m. Most weeks it felt awkward. Some weeks it didn't, and those were enough to keep going.",
          'She found a church near her place and went three Sundays in a row before anyone talked to her. On the third Sunday a woman named Ate Cel asked if she wanted to join a small group of young professionals that met on Wednesday nights. Joy went. Six months later it was the night she looked forward to all week.',
          "She made her unit feel like hers. A small plant from Dangwa, a framed photo of her family at the beach in Guimaras, and a rice cooker so she could cook her mother's chicken binakol on Sundays. The smell of home made the silence easier.",
          'She stopped pretending with her mother. On one Sunday call she said, "Ma, nalulungkot ako dito minsan." Her mother didn\'t panic. She started sending voice messages every morning, little updates about the dog and the neighbor\'s mango tree. Joy played them on the MRT.',
          'On the hardest nights she read Psalm 46:1. Her lola had written it on the first page of the Bible Joy brought from home.',
        ],
        pullQuote:
          "Most weeks it felt awkward. Some weeks it didn't, and those were enough to keep going.",
      },
      {
        kind: 'hope',
        heading: 'If you feel lonely in a new city right now',
        paragraphs: [
          'If you moved for work or school and your weekends are quiet, that loneliness makes sense. You left a whole web of people behind, and a new one takes time to grow.',
          'Pick one small yes this week. A lunch, a class, a church service, a hello to someone from your province. Some will feel awkward, and you only need a few to land.',
          'If the loneliness turns into a low mood that lasts more than two weeks, or it starts to affect your sleep and work, talk to a doctor or counselor. That is a normal next step, and help works.',
          'And for tonight, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger when the apartment is too quiet. You might also like [I feel alone](/i-feel-alone).',
        ],
      },
    ],
    tryThis: {
      title: 'This week: one small yes',
      steps: [
        'Look at your week and pick one thing to say yes to: a lunch, a class or a church service.',
        'Message one person from home just to say hi, no reason needed.',
        'Learn the name of one person you see often, like the guard or the barista.',
        'On a quiet weekend, plan one reason to leave the house, even a walk to a café.',
      ],
    },
    verse: 'psa-46-1',
    related: 'i-feel-alone',
    faq: [
      {
        q: 'Is it normal to feel lonely after moving to a new city?',
        a: 'Yes. You left family and friends behind, and new friendships take months to form. It usually eases as you build small routines with people.',
      },
      {
        q: 'How do I make friends in a new city as an adult?',
        a: 'Say yes to small, regular things where you see the same people each week, like a church small group, a class or a club. Seeing the same faces again and again is how friendships start.',
      },
    ],
    keywords: [
      'feeling lonely in a new city',
      'lonely after moving to Manila',
      'how to make friends as an adult',
      'homesick',
      'loneliness',
    ],
  },
  {
    slug: 'when-god-feels-far',
    lang: 'en',
    theme: 'faith',
    metaTitle: 'When God feels far: a Christian with depression',
    metaDescription:
      'Mark served at church every Sunday while his prayers felt like they hit the ceiling. What helped when God felt far, and why seeing a doctor was part of it.',
    title: "When God feels far: Mark's long quiet season",
    dek: 'He led songs every Sunday while his own prayers felt empty. A pastor who listened, a doctor and a few honest friends helped him through.',
    who: 'Mark, 34, church volunteer in Davao',
    photo: {
      src: `${photos}/unsure-fog.jpg`,
      alt: 'A cyclist on a foggy mountain road',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Singing on Sunday, silent the rest of the week',
        paragraphs: [
          'Mark had served on the worship team at his church in Davao for twelve years. He set up the sound system at 6 a.m., played guitar for two services and stayed to stack the chairs. People called him Kuya Mark, even the ones older than him.',
          'The year he turned 33, something went quiet inside him. He still played every Sunday. He still knew every chord. At home, though, his prayers felt like they hit the ceiling and fell back down. He opened his Bible and the pages felt like paper.',
          'It spread. Food lost its taste. He slept badly and woke up tired. He snapped at his wife over nothing, then sat in the car for twenty minutes before going into the house. Weeks turned into months.',
          'One Sunday after service, he sat in the empty sanctuary while the others had lunch. He whispered, "Lord, nasaan Ka?" Nothing seemed to answer. He felt like a fraud for leading songs about joy.',
        ],
        pullQuote: 'He whispered, "Lord, nasaan Ka?"',
      },
      {
        kind: 'struggle',
        heading: 'Why God can feel far when you are depressed',
        paragraphs: [
          "For a believer, a season like this carries extra weight. Mark felt low, and on top of that he felt guilty for feeling low. Wasn't he supposed to have joy? Wasn't faith supposed to fix this?",
          'He had heard people say that depression comes from weak faith or hidden sin. So he confessed everything he could think of and prayed longer. When nothing changed, he decided the problem was him.',
          'Some well-meaning friends made it worse. One told him to claim his joy. Another said he must be under spiritual attack. Mark nodded, thanked them and went home feeling more alone than before.',
          'Depression can dull the feelings you used to have in prayer and worship, the same way it dulls the taste of food or the joy of a good song. That flat feeling convinced Mark that God had left. It was the heaviness talking, and it sounded a lot like his own voice.',
          'He kept serving because stopping felt like admitting failure. Nobody at church knew. He was the one people came to when they needed help.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Mark when God felt far',
        paragraphs: [
          'His wife, Liezl, finally said it. "Hindi ka okay, Mark. Kausapin mo si Pastor." He almost didn\'t go. He was afraid of being told to pray harder.',
          'Pastor Ed listened for an hour without interrupting. Then he opened to Psalm 42 and read it slowly. "The man who wrote this felt the same heaviness," he said. "He kept talking to God anyway. Your questions are still prayers." Then he added something Mark didn\'t expect: "I also want you to see a doctor. God works through doctors too."',
          'Mark saw a doctor the following month. The doctor diagnosed depression, started treatment and referred him to a counselor. It took several weeks before he noticed a difference. The first sign was small: one morning the coffee tasted like coffee again.',
          'He stepped back from the worship team for three months. The worship leader told him, "Your place is here when you\'re ready. Rest ka muna." Mark sat in the back row with Liezl and let other people lead the songs.',
          'His prayers changed shape. Some days they were one line, with Psalm 42:11 written on a sticky note on his dashboard. Some days he sat in silence and trusted that God was there even when he couldn\'t feel it. A few men from his small group started texting him every Friday: "Kape tayo?" Most Fridays he said yes.',
          'Liezl stayed close through all of it. Most evenings she sat with him on the porch, sometimes talking, sometimes just listening to the rain.',
          'It was a slow season, close to a year. When Mark picked up his guitar again, he played the same songs. They meant more now. He knew what it was like to sing them from the dark.',
        ],
        pullQuote: 'Your questions are still prayers.',
      },
      {
        kind: 'hope',
        heading: 'If God feels far from you right now',
        paragraphs: [
          'If you believe and still feel empty, your faith is still there. Many people in the Bible felt far from God and kept talking to Him anyway. Tell Him exactly how it feels. That counts as prayer.',
          "Seasons like Mark's do end. Many people come out of them with a quieter, steadier faith, one that knows God stays even when the feelings go.",
          'Tell one person too: a pastor, a small group leader, a friend who will listen. If the heaviness lasts more than two weeks, or you have lost interest in things you used to enjoy, see a doctor or counselor. Getting medical help is part of caring for the life God gave you, and help works.',
          'When you want somewhere to start, [HopeBegins](/) is free and faith-driven. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. For heavy days, read [Bible verses for when you feel down](/bible-verses-when-you-feel-down).',
        ],
      },
    ],
    tryThis: {
      title: 'Today: a one-line honest prayer',
      steps: [
        'Write one honest sentence to God about how you feel, even "I can\'t feel You right now."',
        'Read Psalm 42 slowly, out loud if you can.',
        'Text one person from church: "Can we talk this week?"',
        "If the low feeling has lasted weeks, book a doctor's appointment today.",
      ],
    },
    verse: 'psa-42-11',
    related: 'bible-verses-when-you-feel-down',
    faq: [
      {
        q: 'Can a Christian be depressed?',
        a: 'Yes. Depression is a health condition that can affect anyone, including people with strong faith. Prayer and help from a doctor or counselor can go together.',
      },
      {
        q: 'What do I do when God feels far away?',
        a: 'Keep talking to Him honestly, even if it is only one line, and read the Psalms, where people pray through the same feeling. Tell a pastor or friend, and see a doctor if the heaviness lasts more than two weeks.',
      },
    ],
    keywords: [
      'when God feels far',
      'Christian and depressed',
      'can a Christian be depressed',
      'faith and depression',
      'feeling far from God',
    ],
  },
  {
    slug: 'social-anxiety-small-steps',
    lang: 'en',
    theme: 'anxiety',
    metaTitle: "Social anxiety tips from Liza's barkada reunion",
    metaDescription:
      'Liza rehearsed every sentence and almost skipped her barkada reunion. The social anxiety tips that helped her stay, and one small step to try this week.',
    title: 'The reunion Liza almost skipped: small steps for social anxiety',
    dek: 'She practised every sentence in the shower and still wanted to cancel. Here is what helped her walk in, stay a while and go back the next time.',
    who: 'Liza, 22, fresh graduate in Bacolod',
    photo: {
      src: `${photos}/anxious-umbrellas.jpg`,
      alt: 'People walking under umbrellas in the rain',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The group chat that made her stomach drop',
        paragraphs: [
          'The message came on a Monday: "Reunion sa Saturday! 6 p.m., sa balay ni Ton." Twelve people from Liza\'s high school barkada in Bacolod, all together for the first time since graduation.',
          'Everyone replied with stickers. Liza typed "G!" and felt her stomach drop. For the rest of the week she rehearsed. What would she say when they asked about work? She was still job hunting. What if she laughed at the wrong moment? What if nobody talked to her?',
          'On Saturday she changed outfits three times. At 5:45 she was standing outside Ton\'s gate in the rain, umbrella in one hand, phone in the other, heart pounding. She typed: "Sorry guys, sumama pakiramdam ko." Her thumb hovered over send.',
          "This had happened before. She had left parties early, skipped a cousin's debut and avoided the office tour after a job interview. Afterwards she always felt relieved for an hour and lonely for a week.",
          '"Ang KJ mo naman," her titas teased at family parties. Liza laughed along. Inside, she wished someone understood how scared she really was.',
        ],
        pullQuote:
          'Afterwards she always felt relieved for an hour and lonely for a week.',
      },
      {
        kind: 'struggle',
        heading: 'Why social anxiety makes you want to cancel',
        paragraphs: [
          'Social anxiety goes further than shyness. It is a strong fear of being judged, watched or embarrassed, strong enough that you start avoiding the things you actually want to do.',
          'For Liza the fear started days before the event. She played out every possible conversation in her head, and in most of them she embarrassed herself. Her body joined in: a racing heart, a hot face, a tight throat.',
          'Avoiding it worked in the short term. Cancelling made the fear drop right away. The catch was that her mind learned "that was dangerous, good thing we escaped", so the next invitation felt even scarier.',
          'She also watched herself constantly. While others talked, she was busy checking her own face, her voice, her hands. That made it hard to really listen, which made conversations feel even more awkward.',
          'Being called shy or KJ made it harder to talk about. Liza assumed it was simply her personality, something she would always have to put up with.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Social anxiety tips that helped Liza stay',
        paragraphs: [
          'Standing at the gate, Liza did something her ate had taught her. She deleted the text, put the phone in her pocket and breathed: in for 4, out for 6, five times. Her heart was still pounding. She went in anyway.',
          'She gave herself a small, clear goal: stay one hour and talk to two people. After that she was free to leave. Knowing she had an exit made the door easier to walk through.',
          "She found a job to do. She helped Ton's mom set out the pancit and the barbecue. Having something in her hands gave her attention somewhere to go, and people came to her.",
          'She told one friend the truth. She pulled aside Mae, her seatmate since Grade 7, and admitted, "Kinabahan talaga ako pumasok." Mae laughed kindly. "Ako rin! Kaya nga ako nakadikit sa pagkain." After that they kept an eye on each other all night.',
          'She turned her focus outward. She got curious about her friends. "Uy, kumusta ang board review?" "Saan ka na nagwo-work?" Asking questions took the spotlight off her, and people loved being asked.',
          'She stayed three hours. On the jeepney home she noticed the fear had shrunk. She still replayed a few awkward moments that night. She also remembered the laughing.',
          'Over the next months she kept practising with small things: ordering at a counter, asking a question in an interview, saying hi first. She saw a counselor in town who helped her with the endless rehearsing. Before hard days she prayed with John 14:27 in mind and asked for peace for the next hour, nothing more.',
        ],
        pullQuote: 'Her heart was still pounding. She went in anyway.',
      },
      {
        kind: 'hope',
        heading: 'If social anxiety is holding you back',
        paragraphs: [
          'If you rehearse conversations, dread gatherings or cancel at the last minute, you are dealing with something real, and it can get better with practice.',
          'Social anxiety is common, and many people learn to manage it well with practice and support.',
          'Start smaller than you think. One short visit with a clear exit time. One question you ask someone else. Each time you stay, your mind learns the room was safer than it feared.',
          'If the fear keeps you from working, studying or seeing people for more than two weeks, talk to a doctor or counselor. That is a normal next step, and help works.',
          'If you want help getting started, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools for the minutes before you walk in, someone to pray for you, and an e-coach you can message on Messenger. For quick ways to settle your body, see [How to calm anxiety](/how-to-calm-anxiety).',
        ],
      },
    ],
    tryThis: {
      title: 'This week: one short yes',
      steps: [
        'Pick one small social thing you have been avoiding.',
        'Decide your exit before you go: one hour, then you can leave.',
        'Before you walk in, breathe in for 4 and out for 6, five times.',
        'Bring one question to ask someone else, like "How\'s work been?"',
      ],
    },
    verse: 'jhn-14-27',
    related: 'how-to-calm-anxiety',
    faq: [
      {
        q: 'What is the difference between shyness and social anxiety?',
        a: 'Shyness is feeling a bit nervous with new people. Social anxiety is a strong fear of being judged that makes you avoid things you want or need to do. If it gets in the way of daily life, talk to a doctor or counselor.',
      },
      {
        q: 'How do I stop cancelling plans because of anxiety?',
        a: 'Set a small goal with a clear exit time, calm your body with slow breathing before you go in, and focus on asking others questions. Each time you stay, the fear usually gets smaller.',
      },
    ],
    keywords: [
      'social anxiety tips',
      'social anxiety',
      'how to overcome social anxiety',
      'fear of being judged',
      'anxiety before parties',
    ],
  },
];
