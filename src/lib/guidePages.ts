/**
 * Guides: pages that answer what people search beyond "how do I feel",
 * like what to say to a friend, what the words mean in Tagalog, or where
 * to find free help. Same voice and safety rules as the feeling pages:
 * plain words, WHO safe-messaging guidance, sources named, and clinical
 * wording reviewed by the founder before it goes live.
 */

import type { FeelingLang } from './feelingPages';
import type { PhotoId } from './photos';

export interface GuideSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** Things to say, shown as quotes. */
  sayings?: string[];
  /** Words and what they mean, each with the page that helps. */
  terms?: {
    term: string;
    words: string;
    meaning: string;
    link?: { href: string; label: string };
  }[];
  /** Bible verses with their references. */
  verses?: { text: string; reference: string }[];
  /** Helplines and services, with numbers to tap. */
  services?: {
    name: string;
    detail: string;
    numbers?: { label: string; tel: string }[];
    href?: string;
  }[];
  /** The sage safety box, for crisis wording. */
  safety?: boolean;
}

export interface Guide {
  slug: string;
  lang: FeelingLang;
  /** The same page in the other language. */
  pair?: string;
  metaTitle: string;
  metaDescription: string;
  /** What people search for that the page answers, in its own language. */
  keywords: string[];
  /** Short label for links. */
  label: string;
  heading: string;
  intro: string;
  photo: PhotoId;
  sections: GuideSection[];
  faq?: { q: string; a: string }[];
  related?: string[];
  sources?: { label: string; href: string }[];
  /** A line the source asks to be shown, such as a Bible translation's. */
  attribution?: string;
  /** For pages with phone numbers: when they were last checked. */
  checkedOn?: string;
}

const WHO_DEPRESSION = {
  label: 'WHO: Depressive disorder (depression)',
  href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
};
const WHO_SUICIDE = {
  label: 'WHO: Suicide',
  href: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
};
const WHO_ANXIETY = {
  label: 'WHO: Anxiety disorders',
  href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
};
const WHO_BURNOUT = {
  label: 'WHO: Burn-out an "occupational phenomenon"',
  href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
};

