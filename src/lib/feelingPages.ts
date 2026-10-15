/**
 * Landing pages for the words people type when they first realise something
 * is wrong (Google Philippines autocomplete, October 2026). Each page names
 * the feeling in the visitor's own words, gives one thing to do in the next
 * two minutes, then offers a person, a plan and prayer.
 *
 * Copy is Taglish for a general (not only Christian) audience. Crisis wording
 * follows WHO safe-messaging guidance: no methods, always hope and a number.
 */

export type FeelingTool = 'breathe' | 'ground' | 'message' | 'worry-note';

export interface FeelingPage {
  slug: string;
  /** Search result and browser tab title. */
  metaTitle: string;
  metaDescription: string;
  /** Short label for footer links. */
  label: string;
  heading: string;
  intro: string;
  /** Show the crisis line near the top, for phrases that can signal suicidal thoughts. */
  safetyFirst?: string;
  toolsHeading: string;
  tools: FeelingTool[];
  tip?: { title: string; body: string };
  /** The next step to put first. */
  firstStep: 'ecoach' | 'plan';
  /** Show a talk-to-an-e-coach button right under the intro. */
  talkNow?: boolean;
}

export const feelingPages: FeelingPage[] = [
  {
    slug: 'pagod-na-ako',
    metaTitle: 'Pagod na ako: ano ang gagawin kapag pagod ka na sa lahat',
    metaDescription:
      'Pagod na sa lahat? Hindi mo kailangang ayusin ang lahat ngayon. Subukan ang isang 2-minute na paghinga, makipag-usap sa isang e-coach, o gumawa ng libreng plano.',
    label: 'Pagod na ako',
    heading: 'Pagod na ako.',
    intro:
      'Minsan hindi lang katawan ang napapagod, pati isip at puso. Hindi mo kailangang ayusin ang lahat ngayon. Isang maliit na hakbang muna.',
    safetyFirst:
      'Kung pagod ka na sa buhay at naiisip mong ayaw mo nang mabuhay, hindi mo kailangang harapin ito nang mag-isa.',
    toolsHeading: 'Huminga muna tayo',
    tools: ['breathe'],
    tip: {
      title: 'Isang maliit na bagay para sa araw na ito',
      body: 'Pumili ng isang bagay na kaya mong tapusin sa loob ng 10 minuto: maligo, kumain, o lumabas sandali. Sapat na iyon ngayong araw. Kadalasan, sumusunod ang gaan ng loob pagkatapos gumawa, hindi bago.',
    },
    firstStep: 'ecoach',
  },
  {
    slug: 'wala-akong-kausap',
    metaTitle: 'Wala akong kausap: may makakausap ka ngayon',
    metaDescription:
      'Pakiramdam mo ba wala kang makausap? Kausapin ang isang e-coach sa Messenger, makipag-chat kay Hope AI anumang oras, o magpadala ng isang mensahe sa taong pinagkakatiwalaan mo.',
    label: 'Wala akong kausap',
    heading: 'Wala akong kausap.',
    intro:
      'Mabigat kapag pakiramdam mo walang nakikinig. May makakausap ka ngayon, at hindi mo kailangang magpaliwanag nang mahaba.',
    toolsHeading: 'Isang mensahe lang',
    tools: ['message'],
    tip: {
      title: 'Kung gabi na at gusto mo lang mag-type',
      body: 'Nandiyan si Hope AI, isang AI assistant na puwede mong kausapin anumang oras. Hindi siya counselor, pero makakatulong siyang ilabas ang nasa isip mo.',
    },
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'paano-mawala-ang-anxiety',
    metaTitle: 'Paano mawala ang anxiety: 2-minute na paraan para kumalma',
    metaDescription:
      'Kumakabog ang dibdib at hindi mapakali ang isip? Subukan ang 2-minute na paghinga at ang 5-4-3-2-1 grounding, pagkatapos gumawa ng libreng plano para sa anxiety.',
    label: 'Paano mawala ang anxiety',
    heading: 'Paano mawala ang anxiety?',
    intro:
      'Kapag kumakabog ang dibdib at hindi mapakali ang isip, may magagawa ka ngayon mismo. Hindi nito tatanggalin agad ang lahat, pero makakatulong itong kumalma ang katawan mo.',
    toolsHeading: 'Subukan natin ito ngayon',
    tools: ['breathe', 'ground'],
    tip: {
      title: 'Bakit gumagana ang paghinga',
      body: 'Kapag mas mahaba ang paghinga palabas kaysa papasok, sinasabihan nito ang katawan mo na ligtas ka. Kung madalas itong mangyari sa iyo, makakatulong ang isang plano at ang pakikipag-usap sa isang counselor.',
    },
    firstStep: 'plan',
  },
  {
    slug: 'hindi-makatulog-sa-kakaisip',
    metaTitle: 'Hindi makatulog sa kakaisip: ano ang gagawin ngayong gabi',
    metaDescription:
      'Gabi na pero ayaw tumigil ng isip mo? Isulat muna ang iniisip mo, huminga nang dahan-dahan, at subukan ang mga paraan para makatulog ngayong gabi.',
    label: 'Hindi makatulog sa kakaisip',
    heading: 'Hindi ako makatulog sa kakaisip.',
    intro:
      'Gabi na pero ayaw tumigil ng isip mo. Hindi mo kailangang lutasin ngayong gabi ang lahat ng iniisip mo. Subukan natin ito.',
    toolsHeading: 'Ilabas muna ang iniisip',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Kung gising ka pa rin pagkalipas ng mga 20 minuto',
      body: 'Bumangon muna at gumawa ng tahimik na bagay sa malamlam na ilaw, gaya ng pagbabasa, hanggang antukin ka. Iwasan muna ang cellphone. Bukas, subukang gumising sa parehong oras.',
    },
    firstStep: 'plan',
  },
];

export const feelingSlugs = feelingPages.map((page) => `/${page.slug}`);

export function getFeelingPage(slug: string) {
  return feelingPages.find((page) => page.slug === slug);
}
