import type { Story } from './types';

const photos = '/assets/images/photos';

export const stories1: Story[] = [
  {
    slug: 'stop-overthinking-at-night',
    pair: 'paano-tumigil-sa-overthinking-sa-gabi',
    lang: 'en',
    theme: 'anxiety',
    metaTitle: "How to stop overthinking at night: Mika's story",
    metaDescription:
      'Mika replayed every conversation at 1 a.m. for almost a year. What helped her stop overthinking at night, and one small thing you can try tonight.',
    title: 'How Mika stopped overthinking at night',
    dek: 'For almost a year, her mind replayed every conversation the moment the lights went off. What changed came one small habit at a time.',
    who: 'Mika, 27, IT support in Cebu',
    photo: {
      src: `${photos}/sleep-dim.jpg`,
      alt: 'A woman awake in bed with her phone by lamplight',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The replay that started at 11:48',
        paragraphs: [
          "Mika's shift at an IT help desk in Cebu ended at nine. By half past eleven she was in bed, lights off, phone face down on the side table. By 11:48 she was wide awake, replaying a call from that afternoon.",
          'A client had been short with her. She had fixed the problem, closed the ticket and moved on, or so she thought. In the dark the call came back word for word, and then it grew. Did I sound rude? Will they complain? Will my team lead bring it up on Monday? What if this is the thing that gets me let go?',
          'By one in the morning she had rehearsed three conversations that would never happen and written a resignation email in her head. By two she was scrolling job posts. At 6:30 her alarm went off and she started the day already tired.',
          '"Hindi ako makatulog sa kakaisip," she told her older sister once, half joking: she couldn\'t sleep for all the thinking. Her sister laughed and said everyone overthinks. Mika laughed too, and she didn\'t bring it up again for months.',
        ],
        pullQuote:
          'In the dark the call came back word for word, and then it grew.',
      },
      {
        kind: 'struggle',
        heading: 'Why overthinking gets louder at night',
        paragraphs: [
          'Daytime keeps the mind busy. There are tickets, chats, people and noise. At night all of that stops, and the worries that waited all day finally get the floor.',
          'Mika\'s worries had a pattern. They started with something small that really happened, then ran ahead to the worst version of the future. Each "what if" felt like a problem she had to solve right then, at one in the morning, with no way of solving it.',
          'Tiredness made it worse. After a short night, small things felt bigger and harder to let go of, so the less she slept, the louder the thoughts got the next night. Lying there trying harder to sleep only tightened the loop.',
          'She also felt embarrassed. Nothing big was wrong in her life. She had a job, a family who loved her and a church she went to most Sundays. She kept telling herself she had no reason to feel this way, which gave her one more thing to think about at night.',
        ],
      },
      {
        kind: 'helped',
        heading: 'What helped Mika stop overthinking at night',
        paragraphs: [
          'Nothing fixed it in one night. A few small changes, done most nights, slowly turned the volume down.',
          'The first was a worry list. At eight, before dinner, Mika spent ten minutes writing down everything on her mind. Next to each worry she wrote the next small step, if there was one. "Ask team lead about the client call" went on the list. "What if I get fired" got a different note: not today\'s problem. When the call came back at midnight, she could tell herself, "It\'s on the list. I\'ll look at it tomorrow."',
          'The second was getting up. When she had been awake for what felt like twenty minutes, she stopped fighting it. She went to the kitchen, drank a glass of water and read something dull under a dim light until she felt sleepy again. Wrestling with her thoughts in bed had started to make the bed itself feel like the place where she worried.',
          'The third was her breathing. When her chest felt tight, she breathed in for 4 counts and out for 6, for about two minutes. The worries were still there afterwards. They were smaller, small enough to put down.',
          'The fourth was the hardest. This time she skipped the joke. Over coffee with a friend from her small group, she said it plainly: "I haven\'t slept well in months. My mind won\'t stop." Her friend didn\'t have answers. She said, "Same, actually," and then, "Let\'s pray about it, and let\'s check on each other this week." Mika slept a little better that night, maybe because she wasn\'t carrying it alone anymore.',
          'She started praying differently too. She named each worry to God, one at a time, and pictured setting it down on a table. Psalm 94:19 became her bedtime verse.',
          'When the nights were still rough after a couple of months, she booked a session with a counselor through her company. Talking it through helped her see where the "what ifs" came from, and why they always showed up at night.',
        ],
        pullQuote: "It's on the list. I'll look at it tomorrow.",
      },
      {
        kind: 'hope',
        heading: "If your mind won't switch off tonight",
        paragraphs: [
          'You might be reading this at one in the morning. If you are, nothing is wrong with you for being awake. Your mind is trying to protect you by solving everything at once. It just picked the worst hour to do it.',
          "Tonight, try one thing from Mika's list instead of all of them. Write the worries down. Get up if sleep won't come. Breathe in for 4 and out for 6. Then tomorrow, tell one person how your nights have been.",
          'If overthinking keeps you up most nights for weeks, or it starts to weigh on your days too, talk to a doctor or counselor. That is a normal next step, and help works.',
          "And if you want somewhere to start right now, [HopeBegins](/) is free. Tell it how you feel and you get one small thing to try today, calming tools for nights like this, someone to pray for you, and an e-coach you can message. The page [Can't sleep from overthinking](/cant-sleep-overthinking) has a two-minute breathing exercise you can do in bed.",
        ],
      },
    ],
    tryThis: {
      title: 'Tonight: a 10-minute worry list',
      steps: [
        "Before dinner, write down everything on your mind. Don't sort it yet.",
        'Next to each worry, write one small next step, or "not today\'s problem".',
        "Close the notebook. If a worry comes back in bed, tell yourself it's on the list.",
        'Still awake after a while? Get up, drink some water and sit somewhere dim until you feel sleepy.',
      ],
    },
    verse: 'psa-94-19',
    related: 'cant-sleep-overthinking',
    faq: [
      {
        q: 'Why do I overthink so much at night?',
        a: 'During the day, work and people keep your mind busy. At night that stops, and the worries you pushed aside come back. Being tired also makes worries feel bigger, so it can turn into a loop: less sleep, louder thoughts, less sleep.',
      },
      {
        q: 'How do I stop overthinking at night?',
        a: 'Write your worries down early in the evening with one next step for each, get up if you cannot sleep, and slow your breathing: in for 4, out for 6. If it keeps happening for weeks, talk to a doctor or counselor.',
      },
    ],
    keywords: [
      'how to stop overthinking at night',
      'overthinking at night',
      "can't sleep overthinking",
      'hindi makatulog sa kakaisip',
      'anxiety at night',
    ],
  },
];
