import type { Story } from './types';

const photos = '/assets/images/photos';

export const translations4: Story[] = [
  {
    slug: 'paano-magsimula-ulit-sa-buhay',
    lang: 'tl',
    pair: 'how-to-start-over-in-life',
    theme: 'new-start',
    metaTitle: 'Paano magsimula ulit sa buhay: ang kuwento ni Lito',
    metaDescription:
      'Kinuha ng baha ang palaisdaan ni Lito, tapos nagkasakit pa siya. Paano siya nagsimula ulit sa buhay, paisa-isang hakbang, at ang unang hakbang mo ngayon.',
    title: 'Paano nagsimula ulit si Lito matapos kunin ng baha ang lahat',
    dek: 'Sa loob ng isang taon, nawala ang palaisdaan ni Lito, tapos ang kalusugan niya. Mabagal ang pagsisimula ulit, paisa-isang umaga.',
    who: 'Lito, 45, mangingisda sa Malolos, Bulacan',
    photo: {
      src: `${photos}/hope-sunrise.jpg`,
      alt: 'A fisherman poling his boat across the water at sunrise',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Ang taon na tumaas ang tubig',
        paragraphs: [
          'Dalawampung taon nang pare-pareho ang umaga ni Lito. Gising ng alas-kuwatro, isang tasang barako, tapos diretso sa palaisdaan sa Malolos na itinayo nila ng tatay niya. Bangus ang karamihan. Sapat para mapag-aral ang dalawang anak at maayos ang bubong kapag tumutulo.',
          'Tapos dumating ang bagyo noong Agosto. Magdamag na tumaas ang ilog, at tuloy-tuloy pa. Pagdating ng umaga, lubog na ang mga pilapil ng palaisdaan at wala na ang mga isda, tinangay papunta sa dagat kasama ng lahat ng iba pa. Nakatayo siya sa gilid, naka-tsinelas, nakatingin sa kulay-putik na tubig kung saan dati ang pinaghirapan niya.',
          '"Babangon tayo," sabi niya sa asawa niyang si Weng. Seryoso siya. Nangutang siya para ayusin ang pilapil at mag-restock. Makalipas ang dalawang buwan, inubo siya at hindi na tumigil. Pneumonia, sabi ng doktor sa provincial hospital, tapos pahinga. Anim na linggong pahinga, para sa taong ni minsan hindi nag-day off nang anim na araw.',
          'Pagdating ng Disyembre, ubos na ang inutang, kalahati pa lang ang naayos sa palaisdaan, at tuwing hapon nakaupo si Lito sa plastic na upuan sa may pinto, pinapanood ang mga kapitbahay na pumapalaot.',
        ],
        pullQuote:
          'Nakatayo siya sa gilid, naka-tsinelas, nakatingin sa kulay-putik na tubig kung saan dati ang pinaghirapan niya.',
      },
      {
        kind: 'struggle',
        heading:
          'Bakit parang imposibleng magsimula ulit pagkatapos ng malaking kawalan',
        paragraphs: [
          'Mabigat ang mawalan ng palaisdaan. Mas mabigat ang sumunod. Alam ni Lito kung sino siya dati: siya ang nagtatrabaho, siya ang nagbibigay, siya ang tinatawag ng mga kapitbahay kapag kailangan nilang ayusin ang pilapil nila. Habang nakaupo sa may pinto, hindi na niya alam kung sino pa siya.',
          'Tumigil siyang sumagot sa text ng barkada. Nasigawan niya ang anak niya dahil sa nabasag na plato. Sa gabi, gising siya, paulit-ulit na nagkukuwenta: ang utang, ang tuition, ang presyo ng fingerlings, ilang buwan pa bago mag-ani. Kahit paano niya kuwentahin, iisa ang sagot ng numero: dalawampung taon ang nawala sa isang gabi.',
          'Napapansin ni Weng. "Kumain ka naman," sasabihin niya, sabay abot ng plato. Kakain siya nang kaunti, tapos balik sa upuan. Kapag tinanong ni Weng kung ano ang iniisip niya, "Wala" ang sagot niya. Ang totoo, pakiramdam niya talunan siya, at hindi niya alam kung paano iyon sasabihin.',
          'Para kay Lito, ang magsimula ulit ay ibalik ang lahat nang sabay-sabay: ang palaisdaan, ang pera, ang lakas niya, ang lugar niya. Dahil hindi niya kayang gawin lahat iyon, wala siyang ginawa kahit isa.',
        ],
        pullQuote:
          'Dahil hindi niya kayang gawin lahat iyon, wala siyang ginawa kahit isa.',
      },
      {
        kind: 'helped',
        heading:
          'Ano ang nakatulong kay Lito na magsimula ulit, paisa-isang hakbang',
        paragraphs: [
          'Nagsimula ang pagbabago kay Mang Celso, matagal na niyang kaibigan, na dumaan isang umaga na may dalang pandesal at umupo sa katabing upuan nang hindi na nagpapaalam. Nag-usap sila tungkol sa panahon at sa presyo ng gasolina. Tapos nagtanong si Celso, "Ikaw ba, kumusta ka talaga?" at naghintay.',
          'Nagulat si Lito sa sarili niya. Ikinuwento niya ang pagkukuwenta tuwing gabi, ang hiya, ang pakiramdam na binigo niya ang pamilya niya. Tumango si Celso. "Ganyan din ako noong nasunog yung bangka ko. Isang taon bago ako nakabalik." Doon unang naramdaman ni Lito na may iba palang dumaan din sa ganito, at may katapusan ito.',
          'Inaya siya ni Celso na tumulong sa bangka nito ilang umaga kada linggo, mag-ayos ng lambat at magtimon. Maliit ang kita. Pero napapabangon siya nito sa upuan nang alas-kuwatro, at nasa tubig na siya pagsikat ng araw. Sa unang pagkakataon makalipas ang ilang buwan, umuwi siyang pagod, pero masarap na pagod.',
          'Noong bata siya, binabanggit ng nanay niya ang Panaghoy 3:22-23 tuwing almusal. Doon sa tubig, pagsikat ng araw, saka niya naintindihan kung bakit gustong-gusto ito ng nanay niya.',
          'Isang Linggo ng gabi, isinulat nila ni Weng ang lahat sa isang papel: ang utang, ang pumapasok na pera, ang puwedeng ipagpaliban. Nang nakasulat na, mas maliit pala ito kaysa sa bersyon sa isip niya. Magkasama silang pumunta sa kooperatiba, humingi ng palugit sa utang, at pinagbigyan sila.',
        ],
      },
      {
        kind: 'helped',
        heading:
          'Paano magsimula ulit sa buhay kapag hindi mo kayang gawin lahat nang sabay',
        paragraphs: [
          'Hindi gumawa si Lito ng malaking plano. Gumawa siya ng maikling listahan, ang klaseng naiintindihan ng taong sanay sa banat-buto. Ayusin ang sampung metro ng pilapil ngayong linggo. Sumama kay Celso tatlong umaga. Mag-almusal kasama ang mga bata. Magdasal bago matulog, kahit isang pangungusap lang.',
          'May mga linggong nagawa niya lahat. May mga linggong isa lang. Tinuruan siya ni Weng na bilangin bilang panalo kahit isa lang ang nagawa niya.',
          'Bumalik din siya sa church. Pagkatapos ng service, hinawakan ng pastor ang balikat niya at sinabing, "Ipagdadasal ka namin." Noong sumunod na Sabado, may ilang lalaki mula sa church na dumating para tumulong sa pag-aayos ng isang bahagi ng pilapil.',
          'Nang hindi pa rin nawawala ang mga gabing hindi siya makatulog, pinilit siya ni Weng na bumalik sa health center, this time tungkol na sa pag-aalala at sa bigat ng loob. Nakinig ang doktor, nagtanong tungkol sa tulog at sa pag-inom niya, at ni-refer siya sa isang counselor na pumupunta sa bayan dalawang beses isang buwan. Pumunta si Lito para lang matuwa si Weng. Itinuloy niya dahil nakatulong.',
          'Pagdating ng sumunod na tag-araw, may laman na ulit ang bahagi ng palaisdaan. Mas maliit kaysa dati. Sabi ni Lito, ito ang pinakamagandang naitayo niya, kasi dalawang beses niya itong itinayo.',
        ],
        pullQuote:
          'Tinuruan siya ni Weng na bilangin bilang panalo kahit isa lang ang nagawa niya.',
      },
      {
        kind: 'hope',
        heading: 'Kung kailangan mo ring magsimula ulit',
        paragraphs: [
          'Baka iba ang naging baha mo: negosyong nagsara, relasyong natapos, isang taon na mas marami ang kinuha kaysa ibinigay. Kapag magsisimula ka ulit, parang kailangan mo munang maitayo ulit ang lahat bago ka payagang maging okay.',
          'Puwede kang magsimula nang mas maliit pa diyan. Pumili ng isang bagay na kaya mong gawin ngayong linggo, kasing-laki ng sampung metro ng pilapil. Sabihin sa isang tao ang totoo tungkol sa kalagayan mo. Isulat ang utang mo at ang meron ka, para nasa papel na lang ito at hindi na lumalaki sa isip mo.',
          'Kung higit dalawang linggo nang mabigat ang loob mo, o hindi ka na makatulog, makakain o makaraos sa araw-araw, kausapin ang doktor o counselor. Normal na hakbang iyan, at mas nakatulong pa ito kay Lito kaysa inaasahan niya.',
          'Kung gusto mo ng tulong para makapagsimula ngayon, libre ang [HopeBegins](/). Piliin kung ano ang nararamdaman mo at bibigyan ka nito ng isang maliit na bagay na masusubukan mo ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. Kung pakiramdam mo naliligaw ka, magandang simula ang [Hindi ko alam gagawin ko](/hindi-ko-alam-gagawin-ko-sa-buhay).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong linggo: magsimula sa sampung metro',
      steps: [
        'Isulat ang isang bagay na nawala sa iyo ngayong taon, at isang bagay na meron ka pa.',
        'Pumili ng isang gawain na matatapos mo ngayong linggo, sapat na maliit para siguradong gagawin mo.',
        'Sabihin sa isang tao kung kumusta ka talaga. Okay na ang text.',
        'Sa dulo ng linggo, bilangin ang nagawa mo, kahit isa lang.',
      ],
    },
    verse: 'lam-3-22-23',
    related: 'hindi-ko-alam-gagawin-ko-sa-buhay',
    faq: [
      {
        q: 'Paano magsimula ulit sa buhay pagkatapos mawala ang lahat?',
        a: 'Magsimula nang mas maliit kaysa inaakala mo. Pumili ng isang gawain para ngayong linggo, sabihin sa taong pinagkakatiwalaan mo kung kumusta ka talaga, at isulat ang mga problema mo para hindi na sila lumaki sa isip mo. Matagal ang pagbangon pagkatapos ng malaking kawalan, madalas higit isang taon.',
      },
      {
        q: 'Normal ba na pakiramdam mo talunan ka pagkatapos ng malaking kawalan?',
        a: 'Oo, maraming nakakaramdam niyan, lalo na ang mga sanay na sila ang nagbibigay para sa iba. Kung higit dalawang linggo na ito o nahihirapan ka nang matulog, kumain o magtrabaho, kausapin ang doktor o counselor.',
      },
    ],
    keywords: [
      'paano magsimula ulit sa buhay',
      'paano bumangon pagkatapos mawala ang lahat',
      'pakiramdam talunan',
      'paano mag-start over',
      'nawalan ng kabuhayan',
    ],
  },
  {
    slug: 'mental-health-ng-mga-tatay',
    lang: 'tl',
    pair: 'mens-mental-health-filipino-fathers',
    theme: 'low',
    metaTitle: 'Mental health ng mga lalaki at tatay: ang kuwento ni Ben',
    metaDescription:
      'Tatlumpung taong tahimik si Ben tungkol sa nararamdaman niya. Ano ang nangyari nang magtanong ang kaibigan niya, at bakit tahimik ang maraming lalaki.',
    title:
      'Si Ben ang nag-aayos ng makina ng lahat. Tapos may nagtanong kung kumusta siya.',
    dek: 'Tatlumpung taong tahimik at matatag si Ben, gaya ng turo ng tatay niya. Ito ang nagbago nang sa wakas ay nagsalita siya.',
    who: 'Ben, 52, mekaniko at tatay sa Pampanga',
    photo: {
      src: `${photos}/talk-street.jpg`,
      alt: 'Two men talking on a city street',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Matatag, tahimik, at ubos na',
        paragraphs: [
          'Halos tatlumpung taon nang may maliit na talyer si Ben sa San Fernando, Pampanga. Jeep, tricycle, paminsan-minsan owner-type jeep na ayaw ibenta ng lolo ng kung sino. Basta may makina, masasabi ni Ben kung ano ang sira sa tunog pa lang.',
          'Mekaniko rin ang tatay niya, at dalawang bagay ang itinuro nito sa kanya: paano pakinggan ang makina, at na hindi nagrereklamo ang lalaki. "Lalaki ka. Tiisin mo." Nang mamatay ang tatay niya, hindi umiyak si Ben sa lamay. Kinabukasan, balik trabaho na siya.',
          'Noong isang taon, nagsimulang magkalamat ang lahat. Lumipat sa Canada ang panganay niya. Nagkaroon ng health scare ang asawa niyang si Tess. Humina ang negosyo nang may magbukas na mas malaking shop sa may kanto. Wala siyang ikinuwento kahit isa. Lalo lang siyang tumahimik, at lalong umikli ang pasensya niya sa lahat.',
          'Apat na oras na lang ang tulog niya kada gabi. Ang dalawang bote ng beer pagkatapos ng trabaho, naging apat. Isang hapon, nasigawan niya ang apprentice niya dahil sa nahulog na liyabe, tapos naupo siya sa likod ng shop, hawak ang ulo, hindi alam kung bakit galit na galit siya.',
        ],
        pullQuote:
          'Lalo lang siyang tumahimik, at lalong umikli ang pasensya niya sa lahat.',
      },
      {
        kind: 'struggle',
        heading:
          'Bakit hindi nagkukuwento ng nararamdaman ang maraming lalaking Pilipino',
        paragraphs: [
          'Ni minsan, hindi naisip ni Ben na, "Baka depressed ako." Hindi ginagamit ng mga lalaking tulad niya ang salitang iyon. Akala niya pagod lang siya, o tumatanda na, o masyado lang sensitive ang pamilya niya.',
          'Ganyan din lumaki ang maraming lalaking Pilipino. Ikaw ang haligi ng tahanan, at ang haligi, hindi bumabaluktot. Ang humingi ng tulong, parang pag-amin na hindi mo na kayang buhatin ang bubong.',
          'Kaya lumalabas ang nararamdaman sa ibang paraan: bilang galit, isa pang round ng inuman, mas mahabang oras sa trabaho, o katahimikang pumupuno sa buong bahay. Sabi ni Tess kalaunan, parang ibang tao ang kasama niya sa bahay noon.',
          'Madalas, hinihintay ng mga lalaking nasa ganitong kalagayan na may masira muna. Malapit na doon si Ben.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ang tanong sa mesa',
        paragraphs: [
          'Tuwing Biyernes ng gabi, dumadaan sa shop ang kaibigan ni Ben na si Rudy pagkasara. Uupo sila sa folding table sa harap, may isang platong sisig, at magkukuwentuhan tungkol sa basketball. Noong Biyernes na iyon, hindi nagbukas ng usapang basketball si Rudy.',
          '"Pare, okay ka lang ba talaga? Iba ka na these days." Sabi ni Ben, okay lang siya. Hindi tumigil si Rudy. "Kasi ako, hindi ako okay last year. Nagpatingin ako. Akala ko mahina ako pag ginawa ko yun, pero nakatulong."',
          'Dalawampung taon nang kilala ni Ben si Rudy, at ni minsan hindi niya narinig na nagsalita ito nang ganoon. May lumuwag sa dibdib niya. Nagsimula siyang magkuwento, dahan-dahan muna. Tungkol sa anak niyang umalis. Tungkol kay Tess. Tungkol sa shop. Tungkol sa mga gabing gising siya, pakiramdam niya bigo siya sa nag-iisang trabahong meron siya.',
          'Nakinig lang si Rudy. Nang maubos na ang mga salita ni Ben, sabi ni Rudy, "Buti sinabi mo, pare. Tutulungan kita."',
        ],
        pullQuote: '"Pare, okay ka lang ba talaga? Iba ka na these days."',
      },
      {
        kind: 'helped',
        heading: 'Ano ang nakatulong kay Ben para bumalik siya sa dati',
        paragraphs: [
          'Noong sumunod na linggo, sinamahan siya ni Rudy sa health center. Reklamo nang reklamo si Ben buong biyahe. Tinanong siya ng doktor tungkol sa tulog niya, sa pag-inom niya at sa mood niya, at hindi niya pinaramdam kay Ben na mahina siya dahil doon. Sabi ng doktor, mukhang higit pa sa pagod ang ikinuwento niya. Ni-refer siya sa isang counselor at pinabawas ang beer, dahil pinapalala nito ang tulog niya.',
          'Tatlong beses pumunta si Ben sa counselor bago siya nagsalita nang marami. Pagdating ng ikaapat, ang tatay na niya ang pinag-uusapan nila.',
          'Sa bahay, may ginawa siyang mas mahirap. Umupo siya kasama si Tess at sinabing, "Pasensya na. Hindi ako okay nitong mga nakaraang buwan." Umiyak si Tess. Umiyak din siya, first time sa loob ng maraming taon. Tapos sabi ni Tess, "Salamat at sinabi mo," at parang gumaan ang buong bahay.',
          'Nagsimula ulit siyang magdasal, maikli at tapat, tuwing umaga bago buksan ang shop. Nakadikit na ngayon ang Awit 46:1 sa toolbox, katabi ng kalendaryo.',
          'Tuwing Biyernes, may sisig pa rin. Paminsan-minsan, si Ben na ang nagtatanong. "Pare, kumusta ka talaga?"',
        ],
      },
      {
        kind: 'hope',
        heading: 'Kung ikaw ang matatag sa pamilya ninyo',
        paragraphs: [
          'Kung lalaki ka at binabasa mo ito, baka may makita kang konting Ben sa sarili mo: ang mabilis na init ng ulo, ang dagdag na inom, ang mga gabing gising, ang pakiramdam na walang nakakakita sa hirap mo. Isa sa pinakamatatag na magagawa mo para sa pamilya mo ang magkuwento tungkol dito.',
          'Magsimula sa isang tao. Kaibigan, asawa mo, kapatid, pastor. Puwede mong sabihin gaya ng sinabi ni Ben: "Hindi ako okay nitong mga nakaraang buwan." Isang pangungusap lang iyan, pero doon nagsisimula ang usapan.',
          'Kung higit dalawang linggo ka nang mabigat ang loob, mainitin ang ulo o hindi makatulog, o mas umiinom ka para makaraos, kausapin ang doktor o counselor. Normal na hakbang iyan, parang pagdadala ng truck sa talyer kapag may kakaiba nang tunog.',
          'Kung may lalaki sa buhay mo na inaalala mo, maging Rudy ka para sa kanya. Umupo, magtanong nang dalawang beses, at makinig.',
          'Kung gusto mong magsimula sa pribadong paraan, libre ang [HopeBegins](/). Piliin kung ano ang nararamdaman mo at bibigyan ka nito ng isang maliit na bagay na masusubukan mo ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. Kung parang kuwento mo ang kuwento ni Ben, magandang simula ang [Depressed ako](/depressed-ako).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong linggo: magtanong, o sumagot, nang totoo',
      steps: [
        'Mag-isip ng isang lalaki sa buhay mo na parang mas tahimik o mas mainitin ang ulo lately.',
        'Samahan siya sa pagkain o kape at itanong, "Kumusta ka talaga?" Tapos itanong ulit.',
        'Kung ikaw ang nahihirapan, magsabi ng isang totoong pangungusap sa taong pinagkakatiwalaan mo.',
        'Pansinin ang pag-inom mo ngayong linggo. Kung dumami, bawasan, at sabihin sa isang tao.',
      ],
    },
    verse: 'psa-46-1',
    related: 'depressed-ako',
    faq: [
      {
        q: 'Bakit hindi nagkukuwento ng nararamdaman ang mga lalaking Pilipino?',
        a: 'Marami ang lumaking sinasabihang maging matatag at tumahimik bilang haligi ng tahanan. Kaya madalas lumalabas ang stress bilang galit, pag-inom o sobrang trabaho. Magandang unang hakbang ang magkuwento sa isang taong pinagkakatiwalaan mo.',
      },
      {
        q: 'Ano ang mga senyales ng depression sa lalaki?',
        a: 'May mga lalaking nagpapakita ng bigat ng loob bilang pagkainis, galit, mas madalas na pag-inom, sobrang pagtatrabaho, kulang na tulog o paglayo sa pamilya. Kung higit dalawang linggo na ito, kausapin ang doktor o counselor.',
      },
    ],
    keywords: [
      'mental health ng lalaki',
      'depression sa lalaki',
      'mental health ng tatay',
      'haligi ng tahanan mental health',
      'bakit tahimik ang mga lalaki',
    ],
  },
  {
    slug: 'takot-pagkatapos-ng-bagyo',
    lang: 'tl',
    pair: 'anxiety-after-a-typhoon',
    theme: 'anxiety',
    metaTitle: 'Takot pagkatapos ng bagyo: ang kuwento ni Nena',
    metaDescription:
      'Ilang buwan matapos ang baha, kumakabog pa rin ang dibdib ni Nena tuwing malakas ang ulan. Paano gumaan ang takot niya at ng mga anak niya.',
    title:
      'Kapag kinakabahan ka pa rin sa ulan: ang takot ni Nena pagkatapos ng bagyo',
    dek: 'Dalawang araw lang bago humupa ang baha, pero ilang buwang hindi nawala ang takot niya. Ito ang nakatulong para maging panatag ulit sa ulan si Nena at ang mga anak niya.',
    who: 'Nena, 47, may-ari ng sari-sari store sa Marikina',
    photo: {
      src: '/assets/images/stories/flood-malabon.jpg',
      alt: 'A vendor in a flooded street in Malabon, Metro Manila',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Ang gabing pumasok ang ilog',
        paragraphs: [
          'Labinlimang taon nang may sari-sari store si Nena sa harap ng bahay nila sa Marikina. Kilala niya ang ilog. Kilala ito ng lahat sa kalye nila. Kapag tumunog ang sirena at tumaas ang tubig, iaakyat mo na ang mga gamit.',
          'Noong gabing iyon, mas mabilis tumaas ang tubig kaysa inaasahan ng lahat. Pagdating ng alas-dos ng madaling-araw, hanggang tuhod na ito sa loob ng bahay. Pagdating ng alas-kuwatro, nasa ikalawang baitang na ng hagdan. Nakaupo si Nena sa pinakataas na baitang kasama ang dalawang anak niya, sina Jopet at Aira, may hawak na flashlight, pinapakinggan ang mga estante ng tindahan na nagbabanggaan sa ibaba.',
          'Ligtas sila. Humupa ang tubig pagkalipas ng dalawang araw. Sa tulong ng mga kapitbahay at ng church nila, nalimas nila ang putik, itinapon ang mga nasira, at nabuksan ulit ang tindahan makalipas ang isang buwan.',
          'Sabi ng lahat, swerte siya, at naniwala siya. Kaya hindi niya maintindihan kung bakit, ilang buwan pagkatapos, nanginginig ang kamay niya sa tunog lang ng ulan sa bubong.',
        ],
        pullQuote: 'Sabi ng lahat, swerte siya, at naniwala siya.',
      },
      {
        kind: 'struggle',
        heading:
          'Bakit puwedeng manatili ang anxiety matagal pagkatapos ng bagyo',
        paragraphs: [
          'Tuwing may dumarating na makapal na ulap, naninikip ang dibdib ni Nena. Kapag malakas ang ulan, hindi siya mapakali. Tinitingnan niya ang water level ng ilog sa phone kada sampung minuto, buong gabi. May nakahandang bag sa may pinto, kahit tag-araw.',
          'Naka-alerto pa rin ang katawan niya mula noong gabing iyon. Nangyayari iyan pagkatapos ng nakakatakot na pangyayari, lalo na kung puwede itong maulit. Sa tunog ng ulan, nagre-react ang takot na parang nasa hagdan ulit siya at tumataas ang tubig.',
          'Ramdam din ito ng mga bata. Si Aira, siyam na taon, nagsimulang matulog sa kama ni Nena tuwing umuulan. Si Jopet, labintatlo, nagagalit at ayaw itong pag-usapan. Nakonsensya si Nena. Siya dapat ang kalmado.',
          'Pakiramdam din niya wala siyang karapatang matakot. May mga pamilya sa kalye nila na mas malaki ang nawala. "Buti nga kami, buhay," paulit-ulit niyang sinasabi, at itinatago ang takot. Bumabalik ito sa bawat storm warning.',
        ],
      },
      {
        kind: 'helped',
        heading:
          'Ano ang nakatulong kay Nena sa takot niya sa ulan pagkatapos ng baha',
        paragraphs: [
          'Ang unang nakatulong: isang plano. Umupo kasama niya ang kumare niyang si Ate Lorna at isinulat nila kung ano mismo ang gagawin kapag tumaas ulit ang tubig: kailan iaakyat ang mga gamit, saan pupunta, sino ang tatawagan, ano ang laman ng go-bag. Idinikit nila ang listahan sa ref. Kapag umuulan, titingnan lang ito ni Nena at alam niyang handa siya.',
          'Ang pangalawa: limitahan ang pag-check. Kapag may bagyo, isang beses kada oras lang niya tinitingnan ang water level, at iniiwan ang phone sa kusina sa pagitan. Mahirap ang unang gabi. Pagdating ng ikatlong bagyo, mas madali na.',
          'Ang pangatlo: paghinga kasama ang mga bata. Kapag lumakas ang ulan, uupo silang tatlo at hihinga nang papasok nang 4 at palabas nang 6, nagbibilang nang malakas. Gusto ni Aira ang pagbibilang. Umiirap si Jopet, pero ginagawa rin naman niya.',
          'Hinayaan niyang magkuwento ang mga bata tungkol sa gabing iyon. Sa hapunan, tinanong niya, "Ano yung pinaka-naaalala ninyo?" Ang flashlight ang naaalala ni Aira. Si Jopet, natakot daw siyang baka masaktan ang nanay niya. Sinabi ni Nena na takot din siya noon, at magkakasama nilang nalampasan iyon. Nang mapag-usapan nila ito, lumiit ang takot para sa kanilang tatlo.',
          'Dumaan ang pastor nila at nagdasal kasama nila bago ang susunod na tag-ulan. Idinikit nila ang Isaias 41:10 sa pader sa may hagdan, sa mismong baitang kung saan huminto ang tubig.',
          'Nang malakas pa rin ang takot makalipas ang ilang buwan, kinausap ni Nena ang doktor sa health center. Sabi ng doktor, karaniwan ang nararamdaman niya pagkatapos ng sakuna, at ni-refer siya sa isang counselor na tumulong sa kanya at kay Jopet.',
        ],
        pullQuote:
          'Nang mapag-usapan nila ito, lumiit ang takot para sa kanilang tatlo.',
      },
      {
        kind: 'hope',
        heading: 'Kung kinakabahan ka pa rin sa ulan',
        paragraphs: [
          'Kung dumaan ka sa baha, bagyo o lindol, natural lang na nagre-react ang katawan mo kapag dumidilim ang langit. Sinusubukan kang protektahan ng takot mo. Hindi pa lang nito nare-realize na ibang araw na ngayon.',
          'Magsimula sa kaya mong kontrolin. Gumawa ng family plan at idikit ito kung saan makikita ng lahat. Mag-impake ng go-bag minsan, tapos hayaan na. Mag-set ng oras ng pag-check ng balita kapag may bagyo. Huminga nang papasok nang 4 at palabas nang 6, kasama ang mga anak mo kung natatakot din sila.',
          'Kung malakas pa rin ang takot ilang linggo pagkatapos ng sakuna, kung hindi ka makatulog, paulit-ulit mong naaalala ang gabing iyon na parang nangyayari ulit, o umiiwas kang lumabas kapag umuulan, kausapin ang doktor o counselor. Normal na hakbang iyan, at nakakatulong ito sa mga bata at sa matatanda.',
          'Kung gusto mo ng tulong ngayon, libre ang [HopeBegins](/). Piliin kung ano ang nararamdaman mo at bibigyan ka nito ng isang maliit na bagay na masusubukan mo ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. May breathing exercise sa [Paano mawala ang anxiety](/paano-mawala-ang-anxiety) na puwede ninyong gawin bilang pamilya kapag lumalakas ang ulan.',
        ],
      },
    ],
    tryThis: {
      title: 'Bago ang susunod na bagyo: 15-minutong family plan',
      steps: [
        'Umupo kasama ang pamilya at isulat kung kailan iaakyat ang mga gamit, saan pupunta at sino ang tatawagan.',
        'Mag-impake ng isang go-bag at ilagay ito sa iisang lugar. Tingnan ito minsan isang buwan.',
        'Idikit ang plano sa ref kung saan makikita ng lahat.',
        'Magkasundo sa oras ng pag-check kapag may bagyo, halimbawa minsan kada oras, at ilayo ang phone sa pagitan.',
        'Mag-practice ng paghinga nang magkakasama: papasok nang 4, palabas nang 6.',
      ],
    },
    verse: 'isa-41-10',
    related: 'paano-mawala-ang-anxiety',
    faq: [
      {
        q: 'Normal ba ang anxiety pagkatapos ng bagyo o baha?',
        a: 'Oo. Pagkatapos ng nakakatakot na pangyayari, maraming natatakot kapag umuulan, nahihirapang matulog o paulit-ulit na tumitingin ng balita. Kung malakas pa rin ito pagkalipas ng ilang linggo o nakakaabala na sa araw-araw, kausapin ang doktor o counselor.',
      },
      {
        q: 'Paano ko matutulungan ang mga anak kong takot sa ulan pagkatapos ng baha?',
        a: 'Manatiling kalmado kasama nila, hayaan silang magkuwento tungkol sa naaalala nila, gumawa ng family plan nang magkakasama at mag-practice ng mabagal na paghinga bilang pamilya. Kung ilang linggo na ang takot nila, kausapin ang doktor nila o isang counselor.',
      },
    ],
    keywords: [
      'takot sa ulan pagkatapos ng baha',
      'anxiety pagkatapos ng bagyo',
      'trauma sa baha',
      'takot sa bagyo',
      'paano tulungan ang bata pagkatapos ng bagyo',
    ],
  },
  {
    slug: 'gusto-ko-nang-sumuko',
    lang: 'tl',
    pair: 'when-you-feel-like-giving-up',
    theme: 'low',
    metaTitle: 'Gusto ko nang sumuko: ang kuwento ng pag-asa ni Nico',
    metaDescription:
      'Umabot si Nico sa puntong ayaw na niyang gumising. Ang gabing nagsabi siya sa kuya niya, ang tawag na nakatulong, at ang unti-unting pagbalik ng pag-asa niya.',
    title:
      'Kapag gusto mo nang sumuko: ang gabing nagsabi si Nico sa kuya niya',
    dek: 'Ilang buwang nakangiti si Nico sa trabaho at gumuguho pag-uwi. Ang pagsasabi ng totoo sa isang tao ang naging simula ng pagbabago.',
    who: 'Nico, 30, team lead sa Manila',
    photo: {
      src: '/assets/images/hero/manila-dawn.jpg',
      alt: 'Manila at dawn',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Okay sa trabaho, ubos pag-uwi',
        paragraphs: [
          'Team lead si Nico sa isang call center sa Manila. Gusto siya ng team niya. Naaalala niya ang birthday ng lahat, sumasalo siya ng shift, at laging may biro kapag mabigat ang gabi. Walang makakahula kung ano ang nararamdaman niya pag-uwi.',
          'Unti-unti itong dumating sa loob ng isang taon. Isang breakup. Ang pagkakasakit ng tatay niya sa probinsya. Isang promotion na may kasamang mas mahabang oras at mas kaunting tulog. Tumigil siyang pumunta sa Sunday lunch sa bahay ng kuya niya. Tumigil siyang sumagot sa group chat. Uuwi siya ng alas-siyete ng umaga, isasara ang kurtina at hihiga kasama ang phone, sobrang pagod para makatulog at sobrang pagod para bumangon.',
          'Sa gitna ng mga buwang iyon, may naiisip siyang paulit-ulit na bumabalik: ayaw na niyang gumising. Gusto na niyang tumigil ang lahat.',
          'Natakot siya rito. Wala siyang pinagsabihan, kasi hindi niya alam kung paano sasabihin, at kasi siya ang sinasandalan ng iba.',
        ],
      },
      {
        kind: 'struggle',
        heading: 'Bakit ang hirap magsabi kahit kanino',
        paragraphs: [
          'Sigurado si Nico na lalala lang ang lahat kapag sinabi niya, o magiging pabigat siya, o matatakot ang pamilya niya. Sinasabi rin niya sa sarili na may ibang tao na may totoong problema. May trabaho siya, may bubong. Anong karapatan niyang maramdaman ito?',
          'Karaniwan ang ganitong pag-iisip sa madilim na panahon. Kayang ipakita ng sakit na parang wala nang daan ang bukas, at kumbinsihin kang walang makakaintindi. Puwedeng pakiramdam mo totoo ang mga naiisip na iyan. Senyales sila na nasasaktan ka at kailangan mo ng tulong, at puwede silang magbago.',
          'Kaya tuloy lang si Nico sa trabaho, tuloy sa pagngiti, tuloy sa pagsabi ng "Okay lang" kapag may nagtatanong. Bawat araw, mas inuubos siya ng pagngiting iyon.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Ang gabing nagsabi siya sa kuya niya',
        paragraphs: [
          'Isang Sabado ng gabi, nag-text ang kuya niyang si Paul: "Lunch bukas? Miss ka na ni Mama." Nagsimulang mag-type si Nico ng palusot. Tapos, sa dahilang hanggang ngayon hindi niya maipaliwanag nang buo, ang totoo ang na-type niya. "Kuya, hindi ako okay. Minsan ayoko nang gumising."',
          'Wala pang isang minuto, tumawag si Paul. Hindi siya nag-sermon. Kalmado siyang nagtanong, "Naiisip mo bang tapusin ang buhay mo?" Sabi ni Nico, minsan, oo. Sabi ni Paul, "Salamat at sinabi mo. Pupunta ako diyan."',
          'Nasa phone si Paul buong biyahe papunta. Pagdating niya, magkatabi silang umupo sa kama ni Nico at tumawag sa NCMH Crisis Hotline sa 1553. Isang kalmadong boses ang nakinig, nagtanong, at tumulong sa kanilang pag-isipan ang mga susunod na gagawin, simula sa gabing iyon at sa kinaumagahan.',
          'Doon natulog si Paul. Kinaumagahan, nagtimpla siya ng kape, at pinag-usapan nila kung paano maghahanap ng doktor.',
        ],
        pullQuote:
          'Tapos, sa dahilang hanggang ngayon hindi niya maipaliwanag nang buo, ang totoo ang na-type niya.',
      },
      {
        kind: 'helped',
        heading: 'Ano ang nakatulong kay Nico na makakita ulit ng pag-asa',
        paragraphs: [
          'Matagal ang paggaling, at may taas at baba. Nagsimula ito sa isang doktor na nakinig sa lahat at sinimulan siya sa treatment. Tapos isang counselor, isang beses kada linggo, na tumulong sa kanyang himayin ang taong pinagdaanan niya at hanapan ng salita ang nararamdaman niya.',
          'Gumawa ng ilang simpleng pangako ang pamilya niya. Magte-text si Paul tuwing umaga, kahit thumbs up lang. Tatawag ang mama niya tuwing Miyerkules. Pumayag si Nico na magsabi sa isa sa kanila tuwing babalik ang madidilim na naiisip. Bumalik nga ang mga ito nang ilang beses. Sa bawat pagsabi niya, mas gumagaan.',
          'Bumalik siya sa Sunday lunch, at makalipas ang ilang linggo, sa church kasama ang pamilya niya. Wala siyang masyadong naramdaman noong una. Pumunta pa rin siya. Isang Linggo, binasa ng pastor ang Awit 23:4, at iba ang dating nito kay Nico. Napunta na siya sa libis na iyon. Naglalakad pa rin siya, at may kasama siya.',
          'Sa trabaho, kinausap niya ang HR tungkol sa oras niya at lumipat siya sa day shift. Nakakatulog na ulit siya sa gabi, kadalasan.',
          'Makalipas ang isang taon, sabi ni Nico, lampas na siya sa pinakamabigat. May mahihirap na araw pa rin siya. Ngayon, alam na niya ang gagawin: magsabi sa isang tao, magpahinga, at pumunta sa susunod na appointment.',
        ],
        pullQuote:
          'Napunta na siya sa libis na iyon. Naglalakad pa rin siya, at may kasama siya.',
      },
      {
        kind: 'hope',
        heading: 'Kung gusto mo nang sumuko ngayon',
        paragraphs: [
          'Kung binabasa mo ito dahil ganito rin ang nararamdaman mo, salamat at nandito ka pa. Totoo ang sakit na nararamdaman mo, at totoo rin ang tulong.',
          'Magsabi sa isang tao ngayong gabi. Kapatid, kaibigan, magulang, pastor. Puwede mong gamitin ang mga salita ni Nico: "Hindi ako okay." Kung parang imposibleng sabihin, i-type mo.',
          'Kung naiisip mong tapusin ang buhay mo, tumawag sa NCMH Crisis Hotline, 24/7: 1553 o 0917 899 8727. Kung nasa panganib ka ngayon, tumawag sa 911.',
          'Kung higit dalawang linggo ka nang mabigat ang loob o parang ubos, kausapin ang doktor o counselor. Normal na hakbang iyan, at nakakatulong ang treatment.',
          'Kung gusto mo ng dagdag na suporta ngayon, libre ang [HopeBegins](/). Piliin kung ano ang nararamdaman mo at bibigyan ka nito ng isang maliit na bagay na masusubukan mo ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. May iba pang puwedeng gawin sa [Depressed ako](/depressed-ako).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayong gabi: magsabi sa isang tao',
      steps: [
        'Pumili ng isang taong pinagkakatiwalaan mo: kapatid, kaibigan, magulang o pastor.',
        'Magpadala ng isang tapat na linya: "Hindi ako okay. Puwede ba tayong mag-usap?"',
        'Kung wala kang makausap, tumawag sa NCMH Crisis Hotline sa 1553. Bukas ito 24/7.',
        'Bukas, hilingin sa taong iyon na tulungan kang magpa-schedule sa doktor o counselor.',
      ],
    },
    verse: 'psa-23-4',
    related: 'depressed-ako',
    faq: [
      {
        q: 'Ano ang gagawin kapag gusto mo nang sumuko?',
        a: 'Magsabi ngayon din sa isang taong pinagkakatiwalaan mo kung ano talaga ang nararamdaman mo. Kung naiisip mong tapusin ang buhay mo, tumawag sa NCMH Crisis Hotline sa 1553 o 0917 899 8727, bukas 24/7, o sa 911 kung nasa panganib ka ngayon. Pagkatapos, magpatingin sa doktor o counselor.',
      },
      {
        q: 'Paano ko sasabihin sa pamilya ko na hindi ako okay?',
        a: 'Gawing maikli at totoo, gaya ng "Hindi ako okay. Puwede ba tayong mag-usap?" Okay lang mag-text kung mahirap sabihin nang harapan. Karamihan ng pamilya, mas gugustuhing malaman.',
      },
    ],
    keywords: [
      'gusto ko nang sumuko',
      'ayoko nang gumising',
      'pagod na ako sa buhay',
      'paano sabihin sa pamilya na hindi ako okay',
      'NCMH crisis hotline 1553',
    ],
  },
  {
    slug: 'paano-magdasal-kapag-walang-masabi',
    lang: 'tl',
    pair: 'how-to-pray-when-you-cant-find-the-words',
    theme: 'faith',
    metaTitle: 'Paano magdasal kapag anxious: ang tapat na dasal ni Hannah',
    metaDescription:
      'Sobrang anxious at pagod si Hannah para magdasal. Paano nakatulong ang maiikling dasal sa jeep papuntang trabaho, at paano magdasal kapag wala kang masabi.',
    title: 'Paano magdasal kapag wala kang masabi',
    dek: 'Sobrang balisa at pagod si Hannah para sa mahahabang dasal. Natuto siyang magdasal nang tig-iisang pangungusap, sa jeep, papunta sa trabaho.',
    who: 'Hannah, 33, bank teller at nanay ng dalawa sa Cavite',
    photo: {
      src: '/assets/images/stories/praying-city.jpg',
      alt: 'A woman praying with her eyes closed on a city street',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'Sobrang pagod para magdasal',
        paragraphs: [
          'Bank teller si Hannah sa Imus, Cavite. Karera ang umaga niya: gisingin ang dalawang anak, mag-impake ng baon, mamalantsa ng uniform, tapos sakay ng jeep para makarating sa trabaho bago mag-alas-otso. Lumaki siya sa church at dati gabi-gabi siyang nagdadasal, nakaluhod sa tabi ng kama gaya ng turo ng nanay niya.',
          'Noong isang taon, napaaga ang tapos ng kontrata ng asawa niya abroad at humigpit ang pera. Paulit-ulit na nagkakasakit ang bunso niya nang ilang buwan. Nagsimulang magising si Hannah ng alas-tres ng madaling-araw, kumakabog ang dibdib, nagkukuwenta sa isip.',
          'Sinubukan niyang magdasal gaya ng dati. Pipikit siya, at dadagsa ang mga alalahanin bago pa niya matapos ang unang pangungusap. Uulit siya, mawawala sa iniisip, at makakatulog nang guilty. Pagkalipas ng ilang linggo, tumigil na siyang sumubok.',
          '"Parang ang layo ko na kay Lord," sabi niya sa kaibigan niyang si Joan sa trabaho. "Hindi na ako makapag-pray nang maayos."',
        ],
        pullQuote:
          'Pipikit siya, at dadagsa ang mga alalahanin bago pa niya matapos ang unang pangungusap.',
      },
      {
        kind: 'struggle',
        heading: 'Bakit ang hirap magdasal kapag anxious ka',
        paragraphs: [
          'Pinupuno ng anxiety ng ingay ang bawat tahimik na sandali. Kapag umupo ka nang tahimik para magdasal, parang pinapapasok mo ang lahat ng alalahanin nang sabay-sabay. Kaya maraming mahilig magdasal ang biglang hindi makapagdasal kapag balisa sila.',
          'Naniniwala rin si Hannah na may tamang paraan ng pagdarasal: mahaba, maayos ang pagkakasunod, tama ang mga salita. Kapag hindi niya magawa nang ganoon, pakiramdam niya hindi siya nagdadasal.',
          'Tapos dumating ang guilt. Ang mabuting Kristiyano, dapat kayang magdasal, isip niya. Kung hindi niya kaya, baka may mali sa pananampalataya niya. Naging isa pang dahilan ang guilt para gising siya ng alas-tres.',
          'Wala siyang pinagsabihan sa church. Parang siguradong-sigurado sa Diyos ang lahat doon. Nakangiti siya buong Sunday service, kinakanta ang bawat kanta, at umuuwing mas malayo ang pakiramdam niya sa Diyos kaysa dati.',
        ],
      },
      {
        kind: 'helped',
        heading: 'Paano natutong magdasal si Hannah kahit anxious',
        paragraphs: [
          'Hindi nakipagtalo si Joan. Sabi niya, "Ako, minsan isang sentence lang. \'Lord, tulong.\' Puwede na yun."',
          'Kinaumagahan, sa jeep, sinubukan ito ni Hannah. Naiipit sa pagitan ng isang estudyante at isang lalaking may dalang sako ng bigas, tumingin siya sa bintana at sinabi sa isip, "Lord, natatakot ako sa pera. Tulungan Mo ako ngayon." Iyon na ang buong dasal. Limang segundo lang.',
          'Ginawa niya ulit pauwi. "Lord, salamat kasi okay ang araw." At ulit nang alas-tres ng madaling-araw: "Lord, hawakan Mo ako."',
          'Sa mga sumunod na linggo, naging prayer room niya ang jeep. Nagsimula siyang magdasal para sa mga nakikita niya: ang mga batang naka-uniform, ang driver, ang babaeng tahimik na umiiyak sa likod. Maiikli at tapat ang mga dasal niya, at sa unang pagkakataon makalipas ang ilang buwan, pakiramdam niya kanya ang mga ito.',
        ],
        pullQuote:
          'Sa mga sumunod na linggo, naging prayer room niya ang jeep.',
      },
      {
        kind: 'helped',
        heading: 'Ano pa ang nakatulong kay Hannah sa anxiety niya',
        paragraphs: [
          'Nagtanong si Joan kung puwede niyang ipagdasal si Hannah. Tuwing Lunes, nagte-text siya: "Prayed for you today. Kumusta si bunso?" Gumagaan ang loob ni Hannah dahil alam niyang may ibang nagdadasal para sa kanya, lalo na sa mga araw na kaunti lang ang kaya niyang idasal.',
          'Isinulat ni Hannah ang Filipos 4:6-7 sa isang card at itinago sa wallet, sa likod ng ID niya. Binabasa niya ito habang naghihintay ng jeep. May mga araw na ito lang ang dasal na kaya niya, at sapat na iyon.',
          'Hinarap din niya ang mismong mga alalahanin. Gumawa sila ng asawa niya ng simpleng budget. Sinabi niya sa supervisor niya na may sakit ang bunso, at nakaayos sila ng schedule para madala niya ito sa checkup. Nang hindi pa rin tumitigil ang kabog ng dibdib tuwing alas-tres pagkalipas ng isang buwan, nagpatingin siya sa doktor, na nag-check sa kalusugan niya, kinausap siya tungkol sa anxiety, at sinabihan siyang magpatingin sa counselor.',
          'Nandoon pa rin ang mga problema niya. Ngayon, may lugar na siyang mapaglalagyan ng mga ito, tuwing umaga, papunta sa trabaho.',
        ],
      },
      {
        kind: 'hope',
        heading: 'Kung wala kang masabi sa pagdarasal',
        paragraphs: [
          'Kung dati madali kang magdasal at ngayon hindi mo na magawa, walang mali sa pananampalataya mo. Pinapahirap ng anxiety ang manahimik. Naririnig ng Diyos ang maiikling dasal, ang pagod na dasal, at ang dasal na buntong-hininga lang.',
          'Subukan ang isang pangungusap ngayon. Sabihin mo sa jeep, sa CR, habang nagsasaing. "Lord, tulong." "Lord, salamat." "Lord, natatakot ako." Totoong dasal ang bawat isa diyan.',
          'Hayaan mo ring may magdasal para sa iyo. Sa [Prayers](/prayers), puwede kang magpadala ng prayer request, at may magdarasal para sa iyo.',
          'Kung higit dalawang linggo ka nang ginigising ng anxiety sa gabi, o nakakaabala na ito sa araw mo, kausapin ang doktor o counselor. Magkasama ang pananampalataya at ang maayos na gamutan.',
          'Kung gusto mo ng dagdag na suporta, libre ang [HopeBegins](/). Piliin kung ano ang nararamdaman mo at bibigyan ka nito ng isang maliit na bagay na masusubukan mo ngayong araw. May mga calming tool din, may magdarasal para sa iyo, at may e-coach na puwede mong i-message sa Messenger. Para sa mga verse na puwede mong baunin, tingnan ang [Bible verse para sa anxiety](/bible-verse-para-sa-anxiety).',
        ],
      },
    ],
    tryThis: {
      title: 'Ngayon: tatlong dasal na tig-iisang pangungusap',
      steps: [
        'Papunta sa trabaho o eskwela, magdasal ng isang pangungusap tungkol sa pinakamalaking alalahanin mo.',
        'Sa tanghalian, magdasal ng isang pangungusap ng pasasalamat para sa isang maliit na bagay.',
        'Bago matulog, magdasal ng isang pangungusap na humihingi ng pahinga.',
        'Hilingin sa isang kaibigan na ipagdasal ka ngayong linggo, at sabihin kung para saan.',
      ],
    },
    verse: 'php-4-6-7',
    related: 'bible-verse-para-sa-anxiety',
    faq: [
      {
        q: 'Paano magdasal kapag anxious ka?',
        a: 'Gawing maikli at tapat. Totoong dasal na ang isang pangungusap tulad ng "Lord, natatakot ako, tulungan Mo ako ngayon. Magdasal sa maliliit na sandali sa buong araw, at hilingin din sa isang kaibigan na ipagdasal ka.',
      },
      {
        q: 'Senyales ba ng mahinang pananampalataya kung hindi ako makapagdasal?',
        a: 'Hindi. Pinapahirap ng anxiety ang manahimik, at maraming taong matibay ang pananampalataya ang dumadaan sa panahong mahirap magdasal. Bilang ang maiikling dasal, at pati ang pagpapadasal sa iba.',
      },
    ],
    keywords: [
      'paano magdasal kapag anxious',
      'dasal para sa anxiety',
      'maikling dasal',
      'hindi makapagdasal',
      'Christian anxiety Tagalog',
    ],
  },
  {
    slug: 'how-to-get-back-up-again',
    lang: 'en',
    pair: 'paano-bumangon-ulit',
    theme: 'new-start',
    metaTitle: "How to get back up again: Lia's story in Baguio",
    metaDescription:
      'For months Lia felt stuck, with no motivation and no direction. How she got back up again, one small thing each morning, and how you can start too.',
    title: 'How to get back up again: one small thing every morning',
    dek: "For months, Lia's life felt like it was on pause. Her way back started with one cup of coffee, every morning.",
    who: 'Lia, 27, barista in Baguio',
    photo: {
      src: `${photos}/morning-baguio.jpg`,
      alt: 'A cup of coffee held up over the mountains',
    },
    published: '2026-10-23',
    parts: [
      {
        kind: 'story',
        heading: 'The months that felt like a pause',
        paragraphs: [
          'Lia is a barista at a small coffee shop on Session Road in Baguio. She used to be the first one in. She would open the shop, set up the espresso machine and greet the regulars by name.',
          'Then came the year when everything happened at once. Her best friend moved to Manila. The shop closed for three months for renovation. Her savings ran out. When the shop reopened she went back to work, and she felt like a different person.',
          'She woke up at nine, late. Coffee was breakfast. After her shift she went straight to bed and scrolled until the early hours. On weekends she stopped going out. "Pagod lang ako," she told her mother on a video call. She knew it was more than that.',
          'Some days she felt sad. More often she felt nothing at all. No motivation, no direction, her life on pause while the world outside kept moving.',
        ],
        pullQuote:
          'No motivation, no direction, her life on pause while the world outside kept moving.',
      },
      {
        kind: 'struggle',
        heading: "Why it's so hard to get back up again",
        paragraphs: [
          'The hardest part for Lia was that she knew everything she should do. Exercise. Sleep early. Save again. Call her friends. Go to church. Apply for a better job. When she looked at the whole list she felt overwhelmed, and she ended up doing none of it.',
          'Then she blamed herself. "Ang tamad ko." "I\'ve wasted so much time." Every day that nothing happened made the next one heavier.',
          "She was embarrassed to talk about it, too. On social media everyone she knew seemed fine: new jobs, new homes, trips abroad. She still couldn't get out of bed.",
          'This is common when you have been stuck for a long time. When your mind is tired, even a small step looks like a mountain. And if you wait for motivation to come back before you move, you can wait a long time. Often we move first, and the motivation follows.',
        ],
        pullQuote: 'Often we move first, and the motivation follows.',
      },
      {
        kind: 'helped',
        heading: 'How Lia got back up again: one small thing',
        paragraphs: [
          'Tita Baby, who owns the shop, was the first to notice. One afternoon while they were cleaning up, she asked, "Anak, okay ka lang ba talaga? Parang ang layo mo lately." Lia cried at the sink. It was the first time she admitted she wasn\'t okay.',
          'Tita Baby just nodded, then asked: "One small thing tomorrow. Just one. What is it?"',
          'Lia thought about it. She used to love Baguio mornings, the cold and the fog. So that is what she chose: wake up at seven, make coffee, and drink it outside the boarding house while looking at the mountains. No phone. Just ten minutes.',
          'The next day, she did it. It was cold and she was still sleepy, and there she was outside, holding her yellow mug, watching the fog lift slowly off the pine trees. It was simple, and she had already done something by seven in the morning.',
        ],
      },
      {
        kind: 'helped',
        heading: 'The small steps that came next',
        paragraphs: [
          'After a week of morning coffee, she added one more thing: walking to work instead of taking the jeepney, fifteen minutes through Burnham Park. Two weeks later, another: calling her best friend every Sunday night.',
          'Some days she did none of it. She learned to stop counting those days as failures. Tomorrow, coffee again.',
          'She went back to church too, to a small group of young professionals. At first she only listened. One night someone shared about Isaiah 40:31, and Lia decided it was fine to walk for a while before she tried to run.',
          'When she noticed her heart still felt heavy for weeks even with the small progress, she went to the health center for a checkup. The doctor referred her to a counselor. That is where she learned to be kinder to herself.',
          'Now, six months later, Lia is the first one at the shop again. She still has hard days. Every morning there is a yellow mug, a mountain, and one small thing already done before the day begins.',
        ],
        pullQuote:
          'She learned to stop counting those days as failures. Tomorrow, coffee again.',
      },
      {
        kind: 'hope',
        heading: 'If you want to get back up again too',
        paragraphs: [
          'If you feel stuck right now, with no motivation and no idea where to start, aim for just one thing this week.',
          'Pick one small thing for tomorrow morning. Coffee outside. A five-minute walk. A text to a friend. Do it, and count it as a win. We move first, and the motivation follows.',
          "Some days you won't manage even one. That is okay. Try again tomorrow. One heavy day doesn't erase your progress.",
          'If you have had no motivation or a heavy heart for more than two weeks, or it is getting hard to get through the day, talk to a doctor or counselor. That is a normal next step, and it helps.',
          "If you want help today, [HopeBegins](/) is free. Pick how you feel and you get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message on Messenger. If you don't know where you are headed, read [I feel lost](/i-feel-lost).",
        ],
      },
    ],
    tryThis: {
      title: 'Tomorrow morning: one small thing',
      steps: [
        'Tonight, pick one small thing you will do tomorrow morning.',
        'Make it really small: ten minutes or less.',
        "Tomorrow, do it, even if you are sleepy or don't feel like it.",
        'Write in your phone or notebook: "I did it." Then do it again the next day.',
      ],
    },
    verse: 'isa-40-31',
    related: 'i-feel-lost',
    faq: [
      {
        q: 'How do I get back up again when I have no motivation?',
        a: 'Start with one small thing each day, like coffee outside or a short walk, and do it before the motivation comes back. Usually we move first and the motivation follows. If it has lasted more than two weeks, talk to a doctor or counselor.',
      },
      {
        q: 'Is it normal to feel stuck in life?',
        a: 'Yes, many people go through it, especially after a run of hard events. It is no sign of laziness. Small steps and one person to talk to usually help.',
      },
    ],
    keywords: [
      'how to get back up again',
      'how to get unstuck in life',
      'no motivation to do anything',
      'feeling stuck in life',
      'how to start again',
    ],
  },
];
