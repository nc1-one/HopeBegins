import type { StaticImageData } from 'next/image';
import { noTl, type Lang, type PerLangNoTl } from './i18n';

import LyzaImg from '@/assets/images/Testimonial/Lyza.jpg';
import IsabelleImg from '@/assets/images/Testimonial/Isabelle.jpg';
import JeremyImg from '@/assets/images/Testimonial/Jeremy.jpg';

/** A story from someone who used HopeBegins, in their own words. */
export interface Testimonial {
  id: number | string;
  content: string;
  /** A line from the story, in the person's own words, shown first. */
  excerpt?: string;
  name: string;
  role?: string;
  avatar: string | StaticImageData; // URL for the avatar image
}

/** What a story says, in one language. */
interface StoryWords {
  excerpt: string;
  content: string;
  role: string;
}

/*
 * The stories the site started with. English holds each person's own words
 * (Jeremy's are Taglish); French, German, Spanish and Korean translate them
 * faithfully, names kept. A verse someone quotes is said in other words,
 * with its reference, as the translation guide asks.
 */
const STORIES: {
  id: number;
  name: string;
  avatar: StaticImageData;
  words: PerLangNoTl<StoryWords>;
}[] = [
  {
    id: 1,
    name: 'Lyza Samartino',
    avatar: LyzaImg,
    words: {
      en: {
        excerpt:
          'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true.',
        content:
          'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true. Crucially, this time, the truth is not just based on what I know but based on the ultimate truth from what the Word of God says. Coach Hope reminded me of the verse Philippians 2:13, which is now one of my favorite verses: “For God is working in you, giving you the desire and the power to do what pleases Him.” It’s a beautiful reminder that even in our battle with mental health, God works in us, and He not only gives us the desire to change but also the power to change for His glory.',
        role: 'HopeBegins participant',
      },
      fr: {
        excerpt:
          'Grâce à ce programme, j’ai appris à vraiment passer mes pensées au crible, à mieux repérer les mensonges dont je me persuade et à les remplacer par ce qui est vrai.',
        content:
          'Grâce à ce programme, j’ai appris à vraiment passer mes pensées au crible, à mieux repérer les mensonges dont je me persuade et à les remplacer par ce qui est vrai. Et surtout, cette fois, la vérité va au-delà de ce que je sais : elle repose sur la vérité ultime, sur ce que dit la Parole de Dieu. Coach Hope m’a rappelé le verset de Philippiens 2:13, qui est maintenant l’un de mes versets préférés : c’est Dieu qui agit en nous, et qui nous donne à la fois le désir et la force de faire ce qui Lui plaît. C’est un beau rappel que, même quand notre santé mentale est un combat, Dieu agit en nous. Il nous donne à la fois l’envie de changer et la force de changer, pour Sa gloire.',
        role: 'A participé à HopeBegins',
      },
      de: {
        excerpt:
          'Durch dieses Programm habe ich gelernt, meine Gedanken richtig zu prüfen, die Lügen, die ich mir selbst einrede, bewusster zu erkennen und sie durch das zu ersetzen, was wahr ist.',
        content:
          'Durch dieses Programm habe ich gelernt, meine Gedanken richtig zu prüfen, die Lügen, die ich mir selbst einrede, bewusster zu erkennen und sie durch das zu ersetzen, was wahr ist. Und das Wichtigste: Diesmal geht die Wahrheit über das hinaus, was ich weiß. Sie gründet auf der höchsten Wahrheit, auf dem, was Gottes Wort sagt. Coach Hope hat mich an den Vers Philipper 2,13 erinnert, der jetzt einer meiner Lieblingsverse ist: Gott ist es, der in uns wirkt und uns beides schenkt, den Wunsch und die Kraft, das zu tun, was Ihm gefällt. Das ist eine schöne Erinnerung daran, dass Gott auch in unseren seelischen Kämpfen in uns wirkt. Er schenkt uns beides, den Wunsch, uns zu verändern, und die Kraft dazu, zu Seiner Ehre.',
        role: 'Hat bei HopeBegins mitgemacht',
      },
      es: {
        excerpt:
          'Gracias a este programa aprendí a revisar bien mis pensamientos, a darme más cuenta de las mentiras con las que me convenzo y a reemplazarlas por lo que es verdad.',
        content:
          'Gracias a este programa aprendí a revisar bien mis pensamientos, a darme más cuenta de las mentiras con las que me convenzo y a reemplazarlas por lo que es verdad. Y lo más importante: esta vez la verdad va más allá de lo que yo sé. Se basa en la verdad suprema, en lo que dice la Palabra de Dios. Coach Hope me recordó Filipenses 2:13, que ahora es uno de mis versículos favoritos: “Porque Dios es el que en vosotros obra así el querer como el hacer, por su buena voluntad”. Me encanta, porque me muestra que, incluso en nuestras luchas de salud mental, Dios obra en nosotros. Él nos da tanto el deseo de cambiar como el poder para cambiar, para Su gloria.',
        role: 'Participante de HopeBegins',
      },
      ko: {
        excerpt:
          '이 프로그램을 통해 제 생각을 제대로 점검하고, 스스로 믿어 버리는 거짓말을 더 잘 알아차리고, 그 자리를 진실로 채우는 법을 배웠어요.',
        content:
          '이 프로그램을 통해 제 생각을 제대로 점검하고, 스스로 믿어 버리는 거짓말을 더 잘 알아차리고, 그 자리를 진실로 채우는 법을 배웠어요. 무엇보다 이번에는 그 진실이 제가 아는 것을 넘어, 하나님의 말씀이 말하는 궁극적인 진리에 바탕을 두고 있어요. Coach Hope가 빌립보서 2:13 말씀을 떠올리게 해 주었는데, 지금은 제가 가장 좋아하는 말씀 중 하나예요. 하나님이 우리 안에서 일하시며, 그분을 기쁘시게 하는 일을 하고 싶은 마음과 그 일을 할 힘을 함께 주신다는 말씀이에요. 마음의 병과 싸우는 중에도 하나님이 우리 안에서 일하신다는 걸 일깨워 주는 아름다운 말씀이에요. 하나님은 변하고 싶은 마음과 함께, 그분의 영광을 위해 변할 수 있는 힘까지 주시는 분이에요.',
        role: 'HopeBegins 참여자',
      },
    },
  },
  {
    id: 2,
    name: 'Isabelle Prado',
    avatar: IsabelleImg,
    words: {
      en: {
        excerpt:
          'I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God.',
        content:
          'I remember that I was so confused why was still waking up with so much sadness, confusion, anxiety, and depression everyday. Every. Single. Day. And I didn’t know how to get out of it but I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God. So, when HopeBegins was offered and was an opportunity that I could join, I remember going straight at it and really taking a chance because God knew that it was what I needed to move forward with my relationship with Him, to move forward with understanding Him and His love for me better. When HopeBegins came, it was the beginning of so much transformation with so much of the darkness that I was carrying to be out of my life at that time.',
        role: 'HopeBegins participant',
      },
      fr: {
        excerpt:
          'Je savais que je voulais m’en sortir, et je savais aussi que la seule issue passait par des conseils et un accompagnement fondés sur la Parole de Dieu.',
        content:
          'Je me souviens que je ne comprenais vraiment pas pourquoi je me réveillais encore avec autant de tristesse, de confusion, d’anxiété et de dépression, chaque jour. Tous. Les. Jours. Je ne savais pas comment m’en sortir, mais je savais que je voulais m’en sortir, et je savais aussi que la seule issue passait par des conseils et un accompagnement fondés sur la Parole de Dieu. Alors, quand on m’a proposé HopeBegins et que j’ai eu la possibilité d’y participer, je me souviens d’y être allée sans hésiter et d’avoir vraiment tenté ma chance, parce que Dieu savait que c’était ce dont j’avais besoin pour avancer dans ma relation avec Lui, pour mieux Le comprendre, Lui et Son amour pour moi. Quand HopeBegins est arrivé, ça a été le début de tant de changements, et une grande partie des ténèbres que je portais a quitté ma vie à ce moment-là.',
        role: 'A participé à HopeBegins',
      },
      de: {
        excerpt:
          'Ich wusste, dass ich da rauswollte, und ich wusste auch, dass es nur einen Ausweg gab: Rat und Begleitung, die auf Gottes Wort gründen.',
        content:
          'Ich weiß noch, wie ratlos ich war: Warum wachte ich jeden Tag immer noch mit so viel Traurigkeit, Verwirrung, Angst und Depression auf? Jeden. Einzelnen. Tag. Ich wusste nicht, wie ich da rauskommen sollte, aber ich wusste, dass ich da rauswollte, und ich wusste auch, dass es nur einen Ausweg gab: Rat und Begleitung, die auf Gottes Wort gründen. Als mir HopeBegins dann angeboten wurde und ich die Möglichkeit hatte mitzumachen, habe ich, so erinnere ich mich, sofort zugegriffen und es wirklich gewagt. Denn Gott wusste, dass ich genau das brauchte, um in meiner Beziehung zu Ihm weiterzukommen und Ihn und Seine Liebe zu mir besser zu verstehen. Mit HopeBegins begann so viel Veränderung, und so viel von der Dunkelheit, die ich damals mit mir herumgetragen habe, ist aus meinem Leben verschwunden.',
        role: 'Hat bei HopeBegins mitgemacht',
      },
      es: {
        excerpt:
          'Sabía que quería salir de eso, y también sabía que la única salida eran consejos y una guía basados en la Palabra de Dios.',
        content:
          'Recuerdo que no entendía para nada por qué seguía despertando con tanta tristeza, confusión, ansiedad y depresión todos los días. Todos. Los. Días. No sabía cómo salir de eso, pero sabía que quería salir, y también sabía que la única salida eran consejos y una guía basados en la Palabra de Dios. Así que, cuando me ofrecieron HopeBegins y tuve la oportunidad de unirme, recuerdo que me lancé sin pensarlo y de verdad me arriesgué, porque Dios sabía que era lo que necesitaba para avanzar en mi relación con Él, para entenderlo mejor a Él y Su amor por mí. Cuando llegó HopeBegins, fue el comienzo de muchísimos cambios, y gran parte de la oscuridad que cargaba en ese tiempo salió de mi vida.',
        role: 'Participante de HopeBegins',
      },
      ko: {
        excerpt:
          '거기서 벗어나고 싶다는 걸 알았고, 벗어날 유일한 길은 하나님의 말씀에 바탕을 둔 조언과 인도라는 것도 알았어요.',
        content:
          '매일 아침 여전히 슬픔과 혼란, 불안과 우울 속에서 눈을 뜨는 게 왜 그런지 몰라서 정말 혼란스러웠던 기억이 나요. 매일. 하루도. 빠짐없이. 어떻게 벗어나야 할지 몰랐지만 벗어나고 싶다는 건 알았고, 벗어날 유일한 길은 하나님의 말씀에 바탕을 둔 조언과 인도라는 것도 알았어요. 그래서 HopeBegins에 참여할 기회가 생겼을 때, 망설임 없이 바로 뛰어들어 정말 용기를 냈던 기억이 나요. 하나님과의 관계에서 앞으로 나아가고, 하나님과 저를 향한 그분의 사랑을 더 잘 이해하려면 그게 꼭 필요하다는 걸 하나님은 알고 계셨으니까요. HopeBegins를 만나면서 정말 많은 것이 달라지기 시작했고, 그때 제가 짊어지고 있던 어둠의 많은 부분이 제 삶에서 떠나갔어요.',
        role: 'HopeBegins 참여자',
      },
    },
  },
  {
    id: 3,
    name: 'Jeremy Rebedillo',
    avatar: JeremyImg,
    words: {
      en: {
        excerpt:
          'I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins.',
        content:
          "I was overwhelmed with anxiety and so much lies from the enemy. So my friend introduced me to HopeBegins. But before that, I was having a hard time when it comes to my relationship with other people, even in decision making, to the point na nahirapan ako mag-decide. All of the decisions and actions na I was doing was not completely right and I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins. For those people who are interested or unsure sa pag-join ng Hope Begins.. you really have to take the risk, knowing na our problems or struggles in life, it's really hard ‘pag ikaw lang mag-di-deal lang niyan on your own. You know, sometimes we tend to fix things on our own, but we also forget to seek help from other people.",
        role: 'HopeBegins participant',
      },
      fr: {
        excerpt:
          'Je savais que j’avais vraiment besoin d’aide. Et j’ai trouvé de l’aide et du soutien grâce à HopeBegins.',
        content:
          'J’étais submergé par l’anxiété et par tant de mensonges de l’ennemi. Alors un ami m’a fait découvrir HopeBegins. Mais avant ça, j’avais du mal dans mes relations avec les autres, et même pour prendre des décisions, au point de ne plus arriver à décider. Toutes mes décisions et tout ce que je faisais n’étaient pas tout à fait justes, et je savais que j’avais vraiment besoin d’aide. Et j’ai trouvé de l’aide et du soutien grâce à HopeBegins. À toutes les personnes que ça intéresse ou qui hésitent à rejoindre HopeBegins : il faut vraiment prendre le risque, parce que nos problèmes et nos combats dans la vie, c’est vraiment dur quand on doit y faire face sans personne. Tu sais, parfois on a tendance à vouloir tout régler par soi-même, mais on oublie aussi de demander de l’aide aux autres.',
        role: 'A participé à HopeBegins',
      },
      de: {
        excerpt:
          'Ich wusste, dass ich wirklich Hilfe brauchte. Und durch HopeBegins habe ich Hilfe und Unterstützung gefunden.',
        content:
          'Ich war überwältigt von Angst und von so vielen Lügen des Feindes. Dann hat mir ein Freund HopeBegins gezeigt. Aber davor hatte ich es schwer in meinen Beziehungen zu anderen Menschen und sogar dabei, Entscheidungen zu treffen, so sehr, dass ich mich kaum noch entscheiden konnte. Alles, was ich entschieden und getan habe, war nicht ganz richtig, und ich wusste, dass ich wirklich Hilfe brauchte. Und durch HopeBegins habe ich Hilfe und Unterstützung gefunden. An alle, die Interesse haben oder unsicher sind, ob sie bei HopeBegins mitmachen sollen: Wagt es wirklich. Denn unsere Probleme und Kämpfe im Leben sind echt schwer, wenn man ganz allein damit klarkommen muss. Wisst ihr, manchmal wollen wir alles selbst in Ordnung bringen und vergessen dabei, andere um Hilfe zu bitten.',
        role: 'Hat bei HopeBegins mitgemacht',
      },
      es: {
        excerpt:
          'Sabía que de verdad necesitaba ayuda. Y encontré ayuda y apoyo a través de HopeBegins.',
        content:
          'Estaba abrumado por la ansiedad y por tantas mentiras del enemigo. Entonces un amigo me presentó HopeBegins. Pero antes de eso, me costaba mucho relacionarme con otras personas, e incluso tomar decisiones, al punto de que se me hacía difícil decidir cualquier cosa. Todas las decisiones que tomaba y lo que hacía no estaban del todo bien, y sabía que de verdad necesitaba ayuda. Y encontré ayuda y apoyo a través de HopeBegins. Para quienes tienen interés o dudan en unirse a HopeBegins: de verdad tienen que arriesgarse, porque nuestros problemas y luchas en la vida son muy difíciles cuando los enfrentas sin ayuda de nadie. ¿Sabes? A veces tendemos a querer arreglar todo por nuestra cuenta, pero también olvidamos buscar ayuda en otras personas.',
        role: 'Participante de HopeBegins',
      },
      ko: {
        excerpt:
          '정말 도움이 필요하다는 걸 알았어요. 그리고 HopeBegins를 통해 도움과 지지를 얻었어요.',
        content:
          '저는 불안과 원수의 수많은 거짓말에 짓눌려 있었어요. 그러다 친구가 HopeBegins를 소개해 줬어요. 그런데 그 전에는 사람들과의 관계도 힘들었고, 결정을 내리는 것조차 어려워서 무엇 하나 결정하기 힘들 정도였어요. 제가 내린 결정과 행동이 다 옳지는 않았고, 정말 도움이 필요하다는 걸 알았어요. 그리고 HopeBegins를 통해 도움과 지지를 얻었어요. HopeBegins에 관심은 있지만 망설이는 분들께 말하고 싶어요. 꼭 용기를 내서 도전해 보세요. 삶의 문제와 어려움은 혼자서 감당하려고 하면 정말 힘들거든요. 있잖아요, 우리는 가끔 모든 걸 혼자 해결하려고 하다가 다른 사람에게 도움을 구하는 걸 잊어버리곤 해요.',
        role: 'HopeBegins 참여자',
      },
    },
  },
];

/**
 * The stories the site started with, in a language: shown until ones sent
 * in are approved, and always on the French, German, Spanish and Korean
 * pages. Taglish readers get the stories in their own words.
 */
export const storiesIn = (lang: Lang): Testimonial[] =>
  STORIES.map(({ words, ...story }) => ({ ...story, ...noTl(words, lang) }));