export const guides: Guide[] = [
  {
    slug: 'what-to-say-to-a-depressed-friend',
    lang: 'en',
    pair: 'ano-ang-sasabihin-sa-kaibigang-depressed',
    metaTitle: 'What to say to a friend who is depressed, and what to avoid',
    metaDescription:
      'Worried about a friend? What to say, what not to say, and what to do if they talk about not wanting to live. Plain, practical words.',
    keywords: [
      'what to say to a depressed friend',
      'how to help a friend with depression',
      'what not to say to someone who is depressed',
      'supporting a friend with depression',
    ],
    label: 'What to say to a depressed friend',
    heading: 'What do I say to a friend who is depressed?',
    intro:
      'The perfect words matter less than showing up. Listen, stay, and check in again. Here is what helps, and what to avoid.',
    photo: 'care',
    sections: [
      {
        title: 'What you can say',
        sayings: [
          "I've noticed you seem down lately. How are you, really?",
          "I'm here. Do you want to talk, or just have company?",
          "Take your time. I'm listening.",
          'Can I help with something today, like food or a ride?',
          'Would it help to talk to a counselor? I can help you find one.',
        ],
        paragraphs: [
          'Then listen more than you talk. You can say "That sounds really hard" without trying to fix it.',
        ],
      },
      {
        title: 'What to avoid',
        list: [
          '"You just need to pray more." Prayer can help, but these words make people feel blamed for being unwell.',
          '"Think positive" or "Snap out of it." Depression isn\'t a choice.',
          '"Others have it worse." It tells them they have no right to struggle.',
          'Lots of advice straight away. Listen first, and ask before you suggest.',
        ],
      },
      {
        title: 'If they talk about not wanting to live',
        safety: true,
        paragraphs: [
          'Ask them directly: "Are you thinking of ending your life?" Asking does not put the idea in their head. It shows you are ready to listen.',
          'Stay with them, or make sure someone is with them. Call the crisis line in your country together: in the Philippines, the NCMH Crisis Hotline, 1553, open 24/7. If they are in immediate danger, call your emergency number (911 in the Philippines).',
        ],
      },
      {
        title: 'Keep checking in',
        paragraphs: [
          'A message a few days later, like "Thinking of you. Coffee this week?", means a lot. Keep inviting them, even if they say no.',
          'Helping someone can be heavy. Talk to someone yourself too: an e-coach can listen to you on Messenger, for free.',
        ],
      },
    ],
    faq: [
      {
        q: 'Should I ask my friend if they are thinking about suicide?',
        a: 'Yes. Asking directly and calmly does not put the idea in their head, and talking can be a relief for them. If they say yes, stay with them and call the crisis line in your country together (in the Philippines, the NCMH Crisis Hotline on 1553).',
      },
    ],
    related: ['i-feel-depressed', 'i-feel-alone'],
    sources: [WHO_SUICIDE, WHO_DEPRESSION],
  },
  {
    slug: 'ano-ang-sasabihin-sa-kaibigang-depressed',
    lang: 'tl',
    pair: 'what-to-say-to-a-depressed-friend',
    metaTitle: 'Ano ang sasabihin sa kaibigang depressed, at ano ang iiwasan',
    metaDescription:
      'Nag-aalala ka sa kaibigan mo? Ano ang puwedeng sabihin, ano ang iiwasan, at ano ang gagawin kung sinasabi niyang ayaw na niyang mabuhay. Simple at praktikal.',
    keywords: [
      'ano ang sasabihin sa kaibigang depressed',
      'paano tulungan ang kaibigang depressed',
      'kaibigang may depression',
      'ano ang hindi dapat sabihin sa depressed',
    ],
    label: 'Ano ang sasabihin sa kaibigang depressed',
    heading: 'Ano ang sasabihin ko sa kaibigang depressed?',
    intro:
      'Mas mahalaga ang pagdamay kaysa sa perpektong salita. Makinig, samahan siya, at kumustahin ulit. Ito ang nakakatulong, at ang dapat iwasan.',
    photo: 'care',
    sections: [
      {
        title: 'Ano ang puwede mong sabihin',
        sayings: [
          'Napansin kong parang malungkot ka nitong mga nakaraang araw. Kumusta ka talaga?',
          'Nandito lang ako. Gusto mo bang mag-usap, o samahan lang kita?',
          'Dahan-dahan lang. Nakikinig ako.',
          'May maitutulong ba ako ngayon, gaya ng pagkain o hatid?',
          'Makakatulong kaya kung makipag-usap ka sa counselor? Tutulungan kitang maghanap.',
        ],
        paragraphs: [
          'Pagkatapos, mas makinig kaysa magsalita. Puwede mong sabihing "Ang hirap niyan" nang hindi agad nagbibigay ng solusyon.',
        ],
      },
      {
        title: 'Ano ang dapat iwasan',
        list: [
          '"Kulang ka lang sa dasal." Nakakatulong ang dasal, pero sa mga salitang ito, parang sinisisi ang tao sa nararamdaman niya.',
          '"Think positive" o "Kaya mo yan, ngiti lang." Hindi pinipili ang depression.',
          '"Mas malala pa ang iba." Parang sinasabing wala siyang karapatang mahirapan.',
          'Maraming payo agad. Makinig muna, at magtanong bago magmungkahi.',
        ],
      },
      {
        title: 'Kung sinasabi niyang ayaw na niyang mabuhay',
        safety: true,
        paragraphs: [
          'Tanungin siya nang diretso: "Iniisip mo bang tapusin ang buhay mo?" Hindi nito naitatanim ang ideya sa isip niya. Ipinapakita nitong handa kang makinig.',
          'Samahan siya, o siguraduhing may kasama siya. Sabay kayong tumawag sa NCMH Crisis Hotline: 1553, bukas 24/7. Kung nasa panganib siya ngayon, tumawag sa 911.',
        ],
      },
      {
        title: 'Patuloy na kumustahin',
        paragraphs: [
          'Malaking bagay ang isang message pagkalipas ng ilang araw, gaya ng "Naiisip kita. Kape tayo this week?" Imbitahan pa rin siya kahit tumatanggi siya.',
          'Mabigat din ang pagtulong sa iba. Makipag-usap ka rin sa isang tao: may e-coach na puwedeng makinig sa iyo sa Messenger, nang libre.',
        ],
      },
    ],
    faq: [
      {
        q: 'Dapat ko bang tanungin ang kaibigan ko kung iniisip niyang magpakamatay?',
        a: 'Oo. Hindi naitatanim ang ideya kapag tinanong mo siya nang diretso at mahinahon, at puwedeng gumaan ang loob niya na makapagsalita. Kung oo ang sagot, samahan siya at tumawag sa NCMH Crisis Hotline sa 1553.',
      },
    ],
    related: ['depressed-ako', 'wala-akong-kausap'],
    sources: [WHO_SUICIDE, WHO_DEPRESSION],
  },
  {
    slug: 'mental-health-sa-tagalog',
    lang: 'tl',
    metaTitle: 'Anxiety, depression at burnout sa Tagalog: ibig sabihin',
    metaDescription:
      'Ano ang anxiety, depression, overthinking, panic attack at burnout sa Tagalog? Simpleng paliwanag ng bawat isa, at kung ano ang puwede mong gawin ngayon.',
    keywords: [
      'mental health sa Tagalog',
      'anxiety sa Tagalog',
      'depression sa Tagalog',
      'overthinking sa Tagalog',
      'panic attack sa Tagalog',
      'burnout sa Tagalog',
    ],
    label: 'Mental health sa Tagalog',
    heading: 'Anxiety, depression at overthinking sa Tagalog',
    intro:
      'Mga salitang madalas nating marinig, sa simpleng Tagalog: ano ang ibig sabihin ng bawat isa, at saan ka puwedeng magsimula.',
    photo: 'talk',
    sections: [
      {
        title: 'Ang mga salita',
        terms: [
          {
            term: 'Anxiety',
            words: 'pagkabalisa, kaba, nerbiyos',
            meaning:
              'Takot o pag-aalala na mahirap pigilan. Puwedeng kasama ang mabilis na tibok ng puso, hirap huminga o hindi mapakali.',
            link: {
              href: '/paano-mawala-ang-anxiety',
              label: 'Paano mawala ang anxiety',
            },
          },
          {
            term: 'Panic attack',
            words: 'biglaang matinding takot o kaba',
            meaning:
              'Biglang matinding takot na may kasamang kumakabog na dibdib, hirap huminga o hilo. Kadalasang lumilipas ito sa loob ng 5 hanggang 20 minuto.',
            link: {
              href: '/panic-attack-ano-gagawin',
              label: 'Ano ang gagawin sa panic attack',
            },
          },
          {
            term: 'Depression',
            words: 'depresyon, matinding lungkot',
            meaning:
              'Lungkot o kawalan ng gana na tumatagal nang dalawang linggo o higit pa, at nakakaapekto sa tulog, kain, lakas at pag-iisip. Nagagamot ito.',
            link: { href: '/depressed-ako', label: 'Depressed ako' },
          },
          {
            term: 'Overthinking',
            words: 'sobrang pag-iisip',
            meaning:
              'Paulit-ulit na pag-iisip tungkol sa parehong bagay nang hindi nakakahanap ng sagot, madalas sa gabi.',
            link: {
              href: '/hindi-makatulog-sa-kakaisip',
              label: 'Hindi makatulog sa kakaisip',
            },
          },
          {
            term: 'Burnout',
            words: 'pagkaubos ng lakas dahil sa trabaho',
            meaning:
              'Bunga ng matagal na stress sa trabaho: laging pagod, nagiging negatibo sa trabaho, at kaunti na lang ang natatapos.',
            link: { href: '/burnout-sa-trabaho', label: 'Burnout sa trabaho' },
          },
          {
            term: 'Stress',
            words: 'bigat ng isip, presyon',
            meaning:
              'Ang reaksyon ng katawan at isip sa mabigat na sitwasyon. Normal ito, pero nakakapagod kapag matagal na.',
            link: {
              href: '/tools',
              label: 'Mga tool para sa mabibigat na sandali',
            },
          },
          {
            term: 'I feel empty',
            words: 'parang walang laman ang loob',
            meaning:
              'Pakiramdam na wala kang nararamdaman o walang saysay ang mga bagay. Kung matagal na, puwedeng senyales ito ng depression.',
            link: {
              href: '/hindi-ko-alam-gagawin-ko-sa-buhay',
              label: 'Hindi ko alam gagawin ko sa buhay',
            },
          },
          {
            term: 'I feel lost',
            words: 'naliligaw, hindi alam ang gagawin sa buhay',
            meaning:
              'Hindi mo alam kung saan ka papunta o ano ang susunod. Karaniwan ito sa malalaking pagbabago.',
            link: {
              href: '/hindi-ko-alam-gagawin-ko-sa-buhay',
              label: 'Saan magsisimula',
            },
          },
          {
            term: 'Loneliness',
            words: 'pag-iisa, walang makausap',
            meaning:
              'Pakiramdam na walang nakakaintindi o nakikinig sa iyo, kahit may mga tao sa paligid.',
            link: { href: '/wala-akong-kausap', label: 'Wala akong kausap' },
          },
          {
            term: 'Mental health',
            words: 'kalusugan ng isip',
            meaning:
              'Kung paano tayo nag-iisip, nakakaramdam at humaharap sa araw-araw. Kasinghalaga ito ng kalusugan ng katawan.',
            link: { href: '/#start', label: 'Kumusta ka ngayon?' },
          },
        ],
      },
      {
        title: 'Kung naiisip mong tapusin ang buhay mo',
        safety: true,
        paragraphs: [
          'Kausapin mo ang isang tao ngayon. Tumawag sa NCMH Crisis Hotline: 1553, bukas 24/7. Kung nasa panganib ka ngayon, tumawag sa 911.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ano ang anxiety sa Tagalog?',
        a: 'Kadalasan itong tinatawag na pagkabalisa, kaba o nerbiyos: takot o pag-aalala na mahirap pigilan.',
      },
      {
        q: 'Ano ang depression sa Tagalog?',
        a: 'Depresyon o matinding lungkot: lungkot o kawalan ng gana na tumatagal nang dalawang linggo o higit pa.',
      },
      {
        q: 'Ano ang overthinking sa Tagalog?',
        a: 'Sobrang pag-iisip: paulit-ulit na pag-iisip tungkol sa parehong bagay nang hindi nakakahanap ng sagot.',
      },
    ],
    related: ['paano-mawala-ang-anxiety', 'depressed-ako'],
    sources: [WHO_ANXIETY, WHO_DEPRESSION, WHO_BURNOUT],
  },
  {
    slug: 'bible-verses-for-anxiety',
    lang: 'en',
    pair: 'bible-verse-para-sa-anxiety',
    metaTitle: 'Bible verses for anxiety: 8 verses and a short prayer',
    metaDescription:
      "Bible verses for when you feel anxious or afraid, a short prayer you can pray now, and free help if the worry won't let go. In English and Tagalog.",
    keywords: [
      'Bible verses for anxiety',
      'scripture for anxiety',
      'Bible verses about worry',
      'prayer for anxiety',
      'Bible verses for fear',
    ],
    label: 'Bible verses for anxiety',
    heading: 'Bible verses for anxiety',
    intro:
      "When worry won't let go, these verses remind us that God is near. Read one slowly, then breathe out.",
    photo: 'hope',
    sections: [
      {
        title: 'Eight verses for anxious days',
        verses: [
          {
            text: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.',
            reference: 'Philippians 4:6-7',
          },
          {
            text: '…casting all your worries on him, because he cares for you.',
            reference: '1 Peter 5:7',
          },
          {
            text: 'Therefore don’t be anxious for tomorrow, for tomorrow will be anxious for itself. Each day’s own evil is sufficient.',
            reference: 'Matthew 6:34',
          },
          {
            text: 'Don’t you be afraid, for I am with you. Don’t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.',
            reference: 'Isaiah 41:10',
          },
          {
            text: 'Peace I leave with you. My peace I give to you; not as the world gives, I give to you. Don’t let your heart be troubled, neither let it be fearful.',
            reference: 'John 14:27',
          },
          {
            text: 'In the multitude of my thoughts within me, your comforts delight my soul.',
            reference: 'Psalm 94:19',
          },
          {
            text: '“Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light.”',
            reference: 'Matthew 11:28-30',
          },
          {
            text: 'When I am afraid, I will put my trust in you.',
            reference: 'Psalm 56:3',
          },
        ],
      },
      {
        title: 'A short prayer',
        paragraphs: [
          'Lord, You see what I am carrying today. I give You my worries, one by one. Calm my heart and my thoughts, and help me take the next small step. Thank You that You care for me. Amen.',
        ],
      },
      {
        title: "If the worry won't let go",
        paragraphs: [
          'Prayer and Scripture help, and so does talking to someone. If anxiety is with you most days, try the 2-minute breathing, make a free plan, or talk to an e-coach. You can also ask our Hope Carriers to pray for you.',
        ],
      },
    ],
    faq: [
      {
        q: 'What does the Bible say about anxiety?',
        a: 'Philippians 4:6-7 says to bring everything to God in prayer, with thanksgiving, and that His peace will guard your heart and mind. 1 Peter 5:7 says to cast all your worries on Him, because He cares for you.',
      },
    ],
    related: ['how-to-calm-anxiety', 'bible-verses-when-you-feel-down'],
    attribution:
      'Scripture quotations are from the World English Bible (WEB), public domain.',
  },
  {
    slug: 'bible-verse-para-sa-anxiety',
    lang: 'tl',
    pair: 'bible-verses-for-anxiety',
    metaTitle: 'Bible verse para sa anxiety: 8 talata at maikling panalangin',
    metaDescription:
      'Mga talata sa Biblia para sa oras na balisa o natatakot ka, may maikling panalangin, at libreng tulong kung hindi nawawala ang pag-aalala. Tagalog at English.',
    keywords: [
      'Bible verse para sa anxiety',
      'talata sa Biblia para sa anxiety',
      'Bible verse Tagalog',
      'panalangin para sa anxiety',
      'talata para sa takot',
    ],
    label: 'Bible verse para sa anxiety',
    heading: 'Bible verse para sa anxiety',
    intro:
      'Kapag hindi mawala ang pag-aalala, ipinapaalala ng mga talatang ito na malapit ang Diyos. Basahin nang dahan-dahan ang isa, tapos huminga nang malalim.',
    photo: 'hope',
    sections: [
      {
        title: 'Walong talata para sa mga araw na balisa ka',
        verses: [
          {
            text: 'Huwag kayong mangabalisa sa anomang bagay; kundi sa lahat ng mga bagay sa pamamagitan ng panalangin at daing na may pagpapasalamat ay ipakilala ninyo ang inyong mga kahilingan sa Dios. At ang kapayapaan ng Dios, na di masayod ng pagiisip, ay magiingat ng inyong mga puso at ng inyong mga pagiisip kay Cristo Jesus.',
            reference: 'Filipos 4:6-7',
          },
          {
            text: "…Na inyong ilagak sa kaniya ang lahat ng inyong kabalisahan, sapagka't kayo'y ipinagmamalasakit niya.",
            reference: '1 Pedro 5:7',
          },
          {
            text: "Kaya't huwag ninyong ikabalisa ang sa araw ng bukas: sapagka't ang araw ng bukas ay mababalisa sa kaniyang sarili. Sukat na sa kaarawan ang kaniyang kasamaan.",
            reference: 'Mateo 6:34',
          },
          {
            text: "Huwag kang matakot, sapagka't ako'y sumasaiyo; huwag kang manglupaypay, sapagka't ako'y iyong Dios; aking palalakasin ka; oo, aking tutulungan ka; oo, aking aalalayan ka ng kanang kamay ng aking katuwiran.",
            reference: 'Isaias 41:10',
          },
          {
            text: 'Ang kapayapaan ay iniiwan ko sa inyo; ang aking kapayapaan ay ibinibigay ko sa inyo: hindi gaya ng ibinibigay ng sanglibutan, ang ibinibigay ko sa inyo. Huwag magulumihanan ang inyong puso, ni matakot man.',
            reference: 'Juan 14:27',
          },
          {
            text: 'Sa karamihan ng aking mga pagiisip sa loob ko ang iyong mga pagaliw ay nagbibigay lugod sa aking kaluluwa.',
            reference: 'Awit 94:19',
          },
          {
            text: "Magsiparito sa akin, kayong lahat na nangapapagal at nangabibigatang lubha, at kayo'y aking papagpapahingahin. Pasanin ninyo ang aking pamatok, at magaral kayo sa akin; sapagka't ako'y maamo at mapagpakumbabang puso: at masusumpungan ninyo ang kapahingahan ng inyong mga kaluluwa. Sapagka't malambot ang aking pamatok, at magaan ang aking pasan.",
            reference: 'Mateo 11:28-30',
          },
          {
            text: "Sa panahong ako'y matakot, aking ilalagak ang aking tiwala sa iyo.",
            reference: 'Awit 56:3',
          },
        ],
      },
      {
        title: 'Maikling panalangin',
        paragraphs: [
          'Panginoon, nakikita Mo ang dinadala ko ngayon. Ibinibigay ko sa Iyo ang mga alalahanin ko, isa-isa. Pakalmahin Mo ang puso at isip ko, at tulungan Mo akong gawin ang susunod na maliit na hakbang. Salamat dahil may malasakit Ka sa akin. Amen.',
        ],
      },
      {
        title: 'Kung hindi nawawala ang pag-aalala',
        paragraphs: [
          'Nakakatulong ang dasal at ang Salita ng Diyos, at nakakatulong din ang pakikipag-usap sa isang tao. Kung halos araw-araw kang balisa, subukan ang 2-minute na paghinga, gumawa ng libreng plano, o kausapin ang isang e-coach. Puwede ka ring magpadasal sa aming mga Hope Carrier.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ano ang sinasabi ng Biblia tungkol sa anxiety?',
        a: 'Sa Filipos 4:6-7, sinasabing idulog sa Diyos ang lahat sa panalangin na may pasasalamat, at iingatan ng Kanyang kapayapaan ang ating puso at isip. Sa 1 Pedro 5:7, sinasabing ilagak sa Kanya ang lahat ng alalahanin, dahil may malasakit Siya sa atin.',
      },
    ],
    related: ['paano-mawala-ang-anxiety', 'bible-verse-para-sa-malungkot'],
    attribution:
      'Ang mga talata ay mula sa Ang Dating Biblia (1905), public domain.',
  },
  {
    slug: 'bible-verses-when-you-feel-down',
    lang: 'en',
    pair: 'bible-verse-para-sa-malungkot',
    metaTitle: 'Bible verses for when you feel down, sad or hopeless',
    metaDescription:
      'Bible verses for heavy days, when you feel sad, low or tired of everything, with a short prayer and free help if the heaviness stays. In English and Tagalog.',
    keywords: [
      'Bible verses when you feel down',
      'Bible verses for sadness',
      'Bible verses for hope',
      'Bible verses when you feel hopeless',
      'prayer when you feel down',
    ],
    label: 'Bible verses for when you feel down',
    heading: 'Bible verses for when you feel down',
    intro:
      'On heavy days it can be hard to pray. Start with one of these verses. Read it slowly, as many times as you need.',
    photo: 'morning',
    sections: [
      {
        title: 'Eight verses for heavy days',
        verses: [
          {
            text: 'The LORD is near to those who have a broken heart, and saves those who have a crushed spirit.',
            reference: 'Psalm 34:18',
          },
          {
            text: 'Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him, the saving help of my countenance, and my God.',
            reference: 'Psalm 42:11',
          },
          {
            text: 'God is our refuge and strength, a very present help in trouble.',
            reference: 'Psalm 46:1',
          },
          {
            text: '…but those who wait for the LORD will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.',
            reference: 'Isaiah 40:31',
          },
          {
            text: 'He heals the broken in heart, and binds up their wounds.',
            reference: 'Psalm 147:3',
          },
          {
            text: 'We are pressed on every side, yet not crushed; perplexed, yet not to despair; pursued, yet not forsaken; struck down, yet not destroyed;',
            reference: '2 Corinthians 4:8-9',
          },
          {
            text: 'It is because of the LORD’s loving kindnesses that we are not consumed, because his mercies don’t fail. They are new every morning. Great is your faithfulness.',
            reference: 'Lamentations 3:22-23',
          },
          {
            text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.',
            reference: 'Psalm 23:4',
          },
        ],
      },
      {
        title: 'A short prayer',
        paragraphs: [
          'Lord, my heart feels heavy today. You are near to the brokenhearted, so be near to me now. Give me strength for this day, and people to walk with me. Amen.',
        ],
      },
      {
        title: 'If the heaviness stays',
        safety: true,
        paragraphs: [
          'If you have felt low most days for two weeks or more, it may be depression, and it can be treated. Talk to a doctor or counselor, or start with an e-coach. If you are thinking about ending your life, call the crisis line in your country now: in the Philippines, the NCMH Crisis Hotline on 1553, open 24/7.',
        ],
      },
    ],
    faq: [
      {
        q: 'What Bible verse helps when you feel down?',
        a: 'Psalm 34:18 says the Lord is near to those who have a broken heart. Psalm 42:11 speaks honestly to a soul in despair and turns it toward hope in God. Many people also hold on to Lamentations 3:22-23: His mercies are new every morning.',
      },
      {
        q: 'What does the Bible say when you feel hopeless?',
        a: 'Psalm 42 speaks to a soul in despair and answers, "Hope in God!" Lamentations 3:22-23 says the Lord\'s mercies are new every morning. Feeling hopeless for weeks can also be a sign of depression, so talk to someone, and if you are thinking of ending your life, call the crisis line in your country (in the Philippines, the NCMH Crisis Hotline on 1553).',
      },
    ],
    related: ['i-feel-depressed', 'bible-verses-for-anxiety'],
    attribution:
      'Scripture quotations are from the World English Bible (WEB), public domain.',
  },
  {
    slug: 'bible-verse-para-sa-malungkot',
    lang: 'tl',
    pair: 'bible-verses-when-you-feel-down',
    metaTitle:
      'Bible verse para sa malungkot: mga talata para sa mabibigat na araw',
    metaDescription:
      'Mga talata sa Biblia para sa malungkot, pagod o nawawalan ng pag-asa, may maikling panalangin, at libreng tulong kung hindi gumagaan ang loob mo.',
    keywords: [
      'Bible verse para sa malungkot',
      'talata sa Biblia para sa malungkot',
      'Bible verse tungkol sa pag-asa',
      'panalangin para sa malungkot',
      'Bible verse Tagalog',
    ],
    label: 'Bible verse para sa malungkot',
    heading: 'Bible verse para sa malungkot',
    intro:
      'Sa mabibigat na araw, mahirap kahit ang magdasal. Magsimula sa isa sa mga talatang ito. Basahin nang dahan-dahan, kahit ilang ulit.',
    photo: 'morning',
    sections: [
      {
        title: 'Walong talata para sa mabibigat na araw',
        verses: [
          {
            text: 'Ang Panginoon ay malapit sa kanila na may bagbag na puso, at inililigtas ang mga may pagsisising diwa.',
            reference: 'Awit 34:18',
          },
          {
            text: "Bakit ka nanglulumo, Oh kaluluwa ko? At bakit ka nababagabag sa loob ko? Umasa ka sa Dios: sapagka't pupuri pa ako sa kaniya, na siyang kagalingan ng aking mukha, at aking Dios.",
            reference: 'Awit 42:11',
          },
          {
            text: 'Ang Dios ay ating ampunan at kalakasan, handang saklolo sa kabagabagan.',
            reference: 'Awit 46:1',
          },
          {
            text: "…Nguni't silang nangaghihintay sa Panginoon ay mangagbabagong lakas; sila'y paiilanglang na may mga pakpak na parang mga aguila; sila'y magsisitakbo, at hindi mangapapagod; sila'y magsisilakad, at hindi manganghihina.",
            reference: 'Isaias 40:31',
          },
          {
            text: 'Kaniyang pinagagaling ang mga may bagbag na puso, at tinatalian niya ang kanilang mga sugat.',
            reference: 'Awit 147:3',
          },
          {
            text: "Sa magkabikabila ay nangagigipit kami, gayon ma'y hindi nangaghihinagpis; nangatitilihan, gayon ma'y hindi nangawawalan ng pagasa; Pinaguusig, gayon ma'y hindi pinababayaan; inilulugmok, gayon ma'y hindi nangasisira;",
            reference: '2 Corinto 4:8-9',
          },
          {
            text: "Sa mga kaawaan nga ng Panginoon ay hindi tayo nalipol, sapagka't ang kaniyang mga habag ay hindi nauubos. Ang mga yao'y bago tuwing umaga, dakila ang inyong pagtatapat.",
            reference: 'Panaghoy 3:22-23',
          },
          {
            text: "Oo, bagaman ako'y lumalakad sa libis ng lilim ng kamatayan, wala akong katatakutang kasamaan; sapagka't ikaw ay sumasa akin: ang iyong pamalo at ang iyong tungkod, ay nagsisialiw sa akin.",
            reference: 'Awit 23:4',
          },
        ],
      },
      {
        title: 'Maikling panalangin',
        paragraphs: [
          'Panginoon, mabigat ang loob ko ngayon. Malapit Ka sa mga may bagbag na puso, kaya samahan Mo ako ngayon. Bigyan Mo ako ng lakas para sa araw na ito, at ng mga taong makakasama ko. Amen.',
        ],
      },
      {
        title: 'Kung hindi gumagaan ang loob mo',
        safety: true,
        paragraphs: [
          'Kung halos araw-araw kang malungkot nang dalawang linggo o higit pa, puwedeng depression ito, at nagagamot ito. Kausapin ang doktor o counselor, o magsimula sa isang e-coach. Kung naiisip mong tapusin ang buhay mo, tumawag sa NCMH Crisis Hotline sa 1553, bukas 24/7.',
        ],
      },
    ],
    faq: [
      {
        q: 'Anong Bible verse ang para sa malungkot?',
        a: 'Sa Awit 34:18, sinasabing malapit ang Panginoon sa mga may bagbag na puso. Sa Awit 42:11, may tapat na tanong sa kaluluwang nanlulumo, at paanyaya na umasa sa Diyos. Marami rin ang kumakapit sa Panaghoy 3:22-23: bago tuwing umaga ang Kanyang mga habag.',
      },
      {
        q: 'Ano ang sinasabi ng Biblia kapag nawawalan ka ng pag-asa?',
        a: 'Sa Awit 42, kinakausap ng sumulat ang kaluluwa niyang nanglulumo at sinasabi niya, "Umasa ka sa Dios." Sa Panaghoy 3:22-23, bago tuwing umaga ang habag ng Panginoon. Kung ilang linggo ka nang nawawalan ng pag-asa, kausapin ang isang tao, at kung naiisip mong tapusin ang buhay mo, tumawag sa NCMH Crisis Hotline sa 1553.',
      },
    ],
    related: ['depressed-ako', 'bible-verse-para-sa-anxiety'],
    attribution:
      'Ang mga talata ay mula sa Ang Dating Biblia (1905), public domain.',
  },
  {
    slug: 'free-mental-health-help-philippines',
    lang: 'en',
    metaTitle:
      'Free mental health help in the Philippines: hotlines and counseling',
    metaDescription:
      'Free 24/7 crisis hotlines (NCMH 1553, In Touch, Hopeline), free counseling, PhilHealth cover and free help you can use online now. Numbers checked October 2026.',
    keywords: [
      'free mental health help Philippines',
      'mental health hotline Philippines',
      'NCMH 1553',
      'free counseling Philippines',
      'PhilHealth mental health',
      'Hopeline Philippines',
    ],
    label: 'Free mental health help in the Philippines',
    heading: 'Free mental health help in the Philippines',
    intro:
      "Where to call, chat or book for free, checked against each organization's own information. If you are in danger right now, call 911.",
    photo: 'talk',
    sections: [
      {
        title: 'Crisis hotlines, open 24/7',
        services: [
          {
            name: 'NCMH Crisis Hotline',
            detail:
              'National Center for Mental Health. Free and open 24/7. 1553 is toll-free from landlines.',
            href: 'https://ncmh.gov.ph/contact-us/',
            numbers: [
              {
                label: '1553',
                tel: '1553',
              },
              {
                label: '1800-1888-1553',
                tel: '180018881553',
              },
              {
                label: '0919 057 1553 (Smart/TNT)',
                tel: '+639190571553',
              },
              {
                label: '0917 899 8727 (Globe/TM)',
                tel: '+639178998727',
              },
              {
                label: '0966 351 4518 (Globe/TM)',
                tel: '+639663514518',
              },
            ],
          },
          {
            name: 'In Touch Crisis Line',
            detail:
              'In Touch Community Services. Free, anonymous and open 24/7.',
            href: 'https://in-touch.org/contact/',
            numbers: [
              {
                label: '(02) 8893 7603',
                tel: '+63288937603',
              },
              {
                label: '0919 056 0709',
                tel: '+639190560709',
              },
              {
                label: '0917 800 1123',
                tel: '+639178001123',
              },
              {
                label: '0917 108 5412',
                tel: '+639171085412',
              },
            ],
          },
          {
            name: 'Hopeline PH',
            detail: 'Natasha Goulbourn Foundation. Open 24/7.',
            numbers: [
              {
                label: '(02) 8804 4673',
                tel: '+63288044673',
              },
              {
                label: '0917 558 4673',
                tel: '+639175584673',
              },
              {
                label: '0918 873 4673',
                tel: '+639188734673',
              },
            ],
          },
          {
            name: 'Emergency: 911',
            detail:
              'Free and 24/7, nationwide, if you or someone else is in immediate danger.',
            numbers: [
              {
                label: '911',
                tel: '911',
              },
            ],
          },
        ],
      },
      {
        title: 'Free or low-cost counseling and care',
        services: [
          {
            name: 'NCMH outpatient consultation',
            detail:
              'Book online at bit.ly/ncmhkonsulta, or call Monday to Friday, 8 am to 5 pm (local 1200 on the landline). Ask about fees when you book.',
            href: 'https://bit.ly/ncmhkonsulta',
            numbers: [
              {
                label: '0999 396 3418',
                tel: '+639993963418',
              },
              {
                label: '(02) 8531 9001',
                tel: '+63285319001',
              },
            ],
          },
          {
            name: 'UP-PGH Department of Psychiatry, Manila',
            detail:
              'Free outpatient consultations at the Philippine General Hospital, booked through its online system. The clinic replies by text.',
            href: 'https://ocra.pgh.gov.ph/login',
          },
          {
            name: 'PhilHealth mental health cover',
            detail:
              'PhilHealth members and dependents aged 10 and up can get outpatient mental health care covered at PhilHealth-contracted facilities: up to ₱9,000 a year for general care, or ₱16,000 for specialized care, including check-ups, therapy and medicines.',
            href: 'https://www.philhealth.gov.ph/news/up/article/2025/news_67ce834b70a58.php',
          },
          {
            name: 'Quezon City residents',
            detail:
              'Free screening, counseling, referral and maintenance medicines at QC health centers, and a free 24/7 mental health line through QC Helpline 122.',
            href: 'https://quezoncity.gov.ph/mental-health-hotline-now-integrated-in-qcs-helpline-122/',
            numbers: [
              {
                label: '122',
                tel: '122',
              },
            ],
          },
          {
            name: 'In Touch subsidized counseling',
            detail:
              "Discounted counseling for people who can't afford it, are unemployed or uninsured. Call and press 1 (calls only).",
            href: 'https://in-touch.org/counseling-2/',
            numbers: [
              {
                label: '(02) 8893 1893',
                tel: '+63288931893',
              },
              {
                label: '0917 863 1136',
                tel: '+639178631136',
              },
              {
                label: '0998 841 0053',
                tel: '+639988410053',
              },
            ],
          },
          {
            name: 'Students and parents: DepEd TeleSafe',
            detail:
              "DepEd's helpline for learners and parents, with a direct link to NCMH. Dial #33733, or call, text or Viber the number below. Your school's guidance office can help too.",
            href: 'https://www.deped.gov.ph/2026/05/11/angara-deped-telesafe-helpline-may-direct-link-na-sa-national-center-for-mental-health-hotline/',
            numbers: [
              {
                label: '0945 175 9777',
                tel: '+639451759777',
              },
            ],
          },
          {
            name: 'Christian counselors',
            detail:
              'The Philippine Association of Christian Counselors connects people with Christian counselors. Fees vary; ask when you reach out.',
            href: 'https://www.philacc.org/',
          },
        ],
      },
      {
        title: 'Free on HopeBegins, any time',
        list: [
          'Talk to an e-coach on Messenger: a real person from Himala Everyday.',
          'Ask for prayer: a Hope Carrier will pray for you.',
          'Make a free plan: 9 questions, then small steps for this week. It stays on your phone.',
          'Tools for hard moments: slow breathing, 5-4-3-2-1 and a quick game.',
          "Hope AI: an AI assistant you can chat with any hour. It can't counsel you or help in an emergency.",
        ],
      },
      {
        title: 'Sa Tagalog',
        safety: true,
        paragraphs: [
          'Libre at bukas 24/7 ang mga hotline sa itaas. Kung naiisip mong tapusin ang buhay mo, tumawag sa NCMH Crisis Hotline sa 1553. Kung nasa panganib ka ngayon, tumawag sa 911.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a free mental health hotline in the Philippines?',
        a: 'Yes. The NCMH Crisis Hotline is free and open 24/7: 1553 from a landline, 0919 057 1553 for Smart/TNT, or 0917 899 8727 or 0966 351 4518 for Globe/TM. In Touch and Hopeline also run 24/7 lines.',
      },
      {
        q: 'Where can I get free counseling in the Philippines?',
        a: 'You can book an outpatient consultation at NCMH or the UP-PGH Department of Psychiatry, students can use their school guidance office, and PhilHealth members can get outpatient mental health care covered up to ₱9,000 a year. For someone to talk to today, message a HopeBegins e-coach on Messenger.',
      },
    ],
    related: ['i-feel-depressed', 'wala-akong-kausap'],
    sources: [
      {
        label: 'NCMH contact page',
        href: 'https://ncmh.gov.ph/contact-us/',
      },
      {
        label: 'In Touch',
        href: 'https://in-touch.org/contact/',
      },
      {
        label: 'Hopeline (Natasha Goulbourn Foundation)',
        href: 'https://ngf-mindstrong.com/programs/',
      },
      {
        label: 'PhilHealth',
        href: 'https://www.philhealth.gov.ph/news/up/article/2025/news_67ce834b70a58.php',
      },
      {
        label: 'UP-PGH Psychiatry',
        href: 'https://www.pgh.gov.ph/psychiatry-and-behavioral-medicine/',
      },
    ],
    checkedOn: '19 October 2026',
  },
];

export const guideSlugs = guides.map((guide) => `/${guide.slug}`);

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
