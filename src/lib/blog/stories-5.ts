import type { Story } from './types';

const photos = '/assets/images/photos';

export const stories5: Story[] = [
  {
    slug: 'how-to-start-over-in-life',
    pair: 'paano-magsimula-ulit-sa-buhay',
    lang: 'en',
    theme: 'new-start',
    metaTitle: "How to start over in life after a hard year: Lito's story",
    metaDescription:
      "Floods took Lito's fishpond, then he got sick. How a fisherman in Bulacan started over in life one small step at a time, and a first step for you today.",
    title: 'How Lito started over in life after the flood took everything',
    dek: 'In one year, Lito lost his fishpond and then his health. Starting over came slowly, one early morning at a time.',
    who: 'Lito, 45, fisherman in Malolos, Bulacan',
    photo: {
      src: `${photos}/hope-sunrise.jpg`,
      alt: 'A fisherman poling his boat across the water at sunrise',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The year the water came up',
        paragraphs: [
          "For twenty years, Lito's mornings started the same way. Up at four, a cup of barako, then out to the fishpond in Malolos that he built with his father. Bangus, mostly. Enough to send two kids to school and fix the roof when it leaked.",
          'Then the typhoon came in August. The river rose overnight and kept rising. By morning the dikes of his fishpond were under water and the fish were gone, washed out into the bay with everything else. He stood at the edge in his flip-flops, looking at brown water where his work used to be.',
          '"Babangon tayo," he told his wife, Weng. We will get back up. He meant it. He borrowed money to repair the dikes and restock. Two months later he started coughing and couldn\'t stop. The doctor at the provincial hospital said pneumonia, then said rest. Six weeks of rest, for a man who had never taken six days off.',
          'By December the borrowed money was gone, the pond was half repaired, and Lito spent his afternoons on a plastic chair by the door, watching his neighbors go out on their boats.',
        ],
        pullQuote:
          'He stood at the edge in his flip-flops, looking at brown water where his work used to be.',
      },
      {
        kind: 'struggle',
        heading: 'Why starting over feels impossible after a big loss',
        paragraphs: [
          "Losing the pond was hard. What came after was harder. Lito had always known who he was: the one who worked, the one who provided, the one people called when their own dikes needed fixing. Sitting by the door, he didn't know who that was anymore.",
          'He stopped answering texts from his barkada. He snapped at his son over a broken plate. At night he lay awake doing the math again: the debt, the school fees, the cost of fingerlings, the months until a harvest. Every way he added it, the numbers said he had lost twenty years in one night.',
          'Weng saw it. "Kumain ka naman," she would say, sliding a plate toward him. He would eat a little and go back to the chair. When she asked what he was thinking, he said, "Wala." Nothing. The truth was that he felt like a failure, and he didn\'t know how to say that out loud.',
          "To Lito, starting over meant getting everything back at once: the pond, the money, his strength, his place. Since he couldn't do all of that, he did none of it.",
        ],
        pullQuote: "Since he couldn't do all of that, he did none of it.",
      },
      {
        kind: 'helped',
        heading: 'What helped Lito start over, one small step at a time',
        paragraphs: [
          'The turn came from his old friend Mang Celso, who stopped by one morning with pandesal and sat on the next chair without asking. They talked about the weather and the price of gas. Then Celso asked how he really was, "Ikaw ba, kumusta ka talaga?", and waited.',
          'Lito surprised himself. He told him about the math at night, the shame, the feeling that he had let his family down. Celso nodded. He had felt the same when his boat burned, he said, and it took him a year to get back on his feet. "Ganyan din ako noong nasunog yung bangka ko. Isang taon bago ako nakabalik." It was the first time Lito felt that what he was going through had a shape, and an end.',
          "Celso asked him to help on his boat a few mornings a week, mending nets and steering. It didn't pay much. It got Lito out of the chair at four in the morning and out on the water at sunrise. For the first time in months, he came home with the good kind of tired.",
          'His mother used to say Lamentations 3:22-23 over breakfast when he was a boy. Out on the water at dawn, he finally understood why she liked it so much.',
          'One Sunday night, he and Weng wrote everything on one sheet of paper: what they owed, what came in, what could wait. Written down, it was smaller than the version in his head. They went to the cooperative together, asked for more time on the loan and got it.',
        ],
      },
      {
        kind: 'helped',
        heading: "How to start over in life when you can't do it all at once",
        paragraphs: [
          "Lito didn't make a big plan. He made a small list, the kind a man who works with his hands understands. Fix ten meters of dike this week. Go out with Celso three mornings. Eat breakfast with the kids. Pray before sleeping, even if it's one sentence.",
          'Some weeks he did all of it. Some weeks he did one thing. Weng taught him to count the one thing as a win.',
          'He went back to church, too. The pastor put a hand on Lito\'s shoulder after the service and said they would pray for him. "Ipagdadasal ka namin." The next Saturday, a few men from the church came to help rebuild part of the dike.',
          "When the sleepless nights didn't let up, Weng pushed him to go back to the health center, this time about the worry and the low mood. The doctor listened, asked about his sleep and his drinking, and referred him to a counselor who came to town twice a month. Lito went to keep Weng happy. He kept going because it helped.",
          "By the next dry season, part of the pond was stocked again. It was smaller than before. Lito says it's the best thing he ever built, because he built it twice.",
        ],
        pullQuote: 'Weng taught him to count the one thing as a win.',
      },
      {
        kind: 'hope',
        heading: 'If you need to start over too',
        paragraphs: [
          'Maybe your flood looked different: a business that closed, a relationship that ended, a year that took more than it gave. Starting over can feel like you need to rebuild everything before you are allowed to feel okay.',
          'You can start smaller than that. Pick one thing you can do this week, about the size of ten meters of dike. Tell one person the truth about how you are. Write down what you owe and what you have, so it lives on paper and stops growing in your head.',
          "If the heaviness lasts more than two weeks, or you can't sleep, eat or get through the day, talk to a doctor or counselor. That is a normal next step, and it helped Lito more than he expected.",
          'If you want help starting today, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. If you feel like you have lost your way, [I feel lost](/i-feel-lost) is a good place to begin.',
        ],
      },
    ],
    tryThis: {
      title: 'This week: start with ten meters',
      steps: [
        'Write down one thing you lost this year and one thing you still have.',
        'Pick one task you can finish this week, small enough that you will actually do it.',
        'Tell one person how you really are. A text is enough.',
        'At the end of the week, count what you did, even if it was one thing.',
      ],
    },
    verse: 'lam-3-22-23',
    related: 'i-feel-lost',
    faq: [
      {
        q: 'How do I start over in life after losing everything?',
        a: 'Start smaller than you think. Pick one task for this week, tell someone you trust how you really are, and put your problems on paper so they stop growing in your head. Rebuilding after a big loss takes time, often more than a year.',
      },
      {
        q: 'Is it normal to feel like a failure after a big loss?',
        a: 'Yes, many people feel that way, especially people who are used to providing for others. If the feeling lasts more than two weeks or makes it hard to sleep, eat or work, talk to a doctor or counselor.',
      },
    ],
    keywords: [
      'how to start over in life',
      'starting over after losing everything',
      'how to rebuild your life',
      'feeling like a failure',
      'paano magsimula ulit',
    ],
  },
  {
    slug: 'mens-mental-health-filipino-fathers',
    pair: 'mental-health-ng-mga-tatay',
    lang: 'en',
    theme: 'low',
    metaTitle: "Men's mental health in the Philippines: Ben's story",
    metaDescription:
      'Ben fixed engines for 30 years and never talked about how he felt. What happened when a friend finally asked, and why so many Filipino men keep it inside.',
    title: "Ben fixed everyone's engines. Then a friend asked how he was.",
    dek: 'For thirty years Ben kept quiet and stayed strong, like his father taught him. What changed when he finally said it out loud.',
    who: 'Ben, 52, mechanic and father in Pampanga',
    photo: {
      src: `${photos}/talk-street.jpg`,
      alt: 'Two men talking on a city street',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Strong, quiet and running on empty',
        paragraphs: [
          "Ben has run a small talyer in San Fernando, Pampanga, for almost thirty years. Jeepneys, tricycles, the occasional owner-type jeep that someone's lolo refuses to sell. If it has an engine, Ben can tell you what's wrong with it by the sound.",
          'His father was a mechanic too, and taught him two things: how to listen to an engine, and that men don\'t complain. "Lalaki ka. Tiisin mo." When his father died, Ben didn\'t cry at the wake. He was back at work the next day.',
          "Last year things started to slip. His eldest moved to Canada. His wife, Tess, had a health scare. Business slowed when a bigger shop opened down the road. Ben didn't talk about any of it. He just got quieter, and shorter with everyone.",
          'He was sleeping four hours a night. Two bottles of beer after work became four. One afternoon he yelled at his apprentice over a dropped wrench, then sat in the back of the shop with his head in his hands, not sure why he was so angry.',
        ],
        pullQuote: 'He just got quieter, and shorter with everyone.',
      },
      {
        kind: 'struggle',
        heading: "Why Filipino men don't talk about their feelings",
        paragraphs: [
          'Ben never once thought, "I might be depressed." Men like him don\'t use that word. He thought he was tired, or getting old, or that his family was being too sensitive.',
          "A lot of Filipino men grow up the same way. You are the haligi ng tahanan, the pillar of the house, and pillars don't bend. Asking for help feels like admitting you can't hold up the roof.",
          'So the feelings come out sideways: as anger, as another round of drinks, as longer hours at work, as a silence that fills the whole house. Tess told him later that she had felt like she was living with a stranger.',
          'Men in that place often wait until something breaks. Ben was getting close.',
        ],
      },
      {
        kind: 'helped',
        heading: 'The question at the table',
        paragraphs: [
          "Every Friday night, Ben's friend Rudy came by the shop after closing. They would sit at the folding table out front with a plate of sisig and talk about basketball. This Friday, Rudy didn't bring up basketball.",
          'Rudy asked if he was really okay, because he had not seemed himself lately. "Pare, okay ka lang ba talaga? Iba ka na these days." Ben said he was fine. Rudy didn\'t let it go. "Kasi ako, hindi ako okay last year. Nagpatingin ako. Akala ko mahina ako pag ginawa ko yun, pero nakatulong." He had not been okay last year either, he said. He had seen a doctor, thinking it would make him look weak, and it had helped.',
          'Ben had known Rudy for twenty years and had never heard him say anything like that. Something in his chest loosened. He started talking, slowly at first. About his son leaving. About Tess. About the shop. About lying awake feeling like he was failing at the one job he had.',
          'Rudy just listened. When Ben ran out of words, Rudy said he was glad Ben had told him, and that he would help. "Buti sinabi mo, pare. Tutulungan kita."',
        ],
        pullQuote: 'Something in his chest loosened.',
      },
      {
        kind: 'helped',
        heading: 'What helped Ben feel like himself again',
        paragraphs: [
          "The next week, Rudy drove him to the health center. Ben grumbled the whole way. The doctor asked about his sleep, his drinking and his mood, and didn't make him feel weak for any of it. She said what he described sounded like more than tiredness, referred him to a counselor and asked him to cut back on the beer, since it was making his sleep worse.",
          'Ben went to the counselor three times before he said much. By the fourth visit, he was talking about his father.',
          'At home he did something harder. He sat down with Tess, said he was sorry and told her he had not been okay for months. "Pasensya na. Hindi ako okay nitong mga nakaraang buwan." She cried. He did too, for the first time in years. Then she thanked him for telling her, "Salamat at sinabi mo," and the house felt lighter.',
          'He started praying again, short and honest, in the morning before opening the shop. Psalm 46:1 is taped to the toolbox now, next to the calendar.',
          'On Fridays the sisig still comes out. Every so often, Ben is the one who asks how a friend really is. "Pare, kumusta ka talaga?"',
        ],
      },
      {
        kind: 'hope',
        heading: 'If you are the strong one in your family',
        paragraphs: [
          'If you are a man reading this, maybe you recognize some of Ben: the short temper, the extra drinks, the nights awake, the feeling that nobody can see you struggle. Talking about it is one of the strongest things you can do for your family.',
          'Start with one person. A friend, your wife, a brother, a pastor. You can say what Ben said: "I haven\'t been okay these past few months." That one sentence opens a door.',
          'If you have been low, irritable or unable to sleep for more than two weeks, or you are drinking more to cope, talk to a doctor or counselor. That is a normal next step, the same as bringing a truck in when it starts making a noise.',
          'If you are worried about a man in your life, be his Rudy. Sit down, ask twice and listen.',
          "If you would like to start somewhere private, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. If Ben's story sounds like yours, [I feel depressed](/i-feel-depressed) is a good place to start.",
        ],
      },
    ],
    tryThis: {
      title: 'This week: ask, or answer, honestly',
      steps: [
        'Think of one man in your life who has seemed quieter or angrier lately.',
        'Sit with him over food or coffee and ask, "How are you, really?" Then ask a second time.',
        'If you are the one struggling, say one honest sentence to someone you trust.',
        'Notice your drinking this week. If it has crept up, cut back and tell someone.',
      ],
    },
    verse: 'psa-46-1',
    related: 'i-feel-depressed',
    faq: [
      {
        q: "Why don't Filipino men talk about their feelings?",
        a: 'Many grow up being told to stay strong and keep quiet as the pillar of the family. So stress often shows up as anger, drinking or overwork. Talking to one trusted person is a good first step.',
      },
      {
        q: 'What are signs of depression in men?',
        a: 'Some men show low mood as irritability, anger, drinking more, working all the time, poor sleep or pulling away from family. If these last more than two weeks, talk to a doctor or counselor.',
      },
    ],
    keywords: [
      "men's mental health Philippines",
      "why men don't talk about feelings",
      'signs of depression in men',
      'Filipino fathers mental health',
      'haligi ng tahanan',
    ],
  },
  {
    slug: 'anxiety-after-a-typhoon',
    pair: 'takot-pagkatapos-ng-bagyo',
    lang: 'en',
    theme: 'anxiety',
    metaTitle: "Anxiety after a typhoon: Nena's story of fear and rain",
    metaDescription:
      "Months after the flood, every heavy rain made Nena's heart race. How she eased her anxiety after a typhoon, helped her kids feel safe and slept again.",
    title: "When the rain still scares you: Nena's anxiety after the typhoon",
    dek: 'The flood went down in two days. Her fear stayed for months. What helped Nena, and her kids, feel safe in the rain again.',
    who: 'Nena, 47, sari-sari store owner in Marikina',
    photo: {
      src: '/assets/images/stories/flood-malabon.jpg',
      alt: 'A vendor in a flooded street in Malabon, Metro Manila',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The night the river came in',
        paragraphs: [
          'Nena has run a sari-sari store, a small neighborhood shop, from the front of her house in Marikina for fifteen years. She knows the river. Everyone on her street does. When the siren sounds and the water level climbs, you move things upstairs.',
          "That night it climbed faster than anyone expected. By two in the morning the water was at her knees inside the house. By four it was at the second step of the stairs. She sat on the top step with her two kids, Jopet and Aira, and a flashlight, listening to the store's shelves knock against each other below.",
          'They were safe. The water went down in two days. With help from neighbors and their church, they shoveled the mud out, threw away what was ruined and reopened the store a month later.',
          "Everyone said she was lucky, and she believed it. So she didn't understand why, months later, the sound of rain on the roof could make her hands shake.",
        ],
        pullQuote: 'Everyone said she was lucky, and she believed it.',
      },
      {
        kind: 'struggle',
        heading: 'Why anxiety can stay long after a typhoon',
        paragraphs: [
          "Whenever dark clouds rolled in, Nena's chest tightened. During heavy rain she couldn't sit still. She checked the river level on her phone every ten minutes, all night. She kept bags packed by the door, even in the dry season.",
          'Her body was still on alert from that night. That can happen after something frightening, especially something that could happen again. The fear reacts to the sound of rain the way it reacted to the water on the stairs.',
          "The kids felt it too. Aira, who was nine, started sleeping in Nena's bed whenever it rained. Jopet, thirteen, got angry and wouldn't talk about it. Nena felt guilty. She was supposed to be the calm one.",
          'She also felt she had no right to be shaken. Some families on her street had lost much more. At least they were alive, she kept saying. "Buti nga kami, buhay." She pushed the fear down. It came back with every storm warning.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Nena with her fear of rain after the flood',
        paragraphs: [
          'The first thing that helped was a plan. Her close friend, Ate Lorna, sat down with her and wrote out exactly what they would do if the water rose again: when to move things up, where to go, who to call, what goes in the go-bag. They stuck the list on the refrigerator. When it rained, Nena could look at it and know she was ready.',
          'The second was a limit on checking. During a storm she checked the river level once an hour and left the phone in the kitchen in between. The first night was hard. By the third storm it was easier.',
          'The third was breathing with the kids. When the rain got loud, the three of them sat together and breathed in for 4 and out for 6, counting out loud. Aira liked to count. Jopet rolled his eyes, then did it anyway.',
          'She let the kids talk about that night. At dinner she asked what they remembered most. "Ano yung pinaka-naaalala ninyo?" Aira remembered the flashlight. Jopet remembered being afraid his mother would get hurt. Nena told them she had been scared too, and that they had gotten through it together. Saying it out loud made it smaller for all three of them.',
          'Their pastor came by and prayed with them before the next typhoon season. Isaiah 41:10 went up on the wall by the stairs, at the exact step where the water stopped.',
          'When the fear was still strong after a few months, Nena talked to the doctor at the health center. The doctor said what she felt was common after a disaster and connected her with a counselor, who helped her and Jopet both.',
        ],
        pullQuote: 'Saying it out loud made it smaller for all three of them.',
      },
      {
        kind: 'hope',
        heading: 'If the rain still scares you',
        paragraphs: [
          "If you have been through a flood, a typhoon or an earthquake, it makes sense that your body reacts when the sky turns dark. Your fear is trying to keep you safe. It hasn't caught up yet with the fact that today is a different day.",
          'Start with what you can control. Write a family plan and put it where everyone can see it. Pack the go-bag once and let it be. Set times to check the news during a storm. Breathe in for 4 and out for 6, together with your kids if they are scared too.',
          "If the fear stays strong for weeks after a disaster, if you can't sleep, keep reliving that night or avoid going out when it rains, talk to a doctor or counselor. That is a normal next step, and it helps children as well as adults.",
          'If you want help today, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. [How to calm anxiety](/how-to-calm-anxiety) has a breathing exercise you can do as a family when the rain gets loud.',
        ],
      },
    ],
    tryThis: {
      title: 'Before the next storm: a 15-minute family plan',
      steps: [
        'Sit down with your family and write down when to move things up, where to go and who to call.',
        'Pack one go-bag and keep it in one place. Check it once a month.',
        'Put the plan on the refrigerator where everyone can see it.',
        'Agree on check times during a storm, like once an hour, and keep the phone away in between.',
        'Practice breathing together: in for 4, out for 6.',
      ],
    },
    verse: 'isa-41-10',
    related: 'how-to-calm-anxiety',
    faq: [
      {
        q: 'Is it normal to have anxiety after a typhoon or flood?',
        a: 'Yes. After something frightening, many people feel fear when it rains, have trouble sleeping or keep checking the news. If it stays strong for weeks or gets in the way of daily life, talk to a doctor or counselor.',
      },
      {
        q: 'How can I help my kids who are scared of rain after a flood?',
        a: 'Stay calm with them, let them talk about what they remember, make a family plan together and practice slow breathing as a family. If their fear lasts for weeks, talk to their doctor or a counselor.',
      },
    ],
    keywords: [
      'anxiety after a typhoon',
      'fear of rain after a flood',
      'trauma after a flood',
      'helping kids after a typhoon',
      'takot sa ulan',
    ],
  },
  {
    slug: 'when-you-feel-like-giving-up',
    pair: 'gusto-ko-nang-sumuko',
    lang: 'en',
    theme: 'low',
    metaTitle: "When you feel like giving up: Nico's story of hope",
    metaDescription:
      "Nico reached a point where he didn't want to wake up. The night he told his brother, the call that helped, and what slowly brought his hope back.",
    title: 'When you feel like giving up: the night Nico told his brother',
    dek: 'For months Nico smiled at work and fell apart at home. Telling one person the truth was the turning point.',
    who: 'Nico, 30, team lead in Manila',
    photo: {
      src: '/assets/images/hero/manila-dawn.jpg',
      alt: 'Manila at dawn',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Fine at work, empty at home',
        paragraphs: [
          'Nico was a team lead at a call center in Manila. His team liked him. He remembered birthdays, covered shifts and always had a joke ready on a rough night. Nobody would have guessed how he felt when he got home.',
          "It crept up over a year. A breakup. His father's illness back in the province. A promotion that came with longer hours and less sleep. He stopped going to his brother's for Sunday lunch. He stopped answering the group chat. He would get home at seven in the morning, close the curtains and lie in bed with his phone, too tired to sleep and too tired to get up.",
          "Somewhere in those months, a thought started showing up: he didn't want to wake up anymore. He wanted everything to stop.",
          "It scared him. He told no one, because he didn't know how to say it, and because he was the one other people leaned on.",
        ],
      },
      {
        kind: 'struggle',
        heading: "Why it's so hard to tell anyone",
        paragraphs: [
          'Nico was sure that saying it out loud would make things worse, or make him a burden, or frighten his family. He also told himself that other people had real problems. He had a job and a roof. What right did he have to feel this way?',
          'That kind of thinking is common in a dark season. Pain can make the future look like a closed door and make you believe nobody would understand. Those thoughts can feel like facts. They are a sign that you are hurting and need help, and they can change.',
          'So Nico kept going to work, kept smiling and kept saying "Okay lang" when anyone asked. Every day the smile took a little more out of him.',
        ],
      },
      {
        kind: 'helped',
        heading: 'The night he told his brother',
        paragraphs: [
          'One Saturday night his older brother, Paul, texted to ask him to lunch, because their mother missed him: "Lunch bukas? Miss ka na ni Mama." Nico started typing an excuse. Then, for reasons he still can\'t fully explain, he typed the truth. "Kuya, hindi ako okay. Minsan ayoko nang gumising." He was not okay. Sometimes he did not want to wake up anymore.',
          'Paul called within a minute. He didn\'t lecture. He asked, calmly, whether Nico was thinking of ending his life. "Iniisip mo bang tapusin ang buhay mo?" Nico said that sometimes he did. Paul thanked him for saying it and told him he was coming over. "Salamat at sinabi mo. Pupunta ako diyan."',
          "Paul stayed on the phone the whole drive over. When he arrived, they sat together on Nico's bed and called the NCMH Crisis Hotline on 1553. A calm voice listened, asked questions and helped them think through what to do next, starting with that night and the next morning.",
          'Paul slept over. In the morning he made coffee, and they talked about finding a doctor.',
        ],
        pullQuote:
          "Then, for reasons he still can't fully explain, he typed the truth.",
      },
      {
        kind: 'helped',
        heading: 'What helped Nico find hope again',
        paragraphs: [
          "Getting better took time, and it had ups and downs. It started with a doctor, who listened to everything and started him on treatment. Then a counselor, once a week, who helped him untangle the year he'd had and find words for what he felt.",
          'His family made a few plain promises. Paul would text every morning, even just a thumbs up. His mother would call on Wednesdays. Nico agreed to tell one of them whenever the dark thoughts came back. They did come back a few times. Each time he said something, it got easier.',
          "He went back to Sunday lunch, and a few weeks later to church with his family. He didn't feel much at first. He went anyway. One Sunday the pastor read Psalm 23:4, and Nico heard it differently. He had been in that valley. He was still walking, and someone was with him.",
          'At work he talked to HR about his hours and moved to a day shift. He started sleeping at night again, most nights.',
          'A year later, Nico says the worst part is behind him. He still has hard days. Now he knows what to do with them: tell someone, rest, keep the next appointment.',
        ],
        pullQuote:
          'He had been in that valley. He was still walking, and someone was with him.',
      },
      {
        kind: 'hope',
        heading: 'If you feel like giving up right now',
        paragraphs: [
          'If you are reading this because you feel the way Nico did, thank you for still being here. The pain you feel is real, and so is the help.',
          'Tell one person tonight. A sibling, a friend, a parent, a pastor. You can say what Nico said: "I\'m not okay." If saying it feels impossible, type it.',
          'If you are thinking of ending your life, call the crisis line in your country now: in the Philippines, the NCMH Crisis Hotline, 24/7, on 1553 or 0917 899 8727. If you are in immediate danger, call your emergency number (911 in the Philippines).',
          'If you have felt low or empty for more than two weeks, talk to a doctor or counselor. That is a normal next step, and treatment helps.',
          'If you would like more support today, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. [I feel depressed](/i-feel-depressed) has more on what to do next.',
        ],
      },
    ],
    tryThis: {
      title: 'Tonight: tell one person',
      steps: [
        'Pick one person you trust: a sibling, a friend, a parent or a pastor.',
        'Send one honest line: "I\'m not okay. Can we talk?"',
        "If you can't reach anyone, call the crisis line in your country. In the Philippines, the NCMH Crisis Hotline on 1553 is open 24/7.",
        'Tomorrow, ask that person to help you book a doctor or counselor.',
      ],
    },
    verse: 'psa-23-4',
    related: 'i-feel-depressed',
    faq: [
      {
        q: 'What should I do when I feel like giving up?',
        a: 'Tell one person you trust how you really feel, today. If you are thinking of ending your life, call the crisis line in your country now (in the Philippines, the NCMH Crisis Hotline on 1553, open 24/7), or your emergency number if you are in immediate danger. Then see a doctor or counselor.',
      },
      {
        q: "How do I tell my family I'm not okay?",
        a: 'Keep it short and true, like "I\'m not okay. Can we talk?" A text is fine if saying it out loud is hard. Most families would much rather know.',
      },
    ],
    keywords: [
      'when you feel like giving up',
      "I don't want to wake up",
      'how to tell your family you are not okay',
      'NCMH crisis hotline 1553',
      'feeling hopeless',
    ],
  },
  {
    slug: 'how-to-pray-when-you-cant-find-the-words',
    pair: 'paano-magdasal-kapag-walang-masabi',
    lang: 'en',
    theme: 'faith',
    metaTitle: "How to pray when anxious: Hannah's honest prayers",
    metaDescription:
      "Hannah was too anxious and tired to pray. How short, honest prayers on her jeepney commute helped, and how to pray when you can't find the words.",
    title: "How to pray when you can't find the words",
    dek: 'Hannah was too anxious and too tired for long prayers. She learned to pray in single sentences, on a jeepney, on the way to work.',
    who: 'Hannah, 33, bank teller and mother of two in Cavite',
    photo: {
      src: '/assets/images/stories/praying-city.jpg',
      alt: 'A woman praying with her eyes closed on a city street',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Too tired to pray',
        paragraphs: [
          'Hannah works as a bank teller in Imus, Cavite. Her mornings are a race: two kids to wake, lunches to pack, a uniform to iron, then the jeepney to work by eight. She grew up in church and used to pray every night, kneeling by the bed the way her mother taught her.',
          "Last year her husband's contract abroad ended early and money got tight. Her youngest was sick on and off for months. Hannah started waking at three in the morning with her heart pounding, running numbers in her head.",
          'She tried to pray the way she always had. She would close her eyes, and the worries crowded in before she finished the first sentence. She would start over, lose her place and fall asleep feeling guilty. After a few weeks she stopped trying.',
          '"Parang ang layo ko na kay Lord," she told her friend Joan at work. "Hindi na ako makapag-pray nang maayos." She felt far from God, and she could not pray properly anymore.',
        ],
        pullQuote:
          'She would close her eyes, and the worries crowded in before she finished the first sentence.',
      },
      {
        kind: 'struggle',
        heading: "Why prayer feels hard when you're anxious",
        paragraphs: [
          "Anxiety fills every quiet moment with noise. Sitting still to pray can feel like opening the door to every worry at once. So people who love to pray often find, in anxious seasons, that they can't.",
          "Hannah also believed prayer had to be done a certain way: long, in order, with the right words. When she couldn't pray that way, she felt like she wasn't praying at all.",
          "Then came the guilt. A good Christian should be able to pray, she thought. If she couldn't, maybe something was wrong with her faith. The guilt became one more thing keeping her up at three in the morning.",
          "She didn't tell anyone at church. Everyone there seemed so sure of God. She smiled through the Sunday service, sang every song and went home feeling further away than before.",
        ],
      },
      {
        kind: 'helped',
        heading: 'How Hannah learned to pray when anxious',
        paragraphs: [
          "Joan didn't argue with her. She said, \"Ako, minsan isang sentence lang. 'Lord, tulong.' Pwede na yun.\" Some days, she said, her whole prayer was one sentence, 'Lord, help,' and that was enough.",
          'The next morning, on the jeepney, Hannah tried it. Squeezed between a student and a man with a sack of rice, she looked out the window and said in her head, "Lord, I\'m scared about money. Help me today." That was the whole prayer. It took five seconds.',
          'She did it again on the ride home to thank God for an okay day: "Lord, salamat kasi okay ang araw." And again at three in the morning, asking Him to hold her: "Lord, hawakan mo ako."',
          'Over the next weeks, the jeepney became her prayer room. She started praying for what she saw: the kids in school uniforms, the driver, the woman crying quietly in the back seat. Her prayers were short and honest, and for the first time in months they felt like hers.',
        ],
        pullQuote: 'Over the next weeks, the jeepney became her prayer room.',
      },
      {
        kind: 'helped',
        heading: 'What else helped Hannah with her anxiety',
        paragraphs: [
          'Joan asked if she could pray for Hannah too. Every Monday she sent a text: "Prayed for you today. Kumusta si bunso?" Knowing someone else was carrying her in prayer made Hannah feel lighter on the days she couldn\'t pray much herself.',
          'Hannah wrote Philippians 4:6-7 on a card and kept it in her wallet, behind her ID. She read it while waiting for the jeepney. Some days it was the only prayer she could manage, and that was enough.',
          "She also dealt with the worries themselves. She and her husband sat down and made a simple budget. She told her supervisor her youngest was sick and arranged a schedule that let her take him to checkups. When the three a.m. heart pounding didn't stop after a month, she saw a doctor, who checked her health, talked with her about anxiety and suggested a counselor.",
          'Her problems were still there. Now she had a place to put them, every morning, on the way to work.',
        ],
      },
      {
        kind: 'hope',
        heading: "If you can't find the words to pray",
        paragraphs: [
          "If you used to pray easily and now you can't, nothing is wrong with your faith. Anxiety makes stillness hard. God hears short prayers, tired prayers and prayers that are only a sigh.",
          'Try one sentence today. Say it on the bus, in the bathroom, while the rice cooks. "Lord, help." "Lord, thank you." "Lord, I\'m scared." Each of those is a real prayer.',
          'Let someone pray for you too. On [Prayers](/prayers) you can send a prayer request, and someone will pray for you.',
          'If anxiety keeps waking you at night for more than two weeks, or gets in the way of your day, talk to a doctor or counselor. Faith and good care go together.',
          'If you would like more support, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. For verses to carry with you, see [Bible verses for anxiety](/bible-verses-for-anxiety).',
        ],
      },
    ],
    tryThis: {
      title: 'Today: three one-sentence prayers',
      steps: [
        'On your way to work or school, pray one sentence about what worries you most.',
        'At lunch, pray one sentence of thanks for something small.',
        'Before you sleep, pray one sentence asking for rest.',
        'Ask one friend to pray for you this week, and tell them what for.',
      ],
    },
    verse: 'php-4-6-7',
    related: 'bible-verses-for-anxiety',
    faq: [
      {
        q: "How do I pray when I'm anxious?",
        a: 'Keep it short and honest. One sentence like "Lord, I\'m scared, help me today" is a real prayer. Pray in small moments through the day, and ask a friend to pray for you too.',
      },
      {
        q: "Is it a sign of weak faith if I can't pray?",
        a: 'No. Anxiety makes it hard to be still, and many people of strong faith go through seasons when prayer feels hard. Short prayers count, and so does letting others pray for you.',
      },
    ],
    keywords: [
      'how to pray when anxious',
      "prayer when you can't find the words",
      'short prayer for anxiety',
      'Christian anxiety',
      'paano magdasal kapag anxious',
    ],
  },
  {
    slug: 'paano-bumangon-ulit',
    pair: 'how-to-get-back-up-again',
    lang: 'tl',
    theme: 'new-start',
    metaTitle: 'Paano bumangon ulit: ang kuwento ni Lia sa Baguio',
    metaDescription:
      'Ilang buwan na stuck si Lia, walang gana at walang direksyon. Paano siya bumangon ulit, isang maliit na bagay bawat umaga, at paano ka rin magsisimula.',
    title: 'Paano bumangon ulit: isang maliit na bagay bawat umaga',
    dek: 'Ilang buwan na parang naka-pause ang buhay ni Lia. Ang simula niya pabalik: isang tasa ng kape, tuwing umaga.',
    who: 'Lia, 27, barista sa Baguio',
    photo: {
      src: `${photos}/morning-baguio.jpg`,
      alt: 'A cup of coffee held up over the mountains',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Ang mga buwan na parang naka-pause',
        paragraphs: [
          'Barista si Lia sa isang maliit na coffee shop sa Session Road, Baguio. Dati, siya yung pinakamaagang dumarating. Bubuksan niya ang shop, ise-set up ang espresso machine, at babatiin ang mga suki sa pangalan nila.',
          'Tapos dumating yung taon na sunod-sunod ang problema. Lumipat sa Manila ang best friend niya. Nagsara ang shop nang tatlong buwan para sa renovation. Naubos ang ipon niya. Nung nagbukas ulit ang shop, bumalik siya sa trabaho, pero parang iba na siya.',
          'Gising siya ng alas-nuwebe, late na. Kape na lang ang almusal. Pagkatapos ng shift, diretso sa kama, scroll hanggang madaling-araw. Pag weekend, hindi na siya lumalabas. "Pagod lang ako," sabi niya sa mama niya sa video call. Alam niyang higit pa doon.',
          'May mga araw na malungkot siya. Pero mas madalas, wala lang. Walang gana, walang direksyon, parang naka-pause ang buhay habang tuloy-tuloy ang mundo sa labas.',
        ],
        pullQuote:
          'Walang gana, walang direksyon, parang naka-pause ang buhay habang tuloy-tuloy ang mundo sa labas.',
      },
      {
        kind: 'struggle',
        heading: 'Bakit ang hirap bumangon ulit',
        paragraphs: [
          'Ang pinakamahirap kay Lia: alam niya lahat ng dapat gawin. Mag-exercise. Matulog nang maaga. Mag-ipon ulit. Tawagan ang mga kaibigan. Magsimba. Mag-apply sa mas magandang trabaho. Pero kapag tinitingnan niya ang buong listahan, nao-overwhelm siya, at wala siyang nagagawa kahit isa.',
          'Tapos sinisisi niya ang sarili. "Ang tamad ko." "Ang dami kong sinayang na oras." Bawat araw na walang nangyari, mas bumibigat yung susunod.',
          'Nahihiya rin siyang magkuwento. Sa social media, mukhang okay ang lahat ng kakilala niya: may bagong trabaho, may bagong bahay, may travel. Siya, hindi pa rin makabangon sa kama.',
          'Karaniwan ito kapag matagal ka nang stuck. Kapag pagod ang isip, parang bundok ang kahit maliit na hakbang. At kapag hinihintay mong bumalik ang gana bago ka kumilos, matagal ang hintay. Madalas, kumikilos muna tayo, saka sumusunod ang gana.',
        ],
        pullQuote: 'Madalas, kumikilos muna tayo, saka sumusunod ang gana.',
      },
      {
        kind: 'helped',
        heading: 'Paano bumangon ulit si Lia: isang maliit na bagay',
        paragraphs: [
          'Si Tita Baby, ang may-ari ng shop, ang unang nakapansin. Isang hapon, habang naglilinis sila, tinanong niya si Lia, "Anak, okay ka lang ba talaga? Parang ang layo mo lately." Umiyak si Lia sa may lababo. First time niyang inamin na hindi siya okay.',
          'Tumango lang si Tita Baby, saka nagtanong: "Isang maliit na bagay bukas. Isa lang. Ano yun?"',
          'Pinag-isipan ni Lia. Gustong-gusto niya dati ang umaga sa Baguio, yung lamig at hamog. Kaya ito ang pinili niya: gigising nang alas-siyete, magtitimpla ng kape, at iinumin ito sa labas ng boarding house habang nakatingin sa bundok. Walang phone. Sampung minuto lang.',
          'Kinabukasan, ginawa niya. Malamig, inaantok pa siya, pero nandun siya sa labas, hawak ang dilaw na mug, pinapanood ang hamog na unti-unting nawawala sa mga pine tree. Maliit na bagay lang, pero may nagawa na siya, at alas-siyete pa lang.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ang mga sumunod na maliit na hakbang',
        paragraphs: [
          'Pagkatapos ng isang linggo ng kape sa umaga, nagdagdag siya ng isa pa: maglakad papunta sa trabaho imbes na mag-jeep, labinlimang minuto dumadaan sa Burnham Park. Pagkalipas ng dalawang linggo, isa pa: tawagan ang best friend niya tuwing Linggo ng gabi.',
          'May mga araw na wala siyang nagawa kahit isa. Natuto siyang huwag bilangin yun bilang failure. Bukas, kape ulit.',
          'Bumalik din siya sa church, sa isang small group ng mga young professional. Sa simula, nakikinig lang siya. Isang gabi, may nag-share tungkol sa Isaias 40:31, at naisip ni Lia na okay lang maglakad muna bago tumakbo.',
          'Nung napansin niyang ilang linggo pa ring mabigat ang loob niya kahit may maliliit na progress, nagpa-check up siya sa health center. Ni-refer siya ng doktor sa isang counselor. Doon niya natutunang tigilan ang paninisi sa sarili.',
          'Ngayon, makalipas ang anim na buwan, si Lia ulit ang unang dumarating sa shop. Hindi pa perfect ang lahat. Pero tuwing umaga, may dilaw na mug, may bundok, at may isang maliit na bagay na nagawa na niya bago pa magsimula ang araw.',
        ],
        pullQuote:
          'Natuto siyang huwag bilangin yun bilang failure. Bukas, kape ulit.',
      },
      {
        kind: 'hope',
        heading: 'Kung gusto mo ring bumangon ulit',
        paragraphs: [
          'Kung stuck ka ngayon, walang gana, at hindi mo alam kung saan magsisimula, isang bagay lang muna ang pakay mo ngayong linggo.',
          'Pumili ng isang maliit na bagay para bukas ng umaga. Kape sa labas. Limang minutong lakad. Isang text sa kaibigan. Gawin mo yun, at bilangin mo bilang panalo. Kumikilos muna tayo, saka sumusunod ang gana.',
          'May mga araw na wala kang magagawa kahit isa. Bukas, subukan ulit. Hindi nabubura ng isang mabigat na araw ang progress mo.',
          'Kung higit dalawang linggo ka nang walang gana o mabigat ang loob, o nahihirapan ka nang kumilos sa araw-araw, kausapin ang doktor o counselor. Normal na hakbang yan, at nakakatulong ito.',
          'Kung gusto mo ng tulong ngayon din, libre ang [HopeBegins](/). Piliin mo kung ano ang nararamdaman mo at bibigyan ka ng isang maliit na bagay na puwede mong subukan ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. Kung hindi mo alam kung saan ka papunta, basahin ang [Hindi ko alam gagawin ko](/hindi-ko-alam-gagawin-ko-sa-buhay).',
        ],
      },
    ],
    tryThis: {
      title: 'Bukas ng umaga: isang maliit na bagay',
      steps: [
        'Ngayong gabi, pumili ng isang maliit na bagay na gagawin mo bukas ng umaga.',
        'Gawin itong maliit talaga: sampung minuto o mas maikli pa.',
        'Bukas, gawin mo, kahit inaantok ka pa o wala kang gana.',
        'Isulat sa phone o notebook: "Nagawa ko." Bukas, ulit.',
      ],
    },
    verse: 'isa-40-31',
    related: 'hindi-ko-alam-gagawin-ko-sa-buhay',
    faq: [
      {
        q: 'Paano bumangon ulit kapag walang gana sa lahat?',
        a: 'Magsimula sa isang maliit na bagay bawat araw, tulad ng kape sa labas o maikling lakad, at gawin ito kahit wala pang gana. Kadalasan, kumikilos muna tayo bago bumalik ang gana. Kung higit dalawang linggo na, kausapin ang doktor o counselor.',
      },
      {
        q: 'Normal ba ang ma-stuck sa buhay?',
        a: 'Oo, maraming dumadaan dito, lalo na pagkatapos ng sunod-sunod na mabibigat na pangyayari. Hindi ito katamaran. Maliliit na hakbang at isang taong makakausap ang madalas na nakakatulong.',
      },
    ],
    keywords: [
      'paano bumangon ulit',
      'paano maging okay ulit',
      'walang gana sa buhay',
      'stuck sa buhay',
      'paano magsimula ulit',
    ],
  },
];
