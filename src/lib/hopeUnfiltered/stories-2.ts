import type { Story } from './types';

const photos = '/assets/images/photos';

export const stories2: Story[] = [
  {
    slug: 'pagod-na-sa-trabaho',
    lang: 'tl',
    theme: 'pressure',
    metaTitle: 'Pagod na sa trabaho? Ang kuwento ni Jomar sa night shift',
    metaDescription:
      'Pagod na sa trabaho si Jomar kahit natutulog na siya sa jeep pauwi. Ano ang nakatulong sa kanya, at isang maliit na bagay na puwede mong subukan ngayon.',
    title: 'Pagod na sa trabaho: ang kuwento ni Jomar sa night shift',
    dek: 'Tulog siya sa jeep pauwi, pero gising pa rin ang isip niya sa mga call. Ganito unti-unting gumaan ang mga araw niya.',
    who: 'Jomar, 29, BPO agent sa Ortigas',
    photo: {
      src: `${photos}/tired-jeepney.jpg`,
      alt: 'A man resting at the wheel of a jeepney',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Alas-sais ng umaga, pauwi na si Jomar',
        paragraphs: [
          'Alas-sais ng umaga, palabas si Jomar ng building sa Ortigas. Papasok pa lang ang mga naka-office attire, siya naman pauwi na, naka-hoodie, may headset pa sa leeg kasi nakalimutan niyang tanggalin.',
          'Pagsakay niya ng jeep papuntang Pasig, tulog na agad siya bago pa makapagbayad. Ilang beses na siyang ginising ng driver sa dulo ng ruta. "Boss, last stop na." Tatango lang siya, bababa, at sasakay ulit pabalik.',
          'Tatlong taon na siya sa account nila. Magaling siya. Mataas ang CSAT niya, at siya ang tinatawag kapag may galit na customer. Pero nitong mga huling buwan, iba na. Bago pa mag-log in, sumasakit na ang batok niya. Kapag tumunog ang beep ng bagong call, parang may kumukurot sa sikmura niya.',
          '"Ma, pagod na ako sa trabaho," sabi niya sa nanay niya isang Linggo. "Lahat naman pagod, anak," sagot nito habang naghahain ng tanghalian. Tama naman, naisip ni Jomar. Kaya hindi na niya inulit.',
          'Pero gabi-gabi, habang naglalakad siya papunta sa building, mabagal ang mga hakbang niya. Minsan, tumatayo muna siya sa tapat ng 7-Eleven nang limang minuto, nakatitig lang sa phone, bago pumasok.',
        ],
        pullQuote:
          'Kapag tumunog ang beep ng bagong call, parang may kumukurot sa sikmura niya.',
      },
      {
        kind: 'struggle',
        heading: 'Bakit hindi nawawala ang pagod kahit natulog ka na',
        paragraphs: [
          'Ang pagod ni Jomar, hindi na naaayos ng tulog. Kahit walong oras siyang nakahiga sa araw, gising pa rin ang isip niya sa mga call. Minsan, naririnig pa niya sa panaginip ang hold music.',
          'Mahirap talaga ang night shift. Baliktad ang oras mo sa buong bahay. Maingay ang kapitbahay, may nagvi-videoke, nagluluto ang nanay mo. Kapag gising ka naman, tulog na ang barkada mo. Unti-unti, trabaho at tulog na lang ang laman ng buhay mo.',
          'Napansin din niyang naging mainitin ang ulo niya. Konting ingay lang ng pamangkin, naiinis na siya. Dati, nag-eenjoy siyang mag-basketball tuwing rest day. Ngayon, nakahiga lang siya at nag-i-scroll hanggang oras na ulit ng shift.',
          'Ganito ang itsura ng burnout: pagod na hindi naaayos ng pahinga, pagkainis o pagkawala ng gana sa trabaho, at pakiramdam na kahit anong gawin mo, kulang pa rin.',
          'Ang pinakamabigat, nahihiya siyang umamin. Siya ang breadwinner sa bahay. May hinuhulugan silang motor ng kapatid niya. Paano siya magrereklamo, eh may trabaho naman siya?',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ano ang nakatulong kay Jomar nang pagod na siya sa trabaho',
        paragraphs: [
          'Walang isang malaking sagot. Ilang maliliit na pagbabago ang ginawa niya, isa-isa, at doon unti-unting gumaan.',
          'Una, inayos niya ang tulog niya kahit sa maliit na paraan. Bumili siya ng eye mask at earplugs, at nagsabit ng makapal na kumot sa bintana. Kinausap niya ang nanay niya: "Ma, kung puwede po, huwag muna akong gisingin hanggang alas-dos." Hindi perpekto, pero mas mahaba na ang tulog niya.',
          'Pangalawa, gumawa siya ng "pagsara" pagkatapos ng shift. Bago umuwi, sampung minuto siyang umuupo sa pantry, umiinom ng tubig, at isinusulat sa phone ang mga call na bumabagabag sa kanya. Tapos sinasabi niya sa sarili, "Tapos na ang shift. Bukas na ulit \'yan."',
          'Pangatlo, ginamit niya ang leave niya. Matagal na niyang iniipon iyon para raw sa emergency. Sabi ng isang ka-team niya, "Pre, emergency na \'yan." Nag-file siya ng tatlong araw. Wala siyang ginawang espesyal. Natulog, kumain kasama ang pamilya, naglakad sa umaga. Iyon pala ang kailangan niya.',
          'Pang-apat, kinausap niya ang team lead niya. Kinabahan siya, pero sinabi niya nang diretso na hirap na siya sa sunod-sunod na escalation. Nagulat siya nang sabihin nitong napansin na rin nito. Hinati nila ang mga mabibigat na call sa ibang senior agent, at sinabihan siya tungkol sa libreng counseling ng kumpanya. Pumunta siya. Doon niya unang nasabi nang buo kung gaano na siya kapagod.',
          'At bumalik siya sa pagdarasal. Maikli lang ang dasal niya isang gabi bago mag-shift. Binasa niya ang Mateo 11:28 at sinabi lang, "Lord, pagod na po ako." Para kay Jomar, iyon ang pinakatapat na dasal na nasabi niya sa matagal na panahon.',
          'Makalipas ang ilang buwan, pagod pa rin siya paminsan-minsan. Night shift pa rin iyon. Pero tumatayo na ulit siya para mag-basketball tuwing rest day, at hindi na siya humihinto sa tapat ng 7-Eleven bago pumasok.',
        ],
        pullQuote: "Pre, emergency na 'yan.",
      },
      {
        kind: 'hope',
        heading: 'Kung pagod ka na rin sa trabaho',
        paragraphs: [
          'Kung binabasa mo ito habang naka-break ka, o habang nasa jeep pauwi, hinga muna. Ang pagod na ganito, tanda na matagal mo nang binubuhat ang isang mabigat na bagay.',
          'Pumili ng isang bagay mula sa ginawa ni Jomar ngayong linggo. Isang "pagsara" pagkatapos ng shift. Isang usapan sa team lead mo. Isang leave na matagal mo nang iniipon.',
          'Kung higit dalawang linggo ka nang ganito, o hirap ka nang bumangon at gawin ang mga dati mong ginagawa, kausapin ang doktor o counselor. Normal na hakbang iyan, at nakakatulong ito.',
          'Kung gusto mo ng mauumpisahan ngayon din, libre ang [HopeBegins](/). Piliin mo kung ano ang nararamdaman mo at bibigyan ka ng isang maliit na bagay na puwede mong subukan ngayong araw, mga calming tool, taong magdarasal para sa iyo, at e-coach na puwede mong i-message sa Messenger. May mga praktikal na hakbang din sa [Burnout sa trabaho](/burnout-sa-trabaho).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong shift: 10-minutong pagsara',
      steps: [
        'Bago umuwi, umupo nang sampung minuto at uminom ng tubig.',
        'Isulat sa phone ang mga call o bagay na bumabagabag sa iyo.',
        'Sa tabi ng bawat isa, isulat ang susunod na hakbang, o "bukas na \'yan."',
        'Sabihin sa sarili: "Tapos na ang shift." Saka umuwi.',
      ],
    },
    verse: 'mat-11-28-30',
    related: 'burnout-sa-trabaho',
    faq: [
      {
        q: 'Normal ba na pagod na pagod ako sa trabaho kahit natutulog naman ako?',
        a: 'Kapag hindi na naaayos ng tulog at pahinga ang pagod, puwedeng burnout na ito. Kadalasan, kasama nito ang pagkainis, kawalan ng gana sa trabaho, at pakiramdam na wala kang nagagawang tama. Kung ilang linggo na itong ganito, kausapin ang doktor o counselor.',
      },
      {
        q: 'Ano ang puwede kong gawin kapag pagod na ako sa trabaho?',
        a: 'Magsimula sa maliit: protektahan ang tulog mo, gumawa ng maikling pagsara pagkatapos ng shift, gamitin ang leave mo, at sabihin sa team lead mo kung ano ang mabigat. Kausapin din ang isang taong pinagkakatiwalaan mo.',
      },
    ],
    keywords: [
      'pagod na sa trabaho',
      'pagod na ako sa trabaho',
      'night shift burnout',
      'burnout sa BPO',
      'call center burnout',
    ],
  },
  {
    slug: 'ofw-loneliness-homesick',
    lang: 'en',
    theme: 'lonely',
    metaTitle: 'OFW loneliness: how Arnel faced homesickness in Dubai',
    metaDescription:
      'Arnel rode the metro home alone and missed every birthday. How he dealt with OFW loneliness and homesickness, and one thing you can try this week.',
    title: 'OFW loneliness: what helped Arnel through his nights in Dubai',
    dek: 'Twelve-hour shifts, an empty train ride home, and video calls that ended too soon. Here is what made the distance easier to carry.',
    who: 'Arnel, 33, warehouse worker in Dubai',
    photo: {
      src: `${photos}/alone-train.jpg`,
      alt: 'One passenger in an empty train carriage',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The ride home after a twelve-hour shift',
        paragraphs: [
          "Arnel's shift at a warehouse in Dubai ends at seven at night. By the time he boards the metro, the carriage is almost empty. He sits by the window, scrolls through photos of his kids, and watches the lights of the city slide past.",
          "Back in Batangas it is eleven at night. His wife, Joan, is usually still awake. The kids are not. Most of their video calls happen like this: her face lit by the phone, her voice low so the children won't wake up, the electric fan humming behind her.",
          "He has been abroad for four years. In that time he has missed four of his daughter's birthdays, his son's first day of school and his father's operation. He watched the birthday parties on video, singing along a second behind everyone else because of the lag.",
          '"Okay lang ako dito," he tells Joan every night. He says it so often that he almost believes it. Then the call ends, the room in the shared accommodation goes quiet, and he lies on the top bunk staring at the ceiling.',
        ],
        pullQuote:
          'He watched the birthday parties on video, singing along a second behind everyone else because of the lag.',
      },
      {
        kind: 'struggle',
        heading: 'Why OFW loneliness hits harder than people think',
        paragraphs: [
          'From home, his life looked fine. He sent money every payday. He posted photos from the beach on his day off. Relatives called him the successful one.',
          'Nobody saw the other side. The six men in his room worked different shifts, so someone was always sleeping and nobody really talked. His closest friend from his first year had gone home. He felt like a visitor in two places: a worker in Dubai and a voice on a phone in Batangas.',
          'For Arnel, homesickness meant missing ordinary days. Hearing about the teacher his son disliked. Being there when the roof leaked. Eating sinigang that tasted right. Every "okay lang ako" widened the gap a little more, because his family only knew the version of him he chose to show.',
          'He also felt guilty for feeling sad at all. He was there for his family. Complaining felt ungrateful, so he kept it in. On his rest days he mostly slept, and when he woke up, the loneliness was still there.',
        ],
      },
      {
        kind: 'helped',
        heading: 'How Arnel dealt with homesickness, one step at a time',
        paragraphs: [
          'The change started with an honest call. One night Joan asked, "Kumusta ka talaga?" He paused too long, and she heard it. So he told her: he was lonely, he was tired, and he didn\'t know how many more years he could do this. She cried a little. Then she said, "Sana sinabi mo agad. Mag-asawa tayo."',
          'After that, they changed how they talked. They kept one long call on his rest day, with the kids awake. During the week they sent voice messages about small things: what he ate for lunch, what the dog did, a song on the radio. The small messages made him feel part of their days again.',
          'He looked for people too. A coworker from Pampanga invited him to a Filipino fellowship that met on Friday mornings, which is the weekend there. He almost stayed in bed. He went, sat at the back, and ate pancit with strangers who understood exactly what he meant when he said he missed the rain. Within a few weeks he had a small group that met to pray and eat together.',
          'He gave his rest day a shape. Sleep in, call home, then a walk or a game of basketball, then fellowship. Having something to look forward to made the long weeks feel shorter.',
          'He started talking to God on the train home, sometimes just one line. Isaiah 41:10 became his phone wallpaper, so he saw it every time he checked the time.',
          'When the heaviness stayed for weeks, his fellowship leader suggested a counselor he could see online. Talking to someone trained helped Arnel sort out what he could change and what he simply had to grieve.',
        ],
        pullQuote: 'Sana sinabi mo agad. Mag-asawa tayo.',
      },
      {
        kind: 'hope',
        heading: 'If you are far from home tonight',
        paragraphs: [
          'If you are reading this in a bunk bed, on a break or on a train far from home, the ache you feel makes sense. You love people who are a plane ride away. Missing them is part of loving them.',
          'Try one thing this week. Tell one person at home how you really are. Find one Filipino group near you: a fellowship, a basketball game, a church. Send a voice message about something small.',
          'If the loneliness has lasted more than two weeks, or it is making it hard to sleep, eat or work, talk to a doctor or counselor. Many can be reached online, and talking to one is a normal next step.',
          'If you want a place to start tonight, [HopeBegins](/) is free and works wherever you are. Pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. You can also read [I feel alone](/i-feel-alone) for a few things that help on lonely days.',
        ],
      },
    ],
    tryThis: {
      title: 'This week: close the distance a little',
      steps: [
        'Answer "Kumusta ka?" honestly with one person at home.',
        'Swap one rushed call for a longer one on your rest day, when the kids are awake.',
        'Send a voice message about something small: your lunch, the weather, a song.',
        'Look up one Filipino fellowship or group near you and go once.',
      ],
    },
    verse: 'isa-41-10',
    related: 'i-feel-alone',
    faq: [
      {
        q: 'How do OFWs deal with loneliness abroad?',
        a: 'Small, regular things help most: honest calls with family, a Filipino community or church nearby, a routine for rest days, and someone to talk to when it gets heavy. If the loneliness lasts for weeks, a counselor can help, and many work online.',
      },
      {
        q: 'Is it normal to feel homesick after years abroad?',
        a: "Yes. Homesickness can come back at any time, especially around birthdays, holidays or family problems you can't be there for. Telling someone how you feel usually makes it lighter.",
      },
    ],
    keywords: [
      'OFW loneliness',
      'how to deal with homesickness',
      'homesick OFW',
      'lonely working abroad',
      'OFW mental health',
    ],
  },
  {
    slug: 'failed-board-exam-what-now',
    lang: 'en',
    theme: 'new-start',
    metaTitle: 'Failed the board exam? What Carla did next',
    metaDescription:
      "Carla failed the nursing board exam and couldn't face her family or batchmates. What helped her get up again, and what to do if you failed your board exam.",
    title: 'Failed the board exam: how Carla got up again',
    dek: "Her name wasn't on the list. For weeks she hid from her family, her batchmates and her phone. Here is how she found her footing again.",
    who: 'Carla, 23, nursing graduate in Iloilo',
    photo: {
      src: `${photos}/unsure-road.jpg`,
      alt: 'A road disappearing into fog',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The night the results came out',
        paragraphs: [
          'The results of the nursing board exam came out on a Thursday night. Carla was in her room in Iloilo, refreshing the list on her phone, while her family watched TV in the sala and pretended not to wait.',
          'She searched her surname three times. Then she searched her first name. Then she scrolled the whole list from the top, letter by letter, as if the search box might have missed her.',
          'Her batchmates\' group chat lit up: congratulations, crying emojis, photos of tarpaulins already being printed. Her mother knocked softly. "Anak?" Carla said she needed a minute. She didn\'t come out until the next afternoon.',
          'Her parents had sold a small piece of land in the province to pay for review school. Her Tita had already told the whole family that Carla would be the nurse who takes them all abroad. Carla thought about all of it at once, over and over.',
        ],
        pullQuote: 'She searched her surname three times.',
      },
      {
        kind: 'struggle',
        heading: 'Why failing the board exam hurts so much',
        paragraphs: [
          'For a lot of Filipino graduates, the board exam carries more than a license. It carries the money your family spent, the hopes of relatives, and the plans everyone made around your future.',
          'So when Carla failed, she felt she had failed everyone. She muted the group chat and stopped posting. When relatives visited, she stayed in her room. At church she sat near the door so she could leave before anyone asked.',
          'The thoughts were loud. Maybe I am not meant to be a nurse. Maybe I wasted their money. Maybe everyone is talking about me. She lay awake doing the math on how much review school had cost.',
          'Her body felt it too. She slept late, barely ate, and felt tired even after doing nothing. Weeks passed, and her review books stayed in the box by the door.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What Carla did after she failed the board exam',
        paragraphs: [
          'The first step came from her father. One evening he sat at the foot of her bed and said, "Anak, pinag-aral ka namin kasi mahal ka namin. Mahal ka pa rin namin ngayon." She cried for a long time. It was the first time she had let herself.',
          'The second was telling the truth to one friend. She messaged Patricia, a batchmate who had failed the year before and passed on her second try. "Paano mo kinaya?" Patricia called her right away and talked for an hour. Hearing someone say "I\'ve been there" made the shame smaller.',
          'Then she looked at the exam honestly. She checked her ratings and saw which subjects had pulled her down. The giant, vague failure became two weak areas she could work on.',
          'She gave herself time before starting again: two weeks of rest, sleep, and afternoon walks along the river. Then she made a small schedule, three hours of review a day with Sundays off. She studied with Patricia twice a week by video call.',
          'She started praying again, honestly this time. Some nights the whole prayer was, "Lord, I\'m scared to try again." Her mother sometimes sat with her and prayed too. She taped 2 Corinthians 4:8-9 to her desk.',
          'Carla retook the exam the next time it was offered, and she passed. What she remembers most is the night she decided to start again, before she knew how it would end.',
        ],
        pullQuote: 'Anak, pinag-aral ka namin kasi mahal ka namin.',
      },
      {
        kind: 'hope',
        heading: 'If you failed your board exam',
        paragraphs: [
          "If your name wasn't on the list, give yourself time to feel it. Disappointment, shame and grief are normal after something you worked so hard for. For most people, they get quieter with time.",
          'When you are ready, take one small step. Tell one person the truth. Look at your ratings to see what to work on. Write a schedule that leaves room for rest. Plenty of people pass on a second or third try.',
          "If weeks go by and you still can't sleep, eat or get out of bed, or you feel hopeless, talk to a doctor or counselor. That is a normal next step, and help works.",
          'And if you want a place to start today, [HopeBegins](/) is free. Pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. If you are unsure what comes next, [I feel lost](/i-feel-lost) has a few small steps for days like this.',
        ],
      },
    ],
    tryThis: {
      title: 'This week: one step toward trying again',
      steps: [
        'Tell one person you trust how you really feel about the result.',
        'Rest for a few days on purpose: sleep, eat, walk.',
        'Look at your ratings and write down the two subjects to work on first.',
        'Make a review schedule with one full rest day a week.',
      ],
    },
    verse: '2co-4-8-9',
    related: 'i-feel-lost',
    faq: [
      {
        q: 'What should I do after failing the board exam?',
        a: 'Give yourself time to rest and feel the disappointment, then tell someone you trust. When you are ready, look at your ratings to see which subjects to work on, and make a schedule with rest days. Many people pass on a later try.',
      },
      {
        q: 'How do I face my family after failing the board exam?',
        a: 'Tell them how you feel, even briefly. Families often worry more about you than about the result. If it helps, ask one person to be with you when you talk to the others.',
      },
    ],
    keywords: [
      'failed board exam',
      'failed nursing board exam',
      'what to do after failing the board exam',
      'bagsak sa board exam',
      'retaking the board exam',
    ],
  },
  {
    slug: 'first-panic-attack-jeepney',
    lang: 'en',
    theme: 'anxiety',
    metaTitle: 'First panic attack: what happened to Rina on a jeepney',
    metaDescription:
      'Rina thought she was having a heart attack on a jeepney in the rain. What a first panic attack feels like, the symptoms, and what helped her afterwards.',
    title: "Rina's first panic attack happened on a jeepney in the rain",
    dek: 'Her heart raced, her hands went numb, and she was sure she was dying. The ER doctor gave her a word for it, and that was where things started to get better.',
    who: 'Rina, 26, accountant in Quezon City',
    photo: {
      src: `${photos}/anxious-jeepney-rain.jpg`,
      alt: 'A jeepney with its lights on in heavy rain',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Stuck in traffic on Commonwealth',
        paragraphs: [
          'It had been raining since lunch. By six, Commonwealth Avenue was a long line of red lights, and Rina sat at the back of a jeepney with her laptop bag on her lap, thinking about the audit deadline on Friday.',
          'It started with her heart. It began to pound, hard and fast, for no reason she could see. Then her chest felt tight. Her hands tingled and went cold. The jeepney suddenly felt too small, the rain too loud, the air too thick to breathe.',
          'She was sure something terrible was happening. Heart attack, she thought. At 26. In traffic. She grabbed the handrail and told the woman beside her, "Ate, parang hindi po ako makahinga." The woman held her arm and asked the driver to stop near a hospital.',
          'In the emergency room they checked her heart, her blood pressure and her breathing. Everything came back normal. The doctor pulled up a chair and said, "I think you had a panic attack."',
        ],
        pullQuote: 'Ate, parang hindi po ako makahinga.',
      },
      {
        kind: 'struggle',
        heading: 'Panic attack symptoms that feel like something worse',
        paragraphs: [
          'Rina felt relieved and embarrassed at the same time. Relieved that her heart was fine. Embarrassed that she had made a scene over what her Tita later called "just nerves."',
          'Nothing about it had felt small. A panic attack can bring a racing heart, a tight chest, shortness of breath, shaking, sweating, dizziness, tingling hands, and a strong sense that something terrible is about to happen. Many people think it is a heart attack the first time.',
          'The hardest part came after. She started to fear the next one. She avoided jeepneys and paid for Grab rides she couldn\'t really afford. She checked her pulse at her desk. Every flutter in her chest made her wonder, "Is this happening again?"',
          'Looking back, the signs had been building for months: audit season, long nights, skipped meals, a lot of coffee and almost no rest. Her body had been running on alarm for a long time.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Rina after her first panic attack',
        paragraphs: [
          'The ER doctor had told her two things she held on to. A panic attack is frightening, and it passes, often within 5 to 20 minutes. And if the attacks kept coming, she should see a doctor for follow-up. She booked a check-up that week.',
          "Her doctor explained what happens in the body during panic and suggested slow breathing. Rina practised it while she was calm, so it would come easily when she wasn't: in through the nose for 4 counts, out through the mouth for 6, for two minutes. She did it every morning before work, like brushing her teeth.",
          'She learned to talk to the panic when it came. "This is a panic attack. It feels awful, and it will pass." She would put her feet flat on the floor and name five things she could see. The second time it happened, in a meeting, it still felt bad. It ended faster.',
          'She also started riding jeepneys again, a little at a time. First short trips with her younger sister. Then the full ride home on a dry day. Then a rainy one. Each ride that ended fine made the next one easier.',
          'She told her manager about the audit workload, cut her coffee to one cup a day, and started eating lunch away from her desk. Her mother prayed with her over the phone on Sunday nights. Psalm 56:3 became the verse she whispered in traffic.',
          'When the fear of another attack still hung over her after a few months, her doctor referred her to a counselor. That helped her understand the worry underneath the panic, and what to do with it.',
        ],
        pullQuote: 'This is a panic attack. It feels awful, and it will pass.',
      },
      {
        kind: 'hope',
        heading: 'If you just had your first panic attack',
        paragraphs: [
          'If your heart is racing as you read this, put your feet on the floor. Breathe in for 4, out for 6. Panic rises, peaks and then passes. You can ride this one out.',
          'If it is your first time having chest pain or trouble breathing, get checked by a doctor or go to the ER. That was the right call for Rina, and it is the right call for you. Once other causes are ruled out, you can treat the panic for what it is.',
          'If panic attacks keep coming back, or you start avoiding places because of them, talk to a doctor or counselor. Panic attacks can be treated, and seeing someone about them is a normal next step.',
          'For the next time, [Having a panic attack? Breathe with us](/panic-attack-what-to-do) walks you through two minutes of breathing, step by step. And [HopeBegins](/) is free: pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger.',
        ],
      },
    ],
    tryThis: {
      title: 'Today: practise the breath before you need it',
      steps: [
        'Sit with both feet flat on the floor.',
        'Breathe in through your nose for 4 counts.',
        'Breathe out through your mouth for 6 counts.',
        'Keep going for two minutes. Do it once a day, so it comes easily when panic does.',
      ],
    },
    verse: 'psa-56-3',
    related: 'panic-attack-what-to-do',
    faq: [
      {
        q: 'What does a first panic attack feel like?',
        a: 'Many people feel a racing heart, chest tightness, shortness of breath, shaking, sweating, dizziness or tingling, with a sense that something terrible is happening. It often passes within 5 to 20 minutes. If it is your first time having chest pain, get checked by a doctor.',
      },
      {
        q: "How do I know if it's a panic attack or a heart attack?",
        a: "You can't always tell on your own, so if you have chest pain or trouble breathing for the first time, go to the ER or see a doctor. Once other causes are ruled out, a doctor can help you manage panic attacks.",
      },
    ],
    keywords: [
      'first panic attack',
      'panic attack symptoms',
      'panic attack or heart attack',
      'panic attack while commuting',
      'how to stop a panic attack',
    ],
  },
  {
    slug: 'grieving-a-grandparent',
    lang: 'en',
    theme: 'loss',
    metaTitle: 'Grieving a grandparent: how Ella coped after Lola died',
    metaDescription:
      "Every morning Ella's Lola made coffee and pandesal. After she died, the house went quiet. How Ella coped with grief, and small things that help.",
    title: 'The morning the pandesal stopped: grieving a grandparent',
    dek: "For 25 years, Ella woke up to her Lola's coffee. After the funeral, the kitchen stayed dark. Here is how she learned to carry the grief.",
    who: 'Ella, 25, teacher in Batangas',
    photo: {
      src: `${photos}/morning-pandesal.jpg`,
      alt: 'Coffee being poured beside pandesal',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Coffee and pandesal at six',
        paragraphs: [
          'For as long as Ella could remember, her Lola was up before everyone else. By six the kitchen of their house in Batangas smelled of barako coffee, and a paper bag of warm pandesal sat on the table. Lola would pour Ella a cup and ask the same question every day: "O, ano\'ng plano mo ngayong araw?"',
          'Lola got sick in June. By August she was gone. Then came the wake: songs and prayers each night, relatives from Manila and Mindoro, a long table of food, coffee for whoever stayed up. Ella served guests and kept busy. She barely cried.',
          'Then everyone went home. On the first Monday after the burial, Ella woke at six out of habit and walked into the kitchen. It was dark. No coffee. No pandesal. She stood there in her house clothes and finally broke down.',
        ],
        pullQuote: 'It was dark. No coffee. No pandesal.',
      },
      {
        kind: 'struggle',
        heading: 'Why grief can hit hardest after the funeral',
        paragraphs: [
          'During the wake there was always something to do. After the funeral the busyness stopped, and the loss moved into the ordinary moments. The chair Lola always sat in. Her slippers by the door. Her number, still in Ella\'s phone under "Lola Ising."',
          'Ella went back to teaching after a week. She smiled for her Grade 4 class and cried in the faculty restroom at lunch. She snapped at her mother, then felt guilty. Some days she felt nothing at all, which scared her more.',
          'People meant well. "Nasa mabuting lugar na siya." "At least hindi na siya naghihirap." Ella believed both, and they still didn\'t touch the empty space in her mornings.',
          'She also felt she should be over it by now. Lola was 84. Other people had lost parents, even children. Who was she to fall apart over a grandmother? So she kept her grief small and quiet, and it stayed heavy.',
        ],
      },
      {
        kind: 'helped',
        heading: 'How Ella learned to cope with grief',
        paragraphs: [
          'What helped first was letting the grief be as big as it was. Her pastor visited one evening and said, "You had her every single morning for 25 years. Of course this hurts." Ella cried in front of someone for the first time since the burial.',
          "She brought the mornings back in a new way. One Saturday she bought pandesal, brewed barako in Lola's old kettle, and sat at the table with her mother. They talked about Lola: her terrible jokes, her scolding, the way she hummed hymns while sweeping the yard. They laughed, then cried, then laughed again. It became their Saturday thing.",
          'She wrote to Lola in a small notebook, the things she would have said over coffee. "Lola, Grade 4 is wild this year." "Lola, I miss you today." Some days she wrote nothing. The notebook was there when she needed it.',
          'She let her body grieve too. She slept when she was tired, walked around the plaza in the late afternoon, and said no to extra school activities for a while.',
          'And she prayed honestly. Some nights she was angry. Some nights she only said, "Lord, I miss her." Psalm 34:18 felt true in a way it never had before.',
          'Months later the grief was still there, and it had changed. It came in waves now. On good days she could think of Lola and smile. On hard days she knew who to call.',
        ],
        pullQuote:
          'You had her every single morning for 25 years. Of course this hurts.',
      },
      {
        kind: 'hope',
        heading: 'If you are grieving someone you love',
        paragraphs: [
          'If you are missing someone right now, there is no schedule for this. Grief comes in waves, often in the small daily things you shared. Feeling it is part of having loved them.',
          'Try one small thing this week. Tell one person a story about the one you lost. Keep one of their habits alive: a recipe, a song, a morning cup of coffee. Write them a short note.',
          'If the grief makes it hard to sleep, eat, work or get through the day for weeks on end, or you feel hopeless, talk to a doctor or counselor. Asking for support with grief is a normal next step.',
          'And if you want a place to start today, [HopeBegins](/) is free. Pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. For heavy days, [Bible verses for when you feel down](/bible-verses-when-you-feel-down) gathers a few verses and a short prayer.',
        ],
      },
    ],
    tryThis: {
      title: 'This week: keep one of their habits',
      steps: [
        'Pick one thing they used to do: a recipe, a song, a morning cup of coffee.',
        'Do it once this week, alone or with someone who loved them too.',
        'Share one story about them while you do it.',
        'If you cry, let yourself. If you laugh, let yourself too.',
      ],
    },
    verse: 'psa-34-18',
    related: 'bible-verses-when-you-feel-down',
    faq: [
      {
        q: 'How do you cope with the death of a grandparent?',
        a: 'Let yourself grieve, talk about them with people who loved them, and keep small rituals that bring them to mind. Rest, eat and sleep as well as you can. If the grief makes daily life very hard for weeks, talk to a doctor or counselor.',
      },
      {
        q: 'Is it normal to grieve a grandparent this much?',
        a: 'Yes. If your grandparent was part of your everyday life, losing them can hurt as much as any loss. There is no right amount of time to grieve.',
      },
    ],
    keywords: [
      'how to cope with grief',
      'grieving a grandparent',
      'death of a lola',
      'how to deal with the loss of a loved one',
      'grief after the funeral',
    ],
  },
  {
    slug: 'paano-mag-move-on',
    lang: 'tl',
    theme: 'loss',
    metaTitle: 'Paano mag move on after 5 years: ang kuwento ni Bea',
    metaDescription:
      'Limang taon sila, tapos biglang wala na. Paano nag-move on si Bea kahit hindi niya mabura ang playlist nila, at ilang maliit na hakbang para sa iyo.',
    title: 'Paano mag move on kapag limang taon kayo',
    dek: 'Hindi niya mabura ang playlist nila, at gabi-gabi niyang tinitingnan ang profile niya. Ganito unti-unting natutong huminga ulit si Bea.',
    who: 'Bea, 24, graphic artist sa Makati',
    photo: {
      src: `${photos}/alone-balcony.jpg`,
      alt: 'A woman alone on a balcony over the street',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Ang playlist na hindi niya mabura',
        paragraphs: [
          'May playlist si Bea na "Kami." Isang daan at labing-apat na kanta: limang taon ng road trips, tampuhan at bati. Tatlong buwan na mula nang mag-break sila ni Enzo, at nandoon pa rin ang playlist sa phone niya.',
          'Gabi-gabi, pag-uwi niya galing office sa Makati, umuupo siya sa balcony ng inuupahan niyang condo, naka-earphones, at pinapakinggan ang mga kanta nila. Tapos bubuksan niya ang profile ni Enzo. Titingnan kung may bago siyang post. Kung sino ang nag-react. Kung mukha ba siyang masaya.',
          '"Bes, i-unfollow mo na kasi," sabi ng best friend niyang si Kim. "Oo, bukas," sagot ni Bea. Ilang "bukas" na ang lumipas.',
          'Pinakamahirap ang mga Linggo. Linggo ang araw nila dati: church, lunch sa bahay ng pamilya ni Enzo, tapos sine. Ngayon, nakahiga lang siya buong araw, naka-on ang TV pero hindi naman nanonood.',
          'Sa trabaho, hirap siyang mag-focus. Siya dati ang pinakamabilis sa team. Ngayon, isang poster lang, buong araw na. Kapag may tumugtog na kanta nila sa radyo ng Grab, tumitingin siya sa bintana para hindi makita ng driver na umiiyak siya.',
        ],
        pullQuote: 'Ilang "bukas" na ang lumipas.',
      },
      {
        kind: 'struggle',
        heading: 'Bakit ang hirap mag-move on',
        paragraphs: [
          'Sa limang taon, nabuo ang mga routine nila, ang mga kaibigang sabay nilang kasama, ang mga planong pinag-usapan na. Nang mawala si Enzo, nawala rin ang hugis ng araw ni Bea. Ang Sunday lunch, ang good morning text, ang taong unang tinatawagan kapag may balita.',
          'Ang pagtingin sa profile niya, parang pagkamot sa sugat. Saglit na ginhawa, tapos mas masakit. Bawat check, bumabalik si Bea sa umpisa.',
          'May hiya rin. Alam ng lahat ng kaibigan nila ang nangyari. Sa mga family gathering, may nagtatanong pa rin, "Kumusta na kayo ni Enzo?" Ngumingiti lang siya at sinasabing okay lang.',
          'Pati katawan niya, ramdam. Wala siyang ganang kumain, at pumayat siya nang hindi sinasadya. "Ang payat mo na, Bea," sabi ng isang katrabaho. Ngumiti lang ulit siya.',
          "At ang pinakamabigat, ang mga tanong sa isip niya tuwing gabi. Kulang ba ako? Ano'ng mali sa akin? May bago na ba siya? Paikot-ikot, walang sagot, hanggang madaling-araw.",
        ],
      },
      {
        kind: 'helped',
        heading: 'Paano nag-move on si Bea, paunti-unti',
        paragraphs: [
          'Walang isang araw na bigla siyang okay na. Pero may mga ginawa siyang nakatulong, isa-isa.',
          'Una, nag-mute muna siya bago nag-unfollow. Mas kaya niya iyon. Hindi na lumalabas ang mga post ni Enzo, at nabawasan ang mga gabing nakatitig siya sa profile nito. Makalipas ang isang buwan, kinaya na niyang mag-unfollow.',
          'Pangalawa, inilipat niya ang playlist sa isang folder na "Para sa ibang araw." Gumawa siya ng bago, "Ako Muna," puro kantang wala pang alaala.',
          'Pangatlo, sinabi niya kay Kim ang totoo: gabi-gabi siyang umiiyak at hindi niya alam kung paano huminto. Mula noon, sinamahan siya ni Kim. Tuwing Huwebes, kumakain sila sa labas o naglalakad sa Ayala Triangle pagkatapos ng trabaho.',
          'Isinulat din niya ang mga tanong na paikot-ikot sa isip niya tuwing gabi. Sa tabi ng "Kulang ba ako?", isinulat niya ang mga sinabi ni Kim at ng pamilya niya tungkol sa kanya. Mabagal, pero unti-unting humina ang boses na nagsasabing may mali sa kanya.',
          'Pang-apat, binigyan niya ng bagong laman ang mga gabi. Nag-enroll siya sa pottery class tuwing Martes. Bumalik siya sa young adults group ng church nila na matagal na niyang hindi napupuntahan. May mga gabi pa ring mabigat, pero mas kaunti na.',
          'At nagdasal siya nang totoo. Ang dasal niya noong una, "Lord, ibalik Mo siya." Nang tumagal, naging "Lord, pagalingin Mo ako." Naka-sticky note sa monitor niya sa office ang Awit 147:3.',
          'Pagkalipas ng anim na buwan, isang gabi, narinig niya ang isa sa mga kanta nila sa isang café. Napangiti siya. Masakit pa rin nang kaunti. Pero napangiti siya.',
        ],
        pullQuote: 'Lord, pagalingin Mo ako.',
      },
      {
        kind: 'hope',
        heading: 'Kung nahihirapan kang mag-move on ngayon',
        paragraphs: [
          'Kung binabasa mo ito habang nakatitig sa profile ng isang tao, hinga muna. Normal na masaktan nang ganito. Minahal mo siya, at bahagi ng pagmamahal na iyon ang sakit na ito.',
          'Pumili ng isang maliit na hakbang ngayong linggo. Mag-mute. Ilipat ang playlist. Sabihin sa isang kaibigan ang totoo. Magplano ng isang bagay na para sa iyo lang.',
          'Kung higit dalawang linggo ka nang hindi makatulog, hindi makakain, o hirap nang gumana sa trabaho, kausapin ang doktor o counselor. Normal na hakbang iyan, at nakakatulong ito.',
          'Kung gusto mo ng mauumpisahan ngayon, libre ang [HopeBegins](/). Piliin mo kung ano ang nararamdaman mo at bibigyan ka ng isang maliit na bagay na puwede mong subukan ngayong araw, mga calming tool, taong magdarasal para sa iyo, at e-coach na puwede mong i-message sa Messenger. Kung pakiramdam mo wala kang mapagsabihan, basahin ang [Wala akong kausap](/wala-akong-kausap).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong linggo: isang hakbang palayo sa profile niya',
      steps: [
        'I-mute muna ang account niya. Saka na ang unfollow.',
        'Ilipat ang playlist ninyo sa isang folder na "Para sa ibang araw."',
        'Gumawa ng bagong playlist para sa sarili mo.',
        'I-message ang isang kaibigan: "Puwede ba tayong magkita this week? Kailangan ko ng kausap."',
      ],
    },
    verse: 'psa-147-3',
    related: 'wala-akong-kausap',
    faq: [
      {
        q: 'Paano mag move on sa long-term relationship?',
        a: 'Paunti-unti. Bawasan ang pagtingin sa profile niya (mag-mute muna), sabihin sa isang kaibigan ang totoo, at bigyan ng bagong laman ang mga araw mo. Normal na matagal bago gumaan, lalo na kung ilang taon kayo.',
      },
      {
        q: 'Gaano katagal bago maka-move on?',
        a: 'Walang eksaktong bilang ng araw. Para sa marami, unti-unti itong gumagaan sa loob ng ilang buwan. Kung lagpas dalawang linggo ka nang hindi makatulog o makakain nang maayos, kausapin ang doktor o counselor.',
      },
    ],
    keywords: [
      'paano mag move on',
      'paano mag move on sa ex',
      'move on tips tagalog',
      'breakup after long relationship',
      'hirap mag move on',
    ],
  },
];
